var Rd=Object.defineProperty;var Cd=(t,n,e)=>n in t?Rd(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var ne=(t,n,e)=>Cd(t,typeof n!="symbol"?n+"":n,e);import{U as no,c as Dd,N as _o,S as yt,C as te,M as ot,R as Id,e as Ht,w as Rt,V as wn,l as Nr,F as Wc,W as kr,a as mn,b as Vt,L as Ro,H as Tn,D as $e,B as An,d as Ei,f as Y,p as Ld,g as ns,h as Ti,i as G,j as sn,O as Bs,P as wi,k as Ye,m as wt,n as Ai,o as Un,q as Xc,r as Ft,E as Ud,A as Nd,s as ia,t as rt,u as xo,v as ii,x as Pi,y as Ri,z as ri,G as kd,I as nr,J as Ci,K as yn,Q as Is,T as jt,X as pn,Y as zs,Z as xt,_ as ro,$ as Fd,a0 as Ho,a1 as Fr,a2 as Od,a3 as Gd,a4 as Po,a5 as Bd,a6 as zd,a7 as Hd,a8 as Vd,a9 as Wd,aa as Xd,ab as qd,ac as Yd,ad as La,ae as Ua,af as Kd,ag as $d,ah as jd,ai as Zd,aj as Yi,ak as qc,al as Io,am as Ts,an as Ki,ao as Yc,ap as so,aq as Qd,ar as Jd,as as or,at as ef,au as ir,av as tf,aw as nf,ax as of,ay as Mt,az as Kc,aA as sf,aB as af,aC as Zi,aD as $c,aE as $i,aF as Wo,aG as rf,aH as jc,aI as Zc,aJ as Qc,aK as Ls,aL as Jc,aM as el,aN as tl,aO as Je,aP as cf,aQ as lf,aR as df,aS as ff,aT as nl,aU as uf,aV as hf,aW as pf,aX as sa,aY as aa,aZ as ra,a_ as ca,a$ as Or,b0 as Gr,b1 as Br,b2 as zr,b3 as Hr,b4 as Vr,b5 as Wr,b6 as Xr,b7 as qr,b8 as Na,b9 as Yr,ba as Kr,bb as $r,bc as jr,bd as Zr,be as Qr,bf as Jr,bg as e0,bh as t0,bi as n0,bj as o0,bk as i0,bl as s0,bm as a0,bn as r0,bo as c0,bp as l0,bq as d0,br as f0,bs as u0,bt as ka,bu as h0,bv as mf,bw as gf,bx as vf,by as xf,bz as _f,bA as Mf,bB as bf,bC as Sf,bD as p0,bE as wf,bF as As,bG as ol,bH as m0,bI as g0,bJ as si,bK as il,bL as oo,bM as v0,bN as yf,bO as sl,bP as Fa,bQ as al,bR as Ef,bS as sr,bT as ar,bU as rr,bV as Hs,bW as cr,bX as lr,bY as dr,bZ as x0,b_ as rl,b$ as la,c0 as da,c1 as Tf,c2 as Af,c3 as _0,c4 as In,c5 as Pf,c6 as Rf,c7 as Cf,c8 as Df,c9 as If,ca as Lf,cb as Oa,cc as Uf,cd as Nf,ce as kf,cf as Ff,cg as Ga,ch as cl,ci as ge,cj as Wt,ck as vn,cl as St,cm as we,cn as ci,co as ye,cp as Ke,cq as on,cr as Di,cs as gt,ct as Kn,cu as co,cv as dn,cw as $n,cx as Vs,cy as Of,cz as Gf,cA as Bf,cB as zf,cC as Qi,cD as ll,cE as fr,cF as Ba,cG as Ln,cH as Hf,cI as cs,cJ as Vf,cK as Wf,cL as Xf,cM as za,cN as fa,cO as qf,cP as Yf,cQ as Kf,cR as $f,cS as jf,cT as Zf,cU as Ha,cV as Qf,cW as Jf,cX as eu,cY as tu,cZ as dl,c_ as nu,c$ as M0,d0 as b0,d1 as S0,d2 as ou,d3 as fl,d4 as ul,d5 as me,d6 as lo,d7 as So,d8 as iu,d9 as Mn,da as Cn,db as ms,dc as Nn,dd as Bn,de as ur,df as w0,dg as su,dh as au,di as Rn,dj as eo,dk as ru,dl as zt,dm as Nt,dn as ti,dp as ni,dq as hl,dr as pl,ds as ml,dt as cu,du as y0,dv as ua,dw as zi,dx as lu,dy as Pn,dz as du,dA as mi,dB as fu,dC as uu,dD as Bo,dE as E0,dF as hu,dG as pu,dH as gs,dI as mu}from"./index-C3VC-0CU.js";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function gl(){let t=null,n=!1,e=null,o=null;function i(s,a){e(s,a),o=t.requestAnimationFrame(i)}return{start:function(){n!==!0&&e!==null&&t!==null&&(o=t.requestAnimationFrame(i),n=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(o),n=!1},setAnimationLoop:function(s){e=s},setContext:function(s){t=s}}}function gu(t){const n=new WeakMap;function e(r,c){const l=r.array,f=r.usage,d=l.byteLength,u=t.createBuffer();t.bindBuffer(c,u),t.bufferData(c,l,f),r.onUploadCallback();let h;if(l instanceof Float32Array)h=t.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=t.HALF_FLOAT;else if(l instanceof Uint16Array)r.isFloat16BufferAttribute?h=t.HALF_FLOAT:h=t.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=t.SHORT;else if(l instanceof Uint32Array)h=t.UNSIGNED_INT;else if(l instanceof Int32Array)h=t.INT;else if(l instanceof Int8Array)h=t.BYTE;else if(l instanceof Uint8Array)h=t.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:r.version,size:d}}function o(r,c,l){const f=c.array,d=c.updateRanges;if(t.bindBuffer(l,r),d.length===0)t.bufferSubData(l,0,f);else{d.sort((h,m)=>h.start-m.start);let u=0;for(let h=1;h<d.length;h++){const m=d[u],_=d[h];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++u,d[u]=_)}d.length=u+1;for(let h=0,m=d.length;h<m;h++){const _=d[h];t.bufferSubData(l,_.start*f.BYTES_PER_ELEMENT,f,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(r){return r.isInterleavedBufferAttribute&&(r=r.data),n.get(r)}function s(r){r.isInterleavedBufferAttribute&&(r=r.data);const c=n.get(r);c&&(t.deleteBuffer(c.buffer),n.delete(r))}function a(r,c){if(r.isInterleavedBufferAttribute&&(r=r.data),r.isGLBufferAttribute){const f=n.get(r);(!f||f.version<r.version)&&n.set(r,{buffer:r.buffer,type:r.type,bytesPerElement:r.elementSize,version:r.version});return}const l=n.get(r);if(l===void 0)n.set(r,e(r,c));else if(l.version<r.version){if(l.size!==r.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");o(l.buffer,r,c),l.version=r.version}}return{get:i,remove:s,update:a}}var vu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xu=`#ifdef USE_ALPHAHASH
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
#endif`,_u=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Mu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Su=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wu=`#ifdef USE_AOMAP
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
#endif`,yu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Eu=`#ifdef USE_BATCHING
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
#endif`,Tu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Au=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ru=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cu=`#ifdef USE_IRIDESCENCE
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
#endif`,Du=`#ifdef USE_BUMPMAP
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
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Uu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ku=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Fu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ou=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Gu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Bu=`#define PI 3.141592653589793
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
} // validated`,zu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hu=`vec3 transformedNormal = objectNormal;
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
#endif`,Vu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ku=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$u=`#ifdef USE_ENVMAP
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
#endif`,ju=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Zu=`#ifdef USE_ENVMAP
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
#endif`,Qu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ju=`#ifdef USE_ENVMAP
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
#endif`,eh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,th=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,oh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ih=`#ifdef USE_GRADIENTMAP
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
}`,sh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ah=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ch=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,lh=`#ifdef USE_ENVMAP
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
#endif`,dh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ph=`PhysicalMaterial material;
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
#endif`,mh=`uniform sampler2D dfgLUT;
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
}`,gh=`
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
#endif`,vh=`#if defined( RE_IndirectDiffuse )
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
#endif`,xh=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_h=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Mh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Eh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Th=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ah=`#if defined( USE_POINTS_UV )
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
#endif`,Ph=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ch=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dh=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ih=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lh=`#ifdef USE_MORPHTARGETS
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
#endif`,Uh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,kh=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Fh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Oh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Bh=`#ifdef USE_NORMALMAP
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
#endif`,zh=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wh=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xh=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qh=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yh=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$h=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zh=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qh=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jh=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,e1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,t1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,n1=`float getShadowMask() {
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
}`,o1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,i1=`#ifdef USE_SKINNING
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
#endif`,s1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,a1=`#ifdef USE_SKINNING
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
#endif`,r1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,c1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,l1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,d1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,f1=`#ifdef USE_TRANSMISSION
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
#endif`,u1=`#ifdef USE_TRANSMISSION
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
#endif`,h1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,p1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,m1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,g1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const v1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,x1=`uniform sampler2D t2D;
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
}`,_1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,M1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,b1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,S1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w1=`#include <common>
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
}`,y1=`#if DEPTH_PACKING == 3200
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
}`,E1=`#define DISTANCE
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
}`,T1=`#define DISTANCE
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
}`,A1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,P1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R1=`uniform float scale;
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
}`,C1=`uniform vec3 diffuse;
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
}`,D1=`#include <common>
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
}`,I1=`uniform vec3 diffuse;
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
}`,L1=`#define LAMBERT
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
}`,U1=`#define LAMBERT
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
}`,N1=`#define MATCAP
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
}`,k1=`#define MATCAP
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
}`,F1=`#define NORMAL
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
}`,O1=`#define NORMAL
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
}`,G1=`#define PHONG
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
}`,B1=`#define PHONG
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
}`,z1=`#define STANDARD
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
}`,H1=`#define STANDARD
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
}`,V1=`#define TOON
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
}`,W1=`#define TOON
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
}`,X1=`uniform float size;
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
}`,q1=`uniform vec3 diffuse;
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
}`,Y1=`#include <common>
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
}`,K1=`uniform vec3 color;
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
}`,$1=`uniform float rotation;
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
}`,j1=`uniform vec3 diffuse;
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
}`,dt={alphahash_fragment:vu,alphahash_pars_fragment:xu,alphamap_fragment:_u,alphamap_pars_fragment:Mu,alphatest_fragment:bu,alphatest_pars_fragment:Su,aomap_fragment:wu,aomap_pars_fragment:yu,batching_pars_vertex:Eu,batching_vertex:Tu,begin_vertex:Au,beginnormal_vertex:Pu,bsdfs:Ru,iridescence_fragment:Cu,bumpmap_pars_fragment:Du,clipping_planes_fragment:Iu,clipping_planes_pars_fragment:Lu,clipping_planes_pars_vertex:Uu,clipping_planes_vertex:Nu,color_fragment:ku,color_pars_fragment:Fu,color_pars_vertex:Ou,color_vertex:Gu,common:Bu,cube_uv_reflection_fragment:zu,defaultnormal_vertex:Hu,displacementmap_pars_vertex:Vu,displacementmap_vertex:Wu,emissivemap_fragment:Xu,emissivemap_pars_fragment:qu,colorspace_fragment:Yu,colorspace_pars_fragment:Ku,envmap_fragment:$u,envmap_common_pars_fragment:ju,envmap_pars_fragment:Zu,envmap_pars_vertex:Qu,envmap_physical_pars_fragment:lh,envmap_vertex:Ju,fog_vertex:eh,fog_pars_vertex:th,fog_fragment:nh,fog_pars_fragment:oh,gradientmap_pars_fragment:ih,lightmap_pars_fragment:sh,lights_lambert_fragment:ah,lights_lambert_pars_fragment:rh,lights_pars_begin:ch,lights_toon_fragment:dh,lights_toon_pars_fragment:fh,lights_phong_fragment:uh,lights_phong_pars_fragment:hh,lights_physical_fragment:ph,lights_physical_pars_fragment:mh,lights_fragment_begin:gh,lights_fragment_maps:vh,lights_fragment_end:xh,lightprobes_pars_fragment:_h,logdepthbuf_fragment:Mh,logdepthbuf_pars_fragment:bh,logdepthbuf_pars_vertex:Sh,logdepthbuf_vertex:wh,map_fragment:yh,map_pars_fragment:Eh,map_particle_fragment:Th,map_particle_pars_fragment:Ah,metalnessmap_fragment:Ph,metalnessmap_pars_fragment:Rh,morphinstance_vertex:Ch,morphcolor_vertex:Dh,morphnormal_vertex:Ih,morphtarget_pars_vertex:Lh,morphtarget_vertex:Uh,normal_fragment_begin:Nh,normal_fragment_maps:kh,normal_pars_fragment:Fh,normal_pars_vertex:Oh,normal_vertex:Gh,normalmap_pars_fragment:Bh,clearcoat_normal_fragment_begin:zh,clearcoat_normal_fragment_maps:Hh,clearcoat_pars_fragment:Vh,iridescence_pars_fragment:Wh,opaque_fragment:Xh,packing:qh,premultiplied_alpha_fragment:Yh,project_vertex:Kh,dithering_fragment:$h,dithering_pars_fragment:jh,roughnessmap_fragment:Zh,roughnessmap_pars_fragment:Qh,shadowmap_pars_fragment:Jh,shadowmap_pars_vertex:e1,shadowmap_vertex:t1,shadowmask_pars_fragment:n1,skinbase_vertex:o1,skinning_pars_vertex:i1,skinning_vertex:s1,skinnormal_vertex:a1,specularmap_fragment:r1,specularmap_pars_fragment:c1,tonemapping_fragment:l1,tonemapping_pars_fragment:d1,transmission_fragment:f1,transmission_pars_fragment:u1,uv_pars_fragment:h1,uv_pars_vertex:p1,uv_vertex:m1,worldpos_vertex:g1,background_vert:v1,background_frag:x1,backgroundCube_vert:_1,backgroundCube_frag:M1,cube_vert:b1,cube_frag:S1,depth_vert:w1,depth_frag:y1,distance_vert:E1,distance_frag:T1,equirect_vert:A1,equirect_frag:P1,linedashed_vert:R1,linedashed_frag:C1,meshbasic_vert:D1,meshbasic_frag:I1,meshlambert_vert:L1,meshlambert_frag:U1,meshmatcap_vert:N1,meshmatcap_frag:k1,meshnormal_vert:F1,meshnormal_frag:O1,meshphong_vert:G1,meshphong_frag:B1,meshphysical_vert:z1,meshphysical_frag:H1,meshtoon_vert:V1,meshtoon_frag:W1,points_vert:X1,points_frag:q1,shadow_vert:Y1,shadow_frag:K1,sprite_vert:$1,sprite_frag:j1},De={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Mt},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Mt}},envmap:{envMap:{value:null},envMapRotation:{value:new Mt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Mt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Mt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Mt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Mt},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Mt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Mt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Mt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Mt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Y},probesMax:{value:new Y},probesResolution:{value:new Y}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0},uvTransform:{value:new Mt}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Mt},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0}}},vo={basic:{uniforms:In([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:dt.meshbasic_vert,fragmentShader:dt.meshbasic_frag},lambert:{uniforms:In([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new te(0)},envMapIntensity:{value:1}}]),vertexShader:dt.meshlambert_vert,fragmentShader:dt.meshlambert_frag},phong:{uniforms:In([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:dt.meshphong_vert,fragmentShader:dt.meshphong_frag},standard:{uniforms:In([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag},toon:{uniforms:In([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new te(0)}}]),vertexShader:dt.meshtoon_vert,fragmentShader:dt.meshtoon_frag},matcap:{uniforms:In([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:dt.meshmatcap_vert,fragmentShader:dt.meshmatcap_frag},points:{uniforms:In([De.points,De.fog]),vertexShader:dt.points_vert,fragmentShader:dt.points_frag},dashed:{uniforms:In([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:dt.linedashed_vert,fragmentShader:dt.linedashed_frag},depth:{uniforms:In([De.common,De.displacementmap]),vertexShader:dt.depth_vert,fragmentShader:dt.depth_frag},normal:{uniforms:In([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:dt.meshnormal_vert,fragmentShader:dt.meshnormal_frag},sprite:{uniforms:In([De.sprite,De.fog]),vertexShader:dt.sprite_vert,fragmentShader:dt.sprite_frag},background:{uniforms:{uvTransform:{value:new Mt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:dt.background_vert,fragmentShader:dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Mt}},vertexShader:dt.backgroundCube_vert,fragmentShader:dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:dt.cube_vert,fragmentShader:dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:dt.equirect_vert,fragmentShader:dt.equirect_frag},distance:{uniforms:In([De.common,De.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:dt.distance_vert,fragmentShader:dt.distance_frag},shadow:{uniforms:In([De.lights,De.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:dt.shadow_vert,fragmentShader:dt.shadow_frag}};vo.physical={uniforms:In([vo.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Mt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Mt},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Mt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Mt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Mt},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Mt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Mt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Mt},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Mt},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Mt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Mt},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Mt}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag};const vs={r:0,b:0,g:0},Z1=new ot,vl=new Mt;vl.set(-1,0,0,0,1,0,0,0,1);function Q1(t,n,e,o,i,s){const a=new te(0);let r=i===!0?0:1,c,l,f=null,d=0,u=null;function h(x){let M=x.isScene===!0?x.background:null;if(M&&M.isTexture){const S=x.backgroundBlurriness>0;M=n.get(M,S)}return M}function m(x){let M=!1;const S=h(x);S===null?p(a,r):S&&S.isColor&&(p(S,1),M=!0);const T=t.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,s),(t.autoClear||M)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function _(x,M){const S=h(M);S&&(S.isCubeTexture||S.mapping===zs)?(l===void 0&&(l=new G(new Ye(1,1,1),new jt({name:"BackgroundCubeMaterial",uniforms:Fa(vo.backgroundCube.uniforms),vertexShader:vo.backgroundCube.vertexShader,fragmentShader:vo.backgroundCube.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,w,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Z1.makeRotationFromEuler(M.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(vl),l.material.toneMapped=Vt.getTransfer(S.colorSpace)!==Ft,(f!==S||d!==S.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,f=S,d=S.version,u=t.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new G(new Je(2,2),new jt({name:"BackgroundMaterial",uniforms:Fa(vo.background.uniforms),vertexShader:vo.background.vertexShader,fragmentShader:vo.background.fragmentShader,side:Ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Vt.getTransfer(S.colorSpace)!==Ft,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(f!==S||d!==S.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,f=S,d=S.version,u=t.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,M){x.getRGB(vs,sl(t)),e.buffers.color.setClear(vs.r,vs.g,vs.b,M,s)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,M=1){a.set(x),r=M,p(a,r)},getClearAlpha:function(){return r},setClearAlpha:function(x){r=x,p(a,r)},render:m,addToRenderList:_,dispose:g}}function J1(t,n){const e=t.getParameter(t.MAX_VERTEX_ATTRIBS),o={},i=u(null);let s=i,a=!1;function r(A,R,L,I,U){let N=!1;const O=d(A,I,L,R);s!==O&&(s=O,l(s.object)),N=h(A,I,L,U),N&&m(A,I,L,U),U!==null&&n.update(U,t.ELEMENT_ARRAY_BUFFER),(N||a)&&(a=!1,S(A,R,L,I),U!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get(U).buffer))}function c(){return t.createVertexArray()}function l(A){return t.bindVertexArray(A)}function f(A){return t.deleteVertexArray(A)}function d(A,R,L,I){const U=I.wireframe===!0;let N=o[R.id];N===void 0&&(N={},o[R.id]=N);const O=A.isInstancedMesh===!0?A.id:0;let V=N[O];V===void 0&&(V={},N[O]=V);let X=V[L.id];X===void 0&&(X={},V[L.id]=X);let J=X[U];return J===void 0&&(J=u(c()),X[U]=J),J}function u(A){const R=[],L=[],I=[];for(let U=0;U<e;U++)R[U]=0,L[U]=0,I[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:L,attributeDivisors:I,object:A,attributes:{},index:null}}function h(A,R,L,I){const U=s.attributes,N=R.attributes;let O=0;const V=L.getAttributes();for(const X in V)if(V[X].location>=0){const W=U[X];let k=N[X];if(k===void 0&&(X==="instanceMatrix"&&A.instanceMatrix&&(k=A.instanceMatrix),X==="instanceColor"&&A.instanceColor&&(k=A.instanceColor)),W===void 0||W.attribute!==k||k&&W.data!==k.data)return!0;O++}return s.attributesNum!==O||s.index!==I}function m(A,R,L,I){const U={},N=R.attributes;let O=0;const V=L.getAttributes();for(const X in V)if(V[X].location>=0){let W=N[X];W===void 0&&(X==="instanceMatrix"&&A.instanceMatrix&&(W=A.instanceMatrix),X==="instanceColor"&&A.instanceColor&&(W=A.instanceColor));const k={};k.attribute=W,W&&W.data&&(k.data=W.data),U[X]=k,O++}s.attributes=U,s.attributesNum=O,s.index=I}function _(){const A=s.newAttributes;for(let R=0,L=A.length;R<L;R++)A[R]=0}function p(A){g(A,0)}function g(A,R){const L=s.newAttributes,I=s.enabledAttributes,U=s.attributeDivisors;L[A]=1,I[A]===0&&(t.enableVertexAttribArray(A),I[A]=1),U[A]!==R&&(t.vertexAttribDivisor(A,R),U[A]=R)}function x(){const A=s.newAttributes,R=s.enabledAttributes;for(let L=0,I=R.length;L<I;L++)R[L]!==A[L]&&(t.disableVertexAttribArray(L),R[L]=0)}function M(A,R,L,I,U,N,O){O===!0?t.vertexAttribIPointer(A,R,L,U,N):t.vertexAttribPointer(A,R,L,I,U,N)}function S(A,R,L,I){_();const U=I.attributes,N=L.getAttributes(),O=R.defaultAttributeValues;for(const V in N){const X=N[V];if(X.location>=0){let J=U[V];if(J===void 0&&(V==="instanceMatrix"&&A.instanceMatrix&&(J=A.instanceMatrix),V==="instanceColor"&&A.instanceColor&&(J=A.instanceColor)),J!==void 0){const W=J.normalized,k=J.itemSize,ee=n.get(J);if(ee===void 0)continue;const ae=ee.buffer,ue=ee.type,z=ee.bytesPerElement,j=ue===t.INT||ue===t.UNSIGNED_INT||J.gpuType===nl;if(J.isInterleavedBufferAttribute){const Z=J.data,de=Z.stride,be=J.offset;if(Z.isInstancedInterleavedBuffer){for(let Te=0;Te<X.locationSize;Te++)g(X.location+Te,Z.meshPerAttribute);A.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Te=0;Te<X.locationSize;Te++)p(X.location+Te);t.bindBuffer(t.ARRAY_BUFFER,ae);for(let Te=0;Te<X.locationSize;Te++)M(X.location+Te,k/X.locationSize,ue,W,de*z,(be+k/X.locationSize*Te)*z,j)}else{if(J.isInstancedBufferAttribute){for(let Z=0;Z<X.locationSize;Z++)g(X.location+Z,J.meshPerAttribute);A.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Z=0;Z<X.locationSize;Z++)p(X.location+Z);t.bindBuffer(t.ARRAY_BUFFER,ae);for(let Z=0;Z<X.locationSize;Z++)M(X.location+Z,k/X.locationSize,ue,W,k*z,k/X.locationSize*Z*z,j)}}else if(O!==void 0){const W=O[V];if(W!==void 0)switch(W.length){case 2:t.vertexAttrib2fv(X.location,W);break;case 3:t.vertexAttrib3fv(X.location,W);break;case 4:t.vertexAttrib4fv(X.location,W);break;default:t.vertexAttrib1fv(X.location,W)}}}}x()}function T(){E();for(const A in o){const R=o[A];for(const L in R){const I=R[L];for(const U in I){const N=I[U];for(const O in N)f(N[O].object),delete N[O];delete I[U]}}delete o[A]}}function w(A){if(o[A.id]===void 0)return;const R=o[A.id];for(const L in R){const I=R[L];for(const U in I){const N=I[U];for(const O in N)f(N[O].object),delete N[O];delete I[U]}}delete o[A.id]}function y(A){for(const R in o){const L=o[R];for(const I in L){const U=L[I];if(U[A.id]===void 0)continue;const N=U[A.id];for(const O in N)f(N[O].object),delete N[O];delete U[A.id]}}}function v(A){for(const R in o){const L=o[R],I=A.isInstancedMesh===!0?A.id:0,U=L[I];if(U!==void 0){for(const N in U){const O=U[N];for(const V in O)f(O[V].object),delete O[V];delete U[N]}delete L[I],Object.keys(L).length===0&&delete o[R]}}}function E(){b(),a=!0,s!==i&&(s=i,l(s.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:r,reset:E,resetDefaultState:b,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:v,releaseStatesOfProgram:y,initAttributes:_,enableAttribute:p,disableUnusedAttributes:x}}function ep(t,n,e){let o;function i(c){o=c}function s(c,l){t.drawArrays(o,c,l),e.update(l,o,1)}function a(c,l,f){f!==0&&(t.drawArraysInstanced(o,c,l,f),e.update(l,o,f))}function r(c,l,f){if(f===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(o,c,0,l,0,f);let u=0;for(let h=0;h<f;h++)u+=l[h];e.update(u,o,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=r}function tp(t,n,e,o){let i;function s(){if(i!==void 0)return i;if(n.has("EXT_texture_filter_anisotropic")===!0){const y=n.get("EXT_texture_filter_anisotropic");i=t.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(y){return!(y!==xo&&o.convert(y)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function r(y){const v=y===Tn&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(y!==no&&o.convert(y)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&y!==Wo&&!v)}function c(y){if(y==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const f=c(l);f!==l&&(Rt("WebGLRenderer:",l,"not supported, using",f,"instead."),l=f);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&n.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),m=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_TEXTURE_SIZE),p=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),g=t.getParameter(t.MAX_VERTEX_ATTRIBS),x=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),M=t.getParameter(t.MAX_VARYING_VECTORS),S=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),T=t.getParameter(t.MAX_SAMPLES),w=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:r,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:h,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:S,maxSamples:T,samples:w}}function np(t){const n=this;let e=null,o=0,i=!1,s=!1;const a=new Kc,r=new Mt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const h=d.length!==0||u||o!==0||i;return i=u,o=d.length,h},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=f(d,u,0)},this.setState=function(d,u,h){const m=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,g=t.get(d);if(!i||m===null||m.length===0||s&&!p)s?f(null):l();else{const x=s?0:o,M=x*4;let S=g.clippingState||null;c.value=S,S=f(m,u,M,h);for(let T=0;T!==M;++T)S[T]=e[T];g.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=o>0),n.numPlanes=o,n.numIntersection=0}function f(d,u,h,m){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=c.value,m!==!0||p===null){const g=h+_*4,x=u.matrixWorldInverse;r.getNormalMatrix(x),(p===null||p.length<g)&&(p=new Float32Array(g));for(let M=0,S=h;M!==_;++M,S+=4)a.copy(d[M]).applyMatrix4(x,r),a.normal.toArray(p,S),p[S+3]=a.constant}c.value=p,c.needsUpdate=!0}return n.numPlanes=_,n.numIntersection=0,p}}const Xo=4,T0=[.125,.215,.35,.446,.526,.582],oi=20,op=256,Hi=new Bs,A0=new te;let ha=null,pa=0,ma=0,ga=!1;const ip=new Y;class Va{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(n,e=0,o=.1,i=100,s={}){const{size:a=256,position:r=ip}=s;ha=this._renderer.getRenderTarget(),pa=this._renderer.getActiveCubeFace(),ma=this._renderer.getActiveMipmapLevel(),ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(n,o,i,c,r),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(n,e=null){return this._fromTexture(n,e)}fromCubemap(n,e=null){return this._fromTexture(n,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=C0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=R0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodMeshes.length;n++)this._lodMeshes[n].geometry.dispose()}_cleanup(n){this._renderer.setRenderTarget(ha,pa,ma),this._renderer.xr.enabled=ga,n.scissorTest=!1,gi(n,0,0,n.width,n.height)}_fromTexture(n,e){n.mapping===ns||n.mapping===Ti?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),ha=this._renderer.getRenderTarget(),pa=this._renderer.getActiveCubeFace(),ma=this._renderer.getActiveMipmapLevel(),ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const o=e||this._allocateTargets();return this._textureToCubeUV(n,o),this._applyPMREM(o),this._cleanup(o),o}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,o={magFilter:yn,minFilter:yn,generateMipmaps:!1,type:Tn,format:xo,colorSpace:ro,depthBuffer:!1},i=P0(n,e,o);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=P0(n,e,o);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=sp(s)),this._blurMaterial=rp(s,n,e),this._ggxMaterial=ap(s,n,e)}return i}_compileMaterial(n){const e=new G(new sn,n);this._renderer.compile(e,Hi)}_sceneToCubeUV(n,e,o,i,s){const c=new wi(90,1,e,o),l=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(A0),d.toneMapping=_o,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new G(new Ye,new wt({name:"PMREM.Background",side:An,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,p=_.material;let g=!1;const x=n.background;x?x.isColor&&(p.color.copy(x),n.background=null,g=!0):(p.color.copy(A0),g=!0);for(let M=0;M<6;M++){const S=M%3;S===0?(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+f[M],s.y,s.z)):S===1?(c.up.set(0,0,l[M]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+f[M],s.z)):(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+f[M]));const T=this._cubeSize;gi(i,S*T,M>2?T:0,T,T),d.setRenderTarget(i),g&&d.render(_,c),d.render(n,c)}d.toneMapping=h,d.autoClear=u,n.background=x}_textureToCubeUV(n,e){const o=this._renderer,i=n.mapping===ns||n.mapping===Ti;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=C0()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=R0());const s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const r=s.uniforms;r.envMap.value=n;const c=this._cubeSize;gi(e,0,0,3*c,2*c),o.setRenderTarget(e),o.render(a,Hi)}_applyPMREM(n){const e=this._renderer,o=e.autoClear;e.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(n,s-1,s);e.autoClear=o}_applyGGXFilter(n,e,o){const i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,r=this._lodMeshes[o];r.material=a;const c=a.uniforms,l=o/(this._lodMeshes.length-1),f=e/(this._lodMeshes.length-1),d=Math.sqrt(l*l-f*f),u=0+l*1.25,h=d*u,{_lodMax:m}=this,_=this._sizeLods[o],p=3*_*(o>m-Xo?o-m+Xo:0),g=4*(this._cubeSize-_);c.envMap.value=n.texture,c.roughness.value=h,c.mipInt.value=m-e,gi(s,p,g,3*_,2*_),i.setRenderTarget(s),i.render(r,Hi),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=m-o,gi(n,p,g,3*_,2*_),i.setRenderTarget(n),i.render(r,Hi)}_blur(n,e,o,i,s){const a=this._pingPongRenderTarget;this._halfBlur(n,a,e,o,i,"latitudinal",s),this._halfBlur(a,n,o,o,i,"longitudinal",s)}_halfBlur(n,e,o,i,s,a,r){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ht("blur direction must be either latitudinal or longitudinal!");const f=3,d=this._lodMeshes[i];d.material=l;const u=l.uniforms,h=this._sizeLods[o]-1,m=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*oi-1),_=s/m,p=isFinite(s)?1+Math.floor(f*_):oi;p>oi&&Rt(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${oi}`);const g=[];let x=0;for(let y=0;y<oi;++y){const v=y/_,E=Math.exp(-v*v/2);g.push(E),y===0?x+=E:y<p&&(x+=2*E)}for(let y=0;y<g.length;y++)g[y]=g[y]/x;u.envMap.value=n.texture,u.samples.value=p,u.weights.value=g,u.latitudinal.value=a==="latitudinal",r&&(u.poleAxis.value=r);const{_lodMax:M}=this;u.dTheta.value=m,u.mipInt.value=M-o;const S=this._sizeLods[i],T=3*S*(i>M-Xo?i-M+Xo:0),w=4*(this._cubeSize-S);gi(e,T,w,3*S,2*S),c.setRenderTarget(e),c.render(d,Hi)}}function sp(t){const n=[],e=[],o=[];let i=t;const s=t-Xo+1+T0.length;for(let a=0;a<s;a++){const r=Math.pow(2,i);n.push(r);let c=1/r;a>t-Xo?c=T0[a-t+Xo-1]:a===0&&(c=0),e.push(c);const l=1/(r-2),f=-l,d=1+l,u=[f,f,d,f,d,d,f,f,d,d,f,d],h=6,m=6,_=3,p=2,g=1,x=new Float32Array(_*m*h),M=new Float32Array(p*m*h),S=new Float32Array(g*m*h);for(let w=0;w<h;w++){const y=w%3*2/3-1,v=w>2?0:-1,E=[y,v,0,y+2/3,v,0,y+2/3,v+1,0,y,v,0,y+2/3,v+1,0,y,v+1,0];x.set(E,_*m*w),M.set(u,p*m*w);const b=[w,w,w,w,w,w];S.set(b,g*m*w)}const T=new sn;T.setAttribute("position",new xt(x,_)),T.setAttribute("uv",new xt(M,p)),T.setAttribute("faceIndex",new xt(S,g)),o.push(new G(T,null)),i>Xo&&i--}return{lodMeshes:o,sizeLods:n,sigmas:e}}function P0(t,n,e){const o=new mn(t,n,e);return o.texture.mapping=zs,o.texture.name="PMREM.cubeUv",o.scissorTest=!0,o}function gi(t,n,e,o,i){t.viewport.set(n,e,o,i),t.scissor.set(n,e,o,i)}function ap(t,n,e){return new jt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:op,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ws(),fragmentShader:`

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
		`,blending:pn,depthTest:!1,depthWrite:!1})}function rp(t,n,e){const o=new Float32Array(oi),i=new Y(0,1,0);return new jt({name:"SphericalGaussianBlur",defines:{n:oi,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:o},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ws(),fragmentShader:`

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
		`,blending:pn,depthTest:!1,depthWrite:!1})}function R0(){return new jt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ws(),fragmentShader:`

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
		`,blending:pn,depthTest:!1,depthWrite:!1})}function C0(){return new jt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ws(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pn,depthTest:!1,depthWrite:!1})}function Ws(){return`

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
	`}class xl extends mn{constructor(n=1,e={}){super(n,n,e),this.isWebGLCubeRenderTarget=!0;const o={width:n,height:n,depth:1},i=[o,o,o,o,o,o];this.texture=new al(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(n,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const o={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ye(5,5,5),s=new jt({name:"CubemapFromEquirect",uniforms:Fa(o.uniforms),vertexShader:o.vertexShader,fragmentShader:o.fragmentShader,side:An,blending:pn});s.uniforms.tEquirect.value=e;const a=new G(i,s),r=e.minFilter;return e.minFilter===Ro&&(e.minFilter=yn),new Ef(1,10,this).update(n,a),e.minFilter=r,a.geometry.dispose(),a.material.dispose(),this}clear(n,e=!0,o=!0,i=!0){const s=n.getRenderTarget();for(let a=0;a<6;a++)n.setRenderTarget(this,a),n.clear(e,o,i);n.setRenderTarget(s)}}function cp(t){let n=new WeakMap,e=new WeakMap,o=null;function i(u,h=!1){return u==null?null:h?a(u):s(u)}function s(u){if(u&&u.isTexture){const h=u.mapping;if(h===la||h===da)if(n.has(u)){const m=n.get(u).texture;return r(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const _=new xl(m.height);return _.fromEquirectangularTexture(t,u),n.set(u,_),u.addEventListener("dispose",l),r(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const h=u.mapping,m=h===la||h===da,_=h===ns||h===Ti;if(m||_){let p=e.get(u);const g=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return o===null&&(o=new Va(t)),p=m?o.fromEquirectangular(u,p):o.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),p.texture;if(p!==void 0)return p.texture;{const x=u.image;return m&&x&&x.height>0||_&&x&&c(x)?(o===null&&(o=new Va(t)),p=m?o.fromEquirectangular(u):o.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),u.addEventListener("dispose",f),p.texture):null}}}return u}function r(u,h){return h===la?u.mapping=ns:h===da&&(u.mapping=Ti),u}function c(u){let h=0;const m=6;for(let _=0;_<m;_++)u[_]!==void 0&&h++;return h===m}function l(u){const h=u.target;h.removeEventListener("dispose",l);const m=n.get(h);m!==void 0&&(n.delete(h),m.dispose())}function f(u){const h=u.target;h.removeEventListener("dispose",f);const m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function d(){n=new WeakMap,e=new WeakMap,o!==null&&(o.dispose(),o=null)}return{get:i,dispose:d}}function lp(t){const n={};function e(o){if(n[o]!==void 0)return n[o];const i=t.getExtension(o);return n[o]=i,i}return{has:function(o){return e(o)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(o){const i=e(o);return i===null&&Fd("WebGLRenderer: "+o+" extension not supported."),i}}}function dp(t,n,e,o){const i={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&n.remove(u.index);for(const m in u.attributes)n.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete i[u.id];const h=s.get(u);h&&(n.remove(h),s.delete(u)),o.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function r(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const h in u)n.update(u[h],t.ARRAY_BUFFER)}function l(d){const u=[],h=d.index,m=d.attributes.position;let _=0;if(m===void 0)return;if(h!==null){const x=h.array;_=h.version;for(let M=0,S=x.length;M<S;M+=3){const T=x[M+0],w=x[M+1],y=x[M+2];u.push(T,w,w,y,y,T)}}else{const x=m.array;_=m.version;for(let M=0,S=x.length/3-1;M<S;M+=3){const T=M+0,w=M+1,y=M+2;u.push(T,w,w,y,y,T)}}const p=new(m.count>=65535?Tf:Af)(u,1);p.version=_;const g=s.get(d);g&&n.remove(g),s.set(d,p)}function f(d){const u=s.get(d);if(u){const h=d.index;h!==null&&u.version<h.version&&l(d)}else l(d);return s.get(d)}return{get:r,update:c,getWireframeAttribute:f}}function fp(t,n,e){let o;function i(d){o=d}let s,a;function r(d){s=d.type,a=d.bytesPerElement}function c(d,u){t.drawElements(o,u,s,d*a),e.update(u,o,1)}function l(d,u,h){h!==0&&(t.drawElementsInstanced(o,u,s,d*a,h),e.update(u,o,h))}function f(d,u,h){if(h===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(o,u,0,s,d,0,h);let _=0;for(let p=0;p<h;p++)_+=u[p];e.update(_,o,1)}this.setMode=i,this.setIndex=r,this.render=c,this.renderInstances=l,this.renderMultiDraw=f}function up(t){const n={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function o(s,a,r){switch(e.calls++,a){case t.TRIANGLES:e.triangles+=r*(s/3);break;case t.LINES:e.lines+=r*(s/2);break;case t.LINE_STRIP:e.lines+=r*(s-1);break;case t.LINE_LOOP:e.lines+=r*s;break;case t.POINTS:e.points+=r*s;break;default:Ht("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:n,render:e,programs:null,autoReset:!0,reset:i,update:o}}function hp(t,n,e){const o=new WeakMap,i=new wn;function s(a,r,c){const l=a.morphTargetInfluences,f=r.morphAttributes.position||r.morphAttributes.normal||r.morphAttributes.color,d=f!==void 0?f.length:0;let u=o.get(r);if(u===void 0||u.count!==d){let E=function(){y.dispose(),o.delete(r),r.removeEventListener("dispose",E)};u!==void 0&&u.texture.dispose();const h=r.morphAttributes.position!==void 0,m=r.morphAttributes.normal!==void 0,_=r.morphAttributes.color!==void 0,p=r.morphAttributes.position||[],g=r.morphAttributes.normal||[],x=r.morphAttributes.color||[];let M=0;h===!0&&(M=1),m===!0&&(M=2),_===!0&&(M=3);let S=r.attributes.position.count*M,T=1;S>n.maxTextureSize&&(T=Math.ceil(S/n.maxTextureSize),S=n.maxTextureSize);const w=new Float32Array(S*T*4*d),y=new il(w,S,T,d);y.type=Wo,y.needsUpdate=!0;const v=M*4;for(let b=0;b<d;b++){const A=p[b],R=g[b],L=x[b],I=S*T*4*b;for(let U=0;U<A.count;U++){const N=U*v;h===!0&&(i.fromBufferAttribute(A,U),w[I+N+0]=i.x,w[I+N+1]=i.y,w[I+N+2]=i.z,w[I+N+3]=0),m===!0&&(i.fromBufferAttribute(R,U),w[I+N+4]=i.x,w[I+N+5]=i.y,w[I+N+6]=i.z,w[I+N+7]=0),_===!0&&(i.fromBufferAttribute(L,U),w[I+N+8]=i.x,w[I+N+9]=i.y,w[I+N+10]=i.z,w[I+N+11]=L.itemSize===4?i.w:1)}}u={count:d,texture:y,size:new rt(S,T)},o.set(r,u),r.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(t,"morphTexture",a.morphTexture,e);else{let h=0;for(let _=0;_<l.length;_++)h+=l[_];const m=r.morphTargetsRelative?1:1-h;c.getUniforms().setValue(t,"morphTargetBaseInfluence",m),c.getUniforms().setValue(t,"morphTargetInfluences",l)}c.getUniforms().setValue(t,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function pp(t,n,e,o,i){let s=new WeakMap;function a(l){const f=i.render.frame,d=l.geometry,u=n.get(l,d);if(s.get(u)!==f&&(n.update(u),s.set(u,f)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==f&&(e.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,t.ARRAY_BUFFER),s.set(l,f))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==f&&(h.update(),s.set(h,f))}return u}function r(){s=new WeakMap}function c(l){const f=l.target;f.removeEventListener("dispose",c),o.releaseStatesOfObject(f),e.remove(f.instanceMatrix),f.instanceColor!==null&&e.remove(f.instanceColor)}return{update:a,dispose:r}}const mp={[dr]:"LINEAR_TONE_MAPPING",[lr]:"REINHARD_TONE_MAPPING",[cr]:"CINEON_TONE_MAPPING",[Hs]:"ACES_FILMIC_TONE_MAPPING",[rr]:"AGX_TONE_MAPPING",[ar]:"NEUTRAL_TONE_MAPPING",[sr]:"CUSTOM_TONE_MAPPING"};function gp(t,n,e,o,i){const s=new mn(n,e,{type:t,depthBuffer:o,stencilBuffer:i,depthTexture:o?new Ai(n,e):void 0}),a=new mn(n,e,{type:Tn,depthBuffer:!1,stencilBuffer:!1}),r=new sn;r.setAttribute("position",new Un([-1,3,0,-1,-1,0,3,-1,0],3)),r.setAttribute("uv",new Un([0,2,0,0,2,0],2));const c=new Xc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new G(r,c),f=new Bs(-1,1,1,-1,0,1);let d=null,u=null,h=!1,m,_=null,p=[],g=!1;this.setSize=function(x,M){s.setSize(x,M),a.setSize(x,M);for(let S=0;S<p.length;S++){const T=p[S];T.setSize&&T.setSize(x,M)}},this.setEffects=function(x){p=x,g=p.length>0&&p[0].isRenderPass===!0;const M=s.width,S=s.height;for(let T=0;T<p.length;T++){const w=p[T];w.setSize&&w.setSize(M,S)}},this.begin=function(x,M){if(h||x.toneMapping===_o&&p.length===0)return!1;if(_=M,M!==null){const S=M.width,T=M.height;(s.width!==S||s.height!==T)&&this.setSize(S,T)}return g===!1&&x.setRenderTarget(s),m=x.toneMapping,x.toneMapping=_o,!0},this.hasRenderPass=function(){return g},this.end=function(x,M){x.toneMapping=m,h=!0;let S=s,T=a;for(let w=0;w<p.length;w++){const y=p[w];if(y.enabled!==!1&&(y.render(x,T,S,M),y.needsSwap!==!1)){const v=S;S=T,T=v}}if(d!==x.outputColorSpace||u!==x.toneMapping){d=x.outputColorSpace,u=x.toneMapping,c.defines={},Vt.getTransfer(d)===Ft&&(c.defines.SRGB_TRANSFER="");const w=mp[u];w&&(c.defines[w]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=S.texture,x.setRenderTarget(_),x.render(l,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),r.dispose(),c.dispose()}}const _l=new Oa,Wa=new Ai(1,1),Ml=new il,bl=new Rf,Sl=new al,D0=[],I0=[],L0=new Float32Array(16),U0=new Float32Array(9),N0=new Float32Array(4);function Oi(t,n,e){const o=t[0];if(o<=0||o>0)return t;const i=n*e;let s=D0[i];if(s===void 0&&(s=new Float32Array(i),D0[i]=s),n!==0){o.toArray(s,0);for(let a=1,r=0;a!==n;++a)r+=e,t[a].toArray(s,r)}return s}function fn(t,n){if(t.length!==n.length)return!1;for(let e=0,o=t.length;e<o;e++)if(t[e]!==n[e])return!1;return!0}function un(t,n){for(let e=0,o=n.length;e<o;e++)t[e]=n[e]}function Xs(t,n){let e=I0[n];e===void 0&&(e=new Int32Array(n),I0[n]=e);for(let o=0;o!==n;++o)e[o]=t.allocateTextureUnit();return e}function vp(t,n){const e=this.cache;e[0]!==n&&(t.uniform1f(this.addr,n),e[0]=n)}function xp(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y)&&(t.uniform2f(this.addr,n.x,n.y),e[0]=n.x,e[1]=n.y);else{if(fn(e,n))return;t.uniform2fv(this.addr,n),un(e,n)}}function _p(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z)&&(t.uniform3f(this.addr,n.x,n.y,n.z),e[0]=n.x,e[1]=n.y,e[2]=n.z);else if(n.r!==void 0)(e[0]!==n.r||e[1]!==n.g||e[2]!==n.b)&&(t.uniform3f(this.addr,n.r,n.g,n.b),e[0]=n.r,e[1]=n.g,e[2]=n.b);else{if(fn(e,n))return;t.uniform3fv(this.addr,n),un(e,n)}}function Mp(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z||e[3]!==n.w)&&(t.uniform4f(this.addr,n.x,n.y,n.z,n.w),e[0]=n.x,e[1]=n.y,e[2]=n.z,e[3]=n.w);else{if(fn(e,n))return;t.uniform4fv(this.addr,n),un(e,n)}}function bp(t,n){const e=this.cache,o=n.elements;if(o===void 0){if(fn(e,n))return;t.uniformMatrix2fv(this.addr,!1,n),un(e,n)}else{if(fn(e,o))return;N0.set(o),t.uniformMatrix2fv(this.addr,!1,N0),un(e,o)}}function Sp(t,n){const e=this.cache,o=n.elements;if(o===void 0){if(fn(e,n))return;t.uniformMatrix3fv(this.addr,!1,n),un(e,n)}else{if(fn(e,o))return;U0.set(o),t.uniformMatrix3fv(this.addr,!1,U0),un(e,o)}}function wp(t,n){const e=this.cache,o=n.elements;if(o===void 0){if(fn(e,n))return;t.uniformMatrix4fv(this.addr,!1,n),un(e,n)}else{if(fn(e,o))return;L0.set(o),t.uniformMatrix4fv(this.addr,!1,L0),un(e,o)}}function yp(t,n){const e=this.cache;e[0]!==n&&(t.uniform1i(this.addr,n),e[0]=n)}function Ep(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y)&&(t.uniform2i(this.addr,n.x,n.y),e[0]=n.x,e[1]=n.y);else{if(fn(e,n))return;t.uniform2iv(this.addr,n),un(e,n)}}function Tp(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z)&&(t.uniform3i(this.addr,n.x,n.y,n.z),e[0]=n.x,e[1]=n.y,e[2]=n.z);else{if(fn(e,n))return;t.uniform3iv(this.addr,n),un(e,n)}}function Ap(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z||e[3]!==n.w)&&(t.uniform4i(this.addr,n.x,n.y,n.z,n.w),e[0]=n.x,e[1]=n.y,e[2]=n.z,e[3]=n.w);else{if(fn(e,n))return;t.uniform4iv(this.addr,n),un(e,n)}}function Pp(t,n){const e=this.cache;e[0]!==n&&(t.uniform1ui(this.addr,n),e[0]=n)}function Rp(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y)&&(t.uniform2ui(this.addr,n.x,n.y),e[0]=n.x,e[1]=n.y);else{if(fn(e,n))return;t.uniform2uiv(this.addr,n),un(e,n)}}function Cp(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z)&&(t.uniform3ui(this.addr,n.x,n.y,n.z),e[0]=n.x,e[1]=n.y,e[2]=n.z);else{if(fn(e,n))return;t.uniform3uiv(this.addr,n),un(e,n)}}function Dp(t,n){const e=this.cache;if(n.x!==void 0)(e[0]!==n.x||e[1]!==n.y||e[2]!==n.z||e[3]!==n.w)&&(t.uniform4ui(this.addr,n.x,n.y,n.z,n.w),e[0]=n.x,e[1]=n.y,e[2]=n.z,e[3]=n.w);else{if(fn(e,n))return;t.uniform4uiv(this.addr,n),un(e,n)}}function Ip(t,n,e){const o=this.cache,i=e.allocateTextureUnit();o[0]!==i&&(t.uniform1i(this.addr,i),o[0]=i);let s;this.type===t.SAMPLER_2D_SHADOW?(Wa.compareFunction=e.isReversedDepthBuffer()?or:ir,s=Wa):s=_l,e.setTexture2D(n||s,i)}function Lp(t,n,e){const o=this.cache,i=e.allocateTextureUnit();o[0]!==i&&(t.uniform1i(this.addr,i),o[0]=i),e.setTexture3D(n||bl,i)}function Up(t,n,e){const o=this.cache,i=e.allocateTextureUnit();o[0]!==i&&(t.uniform1i(this.addr,i),o[0]=i),e.setTextureCube(n||Sl,i)}function Np(t,n,e){const o=this.cache,i=e.allocateTextureUnit();o[0]!==i&&(t.uniform1i(this.addr,i),o[0]=i),e.setTexture2DArray(n||Ml,i)}function kp(t){switch(t){case 5126:return vp;case 35664:return xp;case 35665:return _p;case 35666:return Mp;case 35674:return bp;case 35675:return Sp;case 35676:return wp;case 5124:case 35670:return yp;case 35667:case 35671:return Ep;case 35668:case 35672:return Tp;case 35669:case 35673:return Ap;case 5125:return Pp;case 36294:return Rp;case 36295:return Cp;case 36296:return Dp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ip;case 35679:case 36299:case 36307:return Lp;case 35680:case 36300:case 36308:case 36293:return Up;case 36289:case 36303:case 36311:case 36292:return Np}}function Fp(t,n){t.uniform1fv(this.addr,n)}function Op(t,n){const e=Oi(n,this.size,2);t.uniform2fv(this.addr,e)}function Gp(t,n){const e=Oi(n,this.size,3);t.uniform3fv(this.addr,e)}function Bp(t,n){const e=Oi(n,this.size,4);t.uniform4fv(this.addr,e)}function zp(t,n){const e=Oi(n,this.size,4);t.uniformMatrix2fv(this.addr,!1,e)}function Hp(t,n){const e=Oi(n,this.size,9);t.uniformMatrix3fv(this.addr,!1,e)}function Vp(t,n){const e=Oi(n,this.size,16);t.uniformMatrix4fv(this.addr,!1,e)}function Wp(t,n){t.uniform1iv(this.addr,n)}function Xp(t,n){t.uniform2iv(this.addr,n)}function qp(t,n){t.uniform3iv(this.addr,n)}function Yp(t,n){t.uniform4iv(this.addr,n)}function Kp(t,n){t.uniform1uiv(this.addr,n)}function $p(t,n){t.uniform2uiv(this.addr,n)}function jp(t,n){t.uniform3uiv(this.addr,n)}function Zp(t,n){t.uniform4uiv(this.addr,n)}function Qp(t,n,e){const o=this.cache,i=n.length,s=Xs(e,i);fn(o,s)||(t.uniform1iv(this.addr,s),un(o,s));let a;this.type===t.SAMPLER_2D_SHADOW?a=Wa:a=_l;for(let r=0;r!==i;++r)e.setTexture2D(n[r]||a,s[r])}function Jp(t,n,e){const o=this.cache,i=n.length,s=Xs(e,i);fn(o,s)||(t.uniform1iv(this.addr,s),un(o,s));for(let a=0;a!==i;++a)e.setTexture3D(n[a]||bl,s[a])}function e2(t,n,e){const o=this.cache,i=n.length,s=Xs(e,i);fn(o,s)||(t.uniform1iv(this.addr,s),un(o,s));for(let a=0;a!==i;++a)e.setTextureCube(n[a]||Sl,s[a])}function t2(t,n,e){const o=this.cache,i=n.length,s=Xs(e,i);fn(o,s)||(t.uniform1iv(this.addr,s),un(o,s));for(let a=0;a!==i;++a)e.setTexture2DArray(n[a]||Ml,s[a])}function n2(t){switch(t){case 5126:return Fp;case 35664:return Op;case 35665:return Gp;case 35666:return Bp;case 35674:return zp;case 35675:return Hp;case 35676:return Vp;case 5124:case 35670:return Wp;case 35667:case 35671:return Xp;case 35668:case 35672:return qp;case 35669:case 35673:return Yp;case 5125:return Kp;case 36294:return $p;case 36295:return jp;case 36296:return Zp;case 35678:case 36198:case 36298:case 36306:case 35682:return Qp;case 35679:case 36299:case 36307:return Jp;case 35680:case 36300:case 36308:case 36293:return e2;case 36289:case 36303:case 36311:case 36292:return t2}}class o2{constructor(n,e,o){this.id=n,this.addr=o,this.cache=[],this.type=e.type,this.setValue=kp(e.type)}}class i2{constructor(n,e,o){this.id=n,this.addr=o,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=n2(e.type)}}class s2{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,e,o){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const r=i[s];r.setValue(n,e[r.id],o)}}}const va=/(\w+)(\])?(\[|\.)?/g;function k0(t,n){t.seq.push(n),t.map[n.id]=n}function a2(t,n,e){const o=t.name,i=o.length;for(va.lastIndex=0;;){const s=va.exec(o),a=va.lastIndex;let r=s[1];const c=s[2]==="]",l=s[3];if(c&&(r=r|0),l===void 0||l==="["&&a+2===i){k0(e,l===void 0?new o2(r,t,n):new i2(r,t,n));break}else{let d=e.map[r];d===void 0&&(d=new s2(r),k0(e,d)),e=d}}}class Ps{constructor(n,e){this.seq=[],this.map={};const o=n.getProgramParameter(e,n.ACTIVE_UNIFORMS);for(let a=0;a<o;++a){const r=n.getActiveUniform(e,a),c=n.getUniformLocation(e,r.name);a2(r,c,this)}const i=[],s=[];for(const a of this.seq)a.type===n.SAMPLER_2D_SHADOW||a.type===n.SAMPLER_CUBE_SHADOW||a.type===n.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(n,e,o,i){const s=this.map[e];s!==void 0&&s.setValue(n,o,i)}setOptional(n,e,o){const i=e[o];i!==void 0&&this.setValue(n,o,i)}static upload(n,e,o,i){for(let s=0,a=e.length;s!==a;++s){const r=e[s],c=o[r.id];c.needsUpdate!==!1&&r.setValue(n,c.value,i)}}static seqWithValue(n,e){const o=[];for(let i=0,s=n.length;i!==s;++i){const a=n[i];a.id in e&&o.push(a)}return o}}function F0(t,n,e){const o=t.createShader(n);return t.shaderSource(o,e),t.compileShader(o),o}const r2=37297;let c2=0;function l2(t,n){const e=t.split(`
`),o=[],i=Math.max(n-6,0),s=Math.min(n+6,e.length);for(let a=i;a<s;a++){const r=a+1;o.push(`${r===n?">":" "} ${r}: ${e[a]}`)}return o.join(`
`)}const O0=new Mt;function d2(t){Vt._getMatrix(O0,Vt.workingColorSpace,t);const n=`mat3( ${O0.elements.map(e=>e.toFixed(4))} )`;switch(Vt.getTransfer(t)){case rl:return[n,"LinearTransferOETF"];case Ft:return[n,"sRGBTransferOETF"];default:return Rt("WebGLProgram: Unsupported color space: ",t),[n,"LinearTransferOETF"]}}function G0(t,n,e){const o=t.getShaderParameter(n,t.COMPILE_STATUS),s=(t.getShaderInfoLog(n)||"").trim();if(o&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const r=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+l2(t.getShaderSource(n),r)}else return s}function f2(t,n){const e=d2(n);return[`vec4 ${t}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const u2={[dr]:"Linear",[lr]:"Reinhard",[cr]:"Cineon",[Hs]:"ACESFilmic",[rr]:"AgX",[ar]:"Neutral",[sr]:"Custom"};function h2(t,n){const e=u2[n];return e===void 0?(Rt("WebGLProgram: Unsupported toneMapping:",n),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const xs=new Y;function p2(){Vt.getLuminanceCoefficients(xs);const t=xs.x.toFixed(4),n=xs.y.toFixed(4),e=xs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${n}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function m2(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ji).join(`
`)}function g2(t){const n=[];for(const e in t){const o=t[e];o!==!1&&n.push("#define "+e+" "+o)}return n.join(`
`)}function v2(t,n){const e={},o=t.getProgramParameter(n,t.ACTIVE_ATTRIBUTES);for(let i=0;i<o;i++){const s=t.getActiveAttrib(n,i),a=s.name;let r=1;s.type===t.FLOAT_MAT2&&(r=2),s.type===t.FLOAT_MAT3&&(r=3),s.type===t.FLOAT_MAT4&&(r=4),e[a]={type:s.type,location:t.getAttribLocation(n,a),locationSize:r}}return e}function ji(t){return t!==""}function B0(t,n){const e=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function z0(t,n){return t.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const x2=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xa(t){return t.replace(x2,M2)}const _2=new Map;function M2(t,n){let e=dt[n];if(e===void 0){const o=_2.get(n);if(o!==void 0)e=dt[o],Rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,o);else throw new Error("Can not resolve #include <"+n+">")}return Xa(e)}const b2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function H0(t){return t.replace(b2,S2)}function S2(t,n,e,o){let i="";for(let s=parseInt(n);s<parseInt(e);s++)i+=o.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function V0(t){let n=`precision ${t.precision} float;
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
#define LOW_PRECISION`),n}const w2={[Zi]:"SHADOWMAP_TYPE_PCF",[$i]:"SHADOWMAP_TYPE_VSM"};function y2(t){return w2[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const E2={[ns]:"ENVMAP_TYPE_CUBE",[Ti]:"ENVMAP_TYPE_CUBE",[zs]:"ENVMAP_TYPE_CUBE_UV"};function T2(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":E2[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const A2={[Ti]:"ENVMAP_MODE_REFRACTION"};function P2(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":A2[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const R2={[Lf]:"ENVMAP_BLENDING_MULTIPLY",[If]:"ENVMAP_BLENDING_MIX",[Df]:"ENVMAP_BLENDING_ADD"};function C2(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":R2[t.combine]||"ENVMAP_BLENDING_NONE"}function D2(t){const n=t.envMapCubeUVHeight;if(n===null)return null;const e=Math.log2(n)-2,o=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:o,maxMip:e}}function I2(t,n,e,o){const i=t.getContext(),s=e.defines;let a=e.vertexShader,r=e.fragmentShader;const c=y2(e),l=T2(e),f=P2(e),d=C2(e),u=D2(e),h=m2(e),m=g2(s),_=i.createProgram();let p,g,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ji).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ji).join(`
`),g.length>0&&(g+=`
`)):(p=[V0(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ji).join(`
`),g=[V0(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+f:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==_o?"#define TONE_MAPPING":"",e.toneMapping!==_o?dt.tonemapping_pars_fragment:"",e.toneMapping!==_o?h2("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",dt.colorspace_pars_fragment,f2("linearToOutputTexel",e.outputColorSpace),p2(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ji).join(`
`)),a=Xa(a),a=B0(a,e),a=z0(a,e),r=Xa(r),r=B0(r,e),r=z0(r,e),a=H0(a),r=H0(r),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",e.glslVersion===_0?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===_0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const M=x+p+a,S=x+g+r,T=F0(i,i.VERTEX_SHADER,M),w=F0(i,i.FRAGMENT_SHADER,S);i.attachShader(_,T),i.attachShader(_,w),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function y(A){if(t.debug.checkShaderErrors){const R=i.getProgramInfoLog(_)||"",L=i.getShaderInfoLog(T)||"",I=i.getShaderInfoLog(w)||"",U=R.trim(),N=L.trim(),O=I.trim();let V=!0,X=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(V=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(i,_,T,w);else{const J=G0(i,T,"vertex"),W=G0(i,w,"fragment");Ht("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+U+`
`+J+`
`+W)}else U!==""?Rt("WebGLProgram: Program Info Log:",U):(N===""||O==="")&&(X=!1);X&&(A.diagnostics={runnable:V,programLog:U,vertexShader:{log:N,prefix:p},fragmentShader:{log:O,prefix:g}})}i.deleteShader(T),i.deleteShader(w),v=new Ps(i,_),E=v2(i,_)}let v;this.getUniforms=function(){return v===void 0&&y(this),v};let E;this.getAttributes=function(){return E===void 0&&y(this),E};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(_,r2)),b},this.destroy=function(){o.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=c2++,this.cacheKey=n,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=w,this}let L2=0;class U2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const e=n.vertexShader,o=n.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(o),a=this._getShaderCacheForMaterial(n);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(n){const e=this.materialCache.get(n);for(const o of e)o.usedTimes--,o.usedTimes===0&&this.shaderCache.delete(o.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const e=this.materialCache;let o=e.get(n);return o===void 0&&(o=new Set,e.set(n,o)),o}_getShaderStage(n){const e=this.shaderCache;let o=e.get(n);return o===void 0&&(o=new N2(n),e.set(n,o)),o}}class N2{constructor(n){this.id=L2++,this.code=n,this.usedTimes=0}}function k2(t){return t===Ci||t===Na||t===ka}function F2(t,n,e,o,i,s){const a=new Pf,r=new U2,c=new Set,l=[],f=new Map,d=o.logarithmicDepthBuffer;let u=o.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(v){return c.add(v),v===0?"uv":`uv${v}`}function _(v,E,b,A,R,L){const I=A.fog,U=R.geometry,N=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?A.environment:null,O=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,V=n.get(v.envMap||N,O),X=V&&V.mapping===zs?V.image.height:null,J=h[v.type];v.precision!==null&&(u=o.getMaxPrecision(v.precision),u!==v.precision&&Rt("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const W=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,k=W!==void 0?W.length:0;let ee=0;U.morphAttributes.position!==void 0&&(ee=1),U.morphAttributes.normal!==void 0&&(ee=2),U.morphAttributes.color!==void 0&&(ee=3);let ae,ue,z,j;if(J){const st=vo[J];ae=st.vertexShader,ue=st.fragmentShader}else ae=v.vertexShader,ue=v.fragmentShader,r.update(v),z=r.getVertexShaderID(v),j=r.getFragmentShaderID(v);const Z=t.getRenderTarget(),de=t.state.buffers.depth.getReversed(),be=R.isInstancedMesh===!0,Te=R.isBatchedMesh===!0,Ze=!!v.map,Xe=!!v.matcap,ct=!!V,it=!!v.aoMap,je=!!v.lightMap,Tt=!!v.bumpMap,At=!!v.normalMap,ln=!!v.displacementMap,B=!!v.emissiveMap,$t=!!v.metalnessMap,lt=!!v.roughnessMap,Pt=v.anisotropy>0,Ae=v.clearcoat>0,Gt=v.dispersion>0,D=v.iridescence>0,P=v.sheen>0,q=v.transmission>0,se=Pt&&!!v.anisotropyMap,he=Ae&&!!v.clearcoatMap,ve=Ae&&!!v.clearcoatNormalMap,Se=Ae&&!!v.clearcoatRoughnessMap,oe=D&&!!v.iridescenceMap,ce=D&&!!v.iridescenceThicknessMap,Ie=P&&!!v.sheenColorMap,Oe=P&&!!v.sheenRoughnessMap,_e=!!v.specularMap,xe=!!v.specularColorMap,Qe=!!v.specularIntensityMap,et=q&&!!v.transmissionMap,pt=q&&!!v.thicknessMap,F=!!v.gradientMap,Me=!!v.alphaMap,re=v.alphaTest>0,ke=!!v.alphaHash,Ee=!!v.extensions;let pe=_o;v.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(pe=t.toneMapping);const He={shaderID:J,shaderType:v.type,shaderName:v.name,vertexShader:ae,fragmentShader:ue,defines:v.defines,customVertexShaderID:z,customFragmentShaderID:j,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Te,batchingColor:Te&&R._colorsTexture!==null,instancing:be,instancingColor:be&&R.instanceColor!==null,instancingMorph:be&&R.morphTexture!==null,outputColorSpace:Z===null?t.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Vt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Ze,matcap:Xe,envMap:ct,envMapMode:ct&&V.mapping,envMapCubeUVHeight:X,aoMap:it,lightMap:je,bumpMap:Tt,normalMap:At,displacementMap:ln,emissiveMap:B,normalMapObjectSpace:At&&v.normalMapType===yf,normalMapTangentSpace:At&&v.normalMapType===v0,packedNormalMap:At&&v.normalMapType===v0&&k2(v.normalMap.format),metalnessMap:$t,roughnessMap:lt,anisotropy:Pt,anisotropyMap:se,clearcoat:Ae,clearcoatMap:he,clearcoatNormalMap:ve,clearcoatRoughnessMap:Se,dispersion:Gt,iridescence:D,iridescenceMap:oe,iridescenceThicknessMap:ce,sheen:P,sheenColorMap:Ie,sheenRoughnessMap:Oe,specularMap:_e,specularColorMap:xe,specularIntensityMap:Qe,transmission:q,transmissionMap:et,thicknessMap:pt,gradientMap:F,opaque:v.transparent===!1&&v.blending===As&&v.alphaToCoverage===!1,alphaMap:Me,alphaTest:re,alphaHash:ke,combine:v.combine,mapUv:Ze&&m(v.map.channel),aoMapUv:it&&m(v.aoMap.channel),lightMapUv:je&&m(v.lightMap.channel),bumpMapUv:Tt&&m(v.bumpMap.channel),normalMapUv:At&&m(v.normalMap.channel),displacementMapUv:ln&&m(v.displacementMap.channel),emissiveMapUv:B&&m(v.emissiveMap.channel),metalnessMapUv:$t&&m(v.metalnessMap.channel),roughnessMapUv:lt&&m(v.roughnessMap.channel),anisotropyMapUv:se&&m(v.anisotropyMap.channel),clearcoatMapUv:he&&m(v.clearcoatMap.channel),clearcoatNormalMapUv:ve&&m(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(v.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&m(v.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&m(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&m(v.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&m(v.sheenRoughnessMap.channel),specularMapUv:_e&&m(v.specularMap.channel),specularColorMapUv:xe&&m(v.specularColorMap.channel),specularIntensityMapUv:Qe&&m(v.specularIntensityMap.channel),transmissionMapUv:et&&m(v.transmissionMap.channel),thicknessMapUv:pt&&m(v.thicknessMap.channel),alphaMapUv:Me&&m(v.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(At||Pt),vertexNormals:!!U.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!U.attributes.uv&&(Ze||Me),fog:!!I,useFog:v.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||U.attributes.normal===void 0&&At===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:de,skinning:R.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:k,morphTextureStride:ee,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:L.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:t.shadowMap.enabled&&b.length>0,shadowMapType:t.shadowMap.type,toneMapping:pe,decodeVideoTexture:Ze&&v.map.isVideoTexture===!0&&Vt.getTransfer(v.map.colorSpace)===Ft,decodeVideoTextureEmissive:B&&v.emissiveMap.isVideoTexture===!0&&Vt.getTransfer(v.emissiveMap.colorSpace)===Ft,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===$e,flipSided:v.side===An,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ee&&v.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ee&&v.extensions.multiDraw===!0||Te)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return He.vertexUv1s=c.has(1),He.vertexUv2s=c.has(2),He.vertexUv3s=c.has(3),c.clear(),He}function p(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const b in v.defines)E.push(b),E.push(v.defines[b]);return v.isRawShaderMaterial===!1&&(g(E,v),x(E,v),E.push(t.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function g(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function x(v,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),v.push(a.mask)}function M(v){const E=h[v.type];let b;if(E){const A=vo[E];b=oo.clone(A.uniforms)}else b=v.uniforms;return b}function S(v,E){let b=f.get(E);return b!==void 0?++b.usedTimes:(b=new I2(t,E,v,i),l.push(b),f.set(E,b)),b}function T(v){if(--v.usedTimes===0){const E=l.indexOf(v);l[E]=l[l.length-1],l.pop(),f.delete(v.cacheKey),v.destroy()}}function w(v){r.remove(v)}function y(){r.dispose()}return{getParameters:_,getProgramCacheKey:p,getUniforms:M,acquireProgram:S,releaseProgram:T,releaseShaderCache:w,programs:l,dispose:y}}function O2(){let t=new WeakMap;function n(a){return t.has(a)}function e(a){let r=t.get(a);return r===void 0&&(r={},t.set(a,r)),r}function o(a){t.delete(a)}function i(a,r,c){t.get(a)[r]=c}function s(){t=new WeakMap}return{has:n,get:e,remove:o,update:i,dispose:s}}function G2(t,n){return t.groupOrder!==n.groupOrder?t.groupOrder-n.groupOrder:t.renderOrder!==n.renderOrder?t.renderOrder-n.renderOrder:t.material.id!==n.material.id?t.material.id-n.material.id:t.materialVariant!==n.materialVariant?t.materialVariant-n.materialVariant:t.z!==n.z?t.z-n.z:t.id-n.id}function W0(t,n){return t.groupOrder!==n.groupOrder?t.groupOrder-n.groupOrder:t.renderOrder!==n.renderOrder?t.renderOrder-n.renderOrder:t.z!==n.z?n.z-t.z:t.id-n.id}function X0(){const t=[];let n=0;const e=[],o=[],i=[];function s(){n=0,e.length=0,o.length=0,i.length=0}function a(u){let h=0;return u.isInstancedMesh&&(h+=2),u.isSkinnedMesh&&(h+=1),h}function r(u,h,m,_,p,g){let x=t[n];return x===void 0?(x={id:u.id,object:u,geometry:h,material:m,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:p,group:g},t[n]=x):(x.id=u.id,x.object=u,x.geometry=h,x.material=m,x.materialVariant=a(u),x.groupOrder=_,x.renderOrder=u.renderOrder,x.z=p,x.group=g),n++,x}function c(u,h,m,_,p,g){const x=r(u,h,m,_,p,g);m.transmission>0?o.push(x):m.transparent===!0?i.push(x):e.push(x)}function l(u,h,m,_,p,g){const x=r(u,h,m,_,p,g);m.transmission>0?o.unshift(x):m.transparent===!0?i.unshift(x):e.unshift(x)}function f(u,h){e.length>1&&e.sort(u||G2),o.length>1&&o.sort(h||W0),i.length>1&&i.sort(h||W0)}function d(){for(let u=n,h=t.length;u<h;u++){const m=t[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:o,transparent:i,init:s,push:c,unshift:l,finish:d,sort:f}}function B2(){let t=new WeakMap;function n(o,i){const s=t.get(o);let a;return s===void 0?(a=new X0,t.set(o,[a])):i>=s.length?(a=new X0,s.push(a)):a=s[i],a}function e(){t=new WeakMap}return{get:n,dispose:e}}function z2(){const t={};return{get:function(n){if(t[n.id]!==void 0)return t[n.id];let e;switch(n.type){case"DirectionalLight":e={direction:new Y,color:new te};break;case"SpotLight":e={position:new Y,direction:new Y,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new Y,color:new te,distance:0,decay:0};break;case"HemisphereLight":e={direction:new Y,skyColor:new te,groundColor:new te};break;case"RectAreaLight":e={color:new te,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return t[n.id]=e,e}}}function H2(){const t={};return{get:function(n){if(t[n.id]!==void 0)return t[n.id];let e;switch(n.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[n.id]=e,e}}}let V2=0;function W2(t,n){return(n.castShadow?2:0)-(t.castShadow?2:0)+(n.map?1:0)-(t.map?1:0)}function X2(t){const n=new z2,e=H2(),o={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)o.probe.push(new Y);const i=new Y,s=new ot,a=new ot;function r(l){let f=0,d=0,u=0;for(let E=0;E<9;E++)o.probe[E].set(0,0,0);let h=0,m=0,_=0,p=0,g=0,x=0,M=0,S=0,T=0,w=0,y=0;l.sort(W2);for(let E=0,b=l.length;E<b;E++){const A=l[E],R=A.color,L=A.intensity,I=A.distance;let U=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===Ci?U=A.shadow.map.texture:U=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)f+=R.r*L,d+=R.g*L,u+=R.b*L;else if(A.isLightProbe){for(let N=0;N<9;N++)o.probe[N].addScaledVector(A.sh.coefficients[N],L);y++}else if(A.isDirectionalLight){const N=n.get(A);if(N.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const O=A.shadow,V=e.get(A);V.shadowIntensity=O.intensity,V.shadowBias=O.bias,V.shadowNormalBias=O.normalBias,V.shadowRadius=O.radius,V.shadowMapSize=O.mapSize,o.directionalShadow[h]=V,o.directionalShadowMap[h]=U,o.directionalShadowMatrix[h]=A.shadow.matrix,x++}o.directional[h]=N,h++}else if(A.isSpotLight){const N=n.get(A);N.position.setFromMatrixPosition(A.matrixWorld),N.color.copy(R).multiplyScalar(L),N.distance=I,N.coneCos=Math.cos(A.angle),N.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),N.decay=A.decay,o.spot[_]=N;const O=A.shadow;if(A.map&&(o.spotLightMap[T]=A.map,T++,O.updateMatrices(A),A.castShadow&&w++),o.spotLightMatrix[_]=O.matrix,A.castShadow){const V=e.get(A);V.shadowIntensity=O.intensity,V.shadowBias=O.bias,V.shadowNormalBias=O.normalBias,V.shadowRadius=O.radius,V.shadowMapSize=O.mapSize,o.spotShadow[_]=V,o.spotShadowMap[_]=U,S++}_++}else if(A.isRectAreaLight){const N=n.get(A);N.color.copy(R).multiplyScalar(L),N.halfWidth.set(A.width*.5,0,0),N.halfHeight.set(0,A.height*.5,0),o.rectArea[p]=N,p++}else if(A.isPointLight){const N=n.get(A);if(N.color.copy(A.color).multiplyScalar(A.intensity),N.distance=A.distance,N.decay=A.decay,A.castShadow){const O=A.shadow,V=e.get(A);V.shadowIntensity=O.intensity,V.shadowBias=O.bias,V.shadowNormalBias=O.normalBias,V.shadowRadius=O.radius,V.shadowMapSize=O.mapSize,V.shadowCameraNear=O.camera.near,V.shadowCameraFar=O.camera.far,o.pointShadow[m]=V,o.pointShadowMap[m]=U,o.pointShadowMatrix[m]=A.shadow.matrix,M++}o.point[m]=N,m++}else if(A.isHemisphereLight){const N=n.get(A);N.skyColor.copy(A.color).multiplyScalar(L),N.groundColor.copy(A.groundColor).multiplyScalar(L),o.hemi[g]=N,g++}}p>0&&(t.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=De.LTC_FLOAT_1,o.rectAreaLTC2=De.LTC_FLOAT_2):(o.rectAreaLTC1=De.LTC_HALF_1,o.rectAreaLTC2=De.LTC_HALF_2)),o.ambient[0]=f,o.ambient[1]=d,o.ambient[2]=u;const v=o.hash;(v.directionalLength!==h||v.pointLength!==m||v.spotLength!==_||v.rectAreaLength!==p||v.hemiLength!==g||v.numDirectionalShadows!==x||v.numPointShadows!==M||v.numSpotShadows!==S||v.numSpotMaps!==T||v.numLightProbes!==y)&&(o.directional.length=h,o.spot.length=_,o.rectArea.length=p,o.point.length=m,o.hemi.length=g,o.directionalShadow.length=x,o.directionalShadowMap.length=x,o.pointShadow.length=M,o.pointShadowMap.length=M,o.spotShadow.length=S,o.spotShadowMap.length=S,o.directionalShadowMatrix.length=x,o.pointShadowMatrix.length=M,o.spotLightMatrix.length=S+T-w,o.spotLightMap.length=T,o.numSpotLightShadowsWithMaps=w,o.numLightProbes=y,v.directionalLength=h,v.pointLength=m,v.spotLength=_,v.rectAreaLength=p,v.hemiLength=g,v.numDirectionalShadows=x,v.numPointShadows=M,v.numSpotShadows=S,v.numSpotMaps=T,v.numLightProbes=y,o.version=V2++)}function c(l,f){let d=0,u=0,h=0,m=0,_=0;const p=f.matrixWorldInverse;for(let g=0,x=l.length;g<x;g++){const M=l[g];if(M.isDirectionalLight){const S=o.directional[d];S.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(p),d++}else if(M.isSpotLight){const S=o.spot[h];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(p),h++}else if(M.isRectAreaLight){const S=o.rectArea[m];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(p),a.identity(),s.copy(M.matrixWorld),s.premultiply(p),a.extractRotation(s),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),m++}else if(M.isPointLight){const S=o.point[u];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(p),u++}else if(M.isHemisphereLight){const S=o.hemi[_];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(p),_++}}}return{setup:r,setupView:c,state:o}}function q0(t){const n=new X2(t),e=[],o=[],i=[];function s(u){d.camera=u,e.length=0,o.length=0,i.length=0}function a(u){e.push(u)}function r(u){o.push(u)}function c(u){i.push(u)}function l(){n.setup(e)}function f(u){n.setupView(e,u)}const d={lightsArray:e,shadowsArray:o,lightProbeGridArray:i,camera:null,lights:n,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:l,setupLightsView:f,pushLight:a,pushShadow:r,pushLightProbeGrid:c}}function q2(t){let n=new WeakMap;function e(i,s=0){const a=n.get(i);let r;return a===void 0?(r=new q0(t),n.set(i,[r])):s>=a.length?(r=new q0(t),a.push(r)):r=a[s],r}function o(){n=new WeakMap}return{get:e,dispose:o}}const Y2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,K2=`uniform sampler2D shadow_pass;
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
}`,$2=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],j2=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],Y0=new ot,Vi=new Y,xa=new Y;function Z2(t,n,e){let o=new Wc;const i=new rt,s=new rt,a=new wn,r=new sf,c=new af,l={},f=e.maxTextureSize,d={[Ei]:An,[An]:Ei,[$e]:$e},u=new jt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:Y2,fragmentShader:K2}),h=u.clone();h.defines.HORIZONTAL_PASS=1;const m=new sn;m.setAttribute("position",new xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new G(m,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zi;let g=this.type;this.render=function(w,y,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;this.type===$c&&(Rt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Zi);const E=t.getRenderTarget(),b=t.getActiveCubeFace(),A=t.getActiveMipmapLevel(),R=t.state;R.setBlending(pn),R.buffers.depth.getReversed()===!0?R.buffers.color.setClear(0,0,0,0):R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);const L=g!==this.type;L&&y.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(U=>U.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,U=w.length;I<U;I++){const N=w[I],O=N.shadow;if(O===void 0){Rt("WebGLShadowMap:",N,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;i.copy(O.mapSize);const V=O.getFrameExtents();i.multiply(V),s.copy(O.mapSize),(i.x>f||i.y>f)&&(i.x>f&&(s.x=Math.floor(f/V.x),i.x=s.x*V.x,O.mapSize.x=s.x),i.y>f&&(s.y=Math.floor(f/V.y),i.y=s.y*V.y,O.mapSize.y=s.y));const X=t.state.buffers.depth.getReversed();if(O.camera._reversedDepth=X,O.map===null||L===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===$i){if(N.isPointLight){Rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new mn(i.x,i.y,{format:Ci,type:Tn,minFilter:yn,magFilter:yn,generateMipmaps:!1}),O.map.texture.name=N.name+".shadowMap",O.map.depthTexture=new Ai(i.x,i.y,Wo),O.map.depthTexture.name=N.name+".shadowMapDepth",O.map.depthTexture.format=Pi,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=so,O.map.depthTexture.magFilter=so}else N.isPointLight?(O.map=new xl(i.x),O.map.depthTexture=new rf(i.x,ri)):(O.map=new mn(i.x,i.y),O.map.depthTexture=new Ai(i.x,i.y,ri)),O.map.depthTexture.name=N.name+".shadowMap",O.map.depthTexture.format=Pi,this.type===Zi?(O.map.depthTexture.compareFunction=X?or:ir,O.map.depthTexture.minFilter=yn,O.map.depthTexture.magFilter=yn):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=so,O.map.depthTexture.magFilter=so);O.camera.updateProjectionMatrix()}const J=O.map.isWebGLCubeRenderTarget?6:1;for(let W=0;W<J;W++){if(O.map.isWebGLCubeRenderTarget)t.setRenderTarget(O.map,W),t.clear();else{W===0&&(t.setRenderTarget(O.map),t.clear());const k=O.getViewport(W);a.set(s.x*k.x,s.y*k.y,s.x*k.z,s.y*k.w),R.viewport(a)}if(N.isPointLight){const k=O.camera,ee=O.matrix,ae=N.distance||k.far;ae!==k.far&&(k.far=ae,k.updateProjectionMatrix()),Vi.setFromMatrixPosition(N.matrixWorld),k.position.copy(Vi),xa.copy(k.position),xa.add($2[W]),k.up.copy(j2[W]),k.lookAt(xa),k.updateMatrixWorld(),ee.makeTranslation(-Vi.x,-Vi.y,-Vi.z),Y0.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),O._frustum.setFromProjectionMatrix(Y0,k.coordinateSystem,k.reversedDepth)}else O.updateMatrices(N);o=O.getFrustum(),S(y,v,O.camera,N,this.type)}O.isPointLightShadow!==!0&&this.type===$i&&x(O,v),O.needsUpdate=!1}g=this.type,p.needsUpdate=!1,t.setRenderTarget(E,b,A)};function x(w,y){const v=n.update(_);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,h.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,h.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new mn(i.x,i.y,{format:Ci,type:Tn})),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(y,null,v,u,_,null),h.uniforms.shadow_pass.value=w.mapPass.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(y,null,v,h,_,null)}function M(w,y,v,E){let b=null;const A=v.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(A!==void 0)b=A;else if(b=v.isPointLight===!0?c:r,t.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){const R=b.uuid,L=y.uuid;let I=l[R];I===void 0&&(I={},l[R]=I);let U=I[L];U===void 0&&(U=b.clone(),I[L]=U,y.addEventListener("dispose",T)),b=U}if(b.visible=y.visible,b.wireframe=y.wireframe,E===$i?b.side=y.shadowSide!==null?y.shadowSide:y.side:b.side=y.shadowSide!==null?y.shadowSide:d[y.side],b.alphaMap=y.alphaMap,b.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,b.map=y.map,b.clipShadows=y.clipShadows,b.clippingPlanes=y.clippingPlanes,b.clipIntersection=y.clipIntersection,b.displacementMap=y.displacementMap,b.displacementScale=y.displacementScale,b.displacementBias=y.displacementBias,b.wireframeLinewidth=y.wireframeLinewidth,b.linewidth=y.linewidth,v.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const R=t.properties.get(b);R.light=v}return b}function S(w,y,v,E,b){if(w.visible===!1)return;if(w.layers.test(y.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===$i)&&(!w.frustumCulled||o.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,w.matrixWorld);const L=n.update(w),I=w.material;if(Array.isArray(I)){const U=L.groups;for(let N=0,O=U.length;N<O;N++){const V=U[N],X=I[V.materialIndex];if(X&&X.visible){const J=M(w,X,E,b);w.onBeforeShadow(t,w,y,v,L,J,V),t.renderBufferDirect(v,null,L,J,w,V),w.onAfterShadow(t,w,y,v,L,J,V)}}}else if(I.visible){const U=M(w,I,E,b);w.onBeforeShadow(t,w,y,v,L,U,null),t.renderBufferDirect(v,null,L,U,w,null),w.onAfterShadow(t,w,y,v,L,U,null)}}const R=w.children;for(let L=0,I=R.length;L<I;L++)S(R[L],y,v,E,b)}function T(w){w.target.removeEventListener("dispose",T);for(const v in l){const E=l[v],b=w.target.uuid;b in E&&(E[b].dispose(),delete E[b])}}}function Q2(t,n){function e(){let F=!1;const Me=new wn;let re=null;const ke=new wn(0,0,0,0);return{setMask:function(Ee){re!==Ee&&!F&&(t.colorMask(Ee,Ee,Ee,Ee),re=Ee)},setLocked:function(Ee){F=Ee},setClear:function(Ee,pe,He,st,en){en===!0&&(Ee*=st,pe*=st,He*=st),Me.set(Ee,pe,He,st),ke.equals(Me)===!1&&(t.clearColor(Ee,pe,He,st),ke.copy(Me))},reset:function(){F=!1,re=null,ke.set(-1,0,0,0)}}}function o(){let F=!1,Me=!1,re=null,ke=null,Ee=null;return{setReversed:function(pe){if(Me!==pe){const He=n.get("EXT_clip_control");pe?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT),Me=pe;const st=Ee;Ee=null,this.setClear(st)}},getReversed:function(){return Me},setTest:function(pe){pe?Z(t.DEPTH_TEST):de(t.DEPTH_TEST)},setMask:function(pe){re!==pe&&!F&&(t.depthMask(pe),re=pe)},setFunc:function(pe){if(Me&&(pe=Uf[pe]),ke!==pe){switch(pe){case bf:t.depthFunc(t.NEVER);break;case Mf:t.depthFunc(t.ALWAYS);break;case _f:t.depthFunc(t.LESS);break;case Fr:t.depthFunc(t.LEQUAL);break;case xf:t.depthFunc(t.EQUAL);break;case vf:t.depthFunc(t.GEQUAL);break;case gf:t.depthFunc(t.GREATER);break;case mf:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ke=pe}},setLocked:function(pe){F=pe},setClear:function(pe){Ee!==pe&&(Ee=pe,Me&&(pe=1-pe),t.clearDepth(pe))},reset:function(){F=!1,re=null,ke=null,Ee=null,Me=!1}}}function i(){let F=!1,Me=null,re=null,ke=null,Ee=null,pe=null,He=null,st=null,en=null;return{setTest:function(Ct){F||(Ct?Z(t.STENCIL_TEST):de(t.STENCIL_TEST))},setMask:function(Ct){Me!==Ct&&!F&&(t.stencilMask(Ct),Me=Ct)},setFunc:function(Ct,yo,uo){(re!==Ct||ke!==yo||Ee!==uo)&&(t.stencilFunc(Ct,yo,uo),re=Ct,ke=yo,Ee=uo)},setOp:function(Ct,yo,uo){(pe!==Ct||He!==yo||st!==uo)&&(t.stencilOp(Ct,yo,uo),pe=Ct,He=yo,st=uo)},setLocked:function(Ct){F=Ct},setClear:function(Ct){en!==Ct&&(t.clearStencil(Ct),en=Ct)},reset:function(){F=!1,Me=null,re=null,ke=null,Ee=null,pe=null,He=null,st=null,en=null}}}const s=new e,a=new o,r=new i,c=new WeakMap,l=new WeakMap;let f={},d={},u={},h=new WeakMap,m=[],_=null,p=!1,g=null,x=null,M=null,S=null,T=null,w=null,y=null,v=new te(0,0,0),E=0,b=!1,A=null,R=null,L=null,I=null,U=null;const N=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,V=0;const X=t.getParameter(t.VERSION);X.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(X)[1]),O=V>=1):X.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),O=V>=2);let J=null,W={};const k=t.getParameter(t.SCISSOR_BOX),ee=t.getParameter(t.VIEWPORT),ae=new wn().fromArray(k),ue=new wn().fromArray(ee);function z(F,Me,re,ke){const Ee=new Uint8Array(4),pe=t.createTexture();t.bindTexture(F,pe),t.texParameteri(F,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(F,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let He=0;He<re;He++)F===t.TEXTURE_3D||F===t.TEXTURE_2D_ARRAY?t.texImage3D(Me,0,t.RGBA,1,1,ke,0,t.RGBA,t.UNSIGNED_BYTE,Ee):t.texImage2D(Me+He,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Ee);return pe}const j={};j[t.TEXTURE_2D]=z(t.TEXTURE_2D,t.TEXTURE_2D,1),j[t.TEXTURE_CUBE_MAP]=z(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[t.TEXTURE_2D_ARRAY]=z(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),j[t.TEXTURE_3D]=z(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),r.setClear(0),Z(t.DEPTH_TEST),a.setFunc(Fr),Tt(!1),At(p0),Z(t.CULL_FACE),it(pn);function Z(F){f[F]!==!0&&(t.enable(F),f[F]=!0)}function de(F){f[F]!==!1&&(t.disable(F),f[F]=!1)}function be(F,Me){return u[F]!==Me?(t.bindFramebuffer(F,Me),u[F]=Me,F===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=Me),F===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=Me),!0):!1}function Te(F,Me){let re=m,ke=!1;if(F){re=h.get(Me),re===void 0&&(re=[],h.set(Me,re));const Ee=F.textures;if(re.length!==Ee.length||re[0]!==t.COLOR_ATTACHMENT0){for(let pe=0,He=Ee.length;pe<He;pe++)re[pe]=t.COLOR_ATTACHMENT0+pe;re.length=Ee.length,ke=!0}}else re[0]!==t.BACK&&(re[0]=t.BACK,ke=!0);ke&&t.drawBuffers(re)}function Ze(F){return _!==F?(t.useProgram(F),_=F,!0):!1}const Xe={[Po]:t.FUNC_ADD,[Gd]:t.FUNC_SUBTRACT,[Od]:t.FUNC_REVERSE_SUBTRACT};Xe[Nf]=t.MIN,Xe[kf]=t.MAX;const ct={[Yi]:t.ZERO,[Zd]:t.ONE,[jd]:t.SRC_COLOR,[$d]:t.SRC_ALPHA,[Kd]:t.SRC_ALPHA_SATURATE,[Ua]:t.DST_COLOR,[La]:t.DST_ALPHA,[Yd]:t.ONE_MINUS_SRC_COLOR,[qd]:t.ONE_MINUS_SRC_ALPHA,[Xd]:t.ONE_MINUS_DST_COLOR,[Wd]:t.ONE_MINUS_DST_ALPHA,[Vd]:t.CONSTANT_COLOR,[Hd]:t.ONE_MINUS_CONSTANT_COLOR,[zd]:t.CONSTANT_ALPHA,[Bd]:t.ONE_MINUS_CONSTANT_ALPHA};function it(F,Me,re,ke,Ee,pe,He,st,en,Ct){if(F===pn){p===!0&&(de(t.BLEND),p=!1);return}if(p===!1&&(Z(t.BLEND),p=!0),F!==ol){if(F!==g||Ct!==b){if((x!==Po||T!==Po)&&(t.blendEquation(t.FUNC_ADD),x=Po,T=Po),Ct)switch(F){case As:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case si:t.blendFunc(t.ONE,t.ONE);break;case g0:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case m0:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:Ht("WebGLState: Invalid blending: ",F);break}else switch(F){case As:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case si:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case g0:Ht("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case m0:Ht("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ht("WebGLState: Invalid blending: ",F);break}M=null,S=null,w=null,y=null,v.set(0,0,0),E=0,g=F,b=Ct}return}Ee=Ee||Me,pe=pe||re,He=He||ke,(Me!==x||Ee!==T)&&(t.blendEquationSeparate(Xe[Me],Xe[Ee]),x=Me,T=Ee),(re!==M||ke!==S||pe!==w||He!==y)&&(t.blendFuncSeparate(ct[re],ct[ke],ct[pe],ct[He]),M=re,S=ke,w=pe,y=He),(st.equals(v)===!1||en!==E)&&(t.blendColor(st.r,st.g,st.b,en),v.copy(st),E=en),g=F,b=!1}function je(F,Me){F.side===$e?de(t.CULL_FACE):Z(t.CULL_FACE);let re=F.side===An;Me&&(re=!re),Tt(re),F.blending===As&&F.transparent===!1?it(pn):it(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),s.setMask(F.colorWrite);const ke=F.stencilWrite;r.setTest(ke),ke&&(r.setMask(F.stencilWriteMask),r.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),r.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),B(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?Z(t.SAMPLE_ALPHA_TO_COVERAGE):de(t.SAMPLE_ALPHA_TO_COVERAGE)}function Tt(F){A!==F&&(F?t.frontFace(t.CW):t.frontFace(t.CCW),A=F)}function At(F){F!==Sf?(Z(t.CULL_FACE),F!==R&&(F===p0?t.cullFace(t.BACK):F===wf?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):de(t.CULL_FACE),R=F}function ln(F){F!==L&&(O&&t.lineWidth(F),L=F)}function B(F,Me,re){F?(Z(t.POLYGON_OFFSET_FILL),(I!==Me||U!==re)&&(I=Me,U=re,a.getReversed()&&(Me=-Me),t.polygonOffset(Me,re))):de(t.POLYGON_OFFSET_FILL)}function $t(F){F?Z(t.SCISSOR_TEST):de(t.SCISSOR_TEST)}function lt(F){F===void 0&&(F=t.TEXTURE0+N-1),J!==F&&(t.activeTexture(F),J=F)}function Pt(F,Me,re){re===void 0&&(J===null?re=t.TEXTURE0+N-1:re=J);let ke=W[re];ke===void 0&&(ke={type:void 0,texture:void 0},W[re]=ke),(ke.type!==F||ke.texture!==Me)&&(J!==re&&(t.activeTexture(re),J=re),t.bindTexture(F,Me||j[F]),ke.type=F,ke.texture=Me)}function Ae(){const F=W[J];F!==void 0&&F.type!==void 0&&(t.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Gt(){try{t.compressedTexImage2D(...arguments)}catch(F){Ht("WebGLState:",F)}}function D(){try{t.compressedTexImage3D(...arguments)}catch(F){Ht("WebGLState:",F)}}function P(){try{t.texSubImage2D(...arguments)}catch(F){Ht("WebGLState:",F)}}function q(){try{t.texSubImage3D(...arguments)}catch(F){Ht("WebGLState:",F)}}function se(){try{t.compressedTexSubImage2D(...arguments)}catch(F){Ht("WebGLState:",F)}}function he(){try{t.compressedTexSubImage3D(...arguments)}catch(F){Ht("WebGLState:",F)}}function ve(){try{t.texStorage2D(...arguments)}catch(F){Ht("WebGLState:",F)}}function Se(){try{t.texStorage3D(...arguments)}catch(F){Ht("WebGLState:",F)}}function oe(){try{t.texImage2D(...arguments)}catch(F){Ht("WebGLState:",F)}}function ce(){try{t.texImage3D(...arguments)}catch(F){Ht("WebGLState:",F)}}function Ie(F){return d[F]!==void 0?d[F]:t.getParameter(F)}function Oe(F,Me){d[F]!==Me&&(t.pixelStorei(F,Me),d[F]=Me)}function _e(F){ae.equals(F)===!1&&(t.scissor(F.x,F.y,F.z,F.w),ae.copy(F))}function xe(F){ue.equals(F)===!1&&(t.viewport(F.x,F.y,F.z,F.w),ue.copy(F))}function Qe(F,Me){let re=l.get(Me);re===void 0&&(re=new WeakMap,l.set(Me,re));let ke=re.get(F);ke===void 0&&(ke=t.getUniformBlockIndex(Me,F.name),re.set(F,ke))}function et(F,Me){const ke=l.get(Me).get(F);c.get(Me)!==ke&&(t.uniformBlockBinding(Me,ke,F.__bindingPointIndex),c.set(Me,ke))}function pt(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),f={},d={},J=null,W={},u={},h=new WeakMap,m=[],_=null,p=!1,g=null,x=null,M=null,S=null,T=null,w=null,y=null,v=new te(0,0,0),E=0,b=!1,A=null,R=null,L=null,I=null,U=null,ae.set(0,0,t.canvas.width,t.canvas.height),ue.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),r.reset()}return{buffers:{color:s,depth:a,stencil:r},enable:Z,disable:de,bindFramebuffer:be,drawBuffers:Te,useProgram:Ze,setBlending:it,setMaterial:je,setFlipSided:Tt,setCullFace:At,setLineWidth:ln,setPolygonOffset:B,setScissorTest:$t,activeTexture:lt,bindTexture:Pt,unbindTexture:Ae,compressedTexImage2D:Gt,compressedTexImage3D:D,texImage2D:oe,texImage3D:ce,pixelStorei:Oe,getParameter:Ie,updateUBOMapping:Qe,uniformBlockBinding:et,texStorage2D:ve,texStorage3D:Se,texSubImage2D:P,texSubImage3D:q,compressedTexSubImage2D:se,compressedTexSubImage3D:he,scissor:_e,viewport:xe,reset:pt}}function J2(t,n,e,o,i,s,a){const r=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new rt,f=new WeakMap,d=new Set;let u;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(D,P){return m?new OffscreenCanvas(D,P):Cf("canvas")}function p(D,P,q){let se=1;const he=Gt(D);if((he.width>q||he.height>q)&&(se=q/Math.max(he.width,he.height)),se<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const ve=Math.floor(se*he.width),Se=Math.floor(se*he.height);u===void 0&&(u=_(ve,Se));const oe=P?_(ve,Se):u;return oe.width=ve,oe.height=Se,oe.getContext("2d").drawImage(D,0,0,ve,Se),Rt("WebGLRenderer: Texture has been resized from ("+he.width+"x"+he.height+") to ("+ve+"x"+Se+")."),oe}else return"data"in D&&Rt("WebGLRenderer: Image in DataTexture is too big ("+he.width+"x"+he.height+")."),D;return D}function g(D){return D.generateMipmaps}function x(D){t.generateMipmap(D)}function M(D){return D.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?t.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function S(D,P,q,se,he,ve=!1){if(D!==null){if(t[D]!==void 0)return t[D];Rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Se;se&&(Se=n.get("EXT_texture_norm16"),Se||Rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let oe=P;if(P===t.RED&&(q===t.FLOAT&&(oe=t.R32F),q===t.HALF_FLOAT&&(oe=t.R16F),q===t.UNSIGNED_BYTE&&(oe=t.R8),q===t.UNSIGNED_SHORT&&Se&&(oe=Se.R16_EXT),q===t.SHORT&&Se&&(oe=Se.R16_SNORM_EXT)),P===t.RED_INTEGER&&(q===t.UNSIGNED_BYTE&&(oe=t.R8UI),q===t.UNSIGNED_SHORT&&(oe=t.R16UI),q===t.UNSIGNED_INT&&(oe=t.R32UI),q===t.BYTE&&(oe=t.R8I),q===t.SHORT&&(oe=t.R16I),q===t.INT&&(oe=t.R32I)),P===t.RG&&(q===t.FLOAT&&(oe=t.RG32F),q===t.HALF_FLOAT&&(oe=t.RG16F),q===t.UNSIGNED_BYTE&&(oe=t.RG8),q===t.UNSIGNED_SHORT&&Se&&(oe=Se.RG16_EXT),q===t.SHORT&&Se&&(oe=Se.RG16_SNORM_EXT)),P===t.RG_INTEGER&&(q===t.UNSIGNED_BYTE&&(oe=t.RG8UI),q===t.UNSIGNED_SHORT&&(oe=t.RG16UI),q===t.UNSIGNED_INT&&(oe=t.RG32UI),q===t.BYTE&&(oe=t.RG8I),q===t.SHORT&&(oe=t.RG16I),q===t.INT&&(oe=t.RG32I)),P===t.RGB_INTEGER&&(q===t.UNSIGNED_BYTE&&(oe=t.RGB8UI),q===t.UNSIGNED_SHORT&&(oe=t.RGB16UI),q===t.UNSIGNED_INT&&(oe=t.RGB32UI),q===t.BYTE&&(oe=t.RGB8I),q===t.SHORT&&(oe=t.RGB16I),q===t.INT&&(oe=t.RGB32I)),P===t.RGBA_INTEGER&&(q===t.UNSIGNED_BYTE&&(oe=t.RGBA8UI),q===t.UNSIGNED_SHORT&&(oe=t.RGBA16UI),q===t.UNSIGNED_INT&&(oe=t.RGBA32UI),q===t.BYTE&&(oe=t.RGBA8I),q===t.SHORT&&(oe=t.RGBA16I),q===t.INT&&(oe=t.RGBA32I)),P===t.RGB&&(q===t.UNSIGNED_SHORT&&Se&&(oe=Se.RGB16_EXT),q===t.SHORT&&Se&&(oe=Se.RGB16_SNORM_EXT),q===t.UNSIGNED_INT_5_9_9_9_REV&&(oe=t.RGB9_E5),q===t.UNSIGNED_INT_10F_11F_11F_REV&&(oe=t.R11F_G11F_B10F)),P===t.RGBA){const ce=ve?rl:Vt.getTransfer(he);q===t.FLOAT&&(oe=t.RGBA32F),q===t.HALF_FLOAT&&(oe=t.RGBA16F),q===t.UNSIGNED_BYTE&&(oe=ce===Ft?t.SRGB8_ALPHA8:t.RGBA8),q===t.UNSIGNED_SHORT&&Se&&(oe=Se.RGBA16_EXT),q===t.SHORT&&Se&&(oe=Se.RGBA16_SNORM_EXT),q===t.UNSIGNED_SHORT_4_4_4_4&&(oe=t.RGBA4),q===t.UNSIGNED_SHORT_5_5_5_1&&(oe=t.RGB5_A1)}return(oe===t.R16F||oe===t.R32F||oe===t.RG16F||oe===t.RG32F||oe===t.RGBA16F||oe===t.RGBA32F)&&n.get("EXT_color_buffer_float"),oe}function T(D,P){let q;return D?P===null||P===ri||P===Ri?q=t.DEPTH24_STENCIL8:P===Wo?q=t.DEPTH32F_STENCIL8:P===Ls&&(q=t.DEPTH24_STENCIL8,Rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):P===null||P===ri||P===Ri?q=t.DEPTH_COMPONENT24:P===Wo?q=t.DEPTH_COMPONENT32F:P===Ls&&(q=t.DEPTH_COMPONENT16),q}function w(D,P){return g(D)===!0||D.isFramebufferTexture&&D.minFilter!==so&&D.minFilter!==yn?Math.log2(Math.max(P.width,P.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?P.mipmaps.length:1}function y(D){const P=D.target;P.removeEventListener("dispose",y),E(P),P.isVideoTexture&&f.delete(P),P.isHTMLTexture&&d.delete(P)}function v(D){const P=D.target;P.removeEventListener("dispose",v),A(P)}function E(D){const P=o.get(D);if(P.__webglInit===void 0)return;const q=D.source,se=h.get(q);if(se){const he=se[P.__cacheKey];he.usedTimes--,he.usedTimes===0&&b(D),Object.keys(se).length===0&&h.delete(q)}o.remove(D)}function b(D){const P=o.get(D);t.deleteTexture(P.__webglTexture);const q=D.source,se=h.get(q);delete se[P.__cacheKey],a.memory.textures--}function A(D){const P=o.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),o.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(P.__webglFramebuffer[se]))for(let he=0;he<P.__webglFramebuffer[se].length;he++)t.deleteFramebuffer(P.__webglFramebuffer[se][he]);else t.deleteFramebuffer(P.__webglFramebuffer[se]);P.__webglDepthbuffer&&t.deleteRenderbuffer(P.__webglDepthbuffer[se])}else{if(Array.isArray(P.__webglFramebuffer))for(let se=0;se<P.__webglFramebuffer.length;se++)t.deleteFramebuffer(P.__webglFramebuffer[se]);else t.deleteFramebuffer(P.__webglFramebuffer);if(P.__webglDepthbuffer&&t.deleteRenderbuffer(P.__webglDepthbuffer),P.__webglMultisampledFramebuffer&&t.deleteFramebuffer(P.__webglMultisampledFramebuffer),P.__webglColorRenderbuffer)for(let se=0;se<P.__webglColorRenderbuffer.length;se++)P.__webglColorRenderbuffer[se]&&t.deleteRenderbuffer(P.__webglColorRenderbuffer[se]);P.__webglDepthRenderbuffer&&t.deleteRenderbuffer(P.__webglDepthRenderbuffer)}const q=D.textures;for(let se=0,he=q.length;se<he;se++){const ve=o.get(q[se]);ve.__webglTexture&&(t.deleteTexture(ve.__webglTexture),a.memory.textures--),o.remove(q[se])}o.remove(D)}let R=0;function L(){R=0}function I(){return R}function U(D){R=D}function N(){const D=R;return D>=i.maxTextures&&Rt("WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),R+=1,D}function O(D){const P=[];return P.push(D.wrapS),P.push(D.wrapT),P.push(D.wrapR||0),P.push(D.magFilter),P.push(D.minFilter),P.push(D.anisotropy),P.push(D.internalFormat),P.push(D.format),P.push(D.type),P.push(D.generateMipmaps),P.push(D.premultiplyAlpha),P.push(D.flipY),P.push(D.unpackAlignment),P.push(D.colorSpace),P.join()}function V(D,P){const q=o.get(D);if(D.isVideoTexture&&Pt(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&q.__version!==D.version){const se=D.image;if(se===null)Rt("WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)Rt("WebGLRenderer: Texture marked for update but image is incomplete");else{de(q,D,P);return}}else D.isExternalTexture&&(q.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(t.TEXTURE_2D,q.__webglTexture,t.TEXTURE0+P)}function X(D,P){const q=o.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){de(q,D,P);return}else D.isExternalTexture&&(q.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(t.TEXTURE_2D_ARRAY,q.__webglTexture,t.TEXTURE0+P)}function J(D,P){const q=o.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){de(q,D,P);return}e.bindTexture(t.TEXTURE_3D,q.__webglTexture,t.TEXTURE0+P)}function W(D,P){const q=o.get(D);if(D.isCubeDepthTexture!==!0&&D.version>0&&q.__version!==D.version){be(q,D,P);return}e.bindTexture(t.TEXTURE_CUBE_MAP,q.__webglTexture,t.TEXTURE0+P)}const k={[Io]:t.REPEAT,[Is]:t.CLAMP_TO_EDGE,[qc]:t.MIRRORED_REPEAT},ee={[so]:t.NEAREST,[Yc]:t.NEAREST_MIPMAP_NEAREST,[Ki]:t.NEAREST_MIPMAP_LINEAR,[yn]:t.LINEAR,[Ts]:t.LINEAR_MIPMAP_NEAREST,[Ro]:t.LINEAR_MIPMAP_LINEAR},ae={[of]:t.NEVER,[nf]:t.ALWAYS,[tf]:t.LESS,[ir]:t.LEQUAL,[ef]:t.EQUAL,[or]:t.GEQUAL,[Jd]:t.GREATER,[Qd]:t.NOTEQUAL};function ue(D,P){if(P.type===Wo&&n.has("OES_texture_float_linear")===!1&&(P.magFilter===yn||P.magFilter===Ts||P.magFilter===Ki||P.magFilter===Ro||P.minFilter===yn||P.minFilter===Ts||P.minFilter===Ki||P.minFilter===Ro)&&Rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(D,t.TEXTURE_WRAP_S,k[P.wrapS]),t.texParameteri(D,t.TEXTURE_WRAP_T,k[P.wrapT]),(D===t.TEXTURE_3D||D===t.TEXTURE_2D_ARRAY)&&t.texParameteri(D,t.TEXTURE_WRAP_R,k[P.wrapR]),t.texParameteri(D,t.TEXTURE_MAG_FILTER,ee[P.magFilter]),t.texParameteri(D,t.TEXTURE_MIN_FILTER,ee[P.minFilter]),P.compareFunction&&(t.texParameteri(D,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(D,t.TEXTURE_COMPARE_FUNC,ae[P.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(P.magFilter===so||P.minFilter!==Ki&&P.minFilter!==Ro||P.type===Wo&&n.has("OES_texture_float_linear")===!1)return;if(P.anisotropy>1||o.get(P).__currentAnisotropy){const q=n.get("EXT_texture_filter_anisotropic");t.texParameterf(D,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(P.anisotropy,i.getMaxAnisotropy())),o.get(P).__currentAnisotropy=P.anisotropy}}}function z(D,P){let q=!1;D.__webglInit===void 0&&(D.__webglInit=!0,P.addEventListener("dispose",y));const se=P.source;let he=h.get(se);he===void 0&&(he={},h.set(se,he));const ve=O(P);if(ve!==D.__cacheKey){he[ve]===void 0&&(he[ve]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,q=!0),he[ve].usedTimes++;const Se=he[D.__cacheKey];Se!==void 0&&(he[D.__cacheKey].usedTimes--,Se.usedTimes===0&&b(P)),D.__cacheKey=ve,D.__webglTexture=he[ve].texture}return q}function j(D,P,q){return Math.floor(Math.floor(D/q)/P)}function Z(D,P,q,se){const ve=D.updateRanges;if(ve.length===0)e.texSubImage2D(t.TEXTURE_2D,0,0,0,P.width,P.height,q,se,P.data);else{ve.sort((Oe,_e)=>Oe.start-_e.start);let Se=0;for(let Oe=1;Oe<ve.length;Oe++){const _e=ve[Se],xe=ve[Oe],Qe=_e.start+_e.count,et=j(xe.start,P.width,4),pt=j(_e.start,P.width,4);xe.start<=Qe+1&&et===pt&&j(xe.start+xe.count-1,P.width,4)===et?_e.count=Math.max(_e.count,xe.start+xe.count-_e.start):(++Se,ve[Se]=xe)}ve.length=Se+1;const oe=e.getParameter(t.UNPACK_ROW_LENGTH),ce=e.getParameter(t.UNPACK_SKIP_PIXELS),Ie=e.getParameter(t.UNPACK_SKIP_ROWS);e.pixelStorei(t.UNPACK_ROW_LENGTH,P.width);for(let Oe=0,_e=ve.length;Oe<_e;Oe++){const xe=ve[Oe],Qe=Math.floor(xe.start/4),et=Math.ceil(xe.count/4),pt=Qe%P.width,F=Math.floor(Qe/P.width),Me=et,re=1;e.pixelStorei(t.UNPACK_SKIP_PIXELS,pt),e.pixelStorei(t.UNPACK_SKIP_ROWS,F),e.texSubImage2D(t.TEXTURE_2D,0,pt,F,Me,re,q,se,P.data)}D.clearUpdateRanges(),e.pixelStorei(t.UNPACK_ROW_LENGTH,oe),e.pixelStorei(t.UNPACK_SKIP_PIXELS,ce),e.pixelStorei(t.UNPACK_SKIP_ROWS,Ie)}}function de(D,P,q){let se=t.TEXTURE_2D;(P.isDataArrayTexture||P.isCompressedArrayTexture)&&(se=t.TEXTURE_2D_ARRAY),P.isData3DTexture&&(se=t.TEXTURE_3D);const he=z(D,P),ve=P.source;e.bindTexture(se,D.__webglTexture,t.TEXTURE0+q);const Se=o.get(ve);if(ve.version!==Se.__version||he===!0){if(e.activeTexture(t.TEXTURE0+q),(typeof ImageBitmap<"u"&&P.image instanceof ImageBitmap)===!1){const re=Vt.getPrimaries(Vt.workingColorSpace),ke=P.colorSpace===Ho?null:Vt.getPrimaries(P.colorSpace),Ee=P.colorSpace===Ho||re===ke?t.NONE:t.BROWSER_DEFAULT_WEBGL;e.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,P.flipY),e.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),e.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}e.pixelStorei(t.UNPACK_ALIGNMENT,P.unpackAlignment);let ce=p(P.image,!1,i.maxTextureSize);ce=Ae(P,ce);const Ie=s.convert(P.format,P.colorSpace),Oe=s.convert(P.type);let _e=S(P.internalFormat,Ie,Oe,P.normalized,P.colorSpace,P.isVideoTexture);ue(se,P);let xe;const Qe=P.mipmaps,et=P.isVideoTexture!==!0,pt=Se.__version===void 0||he===!0,F=ve.dataReady,Me=w(P,ce);if(P.isDepthTexture)_e=T(P.format===ii,P.type),pt&&(et?e.texStorage2D(t.TEXTURE_2D,1,_e,ce.width,ce.height):e.texImage2D(t.TEXTURE_2D,0,_e,ce.width,ce.height,0,Ie,Oe,null));else if(P.isDataTexture)if(Qe.length>0){et&&pt&&e.texStorage2D(t.TEXTURE_2D,Me,_e,Qe[0].width,Qe[0].height);for(let re=0,ke=Qe.length;re<ke;re++)xe=Qe[re],et?F&&e.texSubImage2D(t.TEXTURE_2D,re,0,0,xe.width,xe.height,Ie,Oe,xe.data):e.texImage2D(t.TEXTURE_2D,re,_e,xe.width,xe.height,0,Ie,Oe,xe.data);P.generateMipmaps=!1}else et?(pt&&e.texStorage2D(t.TEXTURE_2D,Me,_e,ce.width,ce.height),F&&Z(P,ce,Ie,Oe)):e.texImage2D(t.TEXTURE_2D,0,_e,ce.width,ce.height,0,Ie,Oe,ce.data);else if(P.isCompressedTexture)if(P.isCompressedArrayTexture){et&&pt&&e.texStorage3D(t.TEXTURE_2D_ARRAY,Me,_e,Qe[0].width,Qe[0].height,ce.depth);for(let re=0,ke=Qe.length;re<ke;re++)if(xe=Qe[re],P.format!==xo)if(Ie!==null)if(et){if(F)if(P.layerUpdates.size>0){const Ee=x0(xe.width,xe.height,P.format,P.type);for(const pe of P.layerUpdates){const He=xe.data.subarray(pe*Ee/xe.data.BYTES_PER_ELEMENT,(pe+1)*Ee/xe.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,re,0,0,pe,xe.width,xe.height,1,Ie,He)}P.clearLayerUpdates()}else e.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,re,0,0,0,xe.width,xe.height,ce.depth,Ie,xe.data)}else e.compressedTexImage3D(t.TEXTURE_2D_ARRAY,re,_e,xe.width,xe.height,ce.depth,0,xe.data,0,0);else Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else et?F&&e.texSubImage3D(t.TEXTURE_2D_ARRAY,re,0,0,0,xe.width,xe.height,ce.depth,Ie,Oe,xe.data):e.texImage3D(t.TEXTURE_2D_ARRAY,re,_e,xe.width,xe.height,ce.depth,0,Ie,Oe,xe.data)}else{et&&pt&&e.texStorage2D(t.TEXTURE_2D,Me,_e,Qe[0].width,Qe[0].height);for(let re=0,ke=Qe.length;re<ke;re++)xe=Qe[re],P.format!==xo?Ie!==null?et?F&&e.compressedTexSubImage2D(t.TEXTURE_2D,re,0,0,xe.width,xe.height,Ie,xe.data):e.compressedTexImage2D(t.TEXTURE_2D,re,_e,xe.width,xe.height,0,xe.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):et?F&&e.texSubImage2D(t.TEXTURE_2D,re,0,0,xe.width,xe.height,Ie,Oe,xe.data):e.texImage2D(t.TEXTURE_2D,re,_e,xe.width,xe.height,0,Ie,Oe,xe.data)}else if(P.isDataArrayTexture)if(et){if(pt&&e.texStorage3D(t.TEXTURE_2D_ARRAY,Me,_e,ce.width,ce.height,ce.depth),F)if(P.layerUpdates.size>0){const re=x0(ce.width,ce.height,P.format,P.type);for(const ke of P.layerUpdates){const Ee=ce.data.subarray(ke*re/ce.data.BYTES_PER_ELEMENT,(ke+1)*re/ce.data.BYTES_PER_ELEMENT);e.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ke,ce.width,ce.height,1,Ie,Oe,Ee)}P.clearLayerUpdates()}else e.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Ie,Oe,ce.data)}else e.texImage3D(t.TEXTURE_2D_ARRAY,0,_e,ce.width,ce.height,ce.depth,0,Ie,Oe,ce.data);else if(P.isData3DTexture)et?(pt&&e.texStorage3D(t.TEXTURE_3D,Me,_e,ce.width,ce.height,ce.depth),F&&e.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Ie,Oe,ce.data)):e.texImage3D(t.TEXTURE_3D,0,_e,ce.width,ce.height,ce.depth,0,Ie,Oe,ce.data);else if(P.isFramebufferTexture){if(pt)if(et)e.texStorage2D(t.TEXTURE_2D,Me,_e,ce.width,ce.height);else{let re=ce.width,ke=ce.height;for(let Ee=0;Ee<Me;Ee++)e.texImage2D(t.TEXTURE_2D,Ee,_e,re,ke,0,Ie,Oe,null),re>>=1,ke>>=1}}else if(P.isHTMLTexture){if("texElementImage2D"in t){const re=t.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),ce.parentNode!==re){re.appendChild(ce),d.add(P),re.onpaint=st=>{const en=st.changedElements;for(const Ct of d)en.includes(Ct.image)&&(Ct.needsUpdate=!0)},re.requestPaint();return}const ke=0,Ee=t.RGBA,pe=t.RGBA,He=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,ke,Ee,pe,He,ce),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(Qe.length>0){if(et&&pt){const re=Gt(Qe[0]);e.texStorage2D(t.TEXTURE_2D,Me,_e,re.width,re.height)}for(let re=0,ke=Qe.length;re<ke;re++)xe=Qe[re],et?F&&e.texSubImage2D(t.TEXTURE_2D,re,0,0,Ie,Oe,xe):e.texImage2D(t.TEXTURE_2D,re,_e,Ie,Oe,xe);P.generateMipmaps=!1}else if(et){if(pt){const re=Gt(ce);e.texStorage2D(t.TEXTURE_2D,Me,_e,re.width,re.height)}F&&e.texSubImage2D(t.TEXTURE_2D,0,0,0,Ie,Oe,ce)}else e.texImage2D(t.TEXTURE_2D,0,_e,Ie,Oe,ce);g(P)&&x(se),Se.__version=ve.version,P.onUpdate&&P.onUpdate(P)}D.__version=P.version}function be(D,P,q){if(P.image.length!==6)return;const se=z(D,P),he=P.source;e.bindTexture(t.TEXTURE_CUBE_MAP,D.__webglTexture,t.TEXTURE0+q);const ve=o.get(he);if(he.version!==ve.__version||se===!0){e.activeTexture(t.TEXTURE0+q);const Se=Vt.getPrimaries(Vt.workingColorSpace),oe=P.colorSpace===Ho?null:Vt.getPrimaries(P.colorSpace),ce=P.colorSpace===Ho||Se===oe?t.NONE:t.BROWSER_DEFAULT_WEBGL;e.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,P.flipY),e.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),e.pixelStorei(t.UNPACK_ALIGNMENT,P.unpackAlignment),e.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const Ie=P.isCompressedTexture||P.image[0].isCompressedTexture,Oe=P.image[0]&&P.image[0].isDataTexture,_e=[];for(let pe=0;pe<6;pe++)!Ie&&!Oe?_e[pe]=p(P.image[pe],!0,i.maxCubemapSize):_e[pe]=Oe?P.image[pe].image:P.image[pe],_e[pe]=Ae(P,_e[pe]);const xe=_e[0],Qe=s.convert(P.format,P.colorSpace),et=s.convert(P.type),pt=S(P.internalFormat,Qe,et,P.normalized,P.colorSpace),F=P.isVideoTexture!==!0,Me=ve.__version===void 0||se===!0,re=he.dataReady;let ke=w(P,xe);ue(t.TEXTURE_CUBE_MAP,P);let Ee;if(Ie){F&&Me&&e.texStorage2D(t.TEXTURE_CUBE_MAP,ke,pt,xe.width,xe.height);for(let pe=0;pe<6;pe++){Ee=_e[pe].mipmaps;for(let He=0;He<Ee.length;He++){const st=Ee[He];P.format!==xo?Qe!==null?F?re&&e.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He,0,0,st.width,st.height,Qe,st.data):e.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He,pt,st.width,st.height,0,st.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?re&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He,0,0,st.width,st.height,Qe,et,st.data):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He,pt,st.width,st.height,0,Qe,et,st.data)}}}else{if(Ee=P.mipmaps,F&&Me){Ee.length>0&&ke++;const pe=Gt(_e[0]);e.texStorage2D(t.TEXTURE_CUBE_MAP,ke,pt,pe.width,pe.height)}for(let pe=0;pe<6;pe++)if(Oe){F?re&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,_e[pe].width,_e[pe].height,Qe,et,_e[pe].data):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,pt,_e[pe].width,_e[pe].height,0,Qe,et,_e[pe].data);for(let He=0;He<Ee.length;He++){const en=Ee[He].image[pe].image;F?re&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He+1,0,0,en.width,en.height,Qe,et,en.data):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He+1,pt,en.width,en.height,0,Qe,et,en.data)}}else{F?re&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,Qe,et,_e[pe]):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,pt,Qe,et,_e[pe]);for(let He=0;He<Ee.length;He++){const st=Ee[He];F?re&&e.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He+1,0,0,Qe,et,st.image[pe]):e.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He+1,pt,Qe,et,st.image[pe])}}}g(P)&&x(t.TEXTURE_CUBE_MAP),ve.__version=he.version,P.onUpdate&&P.onUpdate(P)}D.__version=P.version}function Te(D,P,q,se,he,ve){const Se=s.convert(q.format,q.colorSpace),oe=s.convert(q.type),ce=S(q.internalFormat,Se,oe,q.normalized,q.colorSpace),Ie=o.get(P),Oe=o.get(q);if(Oe.__renderTarget=P,!Ie.__hasExternalTextures){const _e=Math.max(1,P.width>>ve),xe=Math.max(1,P.height>>ve);he===t.TEXTURE_3D||he===t.TEXTURE_2D_ARRAY?e.texImage3D(he,ve,ce,_e,xe,P.depth,0,Se,oe,null):e.texImage2D(he,ve,ce,_e,xe,0,Se,oe,null)}e.bindFramebuffer(t.FRAMEBUFFER,D),lt(P)?r.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,se,he,Oe.__webglTexture,0,$t(P)):(he===t.TEXTURE_2D||he>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&he<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,se,he,Oe.__webglTexture,ve),e.bindFramebuffer(t.FRAMEBUFFER,null)}function Ze(D,P,q){if(t.bindRenderbuffer(t.RENDERBUFFER,D),P.depthBuffer){const se=P.depthTexture,he=se&&se.isDepthTexture?se.type:null,ve=T(P.stencilBuffer,he),Se=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;lt(P)?r.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,$t(P),ve,P.width,P.height):q?t.renderbufferStorageMultisample(t.RENDERBUFFER,$t(P),ve,P.width,P.height):t.renderbufferStorage(t.RENDERBUFFER,ve,P.width,P.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Se,t.RENDERBUFFER,D)}else{const se=P.textures;for(let he=0;he<se.length;he++){const ve=se[he],Se=s.convert(ve.format,ve.colorSpace),oe=s.convert(ve.type),ce=S(ve.internalFormat,Se,oe,ve.normalized,ve.colorSpace);lt(P)?r.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,$t(P),ce,P.width,P.height):q?t.renderbufferStorageMultisample(t.RENDERBUFFER,$t(P),ce,P.width,P.height):t.renderbufferStorage(t.RENDERBUFFER,ce,P.width,P.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Xe(D,P,q){const se=P.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(t.FRAMEBUFFER,D),!(P.depthTexture&&P.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const he=o.get(P.depthTexture);if(he.__renderTarget=P,(!he.__webglTexture||P.depthTexture.image.width!==P.width||P.depthTexture.image.height!==P.height)&&(P.depthTexture.image.width=P.width,P.depthTexture.image.height=P.height,P.depthTexture.needsUpdate=!0),se){if(he.__webglInit===void 0&&(he.__webglInit=!0,P.depthTexture.addEventListener("dispose",y)),he.__webglTexture===void 0){he.__webglTexture=t.createTexture(),e.bindTexture(t.TEXTURE_CUBE_MAP,he.__webglTexture),ue(t.TEXTURE_CUBE_MAP,P.depthTexture);const Ie=s.convert(P.depthTexture.format),Oe=s.convert(P.depthTexture.type);let _e;P.depthTexture.format===Pi?_e=t.DEPTH_COMPONENT24:P.depthTexture.format===ii&&(_e=t.DEPTH24_STENCIL8);for(let xe=0;xe<6;xe++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,_e,P.width,P.height,0,Ie,Oe,null)}}else V(P.depthTexture,0);const ve=he.__webglTexture,Se=$t(P),oe=se?t.TEXTURE_CUBE_MAP_POSITIVE_X+q:t.TEXTURE_2D,ce=P.depthTexture.format===ii?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(P.depthTexture.format===Pi)lt(P)?r.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ce,oe,ve,0,Se):t.framebufferTexture2D(t.FRAMEBUFFER,ce,oe,ve,0);else if(P.depthTexture.format===ii)lt(P)?r.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ce,oe,ve,0,Se):t.framebufferTexture2D(t.FRAMEBUFFER,ce,oe,ve,0);else throw new Error("Unknown depthTexture format")}function ct(D){const P=o.get(D),q=D.isWebGLCubeRenderTarget===!0;if(P.__boundDepthTexture!==D.depthTexture){const se=D.depthTexture;if(P.__depthDisposeCallback&&P.__depthDisposeCallback(),se){const he=()=>{delete P.__boundDepthTexture,delete P.__depthDisposeCallback,se.removeEventListener("dispose",he)};se.addEventListener("dispose",he),P.__depthDisposeCallback=he}P.__boundDepthTexture=se}if(D.depthTexture&&!P.__autoAllocateDepthBuffer)if(q)for(let se=0;se<6;se++)Xe(P.__webglFramebuffer[se],D,se);else{const se=D.texture.mipmaps;se&&se.length>0?Xe(P.__webglFramebuffer[0],D,0):Xe(P.__webglFramebuffer,D,0)}else if(q){P.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(e.bindFramebuffer(t.FRAMEBUFFER,P.__webglFramebuffer[se]),P.__webglDepthbuffer[se]===void 0)P.__webglDepthbuffer[se]=t.createRenderbuffer(),Ze(P.__webglDepthbuffer[se],D,!1);else{const he=D.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ve=P.__webglDepthbuffer[se];t.bindRenderbuffer(t.RENDERBUFFER,ve),t.framebufferRenderbuffer(t.FRAMEBUFFER,he,t.RENDERBUFFER,ve)}}else{const se=D.texture.mipmaps;if(se&&se.length>0?e.bindFramebuffer(t.FRAMEBUFFER,P.__webglFramebuffer[0]):e.bindFramebuffer(t.FRAMEBUFFER,P.__webglFramebuffer),P.__webglDepthbuffer===void 0)P.__webglDepthbuffer=t.createRenderbuffer(),Ze(P.__webglDepthbuffer,D,!1);else{const he=D.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ve=P.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,ve),t.framebufferRenderbuffer(t.FRAMEBUFFER,he,t.RENDERBUFFER,ve)}}e.bindFramebuffer(t.FRAMEBUFFER,null)}function it(D,P,q){const se=o.get(D);P!==void 0&&Te(se.__webglFramebuffer,D,D.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),q!==void 0&&ct(D)}function je(D){const P=D.texture,q=o.get(D),se=o.get(P);D.addEventListener("dispose",v);const he=D.textures,ve=D.isWebGLCubeRenderTarget===!0,Se=he.length>1;if(Se||(se.__webglTexture===void 0&&(se.__webglTexture=t.createTexture()),se.__version=P.version,a.memory.textures++),ve){q.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(P.mipmaps&&P.mipmaps.length>0){q.__webglFramebuffer[oe]=[];for(let ce=0;ce<P.mipmaps.length;ce++)q.__webglFramebuffer[oe][ce]=t.createFramebuffer()}else q.__webglFramebuffer[oe]=t.createFramebuffer()}else{if(P.mipmaps&&P.mipmaps.length>0){q.__webglFramebuffer=[];for(let oe=0;oe<P.mipmaps.length;oe++)q.__webglFramebuffer[oe]=t.createFramebuffer()}else q.__webglFramebuffer=t.createFramebuffer();if(Se)for(let oe=0,ce=he.length;oe<ce;oe++){const Ie=o.get(he[oe]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=t.createTexture(),a.memory.textures++)}if(D.samples>0&&lt(D)===!1){q.__webglMultisampledFramebuffer=t.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(t.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let oe=0;oe<he.length;oe++){const ce=he[oe];q.__webglColorRenderbuffer[oe]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,q.__webglColorRenderbuffer[oe]);const Ie=s.convert(ce.format,ce.colorSpace),Oe=s.convert(ce.type),_e=S(ce.internalFormat,Ie,Oe,ce.normalized,ce.colorSpace,D.isXRRenderTarget===!0),xe=$t(D);t.renderbufferStorageMultisample(t.RENDERBUFFER,xe,_e,D.width,D.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+oe,t.RENDERBUFFER,q.__webglColorRenderbuffer[oe])}t.bindRenderbuffer(t.RENDERBUFFER,null),D.depthBuffer&&(q.__webglDepthRenderbuffer=t.createRenderbuffer(),Ze(q.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ve){e.bindTexture(t.TEXTURE_CUBE_MAP,se.__webglTexture),ue(t.TEXTURE_CUBE_MAP,P);for(let oe=0;oe<6;oe++)if(P.mipmaps&&P.mipmaps.length>0)for(let ce=0;ce<P.mipmaps.length;ce++)Te(q.__webglFramebuffer[oe][ce],D,P,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ce);else Te(q.__webglFramebuffer[oe],D,P,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);g(P)&&x(t.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Se){for(let oe=0,ce=he.length;oe<ce;oe++){const Ie=he[oe],Oe=o.get(Ie);let _e=t.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(_e=D.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),e.bindTexture(_e,Oe.__webglTexture),ue(_e,Ie),Te(q.__webglFramebuffer,D,Ie,t.COLOR_ATTACHMENT0+oe,_e,0),g(Ie)&&x(_e)}e.unbindTexture()}else{let oe=t.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(oe=D.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),e.bindTexture(oe,se.__webglTexture),ue(oe,P),P.mipmaps&&P.mipmaps.length>0)for(let ce=0;ce<P.mipmaps.length;ce++)Te(q.__webglFramebuffer[ce],D,P,t.COLOR_ATTACHMENT0,oe,ce);else Te(q.__webglFramebuffer,D,P,t.COLOR_ATTACHMENT0,oe,0);g(P)&&x(oe),e.unbindTexture()}D.depthBuffer&&ct(D)}function Tt(D){const P=D.textures;for(let q=0,se=P.length;q<se;q++){const he=P[q];if(g(he)){const ve=M(D),Se=o.get(he).__webglTexture;e.bindTexture(ve,Se),x(ve),e.unbindTexture()}}}const At=[],ln=[];function B(D){if(D.samples>0){if(lt(D)===!1){const P=D.textures,q=D.width,se=D.height;let he=t.COLOR_BUFFER_BIT;const ve=D.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Se=o.get(D),oe=P.length>1;if(oe)for(let Ie=0;Ie<P.length;Ie++)e.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ie,t.RENDERBUFFER,null),e.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ie,t.TEXTURE_2D,null,0);e.bindFramebuffer(t.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const ce=D.texture.mipmaps;ce&&ce.length>0?e.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):e.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let Ie=0;Ie<P.length;Ie++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(he|=t.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(he|=t.STENCIL_BUFFER_BIT)),oe){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Se.__webglColorRenderbuffer[Ie]);const Oe=o.get(P[Ie]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Oe,0)}t.blitFramebuffer(0,0,q,se,0,0,q,se,he,t.NEAREST),c===!0&&(At.length=0,ln.length=0,At.push(t.COLOR_ATTACHMENT0+Ie),D.depthBuffer&&D.resolveDepthBuffer===!1&&(At.push(ve),ln.push(ve),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,ln)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,At))}if(e.bindFramebuffer(t.READ_FRAMEBUFFER,null),e.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),oe)for(let Ie=0;Ie<P.length;Ie++){e.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ie,t.RENDERBUFFER,Se.__webglColorRenderbuffer[Ie]);const Oe=o.get(P[Ie]).__webglTexture;e.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ie,t.TEXTURE_2D,Oe,0)}e.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){const P=D.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[P])}}}function $t(D){return Math.min(i.maxSamples,D.samples)}function lt(D){const P=o.get(D);return D.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&P.__useRenderToTexture!==!1}function Pt(D){const P=a.render.frame;f.get(D)!==P&&(f.set(D,P),D.update())}function Ae(D,P){const q=D.colorSpace,se=D.format,he=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||q!==ro&&q!==Ho&&(Vt.getTransfer(q)===Ft?(se!==xo||he!==no)&&Rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ht("WebGLTextures: Unsupported texture color space:",q)),P}function Gt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=L,this.getTextureUnits=I,this.setTextureUnits=U,this.setTexture2D=V,this.setTexture2DArray=X,this.setTexture3D=J,this.setTextureCube=W,this.rebindTextures=it,this.setupRenderTarget=je,this.updateRenderTargetMipmap=Tt,this.updateMultisampleRenderTarget=B,this.setupDepthRenderbuffer=ct,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=lt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function em(t,n){function e(o,i=Ho){let s;const a=Vt.getTransfer(i);if(o===no)return t.UNSIGNED_BYTE;if(o===Jc)return t.UNSIGNED_SHORT_4_4_4_4;if(o===el)return t.UNSIGNED_SHORT_5_5_5_1;if(o===cf)return t.UNSIGNED_INT_5_9_9_9_REV;if(o===lf)return t.UNSIGNED_INT_10F_11F_11F_REV;if(o===df)return t.BYTE;if(o===ff)return t.SHORT;if(o===Ls)return t.UNSIGNED_SHORT;if(o===nl)return t.INT;if(o===ri)return t.UNSIGNED_INT;if(o===Wo)return t.FLOAT;if(o===Tn)return t.HALF_FLOAT;if(o===uf)return t.ALPHA;if(o===hf)return t.RGB;if(o===xo)return t.RGBA;if(o===Pi)return t.DEPTH_COMPONENT;if(o===ii)return t.DEPTH_STENCIL;if(o===pf)return t.RED;if(o===Qc)return t.RED_INTEGER;if(o===Ci)return t.RG;if(o===Zc)return t.RG_INTEGER;if(o===jc)return t.RGBA_INTEGER;if(o===sa||o===aa||o===ra||o===ca)if(a===Ft)if(s=n.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(o===sa)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===aa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===ra)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===ca)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=n.get("WEBGL_compressed_texture_s3tc"),s!==null){if(o===sa)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===aa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===ra)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===ca)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===Or||o===Gr||o===Br||o===zr)if(s=n.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(o===Or)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===Gr)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===Br)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===zr)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===Hr||o===Vr||o===Wr||o===Xr||o===qr||o===Na||o===Yr)if(s=n.get("WEBGL_compressed_texture_etc"),s!==null){if(o===Hr||o===Vr)return a===Ft?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(o===Wr)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(o===Xr)return s.COMPRESSED_R11_EAC;if(o===qr)return s.COMPRESSED_SIGNED_R11_EAC;if(o===Na)return s.COMPRESSED_RG11_EAC;if(o===Yr)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(o===Kr||o===$r||o===jr||o===Zr||o===Qr||o===Jr||o===e0||o===t0||o===n0||o===o0||o===i0||o===s0||o===a0||o===r0)if(s=n.get("WEBGL_compressed_texture_astc"),s!==null){if(o===Kr)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===$r)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===jr)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===Zr)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===Qr)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===Jr)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===e0)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===t0)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===n0)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===o0)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===i0)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===s0)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===a0)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===r0)return a===Ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===c0||o===l0||o===d0)if(s=n.get("EXT_texture_compression_bptc"),s!==null){if(o===c0)return a===Ft?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(o===l0)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(o===d0)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(o===f0||o===u0||o===ka||o===h0)if(s=n.get("EXT_texture_compression_rgtc"),s!==null){if(o===f0)return s.COMPRESSED_RED_RGTC1_EXT;if(o===u0)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===ka)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===h0)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===Ri?t.UNSIGNED_INT_24_8:t[o]!==void 0?t[o]:null}return{convert:e}}const tm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nm=`
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

}`;class om{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,e){if(this.texture===null){const o=new tl(n.texture);(n.depthNear!==e.depthNear||n.depthFar!==e.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=o}}getMesh(n){if(this.texture!==null&&this.mesh===null){const e=n.cameras[0].viewport,o=new jt({vertexShader:tm,fragmentShader:nm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new G(new Je(20,20),o)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class im extends Ud{constructor(n,e){super();const o=this;let i=null,s=1,a=null,r="local-floor",c=1,l=null,f=null,d=null,u=null,h=null,m=null;const _=typeof XRWebGLBinding<"u",p=new om,g={},x=e.getContextAttributes();let M=null,S=null;const T=[],w=[],y=new rt;let v=null;const E=new wi;E.viewport=new wn;const b=new wi;b.viewport=new wn;const A=[E,b],R=new Nd;let L=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let j=T[z];return j===void 0&&(j=new ia,T[z]=j),j.getTargetRaySpace()},this.getControllerGrip=function(z){let j=T[z];return j===void 0&&(j=new ia,T[z]=j),j.getGripSpace()},this.getHand=function(z){let j=T[z];return j===void 0&&(j=new ia,T[z]=j),j.getHandSpace()};function U(z){const j=w.indexOf(z.inputSource);if(j===-1)return;const Z=T[j];Z!==void 0&&(Z.update(z.inputSource,z.frame,l||a),Z.dispatchEvent({type:z.type,data:z.inputSource}))}function N(){i.removeEventListener("select",U),i.removeEventListener("selectstart",U),i.removeEventListener("selectend",U),i.removeEventListener("squeeze",U),i.removeEventListener("squeezestart",U),i.removeEventListener("squeezeend",U),i.removeEventListener("end",N),i.removeEventListener("inputsourceschange",O);for(let z=0;z<T.length;z++){const j=w[z];j!==null&&(w[z]=null,T[z].disconnect(j))}L=null,I=null,p.reset();for(const z in g)delete g[z];n.setRenderTarget(M),h=null,u=null,d=null,i=null,S=null,ue.stop(),o.isPresenting=!1,n.setPixelRatio(v),n.setSize(y.width,y.height,!1),o.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,o.isPresenting===!0&&Rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){r=z,o.isPresenting===!0&&Rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(z){l=z},this.getBaseLayer=function(){return u!==null?u:h},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,e)),d},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(z){if(i=z,i!==null){if(M=n.getRenderTarget(),i.addEventListener("select",U),i.addEventListener("selectstart",U),i.addEventListener("selectend",U),i.addEventListener("squeeze",U),i.addEventListener("squeezestart",U),i.addEventListener("squeezeend",U),i.addEventListener("end",N),i.addEventListener("inputsourceschange",O),x.xrCompatible!==!0&&await e.makeXRCompatible(),v=n.getPixelRatio(),n.getSize(y),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Z=null,de=null,be=null;x.depth&&(be=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Z=x.stencil?ii:Pi,de=x.stencil?Ri:ri);const Te={colorFormat:e.RGBA8,depthFormat:be,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Te),i.updateRenderState({layers:[u]}),n.setPixelRatio(1),n.setSize(u.textureWidth,u.textureHeight,!1),S=new mn(u.textureWidth,u.textureHeight,{format:xo,type:no,depthTexture:new Ai(u.textureWidth,u.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:x.stencil,colorSpace:n.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const Z={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,e,Z),i.updateRenderState({baseLayer:h}),n.setPixelRatio(1),n.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new mn(h.framebufferWidth,h.framebufferHeight,{format:xo,type:no,colorSpace:n.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(r),ue.setContext(i),ue.start(),o.isPresenting=!0,o.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function O(z){for(let j=0;j<z.removed.length;j++){const Z=z.removed[j],de=w.indexOf(Z);de>=0&&(w[de]=null,T[de].disconnect(Z))}for(let j=0;j<z.added.length;j++){const Z=z.added[j];let de=w.indexOf(Z);if(de===-1){for(let Te=0;Te<T.length;Te++)if(Te>=w.length){w.push(Z),de=Te;break}else if(w[Te]===null){w[Te]=Z,de=Te;break}if(de===-1)break}const be=T[de];be&&be.connect(Z)}}const V=new Y,X=new Y;function J(z,j,Z){V.setFromMatrixPosition(j.matrixWorld),X.setFromMatrixPosition(Z.matrixWorld);const de=V.distanceTo(X),be=j.projectionMatrix.elements,Te=Z.projectionMatrix.elements,Ze=be[14]/(be[10]-1),Xe=be[14]/(be[10]+1),ct=(be[9]+1)/be[5],it=(be[9]-1)/be[5],je=(be[8]-1)/be[0],Tt=(Te[8]+1)/Te[0],At=Ze*je,ln=Ze*Tt,B=de/(-je+Tt),$t=B*-je;if(j.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX($t),z.translateZ(B),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),be[10]===-1)z.projectionMatrix.copy(j.projectionMatrix),z.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const lt=Ze+B,Pt=Xe+B,Ae=At-$t,Gt=ln+(de-$t),D=ct*Xe/Pt*lt,P=it*Xe/Pt*lt;z.projectionMatrix.makePerspective(Ae,Gt,D,P,lt,Pt),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function W(z,j){j===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(j.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(i===null)return;let j=z.near,Z=z.far;p.texture!==null&&(p.depthNear>0&&(j=p.depthNear),p.depthFar>0&&(Z=p.depthFar)),R.near=b.near=E.near=j,R.far=b.far=E.far=Z,(L!==R.near||I!==R.far)&&(i.updateRenderState({depthNear:R.near,depthFar:R.far}),L=R.near,I=R.far),R.layers.mask=z.layers.mask|6,E.layers.mask=R.layers.mask&-5,b.layers.mask=R.layers.mask&-3;const de=z.parent,be=R.cameras;W(R,de);for(let Te=0;Te<be.length;Te++)W(be[Te],de);be.length===2?J(R,E,b):R.projectionMatrix.copy(E.projectionMatrix),k(z,R,de)};function k(z,j,Z){Z===null?z.matrix.copy(j.matrixWorld):(z.matrix.copy(Z.matrixWorld),z.matrix.invert(),z.matrix.multiply(j.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(j.projectionMatrix),z.projectionMatrixInverse.copy(j.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=kd*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(u===null&&h===null))return c},this.setFoveation=function(z){c=z,u!==null&&(u.fixedFoveation=z),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=z)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(R)},this.getCameraTexture=function(z){return g[z]};let ee=null;function ae(z,j){if(f=j.getViewerPose(l||a),m=j,f!==null){const Z=f.views;h!==null&&(n.setRenderTargetFramebuffer(S,h.framebuffer),n.setRenderTarget(S));let de=!1;Z.length!==R.cameras.length&&(R.cameras.length=0,de=!0);for(let Xe=0;Xe<Z.length;Xe++){const ct=Z[Xe];let it=null;if(h!==null)it=h.getViewport(ct);else{const Tt=d.getViewSubImage(u,ct);it=Tt.viewport,Xe===0&&(n.setRenderTargetTextures(S,Tt.colorTexture,Tt.depthStencilTexture),n.setRenderTarget(S))}let je=A[Xe];je===void 0&&(je=new wi,je.layers.enable(Xe),je.viewport=new wn,A[Xe]=je),je.matrix.fromArray(ct.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(ct.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(it.x,it.y,it.width,it.height),Xe===0&&(R.matrix.copy(je.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),de===!0&&R.cameras.push(je)}const be=i.enabledFeatures;if(be&&be.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=o.getBinding();const Xe=d.getDepthInformation(Z[0]);Xe&&Xe.isValid&&Xe.texture&&p.init(Xe,i.renderState)}if(be&&be.includes("camera-access")&&_){n.state.unbindTexture(),d=o.getBinding();for(let Xe=0;Xe<Z.length;Xe++){const ct=Z[Xe].camera;if(ct){let it=g[ct];it||(it=new tl,g[ct]=it);const je=d.getCameraImage(ct);it.sourceTexture=je}}}}for(let Z=0;Z<T.length;Z++){const de=w[Z],be=T[Z];de!==null&&be!==void 0&&be.update(de,j,l||a)}ee&&ee(z,j),j.detectedPlanes&&o.dispatchEvent({type:"planesdetected",data:j}),m=null}const ue=new gl;ue.setAnimationLoop(ae),this.setAnimationLoop=function(z){ee=z},this.dispose=function(){}}}const sm=new ot,wl=new Mt;wl.set(-1,0,0,0,1,0,0,0,1);function am(t,n){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function o(p,g){g.color.getRGB(p.fogColor.value,sl(t)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function i(p,g,x,M,S){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(p,g):g.isMeshLambertMaterial?(s(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(p,g),d(p,g)):g.isMeshPhongMaterial?(s(p,g),f(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(p,g),u(p,g),g.isMeshPhysicalMaterial&&h(p,g,S)):g.isMeshMatcapMaterial?(s(p,g),m(p,g)):g.isMeshDepthMaterial?s(p,g):g.isMeshDistanceMaterial?(s(p,g),_(p,g)):g.isMeshNormalMaterial?s(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&r(p,g)):g.isPointsMaterial?c(p,g,x,M):g.isSpriteMaterial?l(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===An&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===An&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);const x=n.get(g),M=x.envMap,S=x.envMapRotation;M&&(p.envMap.value=M,p.envMapRotation.value.setFromMatrix4(sm.makeRotationFromEuler(S)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(wl),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function r(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function c(p,g,x,M){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*x,p.scale.value=M*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function l(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function f(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function u(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function h(p,g,x){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===An&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){const x=n.get(g).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:o,refreshMaterialUniforms:i}}function rm(t,n,e,o){let i={},s={},a=[];const r=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,M){const S=M.program;o.uniformBlockBinding(x,S)}function l(x,M){let S=i[x.id];S===void 0&&(m(x),S=f(x),i[x.id]=S,x.addEventListener("dispose",p));const T=M.program;o.updateUBOMapping(x,T);const w=n.render.frame;s[x.id]!==w&&(u(x),s[x.id]=w)}function f(x){const M=d();x.__bindingPointIndex=M;const S=t.createBuffer(),T=x.__size,w=x.usage;return t.bindBuffer(t.UNIFORM_BUFFER,S),t.bufferData(t.UNIFORM_BUFFER,T,w),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,M,S),S}function d(){for(let x=0;x<r;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Ht("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const M=i[x.id],S=x.uniforms,T=x.__cache;t.bindBuffer(t.UNIFORM_BUFFER,M);for(let w=0,y=S.length;w<y;w++){const v=Array.isArray(S[w])?S[w]:[S[w]];for(let E=0,b=v.length;E<b;E++){const A=v[E];if(h(A,w,E,T)===!0){const R=A.__offset,L=Array.isArray(A.value)?A.value:[A.value];let I=0;for(let U=0;U<L.length;U++){const N=L[U],O=_(N);typeof N=="number"||typeof N=="boolean"?(A.__data[0]=N,t.bufferSubData(t.UNIFORM_BUFFER,R+I,A.__data)):N.isMatrix3?(A.__data[0]=N.elements[0],A.__data[1]=N.elements[1],A.__data[2]=N.elements[2],A.__data[3]=0,A.__data[4]=N.elements[3],A.__data[5]=N.elements[4],A.__data[6]=N.elements[5],A.__data[7]=0,A.__data[8]=N.elements[6],A.__data[9]=N.elements[7],A.__data[10]=N.elements[8],A.__data[11]=0):ArrayBuffer.isView(N)?A.__data.set(new N.constructor(N.buffer,N.byteOffset,A.__data.length)):(N.toArray(A.__data,I),I+=O.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,R,A.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function h(x,M,S,T){const w=x.value,y=M+"_"+S;if(T[y]===void 0)return typeof w=="number"||typeof w=="boolean"?T[y]=w:ArrayBuffer.isView(w)?T[y]=w.slice():T[y]=w.clone(),!0;{const v=T[y];if(typeof w=="number"||typeof w=="boolean"){if(v!==w)return T[y]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(v.equals(w)===!1)return v.copy(w),!0}}return!1}function m(x){const M=x.uniforms;let S=0;const T=16;for(let y=0,v=M.length;y<v;y++){const E=Array.isArray(M[y])?M[y]:[M[y]];for(let b=0,A=E.length;b<A;b++){const R=E[b],L=Array.isArray(R.value)?R.value:[R.value];for(let I=0,U=L.length;I<U;I++){const N=L[I],O=_(N),V=S%T,X=V%O.boundary,J=V+X;S+=X,J!==0&&T-J<O.storage&&(S+=T-J),R.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),R.__offset=S,S+=O.storage}}}const w=S%T;return w>0&&(S+=T-w),x.__size=S,x.__cache={},this}function _(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?Rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(M.boundary=16,M.storage=x.byteLength):Rt("WebGLRenderer: Unsupported uniform value type.",x),M}function p(x){const M=x.target;M.removeEventListener("dispose",p);const S=a.indexOf(M.__bindingPointIndex);a.splice(S,1),t.deleteBuffer(i[M.id]),delete i[M.id],delete s[M.id]}function g(){for(const x in i)t.deleteBuffer(i[x]);a=[],i={},s={}}return{bind:c,update:l,dispose:g}}const cm=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let po=null;function lm(){return po===null&&(po=new nr(cm,16,16,Ci,Tn),po.name="DFG_LUT",po.minFilter=yn,po.magFilter=yn,po.wrapS=Is,po.wrapT=Is,po.generateMipmaps=!1,po.needsUpdate=!0),po}class dm{constructor(n={}){const{canvas:e=Dd(),context:o=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:r=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:h=no}=n;this.isWebGLRenderer=!0;let m;if(o!==null){if(typeof WebGLRenderingContext<"u"&&o instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=o.getContextAttributes().alpha}else m=a;const _=h,p=new Set([jc,Zc,Qc]),g=new Set([no,ri,Ls,Ri,Jc,el]),x=new Uint32Array(4),M=new Int32Array(4),S=new Y;let T=null,w=null;const y=[],v=[];let E=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_o,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let A=!1,R=null;this._outputColorSpace=yt;let L=0,I=0,U=null,N=-1,O=null;const V=new wn,X=new wn;let J=null;const W=new te(0);let k=0,ee=e.width,ae=e.height,ue=1,z=null,j=null;const Z=new wn(0,0,ee,ae),de=new wn(0,0,ee,ae);let be=!1;const Te=new Wc;let Ze=!1,Xe=!1;const ct=new ot,it=new Y,je=new wn,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let At=!1;function ln(){return U===null?ue:1}let B=o;function $t(C,H){return e.getContext(C,H)}try{const C={alpha:!0,depth:i,stencil:s,antialias:r,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:f,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Id}`),e.addEventListener("webglcontextlost",pe,!1),e.addEventListener("webglcontextrestored",He,!1),e.addEventListener("webglcontextcreationerror",st,!1),B===null){const H="webgl2";if(B=$t(H,C),B===null)throw $t(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw Ht("WebGLRenderer: "+C.message),C}let lt,Pt,Ae,Gt,D,P,q,se,he,ve,Se,oe,ce,Ie,Oe,_e,xe,Qe,et,pt,F,Me,re;function ke(){lt=new lp(B),lt.init(),F=new em(B,lt),Pt=new tp(B,lt,n,F),Ae=new Q2(B,lt),Pt.reversedDepthBuffer&&u&&Ae.buffers.depth.setReversed(!0),Gt=new up(B),D=new O2,P=new J2(B,lt,Ae,D,Pt,F,Gt),q=new cp(b),se=new gu(B),Me=new J1(B,se),he=new dp(B,se,Gt,Me),ve=new pp(B,he,se,Me,Gt),Qe=new hp(B,Pt,P),Oe=new np(D),Se=new F2(b,q,lt,Pt,Me,Oe),oe=new am(b,D),ce=new B2,Ie=new q2(lt),xe=new Q1(b,q,Ae,ve,m,c),_e=new Z2(b,ve,Pt),re=new rm(B,Gt,Pt,Ae),et=new ep(B,lt,Gt),pt=new fp(B,lt,Gt),Gt.programs=Se.programs,b.capabilities=Pt,b.extensions=lt,b.properties=D,b.renderLists=ce,b.shadowMap=_e,b.state=Ae,b.info=Gt}ke(),_!==no&&(E=new gp(_,e.width,e.height,i,s));const Ee=new im(b,B);this.xr=Ee,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const C=lt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=lt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(C){C!==void 0&&(ue=C,this.setSize(ee,ae,!1))},this.getSize=function(C){return C.set(ee,ae)},this.setSize=function(C,H,Q=!0){if(Ee.isPresenting){Rt("WebGLRenderer: Can't change size while VR device is presenting.");return}ee=C,ae=H,e.width=Math.floor(C*ue),e.height=Math.floor(H*ue),Q===!0&&(e.style.width=C+"px",e.style.height=H+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,C,H)},this.getDrawingBufferSize=function(C){return C.set(ee*ue,ae*ue).floor()},this.setDrawingBufferSize=function(C,H,Q){ee=C,ae=H,ue=Q,e.width=Math.floor(C*Q),e.height=Math.floor(H*Q),this.setViewport(0,0,C,H)},this.setEffects=function(C){if(_===no){Ht("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let H=0;H<C.length;H++)if(C[H].isOutputPass===!0){Rt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(V)},this.getViewport=function(C){return C.copy(Z)},this.setViewport=function(C,H,Q,K){C.isVector4?Z.set(C.x,C.y,C.z,C.w):Z.set(C,H,Q,K),Ae.viewport(V.copy(Z).multiplyScalar(ue).round())},this.getScissor=function(C){return C.copy(de)},this.setScissor=function(C,H,Q,K){C.isVector4?de.set(C.x,C.y,C.z,C.w):de.set(C,H,Q,K),Ae.scissor(X.copy(de).multiplyScalar(ue).round())},this.getScissorTest=function(){return be},this.setScissorTest=function(C){Ae.setScissorTest(be=C)},this.setOpaqueSort=function(C){z=C},this.setTransparentSort=function(C){j=C},this.getClearColor=function(C){return C.copy(xe.getClearColor())},this.setClearColor=function(){xe.setClearColor(...arguments)},this.getClearAlpha=function(){return xe.getClearAlpha()},this.setClearAlpha=function(){xe.setClearAlpha(...arguments)},this.clear=function(C=!0,H=!0,Q=!0){let K=0;if(C){let $=!1;if(U!==null){const Ue=U.texture.format;$=p.has(Ue)}if($){const Ue=U.texture.type,Be=g.has(Ue),Le=xe.getClearColor(),ze=xe.getClearAlpha(),We=Le.r,at=Le.g,ut=Le.b;Be?(x[0]=We,x[1]=at,x[2]=ut,x[3]=ze,B.clearBufferuiv(B.COLOR,0,x)):(M[0]=We,M[1]=at,M[2]=ut,M[3]=ze,B.clearBufferiv(B.COLOR,0,M))}else K|=B.COLOR_BUFFER_BIT}H&&(K|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(K|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&B.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),R=C},this.dispose=function(){e.removeEventListener("webglcontextlost",pe,!1),e.removeEventListener("webglcontextrestored",He,!1),e.removeEventListener("webglcontextcreationerror",st,!1),xe.dispose(),ce.dispose(),Ie.dispose(),D.dispose(),q.dispose(),ve.dispose(),Me.dispose(),re.dispose(),Se.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",Ar),Ee.removeEventListener("sessionend",Pr),Jo.stop()};function pe(C){C.preventDefault(),Nr("WebGLRenderer: Context Lost."),A=!0}function He(){Nr("WebGLRenderer: Context Restored."),A=!1;const C=Gt.autoReset,H=_e.enabled,Q=_e.autoUpdate,K=_e.needsUpdate,$=_e.type;ke(),Gt.autoReset=C,_e.enabled=H,_e.autoUpdate=Q,_e.needsUpdate=K,_e.type=$}function st(C){Ht("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function en(C){const H=C.target;H.removeEventListener("dispose",en),Ct(H)}function Ct(C){yo(C),D.remove(C)}function yo(C){const H=D.get(C).programs;H!==void 0&&(H.forEach(function(Q){Se.releaseProgram(Q)}),C.isShaderMaterial&&Se.releaseShaderCache(C))}this.renderBufferDirect=function(C,H,Q,K,$,Ue){H===null&&(H=Tt);const Be=$.isMesh&&$.matrixWorld.determinant()<0,Le=wd(C,H,Q,K,$);Ae.setMaterial(K,Be);let ze=Q.index,We=1;if(K.wireframe===!0){if(ze=he.getWireframeAttribute(Q),ze===void 0)return;We=2}const at=Q.drawRange,ut=Q.attributes.position;let qe=at.start*We,Dt=(at.start+at.count)*We;Ue!==null&&(qe=Math.max(qe,Ue.start*We),Dt=Math.min(Dt,(Ue.start+Ue.count)*We)),ze!==null?(qe=Math.max(qe,0),Dt=Math.min(Dt,ze.count)):ut!=null&&(qe=Math.max(qe,0),Dt=Math.min(Dt,ut.count));const tn=Dt-qe;if(tn<0||tn===1/0)return;Me.setup($,K,Le,Q,ze);let Zt,Lt=et;if(ze!==null&&(Zt=se.get(ze),Lt=pt,Lt.setIndex(Zt)),$.isMesh)K.wireframe===!0?(Ae.setLineWidth(K.wireframeLinewidth*ln()),Lt.setMode(B.LINES)):Lt.setMode(B.TRIANGLES);else if($.isLine){let bn=K.linewidth;bn===void 0&&(bn=1),Ae.setLineWidth(bn*ln()),$.isLineSegments?Lt.setMode(B.LINES):$.isLineLoop?Lt.setMode(B.LINE_LOOP):Lt.setMode(B.LINE_STRIP)}else $.isPoints?Lt.setMode(B.POINTS):$.isSprite&&Lt.setMode(B.TRIANGLES);if($.isBatchedMesh)if(lt.get("WEBGL_multi_draw"))Lt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const bn=$._multiDrawStarts,Ge=$._multiDrawCounts,On=$._multiDrawCount,bt=ze?se.get(ze).bytesPerElement:1,zn=D.get(K).currentProgram.getUniforms();for(let ho=0;ho<On;ho++)zn.setValue(B,"_gl_DrawID",ho),Lt.render(bn[ho]/bt,Ge[ho])}else if($.isInstancedMesh)Lt.renderInstances(qe,tn,$.count);else if(Q.isInstancedBufferGeometry){const bn=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Ge=Math.min(Q.instanceCount,bn);Lt.renderInstances(qe,tn,Ge)}else Lt.render(qe,tn)};function uo(C,H,Q){C.transparent===!0&&C.side===$e&&C.forceSinglePass===!1?(C.side=An,C.needsUpdate=!0,ps(C,H,Q),C.side=Ei,C.needsUpdate=!0,ps(C,H,Q),C.side=$e):ps(C,H,Q)}this.compile=function(C,H,Q=null){Q===null&&(Q=C),w=Ie.get(Q),w.init(H),v.push(w),Q.traverseVisible(function($){$.isLight&&$.layers.test(H.layers)&&(w.pushLight($),$.castShadow&&w.pushShadow($))}),C!==Q&&C.traverseVisible(function($){$.isLight&&$.layers.test(H.layers)&&(w.pushLight($),$.castShadow&&w.pushShadow($))}),w.setupLights();const K=new Set;return C.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Ue=$.material;if(Ue)if(Array.isArray(Ue))for(let Be=0;Be<Ue.length;Be++){const Le=Ue[Be];uo(Le,Q,$),K.add(Le)}else uo(Ue,Q,$),K.add(Ue)}),w=v.pop(),K},this.compileAsync=function(C,H,Q=null){const K=this.compile(C,H,Q);return new Promise($=>{function Ue(){if(K.forEach(function(Be){D.get(Be).currentProgram.isReady()&&K.delete(Be)}),K.size===0){$(C);return}setTimeout(Ue,10)}lt.get("KHR_parallel_shader_compile")!==null?Ue():setTimeout(Ue,10)})};let na=null;function bd(C){na&&na(C)}function Ar(){Jo.stop()}function Pr(){Jo.start()}const Jo=new gl;Jo.setAnimationLoop(bd),typeof self<"u"&&Jo.setContext(self),this.setAnimationLoop=function(C){na=C,Ee.setAnimationLoop(C),C===null?Jo.stop():Jo.start()},Ee.addEventListener("sessionstart",Ar),Ee.addEventListener("sessionend",Pr),this.render=function(C,H){if(H!==void 0&&H.isCamera!==!0){Ht("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;R!==null&&R.renderStart(C,H);const Q=Ee.enabled===!0&&Ee.isPresenting===!0,K=E!==null&&(U===null||Q)&&E.begin(b,U);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(H),H=Ee.getCamera()),C.isScene===!0&&C.onBeforeRender(b,C,H,U),w=Ie.get(C,v.length),w.init(H),w.state.textureUnits=P.getTextureUnits(),v.push(w),ct.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Te.setFromProjectionMatrix(ct,kr,H.reversedDepth),Xe=this.localClippingEnabled,Ze=Oe.init(this.clippingPlanes,Xe),T=ce.get(C,y.length),T.init(),y.push(T),Ee.enabled===!0&&Ee.isPresenting===!0){const Be=b.xr.getDepthSensingMesh();Be!==null&&oa(Be,H,-1/0,b.sortObjects)}oa(C,H,0,b.sortObjects),T.finish(),b.sortObjects===!0&&T.sort(z,j),At=Ee.enabled===!1||Ee.isPresenting===!1||Ee.hasDepthSensing()===!1,At&&xe.addToRenderList(T,C),this.info.render.frame++,Ze===!0&&Oe.beginShadows();const $=w.state.shadowsArray;if(_e.render($,C,H),Ze===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(K&&E.hasRenderPass())===!1){const Be=T.opaque,Le=T.transmissive;if(w.setupLights(),H.isArrayCamera){const ze=H.cameras;if(Le.length>0)for(let We=0,at=ze.length;We<at;We++){const ut=ze[We];Cr(Be,Le,C,ut)}At&&xe.render(C);for(let We=0,at=ze.length;We<at;We++){const ut=ze[We];Rr(T,C,ut,ut.viewport)}}else Le.length>0&&Cr(Be,Le,C,H),At&&xe.render(C),Rr(T,C,H)}U!==null&&I===0&&(P.updateMultisampleRenderTarget(U),P.updateRenderTargetMipmap(U)),K&&E.end(b),C.isScene===!0&&C.onAfterRender(b,C,H),Me.resetDefaultState(),N=-1,O=null,v.pop(),v.length>0?(w=v[v.length-1],P.setTextureUnits(w.state.textureUnits),Ze===!0&&Oe.setGlobalState(b.clippingPlanes,w.state.camera)):w=null,y.pop(),y.length>0?T=y[y.length-1]:T=null,R!==null&&R.renderEnd()};function oa(C,H,Q,K){if(C.visible===!1)return;if(C.layers.test(H.layers)){if(C.isGroup)Q=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(H);else if(C.isLightProbeGrid)w.pushLightProbeGrid(C);else if(C.isLight)w.pushLight(C),C.castShadow&&w.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Te.intersectsSprite(C)){K&&je.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ct);const Be=ve.update(C),Le=C.material;Le.visible&&T.push(C,Be,Le,Q,je.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Te.intersectsObject(C))){const Be=ve.update(C),Le=C.material;if(K&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),je.copy(C.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),je.copy(Be.boundingSphere.center)),je.applyMatrix4(C.matrixWorld).applyMatrix4(ct)),Array.isArray(Le)){const ze=Be.groups;for(let We=0,at=ze.length;We<at;We++){const ut=ze[We],qe=Le[ut.materialIndex];qe&&qe.visible&&T.push(C,Be,qe,Q,je.z,ut)}}else Le.visible&&T.push(C,Be,Le,Q,je.z,null)}}const Ue=C.children;for(let Be=0,Le=Ue.length;Be<Le;Be++)oa(Ue[Be],H,Q,K)}function Rr(C,H,Q,K){const{opaque:$,transmissive:Ue,transparent:Be}=C;w.setupLightsView(Q),Ze===!0&&Oe.setGlobalState(b.clippingPlanes,Q),K&&Ae.viewport(V.copy(K)),$.length>0&&hs($,H,Q),Ue.length>0&&hs(Ue,H,Q),Be.length>0&&hs(Be,H,Q),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function Cr(C,H,Q,K){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[K.id]===void 0){const qe=lt.has("EXT_color_buffer_half_float")||lt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[K.id]=new mn(1,1,{generateMipmaps:!0,type:qe?Tn:no,minFilter:Ro,samples:Math.max(4,Pt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Vt.workingColorSpace})}const Ue=w.state.transmissionRenderTarget[K.id],Be=K.viewport||V;Ue.setSize(Be.z*b.transmissionResolutionScale,Be.w*b.transmissionResolutionScale);const Le=b.getRenderTarget(),ze=b.getActiveCubeFace(),We=b.getActiveMipmapLevel();b.setRenderTarget(Ue),b.getClearColor(W),k=b.getClearAlpha(),k<1&&b.setClearColor(16777215,.5),b.clear(),At&&xe.render(Q);const at=b.toneMapping;b.toneMapping=_o;const ut=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),w.setupLightsView(K),Ze===!0&&Oe.setGlobalState(b.clippingPlanes,K),hs(C,Q,K),P.updateMultisampleRenderTarget(Ue),P.updateRenderTargetMipmap(Ue),lt.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let Dt=0,tn=H.length;Dt<tn;Dt++){const Zt=H[Dt],{object:Lt,geometry:bn,material:Ge,group:On}=Zt;if(Ge.side===$e&&Lt.layers.test(K.layers)){const bt=Ge.side;Ge.side=An,Ge.needsUpdate=!0,Dr(Lt,Q,K,bn,Ge,On),Ge.side=bt,Ge.needsUpdate=!0,qe=!0}}qe===!0&&(P.updateMultisampleRenderTarget(Ue),P.updateRenderTargetMipmap(Ue))}b.setRenderTarget(Le,ze,We),b.setClearColor(W,k),ut!==void 0&&(K.viewport=ut),b.toneMapping=at}function hs(C,H,Q){const K=H.isScene===!0?H.overrideMaterial:null;for(let $=0,Ue=C.length;$<Ue;$++){const Be=C[$],{object:Le,geometry:ze,group:We}=Be;let at=Be.material;at.allowOverride===!0&&K!==null&&(at=K),Le.layers.test(Q.layers)&&Dr(Le,H,Q,ze,at,We)}}function Dr(C,H,Q,K,$,Ue){C.onBeforeRender(b,H,Q,K,$,Ue),C.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),$.onBeforeRender(b,H,Q,K,C,Ue),$.transparent===!0&&$.side===$e&&$.forceSinglePass===!1?($.side=An,$.needsUpdate=!0,b.renderBufferDirect(Q,H,K,$,C,Ue),$.side=Ei,$.needsUpdate=!0,b.renderBufferDirect(Q,H,K,$,C,Ue),$.side=$e):b.renderBufferDirect(Q,H,K,$,C,Ue),C.onAfterRender(b,H,Q,K,$,Ue)}function ps(C,H,Q){H.isScene!==!0&&(H=Tt);const K=D.get(C),$=w.state.lights,Ue=w.state.shadowsArray,Be=$.state.version,Le=Se.getParameters(C,$.state,Ue,H,Q,w.state.lightProbeGridArray),ze=Se.getProgramCacheKey(Le);let We=K.programs;K.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?H.environment:null,K.fog=H.fog;const at=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;K.envMap=q.get(C.envMap||K.environment,at),K.envMapRotation=K.environment!==null&&C.envMap===null?H.environmentRotation:C.envMapRotation,We===void 0&&(C.addEventListener("dispose",en),We=new Map,K.programs=We);let ut=We.get(ze);if(ut!==void 0){if(K.currentProgram===ut&&K.lightsStateVersion===Be)return Lr(C,Le),ut}else Le.uniforms=Se.getUniforms(C),R!==null&&C.isNodeMaterial&&R.build(C,Q,Le),C.onBeforeCompile(Le,b),ut=Se.acquireProgram(Le,ze),We.set(ze,ut),K.uniforms=Le.uniforms;const qe=K.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(qe.clippingPlanes=Oe.uniform),Lr(C,Le),K.needsLights=Ed(C),K.lightsStateVersion=Be,K.needsLights&&(qe.ambientLightColor.value=$.state.ambient,qe.lightProbe.value=$.state.probe,qe.directionalLights.value=$.state.directional,qe.directionalLightShadows.value=$.state.directionalShadow,qe.spotLights.value=$.state.spot,qe.spotLightShadows.value=$.state.spotShadow,qe.rectAreaLights.value=$.state.rectArea,qe.ltc_1.value=$.state.rectAreaLTC1,qe.ltc_2.value=$.state.rectAreaLTC2,qe.pointLights.value=$.state.point,qe.pointLightShadows.value=$.state.pointShadow,qe.hemisphereLights.value=$.state.hemi,qe.directionalShadowMatrix.value=$.state.directionalShadowMatrix,qe.spotLightMatrix.value=$.state.spotLightMatrix,qe.spotLightMap.value=$.state.spotLightMap,qe.pointShadowMatrix.value=$.state.pointShadowMatrix),K.lightProbeGrid=w.state.lightProbeGridArray.length>0,K.currentProgram=ut,K.uniformsList=null,ut}function Ir(C){if(C.uniformsList===null){const H=C.currentProgram.getUniforms();C.uniformsList=Ps.seqWithValue(H.seq,C.uniforms)}return C.uniformsList}function Lr(C,H){const Q=D.get(C);Q.outputColorSpace=H.outputColorSpace,Q.batching=H.batching,Q.batchingColor=H.batchingColor,Q.instancing=H.instancing,Q.instancingColor=H.instancingColor,Q.instancingMorph=H.instancingMorph,Q.skinning=H.skinning,Q.morphTargets=H.morphTargets,Q.morphNormals=H.morphNormals,Q.morphColors=H.morphColors,Q.morphTargetsCount=H.morphTargetsCount,Q.numClippingPlanes=H.numClippingPlanes,Q.numIntersection=H.numClipIntersection,Q.vertexAlphas=H.vertexAlphas,Q.vertexTangents=H.vertexTangents,Q.toneMapping=H.toneMapping}function Sd(C,H){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;S.setFromMatrixPosition(H.matrixWorld);for(let Q=0,K=C.length;Q<K;Q++){const $=C[Q];if($.texture!==null&&$.boundingBox.containsPoint(S))return $}return null}function wd(C,H,Q,K,$){H.isScene!==!0&&(H=Tt),P.resetTextureUnits();const Ue=H.fog,Be=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?H.environment:null,Le=U===null?b.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Vt.workingColorSpace,ze=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,We=q.get(K.envMap||Be,ze),at=K.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,ut=!!Q.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),qe=!!Q.morphAttributes.position,Dt=!!Q.morphAttributes.normal,tn=!!Q.morphAttributes.color;let Zt=_o;K.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Zt=b.toneMapping);const Lt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,bn=Lt!==void 0?Lt.length:0,Ge=D.get(K),On=w.state.lights;if(Ze===!0&&(Xe===!0||C!==O)){const Bt=C===O&&K.id===N;Oe.setState(K,C,Bt)}let bt=!1;K.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==On.state.version||Ge.outputColorSpace!==Le||$.isBatchedMesh&&Ge.batching===!1||!$.isBatchedMesh&&Ge.batching===!0||$.isBatchedMesh&&Ge.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&Ge.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&Ge.instancing===!1||!$.isInstancedMesh&&Ge.instancing===!0||$.isSkinnedMesh&&Ge.skinning===!1||!$.isSkinnedMesh&&Ge.skinning===!0||$.isInstancedMesh&&Ge.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Ge.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Ge.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Ge.instancingMorph===!1&&$.morphTexture!==null||Ge.envMap!==We||K.fog===!0&&Ge.fog!==Ue||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==Oe.numPlanes||Ge.numIntersection!==Oe.numIntersection)||Ge.vertexAlphas!==at||Ge.vertexTangents!==ut||Ge.morphTargets!==qe||Ge.morphNormals!==Dt||Ge.morphColors!==tn||Ge.toneMapping!==Zt||Ge.morphTargetsCount!==bn||!!Ge.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(bt=!0):(bt=!0,Ge.__version=K.version);let zn=Ge.currentProgram;bt===!0&&(zn=ps(K,H,$),R&&K.isNodeMaterial&&R.onUpdateProgram(K,zn,Ge));let ho=!1,Fo=!1,hi=!1;const Ut=zn.getUniforms(),nn=Ge.uniforms;if(Ae.useProgram(zn.program)&&(ho=!0,Fo=!0,hi=!0),K.id!==N&&(N=K.id,Fo=!0),Ge.needsLights){const Bt=Sd(w.state.lightProbeGridArray,$);Ge.lightProbeGrid!==Bt&&(Ge.lightProbeGrid=Bt,Fo=!0)}if(ho||O!==C){Ae.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),Ut.setValue(B,"projectionMatrix",C.projectionMatrix),Ut.setValue(B,"viewMatrix",C.matrixWorldInverse);const Go=Ut.map.cameraPosition;Go!==void 0&&Go.setValue(B,it.setFromMatrixPosition(C.matrixWorld)),Pt.logarithmicDepthBuffer&&Ut.setValue(B,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Ut.setValue(B,"isOrthographic",C.isOrthographicCamera===!0),O!==C&&(O=C,Fo=!0,hi=!0)}if(Ge.needsLights&&(On.state.directionalShadowMap.length>0&&Ut.setValue(B,"directionalShadowMap",On.state.directionalShadowMap,P),On.state.spotShadowMap.length>0&&Ut.setValue(B,"spotShadowMap",On.state.spotShadowMap,P),On.state.pointShadowMap.length>0&&Ut.setValue(B,"pointShadowMap",On.state.pointShadowMap,P)),$.isSkinnedMesh){Ut.setOptional(B,$,"bindMatrix"),Ut.setOptional(B,$,"bindMatrixInverse");const Bt=$.skeleton;Bt&&(Bt.boneTexture===null&&Bt.computeBoneTexture(),Ut.setValue(B,"boneTexture",Bt.boneTexture,P))}$.isBatchedMesh&&(Ut.setOptional(B,$,"batchingTexture"),Ut.setValue(B,"batchingTexture",$._matricesTexture,P),Ut.setOptional(B,$,"batchingIdTexture"),Ut.setValue(B,"batchingIdTexture",$._indirectTexture,P),Ut.setOptional(B,$,"batchingColorTexture"),$._colorsTexture!==null&&Ut.setValue(B,"batchingColorTexture",$._colorsTexture,P));const Oo=Q.morphAttributes;if((Oo.position!==void 0||Oo.normal!==void 0||Oo.color!==void 0)&&Qe.update($,Q,zn),(Fo||Ge.receiveShadow!==$.receiveShadow)&&(Ge.receiveShadow=$.receiveShadow,Ut.setValue(B,"receiveShadow",$.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&H.environment!==null&&(nn.envMapIntensity.value=H.environmentIntensity),nn.dfgLUT!==void 0&&(nn.dfgLUT.value=lm()),Fo){if(Ut.setValue(B,"toneMappingExposure",b.toneMappingExposure),Ge.needsLights&&yd(nn,hi),Ue&&K.fog===!0&&oe.refreshFogUniforms(nn,Ue),oe.refreshMaterialUniforms(nn,K,ue,ae,w.state.transmissionRenderTarget[C.id]),Ge.needsLights&&Ge.lightProbeGrid){const Bt=Ge.lightProbeGrid;nn.probesSH.value=Bt.texture,nn.probesMin.value.copy(Bt.boundingBox.min),nn.probesMax.value.copy(Bt.boundingBox.max),nn.probesResolution.value.copy(Bt.resolution)}Ps.upload(B,Ir(Ge),nn,P)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Ps.upload(B,Ir(Ge),nn,P),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Ut.setValue(B,"center",$.center),Ut.setValue(B,"modelViewMatrix",$.modelViewMatrix),Ut.setValue(B,"normalMatrix",$.normalMatrix),Ut.setValue(B,"modelMatrix",$.matrixWorld),K.uniformsGroups!==void 0){const Bt=K.uniformsGroups;for(let Go=0,pi=Bt.length;Go<pi;Go++){const Ur=Bt[Go];re.update(Ur,zn),re.bind(Ur,zn)}}return zn}function yd(C,H){C.ambientLightColor.needsUpdate=H,C.lightProbe.needsUpdate=H,C.directionalLights.needsUpdate=H,C.directionalLightShadows.needsUpdate=H,C.pointLights.needsUpdate=H,C.pointLightShadows.needsUpdate=H,C.spotLights.needsUpdate=H,C.spotLightShadows.needsUpdate=H,C.rectAreaLights.needsUpdate=H,C.hemisphereLights.needsUpdate=H}function Ed(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(C,H,Q){const K=D.get(C);K.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),D.get(C.texture).__webglTexture=H,D.get(C.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:Q,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,H){const Q=D.get(C);Q.__webglFramebuffer=H,Q.__useDefaultFramebuffer=H===void 0};const Td=B.createFramebuffer();this.setRenderTarget=function(C,H=0,Q=0){U=C,L=H,I=Q;let K=null,$=!1,Ue=!1;if(C){const Le=D.get(C);if(Le.__useDefaultFramebuffer!==void 0){Ae.bindFramebuffer(B.FRAMEBUFFER,Le.__webglFramebuffer),V.copy(C.viewport),X.copy(C.scissor),J=C.scissorTest,Ae.viewport(V),Ae.scissor(X),Ae.setScissorTest(J),N=-1;return}else if(Le.__webglFramebuffer===void 0)P.setupRenderTarget(C);else if(Le.__hasExternalTextures)P.rebindTextures(C,D.get(C.texture).__webglTexture,D.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const at=C.depthTexture;if(Le.__boundDepthTexture!==at){if(at!==null&&D.has(at)&&(C.width!==at.image.width||C.height!==at.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(C)}}const ze=C.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(Ue=!0);const We=D.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(We[H])?K=We[H][Q]:K=We[H],$=!0):C.samples>0&&P.useMultisampledRTT(C)===!1?K=D.get(C).__webglMultisampledFramebuffer:Array.isArray(We)?K=We[Q]:K=We,V.copy(C.viewport),X.copy(C.scissor),J=C.scissorTest}else V.copy(Z).multiplyScalar(ue).floor(),X.copy(de).multiplyScalar(ue).floor(),J=be;if(Q!==0&&(K=Td),Ae.bindFramebuffer(B.FRAMEBUFFER,K)&&Ae.drawBuffers(C,K),Ae.viewport(V),Ae.scissor(X),Ae.setScissorTest(J),$){const Le=D.get(C.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+H,Le.__webglTexture,Q)}else if(Ue){const Le=H;for(let ze=0;ze<C.textures.length;ze++){const We=D.get(C.textures[ze]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+ze,We.__webglTexture,Q,Le)}}else if(C!==null&&Q!==0){const Le=D.get(C.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Le.__webglTexture,Q)}N=-1},this.readRenderTargetPixels=function(C,H,Q,K,$,Ue,Be,Le=0){if(!(C&&C.isWebGLRenderTarget)){Ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=D.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Be!==void 0&&(ze=ze[Be]),ze){Ae.bindFramebuffer(B.FRAMEBUFFER,ze);try{const We=C.textures[Le],at=We.format,ut=We.type;if(C.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Le),!Pt.textureFormatReadable(at)){Ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pt.textureTypeReadable(ut)){Ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=C.width-K&&Q>=0&&Q<=C.height-$&&B.readPixels(H,Q,K,$,F.convert(at),F.convert(ut),Ue)}finally{const We=U!==null?D.get(U).__webglFramebuffer:null;Ae.bindFramebuffer(B.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(C,H,Q,K,$,Ue,Be,Le=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=D.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Be!==void 0&&(ze=ze[Be]),ze)if(H>=0&&H<=C.width-K&&Q>=0&&Q<=C.height-$){Ae.bindFramebuffer(B.FRAMEBUFFER,ze);const We=C.textures[Le],at=We.format,ut=We.type;if(C.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Le),!Pt.textureFormatReadable(at))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pt.textureTypeReadable(ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qe=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,qe),B.bufferData(B.PIXEL_PACK_BUFFER,Ue.byteLength,B.STREAM_READ),B.readPixels(H,Q,K,$,F.convert(at),F.convert(ut),0);const Dt=U!==null?D.get(U).__webglFramebuffer:null;Ae.bindFramebuffer(B.FRAMEBUFFER,Dt);const tn=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Ld(B,tn,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,qe),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Ue),B.deleteBuffer(qe),B.deleteSync(tn),Ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,H=null,Q=0){const K=Math.pow(2,-Q),$=Math.floor(C.image.width*K),Ue=Math.floor(C.image.height*K),Be=H!==null?H.x:0,Le=H!==null?H.y:0;P.setTexture2D(C,0),B.copyTexSubImage2D(B.TEXTURE_2D,Q,0,0,Be,Le,$,Ue),Ae.unbindTexture()};const Ad=B.createFramebuffer(),Pd=B.createFramebuffer();this.copyTextureToTexture=function(C,H,Q=null,K=null,$=0,Ue=0){let Be,Le,ze,We,at,ut,qe,Dt,tn;const Zt=C.isCompressedTexture?C.mipmaps[Ue]:C.image;if(Q!==null)Be=Q.max.x-Q.min.x,Le=Q.max.y-Q.min.y,ze=Q.isBox3?Q.max.z-Q.min.z:1,We=Q.min.x,at=Q.min.y,ut=Q.isBox3?Q.min.z:0;else{const nn=Math.pow(2,-$);Be=Math.floor(Zt.width*nn),Le=Math.floor(Zt.height*nn),C.isDataArrayTexture?ze=Zt.depth:C.isData3DTexture?ze=Math.floor(Zt.depth*nn):ze=1,We=0,at=0,ut=0}K!==null?(qe=K.x,Dt=K.y,tn=K.z):(qe=0,Dt=0,tn=0);const Lt=F.convert(H.format),bn=F.convert(H.type);let Ge;H.isData3DTexture?(P.setTexture3D(H,0),Ge=B.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(P.setTexture2DArray(H,0),Ge=B.TEXTURE_2D_ARRAY):(P.setTexture2D(H,0),Ge=B.TEXTURE_2D),Ae.activeTexture(B.TEXTURE0),Ae.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,H.flipY),Ae.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),Ae.pixelStorei(B.UNPACK_ALIGNMENT,H.unpackAlignment);const On=Ae.getParameter(B.UNPACK_ROW_LENGTH),bt=Ae.getParameter(B.UNPACK_IMAGE_HEIGHT),zn=Ae.getParameter(B.UNPACK_SKIP_PIXELS),ho=Ae.getParameter(B.UNPACK_SKIP_ROWS),Fo=Ae.getParameter(B.UNPACK_SKIP_IMAGES);Ae.pixelStorei(B.UNPACK_ROW_LENGTH,Zt.width),Ae.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Zt.height),Ae.pixelStorei(B.UNPACK_SKIP_PIXELS,We),Ae.pixelStorei(B.UNPACK_SKIP_ROWS,at),Ae.pixelStorei(B.UNPACK_SKIP_IMAGES,ut);const hi=C.isDataArrayTexture||C.isData3DTexture,Ut=H.isDataArrayTexture||H.isData3DTexture;if(C.isDepthTexture){const nn=D.get(C),Oo=D.get(H),Bt=D.get(nn.__renderTarget),Go=D.get(Oo.__renderTarget);Ae.bindFramebuffer(B.READ_FRAMEBUFFER,Bt.__webglFramebuffer),Ae.bindFramebuffer(B.DRAW_FRAMEBUFFER,Go.__webglFramebuffer);for(let pi=0;pi<ze;pi++)hi&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,D.get(C).__webglTexture,$,ut+pi),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,D.get(H).__webglTexture,Ue,tn+pi)),B.blitFramebuffer(We,at,Be,Le,qe,Dt,Be,Le,B.DEPTH_BUFFER_BIT,B.NEAREST);Ae.bindFramebuffer(B.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if($!==0||C.isRenderTargetTexture||D.has(C)){const nn=D.get(C),Oo=D.get(H);Ae.bindFramebuffer(B.READ_FRAMEBUFFER,Ad),Ae.bindFramebuffer(B.DRAW_FRAMEBUFFER,Pd);for(let Bt=0;Bt<ze;Bt++)hi?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,nn.__webglTexture,$,ut+Bt):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,nn.__webglTexture,$),Ut?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Oo.__webglTexture,Ue,tn+Bt):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Oo.__webglTexture,Ue),$!==0?B.blitFramebuffer(We,at,Be,Le,qe,Dt,Be,Le,B.COLOR_BUFFER_BIT,B.NEAREST):Ut?B.copyTexSubImage3D(Ge,Ue,qe,Dt,tn+Bt,We,at,Be,Le):B.copyTexSubImage2D(Ge,Ue,qe,Dt,We,at,Be,Le);Ae.bindFramebuffer(B.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Ut?C.isDataTexture||C.isData3DTexture?B.texSubImage3D(Ge,Ue,qe,Dt,tn,Be,Le,ze,Lt,bn,Zt.data):H.isCompressedArrayTexture?B.compressedTexSubImage3D(Ge,Ue,qe,Dt,tn,Be,Le,ze,Lt,Zt.data):B.texSubImage3D(Ge,Ue,qe,Dt,tn,Be,Le,ze,Lt,bn,Zt):C.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,Ue,qe,Dt,Be,Le,Lt,bn,Zt.data):C.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,Ue,qe,Dt,Zt.width,Zt.height,Lt,Zt.data):B.texSubImage2D(B.TEXTURE_2D,Ue,qe,Dt,Be,Le,Lt,bn,Zt);Ae.pixelStorei(B.UNPACK_ROW_LENGTH,On),Ae.pixelStorei(B.UNPACK_IMAGE_HEIGHT,bt),Ae.pixelStorei(B.UNPACK_SKIP_PIXELS,zn),Ae.pixelStorei(B.UNPACK_SKIP_ROWS,ho),Ae.pixelStorei(B.UNPACK_SKIP_IMAGES,Fo),Ue===0&&H.generateMipmaps&&B.generateMipmap(Ge),Ae.unbindTexture()},this.initRenderTarget=function(C){D.get(C).__webglFramebuffer===void 0&&P.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?P.setTextureCube(C,0):C.isData3DTexture?P.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?P.setTexture2DArray(C,0):P.setTexture2D(C,0),Ae.unbindTexture()},this.resetState=function(){L=0,I=0,U=null,Ae.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const e=this.getContext();e.drawingBufferColorSpace=Vt._getDrawingBufferColorSpace(n),e.unpackColorSpace=Vt._getUnpackColorSpace()}}const Wi=new Y;function Hn(t,n,e,o,i,s){const a=2*Math.PI*i/4,r=Math.max(s-2*i,0),c=Math.PI/4;Wi.copy(n),Wi[o]=0,Wi.normalize();const l=.5*a/(a+r),f=1-Wi.angleTo(t)/c;return Math.sign(Wi[e])===1?f*l:r/(a+r)+l+l*(1-f)}class Do extends Ye{constructor(n=1,e=1,o=1,i=2,s=.1){const a=i*2+1;if(s=Math.min(n/2,e/2,o/2,s),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:n,height:e,depth:o,segments:i,radius:s},a===1)return;const r=this.toNonIndexed();this.index=null,this.attributes.position=r.attributes.position,this.attributes.normal=r.attributes.normal,this.attributes.uv=r.attributes.uv;const c=new Y,l=new Y,f=new Y(n,e,o).divideScalar(2).subScalar(s),d=this.attributes.position.array,u=this.attributes.normal.array,h=this.attributes.uv.array,m=d.length/6,_=new Y,p=.5/a;for(let g=0,x=0;g<d.length;g+=3,x+=2)switch(c.fromArray(d,g),l.copy(c),l.x-=Math.sign(l.x)*p,l.y-=Math.sign(l.y)*p,l.z-=Math.sign(l.z)*p,l.normalize(),d[g+0]=f.x*Math.sign(c.x)+l.x*s,d[g+1]=f.y*Math.sign(c.y)+l.y*s,d[g+2]=f.z*Math.sign(c.z)+l.z*s,u[g+0]=l.x,u[g+1]=l.y,u[g+2]=l.z,Math.floor(g/m)){case 0:_.set(1,0,0),h[x+0]=Hn(_,l,"z","y",s,o),h[x+1]=1-Hn(_,l,"y","z",s,e);break;case 1:_.set(-1,0,0),h[x+0]=1-Hn(_,l,"z","y",s,o),h[x+1]=1-Hn(_,l,"y","z",s,e);break;case 2:_.set(0,1,0),h[x+0]=1-Hn(_,l,"x","z",s,n),h[x+1]=Hn(_,l,"z","x",s,o);break;case 3:_.set(0,-1,0),h[x+0]=1-Hn(_,l,"x","z",s,n),h[x+1]=1-Hn(_,l,"z","x",s,o);break;case 4:_.set(0,0,1),h[x+0]=1-Hn(_,l,"x","y",s,n),h[x+1]=1-Hn(_,l,"y","x",s,e);break;case 5:_.set(0,0,-1),h[x+0]=Hn(_,l,"x","y",s,n),h[x+1]=1-Hn(_,l,"y","x",s,e);break}}static fromJSON(n){return new Do(n.width,n.height,n.depth,n.segments,n.radius)}}function No(t,n=!1){const e=t[0].index!==null,o=new Set(Object.keys(t[0].attributes)),i=new Set(Object.keys(t[0].morphAttributes)),s={},a={},r=t[0].morphTargetsRelative,c=new sn;let l=0;for(let f=0;f<t.length;++f){const d=t[f];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const h in d.attributes){if(!o.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have compatible attributes; make sure "'+h+'" attribute exists among all geometries, or in none of them.'),null;s[h]===void 0&&(s[h]=[]),s[h].push(d.attributes[h]),u++}if(u!==o.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of attributes."),null;if(r!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const h in d.morphAttributes){if(!i.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+".  .morphAttributes must be consistent throughout all geometries."),null;a[h]===void 0&&(a[h]=[]),a[h].push(d.morphAttributes[h])}if(n){let h;if(e)h=d.index.count;else if(d.attributes.position!==void 0)h=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,h,f),l+=h}}if(e){let f=0;const d=[];for(let u=0;u<t.length;++u){const h=t[u].index;for(let m=0;m<h.count;++m)d.push(h.getX(m)+f);f+=t[u].attributes.position.count}c.setIndex(d)}for(const f in s){const d=K0(s[f]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" attribute."),null;c.setAttribute(f,d)}for(const f in a){const d=a[f][0].length;if(d!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[f]=[];for(let u=0;u<d;++u){const h=[];for(let _=0;_<a[f].length;++_)h.push(a[f][_][u]);const m=K0(h);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" morphAttribute."),null;c.morphAttributes[f].push(m)}}}return c}function K0(t){let n,e,o,i=-1,s=0;for(let l=0;l<t.length;++l){const f=t[l];if(n===void 0&&(n=f.array.constructor),n!==f.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=f.itemSize),e!==f.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(o===void 0&&(o=f.normalized),o!==f.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=f.gpuType),i!==f.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=f.count*e}const a=new n(s),r=new xt(a,e,o);let c=0;for(let l=0;l<t.length;++l){const f=t[l];if(f.isInterleavedBufferAttribute){const d=c/e;for(let u=0,h=f.count;u<h;u++)for(let m=0;m<e;m++){const _=f.getComponent(u,m);r.setComponent(u+d,m,_)}}else a.set(f.array,c);c+=f.count*e}return i!==void 0&&(r.gpuType=i),r}function li(t,n=1e-4){n=Math.max(n,Number.EPSILON);const e={},o=t.getIndex(),i=t.getAttribute("position"),s=o?o.count:i.count;let a=0;const r=Object.keys(t.attributes),c={},l={},f=[],d=["getX","getY","getZ","getW"],u=["setX","setY","setZ","setW"];for(let x=0,M=r.length;x<M;x++){const S=r[x],T=t.attributes[S];c[S]=new T.constructor(new T.array.constructor(T.count*T.itemSize),T.itemSize,T.normalized);const w=t.morphAttributes[S];w&&(l[S]||(l[S]=[]),w.forEach((y,v)=>{const E=new y.array.constructor(y.count*y.itemSize);l[S][v]=new y.constructor(E,y.itemSize,y.normalized)}))}const h=n*.5,m=Math.log10(1/n),_=Math.pow(10,m),p=h*_;for(let x=0;x<s;x++){const M=o?o.getX(x):x;let S="";for(let T=0,w=r.length;T<w;T++){const y=r[T],v=t.getAttribute(y),E=v.itemSize;for(let b=0;b<E;b++)S+=`${~~(v[d[b]](M)*_+p)},`}if(S in e)f.push(e[S]);else{for(let T=0,w=r.length;T<w;T++){const y=r[T],v=t.getAttribute(y),E=t.morphAttributes[y],b=v.itemSize,A=c[y],R=l[y];for(let L=0;L<b;L++){const I=d[L],U=u[L];if(A[U](a,v[I](M)),E)for(let N=0,O=E.length;N<O;N++)R[N][U](a,E[N][I](M))}}e[S]=a,f.push(a),a++}}const g=t.clone();for(const x in t.attributes){const M=c[x];if(g.setAttribute(x,new M.constructor(M.array.slice(0,a*M.itemSize),M.itemSize,M.normalized)),x in l)for(let S=0;S<l[x].length;S++){const T=l[x][S];g.morphAttributes[x][S]=new T.constructor(T.array.slice(0,a*T.itemSize),T.itemSize,T.normalized)}}return g.setIndex(f),g}function $0(t,n){if(n===Ff)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),t;if(n===Ga||n===cl){let e=t.getIndex();if(e===null){const a=[],r=t.getAttribute("position");if(r!==void 0){for(let c=0;c<r.count;c++)a.push(c);t.setIndex(a),e=t.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),t}const o=e.count-2,i=[];if(n===Ga)for(let a=1;a<=o;a++)i.push(e.getX(0)),i.push(e.getX(a)),i.push(e.getX(a+1));else for(let a=0;a<o;a++)a%2===0?(i.push(e.getX(a)),i.push(e.getX(a+1)),i.push(e.getX(a+2))):(i.push(e.getX(a+2)),i.push(e.getX(a+1)),i.push(e.getX(a)));i.length/3!==o&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=t.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",n),t}const j0=new WeakSet,fm=`
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
`;function yl(t,n=1){t.traverse(e=>{const o=e;if(!o.isMesh)return;const i=Array.isArray(o.material)?o.material:[o.material];for(const s of i){if(j0.has(s)||s.type!=="MeshStandardMaterial")continue;const a=s;if(a.map||a.normalMap||a.bumpMap||a.vertexColors||a.transparent||a.emissiveIntensity>.25&&a.emissive.getHex()!==0)continue;j0.add(s);const r=a.onBeforeCompile;a.onBeforeCompile=(l,f)=>{r==null||r.call(a,l,f),l.vertexShader=`varying vec3 vGrainWorld;
`+l.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
           vec4 gLocal = vec4(transformed, 1.0);
           #ifdef USE_INSTANCING
             gLocal = instanceMatrix * gLocal;
           #endif
           vGrainWorld = (modelMatrix * gLocal).xyz;`),l.fragmentShader=fm+l.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
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
             }`)};const c=a.customProgramCacheKey();a.customProgramCacheKey=()=>`grain+${c}`,a.needsUpdate=!0}})}function hr(t,n){return new vn({color:t,emissive:t,emissiveIntensity:n,metalness:.15,roughness:.08,clearcoat:1,clearcoatRoughness:.05,reflectivity:1,transparent:!0,opacity:.92,side:$e})}function Lo(t,n=.82){return new ge({color:t,roughness:n,metalness:.06,envMapIntensity:.4})}function _a(t){return new ge({color:t,roughness:.88,metalness:.04,emissive:1718816,emissiveIntensity:.06})}const El={value:0};function Z0(){const t=new vn({color:1993370,roughness:.06,metalness:.12,transparent:!0,opacity:.72,reflectivity:.95,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:.6});return t.onBeforeCompile=n=>{n.uniforms.uWaterTime=El,n.vertexShader=`varying vec3 vWaterWorld;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vWaterWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`),n.fragmentShader=`
      uniform float uWaterTime;
      varying vec3 vWaterWorld;
      float wHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float wNoise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(wHash(i), wHash(i + vec2(1.0, 0.0)), f.x), mix(wHash(i + vec2(0.0, 1.0)), wHash(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      float wHeight(vec2 p) {
        float t = uWaterTime;
        return wNoise(p * 0.55 + vec2(t * 0.18, t * 0.07)) * 0.6
             + wNoise(p * 1.35 + vec2(-t * 0.22, t * 0.15)) * 0.28
             + wNoise(p * 3.1 + vec2(t * 0.35, -t * 0.3)) * 0.12;
      }
    `+n.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
         {
           float wFade = 1.0 - smoothstep(60.0, 220.0, length(vViewPosition));
           const float wE = 0.08;
           float w0 = wHeight(vWaterWorld.xz);
           vec2 wG = vec2(wHeight(vWaterWorld.xz + vec2(wE, 0.0)) - w0, wHeight(vWaterWorld.xz + vec2(0.0, wE)) - w0) / wE;
           vec3 wGV = mat3(viewMatrix) * vec3(wG.x, 0.0, wG.y);
           wGV -= normal * dot(wGV, normal);
           normal = normalize(normal - wGV * 0.34 * wFade);
         }`).replace("#include <color_fragment>",`#include <color_fragment>
         {
           float wDepth = wHeight(vWaterWorld.xz * 0.2 + 7.0);
           diffuseColor.rgb = mix(diffuseColor.rgb * 0.62, diffuseColor.rgb * 1.35 + vec3(0.02, 0.07, 0.06), wDepth);
         }`).replace("#include <opaque_fragment>",`{
           float wCrest = smoothstep(0.80, 0.93, wHeight(vWaterWorld.xz * 1.9 + vec2(uWaterTime * 0.12, 0.0)));
           outgoingLight += vec3(0.55, 0.62, 0.66) * wCrest * 0.28;
         }
         #include <opaque_fragment>`)},t.customProgramCacheKey=()=>"water-v2",t}function um(t){const e=document.createElement("canvas");e.width=64,e.height=64;const o=e.getContext("2d"),i=o.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return i.addColorStop(0,t),i.addColorStop(.4,"rgba(255,220,140,0.35)"),i.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=i,o.fillRect(0,0,64,64),new Wt(e)}function hm(){return new ge({color:4871528,roughness:.45,metalness:.85})}function pm(t){return new vn({color:t,emissive:t,emissiveIntensity:1.4,roughness:.04,metalness:0,transparent:!0,opacity:.82,clearcoat:1})}function mm(t){const n=new sn;let e=0,o=0;const i=t.some(u=>u.attributes.color);for(const u of t)e+=u.attributes.position.count,o+=u.index?u.index.count:u.attributes.position.count;const s=new Float32Array(e*3),a=new Float32Array(e*3),r=new Float32Array(e*2),c=i?new Float32Array(e*3):null,l=new Uint32Array(o);let f=0,d=0;for(const u of t){const h=u.attributes.position,m=u.attributes.normal,_=u.attributes.uv;s.set(h.array,f*3),m&&a.set(m.array,f*3),_&&r.set(_.array,f*2),c&&(u.attributes.color?c.set(u.attributes.color.array,f*3):c.fill(1,f*3,(f+h.count)*3));const p=u.index;if(p)for(let g=0;g<p.count;g++)l[d++]=p.getX(g)+f;else for(let g=0;g<h.count;g++)l[d++]=g+f;f+=h.count}return n.setAttribute("position",new xt(s,3)),n.setAttribute("normal",new xt(a,3)),n.setAttribute("uv",new xt(r,2)),c&&n.setAttribute("color",new xt(c,3)),n.setIndex(new xt(l,1)),n}const Tl=.5;function gm(t=18){const n=on(90210),e=[];for(let o=0;o<t;o++){const i=n(),s=Math.sqrt(i)*.45,a=n()*Math.PI*2,r=Math.cos(a)*s,c=Math.sin(a)*s,l=.16+n()*.34,f=.05+n()*.04,d=.06+s*.7+n()*.12,u=3,h=[],m=[],_=[],p=Math.cos(a),g=Math.sin(a),x=n()*Math.PI,M=Math.cos(x),S=Math.sin(x);for(let E=0;E<=u;E++){const b=E/u,A=b*l,R=f*(1-b*.92)*.5,L=d*b*b,I=r+p*L,U=c+g*L;h.push(I-M*R,A,U-S*R),h.push(I+M*R,A,U+S*R),m.push(0,b,1,b)}for(let E=0;E<u;E++){const b=E*2,A=E*2+1,R=E*2+2,L=E*2+3;_.push(b,R,A,A,R,L)}const T=new sn;T.setAttribute("position",new Un(h,3)),T.setAttribute("uv",new Un(m,2)),T.setIndex(_),T.computeVertexNormals();const w=.78+n()*.3,y=n()>.82?1:0,v=new Float32Array(h.length);for(let E=0;E<h.length/3;E++){const b=St.clamp(h[E*3+1]/Tl,0,1),A=[.07+b*.2,.15+b*.34,.045+b*.1],R=[.2+b*.34,.17+b*.26,.07+b*.1];for(let L=0;L<3;L++)v[E*3+L]=(A[L]*(1-y)+R[L]*y)*w}T.setAttribute("color",new xt(v,3)),e.push(T)}return mm(e)}const Q0=new Map;function Gi(t=.88,n="leaf"){const e=`${n}:${t}`;let o=Q0.get(e);return o||(o=new ge({color:16777215,vertexColors:!0,roughness:t,metalness:.02}),Q0.set(e,o)),o}function Si(t,n,e,o){return Math.sin(t*2.3+o)*Math.cos(n*2.1+o*1.3)*.5+Math.sin(e*2.7-o*.7+t*1.1)*.35+Math.sin((t+n+e)*4.1+o)*.15}const J0=new Map;function os(t,n,e){const o=`${t}:${n}:${e}`,i=J0.get(o);if(i)return i;const s=li(new $n(1,n),1e-4),a=s.attributes.position,r=new Y;for(let c=0;c<a.count;c++){r.fromBufferAttribute(a,c);const l=Si(r.x,r.y,r.z,t);r.multiplyScalar(1+l*e),a.setXYZ(c,r.x,r.y,r.z)}return s.computeVertexNormals(),s.deleteAttribute("uv"),J0.set(o,s),s}function Yt(t,n,e,o=()=>1){const i=t.clone();i.deleteAttribute("uv"),i.attributes.normal||i.computeVertexNormals();const s=i.attributes.position,a=i.attributes.normal,r=new Float32Array(s.count*3);for(let c=0;c<s.count;c++){const l=o(s.getY(c),a.getY(c));r[c*3]=e.r*l,r[c*3+1]=e.g*l,r[c*3+2]=e.b*l}return i.setAttribute("color",new xt(r,3)),i.applyMatrix4(n),i.index?i:li(i,1e-4)}const vm=new ot,ec=new dn,tc=new co,nc=new Y,oc=new Y;function cn(t,n,e,o=1,i=o,s=o,a=0,r=0,c=0){return tc.set(a,r,c),ec.setFromEuler(tc),nc.set(t,n,e),oc.set(o,i,s),vm.clone().compose(nc,ec,oc)}function Ko(t,n,e,o=!0){if(n.length===0)return;const i=No(n,!1);if(!i)return;const s=new G(i,e);s.castShadow=o,s.receiveShadow=!0,t.add(s)}function pr(t,n,e,o,i){const a=[];for(let f=0;f<=16;f++){const d=f/16,u=n*.6*Math.exp(-d*13);a.push(new rt(St.lerp(n,e,Math.pow(d,.85))+u,-.08*t+d*t*1.08))}const r=new Vs(a,18),c=r.attributes.position,l=new Float32Array(c.count*3);for(let f=0;f<c.count;f++){const d=c.getX(f),u=c.getZ(f),h=c.getY(f),m=Math.atan2(u,d),_=Math.sin(m*7+h*.9/Math.max(.2,t*.15))*.5+Math.sin(m*13-h*1.7/Math.max(.2,t*.15))*.3+Si(d*3,h*2.2,u*3,3)*.6,p=Math.max(0,Math.sin(m*5+.7))*Math.exp(-Math.max(0,h)/(t*.12)),g=1+_*.055+p*.28;c.setX(f,d*g+i*Math.pow(Math.max(0,h)/t,2)*t),c.setZ(f,u*g);const x=.72+.28*St.clamp(.5+_*.6,0,1),M=.7+.3*Math.min(1,Math.max(0,h)/(t*.3)),S=x*M;l[f*3]=o.r*S,l[f*3+1]=o.g*S,l[f*3+2]=o.b*S}return r.setAttribute("color",new xt(l,3)),r.deleteAttribute("uv"),r.computeVertexNormals(),r}const ic=.02;function mr(t){const n=t.attributes.position.count,e=new Float32Array(n*2);for(let o=0;o<n;o++)e[o*2]=ic,e[o*2+1]=1-ic;return t.setAttribute("uv",new xt(e,2)),t}let Ma;function qs(){return Ma||(Ma=new ge({map:Mm(),alphaTest:.5,vertexColors:!0,side:$e,roughness:.86,metalness:.02})),Ma}const xm=new Y(0,1,0),sc=[4885074,4160847,5675343,3500867,6463568,4622922,6989398];function Ys(t,n,e,o,i,s=[.26,.5,.36,2.1]){i.e.set(e()*Math.PI,e()*Math.PI*2,e()*Math.PI),i.q.setFromEuler(i.e),i.m.compose(t,i.q,new Y(n,n,n));const a=new Je(1,1),r=a.attributes.uv;for(let f=0;f<r.count;f++)r.setX(f,.05+r.getX(f)*.95);const c=.7+.5*St.clamp(.5+o*.6,0,1);i.c.setHSL(s[0]+(e()-.5)*.05,s[1],s[2]*c+.1).multiplyScalar(s[3]);const l=new Float32Array(a.attributes.position.count*3);for(let f=0;f<l.length;f+=3)l[f]=i.c.r,l[f+1]=i.c.g,l[f+2]=i.c.b;return a.setAttribute("color",new xt(l,3)),a.applyMatrix4(i.m),a}function Al(t){const n=new Ke,e=on(t.seed),o=t.u,i=new te(5981491),s=[],a=(d,u,h,m,_=1)=>{const p=u.clone().sub(d),g=p.length(),x=new we(m,h,g,7,1);x.translate(0,g/2,0);const M=new dn().setFromUnitVectors(xm,p.normalize());s.push(Yt(x,new ot().compose(d,M,new Y(1,1,1)),i.clone().multiplyScalar(_),S=>.8+.2*Math.min(1,S/g)))},r=13*o;s.push(pr(r,1.9*o,1.15*o,i,(e()-.5)*.02));for(let d=0;d<t.roots;d++){const u=d/t.roots*Math.PI*2+e()*.4,h=(3.4+e()*2.2)*o;a(new Y(Math.cos(u)*o,2.2*o,Math.sin(u)*o),new Y(Math.cos(u)*h,-.25*o,Math.sin(u)*h),.7*o,.18*o,.95)}const c=[];for(let d=0;d<t.limbs;d++){const u=d/t.limbs*Math.PI*2+e()*.4,h=r*(.62+e()*.3),m=(7.5+e()*3.5)*o,_=(5+e()*4)*o;let p=new Y(Math.cos(u)*.5*o,h,Math.sin(u)*.5*o);for(let g=1;g<=t.segs;g++){const x=g/t.segs,M=new Y(Math.cos(u)*m*x,h+_*Math.pow(x,.8)+Math.sin(x*3+d)*.4*o,Math.sin(u)*m*x),S=Math.max(.1*o,.62*o*(1-(g-1)/t.segs*.85)),T=Math.max(.07*o,.62*o*(1-g/t.segs*.85));if(a(p,M,S,T),g>=t.forkFrom)for(const w of[-1,1]){const y=u+w*(.5+e()*.5),v=M.clone().add(new Y(Math.cos(y)*(2.2+e()*1.6)*o,(1.6+e()*2.2)*o,Math.sin(y)*(2.2+e()*1.6)*o));a(M,v,T*.8,.05*o),c.push({p:v,r:(2.1+e()*1.2)*o})}g===2&&c.push({p:M.clone().add(new Y(0,1.2*o,0)),r:(2.4+e()*1.2)*o}),p=M}c.push({p:p.clone().add(new Y(0,.8*o,0)),r:(2.8+e()*1.2)*o})}c.push({p:new Y(0,r+4.5*o,0),r:3.8*o}),Ko(n,s,Gi(.95,"bark"));const l=[],f={m:new ot,q:new dn,e:new co,c:new te};for(const{p:d,r:u}of c){for(let h=0;h<t.blobsPerTip;h++){const m=new te(sc[Math.floor(e()*sc.length)]).offsetHSL((e()-.5)*.04,0,(e()-.5)*.07).multiplyScalar(1.35),_=h===0?0:u*.85,p=(e()-.5)*_,g=(e()-.3)*_*.6,x=(e()-.5)*_,M=u*(h===0?t.blobScale:.34+e()*.3);l.push(mr(Yt(os(Math.floor(e()*5)+1,t.blobDetail,.38),cn(d.x+p,d.y+g,d.z+x,M*1.1,M*.8,M,e()*3,e()*6,e()*3),m,(S,T)=>(.5+.5*St.clamp(.5+.5*T,0,1))*(.93+.1*Math.sin(S*19.3+h)))))}for(let h=0;h<t.cardsPerTip;h++){const m=new Y(e()-.5,e()-.3,e()-.5).normalize(),_=d.clone().addScaledVector(m,u*1.05*(.65+e()*.55)),p=(t.cardSize[0]+e()*(t.cardSize[1]-t.cardSize[0]))*o;l.push(Ys(_,p,e,m.y,f))}}return Ko(n,l,qs()),n}function di(t=1,n="high"){const e=n==="low";return Al({u:.2*t,limbs:4,segs:3,forkFrom:3,roots:3,blobsPerTip:1,blobDetail:e?1:2,blobScale:.6,cardsPerTip:e?10:72,cardSize:[1.5,2.8],seed:Math.floor(t*1e4)+77})}function _m(){return Al({u:1,limbs:8,segs:4,forkFrom:2,roots:8,blobsPerTip:4,blobDetail:2,blobScale:.78,cardsPerTip:40,cardSize:[1.7,3.3],seed:4411})}let vi;function Mm(){if(vi)return vi;const t=256,n=document.createElement("canvas");n.width=n.height=t;const e=n.getContext("2d"),o=on(8821);e.fillStyle="#ffffff",e.fillRect(0,0,10,10);for(let i=0;i<16;i++){e.save(),e.translate(t/2+(o()-.5)*26,t*.62+(o()-.5)*30),e.rotate((o()-.5)*Math.PI*1.6);const s=60+o()*46,a=15+o()*10,r=.62+o()*.38,c=e.createLinearGradient(0,0,s,0);c.addColorStop(0,`rgb(${Math.round(74*r)},${Math.round(120*r)},${Math.round(52*r)})`),c.addColorStop(1,`rgb(${Math.round(150*r)},${Math.round(190*r)},${Math.round(84*r)})`),e.fillStyle=c,e.beginPath(),e.moveTo(0,0),e.quadraticCurveTo(s*.5,-a,s,0),e.quadraticCurveTo(s*.5,a,0,0),e.fill(),e.strokeStyle="rgba(40,70,30,0.55)",e.lineWidth=1.2,e.beginPath(),e.moveTo(0,0),e.lineTo(s*.92,0),e.stroke(),e.restore()}return vi=new Wt(n),vi.colorSpace=yt,vi.anisotropy=4,vi}function ls(t=1,n="high"){const e=new Ke,o=on(Math.floor(t*7919)+13),i=t,s=1.6*i;Ko(e,[pr(s,.15*i,.07*i,new te(4864042),(o()-.5)*.04)],Gi(.95,"bark"));const a=n==="low"?4:7,r=n==="low"?6:34,c=[],l={m:new ot,q:new dn,e:new co,c:new te};for(let f=0;f<a;f++){const d=f/(a-1),u=(1.35-d*.95)*i,h=(1.05-d*.28)*i,m=new gt(1,1,16,2),_=m.attributes.position;for(let g=0;g<_.count;g++){const x=_.getX(g),M=_.getZ(g),S=_.getY(g),T=Math.atan2(M,x),w=S<0?1:0,y=1+w*(.16*Math.sin(T*8+f*1.7)+.08*Math.sin(T*13+f));_.setXYZ(g,x*y,S-w*.08*(.5+.5*Math.sin(T*8+f)),M*y)}m.computeVertexNormals();const p=new te(2380861).offsetHSL((o()-.5)*.02,0,(o()-.5)*.05);c.push(mr(Yt(m,cn(0,(1.05+d*2.6)*i,0,u*.92,h,u*.92,0,o()*Math.PI,0),p,g=>.55+.45*(g/1+.5))));for(let g=0;g<r;g++){const x=o()*Math.PI*2,M=u*(.35+o()*.7),S=(1.05+d*2.6)*i-h*.5*(M/u)+h*.5+(o()-.5)*h*.2;c.push(Ys(new Y(Math.cos(x)*M,S-h*(M/u)*.55,Math.sin(x)*M),(.5+o()*.45)*i,o,-.4,l,[.38,.45,.2,1.5]))}}return Ko(e,c,qs()),e}function Pl(t=1,n="high"){const e=new Ke,o=on(Math.floor(t*31337)+5),i=[4158536,4883795,3499071,5673306,7050310],s=[],a=n==="low",r=a?4:6+Math.floor(o()*3),c={m:new ot,q:new dn,e:new co,c:new te};for(let l=0;l<r;l++){const f=(.3+o()*.3)*t,d=o()*Math.PI*2,u=Math.sqrt(o())*.55*t,h=new te(i[Math.floor(o()*i.length)]).offsetHSL(0,0,(o()-.5)*.05);s.push(mr(Yt(os(Math.floor(o()*3)+1,2,.24),cn(Math.cos(d)*u,f*.7,Math.sin(d)*u,f*.9,f*.7,f*.84,o()*3,o()*6,0),h.multiplyScalar(1.25),(m,_)=>.6+.4*St.clamp(.5+.5*_,0,1))));for(let m=0;m<(a?4:16);m++){const _=new Y(o()-.5,o()-.25,o()-.5).normalize();s.push(Ys(new Y(Math.cos(d)*u,f*.7,Math.sin(d)*u).addScaledVector(_,f*(.8+o()*.4)),(.28+o()*.22)*t,o,_.y,c,[.27,.5,.34,2]))}}if(Ko(e,s,qs()),o()>.6){const l=[],f=new ye(.035*t,6,5),d=new te([14240600,6966233,15909198][Math.floor(o()*3)]);for(let u=0;u<9;u++){const h=o()*Math.PI*2,m=(.25+o()*.35)*t;l.push(Yt(f,cn(Math.cos(h)*m,(.35+o()*.3)*t,Math.sin(h)*m),d))}Ko(e,l,Gi(.5,"berry"),!1)}return e}let ba;function gr(){return ba||(ba=new ge({color:16777215,vertexColors:!0,roughness:.78,metalness:0,side:$e})),ba}function Ji(t,n,e,o,i){return new ot().makeTranslation(t,n,e).multiply(new ot().makeRotationY(o)).multiply(new ot().makeRotationX(i))}function bm(t=1){const n=new Ke,e=on(Math.floor(t*6151)+29),o=[15913547,15695784,16185072,12160240,15897419,15226959],i=new te(4880954),s=[],a=3+Math.floor(e()*3);for(let r=0;r<a;r++){const c=(.28+e()*.3)*t,l=new te(o[Math.floor(e()*o.length)]),f=e()*Math.PI*2,d=e()*.24*t,u=Math.cos(f)*d,h=Math.sin(f)*d,m=new we(.007*t,.012*t,c,5,1);m.translate(0,c/2,0),s.push(Yt(m,cn(u,0,h),i.clone().multiplyScalar(.85+e()*.3)));for(let p=0;p<2;p++){const g=new Je(.11*t,.034*t,2,1);g.translate(.055*t,0,0),g.rotateX(-Math.PI/2),s.push(Yt(g,Ji(u,c*(.22+p*.22),h,p*Math.PI+e()*2,.35),i.clone().multiplyScalar(1.1+e()*.2)))}const _=6;for(let p=0;p<_;p++){const g=new ci(1,8);g.scale(.034*t,.062*t,1),g.translate(0,.064*t,0),g.rotateX(-Math.PI/2),s.push(Yt(g,Ji(u,c,h,p/_*Math.PI*2,-.5),l.clone().multiplyScalar(.92+e()*.16),x=>1))}s.push(Yt(new ye(.022*t,7,5),cn(u,c+.01*t,h),new te(14262813)))}return Ko(n,s,gr(),!1),n}function Sm(t,n,e,o,i,s){const r=[],c=[],l=[],f=new te;for(let u=0;u<=4;u++){const h=u/4,m=n*(1-h*.9)/2,_=e*h*h,p=o*h*h;if(r.push(_-m,h*t,p,_+m,h*t,p),f.copy(i).lerp(s,h),c.push(f.r,f.g,f.b,f.r,f.g,f.b),u>0){const g=(u-1)*2;l.push(g,g+2,g+1,g+1,g+2,g+3)}}const d=new sn;return d.setAttribute("position",new Un(r,3)),d.setAttribute("color",new Un(c,3)),d.setIndex(l),d.computeVertexNormals(),d}function ac(t=1){const n=new Ke,e=on(Math.floor(t*4111)+3),o=[],i=new te(10203735),s=new te(4153392);for(let a=0;a<9;a++){const r=(.7+e()*1)*t,c=e()*Math.PI*2,l=Math.sqrt(e())*.28*t,f=Sm(r,(.05+e()*.035)*t,(e()-.5)*.55*t,(e()-.5)*.55*t,s.clone().multiplyScalar(.85+e()*.3),i.clone().multiplyScalar(.85+e()*.3));if(f.applyMatrix4(cn(Math.cos(c)*l,0,Math.sin(c)*l,1,1,1,0,e()*Math.PI*2,0)),o.push(f),e()>.68){const d=r*(.8+e()*.15),u=new we(.006*t,.01*t,d,4,1);u.translate(0,d/2,0),o.push(Yt(u,cn(Math.cos(c)*l,0,Math.sin(c)*l),s.clone().multiplyScalar(1.2)));const h=new we(.022*t,.022*t,.14*t,7,1);h.translate(0,.07*t,0),o.push(Yt(h,cn(Math.cos(c)*l,d*.96,Math.sin(c)*l),new te(5913122)))}}return Ko(n,o,gr(),!1),n}function wm(t=1){const n=on(Math.floor(t*2027)+11),e=(1.8+n()*1.4)*t,o=(.17+n()*.06)*t,i=new te(5652526),s=[],a=pr(e,o*1.05,o*.85,i,0);a.rotateZ(-Math.PI/2),a.translate(-e/2,o*.82,0),s.push(a);const r=new ci(o*.85,14);s.push(Yt(r,cn(e/2+.002,o*.82,0,1,1,1,0,Math.PI/2,0),new te(12096874)));const c=new Di(o*.35,o*.4,14);s.push(Yt(c,cn(e/2+.004,o*.82,0,1,1,1,0,Math.PI/2,0),new te(9070660)));for(let u=0;u<2;u++){const h=new we(o*.12,o*.2,o*1.1,6,1);h.translate(0,o*.55,0),s.push(Yt(h,cn((n()-.5)*e*.6,o*1.3,(n()>.5?1:-1)*o*.5,1,1,1,(n()-.5)*.7,0,(n()-.5)*.8),i.clone().multiplyScalar(.9)))}const l=new te(5075768);for(let u=0;u<4;u++){const h=o*(.35+n()*.3);s.push(Yt(os(Math.floor(n()*3)+1,1,.3),cn((n()-.5)*e*.8,o*1.62,(n()-.5)*o*.8,h*1.3,h*.45,h),l.clone().multiplyScalar(.8+n()*.4),(m,_)=>.75+.25*St.clamp(.5+.5*_,0,1)))}const f=No(s,!1),d=new G(f,gr());return d.rotation.y=n()*Math.PI,d.castShadow=!0,d.receiveShadow=!0,d}function bi(t=1){const n=on(Math.floor(t*9973)+17),e=[],o=new te(7829884).offsetHSL(0,0,(n()-.5)*.08),i=1+Math.floor(n()*2.4),s=(u,h,m)=>{const _=u.attributes.position,p=u.attributes.normal,g=u.attributes.color;for(let x=0;x<_.count;x++){const M=_.getX(x),S=_.getY(x),T=_.getZ(x),w=1-Math.abs(Si(M*5,S*5,T*5,h))*1.6,y=Si(M*14,S*14,T*14,h+3),v=(Math.max(0,w)*.6+y*.25)*m;_.setXYZ(x,M+p.getX(x)*v,S+p.getY(x)*v,T+p.getZ(x)*v);const E=.9+.1*Math.sin(S*26/Math.max(.2,m*6)+Si(M*3,S*3,T*3,h)*3),b=St.smoothstep(Si(M*9,S*9,T*9,h+7),.42,.62),A=E*(.9+y*.18);g.setXYZ(x,St.lerp(g.getX(x)*A,.6,b*.35),St.lerp(g.getY(x)*A,.62,b*.35),St.lerp(g.getZ(x)*A,.34,b*.35))}u.computeVertexNormals()};for(let u=0;u<i;u++){const h=(u===0?.55:.2+n()*.22)*t,m=n()*Math.PI*2,_=u===0?0:(.5+n()*.35)*t,p=os(Math.floor(n()*5)+20,u===0?3:2,.34),g=Yt(p,cn(Math.cos(m)*_,h*.32,Math.sin(m)*_,h*1.15,h*.7,h,(n()-.5)*.35,n()*6,(n()-.5)*.35),o.clone().offsetHSL(0,0,(n()-.5)*.06),(x,M)=>.62+.38*St.clamp(.4+.6*M,0,1));s(g,11+u*5,h*.09),e.push(g)}const a=3+Math.floor(n()*3);for(let u=0;u<a;u++){const h=(.05+n()*.07)*t,m=n()*Math.PI*2,_=(.55+n()*.55)*t;e.push(Yt(os(Math.floor(n()*3)+1,1,.22),cn(Math.cos(m)*_,h*.4,Math.sin(m)*_,h*1.2,h*.7,h,n()*3,n()*6,0),o.clone().offsetHSL(0,0,(n()-.5)*.1),(p,g)=>.7+.3*St.clamp(.5+.5*g,0,1)))}const r=No(e,!1),c=r.attributes.normal,l=r.attributes.color,f=new te(5797951);for(let u=0;u<l.count;u++){const h=St.smoothstep(c.getY(u),.55,.9)*.85;l.setXYZ(u,St.lerp(l.getX(u),f.r*.9,h),St.lerp(l.getY(u),f.g*.9,h),St.lerp(l.getZ(u),f.b*.9,h))}const d=new G(r,Gi(.95,"rock"));return d.castShadow=!0,d.receiveShadow=!0,d}function Rl(t){const n=new Ke,e=new te(9210756),o=[],i=(f,d,u=e,h=1,m=1,_=1)=>{o.push(Yt(f,cn(0,d,0,h,m,_),u,(p,g)=>.78+.22*St.clamp(.5+.5*g,0,1)))};i(new Do(.46,.14,.46,1,.03),.07),i(new we(.075,.1,.62,10),.45),i(new Do(.34,.08,.34,1,.025),.8);for(const[f,d]of[[-.13,-.13],[.13,-.13],[-.13,.13],[.13,.13]])o.push(Yt(new Ye(.045,.34,.045),cn(f,1.02,d),e.clone().multiplyScalar(.9)));i(new Do(.4,.07,.4,1,.025),1.22);const s=new gt(.34,.24,4,1);o.push(Yt(s,cn(0,1.38,0,1,1,1,0,Math.PI/4,0),e.clone().multiplyScalar(.85))),i(new ye(.05,10,8),1.55);const a=new G(No(o,!1),Gi(.9,"lantern"));a.castShadow=!0,a.receiveShadow=!0;const r=hr(t,.9),c=new G(new Ye(.2,.3,.2),r);c.position.y=1.02;const l=new Kn(t,.8,6);return l.position.y=1.05,n.add(a,c,l),n}function ym(){const t=[],n=new we(.004,.006,.26,4,1);n.translate(0,.13,0),t.push(Yt(n,cn(0,0,0),new te(.2,.34,.12)));for(let o=0;o<6;o++){const i=new ci(1,7);i.scale(.022,.044,1),i.translate(0,.046,0),i.rotateX(-Math.PI/2),t.push(Yt(i,Ji(0,.27,0,o/6*Math.PI*2,-.45),new te(1,1,1)))}t.push(Yt(new ye(.014,6,5),cn(0,.275,0),new te(1,.82,.25)));const e=new Je(.07,.022,2,1);return e.translate(.035,0,0),e.rotateX(-Math.PI/2),t.push(Yt(e,Ji(0,.07,0,.6,.4),new te(.22,.4,.14))),t.push(Yt(e,Ji(0,.1,0,3.5,.4),new te(.22,.4,.14))),No(t,!1)}function Em(t,n,e=26){const o=on(t),i={m:new ot,q:new dn,e:new co,c:new te},s=[];for(let a=0;a<e;a++){const r=new Y(o()-.5,o()*.7-.1,o()-.5).normalize();s.push(Ys(r.multiplyScalar(n*(.35+o()*.65)),n*(.7+o()*.5),o,r.y,i,[.27,.55,.4,2.4]))}return s}const qa=3,Tm={broadleaf:900,pine:1100,bush:1200,rock:500},Am={high:1,med:.6,low:.35},Cl=60,Pm={broadleaf:[.8,1.6],pine:[.9,2],bush:[.7,1.5],rock:[.5,1.3]};function Rm(t){let n=(t|0)>>>0;return()=>{n=n+1831565813>>>0;let e=n;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function _s(t,n,e){let o=Math.imul(t,374761393)^Math.imul(n,668265263)^Math.imul(e|0,2246822519);return o=Math.imul(o^o>>>13,1274126177),o^=o>>>16,(o>>>0)/4294967296}function rc(t,n,e){const o=Math.floor(t),i=Math.floor(n),s=t-o,a=n-i,r=s*s*(3-2*s),c=a*a*(3-2*a),l=_s(o,i,e),f=_s(o+1,i,e),d=_s(o,i+1,e),u=_s(o+1,i+1,e);return l+(f-l)*r+(d-l)*c+(l-f-d+u)*r*c}function Ya(t,n,e){const o=Math.min(1,Math.max(0,(e-t)/(n-t)));return o*o*(3-2*o)}function Dl(t,n,e){return Math.min(e.halfW-Math.abs(t-e.centerX),e.halfD-Math.abs(n-e.centerZ))}function Cm(t,n,e){const o=rc(t/85,n/85,e.seed)*.7+rc(t/34,n/34,e.seed+101)*.3,i=Ya(.42,.62,o),s=1-Ya(0,Cl,Math.max(0,Dl(t,n,e)));return Math.min(1,Math.max(i,s*.95))}function Dm(t,n,e){if(Math.abs(t-e.centerX)<(e.clearCenterStrip??0))return!0;for(const[o,i,s]of e.avoidCircles??[])if(Math.hypot(t-o,n-i)<=s)return!0;for(const o of e.avoidEllipses??[]){const i=(t-o.x)/o.rx,s=(n-o.z)/o.rz;if(i*i+s*s<=1)return!0}for(const o of e.avoidSegments??[]){const i=o.bx-o.ax,s=o.bz-o.az,a=i*i+s*s,r=a>0?Math.min(1,Math.max(0,((t-o.ax)*i+(n-o.az)*s)/a)):0;if(Math.hypot(t-(o.ax+i*r),n-(o.az+s*r))<=o.halfWidth)return!0}return!1}function Im(t){if(!(t.halfW>0)||!(t.halfD>0))return[];const n=t.decorStyle==="space",e=Rm(t.seed*2654435761+12345),o=4*t.halfW*t.halfD,i=Math.min(6,Math.max(3.5,Math.sqrt(o/14e3))),s=Math.ceil(t.halfW*2/i),a=Math.ceil(t.halfD*2/i),r=t.centerX-t.halfW,c=t.centerZ-t.halfD,l=[];for(let u=0;u<a;u++)for(let h=0;h<s;h++){const m=e(),_=e(),p=e(),g=e(),x=e(),M=e(),S=e(),T=e(),w=e(),y=e(),v=r+(h+m)*i,E=c+(u+_)*i;if(v<r||v>r+t.halfW*2||E<c||E>c+t.halfD*2)continue;const b=Cm(v,E,t),A=1-Ya(0,Cl,Math.max(0,Dl(v,E,t)));let R;if(n?p<.12&&(R="rock"):b>.5&&p<(b-.3)*1.1?R=g<.3+.6*A?"pine":"broadleaf":b>.2&&x<.18+.3*b?R="bush":M<.05&&(R="rock"),!R||Dm(v,E,t))continue;const L=t.groundY(v,E);if(!Number.isFinite(L))continue;const[I,U]=Pm[R],N=I+S*(U-I);l.push({kind:R,variant:Math.min(qa-1,Math.floor(T*qa)),x:v,y:R==="rock"?L+.15*N:L,z:E,scale:N,rotY:w*Math.PI*2,keep:y*(1.15-b)})}const f=Am[t.quality]??1,d=[];for(const u of["broadleaf","pine","bush","rock"]){const h=Math.floor(Tm[u]*f),m=l.filter(p=>p.kind===u).sort((p,g)=>p.keep-g.keep||p.x-g.x||p.z-g.z),_=Math.min(h,Math.floor(m.length*f));for(let p=0;p<_;p++){const{keep:g,...x}=m[p];d.push(x)}}return d}const Lm=[1,1.13,1.27],cc=.4;function Um(t,n,e){const o=Lm[n%qa];return t==="broadleaf"?di(o,e):t==="pine"?ls(o,e):t==="bush"?Pl(o,e):bi(o)}function Nm(t){const n=t.attributes.position.count,e=new sn;if(e.setAttribute("position",t.attributes.position.clone()),e.setAttribute("normal",t.attributes.normal?t.attributes.normal.clone():new xt(new Float32Array(n*3),3)),t.attributes.color?e.setAttribute("color",t.attributes.color.clone()):e.setAttribute("color",new xt(new Float32Array(n*3).fill(1),3)),e.setAttribute("uv",t.attributes.uv?t.attributes.uv.clone():new xt(new Float32Array(n*2),2)),t.index)e.setIndex(t.index.clone());else{const o=new Uint32Array(n);for(let i=0;i<n;i++)o[i]=i;e.setIndex(new xt(o,1))}return t.attributes.normal||e.computeVertexNormals(),e}function km(t){t.updateMatrixWorld(!0);const n=[];return t.traverse(e=>{const o=e;if(!o.isMesh)return;const i=Nm(o.geometry),s=new ot().copy(t.matrixWorld).invert().multiply(o.matrixWorld);s.equals(new ot)||i.applyMatrix4(s),n.push({material:o.material,geometry:i}),o.geometry.dispose()}),n}function Fm(t,n={}){const e=Gi(.5,"berry"),o=n.lodDistance??70,i=n.castShadow??!0,s=new Ke;s.name="vegetation";const a=new Map,r=(b,A)=>{const R=`${b}:${A}`;let L=a.get(R);if(!L){L={high:new Map,low:new Map};for(const I of["high","low"]){if(b==="rock"&&I==="low"){L.low=L.high;continue}const U=Um(b,A,I),N=km(U),O=I==="high"?L.high:L.low;for(const V of N)I==="low"&&V.material===e||O.has(V.material)?V.geometry.dispose():O.set(V.material,V.geometry)}a.set(R,L)}return L},c=new Map;for(const b of t){const A=`${b.kind}:${b.variant}`,R=c.get(A);R?R.push(b):c.set(A,[b])}for(const b of c.keys()){const[A,R]=b.split(":");r(A,Number(R))}const l=new Map,f=b=>{let A=l.get(b);return A||(A={material:b,geos:new Set,instanceCount:0},l.set(b,A)),A};for(const[b,A]of c){const R=a.get(b),L=new Set([...R.high.keys(),...R.low.keys()]);for(const I of L){const U=f(I),N=R.high.get(I),O=R.low.get(I);N&&U.geos.add(N),O&&U.geos.add(O),U.instanceCount+=A.length}}const d=new Map,u=new Map,h=[];for(const[b,A]of l){let R=0,L=0;for(const U of A.geos)R+=U.attributes.position.count,L+=U.index.count,h.push(U);const I=new Of(Math.max(1,A.instanceCount),Math.max(1,R),Math.max(1,L),b);I.perObjectFrustumCulled=!0,I.frustumCulled=!1,I.castShadow=i,I.receiveShadow=!0,I.sortObjects=!1;for(const U of A.geos)u.set(U,I.addGeometry(U));d.set(b,I),s.add(I)}const m=[],_=new ot,p=new dn,g=new Y,x=new Y,M=new Y(0,1,0);for(const b of t){const A=a.get(`${b.kind}:${b.variant}`);g.set(b.x,b.y,b.z),p.setFromAxisAngle(M,b.rotY),x.setScalar(b.scale),_.compose(g,p,x);const R=[],L=new Set([...A.high.keys(),...A.low.keys()]);for(const I of L){const U=d.get(I),N=A.high.get(I),O=A.low.get(I),V=N?u.get(N):-1,X=O?u.get(O):-1,J=U.addInstance(V>=0?V:X);U.setMatrixAt(J,_),R.push({batch:U,instanceId:J,highGeo:V,lowGeo:X})}m.push({x:b.x,z:b.z,slots:R,lod:null})}const S=o*o;let T=cc,w=performance.now();const y=new Y,v=(b,A)=>{b.lod=A;for(const R of b.slots){const L=A==="high"?R.highGeo:R.lowGeo;L<0?R.batch.setVisibleAt(R.instanceId,!1):(R.batch.setGeometryIdAt(R.instanceId,L),R.batch.setVisibleAt(R.instanceId,!0))}};return{group:s,update(b){const A=performance.now();if(T+=(A-w)/1e3,w=A,!(T<cc)){T=0,b.getWorldPosition(y);for(const R of m){const L=R.x-y.x,I=R.z-y.z,U=L*L+I*I<S?"high":"low";U!==R.lod&&v(R,U)}}},dispose(){for(const b of d.values())s.remove(b),b.dispose();d.clear();for(const b of h)b.dispose();h.length=0,m.length=0,s.removeFromParent()}}}class Om{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(n){this._document=n,n.hidden!==void 0&&(this._pageVisibilityHandler=Gm.bind(this),n.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(n){return this._timescale=n,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(n){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(n!==void 0?n:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Gm(){this._document.hidden===!1&&this.reset()}const ai={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class fi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Bm=new Bs(-1,1,1,-1,0,1);class zm extends sn{constructor(){super(),this.setAttribute("position",new Un([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Un([0,2,0,0,2,0],2))}}const Hm=new zm;class Ks{constructor(n){this._mesh=new G(Hm,n)}dispose(){this._mesh.geometry.dispose()}render(n){n.render(this._mesh,Bm)}get material(){return this._mesh.material}set material(n){this._mesh.material=n}}class Il extends fi{constructor(n,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,n instanceof jt?(this.uniforms=n.uniforms,this.material=n):n&&(this.uniforms=oo.clone(n.uniforms),this.material=new jt({name:n.name!==void 0?n.name:"unspecified",defines:Object.assign({},n.defines),uniforms:this.uniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader})),this._fsQuad=new Ks(this.material)}render(n,e,o){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=o.texture),this._fsQuad.material=this.material,this.renderToScreen?(n.setRenderTarget(null),this._fsQuad.render(n)):(n.setRenderTarget(e),this.clear&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),this._fsQuad.render(n))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class lc extends fi{constructor(n,e){super(),this.scene=n,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(n,e,o){const i=n.getContext(),s=n.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,r;this.inverse?(a=0,r=1):(a=1,r=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),s.buffers.stencil.setClear(r),s.buffers.stencil.setLocked(!0),n.setRenderTarget(o),this.clear&&n.clear(),n.render(this.scene,this.camera),n.setRenderTarget(e),this.clear&&n.clear(),n.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class Vm extends fi{constructor(){super(),this.needsSwap=!1}render(n){n.state.buffers.stencil.setLocked(!1),n.state.buffers.stencil.setTest(!1)}}class Wm{constructor(n,e){if(this.renderer=n,this._pixelRatio=n.getPixelRatio(),e===void 0){const o=n.getSize(new rt);this._width=o.width,this._height=o.height,e=new mn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Tn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Il(ai),this.copyPass.material.blending=pn,this.timer=new Gf}swapBuffers(){const n=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=n}addPass(n){this.passes.push(n),n.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(n,e){this.passes.splice(e,0,n),n.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(n){const e=this.passes.indexOf(n);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(n){for(let e=n+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(n){this.timer.update(),n===void 0&&(n=this.timer.getDelta());const e=this.renderer.getRenderTarget();let o=!1;for(let i=0,s=this.passes.length;i<s;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,n,o),a.needsSwap){if(o){const r=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,n),c.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}lc!==void 0&&(a instanceof lc?o=!0:a instanceof Vm&&(o=!1))}}this.renderer.setRenderTarget(e)}reset(n){if(n===void 0){const e=this.renderer.getSize(new rt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,n=this.renderTarget1.clone(),n.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=n,this.renderTarget2=n.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(n,e){this._width=n,this._height=e;const o=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(o,i),this.renderTarget2.setSize(o,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(o,i)}setPixelRatio(n){this._pixelRatio=n,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Xm extends fi{constructor(n,e,o=null,i=null,s=null){super(),this.scene=n,this.camera=e,this.overrideMaterial=o,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new te}render(n,e,o){const i=n.autoClear;n.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(n.getClearColor(this._oldClearColor),n.setClearColor(this.clearColor,n.getClearAlpha())),this.clearAlpha!==null&&(s=n.getClearAlpha(),n.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&n.clearDepth(),n.setRenderTarget(this.renderToScreen?null:o),this.clear===!0&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),n.render(this.scene,this.camera),this.clearColor!==null&&n.setClearColor(this._oldClearColor),this.clearAlpha!==null&&n.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),n.autoClear=i}}const qm={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new te(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Ii extends fi{constructor(n,e=1,o,i){super(),this.strength=e,this.radius=o,this.threshold=i,this.resolution=n!==void 0?new rt(n.x,n.y):new rt(256,256),this.clearColor=new te(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new mn(s,a,{type:Tn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const d=new mn(s,a,{type:Tn});d.texture.name="UnrealBloomPass.h"+f,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const u=new mn(s,a,{type:Tn});u.texture.name="UnrealBloomPass.v"+f,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),s=Math.round(s/2),a=Math.round(a/2)}const r=qm;this.highPassUniforms=oo.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new jt({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new rt(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new Y(1,1,1),new Y(1,1,1),new Y(1,1,1),new Y(1,1,1),new Y(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=oo.clone(ai.uniforms),this.blendMaterial=new jt({uniforms:this.copyUniforms,vertexShader:ai.vertexShader,fragmentShader:ai.fragmentShader,premultipliedAlpha:!0,blending:si,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new te,this._oldClearAlpha=1,this._basic=new wt,this._fsQuad=new Ks(null)}dispose(){for(let n=0;n<this.renderTargetsHorizontal.length;n++)this.renderTargetsHorizontal[n].dispose();for(let n=0;n<this.renderTargetsVertical.length;n++)this.renderTargetsVertical[n].dispose();this.renderTargetBright.dispose();for(let n=0;n<this.separableBlurMaterials.length;n++)this.separableBlurMaterials[n].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(n,e){let o=Math.round(n/2),i=Math.round(e/2);this.renderTargetBright.setSize(o,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(o,i),this.renderTargetsVertical[s].setSize(o,i),this.separableBlurMaterials[s].uniforms.invSize.value=new rt(1/o,1/i),o=Math.round(o/2),i=Math.round(i/2)}render(n,e,o,i,s){n.getClearColor(this._oldClearColor),this._oldClearAlpha=n.getClearAlpha();const a=n.autoClear;n.autoClear=!1,n.setClearColor(this.clearColor,0),s&&n.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=o.texture,n.setRenderTarget(null),n.clear(),this._fsQuad.render(n)),this.highPassUniforms.tDiffuse.value=o.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,n.setRenderTarget(this.renderTargetBright),n.clear(),this._fsQuad.render(n);let r=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[c].uniforms.direction.value=Ii.BlurDirectionX,n.setRenderTarget(this.renderTargetsHorizontal[c]),n.clear(),this._fsQuad.render(n),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Ii.BlurDirectionY,n.setRenderTarget(this.renderTargetsVertical[c]),n.clear(),this._fsQuad.render(n),r=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,n.setRenderTarget(this.renderTargetsHorizontal[0]),n.clear(),this._fsQuad.render(n),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&n.state.buffers.stencil.setTest(!0),this.renderToScreen?(n.setRenderTarget(null),this._fsQuad.render(n)):(n.setRenderTarget(o),this._fsQuad.render(n)),n.setClearColor(this._oldClearColor,this._oldClearAlpha),n.autoClear=a}_getSeparableBlurMaterial(n){const e=[],o=n/3;for(let i=0;i<n;i++)e.push(.39894*Math.exp(-.5*i*i/(o*o))/o);return new jt({defines:{KERNEL_RADIUS:n},uniforms:{colorTexture:{value:null},invSize:{value:new rt(.5,.5)},direction:{value:new rt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`

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

				}`})}_getCompositeMaterial(n){return new jt({defines:{NUM_MIPS:n},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Ii.BlurDirectionX=new rt(1,0);Ii.BlurDirectionY=new rt(0,1);const Ms={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Ym extends fi{constructor(){super(),this.isOutputPass=!0,this.uniforms=oo.clone(Ms.uniforms),this.material=new Xc({name:Ms.name,uniforms:this.uniforms,vertexShader:Ms.vertexShader,fragmentShader:Ms.fragmentShader}),this._fsQuad=new Ks(this.material),this._outputColorSpace=null,this._toneMapping=null}render(n,e,o){this.uniforms.tDiffuse.value=o.texture,this.uniforms.toneMappingExposure.value=n.toneMappingExposure,(this._outputColorSpace!==n.outputColorSpace||this._toneMapping!==n.toneMapping)&&(this._outputColorSpace=n.outputColorSpace,this._toneMapping=n.toneMapping,this.material.defines={},Vt.getTransfer(this._outputColorSpace)===Ft&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===dr?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===lr?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===cr?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Hs?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===rr?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ar?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===sr&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(n.setRenderTarget(null),this._fsQuad.render(n)):(n.setRenderTarget(e),this.clear&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),this._fsQuad.render(n))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const bs={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new rt},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new ot},cameraProjectionMatrixInverse:{value:new ot},cameraWorldMatrix:{value:new ot},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new Y(-1,-1,-1)},sceneBoxMax:{value:new Y(1,1,1)}},vertexShader:`

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
		}`},Ss={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Sa={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function Km(t=5){const n=Math.floor(t)%2===0?Math.floor(t)+1:Math.floor(t),e=$m(n),o=e.length,i=new Uint8Array(o*4);for(let a=0;a<o;++a){const r=e[a],c=2*Math.PI*r/o,l=new Y(Math.cos(c),Math.sin(c),0).normalize();i[a*4]=(l.x*.5+.5)*255,i[a*4+1]=(l.y*.5+.5)*255,i[a*4+2]=127,i[a*4+3]=255}const s=new nr(i,n,n);return s.wrapS=Io,s.wrapT=Io,s.needsUpdate=!0,s}function $m(t){const n=Math.floor(t)%2===0?Math.floor(t)+1:Math.floor(t),e=n*n,o=Array(e).fill(0);let i=Math.floor(n/2),s=n-1;for(let a=1;a<=e;){if(i===-1&&s===n?(s=n-2,i=0):(s===n&&(s=0),i<0&&(i=n-1)),o[i*n+s]!==0){s-=2,i++;continue}else o[i*n+s]=a++;s++,i--}return o}const ws={defines:{SAMPLES:16,SAMPLE_VECTORS:Ll(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new rt},cameraProjectionMatrixInverse:{value:new ot},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Ll(t,n,e){const o=jm(t,n,e);let i="vec3[SAMPLES](";for(let s=0;s<t;s++){const a=o[s];i+=`vec3(${a.x}, ${a.y}, ${a.z})${s<t-1?",":")"}`}return i}function jm(t,n,e){const o=[];for(let i=0;i<t;i++){const s=2*Math.PI*n*i/t,a=Math.pow(i/(t-1),e);o.push(new Y(Math.cos(s),Math.sin(s),a))}return o}class Zm{constructor(n=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(n.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(n,e){let o,i,s;const a=.5*(Math.sqrt(3)-1),r=(n+e)*a,c=Math.floor(n+r),l=Math.floor(e+r),f=(3-Math.sqrt(3))/6,d=(c+l)*f,u=c-d,h=l-d,m=n-u,_=e-h;let p,g;m>_?(p=1,g=0):(p=0,g=1);const x=m-p+f,M=_-g+f,S=m-1+2*f,T=_-1+2*f,w=c&255,y=l&255,v=this.perm[w+this.perm[y]]%12,E=this.perm[w+p+this.perm[y+g]]%12,b=this.perm[w+1+this.perm[y+1]]%12;let A=.5-m*m-_*_;A<0?o=0:(A*=A,o=A*A*this._dot(this.grad3[v],m,_));let R=.5-x*x-M*M;R<0?i=0:(R*=R,i=R*R*this._dot(this.grad3[E],x,M));let L=.5-S*S-T*T;return L<0?s=0:(L*=L,s=L*L*this._dot(this.grad3[b],S,T)),70*(o+i+s)}noise3d(n,e,o){let i,s,a,r;const l=(n+e+o)*.3333333333333333,f=Math.floor(n+l),d=Math.floor(e+l),u=Math.floor(o+l),h=1/6,m=(f+d+u)*h,_=f-m,p=d-m,g=u-m,x=n-_,M=e-p,S=o-g;let T,w,y,v,E,b;x>=M?M>=S?(T=1,w=0,y=0,v=1,E=1,b=0):x>=S?(T=1,w=0,y=0,v=1,E=0,b=1):(T=0,w=0,y=1,v=1,E=0,b=1):M<S?(T=0,w=0,y=1,v=0,E=1,b=1):x<S?(T=0,w=1,y=0,v=0,E=1,b=1):(T=0,w=1,y=0,v=1,E=1,b=0);const A=x-T+h,R=M-w+h,L=S-y+h,I=x-v+2*h,U=M-E+2*h,N=S-b+2*h,O=x-1+3*h,V=M-1+3*h,X=S-1+3*h,J=f&255,W=d&255,k=u&255,ee=this.perm[J+this.perm[W+this.perm[k]]]%12,ae=this.perm[J+T+this.perm[W+w+this.perm[k+y]]]%12,ue=this.perm[J+v+this.perm[W+E+this.perm[k+b]]]%12,z=this.perm[J+1+this.perm[W+1+this.perm[k+1]]]%12;let j=.6-x*x-M*M-S*S;j<0?i=0:(j*=j,i=j*j*this._dot3(this.grad3[ee],x,M,S));let Z=.6-A*A-R*R-L*L;Z<0?s=0:(Z*=Z,s=Z*Z*this._dot3(this.grad3[ae],A,R,L));let de=.6-I*I-U*U-N*N;de<0?a=0:(de*=de,a=de*de*this._dot3(this.grad3[ue],I,U,N));let be=.6-O*O-V*V-X*X;return be<0?r=0:(be*=be,r=be*be*this._dot3(this.grad3[z],O,V,X)),32*(i+s+a+r)}noise4d(n,e,o,i){const s=this.grad4,a=this.simplex,r=this.perm,c=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20;let f,d,u,h,m;const _=(n+e+o+i)*c,p=Math.floor(n+_),g=Math.floor(e+_),x=Math.floor(o+_),M=Math.floor(i+_),S=(p+g+x+M)*l,T=p-S,w=g-S,y=x-S,v=M-S,E=n-T,b=e-w,A=o-y,R=i-v,L=E>b?32:0,I=E>A?16:0,U=b>A?8:0,N=E>R?4:0,O=b>R?2:0,V=A>R?1:0,X=L+I+U+N+O+V,J=a[X][0]>=3?1:0,W=a[X][1]>=3?1:0,k=a[X][2]>=3?1:0,ee=a[X][3]>=3?1:0,ae=a[X][0]>=2?1:0,ue=a[X][1]>=2?1:0,z=a[X][2]>=2?1:0,j=a[X][3]>=2?1:0,Z=a[X][0]>=1?1:0,de=a[X][1]>=1?1:0,be=a[X][2]>=1?1:0,Te=a[X][3]>=1?1:0,Ze=E-J+l,Xe=b-W+l,ct=A-k+l,it=R-ee+l,je=E-ae+2*l,Tt=b-ue+2*l,At=A-z+2*l,ln=R-j+2*l,B=E-Z+3*l,$t=b-de+3*l,lt=A-be+3*l,Pt=R-Te+3*l,Ae=E-1+4*l,Gt=b-1+4*l,D=A-1+4*l,P=R-1+4*l,q=p&255,se=g&255,he=x&255,ve=M&255,Se=r[q+r[se+r[he+r[ve]]]]%32,oe=r[q+J+r[se+W+r[he+k+r[ve+ee]]]]%32,ce=r[q+ae+r[se+ue+r[he+z+r[ve+j]]]]%32,Ie=r[q+Z+r[se+de+r[he+be+r[ve+Te]]]]%32,Oe=r[q+1+r[se+1+r[he+1+r[ve+1]]]]%32;let _e=.6-E*E-b*b-A*A-R*R;_e<0?f=0:(_e*=_e,f=_e*_e*this._dot4(s[Se],E,b,A,R));let xe=.6-Ze*Ze-Xe*Xe-ct*ct-it*it;xe<0?d=0:(xe*=xe,d=xe*xe*this._dot4(s[oe],Ze,Xe,ct,it));let Qe=.6-je*je-Tt*Tt-At*At-ln*ln;Qe<0?u=0:(Qe*=Qe,u=Qe*Qe*this._dot4(s[ce],je,Tt,At,ln));let et=.6-B*B-$t*$t-lt*lt-Pt*Pt;et<0?h=0:(et*=et,h=et*et*this._dot4(s[Ie],B,$t,lt,Pt));let pt=.6-Ae*Ae-Gt*Gt-D*D-P*P;return pt<0?m=0:(pt*=pt,m=pt*pt*this._dot4(s[Oe],Ae,Gt,D,P)),27*(f+d+u+h+m)}_dot(n,e,o){return n[0]*e+n[1]*o}_dot3(n,e,o,i){return n[0]*e+n[1]*o+n[2]*i}_dot4(n,e,o,i,s){return n[0]*e+n[1]*o+n[2]*i+n[3]*s}}class to extends fi{constructor(n,e,o=512,i=512,s,a,r){super(),this.width=o,this.height=i,this.clear=!0,this.camera=e,this.scene=n,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Km(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new mn(this.width,this.height,{type:Tn}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new jt({defines:Object.assign({},bs.defines),uniforms:oo.clone(bs.uniforms),vertexShader:bs.vertexShader,fragmentShader:bs.fragmentShader,blending:pn,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Bf,this.normalMaterial.blending=pn,this.pdMaterial=new jt({defines:Object.assign({},ws.defines),uniforms:oo.clone(ws.uniforms),vertexShader:ws.vertexShader,fragmentShader:ws.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new jt({defines:Object.assign({},Ss.defines),uniforms:oo.clone(Ss.uniforms),vertexShader:Ss.vertexShader,fragmentShader:Ss.fragmentShader,blending:pn}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new jt({uniforms:oo.clone(ai.uniforms),vertexShader:ai.vertexShader,fragmentShader:ai.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Ua,blendDst:Yi,blendEquation:Po,blendSrcAlpha:La,blendDstAlpha:Yi,blendEquationAlpha:Po}),this.blendMaterial=new jt({uniforms:oo.clone(Sa.uniforms),vertexShader:Sa.vertexShader,fragmentShader:Sa.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:ol,blendSrc:Ua,blendDst:Yi,blendEquation:Po,blendSrcAlpha:La,blendDstAlpha:Yi,blendEquationAlpha:Po}),this._fsQuad=new Ks(null),this._originalClearColor=new te,this.setGBuffer(s?s.depthTexture:void 0,s?s.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),r!==void 0&&this.updatePdMaterial(r)}setSize(n,e){this.width=n,this.height=e,this.gtaoRenderTarget.setSize(n,e),this.normalRenderTarget.setSize(n,e),this.pdRenderTarget.setSize(n,e),this.gtaoMaterial.uniforms.resolution.value.set(n,e),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(n,e),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(n,e){n!==void 0?(this.depthTexture=n,this.normalTexture=e,this._renderGBuffer=!1):(this.depthTexture=new Ai,this.depthTexture.format=ii,this.depthTexture.type=Ri,this.normalRenderTarget=new mn(this.width,this.height,{minFilter:so,magFilter:so,type:Tn,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const o=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=o,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=o,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(n){n?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(n.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(n.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(n){n.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=n.radius),n.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=n.distanceExponent),n.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=n.thickness),n.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=n.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),n.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=n.scale),n.samples!==void 0&&n.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=n.samples,this.gtaoMaterial.needsUpdate=!0),n.screenSpaceRadius!==void 0&&(n.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=n.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(n){let e=!1;n.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=n.lumaPhi),n.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=n.depthPhi),n.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=n.normalPhi),n.radius!==void 0&&n.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=n.radius),n.radiusExponent!==void 0&&n.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=n.radiusExponent,e=!0),n.rings!==void 0&&n.rings!==this.pdRings&&(this.pdRings=n.rings,e=!0),n.samples!==void 0&&n.samples!==this.pdSamples&&(this.pdSamples=n.samples,e=!0),e&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Ll(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(n,e,o){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(n,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(n,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(n,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case to.OUTPUT.Off:break;case to.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=o.texture,this.copyMaterial.blending=pn,this._renderPass(n,this.copyMaterial,this.renderToScreen?null:e);break;case to.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=pn,this._renderPass(n,this.copyMaterial,this.renderToScreen?null:e);break;case to.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=pn,this._renderPass(n,this.copyMaterial,this.renderToScreen?null:e);break;case to.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(n,this.depthRenderMaterial,this.renderToScreen?null:e);break;case to.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=pn,this._renderPass(n,this.copyMaterial,this.renderToScreen?null:e);break;case to.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=o.texture,this.copyMaterial.blending=pn,this._renderPass(n,this.copyMaterial,this.renderToScreen?null:e),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(n,this.blendMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(n,e,o,i,s){n.getClearColor(this._originalClearColor);const a=n.getClearAlpha(),r=n.autoClear;n.setRenderTarget(o),n.autoClear=!1,i!=null&&(n.setClearColor(i),n.setClearAlpha(s||0),n.clear()),this._fsQuad.material=e,this._fsQuad.render(n),n.autoClear=r,n.setClearColor(this._originalClearColor),n.setClearAlpha(a)}_renderOverride(n,e,o,i,s){n.getClearColor(this._originalClearColor);const a=n.getClearAlpha(),r=n.autoClear;n.setRenderTarget(o),n.autoClear=!1,i=e.clearColor||i,s=e.clearAlpha||s,i!=null&&(n.setClearColor(i),n.setClearAlpha(s||0),n.clear()),this.scene.overrideMaterial=e,n.render(this.scene,this.camera),this.scene.overrideMaterial=null,n.autoClear=r,n.setClearColor(this._originalClearColor),n.setClearAlpha(a)}_overrideVisibility(){const n=this.scene,e=this._visibilityCache;n.traverse(function(o){(o.isPoints||o.isLine||o.isLine2)&&o.visible&&(o.visible=!1,e.push(o))})}_restoreVisibility(){const n=this._visibilityCache;for(let e=0;e<n.length;e++)n[e].visible=!0;n.length=0}_generateNoise(n=64){const e=new Zm,o=n*n*4,i=new Uint8Array(o);for(let a=0;a<n;a++)for(let r=0;r<n;r++){const c=a,l=r;i[(a*n+r)*4]=(e.noise(c,l)*.5+.5)*255,i[(a*n+r)*4+1]=(e.noise(c+n,l)*.5+.5)*255,i[(a*n+r)*4+2]=(e.noise(c,l+n)*.5+.5)*255,i[(a*n+r)*4+3]=(e.noise(c+n,l+n)*.5+.5)*255}const s=new nr(i,n,n,xo,no);return s.wrapS=Io,s.wrapT=Io,s.needsUpdate=!0,s}}to.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};class $s extends G{constructor(n,e={}){super(n),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const o=this,i=e.color!==void 0?new te(e.color):new te(8355711),s=e.textureWidth||512,a=e.textureHeight||512,r=e.clipBias||0,c=e.shader||$s.ReflectorShader,l=e.multisample!==void 0?e.multisample:4,f=new Kc,d=new Y,u=new Y,h=new Y,m=new ot,_=new Y(0,0,-1),p=new wn,g=new Y,x=new Y,M=new wn,S=new ot,T=new mn(s,a,{samples:l,type:Tn}),w=new jt({name:c.name!==void 0?c.name:"unspecified",uniforms:oo.clone(c.uniforms),fragmentShader:c.fragmentShader,vertexShader:c.vertexShader});w.uniforms.tDiffuse.value=T.texture,w.uniforms.color.value=i,w.uniforms.textureMatrix.value=S,this.material=w,this.onBeforeRender=function(y,v,E){const b=this._getReflectionCamera(E);if(u.setFromMatrixPosition(o.matrixWorld),h.setFromMatrixPosition(E.matrixWorld),m.extractRotation(o.matrixWorld),d.set(0,0,1),d.applyMatrix4(m),g.subVectors(u,h),g.dot(d)>0===!0&&this.forceUpdate===!1)return;g.reflect(d).negate(),g.add(u),m.extractRotation(E.matrixWorld),_.set(0,0,-1),_.applyMatrix4(m),_.add(h),x.subVectors(u,_),x.reflect(d).negate(),x.add(u),b.position.copy(g),b.up.set(0,1,0),b.up.applyMatrix4(m),b.up.reflect(d),b.lookAt(x),b.far=E.far,b.updateMatrixWorld(),b.projectionMatrix.copy(E.projectionMatrix),S.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),S.multiply(b.projectionMatrix),S.multiply(b.matrixWorldInverse),S.multiply(o.matrixWorld),f.setFromNormalAndCoplanarPoint(d,u),f.applyMatrix4(b.matrixWorldInverse),p.set(f.normal.x,f.normal.y,f.normal.z,f.constant);const R=b.projectionMatrix;b.isOrthographicCamera?(M.x=(Math.sign(p.x)+R.elements[8])/R.elements[0],M.y=(Math.sign(p.y)+R.elements[9])/R.elements[5],M.z=-E.far,M.w=1):(M.x=(Math.sign(p.x)+R.elements[8])/R.elements[0],M.y=(Math.sign(p.y)+R.elements[9])/R.elements[5],M.z=-1,M.w=(1+R.elements[10])/R.elements[14]),p.multiplyScalar(2/p.dot(M)),R.elements[2]=p.x,R.elements[6]=p.y,b.isOrthographicCamera?(R.elements[10]=p.z-r,R.elements[14]=p.w-1):(R.elements[10]=p.z+1-r,R.elements[14]=p.w),o.visible=!1;const L=y.getRenderTarget(),I=y.xr.enabled,U=y.shadowMap.autoUpdate;y.xr.enabled=!1,y.shadowMap.autoUpdate=!1,y.setRenderTarget(T),y.state.buffers.depth.setMask(!0),y.autoClear===!1&&y.clear(),y.render(v,b),y.xr.enabled=I,y.shadowMap.autoUpdate=U,y.setRenderTarget(L);const N=E.viewport;N!==void 0&&y.state.viewport(N),o.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return T},this.dispose=function(){T.dispose(),o.material.dispose()},this._getReflectionCamera=function(y){let v=this._reflectionCameras.get(y);return v===void 0&&(v=y.clone(),this._reflectionCameras.set(y,v)),v}}}$s.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};function Qm(t){const n=new Map,e=new Map,o=t.clone();return Ul(t,o,function(i,s){n.set(s,i),e.set(i,s)}),o.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,a=n.get(i),r=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=r.map(function(c){return e.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),o}function Ul(t,n,e){e(t,n);for(let o=0;o<t.children.length;o++)Ul(t.children[o],n.children[o],e)}class Jm extends zf{constructor(n){super(n),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new ig(e)}),this.register(function(e){return new sg(e)}),this.register(function(e){return new pg(e)}),this.register(function(e){return new mg(e)}),this.register(function(e){return new gg(e)}),this.register(function(e){return new rg(e)}),this.register(function(e){return new cg(e)}),this.register(function(e){return new lg(e)}),this.register(function(e){return new dg(e)}),this.register(function(e){return new og(e)}),this.register(function(e){return new fg(e)}),this.register(function(e){return new ag(e)}),this.register(function(e){return new hg(e)}),this.register(function(e){return new ug(e)}),this.register(function(e){return new tg(e)}),this.register(function(e){return new dc(e,mt.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new dc(e,mt.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new vg(e)})}load(n,e,o,i){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Qi.extractUrlBase(n);a=Qi.resolveURL(l,this.path)}else a=Qi.extractUrlBase(n);this.manager.itemStart(n);const r=function(l){i?i(l):console.error(l),s.manager.itemError(n),s.manager.itemEnd(n)},c=new ll(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(n,function(l){try{s.parse(l,a,function(f){e(f),s.manager.itemEnd(n)},r)}catch(f){r(f)}},o,r)}setDRACOLoader(n){return this.dracoLoader=n,this}setKTX2Loader(n){return this.ktx2Loader=n,this}setMeshoptDecoder(n){return this.meshoptDecoder=n,this}register(n){return this.pluginCallbacks.indexOf(n)===-1&&this.pluginCallbacks.push(n),this}unregister(n){return this.pluginCallbacks.indexOf(n)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(n),1),this}parse(n,e,o,i){let s;const a={},r={},c=new TextDecoder;if(typeof n=="string")s=JSON.parse(n);else if(n instanceof ArrayBuffer)if(c.decode(new Uint8Array(n,0,4))===Nl){try{a[mt.KHR_BINARY_GLTF]=new xg(n)}catch(d){i&&i(d);return}s=JSON.parse(a[mt.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(n));else s=n;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Dg(s,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let f=0;f<this.pluginCallbacks.length;f++){const d=this.pluginCallbacks[f](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),r[d.name]=d,a[d.name]=!0}if(s.extensionsUsed)for(let f=0;f<s.extensionsUsed.length;++f){const d=s.extensionsUsed[f],u=s.extensionsRequired||[];switch(d){case mt.KHR_MATERIALS_UNLIT:a[d]=new ng;break;case mt.KHR_DRACO_MESH_COMPRESSION:a[d]=new _g(s,this.dracoLoader);break;case mt.KHR_TEXTURE_TRANSFORM:a[d]=new Mg;break;case mt.KHR_MESH_QUANTIZATION:a[d]=new bg;break;default:u.indexOf(d)>=0&&r[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(a),l.setPlugins(r),l.parse(o,i)}parseAsync(n,e){const o=this;return new Promise(function(i,s){o.parse(n,e,i,s)})}}function eg(){let t={};return{get:function(n){return t[n]},add:function(n,e){t[n]=e},remove:function(n){delete t[n]},removeAll:function(){t={}}}}function an(t,n,e){const o=t.json.materials[n];return o.extensions&&o.extensions[e]?o.extensions[e]:null}const mt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class tg{constructor(n){this.parser=n,this.name=mt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const n=this.parser,e=this.parser.json.nodes||[];for(let o=0,i=e.length;o<i;o++){const s=e[o];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&n._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(n){const e=this.parser,o="light:"+n;let i=e.cache.get(o);if(i)return i;const s=e.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[n];let l;const f=new te(16777215);c.color!==void 0&&f.setRGB(c.color[0],c.color[1],c.color[2],ro);const d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ba(f),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Kn(f),l.distance=d;break;case"spot":l=new fr(f),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),go(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+n),i=Promise.resolve(l),e.cache.add(o,i),i}getDependency(n,e){if(n==="light")return this._loadLight(e)}createNodeAttachment(n){const e=this,o=this.parser,s=o.json.nodes[n],r=(s.extensions&&s.extensions[this.name]||{}).light;return r===void 0?null:this._loadLight(r).then(function(c){return o._getNodeRef(e.cache,r,c)})}}class ng{constructor(){this.name=mt.KHR_MATERIALS_UNLIT}getMaterialType(){return wt}extendParams(n,e,o){const i=[];n.color=new te(1,1,1),n.opacity=1;const s=e.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;n.color.setRGB(a[0],a[1],a[2],ro),n.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(o.assignTexture(n,"map",s.baseColorTexture,yt))}return Promise.all(i)}}class og{constructor(n){this.parser=n,this.name=mt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(n,e){const o=an(this.parser,n,this.name);return o===null||o.emissiveStrength!==void 0&&(e.emissiveIntensity=o.emissiveStrength),Promise.resolve()}}class ig{constructor(n){this.parser=n,this.name=mt.KHR_MATERIALS_CLEARCOAT}getMaterialType(n){return an(this.parser,n,this.name)!==null?vn:null}extendMaterialParams(n,e){const o=an(this.parser,n,this.name);if(o===null)return Promise.resolve();const i=[];if(o.clearcoatFactor!==void 0&&(e.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(e,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(e,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(e,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const s=o.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new rt(s,s)}return Promise.all(i)}}class sg{constructor(n){this.parser=n,this.name=mt.KHR_MATERIALS_DISPERSION}getMaterialType(n){return an(this.parser,n,this.name)!==null?vn:null}extendMaterialParams(n,e){const o=an(this.parser,n,this.name);return o===null||(e.dispersion=o.dispersion!==void 0?o.dispersion:0),Promise.resolve()}}class ag{constructor(n){this.parser=n,this.name=mt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(n){return an(this.parser,n,this.name)!==null?vn:null}extendMaterialParams(n,e){const o=an(this.parser,n,this.name);if(o===null)return Promise.resolve();const i=[];return o.iridescenceFactor!==void 0&&(e.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(e,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(e.iridescenceIOR=o.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(e,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(i)}}class rg{constructor(n){this.parser=n,this.name=mt.KHR_MATERIALS_SHEEN}getMaterialType(n){return an(this.parser,n,this.name)!==null?vn:null}extendMaterialParams(n,e){const o=an(this.parser,n,this.name);if(o===null)return Promise.resolve();const i=[];if(e.sheenColor=new te(0,0,0),e.sheenRoughness=0,e.sheen=1,o.sheenColorFactor!==void 0){const s=o.sheenColorFactor;e.sheenColor.setRGB(s[0],s[1],s[2],ro)}return o.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(e,"sheenColorMap",o.sheenColorTexture,yt)),o.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(e,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(i)}}class cg{constructor(n){this.parser=n,this.name=mt.KHR_MATERIALS_TRANSMISSION}getMaterialType(n){return an(this.parser,n,this.name)!==null?vn:null}extendMaterialParams(n,e){const o=an(this.parser,n,this.name);if(o===null)return Promise.resolve();const i=[];return o.transmissionFactor!==void 0&&(e.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(e,"transmissionMap",o.transmissionTexture)),Promise.all(i)}}class lg{constructor(n){this.parser=n,this.name=mt.KHR_MATERIALS_VOLUME}getMaterialType(n){return an(this.parser,n,this.name)!==null?vn:null}extendMaterialParams(n,e){const o=an(this.parser,n,this.name);if(o===null)return Promise.resolve();const i=[];e.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(e,"thicknessMap",o.thicknessTexture)),e.attenuationDistance=o.attenuationDistance||1/0;const s=o.attenuationColor||[1,1,1];return e.attenuationColor=new te().setRGB(s[0],s[1],s[2],ro),Promise.all(i)}}class dg{constructor(n){this.parser=n,this.name=mt.KHR_MATERIALS_IOR}getMaterialType(n){return an(this.parser,n,this.name)!==null?vn:null}extendMaterialParams(n,e){const o=an(this.parser,n,this.name);return o===null||(e.ior=o.ior!==void 0?o.ior:1.5,e.ior===0&&(e.ior=1e3)),Promise.resolve()}}class fg{constructor(n){this.parser=n,this.name=mt.KHR_MATERIALS_SPECULAR}getMaterialType(n){return an(this.parser,n,this.name)!==null?vn:null}extendMaterialParams(n,e){const o=an(this.parser,n,this.name);if(o===null)return Promise.resolve();const i=[];e.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&i.push(this.parser.assignTexture(e,"specularIntensityMap",o.specularTexture));const s=o.specularColorFactor||[1,1,1];return e.specularColor=new te().setRGB(s[0],s[1],s[2],ro),o.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(e,"specularColorMap",o.specularColorTexture,yt)),Promise.all(i)}}class ug{constructor(n){this.parser=n,this.name=mt.EXT_MATERIALS_BUMP}getMaterialType(n){return an(this.parser,n,this.name)!==null?vn:null}extendMaterialParams(n,e){const o=an(this.parser,n,this.name);if(o===null)return Promise.resolve();const i=[];return e.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&i.push(this.parser.assignTexture(e,"bumpMap",o.bumpTexture)),Promise.all(i)}}class hg{constructor(n){this.parser=n,this.name=mt.KHR_MATERIALS_ANISOTROPY}getMaterialType(n){return an(this.parser,n,this.name)!==null?vn:null}extendMaterialParams(n,e){const o=an(this.parser,n,this.name);if(o===null)return Promise.resolve();const i=[];return o.anisotropyStrength!==void 0&&(e.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(e.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(e,"anisotropyMap",o.anisotropyTexture)),Promise.all(i)}}class pg{constructor(n){this.parser=n,this.name=mt.KHR_TEXTURE_BASISU}loadTexture(n){const e=this.parser,o=e.json,i=o.textures[n];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],a=e.options.ktx2Loader;if(!a){if(o.extensionsRequired&&o.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(n,s.source,a)}}class mg{constructor(n){this.parser=n,this.name=mt.EXT_TEXTURE_WEBP}loadTexture(n){const e=this.name,o=this.parser,i=o.json,s=i.textures[n];if(!s.extensions||!s.extensions[e])return null;const a=s.extensions[e],r=i.images[a.source];let c=o.textureLoader;if(r.uri){const l=o.options.manager.getHandler(r.uri);l!==null&&(c=l)}return o.loadTextureImage(n,a.source,c)}}class gg{constructor(n){this.parser=n,this.name=mt.EXT_TEXTURE_AVIF}loadTexture(n){const e=this.name,o=this.parser,i=o.json,s=i.textures[n];if(!s.extensions||!s.extensions[e])return null;const a=s.extensions[e],r=i.images[a.source];let c=o.textureLoader;if(r.uri){const l=o.options.manager.getHandler(r.uri);l!==null&&(c=l)}return o.loadTextureImage(n,a.source,c)}}class dc{constructor(n,e){this.name=e,this.parser=n}loadBufferView(n){const e=this.parser.json,o=e.bufferViews[n];if(o.extensions&&o.extensions[this.name]){const i=o.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(r){const c=i.byteOffset||0,l=i.byteLength||0,f=i.count,d=i.byteStride,u=new Uint8Array(r,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(f,d,u,i.mode,i.filter).then(function(h){return h.buffer}):a.ready.then(function(){const h=new ArrayBuffer(f*d);return a.decodeGltfBuffer(new Uint8Array(h),f,d,u,i.mode,i.filter),h})})}else return null}}class vg{constructor(n){this.name=mt.EXT_MESH_GPU_INSTANCING,this.parser=n}createNodeMesh(n){const e=this.parser.json,o=e.nodes[n];if(!o.extensions||!o.extensions[this.name]||o.mesh===void 0)return null;const i=e.meshes[o.mesh];for(const l of i.primitives)if(l.mode!==Wn.TRIANGLES&&l.mode!==Wn.TRIANGLE_STRIP&&l.mode!==Wn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=o.extensions[this.name].attributes,r=[],c={};for(const l in a)r.push(this.parser.getDependency("accessor",a[l]).then(f=>(c[l]=f,c[l])));return r.length<1?null:(r.push(this.parser.createNodeMesh(n)),Promise.all(r).then(l=>{const f=l.pop(),d=f.isGroup?f.children:[f],u=l[0].count,h=[];for(const m of d){const _=new ot,p=new Y,g=new dn,x=new Y(1,1,1),M=new Ln(m.geometry,m.material,u);for(let S=0;S<u;S++)c.TRANSLATION&&p.fromBufferAttribute(c.TRANSLATION,S),c.ROTATION&&g.fromBufferAttribute(c.ROTATION,S),c.SCALE&&x.fromBufferAttribute(c.SCALE,S),M.setMatrixAt(S,_.compose(p,g,x));for(const S in c)if(S==="_COLOR_0"){const T=c[S];M.instanceColor=new Hf(T.array,T.itemSize,T.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&m.geometry.setAttribute(S,c[S]);cs.prototype.copy.call(M,m),this.parser.assignFinalMaterial(M),h.push(M)}return f.isGroup?(f.clear(),f.add(...h),f):h[0]}))}}const Nl="glTF",Xi=12,fc={JSON:1313821514,BIN:5130562};class xg{constructor(n){this.name=mt.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(n,0,Xi),o=new TextDecoder;if(this.header={magic:o.decode(new Uint8Array(n.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Nl)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Xi,s=new DataView(n,Xi);let a=0;for(;a<i;){const r=s.getUint32(a,!0);a+=4;const c=s.getUint32(a,!0);if(a+=4,c===fc.JSON){const l=new Uint8Array(n,Xi+a,r);this.content=o.decode(l)}else if(c===fc.BIN){const l=Xi+a;this.body=n.slice(l,l+r)}a+=r}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class _g{constructor(n,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=mt.KHR_DRACO_MESH_COMPRESSION,this.json=n,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(n,e){const o=this.json,i=this.dracoLoader,s=n.extensions[this.name].bufferView,a=n.extensions[this.name].attributes,r={},c={},l={};for(const f in a){const d=Ka[f]||f.toLowerCase();r[d]=a[f]}for(const f in n.attributes){const d=Ka[f]||f.toLowerCase();if(a[f]!==void 0){const u=o.accessors[n.attributes[f]],h=yi[u.componentType];l[d]=h.name,c[d]=u.normalized===!0}}return e.getDependency("bufferView",s).then(function(f){return new Promise(function(d,u){i.decodeDracoFile(f,function(h){for(const m in h.attributes){const _=h.attributes[m],p=c[m];p!==void 0&&(_.normalized=p)}d(h)},r,l,ro,u)})})}}class Mg{constructor(){this.name=mt.KHR_TEXTURE_TRANSFORM}extendTexture(n,e){return(e.texCoord===void 0||e.texCoord===n.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(n=n.clone(),e.texCoord!==void 0&&(n.channel=e.texCoord),e.offset!==void 0&&n.offset.fromArray(e.offset),e.rotation!==void 0&&(n.rotation=e.rotation),e.scale!==void 0&&n.repeat.fromArray(e.scale),n.needsUpdate=!0),n}}class bg{constructor(){this.name=mt.KHR_MESH_QUANTIZATION}}class kl extends ou{constructor(n,e,o,i){super(n,e,o,i)}copySampleValue_(n){const e=this.resultBuffer,o=this.sampleValues,i=this.valueSize,s=n*i*3+i;for(let a=0;a!==i;a++)e[a]=o[s+a];return e}interpolate_(n,e,o,i){const s=this.resultBuffer,a=this.sampleValues,r=this.valueSize,c=r*2,l=r*3,f=i-e,d=(o-e)/f,u=d*d,h=u*d,m=n*l,_=m-l,p=-2*h+3*u,g=h-u,x=1-p,M=g-u+d;for(let S=0;S!==r;S++){const T=a[_+S+r],w=a[_+S+c]*f,y=a[m+S+r],v=a[m+S]*f;s[S]=x*T+M*w+p*y+g*v}return s}}const Sg=new dn;class wg extends kl{interpolate_(n,e,o,i){const s=super.interpolate_(n,e,o,i);return Sg.fromArray(s).normalize().toArray(s),s}}const Wn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},yi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},uc={9728:so,9729:yn,9984:Yc,9985:Ts,9986:Ki,9987:Ro},hc={33071:Is,33648:qc,10497:Io},wa={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ka={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},zo={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},yg={CUBICSPLINE:void 0,LINEAR:dl,STEP:tu},ya={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Eg(t){return t.DefaultMaterial===void 0&&(t.DefaultMaterial=new ge({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ei})),t.DefaultMaterial}function ei(t,n,e){for(const o in e.extensions)t[o]===void 0&&(n.userData.gltfExtensions=n.userData.gltfExtensions||{},n.userData.gltfExtensions[o]=e.extensions[o])}function go(t,n){n.extras!==void 0&&(typeof n.extras=="object"?Object.assign(t.userData,n.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+n.extras))}function Tg(t,n,e){let o=!1,i=!1,s=!1;for(let l=0,f=n.length;l<f;l++){const d=n[l];if(d.POSITION!==void 0&&(o=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),o&&i&&s)break}if(!o&&!i&&!s)return Promise.resolve(t);const a=[],r=[],c=[];for(let l=0,f=n.length;l<f;l++){const d=n[l];if(o){const u=d.POSITION!==void 0?e.getDependency("accessor",d.POSITION):t.attributes.position;a.push(u)}if(i){const u=d.NORMAL!==void 0?e.getDependency("accessor",d.NORMAL):t.attributes.normal;r.push(u)}if(s){const u=d.COLOR_0!==void 0?e.getDependency("accessor",d.COLOR_0):t.attributes.color;c.push(u)}}return Promise.all([Promise.all(a),Promise.all(r),Promise.all(c)]).then(function(l){const f=l[0],d=l[1],u=l[2];return o&&(t.morphAttributes.position=f),i&&(t.morphAttributes.normal=d),s&&(t.morphAttributes.color=u),t.morphTargetsRelative=!0,t})}function Ag(t,n){if(t.updateMorphTargets(),n.weights!==void 0)for(let e=0,o=n.weights.length;e<o;e++)t.morphTargetInfluences[e]=n.weights[e];if(n.extras&&Array.isArray(n.extras.targetNames)){const e=n.extras.targetNames;if(t.morphTargetInfluences.length===e.length){t.morphTargetDictionary={};for(let o=0,i=e.length;o<i;o++)t.morphTargetDictionary[e[o]]=o}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Pg(t){let n;const e=t.extensions&&t.extensions[mt.KHR_DRACO_MESH_COMPRESSION];if(e?n="draco:"+e.bufferView+":"+e.indices+":"+Ea(e.attributes):n=t.indices+":"+Ea(t.attributes)+":"+t.mode,t.targets!==void 0)for(let o=0,i=t.targets.length;o<i;o++)n+=":"+Ea(t.targets[o]);return n}function Ea(t){let n="";const e=Object.keys(t).sort();for(let o=0,i=e.length;o<i;o++)n+=e[o]+":"+t[e[o]]+";";return n}function $a(t){switch(t){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Rg(t){return t.search(/\.jpe?g($|\?)/i)>0||t.search(/^data\:image\/jpeg/)===0?"image/jpeg":t.search(/\.webp($|\?)/i)>0||t.search(/^data\:image\/webp/)===0?"image/webp":t.search(/\.ktx2($|\?)/i)>0||t.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Cg=new ot;class Dg{constructor(n={},e={}){this.json=n,this.extensions={},this.plugins={},this.options=e,this.cache=new eg,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let o=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const r=navigator.userAgent;o=/^((?!chrome|android).)*safari/i.test(r)===!0;const c=r.match(/Version\/(\d+)/);i=o&&c?parseInt(c[1],10):-1,s=r.indexOf("Firefox")>-1,a=s?r.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||o&&i<17||s&&a<98?this.textureLoader=new Vf(this.options.manager):this.textureLoader=new Wf(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ll(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(n){this.extensions=n}setPlugins(n){this.plugins=n}parse(n,e){const o=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([o.getDependencies("scene"),o.getDependencies("animation"),o.getDependencies("camera")])}).then(function(a){const r={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:o,userData:{}};return ei(s,r,i),go(r,i),Promise.all(o._invokeAll(function(c){return c.afterRoot&&c.afterRoot(r)})).then(function(){for(const c of r.scenes)c.updateMatrixWorld();n(r)})}).catch(e)}_markDefs(){const n=this.json.nodes||[],e=this.json.skins||[],o=this.json.meshes||[];for(let i=0,s=e.length;i<s;i++){const a=e[i].joints;for(let r=0,c=a.length;r<c;r++)n[a[r]].isBone=!0}for(let i=0,s=n.length;i<s;i++){const a=n[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(o[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(n,e){e!==void 0&&(n.refs[e]===void 0&&(n.refs[e]=n.uses[e]=0),n.refs[e]++)}_getNodeRef(n,e,o){if(n.refs[e]<=1)return o;const i=o.clone(),s=(a,r)=>{const c=this.associations.get(a);c!=null&&this.associations.set(r,c);for(const[l,f]of a.children.entries())s(f,r.children[l])};return s(o,i),i.name+="_instance_"+n.uses[e]++,i}_invokeOne(n){const e=Object.values(this.plugins);e.push(this);for(let o=0;o<e.length;o++){const i=n(e[o]);if(i)return i}return null}_invokeAll(n){const e=Object.values(this.plugins);e.unshift(this);const o=[];for(let i=0;i<e.length;i++){const s=n(e[i]);s&&o.push(s)}return o}getDependency(n,e){const o=n+":"+e;let i=this.cache.get(o);if(!i){switch(n){case"scene":i=this.loadScene(e);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(e)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(e)});break;case"accessor":i=this.loadAccessor(e);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(e)});break;case"buffer":i=this.loadBuffer(e);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(e)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(e)});break;case"skin":i=this.loadSkin(e);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(e)});break;case"camera":i=this.loadCamera(e);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(n,e)}),!i)throw new Error("Unknown type: "+n);break}this.cache.add(o,i)}return i}getDependencies(n){let e=this.cache.get(n);if(!e){const o=this,i=this.json[n+(n==="mesh"?"es":"s")]||[];e=Promise.all(i.map(function(s,a){return o.getDependency(n,a)})),this.cache.add(n,e)}return e}loadBuffer(n){const e=this.json.buffers[n],o=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&n===0)return Promise.resolve(this.extensions[mt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,a){o.load(Qi.resolveURL(e.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(n){const e=this.json.bufferViews[n];return this.getDependency("buffer",e.buffer).then(function(o){const i=e.byteLength||0,s=e.byteOffset||0;return o.slice(s,s+i)})}loadAccessor(n){const e=this,o=this.json,i=this.json.accessors[n];if(i.bufferView===void 0&&i.sparse===void 0){const a=wa[i.type],r=yi[i.componentType],c=i.normalized===!0,l=new r(i.count*a);return Promise.resolve(new xt(l,a,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){const r=a[0],c=wa[i.type],l=yi[i.componentType],f=l.BYTES_PER_ELEMENT,d=f*c,u=i.byteOffset||0,h=i.bufferView!==void 0?o.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0;let _,p;if(h&&h!==d){const g=Math.floor(u/h),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+g+":"+i.count;let M=e.cache.get(x);M||(_=new l(r,g*h,i.count*h/f),M=new Xf(_,h/f),e.cache.add(x,M)),p=new nu(M,c,u%h/f,m)}else r===null?_=new l(i.count*c):_=new l(r,u,i.count*c),p=new xt(_,c,m);if(i.sparse!==void 0){const g=wa.SCALAR,x=yi[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,S=i.sparse.values.byteOffset||0,T=new x(a[1],M,i.sparse.count*g),w=new l(a[2],S,i.sparse.count*c);r!==null&&(p=new xt(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let y=0,v=T.length;y<v;y++){const E=T[y];if(p.setX(E,w[y*c]),c>=2&&p.setY(E,w[y*c+1]),c>=3&&p.setZ(E,w[y*c+2]),c>=4&&p.setW(E,w[y*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=m}return p})}loadTexture(n){const e=this.json,o=this.options,s=e.textures[n].source,a=e.images[s];let r=this.textureLoader;if(a.uri){const c=o.manager.getHandler(a.uri);c!==null&&(r=c)}return this.loadTextureImage(n,s,r)}loadTextureImage(n,e,o){const i=this,s=this.json,a=s.textures[n],r=s.images[e],c=(r.uri||r.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,o).then(function(f){f.flipY=!1,f.name=a.name||r.name||"",f.name===""&&typeof r.uri=="string"&&r.uri.startsWith("data:image/")===!1&&(f.name=r.uri);const u=(s.samplers||{})[a.sampler]||{};return f.magFilter=uc[u.magFilter]||yn,f.minFilter=uc[u.minFilter]||Ro,f.wrapS=hc[u.wrapS]||Io,f.wrapT=hc[u.wrapT]||Io,f.generateMipmaps=!f.isCompressedTexture&&f.minFilter!==so&&f.minFilter!==yn,i.associations.set(f,{textures:n}),f}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(n,e){const o=this,i=this.json,s=this.options;if(this.sourceCache[n]!==void 0)return this.sourceCache[n].then(d=>d.clone());const a=i.images[n],r=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=o.getDependency("bufferView",a.bufferView).then(function(d){l=!0;const u=new Blob([d],{type:a.mimeType});return c=r.createObjectURL(u),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+n+" is missing URI and bufferView");const f=Promise.resolve(c).then(function(d){return new Promise(function(u,h){let m=u;e.isImageBitmapLoader===!0&&(m=function(_){const p=new Oa(_);p.needsUpdate=!0,u(p)}),e.load(Qi.resolveURL(d,s.path),m,void 0,h)})}).then(function(d){return l===!0&&r.revokeObjectURL(c),go(d,a),d.userData.mimeType=a.mimeType||Rg(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[n]=f,f}assignTexture(n,e,o,i){const s=this;return this.getDependency("texture",o.index).then(function(a){if(!a)return null;if(o.texCoord!==void 0&&o.texCoord>0&&(a=a.clone(),a.channel=o.texCoord),s.extensions[mt.KHR_TEXTURE_TRANSFORM]){const r=o.extensions!==void 0?o.extensions[mt.KHR_TEXTURE_TRANSFORM]:void 0;if(r){const c=s.associations.get(a);a=s.extensions[mt.KHR_TEXTURE_TRANSFORM].extendTexture(a,r),s.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),n[e]=a,a})}assignFinalMaterial(n){const e=n.geometry;let o=n.material;const i=e.attributes.tangent===void 0,s=e.attributes.color!==void 0,a=e.attributes.normal===void 0;if(n.isPoints){const r="PointsMaterial:"+o.uuid;let c=this.cache.get(r);c||(c=new za,fa.prototype.copy.call(c,o),c.color.copy(o.color),c.map=o.map,c.sizeAttenuation=!1,this.cache.add(r,c)),o=c}else if(n.isLine){const r="LineBasicMaterial:"+o.uuid;let c=this.cache.get(r);c||(c=new qf,fa.prototype.copy.call(c,o),c.color.copy(o.color),c.map=o.map,this.cache.add(r,c)),o=c}if(i||s||a){let r="ClonedMaterial:"+o.uuid+":";i&&(r+="derivative-tangents:"),s&&(r+="vertex-colors:"),a&&(r+="flat-shading:");let c=this.cache.get(r);c||(c=o.clone(),s&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(r,c),this.associations.set(c,this.associations.get(o))),o=c}n.material=o}getMaterialType(){return ge}loadMaterial(n){const e=this,o=this.json,i=this.extensions,s=o.materials[n];let a;const r={},c=s.extensions||{},l=[];if(c[mt.KHR_MATERIALS_UNLIT]){const d=i[mt.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),l.push(d.extendParams(r,s,e))}else{const d=s.pbrMetallicRoughness||{};if(r.color=new te(1,1,1),r.opacity=1,Array.isArray(d.baseColorFactor)){const u=d.baseColorFactor;r.color.setRGB(u[0],u[1],u[2],ro),r.opacity=u[3]}d.baseColorTexture!==void 0&&l.push(e.assignTexture(r,"map",d.baseColorTexture,yt)),r.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,r.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(r,"metalnessMap",d.metallicRoughnessTexture)),l.push(e.assignTexture(r,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(n)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(n,r)})))}s.doubleSided===!0&&(r.side=$e);const f=s.alphaMode||ya.OPAQUE;if(f===ya.BLEND?(r.transparent=!0,r.depthWrite=!1):(r.transparent=!1,f===ya.MASK&&(r.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==wt&&(l.push(e.assignTexture(r,"normalMap",s.normalTexture)),r.normalScale=new rt(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;r.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&a!==wt&&(l.push(e.assignTexture(r,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(r.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==wt){const d=s.emissiveFactor;r.emissive=new te().setRGB(d[0],d[1],d[2],ro)}return s.emissiveTexture!==void 0&&a!==wt&&l.push(e.assignTexture(r,"emissiveMap",s.emissiveTexture,yt)),Promise.all(l).then(function(){const d=new a(r);return s.name&&(d.name=s.name),go(d,s),e.associations.set(d,{materials:n}),s.extensions&&ei(i,d,s),d})}createUniqueName(n){const e=Yf.sanitizeNodeName(n||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(n){const e=this,o=this.extensions,i=this.primitiveCache;function s(r){return o[mt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(r,e).then(function(c){return pc(c,r,e)})}const a=[];for(let r=0,c=n.length;r<c;r++){const l=n[r],f=Pg(l),d=i[f];if(d)a.push(d.promise);else{let u;l.extensions&&l.extensions[mt.KHR_DRACO_MESH_COMPRESSION]?u=s(l):u=pc(new sn,l,e),i[f]={primitive:l,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(n){const e=this,o=this.json,i=this.extensions,s=o.meshes[n],a=s.primitives,r=[];for(let c=0,l=a.length;c<l;c++){const f=a[c].material===void 0?Eg(this.cache):this.getDependency("material",a[c].material);r.push(f)}return r.push(e.loadGeometries(a)),Promise.all(r).then(function(c){const l=c.slice(0,c.length-1),f=c[c.length-1],d=[];for(let h=0,m=f.length;h<m;h++){const _=f[h],p=a[h];let g;const x=l[h];if(p.mode===Wn.TRIANGLES||p.mode===Wn.TRIANGLE_STRIP||p.mode===Wn.TRIANGLE_FAN||p.mode===void 0)g=s.isSkinnedMesh===!0?new Kf(_,x):new G(_,x),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),p.mode===Wn.TRIANGLE_STRIP?g.geometry=$0(g.geometry,cl):p.mode===Wn.TRIANGLE_FAN&&(g.geometry=$0(g.geometry,Ga));else if(p.mode===Wn.LINES)g=new $f(_,x);else if(p.mode===Wn.LINE_STRIP)g=new jf(_,x);else if(p.mode===Wn.LINE_LOOP)g=new Zf(_,x);else if(p.mode===Wn.POINTS)g=new Ha(_,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(g.geometry.morphAttributes).length>0&&Ag(g,s),g.name=e.createUniqueName(s.name||"mesh_"+n),go(g,s),p.extensions&&ei(i,g,p),e.assignFinalMaterial(g),d.push(g)}for(let h=0,m=d.length;h<m;h++)e.associations.set(d[h],{meshes:n,primitives:h});if(d.length===1)return s.extensions&&ei(i,d[0],s),d[0];const u=new Ke;s.extensions&&ei(i,u,s),e.associations.set(u,{meshes:n});for(let h=0,m=d.length;h<m;h++)u.add(d[h]);return u})}loadCamera(n){let e;const o=this.json.cameras[n],i=o[o.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return o.type==="perspective"?e=new wi(St.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):o.type==="orthographic"&&(e=new Bs(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),o.name&&(e.name=this.createUniqueName(o.name)),go(e,o),Promise.resolve(e)}loadSkin(n){const e=this.json.skins[n],o=[];for(let i=0,s=e.joints.length;i<s;i++)o.push(this._loadNodeShallow(e.joints[i]));return e.inverseBindMatrices!==void 0?o.push(this.getDependency("accessor",e.inverseBindMatrices)):o.push(null),Promise.all(o).then(function(i){const s=i.pop(),a=i,r=[],c=[];for(let l=0,f=a.length;l<f;l++){const d=a[l];if(d){r.push(d);const u=new ot;s!==null&&u.fromArray(s.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new Qf(r,c)})}loadAnimation(n){const e=this.json,o=this,i=e.animations[n],s=i.name?i.name:"animation_"+n,a=[],r=[],c=[],l=[],f=[];for(let d=0,u=i.channels.length;d<u;d++){const h=i.channels[d],m=i.samplers[h.sampler],_=h.target,p=_.node,g=i.parameters!==void 0?i.parameters[m.input]:m.input,x=i.parameters!==void 0?i.parameters[m.output]:m.output;_.node!==void 0&&(a.push(this.getDependency("node",p)),r.push(this.getDependency("accessor",g)),c.push(this.getDependency("accessor",x)),l.push(m),f.push(_))}return Promise.all([Promise.all(a),Promise.all(r),Promise.all(c),Promise.all(l),Promise.all(f)]).then(function(d){const u=d[0],h=d[1],m=d[2],_=d[3],p=d[4],g=[];for(let M=0,S=u.length;M<S;M++){const T=u[M],w=h[M],y=m[M],v=_[M],E=p[M];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();const b=o._createAnimationTracks(T,w,y,v,E);if(b)for(let A=0;A<b.length;A++)g.push(b[A])}const x=new Jf(s,void 0,g);return go(x,i),x})}createNodeMesh(n){const e=this.json,o=this,i=e.nodes[n];return i.mesh===void 0?null:o.getDependency("mesh",i.mesh).then(function(s){const a=o._getNodeRef(o.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(r){if(r.isMesh)for(let c=0,l=i.weights.length;c<l;c++)r.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(n){const e=this.json,o=this,i=e.nodes[n],s=o._loadNodeShallow(n),a=[],r=i.children||[];for(let l=0,f=r.length;l<f;l++)a.push(o.getDependency("node",r[l]));const c=i.skin===void 0?Promise.resolve(null):o.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),c]).then(function(l){const f=l[0],d=l[1],u=l[2];u!==null&&f.traverse(function(h){h.isSkinnedMesh&&h.bind(u,Cg)});for(let h=0,m=d.length;h<m;h++)f.add(d[h]);if(f.userData.pivot!==void 0&&d.length>0){const h=f.userData.pivot,m=d[0];f.pivot=new Y().fromArray(h),f.position.x-=h[0],f.position.y-=h[1],f.position.z-=h[2],m.position.set(0,0,0),delete f.userData.pivot}return f})}_loadNodeShallow(n){const e=this.json,o=this.extensions,i=this;if(this.nodeCache[n]!==void 0)return this.nodeCache[n];const s=e.nodes[n],a=s.name?i.createUniqueName(s.name):"",r=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(n)});return c&&r.push(c),s.camera!==void 0&&r.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(n)}).forEach(function(l){r.push(l)}),this.nodeCache[n]=Promise.all(r).then(function(l){let f;if(s.isBone===!0?f=new eu:l.length>1?f=new Ke:l.length===1?f=l[0]:f=new cs,f!==l[0])for(let d=0,u=l.length;d<u;d++)f.add(l[d]);if(s.name&&(f.userData.name=s.name,f.name=a),go(f,s),s.extensions&&ei(o,f,s),s.matrix!==void 0){const d=new ot;d.fromArray(s.matrix),f.applyMatrix4(d)}else s.translation!==void 0&&f.position.fromArray(s.translation),s.rotation!==void 0&&f.quaternion.fromArray(s.rotation),s.scale!==void 0&&f.scale.fromArray(s.scale);if(!i.associations.has(f))i.associations.set(f,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const d=i.associations.get(f);i.associations.set(f,{...d})}return i.associations.get(f).nodes=n,f}),this.nodeCache[n]}loadScene(n){const e=this.extensions,o=this.json.scenes[n],i=this,s=new Ke;o.name&&(s.name=i.createUniqueName(o.name)),go(s,o),o.extensions&&ei(e,s,o);const a=o.nodes||[],r=[];for(let c=0,l=a.length;c<l;c++)r.push(i.getDependency("node",a[c]));return Promise.all(r).then(function(c){for(let f=0,d=c.length;f<d;f++){const u=c[f];u.parent!==null?s.add(Qm(u)):s.add(u)}const l=f=>{const d=new Map;for(const[u,h]of i.associations)(u instanceof fa||u instanceof Oa)&&d.set(u,h);return f.traverse(u=>{const h=i.associations.get(u);h!=null&&d.set(u,h)}),d};return i.associations=l(s),s})}_createAnimationTracks(n,e,o,i,s){const a=[],r=n.name?n.name:n.uuid,c=[];function l(h){h.morphTargetInfluences&&c.push(h.name?h.name:h.uuid)}zo[s.path]===zo.weights?(l(n),n.isGroup&&n.children.forEach(l)):c.push(r);let f;switch(zo[s.path]){case zo.weights:f=b0;break;case zo.rotation:f=S0;break;case zo.translation:case zo.scale:f=M0;break;default:switch(o.itemSize){case 1:f=b0;break;case 2:case 3:default:f=M0;break}break}const d=i.interpolation!==void 0?yg[i.interpolation]:dl,u=this._getArrayFromAccessor(o);for(let h=0,m=c.length;h<m;h++){const _=new f(c[h]+"."+zo[s.path],e.array,u,d);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),a.push(_)}return a}_getArrayFromAccessor(n){let e=n.array;if(n.normalized){const o=$a(e.constructor),i=new Float32Array(e.length);for(let s=0,a=e.length;s<a;s++)i[s]=e[s]*o;e=i}return e}_createCubicSplineTrackInterpolant(n){n.createInterpolant=function(o){const i=this instanceof S0?wg:kl;return new i(this.times,this.values,this.getValueSize()/3,o)},n.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Ig(t,n,e){const o=n.attributes,i=new fl;if(o.POSITION!==void 0){const r=e.json.accessors[o.POSITION],c=r.min,l=r.max;if(c!==void 0&&l!==void 0){if(i.set(new Y(c[0],c[1],c[2]),new Y(l[0],l[1],l[2])),r.normalized){const f=$a(yi[r.componentType]);i.min.multiplyScalar(f),i.max.multiplyScalar(f)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=n.targets;if(s!==void 0){const r=new Y,c=new Y;for(let l=0,f=s.length;l<f;l++){const d=s[l];if(d.POSITION!==void 0){const u=e.json.accessors[d.POSITION],h=u.min,m=u.max;if(h!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(h[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(h[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(h[2]),Math.abs(m[2]))),u.normalized){const _=$a(yi[u.componentType]);c.multiplyScalar(_)}r.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(r)}t.boundingBox=i;const a=new ul;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,t.boundingSphere=a}function pc(t,n,e){const o=n.attributes,i=[];function s(a,r){return e.getDependency("accessor",a).then(function(c){t.setAttribute(r,c)})}for(const a in o){const r=Ka[a]||a.toLowerCase();r in t.attributes||i.push(s(o[a],r))}if(n.indices!==void 0&&!t.index){const a=e.getDependency("accessor",n.indices).then(function(r){t.setIndex(r)});i.push(a)}return Vt.workingColorSpace!==ro&&"COLOR_0"in o&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Vt.workingColorSpace}" not supported.`),go(t,n),Ig(t,n,e),Promise.all(i).then(function(){return n.targets!==void 0?Tg(t,n.targets,e):t})}const Fl=new Jm,Ta=new Map;let Aa=null;async function Ol(){return Aa||(Aa=fetch("./models/manifest.json").then(t=>t.ok?t.json():null).catch(()=>null)),Aa}function Gl(t){return t.startsWith("http")?t:`./${t.replace(/^\//,"")}`}async function Bl(t){try{return(await fetch(t,{method:"HEAD"})).ok}catch{return!1}}function zl(t,n,e=1){const o=new fl().setFromObject(t);if(o.isEmpty())return;const i=o.getSize(new Y),s=o.getCenter(new Y),a=Math.max(i.x,i.y,i.z,.001),r=n/a*e;t.scale.setScalar(r),t.position.sub(s.multiplyScalar(r)),t.position.y+=i.y*r/2}function Lg(t,n){const e=new Set(n.map(i=>i.toLowerCase()));let o=null;return t.traverse(i=>{var r;if(o)return;const s=i;if(!s.isMesh)return;const a=s.name.toLowerCase();(e.has(a)||e.has(((r=i.parent)==null?void 0:r.name.toLowerCase())??""))&&(o=s)}),o}function Hl(t){t.traverse(n=>{const e=n;if(!e.isMesh)return;e.castShadow=!0,e.receiveShadow=!0;const o=Array.isArray(e.material)?e.material:[e.material];for(const i of o)i&&"color"in i&&i instanceof ge&&(i.envMapIntensity=1)})}async function Ug(t,n,e){var i,s;const o=Gl(t);if(!await Bl(o))return null;try{if(!Ta.has(o)){const r=(await Fl.loadAsync(o)).scene,c=n.targetHeight??((i=e.defaults)==null?void 0:i.targetHeight)??6;zl(r,c,n.scale??((s=e.defaults)==null?void 0:s.scale)??1),Hl(r),Ta.set(o,r)}return Ta.get(o).clone(!0)}catch{return null}}async function Ng(t,n,e){var i,s;const o=Gl(t);if(!await Bl(o))return null;try{const a=await Fl.loadAsync(o),r=a.scene,c=n.targetHeight??((i=e.defaults)==null?void 0:i.targetHeight)??1.9;return zl(r,c,n.scale??((s=e.defaults)==null?void 0:s.scale)??1),Hl(r),{group:r,clips:a.animations??[]}}catch{return null}}function kg(t){t.traverse(n=>{const e=n;if(!e.isMesh)return;const o=Array.isArray(e.material)?e.material:[e.material];for(const i of o){if(!i)continue;const s=i;s.name==="Grey"?(s.color.setHex(4015958),s.roughness=.42,s.metalness=.62,s.envMapIntensity=1.1):s.name==="Main"?(s.color.setHex(3104670),s.roughness=.5,s.metalness=.34,s.envMapIntensity=1.15):s.name==="Black"?(s.color.setHex(1316895),s.roughness=.32,s.metalness=.5,s.envMapIntensity=1):(s.roughness=Math.max(.3,Math.min(.9,s.roughness??.7)),s.metalness=Math.max(.1,Math.min(.7,s.metalness??.1)),s.envMapIntensity=1),s.needsUpdate=!0}})}function mc(t=1.9){const n=t*1.15,e=document.createElement("canvas");e.width=e.height=128;const o=e.getContext("2d"),i=o.createRadialGradient(64,64,0,64,64,64);i.addColorStop(0,"rgba(0,0,0,0.55)"),i.addColorStop(.45,"rgba(0,0,0,0.28)"),i.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=i,o.fillRect(0,0,128,128);const s=new Wt(e);s.colorSpace=yt;const a=new G(new Je(n,n),new wt({map:s,transparent:!0,opacity:.85,depthWrite:!1}));return a.rotation.x=-Math.PI/2,a.position.y=.06,a.renderOrder=-1,a.name="ContactShadow",a}const gc={forest:{primary:2051382,secondary:3462041,accent:7268279,crystal:4906624,ground:1717032},coast:{primary:1981023,secondary:3718648,accent:8246268,crystal:6333946,ground:1715778},library:{primary:3878751,secondary:10980346,accent:12891645,crystal:9133302,ground:2762048},market:{primary:4863776,secondary:16498468,accent:16569165,crystal:16096779,ground:4010016},temple:{primary:4857912,secondary:16020150,accent:16361684,crystal:15485081,ground:3481648},plains:{primary:3359061,secondary:9741240,accent:13358561,crystal:6583435,ground:2765888}};function ds(t){return gc[t]??gc.plains}function Vl(t,n,e){const o=new G(new we(.35,.55,1.6,16),Lo(6045747,.75));o.position.y=1.1,o.castShadow=!0;const i=new G(new me(1.1,.14,10,24,Math.PI),Lo(4876097,.7));i.rotation.z=Math.PI,i.position.y=2.2;const s=new G(new $n(.95,1),e);return s.position.y=3.5,s.castShadow=!0,t.add(o,i,s),s}function Fg(t,n,e){const o=new G(new Ye(2.2,.2,1.4),Lo(7035466,.65));o.position.set(0,.55,.4);const i=new G(new we(.45,.6,2.8,16),Lo(13358561,.45));i.position.y=1.8,i.castShadow=!0;const s=new G(new lo(.75,1),e);s.position.y=3.6;const a=new Kn(n.crystal,1.2,10);return a.position.y=3.6,t.add(o,i,s,a),s}function Og(t,n,e){const o=new G(new Ye(2.6,.5,2.2),Lo(10265519,.35));o.position.y=.55;const i=new G(new gt(1.8,1.2,4),new ge({color:n.primary,roughness:.4,metalness:.2}));i.position.y=1.4,i.rotation.y=Math.PI/4;const s=new G(new we(.12,.15,2.2,12),Lo(13751771,.3));s.position.set(-.9,1.3,0);const a=s.clone();a.position.x=.9;const r=new G(new iu(.55,.16,64,12),e);return r.position.y=3.2,t.add(o,i,s,a,r),r}function Gg(t,n,e){const o=new G(new Ye(2.4,.15,1.8),Lo(9136404,.7));o.position.y=.55;const i=new G(new we(0,1.6,.9,4),new ge({color:n.secondary,roughness:.55,side:$e}));i.position.y=1.8,i.rotation.y=Math.PI/4;const s=new G(new So(.8,0),e);s.position.y=3.1;const a=Rl(n.accent);return a.position.set(1.1,0,.6),t.add(o,i,s,a),s}function Bg(t,n,e){const o=new G(new Ye(3,.25,2.4),Lo(10322313,.55));o.position.y=.5;const i=new G(new we(.25,.4,3.2,8),Lo(12887477,.4));i.position.y=2.1,i.castShadow=!0;const s=new G(new me(1.3,.06,8,40),new ge({color:n.accent,emissive:n.accent,emissiveIntensity:.6,metalness:.8,roughness:.2}));s.rotation.x=Math.PI/2,s.position.y=3.8;const a=new G(new lo(.9,2),e);return a.position.y=4.5,t.add(o,i,s,a),a}const zg={forest:Vl,coast:Fg,library:Og,market:Gg,temple:Bg};function Hg(t,n){const e=ds(t.theme),o=new Ke,i=t.unlocked,s=i?1:.45,a=new G(new we(2.4,2.8,.35,24),new ge({color:e.ground,roughness:.55,metalness:.12,transparent:!i,opacity:s}));a.position.y=.18,a.receiveShadow=!0;const r=new G(new me(2.1,.08,12,48),new ge({color:e.secondary,emissive:e.accent,emissiveIntensity:i?.35:.08,roughness:.3,metalness:.55,transparent:!i,opacity:s}));r.rotation.x=Math.PI/2,r.position.y=.38,o.add(a,r);const c=hr(i?e.crystal:7041664,t.cleared?.85:i?.55:.12),l=(zg[t.theme]??Vl)(o,e,c);if(l.userData.isCrystal=!0,n){const f=new G(new Di(2.3,2.55,48),new wt({color:16498468,transparent:!0,opacity:.55,side:$e}));f.rotation.x=-Math.PI/2,f.position.y=.42,f.userData.isPulse=!0,o.add(f);const d=new fr(16774358,i?2.2:.4,18,Math.PI/5,.4);d.position.set(0,8,2),d.target.position.set(0,2,0),o.add(d,d.target)}if(t.cleared){const f=new G(new ye(3.2,24,24),new wt({color:e.accent,transparent:!0,opacity:.07,depthWrite:!1}));f.position.y=2,o.add(f)}if(t.dueCount&&t.dueCount>0&&i){const f=new G(new Di(2.65,2.9,48),new wt({color:16498468,transparent:!0,opacity:.42,side:$e}));f.rotation.x=-Math.PI/2,f.position.y=.5,f.userData.isDueRing=!0,o.add(f)}return o}let Pa=null;async function Vg(){return Pa||(Pa=await Ol()),Pa}function Wg(t,n){const e=ds(n.theme),o=n.unlocked,i=o?1:.45,s=new G(new we(2.4,2.8,.35,24),new ge({color:e.ground,roughness:.55,metalness:.12,transparent:!o,opacity:i}));s.position.y=.18,s.receiveShadow=!0;const a=new G(new me(2.1,.08,12,48),new ge({color:e.secondary,emissive:e.accent,emissiveIntensity:o?.35:.08,roughness:.3,metalness:.55,transparent:!o,opacity:i}));a.rotation.x=Math.PI/2,a.position.y=.38,t.add(s,a)}function Xg(t,n,e,o,i){if(e){const s=new G(new Di(2.3,2.55,48),new wt({color:16498468,transparent:!0,opacity:.55,side:$e}));s.rotation.x=-Math.PI/2,s.position.y=.42,s.userData.isPulse=!0,t.add(s);const a=new fr(16774358,o?2.2:.4,18,Math.PI/5,.4);a.position.set(0,8,2),a.target.position.set(0,2,0),t.add(a,a.target)}if(n.cleared){const s=new G(new ye(3.2,24,24),new wt({color:i.accent,transparent:!0,opacity:.07,depthWrite:!1}));s.position.y=2,t.add(s)}if(n.dueCount&&n.dueCount>0&&o){const s=new G(new Di(2.65,2.9,48),new wt({color:16498468,transparent:!0,opacity:.42,side:$e}));s.rotation.x=-Math.PI/2,s.position.y=.5,s.userData.isDueRing=!0,t.add(s)}}function vc(t,n){const e=ds(t.theme),o=new G(new $n(.85,1),hr(t.unlocked?e.crystal:7041664,.65));return o.position.y=3.6,o.castShadow=!0,o.userData.isCrystal=!0,n.add(o),o}function qg(t){let n=null;return t.traverse(e=>{var i;if(n)return;const o=e;(i=o.userData)!=null&&i.isCrystal&&(n=o)}),n}async function Yg(t,n){var c,l,f;const e=await Vg(),o=ds(t.theme),i=t.name.includes("学习圣所"),s=e&&!i?((c=e.nodes)==null?void 0:c[t.id])??((l=e.themes)==null?void 0:l[t.theme])??null:null;if(e&&s){const d=await Ug(s.file,s,e);if(d){const u=new Ke;Wg(u,t),d.position.y=.35,yl(d,.3),u.add(d);const h=s.pickMeshNames??((f=e.defaults)==null?void 0:f.pickMeshNames)??["Crystal","PICK"];let m=Lg(d,h);return m?m.userData.isCrystal=!0:m=vc(t,u),Xg(u,t,n,t.unlocked,o),{root:u,crystal:m}}}const a=Hg(t,n),r=qg(a)??vc(t,a);return{root:a,crystal:r}}const Kg={masonry:{course:.42,block:1.05},paving:{course:.62,block:.62},wood:{course:.16,block:3},tiles:{course:.24,block:.3}},$g=`
varying vec3 vKitWorld;
varying vec3 vKitNormal;
float kHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float kNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(kHash(i), kHash(i + vec2(1.0, 0.0)), f.x), mix(kHash(i + vec2(0.0, 1.0)), kHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
// 返回 x: 色调系数, y: 灰缝 / 缝隙强度
vec2 kPattern(vec2 p, float course, float block, int kind) {
  float row = floor(p.y / course);
  float rowRand = kHash(vec2(row, 3.1));
  float bl = block * (kind == 2 ? (0.7 + 0.9 * rowRand) : (0.82 + 0.5 * kHash(vec2(row, 7.7))));
  float u = p.x / bl + rowRand * 9.0 + (kind == 3 ? 0.5 * mod(row, 2.0) : 0.0);
  float col = floor(u);
  vec2 f = vec2(fract(u), fract(p.y / course));
  vec2 d = min(f, 1.0 - f) * vec2(bl, course);
  float edge = (kind == 2) ? d.y : min(d.x, d.y);
  float gap = 1.0 - smoothstep(kind == 2 ? 0.004 : 0.007, kind == 2 ? 0.012 : 0.02, edge);
  float wear = 1.0 - smoothstep(0.018, kind == 3 ? 0.07 : 0.05, edge);
  float tone = kHash(vec2(col, row));
  float grain = kind == 2 ? kNoise(vec2(p.x * 1.4, p.y * 38.0 + col * 5.0)) : kNoise(p * 26.0);
  float shade = (0.84 + tone * 0.28) * (1.0 - wear * 0.07) * (0.93 + grain * 0.14);
  return vec2(shade, gap);
}
`,jg={masonry:0,paving:1,wood:2,tiles:3};function Eo(t,n){const{course:e,block:o}=Kg[n],i=jg[n];t.onBeforeCompile=s=>{s.vertexShader=`varying vec3 vKitWorld;
varying vec3 vKitNormal;
`+s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vKitWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
       vKitNormal = normalize(mat3(modelMatrix) * normal);`),s.fragmentShader=$g+s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
         float kGap = 0.0;
         {
           vec3 kn = normalize(vKitNormal);
           vec3 kw = pow(abs(kn), vec3(5.0));
           kw /= (kw.x + kw.y + kw.z + 1e-4);
           vec2 pa = kPattern(vec2(vKitWorld.z, vKitWorld.y), ${e.toFixed(3)}, ${o.toFixed(3)}, ${i});
           vec2 pb = kPattern(vec2(vKitWorld.x, vKitWorld.y), ${e.toFixed(3)}, ${o.toFixed(3)}, ${i});
           vec2 pc = kPattern(vec2(vKitWorld.x, vKitWorld.z), ${e.toFixed(3)}, ${o.toFixed(3)}, ${i});
           vec2 pr = pa * kw.x + pc * kw.y + pb * kw.z;
           diffuseColor.rgb *= pr.x * (1.0 - pr.y * 0.4);
           kGap = pr.y;
         }`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
         roughnessFactor = mix(roughnessFactor, 1.0, kGap);`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
         {
           // 灰缝凹槽：沿主投影方向对缝隙强度求有限差分，把法线向缝内倾斜（远处淡出避免闪烁）
           float kFade = 1.0 - smoothstep(22.0, 80.0, length(vViewPosition));
           if (kFade > 0.01) {
             vec3 ka = abs(normalize(vKitNormal));
             const float kE = 0.012;
             vec3 kg;
             if (ka.y > ka.x && ka.y > ka.z) {
               vec2 q = vKitWorld.xz;
               float g0 = kPattern(q, ${e.toFixed(3)}, ${o.toFixed(3)}, ${i}).y;
               kg = vec3(kPattern(q + vec2(kE, 0.0), ${e.toFixed(3)}, ${o.toFixed(3)}, ${i}).y - g0, 0.0, kPattern(q + vec2(0.0, kE), ${e.toFixed(3)}, ${o.toFixed(3)}, ${i}).y - g0) / kE;
             } else if (ka.x > ka.z) {
               vec2 q = vec2(vKitWorld.z, vKitWorld.y);
               float g0 = kPattern(q, ${e.toFixed(3)}, ${o.toFixed(3)}, ${i}).y;
               kg = vec3(0.0, kPattern(q + vec2(0.0, kE), ${e.toFixed(3)}, ${o.toFixed(3)}, ${i}).y - g0, kPattern(q + vec2(kE, 0.0), ${e.toFixed(3)}, ${o.toFixed(3)}, ${i}).y - g0) / kE;
             } else {
               vec2 q = vec2(vKitWorld.x, vKitWorld.y);
               float g0 = kPattern(q, ${e.toFixed(3)}, ${o.toFixed(3)}, ${i}).y;
               kg = vec3(kPattern(q + vec2(kE, 0.0), ${e.toFixed(3)}, ${o.toFixed(3)}, ${i}).y - g0, kPattern(q + vec2(0.0, kE), ${e.toFixed(3)}, ${o.toFixed(3)}, ${i}).y - g0, 0.0) / kE;
             }
             vec3 kv = mat3(viewMatrix) * kg;
             kv -= normal * dot(kv, normal);
             normal = normalize(normal + kv * 0.0055 * kFade);
           }
         }`)},t.customProgramCacheKey=()=>`kit-${n}`,t.needsUpdate=!0}function Zg(t,n=5.5){t.onBeforeCompile=e=>{e.vertexShader=`varying vec3 vCobWorld;
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
         }`)},t.customProgramCacheKey=()=>`cobble-${n}`,t.needsUpdate=!0}const Qg=new ot,xc=new dn,_c=new co,Mc=new Y(1,1,1),bc=new Y;function fe(t,n,e,o=.04){return o<.0075?new Ye(t,n,e):new Do(t,n,e,1,Math.min(o,t/2.01,n/2.01,e/2.01))}function tt(t,n,e,o=16){return new we(t,n,e,o,1)}function gn(t,n,e,o=8){const i=new Mn;for(let a=0;a<o;a++){const r=(a+.5)/o*Math.PI*2,c=Math.cos(r)*t,l=Math.sin(r)*t;a===0?i.moveTo(c,l):i.lineTo(c,l)}i.closePath();const s=new Cn(i,{depth:Math.max(.001,n-e*2),bevelEnabled:!0,bevelThickness:e,bevelSize:e,bevelSegments:1});return s.rotateX(-Math.PI/2),s.translate(0,e,0),s}function Wl(t,n,e,o,i){const s=new Mn;s.moveTo(Math.cos(e)*t,Math.sin(e)*t),s.lineTo(Math.cos(e)*n,Math.sin(e)*n),s.absarc(0,0,n,e,o,!1),s.lineTo(Math.cos(o)*t,Math.sin(o)*t),s.absarc(0,0,t,o,e,!0);const a=new Cn(s,{depth:i,bevelEnabled:!1,curveSegments:3});return a.rotateX(-Math.PI/2),a}function It(t,n,e,o=6){const i=new Y(...t),s=new Y(...n).sub(i),a=new we(e,e,s.length(),o,1),r=new dn().setFromUnitVectors(new Y(0,1,0),s.clone().normalize());return a.applyMatrix4(new ot().compose(i.clone().addScaledVector(s,.5),r,new Y(1,1,1))),a}function ko(t,n,e,o=.04){const i=new Mn;i.absarc(0,0,t,0,Math.PI,!1),i.lineTo(-n,0),i.absarc(0,0,n,Math.PI,0,!0),i.closePath();const s=new Cn(i,{depth:Math.max(.001,e-o*2),bevelEnabled:!0,bevelThickness:o,bevelSize:o*.8,bevelSegments:1,curveSegments:18});return s.translate(0,0,-(e-o*2)/2),s}function Yn(t,n,e){const o=new Mn;o.moveTo(-t/2,0),o.lineTo(t/2,0),o.lineTo(0,n),o.closePath();const i=new Cn(o,{depth:e,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});return i.translate(0,0,-e/2),i}class Dn{constructor(){ne(this,"buckets",new Map)}add(n,e,o={}){const i=n.clone();e.map||i.deleteAttribute("uv"),_c.set(o.rx??0,o.ry??0,o.rz??0),xc.setFromEuler(_c),bc.set(o.x??0,o.y??0,o.z??0),Mc.set(o.sx??1,o.sy??1,o.sz??1),i.applyMatrix4(Qg.compose(bc,xc,Mc));const s=i.index?i:li(i,1e-4),a=this.buckets.get(e)??[];a.push(s),this.buckets.set(e,a)}addMatrix(n,e,o){const i=n.clone();e.map||i.deleteAttribute("uv"),i.applyMatrix4(o);const s=i.index?i:li(i,1e-4),a=this.buckets.get(e)??[];a.push(s),this.buckets.set(e,a)}build(n,e="detail",o={}){const i=[];let s=0;for(const[a,r]of this.buckets){const c=No(r,!1);if(!c)continue;c.computeBoundingSphere();const l=new G(c,a);l.name=`${e}-${s++}`,l.castShadow=!0,l.receiveShadow=!0,Object.assign(l.userData,o),n.add(l),i.push(l)}return this.buckets.clear(),i}}function Jg(t){var i;t.updateMatrixWorld(!0);const n=new ot().copy(t.matrixWorld).invert(),e=new Map,o=[];t.traverse(s=>{s.isMesh&&o.push(s)});for(const s of o){const a=s.geometry.clone();a.deleteAttribute("uv"),a.applyMatrix4(new ot().multiplyMatrices(n,s.matrixWorld));const r=a.index?a:li(a,1e-4),c=e.get(s.material)??[];c.push(r),e.set(s.material,c)}for(const s of o)(i=s.parent)==null||i.remove(s);for(const s of[...t.children])s.type==="Group"&&t.remove(s);for(const[s,a]of e){const r=No(a,!1);if(!r)continue;const c=new G(r,s);c.castShadow=!0,c.receiveShadow=!0,c.userData.isLandscapeStage=!0,t.add(c)}}function fs(t){let n=t>>>0;return()=>{n=n+1831565813>>>0;let e=n;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Fn(){const t=(e,o,i=.02,s={})=>{const a=new ge({color:e,roughness:o,metalness:i,...s});return a.fog=!1,a},n={stone:t(12170150,.9),stoneDark:t(9078397,.92),stoneWarm:t(13221286,.9),paveA:t(10132116,.95),paveB:t(8751752,.95),slate:t(4870744,.86,.06),wood:t(9071178,.82,.02),woodDark:t(5915440,.85,.02),brass:t(11962940,.36,.8),steel:t(9345444,.4,.8),copper:t(5216908,.52,.55),leaf:t(4157253,.95),leafLight:t(6263120,.95),soil:t(4864812,1),lampGlass:t(16773320,.3,0,{emissive:16761178,emissiveIntensity:.9}),paper:t(15524815,.95),darkSteel:t(3093819,.5,.7),rock:t(8093056,.95),terracottaRoof:t(11887946,.82),glass:(()=>{const e=new vn({color:7315376,roughness:.04,metalness:0,transparent:!0,opacity:.34,clearcoat:1,envMapIntensity:1.6,depthWrite:!1});return e.fog=!1,e})()};return Eo(n.stone,"masonry"),Eo(n.stoneDark,"masonry"),Eo(n.stoneWarm,"masonry"),Eo(n.paveA,"paving"),Eo(n.paveB,"paving"),Eo(n.wood,"wood"),Eo(n.woodDark,"wood"),Eo(n.terracottaRoof,"tiles"),Eo(n.slate,"tiles"),n}class e3 extends G{constructor(n,e,o=!1,i=!1,s=1e4){const a=new sn;super(a,e),this.isMarchingCubes=!0;const r=this,c=new Float32Array(36),l=new Float32Array(36),f=new Float32Array(36);this.enableUvs=o,this.enableColors=i,this.init=function(x){this.resolution=x,this.isolation=80,this.size=x,this.size2=this.size*this.size,this.size3=this.size2*this.size,this.halfsize=this.size/2,this.delta=2/this.size,this.yd=this.size,this.zd=this.size2,this.field=new Float32Array(this.size3),this.normal_cache=new Float32Array(this.size3*3),this.palette=new Float32Array(this.size3*3),this.count=0;const M=s*3;this.positionArray=new Float32Array(M*3);const S=new xt(this.positionArray,3);S.setUsage(ms),a.setAttribute("position",S),this.normalArray=new Float32Array(M*3);const T=new xt(this.normalArray,3);if(T.setUsage(ms),a.setAttribute("normal",T),this.enableUvs){this.uvArray=new Float32Array(M*2);const w=new xt(this.uvArray,2);w.setUsage(ms),a.setAttribute("uv",w)}if(this.enableColors){this.colorArray=new Float32Array(M*3);const w=new xt(this.colorArray,3);w.setUsage(ms),a.setAttribute("color",w)}a.boundingSphere=new ul(new Y,1)};function d(x,M,S){return x+(M-x)*S}function u(x,M,S,T,w,y,v,E,b,A){const R=(S-v)/(E-v),L=r.normal_cache;c[M+0]=T+R*r.delta,c[M+1]=w,c[M+2]=y,l[M+0]=d(L[x+0],L[x+3],R),l[M+1]=d(L[x+1],L[x+4],R),l[M+2]=d(L[x+2],L[x+5],R),f[M+0]=d(r.palette[b*3+0],r.palette[A*3+0],R),f[M+1]=d(r.palette[b*3+1],r.palette[A*3+1],R),f[M+2]=d(r.palette[b*3+2],r.palette[A*3+2],R)}function h(x,M,S,T,w,y,v,E,b,A){const R=(S-v)/(E-v),L=r.normal_cache;c[M+0]=T,c[M+1]=w+R*r.delta,c[M+2]=y;const I=x+r.yd*3;l[M+0]=d(L[x+0],L[I+0],R),l[M+1]=d(L[x+1],L[I+1],R),l[M+2]=d(L[x+2],L[I+2],R),f[M+0]=d(r.palette[b*3+0],r.palette[A*3+0],R),f[M+1]=d(r.palette[b*3+1],r.palette[A*3+1],R),f[M+2]=d(r.palette[b*3+2],r.palette[A*3+2],R)}function m(x,M,S,T,w,y,v,E,b,A){const R=(S-v)/(E-v),L=r.normal_cache;c[M+0]=T,c[M+1]=w,c[M+2]=y+R*r.delta;const I=x+r.zd*3;l[M+0]=d(L[x+0],L[I+0],R),l[M+1]=d(L[x+1],L[I+1],R),l[M+2]=d(L[x+2],L[I+2],R),f[M+0]=d(r.palette[b*3+0],r.palette[A*3+0],R),f[M+1]=d(r.palette[b*3+1],r.palette[A*3+1],R),f[M+2]=d(r.palette[b*3+2],r.palette[A*3+2],R)}function _(x){const M=x*3;r.normal_cache[M]===0&&(r.normal_cache[M+0]=r.field[x-1]-r.field[x+1],r.normal_cache[M+1]=r.field[x-r.yd]-r.field[x+r.yd],r.normal_cache[M+2]=r.field[x-r.zd]-r.field[x+r.zd])}function p(x,M,S,T,w){const y=T+1,v=T+r.yd,E=T+r.zd,b=y+r.yd,A=y+r.zd,R=T+r.yd+r.zd,L=y+r.yd+r.zd;let I=0;const U=r.field[T],N=r.field[y],O=r.field[v],V=r.field[b],X=r.field[E],J=r.field[A],W=r.field[R],k=r.field[L];U<w&&(I|=1),N<w&&(I|=2),O<w&&(I|=8),V<w&&(I|=4),X<w&&(I|=16),J<w&&(I|=32),W<w&&(I|=128),k<w&&(I|=64);const ee=t3[I];if(ee===0)return 0;const ae=r.delta,ue=x+ae,z=M+ae,j=S+ae;ee&1&&(_(T),_(y),u(T*3,0,w,x,M,S,U,N,T,y)),ee&2&&(_(y),_(b),h(y*3,3,w,ue,M,S,N,V,y,b)),ee&4&&(_(v),_(b),u(v*3,6,w,x,z,S,O,V,v,b)),ee&8&&(_(T),_(v),h(T*3,9,w,x,M,S,U,O,T,v)),ee&16&&(_(E),_(A),u(E*3,12,w,x,M,j,X,J,E,A)),ee&32&&(_(A),_(L),h(A*3,15,w,ue,M,j,J,k,A,L)),ee&64&&(_(R),_(L),u(R*3,18,w,x,z,j,W,k,R,L)),ee&128&&(_(E),_(R),h(E*3,21,w,x,M,j,X,W,E,R)),ee&256&&(_(T),_(E),m(T*3,24,w,x,M,S,U,X,T,E)),ee&512&&(_(y),_(A),m(y*3,27,w,ue,M,S,N,J,y,A)),ee&1024&&(_(b),_(L),m(b*3,30,w,ue,z,S,V,k,b,L)),ee&2048&&(_(v),_(R),m(v*3,33,w,x,z,S,O,W,v,R)),I<<=4;let Z,de,be,Te=0,Ze=0;for(;ys[I+Ze]!=-1;)Z=I+Ze,de=Z+1,be=Z+2,g(c,l,f,3*ys[Z],3*ys[de],3*ys[be]),Ze+=3,Te++;return Te}function g(x,M,S,T,w,y){const v=r.count*3;if(r.positionArray[v+0]=x[T],r.positionArray[v+1]=x[T+1],r.positionArray[v+2]=x[T+2],r.positionArray[v+3]=x[w],r.positionArray[v+4]=x[w+1],r.positionArray[v+5]=x[w+2],r.positionArray[v+6]=x[y],r.positionArray[v+7]=x[y+1],r.positionArray[v+8]=x[y+2],r.material.flatShading===!0){const E=(M[T+0]+M[w+0]+M[y+0])/3,b=(M[T+1]+M[w+1]+M[y+1])/3,A=(M[T+2]+M[w+2]+M[y+2])/3;r.normalArray[v+0]=E,r.normalArray[v+1]=b,r.normalArray[v+2]=A,r.normalArray[v+3]=E,r.normalArray[v+4]=b,r.normalArray[v+5]=A,r.normalArray[v+6]=E,r.normalArray[v+7]=b,r.normalArray[v+8]=A}else r.normalArray[v+0]=M[T+0],r.normalArray[v+1]=M[T+1],r.normalArray[v+2]=M[T+2],r.normalArray[v+3]=M[w+0],r.normalArray[v+4]=M[w+1],r.normalArray[v+5]=M[w+2],r.normalArray[v+6]=M[y+0],r.normalArray[v+7]=M[y+1],r.normalArray[v+8]=M[y+2];if(r.enableUvs){const E=r.count*2;r.uvArray[E+0]=x[T+0],r.uvArray[E+1]=x[T+2],r.uvArray[E+2]=x[w+0],r.uvArray[E+3]=x[w+2],r.uvArray[E+4]=x[y+0],r.uvArray[E+5]=x[y+2]}r.enableColors&&(r.colorArray[v+0]=S[T+0],r.colorArray[v+1]=S[T+1],r.colorArray[v+2]=S[T+2],r.colorArray[v+3]=S[w+0],r.colorArray[v+4]=S[w+1],r.colorArray[v+5]=S[w+2],r.colorArray[v+6]=S[y+0],r.colorArray[v+7]=S[y+1],r.colorArray[v+8]=S[y+2]),r.count+=3}this.addBall=function(x,M,S,T,w,y){const v=Math.sign(T);T=Math.abs(T);const E=y!=null;let b=new te(x,M,S);if(E)try{b=y instanceof te?y:Array.isArray(y)?new te(Math.min(Math.abs(y[0]),1),Math.min(Math.abs(y[1]),1),Math.min(Math.abs(y[2]),1)):new te(y)}catch{b=new te(x,M,S)}const A=this.size*Math.sqrt(T/w),R=S*this.size,L=M*this.size,I=x*this.size;let U=Math.floor(R-A);U<1&&(U=1);let N=Math.floor(R+A);N>this.size-1&&(N=this.size-1);let O=Math.floor(L-A);O<1&&(O=1);let V=Math.floor(L+A);V>this.size-1&&(V=this.size-1);let X=Math.floor(I-A);X<1&&(X=1);let J=Math.floor(I+A);J>this.size-1&&(J=this.size-1);let W,k,ee,ae,ue,z,j,Z,de,be,Te;for(ee=U;ee<N;ee++)for(ue=this.size2*ee,Z=ee/this.size-S,de=Z*Z,k=O;k<V;k++)for(ae=ue+this.size*k,j=k/this.size-M,be=j*j,W=X;W<J;W++)if(z=W/this.size-x,Te=T/(1e-6+z*z+be+de)-w,Te>0){this.field[ae+W]+=Te*v;const Ze=Math.sqrt((W-I)*(W-I)+(k-L)*(k-L)+(ee-R)*(ee-R))/A,Xe=1-Ze*Ze*Ze*(Ze*(Ze*6-15)+10);this.palette[(ae+W)*3+0]+=b.r*Xe,this.palette[(ae+W)*3+1]+=b.g*Xe,this.palette[(ae+W)*3+2]+=b.b*Xe}},this.addPlaneX=function(x,M){const S=this.size,T=this.yd,w=this.zd,y=this.field;let v,E,b,A,R,L,I,U=S*Math.sqrt(x/M);for(U>S&&(U=S),v=0;v<U;v++)if(L=v/S,A=L*L,R=x/(1e-4+A)-M,R>0)for(E=0;E<S;E++)for(I=v+E*T,b=0;b<S;b++)y[w*b+I]+=R},this.addPlaneY=function(x,M){const S=this.size,T=this.yd,w=this.zd,y=this.field;let v,E,b,A,R,L,I,U,N=S*Math.sqrt(x/M);for(N>S&&(N=S),E=0;E<N;E++)if(L=E/S,A=L*L,R=x/(1e-4+A)-M,R>0)for(I=E*T,v=0;v<S;v++)for(U=I+v,b=0;b<S;b++)y[w*b+U]+=R},this.addPlaneZ=function(x,M){const S=this.size,T=this.yd,w=this.zd,y=this.field;let v,E,b,A,R,L,I,U,N=S*Math.sqrt(x/M);for(N>S&&(N=S),b=0;b<N;b++)if(L=b/S,A=L*L,R=x/(1e-4+A)-M,R>0)for(I=w*b,E=0;E<S;E++)for(U=I+E*T,v=0;v<S;v++)y[U+v]+=R},this.setCell=function(x,M,S,T){const w=this.size2*S+this.size*M+x;this.field[w]=T},this.getCell=function(x,M,S){const T=this.size2*S+this.size*M+x;return this.field[T]},this.blur=function(x=1){const M=this.field,S=M.slice(),T=this.size,w=this.size2;for(let y=0;y<T;y++)for(let v=0;v<T;v++)for(let E=0;E<T;E++){const b=w*E+T*v+y;let A=S[b],R=1;for(let L=-1;L<=1;L+=2){const I=L+y;if(!(I<0||I>=T))for(let U=-1;U<=1;U+=2){const N=U+v;if(!(N<0||N>=T))for(let O=-1;O<=1;O+=2){const V=O+E;if(V<0||V>=T)continue;const X=w*V+T*N+I,J=S[X];R++,A+=x*(J-A)/R}}}M[b]=A}},this.reset=function(){for(let x=0;x<this.size3;x++)this.normal_cache[x*3]=0,this.field[x]=0,this.palette[x*3]=this.palette[x*3+1]=this.palette[x*3+2]=0},this.update=function(){this.count=0;const x=this.size-2;for(let M=1;M<x;M++){const S=this.size2*M,T=(M-this.halfsize)/this.halfsize;for(let w=1;w<x;w++){const y=S+this.size*w,v=(w-this.halfsize)/this.halfsize;for(let E=1;E<x;E++){const b=(E-this.halfsize)/this.halfsize,A=y+E;p(b,v,T,A,this.isolation)}}}this.geometry.setDrawRange(0,this.count),a.getAttribute("position").needsUpdate=!0,a.getAttribute("normal").needsUpdate=!0,this.enableUvs&&(a.getAttribute("uv").needsUpdate=!0),this.enableColors&&(a.getAttribute("color").needsUpdate=!0),this.count/3>s&&console.warn("THREE.MarchingCubes: Geometry buffers too small for rendering. Please create an instance with a higher poly count.")},this.init(n)}}const t3=new Int32Array([0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0]),ys=new Int32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1,3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1,3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1,9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1,9,2,10,9,0,2,8,4,7,-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1,8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1,9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1,4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1,3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1,1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1,4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1,4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1,5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1,2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1,9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1,0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1,2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1,10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1,4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1,5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1,5,4,8,5,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1,1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1,10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1,8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1,2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1,2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1,11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,-1,9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1,5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1,11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1,11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1,1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1,9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1,5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1,2,3,11,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1,5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1,6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1,0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1,3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1,6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1,1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1,10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1,6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,-1,-1,-1,1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1,8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1,7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1,3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1,0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1,9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1,8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1,5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1,0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1,6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1,10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1,10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1,1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1,0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1,0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1,3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1,6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1,9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1,8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1,3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1,6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1,0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1,10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1,10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1,1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1,2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1,7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1,7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1,2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1,1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1,11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1,8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1,0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1,10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1,2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1,6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1,7,2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1,2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1,1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1,10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1,0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1,7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1,6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1,8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1,9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1,6,8,4,6,11,8,2,10,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1,4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1,10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1,8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1,1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1,8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1,10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1,4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1,10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,5,11,7,6,-1,-1,-1,-1,-1,-1,-1,5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1,9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1,6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1,7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1,3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1,7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1,3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1,6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1,9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1,1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1,4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,-1,7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1,6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1,3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1,0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1,6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1,0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1,11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1,6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1,5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1,9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1,1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1,1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1,10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1,0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1,5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1,10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1,11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1,9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1,7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1,2,5,10,2,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1,9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1,9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1,1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1,9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1,9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1,0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1,10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1,2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1,0,4,11,0,11,3,4,5,11,2,11,1,5,1,11,-1,0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1,9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1,5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1,3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1,5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1,8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1,0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1,9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1,1,10,11,1,11,4,1,4,0,7,4,11,-1,-1,-1,-1,3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1,4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1,9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1,11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1,2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1,9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1,3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1,1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1,4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1,0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1,3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1,0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1,9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1,1,10,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]),Ao=(t,n,e,o,i,s,a)=>Math.sqrt((t-o)*(t-o)+(n-i)*(n-i)+(e-s)*(e-s))-a;function Ot(t,n,e,o,i,s,a,r,c){const l=t-o,f=n-i,d=e-s,u=Math.sqrt((l/a)**2+(f/r)**2+(d/c)**2),h=Math.sqrt((l/(a*a))**2+(f/(r*r))**2+(d/(c*c))**2);return h<1e-9?-Math.min(a,r,c):u*(u-1)/h}function Xt(t,n,e,o,i,s,a,r,c,l,f){const d=t-o,u=n-i,h=e-s,m=a-o,_=r-i,p=c-s,g=Math.min(1,Math.max(0,(d*m+u*_+h*p)/(m*m+_*_+p*p))),x=d-m*g,M=u-_*g,S=h-p*g;return Math.sqrt(x*x+M*M+S*S)-(l+(f-l)*g)}function is(t,n,e,o,i,s,a,r){const c=Math.sqrt((t-o)*(t-o)+(e-s)*(e-s))-a,l=n-i;return Math.sqrt(c*c+l*l)-r}function io(t,n,e,o,i,s,a,r,c,l=0){const f=Math.abs(t-o)-a+l,d=Math.abs(n-i)-r+l,u=Math.abs(e-s)-c+l,h=Math.max(f,0),m=Math.max(d,0),_=Math.max(u,0);return Math.sqrt(h*h+m*m+_*_)+Math.min(Math.max(f,d,u),0)-l}function Ve(t,n,e){const o=Math.max(e-Math.abs(t-n),0)/e;return Math.min(t,n)-o*o*e*.25}function Xn(t,n,e){const o=Math.max(e-Math.abs(t-n),0)/e;return Math.max(t,n)+o*o*e*.25}function jn(t,n,e,o,i={}){const s=new e3(o,new wt,!1,!1,i.maxTris??9e4);s.isolation=0;const a=s.field,r=o/2,c=i.boundR!==void 0?i.boundR*i.boundR:1/0;let l=0;for(let m=0;m<o;m++){const _=n[2]+(m-r)/r*e;for(let p=0;p<o;p++){const g=n[1]+(p-r)/r*e;for(let x=0;x<o;x++){const M=n[0]+(x-r)/r*e,S=M-n[0],T=g-n[1],w=_-n[2];S*S+T*T+w*w>c?a[l++]=-1:a[l++]=-t(M,g,_)/e}}}s.update();const f=s.count,d=new Float32Array(f*3),u=new Float32Array(f*3);for(let m=0;m<f*3;m+=3){d[m]=n[0]+s.positionArray[m]*e,d[m+1]=n[1]+s.positionArray[m+1]*e,d[m+2]=n[2]+s.positionArray[m+2]*e;const _=s.normalArray[m],p=s.normalArray[m+1],g=s.normalArray[m+2],x=Math.sqrt(_*_+p*p+g*g)||1;u[m]=_/x,u[m+1]=p/x,u[m+2]=g/x}s.geometry.dispose();const h=new sn;return h.setAttribute("position",new xt(d,3)),h.setAttribute("normal",new xt(u,3)),h}function Us(t){const n=t.attributes.position.array,e=t.attributes.normal.array,o=n.length/3,i=new Float32Array(n.length),s=new Float32Array(e.length);for(let r=0;r<o;r+=3)for(let c=0;c<3;c++){const l=(r+c)*3,f=(r+(c===1?2:c===2?1:0))*3;i[f]=-n[l],i[f+1]=n[l+1],i[f+2]=n[l+2],s[f]=-e[l],s[f+1]=e[l+1],s[f+2]=e[l+2]}const a=new sn;return a.setAttribute("position",new xt(i,3)),a.setAttribute("normal",new xt(s,3)),a}function n3(t){const n=t.attributes.position,e=new Float32Array(n.count*3),o=(i,s)=>Math.max(0,1-i/s)**1.5;for(let i=0;i<n.count;i++){const s=Math.abs(n.getX(i)),a=n.getY(i),r=n.getZ(i);let c=1,l=1,f=1;const d=(u,h,m,_)=>{c+=(h-c)*u,l+=(m-l)*u,f+=(_-f)*u};if(r>.06){const u=o(Math.sqrt((s/.024)**2+((a-.1205)/.0105)**2),1);d(u*.85,.96,.66,.64),d(o(Math.hypot(s-.047,a-.158,r-.065),.034)*.45,1,.84,.82),d(o(Math.hypot(s-.034,(a-.2)*1.25,r-.075),.03)*.5,.82,.68,.66),d(o(Math.hypot(s-.034,a-.18,r-.075),.014)*.25,.9,.78,.8),d(o(Math.hypot(s-.0066,a-.149,r-.099),.009)*.9,.5,.36,.34),d(o(Math.hypot(s,a-.158,r-.108),.012)*.3,1,.82,.8)}e[i*3]=c,e[i*3+1]=l,e[i*3+2]=f}return t.setAttribute("color",new xt(e,3)),t}function Xl(t=1){return n3(jn((e,o,i)=>{const s=Math.abs(e);let a=Ot(s,o,i,0,.217,-.018,.074,.09,.098);return a=Ve(a,Ot(s,o,i,0,.183,.02,.06,.082,.068),.045),a=Ve(a,Xt(s,o,i,.042,.146,-.014,0,.098,.059,.023,.02),.03),a=Ve(a,Ao(s,o,i,0,.094,.06,.0215),.02),a=Ve(a,Ao(s,o,i,.048,.176,.046,.0225),.03),a=Ve(a,Ot(s,o,i,.04,.155,.048,.017,.02,.014),.03),a=Ve(a,Xt(s,o,i,0,.212,.078,.046,.207,.069,.0115,.0105),.02),a=Ve(a,Xt(s,o,i,0,.206,.082,0,.166,.096,.0075,.0095),.012),a=Ve(a,Ao(s,o,i,0,.159,.097,.0108),.01),a=Ve(a,Ao(s,o,i,.0105,.155,.092,.0075),.008),a=Ve(a,Xt(s,o,i,0,.12,-.016,0,0,-.004,.041,.05),.045),a=Ve(a,Ao(s,o,i,0,.07,.04,.009),.02),a=Ve(a,Ot(s,o,i,.0775,.191,-.012,.0085,.034,.022),.012),a=Ve(a,Xt(s,o,i,0,.1292,.0792,.019,.1258,.0725,.0062,.0055),.007),a=Ve(a,Ao(s,o,i,.0042,.1296,.0805,.0046),.004),a=Ve(a,Xt(s,o,i,0,.1132,.0765,.016,.1152,.0705,.0076,.0064),.007),a=Xn(a,-Ot(s,o,i,.034,.2,.083,.021,.016,.02),.012),a=Xn(a,-Ao(s,o,i,.0066,.149,.097,.0042),.003),a=Xn(a,-Ot(s,o,i,0,.1212,.082,.021,.0013,.013),.002),a=Xn(a,-Xt(s,o,i,.003,.14,.098,.003,.132,.091,.0016,.0016),.002),a=Xn(a,-Xt(s,o,i,.022,.15,.078,.028,.122,.07,.0022,.0018),.004),a=Ve(a,Ao(s,o,i,.05,.14,-.012,.017),.03),a=Ve(a,Xt(s,o,i,.044,.125,-.032,.02,0,.016,.017,.016),.03),a=Xn(a,-Ot(s,o,i,.085,.19,-.008,.008,.02,.011),.006),a=Ve(a,Ot(s,o,i,.034,.2135,.0745,.0165,.0065,.0115),.006),a=Ve(a,Ot(s,o,i,.034,.1865,.0745,.0155,.004,.01),.005),a},[0,.1,.02],.16,Math.max(24,Math.round(84*t)),{boundR:.2}))}function ql(t=1){const n=(o,i,s,a,r,c,l)=>{let f=1e9,d=0,u=-.082,h=a,m=0;const _=[r*.5,r*.32,r*.24],p=[c,c*.88,c*.78];for(let g=0;g<3;g++){m+=l*(g===0?.55:1);const x=d-Math.sin(m)*_[g],M=u-Math.cos(m)*_[g];f=Math.min(f,Xt(o,i,s,d,u,h,x,M,h,p[g],p[Math.min(g+1,2)]*.96)),d=x,u=M}return f};return jn((o,i,s)=>{let a=io(o,i,s,0,-.044,0,.014,.036,.036,.011);a=Ve(a,Xt(o,i,s,0,.012,0,0,-.02,0,.021,.026),.02),a=Ve(a,Ot(o,i,s,-.004,-.032,.03,.014,.024,.013),.015);const r=.52;return a=Ve(a,n(o,i,s,.027,.074,.0088,r),.006),a=Ve(a,n(o,i,s,.009,.082,.0091,r+.03),.006),a=Ve(a,n(o,i,s,-.009,.076,.0086,r+.06),.006),a=Ve(a,n(o,i,s,-.026,.06,.0078,r+.1),.006),a=Ve(a,Xt(o,i,s,-.004,-.04,.034,-.012,-.066,.046,.0108,.0092),.01),a=Ve(a,Xt(o,i,s,-.012,-.066,.046,-.02,-.086,.05,.0092,.0078),.008),a},[-.02,-.07,.005],.1,Math.max(24,Math.round(64*t)),{boundR:.13})}function Yl(t,n){return t===1?n:Us(n)}function vr(t,n,e){const o=Math.abs(t);let i=Ot(o,n,e,0,1.34,0,.156,.172,.1);i=Ve(i,Ot(o,n,e,.065,1.31,.026,.08,.065,.075),.05),i=Ve(i,Ot(o,n,e,0,1.14,0,.14,.17,.092),.06),i=Ve(i,Ot(o,n,e,0,.97,-.004,.155,.13,.108),.06),i=Ve(i,Xt(o,n,e,.03,1.518,-.012,.188,1.452,-.002,.064,.054),.085),i=Ve(i,Ot(o,n,e,.2,1.445,0,.06,.062,.066),.05),i=Ve(i,Xt(o,n,e,0,1.47,-.02,0,1.54,-.02,.095,.058),.07),i=Ve(i,is(o,n,e,0,1.525,0,.074,.026),.02),i=Ve(i,io(o,n,e,.085,1.27,.094,.04,.03,.014,.006),.006),i=Xn(i,.88-n,.03),i=Xn(i,-Xt(o,n,e,0,1.43,-.006,0,1.62,-.006,.058,.058),.014);const s=Math.atan2(e,t);return i+=(Math.sin(s*7+n*13)*.5+Math.sin(s*12-n*8+1.7)*.3)*(n<1.15?.0055:.0028),i}function Kl(t=1){return jn(vr,[0,1.22,-.005],.5,Math.max(24,Math.round(92*t)),{boundR:.55,maxTris:16e4})}function o3(){const t=(e,o,i)=>Math.abs(vr(e,o,i)-.0075)-.0075;return jn((e,o,i)=>{const s=Math.abs(e),a=io(s,o,i,.093,1.34,-.01,.022,.2,.24,.004),r=io(s,o,i,.05,1.335,.05,.05,.009,.14,.003),c=Math.abs(o-1.045)-.017,l=Math.min(a,r,c);return Math.max(t(e,o,i),l)},[0,1.25,-.005],.4,100,{boundR:.46,maxTris:12e4})}function i3(){const t=(e,o,i)=>Math.abs(vr(e,o,i)-.006)-.006;return jn((e,o,i)=>Math.max(t(e,o,i),io(e,o,i,0,1.2,.12,.0055,.265,.1,.002)),[0,1.2,.08],.3,80,{boundR:.34,maxTris:4e4})}function $l(t=1){return jn((e,o,i)=>{let s=Xt(e,o,i,0,0,0,0,-.28,0,.056,.046);s=Ve(s,Ao(e,o,i,0,.005,0,.062),.03),s=Ve(s,Ot(e,o,i,.004,-.045,0,.058,.08,.06),.04),s=Ve(s,Ot(e,o,i,0,-.13,.011,.048,.09,.046),.03);const a=Math.atan2(i,e);return s+=(Math.sin(a*6+o*17)*.5+Math.sin(a*3-o*9)*.3)*.0028,s},[0,-.14,0],.2,Math.max(24,Math.round(60*t)),{boundR:.26})}function jl(t=1){return jn((e,o,i)=>{let s=Xt(e,o,i,0,0,0,0,-.255,0,.046,.039);s=Ve(s,Ot(e,o,i,0,-.07,.004,.05,.095,.046),.03),s=Ve(s,is(e,o,i,0,-.246,0,.039,.0092),.01);const a=Math.atan2(i,e);return s+=(Math.sin(a*5+o*21)*.5+Math.sin(a*9-o*11)*.3)*.0026*(o>-.2?1:.4),s},[0,-.13,0],.19,Math.max(24,Math.round(56*t)),{boundR:.24})}function Zl(t=1){return jn((e,o,i)=>{let s=Xt(e,o,i,0,0,0,0,-.42,0,.108,.074);s=Ve(s,Ot(e,o,i,0,-.16,.02,.1,.17,.095),.05),s=Ve(s,Ot(e,o,i,0,-.1,-.035,.092,.12,.085),.05);const a=Math.atan2(i,e);return s+=(Math.sin(a*6+o*15)*.5+Math.sin(a*3-o*8+2.1)*.35)*.0034,s+=Math.max(0,Math.sin(o*70+1.1))*.0018*(o<-.3?1:0),s},[0,-.2,0],.28,Math.max(24,Math.round(60*t)),{boundR:.34})}function Ql(t=1){return jn((e,o,i)=>{let s=Xt(e,o,i,0,0,0,0,-.26,0,.074,.058);s=Ve(s,Ot(e,o,i,0,-.1,-.03,.06,.12,.06),.04),s=Ve(s,is(e,o,i,0,-.232,0,.063,.014),.012),s=Ve(s,is(e,o,i,0,-.215,0,.066,.012),.01);const a=Math.atan2(i,e);return s+=(Math.sin(a*5+o*19)*.5+Math.sin(a*8-o*9)*.3)*.0028,s},[0,-.13,0],.2,Math.max(24,Math.round(56*t)),{boundR:.26})}function Jl(t=1){return jn((e,o,i)=>{const s=Math.abs(e);let a=Xt(s,o,i,0,-.17,0,0,-.39,.012,.06,.058);a=Ve(a,Ot(s,o,i,0,-.432,-.04,.046,.042,.048),.03),a=Ve(a,Ot(s,o,i,0,-.436,.03,.05,.04,.085),.03),a=Ve(a,Ot(s,o,i,0,-.446,.12,.051,.034,.062),.03),a=Ve(a,is(s,o,i,0,-.285,0,.059,.011),.01);const r=io(s,o-Math.max(0,i-.11)*.18,i,0,-.468,.062,.06,.02,.148,.014);return a=Ve(a,r,.008),a+=Math.max(0,Math.sin(i*120))*.0012*(o<-.482?1:0),a},[0,-.36,.04],.21,Math.max(24,Math.round(80*t)),{boundR:.28})}function ja(t=1,n="short"){const e=n==="long",o=f=>Math.min(1,Math.max(0,f)),i=[[-.045,.262,.066,-.052,.236,.086],[-.025,.264,.07,-.032,.232,.091],[-.004,.266,.072,.012,.234,.093],[.02,.265,.07,.038,.236,.09],[.042,.262,.066,.058,.24,.083]],r=jn((f,d,u)=>{const h=Math.abs(f);let m=Ot(h,d,u,0,.221,-.018,.0855,.099,.106);m=Ve(m,Ot(h,d,u,0,.205,-.055,.078,.088,.07),.02),e&&(m=Ve(m,Xt(h,d,u,0,.17,-.078,0,-.04,-.09,.072,.06),.05));const _=.262-.05*(h/.08)*(h/.08),p=o((u+.01)/.03);m=Xn(m,(_-d)*p-(1-p)*.5,.014),m=Xn(m,-Ot(h,d,u,.079,.191,-.012,.022,.044,.034),.01),m=Xn(m,(e?-.07:.158)-d,.014);for(const x of i)m=Ve(m,Xt(f,d,u,x[0],x[1],x[2],x[3],x[4],x[5],.0075,.0035),.006);const g=Math.atan2(f,u);return m+=.0012*Math.sin(g*80+Math.sin(d*45)*2.2),m},e?[0,.1,-.04]:[0,.19,-.015],e?.24:.15,Math.max(24,Math.round(80*t)),{boundR:e?.3:.2}),c=r.attributes.position,l=new Float32Array(c.count*3);for(let f=0;f<c.count;f++){const d=c.getX(f),u=c.getY(f),h=c.getZ(f),m=Math.atan2(d,h),_=Math.sin(m*70+Math.sin(u*45)*2.2)*.5+.5,p=Math.sin(m*9+u*22)*.5+.5,g=.55+_*.45+p*.25+Math.max(0,u-.28)*2.2;l[f*3]=.075*g,l[f*3+1]=.05*g,l[f*3+2]=.034*g}return r.setAttribute("color",new xt(l,3)),r}function s3(t=1){return jn((e,o,i)=>{const s=Math.abs(e);let a=io(s,o,i,0,1.3,-.165,.122,.182,.072,.05);return a=Ve(a,io(s,o,i,0,1.46,-.168,.116,.036,.08,.03),.012),a=Ve(a,io(s,o,i,0,1.425,-.092,.118,.012,.012,.006),.008),a=Ve(a,io(s,o,i,0,1.19,-.235,.095,.07,.024,.02),.012),a=Ve(a,Xt(s,o,i,.14,1.14,-.165,.14,1.27,-.165,.03,.028),.01),a=Ve(a,Xt(s,o,i,-.11,1.1,-.18,.11,1.1,-.18,.034,.034),.01),a+=.0016*Math.exp(-(((s-.07)/.003)**2))*(o>1.1?1:0),a=Xn(a,-io(s,o,i,0,1.2,-.285,.003,.07,.01,.001),.001),a},[0,1.25,-.17],.3,Math.max(24,Math.round(88*t)),{boundR:.4,maxTris:9e4})}const a3=`
varying vec3 vAvLoc;
varying mat3 vAvNM;
float avH(vec3 p) { p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float avN(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(avH(i), avH(i + vec3(1, 0, 0)), f.x), mix(avH(i + vec3(0, 1, 0)), avH(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(avH(i + vec3(0, 0, 1)), avH(i + vec3(1, 0, 1)), f.x), mix(avH(i + vec3(0, 1, 1)), avH(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
`,r3={fabric:{fine:260,mid:48,weave:1,bump:4e-4,tone:.06,rough:.1},leather:{fine:210,mid:34,weave:0,bump:.0012,tone:.1,rough:.16},skin:{fine:330,mid:70,weave:0,bump:22e-5,tone:.025,rough:.06},metal:{fine:420,mid:22,weave:0,bump:6e-4,tone:.1,rough:.12}};function Zn(t,n){const e=r3[n];return t.onBeforeCompile=o=>{o.vertexShader=`varying vec3 vAvLoc;
varying mat3 vAvNM;
`+o.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vAvLoc = position;
 vAvNM = normalMatrix;`);const i=n==="metal"?`avN(vec3(p.x * ${e.fine.toFixed(1)}, p.y * 6.0, p.z * ${e.fine.toFixed(1)})) * 0.5 + avN(p * ${e.mid.toFixed(1)}) * 0.5`:`avN(p * ${e.mid.toFixed(1)}) * 0.55 + avN(p * ${e.fine.toFixed(1)}) * 0.45${e.weave?" + (sin(p.x * 520.0) * sin(p.y * 520.0) + sin(p.y * 520.0 + 1.0) * sin(p.z * 520.0)) * 0.12":""}`;o.fragmentShader=a3+`float avHeight(vec3 p) { return ${i}; }
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
         #include <opaque_fragment>`)},t.customProgramCacheKey=()=>`avatar-${n}-${t.vertexColors?"vc":"plain"}`,t.needsUpdate=!0,t}function c3(){const t=(e,o,i=.02,s={})=>new ge({color:e,roughness:o,metalness:i,...s});return{jacket:Zn(t(4147772,.84,0,{side:$e}),"fabric"),inner:Zn(t(15526626,.9,0,{side:$e}),"fabric"),trousers:Zn(t(3425628,.88),"fabric"),skin:Zn(t(14858392,.55,0,{emissive:3806728,emissiveIntensity:.05}),"skin"),skinFace:Zn(t(14858392,.5,0,{emissive:3806728,emissiveIntensity:.05,vertexColors:!0}),"skin"),leather:Zn(t(7030320,.62,.04),"leather"),leatherDark:Zn(t(4139549,.66,.04),"leather"),boot:Zn(t(7031344,.6,.05),"leather"),sole:t(1775637,.9),hair:new ge({color:16777215,vertexColors:!0,roughness:.42,metalness:.15,side:$e}),brow:t(3811356,.7),trim:t(13214282,.4,.75,{emissive:5913096,emissiveIntensity:.18}),scarf:Zn(t(10238510,.9,0,{side:$e}),"fabric"),brass:Zn(t(11962940,.34,.85),"metal"),armor:Object.assign(new vn({color:1845043,roughness:.38,metalness:.6,clearcoat:.7,clearcoatRoughness:.25}),{}),eyeWhite:new vn({color:15986410,roughness:.22,clearcoat:.9,clearcoatRoughness:.08}),lip:t(10113096,.46),tunicVc:Zn(t(16777215,.84,0,{vertexColors:!0,side:$e}),"fabric"),paper:t(16769696,.5,0,{emissive:16753978,emissiveIntensity:1,transparent:!0,opacity:.92})}}class us{constructor(){ne(this,"b",new Dn)}add(n,e,o={}){this.b.add(n,e,o)}box(n,e,o,i,s={},a=.01){this.b.add(new Do(e,o,i,2,Math.min(a,e/2.05,o/2.05,i/2.05)),n,s)}cyl(n,e,o,i,s={},a=16){this.b.add(new we(e,o,i,a,1),n,s)}ball(n,e,o={},i=14){this.b.add(new ye(e,i,Math.max(8,i-4)),n,o)}torus(n,e,o,i={},s=Math.PI*2,a=22){this.b.add(new me(e,o,8,a,s),n,i)}build(n,e){this.b.build(n,e,{})}}function Li(t,n,e){const o=new Ke;return o.position.set(t,n,e),o}function l3(){const n=document.createElement("canvas");n.width=n.height=256;const e=n.getContext("2d"),o=on(77);e.fillStyle="#2a1a10",e.fillRect(0,0,256,256);const i=256/2,s=e.createRadialGradient(i,i,256*.08,i,i,256*.5);s.addColorStop(0,"#5a3a1f"),s.addColorStop(.55,"#8a5a2c"),s.addColorStop(.88,"#3a2412"),s.addColorStop(1,"#150c06"),e.fillStyle=s,e.beginPath(),e.arc(i,i,256*.5,0,Math.PI*2),e.fill();for(let r=0;r<220;r++){const c=o()*Math.PI*2,l=256*(.1+o()*.08),f=256*(.28+o()*.2);e.strokeStyle=`rgba(${o()>.5?"190,140,80":"60,36,18"},${.12+o()*.25})`,e.lineWidth=1+o()*1.4,e.beginPath(),e.moveTo(i+Math.cos(c)*l,i+Math.sin(c)*l),e.lineTo(i+Math.cos(c+(o()-.5)*.12)*f,i+Math.sin(c+(o()-.5)*.12)*f),e.stroke()}e.fillStyle="#060403",e.beginPath(),e.arc(i,i,256*.115,0,Math.PI*2),e.fill();const a=new Wt(n);return a.colorSpace=yt,a}let Sc;function wc(t,n){const e=new G(new ye(.0128,22,16),t.eyeWhite);e.position.set(n*.034,.2,.0685),e.scale.set(1,.94,1),Sc??(Sc=l3());const o=new G(new ci(.0072,28),new ge({map:Sc,roughness:.28,metalness:0}));o.position.set(0,0,.0124);const i=new G(new ye(.0072,18,12,0,Math.PI*2,0,Math.PI*.5),new vn({color:16777215,roughness:.02,metalness:0,transparent:!0,opacity:.16,clearcoat:1,clearcoatRoughness:.02}));i.rotation.x=Math.PI/2,i.position.set(0,0,.0098);const s=(l,f)=>new ye(.0139,22,10,0,Math.PI*2,l,f-l),a=new G(s(0,Math.PI*.45),t.skin),r=new G(s(Math.PI*.86,Math.PI),t.skin),c=new G(new me(.0132,6e-4,4,18,Math.PI*.85),t.brow);return c.rotation.set(0,0,Math.PI*.075),c.position.set(0,0,0),c.scale.set(1,1,.5),c.rotation.x=-.38,c.position.set(0,.004,.0058),e.add(o,i,a,r,c),e}function d3(t,n){const e=Li(0,1.5,0),o=new G(Xl(),t.skinFace);o.castShadow=!0,e.add(o);const i=wc(t,1),s=wc(t,-1),a=[];for(const u of[-1,1]){const h=new Nn([new Y(u*.016,-.001,0),new Y(u*.034,.004,.003),new Y(u*.052,.002,0),new Y(u*.062,-.005,-.006)]),m=new Bn(h,10,.0032,6,!1);m.scale(1,.7,.55),a.push(m)}const r=.2165,c=new G(No(a.map(u=>{const h=u.toNonIndexed();return h.deleteAttribute("uv"),h})),t.brow);c.position.set(0,r,.0925),c.rotation.x=-.1;const l=.1215,f=new G(new ur(.0026,.03,3,8),t.lip);f.rotation.z=Math.PI/2,f.scale.set(1,1,.6),f.position.set(0,l,.0875);const d=new G(ja(),t.hair);return d.castShadow=!0,e.add(i,s,c,f,d),n.eyeL=i,n.eyeR=s,n.brow=c,n.mouth=f,{head:e,browY:r,mouthY:l}}let Kt={};function yc(t,n){const e=new Ke;Kt.upper??(Kt.upper=$l()),Kt.lower??(Kt.lower=jl()),Kt.hand??(Kt.hand=ql());const o=l=>n===1?l:Us(l),i=new G(o(Kt.upper),t.jacket);i.castShadow=!0,e.add(i);const s=Li(0,-.28,0);s.rotation.x=-.22,e.add(s),e.userData.elbow=s;const a=new G(o(Kt.lower),t.jacket);a.castShadow=!0,s.add(a);const r=Li(0,-.27,0);r.rotation.z=n*.04;const c=new G(Yl(n,Kt.hand),t.skin);if(c.castShadow=!0,r.add(c),n===1){const l=new us;l.box(t.leatherDark,.026,.155,.115,{x:-.044,y:-.108,z:.02,rz:-.06},.006),l.box(t.inner,.016,.146,.104,{x:-.034,y:-.108,z:.02,rz:-.06},.003),l.box(t.brass,.03,.15,.008,{x:-.044,y:-.108,z:-.036,rz:-.06},.003),l.build(r,"notebook")}return s.add(r),e}function Ec(t,n){const e=new Ke;Kt.thigh??(Kt.thigh=Zl()),Kt.shin??(Kt.shin=Ql()),Kt.boot??(Kt.boot=Jl());const o=new G(Kt.thigh.clone(),t.trousers);o.castShadow=!0,e.add(o);const i=Li(0,-.42,0);e.add(i);const s=new G(Kt.shin.clone(),t.trousers);s.castShadow=!0,i.add(s);const a=Li(0,-.43,0);i.add(a);const r=Kt.boot.clone();r.translate(0,.43,0);const c=new G(r,t.boot);c.castShadow=!0,a.add(c);const l=new us;for(let f=0;f<5;f++)l.box(t.inner,.056,.005,.005,{y:.032-f*.002,z:.052+f*.016,rx:-.4},.002),l.ball(t.brass,.0036,{x:.03,y:.035-f*.002,z:.052+f*.016},6),l.ball(t.brass,.0036,{x:-.03,y:.035-f*.002,z:.052+f*.016},6);return l.build(a,"laces"),{hip:e,knee:i,ankle:a}}function f3(t){const n=new G(Kl(),t.jacket);return n.castShadow=!0,n}function u3(t){const n=new us;n.box(t.trousers,.35,.2,.21,{y:.97},.06),n.box(t.brass,.034,.028,.012,{y:1.04,z:.14},.004),n.torus(t.jacket,.085,.024,{y:1.51,rx:Math.PI/2,sx:1.06},Math.PI*2,26),n.torus(t.inner,.078,.014,{y:1.532,rx:Math.PI/2},Math.PI*2,26);for(const e of[-1,1])n.ball(t.brass,.0048,{x:e*.085,y:1.262,z:.112},6);return n.torus(t.scarf,.074,.032,{y:1.54,rx:Math.PI/2},Math.PI*2,26),n.torus(t.scarf,.082,.026,{y:1.51,rx:Math.PI/2-.12},Math.PI*2,26),n.ball(t.scarf,.044,{x:-.056,y:1.5,z:.075,sy:1.1,sz:.9},12),n}function h3(t){const n=Li(.07,1.48,-.08),e=new Je(.15,.52,3,10);e.translate(0,-.26,0);const o=e.attributes.position;for(let a=0;a<o.count;a++){const r=o.getX(a),c=o.getY(a);o.setZ(a,Math.sin(r*60+c*8)*.008*(1+-c*1.5)- -c*.03)}e.computeVertexNormals();const i=new G(e,t.scarf);i.castShadow=!0;const s=new us;for(let a=0;a<8;a++)s.cyl(t.scarf,.0016,.0016,.035,{x:-.066+a*.019,y:-.54,z:-.018},4);return s.build(n,"scarf-fringe"),n.add(i),n.rotation.x=.16,n}function p3(t){const n=new Ke,e=new us;e.cyl(t.paper,.046,.04,.1,{y:0},6),e.cyl(t.brass,.06,.05,.016,{y:.058},6),e.add(new gt(.066,.05,6),t.brass,{y:.09}),e.cyl(t.brass,.05,.05,.014,{y:-.057},6);for(let i=0;i<6;i++){const s=i/6*Math.PI*2;e.cyl(t.brass,.0022,.0022,.1,{x:Math.cos(s)*.045,y:0,z:Math.sin(s)*.045},4)}e.torus(t.brass,.034,.0035,{y:.108},Math.PI,12),e.ball(t.brass,.008,{y:.122},8),e.build(n,"lantern");const o=new Kn(16757575,1.2,10);return n.add(o),n}function m3(){const t=new Ke;t.name="Explorer";const n=c3();t.add(f3(n));const e=new G(o3(),n.leatherDark);e.castShadow=!0;const o=new G(i3(),n.brass),i=new G(s3(),n.leather);i.castShadow=!0,t.add(e,o,i),u3(n).build(t,"torso");const s={},{head:a,browY:r,mouthY:c}=d3(n,s);t.add(a);const l=h3(n);t.add(l);const f=Ec(n);f.hip.position.set(.09,.91,0);const d=Ec(n);d.hip.position.set(-.09,.91,0),t.add(f.hip,d.hip);const u=yc(n,1);u.position.set(.2,1.46,0);const h=yc(n,-1);h.position.set(-.2,1.46,0),t.add(u,h);const m=p3(n);m.position.set(0,-.69,.1),h.add(m);const _=new G(new Di(.5,.64,36),new wt({color:9684477,transparent:!0,opacity:.22,side:$e}));_.rotation.x=-Math.PI/2,_.position.y=.03,_.userData.isFootRing=!0,t.add(_);const p={leftLeg:f,rightLeg:d,leftArm:u,rightArm:h,head:a,cape:l,eyeL:s.eyeL,eyeR:s.eyeR,brow:s.brow,mouth:s.mouth,faceRest:{browY:r,mouthY:c},mats:{jacket:n.jacket,trim:n.trim,cape:n.scarf}};return t.userData.rig=p,t}class g3{constructor(){ne(this,"yaw",0);ne(this,"orbitAnchorYaw",0);ne(this,"pitch",.38);ne(this,"targetPos",new Y);ne(this,"desiredPos",new Y);ne(this,"dragElement");ne(this,"activePointerId",null);ne(this,"previousTouchAction","");ne(this,"zoom",1);ne(this,"onWheel",n=>{n.preventDefault(),this.zoom=St.clamp(this.zoom*Math.exp(n.deltaY*.0012),.22,1.4)});ne(this,"isDragging",!1);ne(this,"lastX",0);ne(this,"downX",0);ne(this,"onPointerDown",n=>{var e;if(!(this.activePointerId!==null||n.pointerType==="mouse"&&n.button!==0)){this.activePointerId=n.pointerId,this.downX=n.clientX,this.lastX=n.clientX,this.isDragging=!1;try{(e=this.dragElement)==null||e.setPointerCapture(n.pointerId)}catch{}}});ne(this,"onPointerMove",n=>{if(n.pointerId!==this.activePointerId)return;const e=n.clientX-this.lastX;this.lastX=n.clientX,!this.isDragging&&Math.abs(n.clientX-this.downX)>10&&(this.isDragging=!0),this.isDragging&&this.addYaw(-e*.006)});ne(this,"onPointerEnd",n=>{n.pointerId===this.activePointerId&&(this.activePointerId=null,this.isDragging=!1)})}addYaw(n){this.yaw+=n}resetBehind(n){this.yaw=n,this.orbitAnchorYaw=n}update(n,e,o,i,s=!0,a){if(s&&!this.isDragging)this.yaw+=(o-this.yaw)*Math.min(1,i*2.5);else if(!s){const h=Math.atan2(Math.sin(this.yaw-this.orbitAnchorYaw),Math.cos(this.yaw-this.orbitAnchorYaw));this.yaw=this.orbitAnchorYaw+St.clamp(h,-1.05,1.05)}const r=Math.cos(this.yaw),c=Math.sin(this.yaw),l=!s&&!!a,f=l?a:e,d=(l?w0+8:w0)*this.zoom,u=(su+Math.sin(this.pitch)*3)*(l?1:.4+.6*this.zoom);return this.desiredPos.set(f.x-c*d,f.y+u,f.z-r*d),n.position.lerp(this.desiredPos,1-Math.exp(-5*i)),this.targetPos.copy(f),l||(this.targetPos.y+=1.55),n.lookAt(this.targetPos),this.yaw}bindDrag(n){this.disposeDrag(),this.dragElement=n,this.previousTouchAction=n.style.touchAction,n.style.touchAction="none",n.addEventListener("pointerdown",this.onPointerDown),n.addEventListener("pointermove",this.onPointerMove),n.addEventListener("pointerup",this.onPointerEnd),n.addEventListener("pointercancel",this.onPointerEnd),n.addEventListener("lostpointercapture",this.onPointerEnd),n.addEventListener("wheel",this.onWheel,{passive:!1})}disposeDrag(){const n=this.dragElement;n&&(n.removeEventListener("pointerdown",this.onPointerDown),n.removeEventListener("pointermove",this.onPointerMove),n.removeEventListener("pointerup",this.onPointerEnd),n.removeEventListener("pointercancel",this.onPointerEnd),n.removeEventListener("lostpointercapture",this.onPointerEnd),n.removeEventListener("wheel",this.onWheel),this.activePointerId!==null&&n.hasPointerCapture(this.activePointerId)&&n.releasePointerCapture(this.activePointerId),this.activePointerId=null,this.isDragging=!1,n.style.touchAction=this.previousTouchAction,this.dragElement=void 0)}}function Ra(t,n,e,o){const i=li(t,1e-4),s=i.attributes.position,a=new Y;for(let r=0;r<s.count;r++){a.fromBufferAttribute(s,r);const c=au(a.x*e+o,a.y*e+a.z*e*.7+o*1.7);a.multiplyScalar(1+(c-.5)*2*n),s.setXYZ(r,a.x,a.y,a.z)}return i.computeVertexNormals(),i}function Qn(t,n,e,o){const i=new Ln(t,n,e);i.castShadow=o,i.receiveShadow=!0,i.userData.nearScatter=!0;const s={count:0};return{mesh:i,get count(){return s.count},push(a,r){s.count>=e||(i.setMatrixAt(s.count,a),r&&i.setColorAt(s.count,r),s.count++)}}}const v3=new ot,Tc=new dn,Ac=new co,Pc=new Y,Rc=new Y,Vn=new te;function Jn(t,n,e,o,i,s,a=0,r=0,c=0){return Ac.set(a,r,c),Tc.setFromEuler(Ac),Pc.set(t,n,e),Rc.set(o,i,s),v3.compose(Pc,Tc,Rc)}function x3(t){const n=new Ke;n.name="near-scatter";const e=on(t.seed??4242),o=t.density,i=(ae,ue,z=0)=>t.avoid.some(([j,Z,de])=>Math.hypot(ae-j,ue-Z)<de+z),s=Fn(),a=(ae,ue=.9)=>new ge({color:ae,roughness:ue,metalness:.02}),r=(ae=.9)=>a(16777215,ae),c=tt(.16,.26,1,8);c.translate(0,.5,0);const l=Ra(new $n(1,2),.16,1.9,3),f=Ra(new $n(1,2),.22,2.4,11),d=Ra(new So(1,1),.28,1.5,7),u=new gt(1,1,9,1);u.translate(0,.5,0);const h=tt(.012,.014,1,4);h.translate(0,.5,0);const m=new ye(.06,7,5),_=fe(1.5,.12,1.05,.03),p=tt(.3,.32,1,9);p.rotateZ(Math.PI/2);const g=tt(.34,.42,.5,9),x=Math.round(46*o),M=Math.round(26*o),S=Math.round(70*o),T=Math.round(40*o),w=Math.round(34*o),y=Math.round(7*o),v=Qn(c,a(7033400,.95),x+1,!0),E=Qn(l,r(.92),x*4+1,!0),b=Qn(c,a(5915442,.95),M+1,!0),A=Qn(u,r(.9),M*3+1,!0),R=Qn(f,r(.94),S+1,!0),L=Qn(d,r(.95),T+1,!0),I=Qn(h,a(5143100,.9),w*14+1,!1),U=Qn(m,r(.7),w*14+1,!1),N=Qn(p,a(6968384,.95),y+1,!0),O=Qn(g,a(8020551,.95),y+1,!0),V=Qn(_,r(.92),40,!1),X=(ae,ue,z)=>{for(let j=0;j<14;j++){const Z=e()*Math.PI*2,de=ae+Math.sqrt(e())*(ue-ae),be=t.centerX+Math.cos(Z)*de,Te=t.centerZ+Math.sin(Z)*de;if(!i(be,Te,z))return[be,Te]}return null},J=[5209919,6263120,7051853,4157253,8102746,9416271];for(let ae=0;ae<x;ae++){const ue=X(18,56,3.5);if(!ue)continue;const[z,j]=ue,Z=t.groundY(z,j),de=.8+e()*.75,be=e()*Math.PI*2;v.push(Jn(z,Z-.1,j,de,3.6*de,de,(e()-.5)*.08,be,(e()-.5)*.08));const Te=J[Math.floor(e()*J.length)],Ze=[[0,4.7,0,1.9],[1.1,4.2,.5,1.45],[-.9,4.35,-.7,1.5],[.1,5.7,-.2,1.3]];for(const[Xe,ct,it,je]of Ze){const Tt=Math.cos(be),At=Math.sin(be),ln=z+(Xe*Tt+it*At)*de,B=j+(-Xe*At+it*Tt)*de;Vn.setHex(Te).offsetHSL((e()-.5)*.03,0,(e()-.5)*.08),E.push(Jn(ln,Z+ct*de,B,je*de*1.05,je*de*.82,je*de,0,e()*6,0),Vn.clone())}}for(let ae=0;ae<M;ae++){const ue=X(20,60,3);if(!ue)continue;const[z,j]=ue,Z=t.groundY(z,j),de=.9+e()*.8;b.push(Jn(z,Z-.1,j,de*.8,1.6*de,de*.8));const be=e()>.5?3104581:3894090;for(let Te=0;Te<3;Te++)Vn.setHex(be).offsetHSL(0,0,(e()-.5)*.05+Te*.012),A.push(Jn(z,Z+(1.2+Te*1.35)*de,j,(2-Te*.45)*de,2.3*de,(2-Te*.45)*de,0,e()*6,0),Vn.clone())}const W=[4880956,6065224,4025146,7050310,8163135];for(let ae=0;ae<S;ae++){const ue=X(16.5,46,1.8);if(!ue)continue;const[z,j]=ue,Z=.5+e()*.9;Vn.setHex(W[Math.floor(e()*W.length)]).offsetHSL(0,0,(e()-.5)*.06),R.push(Jn(z,t.groundY(z,j)+.28*Z,j,Z*1.25,Z*.85,Z,0,e()*6,0),Vn.clone())}for(let ae=0;ae<T;ae++){const ue=X(16.5,52,1.5);if(!ue)continue;const[z,j]=ue,Z=.3+Math.pow(e(),2)*1.5;Vn.setHex(9079428).offsetHSL(0,(e()-.5)*.04,(e()-.5)*.12),L.push(Jn(z,t.groundY(z,j)+.18*Z,j,Z*1.2,Z*.75,Z,(e()-.5)*.3,e()*6,(e()-.5)*.3),Vn.clone())}const k=[15909198,15233146,16052702,11635424,16752222,8175848];for(let ae=0;ae<w;ae++){const ue=X(16.5,38,1.2);if(!ue)continue;const[z,j]=ue,Z=k[Math.floor(e()*k.length)],de=8+Math.floor(e()*6);for(let be=0;be<de;be++){const Te=e()*Math.PI*2,Ze=Math.sqrt(e())*1.1,Xe=z+Math.cos(Te)*Ze,ct=j+Math.sin(Te)*Ze,it=t.groundY(Xe,ct),je=.35+e()*.3;I.push(Jn(Xe,it,ct,1,je,1,(e()-.5)*.3,0,(e()-.5)*.3)),Vn.setHex(Z).offsetHSL((e()-.5)*.03,0,(e()-.5)*.08),U.push(Jn(Xe,it+je,ct,1,.7,1),Vn.clone())}}for(let ae=0;ae<y;ae++){const ue=X(20,50,2);if(!ue)continue;const[z,j]=ue,Z=t.groundY(z,j),de=1.6+e()*1.6;N.push(Jn(z,Z+.28,j,de,1,1,0,e()*Math.PI,(e()-.5)*.12));const be=X(20,50,2);be&&O.push(Jn(be[0],t.groundY(be[0],be[1])+.24,be[1],1,.8+e()*.6,1))}for(let ae=0;ae<38;ae++){const ue=ae/37,z=t.centerZ+15.2+ue*38,j=t.centerX+Math.sin(ue*5.2)*3.2*Math.min(1,ue*2.2);if(i(j,z,-1.5))continue;Vn.setHex(ae%2?10197650:8816511).offsetHSL(0,0,(e()-.5)*.04);const Z=38/37,de=Math.cos(ue*5.2)*5.2*3.2*Math.min(1,ue*2.2)/37;V.push(Jn(j,t.groundY(j,z)+.05,z,.85+e()*.2,1,.85+e()*.2,0,Math.atan2(de,Z)+(e()-.5)*.15,0),Vn.clone())}for(const ae of[v,E,b,A,R,L,I,U,N,O,V])ae.mesh.count=ae.count,ae.mesh.instanceMatrix.needsUpdate=!0,ae.mesh.instanceColor&&(ae.mesh.instanceColor.needsUpdate=!0),ae.mesh.computeBoundingSphere(),ae.count>0&&n.add(ae.mesh);const ee=new Dn;for(let ae=0;ae<6;ae++){const ue=(ae+.5)/6,z=t.centerZ+15.2+ue*34,j=ae%2?1:-1,Z=t.centerX+Math.sin(ue*5.2)*3.2*Math.min(1,ue*2.2)+j*2.4;if(i(Z,z,-1))continue;const de=t.groundY(Z,z);ee.add(tt(.14,.18,.18,8),s.slate,{x:Z,y:de+.09,z}),ee.add(It([Z,de,z],[Z,de+3.4,z],.05,6),s.slate),ee.add(It([Z,de+3.4,z],[Z-j*.5,de+3.55,z],.035,5),s.slate),ee.add(new gt(.28,.2,8),s.slate,{x:Z-j*.55,y:de+3.52,z}),ee.add(tt(.14,.2,.36,8),s.lampGlass,{x:Z-j*.55,y:de+3.3,z})}return ee.build(n,"near-lamps",{}),n}function _3(t){const n=new Ke;n.name="mountain-ring";const e=on(t.seed??7),o=[],i=new Y,s=new te(6976642),a=new te(8091247),r=new te(3892808),c=new te(15331835),l=new te,f=[{mul:1,hMul:1,radMul:1,n:t.count},{mul:1.32,hMul:.72,radMul:1.35,n:Math.round(t.count*1.3)}];for(const u of f)for(let h=0;h<u.n;h++){const m=h/u.n*Math.PI*2+(e()-.5)*.18,_=t.ringRadius*u.mul+e()*40,p=Math.cos(m)*_,g=Math.sin(m)*_+t.originZ,x=(46+e()*82)*u.hMul,M=(34+e()*48)*u.radMul,S=e()*100,T=new gt(1,1,40,22,!0),w=li(T,1e-4),y=w.attributes.position,v=new Float32Array(y.count*3);for(let E=0;E<y.count;E++){i.fromBufferAttribute(y,E);const b=i.y+.5,A=Math.atan2(i.z,i.x),R=Math.abs(Math.sin(A*5+S))*.22+Math.abs(Math.sin(A*11+S*1.7+b*4))*.1+(Rn(Math.cos(A)*3+S,Math.sin(A)*3+b*6,3)-.5)*.28,L=Math.pow(1-b,.82),I=.55+R*(.4+.6*(1-b))+.45*L;let U=b-.5;U+=(Rn(Math.cos(A)*2.2+S,Math.sin(A)*2.2+S,3)-.5)*.06*(1-b),y.setXYZ(E,i.x*I,U,i.z*I);const N=.92+.08*Math.sin(b*38+R*6);l.copy(s).lerp(a,Rn(A*2+S,b*7,2)),l.multiplyScalar(N);const O=1-eo(.08,.34,b+(Rn(A*3,b*9,2)-.5)*.12);if(l.lerp(r,O*.85),t.snow){const V=.62+(Rn(A*4+S,b*8,3)-.5)*.18,X=eo(V-.04,V+.08,b);l.lerp(c,X)}v[E*3]=l.r,v[E*3+1]=l.g,v[E*3+2]=l.b}w.setAttribute("color",new xt(v,3)),w.deleteAttribute("uv"),w.computeVertexNormals(),w.scale(M,x,M),w.rotateY(e()*Math.PI*2),w.translate(p,x/2-8,g),o.push(w)}const d=No(o,!1);if(d){const u=new ge({color:16777215,vertexColors:!0,roughness:1,metalness:0,side:$e,fog:!0});u.onBeforeCompile=m=>{m.fragmentShader=m.fragmentShader.replace("#include <fog_fragment>",`#ifdef USE_FOG
          float mFog = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth * 6.5);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, clamp(mFog, 0.0, 0.9));
        #endif`)},u.customProgramCacheKey=()=>"mountain-haze";const h=new G(d,u);h.castShadow=!1,h.receiveShadow=!1,n.add(h)}return n}function M3(t,n){const e=new Ke;e.name="road";const o=n.width/2,i=new te(n.base),s=[{off:-o-.55,lift:-.04,tone:.55},{off:-o-.18,lift:.1,tone:.78},{off:-o,lift:.17,tone:.95},{off:-o*.7,lift:.09,tone:1},{off:0,lift:.13,tone:1.06},{off:o*.7,lift:.09,tone:1},{off:o,lift:.17,tone:.95},{off:o+.18,lift:.1,tone:.78},{off:o+.55,lift:-.04,tone:.55}],a=s.length,r=[],c=[],l=[],f=new Y,d=new Y,u=new te,h=new te(5208632);for(let g=0;g<=n.steps;g++){const x=g/n.steps;t.getPoint(x,f),t.getTangent(x,d);const M=-d.z,S=d.x,T=Math.hypot(M,S)||1;for(let w=0;w<a;w++){const{off:y,lift:v,tone:E}=s[w],b=f.x+M/T*y,A=f.z+S/T*y;r.push(b,n.groundY(b,A)+v,A);const R=.88+.24*Rn(b*1.7,A*1.7,2);u.copy(i).multiplyScalar(E*R);const L=1-.14*Math.exp(-Math.pow((Math.abs(y)-o*.5)/(o*.18),2));if(u.multiplyScalar(L),Math.abs(y)>o){const I=.4+.5*Rn(b*.9+40,A*.9+12,2);u.lerp(h,Math.min(.95,I*((Math.abs(y)-o)/.55+.35)))}c.push(u.r,u.g,u.b)}if(g>0){const w=g*a,y=(g-1)*a;for(let v=0;v<a-1;v++)l.push(y+v,w+v,y+v+1,y+v+1,w+v,w+v+1)}}const m=new sn;m.setAttribute("position",new Un(r,3)),m.setAttribute("color",new Un(c,3)),m.setIndex(l),m.computeVertexNormals();const _=new ge({color:16777215,vertexColors:!0,roughness:.96,metalness:.02,side:$e});Zg(_);const p=new G(m,_);if(p.receiveShadow=!0,e.add(p),n.inlay){const g=[],x=[];for(let w=0;w<=n.steps;w++){const y=w/n.steps;t.getPoint(y,f),t.getTangent(y,d);const v=-d.z,E=d.x,b=Math.hypot(v,E)||1;for(const A of[-.09,.09]){const R=f.x+v/b*A,L=f.z+E/b*A;g.push(R,n.groundY(R,L)+.17,L)}if(w>0){const A=w*2,R=(w-1)*2;x.push(R,A,R+1,R+1,A,A+1)}}const M=new sn;M.setAttribute("position",new Un(g,3)),M.setIndex(x),M.computeVertexNormals();const S=new ge({color:n.inlay.color,emissive:n.inlay.emissive,emissiveIntensity:n.inlay.intensity,roughness:.4,side:$e}),T=new G(M,S);T.userData.noShadow=!0,e.add(T)}return e}const b3=new Set(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"]);class S3{constructor(){ne(this,"position",new Y);ne(this,"yaw",0);ne(this,"moveTarget",null);ne(this,"keys",new Set);ne(this,"stick",{x:0,z:0});ne(this,"enabled",!0);ne(this,"sprint",!1);ne(this,"onKeyDown",n=>{if(!this.enabled)return;const e=n.key.toLowerCase();b3.has(e)&&this.keys.add(e),e==="shift"&&(this.sprint=!0)});ne(this,"onKeyUp",n=>{const e=n.key.toLowerCase();this.keys.delete(e),e==="shift"&&(this.sprint=!1)});window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)}dispose(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp)}setEnabled(n){this.enabled=n,n||(this.keys.clear(),this.moveTarget=null)}setPosition(n,e,o){this.position.set(n,e,o),this.moveTarget=null}setMoveTarget(n,e){this.moveTarget=new Y(n,0,e)}clearMoveTarget(){this.moveTarget=null}setStickInput(n,e){this.stick.x=n,this.stick.z=e,(Math.abs(n)>.12||Math.abs(e)>.12)&&(this.moveTarget=null)}isMoving(){return this.keys.size>0||this.moveTarget!==null||Math.abs(this.stick.x)>.1||Math.abs(this.stick.z)>.1}update(n,e){if(!this.enabled)return;let o=0,i=0;if(this.moveTarget){const s=new Y().subVectors(this.moveTarget,this.position);s.y=0,s.length()<.45?this.moveTarget=null:(s.normalize(),o=s.x,i=s.z,this.yaw=Math.atan2(o,i))}else{let s=(this.keys.has("w")||this.keys.has("arrowup")?1:0)-(this.keys.has("s")||this.keys.has("arrowdown")?1:0),a=(this.keys.has("d")||this.keys.has("arrowright")?1:0)-(this.keys.has("a")||this.keys.has("arrowleft")?1:0);if((Math.abs(this.stick.x)>.1||Math.abs(this.stick.z)>.1)&&(s=this.stick.z,a=this.stick.x),s!==0||a!==0){const r=Math.sin(e),c=Math.cos(e);o=-a*c+s*r,i=a*r+s*c;const l=Math.hypot(o,i)||1;o/=l,i/=l,this.yaw=Math.atan2(o,i)}}if(o!==0||i!==0){const s=ru*(this.sprint?1.85:1)*n;this.position.x+=o*s,this.position.z+=i*s}this.position.y=zt(this.position.x,this.position.z,Nt)+.05}isSprinting(){return this.sprint&&this.isMoving()}}function w3(t,n){const e=document.createElement("canvas");e.width=512,e.height=128;const o=e.getContext("2d");o.fillStyle=n?"rgba(8, 18, 40, 0.72)":"rgba(40, 40, 40, 0.55)",Cc(o,8,8,496,112,20),o.fill(),o.strokeStyle=n?"rgba(147, 197, 253, 0.55)":"rgba(120, 120, 120, 0.4)",o.lineWidth=3,Cc(o,8,8,496,112,20),o.stroke(),o.fillStyle=n?"#f3f4f6":"#9ca3af",o.font="bold 28px 'Noto Sans SC', 'Microsoft YaHei', sans-serif";const i=t.length>22?t.slice(0,21)+"…":t;o.fillText(i,24,72);const s=new Wt(e);s.colorSpace=yt;const a=new ti({map:s,transparent:!0,depthWrite:!1}),r=new ni(a);return r.scale.set(10,2.5,1),r.position.y=7.2,r.userData.isSignpost=!0,r}function Cc(t,n,e,o,i,s){t.beginPath(),t.moveTo(n+s,e),t.lineTo(n+o-s,e),t.quadraticCurveTo(n+o,e,n+o,e+s),t.lineTo(n+o,e+i-s),t.quadraticCurveTo(n+o,e+i,n+o-s,e+i),t.lineTo(n+s,e+i),t.quadraticCurveTo(n,e+i,n,e+i-s),t.lineTo(n,e+s),t.quadraticCurveTo(n,e,n+s,e),t.closePath()}const y3={unit01:{id:"unit01",label:"数字时代",skyTop:3831990,skyMid:8435164,skyBot:14215400,fogColor:11849680,fogDensity:.0012,sunColor:16773848,sunIntensity:2,sunDiscScale:20,sunDiscOpacity:.3,sunFocusedDiscScale:24,sunFocusedDiscOpacity:.32,hemiSky:12048110,hemiGround:5069373,ambientColor:11188680,terrainTint:[.06,.42,.1],crystalColor:5286143,orbColor:3531726,glowColor:1609617,pathColor:2391683,decorStyle:"coast",ground:{grass:5671486,dirt:8810575,rock:8027768}},unit02:{id:"unit02",label:"传记人物",skyTop:5078960,skyMid:11125976,skyBot:15786436,fogColor:14208176,fogDensity:.0012,sunColor:16769200,sunIntensity:2,hemiSky:14213870,hemiGround:6970440,ambientColor:12629148,terrainTint:[.34,.28,.19],crystalColor:12158786,orbColor:14861696,glowColor:10317105,pathColor:7755311,decorStyle:"market",ground:{grass:9081941,dirt:9268551,rock:9208434},focusedLandscapeScale:.86,focusedLandscapeOffsetZ:7},unit03:{id:"unit03",label:"旅行探索",skyTop:4160168,skyMid:9288656,skyBot:14412e3,fogColor:11848120,fogDensity:.0012,sunColor:16773328,sunIntensity:1.9,hemiSky:12638420,hemiGround:4869174,ambientColor:11123624,terrainTint:[.15,.23,.13],crystalColor:8631946,orbColor:12112526,glowColor:7448204,pathColor:5467990,decorStyle:"forest",ground:{grass:5012810,dirt:7166012,rock:6450276}},unit04:{id:"unit04",label:"劳动传统",skyTop:4879520,skyMid:10533064,skyBot:15391936,fogColor:13483942,fogDensity:.0018,sunColor:16769716,sunIntensity:1.9,hemiSky:14076342,hemiGround:4866100,ambientColor:11574404,terrainTint:[.2,.15,.1],crystalColor:13211224,orbColor:14991228,glowColor:11827778,pathColor:7822656,decorStyle:"temple",ground:{grass:8027206,dirt:8216381,rock:7432540}},unit05:{id:"unit05",label:"航天探索",skyTop:1714764,skyMid:4876950,skyBot:11452368,fogColor:9347252,fogDensity:.0012,sunColor:15134975,sunIntensity:2,hemiSky:12110044,hemiGround:4738652,ambientColor:9479360,terrainTint:[.2,.21,.25],crystalColor:9682408,orbColor:14412543,glowColor:7973087,pathColor:5401992,decorStyle:"space",ground:{grass:9343645,dirt:8159112,rock:10265261}},unit06:{id:"unit06",label:"共益交易城",skyTop:4028584,skyMid:8828620,skyBot:14477020,fogColor:11914180,fogDensity:.0012,sunColor:16770752,sunIntensity:1.9,hemiSky:11850458,hemiGround:4865844,ambientColor:10007732,terrainTint:[.085,.13,.125],crystalColor:14001007,orbColor:8243632,glowColor:5152657,pathColor:3501415,decorStyle:"exchange",ground:{grass:5932100,dirt:8217929,rock:7434086}}},Za={id:"default",label:"",skyTop:4159416,skyMid:8828126,skyBot:14673898,fogColor:12439772,fogDensity:.0012,sunColor:16773330,sunIntensity:2.1,hemiSky:12375794,hemiGround:5986878,ambientColor:11846868,terrainTint:[.12,.3,.1],crystalColor:6333946,orbColor:8438015,glowColor:4231406,pathColor:3170464,decorStyle:"forest",ground:{grass:6130236,dirt:8020032,rock:8027512}};function E3(t){return t?y3[t]??Za:Za}function T3(t){if(t.ground)return t.ground;const[n,e,o]=t.terrainTint,i=new te(n,e,o),s={h:0,s:0,l:0};i.getHSL(s);const a=new te().setHSL(s.h,Math.min(1,s.s*.85+.28),.34),r=new te().setHSL((s.h+.07)%1,Math.min(1,s.s*.5+.18),.33),c=new te().setHSL(s.h,Math.min(1,s.s*.16),.46);return{grass:a.getHex(),dirt:r.getHex(),rock:c.getHex()}}function Qa(t,n=yt,e=1024){const o=document.createElement("canvas");o.width=e,o.height=e,t(o.getContext("2d"),e);const i=new Wt(o);return i.wrapS=i.wrapT=Io,i.colorSpace=n,i.generateMipmaps=!0,i.minFilter=Ro,i}function A3(){const t=on(20260616),n=Qa((o,i)=>{o.fillStyle="#9a9a9a",o.fillRect(0,0,i,i);for(let s=0;s<60;s++){const a=t()*i,r=t()*i,c=30+t()*120,l=110+t()*110,f=o.createRadialGradient(a,r,0,a,r,c);f.addColorStop(0,`rgba(${l},${l},${l},0.5)`),f.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=f,o.beginPath(),o.arc(a,r,c,0,Math.PI*2),o.fill()}for(let s=0;s<14e3;s++){const a=120+t()*100;o.fillStyle=`rgba(${a},${a},${a},0.5)`,o.fillRect(t()*i,t()*i,1.5,1.5)}},Ho),e=Qa((o,i)=>{o.fillStyle="#8080ff",o.fillRect(0,0,i,i);for(let s=0;s<12e3;s++){const a=96+t()*64,r=96+t()*64;o.fillStyle=`rgb(${a|0},${r|0},255)`;const c=1.5+t()*2.5;o.fillRect(t()*i,t()*i,c,c)}for(let s=0;s<40;s++){const a=t()*i,r=t()*i,c=24+t()*90,l=o.createRadialGradient(a,r,0,a,r,c);l.addColorStop(0,`rgba(${100+t()*50|0},${100+t()*50|0},255,0.4)`),l.addColorStop(1,"rgba(128,128,255,0)"),o.fillStyle=l,o.beginPath(),o.arc(a,r,c,0,Math.PI*2),o.fill()}},Ho);return n.repeat.set(14,18),e.repeat.set(14,18),{roughness:n,normal:e}}function P3(){const t=on(20261015),n=Qa((e,o)=>{e.fillStyle="#dcd9cd",e.fillRect(0,0,o,o);for(let i=0;i<130;i++){const s=t()*o,a=t()*o,r=36+t()*150,l=t()>.55?"156,132,98":"116,138,100",f=.045+t()*.085,d=e.createRadialGradient(s,a,0,s,a,r);d.addColorStop(0,`rgba(${l},${f})`),d.addColorStop(1,`rgba(${l},0)`),e.fillStyle=d,e.beginPath(),e.arc(s,a,r,0,Math.PI*2),e.fill()}for(let i=0;i<6e3;i++){const s=t()*o,a=t()*o,r=3+t()*7,c=-Math.PI/2+(t()-.5)*1.3,l=t()>.5;e.strokeStyle=l?`rgba(232,236,214,${.1+t()*.2})`:`rgba(84,100,72,${.08+t()*.17})`,e.lineWidth=.8+t()*1.2,e.beginPath(),e.moveTo(s,a),e.lineTo(s+Math.cos(c)*r,a+Math.sin(c)*r),e.stroke()}for(let i=0;i<1100;i++){const s=t()*o,a=t()*o,r=.8+t()*2.2,c=168+t()*60;e.fillStyle=`rgba(${c|0},${c-4|0},${c-12|0},${.2+t()*.35})`,e.beginPath(),e.arc(s,a,r,0,Math.PI*2),e.fill()}for(let i=0;i<260;i++){const s=t()*o,a=t()*o;e.strokeStyle=`rgba(170,150,104,${.2+t()*.3})`,e.lineWidth=1+t()*1.4,e.beginPath(),e.moveTo(s,a),e.lineTo(s+(t()-.5)*8,a+(t()-.5)*8),e.stroke()}},yt,1024);return n.repeat.set(56,68),n.anisotropy=8,n}function Ca(t,n,e,o){const i=Math.cos(t.ry),s=Math.sin(t.ry);return{x:t.x+n*i+o*s,y:e,z:t.z-n*s+o*i,ry:t.ry}}function R3(t,n,e={}){const o=new Ke;o.name="unit1-sanctuary";const i=Fn(),s=e.greenery??!0;if(e.tint!==void 0){const y=new te(e.tint);for(const v of["stone","stoneWarm","stoneDark","paveA","paveB"])i[v].color.lerp(y,.16)}const a=new Dn,r=fs(1701);a.add(gn(14.5,.3,.04),i.stoneDark,{y:0}),a.add(gn(13.6,.22,.035),i.stone,{y:.3}),a.add(gn(12.8,.16,.03),i.stoneWarm,{y:.52});const c=.68;[[8.1,9.3,34],[9.4,10.6,40],[10.7,12.5,48]].forEach(([y,v,E],b)=>{const A=Math.PI*2/E;for(let R=0;R<E;R++){const L=R*A+.006+b%2*A*.5;a.add(Wl(y,v,L,L+A-.012,.028),(R+b)%2?i.paveA:i.paveB,{y:c})}}),a.add(gn(7.5,.09,.02,16),i.stoneDark,{y:c}),a.add(gn(7.1,.09,.02,16),i.stone,{y:c+.09});const f=c+.18;for(let y=0;y<8;y++)a.add(fe(.14,.012,5.4,.004),i.slate,{y:f+.006,ry:y/8*Math.PI,z:0});const d=new me(5.6,.045,5,72);a.add(d,i.slate,{y:f+.012,rx:Math.PI/2});const u=[];for(const[y,v]of[[-7,-7],[7,-7],[-7,7],[7,7]]){const E=c;a.add(fe(1.1,.34,1.1,.05),i.stoneDark,{x:y,y:E+.17,z:v}),a.add(fe(.86,.2,.86,.04),i.stone,{x:y,y:E+.44,z:v}),a.add(tt(.3,.36,3,14),i.stone,{x:y,y:E+.54+1.5,z:v});for(const L of[.16,.84])a.add(new me(.33-.03*L,.035,6,20),i.stoneDark,{x:y,y:E+.54+3*L,z:v,rx:Math.PI/2});const b=E+3.54;a.add(tt(.46,.28,.26,14),i.stoneWarm,{x:y,y:b+.13,z:v}),a.add(fe(.98,.14,.98,.04),i.stoneDark,{x:y,y:b+.33,z:v});const A=b+.4,R=.95;for(let L=0;L<4;L++){const I=L/4*Math.PI*2+Math.PI/4;a.add(It([y+Math.cos(I)*.3,A,v+Math.sin(I)*.3],[y+Math.cos(I)*.3,A+R,v+Math.sin(I)*.3],.022,6),i.brass)}a.add(new me(.31,.03,5,20),i.brass,{x:y,y:A,z:v,rx:Math.PI/2}),a.add(new me(.31,.03,5,20),i.brass,{x:y,y:A+R,z:v,rx:Math.PI/2}),a.add(new gt(.4,.32,10),i.copper,{x:y,y:A+R+.16,z:v}),a.add(new ye(.05,8,6),i.brass,{x:y,y:A+R+.34,z:v}),u.push([y,A+R/2,v])}const h=8.5;for(const y of[-1,1]){const v=y*5.3;a.add(fe(1.7,.55,1.7,.06),i.stoneDark,{x:v,y:c+.275,z:h}),a.add(fe(1.2,5,1.2,.08),i.stone,{x:v,y:c+.55+2.5,z:h});for(const E of[-1,1])a.add(fe(.14,4.4,.05,.01),i.stoneDark,{x:v+y*0,y:c+.55+2.5,z:h+E*.62});a.add(fe(1.55,.3,1.55,.05),i.stoneWarm,{x:v,y:c+.55+5.15,z:h}),a.add(fe(1.75,.1,1.75,.03),i.stoneDark,{x:v,y:c+.55+5.35,z:h})}const m=c+.55+5.4+.5;a.add(fe(12.7,1,1.3,.07),i.stone,{y:m,z:h}),a.add(fe(13.3,.22,1.7,.04),i.stoneWarm,{y:m+.62,z:h}),a.add(fe(13,.08,1.55,.02),i.stoneDark,{y:m+.77,z:h});for(let y=0;y<43;y++)a.add(fe(.14,.14,.12,.015),i.stoneDark,{x:-6.3+y*.3,y:m-.58,z:h+.7});const _=new Mn;_.moveTo(-2.4,0),_.lineTo(2.4,0),_.lineTo(0,1.2),_.closePath();const p=new Cn(_,{depth:.9,bevelEnabled:!0,bevelThickness:.06,bevelSize:.06,bevelSegments:1});p.translate(0,0,-.45),a.add(p,i.stone,{y:m+.81,z:h}),a.add(fe(3.4,.62,.1,.02),i.slate,{y:m+.02,z:h+.7}),a.add(fe(3.55,.05,.08,.01),i.brass,{y:m+.36,z:h+.72}),a.add(fe(3.55,.05,.08,.01),i.brass,{y:m-.32,z:h+.72});for(const y of[-2.6,2.6])a.add(It([y,m-.5,h+.45],[y,m-1.4,h+.45],.012,4),i.steel),a.add(new gt(.2,.16,8),i.copper,{x:y,y:m-1.42,z:h+.45}),a.add(tt(.14,.17,.34,8),i.lampGlass,{x:y,y:m-1.67,z:h+.45}),a.add(tt(.12,.12,.05,8),i.brass,{x:y,y:m-1.87,z:h+.45});const g=new $n(.16,1),x=(y,v,E,b)=>{a.add(g,r()>.5?i.leaf:i.leafLight,{x:y,y:v,z:E,sx:b,sy:b*.85,sz:b})};for(const y of s?[-1,1]:[])for(let v=0;v<26;v++){const E=v/26;x(y*(5.3+(r()-.5)*1.1),c+.9+E*4.3,h+.62+r()*.18,.55+r()*.7)}for(let y=0;y<(s?34:0);y++){const v=-6+r()*12;x(v,m-.58-r()*(Math.abs(v)>4.5?.9:.35),h+.7+r()*.15,.5+r()*.6)}const M=[.22,Math.PI-.22,Math.PI+.22,-.22];for(const y of M){const E={x:Math.cos(y)*11.2,z:Math.sin(y)*11.2,ry:Math.atan2(-Math.cos(y),-Math.sin(y))};a.add(fe(2.1,.09,.56,.025),i.wood,Ca(E,0,c+.5,0)),a.add(fe(2.1,.46,.07,.02),i.wood,{...Ca(E,0,c+.82,-.27),rx:0});for(const b of[-.9,.9])a.add(fe(.12,.5,.58,.02),i.stoneDark,Ca(E,b,c+.25,0))}for(let y=0;y<8;y++){const v=y/8*Math.PI*2+Math.PI/8,E=12,b=Math.cos(v)*E,A=Math.sin(v)*E;if(!(!s||Math.abs(b)<6.8&&A>6)){a.add(tt(.95,1.05,.42,14),i.stoneDark,{x:b,y:c+.21,z:A}),a.add(tt(.8,.8,.05,14),i.soil,{x:b,y:c+.44,z:A});for(let R=0;R<7;R++){const L=R/7*Math.PI*2+y;a.add(new $n(.3,1),R%2?i.leaf:i.leafLight,{x:b+Math.cos(L)*.38,y:c+.72+R%3*.06,z:A+Math.sin(L)*.38,sy:.82})}a.add(new $n(.4,1),i.leafLight,{x:b,y:c+.9,z:A,sy:.85})}}a.build(o,"unit1-sanctuary",{isLandscapeStage:!0});const S=new G(new me(11.8,.07,8,64),n);S.rotation.x=Math.PI/2,S.position.y=c+.03,S.userData.isLandscapeRing=!0,o.add(S);const T=new G(new me(6.8,.055,8,56),t);T.rotation.x=Math.PI/2,T.position.y=f+.04,T.userData.isLandscapeRing=!0,o.add(T);const w=new G(new me(2.4,.07,8,48),t);w.position.set(0,c+4.4,h),o.add(w);for(const[y,v,E]of u){const b=new G(new ye(.2,18,14),t);b.position.set(y,v,E),b.userData.isLandscapeBeacon=!0,o.add(b)}return o}let Dc;const mo=.4;function C3(){return Dc??(Dc={head:Xl(mo),hair:{short:ja(mo,"short"),long:ja(mo,"long")},jacket:Kl(mo),upper:$l(mo),lower:jl(mo),hand:ql(mo),thigh:Zl(mo),shin:Ql(mo),boot:Jl(mo)}),Dc}const D3=(()=>{let t;return()=>(t??(t={eyeWhite:new ge({color:15854822,roughness:.25}),iris:new ge({color:4861984,roughness:.3}),lip:new ge({color:10113096,roughness:.5}),shoe:new ge({color:4863526,roughness:.65}),phone:new ge({color:2107181,roughness:.35,metalness:.3}),screen:new ge({color:8049872,emissive:2071200,emissiveIntensity:.55,roughness:.3})}),t)})();function kt(t,n){const e=new G(t,n);return e.castShadow=!0,e.receiveShadow=!0,e.userData.isLandscapeStage=!0,e}function xi(t,n,e,o,i){return kt(new Do(t,n,e,1,Math.min(o,t/2.01,n/2.01,e/2.01)),i)}const I3={stand:{left:{shoulder:.04,elbow:-.15},right:{shoulder:-.04,elbow:-.15}},phone:{left:{shoulder:-.7,elbow:-1.35,side:-.06},right:{shoulder:-.7,elbow:-1.35,side:.06}},listen:{left:{shoulder:-.55,elbow:-.95},right:{shoulder:-.5,elbow:-.95}},talk:{left:{shoulder:-.5,elbow:-.95},right:{shoulder:-1.15,elbow:-.75,side:.1}},write:{left:{shoulder:-.55,elbow:-.9},right:{shoulder:-.85,elbow:-1.2,side:.05}},read:{left:{shoulder:-.95,elbow:-1.45,side:-.1},right:{shoulder:-.95,elbow:-1.45,side:.1}},walk:{left:{shoulder:.45,elbow:-.25},right:{shoulder:-.45,elbow:-.5}},point:{left:{shoulder:.04,elbow:-.15},right:{shoulder:-1.45,elbow:-.1,side:.12}}};function Rs(t){const n=D3(),e=C3(),o=new Ke;o.name="scene-person";const i=t.seated??!1,s=t.pose??(i?"listen":"stand"),a=(W,k,ee={})=>new ge({color:W,roughness:k,metalness:.02,...ee}),r=new te(t.skin??14858392),c=new te(t.shirt),l={h:0,s:0,l:0},f={h:0,s:0,l:0};c.getHSL(l),r.getHSL(f),Math.min(Math.abs(l.h-f.h),1-Math.abs(l.h-f.h))<.055&&l.s>.18&&Math.abs(l.l-f.l)<.24&&c.set(5205894).offsetHSL(0,0,(l.l-.5)*.2);const u=a(c.getHex(),.86,{side:$e}),h=a(t.trousers??3753562,.88),m=a(t.skin??14858392,.55,{emissive:3806728,emissiveIntensity:.05}),_=new ge({color:m.color.getHex(),roughness:.55,metalness:.02,vertexColors:!0,emissive:3806728,emissiveIntensity:.05}),p=new ge({color:16777215,vertexColors:!0,roughness:.42,metalness:.15,side:$e}),g=t.hair??2825494,x=a(new te(g).multiplyScalar(.8).getHex(),.7),M=i?.1:.91,S=new Ke;S.position.y=M,S.rotation.x=t.lean??0,o.add(S);const T=new Ke;T.position.y=-.91,S.add(T),T.add(kt(e.jacket,u));const w=new Ke;w.position.y=1.5,w.rotation.x=s==="phone"||s==="read"?.38:s==="write"?.3:t.lean?-t.lean*.6:0,T.add(w),w.add(kt(e.head,_));for(const W of[-1,1]){const k=kt(new ye(.0125,12,9),n.eyeWhite);k.position.set(W*.034,.2,.0685);const ee=new G(new ye(.0072,10,8),n.iris);ee.scale.set(1,1,.35),ee.position.z=.0118,k.add(ee),w.add(k);const ae=xi(.046,.009,.012,.004,x);ae.position.set(W*.037,.2165,.0885),ae.rotation.z=-W*.1,w.add(ae)}const y=kt(new ur(.0026,.026,3,8),n.lip);y.rotation.z=Math.PI/2,y.scale.set(1,1,.6),y.position.set(0,.1215,.0875),w.add(y);const v=t.hairStyle??"short",E=(v==="long"?e.hair.long:e.hair.short).clone(),b=new te(g),A=(b.r+b.g+b.b)/3,R=E.attributes.color;for(let W=0;W<R.count;W++){const k=(R.getX(W)+R.getY(W)+R.getZ(W))/3/.05;R.setXYZ(W,b.r*k*(.35/Math.max(.05,A))*.6,b.g*k*(.35/Math.max(.05,A))*.6,b.b*k*(.35/Math.max(.05,A))*.6)}if(w.add(kt(E,p)),v==="bun"){const W=kt(new ye(.05,14,10),a(g,.7));W.scale.set(1,.9,1),W.position.set(0,.3,-.07),w.add(W)}if(t.helmet){const W=kt(new ye(.145,24,16),a(15659764,.3,{metalness:.2}));W.scale.set(1,1.12,1.08),W.position.y=.2,w.add(W);const k=kt(new ye(.12,20,12),a(1782855,.12,{metalness:.7}));k.scale.set(.95,.68,.55),k.position.set(0,.2,.108),w.add(k);const ee=kt(new me(.1,.018,8,20),a(13226196,.4,{metalness:.5}));ee.rotation.x=Math.PI/2,ee.position.y=.07,w.add(ee)}if(t.glasses){const W=a(1710618,.4,{metalness:.4});for(const ee of[-1,1]){const ae=kt(new me(.0245,.0032,6,18),W);ae.position.set(ee*.034,.2,.092),w.add(ae)}const k=kt(new we(.0028,.0028,.02,5),W);k.rotation.z=Math.PI/2,k.position.set(0,.204,.093),w.add(k)}const L=a(15657696,.9,{side:$e}),I=kt(new me(.07,.012,8,24),L);if(I.rotation.x=Math.PI/2,I.position.y=1.535,I.scale.set(1.05,1,1),T.add(I),t.scarf!==void 0){const W=kt(new me(.074,.032,8,20),a(t.scarf,.92));W.rotation.x=Math.PI/2,W.position.y=1.54,T.add(W)}if(t.backpack!==void 0){const W=xi(.29,.4,.15,.06,a(t.backpack,.85));W.position.set(0,1.27+.2-.2,-.155),T.add(W)}const U=(Math.imul(t.shirt^(t.hair??0)*31,2654435761)>>>16)+(t.hairStyle==="long"?3:0),N=t.outfit??(t.helmet||t.scarf!==void 0?"tee":["tee","hoodie","coat","dress","tee","hoodie"][U%6]),O=(t.hairStyle??"short")==="long",V=N==="dress"&&!O&&t.hairStyle!=="bun"?"coat":N;if(V==="hoodie"&&!t.helmet){const W=kt(new me(.083,.03,10,24),u);W.rotation.x=Math.PI/2-.35,W.position.set(0,1.545,-.03),W.scale.set(1.05,1,1.15),T.add(W);const k=xi(.2,.09,.02,.01,u);k.position.set(0,1,.128),T.add(k)}if(!i&&(V==="coat"||V==="dress")){const W=V==="coat"?.62:.46,k=kt(new we(.19,V==="coat"?.235:.27,W,28,1,!0),u);if(k.scale.set(1.12,1,.9),k.position.y=1-W/2+.02,k.receiveShadow=!1,T.add(k),V==="coat"){const ee=xi(.016,.5,.02,.006,L);ee.position.set(0,1.25,.121),T.add(ee)}}const X=t.hat??(U%7===3&&!i?8010555:U%7===5&&!i?3099231:void 0);if(X!==void 0&&!t.helmet){const W=a(X,.9),k=kt(new ye(.098,20,12,0,Math.PI*2,0,Math.PI*.52),W);k.scale.set(.9,1.06,1.06),k.position.set(0,.215,-.014),w.add(k);const ee=kt(new me(.09,.012,8,20),W);ee.rotation.x=Math.PI/2,ee.scale.set(.92,1.08,1),ee.position.set(0,.2,-.014),w.add(ee)}const J=I3[s];for(const W of[-1,1]){const k=W===1?J.left:J.right,ee=new Ke;ee.position.set(W*.2,1.46,0),ee.rotation.x=k.shoulder,ee.rotation.z=(k.side??0)*W,T.add(ee),ee.add(kt(W===1?e.upper:Us(e.upper),u));const ae=new Ke;ae.position.y=-.28,ae.rotation.x=k.elbow,ee.add(ae),ae.add(kt(W===1?e.lower:Us(e.lower),u));const ue=kt(new me(.041,.008,6,16),L);ue.rotation.x=Math.PI/2,ue.position.y=-.252,ae.add(ue);const z=new Ke;if(z.position.y=-.27,ae.add(z),z.add(kt(Yl(W,e.hand),m)),s==="read"&&W===1){const j=xi(.2,.03,.27,.008,a(3104138,.8));j.position.set(-.12,-.12,.06),j.rotation.set(-.9,0,.1),z.add(j)}if(s==="write"&&W===-1){const j=kt(new we(.008,.008,.15,6),a(1911629,.4));j.position.set(0,-.12,.03),j.rotation.x=-.9,z.add(j)}if(s==="phone"&&W===1){const j=xi(.075,.016,.15,.006,n.phone);j.position.set(-.05,-.1,.02),j.rotation.set(-.4,0,.1),z.add(j);const Z=kt(new Je(.062,.128),n.screen);Z.rotation.x=-Math.PI/2,Z.position.set(0,.0085,0),j.add(Z)}}for(const W of[-1,1]){const k=new Ke;k.position.set(W*.09,.91,0),k.rotation.x=i?-Math.PI/2+.03:s==="walk"?.42*-W:0,T.add(k),k.add(kt(e.thigh,h));const ee=new Ke;ee.position.y=-.42,ee.rotation.x=i?Math.PI/2-.03:s==="walk"&&W===1?.55:.03,k.add(ee),ee.add(kt(e.shin,h)),ee.add(kt(e.boot,n.shoe))}return Jg(o),o.scale.setScalar(t.scale??1),o}function Ic(t){const n=new Ke;n.name="focused-terrace",n.position.set(0,0,27);const e=Fn(),o=new Dn;o.add(gn(8.8,.2,.03),e.stoneDark,{y:.68}),o.add(gn(8.4,.16,.025),e.stone,{y:.88}),o.add(gn(8,.12,.02),e.stoneWarm,{y:1.04}),[[5.4,6.6,30],[6.7,7.8,38]].forEach(([r,c,l],f)=>{const d=Math.PI*2/l;for(let u=0;u<l;u++){const h=u*d+.007+f%2*d*.5;o.add(Wl(r,c,h,h+d-.014,.026),(u+f)%2?e.paveA:e.paveB,{y:1.16})}}),o.add(new me(5.2,.04,5,64),e.slate,{y:1.18,rx:Math.PI/2}),o.build(n,"focused-terrace",{isLandscapeStage:!0});const s=new ge({color:t,emissive:t,emissiveIntensity:.18,roughness:.5,metalness:.15});s.fog=!1;const a=new G(new me(7.95,.05,6,72),s);return a.rotation.x=Math.PI/2,a.position.y=1.19,a.castShadow=!1,a.userData.noLandscapeShadow=!0,n.add(a),n}function L3(t){const n=new Ke,e=Fn(),o=new Dn;o.add(fe(5.2,.18,3.3,.05),e.stoneWarm,{y:0}),o.add(fe(5,.04,3.1,.02),e.paveA,{y:.1}),o.build(n,"approach-slab",{isLandscapeStage:!0});const i=new ge({color:t,emissive:t,emissiveIntensity:.16,roughness:.5});i.fog=!1;for(const s of[-1,1]){const a=new G(new Ye(.1,.03,2.9),i);a.position.set(s*2.35,.13,0),a.userData.noLandscapeShadow=!0,n.add(a)}return n}const Es=1.16;function U3(t,n,e,o){const i=new Ke;i.name="portal-trim";const s=Fn(),a=new Dn,r=s.stoneDark,c=s.woodDark;for(const f of[-1,1]){const d=f*t/2;a.add(fe(.96,.26,1,.04),r,{x:d,y:Es+.13,z:e}),a.add(fe(.86,.1,.9,.03),r,{x:d,y:Es+.31,z:e}),a.add(fe(.8,.14,.86,.03),c,{x:d,y:n-.38,z:e});const u=new Mn;u.moveTo(0,0),u.lineTo(.95,0),u.lineTo(0,-.95),u.closePath();const h=new Cn(u,{depth:.14,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});h.translate(0,0,-.07),a.add(h,c,{x:d-f*.26,y:n-.25,z:e,sx:-f});for(const m of[-.33,.33])a.add(fe(.06,(n-Es)*.86,.04,.01),r,{x:d,y:(n+Es)/2,z:e+m})}a.add(fe(t+1.1,.14,.78,.035),c,{y:n+.32,z:e}),a.add(fe(t-.3,.08,.7,.02),c,{y:n-.28,z:e});const l=Math.round(t/.9);for(let f=0;f<=l;f++)a.add(tt(.035,.035,.05,8),s.brass,{x:-t/2+f*t/l,y:n,z:e-.33,rx:Math.PI/2});for(const f of[-t/4,t/4])a.add(It([f,n-.3,e-.34],[f,n-.8,e-.34],.015,5),s.steel),a.add(new ye(.06,8,6),s.lampGlass,{x:f,y:n-.86,z:e-.34});return a.build(i,"portal-trim",{isLandscapeStage:!0}),i}function N3(t,n,e,o,i){const s=new Ke;s.name="sign-frame";const a=Fn(),r=new Dn,c=.16;r.add(fe(t+c*2,c,.34,.04),a.woodDark,{x:e,y:o+n/2+c/2,z:i}),r.add(fe(t+c*2,c,.34,.04),a.woodDark,{x:e,y:o-n/2-c/2,z:i});for(const l of[-1,1])r.add(fe(c,n,.34,.04),a.woodDark,{x:e+l*(t/2+c/2),y:o,z:i});for(const l of[-t/3,0,t/3])r.add(It([l+e,o+n/2+c,i-.14],[l+e,o+n/2+.5,i-.34],.02,5),a.brass),r.add(new gt(.17,.2,10),a.brass,{x:l+e,y:o+n/2+.5,z:i-.4,rx:.5});return r.build(s,"sign-frame",{isLandscapeStage:!0}),s}function xr(t){const n=St.clamp(t,0,1);return .025+.02*Math.sin(n*Math.PI)+.006*n}function k3(t,n=10){const e=new Mn,o=s=>t*(.004+s*.201);e.moveTo(o(0),.014),e.lineTo(o(1),.014);for(let s=n;s>=0;s--){const a=s/n;e.lineTo(o(a),xr(a))}e.closePath();const i=new Cn(e,{depth:.274,steps:1,bevelEnabled:!1,curveSegments:1});return i.translate(0,0,-.137),i}function F3(t){const n=[],e=[];for(let s=0;s<10;s++){const a=-.108+s*.022,r=s===0?.68:s===5||s===9?.58:.86+s%3*.025,c=s===0?.004:.0018,l=s===0?2:5+s%2,f=.023,d=(r-.13-f*(l-1))/l;for(let u=0;u<l;u++){const h=n.length/3,m=.13+u*(d+f);for(let _=0;_<=2;_++){const p=m+d*_/2,g=t*(.004+p*.201),x=xr(p)+.001;if(n.push(g,x,a,g,x,a+c),_===2)continue;const M=h+_*2,S=[M,M+1,M+2,M+1,M+3,M+2];e.push(...t===1?S:[M,M+2,M+1,M+1,M+2,M+3])}}}const i=new sn;return i.setAttribute("position",new Un(n,3)),i.setIndex(e),i.computeVertexNormals(),i}function O3(){const t=[],n=[],e=xr(.5771144278606964)+.0018;for(let i=0;i<=10;i++){const s=.065+i*.0115,a=St.clamp((s-.137)/.043,0,1),r=e-a*a*.032;if(t.push(.114,r,s,.126,r,s),i<10){const c=i*2;n.push(c,c+2,c+1,c+1,c+2,c+3)}}const o=new sn;return o.setAttribute("position",new Un(t,3)),o.setIndex(n),o.computeVertexNormals(),o}function G3(t,n=.055){const e=new Mn;e.absarc(0,0,t*1.05,0,Math.PI*2,!1);const o=new hl;o.absarc(0,0,t*.86,0,Math.PI*2,!0),e.holes.push(o);const i=new Cn(e,{depth:n,bevelEnabled:!1,steps:1,curveSegments:16});return i.rotateX(-Math.PI/2),i}function B3(){const t=[0,0,0],n=8;for(let i=0;i<n;i++){const s=i/n*Math.PI*2,a=.55+Math.cos(s)*.55;t.push(Math.sin(s)*.32,a*a*.2,a)}const e=[];for(let i=0;i<n;i++)e.push(0,i+1,(i+1)%n+1);const o=new sn;return o.setAttribute("position",new Un(t,3)),o.setIndex(e),o.computeVertexNormals(),o}function z3(t="high"){const n=(o,i=.85,s=.02,a={})=>{const r=new ge({color:o,roughness:i,metalness:s,...a});return r.fog=!1,r},e=[10173754,3104138,4160079,13081146,6965898,14209208,8018490,2964038];return{detail:t,kit:new Dn,m:Fn(),p:{books:e.map(o=>n(o,.82)),fabricRed:n(11553344,.95,0,{side:$e}),fabricBlue:n(3891087,.95,0,{side:$e}),fabricGreen:n(5077589,.95,0,{side:$e}),fabricGrey:n(8225932,.95,0,{side:$e}),fabricCream:n(15261382,.95,0,{side:$e}),screenOn:n(8049872,.3,.1,{emissive:2071200,emissiveIntensity:.7}),screenOff:n(1317150,.2,.4),boardGreen:n(3099199,.9),boardWhite:n(15790056,.6),ceramic:n(15854818,.35),leather:n(5913128,.7,.05),plasticDark:n(2106923,.45,.2),printInk:n(4278605,.98,0),water:n(3108476,.45,.05,{transparent:!0,opacity:.94,envMapIntensity:.3}),canvasOlive:n(8359786,.95,0,{side:$e})}}}const Lc=new ot,Uc=new ot,H3=new ot,Nc=new co;class _r{constructor(n,e=0,o=0,i=0,s=0,a=1,r=new ot){this.kit=n,this.x=e,this.y=o,this.z=i,this.ry=s,this.s=a,this.base=r,this.base=new ot().makeTranslation(e,o,i).multiply(new ot().makeRotationY(s)).multiply(new ot().makeScale(a,a,a))}child(n,e,o,i=0){const s=new _r(this.kit,0,0,0,0,1);return s.base=this.base.clone().multiply(Lc.makeTranslation(n,e,o)).multiply(Uc.makeRotationY(i)),s}put(n,e,o=0,i=0,s=0,a=0,r=0,c=0,l=1,f=1,d=1){Nc.set(a,r,c);const u=this.base.clone().multiply(Lc.makeTranslation(o,i,s)).multiply(Uc.makeRotationFromEuler(Nc)).multiply(H3.makeScale(l,f,d));this.kit.addMatrix(n,e,u)}box(n,e,o,i,s,a,r,c=.02,l=0,f=0,d=0){this.put(fe(e,o,i,c),n,s,a+o/2,r,l,f,d)}cyl(n,e,o,i,s,a,r,c=20){this.put(tt(e,o,i,c),n,s,a+i/2,r)}strut(n,e,o,i,s=6){this.put(It(e,o,i,s),n)}ball(n,e,o,i,s,a=1,r=1,c=1){this.put(new ye(e,14,10),n,o,i,s,0,0,0,a,r,c)}}function Qt(t,n,e=1.8){const{m:o}=t;for(let i=0;i<4;i++)n.box(o.wood,e,.035,.085,0,.44,-.18+i*.1,.008);for(let i=0;i<3;i++)n.box(o.wood,e,.08,.03,0,.62+i*.12,-.27-i*.02,.008,-.12);for(const i of[-1,1]){const s=i*(e-.12)/2;for(const r of[-.23,.19])n.box(o.darkSteel,.1,.035,.13,s,0,r,.006),n.strut(o.darkSteel,[s,.035,r],[s,.435,r*.78],.026,8);n.strut(o.darkSteel,[s,.425,-.28],[s,.425,.23],.027,8),n.strut(o.darkSteel,[s,.4,-.27],[s,.96,-.35],.024,8);const a=new Nn([new Y(s,.58,.2),new Y(s,.65,.13),new Y(s,.66,-.14),new Y(s,.63,-.29)]);if(n.put(new Bn(a,t.detail==="high"?12:6,.024,6,!1),o.darkSteel),n.strut(o.darkSteel,[s,.45,.18],[s,.61,.18],.02,6),t.detail==="high"){for(let r=0;r<4;r++)n.cyl(o.steel,.008,.008,.004,s,.476,-.18+r*.1,6);for(let r=0;r<3;r++)n.put(tt(.008,.008,.004,6),o.steel,s,.66+r*.12,-.248-r*.02,Math.PI/2)}}}function Jt(t,n,e=t.m.wood){const{m:o}=t;n.box(e,.42,.04,.42,0,.44,0,.01),n.box(e,.42,.34,.03,0,.5,-.2,.01,-.08);for(const i of[-1,1])for(const s of[-1,1])n.cyl(o.woodDark,.018,.022,.44,i*.18,0,s*.18,8);n.box(o.woodDark,.38,.02,.02,0,.18,.18,.005)}function V3(t,n,e=.46){n.cyl(t.m.wood,.17,.17,.04,0,e-.04,0,20);for(let o=0;o<3;o++){const i=o/3*Math.PI*2;n.strut(t.m.woodDark,[Math.cos(i)*.13,e-.04,Math.sin(i)*.13],[Math.cos(i)*.2,0,Math.sin(i)*.2],.018,6)}}function hn(t,n,e=1.4,o=.8,i=.75,s=t.m.wood){n.box(s,e,.045,o,0,i-.045,0,.012);for(const a of[-1,1])for(const r of[-1,1])n.box(t.m.woodDark,.06,i-.045,.06,a*(e/2-.08),0,r*(o/2-.08),.01);n.box(t.m.woodDark,e-.2,.05,.03,0,i-.13,o/2-.08,.008)}function jo(t,n,e=.6,o=.74){n.cyl(t.m.wood,e,e,.04,0,o-.04,0,36),n.cyl(t.m.woodDark,.05,.07,o-.04,0,0,0,12),n.cyl(t.m.woodDark,.28,.3,.04,0,0,0,20)}function Ui(t,n,e=1.5,o=.75,i=.75){const{m:s}=t;n.box(s.wood,e,.04,o,0,i-.04,0,.012),n.box(s.woodDark,.04,i-.04,o-.06,-e/2+.05,0,0,.008),n.box(s.woodDark,.5,i-.04,o-.06,e/2-.3,0,0,.008);for(let a=0;a<3;a++)n.box(s.wood,.44,.17,.02,e/2-.3,.06+a*.21,o/2-.02,.006),n.box(s.brass,.1,.014,.014,e/2-.3,.14+a*.21,o/2+.005,.004)}function ed(t,n,e=2.2,o=2.4,i=5,s=1){const{m:a,p:r}=t,c=ea(s);n.box(a.woodDark,.05,o,.34,-e/2+.025,0,0,.008),n.box(a.woodDark,.05,o,.34,e/2-.025,0,0,.008),n.box(a.woodDark,e,o,.02,0,0,-.16,.006),n.box(a.wood,e,.05,.36,0,o,0,.01);const l=(o-.1)/i;for(let f=0;f<=i;f++)n.box(a.wood,e-.08,.035,.32,0,.05+f*l,0,.008);for(let f=0;f<i;f++){let d=-e/2+.08;for(;d<e/2-.12;){const u=.03+c()*.035,h=l*(.55+c()*.38);c()>.07&&n.box(r.books[Math.floor(c()*r.books.length)],u,h,.22+c()*.05,d+u/2,.085+f*l,.01,.004,0,0,(c()-.5)*(c()>.9?.4:0)),d+=u+.004}}}function kn(t,n,e=4,o=3){const i=ea(o);let s=0;for(let a=0;a<e;a++){const r=.03+i()*.03,c=t.p.books[Math.floor(i()*t.p.books.length)],l=Math.max(.1,.26-a*.012),f=n.child(0,s,0,(i()-.5)*.4);if(f.box(c,l,.003,.19,0,0,0,.001),f.box(t.m.paper,l-.01,r-.006,.18,.002,.003,0,.001),f.box(c,l,.003,.19,0,r-.003,0,.001),f.box(c,.006,r,.19,-l/2+.003,0,0,.001),t.detail==="high"){for(const d of[-.06,.06])f.box(t.m.brass,.001,r*.6,.006,-l/2-6e-4,r*.2,d,0);f.box(t.m.brass,l*.45,8e-4,.035,0,r+2e-4,0,0)}s+=r}}function xn(t,n){for(const e of[-1,1])n.box(t.p.leather,.216,.009,.3,e*.108,.002,0,.003),n.put(k3(e,t.detail==="high"?10:4),t.m.paper),t.detail==="high"&&n.put(F3(e),t.p.printInk);n.strut(t.p.leather,[0,.015,-.15],[0,.015,.15],.008,8),t.detail==="high"&&n.put(O3(),t.p.fabricRed)}function W3(t,n,e=.62,o=.36,i=t.p.screenOn){n.cyl(t.p.plasticDark,.1,.13,.015,0,0,0,16),n.box(t.p.plasticDark,.04,.2,.03,0,.01,0,.006),n.box(t.p.plasticDark,e+.03,o+.03,.03,0,.2,0,.01),n.put(new Je(e,o),i,0,.2+(o+.03)/2,.0166)}function js(t,n,e=t.p.screenOn){n.box(t.m.steel,.34,.015,.23,0,0,0,.005),n.box(t.p.plasticDark,.292,.0015,.101,0,.0152,-.026,.001),n.box(t.p.plasticDark,.098,.001,.048,0,.0153,.073,.001),n.box(t.m.steel,.094,.001,.044,0,.0164,.073,.001),n.strut(t.m.darkSteel,[-.115,.018,-.103],[.115,.018,-.103],.008,8);const o=.3,i=Math.cos(o),s=Math.sin(o),a=(r,c,l,f,d)=>n.put(r,c,l,.018+f*i+d*s,-.103-f*s+d*i,-o);if(a(fe(.34,.22,.009,.004),t.m.steel,0,.11,0),a(new Je(.315,.193),t.p.plasticDark,0,.11,.005),a(new Je(.295,.169),e,0,.11,.0056),t.detail==="high"){for(let r=0;r<4;r++)for(let c=0;c<10;c++)n.box(t.m.darkSteel,.023,.0018,.017,-.125+c*.0278,.0168,-.063+r*.023,5e-4);n.box(t.m.darkSteel,.11,.0018,.013,0,.0168,.026,5e-4);for(const r of[-.157,.157])for(let c=0;c<6;c++)n.box(t.p.plasticDark,.003,6e-4,.01,r,.0155,-.067+c*.016,0);a(new Je(.258,.009),t.m.paper,0,.174,.0059);for(let r=0;r<4;r++)a(new Je(.16-r*.018,.003),t.m.paper,-.024,.145-r*.02,.0059);a(new Je(.003,.003),t.p.plasticDark,0,.212,.0058)}}function Mr(t,n,e=t.p.screenOn){n.box(t.p.plasticDark,.07,.008,.145,0,0,0,.004),n.put(new Je(.062,.13),e,0,.0085,0,-Math.PI/2)}function td(t,n){n.box(t.m.woodDark,.6,1,.45,0,0,0,.015),n.box(t.m.wood,.7,.04,.55,0,1,0,.01,-.28),n.box(t.m.brass,.4,.012,.012,0,.98,.22,.003)}function Zs(t,n,e=2.4,o=1.2,i=t.p.boardGreen){n.box(t.m.woodDark,e+.12,o+.12,.05,0,0,0,.012),n.box(i,e,o,.02,0,.06,.03,.006),n.box(t.m.wood,e*.7,.04,.08,0,.04,.07,.008)}function ft(t,n,e=.5,o=5){const i=ea(o);n.put(new we(e,e*1.04,.38,24,1,!0),t.m.stoneDark,0,.19,0),n.put(G3(e,.08),t.m.stone,0,.355,0),n.cyl(t.m.soil,e*.88,e*.88,.045,0,.31,0,24);for(let a=0;a<2;a++){const r=i()*Math.PI*2,c=i()*e*.5;n.ball(i()>.5?t.m.leaf:t.m.leafLight,e*(.16+i()*.06),Math.cos(r)*c,.5+i()*.06,Math.sin(r)*c,1,.85,1)}const s=qs();for(const a of Em(o*13+5,e*.62,t.detail==="high"?96:30)){const r=a.attributes.color;for(let c=0;c<r.count;c++)r.setXYZ(c,r.getX(c)*.82,r.getY(c)*.82,r.getZ(c)*.82);n.put(a,s,0,.66,0)}for(let a=0;a<(t.detail==="high"?7:3);a++){const r=i()*Math.PI*2,c=Math.sqrt(i())*e*.6,l=Math.cos(r)*c,f=Math.sin(r)*c,d=.78+i()*.22,u=e*(.12+i()*.05);n.strut(t.m.leaf,[l*.85,.35,f*.85],[l,d,f],.008,5);const h=n.child(l,d,f,r),m=t.detail==="high"?6:4;for(let _=0;_<m;_++)h.put(B3(),a%2?t.p.fabricCream:t.p.fabricRed,0,0,0,0,_/m*Math.PI*2,0,u,u,u);h.put(new ye(u*.25,8,5),t.p.books[3],0,.008,0,0,0,0,1,.55,1)}}function ie(t,n,e=3.4){n.cyl(t.m.slate,.14,.18,.18,0,0,0,10),n.cyl(t.m.slate,.045,.065,e,0,.18,0,8),n.strut(t.m.slate,[0,e+.18,0],[.45,e+.3,0],.03,5),n.put(new gt(.26,.2,8),t.m.slate,.5,e+.34),n.cyl(t.m.lampGlass,.12,.18,.32,.5,e-.02,0,8)}function Yo(t,n,e,o=1,i=t.m.steel){const s=Math.max(2,Math.round(e/1));for(let a=0;a<=s;a++)n.cyl(i,.02,.025,o,a/s*e,0,0,8);n.box(i,e,.04,.04,e/2,o,0,.01),n.box(i,e,.025,.025,e/2,o*.5,0,.006)}function nd(t,n,e=2,o=4,i=.17,s=.32){for(let a=0;a<o;a++)n.box(t.m.stoneWarm,e,i*(a+1),s,0,0,a*s,.015)}function Mo(t,n,e=.6,o=.45,i=.5){n.box(t.m.wood,e,o,i,0,0,0,.012);for(let s=1;s<3;s++)n.box(t.m.woodDark,e+.004,.025,i+.004,0,o*s/3,0,.004);for(const s of[-1,1])n.box(t.m.woodDark,.04,o+.004,i+.004,s*(e/2-.03),0,0,.004)}function ss(t,n,e=.28,o=.7){n.put(tt(e*.92,e*.92,o,20),t.m.woodDark,0,o/2,0),n.put(tt(e,e,o*.5,20),t.m.woodDark,0,o/2,0);for(const i of[.14,.4,.6])n.put(new me(e*.98,.012,5,24),t.m.darkSteel,0,i*(o/.74),0,Math.PI/2)}function Ni(t,n,e=.5,o=.7,i=.25,s=t.p.fabricBlue){n.box(s,e,o,i,0,.05,0,.04),n.box(t.m.darkSteel,.03,o*.5,.03,0,o+.05,-i*.2,.005),n.box(t.m.darkSteel,e*.5,.025,.03,0,o+.28,-i*.2,.005);for(const a of[-1,1])n.cyl(t.p.plasticDark,.025,.025,.05,a*(e/2-.06),0,0,10)}function X3(t,n,e=.6,o=.45,i=t.p.fabricCream){n.box(t.m.woodDark,e+.06,o+.06,.03,0,0,0,.008),n.put(new Je(e,o),i,0,o/2+.03,.017)}function br(t,n,e=.2){n.cyl(t.m.brass,.1,.12,.03,0,0,0,16),n.cyl(t.m.brass,.015,.015,.2,0,.03,0,8),n.put(new ye(e,24,16),t.p.fabricBlue,0,.3+e*.5,0,.4),n.put(new me(e*1.08,.01,6,36,Math.PI*1.5),t.m.brass,0,.3+e*.5,0,.4,Math.PI/2)}function wo(t,n){n.cyl(t.p.ceramic,.055,.055,.008,0,0,0,16),n.cyl(t.p.ceramic,.04,.03,.065,0,.008,0,16),n.put(new me(.02,.006,5,10,Math.PI),t.p.ceramic,.05,.04,0,0,0,-Math.PI/2)}function Qs(t,n,e=2.4,o=1,i=8,s=t.p.fabricRed,a=t.p.fabricCream){for(let r=0;r<i;r++)n.box(r%2?a:s,e/i,.015,o,-e/2+(r+.5)*(e/i),2.3,o/2,.004,.32);n.box(t.m.woodDark,e+.06,.05,.05,0,2.62,.02,.01);for(const r of[-1,1])n.cyl(t.m.woodDark,.025,.03,2.4,r*(e/2),0,o-.05,8)}function od(t,n,e=1.4,o=t.m.terracottaRoof){for(const[i,s]of[[-1,-1],[1,-1],[-1,1],[1,1]])n.cyl(t.m.woodDark,.06,.07,2.4,i*e,0,s*e,10);n.box(t.m.woodDark,e*2+.2,.1,.1,0,2.4,-e,.01),n.box(t.m.woodDark,e*2+.2,.1,.1,0,2.4,e,.01),n.box(t.m.woodDark,.1,.1,e*2+.2,-e,2.4,0,.01),n.box(t.m.woodDark,.1,.1,e*2+.2,e,2.4,0,.01),n.put(new gt(e*1.7,1,4),o,0,3,0,0,Math.PI/4),n.ball(t.m.brass,.07,0,3.55,0)}const id=.045;function q3(t,n){const e=Math.min(1.65,n-.35),o=Math.min(.56,Math.max(.2,(t-1.25)/2)),i=Math.min(1.2,n-.8),s=Math.min(.64,n-i-.16),a=.025,r=.025,c=.05,l=Math.max(a,r,id),f=t/2-c-l-o/2;return[{kind:"door",x:0,y:.3,width:Math.min(.82,t-.08),height:e},{kind:"window",x:-f,y:i,width:o,height:s,sillOverhang:a,lintelOverhang:r},{kind:"window",x:f,y:i,width:o,height:s,curtain:!0,sillOverhang:a,lintelOverhang:r}]}function Y3(t,n,e,o,i,s,a,r){const c=[...new Set([-e/2,e/2,...r.flatMap(l=>[l.x-l.width/2,l.x+l.width/2])])].sort((l,f)=>l-f);for(let l=0;l<c.length-1;l++){const f=c[l],d=c[l+1];if(d-f<.006)continue;const u=(f+d)/2,h=r.filter(_=>u>_.x-_.width/2&&u<_.x+_.width/2).sort((_,p)=>_.y-p.y);let m=s;for(const _ of h){const p=St.clamp(_.y,s,o),g=St.clamp(_.y+_.height,s,o);p-m>.006&&t.box(n,d-f,p-m,a,u,m,i-a/2,0),m=Math.max(m,g)}o-m>.006&&t.box(n,d-f,o-m,a,u,m,i-a/2,0)}}function $o(t,n,e=2.4,o=2.6,i=2.2,s=t.m.terracottaRoof,a=t.m.paper){const{m:r}=t,c=.3,l=Math.max(.1,o-c),f=Math.min(.16,i*.12),d=i/2,u=q3(e,o),h=u[0],m=u.slice(1);n.box(r.stoneDark,e+.1,c,i+.1,0,0,0,.02),n.box(a,f,l,i,-e/2+f/2,c,0,0),n.box(a,f,l,i,e/2-f/2,c,0,0),n.box(a,e,l,f,0,c,-i/2+f/2,0),Y3(n,a,e,o,d,c,f,u),n.put(Yn(e+.5,.95+e*.12,i+.5),s,0,o,0),n.put(Yn(e+.3,.8+e*.12,i+.3),r.woodDark,0,o-.04,0,0,0,0,1,.97,.99);const _=.06,p=d+.008,g=h.x-h.width/2,x=h.x+h.width/2,M=d-f/2+.01,S=Math.max(.2,h.height-.08),T=h.y+S;n.box(r.woodDark,_,S,f+.04,g+_/2,h.y,M,.008),n.box(r.woodDark,_,S,f+.04,x-_/2,h.y,M,.008),n.box(r.woodDark,h.width,.08,f+.04,h.x,T,M,.008);const w=Math.max(.48,h.width-_*2-.08),y=h.height-.11;if(n.box(r.wood,w,y,.055,h.x,h.y,p,.008),t.detail==="high"){for(const v of[h.y+.56,h.y+1.12])v<h.y+y-.04&&n.box(r.woodDark,w-.08,.025,.012,h.x,v,p+.034,.003);for(const v of[-.14,0,.14])n.box(r.woodDark,.012,y-.12,.012,h.x+v,h.y+.06,p+.034,.002);for(const v of[h.y+.16,h.y+h.height-.22])n.box(r.brass,.035,.075,.012,g+_/2,v,p+.038,.003)}n.box(r.stoneWarm,Math.max(.9,h.width+.38),.16,.45,0,0,d+.22,.02),n.box(r.brass,.05,.05,.04,h.x+Math.min(.24,w*.4),h.y+Math.min(.75,y*.49),p+.04,.008);for(const v of m){const E=n.child(v.x,v.y,d+.006);Sr(t,E,v.width,v.height,{cols:t.detail==="high"?2:1,rows:t.detail==="high"?2:1,curtain:t.detail==="high"&&v.curtain,lit:!0,frame:r.woodDark,recess:f+.03,sillOverhang:v.sillOverhang,lintelOverhang:v.lintelOverhang});const b=f,A=d-b/2;for(const R of[-1,1])n.box(r.woodDark,.025,v.height,b,v.x+R*v.width/2,v.y,A,.003)}n.box(r.stoneDark,.32,1,.32,e/2-.45,o+.15,-i/4,.02)}function sd(t,n,e=2.4,o=1,i=1){n.put(tt(e+.28,e+.34,.3,40),t.m.stoneDark,0,.15,0,0,0,0,o,1,i),n.put(tt(e,e,.2,40),t.p.water,0,.27,0,0,0,0,o,1,i)}function ad(t,n,e=3.2,o=1,i=t.p.fabricCream,s=t.m.woodDark){const{m:a}=t,r=e*.3,c=e*.22,l=new Mn;l.moveTo(-e/2,c),l.lineTo(-e*.36,0),l.lineTo(e*.3,0),l.quadraticCurveTo(e*.5,c*.25,e/2+.12,c*.92),l.lineTo(-e/2,c);const f=new Cn(l,{depth:r,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});f.translate(0,0,-r/2),n.put(f,s,0,.05,0),n.box(t.p.fabricRed,e*.98,.05,.04,0,c*.95,r/2+.02,.01),n.box(t.p.fabricRed,e*.98,.05,.04,0,c*.95,-r/2-.02,.01),n.box(a.wood,e*.9,.04,r*.92,0,c*.9,0,.01);for(let u=0;u<9;u++)for(const h of[-1,1])n.box(a.woodDark,.02,c*.22,.02,-e*.42+u*e*.1,c*.95,h*(r/2-.02),.004);n.box(a.woodDark,e*.22,c*.55,r*.7,-e*.3,c*.92,0,.02),n.box(a.slate,e*.1,.1,.02,-e*.3,c*1.25,r*.36,.005),n.box(a.woodDark,.02,c*.6,r*.12,-e/2-.02,c*.2,0,.004),n.strut(a.woodDark,[-e/2-.02,c*.75,0],[-e/2+.2,c*1,0],.012,5),n.strut(a.woodDark,[e/2-.1,c*.95,0],[e/2+.28,c*1.35,0],.02,6),n.put(new me(.05,.01,6,14,Math.PI),a.darkSteel,e*.36,c*.9,r/2+.05,0,0,Math.PI),n.strut(a.darkSteel,[e*.36,c*.9,r/2+.05],[e*.36,c*.9+.14,r/2+.05],.008,4),n.cyl(a.wood,.07,.07,.04,e*.2,c*.93,r*.25,12);const d=e*.5/Math.max(1,o);for(let u=0;u<o;u++){const h=e*.12-u*d*.9,m=e*(.95-u*.12),_=c*.92;n.cyl(a.woodDark,.022,.04,m,h,_,0,10);const p=_+m*.92,g=_+m*.3,x=e*.34;n.strut(a.woodDark,[h,p,-x/2],[h,p,x/2],.014,6),n.strut(a.woodDark,[h,g,-x/2*1.1],[h,g,x/2*1.1],.016,6);const M=new Je(1,1,12,10),S=M.attributes.position,T=p-g;for(let w=0;w<S.count;w++){const y=S.getX(w)+.5,v=S.getY(w)+.5,E=x/2*(.78+.22*(1-v)),b=(y-.5)*2*E,A=g+v*T,R=Math.sin(y*Math.PI)*Math.sin(v*Math.PI*.9+.2)*.1*e*.3;S.setXYZ(w,R,A,b)}M.computeVertexNormals(),n.put(M,i,h,0,0);for(let w=1;w<5;w++)n.strut(a.woodDark,[h+.012,g+T*w/5,-x/2*.86],[h+.012,g+T*w/5,x/2*.86],.004,4);n.cyl(a.woodDark,.07,.06,.04,h,p+.02,0,10),n.strut(a.steel,[h,_+m,0],[e/2+.05,c*.9,0],.008,4),n.strut(a.steel,[h,_+m,0],[-e/2,c*1,0],.008,4);for(const w of[-1,1]){n.strut(a.steel,[h,p,0],[h,c*.95,w*(r/2+.03)],.006,4);for(let y=1;y<6;y++){const v=y/6;n.strut(a.steel,[h,p-(p-c*.95)*v,w*(r/2+.03)*v],[h+.001,p-(p-c*.95)*v,w*(r/2+.03)*v+0],.004,3)}}u===0&&n.box(t.p.fabricRed,.22,.14,.01,h+.11,_+m+.06,0,.003)}}function K3(t,n,e=4.4,o=3.4,i=2.6,s=t.p.canvasOlive){for(const a of[-1,1])for(const r of[-1,1])n.cyl(t.m.woodDark,.05,.06,i,a*(e/2-.1),0,r*(o/2-.1),10);for(const a of[-1,1])n.box(s,e+.4,.04,o*.62,0,i+.28,a*o*.27,.01,-a*.22);n.box(t.m.woodDark,e+.1,.06,.06,0,i+.5,0,.01),n.box(s,e+.3,.45,.03,0,i-.4,o/2+.02,.01)}function as(t,n,e,o=2.6){n.cyl(t.m.woodDark,.06,.085,o,0,0,0,10),n.cyl(t.m.stoneDark,.2,.24,.18,0,0,0,12),e.forEach((i,s)=>{const a=o-.3-s*.34,r=i.len??.95,c=n.child(0,a,0,i.yaw);c.box(i.tone??t.m.wood,r,.24,.045,r/2-.05,0,0,.012),c.put(new gt(.16,.2,3),i.tone??t.m.wood,r+.04,.12,0,0,0,-Math.PI/2,1,1,.3),c.box(t.m.paper,r*.6,.05,.01,r/2-.05,.1,.03,.003)}),n.ball(t.m.brass,.07,0,o+.05,0)}function kc(t,n,e=t.p.fabricRed){const{m:o}=t;for(const i of[-.55,.55]){n.put(new me(.33,.018,8,28),o.darkSteel,i,.36,0);for(let s=0;s<6;s++){const a=s/6*Math.PI;n.strut(o.steel,[i+Math.cos(a)*.32,.36+Math.sin(a)*.32,0],[i-Math.cos(a)*.32,.36-Math.sin(a)*.32,0],.004,3)}n.cyl(o.steel,.03,.03,.05,i,.36,0,8)}n.strut(e,[-.55,.36,0],[-.1,.38,0],.016,6),n.strut(e,[-.1,.38,0],[.4,.74,0],.016,6),n.strut(e,[-.55,.36,0],[-.1,.75,0],.016,6),n.strut(e,[-.1,.75,0],[.4,.74,0],.016,6),n.strut(e,[.4,.74,0],[.55,.36,0],.016,6),n.box(t.p.leather,.22,.04,.1,-.12,.8,0,.015),n.strut(o.darkSteel,[.4,.74,0],[.38,.95,0],.012,5),n.box(o.darkSteel,.03,.03,.4,.38,.95,0,.008)}function Ja(t,n,e=6,o=.72){const i=Math.floor(e/.42);for(let s=0;s<=i;s++)n.box(t.m.woodDark,.2,.1,o+.7,s/i*e,0,0,.02);for(const s of[-1,1])n.box(t.m.steel,e,.07,.07,e/2,.1,s*o/2,.012)}function $3(t,n,e=.55,o=t.p.fabricRed){n.cyl(t.m.darkSteel,.012,.012,1.5,0,0,0,6),n.put(new gt(e,.28,16,1,!0),o,0,1.58,0),n.ball(t.m.brass,.025,0,1.76,0)}function Js(t,n,e=2.4){for(const s of[-1,1])n.strut(t.m.wood,[s*.22,0,.3],[s*.22,e,.3-e*.2],.025,6);const i=Math.floor(e/.3);for(let s=1;s<=i;s++){const a=s*.3/e;n.box(t.m.woodDark,.44,.03,.08,0,a*e-.015,.3-a*e*.2,.008)}for(const s of[-1,1])n.cyl(t.p.plasticDark,.03,.03,.04,s*.22,0,.3,8)}function j3(t,n,e=2){const o=ea(e);n.box(t.m.wood,1.2,.05,.5,0,.35,0,.012),n.box(t.m.woodDark,1.2,.3,.04,0,.35,-.23,.01);for(const i of[-1,1])n.box(t.m.woodDark,.05,.8,.5,i*.58,.35,0,.01);n.box(t.m.woodDark,1.2,.04,.4,0,.7,0,.01,-.2);for(const i of[-1,1])for(const s of[-1,1])n.put(new me(.1,.03,8,14),t.m.darkSteel,i*.5,.12,s*.2,0,Math.PI/2);for(let i=0;i<2;i++){let s=-.52;for(;s<.5;){const a=.04+o()*.03;n.box(t.p.books[Math.floor(o()*t.p.books.length)],a,.18+o()*.1,.22,s+a/2,i===0?.4:.74,-.02,.004,0,0,i===1?-.2:0),s+=a+.004}}}function ea(t){let n=t>>>0;return()=>{n=n+1831565813>>>0;let e=n;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const Fc=new WeakMap;function Sr(t,n,e,o,i={}){const{m:s}=t,a=i.cols??2,r=i.rows??2,c=i.frame??s.woodDark;let l=Fc.get(t);l||(l={glow:new ge({color:16769704,emissive:16757850,emissiveIntensity:.55,roughness:.7}),curtain:new ge({color:14272680,roughness:.95,side:$e})},Fc.set(t,l));const f=id;i.lit!==!1&&n.box(l.glow,e-f,o-f,.01,0,f/2,-(i.recess??.02),.002),n.put(new Je(e-f*1.4,o-f*1.4),s.glass,0,o/2,.02),n.box(c,e+f*2,f,.08,0,-f,0,.006),n.box(c,e+f*2,f,.08,0,o,0,.006),n.box(c,f,o+f*2,.08,-e/2-f/2,-f,0,.006),n.box(c,f,o+f*2,.08,e/2+f/2,-f,0,.006);for(let h=1;h<a;h++)n.box(c,.022,o,.05,-e/2+e*h/a,0,.03,.003);for(let h=1;h<r;h++)n.box(c,e,.022,.05,0,o*h/r,.03,.003);const d=Math.max(0,i.sillOverhang??.11),u=Math.max(0,i.lintelOverhang??.1);if(n.box(s.stoneWarm,e+d*2,.05,.16,0,-f-.05,.05,.01),n.box(s.stoneDark,e+u*2,.06,.1,0,o+f,.03,.01),i.curtain){for(const h of[-1,1]){const m=new Je(e*.3,o*.92,5,1),_=m.attributes.position;for(let p=0;p<_.count;p++)_.setZ(p,Math.sin(_.getX(p)*40)*.012);m.computeVertexNormals(),n.put(m,l.curtain,h*e*.33,o*.5,.06)}n.box(s.brass,e+.08,.015,.015,0,o-.03,.07,.004)}}const Pe=1.5,nt=1.16,rd=27;function Re(t){const n=z3(t.detail),e=new _r(n.kit,0,nt,rd,Math.PI,Pe);return{ctx:t,k:n,f:e}}function Et(t,n){return[-t*Pe,rd-n*Pe]}function le(t,n,e,o,i,s=0){const a=Rs({scale:Pe,...n}),[r,c]=Et(e,i);return a.position.set(r,nt+o*Pe,c),a.rotation.y=Math.PI+s,t.root.add(a),a}function Ne(t,n,e,o,i,s=.12){const a=new G(new ye(s*Pe,20,14),n),[r,c]=Et(e,i);return a.position.set(r,nt+o*Pe,c),a.userData.isLandscapeBeacon=!0,t.root.add(a),a}function Ns(t,n,e,o,i,s,a,r=0,c=!0){const l=new G(new Ye(s*Pe,a*Pe,.04*Pe),n),[f,d]=Et(e,i);return l.position.set(f,nt+o*Pe,d),l.rotation.y=Math.PI+r,c&&(l.userData.isLandscapeBeacon=!0),t.root.add(l),l}function Ce(t,n){t.k.kit.build(t.ctx.root,n,{isLandscapeStage:!0})}function fo(t,n={}){const e=document.createElement("canvas");e.width=n.width??1200,e.height=n.height??320;const o=e.getContext("2d");if(!o)return;o.fillStyle=n.background??"#263d3b",o.fillRect(0,0,e.width,e.height),o.strokeStyle=n.border??"#d6c49d",o.lineWidth=8,o.strokeRect(14,14,e.width-28,e.height-28),o.textAlign="center",o.textBaseline="middle";for(const s of t)o.font=s.font,o.fillStyle=s.color??"#f6eedb",o.fillText(s.text,e.width/2,s.y);const i=new Wt(e);return i.colorSpace=yt,i.anisotropy=4,i}function rn(t,n,e,o,i,s,a,r=0,c=0){if(!n)return;const l=new G(new Je(s*Pe,a*Pe),new wt({map:n,side:$e,toneMapped:!1})),[f,d]=Et(e,i);l.position.set(f,nt+o*Pe,d),l.rotation.set(c,Math.PI+r,0),l.userData.isLandscapeStage=!0,l.userData.noLandscapeShadow=!0,t.root.add(l)}function cd(t){const n=document.createElement("canvas");n.width=1400,n.height=740;const e=n.getContext("2d");if(!e)return;e.fillStyle="#b9d3d6",e.fillRect(0,0,n.width,n.height),e.strokeStyle="rgba(60,100,120,0.18)",e.lineWidth=1;for(let i=0;i<28;i++)e.beginPath(),e.moveTo(i*52,0),e.lineTo(i*52,n.height),e.stroke();for(let i=0;i<15;i++)e.beginPath(),e.moveTo(0,i*52),e.lineTo(n.width,i*52),e.stroke();e.fillStyle="#d7c9a4";for(const[i,s,a,r]of[[230,250,210,150],[1120,200,240,130],[700,640,330,90],[1150,560,150,110]])e.beginPath(),e.ellipse(i,s,a,r,.2,0,Math.PI*2),e.fill();e.strokeStyle="#7a6b45",e.lineWidth=3,e.setLineDash([]),e.stroke(),e.strokeStyle="#b8473f",e.lineWidth=6,e.setLineDash([18,12]),e.beginPath(),t.forEach(([i,s],a)=>a===0?e.moveTo(i*n.width,s*n.height):e.lineTo(i*n.width,s*n.height)),e.stroke(),e.setLineDash([]),e.fillStyle="#3a2d1a",e.font="bold 34px Georgia, serif",e.fillText("N",1310,90),e.beginPath(),e.moveTo(1322,100),e.lineTo(1312,150),e.lineTo(1332,150),e.fill();const o=new Wt(n);return o.colorSpace=yt,o.anisotropy=4,o}const ui=(t,n=.8)=>{const e=new ge({color:t,emissive:t,emissiveIntensity:n,roughness:.35,metalness:.1});return e.fog=!1,e},es=(t,n=.85,e=.02,o={})=>{const i=new ge({color:t,roughness:n,metalness:e});return Object.assign(i.userData,o),i.fog=!1,i};function ld(t,n,e,o,i,s,a){const{k:r,f:c}=t,l=c.child(n,0,e,s);l.box(r.m.slate,.8,.12,.55,0,0,0,.03),l.box(r.m.darkSteel,.12,i*.45,.1,0,.12,0,.01);const f=.12+i*.45,d=i*.62;l.box(r.p.plasticDark,o,d,.1,0,f,0,.08),l.put(new Je(o-.12,d-.14),r.p.screenOn,0,f+d/2,.052),l.box(r.p.plasticDark,.22,.03,.012,0,f+d-.07,.055,.005);for(let u=0;u<4;u++){const h=(o-.42)*(.55+.4*Math.abs(Math.sin(a+u*1.7))),m=f+d-.3-u*(d-.5)/4;l.cyl(r.m.paper,.06,.06,.012,-o/2+.17,m,.056,14),l.box(r.m.paper,h,.045,.012,-o/2+.3+h/2,m+.02,.056,.008),l.box(r.m.stoneWarm,h*.6,.03,.012,-o/2+.3+h*.3,m-.04,.056,.006)}return{badgeAt:[n+o*.42,f+d-.1,e+.1]}}const Z3=t=>{const n=Re(t),{k:e,f:o}=n,i=ui(14701917,1);[{x:-2.7,z:-.8,w:1,h:2.1,yaw:-.3},{x:0,z:-1.7,w:1.3,h:2.6,yaw:0},{x:2.7,z:-.8,w:1.05,h:2.2,yaw:.3}].forEach((a,r)=>{const{badgeAt:c}=ld(n,a.x,a.z,a.w,a.h,a.yaw,r*2.3);Ne(t,i,c[0],c[1],c[2],.1)});for(const[a,r,c,l,f]of[[-1.3,2.5,.4,.55,.22],[1.2,2.1,.2,.5,.22],[.1,3,-.2,.62,.24],[-2,1.9,1,.45,.2],[2.1,2.7,.9,.48,.2]])Ns(t,t.edge,a,r,c,l,f);le(t,{shirt:6982312,hair:2825494,scarf:14256970,pose:"phone",lean:.04},0,0,1.3,0),Qt(e,o.child(-3.9,0,1.6,-.6),1.7),ft(e,o.child(3.8,0,1.6),.55,3),ft(e,o.child(-4.1,0,-1.2),.5,9),ie(e,o.child(4.3,0,-1.6)),ie(e,o.child(-4.6,0,.6));for(let a=0;a<5;a++)o.box(a%2?e.m.paveA:e.m.paveB,.9,.05,.6,0,0,2.2+a*.68,.02);Ce(n,"scene-notification")},Q3=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.1,3.1,.03,0,0,0,40),o.cyl(s.fabricCream,2.7,2.7,.035,0,0,0,40),Ui(e,o.child(0,0,.4,Math.PI),1.7,.8);const a=o.child(0,0,-.55,0);Jt(e,a,i.wood),le(t,{shirt:8229284,hair:2825494,glasses:!0,seated:!0,pose:"write",lean:.14},0,.45,-.55,0),js(e,o.child(-.4,.75,.45,Math.PI)),xn(e,o.child(.25,.75,.45,.2)),wo(e,o.child(.65,.75,.2)),Mr(e,o.child(.72,.75,.6,3.14),e.p.screenOff);const r=o.child(-.75,.75,.15);r.cyl(i.darkSteel,.08,.1,.03,0,0,0,16),r.strut(i.darkSteel,[0,.03,0],[.12,.38,0],.012,6),r.strut(i.darkSteel,[.12,.38,0],[.04,.55,.05],.012,6),r.put(new gt(.1,.12,14,1,!0),i.brass,.04,.56,.05,Math.PI),Ne(t,t.glow,...Bi(-.75+.04,.75+.5,.2),.05);const c=o.child(0,0,-2,0);Zs(e,c,3,1.3,s.boardWhite);for(const[d,u]of[[0,i.copper],[1,i.brass],[2,i.stone]])c.box(u,.7,.55,.012,-.9+d*.9,.5,.065,.01),c.box(i.slate,.5,.04,.012,-.9+d*.9,.35,.07,.004);const l=o.child(-3.2,0,0,.45);l.box(i.steel,.06,.06,2.2,0,0,0,.01),l.box(i.steel,.06,.06,2.2,0,2.2,0,.01);for(const d of[-1.07,0,1.07])l.box(i.steel,.06,2.26,.06,0,0,d,.01);l.put(new Je(2.1,2.1),i.glass,0,1.1,0,0,Math.PI/2);for(const[d,u]of[[0,.9],[1,1.5],[2,2]])l.box(i.stoneDark,.05,.22,.55,-.12,u,-.55+d*.5,.03);const f=o.child(3.2,0,.2,-.3);f.cyl(i.darkSteel,.05,.07,1.9,0,0,0,10),f.cyl(i.slate,.2,.25,.1,0,0,0,16),f.put(new we(.5,.5,.08,36),s.ceramic,0,2.1,0,Math.PI/2),f.put(new me(.52,.045,10,40),i.brass,0,2.1,.04);for(let d=0;d<12;d++){const u=d/12*Math.PI*2;f.box(i.slate,.025,d%3===0?.1:.06,.012,Math.sin(u)*.4,2.1+Math.cos(u)*.4-.04,.05,.003,0,0,-u)}f.box(i.darkSteel,.03,.3,.012,0,2.1,.06,.004),f.box(i.darkSteel,.025,.2,.012,.08,2.1,.065,.004,0,0,-1.2),Ne(t,t.glow,...a5(3.2,2.1,.4),.05),ft(e,o.child(-2.1,0,2.2),.5,4),ft(e,o.child(2.3,0,2.2),.5,7),Ce(n,"scene-study-desk")},J3=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e,a=es(11884380,.7),r=es(4889222,.7);[-2.9,0,2.9].forEach((_,p)=>{const g=o.child(_,0,1.2,0);g.box(i.slate,1.3,.14,.6,0,0,0,.03),g.box(i.darkSteel,.12,.9,.1,0,.14,0,.01),g.box(s.plasticDark,1.25,1.55,.1,0,1,0,.07),g.put(new Je(1.1,1.4),p===1?s.screenOn:ui(5940936,.45),0,1.78,.052);const x=g.child(0,1.7,.06);p===0?(x.put(new me(.2,.05,10,24),i.brass,-.14,0,.02,0,0,-.6),x.put(new me(.2,.05,10,24),i.brass,.14,0,.02,0,0,.6)):p===1?(x.box(i.brass,.46,.34,.1,0,-.2,0,.03),x.put(new me(.17,.045,8,20,Math.PI),i.brass,0,.12,.04),x.cyl(i.darkSteel,.03,.03,.12,0,-.14,.055,8)):(x.ball(i.stoneWarm,.17,0,.15,.04),x.put(new ye(.3,18,12,0,Math.PI*2,0,Math.PI/2),i.stoneWarm,0,-.32,.04,0,0,0,1,.85,.5));for(let M=0;M<4;M++){const S=.4-M*.65,T=_*(1-.85*(M+1)/4);o.box(i.paveA,.9,.05,.6,T,0,S,.02,0,-_*.04),o.box(p===1?r:a,.9,.012,.08,T,.05,S+.25,.004,0,-_*.04)}});const l=o.child(0,0,-2.5,0);for(const _ of[-1,1])l.box(i.stoneDark,.7,.3,.7,_*1.6,0,0,.04),l.cyl(i.stone,.26,.3,3,_*1.6,.3,0,18),l.box(i.stoneDark,.7,.18,.7,_*1.6,3.3,0,.03);l.box(i.stone,4,.4,.7,0,3.4,0,.04);const f=new Mn;f.moveTo(0,.75),f.lineTo(.68,.5),f.lineTo(.58,-.1),f.quadraticCurveTo(.4,-.5,0,-.78),f.quadraticCurveTo(-.4,-.5,-.58,-.1),f.lineTo(-.68,.5),f.closePath();const d=new Cn(f,{depth:.12,bevelEnabled:!0,bevelSegments:2,bevelSize:.05,bevelThickness:.04}),u=new G(d,t.edge),[h,m]=Et(0,-2.5+.1);u.scale.setScalar(Pe*1.3),u.position.set(h,nt+2.2*Pe,m),u.rotation.y=Math.PI,u.userData.isLandscapeBeacon=!0,t.root.add(u),l.put(d,e.m.steel,0,1.2,-.12,0,0,0,1,1,.5),le(t,{shirt:6982312,hair:4864554,pose:"read",backpack:3104138},-1.3,0,2.4,-.2),ie(e,o.child(4.5,0,-.5)),ie(e,o.child(-4.5,0,-.5)),ft(e,o.child(4,0,2.4),.5,2),ft(e,o.child(-4.2,0,3),.5,5),Ce(n,"scene-filter")},e5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(i.stoneWarm,3.4,3.5,.08,0,0,0,40),o.cyl(s.fabricCream,1.9,1.9,.09,0,0,0,36),od(e,o.child(0,0,-.3),2,i.terracottaRoof),Qt(e,o.child(0,0,-.9,Math.PI),2),le(t,{shirt:12681576,hair:2825494,hairStyle:"long",seated:!0,pose:"listen",lean:-.04},.45,.46,-.65,0),le(t,{shirt:7902858,hair:4471348,seated:!0,pose:"talk",lean:.03},-.45,.46,-.65,0),jo(e,o.child(0,0,.5),.45,.5),wo(e,o.child(-.15,.5,.45)),wo(e,o.child(.15,.5,.55)),o.cyl(i.copper,.1,.12,.2,0,.5,.5,14);const a=o.child(2.7,0,.9);a.cyl(i.wood,.34,.26,.4,0,0,0,18),a.put(new me(.34,.025,6,22),i.woodDark,0,.4,0,Math.PI/2);for(let r=0;r<3;r++)Mr(e,a.child((r-1)*.1,.34,r%2*.05-.02,r*.7),e.p.screenOff);ft(e,o.child(-2.8,0,.9),.55,11),ft(e,o.child(-3,0,-1.4),.5,13),ft(e,o.child(3,0,-1.4),.5,17),ie(e,o.child(-3.7,0,1.8)),Ne(t,t.glow,...Bi(0,3.6,-.3),.2),t.ring(1.2,nt+5,Math.PI/2).position.set(...ki(0,3.5,-.3)),t.ring(.9,nt+5,Math.PI/2).position.set(...ki(0,3.7,-.3)),Ce(n,"scene-offline-rest")},t5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e,a=ui(14701917,.7);$o(e,o.child(0,0,-1.4),4.8,3,2.8,i.terracottaRoof,i.paper);const r=o.child(0,3.4,-0);r.box(a,.2,.7,.05,0,0,0,.02),r.box(a,.7,.2,.05,0,.25,0,.02);for(const f of[-1,1])o.cyl(i.woodDark,.07,.09,2.2,f*.85,.2,.55,10);o.box(i.woodDark,2.1,.12,.8,0,2.4,.2,.02,-.08),o.box(i.stoneWarm,1.6,.1,2.4,0,0,1.6,.02,-.07);for(const f of[-1,1])Yo(e,o.child(f*.85,.25,1,Math.PI/2),2,.85);Qt(e,o.child(-2.4,0,.7,0),1.6),Qt(e,o.child(2,0,2.6,.2),1.4),le(t,{shirt:15856885,trousers:5857386,hair:2825494,glasses:!0,pose:"talk"},-.5,0,2.4,.3),le(t,{shirt:10466753,hair:6974058,seated:!0,pose:"listen"},-2.4,.46,.55,0);const c=o.child(3.4,0,-.2,-.35);c.box(i.slate,1.2,.14,.7,0,0,0,.03),c.box(s.plasticDark,1.1,1.5,.12,0,.14,0,.06),c.put(new Je(.96,1.3),s.screenOn,0,.86,.064);for(const[f,d]of[[-.24,i.stoneWarm],[.24,i.copper]])c.ball(d,.1,f,1,.07),c.put(new ye(.17,14,8,0,Math.PI*2,0,Math.PI/2),d,f,.7,.07,0,0,0,1,.8,.4);const l=o.child(-3.4,0,-1.8);l.cyl(i.steel,.05,.08,4.2,0,0,0,10),l.put(new ye(.4,22,10,0,Math.PI*2,0,Math.PI/3),s.ceramic,.25,3.9,.15,-1.2),l.strut(i.steel,[0,3.9,0],[.5,4.1,.3],.02,5),Ne(t,t.edge,...Bi(-3.4,4.5,-1.8),.12),ft(e,o.child(-1.6,0,3),.5,21),ie(e,o.child(1.8,0,.4),3),Ce(n,"scene-clinic")},n5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.4,3.4,.03,0,0,0,40);const a=o.child(0,0,-2);a.box(i.slate,4.6,.3,.5,0,0,0,.04),a.box(s.plasticDark,4.4,2.5,.14,0,.3,0,.08),a.put(new Je(4.2,2.3),ui(2776951,.55),0,1.45,.075);for(const[f,d]of[[-.95,i.stoneWarm],[.95,i.copper]])a.ball(d,.28,f,1.85,.09),a.put(new ye(.62,18,10,0,Math.PI*2,0,Math.PI/2),s.fabricCream,f,.95,.09,0,0,0,1,.9,.3);a.box(s.fabricCream,.12,.7,.02,0,1.2,.09,.01),a.box(s.fabricCream,.7,.12,.02,0,1.49,.09,.01),Qt(e,o.child(-.6,0,1.1,Math.PI+.25),2),le(t,{shirt:10129260,hair:5592405,scarf:11553344,seated:!0,pose:"listen",lean:.05},-.6,.46,.95,Math.PI+.25),jo(e,o.child(2,0,.6),.4,.55),Ni(e,o.child(2,.55,.6,.4),.3,.2,.16,e.p.fabricGreen);const r=o.child(3.5,0,0,-.4);r.box(i.slate,.8,.12,.5,0,0,0,.03),r.box(s.plasticDark,.62,1,.1,0,.12,0,.06),r.put(new Je(.5,.88),s.screenOn,0,.62,.052),r.box(i.brass,.3,.22,.08,0,.5,.07,.02),r.put(new me(.1,.03,8,16,Math.PI),i.brass,0,.74,.07);for(const f of[-1,1]){const d=o.child(f*4.2,0,.2);d.cyl(i.stoneDark,.3,.38,.4,0,0,0,14),d.cyl(i.steel,.06,.1,2.3,0,.4,0,10),Ne(t,t.edge,...Bi(f*4.2,3,.2),.3)}const c=new Nn([-4.2,-2.2,0,2.2,4.2].map((f,d)=>new Y(...ki(f,2.9+(d%2?.5:-.1),.2)))),l=new G(new Bn(c,48,.05,6,!1),t.edge);l.userData.isLandscapeRoute=!0,l.castShadow=!0,t.root.add(l),ie(e,o.child(-3.9,0,1.8),3),ft(e,o.child(3.9,0,2),.5,8),Ce(n,"scene-telemedicine")},o5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(i.stoneWarm,3.7,3.8,.06,0,0,0,40);const a=[i.terracottaRoof,i.slate,i.terracottaRoof,i.slate];[[-3.4,-2.3,2,2.3],[-1.5,-2.9,2.2,3],[1.7,-2.9,2.2,2.7],[3.5,-2.2,2,3.4]].forEach(([d,u,h,m],_)=>{$o(e,o.child(d,0,u,(_-1.5)*-.18),h,m,1.8,a[_],_%2?s.fabricCream:i.paper)});const r=o.child(0,0,-.8);$o(e,r,3.2,3.2,2.4,i.terracottaRoof,i.paper);const c=ui(14701917,.7);r.box(c,.18,.62,.05,0,3.75,1.35,.02),r.box(c,.62,.18,.05,0,3.97,1.35,.02),le(t,{shirt:7973541,hair:2825494,pose:"talk",backpack:13081146},-.75,0,1.9,.5),le(t,{shirt:15659506,trousers:5857386,hair:3811868,glasses:!0,pose:"listen"},.75,0,1.9,-.5);const l=o.child(3.2,0,1.6,-.3);l.box(i.slate,.7,.1,.5,0,0,0,.02),l.box(i.darkSteel,.08,.95,.08,0,.1,0,.01),l.box(s.plasticDark,.8,.55,.08,0,1,0,.05,-.12),l.put(new Je(.7,.45),s.screenOn,0,1.28,.042,-.12),hn(e,o.child(-3.2,0,1.6,.3),1.5,.7,.75),Mo(e,o.child(-3.4,.75,1.6),.4,.3,.3),kn(e,o.child(-2.9,.75,1.6),3,5);for(let d=0;d<4;d++)o.box(i.paveA,.7,.04,.5,-2.3+d*.55,0,-1.2+d*.5,.02,0,.5),o.box(i.paveB,.7,.04,.5,2.3-d*.55,0,-1.2+d*.5,.02,0,-.5),o.box(i.paveA,.9,.04,.55,0,0,.8+d*.6,.02);Ne(t,t.glow,...Bi(0,4.5,-.8+.8),.22),ie(e,o.child(-4.4,0,.4),3),ie(e,o.child(4.4,0,.4),3);const f=new Kn(16766368,.72,11,2);f.position.set(...ki(0,3.5,1.6)),t.root.add(f),Ce(n,"scene-community")},i5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;o.cyl(i.stoneWarm,3.6,3.7,.06,0,0,0,40);const s=6.4;for(let h=0;h<20;h++)o.box(h%2?i.wood:i.woodDark,.3,.07,1.3,-s/2+h*(s/19),.6,.2,.01);o.box(i.woodDark,s,.14,.12,0,.5,-.4,.02),o.box(i.woodDark,s,.14,.12,0,.5,.8,.02);for(const h of[-2.4,0,2.4])o.box(i.stoneDark,.5,.6,1.6,h,0,.2,.03);for(const h of[-.4,.8])Yo(e,o.child(-s/2,.68,h,0),s,.95,i.woodDark);o.box(i.stoneWarm,1.5,.08,2.6,0,.1,2,.02,-.19);for(const h of[-1,1])$o(e,o.child(h*4,0,-.6,h*.18),2.3,2.9,2,h<0?i.terracottaRoof:i.slate,e.m.paper);const a=ui(14701917,.7);o.box(a,.16,.56,.05,-4,3.55,.45,.02),o.box(a,.56,.16,.05,-4,3.75,.45,.02);const r=[{shirt:7973541,hair:2825494,pose:"talk",yaw:.45,x:-2.2},{shirt:10466753,hair:6974058,pose:"listen",yaw:-.2,x:-.7},{shirt:12163964,hair:3811868,pose:"point",yaw:.2,x:.7},{shirt:8560576,hair:2825494,pose:"listen",yaw:-.45,x:2.2}];for(const h of r)le(t,{shirt:h.shirt,hair:h.hair,pose:h.pose,backpack:h.x<0?13081146:void 0},h.x,.67,.2,h.yaw);const c=o.child(0,.67,1.1,0);c.box(i.darkSteel,.06,.8,.06,0,0,0,.01),c.box(e.p.plasticDark,.7,.5,.05,0,.8,0,.03,-.25),c.put(new Je(.6,.42),e.p.screenOn,0,1.05,.028,-.25);const l=[[-4,4.3,-.6],[0,3.9,-.6],[4,4.3,-.6]];for(const[h,m,_]of l)o.cyl(i.steel,.04,.06,m-.4,h,0,_-.9,8),Ne(t,t.glow,...Bi(h,m,_-.9),.26);const f=new Nn(l.map(([h,m,_],p)=>new Y(...ki(h,m-(p===1?0:.1),_-.9)))),d=new G(new Bn(f,40,.05,6,!1),t.edge);d.userData.isLandscapeRoute=!0,t.root.add(d),t.ring(5.35*0+5.2,nt+.2,Math.PI/2),ie(e,o.child(-4.8,0,1.8),3),ie(e,o.child(4.8,0,1.8),3);const u=new Kn(11134719,.9,16,2);u.position.set(...ki(0,5,.6)),t.root.add(u),Ce(n,"scene-community-network")},s5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e,a=[es(7441817,.7),es(7311996,.7),es(12159845,.7)];o.cyl(i.stoneWarm,1.5,1.55,.05,0,0,.6,40),o.put(new me(1.4,.03,6,48),i.brass,0,.06,.6,Math.PI/2);for(let m=0;m<8;m++)o.box(m%2?i.slate:i.brass,.07,.012,m%2?1:1.35,0,.05,.6,.003,0,m/8*Math.PI);const r=[[-3.4,.4],[0,-1.9],[3.4,.4]];r.forEach(([m,_],p)=>{const g=m-0,x=_-.6,M=Math.hypot(g,x)-1.8,S=Math.atan2(g,x),T=.9+M/2;for(let w=0;w<Math.ceil(M/.55);w++){const y=1.6+w*.55;o.box(i.paveA,.55,.045,.42,Math.sin(S)*y,0,.6+Math.cos(S)*y,.015,0,S)}o.box(a[p],.08,.012,M,Math.sin(S)*T*1,.045,.6+Math.cos(S)*T,.003,0,S)});const c=new G(new gt(.2*Pe,.7*Pe,4),t.edge),[l,f]=Et(0,.6);c.position.set(l,nt+1.5*Pe,f),c.rotation.x=Math.PI/2,c.userData.isLandscapeBeacon=!0,t.root.add(c),hn(e,o.child(-3.4,0,1,.3),1.2,.6,.72),ld(n,-3.4,-.5,1,2,.35,1.3),Mr(e,o.child(-3.35,.72,1,.3)),Ns(t,t.edge,-3,2.3,-.1,.5,.2),Ns(t,t.glow,-3.9,2.1,.1,.42,.18);const d=o.child(0,0,-1.9,0);hn(e,d.child(0,0,.5),1.6,.7,.72),d.box(i.slate,2.3,.14,.5,0,0,-.2,.03),d.box(i.darkSteel,.1,.6,.1,0,.14,-.2,.01),d.box(s.plasticDark,2.2,1.35,.1,0,.74,-.2,.07),d.put(new Je(2.04,1.19),ui(2776951,.55),0,1.42,-.145),d.cyl(s.plasticDark,.04,.04,.05,0,2.09,-.17,12);for(const[m,_]of[[-.5,i.stoneWarm],[.5,i.copper]])d.ball(_,.2,m,1.62,-.14),d.put(new ye(.42,18,10,0,Math.PI*2,0,Math.PI/2),s.fabricCream,m,1.05,-.14,0,0,0,1,.9,.3);js(e,d.child(.3,.72,.5,Math.PI)),jo(e,o.child(3.4,0,.4),.5,.72),wo(e,o.child(3.3,.72,.4)),wo(e,o.child(3.55,.72,.45)),Jt(e,o.child(2.55,0,.4,Math.PI/2)),Jt(e,o.child(4.25,0,.4,-Math.PI/2)),le(t,{shirt:12681576,hair:2825494,hairStyle:"long",seated:!0,pose:"talk",lean:.04},2.55,.45,.4,-Math.PI/2),le(t,{shirt:7902858,hair:4471348,seated:!0,pose:"listen",lean:.05},4.25,.45,.4,Math.PI/2);for(const[m,_]of r)Ne(t,t.edge,m,3.3,_,.18);const u=o.child(0,0,-3.4,0);for(const m of[-1,1])u.box(i.stoneDark,.5,.25,.5,m*3,0,0,.03),u.cyl(i.woodDark,.12,.14,3.6,m*3,.25,0,12);u.box(i.woodDark,6.4,.2,.3,0,3.7,0,.03);const h=fo([{text:"CHOOSE BY PURPOSE",y:65,font:"bold 54px Arial, sans-serif"},{text:"QUICK MESSAGE",y:145,font:"bold 34px Arial, sans-serif"},{text:"ONE CLUB · FOUR WEEKS · NOT A UNIVERSAL RULE",y:265,font:"bold 25px Arial, sans-serif",color:"#d8c598"}]);if(h){const[m,_]=Et(0,-3.3),p=new G(new Je(5.6*Pe,1.4*Pe),new wt({map:h,side:$e,toneMapped:!1}));p.position.set(m,nt+2.7*Pe,_),p.rotation.y=Math.PI,p.userData.isLandscapeStage=!0,t.root.add(p)}u.box(i.woodDark,5.8,1.5,.12,0,1.95,-.02,.03),ie(e,o.child(-4.8,0,2.2)),ie(e,o.child(4.8,0,2.2)),ft(e,o.child(-1.8,0,2.4),.5,31),ft(e,o.child(1.8,0,2.4),.5,37),Ce(n,"scene-focus")};function ki(t,n,e){const[o,i]=Et(t,e);return[o,nt+n*Pe,i]}function Bi(t,n,e){return[t,n,e]}function a5(t,n,e,o){return[t,n,e]}const r5={focus:s5,notification:Z3,"study-desk":Q3,filter:J3,"offline-rest":e5,clinic:t5,telemedicine:n5,community:o5,"community-network":i5},c5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e,a=["DEPARTURE","CROSSING","ARRIVAL"];[-3.6,0,3.6].forEach((r,c)=>{const l=o.child(r,0,-2,(1-c)*.12);l.box(i.stoneDark,2,.16,.6,0,0,0,.03);for(const d of[-1,1])l.cyl(i.woodDark,.06,.07,2.6,d*.85,.16,0,10);l.box(i.woodDark,2.1,1.7,.08,0,.7,0,.03),l.box(s.boardWhite,1.9,1.5,.04,0,.8,.05,.01),l.box(i.paper,1.5,.7,.012,0,1.4,.075,.004),l.box([i.copper,i.brass,e.p.fabricRed][c],1.5,.1,.012,0,1.2,.08,.004);for(let d=0;d<3;d++)l.box(i.stoneDark,1.1-d*.2,.05,.012,-.2+d*.1*-1,1.08-d*.15,.08,.004);l.box(i.woodDark,2.2,.08,.2,0,2.7,0,.02);const f=fo([{text:a[c],y:160,font:"bold 78px Arial, sans-serif"}],{width:640,height:320,background:"#2c3e50"});rn(t,f,r+Math.sin((1-c)*.12)*0,2.45,-1.9,1.5,.5,(1-c)*.12)}),sd(e,o.child(0,0,1),2.5,1.35,.78),ad(e,o.child(-.2,.3,1,.25),3.1,2);for(let r=0;r<12;r++)o.box(r%2?i.paveA:i.paveB,.7,.045,.5,-4.6+r*.84,0,-1,.015);[-3.6,0,3.6].forEach(r=>Ne(t,t.glow,r,.4,-1,.13)),Qt(e,o.child(-4.6,0,1.4,-.7),1.6),Qt(e,o.child(4.6,0,1.4,.7),1.6),ie(e,o.child(-5.3,0,-1.6)),ie(e,o.child(5.3,0,-1.6)),Ce(n,"scene-timeline")},l5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e,s=[[.16,.7],[.36,.34],[.58,.62],[.82,.3]],a=o.child(0,0,-2.2,0);a.box(i.stoneDark,6.2,.2,.8,0,0,0,.03);for(const r of[-1,1])a.cyl(i.woodDark,.09,.1,3.4,r*3,.2,0,12);a.box(i.woodDark,6.2,.2,.3,0,3.4,0,.03),a.box(i.woodDark,5.8,2.8,.1,0,.5,0,.03),rn(t,cd(s),0,.5+1.4+.2-.2,-2.2+.07,5.5,2.5),s.forEach(([r,c],l)=>{Ne(t,l%2?t.edge:t.glow,(r-.5)*-5.5*-1*-1,.5+.2+(1-c)*2.5+.05,-2.2+.2,.12)});for(const[r,c]of[[-2.2,.3],[2.2,-.3]]){const l=o.child(r,0,.7,c);hn(e,l,1.7,.9,.8),l.put(new Ye(1.5,.12,.7),i.glass,0,.88,0),xn(e,l.child(-.3,.805,0,.1)),kn(e,l.child(.4,.805,.05,.3),3,8),X3(e,l.child(0,.805,.25,-.2),.3,.22)}le(t,{shirt:6982312,hair:3811868,glasses:!0,pose:"point",backpack:13081146},.2,0,.1,0),ie(e,o.child(-4.4,0,1.6)),ie(e,o.child(4.4,0,1.6)),ft(e,o.child(0,0,3),.5,41),Ce(n,"scene-route-evidence")},d5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;for(let d=0;d<6;d++){const u=-3.9+d*1.6,h=.35+d*.45;o.box(d%2?i.stoneDark:i.stone,1.75,h,2,u,0,-.2,.06),o.box(i.leafLight,1.7,.08,1.9,u,h,-.2,.04);for(let m=0;m<3;m++)o.put(new So(.16+m%2*.05,1),i.rock,u-.4+m*.4,h+.1,.5,0,m,0,1,.7,1)}for(let d=0;d<6;d++)o.cyl(i.woodDark,.03,.04,.9,-4.3+d*1.6,.35+d*.45,.85,8);o.strut(i.woodDark,[-4.3,1.25,.85],[5-.6+0,3.55+.9-.35,.85],.02,6),o.cyl(i.steel,.03,.04,2.6,4.1,3.05,-.2,8),o.box(e.p.fabricRed,.9,.5,.02,4.55,4.9,-.2,.005),Ne(t,t.glow,3.4,4.2,-.2,.3),le(t,{shirt:12681576,hair:2825494,backpack:3104138,pose:"walk"},-.35,1.55,.6,-.9);const s=ls(1.4),[a,r]=Et(-4.6,-1.5);s.position.set(a,nt,r),t.root.add(s);const c=di(1),[l,f]=Et(5,-1.7);c.position.set(l,nt+3,f),t.root.add(c),ie(e,o.child(-5.3,0,1.2),3),Ce(n,"scene-perseverance")},f5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;[0,1,2].forEach(s=>{const a=(s-1)*3.3,r=2.8+s*.7,c=o.child(a,0,-.6-s*.6,0),l=2.1;for(const d of[-1,1])c.box(i.stoneDark,.8,.3,.9,d*(l/2+.2),0,0,.04),c.box(i.stone,.62,r-.3,.72,d*(l/2+.2),.3,0,.05);c.put(ko(l/2+.52,l/2-.1,.72,.05),s===2?i.stoneWarm:i.stone,0,r,0),c.box(i.stoneDark,.5,.55,.8,0,r+l/2+.3,0,.05),c.put(new ye(.14,12,10),i.brass,0,r+l/2+.95,0),c.strut(i.steel,[0,r+l/2,0],[0,r+.5,0],.01,4),Ne(t,t.glow,a,r+.35,-.6-s*.6,.2+s*.05);const f=o.child(a,0,1.3-s*.2,0);f.box(i.stoneDark,.9,.18,.5,0,0,0,.03),f.box(i.stone,.7,1.1+s*.15,.2,0,.18,0,.05),f.box(i.slate,.5,.5,.02,0,.55+s*.05,.11,.01)});for(let s=0;s<14;s++)o.box(s%2?i.paveA:i.paveB,.65,.04,.5,-4.8+s*.74,0,2.5,.015);le(t,{shirt:10129260,hair:6974058,scarf:11553344,pose:"point"},-3.6,0,1.6,.5),le(t,{shirt:7973541,hair:2825494,scale:1},-2.8,0,1.9,-.4),ie(e,o.child(-5.3,0,1)),ie(e,o.child(5.3,0,1)),ft(e,o.child(4.3,0,2.5),.5,3),Ce(n,"scene-legacy")},u5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.box(i.woodDark,7,.5,3.2,0,0,-1.4,.05);for(let r=0;r<10;r++)o.box(r%2?i.wood:i.woodDark,6.8,.02,.3,0,.5,-2.9+r*.32,.005);nd(e,o.child(0,0,1,Math.PI),2.2,3,.16,.3);for(let r=0;r<16;r++)o.box(s.fabricRed,.45,3.2,.12,-3.4+r*.45,.5,-3-r%2*.05,.03);o.box(i.woodDark,7.4,.35,.3,0,3.7,-3,.04);for(const r of[-1,1])for(let c=0;c<4;c++)o.box(s.fabricRed,.5,2.9-c*.3,.2,r*(3.5+c*.12),.5,-2.7+c*.35,.04);for(const r of[-1,1]){const c=o.child(r*4.5,0,.3);for(const[u,h]of[[-.22,-.22],[.22,-.22],[-.22,.22],[.22,.22]])c.strut(i.steel,[u,0,h],[u*.6,4.2,h*.6],.035,6);for(let u=0;u<=6;u++){const h=u/6,m=1-h*.4;c.strut(i.steel,[-.22*m,h*4.2,-.22*m],[.22*m,h*4.2,-.22*m],.015,4),c.strut(i.steel,[-.22*m,h*4.2,.22*m],[.22*m,h*4.2,.22*m],.015,4)}for(let u=0;u<3;u++)c.put(new we(.15,.2,.34,14),s.plasticDark,-r*.4,3+u*.35,.3,.5,0,r*.9);const l=new G(new gt(1.5*Pe,7*Pe,18,1,!0),new wt({color:16773824,transparent:!0,opacity:.1,side:$e,depthWrite:!1,blending:si})),[f,d]=Et(r*4.5-r*2,.3-1);l.position.set(f,nt+2.8*Pe,d),l.rotation.z=r*.5,l.userData.noLandscapeShadow=!0,t.root.add(l)}td(e,o.child(-1.2,.5,-1.4,.15)),le(t,{shirt:3891087,hair:2825494,pose:"talk"},-2.1,.5,-1.3,.3);const a=o.child(1.3,.5,-1.4);a.cyl(i.stoneDark,.3,.38,.5,0,0,0,20),a.cyl(i.brass,.06,.08,.5,0,.5,0,12),Ne(t,t.edge,1.3,1.9,-1.4,.28);for(let r=0;r<4;r++)Jt(e,o.child(-1.8+r*1.2,0,2.3,Math.PI));le(t,{shirt:12681576,hair:2825494,hairStyle:"long",seated:!0,pose:"listen"},-.6,.45,2.3,Math.PI),le(t,{shirt:7902858,hair:4471348,seated:!0,pose:"listen"},.6,.45,2.3,Math.PI),ie(e,o.child(-5.4,0,2.2)),ie(e,o.child(5.4,0,2.2)),Ce(n,"scene-spotlight")},h5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(i.stoneWarm,3.8,3.9,.05,0,0,0,40),K3(e,o.child(0,0,-.4),7,5,2.9,s.canvasOlive);for(const r of[-1,1]){const c=o.child(r*2.6,0,-1.4);c.cyl(i.steel,.46,.5,1.3,0,.2,0,20),c.cyl(i.darkSteel,.46,.46,.06,0,1.5,0,20),c.put(new me(.46,.02,6,24),i.darkSteel,0,.8,0,Math.PI/2),c.cyl(i.brass,.03,.03,.2,0,.5,.55,8),c.box(i.wood,1,.2,1,0,0,0,.03)}[-1.6,0,1.6].forEach((r,c)=>{Mo(e,o.child(r,0,-.1,.05*(c-1)),1.1,.8,.8),Mo(e,o.child(r,.8,-.1,.3*(c-1)),.8,.5,.7),o.box(c===1?i.brass:e.p.fabricRed,.5,.012,.1,r,1.31,-.1,.003,0,0,0)});for(let r=0;r<4;r++)o.put(new ye(.3,12,10),e.p.fabricCream,3.3,.18+r%2*.2,-.5+r*.5,0,r,0,1.2,.6,.8);const a=o.child(0,0,-2.6);a.cyl(i.woodDark,.07,.08,2.6,-1.9,0,0,10),a.cyl(i.woodDark,.07,.08,2.6,1.9,0,0,10),Zs(e,a.child(0,.5,0),3.4,1.4,s.boardGreen);for(let r=0;r<3;r++)a.box(r===1?i.brass:i.paper,.7,.9,.01,-1.1+r*1.1,.75,.11,.004);[-1.1,0,1.1].forEach(r=>Ne(t,t.glow,r,2.35,-2.5,.12)),le(t,{shirt:7311996,hair:2825494,pose:"talk",backpack:13081146},-.7,0,1.5,.4),le(t,{shirt:12163964,hair:3811868,scarf:11553344,pose:"listen"},.7,0,1.5,-.4),ie(e,o.child(-4.4,0,1.4)),ie(e,o.child(4.4,0,1.4)),Ce(n,"scene-humanitarian")},p5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;o.cyl(i.leafLight,3.7,3.8,.05,0,0,0,40);const s=di(2.3),[a,r]=Et(0,-.8);s.position.set(a,nt,r),t.root.add(s),o.cyl(i.stoneDark,1.5,1.6,.3,0,0,-.8,28),o.cyl(i.soil,1.3,1.3,.05,0,.3,-.8,28);for(let f=0;f<9;f++){const d=f/9*Math.PI*2+.1;Math.sin(d)<-.2||(o.box(i.wood,.9,.08,.38,Math.cos(d)*2.3,.4,-.8+Math.sin(d)*2.3*.9,.015,0,-d+Math.PI/2),o.box(i.stoneDark,.12,.4,.3,Math.cos(d)*2.3,0,-.8+Math.sin(d)*2.3*.9,.02,0,-d+Math.PI/2))}const c=o.child(1.2,0,1.4,-.3);c.box(i.stoneDark,.9,.15,.5,0,0,0,.03),c.box(i.stone,.7,.8,.14,0,.15,0,.04,-.15),c.box(i.brass,.5,.3,.02,0,.5,.09,.005,-.15);const l=o.child(-1.3,0,1.4);l.cyl(i.copper,.16,.18,.3,0,0,0,14),l.strut(i.copper,[.12,.2,0],[.5,.45,0],.025,6),Ne(t,t.edge,-3.4,1,.4,.2),Ne(t,t.edge,3.4,1,.4,.2),le(t,{shirt:7973541,hair:2825494,pose:"point"},0,0,2.3,0),ft(e,o.child(-4.2,0,1.2),.55,6),ft(e,o.child(4.2,0,1.2),.55,8),ie(e,o.child(-4.8,0,-1.6)),ie(e,o.child(4.8,0,-1.6)),Ce(n,"scene-lasting-service")},m5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(i.stoneWarm,3.6,3.7,.06,0,0,0,40),o.cyl(s.fabricCream,2.7,2.7,.08,0,0,0,40),jo(e,o.child(0,0,.7),.7,.72);const a=o.child(0,.72,.7);a.cyl(i.brass,.08,.1,.03,0,0,0,12),a.cyl(i.lampGlass,.07,.07,.2,0,.03,0,12),a.put(new gt(.11,.1,12),i.brass,0,.28,0),[[-2.5,-.5,-.65],[0,-1.7,0],[2.5,-.5,.65]].forEach(([l,f,d])=>Qt(e,o.child(l,0,f,Math.PI*0+d*-1+Math.PI),1.9));const c=[{x:-2.5,z:-.35,yaw:-.65,shirt:7973541,hair:2825494,pose:"talk"},{x:-.5,z:-1.55,yaw:0,shirt:12163964,hair:3811868,pose:"listen"},{x:.6,z:-1.55,yaw:0,shirt:8560576,hair:2825494,pose:"listen"},{x:2.5,z:-.35,yaw:.65,shirt:12681576,hair:5592405,pose:"listen"}];for(const l of c)le(t,{shirt:l.shirt,hair:l.hair,seated:!0,pose:l.pose},l.x,.46,l.z,l.yaw);for(const l of[-3.2,0,3.2])Ne(t,t.glow,l,2.6,.3,.2);ie(e,o.child(-4.4,0,-1.6)),ie(e,o.child(4.4,0,-1.6)),ft(e,o.child(-3.6,0,2.6),.5,10),ft(e,o.child(3.6,0,2.6),.5,12),Ce(n,"scene-community-witness")},g5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;o.put(new we(5,5,.2,48),e.p.water,0,.12,0),o.box(i.stoneDark,11.6,.36,.5,0,0,3.6,.03);for(let s=0;s<22;s++)o.box(s%2?i.wood:i.woodDark,.38,.06,1.5,-4.2+s*.4,.6,2.6,.01);for(let s=0;s<8;s++)o.cyl(i.woodDark,.09,.11,.9,-4+s*1.15,0,3.3,10),o.cyl(i.woodDark,.09,.11,.9,-4+s*1.15,0,1.9,10);[[-3.2,3,-.5],[0,2,.3],[3.2,3,.1]].forEach(([s,a,r],c)=>{ad(e,o.child(s,.2,r,.12-c*.12),c===1?3.6:3,a,c===1?e.p.fabricRed:e.p.fabricCream)}),ss(e,o.child(-4.4,.66,2.9)),Mo(e,o.child(4.4,.66,2.6),.6,.5,.5);for(const s of[-1.5,1.5])Mo(e,o.child(s,.66,2.8,s*.1),.55,.45,.5);ie(e,o.child(-5.2,.66,2)),ie(e,o.child(5.2,.66,2)),le(t,{shirt:3891087,hair:2825494,pose:"point",scarf:11553344},.9,.66,2.6,.2),Ne(t,t.glow,0,5.2,.3,.2),Ce(n,"scene-fleet")},v5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;o.put(new we(5,5,.2,48),e.p.water,0,.12,.2);for(const s of[-1,1])o.box(i.stoneDark,3.4,.3,3,s*4.2,0,.1,.04),$o(e,o.child(s*4.2,.3,.1,-s*.1),3,3.2,2.4,s<0?i.terracottaRoof:i.slate,i.stoneWarm);o.box(i.stone,5.2,.28,1.5,0,1,.1,.04),o.put(ko(2.5,2.1,1.4,.04),i.stoneDark,0,.25,.1);for(const s of[-.65,.85]){o.box(i.stoneDark,5.2,.12,.14,0,1.28+.65,s,.02);for(let a=0;a<7;a++)o.box(i.stoneDark,.1,.65,.1,-2.4+a*.8,1.28,s,.015)}le(t,{shirt:7973541,hair:2825494,pose:"talk"},-.55,1.28,.1,Math.PI/2+.3),le(t,{shirt:12681576,hair:5592405,pose:"talk"},.55,1.28,.1,-Math.PI/2-.3);for(const s of[-1,1]){const a=o.child(s*1.9,0,2.3,0);a.cyl(i.stoneDark,.3,.38,.8,0,0,0,14),a.box(i.stone,.8,.06,.6,0,.8,0,.015),xn(e,a.child(0,.86,0,s*.4)),kn(e,a.child(s*.28,.86,.1,.2),3,12+s)}Ne(t,t.glow,0,3.2,.1,.22),ie(e,o.child(-5.4,0,2.2)),ie(e,o.child(5.4,0,2.2)),Ce(n,"scene-peace-contact")},x5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40),o.cyl(s.fabricCream,3.3,3.3,.05,0,0,0,40),o.cyl(i.woodDark,2,2,.12,0,.78,0,48),o.cyl(i.wood,2.1,2.1,.06,0,.72,0,48),o.cyl(i.woodDark,.18,.28,.78,0,0,0,14),o.cyl(i.woodDark,.8,.9,.08,0,0,0,24);const a=document.createElement("canvas");a.width=900,a.height=900;const r=a.getContext("2d");let c;if(r){r.fillStyle="#e2d3ac",r.fillRect(0,0,900,900),r.strokeStyle="#6a8a96",r.lineWidth=2;for(let u=0;u<18;u++)r.beginPath(),r.moveTo(u*52,0),r.lineTo(u*52,900),r.moveTo(0,u*52),r.lineTo(900,u*52),r.stroke();r.fillStyle="#b8c9a0",r.beginPath(),r.ellipse(250,300,150,100,.4,0,Math.PI*2),r.ellipse(650,620,170,110,-.3,0,Math.PI*2),r.fill(),r.strokeStyle="#b8473f",r.lineWidth=6,r.setLineDash([16,12]),r.beginPath(),r.moveTo(150,700),r.bezierCurveTo(350,450,500,650,760,200),r.stroke(),r.setLineDash([]),r.translate(740,160),r.fillStyle="#3a2d1a";for(let u=0;u<8;u++)r.rotate(Math.PI/4),r.beginPath(),r.moveTo(0,0),r.lineTo(10,-50),r.lineTo(-10,-50),r.fill();c=new Wt(a),c.colorSpace=yt,c.anisotropy=4}if(c){const u=new G(new ci(1.9*Pe,48),new wt({map:c,toneMapped:!1})),[h,m]=Et(0,0);u.rotation.x=-Math.PI/2,u.position.set(h,nt+.912*Pe,m),u.userData.noLandscapeShadow=!0,t.root.add(u)}const l=o.child(-.8,.84,.3,.6);l.strut(i.brass,[0,0,0],[.12,.28,0],.012,5),l.strut(i.brass,[.24,0,0],[.12,.28,0],.012,5);const f=o.child(.8,.84,.4);f.cyl(i.brass,.14,.14,.05,0,0,0,20),f.put(new ci(.12,20),s.ceramic,0,.052,0,-Math.PI/2),br(e,o.child(3.1,0,-1.2));const d=o.child(-3.3,0,-1.5,.3);d.box(i.woodDark,1.4,1.6,.4,0,0,0,.03);for(let u=0;u<3;u++)for(let h=0;h<4;h++)d.put(new we(.06,.06,.38,10),s.fabricCream,-.5+h*.33,.28+u*.45,0,Math.PI/2,0,0);le(t,{shirt:3891087,hair:2825494,glasses:!0,pose:"point"},.1,0,2.3,.2),ie(e,o.child(-4.6,0,1.6)),ie(e,o.child(4.6,0,1.6)),Ne(t,t.edge,0,3,-.9,.28),Ce(n,"scene-chart-room")},_5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.put(new we(5,5,.2,48),s.water,0,.12,0);for(const r of[-1,1]){const c=o.child(r*3.9,0,.1);for(let l=0;l<12;l++)c.box(l%2?i.wood:i.woodDark,2.4,.07,.36,0,.62,-2+l*.37,.01);for(const l of[-1.1,1.1])for(const f of[-2,0,2])c.cyl(i.woodDark,.09,.11,.7,l,0,f,10);Qs(e,c.child(0,.65,-.4),2.2,1.2,7,r<0?s.fabricRed:s.fabricBlue,s.fabricCream),hn(e,c.child(0,.65,-.1),1.6,.6,.7),Mo(e,c.child(-.7,.65,1.2,.2),.5,.4,.45),ss(e,c.child(.8,.65,1.2),.24,.6)}for(let r=0;r<14;r++)o.box(r%2?i.wood:i.woodDark,.38,.07,1.4,-2.7+r*.415,.78,.1,.01,0,0,0);for(const r of[-.55,.75])Yo(e,o.child(-2.8,.82,r,0),5.6,.9,i.woodDark);Mo(e,o.child(-.7,.85,.1,.1),.55,.45,.5),Mo(e,o.child(.7,.85,.1,-.2),.55,.45,.5);const a=o.child(0,.85,.8);a.cyl(i.brass,.04,.06,.6,0,0,0,10),a.box(i.brass,.9,.035,.035,0,.6,0,.008);for(const r of[-1,1])a.strut(i.steel,[r*.42,.6,0],[r*.42,.28,0],.006,4),a.cyl(i.brass,.14,.14,.02,r*.42,.27,0,16);[-1.6,0,1.6].forEach(r=>Ne(t,t.glow,r,2.8+(r===0?.4:0),-.1,.17)),le(t,{shirt:12163964,hair:2825494,pose:"talk"},-1.8,.65,.2,.9),le(t,{shirt:7973541,hair:5592405,pose:"listen"},1.8,.65,.2,-.9),ie(e,o.child(-5.3,0,2.2)),ie(e,o.child(5.3,0,2.2)),Ce(n,"scene-exchange-harbor")},M5={timeline:c5,"route-evidence":l5,perseverance:d5,legacy:f5,spotlight:u5,humanitarian:h5,"lasting-service":p5,"community-witness":m5,fleet:g5,"peace-contact":v5,"chart-room":x5,"exchange-harbor":_5};function Co(t,n,e,o=.8,i=.6){const{f:s}=t;for(let a=0;a<n.length-1;a++){const[r,c]=n[a],[l,f]=n[a+1],d=Math.hypot(l-r,f-c),u=Math.atan2(l-r,f-c),h=Math.max(1,Math.round(d/i));for(let m=0;m<h;m++){const _=(m+.5)/h;s.box(e,o,.05,i*.82,r+(l-r)*_,0,c+(f-c)*_,.02,0,u+Math.sin(a*7+m*3)*.08)}}}function b5(){const t=document.createElement("canvas");t.width=1200,t.height=700;const n=t.getContext("2d");if(!n)return;const e=n.createLinearGradient(0,0,0,420);e.addColorStop(0,"#7fb2de"),e.addColorStop(1,"#f6e7c4"),n.fillStyle=e,n.fillRect(0,0,1200,700),n.fillStyle="#fff4c8",n.beginPath(),n.arc(880,180,62,0,Math.PI*2),n.fill(),n.fillStyle="rgba(255,255,255,0.8)";for(const[s,a,r]of[[200,120,160],[520,90,120],[1020,80,140]])n.beginPath(),n.ellipse(s,a,r,28,0,0,Math.PI*2),n.fill();const o=[["#8aa7b8",330,90],["#6f9a86",400,70],["#4f7f5a",470,50]];for(const[s,a,r]of o){n.fillStyle=s,n.beginPath(),n.moveTo(0,700);for(let c=0;c<=1200;c+=20)n.lineTo(c,a-Math.abs(Math.sin(c*.006+a))*r-Math.sin(c*.017)*14);n.lineTo(1200,700),n.fill()}n.fillStyle="#b9c98a",n.fillRect(0,560,1200,140),n.strokeStyle="rgba(60,90,40,0.45)",n.lineWidth=3;for(let s=0;s<12;s++)n.beginPath(),n.moveTo(s*120-100,700),n.lineTo(560+(s-6)*20,560),n.stroke();const i=new Wt(t);return i.colorSpace=yt,i.anisotropy=4,i}const S5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e,a=[[.12,.72],[.3,.3],[.52,.58],[.74,.25],[.9,.7]],r=o.child(0,0,-2.4,0);r.box(i.stoneDark,6.6,.2,.8,0,0,0,.03);for(const d of[-1,1])r.cyl(i.woodDark,.09,.1,3.5,d*3.2,.2,0,12);r.box(i.woodDark,6.7,.2,.3,0,3.5,0,.03),r.box(i.woodDark,6.2,2.9,.1,0,.55,0,.03),rn(t,cd(a),0,.55+1.45,-2.4+.07,5.8,2.65),a.forEach(([d,u])=>Ne(t,t.glow,(d-.5)*5.8*-1*-1,.55+.1+(1-u)*2.65,-2.2,.12));const c=o.child(-4,0,.4,.4);c.box(i.darkSteel,1.2,.06,.8,0,.3,0,.015);for(const[d,u]of[[-.5,-.32],[.5,-.32],[-.5,.32],[.5,.32]])c.put(new me(.12,.035,8,16),i.darkSteel,d,.15,u,0,Math.PI/2);c.strut(i.darkSteel,[-.55,.33,-.3],[-.55,1.15,-.3],.02,6),c.strut(i.darkSteel,[-.55,.33,.3],[-.55,1.15,.3],.02,6),c.strut(i.darkSteel,[-.55,1.15,-.3],[-.55,1.15,.3],.02,6),Ni(e,c.child(.1,.33,0,.1),.6,.5,.34,s.fabricBlue),Ni(e,c.child(.1,.8,0,-.2),.5,.36,.3,s.fabricRed);const l=Gn(8022604);Co(n,[[-2.8,1.8],[-1,1],[.8,1.3],[2.6,.9]],l,.9,.6),Co(n,[[.8,1.3],[.2,2.4],[-.4,3.2]],i.paveA,.6,.55),as(e,o.child(1.6,0,.5,.3),[{yaw:Math.PI/2-.4,len:1.1},{yaw:-Math.PI/2+.3,len:.9,tone:i.copper}]),Ne(t,t.glow,1.6,3.1,.5,.12);const f=o.child(4.1,0,-.7,-.35);$o(e,f,2.5,2.7,1.8,i.terracottaRoof,s.fabricCream),hn(e,f.child(0,0,1.55),1.8,.6,.9,i.wood);for(let d=0;d<4;d++)f.cyl(s.ceramic,.09,.08,.2,-.6+d*.4,.9,1.5,12);Ne(t,t.glow,3.7,3.3,-.1,.15),le(t,{shirt:13081146,hair:3811868,pose:"talk"},4,0,.55,.2),le(t,{shirt:6982312,hair:2825494,backpack:11553344,pose:"point"},2.9,0,1.3,-1),ie(e,o.child(-4.9,0,2.2)),ie(e,o.child(4.9,0,2.6)),Ce(n,"scene-itinerary")};function Gn(t,n=.9){const e=new ge({color:t,roughness:n,metalness:.02});return e.fog=!1,e}const w5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;Co(n,[[-4.8,2.6],[-2.4,2.4],[0,1.8]],i.paveA,.9,.6);for(const[r,c,l]of[[-.5,1.4,.85],[.5,1.8,.7],[.1,.8,.6],[1.2,1.1,.5],[-1.1,.9,.45]])o.put(new So(l,1),i.rock,r,l*.6,c,r,c,0,1.2,.8,1);for(let r=0;r<18;r++)o.put(new So(.08+r%4*.03,0),i.stoneDark,-1.6+r%6*.65,.06,.6+Math.floor(r/6)*.5,r,r*2,0);for(const r of[-1,1])o.cyl(i.woodDark,.05,.06,1,r*1.8,0,2.2,8);for(let r=0;r<6;r++)o.box(r%2?s.fabricCream:s.fabricRed,.55,.14,.04,-1.4+r*.56,.7,2.2,.01);o.box(i.darkSteel,.9,.5,.04,0,1.15,2.2,.02),o.box(s.fabricRed,.7,.3,.01,0,1.25,2.23,.005);const a=Gn(8022604);Co(n,[[-2.4,2.4],[-3,.4],[-1.6,-1.6],[1.2,-2],[3.6,-.6],[4.6,1.8]],a,.85,.55),as(e,o.child(-2.6,0,1.9,.2),[{yaw:-Math.PI/2+.2,len:1.1,tone:i.copper}]),as(e,o.child(3.8,0,.4,-.2),[{yaw:Math.PI/2+.5,len:1,tone:i.copper}]),Ne(t,t.glow,-2.6,3.1,1.9,.14),Ne(t,t.glow,3.8,3.1,.4,.14),le(t,{shirt:12681576,hair:2825494,backpack:3104138,scarf:14725194,pose:"walk"},-2.9,0,-.3,.5);for(const[r,c,l]of[[-4.6,-1.2,1.1],[4.8,-1.8,1],[.4,-3.2,1.3]]){const f=ls(l),[d,u]=Et(r,c);f.position.set(d,nt,u),t.root.add(f)}ie(e,o.child(-4.8,0,3)),Ce(n,"scene-detour")},y5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(i.stoneWarm,3.7,3.8,.05,0,0,0,40),[-3.4,3.4].forEach((c,l)=>{const f=o.child(c,0,-.2,-c*.07);Qs(e,f.child(0,0,-1,Math.PI),2.6,1.3,8,l===0?s.fabricRed:s.fabricBlue,s.fabricCream),hn(e,f.child(0,0,.3),2.2,.7,.85,i.wood);for(let d=0;d<6;d++){const u=[14240573,15903035,8042056,14707599,6966233,15909198][d];f.put(new ye(.1,10,8),Gn(u,.6),-.8+d*.32,.95,.3+d%2*.12)}Mo(e,f.child(-1.4,0,-.5,.2),.6,.45,.5),ss(e,f.child(1.4,0,-.5),.26,.65);for(let d=0;d<3;d++)kn(e,f.child(-.6+d*.6,.85,.6,d),2+d,20+d)});const a=[-3.6,-1.8,0,1.8,3.6].map((c,l)=>new Y(...N5(c,3.2-(l===2?.55:l%2?.3:0),-.4))),r=new G(new Bn(new Nn(a),40,.02,5,!1),Gn(2304045));r.userData.isLandscapeRoute=!0,t.root.add(r);for(let c=0;c<9;c++){const l=new Nn(a).getPoint(c/8),f=new G(new ye(.1*Pe,10,8),t.glow);f.position.copy(l).add(new Y(0,-.12,0)),f.userData.isLandscapeBeacon=c%2===0,t.root.add(f)}le(t,{shirt:6982312,hair:2825494,backpack:11553344,pose:"talk"},-.8,0,1.4,.45),le(t,{shirt:12681576,hair:5592405,scarf:5077589,pose:"listen"},.8,0,1.4,-.45),ft(e,o.child(-1.7,0,3),.5,22),ft(e,o.child(1.7,0,3),.5,24),ie(e,o.child(-4.9,0,2)),ie(e,o.child(4.9,0,2)),Ce(n,"scene-market-encounter")},E5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;for(let l=0;l<4;l++){const f=-3+l*.75,d=7.6-l*.9;o.box(i.stoneDark,d,.35+(3-l)*.3,.7,0,0,f,.04),o.box(i.soil,d-.2,.05,.5,0,.33+(3-l)*.3,f,.01);for(let u=0;u<Math.floor(d/.6);u++)o.ball(u%2?i.leafLight:i.leaf,.2+u%3*.04,-d/2+.4+u*.6,.55+(3-l)*.3,f,1,.8,1)}o.put(new we(2,2,.2,40),e.p.water,0,.14,1.3,0,0,0,1.3,1,.75),o.put(new me(2,.12,8,40),i.stoneDark,0,.24,1.3,Math.PI/2,0,0,1.3,.75,1);for(let l=0;l<5;l++)o.cyl(i.stone,.26,.28,.08,-1.6+l*.8,.22,1.3+Math.sin(l*1.4)*.25,14);for(const[l,f]of[[-1,1.7],[.6,.9],[1.6,1.6]])o.cyl(i.leaf,.2,.2,.02,l,.26,f,14),o.ball(e.p.fabricCream,.07,l+.04,.3,f,1,.7,1);Qt(e,o.child(-3.4,0,1.5,-.5),1.8),Qt(e,o.child(3.4,0,1.5,.5),1.8),le(t,{shirt:13081146,hair:2825494,hairStyle:"bun",seated:!0,pose:"write",lean:.1},-3.3,.44,1.5,-.5);const s=o.child(-2.6,0,3);s.cyl(i.stoneDark,.18,.22,.2,0,0,0,10),s.cyl(i.stone,.07,.09,.9,0,.2,0,10),s.box(i.stone,.4,.3,.4,0,1.1,0,.03),s.cyl(i.lampGlass,.12,.12,.2,0,1.14,0,8),s.put(new gt(.34,.2,4),i.stoneDark,0,1.5,0,0,Math.PI/4);const a=di(1.5),[r,c]=Et(3.9,-2.2);a.position.set(r,nt+.6,c),t.root.add(a),Ne(t,t.glow,0,3,-.2,.22),ie(e,o.child(4.8,0,2.6)),Ce(n,"scene-reflection-garden")},T5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e,a=o.child(0,0,-1.6);$o(e,a,6.6,3.4,2.8,i.terracottaRoof,s.fabricCream);for(const c of[-2.2,0,2.2])Sr(e,a.child(c,2.16,1.42),.8,.86,{cols:2,rows:2,curtain:c!==0}),a.box(i.wood,1.05,.06,.34,c,1.98,1.58,.01);const r=fo([{text:"HOSTEL",y:110,font:"bold 96px Arial, sans-serif"},{text:"BEDS · TEA · MAPS",y:220,font:"bold 36px Arial, sans-serif",color:"#d8c598"}],{width:720,height:300,background:"#3a2d20"});rn(t,r,0,3.1,-1.6+1.52,2,.85),Ne(t,t.glow,0,4.9,-.3,.2),Qt(e,o.child(-3.4,0,.9,.35),1.7),kc(e,o.child(3,0,1,.3),e.p.fabricRed),kc(e,o.child(3.5,0,.7,.2),e.p.fabricBlue),o.box(i.darkSteel,1.6,.05,.05,3.2,.5,1.3,.01),Ni(e,o.child(-1.6,0,1.4,.4),.55,.62,.3,s.fabricGreen),Co(n,[[0,3.6],[0,2.4],[0,1.4]],i.paveA,.9,.6),le(t,{shirt:6982312,hair:2825494,backpack:13081146,pose:"walk"},-.2,0,2.3,.1),le(t,{shirt:12163964,hair:5592405,scarf:11553344,pose:"talk"},.9,0,.9,-.3),ft(e,o.child(-4.6,0,0),.5,5),ie(e,o.child(-4.9,0,2.4)),ie(e,o.child(4.9,0,2.4)),Ce(n,"scene-hostel")},A5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e,a=o.child(0,0,-1.2,0);for(const r of[-1,1])a.box(i.stoneDark,1.2,.4,1.2,r*2.6,0,0,.05),a.box(i.stone,.95,3.4,.95,r*2.6,.4,0,.06),a.box(i.stoneDark,1.25,.25,1.25,r*2.6,3.8,0,.05);a.put(ko(2.6,2,1,.06),i.stone,0,4.05,0),a.box(i.stoneDark,.8,.8,1.1,0,6.5,0,.06),a.put(new ye(.2,14,10),i.brass,0,7.5,0),Co(n,[[0,2.6],[0,.9],[-.9,-.4]],i.paveA,.9,.55),Co(n,[[0,2.6],[0,.9],[.9,-.4]],i.paveB,.9,.55),Co(n,[[-.9,-.4],[-2.4,-1.4],[-3.9,-2.4]],Gn(6982287),.85,.55),Co(n,[[.9,-.4],[2.4,-1.4],[3.9,-2.4]],Gn(8036474),.85,.55);for(const r of[-1,1])as(e,o.child(r*4,0,-2.8,-r*.4),[{yaw:r*(Math.PI/2-.5),len:1.1,tone:r<0?i.copper:i.leaf}],2.4),Ne(t,t.edge,r*4,2.9,-2.8,.34);le(t,{shirt:12681576,hair:2825494,backpack:3104138,pose:"read"},0,0,2.2,0),Qt(e,o.child(-3.8,0,1.6,-.5),1.6),ft(e,o.child(3.8,0,1.8),.5,27),ie(e,o.child(-4.9,0,2.6)),ie(e,o.child(4.9,0,2.6)),Ce(n,"scene-open-route")},P5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;for(let c=0;c<4;c++){const l=7.6-c*1.2;o.box(c%2?i.stoneWarm:i.stone,l,.4+c*.4,1.1,0,0,1.6-c*.95,.05)}const a=.4+3*.4+.4;o.box(i.stoneDark,4.4,.4,1.7,0,a-.4,-1.6,.05),Yo(e,o.child(-2,a,-.85,0),4,.95,i.darkSteel),Yo(e,o.child(-2,a,-2.4,0),4,.95,i.darkSteel);for(const c of[-1,1])Yo(e,o.child(c*2,a,-2.4,Math.PI/2*-c),1.6,.95,i.darkSteel);const r=o.child(1.5,a,-1.2,-.4);r.cyl(i.darkSteel,.06,.1,1.1,0,0,0,10),r.put(new we(.1,.12,.7,16),i.steel,.1,1.22,.2,Math.PI/2-.4),r.put(new me(.12,.025,8,16),i.brass,.1,1.2,.5,Math.PI/2-.4),o.cyl(i.steel,.03,.04,3,-1.8,a,-2.2,8),o.box(s.fabricRed,1,.55,.02,-1.3,a+2.4,-2.2,.005),Ne(t,t.glow,0,2.2+a,-2.2,.4),le(t,{shirt:7973541,hair:2825494,backpack:13081146,pose:"point"},-.2,a,-1.6,0),ft(e,o.child(-3.6,0,2.4),.5,29),ft(e,o.child(3.6,0,2.4),.5,31),ie(e,o.child(-4.8,0,1.2)),ie(e,o.child(4.8,0,1.2)),Ce(n,"scene-confidence")},R5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(i.stoneWarm,3.6,3.7,.05,0,0,0,40);for(const l of[-3.2,0,3.2])for(const f of[-1.6,1])o.cyl(i.woodDark,.09,.11,2.8,l,0,f,12);for(const l of[-1.6,1])o.box(i.woodDark,7.2,.2,.2,0,2.8,l,.03);for(const l of[-3.2,0,3.2])o.box(i.woodDark,.18,.18,2.8,l,2.8,-.3,.02);for(const l of[-1,1])o.box(i.terracottaRoof,7.8,.1,1.9,0,3.2,-.3+l*.85,.02,-l*.38);o.box(i.brass,7.9,.12,.2,0,3.55,-.3,.02),Qt(e,o.child(0,0,-1.2,Math.PI),3.2),Ni(e,o.child(-1.9,0,.3,.5),.5,.55,.28,s.fabricBlue);for(const l of[-1.8,1.8])o.strut(i.darkSteel,[l,2.8,-.3],[l,2.3,-.3],.012,4),o.cyl(i.lampGlass,.1,.14,.3,l,2,-.3,8);le(t,{shirt:12163964,hair:2825494,seated:!0,pose:"listen",scarf:11553344},.5,.45,-1,0),le(t,{shirt:6982312,hair:5592405,seated:!0,pose:"talk"},-.5,.45,-1,0),$3(e,o.child(3.2,0,2.6,0),.62,s.fabricRed),le(t,{shirt:5077589,hair:2825494,pose:"walk"},3.2,0,2.6,.9);for(const[l,f,d]of[[-2.4,2.4,.7],[.4,2.8,.55],[-3.8,.8,.5]])o.cyl(s.water,d,d,.015,l,0,f,20);const a=new wt({color:12575730,transparent:!0,opacity:.55,depthWrite:!1}),r=new Ln(new we(.008*Pe,.008*Pe,.7*Pe,4),a,140),c=new cs;for(let l=0;l<140;l++){const f=l*2.399%(Math.PI*2),d=1.2+l*37%100/100*3.6,u=Math.cos(f)*d*1.2,h=1.2+Math.sin(f)*d*.7,[m,_]=Et(u,h);c.position.set(m,nt+(.8+l*53%100/100*3.4)*Pe,_),c.rotation.z=.12,c.updateMatrix(),r.setMatrixAt(l,c.matrix)}r.userData.noLandscapeShadow=!0,r.castShadow=!1,t.root.add(r),ie(e,o.child(-4.8,0,2.2)),Ce(n,"scene-rain-shelter")},C5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.box(i.stoneDark,10.4,.5,2.6,0,0,.2,.04),o.box(i.paveA,10.2,.04,2.4,0,.5,.2,.01),o.box(s.fabricCream,10.2,.012,.12,0,.54,1.3,.003);for(const c of[-4.2,-1.4,1.4,4.2])o.cyl(i.darkSteel,.1,.12,3.5,c,.54,-.6,12),o.box(i.darkSteel,.4,.15,.4,c,.54,-.6,.02);o.box(i.darkSteel,10.2,.14,.14,0,4,-.6,.02);for(let c=0;c<4;c++)o.box(i.slate,2.6,.08,2.6,-3.9+c*2.6,4.12,.25,.015,.14);o.box(s.fabricRed,10.4,.1,.1,0,4,1.5,.01);const a=o.child(0,3.2,-.6,0);a.put(new we(.4,.4,.1,32),s.ceramic,0,0,.1,Math.PI/2),a.put(new me(.42,.04,8,32),i.brass,0,0,.14),a.box(i.darkSteel,.025,.28,.01,0,-.14,.18,.004),a.box(i.darkSteel,.02,.2,.01,.1,-.1,.19,.004,0,0,-1.1);const r=fo([{text:"PLATFORM 3",y:120,font:"bold 80px Arial, sans-serif"},{text:"COAST EXPRESS",y:230,font:"bold 40px Arial, sans-serif",color:"#d8c598"}],{width:720,height:340,background:"#1f3a5f"});rn(t,r,3.3,3.1,-.6+.1,1.6,.75),Ja(e,o.child(-5.2,0,2.8,0),10.4,.72),Ja(e,o.child(-5.2,0,4.3,0),10.4,.72);for(const c of[-1,1]){const l=o.child(c*4.9,0,3.4);l.cyl(i.darkSteel,.05,.07,3.2,0,0,0,8),l.box(s.plasticDark,.3,.8,.2,0,3,0,.03),l.ball(c<0?Gn(4112746,.3):Gn(14701917,.3),.08,0,3.25,.12),Ne(t,c<0?t.glow:t.edge,c*4.9,3.9,3.4,.14)}Qt(e,o.child(-3,.54,.2,Math.PI),1.8),Qt(e,o.child(3,.54,.2,Math.PI),1.8),le(t,{shirt:6982312,hair:2825494,backpack:13081146,seated:!0,pose:"listen"},-3.3,.54+.45,0,0),Ni(e,o.child(-1.8,.54,.6,.3),.55,.6,.3,s.fabricGreen),le(t,{shirt:12681576,hair:5592405,scarf:11553344,pose:"stand"},1,.54,.8,0),le(t,{shirt:7973541,hair:2825494,pose:"phone"},2.8,.54,.7,-.3),Ce(n,"scene-rail-platform")},D5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;Ja(e,o.child(-5.4,0,.2,0),10.8,.9);const a=Gn(3104138,.5),r=Gn(15262936,.5);o.box(i.darkSteel,9,.35,2.3,0,.5,.2,.05),o.box(a,9.2,.7,2.5,0,.85,.2,.06),o.box(r,9.22,.12,2.52,0,1.55,.2,.02),o.box(a,9.2,1.45,2.5,0,1.65,.2,.08),o.box(r,9,.28,2.32,0,3.1,.2,.05),o.put(new we(1.2,1.2,9,24,1,!1,-Math.PI/2-.9,1.8),i.darkSteel,0,3.25,.2,0,0,Math.PI/2,1,1,.7);const c=[-3.5,-1.75,0,1.75,3.5];c.forEach(l=>{o.box(i.darkSteel,1.42,1,.06,l,1.75,1.45,.02),o.put(new Je(1.3,.88),i.glass,l,2.25,1.49)});for(const l of c)o.box(s.fabricBlue,.7,.18,.5,l,1.45,.7,.04),o.box(s.fabricBlue,.7,.6,.12,l,1.5,.45,.04,-.1);le(t,{shirt:12681576,hair:2825494,hairStyle:"long",seated:!0,pose:"read"},-1.75,1.5,.55,Math.PI),le(t,{shirt:7902858,hair:4471348,seated:!0,pose:"phone"},1.75,1.5,.55,Math.PI),o.box(r,1.1,2,.06,4.15,.9,1.46,.02),o.box(i.slate,.9,.12,.35,4.15,.55,1.65,.02);for(const l of[-3,3]){o.box(i.darkSteel,1.7,.2,.3,l,.28,1.2,.03);for(const f of[-.55,.55])o.put(new we(.34,.34,.12,24),i.steel,l+f,.34,1.3,Math.PI/2)}for(const l of[-3,0,3])o.cyl(i.steel,.2,.22,.18,l,3.9,.2,14);Ne(t,t.glow,0,5,.2,.22),ie(e,o.child(-5,0,3)),ie(e,o.child(5,0,3)),Ce(n,"scene-rail-car")},I5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.6,3.6,.04,0,0,0,40);const a=Gn(14142901,.9);o.box(a,2.6,4.8,.25,-2.9,0,-2.2,.03),o.box(a,2.6,4.8,.25,2.9,0,-2.2,.03),o.box(a,3.4,1.4,.25,0,3.4,-2.2,.03),o.box(a,3.4,.9,.25,0,0,-2.2,.03),o.put(ko(1.85,1.65,.3,.04),i.woodDark,0,2.2,-2.2),o.box(i.woodDark,.12,2.2,.3,-1.7,.9,-2.2,.02),o.box(i.woodDark,.12,2.2,.3,1.7,.9,-2.2,.02),rn(t,b5(),0,2.5,-2.5,3.4,2),o.put(new Je(3.3,1.8),i.glass,0,2.5,-2.25);for(const r of[-1,1]){for(let c=0;c<4;c++)o.box(s.fabricRed,.18,2.4-c*.1,.1,r*(1.55+c*.1),1.2,-2+c*.01,.03);o.box(i.brass,.1,.06,.14,r*1.55,1.9,-2,.01)}hn(e,o.child(0,0,-1.4),1,.5,.74,i.wood),wo(e,o.child(-.2,.74,-1.4)),xn(e,o.child(.25,.74,-1.4,.2)),Jt(e,o.child(-.6,0,-.4,Math.PI),i.woodDark),le(t,{shirt:12681576,hair:2825494,hairStyle:"long",seated:!0,pose:"listen"},-.6,.45,-.4,Math.PI),Jt(e,o.child(.6,0,-.4,Math.PI),i.woodDark),le(t,{shirt:6982312,hair:5592405,seated:!0,pose:"point",glasses:!0},.6,.45,-.4,Math.PI-.3),ie(e,o.child(-4.8,0,2.2)),ie(e,o.child(4.8,0,2.2)),ft(e,o.child(-3.6,0,1.8),.5,33),ft(e,o.child(3.6,0,1.8),.5,35),Ne(t,t.glow,1.1,3.9,-2,.28),Ce(n,"scene-landscape-window")},L5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.box(i.woodDark,8.6,.95,4.4,0,0,-.9,.06),o.box(Gn(8297058,.95),8.2,.05,4,0,.95,-.9,.02),[[-3,-1.2,1.1],[.2,-1.8,1.4],[3,-1,1]].forEach(([l,f,d],u)=>{for(let h=0;h<9;h++){const m=l+(h%3-1)*.5*d,_=f+(Math.floor(h/3)-1)*.45*d,p=(.3+(h*37+u*11)%10/10*.8)*d;o.box(h%2?i.stoneWarm:s.fabricCream,.36*d,p,.34*d,m,1,_,.02),o.box(i.slate,.4*d,.03,.38*d,m,1+p,_,.005)}Ne(t,t.glow,l,1+1.6*d+.3,f,.18*d)}),[[-3,-1.2,.2,-1.8],[.2,-1.8,3,-1],[-3,-1.2,3,-1]].forEach(([l,f,d,u],h)=>{const m=Math.hypot(d-l,u-f),_=Math.atan2(u-f,d-l),p=Math.round(m/.3);for(let g=0;g<p;g++){const x=(g+.5)/p,M=l+(d-l)*x,S=f+(u-f)*x+(h===2?.9*Math.sin(x*Math.PI):0);o.box(h===2?i.paveA:i.woodDark,.12,.03,.34,M,1,S,.008,0,-_)}if(h!==2)for(const g of[-.1,.1])o.box(i.steel,m,.025,.025,(l+d)/2,1.03,(f+u)/2+g,.005,0,-_)}),o.box(Gn(12073778,.5),.5,.18,.2,-1.4,1.04,-1.5,.04,0,.25),o.box(i.darkSteel,.3,.12,.18,-1,1.04,-1.62,.03,0,.25),le(t,{shirt:7973541,hair:2825494,backpack:13081146,pose:"point",lean:.12},.3,0,2.3,0),le(t,{shirt:12681576,hair:5592405,pose:"listen"},-1.4,0,2.5,.3);const c=fo([{text:"ROUTE NETWORK",y:110,font:"bold 70px Arial, sans-serif"}],{width:720,height:220,background:"#1f3a5f"});rn(t,c,0,.55,1.35,1.8,.55,0,-.18),ie(e,o.child(-4.9,0,2.4)),ie(e,o.child(4.9,0,2.4)),Ce(n,"scene-route-network")},U5={itinerary:S5,detour:w5,"market-encounter":y5,"reflection-garden":E5,hostel:T5,"open-route":A5,"rain-shelter":R5,confidence:P5,"rail-platform":C5,"rail-car":D5,"landscape-window":I5,"route-network":L5};function N5(t,n,e){const[o,i]=Et(t,e);return[o,nt+n*Pe,i]}const ao=(t,n=.85,e=.02,o={})=>{const i=new ge({color:t,roughness:n,metalness:e,...o});return i.fog=!1,i};function dd(t,n,e){const i=document.createElement("canvas");i.width=t*120,i.height=n*120;const s=i.getContext("2d");if(!s)return;const a=["#b83b32","#2f5d8a","#c79a3a","#3f7a4f","#e8dec6","#6a4a8a"];for(let c=0;c<n;c++)for(let l=0;l<t;l++){const f=c*t+l+e,d=l*120,u=c*120;s.fillStyle=a[f*5%a.length],s.fillRect(d,u,120,120),s.fillStyle=a[(f*3+4)%a.length];const h=f%3;h===0?(s.beginPath(),s.moveTo(d+120/2,u+14),s.lineTo(d+120-14,u+120/2),s.lineTo(d+120/2,u+120-14),s.lineTo(d+14,u+120/2),s.closePath(),s.fill()):h===1?(s.beginPath(),s.arc(d+120/2,u+120/2,38,0,Math.PI*2),s.fill(),s.fillStyle=a[f*5%a.length],s.beginPath(),s.arc(d+120/2,u+120/2,18,0,Math.PI*2),s.fill()):(s.lineWidth=10,s.strokeStyle=a[(f*3+4)%a.length],s.strokeRect(d+20,u+20,80,80),s.strokeRect(d+40,u+40,40,40)),s.strokeStyle="rgba(0,0,0,0.2)",s.lineWidth=2,s.strokeRect(d,u,120,120)}const r=new Wt(i);return r.colorSpace=yt,r.anisotropy=4,r}function wr(t,n,e,o,i=0){const{k:s,f:a}=t,r=a.child(n,0,e,i);r.box(s.m.woodDark,o,.12,1,0,.8,0,.02),r.box(s.m.wood,o+.1,.06,1.05,0,.92,0,.015);for(const c of[-1,1])r.box(s.m.woodDark,.12,.8,.9,c*(o/2-.1),0,0,.02);r.box(s.m.woodDark,o-.4,.1,.1,0,.3,-.4,.01);for(let c=0;c<2;c++)r.box(s.m.wood,.9,.5,.04,-o/2+.8+c*1.05,.12,.47,.01);r.box(s.m.darkSteel,.3,.2,.22,o/2-.5,.98,.3,.02),r.cyl(s.m.darkSteel,.02,.02,.4,o/2-.5,1,.55,8)}function yr(t,n,e,o=2.6,i=1.4){const{k:s,f:a}=t,r=a.child(n,0,e,0);r.box(s.m.wood,o,i,.06,0,1.2,0,.015);for(let c=0;c<4;c++){const l=-o/2+.4+c*(o-.8)/3;r.box(s.m.darkSteel,.05,.5,.03,l,1.6-c%2*.1,.06,.008),r.box(c%2?s.m.brass:s.m.steel,.2,.1,.04,l,2.1-c%2*.1,.06,.01)}}function Uo(t,n,e,o,i,s=.2){Ne(t.ctx,n,e,o,i,s)}const k5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40),o.cyl(s.fabricCream,3.2,3.2,.05,0,0,0,40),jo(e,o.child(0,0,.2),1.1,.74),js(e,o.child(-.3,.74,.4,Math.PI)),xn(e,o.child(.45,.74,0,.3)),wo(e,o.child(0,.74,.7)),[-2.6,0,2.6].forEach((r,c)=>{const l=o.child(r,0,-2.2,(1-c)*.25);if(l.box(i.stoneDark,1.9,.14,.5,0,0,0,.03),l.box(i.woodDark,.1,2.4,.1,-.85,.14,0,.01),l.box(i.woodDark,.1,2.4,.1,.85,.14,0,.01),l.box(s.boardWhite,1.7,1.9,.06,0,.5,0,.015),l.box([i.copper,i.brass,i.steel][c],1.5,.16,.02,0,2.2,.04,.005),c===0){l.put(new me(.35,.09,8,20),i.steel,0,1.3,.06);for(let f=0;f<8;f++){const d=f/8*Math.PI*2;l.box(i.steel,.12,.2,.08,Math.cos(d)*.48,1.3+Math.sin(d)*.48-.1,.06,.01,0,0,d+Math.PI/2)}}else c===1?(xn(e,l.child(0,.9,.08,0)),l.box(i.brass,.7,.04,.02,0,1.55,.05,.005)):(l.box(i.steel,.12,.9,.05,0,.85,.06,.02,0,0,.7),l.put(new me(.17,.06,8,16,Math.PI*1.5),i.steel,-.24,1.55,.06,0,0,.7))});const a=[[-1.8,.4,Math.PI/2+.15,8214333,"talk",2825494],[1.8,.4,-Math.PI/2-.15,4811890,"listen",5592405],[0,2,Math.PI,9070660,"write",3811868]];for(const[r,c,l,f,d,u]of a)Jt(e,o.child(r,0,c,l),i.wood),le(t,{shirt:f,hair:u,seated:!0,pose:d,glasses:d==="write"},r,.45,c,l);for(const r of[-2,0,2])o.strut(i.darkSteel,[r,5.5,.2],[r,4.2,.2],.01,4),o.cyl(i.lampGlass,.2,.28,.4,r,3.9,.2,12),o.put(new gt(.3,.18,12),i.brass,r,4.38,.2);Uo(n,t.glow,0,3.6,.2,.28),ie(e,o.child(-4.7,0,1.2)),ie(e,o.child(4.7,0,1.2)),ft(e,o.child(-3.6,0,2.8),.5,41),ft(e,o.child(3.6,0,2.8),.5,43),Ce(n,"scene-career")},F5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=o.child(0,0,-2.4,0);a.box(i.stoneDark,4.6,.16,.5,0,0,0,.03);for(const h of[-1,1])a.box(i.woodDark,.12,2.8,.12,h*2.1,.16,0,.01);a.box(i.woodDark,4.6,.14,.2,0,2.95,0,.02),a.box(s.boardWhite,4.2,2.3,.05,0,.55,0,.01);for(let h=0;h<4;h++)a.box(i.slate,2.4-h%2*.5,.06,.012,.3,2.35-h*.5,.04,.004),a.cyl(h<2?i.leaf:i.stoneDark,.1,.1,.012,-1.6,2.28-h*.5,.04,14);[-3,-1,1].forEach(h=>{Ui(e,o.child(h,0,0,0),1.4,.7,.75),Jt(e,o.child(h,0,.8,Math.PI),i.wood)});const r=o.child(3,0,0);Ui(e,r,1.4,.7,.75);const c=r.child(0,0,.8,Math.PI+.2);c.box(i.wood,.42,.04,.42,0,.4,0,.01),c.box(i.wood,.42,.34,.03,0,.46,-.2,.01,-.08);for(const[h,m,_]of[[-1,-1,.4],[1,-1,.4],[-1,1,.25],[1,1,.4]])c.cyl(i.woodDark,.018,.022,_,h*.18,0,m*.18,8);const l=t.ring(.9,nt+.15,Math.PI/2);l.scale.setScalar(.8);const[f,d]=Et(3,.8);l.position.set(f,nt+.25,d);const u=o.child(2,0,1.5,.3);u.box(s.fabricRed,.6,.28,.28,0,0,0,.03),u.box(i.darkSteel,.5,.04,.08,0,.28,0,.01),le(t,{shirt:3104138,trousers:3817285,hair:2825494,pose:"point",backpack:13081146},1.3,0,1.8,.5),Ne(t,t.glow,-1.6,3.2,-1.9,.14),ie(e,o.child(-4.6,0,1.4)),ie(e,o.child(4.6,0,1.4)),Ce(n,"scene-bench")},O5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e,a=ao(11031327,.35,.05),r=ao(2823688,.5,.1);o.cyl(i.stoneDark,2.2,2.4,.4,0,0,-.4,24),o.cyl(i.stone,1.9,2,.3,0,.4,-.4,24);const c=o.child(0,.85,-.4,0);c.put(new ye(1,32,20),a,0,1,0,0,0,0,.95,1.1,.28),c.put(new ye(.78,32,20),a,0,2.15,0,0,0,0,.9,.95,.27),c.put(new we(.5,.5,.36,24),a,0,1.6,0,Math.PI/2,0,0,1,1,1.1);for(const d of[-1,1])c.box(r,.06,.55,.02,d*.34,1.4,.31,.01,0,0,d*.12);c.box(ao(14200944,.5),.5,.1,.1,0,1,.33,.02),c.box(r,.8,.18,.1,0,.2,.3,.02),c.box(r,.22,2.4,.14,0,1.8,.3,.03),c.box(a,.2,.5,.2,0,4.1,.15,.04),c.put(new me(.2,.07,10,20,Math.PI*1.7),a,0,4.75,.15,0,0,.6);for(let d=0;d<4;d++)c.cyl(i.brass,.045,.045,.22,(d%2?1:-1)*.2,4+(d>1?.28:0),.15,8),c.strut(i.steel,[-.075+d*.05,4,.38],[-.075+d*.05,.4,.38],.008,4);Uo(n,t.edge,0,5.8,-.4,.28);const l=o.child(2.2,0,.4,0);l.strut(i.woodDark,[0,0,0],[.5,3.4,0],.025,6),l.strut(s.fabricCream,[.04,.2,.05],[.46,3.2,.05],.012,4);const f=o.child(-2.8,0,1.3,.3);f.cyl(i.darkSteel,.03,.05,1.4,0,0,0,8),f.box(i.darkSteel,.7,.4,.03,0,1.4,0,.01,-.35),f.box(i.paper,.6,.32,.01,0,1.43,.03,.003,-.35),le(t,{shirt:7973541,hair:2825494,hairStyle:"long",pose:"listen"},2.8,0,1.4,-.4),ie(e,o.child(-4.5,0,-.8)),ie(e,o.child(4.5,0,-.8)),ft(e,o.child(-3.6,0,2.8),.5,45),ft(e,o.child(3.6,0,2.8),.5,47),Ce(n,"scene-violin")},G5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;o.cyl(i.stoneWarm,3.7,3.8,.05,0,0,0,40),o.cyl(i.paveA,2.6,2.6,.06,0,0,0,40),[-3.6,-1.2,1.2,3.6].forEach((a,r)=>{const c=o.child(a,0,.2,(r-1.5)*-.1);c.box(i.stoneDark,1.3,.3,1.3,0,0,0,.04),c.box(i.stone,1.05,1,1.05,0,.3,0,.05),c.box(i.brass,.7,.28,.03,0,.62,.54,.008);const l=c.child(0,1.5,0);if(r===0)l.box(i.woodDark,.12,1.1,.12,0,-.1,0,.02,0,0,.35),l.box(i.steel,.5,.26,.26,-.17,.5,0,.03,0,0,.35);else if(r===1)l.box(i.steel,.16,1.3,.08,0,-.1,0,.03,0,0,-.4),l.put(new me(.2,.08,8,20,Math.PI*1.6),i.steel,.28,.58,0,0,0,-.4);else if(r===2){l.put(new me(.4,.12,10,24),i.brass,0,.35,0);for(let f=0;f<10;f++){const d=f/10*Math.PI*2;l.box(i.brass,.14,.2,.2,Math.cos(d)*.55,.35+Math.sin(d)*.55-.1,0,.02,0,0,d+Math.PI/2)}}else l.strut(i.steel,[0,.9,0],[-.35,-.3,0],.035,6),l.strut(i.steel,[0,.9,0],[.35,-.3,0],.035,6),l.ball(i.brass,.09,0,.9,0)}),Uo(n,t.glow,0,3.9,.2,.3),t.ring(4.8,nt+.12,Math.PI/2);for(const a of[-2.4,0,2.4])Qt(e,o.child(a,0,2.6,0),1.6);ie(e,o.child(-4.8,0,1.6)),ie(e,o.child(4.8,0,1.6)),Ce(n,"scene-work-dignity")},B5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40),wr(n,0,-.4,6.6,0);const a=o.child(0,1,-.4,0);a.box(i.steel,5.6,.16,.5,0,0,0,.02);for(let r=0;r<=56;r++)a.box(i.darkSteel,.014,r%5===0?.12:.07,.01,-2.8+r*.1,r%5===0?.04:.08,.255,.002);a.box(i.steel,.2,1.4,.5,-2.7,-0,0,.02),a.box(i.steel,.2,1.4,.5,-.2,0,0,.02),a.box(i.steel,1.2,.5,.52,.45,.16,0,.03),a.box(s.plasticDark,.6,.26,.04,.5,.45,.28,.02),a.put(new Je(.5,.18),s.screenOn,.5,.58,.304),a.cyl(i.darkSteel,.08,.08,.1,.9,.68,0,14),a.cyl(i.brass,.5,.5,1.2,-1.45,.16,0,24),Uo(n,t.glow,-.2,2.6,-.4,.28),Uo(n,t.edge,.5,2,-.4,.16),yr(n,0,-2.4,3.6,1.6),le(t,{shirt:4811890,trousers:3817285,hair:2825494,glasses:!0,pose:"point"},0,0,1.6,0),ie(e,o.child(-4.8,0,1.4)),ie(e,o.child(4.8,0,1.4)),Ce(n,"scene-caliper")},z5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40),wr(n,0,-.5,7,0);const a=.98,r=o.child(-2.3,a,-.5);r.cyl(i.wood,.35,.35,.06,0,.55,0,24);for(let d=0;d<4;d++){const u=d/4*Math.PI*2+Math.PI/4;r.strut(i.woodDark,[Math.cos(u)*.25,.55,Math.sin(u)*.25],[Math.cos(u)*.38,0,Math.sin(u)*.38],.04,8)}const c=o.child(0,a,-.5);c.put(new Vs([new rt(.01,0),new rt(.28,.02),new rt(.4,.35),new rt(.22,.7),new rt(.14,.9),new rt(.2,1)].map(d=>d),28),e.p.ceramic,0,0,0),c.put(new me(.34,.015,6,28),ao(3104138,.4),0,.4,0,Math.PI/2);const l=o.child(2.3,a,-.5);l.cyl(i.brass,.38,.38,.12,0,0,0,28),l.cyl(i.brass,.24,.24,.3,0,.12,0,20);for(let d=0;d<6;d++){const u=d/6*Math.PI*2;l.cyl(i.darkSteel,.04,.04,.02,Math.cos(u)*.3,.12,Math.sin(u)*.3,8)}const f=o.child(-3.2,a,-.9);f.cyl(i.darkSteel,.1,.12,.04,0,0,0,14),f.strut(i.darkSteel,[0,.04,0],[.5,.9,0],.02,6),f.strut(i.darkSteel,[.5,.9,0],[1.4,1.4,.1],.02,6),f.put(new gt(.2,.3,14,1,!0),i.brass,1.45,1.35,.1,Math.PI),[-2.3,0,2.3].forEach(d=>Ne(t,d===0?t.glow:t.edge,d,3.1,-.5,.14)),yr(n,0,-2.4,3.8,1.5),le(t,{shirt:8214333,hair:2825494,hairStyle:"short",glasses:!0,pose:"write"},-1.3,0,.9,.2),le(t,{shirt:4811890,hair:5592405,pose:"point",scarf:13081146},1.3,0,.9,-.2),ie(e,o.child(-4.8,0,1.4)),ie(e,o.child(4.8,0,1.4)),Ce(n,"scene-craft-quality")},H5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40),wr(n,0,-.6,7.4,0);const a=.98,r=o.child(-2.4,a,-.6,.15);r.cyl(i.darkSteel,.05,.07,1,0,0,0,10),r.cyl(i.slate,.2,.25,.08,0,0,0,16),r.put(new we(.62,.62,.14,40),s.ceramic,0,1.4,0,Math.PI/2),r.put(new me(.64,.07,10,40),i.brass,0,1.4,.08);for(let u=0;u<24;u++){const h=u/24*Math.PI*2;r.box(i.darkSteel,.02,u%6===0?.13:.07,.01,Math.sin(h)*.5,1.4+Math.cos(h)*.5-.05,.085,.002,0,0,-h)}r.box(s.fabricRed,.025,.46,.01,.05,1.4,.1,.004,0,0,-.5),r.cyl(i.darkSteel,.03,.03,.3,0,.9,0,8);const c=o.child(2.4,a,-.6,-.15);c.cyl(i.darkSteel,.05,.07,1,0,0,0,10),c.cyl(i.slate,.2,.25,.08,0,0,0,16),c.box(s.plasticDark,1.5,1,.12,0,.9,0,.06);const l=fo([{text:"12.347",y:120,font:"bold 110px 'Courier New', monospace",color:"#8ff0d8"},{text:"mm",y:230,font:"bold 48px Arial, sans-serif",color:"#7ab8a8"}],{width:600,height:340,background:"#10252a",border:"#2e6a64"});rn(t,l,2.4*1+.02,a+1.42,-.6+.08,1.3,.78,-.15),c.cyl(i.steel,.03,.03,.4,0,.5,.2,8);const f=[[-1.6,3],[-.8,3.9],[0,4.2],[.8,3.9],[1.6,3]].map(([u,h])=>new Y(Et(u,-.6)[0],nt+h*Pe,Et(u,-.6)[1])),d=new G(new Bn(new Nn(f),36,.05,6,!1),t.glow);d.userData.isLandscapeRoute=!0,t.root.add(d),Uo(n,t.edge,0,4.6,-.6,.26),yr(n,0,-2.5,3.8,1.5),le(t,{shirt:8214333,hair:2825494,glasses:!0,pose:"point"},0,0,1.1,0),ie(e,o.child(-4.8,0,1.4)),ie(e,o.child(4.8,0,1.4)),Ce(n,"scene-craft-evolution")},V5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;o.put(new we(5,5,.2,48),e.p.water,0,.12,0);const s=1.6;for(const a of[-1,1])o.box(i.stoneDark,1.5,.5,2.2,a*4,0,0,.04),o.box(i.stone,1.2,s-.5,1.8,a*4,.5,0,.05);for(let a=0;a<24;a++)o.box(a%2?i.wood:i.woodDark,.34,.08,1.5,-4+a*.35,s,0,.01);for(const a of[-.8,.8])o.box(i.darkSteel,8.6,.14,.12,0,s-.12,a,.02);for(const a of[-3.4,3.4]){for(const r of[-.9,.9])o.box(i.stone,.4,3.6,.4,a,s,r,.04);o.box(i.stoneDark,.5,.3,2.2,a,s+3.6,0,.04)}for(const a of[-.9,.9]){const r=[];for(let l=0;l<=12;l++){const f=l/12,d=-4.2+f*8.4,u=s+3.8-Math.sin(f*Math.PI)*2.6+(Math.abs(d)>3.4,0);r.push(new Y(Et(d,a)[0],nt+u*Pe,Et(d,a)[1]))}const c=new G(new Bn(new Nn(r),40,.035*Pe,6,!1),ao(2830390,.5,.6));c.userData.isLandscapeRoute=!0,t.root.add(c);for(let l=1;l<12;l++){const f=l/12,d=-4.2+f*8.4,u=s+3.8-Math.sin(f*Math.PI)*2.6;o.strut(i.steel,[d,s+.1,a],[d,u,a],.012,4)}}for(const a of[-.78,.78])Yo(e,o.child(-4,s+.08,a,0),8,.95,i.woodDark);le(t,{shirt:4811890,trousers:3817285,hair:2825494,backpack:13081146,pose:"talk"},-.55,s+.08,0,Math.PI/2+.3),le(t,{shirt:8214333,hair:5592405,scarf:11553344,pose:"talk"},.55,s+.08,0,-Math.PI/2-.3),Uo(n,t.glow,0,5.6,0,.3),ie(e,o.child(-4.8,0,2.2)),ie(e,o.child(4.8,0,2.2)),Ce(n,"scene-trust-bridge")},W5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=o.child(0,0,-1.2,0);for(const c of[-1,1])a.box(i.woodDark,.3,.2,1.3,c*2,0,0,.03),a.box(i.wood,.22,4.4,.22,c*2,.2,0,.03);a.box(i.wood,4.4,.24,.24,0,4.4,0,.03),a.box(i.woodDark,4.2,.18,.2,0,.9,0,.02);const r=[12073778,3104138,13081146,4160079,15261382];for(let c=0;c<22;c++)a.cyl(c%3===0?ao(15261382,.9):ao(r[c%r.length],.9),.014,.014,3.4,-1.9+c*.18,1,0,5);for(let c=0;c<4;c++)a.box(ao(r[(c+1)%r.length],.9),3.9,.22,.04,0,1+c*.24,.03,.008);a.box(i.woodDark,4,.08,.12,0,2.6,.1,.01),a.box(i.wood,3.9,.05,.1,0,3.2,-.05,.01);for(let c=0;c<6;c++)a.cyl(i.stoneDark,.1,.12,.3,-1.8+c*.72,.5,.2,10);o.box(i.woodDark,.5,.05,.1,.9,1.5,-1,.02,0,0,.1),V3(e,o.child(0,0,.6),.46),le(t,{shirt:12073778,hair:2825494,hairStyle:"bun",seated:!0,pose:"write",lean:.1},0,.46,.6,Math.PI);for(const[c,l]of[[-3,.6],[3,.8]]){const f=o.child(c,0,l);f.cyl(i.wood,.4,.3,.45,0,0,0,18);for(let d=0;d<5;d++)f.ball(ao(r[d%r.length],.9),.14,Math.cos(d*1.3)*.18,.5,Math.sin(d*1.3)*.18)}Uo(n,t.glow,0,5.6,-1.2,.26),ie(e,o.child(-4.8,0,1.6)),ie(e,o.child(4.8,0,1.6)),Ce(n,"scene-loom")},X5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40),hn(e,o.child(0,0,.2),4.4,1.1,.78,i.wood);const a=o.child(0,.78,-.1,0);for(const h of[-1,1])a.box(i.woodDark,.1,2.2,.1,h*1.35,0,-.1,.01);a.box(i.woodDark,2.9,.1,.1,0,2.2,-.1,.01),a.put(new me(1.1,.07,10,40),i.wood,0,1.3,-.1);const r=document.createElement("canvas");r.width=800,r.height=800;const c=r.getContext("2d");let l;if(c){c.fillStyle="#efe6d0",c.fillRect(0,0,800,800);const h=["#c13b4a","#e0a63a","#3f7a4f","#2f5d8a"];c.translate(400,400);for(let m=0;m<3;m++)for(let _=0;_<8;_++)c.save(),c.rotate(_/8*Math.PI*2+m*.2),c.fillStyle=h[(_+m)%4],c.beginPath(),c.ellipse(0,-170+m*45-m*15,52-m*10,120-m*28,0,0,Math.PI*2),c.fill(),c.restore();c.fillStyle="#e0a63a",c.beginPath(),c.arc(0,0,46,0,Math.PI*2),c.fill(),l=new Wt(r),l.colorSpace=yt,l.anisotropy=4}if(l){const h=new G(new ci(1.06*Pe,48),new wt({map:l,toneMapped:!1,side:$e})),[m,_]=Et(0,-.1-.05);h.position.set(m,nt+(.78+1.3)*Pe,_),h.rotation.y=Math.PI,h.userData.noLandscapeShadow=!0,t.root.add(h)}const f=o.child(-3.6,0,-.9,.2);f.box(i.woodDark,.9,2,.3,0,0,0,.02);const d=[12073778,3104138,13081146,4160079,6965898,15261382];for(let h=0;h<5;h++)for(let m=0;m<4;m++)f.cyl(ao(d[(h*3+m)%d.length],.8),.07,.07,.14,-.3+m*.2,.25+h*.36,.15,12);for(let h=0;h<6;h++)o.cyl(ao(d[h%d.length],.8),.06,.06,.12,-1.7+h*.22,.78,.65,12);o.box(i.woodDark,.5,.14,.34,1.6,.78,.6,.03),o.strut(i.steel,[1,.8,.7],[1.3,.82,.78],.01,4),wo(e,o.child(-.4,.78,.7));const u=o.child(2,.78,0);u.cyl(i.darkSteel,.1,.12,.04,0,0,0,14),u.strut(i.darkSteel,[0,.04,0],[.1,.9,0],.02,6),u.put(new gt(.2,.22,14,1,!0),i.brass,.12,.95,0,Math.PI),Uo(n,t.glow,2.12,2.2,0,.1),Jt(e,o.child(-.6,0,1.4,Math.PI),i.woodDark),le(t,{shirt:4160079,hair:2825494,hairStyle:"long",glasses:!0,seated:!0,pose:"write",lean:.12},-.6,.45,1.4,Math.PI),ie(e,o.child(-4.8,0,2.2)),ie(e,o.child(4.8,0,2.2)),Ce(n,"scene-embroidery")},q5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=o.child(0,0,-2.2,0);a.box(i.stoneDark,6.6,.2,.8,0,0,0,.03);for(const r of[-1,1])a.box(i.woodDark,.2,4.4,.3,r*3.2,.2,0,.02);a.box(i.woodDark,6.6,.22,.3,0,4.4,0,.02),a.box(i.woodDark,6.2,4,.1,0,.35,0,.02),rn(t,dd(7,5,3),0,.35+2,-2.2+.07,5.9,3.85);for(const r of[-1,1]){const c=o.child(r*2.4,0,.5,-r*.15);c.box(i.woodDark,1.8,.8,.9,0,0,0,.03),c.put(new Ye(1.7,.5,.8),i.glass,0,1.05,0),c.box(r<0?s.fabricRed:s.fabricBlue,1.4,.04,.6,0,.82,0,.01),c.box(s.fabricCream,1,.04,.5,0,.86,0,.01,0,.2)}Ne(t,t.glow,0,4.6,-2,.24),le(t,{shirt:6965898,hair:2825494,hairStyle:"bun",pose:"read"},0,0,1.6,0),Qt(e,o.child(-4.4,0,1.8,.4),1.6),ie(e,o.child(-4.8,0,.2)),ie(e,o.child(4.8,0,.2)),Ce(n,"scene-heritage")},Y5=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40),[0,1,2].forEach(r=>{const c=-.2-r*1.15,l=2.5-r*.45,f=3.3-r*.2,d=o.child(0,0,c,0);for(const h of[-1,1])d.box(i.stoneDark,.8,.26,.8,h*(l+.1),0,0,.04),d.box(i.stone,.56,f-.26,.56,h*(l+.1),.26,0,.05);d.put(ko(l+.4,l-.16,.56,.05),r===1?i.stoneWarm:i.stone,0,f,0);const u=dd(2,5,r*4+1);rn(t,u,0,2.2,c+.05,l*.7,2.6-r*.2),d.box(i.woodDark,l*.8,.08,.1,0,3.55-r*.2,0,.015),Ne(t,r===1?t.edge:t.glow,0,f+l+.5,c,.16)});const a=o.child(-2.8,0,1.8,.4);a.put(new me(.6,.05,8,32),i.wood,0,.8,0);for(let r=0;r<8;r++){const c=r/8*Math.PI*2;a.strut(i.wood,[0,.8,0],[Math.cos(c)*.58,.8+Math.sin(c)*.58,0],.02,5)}a.cyl(i.woodDark,.06,.06,.12,0,.76,0,10),a.box(i.woodDark,.12,.8,.12,0,0,0,.02),a.box(i.woodDark,1.4,.1,.5,.3,.12,0,.02),a.strut(i.steel,[.7,.9,0],[1.2,.9,0],.015,4),a.cyl(s.fabricCream,.1,.1,.2,1.2,.78,0,10),le(t,{shirt:6965898,hair:5592405,hairStyle:"bun",pose:"point"},.9,0,1.6,.4),le(t,{shirt:4160079,hair:2825494,pose:"listen"},2,0,1.5,-.4),ie(e,o.child(-4.8,0,.2)),ie(e,o.child(4.8,0,.2)),ft(e,o.child(3.8,0,2.6),.5,49),Ce(n,"scene-living-heritage")},K5={career:k5,bench:F5,violin:O5,"work-dignity":G5,caliper:B5,"craft-quality":z5,"craft-evolution":H5,"trust-bridge":V5,loom:W5,"embroidery-table":X5,heritage:q5,"living-heritage":Y5},_n=(t,n=.85,e=.02,o={})=>{const i=new ge({color:t,roughness:n,metalness:e,...o});return i.fog=!1,i},ks=(t,n=.8)=>_n(t,.35,.1,{emissive:t,emissiveIntensity:n}),En=_n(15331056,.4,.25),_t=_n(10134440,.5,.4),vt=_n(2107181,.5,.5),ta=_n(1911629,.25,.6),fd=_n(9276037,1),Fs=_n(7170920,1);function ud(){const t=document.createElement("canvas");t.width=800,t.height=400;const n=t.getContext("2d");if(!n)return;n.fillStyle="#9b9893",n.fillRect(0,0,800,400);for(let o=0;o<260;o++){const i=o*197%800,s=o*89%400,a=4+o*53%40;n.fillStyle=`rgba(${90+o%40},${88+o%40},${85+o%40},0.55)`,n.beginPath(),n.arc(i,s,a,0,Math.PI*2),n.fill(),n.strokeStyle="rgba(220,218,212,0.35)",n.lineWidth=2,n.stroke()}const e=new Wt(t);return e.colorSpace=yt,e}function hd(){const t=document.createElement("canvas");t.width=800,t.height=400;const n=t.getContext("2d");if(!n)return;n.fillStyle="#2a5f9a",n.fillRect(0,0,800,400),n.fillStyle="#4f8f4a";for(const[o,i,s,a]of[[160,150,90,70],[300,260,60,80],[520,130,110,60],[620,250,70,50],[700,110,50,40]])n.beginPath(),n.ellipse(o,i,s,a,.3,0,Math.PI*2),n.fill();n.fillStyle="rgba(255,255,255,0.7)";for(let o=0;o<24;o++)n.beginPath(),n.ellipse(o*131%800,o*61%400,50+o%5*12,10+o%3*6,.2,0,Math.PI*2),n.fill();const e=new Wt(t);return e.colorSpace=yt,e}function rs(t,n="#7ef0d4"){const e=document.createElement("canvas");e.width=640,e.height=420;const o=e.getContext("2d");if(!o)return;o.fillStyle="#0d1c24",o.fillRect(0,0,640,420),o.strokeStyle="rgba(120,200,190,0.2)",o.lineWidth=1;for(let s=0;s<13;s++)o.beginPath(),o.moveTo(s*50,0),o.lineTo(s*50,420),o.stroke();for(let s=0;s<9;s++)o.beginPath(),o.moveTo(0,s*50),o.lineTo(640,s*50),o.stroke();for(const[s,a]of[[n,0],["#f0b85a",1.7]]){o.strokeStyle=s,o.lineWidth=4,o.beginPath();for(let r=0;r<=640;r+=6){const c=210+Math.sin(r*.014+t+a)*90+Math.sin(r*.05+t*2)*26;r===0?o.moveTo(r,c):o.lineTo(r,c)}o.stroke()}o.fillStyle="#7ef0d4",o.font="bold 28px 'Courier New', monospace",o.fillText(`TLM-${t*37%90+10}`,18,38);const i=new Wt(e);return i.colorSpace=yt,i.anisotropy=4,i}function Er(t,n,e,o,i=1){const{f:s,k:a}=t,r=s.child(n,0,e);r.put(new we(o,o*1.04,.28,48),fd,0,.14,0);for(let c=0;c<9;c++){const l=c*2.4+i,f=(.25+c*.37%.6)*o,d=.25+(c*29+i)%10*.05;r.put(new me(d,.06,6,22),Fs,Math.cos(l)*f,.3,Math.sin(l)*f*.9,Math.PI/2),r.put(new we(d*.92,d*.92,.03,20),Fs,Math.cos(l)*f,.28,Math.sin(l)*f*.9)}for(let c=0;c<16;c++){const l=c*1.9+i*3,f=(.2+c*.53%.75)*o;r.put(new So(.06+c%4*.045,1),a.m.rock,Math.cos(l)*f,.3,Math.sin(l)*f*.9,c,c*2,0,1.3,.7,1)}}function $5(t,n,e,o,i=1){const{f:s}=t,a=s.child(n,.3,e,o),r=c=>c*i;a.put(new Ye(r(1.6),r(.5),r(1)),En,0,r(.6),0),a.box(_t,r(1.5),r(.08),r(.9),0,r(.88),0,.02);for(const c of[-1,1]){a.box(ta,r(1.3),r(.05),r(.8),0,r(.95),c*r(.95),.01,c*.5);for(let l=1;l<4;l++)a.box(_t,r(1.3),r(.02),r(.015),0,r(.98)+c*.03,c*r(.95)+c*(l-2)*r(.16),.004,c*.5)}for(const c of[-.6,0,.6])for(const l of[-.62,.62])a.put(new we(r(.26),r(.26),r(.2),20),vt,r(c),r(.28),r(l),Math.PI/2),a.put(new me(r(.26),r(.03),6,20),_t,r(c),r(.28),r(l)+(l>0?.1:-.1)*i),a.strut(_t,[r(c),r(.28),r(l)],[r(c*.6),r(.5),r(l*.5)],.02*i,5);a.cyl(_t,r(.03),r(.04),r(1),r(.5),r(1.1),0,8),a.box(En,r(.4),r(.26),r(.3),r(.5),r(2.05),0,.03),a.put(new we(r(.06),r(.06),r(.08),12),vt,r(.5),r(2.18),r(.17),Math.PI/2),a.put(new ye(r(.28),20,8,0,Math.PI*2,0,Math.PI/3),En,r(-.5),r(1.5),0,-.9),a.strut(_t,[r(-.5),r(.9),0],[r(-.5),r(1.4),0],.025*i,6)}function pd(t,n,e,o,i=0,s=-.25){const{f:a,k:r}=t,c=a.child(n,0,e,i);c.box(vt,o,.75,.9,0,0,0,.03),c.box(_t,o,.06,1,0,.75,0,.015),c.box(vt,o,.5,.5,0,.78,-.2,.03,s);const l=[5959864,15775834,14701917,5943536];for(let f=0;f<Math.floor(o/.22);f++)c.cyl(_n(l[f%4],.4,.2,{emissive:l[f%4],emissiveIntensity:f%3===0?.6:.15}),.035,.035,.03,-o/2+.22+f*.22,.84,.06,10);for(let f=0;f<4;f++)c.box(r.p.plasticDark,.16,.02,.1,-o/2+.4+f*(o-.8)/3,.79,.28,.005)}function md(t,n,e,o,i,s,a,r=0){const{f:c,k:l}=t;c.child(e,o-a/2-.08,i,r).box(l.p.plasticDark,s+.12,a+.12,.08,0,0,0,.03),rn(t.ctx,n,e,o,i+.05,s,a,r)}const j5=t=>{const n=Re(t),{f:e,k:o}=n;Er(n,0,.2,4.3,3),$5(n,-.8,-.3,.35,1.5);for(let i=0;i<14;i++){const s=i/13;for(const a of[-.5,.5])e.box(Fs,.3,.02,.18,-3+s*2,.3,1.2+s*-1+a,.005,0,-.45)}for(let i=0;i<6;i++)e.box(Fs,.16,.02,.3,1+i*.28,.3,1.9-i*.12+(i%2?.1:-.1),.01);e.cyl(o.m.steel,.02,.025,2.4,2.6,.3,-.8,8),e.box(o.p.fabricRed,.9,.55,.02,3.05,2,-.8,.004),Ne(t,t.glow,-.8,4.2,-.3,.24),Ne(t,t.edge,.2,2.9,.1,.1),le(t,{shirt:15331056,trousers:15331056,hair:2825494,helmet:!0,pose:"point",backpack:14212576},1.9,.3,1.3,-.6),ie(o,e.child(-4.8,0,2.2)),ie(o,e.child(4.8,0,2.2)),Ce(n,"scene-lunar-probe")},Z5=t=>{const n=Re(t),{f:e,k:o}=n,i=hd(),s=ud(),a=(f,d,u,h)=>{const m=e.child(f,0,-.6);m.cyl(_t,.7,.8,.3,0,0,0,24),m.cyl(vt,.1,.12,.9,0,.3,0,12);const _=new G(new ye(u*Pe,36,24),d?new ge({map:d,roughness:.7}):h),[p,g]=Et(f,-.6);_.position.set(p,nt+(1.2+u)*Pe,g),_.castShadow=!0,_.userData.isLandscapeStage=!0,t.root.add(_),m.put(new me(u*1.2,.03,6,40,Math.PI*1.7),o.m.brass,0,1.2+u,0,.6,0,.4)};a(-3.4,i,1,En),a(3.4,s,.75,_t);const r=e.child(0,0,-1.2);r.cyl(_t,.5,.6,.3,0,0,0,20),r.cyl(En,.28,.34,1.5,0,.3,0,20),r.box(En,.7,.5,.7,0,1.8,0,.06);for(const f of[-1,1]){r.box(ta,1.5,.05,.9,f*1.35,2,0,.01,0,0,f*.08);for(let d=1;d<5;d++)r.box(_t,.015,.06,.9,f*(.6+d*.3),2,0,.003);r.put(new ye(.5,24,10,0,Math.PI*2,0,Math.PI/3),En,f*.62,2.7,.15,-1.1,0,f*.4),r.strut(_t,[f*.4,2,0],[f*.62,2.6,.2],.02,5)}const c=[[-3.4,2.6],[-1.6,4],[0,4.3],[1.6,3.8],[3.4,2.5]].map(([f,d])=>new Y(Et(f,-.9)[0],nt+d*Pe,Et(f,-.9)[1])),l=new G(new Bn(new Nn(c),40,.04*Pe,6,!1),t.glow);l.userData.isLandscapeRoute=!0,t.root.add(l),Ne(t,t.edge,0,4.7,-1.2,.18),pd(n,0,1.6,3.2,Math.PI),le(t,{shirt:4811890,hair:2825494,glasses:!0,seated:!0,pose:"write"},0,.45,2.5,0),Jt(o,e.child(0,0,2.5,0),_t),ie(o,e.child(-4.8,0,2)),ie(o,e.child(4.8,0,2)),Ce(n,"scene-relay-bridge")},Q5=t=>{const n=Re(t),{f:e,k:o}=n,{m:i,p:s}=o;e.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40),e.box(En,7,.85,1.4,0,0,-.8,.04),e.box(vt,7.1,.06,1.5,0,.85,-.8,.015);for(let l=0;l<6;l++)e.box(_t,1,.7,.03,-2.9+l*1.16,.08,-.08,.008);[-2.4,0,2.4].forEach((l,f)=>{const d=e.child(l,.91,-.8);d.cyl(vt,.5,.55,.12,0,0,0,24),d.put(new So(.3+f%2*.06,1),f===1?_n(8023904,.9):i.rock,0,.42,0,f,f*2,0,1.1,.75,.9),d.put(new we(.62,.62,1,28,1,!0),i.glass,0,.62,0),d.cyl(_t,.64,.64,.04,0,1.12,0,28),d.box(i.brass,.3,.1,.02,0,.12,.54,.004)});const a=e.child(3.2,.91,-.3,-.3);a.box(vt,.5,.06,.4,0,0,0,.02),a.strut(_t,[0,.06,-.12],[0,.7,-.12],.045,8),a.put(new we(.06,.06,.6,14),_t,0,.56,0,.5),a.put(new we(.04,.05,.14,12),vt,0,.88,-.14,.5),a.cyl(vt,.1,.1,.04,0,.22,.08,16);const r=e.child(-3.3,.91,-.4);r.cyl(En,.3,.34,.3,0,0,0,20),r.cyl(vt,.28,.28,.04,0,.3,0,20);for(let l=0;l<8;l++)r.cyl(_n(10205388,.3,.1,{transparent:!0,opacity:.8}),.02,.02,.1,-.6+l*.09,0,.35,8);const c=e.child(0,0,-2.5);Zs(o,c.child(0,1.2,0),3.4,1.4,s.boardWhite);for(let l=0;l<3;l++)c.box(i.slate,2.2-l*.4,.05,.02,-.4,2.2-l*.35,.07,.004);c.box(vt,.1,2.6,.1,-1.9,0,0,.01),c.box(vt,.1,2.6,.1,1.9,0,0,.01),le(t,{shirt:15856885,trousers:5857386,hair:2825494,glasses:!0,pose:"write"},-.8,0,.9,.2),Ne(t,t.glow,0,3.2,-.8,.16),ie(o,e.child(-4.8,0,1.6)),ie(o,e.child(4.8,0,1.6)),Ce(n,"scene-sample-lab")},J5=t=>{const n=Re(t),{f:e,k:o}=n,{m:i}=o;Er(n,0,-2.2,3.8,5),e.put(new ye(7,40,16,0,Math.PI*2,0,Math.PI/6),fd,0,-6.6,-4.2);const s=new G(new ye(1.1*Pe,28,20),new ge({map:hd(),roughness:.8})),[a,r]=Et(-1,-4.2);s.position.set(a,nt+3.8*Pe,r),s.userData.isLandscapeBeacon=!0,t.root.add(s);const c=new G(new Ye(11*Pe,.12*Pe,.1),ks(16767120,1)),[l,f]=Et(0,-4);c.position.set(l,nt+.9*Pe,f),c.userData.noLandscapeShadow=!0,t.root.add(c),e.box(vt,6.4,.3,2.2,0,0,1.2,.05),e.box(_t,6.2,.04,2,0,.3,1.2,.02),Yo(o,e.child(-3.1,.34,.3,0),6.2,.95,i.steel);const d=e.child(1.6,.34,1,-.3);d.cyl(vt,.06,.1,1,0,0,0,10),d.put(new we(.12,.15,.9,18),En,.1,1.15,-.2,1.2),le(t,{shirt:15331056,trousers:15331056,hair:2825494,helmet:!0,pose:"point"},-.9,.34,1.2,.1),le(t,{shirt:15331056,trousers:15331056,hair:5592405,helmet:!0,pose:"listen"},.5,.34,1.5,-.3),Ne(t,t.edge,0,4.9,.4,.2),ie(o,e.child(-4.7,0,2.2)),ie(o,e.child(4.7,0,2.2)),Ce(n,"scene-moon-horizon")},ev=t=>{const n=Re(t),{f:e,k:o}=n,{m:i,p:s}=o;e.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40),pd(n,0,.4,5.8,Math.PI),[-1.9,0,1.9].forEach((r,c)=>md(n,rs(c*2.1+1),r,2.7,-.4,1.7,1.1));for(const r of[-1.9,0,1.9])e.box(vt,.1,1.5,.1,r,.8,-.5,.01);const a=e.child(0,0,-2.4);a.box(vt,2.6,.2,1.6,0,0,0,.04);for(const r of[-1,1])a.box(_t,.2,2.2,.2,r*1,.2,0,.03);a.put(new we(.35,.8,1.3,28,1,!0),_n(12093244,.35,.8),0,1.4,0,0,0,0,1,-1,1),a.cyl(_t,.4,.4,.7,0,1.9,0,24),a.put(new me(.62,.03,6,28),i.copper,0,1.2,0,Math.PI/2),a.strut(i.copper,[.5,2,0],[1,.6,.4],.04,6),a.strut(i.steel,[-.5,2,0],[-1,.6,.4],.04,6);for(let r=0;r<7;r++)Ne(t,r%3===0?t.edge:t.glow,-2.6+r*.87,1.25,.1,.08);Jt(o,e.child(0,0,1.7,0),_t),le(t,{shirt:4811890,hair:2825494,glasses:!0,seated:!0,pose:"write",lean:.1},0,.45,1.7,Math.PI),ie(o,e.child(-4.8,0,1.6)),ie(o,e.child(4.8,0,1.6)),Ce(n,"scene-test-console")},tv=t=>{const n=Re(t),{f:e,k:o}=n;e.cyl(vt,3,3.2,.3,0,0,-.2,40),e.cyl(_t,.5,.7,.8,0,.3,-.2,20);const i=new G(new ye(1.2*Pe,40,28),new ge({map:ud(),roughness:.95})),[s,a]=Et(0,-.2);i.position.set(s,nt+2.6*Pe,a),i.castShadow=!0,i.userData.isLandscapeStage=!0,t.root.add(i);for(const[l,f,d]of[[.2,0,2.4],[.78,.55,2.9],[-.55,-.72,3.3]]){const u=t.ring(d*Pe,nt+2.6*Pe,l);u.rotation.y=f,u.position.set(s,nt+2.6*Pe,a),u.scale.setScalar(.5)}const r=(l,f,d,u)=>{const h=e.child(l,f,d,u);h.box(_t,.4,.3,.3,0,0,0,.03);for(const m of[-1,1])h.box(ta,.7,.03,.34,m*.62,.15,0,.008);h.put(new ye(.14,14,6,0,Math.PI*2,0,Math.PI/2.4),En,0,.3,0,-.4),Ne(t,t.edge,l,f+.35,d,.06)};r(2.4,4.2,.2,.3),r(-1.8,5,.1,-.5),r(-2.2,1.8,-.5,.8);const c=e.child(-3.8,0,1.6,.4);c.cyl(vt,.06,.08,1.1,0,0,0,10),c.box(o.p.plasticDark,.8,.5,.05,0,1.1,0,.03,-.35),c.put(new Je(.7,.4),o.p.screenOn,0,1.3,.03,-.35),le(t,{shirt:15331056,trousers:5857386,hair:2825494,glasses:!0,pose:"point"},-2.6,0,1.8,.3),ie(o,e.child(-4.9,0,0)),ie(o,e.child(4.9,0,0)),Ce(n,"scene-orbit-adjustment")},nv=t=>{const n=Re(t),{f:e,k:o}=n;e.cyl(o.p.fabricGrey,3.7,3.7,.04,0,0,0,40),[-3,0,3].forEach((r,c)=>{e.box(vt,.12,1.7,.12,r,0,-1.6,.01),e.box(_t,1.4,.1,.6,r,0,-1.6,.02),md(n,rs(c*1.7+3,c===1?"#f0b85a":"#7ef0d4"),r,3,-1.6,2.3,1.5,(1-c)*.12)}),hn(o,e.child(0,0,.8),4.2,.9,.75,_n(2764854,.5,.3));for(const r of[-1.2,0,1.2])e.box(o.p.plasticDark,.5,.02,.18,r,.75,.9,.006),e.box(o.p.plasticDark,.07,.03,.11,r+.38,.75,.9,.012);const[i,s]=Et(0,-.2),a=new G(new $n(.5*Pe,2),t.glow);a.position.set(i,nt+2.1*Pe,s),a.userData.isLandscapeBeacon=!0,t.root.add(a);for(const r of[.8,1.1]){const c=t.ring(r*Pe,nt+2.1*Pe,Math.PI/2+r*.4);c.position.set(i,nt+2.1*Pe,s),c.scale.setScalar(.3)}e.cyl(vt,.5,.6,.8,0,0,-.2,20),Jt(o,e.child(0,0,1.9,0),_t),le(t,{shirt:6982312,hair:2825494,glasses:!0,seated:!0,pose:"write",lean:.12},0,.45,1.9,Math.PI),ie(o,e.child(-4.8,0,1.6)),ie(o,e.child(4.8,0,1.6)),Ce(n,"scene-systems-simulation")},ov=t=>{const n=Re(t),{f:e,k:o}=n,{m:i}=o;e.cyl(o.p.fabricGrey,3.7,3.7,.04,0,0,0,40),e.box(vt,6.8,.2,.7,0,0,-2.6,.03),e.box(vt,6.6,3.2,.15,0,.2,-2.6,.04),[-2.6,-1.3,0,1.3,2.6].forEach((a,r)=>rn(t,rs(r*1.3+2,r%2?"#f0b85a":"#7ef0d4"),a,2.35,-2.5,1.18,.9));const s=fo([{text:"T-00:42:17",y:160,font:"bold 110px 'Courier New', monospace",color:"#ff9a6a"}],{width:720,height:320,background:"#140d0a",border:"#7a3a28"});rn(t,s,0,1.15,-2.5,3.3,.95),[[.9,0],[-.1,.25],[-1.1,.5]].forEach(([a,r],c)=>{for(const l of[-2.2,0,2.2]){const f=e.child(l,r,a,0);f.box(vt,1.9,.7,.8,0,0,0,.03),f.box(_t,1.9,.05,.85,0,.7,0,.012),f.box(vt,1.2,.5,.06,0,.74,-.25,.02,-.12),f.put(new Je(1.1,.42),c===1&&l===0?ks(2781066,.6):ks(2051935,.5),0,.99,-.215,-.12)}c<2&&e.box(i.stoneDark,7.2,.25,.7,0,0,a-.5,.02)});for(const[a,r]of[[-2.2,0],[0,1],[2.2,2]]){const c=[.9,-.1,-1.1][r]+.8,l=[0,.25,.5][r];Jt(o,e.child(a,l,c,Math.PI),_t),le(t,{shirt:[4811890,6982312,8214333][r],hair:2825494,seated:!0,pose:"write"},a,l+.45,c,Math.PI)}le(t,{shirt:15856885,trousers:5857386,hair:5592405,glasses:!0,pose:"point"},3.6,0,1.8,-.5),Ne(t,t.glow,0,4.3,-2.2,.24),ie(o,e.child(-4.8,0,2.2)),ie(o,e.child(4.8,0,2.2)),Ce(n,"scene-mission-control")},iv=t=>{const n=Re(t),{f:e,k:o}=n,{m:i,p:s}=o;e.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=e.child(0,0,-2.4);a.box(vt,4.2,.2,.7,0,0,0,.03),a.put(new me(1.6,.18,12,40),_t,0,2.3,0),a.put(new we(1.4,1.4,.12,40),_n(2897469,.5,.5),0,2.3,-.02,Math.PI/2);for(let l=0;l<8;l++){const f=l/8*Math.PI*2;a.cyl(i.brass,.06,.06,.08,Math.cos(f)*1.28,2.3+Math.sin(f)*1.28-.04,.07,10)}a.put(new me(.4,.06,8,24),i.brass,0,2.3,.08);const r=e.child(-3.6,0,-1.2,.3);Zs(o,r.child(0,.5,0),1.8,1.8,s.boardWhite);for(let l=0;l<5;l++)r.box(i.slate,1.2,.05,.02,0,2-l*.28,.07,.004),r.cyl(l<3?i.leaf:i.stoneDark,.06,.06,.012,-.8,2-l*.28,.07,10);const c=e.child(.6,0,.6,0);c.box(vt,1,.25,2.4,0,0,0,.05),c.box(_n(3159611,.8),.8,.03,2.2,0,.25,0,.01),c.box(vt,.08,1.5,.08,-.5,.25,-1.1,.01),c.box(vt,.08,1.5,.08,.5,.25,-1.1,.01),c.box(vt,1.2,.08,.08,0,1.75,-1.1,.01),c.box(s.fabricRed,.6,.08,.04,0,1.2,-1.1,.01),le(t,{shirt:15331056,trousers:15331056,hair:2825494,helmet:!0,pose:"walk",backpack:14212576},.6,.26,.6,Math.PI/2+Math.PI/2*0),le(t,{shirt:3891087,hair:5592405,glasses:!0,pose:"read"},2.6,0,1.2,-.5),Ne(t,t.edge,0,4.8,-2.3,.22),t.ring(3*Pe,nt+.12,Math.PI/2),ie(o,e.child(-4.8,0,1.8)),ie(o,e.child(4.8,0,1.8)),Ce(n,"scene-training")},sv=t=>{const n=Re(t),{f:e,k:o}=n,{m:i,p:s}=o;e.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=(c,l)=>{const f=e.child(c,0,-1.4,l);f.box(vt,2.4,.3,2,0,0,0,.05),f.put(new ur(.95,1.5,12,28),En,0,1.6,0,0,0,Math.PI/2*0,1,1.3,1),f.put(new we(.34,.34,.12,28),i.glass,0,1.75,.92,Math.PI/2),f.put(new me(.34,.06,8,28),_t,0,1.75,.95),f.put(new me(.62,.05,8,32),i.brass,0,1,.9),f.box(vt,.8,.08,.5,0,.3,1,.02);for(let d=0;d<6;d++)f.cyl(d%2?i.brass:_t,.04,.04,.04,-.4+d*.16,.9,.96,8)};a(-2.6,.2),a(2.6,-.2);const r=e.child(0,0,.5);r.cyl(vt,.04,.05,1.2,0,0,0,8),r.box(o.p.plasticDark,.7,.9,.05,0,1.15,0,.03),r.put(new Je(.6,.8),rs(8)?new wt({map:rs(8),toneMapped:!1}):o.p.screenOn,0,1.6,.03),le(t,{shirt:15331056,trousers:15331056,hair:2825494,helmet:!0,pose:"talk",backpack:14212576},-1,0,1.5,.5),le(t,{shirt:15331056,trousers:15331056,hair:5592405,helmet:!0,pose:"listen",backpack:14212576},1,0,1.5,-.5),Ne(t,t.glow,0,4.4,-.2,.26),ie(o,e.child(-4.8,0,1.8)),ie(o,e.child(4.8,0,1.8)),Ce(n,"scene-crew-simulation")},av=t=>{const n=Re(t),{f:e,k:o}=n,{m:i,p:s}=o;e.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40),e.cyl(vt,2,2.2,.35,0,0,-.4,36),e.cyl(_t,.3,.4,.5,0,.35,-.4,16);const[a,r]=Et(0,-.4),c=new G(new ye(.42*Pe,28,20),ks(16761178,1));c.position.set(a,nt+1.7*Pe,r),c.userData.isLandscapeBeacon=!0,t.root.add(c);const l=[[1,.12,11576720,.4],[1.6,.18,3899332,1.9],[2.3,.3,13672544,3.4],[3,.22,13199946,5]];for(const[f,d,u,h]of l){e.put(new me(f,.012,6,56),i.brass,0,1.7,-.4,Math.PI/2);const m=Math.cos(h)*f,_=-.4+Math.sin(h)*f*.9;e.strut(_t,[m,1.7,_],[m*.6,.4,-.4+(_+.4)*.6],.012,4),e.put(new ye(d,18,12),_n(u,.6),m,1.7,_)}e.put(new me(.45,.025,6,30),_n(14207392,.5),Math.cos(3.4)*2.3,1.7,-.4+Math.sin(3.4)*2.3*.9,Math.PI/2-.4);for(const f of[-1,1]){const d=e.child(f*3.6,0,.8,-f*.5);d.box(i.stoneDark,.8,.14,.5,0,0,0,.03),d.cyl(vt,.04,.05,.9,0,.14,0,8),d.box(vt,1,.7,.05,0,.95,0,.03,-.3),d.box(s.boardWhite,.9,.6,.012,0,.99,.03,.004,-.3)}le(t,{shirt:8214333,hair:2825494,hairStyle:"bun",pose:"point"},-1.2,0,2,.3),le(t,{shirt:6982312,hair:5592405,backpack:13081146,pose:"read",scale:1},1.4,0,2.2,-.3),Qt(o,e.child(0,0,3.4,Math.PI),1.8),ie(o,e.child(-4.8,0,1.2)),ie(o,e.child(4.8,0,1.2)),Ce(n,"scene-science-exhibit")},rv=t=>{const n=Re(t),{f:e,k:o}=n,{m:i}=o;Er(n,0,0,4.4,9);const s=e.child(0,.3,-.6);s.cyl(En,2.7,2.8,.4,0,0,0,40),s.put(new ye(2.5,40,20,0,Math.PI*2,0,Math.PI/2),_n(10475752,.12,.2,{transparent:!0,opacity:.38,emissive:2781066,emissiveIntensity:.25}),0,.4,0);for(let a=0;a<10;a++){const r=a/10*Math.PI,c=[];for(let d=0;d<=12;d++){const u=d/12*(Math.PI/2);c.push([Math.cos(r)*Math.cos(u)*2.52,.4+Math.sin(u)*2.52,Math.sin(r)*Math.cos(u)*2.52])}for(let d=0;d<12;d++)s.strut(En,c[d],c[d+1],.03,5);const l=a/10*Math.PI+Math.PI,f=[];for(let d=0;d<=12;d++){const u=d/12*(Math.PI/2);f.push([Math.cos(l)*Math.cos(u)*2.52,.4+Math.sin(u)*2.52,Math.sin(l)*Math.cos(u)*2.52])}for(let d=0;d<12;d++)s.strut(En,f[d],f[d+1],.03,5)}s.put(new me(2.5,.06,8,40),En,0,.42,0,Math.PI/2),s.box(vt,.9,1.3,.1,0,.4,2.45,.03);for(const a of[-1,1]){const r=e.child(a*3.9,.3,.2,-a*.2);for(let c=0;c<2;c++){r.box(ta,1.6,.06,1.1,0,.95+c*.08,-.6+c*1.2,.01,-.45);for(let l=1;l<4;l++)r.box(_t,1.6,.012,.016,0,.99+c*.08,-.6+c*1.2,.002,-.45)}r.box(_t,.1,1,.1,-.6,0,0,.01),r.box(_t,.1,1,.1,.6,0,0,.01)}for(let a=0;a<10;a++){const r=a/10*Math.PI*2;Ne(t,a%2?t.edge:t.glow,Math.cos(r)*3.6,.5,1+Math.sin(r)*3,.07)}Ne(t,t.glow,0,4.6,-.6,.3),le(t,{shirt:15331056,trousers:15331056,hair:2825494,helmet:!0,pose:"point",backpack:14212576},-.8,.3,2.2,.2),ie(o,e.child(-4.8,0,2.4)),ie(o,e.child(4.8,0,2.4)),Ce(n,"scene-future-frontier")},cv={"lunar-probe":j5,"relay-bridge":Z5,"sample-lab":Q5,"moon-horizon":J5,"test-console":ev,"orbit-adjustment":tv,"systems-simulation":nv,"mission-control":ov,training:iv,"crew-simulation":sv,"science-exhibit":av,"future-frontier":rv},Fi=(t,n=.85,e=.02,o={})=>{const i=new ge({color:t,roughness:n,metalness:e,...o});return i.fog=!1,i};function bo(t,n,e,o,i,s,a,r,c=0){ed(t.k,t.f.child(n,e,o,c),i,s,a,r)}function lv(){const t=document.createElement("canvas");t.width=1e3,t.height=600;const n=t.getContext("2d");if(!n)return;n.fillStyle="#f3efe2",n.fillRect(0,0,1e3,600),n.strokeStyle="rgba(60,80,70,0.25)",n.lineWidth=2;for(let o=0;o<6;o++)n.beginPath(),n.moveTo(80,120+o*80),n.lineTo(940,120+o*80),n.stroke();n.fillStyle="#24483f",n.font="bold 54px Arial, sans-serif",n.fillText("COMMUNITY BUDGET",80,74),n.font="bold 30px Arial, sans-serif",n.fillStyle="#4a6a60",n.fillText("BOOKS",190,575),n.fillText("TOOLS",470,575),n.fillText("SHARED",740,575);const e=new Wt(t);return e.colorSpace=yt,e.anisotropy=4,e}function dv(){const t=document.createElement("canvas");t.width=900,t.height=700;const n=t.getContext("2d");if(!n)return;n.fillStyle="#12232c",n.fillRect(0,0,900,700),n.fillStyle="#7ef0d4",n.font="bold 44px Arial, sans-serif",n.fillText("DIGITAL LENDING",40,70);const e=["#b83b32","#2f5d8a","#c79a3a","#3f7a4f","#6a4a8a","#e8dec6"];for(let i=0;i<3;i++)for(let s=0;s<5;s++){const a=40+s*168,r=110+i*190;n.fillStyle=e[(i*5+s)%e.length],n.fillRect(a,r,140,170),n.fillStyle="rgba(255,255,255,0.8)",n.fillRect(a+14,r+20,112,10),n.fillRect(a+14,r+44,80,8)}n.fillStyle="#7ef0d4",n.fillRect(40,660,300,14);const o=new Wt(t);return o.colorSpace=yt,o.anisotropy=4,o}const fv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e,a=o.child(0,0,-1.8,0),r=Fi(4090718,.85);a.box(i.stoneDark,7.4,.3,2.8,0,0,0,.03),a.box(r,7.2,3.4,2.6,0,.3,0,.04),a.box(i.woodDark,7.4,.4,2.8,0,3.7,0,.03),a.put(Yn(7.6,.9,2.9),i.slate,0,4.1,0);for(const d of[-1,1]){Sr(e,a.child(d*2.3,.78,1.32),2.3,1.9,{cols:3,rows:2,lit:!0,frame:i.woodDark});for(let u=0;u<3;u++){a.box(i.wood,2.2,.04,.12,d*2.3,1+u*.6,1.31,.008);for(let h=0;h<14;h++)a.box(s.books[(h+u*3+(d>0?5:0))%s.books.length],.07,.2+(h*7+u)%4*.03,.1,d*2.3-1+h*.15,1.04+u*.6,1.31,.004)}}a.box(i.woodDark,1.4,2.5,.1,0,.3,1.32,.02),a.box(i.wood,1.2,2.3,.07,0,.35,1.36,.015),a.put(new Je(.7,1.2),i.glass,0,1.7,1.41),a.box(i.brass,.06,.06,.05,.4,1.3,1.42,.01),Qs(e,a.child(0,.4,1.35,0),6.8,1.2,12,s.fabricGreen,s.fabricCream);const c=fo([{text:"BOOK EXCHANGE",y:78,font:"bold 70px Arial, sans-serif",color:"#fff4dc"},{text:"LEAVE ONE  ·  TAKE ONE",y:150,font:"bold 32px Arial, sans-serif",color:"#fff4dc"}],{width:1024,height:192,background:"#24483f",border:"#d9b77a"});rn(t,c,0,3.5,-1.8+1.5,5.4,1),Ne(t,t.glow,-3.3,4.2,-.2,.14),j3(e,o.child(-3.3,0,.9,.3),3),hn(e,o.child(3.2,0,.9,-.2),1.6,.7,.8,i.wood),kn(e,o.child(2.8,.8,.9,.2),5,4),xn(e,o.child(3.5,.8,.85,-.3));const l=o.child(1.9,0,2,-.35);l.box(i.woodDark,.8,1.1,.06,0,0,0,.015,-.12),l.box(s.boardGreen,.7,.95,.02,0,.07,.04,.005,-.12),le(t,{shirt:13081146,hair:5592405,glasses:!0,pose:"talk",scarf:4160079},.9,0,1.4,-.2),le(t,{shirt:6982312,hair:2825494,backpack:11553344,pose:"read"},-1.2,0,1.8,.3);const f=new Kn(16768160,1.8,16,2);f.position.set(...Cs(0,2.2,.4)),t.root.add(f),ie(e,o.child(-4.9,0,2.2)),ie(e,o.child(4.9,0,2.2)),ft(e,o.child(-1.9,0,3),.5,51),Ce(n,"scene-bookshop")},uv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40),o.cyl(s.fabricCream,3.2,3.2,.05,0,0,0,40),bo(n,-3.5,0,-.9,2.6,3.4,7,11,.5),bo(n,3.5,0,-.9,2.6,3.4,7,17,-.5),bo(n,0,0,-2.5,3.2,3,6,23,0),Js(e,o.child(1.6,0,-2.2,0),2.6),hn(e,o.child(0,0,.4),3,.9,.78,i.wood),kn(e,o.child(-.8,.78,.4,.2),6,8),kn(e,o.child(.7,.78,.45,-.3),4,9),xn(e,o.child(0,.78,.6,.1));const a=fo([{text:"SWAP A BOOK",y:100,font:"bold 70px Arial, sans-serif"}],{width:720,height:220,background:"#3a2d20"});rn(t,a,0,1.25,.95,1.2,.36,0,-.25),le(t,{shirt:6982312,hair:2825494,pose:"talk",backpack:13081146},-1.5,0,1.4,.5),le(t,{shirt:12681576,hair:5592405,hairStyle:"bun",pose:"listen"},1.5,0,1.4,-.5);for(const r of[-2.2,0,2.2])Ne(t,t.glow,r,4,.2,.14);ie(e,o.child(-4.8,0,1.8)),ie(e,o.child(4.8,0,1.8)),Ce(n,"scene-exchange")},hv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(i.stoneWarm,3.7,3.8,.05,0,0,0,40);const a=o.child(0,0,-2.4,0);for(const r of[-1,1])a.box(i.stoneDark,1.2,.35,1.2,r*3.4,0,0,.05),a.box(i.stone,.95,3.6,.95,r*3.4,.35,0,.06);a.put(ko(3.9,3,1,.06),i.stone,0,3.95,0),a.box(i.stoneDark,.9,.8,1.1,0,7,0,.05),[-3,-1,1,3].forEach((r,c)=>{$o(e,o.child(r,0,0,(c-1.5)*.12),1.7,2,1.5,c%2?i.terracottaRoof:i.slate,s.fabricCream),ie(e,o.child(r,0,1.1),2),Ne(t,c%2?t.edge:t.glow,r,3.5,0,.2)});for(let r=0;r<12;r++)o.box(r%2?i.paveA:i.paveB,.8,.045,.5,(r-5.5)*.12,0,2.6-r*.28-0,.015);le(t,{shirt:7973541,hair:2825494,backpack:13081146,pose:"walk"},-.6,0,2.6,.2),le(t,{shirt:12163964,hair:5592405,scarf:11553344,pose:"talk"},.6,0,2.4,-.3),ft(e,o.child(-4.6,0,2.2),.5,53),ft(e,o.child(4.6,0,2.2),.5,55),Ce(n,"scene-resilience")},pv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=o.child(0,0,-2.4,0);a.box(i.stoneDark,6.4,.2,.8,0,0,0,.03);for(const c of[-1,1])a.box(i.woodDark,.18,4.2,.22,c*3,.2,0,.02);a.box(i.woodDark,6.4,.2,.3,0,4.2,0,.02),a.box(i.woodDark,5.9,3.7,.1,0,.45,0,.02),rn(t,lv(),0,.45+1.85,-2.4+.07,5.6,3.4);const r=[1,1.7,2.5];[-1.7,.1,1.9].forEach((c,l)=>{const f=[i.copper,i.brass,i.leaf][l];a.box(f,.95,r[l],.22,c,.85,.14,.03),a.box(i.paper,.6,.06,.02,c,.85+r[l]-.15,.26,.004)}),Ne(t,t.glow,1.9,.85+2.5+.35,-2.2,.2);for(let c=0;c<5;c++){const l=o.child(3+c%2*.45,0,.6+Math.floor(c/2)*.45);for(let f=0;f<3+c;f++)l.cyl(i.brass,.17,.17,.04,0,f*.045,0,18)}hn(e,o.child(-2.6,0,.8,.2),1.6,.7,.8,i.wood),xn(e,o.child(-2.6,.8,.8,.2)),wo(e,o.child(-2.1,.8,.8)),le(t,{shirt:4811890,hair:2825494,glasses:!0,pose:"point"},0,0,1.4,0),ie(e,o.child(-4.8,0,1.4)),ie(e,o.child(4.8,0,1.4)),Ce(n,"scene-budget-board")},mv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=o.child(0,0,-2.3,0);a.box(i.woodDark,7.4,.25,.9,0,0,0,.03),a.box(i.woodDark,7.4,4,.12,0,.25,-.35,.02);for(const c of[-1,1])a.box(i.woodDark,.16,4,.7,c*3.6,.25,0,.02);a.box(i.woodDark,7.4,.18,.74,0,4.25,0,.02);for(let c=0;c<=4;c++)a.box(i.wood,7.1,.06,.66,0,.3+c*.95,0,.012);for(let c=1;c<7;c++)a.box(i.wood,.05,3.8,.66,-3.55+c*1.015,.3,0,.01);const r=c=>(Math.sin(c*12.9898)*43758.5453%1+1)%1;for(let c=0;c<4;c++)for(let l=0;l<7;l++){const f=-3.55+l*1.015+.55;let d=f-.42,u=0;for(;d<f+.4;){const h=.05+r(c*77+l*13+u)*.05;a.box(s.books[Math.floor(r(c*31+l*7+u*5)*s.books.length)],h,.4+r(c*5+l*11+u)*.35,.34,d+h/2,.36+c*.95,-.05,.004),d+=h+.003,u++}}Js(e,o.child(-1,0,-1.7,0),3.2),le(t,{shirt:12681576,hair:2825494,hairStyle:"long",pose:"read"},-1,1.4,-1.55,0),Jt(e,o.child(2.3,0,.6,Math.PI*.8),i.woodDark),jo(e,o.child(3.2,0,.3),.42,.55),wo(e,o.child(3.2,.55,.3)),le(t,{shirt:6982312,hair:5592405,seated:!0,pose:"read",glasses:!0},2.3,.45,.6,Math.PI*.8),kn(e,o.child(.6,0,1,.3),5,6),Ne(t,t.glow,0,5,-1.9,.2),ie(e,o.child(-4.8,0,1.4)),ie(e,o.child(4.8,0,1.4)),Ce(n,"scene-exchange-wall")},gv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(i.stoneWarm,3.7,3.8,.05,0,0,0,40);const a=[[0,-1.8],[2.8,1.3],[-2.8,1.3]];a.forEach(([c,l],f)=>{const d=o.child(c,0,l,0);if(d.cyl(i.stoneDark,1,1.1,.35,0,0,0,24),d.cyl(i.stone,.85,.9,.3,0,.35,0,24),f===0)kn(e,d.child(-.25,.65,0,.3),5,3),xn(e,d.child(.3,.65,.1,-.2));else if(f===1)for(let u=0;u<5;u++){const h=u*1.3;d.cyl(i.soil,.12,.1,.12,Math.cos(h)*.4,.65,Math.sin(h)*.4,10),d.cyl(i.leaf,.02,.02,.28,Math.cos(h)*.4,.77,Math.sin(h)*.4,5),d.ball(i.leafLight,.1,Math.cos(h)*.4,1.08,Math.sin(h)*.4,1,.8,1)}else d.box(s.leather,.7,.14,.3,0,.65,0,.02),d.box(i.woodDark,.12,.7,.12,-.1,.79,0,.015,0,0,.6),d.box(i.steel,.4,.2,.2,-.3,1.35,0,.02,0,0,.6),d.put(new me(.2,.06,8,18,Math.PI*1.5),i.steel,.35,.95,0)});const r=(c,l)=>{const f=[(c[0]+l[0])/2*1.35,(c[1]+l[1])/2*1.35-.2],d=new pl(new Y(...Cs(c[0]*.65,1.8,c[1]*.65)),new Y(...Cs(f[0],2.5,f[1])),new Y(...Cs(l[0]*.65,1.8,l[1]*.65))),u=new G(new Bn(d,30,.06*Pe,6,!1),t.edge);u.userData.isLandscapeRoute=!0,t.root.add(u);const h=d.getPoint(1),m=d.getTangent(1),_=new G(new gt(.18*Pe,.45*Pe,12),t.edge);_.position.copy(h),_.quaternion.setFromUnitVectors(new Y(0,1,0),m),t.root.add(_)};r(a[0],a[1]),r(a[1],a[2]),r(a[2],a[0]),Ne(t,t.glow,0,3.6,.2,.3),le(t,{shirt:7973541,hair:2825494,backpack:13081146,pose:"walk"},.4,0,2.6,.3),ie(e,o.child(-4.8,0,2.2)),ie(e,o.child(4.8,0,2.2)),Ce(n,"scene-resource-cycle")},vv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40),hn(e,o.child(0,0,-.4),6.2,2.2,.82,i.woodDark),o.box(s.fabricGreen,5.8,.02,1.9,0,.82,-.4,.005);const a=o.child(0,.84,-.4,0);a.box(s.leather,4.4,.12,1.7,0,0,0,.04),a.box(i.paper,2,.1,1.55,-1.05,.12,0,.02,0,0,.03),a.box(i.paper,2,.1,1.55,1.05,.12,0,.02,0,0,-.03),a.box(i.stoneDark,.08,.14,1.6,0,.1,0,.01);for(let l=0;l<9;l++)a.box(i.slate,1.8,.008,.012,-1.05,.225,-.65+l*.16,.002),a.box(i.slate,1.8,.008,.012,1.05,.225,-.65+l*.16,.002);for(const l of[-1.7,-1.1,-.5,.5,1.1,1.7])a.box(i.slate,.012,.008,1.4,l,.225,0,.002);a.box(s.fabricRed,.5,.01,.25,1.4,.23,-.5,.003);const r=o.child(2.3,.84,.3,.4);r.strut(s.fabricCream,[0,0,0],[.5,.25,0],.014,5),r.put(new gt(.04,.2,5),s.fabricCream,.55,.28,0,0,0,-1.2);const c=o.child(2.8,.84,-.2);c.cyl(Fi(1911629,.2,.2),.1,.12,.14,0,0,0,14),c.cyl(i.brass,.06,.06,.04,0,.14,0,10),o.cyl(s.fabricRed,.1,.1,.02,1.4,.84,.6,14);for(const l of[-1,1]){const f=o.child(l*3.9,0,-.2);f.cyl(i.stoneDark,.5,.6,.4,0,0,0,20),f.cyl(i.stone,.3,.4,.8,0,.4,0,16),f.box(i.brass,.4,.06,.4,0,1.2,0,.01),Ne(t,l<0?t.edge:t.glow,l*3.9,2,-.2,.3)}t.ring(4.6*Pe,nt+.12,Math.PI/2),Jt(e,o.child(0,0,1.2,Math.PI),i.woodDark),le(t,{shirt:4811890,hair:5592405,glasses:!0,seated:!0,pose:"write",lean:.1},0,.45,1.2,Math.PI),ie(e,o.child(-4.9,0,1.8)),ie(e,o.child(4.9,0,1.8)),Ce(n,"scene-trust-ledger")},xv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(i.stoneWarm,3.7,3.8,.05,0,0,0,40),[-3.3,0,3.3].forEach((r,c)=>{const l=o.child(r,0,-.5,-r*.04);Qs(e,l.child(0,0,-1.1,Math.PI),2.6,1.3,8,c===1?s.fabricGreen:s.fabricBlue,s.fabricCream),hn(e,l.child(0,0,.2),2.2,.7,.85,i.wood);for(let f=0;f<3;f++){l.cyl(i.wood,.28,.22,.2,-.7+f*.7,.85,.2,16);for(let d=0;d<6;d++)l.ball(Fi([8042056,14240573,15903035][(c+f+d)%3],.6),.08,-.7+f*.7+Math.cos(d*1.1)*.12,1.1,.2+Math.sin(d*1.1)*.1)}Mo(e,l.child(-1.3,0,-.6,.2),.6,.5,.5);for(let f=0;f<3;f++)l.box(s.fabricCream,.22,.34,.04,.2+f*.3,1,.9,.01)});const a=o.child(0,0,-.5);for(const r of[-.9,.9])a.box(Fi(1911629,.25,.6),2.4,.06,.9,0,3.15,r,.01,r>0?-.2:.2);ss(e,o.child(-4.7,0,-.4),.34,.9),ss(e,o.child(4.7,0,-.4),.34,.9),le(t,{shirt:6982312,hair:2825494,backpack:13081146,pose:"walk"},-1.6,0,1.8,.4),le(t,{shirt:12681576,hair:5592405,scarf:4160079,pose:"listen"},1.5,0,1.9,-.4),[-3.3,0,3.3].forEach(r=>Ne(t,t.glow,r,3.9,-.4,.14)),ft(e,o.child(-1.8,0,3),.5,57),ft(e,o.child(1.8,0,3),.5,59),ie(e,o.child(-4.9,0,2.2)),ie(e,o.child(4.9,0,2.2)),Ce(n,"scene-sustainable-market")},_v=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40),o.cyl(s.fabricCream,3.2,3.2,.05,0,0,0,40);const a=o.child(0,0,-2.5,0);a.box(i.stoneDark,8,.3,1,0,0,0,.03),a.box(i.paper,7.8,4.2,.2,0,.3,-.35,.03),a.put(ko(3.9,3.5,.9,.05),i.stone,0,3.8,0),bo(n,-2.9,0,-2.2,2.3,3.4,7,31,0),bo(n,2.9,0,-2.2,2.3,3.4,7,37,0),bo(n,0,0,-2.2,2.3,3.4,7,41,0),Js(e,o.child(1.6,0,-1.9,0),3);for(const r of[-1.8,1.8]){hn(e,o.child(r,0,.5),1.6,.8,.76,i.wood);const c=o.child(r-.4,.76,.5);c.cyl(i.brass,.1,.12,.03,0,0,0,14),c.cyl(i.brass,.012,.012,.36,0,.03,0,6),c.put(new we(.1,.15,.12,14,1,!0),Fi(3108687,.5),0,.42,0),xn(e,o.child(r+.1,.76,.5,.2)),Jt(e,o.child(r,0,1.3,Math.PI),i.woodDark)}br(e,o.child(3.4,0,.8)),le(t,{shirt:6982312,hair:2825494,glasses:!0,seated:!0,pose:"read"},-1.8,.45,1.3,Math.PI),le(t,{shirt:12681576,hair:5592405,hairStyle:"bun",seated:!0,pose:"read"},1.8,.45,1.3,Math.PI),Ne(t,t.glow,0,5.2,-2,.22),ie(e,o.child(-4.8,0,1.8)),ie(e,o.child(4.8,0,1.8)),Ce(n,"scene-library")},Mv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40);const a=o.child(0,0,-2.2,0);a.box(i.slate,5,.3,.7,0,0,0,.04),a.box(s.plasticDark,4.6,3.4,.16,0,.3,0,.08),rn(t,dv(),0,.3+1.7,-2.2+.09,4.3,3.1),bo(n,-3.9,0,-1.7,2,3.6,7,43,.3),bo(n,3.9,0,-1.7,2,3.6,7,47,-.3);for(const r of[-1,1]){const c=o.child(r*2.8,0,.4,-r*.3);c.cyl(i.darkSteel,.1,.14,1.1,0,0,0,14),c.box(s.plasticDark,.34,.16,.3,0,1.1,0,.04,-.3),c.box(s.screenOn,.26,.01,.2,0,1.2,0,.002,-.3)}hn(e,o.child(0,0,1.6),2.4,.8,.72,i.wood);for(let r=0;r<4;r++){const c=o.child(-.8+r*.5,.72,1.6);c.box(s.plasticDark,.34,.02,.24,0,0,0,.006,0,0,0),c.put(new Je(.3,.2),r%2?s.screenOn:s.screenOff,0,.022,0,-Math.PI/2)}le(t,{shirt:6982312,hair:2825494,backpack:3104138,pose:"point"},-.6,0,.3,0),le(t,{shirt:12681576,hair:5592405,glasses:!0,pose:"phone"},1,0,.4,-.2),Ne(t,t.glow,0,4.4,-2,.22),ie(e,o.child(-4.8,0,1.8)),ie(e,o.child(4.8,0,1.8)),Ce(n,"scene-digital-lending")},bv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i,p:s}=e;o.cyl(s.fabricGrey,3.7,3.7,.04,0,0,0,40),o.cyl(s.fabricCream,3.2,3.2,.05,0,0,0,40),bo(n,-4,0,-.6,2.2,3.4,7,53,.45),bo(n,4,0,-.6,2.2,3.4,7,59,-.45);const a=o.child(0,0,-2.5,0);a.box(i.woodDark,5.6,.2,.5,0,0,0,.03),a.box(i.woodDark,5.6,3.2,.1,0,.2,-.1,.02);const r=[15909198,15233146,8175848,8042056,16052702,11635424];for(let l=0;l<5;l++)for(let f=0;f<9;f++)a.box(Fi(r[(l*3+f)%r.length],.9),.4,.4,.012,-2.4+f*.6,.5+l*.58,-.04,.004,0,0,((l+f)%3-1)*.06);[[-1.4,3.2],[.9,3.4],[-.2,4.1]].forEach(([l,f])=>Ns(t,t.glow,l,f,-2.2,.4,.3)),jo(e,o.child(0,0,.3),1,.76),xn(e,o.child(-.3,.76,.3,.3)),kn(e,o.child(.4,.76,.2,.2),3,7),[[-1.6,.4,Math.PI/2+.2,7973541],[1.6,.4,-Math.PI/2-.2,12163964],[0,1.8,Math.PI,6982312]].forEach(([l,f,d,u],h)=>{Jt(e,o.child(l,0,f,d),i.wood),le(t,{shirt:u,hair:h===1?5592405:2825494,seated:!0,pose:h===2?"write":"read"},l,.45,f,d)});const c=o.child(3,0,2.2,-.4);c.box(i.woodDark,1.6,1,.6,0,0,0,.03),c.box(i.wood,1.7,.06,.7,0,1,0,.012),c.box(i.brass,.5,.04,.02,0,.7,.31,.004),kn(e,c.child(.3,1.06,0,.1),4,12),ie(e,o.child(-4.8,0,2)),ie(e,o.child(-3.2,0,3.2),3),Ce(n,"scene-community-library")},Sv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;o.put(new we(5,5,.2,48),wv(e),0,.12,0);for(const s of[-1,1]){const a=o.child(s*4,0,0,0);a.box(i.stoneDark,2,.4,2,0,0,0,.05),a.box(i.stone,1.7,3.6,1.7,0,.4,0,.05);for(let r=0;r<4;r++){a.box(i.wood,1.5,.06,.2,0,.8+r*.8,.86,.01);for(let c=0;c<6;c++)a.box(e.p.books[(r*3+c)%e.p.books.length],.14,.4,.16,-.6+c*.24,.86+r*.8,.88,.004)}a.put(Yn(2,.9,2),i.slate,0,4,0)}o.box(i.stone,6.4,.3,1.8,0,1.4,0,.04),o.put(ko(2.8,2.4,1.7,.04),i.stoneDark,0,.3,0);for(let s=0;s<6;s++)o.box(s%2?i.wood:i.woodDark,.8,.08,1.5,-2.5+s*1,1.7,0,.012);for(const s of[-.85,.85]){o.box(i.stoneDark,6.4,.14,.16,0,2.55,s,.02);for(let a=0;a<8;a++)o.box(i.stoneDark,.14,.8,.14,-3+a*.86,1.75,s,.015)}le(t,{shirt:6982312,hair:2825494,backpack:13081146,pose:"walk"},-1.4,1.7,0,Math.PI/2),le(t,{shirt:12681576,hair:5592405,hairStyle:"bun",pose:"read"},1.2,1.7,0,.2),Ne(t,t.glow,0,4.6,0,.3),ie(e,o.child(-4.8,0,2.2)),ie(e,o.child(4.8,0,2.2)),Ce(n,"scene-knowledge-bridge")};function wv(t){return t.p.water}function Cs(t,n,e){const[o,i]=Et(t,e);return[o,nt+n*Pe,i]}const yv={bookshop:fv,exchange:uv,resilience:hv,"budget-board":pv,"exchange-wall":mv,"resource-cycle":gv,"trust-ledger":vv,"sustainable-market":xv,library:_v,"digital-lending":Mv,"community-library":bv,"knowledge-bridge":Sv},gd={...r5,...M5,...U5,...K5,...cv,...yv},ts=(t,n=.85,e=.02,o={})=>{const i=new ge({color:t,roughness:n,metalness:e,...o});return i.fog=!1,i};function Zo(t,n=3.7){t.f.cyl(t.k.p.fabricGrey,n,n,.04,0,0,0,40),t.f.cyl(t.k.p.fabricCream,n-.5,n-.5,.05,0,0,0,40)}function Qo(t,n=1.8){ie(t.k,t.f.child(-4.8,0,n)),ie(t.k,t.f.child(4.8,0,n)),ft(t.k,t.f.child(-4.3,0,n+1),.5,41),ft(t.k,t.f.child(4.3,0,n+1),.5,43)}function vd(t,n,e,o,i,s,a=!1){const{m:r}=t.k,c=t.f.child(e,0,o,s*.3),l=a?.55:.4;c.cyl(r.stoneDark,l+.14,l+.2,.2,0,0,0,8),c.cyl(r.stone,l,l+.08,i,0,.2,0,8),c.cyl(r.brass,l+.06,l+.06,.06,0,.2+i,0,8);const f=new G(new lo((a?.3:.2)*Pe,1),s%2?n.edge:n.glow);f.position.set(-e*Pe,nt+(i+.7+(a?.2:0))*Pe,27-o*Pe),f.userData.isLandscapeBeacon=!0,n.root.add(f)}function xd(t,n,e){for(let o=0;o<e.length-1;o++){const[i,s]=e[o],[a,r]=e[o+1],c=Math.max(1,Math.round(Math.hypot(a-i,r-s)/.45));for(let l=1;l<c;l++){const f=l/c;t.box(l%2?n.m.paveA:n.m.paveB,.34,.03,.26,i+(a-i)*f,.04,s+(r-s)*f,.01,0,Math.atan2(a-i,r-s))}}}const Oc={1:{pts:Array.from({length:5},(t,n)=>[Math.cos(n/5*Math.PI*2-.6)*2.7,Math.sin(n/5*Math.PI*2-.6)*2.2-.2]),h:t=>.7+t%2*.2},2:{pts:[[-3.2,1.2],[-1.6,.6],[0,0],[1.6,-.6],[3.2,-1.2]],h:t=>.5+t*.28},3:{pts:[[-3,1.2],[-1.5,.2],[0,-.9],[1.5,.2],[3,1.2]],h:t=>[.7,.55,1.4,.55,.7][t]},4:{pts:[[0,-1.8],[-2.6,0],[0,0],[2.6,0],[0,1.9]],h:t=>t===2?1.2:.7},5:{pts:Array.from({length:5},(t,n)=>[Math.cos(-Math.PI/2+n*1.12)*(.9+n*.5),Math.sin(-Math.PI/2+n*1.12)*(.7+n*.4)]),h:t=>.6+t*.12},6:{pts:[[-2.7,-1.3],[-2.7,1.3],[0,0],[2.7,-1.3],[2.7,1.3]],h:t=>t===2?1.5:.75}},_i=t=>n=>{const e=Re(n),{k:o,f:i}=e,{m:s}=o,a=Oc[t]??Oc[1];Zo(e,4),xd(i,o,a.pts),a.pts.forEach(([r,c],l)=>vd(e,n,r,c,a.h(l),l,t===6&&l===2)),t===1?(jo(o,i.child(0,0,-.2),.55,.74),kn(o,i.child(0,.74,-.2,.3),4,7)):t===2?(nd(o,i.child(0,0,-2.6),3.2,4),xn(o,i.child(-1,0,1.9,.2))):t===3?(i.cyl(s.stoneDark,.9,1,.1,0,0,.6,20),sd(o,i.child(0,.1,.6),.8)):t===4?td(o,i.child(0,0,.9)):t===5?ft(o,i.child(0,0,.2),.7,61):(i.cyl(s.stoneDark,.8,.9,.2,0,0,0,12),i.cyl(s.stone,.32,.5,2.4,0,.2,0,4),i.cyl(s.brass,.05,.32,.4,0,2.6,0,4)),Qt(o,i.child(-2.9,0,2.2,.4),1.5),Qt(o,i.child(2.9,0,2.2,-.4),1.5),le(n,{shirt:[6982312,12681576,7973541,13081146,11553344,4811890][(t-1)%6],hair:2825494,pose:t%2?"read":"phone",backpack:3891087},t===4?1.2:.2,0,1.9,t%2?.2:-.3),n.ring(4.6*Pe,nt+.08,Math.PI/2),Qo(e,2.4),Ce(e,`scene-lab-vocab-${t}`)};function _d(t,n="#243b34",e=1024,o=560){const i=document.createElement("canvas");i.width=e,i.height=o;const s=i.getContext("2d");if(!s)return;s.fillStyle=n,s.fillRect(0,0,e,o),s.textAlign="center",s.textBaseline="middle";for(const[r,c,l,f]of t)s.fillStyle=f,s.font=r.length>16?"bold 40px Arial, sans-serif":"bold 64px Arial, sans-serif",s.fillText(r,c,l);const a=new Wt(i);return a.colorSpace=yt,a.anisotropy=4,a}const Ev=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;Zo(n);const s=o.child(0,0,-2.4);s.box(i.stoneDark,6.4,.2,.8,0,0,0);for(const c of[-1,1])s.box(i.woodDark,.18,4,.22,c*3,.2,0,.02);s.box(i.woodDark,6.4,.2,.3,0,4,0,.02),s.box(i.woodDark,5.9,3.5,.1,0,.45,0,.02);const a=_d([["Subject",220,150,"#9ee7ff"],["+",380,150,"#f6eedb"],["Verb",520,150,"#ffd58a"],["+",660,150,"#f6eedb"],["Object",830,150,"#ffb3a8"],["The students  read  new books.",512,330,"#f6eedb"],["S            V            O",512,420,"#9ec9b6"]]);rn(t,a,0,.45+1.75,-2.4+.07,5.5,3.2),s.box(i.wood,5.6,.08,.2,0,.4,.2,.02);const r=[6469592,14263361,14248026,7319166];for(let c=0;c<4;c++)o.box(ts(r[c],.6),.34,.34,.34,-1.3+c*.5,.78,.3,.04,0,c*.2);hn(e,o.child(0,0,.3),2.8,.7,.78,i.wood),xn(e,o.child(1,.78,.3,.2)),Ne(t,t.glow,0,4.9,-2.1,.22),le(t,{shirt:4811890,hair:5592405,glasses:!0,pose:"point"},-1.9,0,.3,.3),Jt(e,o.child(1.7,0,1.6,Math.PI),i.woodDark),le(t,{shirt:12681576,hair:2825494,hairStyle:"bun",seated:!0,pose:"write"},1.7,.45,1.6,Math.PI),Qo(n),Ce(n,"scene-lab-grammar")},Tv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;Zo(n);const s=o.child(0,0,-2.2);s.box(i.stoneDark,5.8,.3,1,0,0,0,.04),s.box(i.stone,5.4,3.2,.5,0,.3,0,.05),s.box(i.stoneDark,5.7,.2,.62,0,3.5,0,.04);const a=_d([["The sun ______ in the east.",512,200,"#2a2a2a"],["( rises / rose / rising )",512,380,"#7a6a4a"]],"#e8dec6");rn(t,a,0,2,-2.2+.28,4.8,2.4);const r=o.child(0,0,.4);r.box(i.woodDark,4,.1,.6,0,.7,0,.02);for(const c of[-1,1])r.box(i.woodDark,.12,.7,.5,c*1.9,0,0,.02);for(let c=0;c<3;c++){const l=(c-1)*1.25;r.box(i.paper,1,.5,.06,l,.8,.1,.02,-.25),r.box(ts([6469592,14263361,14248026][c],.7),.7,.08,.02,l,1.05,.15,.005,-.25)}Ne(t,t.glow,0,1.9,.4,.17),le(t,{shirt:7973541,hair:2825494,pose:"point",backpack:13081146},-2.4,0,1.4,.4),le(t,{shirt:13081146,hair:5592405,pose:"listen",glasses:!0},2.4,0,1.4,-.4),as(e,o.child(3.5,0,-.4),[{yaw:-.5,len:.9,tone:e.p.fabricGreen}],1.8),Qo(n),Ce(n,"scene-lab-cloze")},Av=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;Zo(n),o.put(ko(3.6,2.4,.5,.06),i.stone,0,0,-.8);for(const c of[-1,1])o.box(i.stoneDark,.8,.3,.9,c*1.8,0,-.8,.04);const s=t.ring(2*Pe,nt+2.6*Pe,0);s.position.z=27+.8*Pe;for(const c of[-1,1]){const l=o.child(c*2.9,0,.6,-c*.35);Ui(e,l,1.6,.8,.76),xn(e,l.child(-.3,.76,0,.2)),kn(e,l.child(.45,.76,0),4,c>0?3:5),Jt(e,l.child(0,0,.95,Math.PI),i.woodDark),le(t,{shirt:c<0?6982312:11553344,hair:2825494,hairStyle:c<0?void 0:"bun",seated:!0,pose:"write"},c*2.9+-c*.35*0,.45,1.6,Math.PI)}const a=fo([{text:"EN",y:90,font:"bold 90px Arial, sans-serif"}],{width:400,height:180,background:"#2f4a6a"}),r=fo([{text:"中文",y:90,font:"bold 90px 'Microsoft YaHei', sans-serif"}],{width:400,height:180,background:"#7a3a36"});rn(t,a,-2.9,2.2,.6,1.2,.54),rn(t,r,2.9,2.2,.6,1.2,.54),Ne(t,t.glow,0,1.6,-.8,.28),Ne(t,t.edge,-.7,1.2,.1,.12),Ne(t,t.edge,.7,1.2,.1,.12),Qo(n,2.4),Ce(n,"scene-lab-translation")},Pv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;Zo(n);for(const[a,r,c,l]of[[-3.4,-1.2,.5,71],[0,-2.6,0,73],[3.4,-1.2,-.5,75]])ed(e,o.child(a,0,r,c),2.6,3.2,7,l);Js(e,o.child(1.7,0,-2.3),2.6),hn(e,o.child(0,0,.5),3,1,.78,i.wood),xn(e,o.child(-.8,.78,.5,.1)),xn(e,o.child(.9,.78,.6,-.2)),kn(e,o.child(0,.78,.2,.3),5,9);const s=o.child(-1.3,.78,.2);s.cyl(i.brass,.1,.12,.04,0,0,0,12),s.strut(i.brass,[0,.04,0],[.05,.5,0],.012),s.cyl(e.p.fabricGreen,.04,.14,.14,.05,.5,0,12),Ne(t,t.glow,-1.25,1.55,.2,.14);for(const a of[-1,1])Jt(e,o.child(a*.9,0,1.7,Math.PI),i.woodDark),le(t,{shirt:a<0?6982312:12681576,hair:2825494,hairStyle:a<0?void 0:"bun",glasses:a<0,seated:!0,pose:"read"},a*.9,.45,1.7,Math.PI);t.ring(4.6*Pe,nt+.08,Math.PI/2),Qo(n,2.2),Ce(n,"scene-project-reading")},Rv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;Zo(n);const s=c=>{const l=o.child(c,0,-1.3,-c*.1);l.box(i.darkSteel,1.1,2,.8,0,0,0,.05),l.cyl(i.steel,.38,.38,.06,0,1.2,.4,24),l.put(new we(.34,.34,.06,24),i.darkSteel,0,1.4,.44,Math.PI/2),l.put(new we(.17,.17,.06,20),i.darkSteel,0,.55,.43,Math.PI/2),l.put(new we(.08,.08,.02,16),i.steel,0,1.4,.47,Math.PI/2)};s(-3),s(3);const a=o.child(0,0,.1);Ui(e,a,2.8,.9,.78),a.box(i.darkSteel,2.2,.08,.6,0,.78,0,.02,-.2);for(let c=0;c<8;c++)a.cyl(i.brass,.03,.03,.04,-.95+c*.27,.86,.1,10);W3(e,a.child(.95,.78,-.15),.5,.3);const r=o.child(-1.9,0,.8);r.cyl(i.darkSteel,.2,.22,.04,0,0,0,14),r.strut(i.steel,[0,.04,0],[0,1.5,0],.015),r.ball(i.darkSteel,.06,0,1.58,0,1,1.5,1),Jt(e,o.child(.4,0,1.6,Math.PI),i.woodDark),le(t,{shirt:4811890,hair:2825494,seated:!0,pose:"listen",glasses:!0},.4,.45,1.6,Math.PI),le(t,{shirt:13081146,hair:5592405,pose:"talk",scarf:11553344},-1.9,0,1.4,.4);for(const c of[2.4,3.6,4.8]){const l=t.ring(c*Pe*.8,nt+.16+c*.35,Math.PI/2.15);l.userData.isLandscapeRing=!0}Ne(t,t.glow,0,2.4,-.8,.2),Qo(n,2.4),Ce(n,"scene-project-listening")},Cv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;Zo(n);const s=o.child(0,0,-2.4);s.box(i.woodDark,5.6,3,.12,0,.8,0,.03),s.box(ts(12159831,.95),5.3,2.7,.05,0,.95,.07,.01),[16179850,15902624,10412228,11127026,16179850,15902624,10412228,11127026].forEach((l,f)=>s.box(ts(l,.9),.7,.7,.02,-2+f%4*1.35,1.2+Math.floor(f/4)*1.15,.11,.01,0,(f%3-1)*.08));const r=o.child(0,0,.5);Ui(e,r,3.2,1.2,.78),r.box(i.paper,1,.03,.72,-.2,.78,.1,.005,0,.08),r.box(i.paper,.9,.05,.65,.9,.78,-.2,.005,0,-.1),r.cyl(ts(1911629,.2,.2),.07,.08,.1,1.2,.78,.3,12),r.strut(i.brass,[-.1,.8,.1],[.4,.95,.1],.012),js(e,r.child(-1.1,.78,-.2,.2));const c=r.child(1.3,.78,-.35);c.cyl(i.brass,.1,.12,.04,0,0,0,12),c.strut(i.brass,[0,.04,0],[-.1,.55,0],.012),c.cyl(e.p.fabricGreen,.04,.14,.14,-.1,.55,0,12),Ne(t,t.glow,1.2,1.7,.15,.14),Jt(e,o.child(0,0,1.9,Math.PI),i.woodDark),le(t,{shirt:4811890,hair:5592405,glasses:!0,seated:!0,pose:"write",lean:.12},0,.45,1.9,Math.PI),o.cyl(i.darkSteel,.2,.17,.4,2.7,0,1,12);for(let l=0;l<3;l++)o.ball(i.paper,.1,2.65+l*.05,.5+l*.1,1);Qo(n,2.4),Ce(n,"scene-project-writing")},Dv=t=>{const n=Re(t),{k:e,f:o}=n,{m:i}=e;Zo(n,4.1),od(e,o.child(0,0,-.6),1.6,i.slate),br(e,o.child(0,.2,-.6),.28),o.cyl(i.stoneDark,.3,.4,.2,0,0,-.6,12);for(let s=0;s<4;s++){const a=(s-1.5)*1.9,r=1.3-Math.abs(s-1.5)*.45;vd(n,t,a,r,.8,s)}xd(o,e,[[-3.2,1.6],[-1.9,1.2],[0,1],[1.9,1.2],[3.2,1.6]]),Qt(e,o.child(-3,0,-.9,.6),1.4),Qt(e,o.child(3,0,-.9,-.6),1.4),le(t,{shirt:11553344,hair:2825494,hairStyle:"bun",pose:"read"},-.8,0,2.3,.2),le(t,{shirt:6982312,hair:5592405,pose:"talk",glasses:!0},.8,0,2.3,-.3),t.ring(4.8*Pe,nt+.08,Math.PI/2),Qo(n,2.8),Ce(n,"scene-project-memory")},Iv={"lab-vocab-1":_i(1),"lab-vocab-2":_i(2),"lab-vocab-3":_i(3),"lab-vocab-4":_i(4),"lab-vocab-5":_i(5),"lab-vocab-6":_i(6),"lab-grammar":Ev,"lab-cloze":Tv,"lab-translation":Av,"project-reading":Pv,"project-listening":Rv,"project-writing":Cv,"project-memory":Dv},er=new Map;function Lv(t){const n=er.get(t);if(n)return n;let e=t;const o=t.type,i=t.parameters;if(i)if(o==="BoxGeometry"){const{width:s,height:a,depth:r}=i,c=Math.min(s,a,r);if(c>=.05&&i.widthSegments<=1&&i.heightSegments<=1&&i.depthSegments<=1){const l=St.clamp(c*.2,.012,.085);e=new Do(s,a,r,2,l)}}else if(o==="CylinderGeometry"){const s=i.radialSegments;s>=9&&s<24&&(e=new we(i.radiusTop,i.radiusBottom,i.height,28,i.heightSegments,i.openEnded===1,i.thetaStart,i.thetaLength))}else if(o==="ConeGeometry"){const s=i.radialSegments;s>=9&&s<24&&i.radius>.2&&(e=new gt(i.radius,i.height,28,i.heightSegments,i.openEnded===1,i.thetaStart,i.thetaLength))}else o==="SphereGeometry"?i.widthSegments<=14&&i.heightSegments<=10&&i.radius>.08&&(e=new ye(i.radius,28,18,i.phiStart,i.phiLength,i.thetaStart,i.thetaLength)):o==="TorusGeometry"&&i.radius>.3&&(i.radialSegments<10||i.tubularSegments<40)&&(e=new me(i.radius,i.tube,Math.max(i.radialSegments,12),Math.max(i.tubularSegments,64),i.arc));return er.set(t,e),e}function Uv(t){const n=[];t.traverse(e=>{const o=e;if(!o.isMesh||o.userData.keepGeometry)return;const i=o.geometry,s=Lv(i);s!==i&&(o.geometry=s,n.push(i),o.isInstancedMesh&&o.computeBoundingSphere())});for(const e of new Set(n))e.dispose();er.clear()}const Nv=[{x:-21,z:-20,color:3718648},{x:21,z:-20,color:16498468},{x:-21,z:20,color:4906624},{x:21,z:20,color:16020150}];function kv(){const t=new Ke;t.name="study-stations";const n=Fn();for(const e of Nv){const o=new Dn,i=new ge({color:e.color,roughness:.82,side:$e});i.fog=!1;const s=new ge({color:new te(e.color).lerp(new te(16777215),.55),roughness:.82,side:$e});s.fog=!1;const{x:a,z:r}=e;o.add(gn(3.7,.2,.025,6),n.stoneDark,{x:a,y:.62,z:r}),o.add(gn(3.3,.16,.02,6),n.stone,{x:a,y:.82,z:r}),o.add(new me(2.6,.03,5,6),n.slate,{x:a,y:1,z:r,rx:Math.PI/2,rz:Math.PI/6});const c=.98,l=1.75;for(const[p,g]of[[-l,-l],[l,-l],[-l,l],[l,l]])o.add(fe(.34,.12,.34,.03),n.stoneDark,{x:a+p*.78,y:c+.06,z:r+g*.78}),o.add(tt(.075,.095,2.3,12),n.wood,{x:a+p*.78,y:c+1.27,z:r+g*.78});const f=c+2.42;for(const p of[-1,1])o.add(fe(l*1.56+.3,.16,.14,.02),n.woodDark,{x:a,y:f,z:r+p*l*.78});for(const p of[-1,1])o.add(fe(.14,.16,l*1.56+.3,.02),n.woodDark,{x:a+p*l*.78,y:f,z:r});const d=new gt(2.6,.95,4,1);o.add(d,i,{x:a,y:f+.5,z:r,ry:Math.PI/4}),o.add(new gt(2.3,.78,4,1),s,{x:a,y:f+.42,z:r,ry:Math.PI/4,sy:.96}),o.add(new ye(.09,8,6),n.brass,{x:a,y:f+1.02,z:r}),o.add(tt(.14,.2,1,12),n.woodDark,{x:a,y:c+.5,z:r}),o.add(fe(.9,.06,.62,.02),n.wood,{x:a,y:c+1.04,z:r,rx:-.3}),o.add(fe(.4,.03,.5,.01),n.paper,{x:a-.21,y:c+1.09,z:r-.02,rx:-.3,rz:.06}),o.add(fe(.4,.03,.5,.01),n.paper,{x:a+.21,y:c+1.09,z:r-.02,rx:-.3,rz:-.06});for(const p of[-1,1])o.add(fe(.7,.07,.34,.02),n.wood,{x:a+p*1.1,y:c+.42,z:r+1.05}),o.add(fe(.07,.4,.3,.012),n.woodDark,{x:a+p*1.1-.28,y:c+.2,z:r+1.05}),o.add(fe(.07,.4,.3,.012),n.woodDark,{x:a+p*1.1+.28,y:c+.2,z:r+1.05});for(const p of[-1,1])o.add(It([a+p*1.1,f-.08,r+1.3],[a+p*1.1,f-.5,r+1.3],.01,4),n.steel),o.add(tt(.1,.12,.22,8),n.lampGlass,{x:a+p*1.1,y:f-.62,z:r+1.3});o.build(t,"study-station",{isLandscapeStage:!0});const u=new ge({color:e.color,emissive:e.color,emissiveIntensity:1.1,roughness:.2,metalness:.3});u.fog=!1;const h=new G(new $n(.36,2),u);h.position.set(a,c+1.9,r),h.userData.isLandscapeBeacon=!0,t.add(h);const m=new ge({color:e.color,emissive:e.color,emissiveIntensity:.7,roughness:.3,metalness:.4});m.fog=!1;const _=new G(new me(.62,.035,8,40),m);_.rotation.x=Math.PI/2,_.position.set(a,c+1.9,r),_.userData.isLandscapeRing=!0,t.add(_)}return t}function Fv(t,n){const e=new Ke;e.name="signal-masts";const o=Fn(),i=[[-28,35,13],[0,43,18],[28,35,11]],s=new Dn,a=[];for(const[f,d,u]of i){s.add(gn(3.2,.5,.04,8),o.stoneDark,{x:f,y:0,z:d}),s.add(gn(2.6,.3,.03,8),o.stone,{x:f,y:.5,z:d});const h=.8,m=1.9,_=.55,p=[];for(let T=0;T<4;T++){const w=T/4*Math.PI*2+Math.PI/4;p.push([[f+Math.cos(w)*m,h,d+Math.sin(w)*m],[f+Math.cos(w)*_,h+u,d+Math.sin(w)*_]]),s.add(It(p[T][0],p[T][1],.13,8),o.steel),s.add(fe(.5,.3,.5,.05),o.stoneDark,{x:p[T][0][0],y:h+.15,z:p[T][0][2]})}const g=(T,w)=>[p[T][0][0]+(p[T][1][0]-p[T][0][0])*w,p[T][0][1]+(p[T][1][1]-p[T][0][1])*w,p[T][0][2]+(p[T][1][2]-p[T][0][2])*w],x=Math.round(u/1.6);for(let T=0;T<=x;T++){const w=T/x;for(let y=0;y<4;y++)s.add(It(g(y,w),g((y+1)%4,w),.05,6),o.steel),T<x&&(s.add(It(g(y,w),g((y+1)%4,w+1/x),.035,5),o.steel),s.add(It(g((y+1)%4,w),g(y,w+1/x),.035,5),o.steel))}const M=h+u*.66,S=m+(_-m)*.66+.55;s.add(gn(S,.12,.015,8),o.slate,{x:f,y:M,z:d});for(let T=0;T<16;T++){const w=T/16*Math.PI*2;s.add(It([f+Math.cos(w)*(S-.05),M+.12,d+Math.sin(w)*(S-.05)],[f+Math.cos(w)*(S-.05),M+.62,d+Math.sin(w)*(S-.05)],.02,4),o.steel)}s.add(new me(S-.05,.025,5,32),o.steel,{x:f,y:M+.62,z:d,rx:Math.PI/2});for(let T=0;T<3;T++){const w=T/3*Math.PI*2+.4;s.add(fe(.35,1.2,.1,.02),o.paper,{x:f+Math.cos(w)*(_+.5),y:h+u*.86,z:d+Math.sin(w)*(_+.5),ry:-w+Math.PI/2})}s.add(new ye(.7,20,8,0,Math.PI*2,0,Math.PI/3),o.paper,{x:f+_+.9,y:h+u*.74,z:d,rz:-Math.PI/2+.2}),s.add(It([f+_,h+u*.74,d],[f+_+.55,h+u*.74,d],.06,6),o.steel),s.add(It([f,h+u,d],[f,h+u+1.8,d],.04,6),o.steel),s.add(tt(.09,.14,.2,8),o.brass,{x:f,y:h+u+.2,z:d}),a.push([f,h+u+1.4,d])}s.build(e,"signal-mast",{isLandscapeStage:!0});const r=new ge({color:2830390,roughness:.6,metalness:.5});r.fog=!1;const c=(f,d)=>{const u=[(f[0]+d[0])/2,Math.min(f[1],d[1])-1.6,(f[2]+d[2])/2],h=new pl(new Y(...f),new Y(...u),new Y(...d)),m=new G(new Bn(h,32,.04,5,!1),r);m.userData.isLandscapeRoute=!0,e.add(m)},l=f=>[i[f][0],.8+i[f][2]*.7,i[f][1]];return c(l(0),l(1)),c(l(1),l(2)),i.forEach(([f,d,u],h)=>{const m=new G(new ye(.55,20,14),t);m.position.set(a[h][0],a[h][1]+.2,a[h][2]),m.userData.isLandscapeBeacon=!0,e.add(m);const _=new G(new me(2.8,.06,6,40),n);_.rotation.x=Math.PI/2,_.position.set(f,.8+u*.4,d),_.userData.isLandscapeRing=!0,e.add(_)}),e}const Os=new Map,qo=t=>{const n=`c${t}`;let e=Os.get(n);return e||(e=new ge({color:t,roughness:.92,side:$e}),e.fog=!1,Os.set(n,e)),e},Vo=(t,n=.55,e=.1)=>{const o=`p${t}:${n}:${e}`;let i=Os.get(o);return i||(i=new ge({color:t,roughness:n,metalness:e}),i.fog=!1,Os.set(o,i)),i},Fe=(t,n,e,o,i,s,a,r,c=0,l=.03)=>t.add(fe(e,o,i,l),n,{x:s,y:a,z:r,ry:c}),qt=(t,n,e,o,i,s,a,r,c=16)=>t.add(tt(e,o,i,c),n,{x:s,y:a,z:r}),ht=(t,n,e,o,i=.03)=>t.add(It(e,o,i,5),n),Gs=(t,n=18)=>new Vs(t.map(([e,o])=>new rt(e,o)),n);function tr(t,n,e,o,i,s,a=1){t.add(fe(1.3*a,.5*a,1.3*a,.05),n.stoneDark,{x:e,y:o+.25*a,z:i,ry:s}),t.add(fe(1*a,1.5*a,1*a,.05),n.stone,{x:e,y:o+1.25*a,z:i,ry:s}),t.add(fe(1.15*a,.2*a,1.15*a,.04),n.stoneDark,{x:e,y:o+2.1*a,z:i,ry:s});const r=o+2.2*a;t.add(Gs([[.02,0],[.42,.02],[.36,.9],[.28,1.5],[.3,1.95],[.14,2.15],[0,2.2]],18),n.stoneWarm,{x:e,y:r,z:i,sx:a,sy:a,sz:a,ry:s}),t.add(new ye(.2,14,10),n.stoneWarm,{x:e,y:r+2.4*a,z:i,sx:a,sy:a*1.1,sz:a});const c=Math.cos(s),l=Math.sin(s);ht(t,n.stoneWarm,[e+.28*a*c,r+1.75*a,i-.28*a*l],[e+.5*a*c,r+2.55*a,i-.5*a*l],.07*a),t.add(tt(.05*a,.05*a,.6*a,8),n.brass,{x:e+.52*a*c,y:r+2.7*a,z:i-.52*a*l})}function Tr(t,n,e,o,i,s=4.4){qt(t,n.darkSteel,.28,.34,.4,e,o+.2,i,10),qt(t,n.darkSteel,.08,.13,s,e,o+.4+s/2,i,10),t.add(new me(.13,.025,6,14),n.darkSteel,{x:e,y:o+1.2,z:i,rx:Math.PI/2}),qt(t,n.lampGlass,.2,.15,.55,e,o+.4+s+.28,i,8),t.add(new gt(.3,.28,8),n.darkSteel,{x:e,y:o+.4+s+.7,z:i})}function Ov(t,n,e){const i=qo(14208176),s=Vo(12073778,.6,.05),a=Vo(2312808,.55,.05);for(const r of[-5.2,0,5.2]){Fe(t,n.stone,.5,.7,.4,r,8.75,51.2-.95,0,.04),Fe(t,n.stoneDark,5,.28,.6,r,.55+2.2-.14,51.2-1,0,.03),Fe(t,n.darkSteel,.1,4.2,.08,r,4.4,51.2-.92,0,.01);for(const c of[3,5.2])Fe(t,n.darkSteel,4,.08,.08,r,c,51.2-.92,0,.01);for(const c of[-1,1])Fe(t,n.stone,.3,4.4,.35,r+c*2.5,4.6,51.2-1,0,.03)}Fe(t,n.woodDark,3.2,4.8,.3,0,3.2,51.2-1.35,0,.04);for(const r of[-.8,.8]){Fe(t,n.wood,1.4,4.2,.18,r,3.1,51.2-1.55,0,.03);for(let c=0;c<5;c++)for(let l=0;l<3;l++)t.add(new ye(.06,6,5),n.brass,{x:r-.4+l*.4,y:1.6+c*.75,z:51.2-1.66})}t.add(Md(3.4,2.7,.4),n.stoneDark,{x:0,y:5.4,z:51.2-1.35});for(let r=0;r<38;r++)Fe(t,n.stoneDark,.28,.2,.3,-9+r*.48,9.35,51.2-1.48,0,.02);t.add(Yn(19.2,3,7),n.slate,{x:0,y:10.55,z:51.2+2.6});for(const r of[-6.5,6.5])Fe(t,n.stoneDark,.9,3,.9,r,12.2,51.2+1,0,.04),Fe(t,n.stone,1.1,.2,1.1,r,13.75,51.2+1,0,.03);qt(t,n.stoneWarm,1.15,1.2,1.4,0,14.3,51.2+1.8,8),t.add(new ye(1.2,16,8,0,Math.PI*2,0,Math.PI/2),n.copper,{x:0,y:15,z:51.2+1.8}),ht(t,n.brass,[0,16.2,51.2+1.8],[0,17.8,51.2+1.8],.04),ht(t,n.brass,[-.6,17.4,51.2+1.8],[.6,17.4,51.2+1.8],.03);for(const r of[-7.6,7.6])ht(t,n.steel,[r,1.8,51.2-2.4],[r,9,51.2-2.4],.07),Fe(t,s,1.5,.9,.04,r+(r<0?.85:-.85),8.3,51.2-2.4,0,.005);for(let r=0;r<8;r++)Tr(t,n,-28+r*8+0,1.66,27,3.6);for(const r of[-14,14]){Fe(t,n.darkSteel,2.2,.5,2.2,r,1.9,28.8,0,.05),qt(t,a,.55,.7,5.8,r,5,28.8,14),Fe(t,n.stoneDark,1.8,1.2,1.8,r,8.4,28.8,0,.05),ht(t,n.steel,[r,8.4,28.8],[r,8.5,38.5],.14),ht(t,n.steel,[r,8.4,28.8],[r,6.6,27],.12),Fe(t,n.darkSteel,1.6,1.1,1.6,r,7.2,26.2,0,.05),ht(t,n.darkSteel,[r,8.45,36],[r,4.4,36],.02),Fe(t,n.brass,.34,.34,.34,r,4.2,36,0,.03),ht(t,n.steel,[r,9,28.8],[r,8.5,38.2],.04);for(let c=1;c<6;c++)ht(t,n.steel,[r+.45,8.6,29+c*1.6],[r+.45,9-c*.04,28.9+c*1.6+.6],.02)}for(const[r,c]of[[-6,28.4],[8,28.8],[20,28.2],[-22,28.9]]){for(let l=0;l<6;l++)Fe(t,l%2?n.wood:n.woodDark,1,.85,1,r+l%3*1.05,1.67+0+Math.floor(l/3)*.85,c+l%2*.1,e()*.3,.04);for(let l=0;l<4;l++)t.add(new ye(.34,10,8),i,{x:r+3.1+l%2*.6,y:1.9+Math.floor(l/2)*.35,z:c-.2+l%2*.4,sy:.6});for(let l=0;l<5;l++)t.add(new me(.3,.07,6,14),n.wood,{x:r-1.4,y:1.7+l*.12,z:c+.3,rx:Math.PI/2})}ht(t,n.darkSteel,[2.6,1.7,28.2],[2.6,3.5,28.2],.09),t.add(new me(.5,.07,8,16,Math.PI),n.darkSteel,{x:2.6,y:1.8,z:28.2,rz:Math.PI}),ht(t,n.darkSteel,[2,3.2,28.2],[3.2,3.2,28.2],.07);for(const[r,c]of[-23,23].entries()){const l=r===0?37.2:42.1;for(const f of[-1,1])for(const d of[1.15,1.45])Fe(t,n.woodDark,.05,.07,10.2,c+f*1.14,d,l,0,.01);ht(t,n.woodDark,[c,2.2,l+5.5],[c,3.4,l+8.4],.1),t.add(new Je(2.8,3),i,{x:c,y:3.9,z:l+6,ry:Math.PI/2,sx:1,sy:1}),ht(t,n.steel,[c,6.6,l],[c,3.4,l+8.4],.015),Fe(t,n.woodDark,.12,1.6,.5,c,1.5,l-5.7,0,.02),qt(t,n.lampGlass,.14,.12,.3,c,3,l-5,8),ht(t,n.woodDark,[c,2,l-5],[c,3.4,l-5],.04);for(const f of[-1,1]){ht(t,n.steel,[c,7.2,l+.1],[c+f*1.1,1.65,l-.9],.012),ht(t,n.steel,[c,7.2,l+.1],[c+f*1.1,1.65,l+1],.012);for(let d=1;d<8;d++){const u=d/8;ht(t,n.steel,[c+f*1.1*u,7.2-5.55*u,l+.1-1*u],[c+f*1.1*u,7.2-5.55*u,l+.1+1.1*u],.01)}}}}function Md(t,n,e){const o=new Mn;o.absarc(0,0,t/2+.3,0,Math.PI,!1),o.lineTo(-t/2,0),o.absarc(0,0,t/2,Math.PI,0,!0);const i=new Cn(o,{depth:e,bevelEnabled:!1,curveSegments:16});return i.translate(0,n-t/2,-e/2),i}function Gv(t,n,e){const o=new Ke,i=40,s=1.8,a=s+.95*.7+9.6+.95;for(let l=0;l<24;l++){const f=-11+l*.96+.48;Fe(t,l%2?n.stoneWarm:n.stone,.62,.74,.08,f,a+.2,i-7.12,0,.01),Fe(t,n.stoneDark,.06,.74,.1,f-.16,a+.2,i-7.16,0,.005),Fe(t,n.stoneDark,.06,.74,.1,f+.16,a+.2,i-7.16,0,.005)}for(let l=0;l<26;l++)t.add(new gt(.2,.34,6),n.terracottaRoof,{x:-12+l*.96,y:a+1.55,z:i-7.9,rx:Math.PI/2});for(const l of[-1,1])t.add(new gt(.55,1.5,8),n.stoneWarm,{x:l*12.4,y:a+2.2,z:i-7.2,sz:.4}),t.add(new gt(.5,1.4,8),n.stoneWarm,{x:l*12.4,y:a+2.2,z:i+7.2,sz:.4});t.add(new gt(.8,2,8),n.stoneWarm,{x:0,y:a+6,z:i-7.3,sz:.4});for(const[l,f,d]of[[-4.6,.8,.3],[-2.4,1.3,.12],[0,1.9,0],[2.4,1.3,-.12],[4.6,.8,-.3]])t.add(Gs([[.01,0],[.34,.1],[.3,f*.7],[.18,f],[.01,f*1.05]],12),n.stoneWarm,{x:l,y:a+2+(.9-f*.2),z:i-7.35,rz:d,sz:.6}),t.add(new ye(.17,10,8),n.stoneWarm,{x:l-d*f,y:a+2+(.9-f*.2)+f*1.15,z:i-7.35});for(const l of[-1,1])Fe(t,n.stoneDark,.9,1.4,2.8,l*4.8,.9,i-10.8,0,.05),Fe(t,n.stone,1.1,.2,3,l*4.8,1.7,i-10.8,0,.04),tr(t,n,l*8.4,s,i-8.2,(l>0,Math.PI),.95),tr(t,n,l*12.2,s,i-8.2,Math.PI,.8);Fe(t,n.stoneDark,3.4,5,.3,0,s+2.5,i-4.9,0,.05);for(const l of[-.65,.65]){Fe(t,n.brass,1.2,4,.12,l,s+2,i-5,0,.03);for(let f=0;f<5;f++)for(let d=0;d<2;d++)t.add(new ye(.05,6,5),n.stoneWarm,{x:l-.25+d*.5,y:s+.7+f*.7,z:i-5.08})}for(const l of[-5.5,5.5])Fe(t,n.stoneDark,1.6,2.8,.2,l,s+3.2,i-4.9,0,.04),Fe(t,n.slate,1.2,2.4,.1,l,s+3.2,i-4.98,0,.03);for(let l=-3;l<=3;l++)for(let f=0;f<3;f++)Fe(t,(l+f)%2?n.paveA:n.paveB,3.9,.06,3.9,l*4,.62,i-14-f*4,0,.01);qt(t,n.stoneDark,2.8,3,.5,0,.9,i-18,24),qt(t,n.stone,2.5,2.7,.28,0,1.3,i-18,24),qt(t,n.stoneWarm,.3,.5,2,0,2.3,i-18,12),qt(t,n.stone,1.3,1.1,.25,0,3,i-18,20),qt(t,n.stoneWarm,.14,.3,1.2,0,3.7,i-18,10);const r=new ge({color:5940920,roughness:.08,metalness:.1,transparent:!0,opacity:.82});r.fog=!1;const c=new G(new we(2.4,2.4,.06,28),r);c.position.set(0,1.46,i-18),c.userData.isLandscapeStage=!0,o.add(c);for(const[l,f,d]of[[-17,i-6,1.1],[17,i-6,1.1],[-17,i+6,1.3],[17,i+6,1.3],[-14,i-18,.9],[14,i-18,.9]]){const u=e()>.4?di(d):ls(d*1.1);u.position.set(l,.6,f),o.add(u)}for(const[l,f]of[[-13,i-9.6],[13,i-9.6]])Tr(t,n,l,1.8,f,3.4);return o}function Bv(t,n){const e=Vo(15659508,.4,.25),o=Vo(12663602,.45,.25),i=Vo(2575247,.45,.25),s=Vo(2765112,.5,.6),a=Vo(15843890,.55,.1),r=40,c=1.8;for(let d=0;d<4;d++){const u=d/4*Math.PI*2+Math.PI/4,h=Math.cos(u)*2.2,m=r+Math.sin(u)*2.2;t.add(Gs([[0,0],[.5,0],[.52,.2],[.52,5.4]],20),e,{x:h,y:c+.6,z:m}),t.add(Gs([[.52,0],[.4,.8],[.18,1.6],[0,2.1]],20),o,{x:h,y:c+6,z:m}),t.add(new we(.2,.34,.6,14,1,!0),s,{x:h,y:c+.3,z:m}),ht(t,n.steel,[h*.7+Math.cos(u)*-.4,c+2,r+(m-r)*.7],[h,c+2,m],.07)}for(const d of[1.2,2.6,4,6,6.9,8.8,9.5,11.4])t.add(new me(1.6,.03,6,40),n.steel,{x:0,y:c+d+1,z:r,rx:Math.PI/2});t.add(new we(1.62,1.62,.42,40,1,!0),i,{x:0,y:c+7.45,z:r}),t.add(new we(1.62,1.62,.12,40,1,!0),e,{x:0,y:c+7.05,z:r});for(const d of[0,Math.PI])Fe(t,s,.3,2.2,.06,Math.sin(d)*1.6,c+5,r-Math.cos(d)*1.6,d,.01);for(let d=0;d<5;d++){const u=d/5*Math.PI*2;t.add(new we(.34,.6,.9,16,1,!0),s,{x:Math.cos(u)*.9,y:c+.5,z:r+Math.sin(u)*.9})}Fe(t,s,3.4,.9,7.8,0,1,r,0,.03),Fe(t,a,4.4,.05,.3,0,1.64,r-3.2,0,.005),Fe(t,a,4.4,.05,.3,0,1.64,r+3.2,0,.005),t.add(new gt(1.5,1.2,4),n.darkSteel,{x:0,y:1.5,z:r,ry:Math.PI/4});for(let d=0;d<12;d++){const u=d/12*Math.PI*2;t.add(new we(.1,.1,.08,6),n.brass,{x:Math.cos(u)*3,y:1.66,z:r+Math.sin(u)*3})}const l=6.8;for(const d of[8.5,12.5]){Fe(t,n.darkSteel,2.2,.12,2,l-1.3,1.4+d-.6,r,0,.02);for(const u of[-1,1])ht(t,n.steel,[l-2.3,1.4+d,r+u*1],[l-.2,1.4+d,r+u*1],.04);ht(t,o,[l-4.8,1.4+d,r-.25],[l-1.6,1.4+d-.3,r-.25],.06),ht(t,n.darkSteel,[l-4.8,1.4+d-.2,r+.25],[l-1.6,1.4+d-.5,r+.25],.05)}for(const[d,u]of[[l-.7,r-.7],[l+.7,r+.7]])t.add(new we(.08,.08,18,6),o,{x:d,y:1.4+9,z:u});for(const[d,u]of[[-12,r-11],[12,r-11],[0,r+14]])ht(t,n.steel,[d,1.4,u],[d,21,u],.08),ht(t,n.steel,[d-.8,1.4,u+.8],[d,14,u],.04),ht(t,n.steel,[d+.8,1.4,u+.8],[d,14,u],.04),t.add(new ye(.14,8,6),n.brass,{x:d,y:21.1,z:u});for(const[d,u]of[[-9,r-9],[9,r-9],[-9,r+9],[9,r+9]]){qt(t,n.darkSteel,.1,.16,7.2,d,1.4+3.6,u,8),Fe(t,n.darkSteel,1.6,.9,.3,d,1.4+7.4,u,0,.03);for(let h=0;h<6;h++)t.add(new ye(.15,8,6),n.lampGlass,{x:d-.55+h%3*.55,y:1.4+7.2+(h<3?.2:.62),z:u-.2})}Fe(t,n.stone,15,14,12,-22,7.6,r+7,0,.1);for(let d=0;d<6;d++)Fe(t,n.stoneDark,.3,14,12.2,-29+d*2.8,7.6,r+7,0,.03);Fe(t,n.darkSteel,6,9.5,.3,-22,6.2,r+.95,0,.05);for(let d=0;d<4;d++)Fe(t,a,6.2,.35,.34,-22,3+d*2.4,r+.88,0,.02);Fe(t,e,15.4,.5,12.4,-22,14.9,r+7,0,.05);for(const[d,u]of[[-26,3.4],[-18,3.4]])Fe(t,o,u,1.2,.2,d,11.6,r+.9,0,.02);for(let d=0;d<9;d++)Fe(t,d%2?n.paveA:n.paveB,11,.06,4.2,-10+d%1*0+d*0,.8,r+0,0,.01);for(const[d,u,h]of[[16,r-2,0],[20,r+4,.5]])qt(t,n.darkSteel,.35,.55,3.2,d,1.6+1.6,u,10),t.add(new ye(2.2,20,8,0,Math.PI*2,0,Math.PI/3),e,{x:d,y:5,z:u,rx:-.9,ry:h}),ht(t,n.steel,[d,5,u],[d+Math.sin(h)*0,7,u-1.2],.04);for(const[d,u,h]of[[10,r-13,.3],[-4,r-14,-.2],[14,r+12,1.2]]){Fe(t,e,3.2,1.3,1.6,d,1.4+1.2,u,h,.08),Fe(t,n.glass,1,.7,1.62,d-.9*Math.cos(h),1.4+1.5,u+.9*Math.sin(h),h,.04);for(const m of[-1.1,1.1])for(const _ of[-.8,.8])t.add(new we(.34,.34,.26,12),n.darkSteel,{x:d+m*Math.cos(h),y:1.4+.34,z:u-m*Math.sin(h)+_,rz:Math.PI/2,ry:h})}for(const d of[r-6,r+6]){for(let u=0;u<4;u++)t.add(new we(.16,.16,6,8),n.steel,{x:-12+u*1.5,y:2.4+u*0,z:d,rz:Math.PI/2});Fe(t,n.darkSteel,.3,1.8,.3,-9,2.2,d,0,.03),Fe(t,n.darkSteel,.3,1.8,.3,-15,2.2,d,0,.03)}const f=19;for(let d=0;d<44;d++){const u=d/44*Math.PI*2,h=Math.cos(u)*f,m=r+Math.sin(u)*f;m>r+4&&h<-8||(ht(t,n.darkSteel,[h,.9,m],[h,3,m],.05),d%2&&ht(t,n.steel,[h,2.7,m],[Math.cos(u+.143)*f,2.7,r+Math.sin(u+.143)*f],.012))}ht(t,n.steel,[24,1.4,r-8],[24,8.4,r-8],.07),t.add(new gt(.35,2.4,8,1,!0),o,{x:24.9,y:8.2,z:r-8,rz:Math.PI/2})}function zv(t,n,e,o){const i=new Ke,s=qo(13191741),a=qo(3104138),r=38;if(e.ledger){for(let d=0;d<44;d++)Fe(t,n.stoneDark,.34,.26,.34,-10.4+d*.5,13.35,49-2.1,0,.02);Fe(t,n.woodDark,4.4,5.6,.3,0,3.7,49-1.75,0,.05);for(const d of[-1,1]){Fe(t,n.brass,1.9,4.8,.12,d,3.3,49-1.9,0,.03);for(let u=0;u<6;u++)for(let h=0;h<2;h++)t.add(new ye(.06,6,5),n.stoneWarm,{x:d-.45+h*.9,y:1.4+u*.7,z:49-1.98})}t.add(Md(4.4,3.2,.4),n.stoneDark,{x:0,y:6.9,z:49-1.75});for(let d=0;d<6;d++)Fe(t,d%2?n.stone:n.stoneWarm,18+d*0-d*0,.18,1.2,0,.18+0+d*0,49-4.6-d*.5,0,.02);for(const d of[-7,7])Fe(t,n.stoneDark,1.5,3.2,.25,d,4,49-1.7,0,.04),tr(t,n,d,1.3,49-4.2,Math.PI,.8);qt(t,n.brass,1.15,1.15,.25,0,11.9,49-2.3,28),t.add(new me(1.1,.1,8,36),n.brass,{x:0,y:11.9,z:49-2.45}),ht(t,n.darkSteel,[0,11.9,49-2.5],[.6,12.4,49-2.5],.04),ht(t,n.darkSteel,[0,11.9,49-2.5],[-.15,12.9,49-2.5],.035);for(const d of[-13.4,13.4])ht(t,n.steel,[d,1.3,45],[d,11.3,45],.08),Fe(t,d<0?s:a,2,1.2,.05,d+(d<0?1.1:-1.1),10.4,45,0,.005)}qt(t,n.stoneDark,3.6,3.8,.6,0,1.55,r+3,28),qt(t,n.stone,3.3,3.5,.4,0,2.15,r+3,28),qt(t,n.stoneWarm,.45,.7,2.4,0,3,r+3,12),qt(t,n.stone,1.7,1.4,.3,0,4,r+3,22),qt(t,n.stoneWarm,.2,.4,1.4,0,4.9,r+3,10);for(let f=0;f<6;f++){const d=f/6*Math.PI*2;t.add(new ye(.28,12,8),n.brass,{x:Math.cos(d)*.75,y:6,z:r+3+Math.sin(d)*.75}),ht(t,n.brass,[0,5.6,r+3],[Math.cos(d)*.75,6,r+3+Math.sin(d)*.75],.035)}const c=new ge({color:5874869,roughness:.08,metalness:.1,transparent:!0,opacity:.84});c.fog=!1;const l=new G(new we(3.15,3.15,.05,30),c);if(l.position.set(0,2.38,r+3),l.userData.isLandscapeStage=!0,i.add(l),e.stalls)for(const f of[-12,0,12]){for(let u=0;u<4;u++){qt(t,n.wood,.34,.26,.28,f-2.6+u*1.5,3,35+.7,14);for(let h=0;h<5;h++)t.add(new ye(.12,8,6),Vo([14240573,15903035,8042056,14707599][(u+h)%4],.55,0),{x:f-2.6+u*1.5+(h-2)*.1,y:3.22+h%2*.04,z:35+.7+(h*7%3-1)*.1})}for(let u=0;u<4;u++)qt(t,qo([13191741,3104138,14266954,5077589][u]),.2,.2,1.2,f+3,1.9+u*0,35-1.1+u*.4,12);ht(t,n.brass,[f-.5,3.5,35+.9],[f-.5,3,35+.9],.03),t.add(new me(.2,.025,6,14,Math.PI),n.brass,{x:f-.5,y:3.5,z:35+.9,rz:Math.PI});for(let u=0;u<8;u++)t.add(new ye(.1,8,6),n.lampGlass,{x:f-3.4+u*1,y:4.8+Math.sin(u*.8)*.12-0,z:35-2.3});for(const u of[-1,1]){Fe(t,n.woodDark,.1,3,.1,f+u*3.9,1.4+1.5,35+.4,0,.01);for(const h of[2.2,3])Fe(t,n.wood,.8,.06,.5,f+u*3.9,h,35+.4,0,.01)}}for(const[f,d,u]of[[-14,r+6,0],[14,r+6,0],[-6,r+8,Math.PI],[6,r+8,Math.PI]]){Fe(t,n.woodDark,2.2,.12,.7,f,1.8,d,u,.02),Fe(t,n.woodDark,2.2,.5,.1,f,2.2,d-.3*Math.cos(u),u,.02);for(const h of[-.9,.9])Fe(t,n.darkSteel,.1,.4,.6,f+h,1.6,d,u,.02)}for(const f of[-15,-7.5,7.5,15])Tr(t,n,f,1.35,r-7.5,3.8);for(const[f,d]of[[-17,r+1],[17,r+1]]){qt(t,n.stoneDark,1,1.15,.9,f,1.8,d,12);const u=di(.85);u.position.set(f,2.25,d),i.add(u)}Fe(t,n.woodDark,.15,2.4,.15,-9,2.6,r-8.5,0,.02),Fe(t,n.woodDark,.15,2.4,.15,-6,2.6,r-8.5,0,.02),Fe(t,n.wood,3.4,1.3,.1,-7.5,3.3,r-8.5,0,.02);for(let f=0;f<8;f++)Fe(t,n.paper,.6,.4,.02,-8.8+f%4*.82,3+Math.floor(f/4)*.55,r-8.58,(o()-.5)*.15,.005);return i}function Hv(t,n,e,o){const i=new Ke,s=38,a=[qo(13191741),qo(14266954),qo(4160140),qo(9067176)];for(let d=0;d<18;d++){const u=d/18*Math.PI*2,h=Math.cos(u)*9,m=s+Math.sin(u)*9;if(Fe(t,n.stoneDark,.9,.1,.16,h,1.18+d%3*0,m,-u,.01),d%3===0){Fe(t,n.stone,1,2.4,.45,h*1.12,1.4,s+(m-s)*1.12,-u+Math.PI/2,.08);const _=new G(new Ye(.12,.9,.02),o);_.position.set(h*1.12-Math.sin(u)*0,1.6,s+(m-s)*1.12),_.rotation.y=-u+Math.PI/2,_.userData.isLandscapeBeacon=!0,i.add(_)}}for(let d=0;d<6;d++){const u=d/6*Math.PI*2+.3,h=Math.cos(u)*5.6,m=s+Math.sin(u)*5.6;Fe(t,n.woodDark,2.2,.14,.6,h,.95,m,-u+Math.PI/2,.02),Fe(t,n.woodDark,2.2,.5,.08,h-Math.cos(u)*.3,1.3,m-Math.sin(u)*.3,-u+Math.PI/2,.02);for(const _ of[-.9,.9])Fe(t,n.darkSteel,.1,.5,.5,h+Math.sin(u)*_,.7,m-Math.cos(u)*_,-u+Math.PI/2,.02)}for(let d=0;d<14;d++)Fe(t,d%2?n.paveA:n.paveB,1.6,.08,1.1,d%2?.3:-.3,.64,25+d*.55,.05*(d%3),.01);for(let d=0;d<24;d++){const u=e()*Math.PI*2,h=3.2+e()*6;t.add(new ye(.4+e()*.3,10,7),n.leaf,{x:Math.cos(u)*h,y:.6,z:s+Math.sin(u)*h,sy:.4})}for(let d=0;d<70;d++){const u=e()*Math.PI*2,h=2.5+e()*8.5,m=11+e()*9,_=Math.cos(u)*h,p=s+Math.sin(u)*h,g=1.2+e()*2.2;ht(t,n.wood,[_,m,p],[_,m-g,p],.012);const x=a[d%4];t.add(new Je(.22,.7+e()*.4),x,{x:_,y:m-g-.25,z:p,ry:e()*3.14}),d%3===0&&Fe(t,n.wood,.3,.46,.03,_+.2,m-g*.5,p,e()*3.14,.01)}const r=16,c=s-6;Fe(t,n.stoneDark,3.4,.5,3.4,r,.85,c,0,.05);for(const d of[-1.3,1.3])for(const u of[-1.3,1.3])qt(t,n.woodDark,.14,.17,2.6,r+d,2.4,c+u,10);t.add(gn(2.7,.3,.05,4),n.terracottaRoof,{x:r,y:3.7,z:c,ry:Math.PI/4}),t.add(new gt(2.4,1.1,4),n.terracottaRoof,{x:r,y:4.5,z:c,ry:Math.PI/4}),qt(t,n.stone,.4,.5,.8,r,1.5,c,10),qt(t,n.lampGlass,.14,.12,.3,r,2.1,c,8);const l=-15,f=s+6;return ht(t,n.woodDark,[l-1.4,.6,f],[l-.9,5.2,f],.1),ht(t,n.woodDark,[l+1.4,.6,f],[l+.9,5.2,f],.1),ht(t,n.woodDark,[l-1,5.1,f],[l+1,5.1,f],.11),ht(t,n.wood,[l-.4,5,f],[l-.4,1.4,f],.015),ht(t,n.wood,[l+.4,5,f],[l+.4,1.4,f],.015),Fe(t,n.wood,.9,.06,.3,l,1.35,f,0,.01),i}const qn=(t,n=.85,e=.02,o={})=>{const i=new ge({color:t,roughness:n,metalness:e,...o});return i.fog=!1,i};function Mi(t,n=32){return new Vs(t.map(([e,o])=>new rt(e,o)),n)}function Ds(t,n,e,o,i,s,a){t.add(fe(a*3,a*.7,a*3,.05),n.stoneDark,{x:e,y:o+a*.35,z:i}),t.add(tt(a*.82,a,s,24),n.stone,{x:e,y:o+a*.7+s/2,z:i});for(let r=0;r<12;r++){const c=r/12*Math.PI*2;t.add(tt(a*.045,a*.045,s*.92,4),n.stoneDark,{x:e+Math.cos(c)*a*.9,y:o+a*.7+s/2,z:i+Math.sin(c)*a*.9})}t.add(new me(a*.84,a*.07,6,24),n.stoneDark,{x:e,y:o+a*.7+s-a*.2,z:i,rx:Math.PI/2}),t.add(tt(a*1.3,a*.82,a*.5,24),n.stoneWarm,{x:e,y:o+a*.7+s+a*.25,z:i}),t.add(fe(a*3,a*.45,a*3,.04),n.stoneDark,{x:e,y:o+a*.7+s+a*.72,z:i})}function Vv(t,n,e){const o=new Ke;o.name="harbor-hub";const i=Fn(),s=new Dn,a=fs(202),r=qn(15261639,.9,0,{side:$e}),c=qn(7031347,.8),l=qn(12073778,.7),f=new Je(78,42,78,42);f.rotateX(-Math.PI/2);const d=f.attributes.position,u=new Float32Array(d.count*3),h=new te(1918040),m=new te(3899270),_=new te;for(let b=0;b<d.count;b++){const A=d.getX(b),R=d.getZ(b);d.setY(b,Math.sin(A*.45+R*.3)*.07+Math.cos(A*.21-R*.52)*.06);const L=St.clamp((R+21)/42,0,1);_.copy(m).lerp(h,L*.9),u[b*3]=_.r,u[b*3+1]=_.g,u[b*3+2]=_.b}f.setAttribute("color",new xt(u,3)),f.computeVertexNormals();const p=new ge({color:16777215,vertexColors:!0,roughness:.4,metalness:.05,transparent:!0,opacity:.94,envMapIntensity:.35});p.fog=!1;const g=qn(9425108,.4,.05,{transparent:!0,opacity:.55}),x=new G(f,p);x.position.set(0,.52,39),x.userData.isLandscapeStage=!0,x.userData.noLandscapeShadow=!0,o.add(x),s.add(fe(66,1.1,5.2,.08),i.stoneDark,{y:.45,z:29.4}),s.add(fe(66.6,.22,5.6,.05),i.stone,{y:1.56,z:29.4});for(let b=0;b<44;b++)s.add(fe(.04,.9,.06,.01),i.slate,{x:-32.5+b*1.5,y:.5,z:26.82});for(let b=0;b<12;b++){const A=-30+b*5.45;s.add(tt(.14,.18,.5,12),i.darkSteel,{x:A,y:1.78,z:27.3}),s.add(tt(.22,.14,.1,12),i.darkSteel,{x:A,y:2.28,z:27.3})}for(const b of[-26,0,26]){for(let A=0;A<20;A++)s.add(fe(8.5,.1,.62,.015),A%2?i.wood:i.woodDark,{x:b,y:1.48,z:29.6+A*.7});for(const A of[-1,1]){s.add(fe(.26,.3,14,.03),i.woodDark,{x:b+A*4.1,y:1.28,z:36.2});for(let R=0;R<4;R++){const L=31+R*3.8;s.add(tt(.18,.2,2.3,10),i.woodDark,{x:b+A*4.1,y:.5,z:L}),s.add(new me(.2,.05,6,14),i.wood,{x:b+A*4.1,y:1,z:L,rx:Math.PI/2})}}}for(const b of[-26,0,26])s.add(tt(.07,.09,2.6,8),i.darkSteel,{x:b,y:1.5,z:42.6}),s.add(tt(.2,.26,.5,8),i.lampGlass,{x:b,y:4,z:42.6}),s.add(new gt(.34,.3,8),i.darkSteel,{x:b,y:4.45,z:42.6});for(const[b,A]of[-23,23].entries()){const R=b===0?37.2:42.1,L=new Mn;L.moveTo(-5.3,.55),L.quadraticCurveTo(-5.9,.5,-5,.1),L.lineTo(-3.8,-.8),L.lineTo(3.8,-.8),L.quadraticCurveTo(5.3,-.2,5.8,.55),L.closePath();const I=new Cn(L,{depth:2.2,bevelEnabled:!0,bevelSegments:2,bevelSize:.1,bevelThickness:.08});I.translate(0,0,-1.1),s.add(I,c,{x:A,y:1,z:R,ry:Math.PI/2}),s.add(fe(.14,.14,10.8,.02),l,{x:A+1.12,y:1.55,z:R}),s.add(fe(.14,.14,10.8,.02),l,{x:A-1.12,y:1.55,z:R});for(let O=0;O<14;O++)s.add(fe(2.1,.06,.55,.01),O%2?i.wood:i.woodDark,{x:A,y:1.62,z:R-4.6+O*.72});s.add(fe(1.2,.8,1.6,.04),i.wood,{x:A,y:1.66,z:R-2.6}),s.add(fe(1.3,.08,1.7,.02),i.woodDark,{x:A,y:2.5,z:R-2.6}),s.add(tt(.07,.12,6.4,10),i.woodDark,{x:A,y:1.6,z:R}),s.add(tt(.05,.05,3.4,8),i.woodDark,{x:A,y:4.6,z:R-.1,rx:Math.PI/2});const U=new Je(3.2,3.9,8,8),N=U.attributes.position;for(let O=0;O<N.count;O++)N.setZ(O,Math.cos(N.getX(O)/3.2*Math.PI)*.35);U.computeVertexNormals(),s.add(U,b===0?r:qn(12571880,.9,0,{side:$e}),{x:A,y:4.2,z:R,ry:Math.PI/2}),s.add(It([A,7.9,R],[A,1.6,R-5.3],.012,4),i.steel),s.add(It([A,7.9,R],[A,1.6,R+5.5],.012,4),i.steel)}const M=51.2;s.add(fe(17.5,9.6,1.2,.08),i.stoneWarm,{y:0,z:M});for(let b=1;b<12;b++)s.add(fe(17.6,.05,1.22,.01),i.stoneDark,{y:b*.8,z:M});for(const b of[-8.5,8.5])s.add(fe(1.6,.8,1.9,.06),i.stoneDark,{x:b,y:0,z:M-.55}),s.add(tt(.62,.78,8.2,20),i.stone,{x:b,y:.8,z:M-.55}),s.add(fe(1.8,.6,2,.06),i.stoneDark,{x:b,y:9,z:M-.55});s.add(fe(18.6,.7,2.1,.06),i.stoneDark,{y:9.6,z:M-.2}),s.add(Yn(18.2,2.8,1.2),i.stone,{y:10.3,z:M-.2});for(let b=0;b<6;b++)s.add(fe(.34,.34,.14,.02),i.stoneDark,{x:-7.5+b*3,y:9.35,z:M-1.28});for(const b of[-5.2,0,5.2])s.add(fe(4.6,4.8,.3,.05),i.stoneDark,{x:b,y:2.2,z:M-.7}),s.add(fe(4.2,4.4,.2,.04),i.slate,{x:b,y:2.4,z:M-.8}),s.add(new we(2.1,2.1,.2,24,1,!1,0,Math.PI),i.slate,{x:b,y:6.8,z:M-.8,rx:Math.PI/2});s.add(fe(17.6,.5,1.4,.05),i.brass,{y:8.7,z:M-.75});for(let b=0;b<4;b++)s.add(fe(5.2-b*.2,.16,.5,.02),i.stone,{x:0,y:0+b*.16,z:M-2.2-b*.2});const S=0,T=58.2,w=qn(12073778,.7);s.add(tt(2.1,2.5,.8,32),i.stoneDark,{x:S,y:0,z:T});let y=.8;for(let b=0;b<6;b++)s.add(tt(1.65-b*.07-.07,1.65-b*.07+0,1.05,32),b%2?w:i.stone,{x:S,y,z:T}),y+=1.05;s.add(tt(2,1.45,.3,36),i.stoneDark,{x:S,y,z:T});for(let b=0;b<20;b++){const A=b/20*Math.PI*2;s.add(It([S+Math.cos(A)*1.9,y+.3,T+Math.sin(A)*1.9],[S+Math.cos(A)*1.9,y+1,T+Math.sin(A)*1.9],.025,4),i.steel)}s.add(new me(1.9,.03,5,36),i.steel,{x:S,y:y+1,z:T,rx:Math.PI/2}),s.add(tt(1.05,1.1,1.1,24),i.glass,{x:S,y:y+.3,z:T});for(let b=0;b<8;b++){const A=b/8*Math.PI*2;s.add(It([S+Math.cos(A)*1.08,y+.3,T+Math.sin(A)*1.08],[S+Math.cos(A)*1.08,y+1.4,T+Math.sin(A)*1.08],.04,5),i.darkSteel)}s.add(tt(1.35,1.15,.15,28),i.darkSteel,{x:S,y:y+1.4,z:T}),s.add(new gt(1.35,.8,28),w,{x:S,y:y+1.95,z:T}),s.add(It([S,y+2.3,T],[S,y+3,T],.03,4),i.steel);for(let b=0;b<10;b++){const A=-28+a()*56;a()>.5?s.add(tt(.4,.4,.9,16),i.woodDark,{x:A,y:1.68,z:28.2+a()*1.4}):s.add(fe(.8,.7,.8,.04),i.wood,{x:A,y:1.68,z:28.2+a()*1.4,ry:a()*3})}Ov(s,i,a),s.build(o,"harbor-hub",{isLandscapeStage:!0});for(const[b,A]of[-18,-6,6,18].entries()){const R=new G(new lo(.36+b%2*.08,0),t);R.position.set(A,3.5+b%2*.45,40),R.userData.isLandscapeBeacon=!0,o.add(R);const L=new G(new we(1.1,1.4,1.1,24),i.stoneDark);L.position.set(A,1,40.2),L.castShadow=!0,L.userData.isLandscapeStage=!0,o.add(L);const I=new G(new Ye(1,1.4+b%2*.4,.2),b%2?n:i.stone);I.position.set(A,2.5,40.2),I.castShadow=!0,I.userData.isLandscapeStage=!0,o.add(I)}for(const b of[-26,0,26]){const A=new G(new me(.3,.06,6,16),n);A.rotation.x=Math.PI/2,A.position.set(b+3.45,1.62,37.8),A.userData.isLandscapeRing=!0,o.add(A)}const v=new G(new ye(.62,20,14),t);v.position.set(S,y+.9,T),v.userData.isLandscapeBeacon=!0,o.add(v);const E=new G(new me(1.7,.08,7,36),n);E.rotation.x=Math.PI/2,E.position.set(S,y+.9,T),E.userData.isLandscapeRing=!0,o.add(E);for(const[b,A]of[[-31,31],[-15,46],[15,46],[31,31]]){const R=new G(new me(2.8,.08,6,32),g);R.rotation.x=Math.PI/2,R.position.set(b,.66,A),R.userData.isLandscapeRing=!0,o.add(R)}if(e){const b=new G(new Je(14.8,2.78),new wt({map:e,side:$e,toneMapped:!1}));b.position.set(0,7.7,M-1.1),b.rotation.y=Math.PI,o.add(b)}return o}function Wv(t,n){const e=new Ke;e.name="memory-tree-hub";const o=fs(303),i=_m();i.position.set(0,0,38),e.add(i);const s=t.clone();s.emissiveIntensity=1.4;for(let c=0;c<26;c++){const l=o()*Math.PI*2,f=4+o()*7,d=21+(o()-.2)*9,u=new G(new ye(.55+o()*.4,14,10),s);u.position.set(Math.cos(l)*f,d,38+Math.sin(l)*f),u.userData.isLandscapeBeacon=!0,e.add(u)}const a=Fn(),r=new Dn;for(let c=0;c<18;c++){const l=c/18*Math.PI*2;r.add(fe(1.8+o()*.6,.8,1.2,.12),c%2?a.stone:a.stoneDark,{x:Math.cos(l)*9,y:.3+o()*.2,z:38+Math.sin(l)*9,ry:-l})}for(let c=0;c<7;c++){const l=o()*Math.PI*2;r.add(new So(.7+o()*.9,1),a.rock,{x:Math.cos(l)*(11+o()*4),y:.4,z:38+Math.sin(l)*(11+o()*4),sy:.7,ry:o()*3})}e.add(Hv(r,a,o,t)),r.build(e,"memory-tree-ring",{isLandscapeStage:!0});for(const c of[-31,31]){const l=new G(new me(4,.16,8,48),n);l.rotation.x=Math.PI/2,l.position.set(c,.9,36),l.userData.isLandscapeRing=!0,e.add(l)}return e}function Xv(t,n){const e=new Ke;e.name="idea-temple-hub";const o=Fn(),i=new Dn,s=40;i.add(fe(30,.4,19,.07),o.stoneDark,{y:.6,z:s}),i.add(fe(28.2,.4,17.4,.06),o.stone,{y:1,z:s}),i.add(fe(26.6,.4,16,.06),o.stoneWarm,{y:1.4,z:s});const a=1.8;for(let m=0;m<4;m++)i.add(fe(9,.2,1.4,.04),o.stoneWarm,{x:0,y:.6+m*.4,z:s-9.6-(3-m)*.6});const r=9.6,c=.95,l=[-10.4,-6.24,-2.08,2.08,6.24,10.4];for(const m of l)Ds(i,o,m,a,s-6.2,r,c),Ds(i,o,m,a,s+6.2,r,c);for(const m of[-10.4,10.4])for(const _ of[s-2.07,s+2.07])Ds(i,o,m,a,_,r,c);const f=a+c*.7+r+c*.95+0;i.add(fe(23.2,1.3,14,.08),o.stoneWarm,{y:f,z:s});for(let m=0;m<24;m++)i.add(fe(.4,.9,.18,.03),o.stoneDark,{x:-11+m*.96,y:f+.2,z:s-7.05});i.add(fe(24.4,.5,15.3,.06),o.stone,{y:f+1.3,z:s}),i.add(Yn(24.2,3.6,1.2),o.stone,{y:f+1.8,z:s-6.9}),i.add(Yn(24.2,3.6,1.2),o.stone,{y:f+1.8,z:s+6.9}),i.add(Yn(19.8,2.7,.3),o.slate,{y:f+2.2,z:s-7.4}),i.add(Yn(25,3.7,15.2),o.stoneWarm,{y:f+1.85,z:s}),i.add(Yn(24.4,3.3,15.4),o.terracottaRoof,{y:f+1.95,z:s}),i.add(fe(25.6,.4,.5,.06),o.stone,{y:f+5.2,z:s}),i.add(fe(16.4,r,9.4,.06),o.stone,{y:a,z:s}),i.add(fe(2.4,4.2,.4,.05),o.slate,{y:a,z:s-4.75}),i.add(fe(2.9,.3,.6,.04),o.stoneDark,{y:a+4.2,z:s-4.8});for(const m of[-1,1])for(const _ of[-5,5])i.add(fe(1.4,2.4,.3,.04),o.slate,{x:_,y:a+3.2,z:s-4.75+(m>0,0)});for(const m of[-1,1])i.add(tt(.5,.2,1.1,14),o.brass,{x:m*3.4,y:a,z:s-8.2}),i.add(tt(.75,.5,.35,16),o.brass,{x:m*3.4,y:a+1.1,z:s-8.2});e.add(Gv(i,o,fs(404))),i.build(e,"idea-temple",{isLandscapeStage:!0});const d=new G(new we(1.1,1.1,.12,28),t);d.rotation.x=Math.PI/2,d.position.set(0,f+3,s-7.58),e.add(d);const u=new G(new lo(1.3,1),t);u.position.set(0,f+6.6,s),u.userData.isLandscapeBeacon=!0,e.add(u);const h=new G(new me(8,.18,8,56),n);h.rotation.x=Math.PI/2,h.position.set(0,f+5.4,s),h.userData.isLandscapeRing=!0,e.add(h);for(const m of[-1,1]){const _=new G(new $n(.42,1),t);_.position.set(m*3.4,a+1.7,s-8.2),_.userData.isLandscapeBeacon=!0,e.add(_)}return e}function Gc(t,n,e=!0){const o=new Ke;o.name="launch-complex";const i=Fn(),s=new Dn,a=qn(15659508,.4,.3),r=qn(12663602,.45,.3),c=qn(2765112,.5,.6),l=40,f=1.4;s.add(gn(14.6,.5,.05,8),i.stoneDark,{y:.6,z:l}),s.add(gn(13.4,.35,.04,8),i.slate,{y:1.1,z:l}),s.add(gn(10,.15,.03,8),i.stone,{y:1.45,z:l});for(let x=0;x<16;x++){const M=x/16*Math.PI*2;s.add(fe(1.5,.04,.5,.01),x%2?i.brass:i.darkSteel,{x:Math.cos(M)*12.4,y:1.47,z:l+Math.sin(M)*12.4,ry:-M})}s.add(fe(4.2,.1,5.2,.03),i.darkSteel,{y:1.62,z:l});const d=0,u=f+.4;s.add(Mi([[0,0],[1.1,0],[1.5,.2],[1.55,1.6]],40),c,{x:d,y:u,z:l}),s.add(Mi([[1.55,0],[1.6,4.4]],40),a,{x:d,y:u+1.6,z:l}),s.add(Mi([[1.6,0],[1.6,.9]],40),r,{x:d,y:u+6,z:l}),s.add(Mi([[1.6,0],[1.55,2.6]],40),a,{x:d,y:u+6.9,z:l}),s.add(Mi([[1.55,0],[1.3,1.2],[.9,2.6],[.45,3.8],[0,4.6]].map(([x,M])=>[x,M]),40),a,{x:d,y:u+9.5,z:l}),s.add(Mi([[.45,0],[.5,.5]],20),r,{x:d,y:u+13.5,z:l});const h=new Mn;h.moveTo(0,0),h.lineTo(2.2,-.6),h.lineTo(2.2,1.4),h.lineTo(0,3.4),h.closePath();const m=new Cn(h,{depth:.14,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});m.translate(0,0,-.07);for(let x=0;x<4;x++){const M=x/4*Math.PI*2+Math.PI/4;s.add(m,r,{x:d+Math.cos(M)*1.5,y:u+1.2,z:l+Math.sin(M)*1.5,ry:-M})}for(let x=0;x<4;x++){const M=x/4*Math.PI*2;s.add(new we(.25,.4,.7,14,1,!0),c,{x:d+Math.cos(M)*.65,y:u-.35,z:l+Math.sin(M)*.65})}for(const x of[11.1,11.9])s.add(new me(.2,.05,8,18),i.steel,{x:d,y:u+x-2,z:l-1.5,rx:0});if(e){const S=[];for(const[w,y]of[[-.7,-.7],[.7,-.7],[-.7,.7],[.7,.7]])S.push([[6.8+w,f,l+y],[6.8+w*.8,f+17,l+y*.8]]),s.add(It(S[S.length-1][0],S[S.length-1][1],.09,8),i.steel);const T=11;for(let w=0;w<=T;w++){const y=w/T,v=(b,A)=>[S[b][0][0]+(S[b][1][0]-S[b][0][0])*A,S[b][0][1]+(S[b][1][1]-S[b][0][1])*A,S[b][0][2]+(S[b][1][2]-S[b][0][2])*A],E=[0,1,3,2];for(let b=0;b<4;b++)s.add(It(v(E[b],y),v(E[(b+1)%4],y),.04,5),i.steel),w<T&&s.add(It(v(E[b],y),v(E[(b+1)%4],y+1/T),.03,4),i.steel)}for(const w of[8.5,12.5])s.add(fe(5.2,.16,.5,.03),i.darkSteel,{x:6.8-2.8,y:f+w,z:l}),s.add(It([6.8-.8,f+w,l],[6.8-5.3,f+w-.05,l],.07,6),i.darkSteel);s.add(It([6.8,f+17,l],[6.8,f+17+2.4,l],.04,5),i.steel);for(const w of[-3.6,3.6])s.add(tt(1.1,1.1,3.2,24),a,{x:-7.6,y:f,z:l+w}),s.add(new ye(1.1,24,12,0,Math.PI*2,0,Math.PI/2),a,{x:-7.6,y:f+3.2,z:l+w}),s.add(It([-6.5,f+.8,l+w],[-1.8,f+.4,l+w*.3],.1,8),i.steel);s.add(fe(5.2,2.6,3.6,.08),i.stone,{x:-3,y:f,z:l+10.5}),s.add(fe(5.5,.2,3.9,.04),i.slate,{x:-3,y:f+2.6,z:l+10.5}),s.add(fe(4.2,.9,.1,.02),i.glass,{x:-3,y:f+1.2,z:l+8.65}),s.add(It([-1.4,f+2.8,l+10.5],[-1.4,f+5.2,l+10.5],.05,6),i.steel),s.add(new ye(.9,20,8,0,Math.PI*2,0,Math.PI/3),a,{x:-2.2,y:f+5,z:l+10.5,rx:-.9})}e&&Bv(s,i),s.build(o,"launch-complex",{isLandscapeStage:!0});const _=new G(new ye(.38,16,12),t);_.position.set(d,u+14.3,l),_.userData.isLandscapeBeacon=!0,o.add(_);const p=new G(new me(8,.2,8,56),n);p.rotation.x=Math.PI/2.4,p.position.set(0,9,l),p.userData.isLandscapeRing=!0,o.add(p);const g=p.clone();return g.rotation.x=-Math.PI/3,g.rotation.z=Math.PI/5,o.add(g),o}function qv(t,n,e){const o=new Ke;o.name="exchange-hub";const i=Fn(),s=new Dn,a=fs(606),r=38;s.add(fe(32,.5,20,.06),i.stoneDark,{y:.55,z:r}),s.add(fe(30.4,.3,18.4,.05),i.stone,{y:1.05,z:r});for(let l=-7;l<=7;l++)s.add(fe(.04,.02,18.2,.005),i.slate,{x:l*2,y:1.36,z:r});for(let l=-4;l<=4;l++)s.add(fe(30.2,.02,.04,.005),i.slate,{y:1.36,z:r+l*2});if(e.stalls)for(const l of[-12,0,12]){const d=[qn(13191741,.9,0,{side:$e}),qn(15853778,.9,0,{side:$e})];for(const u of[-1,1])for(const h of[-1,1])s.add(tt(.1,.12,3.6,10),i.woodDark,{x:l+u*3.4,y:1.4,z:35+h*2.2});s.add(fe(7.8,.14,.14,.02),i.woodDark,{x:l,y:5,z:35-2.2}),s.add(fe(7.8,.14,.14,.02),i.woodDark,{x:l,y:5,z:35+2.2});for(let u=0;u<10;u++)s.add(fe(.82,.05,5.4,.01),d[u%2],{x:l-3.7+u*.82,y:5.35,z:35,rx:0});s.add(fe(7.2,1.3,1.5,.06),i.wood,{x:l,y:1.4,z:36}),s.add(fe(7.4,.12,1.7,.03),i.woodDark,{x:l,y:2.7,z:36});for(let u=0;u<14;u++){const h=[14240573,15903035,8042056,14707599][u%4];s.add(new ye(.15,10,8),qn(h,.6),{x:l-3+u%7*1,y:2.95,z:35+.65+Math.floor(u/7)*.5})}s.add(fe(1.2,.9,.9,.05),i.wood,{x:l+2.6,y:1.4,z:35-1.2,ry:a()*2}),s.add(tt(.45,.45,.95,16),i.woodDark,{x:l-2.6,y:1.4,z:35-1.2})}if(e.ledger){s.add(fe(21,12.4,3.6,.08),i.stoneWarm,{y:1.3,z:49});for(let f=1;f<15;f++)s.add(fe(21.1,.05,3.62,.01),i.stoneDark,{y:1.3+f*.8,z:49});for(const f of[-9,-4.5,0,4.5,9])Ds(s,i,f,1.3,49-2.7,8.6,.45);s.add(fe(22,1,2.2,.06),i.stone,{y:10.2,z:49-2.5}),s.add(fe(22.8,.5,4.2,.06),i.stoneDark,{y:13.7,z:49}),s.add(Yn(22.4,2.4,1.2),i.stone,{y:14.2,z:49-1.2}),s.add(fe(11.2,7,.3,.06),i.slate,{y:3.2,z:49-1.6});for(let f=-3;f<=3;f++)s.add(fe(7.5,.08,.12,.01),i.brass,{y:5+f*.7-1.3,z:49-1.85});s.add(fe(13,.4,.4,.05),i.brass,{y:10.3,z:49-3.7})}if(o.add(zv(s,i,e,a)),s.build(o,"exchange-hub",{isLandscapeStage:!0}),e.ledger){const l=new G(new Ye(10.4,6.4,.18),t);l.position.set(0,6,49-1.78),l.castShadow=!1,o.add(l)}if(e.stalls)for(const l of[-12,0,12]){const f=new G(new ye(.28,14,10),t);f.position.set(l,4.6,33),f.userData.isLandscapeBeacon=!0,o.add(f)}const c=new G(new me(2.4,.07,8,48),n);return c.rotation.x=Math.PI/2,c.position.set(0,1.5,r+4),c.userData.isLandscapeRing=!0,o.add(c),o}const Yv={unit01:{section_a:["message","dialogue","focus","listening-bench"],section_b:["notification","study-desk","filter","offline-rest"],section_c:["clinic","telemedicine","community","community-network"]},unit02:{section_a:["timeline","route-evidence","perseverance","legacy"],section_b:["spotlight","humanitarian","lasting-service","community-witness"],section_c:["fleet","peace-contact","chart-room","exchange-harbor"]},unit03:{section_a:["itinerary","detour","market-encounter","reflection-garden"],section_b:["hostel","open-route","rain-shelter","confidence"],section_c:["rail-platform","rail-car","landscape-window","route-network"]},unit04:{section_a:["career","bench","violin","work-dignity"],section_b:["caliper","craft-quality","craft-evolution","trust-bridge"],section_c:["loom","embroidery-table","heritage","living-heritage"]},unit05:{section_a:["lunar-probe","relay-bridge","sample-lab","moon-horizon"],section_b:["test-console","orbit-adjustment","systems-simulation","mission-control"],section_c:["training","crew-simulation","science-exhibit","future-frontier"]},unit06:{section_a:["bookshop","exchange","resilience","budget-board"],section_b:["exchange-wall","resource-cycle","trust-ledger","sustainable-market"],section_c:["library","digital-lending","community-library","knowledge-bridge"]}};function Kv(t,n,e,o,i="high"){const s=new Ke;s.name=["unit-landscape",t.id,e??"hub"].join("-");const a=jv(t,e),r=new te(a.accent),c=new te(a.secondary),l=new te(...t.terrainTint);l.multiplyScalar(.88);const f=new ge({color:l,roughness:.72,metalness:.16}),d=new ge({color:3426398,roughness:.84,metalness:.12}),u=new ge({color:c,emissive:c,emissiveIntensity:1.2,roughness:.2,metalness:.36}),h=new ge({color:r,emissive:r,emissiveIntensity:.75,roughness:.18,metalness:.42});if(d.fog=!1,u.fog=!1,h.fog=!1,Sn(e)&&(u.emissiveIntensity=.56,h.emissiveIntensity=.42,d.color.set(4610672),d.roughness=.86,d.metalness=.08),Sn(e)?$v(s,a.route,h):(s.add(R3(u,h,{tint:t.crystalColor,greenery:t.decorStyle!=="space"})),s.add(kv())),Sn(e)){const _=new Ke;Bc(_,e,o,f,d,u,h,r,t.id,i),_.scale.setScalar(.9),_.position.set(0,1.8,-15),s.add(_)}else Bc(s,e,o,f,d,u,h,r,t.id,i)||Jv(s,e,f,d,u,h);Sn(e)||Qv(s,e,o,a.accent);const m=new Ke;switch(t.decorStyle){case"coast":ex(m,d,u,h,Sn(e));break;case"market":t.id==="unit02"&&/^section_b-world-\d+$/.test(e??"")?nx(m,h):tx(m,f,d,u,h);break;case"forest":ox(m,f,u,h,Sn(e));break;case"temple":ix(m,f,d,u,h,Sn(e));break;case"space":sx(m,d,u,h,Sn(e));break;case"exchange":ax(m,f,d,u,h,Sn(e),e);break;default:rx(m,f,d,u,h);break}return Sn(e)?(m.scale.setScalar(t.focusedLandscapeScale??.72),m.position.z=t.focusedLandscapeOffsetZ??14):(m.scale.setScalar(.62),m.position.z=1.5),s.add(m),Uv(s),s.traverse(_=>{const p=_ instanceof G&&!_.userData.noLandscapeShadow;_.castShadow=p,_.receiveShadow=p&&!Sn(e)}),s}function Sn(t){return!!(t&&(/^section_[abc]-world-\d+$/.test(t)||/^lab-vocab-\d+$/.test(t)||["lab-grammar","lab-cloze","lab-translation","project-reading","project-listening","project-writing","project-memory"].includes(t)))}function $v(t,n,e){for(let o=0;o<5;o++){const i=1.8+o*2.1,s=.54+o*.32,a=L3(n);a.position.set(o%2===0?-.28:.28,s,i),a.rotation.y=o%2===0?-.035:.035,t.add(a);const r=new G(new lo(.34,0),e);r.position.set(0,s+.42,i),r.userData.isLandscapeBeacon=!0,t.add(r)}}function jv(t,n){if(!n||n==="hub")return{accent:t.crystalColor,secondary:t.orbColor,route:t.pathColor};const e=n.match(/^(section_[abc])-world-(\d+)$/);if(e){const c={section_a:[{accent:6478079,secondary:12120575,route:2918143},{accent:7992016,secondary:12713968,route:2329464},{accent:16762218,secondary:16769443,route:10316573},{accent:16032511,secondary:16767339,route:10247423}],section_b:[{accent:7977215,secondary:12048639,route:3633083},{accent:11903231,secondary:14735359,route:6900418},{accent:6809765,secondary:12255189,route:2656598},{accent:16760184,secondary:16768948,route:10971945}],section_c:[{accent:16743282,secondary:16761210,route:14046034},{accent:16164541,secondary:16766692,route:11555446},{accent:8185807,secondary:13041648,route:3313017},{accent:16765802,secondary:16772522,route:10384424}]}[e[1]][(Number(e[2])-1)%4];return{accent:new te(c.accent).lerp(new te(t.crystalColor),.66).getHex(),secondary:new te(c.secondary).lerp(new te(t.orbColor),.56).getHex(),route:new te(c.route).lerp(new te(t.pathColor),.6).getHex()}}const o=n.match(/^lab-vocab-(\d+)$/);if(o){const r=[5625599,7659696,11903231,16760425,16748445,9353215],c=r[(Number(o[1])-1)%r.length];return{accent:new te(c).lerp(new te(t.crystalColor),.52).getHex(),secondary:t.orbColor,route:t.pathColor}}const s={"lab-grammar":{accent:8246268,secondary:14412542,route:3766200},"lab-cloze":{accent:8703150,secondary:13761253,route:2521693},"lab-translation":{accent:12887551,secondary:15785215,route:7819445},"project-reading":{accent:16763760,secondary:16772533,route:10777384},"project-listening":{accent:7723007,secondary:12251647,route:3636647},"project-writing":{accent:16754812,secondary:16768705,route:10442550},"project-memory":{accent:13869823,secondary:15850751,route:7491766}}[n];return s?{accent:new te(s.accent).lerp(new te(t.crystalColor),.58).getHex(),secondary:new te(s.secondary).lerp(new te(t.orbColor),.5).getHex(),route:new te(s.route).lerp(new te(t.pathColor),.58).getHex()}:{"section-a":{accent:6478079,secondary:12120575,route:2918143},"section-b":{accent:16762218,secondary:16769443,route:10316573},"stories-of-china":{accent:16743282,secondary:16761210,route:14046034},"learning-lab":{accent:9437118,secondary:8246268,route:3257214},"unit-project":{accent:16032511,secondary:16767339,route:10247423}}[n]??{accent:t.crystalColor,secondary:t.orbColor,route:t.pathColor}}function Bc(t,n,e,o,i,s,a,r,c,l){var _,p;if(!n)return!1;const f=Iv[n];if(f){t.add(Ic(r.getHex()));const g=(M=5.2)=>{const S=new G(new lo(1.7,1),s);return S.position.set(0,M,27),S.userData.isLandscapeBeacon=!0,t.add(S),S},x=(M,S,T=Math.PI/2)=>{const w=new G(new me(M,.1,8,64),a);return w.position.set(0,S,27),w.rotation.x=T,w.userData.isLandscapeRing=!0,t.add(w),w};return f({root:t,glow:s,edge:a,dark:i,ground:o,detail:l,accent:r.clone(),beacon:g,ring:x}),!0}const d=(g,x,M,S,T,w=0)=>{const y=new G(g,x);return y.position.set(M,S,T),y.rotation.y=w,t.add(y),y},u=(g=5.2)=>{const x=s.clone();Sn(n)&&(x.color.copy(r),x.emissive.copy(r),x.emissiveIntensity=.24,x.roughness=.42,x.metalness=.16);const M=d(new lo(1.7,1),x,0,g,27);return M.userData.isLandscapeBeacon=!0,M},h=(g,x,M=Math.PI/2)=>{const S=d(new me(g,.16,8,40),a,0,x,27);return S.rotation.x=M,S.userData.isLandscapeRing=!0,S},m=n.match(/^(section_[abc])-world-(\d+)$/);if(m){const g=m[1],x=Number(m[2]),M=(e??"").split(" · ")[0],S=/connection|conversation|communication|dialogue|social/i.test(M);if(t.add(Ic(r.getHex())),c==="unit06"&&g==="section_a"&&x===1)return gd.bookshop({root:t,glow:s,edge:a,dark:i,ground:o,detail:l,accent:new te(16777215),beacon:u,ring:h}),!0;const T=(p=(_=Yv[c])==null?void 0:_[g])==null?void 0:p[x-1];if(T&&T!=="bookshop"&&!(T==="dialogue"&&g==="section_a"&&x===1&&S))return Zv(t,T,d,o,i,s,a,u,h,l),!0;if(g==="section_a"&&x===1&&S){d(new Ye(6.2,.32,4.8),o,-1.9,4,27,-.12),d(new Ye(6.2,.32,4.8),s,1.9,4,27,.12);for(const b of[-1.9,1.9]){const A=d(new we(.24,.34,2.7,8),i,b,2.5,27);A.userData.isLandscapeStage=!0}const y=(b,A,R,L)=>{const I=new Mn;I.moveTo(-1.15,-.62),L?(I.lineTo(.22,-.62),I.lineTo(.62,-1.08),I.lineTo(.74,-.62)):(I.lineTo(-.72,-.62),I.lineTo(-.62,-1.08),I.lineTo(-.22,-.62)),I.lineTo(1.02,-.62),I.quadraticCurveTo(1.22,-.62,1.22,-.42),I.lineTo(1.22,.48),I.quadraticCurveTo(1.22,.68,1.02,.68),I.lineTo(-1.02,.68),I.quadraticCurveTo(-1.22,.68,-1.22,.48),I.lineTo(-1.22,-.42),I.quadraticCurveTo(-1.22,-.62,-1.15,-.62);const U=d(new Cn(I,{depth:.34,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.055,bevelThickness:.055,curveSegments:8}),R,b,A,26.7);U.userData.isLandscapeStage=!0};y(-2.1,5.6,a,!0),y(2.1,4.9,s,!1);const v=new ge({color:15857919,emissive:12183551,emissiveIntensity:.24,roughness:.34});for(const[b,A]of[[-2.1,5.6],[2.1,4.9]])for(const R of[-.38,0,.38])d(new ye(.085,8,6),v,b+R,A,26.62);const E=new G(new Bn(new Nn([new Y(-.9,5.25,26.7),new Y(0,4.35,26.7),new Y(.9,4.55,26.7)]),20,.08,6,!1),a);E.userData.isLandscapeRoute=!0,t.add(E)}return!0}return!1}function Zv(t,n,e,o,i,s,a,r,c,l){const f=gd[n];if(f){f({root:t,glow:s,edge:a,dark:i,ground:o,detail:l,accent:new te(16777215),beacon:r,ring:c});return}const d=(_,p,g,x,M,S,T=o,w=0)=>{const y=e(new Ye(x,M,S),T,_,p,g,w);return y.userData.isLandscapeStage=!0,y},u=(_,p,g,x,M,S=o,T=10)=>{const w=e(new we(x*.86,x,M,T),S,_,p,g);return w.userData.isLandscapeStage=!0,w},h=(_,p=a,g=.12)=>{const x=new Nn(_.map(([S,T,w])=>new Y(S,T,w))),M=new G(new Bn(x,28,g,8,!1),p);M.userData.isLandscapeRoute=!0,M.castShadow=!0,M.receiveShadow=!0,t.add(M)},m=(_,p,g=o,x=27,M=0)=>{d(M-_/2,p/2,x,.52,p,.62,g),d(M+_/2,p/2,x,.52,p,.62,g),d(M,p,x,_+.52,.5,.62,g)};switch(n){case"message":{const _=new ge({color:10136465,emissive:2438958,emissiveIntensity:.24,roughness:.9,metalness:.02}),p=new ge({color:3427145,roughness:.78}),g=new ge({color:10864836,emissive:1059883,emissiveIntensity:.12,roughness:.2,metalness:.08,transparent:!0,opacity:.36,depthWrite:!1}),x=new ge({color:7756610,roughness:.88}),M=new Mn;M.moveTo(-7.9,-3.275),M.lineTo(7.9,-3.275),M.lineTo(7.9,3.275),M.lineTo(-7.9,3.275),M.closePath();for(const[V,X,J,W]of[[-4.55,.2,3.18,2.96],[4.55,.2,3.18,2.96],[0,-1.54,2.6,3.35]]){const k=new hl;k.moveTo(V-J/2,X-W/2),k.lineTo(V-J/2,X+W/2),k.lineTo(V+J/2,X+W/2),k.lineTo(V+J/2,X-W/2),k.closePath(),M.holes.push(k)}const S=new G(new Cn(M,{depth:.42,bevelEnabled:!1}),_);S.position.set(0,4.42,30.73),S.userData.isLandscapeStage=!0,t.add(S),d(0,4.42,33.02,15.38,6.55,.42,_);for(const V of[-1,1]){const X=V*7.69;d(X,6.93,31.98,.42,1.53,2.5,_),d(X,2.11,31.98,.42,1.93,2.5,_),d(X,4.62,30.92,.42,3.08,.38,_),d(X,4.62,33.02,.42,3.08,.42,_),d(X,4.62,31.97,.035,2.82,1.68,g);for(const J of[31.1,32.84])d(X,4.62,J,.42,3.08,.1,p);for(const J of[3.13,6.11])d(X,J,31.97,.42,.12,1.84,p)}d(0,7.82,31.95,16.35,.34,2.85,p),d(0,1.28,31.9,15.5,.26,2.6,p);for(const V of[-4.55,4.55])d(V,4.62,30.72,3.5,3.28,.16,p),d(V,4.62,30.6,3.18,2.96,.08,g),d(V,4.62,30.53,.12,2.96,.06,a),d(V,4.62,30.53,3.18,.12,.06,a),d(V,4.62,30.53,.1,2.96,.06,p),d(V,4.62,30.53,3.18,.1,.06,p);const T=new ge({color:5719608,roughness:.88}),w=new Ln(new Ye(2.8,.075,.42),T,6),y=new Ln(new Ye(.3,.72,.26),new ge({color:16777215,roughness:.84}),30),v=new cs,E=[3.35,4.28,5.21];let b=0,A=0;const R=[12089686,13676146,7310200,7375258,10187640,14209208];for(const V of[-4.55,4.55])for(const[X,J]of E.entries()){v.position.set(V,J,31.62),v.scale.set(1,1,1),v.rotation.set(0,0,0),v.updateMatrix(),w.setMatrixAt(b++,v.matrix);for(let W=0;W<5;W++)v.position.set(V-1.08+W*.54,J+.39,31.58),v.scale.set(.78+(X+W)%2*.12,.72+(X*2+W)%3*.14,.84),v.rotation.set(0,(W%3-1)*.035,0),v.updateMatrix(),y.setMatrixAt(A,v.matrix),y.setColorAt(A,new te(R[(X+W*2)%R.length])),A++}w.instanceMatrix.needsUpdate=!0,y.instanceMatrix.needsUpdate=!0,y.instanceColor&&(y.instanceColor.needsUpdate=!0),w.castShadow=!0,y.castShadow=!0,t.add(w,y),d(0,4.82,29.78,4.9,.2,1.4,p);for(const V of[-2.18,2.18])d(V,3.05,29.78,.16,3.4,.18,p);for(const V of[-7.1,-2.68,2.68,7.1])d(V,4.62,30.48,.14,3.02,.22,p);d(0,2.88,30.62,2.6,3.35,.2,p),d(-.62,2.72,30.47,1.08,2.98,.08,g),d(.62,2.72,30.47,1.08,2.98,.08,g),d(0,2.72,30.4,.1,2.98,.06,a),d(.38,2.72,30.35,.08,.12,.08,x),d(0,1.18,29.95,3.5,.22,1.2,x);const L=document.createElement("canvas");L.width=1024,L.height=192;const I=L.getContext("2d");if(I){I.fillStyle="#263e3b",I.fillRect(0,0,L.width,L.height),I.strokeStyle="#d6c19a",I.lineWidth=8,I.strokeRect(12,12,L.width-24,L.height-24),I.fillStyle="#f4edda",I.textAlign="center",I.textBaseline="middle",I.font="bold 66px Arial, sans-serif",I.fillText("CAMPUS LIBRARY",512,98);const V=new Wt(L);V.colorSpace=yt;const X=new G(new Je(4.4,.82),new wt({map:V,side:$e,toneMapped:!1}));X.position.set(0,6.9,30.55),X.rotation.y=Math.PI,t.add(X)}for(const V of[-2.05,2.05]){d(V,1.72,25.9,3.05,.24,.68,x),d(V,2.18,26.18,3.05,.78,.16,x);for(const X of[V-1.2,V+1.2])d(X,1.38,25.9,.12,.62,.14,p),d(X,1.84,26.18,.12,.72,.14,p);for(const X of[V-1.43,V+1.43])d(X,2,25.9,.14,.36,.68,p),d(X,2.2,25.9,.22,.1,.76,x)}const U=[-2.55,-1.55,1.55,2.55],N=[{shirt:7374743,hair:3156260,skin:14200202,trousers:3425363,style:"short"},{shirt:10252382,hair:3484968,skin:10250316,trousers:5851456,style:"long"},{shirt:5861225,hair:4338731,skin:13078128,trousers:4545364,style:"bun"},{shirt:9077097,hair:2566704,skin:14728094,trousers:5131350,style:"short"}];for(const[V,X]of U.entries()){const J=N[V],W=Rs({shirt:J.shirt,hair:J.hair,hairStyle:J.style,skin:J.skin,trousers:J.trousers,seated:!0,pose:"phone",lean:.08,scale:1.6});W.position.set(X,1.84,25.98),W.rotation.y=Math.PI,t.add(W)}for(const[V,X,J]of[[-2.9,5.15,1.25],[0,5.75,1.45],[2.9,5.15,1.25]]){d(V,X,25.2,J,.68,.12,i,V*.035),d(V,X+.1,25.11,J*.62,.08,.06,a,V*.035);const W=e(new ye(.09,8,6),s,V+J*.34,X+.29,25.08);W.userData.isLandscapeBeacon=!0}h([[-2.15,5.12,25.14],[0,5.7,25.14],[2.15,5.12,25.14]],s,.06),h([[0,1.24,34],[0,1.28,31],[0,1.28,28],[0,1.34,26.8]],a,.1);for(const V of[-6.35,6.35]){u(V,1.43,27.65,.48,.46,x,8),u(V,2.75,27.65,.1,2.55,p,8);for(const[X,J,W]of[[-.34,3.55,.72],[.28,3.82,.8],[0,4.38,.72]]){const k=e(new So(W,0),o,V+X,J,27.65);k.userData.isLandscapeStage=!0}}const O=new Kn(16766875,.72,16,2);O.position.set(0,5.2,25.2),t.add(O);break}case"dialogue":{const _=new ge({color:13748142,roughness:.9}),p=new ge({color:7691075,roughness:.84}),g=new ge({color:8942943,roughness:.92}),x=new ge({color:5401699,roughness:.82}),M=new ge({color:10995645,emissive:1914160,emissiveIntensity:.08,roughness:.24,metalness:.04,transparent:!0,opacity:.28,depthWrite:!1}),S=new ge({color:7507305,roughness:.94}),T=(k,ee,ae,ue="stage")=>{const z=new Ln(k,ee,ae.length),j=new Y,Z=new Y,de=new dn,be=new co,Te=new ot;return ae.forEach((Ze,Xe)=>{j.set(...Ze.position),be.set(...Ze.rotation??[0,0,0]),de.setFromEuler(be),Z.set(...Ze.scale??[1,1,1]),Te.compose(j,de,Z),z.setMatrixAt(Xe,Te)}),z.instanceMatrix.needsUpdate=!0,z.computeBoundingSphere(),z.userData[`isLandscape${ue[0].toUpperCase()}${ue.slice(1)}`]=!0,t.add(z),z};d(0,1.19,28.15,12.1,.08,9.2,g),T(new Ye(11.85,.018,.035),p,[24.15,24.95,25.75,26.55,27.35,28.15,28.95,29.75,30.55,31.35,32.15].map(k=>({position:[0,1.235,k]}))),T(new Ye(.26,4,9),_,[{position:[-6.05,3.2,28.25]},{position:[6.05,3.2,28.25]}]),T(new Ye(1.9,5.4,.28),_,[{position:[-5.55,3.9,23.85]},{position:[5.55,3.9,23.85]}]),d(0,1.78,23.85,9.2,1.16,.28,_),d(0,6.02,23.85,9.2,1.28,.28,_),T(new Ye(.12,3.02,.12),p,[-4.58,-1.53,1.53,4.58].map(k=>({position:[k,3.93,24.02]}))),T(new Ye(9.2,.12,.12),p,[2.43,5.43].map(k=>({position:[0,k,24.02]})));const w=T(new Ye(2.92,2.88,.045),M,[-3.05,0,3.05].map(k=>({position:[k,3.93,24.015]})));w.userData.noLandscapeShadow=!0,T(new Ye(12.15,.18,.24),p,[24.1,26.3,28.5,30.7,32.85].map(k=>({position:[0,6.34,k]}))),T(new Ye(.3,4,.3),x,[{position:[-6.03,3.2,32.75]},{position:[6.03,3.2,32.75]}]),d(0,6.32,32.75,12.25,.2,.32,p),T(new we(.103,.12,1.8,7),p,[-3.35,0,3.35].map(k=>({position:[k,2.12,21.55]}))),T(new So(1.08,1),S,[{position:[-3.35,3.55,21.55],scale:[1.18,.9,.72]},{position:[0,3.95,21.55],scale:[1.18,.9,.72]},{position:[3.35,3.6,21.55],scale:[1.18,.9,.72]}]),d(0,1.56,20.35,5.2,.28,.52,x),T(new Ye(.16,.62,.4),p,[-2.1,2.1].map(k=>({position:[k,1.33,20.35]})));const y=[{x:-2.55,y:1.22,z:28,yaw:Math.PI/2,shirt:7902858,hair:4733489},{x:2.55,y:1.22,z:28,yaw:-Math.PI/2,shirt:12681576,hair:3423043},{x:0,y:1.22,z:25.45,yaw:0,shirt:7441058,hair:6113078}],v=(k,ee,ae)=>{const ue=new Ln(k,ee,ae.length),z=new Y(0,1,0),j=new Y,Z=new Y,de=new Y,be=new dn,Te=new dn,Ze=new dn,Xe=new co,ct=new ot;return ae.forEach((it,je)=>{const Tt=y[it.person];be.setFromAxisAngle(z,Tt.yaw),j.set(...it.offset).applyQuaternion(be),Z.set(Tt.x,Tt.y,Tt.z).add(j),Xe.set(...it.rotation??[0,0,0]),Te.setFromEuler(Xe),Ze.copy(be).multiply(Te),de.set(...it.scale??[1,1,1]),ct.compose(Z,Ze,de),ue.setMatrixAt(je,ct),it.color!==void 0&&ue.setColorAt(je,new te(it.color))}),ue.instanceMatrix.needsUpdate=!0,ue.instanceColor&&(ue.instanceColor.needsUpdate=!0),ue.computeBoundingSphere(),ue.userData.isLandscapeStage=!0,t.add(ue),ue},E=new Ye(1.1,.14,.9),b=new Ye(1.08,.78,.13),A=new we(.055,.07,.56,6),R=[],L=[],I=[];y.forEach((k,ee)=>{R.push({person:ee,offset:[0,.48,-.35]}),L.push({person:ee,offset:[0,.91,-.79],rotation:[-.06,0,0]});for(const ae of[-.43,.43])for(const ue of[-.68,-.05])I.push({person:ee,offset:[ae,.17,ue]})}),v(E,p,R),v(b,p,L),v(A,p,I),u(0,1.63,27.95,.22,.82,p,10),u(0,2.08,27.95,1.28,.16,p,16),T(new Ye(.34,.035,.5),new ge({color:16777215,roughness:.92}),[{position:[-.42,2.18,27.95],scale:[1,1,1],rotation:[0,0,0]},{position:[0,2.18,27.95],scale:[1,1,1],rotation:[0,0,0]},{position:[.42,2.18,27.95],scale:[1,1,1],rotation:[0,0,0]}]),y.forEach((k,ee)=>{const ae=Rs({shirt:k.shirt,hair:k.hair,hairStyle:ee===0?"long":"short",skin:[14262396,12156250,14857875][ee],seated:!0,pose:ee===2?"talk":"listen",lean:ee===2?0:.05,scale:1.45});ae.position.set(k.x,k.y+.55,k.z),ae.rotation.y=k.yaw,t.add(ae)}),u(4.65,1.48,32.05,.54,.46,p,10);const U=e(new me(.54,.075,7,24),x,4.65,1.73,32.05);U.rotation.x=Math.PI/2,U.userData.isLandscapeStage=!0;const N=new Ye(.22,.045,.38),O=[{position:[4.38,1.75,31.98],rotation:-.3},{position:[4.66,1.76,32.02],rotation:.18},{position:[4.91,1.75,32.14],rotation:-.12}];T(N,i,O.map(k=>({position:k.position,rotation:[0,k.rotation,0],scale:[1,.8,1]}))),T(new Ye(.16,.012,.28),x,O.map(k=>({position:[k.position[0],k.position[1]+.03,k.position[2]],rotation:[0,k.rotation,0]}))),T(new Ye(.12,.48,.5),x,[2.85,3.7,4.55].map(k=>({position:[-5.88,k,29.9]}))),T(new Ye(.12,.48,.5),a,[{position:[-5.88,5.4,29.9]}]),T(new ye(.11,8,6),s,[2.85,3.7,4.55,5.4].map(k=>({position:[-5.78,k,29.55]})),"beacon");const V=new we(.2408,.28,.055,10);T(V,a,[31.5,29.15].map(k=>({position:[0,1.285,k]})),"route"),T(V,s,[{position:[0,1.285,30.05]}],"route");for(const[k,ee]of[[.72,4.45],[1.08,4.78]]){const ae=e(new me(k,.045,6,24,Math.PI),s,0,ee,27.35);ae.userData.isLandscapeRoute=!0}d(0,5.92,32.75,9.9,1.48,.24,p);const X=document.createElement("canvas");X.width=1024,X.height=192;const J=X.getContext("2d");if(J){J.fillStyle="#36574d",J.fillRect(0,0,X.width,X.height),J.strokeStyle="#d6c49d",J.lineWidth=8,J.strokeRect(12,12,X.width-24,X.height-24),J.fillStyle="#f6eedb",J.textAlign="center",J.textBaseline="middle",J.font="bold 48px Arial, sans-serif",J.fillText("FOUR-WEEK LISTENING EXPERIMENT",512,65),J.font="bold 29px Arial, sans-serif",J.fillText("20 MIN  ·  ASK ONE FOLLOW-UP  ·  SUMMARIZE BEFORE REPLYING",512,130);const k=new Wt(X);k.colorSpace=yt;const ee=new G(new Je(9.45,1.22),new wt({map:k,side:$e,toneMapped:!1}));ee.position.set(0,5.92,33.02),ee.userData.isLandscapeStage=!0,t.add(ee)}const W=new Kn(16766882,.72,17,2);W.position.set(0,5.35,27.2),t.add(W);break}case"listening-bench":{const _=new ge({color:9277573,roughness:.92}),p=new ge({color:7305073,roughness:.86}),g=new ge({color:7756613,roughness:.88}),x=new ge({color:16777215,roughness:.94}),M=new ge({color:4999481,roughness:1}),S=new ge({color:15524815,roughness:.96}),T=u(0,1.18,27,5.25,.34,_,16);T.userData.isLandscapeRoute=!0;for(const k of[3.55,4.7]){const ee=e(new me(k,.026,6,56),p,0,1.37,27);ee.rotation.x=Math.PI/2,ee.userData.isLandscapeRoute=!0,ee.userData.noLandscapeShadow=!0}const w=new Ln(new Ye(.9,.18,1.9),g,2),y=new Ln(new Ye(.16,.82,1.9),g,2),v=new Ln(new Ye(.12,.48,.12),i,8),E=new ot,b=[-1.65,1.65];b.forEach((k,ee)=>{E.makeTranslation(k,1.82,27),w.setMatrixAt(ee,E),E.makeTranslation(Math.sign(k)*2.14,2.31,27),y.setMatrixAt(ee,E)});let A=0;for(const k of b)for(const ee of[-.3,.3])for(const ae of[-.68,.68])E.makeTranslation(k+ee,1.59,27+ae),v.setMatrixAt(A++,E);for(const[k,ee]of[[w,"echo-bench-seats"],[y,"echo-bench-backs"],[v,"echo-bench-legs"]])k.instanceMatrix.needsUpdate=!0,k.computeBoundingSphere(),k.name=ee,k.userData.isLandscapeStage=!0,t.add(k);for(const[k,ee,ae,ue,z]of[[-1.78,Math.PI/2,7902597,4471348,!0],[1.78,-Math.PI/2,8229284,2827296,!1]]){const j=Rs({shirt:ae,hair:ue,hairStyle:z?"short":"long",skin:z?14262396:14857875,seated:!0,pose:z?"talk":"listen",lean:z?0:.07,scale:1.4});j.name=z?"echo-speaker":"echo-listener",j.position.set(k,1.91,27),j.rotation.y=ee,t.add(j)}u(0,1.55,27,.15,.36,g,10),u(0,1.78,27,.62,.16,g,12),d(-.17,1.875,27,.36,.025,.46,S,.08),d(.17,1.875,27,.36,.025,.46,S,-.08),d(0,1.895,27,.025,.018,.46,p),d(-.42,1.9,27.25,.035,.025,.42,i,-.18);for(const k of[-.43,.43]){u(k,1.95,27.32,.075,.14,S,8);const ee=e(new me(.045,.012,6,12),S,k+Math.sign(k)*.07,1.95,27.32);ee.userData.noLandscapeShadow=!0}for(const k of[-4.05,4.05])d(k,1.57,27,1.3,.44,2.7,g),d(k,1.81,27,1.15,.06,2.52,M);const R=new Ln(new we(.09,.14,1.2,7),g,2),L=new ot;[-4.05,4.05].forEach((k,ee)=>{L.makeTranslation(k,2.42,27),R.setMatrixAt(ee,L)}),R.instanceMatrix.needsUpdate=!0,R.computeBoundingSphere(),R.name="echo-garden-tree-trunks",R.userData.isLandscapeStage=!0,t.add(R);const I=new Ln(new $n(.48,1),x,6),U=new ot,N=new Y,O=new Y,V=[6322786,9281657,7375466,7375466,9281657,6322786];for(const[k,[ee,ae]]of[[-4.05,26.42],[-4.05,27.12],[-4.05,27.78],[4.05,26.42],[4.05,27.12],[4.05,27.78]].entries())N.set(ee,3.05+k%2*.2,ae),O.set(1.1,.94+k%2*.14,.96),U.compose(N,new dn,O),I.setMatrixAt(k,U),I.setColorAt(k,new te(V[k]));I.instanceMatrix.needsUpdate=!0,I.instanceColor&&(I.instanceColor.needsUpdate=!0),I.computeBoundingSphere(),I.name="echo-garden-canopies",I.userData.isLandscapeStage=!0,t.add(I),m(9.2,5.65,g,31.15),t.add(U3(9.2,5.65,31.15)),t.add(N3(8.55,1.9,0,4.55,31.15)),d(0,4.55,31.15,8.55,1.9,.24,g);const X=document.createElement("canvas");X.width=1200,X.height=280;const J=X.getContext("2d");if(J){J.fillStyle="#3a5045",J.fillRect(0,0,X.width,X.height),J.strokeStyle="#d8c9a8",J.lineWidth=8,J.strokeRect(14,14,X.width-28,X.height-28),J.textAlign="center",J.textBaseline="middle",J.fillStyle="#f4eddd",J.font="bold 48px Arial, sans-serif",J.fillText("THE ECHO BENCH",600,52),J.font="bold 40px Arial, sans-serif",J.fillText("DID SOMEONE FEEL HEARD TODAY?",600,132),J.fillStyle="#e5cf9d",J.font="bold 30px Arial, sans-serif",J.fillText("LISTEN · ASK · REFLECT   |   I heard you say...",600,218);const k=new Wt(X);k.colorSpace=yt;const ee=new G(new Je(8.2,1.72),new wt({map:k,side:$e,toneMapped:!1}));ee.position.set(0,4.55,31.28),ee.name="echo-reflection-sign",ee.userData.isLandscapeStage=!0,ee.userData.noLandscapeShadow=!0,t.add(ee)}d(0,1.62,29.25,1.25,.14,.62,g);for(const k of[-.48,.48])for(const ee of[29.05,29.45])d(k,1.48,ee,.08,.28,.08,g);d(.34,1.715,29.25,.18,.025,.32,i,.12);const W=new Kn(16767405,.42,11,2);W.position.set(0,4.6,27.4),t.add(W);break}default:r()}}function Qv(t,n,e,o){if(!n||!e||n==="hub"||n==="section-a"||n==="section-b"||n==="stories-of-china"||n==="learning-lab"||n==="unit-project")return;const i=document.createElement("canvas");i.width=1024,i.height=256;const s=i.getContext("2d");if(!s)return;s.fillStyle="rgba(7, 14, 27, 0.88)",s.fillRect(20,24,984,208),s.strokeStyle=`#${o.toString(16).padStart(6,"0")}`,s.lineWidth=8,s.strokeRect(24,28,976,200),s.textAlign="center",s.textBaseline="middle",s.font="bold 52px 'Microsoft YaHei', sans-serif",s.fillStyle="#f8fbff",s.fillText(e.slice(0,26),512,126,920);const a=new Wt(i);a.colorSpace=yt;const r=new ni(new ti({map:a,transparent:!0,depthWrite:!1,toneMapped:!1}));r.position.set(0,11,14),r.scale.set(19,4.75,1),r.renderOrder=8,t.add(r)}function Jv(t,n,e,o,i,s){if(!n||n==="hub")return;const a=new G(new we(7.8,8.8,.4,8),o);switch(a.position.set(0,.86,27),t.add(a),n){case"section-a":{const r=new G(new Ye(8.4,.42,5.6),e);r.position.set(-2.2,3.5,27),r.rotation.y=-.18;const c=new G(new Ye(5.8,.16,4.4),i);c.position.set(2.2,3.8,27),c.rotation.y=.18;const l=new G(new Ye(.32,2.1,5.8),s);l.position.set(0,2.25,27),t.add(r,c,l),qi(c);break}case"section-b":{for(const l of[-3.8,3.8]){const f=new G(new we(.72,1.05,8.2,8),e);f.position.set(l,4.9,27),t.add(f)}const r=new G(new me(4.1,.2,8,40,Math.PI),s);r.position.set(0,8.2,27),r.rotation.z=Math.PI,t.add(r);const c=new G(new ye(1.25,16,12),i);c.position.set(0,4.9,27),t.add(c),qi(c);break}case"stories-of-china":{for(const[l,f,d]of[[5.8,2,8],[4.4,4.2,6],[3,6.2,5]]){const u=new G(new we(l,l+.55,.7,d),e);u.position.set(0,f,27),t.add(u)}const r=new G(new lo(1.7,1),i);r.position.set(0,9,27),t.add(r);const c=new G(new me(2.5,.13,8,32),s);c.rotation.x=Math.PI/2,c.position.set(0,9,27),t.add(c),qi(r),Da(c);break}case"learning-lab":{const r=new G(new we(2.4,2.8,6.5,12),i);r.position.set(0,4.3,27),t.add(r);for(const c of[.35,-.35]){const l=new G(new me(4.9,.16,8,48),s);l.position.set(0,4.3,27),l.rotation.set(c,.4,c*1.4),t.add(l),Da(l)}qi(r);break}case"unit-project":{const r=new G(new lo(2.8,1),i);r.position.set(0,7.4,27),t.add(r);for(const[l,f]of[[-5.3,24],[5.3,24],[-5.3,30],[5.3,30]]){const d=new G(new we(.5,.78,6.8,8),s);d.position.set(l,3.9,f),t.add(d)}const c=new G(new me(4.5,.18,8,48),s);c.rotation.x=Math.PI/2,c.position.set(0,1.2,27),t.add(c),qi(r),Da(c);break}}}function qi(t){t.userData.isLandscapeBeacon=!0}function Da(t){t.userData.isLandscapeRing=!0}function ex(t,n,e,o,i){if(i){const s=new ge({color:3360862,emissive:1058873,emissiveIntensity:.14,roughness:.78,metalness:.18}),a=new ge({color:5735318,emissive:2646388,emissiveIntensity:.18,roughness:.62,metalness:.12});for(const d of[-1,1]){const u=new G(new we(.3,.46,2.8,7),s);u.position.set(d*13.2,1.4,34),t.add(u);for(const h of[.7,1.35,2]){const m=new G(new Ye(.56,.07,.09),a);m.position.set(d*13.2,h,33.56),m.userData.isLandscapeRoute=!0,t.add(m)}}const r=new ge({color:3891573,emissive:2649216,emissiveIntensity:.28,roughness:.52,metalness:.2}),c=new Nn([new Y(-9,5.5,42),new Y(-6,8,42),new Y(0,9.2,42),new Y(6,8,42),new Y(9,5.5,42)]),l=new G(new Bn(c,40,.07,6,!1),r);l.userData.isLandscapeRoute=!0,t.add(l);const f=new ge({color:10410461,emissive:5610924,emissiveIntensity:.34,roughness:.4,metalness:.18});for(const d of[-9,9]){const u=new G(new ye(.46,12,8),f);u.position.set(d,5.5,42),u.userData.isLandscapeBeacon=!0,t.add(u)}return}t.add(Fv(e,o))}function tx(t,n,e,o,i){let s;const a=document.createElement("canvas");a.width=1024,a.height=192;const r=a.getContext("2d");r&&(r.fillStyle="#182b3b",r.fillRect(0,0,a.width,a.height),r.strokeStyle="#d7b67a",r.lineWidth=8,r.strokeRect(12,12,a.width-24,a.height-24),r.fillStyle="#f4e6c6",r.textAlign="center",r.textBaseline="middle",r.font="bold 66px Arial, sans-serif",r.fillText("THE HARBOR OF LIVES",512,72),r.font="bold 30px Arial, sans-serif",r.fillText("CHOICE  ·  SERVICE  ·  LEGACY",512,145),s=new Wt(a),s.colorSpace=yt),t.add(Vv(o,i,s))}function nx(t,n){const e=new wt({color:10457207,side:$e}),o=new wt({color:11704947,side:$e}),i=new ge({color:11900524,roughness:.96,metalness:0}),s=new ge({color:6705466,roughness:1,metalness:0}),a=new ge({color:7897434,roughness:.96,metalness:0}),r=(l,f,d)=>{const u=new Mn;u.moveTo(-82,0),u.lineTo(-82,8*d),u.quadraticCurveTo(-64,17*d,-48,10*d),u.quadraticCurveTo(-28,3*d,-10,12*d),u.quadraticCurveTo(10,21*d,29,11*d),u.quadraticCurveTo(49,3*d,64,12*d),u.quadraticCurveTo(74,16*d,82,8*d),u.lineTo(82,0),u.closePath();const h=new G(new ml(u,20),f);h.position.set(0,.35,l),h.userData.noLandscapeShadow=!0,t.add(h)};r(76,e,1),r(65,o,.64);for(const[l,f,d,u,h]of[[-1.6,39,5.6,13,.08],[-4.3,51,7.5,15,.2],[-7.1,64,9.4,16,.28]]){const m=new G(new Ye(d,.08,u),i);m.position.set(l,.49,f),m.rotation.y=h,m.userData.isLandscapeRoute=!0,t.add(m)}for(const[l,f,d]of[[-19,46,1],[19,54,.84],[-28,61,.72]]){const u=new G(new we(.2,.32,3.6*d,7),s);u.position.set(l,2.3*d,f),t.add(u);const h=new G(new ye(1,8,5),a);h.position.set(l,4.1*d,f),h.scale.set(2.6*d,.62*d,1.7*d),h.userData.isLandscapeStage=!0,t.add(h)}const c=new G(new lo(.42,0),n);c.position.set(-7.1,1.1,64),c.userData.isLandscapeBeacon=!0,t.add(c)}function ox(t,n,e,o,i=!1){i||t.add(Wv(e,o))}function ix(t,n,e,o,i,s=!1){if(s){const a=new G(new Ye(18,.36,8),n);a.position.set(0,.85,39),t.add(a);for(const f of[-6.2,6.2]){const d=new G(new Ye(.48,5.8,.5),e);d.position.set(f,3.9,39),t.add(d)}const r=new G(new Ye(14,.48,6.4),i);r.position.set(0,6.9,39),t.add(r);const c=new G(new Ye(5.8,.3,1.35),e);c.position.set(0,1.9,35.5),c.userData.isLandscapeStage=!0,t.add(c);for(const f of[-2.2,2.2]){const d=new G(new Ye(.22,1.6,.22),i);d.position.set(f,1.05,35.5),t.add(d)}const l=new G(new ye(.48,10,8),o);l.position.set(0,5.7,38.6),l.userData.isLandscapeBeacon=!0,t.add(l);return}t.add(Xv(o,i))}function sx(t,n,e,o,i=!1){if(i){const s=new Ke;s.position.set(9,0,40);const a=Gc(e,o,!1);a.position.set(0,0,-40),s.scale.setScalar(.62),s.add(a),t.add(s);return}t.add(Gc(e,o,!0))}function ax(t,n,e,o,i,s=!1,a){const r=s&&/^section_c-world-[1-4]$/.test(a??"");t.add(qv(o,i,{stalls:!r,ledger:!s}))}function rx(t,n,e,o,i){const s=new G(new Ye(20,1,14),n);s.position.set(0,1.2,38),t.add(s);const a=new G(new we(5.5,7,16,8),e);a.position.set(0,9.5,38),t.add(a);const r=new G(new gt(8,5,8),o);r.position.set(0,20,38),r.userData.isLandscapeBeacon=!0,t.add(r);const c=new G(new me(7,.18,8,40,Math.PI),i);c.rotation.z=Math.PI,c.position.set(0,11,30),c.userData.isLandscapeRing=!0,t.add(c)}const cx={high:{pixelRatio:2,grassRadius:40,grassCell:1.1,reflectors:3,reflectRes:512,reflectDist:300,shadowMap:2048,bloom:!0,bloomScale:1},med:{pixelRatio:1.5,grassRadius:34,grassCell:1.5,reflectors:2,reflectRes:384,reflectDist:220,shadowMap:1536,bloom:!0,bloomScale:.66},low:{pixelRatio:1,grassRadius:26,grassCell:1.9,reflectors:0,reflectRes:256,reflectDist:160,shadowMap:1024,bloom:!1,bloomScale:.5}};function lx(){var s;if(typeof window>"u")return"med";const t=((s=window.matchMedia)==null?void 0:s.call(window,"(pointer: coarse)").matches)??!1,n=Math.min(window.innerWidth,window.innerHeight)<540,e=navigator.hardwareConcurrency??4,o=navigator.deviceMemory??4,i=t||n;return i&&(e<=4||o<=3)?"low":i||e<=4||o<=4?"med":"high"}const dx=5,To=70,zc=12,Ia={value:0},Hc=`float cHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
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
`,fx=new te(16757611),ux=new Y(0,1,0),hx=new Y(1,0,0);function Vc(t,n,e,o=56){const i=[];for(let s=0;s<o;s++){const a=s/o*Math.PI*2,r=1+Math.sin(a*3+e)*.12+Math.sin(a*5+e*1.7)*.07+Math.sin(a*9+e*2.3)*.035;i.push(new rt(Math.cos(a)*t*r,Math.sin(a)*n*r))}return i}class gx{constructor(n,e){ne(this,"container");ne(this,"renderer");ne(this,"resizeObserver");ne(this,"scene");ne(this,"camera");ne(this,"raycaster",new cu);ne(this,"pointer",new rt);ne(this,"nodeGroups",new Map);ne(this,"pickables",[]);ne(this,"explorer");ne(this,"pathGroup");ne(this,"decorGroup");ne(this,"vegetation");ne(this,"waterGroup");ne(this,"terrain");ne(this,"terrainMaps");ne(this,"groundDetailMap");ne(this,"envRT");ne(this,"mountains");ne(this,"skyDome");ne(this,"grassMesh");ne(this,"flowerMesh");ne(this,"grassUniforms");ne(this,"grassCellSize",1.1);ne(this,"grassRadius",54);ne(this,"grassCellMap",new Map);ne(this,"grassNeeded",new Set);ne(this,"grassFreeSlots",[]);ne(this,"grassLastX",Number.POSITIVE_INFINITY);ne(this,"grassLastZ",Number.POSITIVE_INFINITY);ne(this,"grassDummy",new cs);ne(this,"grassColor",new te);ne(this,"clouds");ne(this,"unitLandscape");ne(this,"dustGroup");ne(this,"motes");ne(this,"moteBase");ne(this,"dustPool",[]);ne(this,"lastStep",0);ne(this,"sunDisc");ne(this,"composer");ne(this,"bloomPass");ne(this,"walkPhase",0);ne(this,"avatarYaw",0);ne(this,"avatarLean",0);ne(this,"expression","neutral");ne(this,"blinkTimer",2);ne(this,"blink",0);ne(this,"usingGlb",!1);ne(this,"mixer");ne(this,"glbIdle");ne(this,"glbWalk");ne(this,"glbClips");ne(this,"glbEmoting",!1);ne(this,"contactShadow");ne(this,"_n",new Y);ne(this,"_fwd",new Y);ne(this,"_right",new Y);ne(this,"_basis",new ot);ne(this,"_q",new dn);ne(this,"_leanQ",new dn);ne(this,"sun");ne(this,"hemi");ne(this,"ambientLight");ne(this,"animId",0);ne(this,"paused",!0);ne(this,"pausedBeforeVisibility",!0);ne(this,"spectatorMode",!1);ne(this,"clock",new Om);ne(this,"_fpsTs",0);ne(this,"_fpsFrames",0);ne(this,"_fpsAdapted",!1);ne(this,"nodes",[]);ne(this,"currentId","");ne(this,"onNodeClick");ne(this,"onProximity");ne(this,"onExploreUpdate");ne(this,"onPickupNear");ne(this,"onPickupCollect");ne(this,"waterMeshes",[]);ne(this,"reflectors",[]);ne(this,"quality",lx());ne(this,"qcfg",cx[this.quality]);ne(this,"dynamicLightLimit",this.quality==="low"?5:this.quality==="med"?8:12);ne(this,"dynamicLightBudgetFrames",30);ne(this,"_lightPosition",new Y);ne(this,"sunDirV",new Y);ne(this,"spectatorFocus",new Y);ne(this,"hasSpectatorFocus",!1);ne(this,"rebuildToken",0);ne(this,"player",new S3);ne(this,"explorerCam",new g3);ne(this,"nearNode",null);ne(this,"currentBiome",Za);ne(this,"activeUnitId");ne(this,"activeWorldId");ne(this,"activeWorldTitle");ne(this,"pickupGroup");ne(this,"pickupMeshes",new Map);ne(this,"pickupData",[]);ne(this,"nearPickup",null);ne(this,"lastExploreUpdateAt",0);ne(this,"waterFrame",0);ne(this,"onVisibilityChange",()=>{if(document.hidden){this.pausedBeforeVisibility=this.paused,this.pause();return}this.pausedBeforeVisibility||this.resume()});ne(this,"onKeyDown",n=>{this.paused||this.spectatorMode||(n.key.toLowerCase()==="e"||n.key==="Enter")&&this.tryInteract()});ne(this,"onPointerDown",n=>{var s;if(this.paused||this.spectatorMode||n.button!==0)return;const e=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(n.clientX-e.left)/e.width*2-1,this.pointer.y=-((n.clientY-e.top)/e.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);const o=this.raycaster.intersectObjects(this.pickables,!1)[0],i=o==null?void 0:o.object.userData.nodeId;if(i&&((s=this.nearNode)==null?void 0:s.id)===i&&this.nearNode.unlocked){this.onNodeClick(i);return}if(this.terrain){const a=this.raycaster.intersectObject(this.terrain,!1)[0];if(a&&(this.player.setMoveTarget(a.point.x,a.point.z),i)){const r=this.nodes.find(c=>c.id===i);r!=null&&r.unlocked&&this.player.setMoveTarget(r.x+3,r.z+3)}}});ne(this,"onResize",()=>{var o;const n=this.container.clientWidth,e=this.container.clientHeight;!n||!e||(this.camera.aspect=n/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(n,e),(o=this.composer)==null||o.setSize(n,e))});ne(this,"animate",n=>{var a,r,c;if(this.paused){this.animId=0;return}this.animId=requestAnimationFrame(this.animate),this.clock.update(n);const e=Math.min(this.clock.getDelta(),.05),o=this.clock.getElapsed();if(!this._fpsAdapted){this._fpsFrames++;const l=performance.now();if(this._fpsTs===0&&(this._fpsTs=l),l-this._fpsTs>=3e3){if(this._fpsFrames/((l-this._fpsTs)/1e3)<40){const d=this.renderer.getPixelRatio(),u=Math.max(.75,d-.5);u<d?(this.renderer.setPixelRatio(u),(a=this.composer)==null||a.setPixelRatio(u),this._fpsAdapted=u<=.75):this._fpsAdapted=!0}this._fpsTs=l,this._fpsFrames=0}}this.mixer&&this.mixer.update(e);const i=this.explorerCam.update(this.camera,this.player.position,this.player.yaw,e,!this.spectatorMode,this.spectatorMode&&this.hasSpectatorFocus?this.spectatorFocus:void 0);if(this.player.update(e,i),this.explorer){this.explorer.position.lerp(this.player.position,1-Math.exp(-14*e));let l=this.player.yaw-this.avatarYaw;for(;l>Math.PI;)l-=Math.PI*2;for(;l<-Math.PI;)l+=Math.PI*2;this.avatarYaw+=l*Math.min(1,e*12);const f=this.player.isMoving(),d=this.player.isSprinting();if(f){this.walkPhase+=e*(d?15:9.5);const y=Math.floor(this.walkPhase/Math.PI);if(y!==this.lastStep){this.lastStep=y;const v=y%2===0?1:-1,E=Math.cos(this.avatarYaw)*.18*v,b=-Math.sin(this.avatarYaw)*.18*v;this.emitDust(this.player.position.x+E,this.player.position.y,this.player.position.z+b)}}const u=this.explorer.userData.rig;if(u){if(f){const y=d?.95:.6,v=d?1.35:.95,E=Math.sin(this.walkPhase),b=Math.sin(this.walkPhase+Math.PI);u.leftLeg.hip.rotation.x=E*y,u.rightLeg.hip.rotation.x=b*y,u.leftLeg.knee.rotation.x=.12+Math.max(0,-E)*v,u.rightLeg.knee.rotation.x=.12+Math.max(0,-b)*v,u.leftArm.rotation.x=-E*.8,u.rightArm.rotation.x=-b*.8,u.leftArm.userData.elbow.rotation.x=-.25-Math.max(0,E)*.55,u.rightArm.userData.elbow.rotation.x=-.25-Math.max(0,b)*.55,u.leftLeg.ankle.rotation.x=-(u.leftLeg.hip.rotation.x+u.leftLeg.knee.rotation.x)*.9-Math.max(0,E)*.12,u.rightLeg.ankle.rotation.x=-(u.rightLeg.hip.rotation.x+u.rightLeg.knee.rotation.x)*.9-Math.max(0,b)*.12,u.head.rotation.z=0,u.cape.rotation.x=.16+(.3+Math.abs(Math.sin(this.walkPhase))*.2)*(d?1.4:1),u.cape.rotation.z=Math.sin(this.walkPhase*.5)*.08}else{const y=Math.min(1,e*9);u.leftLeg.hip.rotation.x*=1-y,u.rightLeg.hip.rotation.x*=1-y,u.leftLeg.knee.rotation.x+=(.06-u.leftLeg.knee.rotation.x)*y,u.rightLeg.knee.rotation.x+=(.06-u.rightLeg.knee.rotation.x)*y,u.leftArm.rotation.x*=1-y,u.rightArm.rotation.x*=1-y;const v=u.leftArm.userData.elbow,E=u.rightArm.userData.elbow;v.rotation.x+=(-.22-v.rotation.x)*y,E.rotation.x+=(-.22-E.rotation.x)*y,u.leftLeg.ankle.rotation.x*=1-y,u.rightLeg.ankle.rotation.x*=1-y,u.head.rotation.z=Math.sin(o*1.4)*.05,u.cape.rotation.x+=(.16-u.cape.rotation.x)*y,u.cape.rotation.z+=(Math.sin(o*1.1)*.04-u.cape.rotation.z)*y}this.updateFace(u,e)}if(this.usingGlb&&this.glbWalk&&this.glbIdle&&!this.glbEmoting){const y=this.glbWalk.getEffectiveWeight(),v=y+((f?1:0)-y)*Math.min(1,e*6);this.glbWalk.setEffectiveWeight(v),this.glbIdle.setEffectiveWeight(1-v)}const h=f?d?.14:.05:0;this.avatarLean+=(h-this.avatarLean)*Math.min(1,e*8);const m=this.explorer.position.x,_=this.explorer.position.z,p=1.6,g=zt(m-p,_,Nt),x=zt(m+p,_,Nt),M=zt(m,_-p,Nt),S=zt(m,_+p,Nt);this._n.set(g-x,2*p,M-S).normalize(),this._n.lerp(ux,.55).normalize(),this._fwd.set(Math.sin(this.avatarYaw),0,Math.cos(this.avatarYaw)),this._fwd.addScaledVector(this._n,-this._fwd.dot(this._n)).normalize(),this._right.crossVectors(this._n,this._fwd).normalize(),this._fwd.crossVectors(this._right,this._n).normalize(),this._basis.makeBasis(this._right,this._n,this._fwd),this._q.setFromRotationMatrix(this._basis),this._leanQ.setFromAxisAngle(hx,this.avatarLean),this._q.multiply(this._leanQ),this.explorer.quaternion.slerp(this._q,1-Math.exp(-12*e));const T=f?Math.abs(Math.sin(this.walkPhase))*.06:Math.sin(o*1.4)*.01;this.explorer.position.y=this.player.position.y+T;const w=this.explorer.children.find(y=>{var v;return(v=y.userData)==null?void 0:v.isFootRing});if(w){const y=f?1+Math.sin(this.walkPhase)*.08:1;w.scale.set(y,y,y),w.material.opacity=f?.45:.28}}this.updateProximity(),this.updatePickupProximity(),this.updateDust(e),this.tickScene(o,e);const s=performance.now();(s-this.lastExploreUpdateAt>=66||this.lastExploreUpdateAt===0)&&(this.lastExploreUpdateAt=s,(c=this.onExploreUpdate)==null||c.call(this,{playerX:this.player.position.x,playerZ:this.player.position.z,playerYaw:this.player.yaw,nodes:this.nodes,nearNodeId:(r=this.nearNode)==null?void 0:r.id,pickups:this.pickupData,biome:this.minimapPalette()})),this.composer?this.composer.render():this.renderer.render(this.scene,this.camera)});this.container=n,this.onNodeClick=e.onNodeClick,this.onProximity=e.onProximity,this.onExploreUpdate=e.onExploreUpdate,this.onPickupNear=e.onPickupNear,this.onPickupCollect=e.onPickupCollect;const o=n.clientWidth||360,i=n.clientHeight||420;this.scene=new y0,this.scene.fog=new ua(1713472,.0042),this.camera=new wi(50,o/i,.2,900),this.camera.position.set(0,8,20),this.renderer=new dm({antialias:this.quality!=="low",alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.qcfg.pixelRatio)),this.renderer.setSize(o,i),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=this.quality==="low"?Zi:$c,this.renderer.toneMapping=Hs,this.renderer.toneMappingExposure=1.28,this.renderer.outputColorSpace=yt,n.appendChild(this.renderer.domElement),this.explorerCam.bindDrag(this.renderer.domElement),this.buildSky(),this.buildClouds(),this.buildLights(),this.buildEnvironment(this.currentBiome),this.applyBiomeToSky(this.currentBiome),this.applyBiomeToLights(this.currentBiome),this.scene.fog=new ua(this.currentBiome.fogColor,this.currentBiome.fogDensity),this.buildTerrain(),this.buildMountains(),this.buildGrass(),this.buildDust(),this.buildMotes(),this.spawnExplorer(),this.setupPostFX(o,i),this.bindEvents()}setupPostFX(n,e){if(!this.qcfg.bloom){this.composer=void 0;return}try{const o=Math.min(window.devicePixelRatio,this.qcfg.pixelRatio),i=new mn(Math.max(1,Math.floor(n*o)),Math.max(1,Math.floor(e*o)),{type:Tn,samples:this.quality==="high"?4:2}),s=new Wm(this.renderer,i);if(s.addPass(new Xm(this.scene,this.camera)),this.quality==="high"){const c=new to(this.scene,this.camera,n,e);c.output=to.OUTPUT.Default,c.blendIntensity=.85,c.updateGtaoMaterial({radius:1.1,distanceExponent:1.4,thickness:2,scale:1.1,samples:12,distanceFallOff:1,screenSpaceRadius:!1}),c.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:5,rings:2,samples:8}),s.addPass(c)}const a=this.qcfg.bloomScale,r=new Ii(new rt(n*a,e*a),.62,.5,.78);s.addPass(r),s.addPass(new Ym),s.addPass(new Il({uniforms:{tDiffuse:{value:null}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
          uniform sampler2D tDiffuse;
          varying vec2 vUv;
          void main() {
            vec3 c = texture2D(tDiffuse, vUv).rgb;
            float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
            c = mix(vec3(l), c, 1.32);
            c = mix(c, c * c * (3.0 - 2.0 * c), 0.55);
            c += vec3(-0.012, 0.0, 0.016) * (1.0 - l) + vec3(0.02, 0.008, -0.014) * l * 0.6;
            vec2 q = vUv - 0.5;
            float vig = smoothstep(0.92, 0.28, length(q * vec2(1.0, 1.12)));
            c *= mix(0.78, 1.0, vig);
            gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
          }
        `})),s.setPixelRatio(Math.min(window.devicePixelRatio,this.qcfg.pixelRatio)),s.setSize(n,e),this.composer=s,this.bloomPass=r}catch{this.composer=void 0}}setNodes(n,e,o=!0){if(this.nodes=n,this.currentId=e,this.rebuildPath(),this.rebuildDecor(),o)this.rebuildNodesAsync();else{this.rebuildToken++;for(const i of this.nodeGroups.values())this.scene.remove(i),zi(i);this.nodeGroups.clear(),this.pickables=[]}this.teleportToNode(e),this.updateDynamicLightBudget(!0)}resume(){this.paused&&(this.paused=!1,this._fpsTs=0,this._fpsFrames=0,this.player.setEnabled(!this.spectatorMode),this.onResize(),this.animId||this.animate())}pause(){this.paused=!0,this.player.setEnabled(!1),this.animId&&(cancelAnimationFrame(this.animId),this.animId=0)}setSpectatorMode(n){this.spectatorMode=n,this.player.setStickInput(0,0),this.player.setEnabled(!n&&!this.paused),this.explorer&&(this.explorer.visible=!n)}tryInteract(){var n,e;return this.spectatorMode||this.paused?!1:this.nearPickup?((n=this.onPickupCollect)==null||n.call(this,this.nearPickup.id),!0):(e=this.nearNode)!=null&&e.unlocked?(this.onNodeClick(this.nearNode.id),!0):!1}setStickInput(n,e){this.player.setStickInput(n,e)}setBiome(n){this.activeUnitId=n,this.activeWorldId=void 0,this.activeWorldTitle=void 0,this.hasSpectatorFocus=!1;const e=E3(n);this.currentBiome=e,this.grassMesh&&(this.grassMesh.visible=["coast","forest","plains"].includes(e.decorStyle)),this.updateGrassPlacement(!0),this.applyBiomeToSky(e),this.applyBiomeToLights(e),this.buildEnvironment(e),this.applyBiomeToTerrain(e,!1),this.applyOutfitFromBiome(e),this.mountains&&(this.mountains.visible=e.decorStyle==="forest"||e.decorStyle==="plains"),this.scene.fog=new ua(e.fogColor,e.fogDensity)}setSubWorld(n,e){if(this.activeWorldId===n&&this.activeWorldTitle===e)return;this.activeWorldId=n,this.activeWorldTitle=e;const o=Sn(n);if(this.hasSpectatorFocus=!1,this.applyBiomeToTerrain(this.currentBiome,o),this.applySunDiscScale(o),this.mountains&&(this.mountains.visible=!o&&(this.currentBiome.decorStyle==="forest"||this.currentBiome.decorStyle==="plains")),this.grassMesh&&(this.grassMesh.visible=["coast","forest","plains"].includes(this.currentBiome.decorStyle)&&!o,this.updateGrassPlacement(!0)),this.bloomPass&&(this.bloomPass.strength=o?.2:St.clamp(.5+(1.5-this.currentBiome.sunIntensity)*.28,.45,1.05)),this.activeUnitId&&this.nodes.length>0&&(this.rebuildUnitLandscape(),Sn(n))){const i=this.nodes.find(s=>s.id===this.currentId)??this.nodes[0];if(i){const s=zt(i.x,i.z,Nt);this.spectatorFocus.set(i.x-3.5,s+4.8,i.z+11.5),this.hasSpectatorFocus=!0,this.player.yaw=0,this.player.setPosition(i.x,s,i.z+2.5),this.avatarYaw=0,this.explorerCam.resetBehind(0)}}}setOutfitAccent(n){var o;const e=(o=this.explorer)==null?void 0:o.userData.rig;if(e){e.mats.trim.color.setHex(n),e.mats.trim.emissive.setHex(n).multiplyScalar(.4),e.mats.cape.color.setHex(n),e.mats.cape.emissive.setHex(n).multiplyScalar(.35);return}this.usingGlb&&this.explorer&&this.explorer.traverse(i=>{const s=i,a=s.material;if(s.isMesh&&a&&"emissive"in a){const r=s.name;/^Torso$|^Body$/i.test(r)?(a.color.setHex(n),a.emissive.setHex(n).multiplyScalar(.14)):a.emissive.setHex(n).multiplyScalar(.06)}})}setExpression(n){this.expression=n,this.usingGlb&&this.playGlbEmote(n)}playGlbEmote(n){var a;if(!this.mixer||!this.glbClips||!this.glbIdle)return;const e=n==="happy"?"Wave":n==="surprised"?"Jump":null;if(!e){this.glbEmoting=!1,this.glbIdle.reset().fadeIn(.3).play();return}const o=this.glbClips.find(r=>r.name===e);if(!o)return;const i=this.mixer.clipAction(o);i.setLoop(lu,1),i.clampWhenFinished=!1,i.reset().play(),(a=this.glbWalk)==null||a.setEffectiveWeight(0),this.glbIdle.crossFadeTo(i,.2,!1),this.glbEmoting=!0;const s=r=>{var c;r.action===i&&(this.glbEmoting=!1,i.crossFadeTo(this.glbIdle.reset().play(),.3,!1),(c=this.mixer)==null||c.removeEventListener("finished",s))};this.mixer.addEventListener("finished",s)}applyOutfitFromBiome(n){this.setOutfitAccent(n.crystalColor)}minimapPalette(){const n=this.currentBiome,[e,o,i]=n.terrainTint,s=Math.round(e*255)<<16|Math.round(o*255)<<8|Math.round(i*255),a=Math.min(255,Math.round(e*255)+70)<<16|Math.min(255,Math.round(o*255)+80)<<8|Math.min(255,Math.round(i*255)+60);return{ground:s,highland:a,path:n.pathColor}}grassKey(n,e){return(n+1e5)*262147+(e+1e5)}hideGrassSlot(n){var o;const e=this.grassMesh;e&&(this.grassDummy.position.set(0,-9999,0),this.grassDummy.rotation.set(0,0,0),this.grassDummy.scale.setScalar(0),this.grassDummy.updateMatrix(),e.setMatrixAt(n,this.grassDummy.matrix),(o=this.flowerMesh)==null||o.setMatrixAt(n,this.grassDummy.matrix))}placeGrass(n,e,o){const i=this.grassMesh;if(!i)return;const s=this.grassCellSize,a=gs(e*1.7,o*2.3),r=gs(e*3.1+5,o*1.3+7),c=gs(e*.7+11,o*2.9+3),l=(e+.5)*s+(a-.5)*s,f=(o+.5)*s+(r-.5)*s,d=zt(l,f,Nt),u=1.2;if(Math.abs(zt(l+u,f,Nt)-zt(l-u,f,Nt))/(2*u)>.85){this.hideGrassSlot(n);return}this.grassDummy.position.set(l,d,f),this.grassDummy.rotation.set(0,c*Math.PI*2,0);const m=.68+r*.45;this.grassDummy.scale.set(m,.72+a*.45,m),this.grassDummy.updateMatrix(),i.setMatrixAt(n,this.grassDummy.matrix);const _=r;this.grassColor.setRGB(.86+_*.34,.96+a*.22,.8+(1-_)*.26),i.setColorAt(n,this.grassColor);const p=this.flowerMesh;if(p){const g=Rn(l*.035+210,f*.035+55,2),x=gs(e*5.3+9,o*7.1+2);if(g>.54&&x>.25){this.grassDummy.position.set(l+(c-.5)*s*.8,d,f+(a-.5)*s*.8),this.grassDummy.rotation.set(0,r*6.28,0);const M=1.1+x*1.1;this.grassDummy.scale.set(M,M*(.8+c*.5),M),this.grassDummy.updateMatrix(),p.setMatrixAt(n,this.grassDummy.matrix);const S=[16184040,16044874,15233935,11109864,15899210],T=Math.floor(g*17)%S.length,w=x>.85?Math.floor(a*S.length):T;this.grassColor.setHex(S[w]),p.setColorAt(n,this.grassColor)}else this.grassDummy.position.set(0,-9999,0),this.grassDummy.scale.setScalar(0),this.grassDummy.updateMatrix(),p.setMatrixAt(n,this.grassDummy.matrix)}}updateGrassPlacement(n=!1){const e=this.grassMesh;if(!e||!e.visible)return;const o=this.player.position.x,i=this.player.position.z;if(!n){const h=o-this.grassLastX,m=i-this.grassLastZ;if(h*h+m*m<9)return}this.grassLastX=o,this.grassLastZ=i;const s=this.grassCellSize,a=this.grassRadius,r=a*a,c=Math.floor((o-a)/s),l=Math.ceil((o+a)/s),f=Math.floor((i-a)/s),d=Math.ceil((i+a)/s),u=this.grassNeeded;u.clear();for(let h=c;h<=l;h++)for(let m=f;m<=d;m++){const _=(h+.5)*s-o,p=(m+.5)*s-i;_*_+p*p>r||u.add(this.grassKey(h,m))}for(const[h,m]of this.grassCellMap)u.has(h)||(this.grassCellMap.delete(h),this.hideGrassSlot(m),this.grassFreeSlots.push(m));for(const h of u){if(this.grassCellMap.has(h))continue;const m=this.grassFreeSlots.pop();if(m===void 0)break;const _=h%262147-1e5,p=(h-(_+1e5))/262147-1e5;this.placeGrass(m,p,_),this.grassCellMap.set(h,m)}e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0),this.flowerMesh&&(this.flowerMesh.instanceMatrix.needsUpdate=!0,this.flowerMesh.instanceColor&&(this.flowerMesh.instanceColor.needsUpdate=!0))}disposeReflectors(){for(const n of this.reflectors)n.getRenderTarget().dispose(),n.geometry.dispose(),n.material.dispose();this.reflectors=[]}updateFace(n,e){this.blinkTimer-=e,this.blinkTimer<=0&&(this.blink=1,this.blinkTimer=2.4+Math.random()*3.2),this.blink=Math.max(0,this.blink-e*9);const o=1-this.blink*.85;n.eyeL.scale.y=o,n.eyeR.scale.y=o;const i=this.nearNode||this.nearPickup?"happy":this.expression;let s=n.faceRest.browY,a=1,r=1,c=n.faceRest.mouthY;i==="happy"?(s+=.006,a=1.45,r=.9,c-=.004):i==="surprised"&&(s+=.014,a=.6,r=2.2,c-=.006);const l=Math.min(1,e*8);n.brow.position.y+=(s-n.brow.position.y)*l,n.mouth.scale.x+=(a-n.mouth.scale.x)*l,n.mouth.scale.y+=(r-n.mouth.scale.y)*l,n.mouth.position.y+=(c-n.mouth.position.y)*l}setPickups(n){this.pickupData=n,this.rebuildPickups()}markPickupCollected(n){var i,s;const e=this.pickupData.find(a=>a.id===n);e&&(e.collected=!0);const o=this.pickupMeshes.get(n);o&&(o.userData.dying=!0,o.userData.dieTimer=0),((i=this.nearPickup)==null?void 0:i.id)===n&&(this.nearPickup=null,(s=this.onPickupNear)==null||s.call(this,null))}tryCollectPickup(){var n;return this.nearPickup?((n=this.onPickupCollect)==null||n.call(this,this.nearPickup.id),!0):!1}dispose(){var n,e,o,i,s,a,r,c,l,f,d;if(cancelAnimationFrame(this.animId),this.animId=0,this.renderer.domElement.removeEventListener("pointerdown",this.onPointerDown),this.explorerCam.disposeDrag(),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("resize",this.onResize),document.removeEventListener("visibilitychange",this.onVisibilityChange),(n=this.resizeObserver)==null||n.disconnect(),(e=this.vegetation)==null||e.dispose(),this.vegetation=void 0,this.player.dispose(),Pn(this.scene,this.pathGroup),Pn(this.scene,this.decorGroup),Pn(this.scene,this.waterGroup),Pn(this.scene,this.mountains),Pn(this.scene,this.clouds),Pn(this.scene,this.unitLandscape),Pn(this.scene,this.explorer),this.removePickupGroup(),this.grassMesh&&(this.scene.remove(this.grassMesh),this.grassMesh.geometry.dispose(),this.grassMesh.material.dispose()),this.sunDisc&&(this.scene.remove(this.sunDisc),(o=this.sunDisc.material.map)==null||o.dispose(),this.sunDisc.material.dispose()),this.dustGroup){this.scene.remove(this.dustGroup);const u=(i=this.dustPool[0])==null?void 0:i.material;(s=u==null?void 0:u.map)==null||s.dispose();for(const h of this.dustPool)h.material.dispose();this.dustPool=[]}if(this.motes){this.scene.remove(this.motes),this.motes.geometry.dispose();const u=this.motes.material;(a=u.map)==null||a.dispose(),u.dispose(),this.motes=void 0}this.disposeReflectors(),(r=this.mixer)==null||r.stopAllAction(),(c=this.composer)==null||c.dispose();for(const u of this.nodeGroups.values())zi(u);if(this.pickupMeshes.clear(),this.terrain){this.terrain.geometry.dispose();const u=this.terrain.material;for(const h of new Set([u.map,this.groundDetailMap]))h==null||h.dispose();(l=u.roughnessMap)==null||l.dispose(),(f=u.normalMap)==null||f.dispose(),u.dispose()}(d=this.envRT)==null||d.dispose(),this.skyDome&&(this.skyDome.geometry.dispose(),this.skyDome.material.dispose()),this.renderer.dispose(),this.renderer.domElement.remove()}spawnExplorer(){Pn(this.scene,this.explorer),this.explorer=m3(),this.contactShadow=mc(1.9),this.explorer.add(this.contactShadow),this.scene.add(this.explorer),this.explorer.visible=!this.spectatorMode,this.applyOutfitFromBiome(this.currentBiome),this.tryLoadGlbAvatar()}async tryLoadGlbAvatar(){var n;try{const e=await Ol(),o=(n=e==null?void 0:e.world)==null?void 0:n.avatar;if(!e||!o)return;const i=await Ng(o.file,o,e);if(!i)return;if(Pn(this.scene,this.explorer),kg(i.group),this.explorer=i.group,this.contactShadow=mc(1.9),this.explorer.add(this.contactShadow),this.explorer.position.copy(this.player.position),this.explorer.quaternion.setFromEuler(new co(0,this.avatarYaw,0)),this.scene.add(this.explorer),this.usingGlb=!0,i.clips.length){this.mixer=new du(this.explorer),this.glbClips=i.clips;const s=i.clips.find(r=>/idle|stand|breath/i.test(r.name))??i.clips[0];this.glbIdle=this.mixer.clipAction(s),this.glbIdle.play();const a=i.clips.find(r=>/walk|run|move/i.test(r.name));a&&(this.glbWalk=this.mixer.clipAction(a),this.glbWalk.play(),this.glbWalk.setEffectiveWeight(0))}}catch{}}teleportToNode(n){const e=this.nodes.find(i=>i.id===n)??this.nodes[0];if(!e)return;const o=zt(e.x,e.z,Nt);this.player.yaw=0,this.player.setPosition(e.x+4,o,e.z-8),this.explorer&&(this.explorer.position.copy(this.player.position),this.explorer.rotation.set(0,this.player.yaw,0),this.explorer.quaternion.setFromEuler(this.explorer.rotation)),this.avatarYaw=this.player.yaw,this.avatarLean=0,this.explorerCam.resetBehind(this.player.yaw),this.camera.position.set(e.x+10,o+7,e.z-16),this.camera.lookAt(e.x,o+1.5,e.z)}buildSky(){const n=new jt({side:An,depthWrite:!1,uniforms:{topColor:{value:new te(3824266)},midColor:{value:new te(5929642)},bottomColor:{value:new te(659488)},horizonColor:{value:new te(12439772)},sunDir:{value:new Y(.5,.72,.36).normalize()},sunColor:{value:new te(16773320)},uTime:{value:0}},vertexShader:`
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
      `});this.skyDome=new G(new ye(560,48,32),n),this.scene.add(this.skyDome);const e=new Float32Array(2e3*3),o=on(42);for(let a=0;a<2e3;a++){const r=300+o()*80,c=o()*Math.PI*2,l=o()*Math.PI*.45;e[a*3]=r*Math.sin(l)*Math.cos(c),e[a*3+1]=r*Math.cos(l)+30,e[a*3+2]=r*Math.sin(l)*Math.sin(c)+mi}const i=new sn;i.setAttribute("position",new xt(e,3)),this.scene.add(new Ha(i,new za({color:15265528,size:.42,transparent:!0,opacity:0,sizeAttenuation:!0,visible:!1})));const s=new ti({map:this.makeGlowTexture(),color:16773320,transparent:!0,depthWrite:!1,blending:si,fog:!1});this.sunDisc=new ni(s),this.sunDisc.scale.set(52,52,1),this.scene.add(this.sunDisc)}buildEnvironment(n){var e;try{const o=new Va(this.renderer),i=new y0,s=new jt({side:An,depthWrite:!1,uniforms:{topColor:{value:new te(n.skyTop)},midColor:{value:new te(n.skyMid)},bottomColor:{value:new te(n.skyBot)},sunColor:{value:new te(n.sunColor)},sunDir:{value:new Y(.5,.72,.36).normalize()}},vertexShader:`
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
        `});i.add(new G(new ye(10,32,24),s));const a=o.fromScene(i,.02);(e=this.envRT)==null||e.dispose(),this.envRT=a,this.scene.environment=a.texture,i.traverse(r=>{const c=r;c.isMesh&&(c.geometry.dispose(),c.material.dispose())}),o.dispose()}catch{}}makeGlowTexture(){const e=document.createElement("canvas");e.width=e.height=256;const o=e.getContext("2d"),i=o.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.18,"rgba(255,245,210,0.95)"),i.addColorStop(.5,"rgba(255,210,140,0.35)"),i.addColorStop(1,"rgba(255,200,120,0)"),o.fillStyle=i,o.fillRect(0,0,256,256);const s=new Wt(e);return s.colorSpace=yt,s}buildDust(){const n=this.makeCloudTexture(),e=new Ke;for(let o=0;o<28;o++){const i=new ti({map:n,color:13483942,transparent:!0,opacity:0,depthWrite:!1}),s=new ni(i);s.visible=!1,s.userData={life:0,vx:0,vy:0,vz:0},e.add(s),this.dustPool.push(s)}this.dustGroup=e,this.scene.add(e)}buildMotes(){const n=this.quality==="low"?70:this.quality==="med"?120:190,e=on(7311),o=new Float32Array(n*3);for(let s=0;s<n;s++)o[s*3]=(e()-.5)*To,o[s*3+1]=e()*zc,o[s*3+2]=(e()-.5)*To;const i=new sn;i.setAttribute("position",new xt(o,3)),this.motes=new Ha(i,new za({map:this.makeGlowTexture(),color:this.currentBiome.sunColor,size:.5,transparent:!0,opacity:.55,depthWrite:!1,blending:si,sizeAttenuation:!0,fog:!1})),this.motes.frustumCulled=!1,this.moteBase=o.slice(),this.scene.add(this.motes)}updateMotes(n,e){if(!this.motes||!this.moteBase)return;const o=this.player.position.x,i=this.player.position.z,s=this.player.position.y,a=this.motes.geometry.attributes.position,r=a.array,c=To/2;for(let f=0;f<a.count;f++){const d=this.moteBase[f*3],u=this.moteBase[f*3+1],h=this.moteBase[f*3+2];let m=d-o,_=h-i;m=((m+c)%To+To)%To-c,_=((_+c)%To+To)%To-c,r[f*3]=o+m+Math.sin(n*.35+f*1.7)*.9,r[f*3+1]=s+.4+(u+n*.12*(.4+f%5*.15))%zc+Math.sin(n*.6+f)*.25,r[f*3+2]=i+_+Math.cos(n*.3+f*2.3)*.9}a.needsUpdate=!0;const l=this.motes.material;l.color.setHex(this.currentBiome.sunColor),l.opacity=.26+Math.sin(n*.8)*.07}emitDust(n,e,o){let i=0;for(const s of this.dustPool){if(s.userData.life>0)continue;s.position.set(n+(Math.random()-.5)*.2,e+.05,o+(Math.random()-.5)*.2),s.userData.life=1,s.userData.vx=(Math.random()-.5)*.6,s.userData.vy=.3+Math.random()*.45,s.userData.vz=(Math.random()-.5)*.6;const a=.3+Math.random()*.2;if(s.scale.set(a,a,1),s.visible=!0,s.material.opacity=.5,++i>=3)break}}updateDust(n){for(const e of this.dustPool){const o=e.userData.life;if(o<=0)continue;const i=o-n*1.4;if(e.userData.life=i,i<=0){e.visible=!1;continue}e.userData.vy=e.userData.vy-n*.6,e.position.x+=e.userData.vx*n,e.position.y+=e.userData.vy*n,e.position.z+=e.userData.vz*n,e.material.opacity=i*.5;const s=(1.3-i)*.6+.3;e.scale.set(s,s,1)}}buildLights(){this.hemi=new fu(13164799,2373672,.5),this.scene.add(this.hemi),this.ambientLight=new uu(10137804,.18),this.scene.add(this.ambientLight),this.sun=new Ba(16774368,1.45),this.sun.position.set(55,72,35),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(this.qcfg.shadowMap,this.qcfg.shadowMap);const n=this.sun.shadow.camera;n.near=8,n.far=340,n.left=n.bottom=-70,n.right=n.top=70,this.sun.shadow.bias=-3e-4,this.sun.shadow.normalBias=.04,this.scene.add(this.sun,this.sun.target);const e=new Ba(14674175,.22);e.position.set(-40,28,-30);const o=new Kn(10864895,.1,160);o.position.set(-35,28,mi),o.userData.isGlobalLight=!0,this.scene.add(e,o)}updateDynamicLightBudget(n=!1){if(!n&&++this.dynamicLightBudgetFrames<30)return;this.dynamicLightBudgetFrames=0;const e=[];this.scene.traverse(o=>{const i=o;if(i.userData.isGlobalLight||!i.isLight||!i.isPointLight&&!i.isSpotLight)return;const s=i;s.getWorldPosition(this._lightPosition),e.push({light:s,distance:this._lightPosition.distanceToSquared(this.player.position)})}),e.sort((o,i)=>o.distance-i.distance);for(let o=0;o<e.length;o++)e[o].light.visible=o<this.dynamicLightLimit}applyBiomeToSky(n){if(!this.skyDome)return;const e=this.skyDome.material;e.uniforms.topColor.value.setHex(n.skyTop),e.uniforms.midColor.value.setHex(n.skyMid),e.uniforms.bottomColor.value.setHex(n.skyBot),e.uniforms.horizonColor.value.setHex(n.fogColor),e.needsUpdate=!0}applyBiomeToLights(n){this.hemi&&(this.hemi.color.setHex(n.hemiSky),this.hemi.groundColor.setHex(n.hemiGround)),this.ambientLight&&this.ambientLight.color.setHex(n.ambientColor),this.sun&&(this.sun.color.setHex(n.sunColor),this.sun.intensity=n.sunIntensity),this.sunDisc&&(this.sunDisc.material.color.setHex(n.sunColor),this.applySunDiscScale(Sn(this.activeWorldId))),this.bloomPass&&(this.bloomPass.strength=St.clamp(.5+(1.5-n.sunIntensity)*.28,.45,1.05))}applySunDiscScale(n){if(!this.sunDisc)return;const e=n?this.currentBiome.sunFocusedDiscScale??this.currentBiome.sunDiscScale??52:this.currentBiome.sunDiscScale??52;this.sunDisc.scale.set(e,e,1)}applyBiomeToTerrain(n,e){if(!this.terrain)return;const o=this.terrain.material;o.color.setRGB(1,1,1),o.map=this.groundDetailMap??null,o.vertexColors=!0,o.roughness=e?.95:.9,o.metalness=.02,o.needsUpdate=!0,this.paintTerrain(n,e)}rebuildPickups(){this.removePickupGroup(),this.pickupMeshes.clear(),this.pickupGroup=new Ke;for(const n of this.pickupData){if(n.collected)continue;const e=this.createPickupOrb(n);this.pickupGroup.add(e),this.pickupMeshes.set(n.id,e)}this.scene.add(this.pickupGroup),this.updateDynamicLightBudget(!0)}createPickupOrb(n){const e=this.currentBiome,o=new Ke;o.position.set(n.x,n.y,n.z),o.userData.pickupId=n.id;const i=new ge({color:e.orbColor,emissive:new te(e.orbColor),emissiveIntensity:1.8,roughness:.1,metalness:.4,transparent:!0,opacity:.92}),s=new G(new ye(.32,14,10),i);s.userData.isOrbCore=!0,o.add(s);const a=new wt({color:e.glowColor,transparent:!0,opacity:.22,side:An,depthWrite:!1}),r=new G(new ye(.58,12,8),a);r.userData.isOrbGlow=!0,o.add(r);const c=new me(.52,.04,6,24),l=new wt({color:e.orbColor,transparent:!0,opacity:.55,depthWrite:!1}),f=new G(c,l);f.userData.isOrbRing=!0,f.rotation.x=Math.PI/3,o.add(f);const d=new Kn(e.glowColor,.6,8);d.userData.isOrbLight=!0,o.add(d);const u=this.createWordSprite(n.word,e.orbColor);return u.position.y=1.1,u.userData.isWordSprite=!0,o.add(u),o.userData.baseY=n.y,o.userData.pickupId=n.id,o}createWordSprite(n,e){var f;const i=`#${new te(e).getHexString()}`,s=document.createElement("canvas");s.width=256,s.height=64;const a=s.getContext("2d");a.clearRect(0,0,256,64),a.fillStyle="rgba(0,0,0,0.52)",(f=a.roundRect)==null||f.call(a,4,8,248,48,12),a.fill(),a.font="bold 26px 'Arial', sans-serif",a.fillStyle=i,a.textAlign="center",a.textBaseline="middle",a.shadowColor=i,a.shadowBlur=8,a.fillText(n,128,34);const r=new Wt(s),c=new ti({map:r,transparent:!0,depthWrite:!1}),l=new ni(c);return l.scale.set(2.4,.6,1),l}disposePickupResources(n){zi(n)}removePickupGroup(){this.pickupGroup&&(this.scene.remove(this.pickupGroup),this.disposePickupResources(this.pickupGroup),this.pickupGroup=void 0)}buildTerrain(){const n=new Je(Bo.width,Bo.depth,E0.w,E0.d);n.rotateX(-Math.PI/2);const e=n.attributes.position;for(let i=0;i<e.count;i++){const s=e.getX(i),a=e.getZ(i),r=Nt(s,a);e.setY(i,r)}n.computeVertexNormals(),n.setAttribute("color",new xt(new Float32Array(e.count*3).fill(1),3)),this.terrainMaps=A3(),this.groundDetailMap=P3();const o=new ge({color:16777215,map:this.groundDetailMap,roughnessMap:this.terrainMaps.roughness,normalMap:this.terrainMaps.normal,normalScale:new rt(.7,.7),vertexColors:!0,roughness:.92,metalness:.02,envMapIntensity:.32});o.onBeforeCompile=i=>{i.uniforms.uCloudT=Ia,i.vertexShader=`varying vec3 vTerrWorld;
`+i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
         vTerrWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`),i.fragmentShader=`
        uniform float uCloudT;
        ${Hc}
        varying vec3 vTerrWorld;
        float tHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float tNoise(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(tHash(i), tHash(i + vec2(1.0, 0.0)), f.x), mix(tHash(i + vec2(0.0, 1.0)), tHash(i + vec2(1.0, 1.0)), f.x), f.y);
        }
      `+i.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
         #ifdef USE_MAP
           vec4 tSecond = texture2D(map, vMapUv * 0.173 + vec2(0.31, 0.17));
           diffuseColor.rgb *= mix(vec3(1.0), tSecond.rgb / 0.86, 0.5);
         #endif
         float tMacro = tNoise(vTerrWorld.xz * 0.035) * 0.6 + tNoise(vTerrWorld.xz * 0.15) * 0.4;
         diffuseColor.rgb *= 0.88 + tMacro * 0.24;
         diffuseColor.rgb *= cloudK(vTerrWorld.xz, uCloudT);`).replace("#include <fog_fragment>",`#ifdef USE_FOG
           // 远处地形向雾色渐隐（大气透视），并让山谷外缘与远山融为一体
           float tf = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
           tf = max(tf, smoothstep(150.0, 340.0, vFogDepth) * 0.92);
           gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, tf);
         #endif`)},o.customProgramCacheKey=()=>"terrain-v3",this.terrain=new G(n,o),this.terrain.receiveShadow=!0,this.terrain.position.set(0,hu,mi),this.scene.add(this.terrain),this.paintTerrain(this.currentBiome,!1)}paintTerrain(n,e){if(!this.terrain)return;const o=this.terrain.geometry,i=o.attributes.position,s=o.attributes.normal,a=o.attributes.color,r=a.array,c=T3(n),l=new te(c.grass),f=new te(c.dirt),d=new te(c.rock),u={h:0,s:0,l:0};l.getHSL(u);const h=new te().setHSL(u.h-.02,u.s*.9,Math.min(.62,u.l*1.28)),m=new te().setHSL((u.h-.09+1)%1,u.s*.7,u.l*1.12),_=new te(c.rock).lerp(new te(c.dirt),.45).multiplyScalar(1.15),p=new te().setHSL(u.h+.02,u.s*.9,u.l*.7),g=T=>eo(.22,.55,1-T),x=e?.72:1,M=new te,S=new te;for(let T=0;T<i.count;T++){const w=i.getX(T),y=i.getZ(T),v=i.getY(T),E=Rn(w*.009+31,y*.009+17,4)*.68+Rn(w*.045,y*.045,3)*.32,b=eo(.54,.78,E)*.75,A=1-s.getY(T),R=eo(.22,.55,A),L=Rn(w*.017+91,y*.017+47,3);M.copy(l).lerp(h,eo(.45,.8,L)*.7).lerp(m,eo(.62,.85,Rn(w*.012+13,y*.012+71,3))*.6);const I=Rn(w*.028+150,y*.028+20,4);M.lerp(_,eo(.64,.8,I)*(1-g(s.getY(T)))*.85),M.lerp(p,eo(.58,.78,Rn(w*.035+7,y*.035+123,3))*.45*(1-b)),M.lerp(f,b).lerp(d,R);const U=.86+Rn(w*.02+5,y*.02+9,3)*.26+eo(6,34,v)*.1;if(M.multiplyScalar(U),M.multiplyScalar(.94+eo(-6,10,v)*.08),x<1){S.copy(M);const N=S.r*.299+S.g*.587+S.b*.114;M.setRGB(N+(M.r-N)*x,N+(M.g-N)*x,N+(M.b-N)*x)}r[T*3]=M.r,r[T*3+1]=M.g,r[T*3+2]=M.b}a.needsUpdate=!0}buildMountains(){Pn(this.scene,this.mountains);const n=_3({count:this.quality==="low"?18:this.quality==="med"?24:30,ringRadius:Math.max(Bo.width,Bo.depth)*.5,originZ:mi,snow:this.quality!=="low"});this.mountains=n,this.scene.add(n)}buildGrass(){const n=gm(),e=new ge({vertexColors:!0,roughness:.92,metalness:0,side:$e});e.onBeforeCompile=a=>{a.uniforms.uTime={value:0},a.uniforms.uPlayer={value:new Y(0,0,0)},a.uniforms.uCloudT=Ia,a.uniforms.uFade={value:new rt(this.grassRadius*.55,this.grassRadius*.96)},this.grassUniforms=a.uniforms,a.vertexShader=`uniform float uTime;
uniform vec3 uPlayer;
uniform vec2 uFade;
uniform float uCloudT;
varying float vCloud;
`+Hc+a.vertexShader,a.fragmentShader=`varying float vCloud;
`+a.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.rgb *= vCloud;`),a.vertexShader=a.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
         float gH = position.y / ${Tl.toFixed(3)};
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
         transformed *= 1.0 - smoothstep(uFade.x, uFade.y, gd);`)},this.grassRadius=this.qcfg.grassRadius,this.grassCellSize=this.qcfg.grassCell;const o=Math.ceil(Math.PI*this.grassRadius*this.grassRadius/(this.grassCellSize*this.grassCellSize))+96,i=new Ln(n,e,o);i.frustumCulled=!1,i.castShadow=!1,i.receiveShadow=!0,this.grassFreeSlots=[];for(let a=0;a<o;a++)this.grassFreeSlots.push(a),this.hideGrassSlotInit(i,a);i.instanceMatrix.needsUpdate=!0;const s=new Ln(ym(),new ge({vertexColors:!0,roughness:.75,metalness:0,side:$e}),o);s.frustumCulled=!1,s.castShadow=!1;for(let a=0;a<o;a++)this.hideGrassSlotInit(s,a);s.instanceMatrix.needsUpdate=!0,i.add(s),this.flowerMesh=s,this.grassMesh=i,i.visible=this.currentBiome.decorStyle!=="space",this.scene.add(i),this.updateGrassPlacement(!0)}hideGrassSlotInit(n,e){this.grassDummy.position.set(0,-9999,0),this.grassDummy.rotation.set(0,0,0),this.grassDummy.scale.setScalar(0),this.grassDummy.updateMatrix(),n.setMatrixAt(e,this.grassDummy.matrix)}buildClouds(){Pn(this.scene,this.clouds);const n=this.makeCloudTexture(),e=new Ke;e.position.z=mi;const o=on(5150);for(let i=0;i<18;i++){const s=new ti({map:n,transparent:!0,opacity:.42+o()*.28,depthWrite:!1,fog:!1}),a=new ni(s),r=o()*Math.PI*2,c=130+o()*260;a.position.set(Math.cos(r)*c,86+o()*70,Math.sin(r)*c);const l=70+o()*140;a.scale.set(l,l*(.42+o()*.2),1),e.add(a)}this.clouds=e,e.visible=!1,this.scene.add(e)}makeCloudTexture(){const e=document.createElement("canvas");e.width=e.height=256;const o=e.getContext("2d");o.clearRect(0,0,256,256);for(let s=0;s<26;s++){const a=256*(.25+Math.random()*.5),r=256*(.35+Math.random()*.3),c=256*(.08+Math.random()*.18),l=o.createRadialGradient(a,r,0,a,r,c);l.addColorStop(0,"rgba(255,255,255,0.5)"),l.addColorStop(1,"rgba(255,255,255,0)"),o.fillStyle=l,o.beginPath(),o.arc(a,r,c,0,Math.PI*2),o.fill()}const i=new Wt(e);return i.colorSpace=yt,i}rebuildPath(){if(Pn(this.scene,this.pathGroup),this.pathGroup=new Ke,this.nodes.length<2){this.scene.add(this.pathGroup);return}const n=!!this.activeUnitId,e=n?this.nodes.slice(1).map(u=>[this.nodes[0],u]):this.nodes.slice(0,-1).map((u,h)=>[u,this.nodes[h+1]]),o=this.nodes.map(u=>new Y(u.x,zt(u.x,u.z,Nt)+.45,u.z)),i=new Nn(o,!1,"catmullrom",.35),s=Math.max(o.length*28,80),a=[];for(const[u,h]of e){const m=u.cleared&&h.cleared,_=zt(u.x,u.z,Nt)+.45,p=zt(h.x,h.z,Nt)+.45,g=new Nn([new Y(u.x,_,u.z),new Y(h.x,p,h.z)],!1,"catmullrom",.4);a.push(g),n||this.pathGroup.add(M3(g,{width:3.4,steps:Math.max(24,Math.ceil(g.getLength()/1.4)),groundY:(x,M)=>zt(x,M,Nt),base:m?9083526:9275e3,inlay:m?{color:7268279,emissive:3462041,intensity:.55}:{color:6000111,emissive:3900150,intensity:.25}}))}const r=_a(n?2834775:7041664),c=_a(n?3493734:9147295),l=_a(n?2504779:5595246),f=[r,c,l],d=new Ye(1.05,.13,.72);if(n)e.forEach(([u,h],m)=>{const _=a[m],p=Math.max(16,Math.ceil(Math.hypot(u.x-h.x,u.z-h.z)/1.6));for(let g=0;g<=p;g++){const x=g/p,M=Math.min(1,(g+.5)/p),S=_.getPoint(x);S.y=zt(S.x,S.z,Nt)+.01;const T=_.getPoint(M),w=new G(d,f[g%f.length]);w.position.copy(S),w.lookAt(T.x,S.y,T.z),w.receiveShadow=!0,this.pathGroup.add(w)}});else for(let u=0;u<=s;u++){const h=u/s,m=Math.min(1,(u+.5)/s),_=i.getPoint(h);_.y=zt(_.x,_.z,Nt)+.17;const p=i.getPoint(m),g=new G(d,f[u%f.length]);g.position.copy(_),g.lookAt(p.x,_.y,p.z),g.receiveShadow=!0,this.pathGroup.add(g)}if(!n){const u=um("rgba(255,220,140,1)"),h=new we(.055,.07,2.6,7),m=new we(.03,.03,.8,5),_=new ye(.14,8,6),p=hm(),g=pm(16769152);for(let x=0;x<this.nodes.length;x+=Math.max(1,Math.floor(this.nodes.length/8))){const M=this.nodes[x],S=Math.min(1,(x+.5)/Math.max(1,this.nodes.length-1)),T=i.getTangent(S),w=new Y(-T.z,0,T.x).normalize();for(const y of[-1,1]){const v=M.x+w.x*2.2*y,E=M.z+w.z*2.2*y,b=zt(v,E,Nt),A=new G(h,p);A.position.set(v,b+1.3,E),A.castShadow=!0;const R=new G(m,p);R.rotation.z=Math.PI/2,R.position.set(v+.4*y*-1,b+2.55,E);const L=new G(_,g);L.position.set(v+.8*y*-1,b+2.55,E);const I=new ni(new ti({map:u,transparent:!0,opacity:.7,depthWrite:!1,blending:si}));I.scale.setScalar(1.8),I.position.set(v+.8*y*-1,b+2.6,E),this.pathGroup.add(A,R,L,I)}}}this.scene.add(this.pathGroup)}addLakeShore(n,e,o,i,s){if(this.decorGroup)for(let a=0;a<n.length;a+=4){const r=n[a],c=1.03+s()*.12,l=e+r.x*c,f=i-r.y*c,d=zt(l,f,Nt),u=s();if(u<.55){const h=ac(1+s()*.8);h.position.set(l,Math.min(d,o+.5),f),this.decorGroup.add(h)}else if(u<.68){const h=bi(.5+s()*.7);h.position.set(l,d+.1,f),h.rotation.y=s()*Math.PI*2,this.decorGroup.add(h)}}}rebuildDecor(){var y;this.disposeReflectors(),(y=this.vegetation)==null||y.dispose(),this.vegetation=void 0,Pn(this.scene,this.decorGroup),Pn(this.scene,this.waterGroup),this.decorGroup=new Ke,this.waterGroup=new Ke,this.waterMeshes=[];const n=on(2024),e=new Set,o=this.activeUnitId?this.nodes.find(v=>v.unlocked)??this.nodes[0]:void 0,i=!!(o&&this.activeUnitId),s=(o==null?void 0:o.x)??0,a=(o==null?void 0:o.z)??mi,r=(v,E)=>!i&&this.nodes.some(b=>Math.hypot(v-(b.x+4),E-(b.z-8))<26);this.rebuildUnitLandscape();const c=i?this.quality==="low"?8:this.quality==="med"?12:18:this.quality==="low"?16:this.quality==="med"?24:34,l=i?this.quality==="low"?42:this.quality==="med"?64:92:this.quality==="low"?80:this.quality==="med"?120:180;for(const v of this.nodes){const E=on(v.id.length*997+v.z);for(let b=0;b<c;b++){const A=E()*Math.PI*2,R=i?32+E()*22:6+E()*24,L=v.x+Math.cos(A)*R,I=v.z+Math.sin(A)*R;if(i&&Math.hypot(L-s,I-a)<25||r(L,I))continue;const U=`${Math.round(L)}_${Math.round(I)}`;if(e.has(U))continue;e.add(U);const N=zt(L,I,Nt),O=i?.65+E()*.75:.75+E()*1.1;this.addDecorAt(i?this.currentBiome.decorStyle:v.theme,L,N,I,O,E)}}const f=on(909),d=i?145:Bo.width*.46,u=i?190:Bo.depth*.46,h=this.currentBiome.decorStyle;for(let v=0;v<l;v++){const E=s+(f()-.5)*2*d,b=a+(f()-.5)*2*u;if(i&&Math.hypot(E-s,b-a)<25||r(E,b)||!i&&Math.abs(E)<14)continue;const A=zt(E,b,Nt),R=.8+f()*1.5,L=f();if(h==="space"){const I=bi(R*.72);I.position.set(E,A+.16,b),I.rotation.set(f()*.18,f()*Math.PI*2,f()*.18),this.decorGroup.add(I);continue}if(!(L<.24))if(L<.46){const I=Pl(R);I.position.set(E,A,b),I.rotation.y=f()*Math.PI*2,this.decorGroup.add(I)}else if(L<.62){const I=bi(R*.8);I.position.set(E,A+.2,b),I.rotation.set(f(),f(),f()),this.decorGroup.add(I)}else if(L<.8){const I=bm(.85+f()*.7);I.position.set(E,A,b),this.decorGroup.add(I)}else if(L<.91){const I=ac(R);I.position.set(E,A,b),I.rotation.y=f()*Math.PI*2,this.decorGroup.add(I)}else{const I=wm(R*.9);I.position.set(E,A+.12,b),this.decorGroup.add(I)}}const m=[[s,a,16],[s,a+9.3,17],[s-21,a-20,6.5],[s+21,a-20,6.5],[s-21,a+20,6.5],[s+21,a+20,6.5],[s-17.4,a+23.2,6],[s,a+28.2,6.5],[s+17.4,a+23.2,6]];i&&h!=="space"&&this.decorGroup.add(x3({centerX:s,centerZ:a,groundY:(v,E)=>zt(v,E,Nt),density:this.quality==="low"?.5:this.quality==="med"?.75:1,avoid:m}));const _=i&&this.currentBiome.decorStyle==="space"?0:i?2:6,p=this.qcfg.reflectors,g=[];for(let v=0;v<_;v++){const E=v%2===0?-1:1,b=s+E*(i?52+n()*18:60+n()*55),A=a-u*.8+v*(u*1.5/_)+n()*18,R=i?34+n()*14:48+n()*26,L=i?24+n()*12:30+n()*18;let I=zt(b,A,Nt),U=0;const N=Vc(R*.5,L*.5,v*7+3,24);for(const W of N){const k=zt(b+W.x*.97,A-W.y*.97,Nt);I=Math.min(I,k),U+=k}const O=(I+U/N.length)/2-.1;g.push({x:b,z:A,rx:R/2*1.15,rz:L/2*1.15});const V=v<p,X=Vc(R*.5,L*.5,v*7+3),J=new ml(new Mn(X),1);if(this.addLakeShore(X,b,O,A,n),V){const W=new $s(J.clone(),{textureWidth:this.qcfg.reflectRes,textureHeight:this.qcfg.reflectRes,color:1918038});W.rotation.x=-Math.PI/2,W.position.set(b,O,A),this.reflectors.push(W),this.waterGroup.add(W);const k=new G(J.clone(),Z0());k.material.opacity=.26,k.rotation.x=-Math.PI/2,k.position.set(b,O+.05,A),k.userData.isWater=!0,k.userData.baseOpacity=.26,this.waterMeshes.push(k),this.waterGroup.add(k)}else{const W=new G(J.clone(),Z0());W.material.opacity=.82,W.rotation.x=-Math.PI/2,W.position.set(b,O+.02,A),W.userData.isWater=!0,W.userData.baseOpacity=.82,this.waterMeshes.push(W),this.waterGroup.add(W)}}const x=(i?this.nodes.slice(1).map(v=>[this.nodes[0],v]):this.nodes.slice(0,-1).map((v,E)=>[v,this.nodes[E+1]])).map(([v,E])=>({ax:v.x,az:v.z,bx:E.x,bz:E.z,halfWidth:7})),M=i?[[s,a,25],...m]:this.nodes.map(v=>[v.x+4,v.z-8,26]);let S=2024;if(i&&this.activeUnitId){S=7;for(let v=0;v<this.activeUnitId.length;v++)S=Math.imul(S,31)+this.activeUnitId.charCodeAt(v)>>>0}const T=Im({centerX:s,centerZ:a,halfW:d,halfD:u,quality:this.quality,decorStyle:h,seed:S,groundY:(v,E)=>zt(v,E,Nt),avoidCircles:M,avoidEllipses:g,avoidSegments:x,clearCenterStrip:i?0:14});this.vegetation=Fm(T,{castShadow:this.quality!=="low"}),this.decorGroup.add(this.vegetation.group);const w=new G(new Je(i?d*2.2:Bo.width+40,i?u*2.2:Bo.depth+40),new wt({color:10406143,transparent:!0,opacity:.038,depthWrite:!1}));w.rotation.x=-Math.PI/2,w.position.set(s,5,a),this.decorGroup.add(w),this.scene.add(this.decorGroup,this.waterGroup),this.updateDynamicLightBudget(!0)}rebuildUnitLandscape(){Pn(this.scene,this.unitLandscape),this.unitLandscape=void 0;const n=this.activeUnitId?this.nodes.find(e=>e.unlocked)??this.nodes[0]:void 0;!n||!this.activeUnitId||(this.unitLandscape=Kv(this.currentBiome,n,this.activeWorldId,this.activeWorldTitle,this.quality==="low"?"low":"high"),this.unitLandscape.position.set(n.x,zt(n.x,n.z,Nt),n.z),yl(this.unitLandscape),this.scene.add(this.unitLandscape))}addDecorAt(n,e,o,i,s,a){if(n==="forest"||n==="plains"||n==="library"){const r=a()>.4?ls(s):di(s*1.05);r.position.set(e,o,i),r.rotation.y=a()*Math.PI*2,this.decorGroup.add(r);return}if(n==="coast"&&a()>.45){const r=bi(s*.85);r.position.set(e,o+.3,i),r.rotation.set(a(),a(),a()),this.decorGroup.add(r);return}if(a()>.5){const r=bi(s*.65);r.position.set(e,o+.2,i),this.decorGroup.add(r)}if(a()>.65){const r=Rl(ds(n).accent);r.position.set(e,o,i),this.decorGroup.add(r)}}async rebuildNodesAsync(){const n=++this.rebuildToken;for(const e of this.nodeGroups.values())this.scene.remove(e),zi(e);this.nodeGroups.clear(),this.pickables=[];for(const e of this.nodes){if(n!==this.rebuildToken)return;const o=new Ke,i=zt(e.x,e.z,Nt);o.position.set(e.x,i,e.z),o.userData.nodeId=e.id;const{root:s,crystal:a}=await Yg(e,e.id===this.currentId);if(n!==this.rebuildToken){zi(s);return}o.add(s),a.userData.nodeId=e.id,this.pickables.push(a);const r=w3(e.name,e.unlocked);o.add(r),e.unlocked||pu(o),this.nodeGroups.set(e.id,o),this.scene.add(o),this.updateDynamicLightBudget(!0)}}bindEvents(){this.renderer.domElement.addEventListener("pointerdown",this.onPointerDown),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("resize",this.onResize),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(this.onResize),this.resizeObserver.observe(this.container)),document.addEventListener("visibilitychange",this.onVisibilityChange)}updateProximity(){var o,i;let n=null,e=mu;for(const s of this.nodes){if(!s.unlocked)continue;const a=this.player.position.x-s.x,r=this.player.position.z-s.z,c=Math.hypot(a,r);c<e&&(e=c,n=s)}(n==null?void 0:n.id)!==((o=this.nearNode)==null?void 0:o.id)&&(this.nearNode=n,(i=this.onProximity)==null||i.call(this,n))}updatePickupProximity(){var o,i;let n=null,e=dx;for(const s of this.pickupData){if(s.collected)continue;const a=this.player.position.x-s.x,r=this.player.position.z-s.z,c=Math.hypot(a,r);c<e&&(e=c,n=s)}(n==null?void 0:n.id)!==((o=this.nearPickup)==null?void 0:o.id)&&(this.nearPickup=n,(i=this.onPickupNear)==null||i.call(this,n))}tickScene(n,e){var a,r,c,l,f;if((a=this.vegetation)==null||a.update(this.camera),this.updateDynamicLightBudget(),this.waterFrame++,this.sun){const d=n*.02,u=St.degToRad(34+Math.cos(d)*16),h=Math.sin(d)*.8;this.sunDirV.set(Math.sin(h)*Math.cos(u)+.25,Math.sin(u),-.55*Math.cos(u)).normalize();const m=3,_=Math.round(this.player.position.x/m)*m,p=Math.round(this.player.position.z/m)*m;this.sun.target.position.set(_,this.player.position.y,p),this.sun.target.updateMatrixWorld(),this.sun.position.set(_,this.player.position.y,p).addScaledVector(this.sunDirV,140);const g=St.clamp((Math.sin(u)-.15)/.6,.3,1),x=Sn(this.activeWorldId);if(this.sun.color.setHex(this.currentBiome.sunColor).lerp(fx,(1-g)*.6),this.sun.intensity=this.currentBiome.sunIntensity*(x?.92:.88+g*.12),this.renderer.toneMappingExposure=x?1.06:1+g*.06,this.hemi&&(this.hemi.intensity=x?.66:.58+g*.12),this.sunDisc){this.sunDisc.position.copy(this.camera.position).addScaledVector(this.sunDirV,480);const M=x?this.currentBiome.sunFocusedDiscOpacity??this.currentBiome.sunDiscOpacity??1:this.currentBiome.sunDiscOpacity??1;this.sunDisc.material.opacity=St.clamp(g*1.2*M,0,1)}}if(this.grassUniforms&&(this.grassUniforms.uTime.value=n,Ia.value=n,this.grassUniforms.uPlayer.value.copy(this.player.position)),this.updateGrassPlacement(),this.clouds&&(this.clouds.rotation.y=n*.006),this.skyDome){this.skyDome.position.copy(this.camera.position);const d=this.skyDome.material.uniforms;d.uTime.value=n,d.sunDir.value.copy(this.sunDirV),d.sunColor.value.setHex(this.currentBiome.sunColor)}this.updateMotes(n,e),(r=this.unitLandscape)==null||r.traverse(d=>{var h,m;const u=d;if((h=u.userData)!=null&&h.isLandscapeRing&&(u.rotation.y+=e*.42),(m=u.userData)!=null&&m.isLandscapeBeacon){u.userData.landscapeBaseY===void 0&&(u.userData.landscapeBaseY=u.position.y);const _=u.userData.landscapeBaseY;u.position.y=_+Math.sin(n*1.5+u.position.x*.08)*.24}});for(const[d,u]of this.pickupMeshes){const h=((c=this.nearPickup)==null?void 0:c.id)===d,m=u.userData.baseY??u.position.y;if(u.userData.dying){u.userData.dieTimer=(u.userData.dieTimer??0)+e*1.4;const _=u.userData.dieTimer;u.scale.setScalar(1-_*.9),u.position.y=m+_*3,u.traverse(p=>{const g=p;g.material&&"opacity"in g.material&&(g.material.opacity*=.85)}),_>=1&&((l=this.pickupGroup)==null||l.remove(u),this.disposePickupResources(u),this.pickupMeshes.delete(d));continue}u.position.y=m+Math.sin(n*1.4+d.length*.5)*.28,u.traverse(_=>{var g,x,M,S,T;const p=_;if((g=p.userData)!=null&&g.isOrbCore){p.rotation.y=n*.8+d.length;const w=h?1+Math.sin(n*4)*.15:1+Math.sin(n*2)*.06;p.scale.setScalar(w);const y=p.material;y.emissiveIntensity=h?3.5+Math.sin(n*5)*.8:1.8+Math.sin(n*2)*.3}if((x=p.userData)!=null&&x.isOrbGlow&&(p.material.opacity=h?.42+Math.sin(n*3)*.15:.18+Math.sin(n*1.5)*.06),(M=p.userData)!=null&&M.isOrbRing&&(p.rotation.z=n*1.2+d.length*.3,p.rotation.x=Math.PI/3+Math.sin(n*.5)*.2,p.material.opacity=h?.8:.45),(S=p.userData)!=null&&S.isOrbLight){const w=p;w.intensity=h?1.4+Math.sin(n*4)*.4:.6+Math.sin(n*2)*.1}if((T=p.userData)!=null&&T.isWordSprite){const w=p;w.material.opacity=h?1:.72+Math.sin(n*1.2)*.12}})}for(const[d,u]of this.nodeGroups){const h=((f=this.nearNode)==null?void 0:f.id)===d;u.traverse(m=>{var p,g,x,M;const _=m;if((p=_.userData)!=null&&p.isSignpost&&(_.visible=!h),(g=_.userData)!=null&&g.isCrystal&&(_.userData.baseY===void 0&&(_.userData.baseY=_.position.y),_.rotation.y=n*.6+d.length*.3,_.position.y=_.userData.baseY+Math.sin(n*1.8+d.length)*(h?.28:.15)),(x=_.userData)!=null&&x.isPulse){const S=1+Math.sin(n*3)*.08;_.scale.set(S,S,S),_.material.opacity=.35+Math.sin(n*3)*.2}(M=_.userData)!=null&&M.isDueRing&&(_.material.opacity=.28+Math.sin(n*2.4+d.length)*.18)})}const o=this.player.position.x,i=this.player.position.z;for(const d of this.waterMeshes){d.userData.baseY===void 0&&(d.userData.baseY=d.position.y);const u=d.userData.baseOpacity??.68;d.position.x-o,d.position.z-i,d.position.y=d.userData.baseY+Math.sin(n*.9+d.position.x*.03)*.04,d.material.opacity=u+Math.sin(n*.7)*Math.min(.08,u*.12)}El.value=n;const s=this.qcfg.reflectDist*this.qcfg.reflectDist;for(const d of this.reflectors){const u=d.position.x-o,h=d.position.z-i;d.visible=u*u+h*h<s}}}export{gx as World3D};
