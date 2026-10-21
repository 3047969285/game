var ns=Object.defineProperty;var is=(e,n,t)=>n in e?ns(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var Ut=(e,n,t)=>is(e,typeof n!="symbol"?n+"":n,t);import{U as kt,bs as rs,bt as Wt,S as cn,r as ze,M as vt,bu as as,bv as Je,bw as We,a8 as Mt,bx as Sr,aJ as Za,by as xr,aZ as Xt,b2 as tt,K as jt,a_ as ln,D as yt,al as Ct,aD as bn,V as ae,bz as os,bg as Kn,a as _n,av as rn,b1 as ss,c as Kt,aY as rr,b3 as Qe,bA as cs,ab as zn,bB as ls,bC as Ai,a2 as St,H as zt,bh as Mn,bD as Rn,bi as qn,bE as mn,bF as fs,aT as $a,bG as Cn,L as mt,aU as Yn,bH as jn,bI as wn,j as Ln,d as Tn,bJ as us,N as xn,bK as Er,bL as ds,bM as ps,bb as yn,bN as hs,bO as ms,bP as _s,bQ as gs,bR as vs,bS as Ss,bT as xs,bU as Es,bd as Ms,be as Ts,bV as As,bW as bs,bX as Rs,bY as Cs,bc as ws,bZ as Qa,J as pi,b_ as oi,b$ as Bn,c0 as Ja,bj as Zt,c1 as Ls,c2 as Ps,c3 as ar,c4 as ys,c5 as or,c6 as Is,c7 as Us,c8 as Ds,c9 as He,aH as Ns,aB as Fs,aV as Os,ak as Qt,b as sn,ac as si,ad as Bs,a$ as $t,ca as Gn,cb as an,cc as Gs,cd as eo,ce as to,cf as no,cg as hi,ch as io,ci as ro,cj as ao,P as sr,ck as vi,cl as Ft,cm as Hs,cn as Vs,co as ks,cp as zs,cq as oo,cr as Ws,cs as Xs,bm as Ks,ct as bi,cu as Ri,cv as Ci,cw as wi,cx as Mr,cy as Tr,cz as Ar,cA as br,cB as Rr,cC as Cr,cD as wr,cE as Lr,cF as Pr,cG as Xi,cH as yr,cI as Ir,cJ as Ur,cK as Dr,cL as Nr,cM as Fr,cN as Or,cO as Br,cP as Gr,cQ as Hr,cR as Vr,cS as kr,cT as zr,cU as Wr,cV as Xr,cW as Kr,cX as qr,cY as Yr,cZ as jr,c_ as Zr,c$ as Ki,d0 as $r,d1 as qs,d2 as Ys,d3 as js,d4 as Zs,d5 as $s,d6 as Qs,d7 as Js,d8 as ec,d9 as Qr,da as tc,ay as ci,bf as nc,db as Jr,dc as ea,$ as ta,F as so,aE as ic,dd as na,de as rc,df as co,dg as qi,dh as lo,di as ac,b9 as fo,b8 as uo,ae as po,b7 as ho,b6 as mo,b5 as _o,b4 as go,dj as ia,dk as vo,dl as Li,dm as Pi,aW as oc,aX as cr,dn as ra,dp as Et,dq as sc,dr as cc,ds as lc,dt as fc,du as uc,dv as dc,dw as mi,dx as pc,dy as hc,dz as mc,dA as _c,dB as Yi,dC as So,dD as gc,dE as Wn,dF as xo,aF as qt,h as vc,n as Sc,ar as xc,t as Ec,Q as Tt,bo as Mc,a0 as Eo,dG as Tc,dH as Ac,dI as bc,ao as Rc,dJ as yi,dK as Cc,f as Si,dL as wc,br as lr,dM as Lc,dN as Pc,dO as yc,an as Ic,G as li,o as Mo,bq as To,dP as Uc,bp as Hn,dQ as Dc,dR as Ao,dS as Nc,dT as aa,dU as oa,dV as sa,dW as Fc,e as bo,az as Oc,_ as Bc,g as Gc,Z as Hc,Y as Vc,E as kc,C as zc}from"./index-Cy_oy2o-.js";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ro(){let e=null,n=!1,t=null,i=null;function a(r,o){t(r,o),i=e.requestAnimationFrame(a)}return{start:function(){n!==!0&&t!==null&&e!==null&&(i=e.requestAnimationFrame(a),n=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(r){t=r},setContext:function(r){e=r}}}function Wc(e){const n=new WeakMap;function t(s,c){const l=s.array,d=s.usage,u=l.byteLength,f=e.createBuffer();e.bindBuffer(c,f),e.bufferData(c,l,d),s.onUploadCallback();let _;if(l instanceof Float32Array)_=e.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)_=e.HALF_FLOAT;else if(l instanceof Uint16Array)s.isFloat16BufferAttribute?_=e.HALF_FLOAT:_=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)_=e.SHORT;else if(l instanceof Uint32Array)_=e.UNSIGNED_INT;else if(l instanceof Int32Array)_=e.INT;else if(l instanceof Int8Array)_=e.BYTE;else if(l instanceof Uint8Array)_=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)_=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:_,bytesPerElement:l.BYTES_PER_ELEMENT,version:s.version,size:u}}function i(s,c,l){const d=c.array,u=c.updateRanges;if(e.bindBuffer(l,s),u.length===0)e.bufferSubData(l,0,d);else{u.sort((_,E)=>_.start-E.start);let f=0;for(let _=1;_<u.length;_++){const E=u[f],T=u[_];T.start<=E.start+E.count+1?E.count=Math.max(E.count,T.start+T.count-E.start):(++f,u[f]=T)}u.length=f+1;for(let _=0,E=u.length;_<E;_++){const T=u[_];e.bufferSubData(l,T.start*d.BYTES_PER_ELEMENT,d,T.start,T.count)}c.clearUpdateRanges()}c.onUploadCallback()}function a(s){return s.isInterleavedBufferAttribute&&(s=s.data),n.get(s)}function r(s){s.isInterleavedBufferAttribute&&(s=s.data);const c=n.get(s);c&&(e.deleteBuffer(c.buffer),n.delete(s))}function o(s,c){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){const d=n.get(s);(!d||d.version<s.version)&&n.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}const l=n.get(s);if(l===void 0)n.set(s,t(s,c));else if(l.version<s.version){if(l.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,s,c),l.version=s.version}}return{get:a,remove:r,update:o}}var Xc=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kc=`#ifdef USE_ALPHAHASH
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
#endif`,qc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jc=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zc=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$c=`#ifdef USE_AOMAP
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
#endif`,Qc=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Jc=`#ifdef USE_BATCHING
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
#endif`,el=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tl=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nl=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,il=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,rl=`#ifdef USE_IRIDESCENCE
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
#endif`,al=`#ifdef USE_BUMPMAP
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
#endif`,ol=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,sl=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cl=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ll=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ul=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,dl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,pl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,hl=`#define PI 3.141592653589793
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
} // validated`,ml=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,_l=`vec3 transformedNormal = objectNormal;
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
#endif`,gl=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vl=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sl=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xl=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,El="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ml=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Tl=`#ifdef USE_ENVMAP
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
#endif`,Al=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,bl=`#ifdef USE_ENVMAP
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
#endif`,Rl=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cl=`#ifdef USE_ENVMAP
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
#endif`,wl=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ll=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pl=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yl=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Il=`#ifdef USE_GRADIENTMAP
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
}`,Ul=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dl=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Nl=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fl=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Ol=`#ifdef USE_ENVMAP
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
#endif`,Bl=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gl=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hl=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vl=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,kl=`PhysicalMaterial material;
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
#endif`,zl=`uniform sampler2D dfgLUT;
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
}`,Wl=`
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
#endif`,Xl=`#if defined( RE_IndirectDiffuse )
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
#endif`,Kl=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ql=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Yl=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jl=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zl=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$l=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ql=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jl=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ef=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tf=`#if defined( USE_POINTS_UV )
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
#endif`,nf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,af=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,of=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cf=`#ifdef USE_MORPHTARGETS
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
#endif`,lf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ff=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,uf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,df=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mf=`#ifdef USE_NORMALMAP
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
#endif`,_f=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ef=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Mf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Af=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,yf=`float getShadowMask() {
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
}`,If=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Uf=`#ifdef USE_SKINNING
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
#endif`,Df=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Nf=`#ifdef USE_SKINNING
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
#endif`,Ff=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Of=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hf=`#ifdef USE_TRANSMISSION
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
#endif`,Vf=`#ifdef USE_TRANSMISSION
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
#endif`,kf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Kf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qf=`uniform sampler2D t2D;
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
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$f=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qf=`#include <common>
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
}`,Jf=`#if DEPTH_PACKING == 3200
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
}`,eu=`#define DISTANCE
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
}`,tu=`#define DISTANCE
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
}`,nu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,iu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ru=`uniform float scale;
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
}`,au=`uniform vec3 diffuse;
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
}`,ou=`#include <common>
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
}`,su=`uniform vec3 diffuse;
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
}`,cu=`#define LAMBERT
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
}`,lu=`#define LAMBERT
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
}`,fu=`#define MATCAP
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
}`,uu=`#define MATCAP
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
}`,du=`#define NORMAL
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
}`,pu=`#define NORMAL
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
}`,hu=`#define PHONG
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
}`,mu=`#define PHONG
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
}`,_u=`#define STANDARD
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
}`,gu=`#define STANDARD
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
}`,vu=`#define TOON
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
}`,Su=`#define TOON
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
}`,xu=`uniform float size;
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
}`,Eu=`uniform vec3 diffuse;
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
}`,Mu=`#include <common>
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
}`,Tu=`uniform vec3 color;
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
}`,Au=`uniform float rotation;
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
}`,bu=`uniform vec3 diffuse;
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
}`,Ue={alphahash_fragment:Xc,alphahash_pars_fragment:Kc,alphamap_fragment:qc,alphamap_pars_fragment:Yc,alphatest_fragment:jc,alphatest_pars_fragment:Zc,aomap_fragment:$c,aomap_pars_fragment:Qc,batching_pars_vertex:Jc,batching_vertex:el,begin_vertex:tl,beginnormal_vertex:nl,bsdfs:il,iridescence_fragment:rl,bumpmap_pars_fragment:al,clipping_planes_fragment:ol,clipping_planes_pars_fragment:sl,clipping_planes_pars_vertex:cl,clipping_planes_vertex:ll,color_fragment:fl,color_pars_fragment:ul,color_pars_vertex:dl,color_vertex:pl,common:hl,cube_uv_reflection_fragment:ml,defaultnormal_vertex:_l,displacementmap_pars_vertex:gl,displacementmap_vertex:vl,emissivemap_fragment:Sl,emissivemap_pars_fragment:xl,colorspace_fragment:El,colorspace_pars_fragment:Ml,envmap_fragment:Tl,envmap_common_pars_fragment:Al,envmap_pars_fragment:bl,envmap_pars_vertex:Rl,envmap_physical_pars_fragment:Ol,envmap_vertex:Cl,fog_vertex:wl,fog_pars_vertex:Ll,fog_fragment:Pl,fog_pars_fragment:yl,gradientmap_pars_fragment:Il,lightmap_pars_fragment:Ul,lights_lambert_fragment:Dl,lights_lambert_pars_fragment:Nl,lights_pars_begin:Fl,lights_toon_fragment:Bl,lights_toon_pars_fragment:Gl,lights_phong_fragment:Hl,lights_phong_pars_fragment:Vl,lights_physical_fragment:kl,lights_physical_pars_fragment:zl,lights_fragment_begin:Wl,lights_fragment_maps:Xl,lights_fragment_end:Kl,lightprobes_pars_fragment:ql,logdepthbuf_fragment:Yl,logdepthbuf_pars_fragment:jl,logdepthbuf_pars_vertex:Zl,logdepthbuf_vertex:$l,map_fragment:Ql,map_pars_fragment:Jl,map_particle_fragment:ef,map_particle_pars_fragment:tf,metalnessmap_fragment:nf,metalnessmap_pars_fragment:rf,morphinstance_vertex:af,morphcolor_vertex:of,morphnormal_vertex:sf,morphtarget_pars_vertex:cf,morphtarget_vertex:lf,normal_fragment_begin:ff,normal_fragment_maps:uf,normal_pars_fragment:df,normal_pars_vertex:pf,normal_vertex:hf,normalmap_pars_fragment:mf,clearcoat_normal_fragment_begin:_f,clearcoat_normal_fragment_maps:gf,clearcoat_pars_fragment:vf,iridescence_pars_fragment:Sf,opaque_fragment:xf,packing:Ef,premultiplied_alpha_fragment:Mf,project_vertex:Tf,dithering_fragment:Af,dithering_pars_fragment:bf,roughnessmap_fragment:Rf,roughnessmap_pars_fragment:Cf,shadowmap_pars_fragment:wf,shadowmap_pars_vertex:Lf,shadowmap_vertex:Pf,shadowmask_pars_fragment:yf,skinbase_vertex:If,skinning_pars_vertex:Uf,skinning_vertex:Df,skinnormal_vertex:Nf,specularmap_fragment:Ff,specularmap_pars_fragment:Of,tonemapping_fragment:Bf,tonemapping_pars_fragment:Gf,transmission_fragment:Hf,transmission_pars_fragment:Vf,uv_pars_fragment:kf,uv_pars_vertex:zf,uv_vertex:Wf,worldpos_vertex:Xf,background_vert:Kf,background_frag:qf,backgroundCube_vert:Yf,backgroundCube_frag:jf,cube_vert:Zf,cube_frag:$f,depth_vert:Qf,depth_frag:Jf,distance_vert:eu,distance_frag:tu,equirect_vert:nu,equirect_frag:iu,linedashed_vert:ru,linedashed_frag:au,meshbasic_vert:ou,meshbasic_frag:su,meshlambert_vert:cu,meshlambert_frag:lu,meshmatcap_vert:fu,meshmatcap_frag:uu,meshnormal_vert:du,meshnormal_frag:pu,meshphong_vert:hu,meshphong_frag:mu,meshphysical_vert:_u,meshphysical_frag:gu,meshtoon_vert:vu,meshtoon_frag:Su,points_vert:xu,points_frag:Eu,shadow_vert:Mu,shadow_frag:Tu,sprite_vert:Au,sprite_frag:bu},ue={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new St(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ae},probesMax:{value:new ae},probesResolution:{value:new ae}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new St(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Vt={basic:{uniforms:Et([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:Et([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new ze(0)},envMapIntensity:{value:1}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:Et([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:Et([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:Et([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:Et([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:Et([ue.points,ue.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:Et([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:Et([ue.common,ue.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:Et([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:Et([ue.sprite,ue.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distance:{uniforms:Et([ue.common,ue.displacementmap,{referencePosition:{value:new ae},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distance_vert,fragmentShader:Ue.distance_frag},shadow:{uniforms:Et([ue.lights,ue.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};Vt.physical={uniforms:Et([Vt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new St(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new St},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new St},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const Qn={r:0,b:0,g:0},Ru=new vt,Co=new He;Co.set(-1,0,0,0,1,0,0,0,1);function Cu(e,n,t,i,a,r){const o=new ze(0);let s=a===!0?0:1,c,l,d=null,u=0,f=null;function _(S){let b=S.isScene===!0?S.background:null;if(b&&b.isTexture){const C=S.backgroundBlurriness>0;b=n.get(b,C)}return b}function E(S){let b=!1;const C=_(S);C===null?p(o,s):C&&C.isColor&&(p(C,1),b=!0);const w=e.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(e.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function T(S,b){const C=_(b);C&&(C.isCubeTexture||C.mapping===vi)?(l===void 0&&(l=new Kt(new Ln(1,1,1),new Qt({name:"BackgroundCubeMaterial",uniforms:qi(Vt.backgroundCube.uniforms),vertexShader:Vt.backgroundCube.vertexShader,fragmentShader:Vt.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,A,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=C,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ru.makeRotationFromEuler(b.backgroundRotation)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Co),l.material.toneMapped=tt.getTransfer(C.colorSpace)!==Qe,(d!==C||u!==C.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,d=C,u=C.version,f=e.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new Kt(new sr(2,2),new Qt({name:"BackgroundMaterial",uniforms:qi(Vt.background.uniforms),vertexShader:Vt.background.vertexShader,fragmentShader:Vt.background.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=tt.getTransfer(C.colorSpace)!==Qe,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||u!==C.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,d=C,u=C.version,f=e.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,b){S.getRGB(Qn,co(e)),t.buffers.color.setClear(Qn.r,Qn.g,Qn.b,b,r)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,b=1){o.set(S),s=b,p(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(S){s=S,p(o,s)},render:E,addToRenderList:T,dispose:h}}function wu(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=f(null);let r=a,o=!1;function s(R,F,B,z,N){let I=!1;const H=u(R,z,B,F);r!==H&&(r=H,l(r.object)),I=_(R,z,B,N),I&&E(R,z,B,N),N!==null&&n.update(N,e.ELEMENT_ARRAY_BUFFER),(I||o)&&(o=!1,C(R,F,B,z),N!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(N).buffer))}function c(){return e.createVertexArray()}function l(R){return e.bindVertexArray(R)}function d(R){return e.deleteVertexArray(R)}function u(R,F,B,z){const N=z.wireframe===!0;let I=i[F.id];I===void 0&&(I={},i[F.id]=I);const H=R.isInstancedMesh===!0?R.id:0;let k=I[H];k===void 0&&(k={},I[H]=k);let K=k[B.id];K===void 0&&(K={},k[B.id]=K);let re=K[N];return re===void 0&&(re=f(c()),K[N]=re),re}function f(R){const F=[],B=[],z=[];for(let N=0;N<t;N++)F[N]=0,B[N]=0,z[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:B,attributeDivisors:z,object:R,attributes:{},index:null}}function _(R,F,B,z){const N=r.attributes,I=F.attributes;let H=0;const k=B.getAttributes();for(const K in k)if(k[K].location>=0){const he=N[K];let J=I[K];if(J===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(J=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(J=R.instanceColor)),he===void 0||he.attribute!==J||J&&he.data!==J.data)return!0;H++}return r.attributesNum!==H||r.index!==z}function E(R,F,B,z){const N={},I=F.attributes;let H=0;const k=B.getAttributes();for(const K in k)if(k[K].location>=0){let he=I[K];he===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(he=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(he=R.instanceColor));const J={};J.attribute=he,he&&he.data&&(J.data=he.data),N[K]=J,H++}r.attributes=N,r.attributesNum=H,r.index=z}function T(){const R=r.newAttributes;for(let F=0,B=R.length;F<B;F++)R[F]=0}function p(R){h(R,0)}function h(R,F){const B=r.newAttributes,z=r.enabledAttributes,N=r.attributeDivisors;B[R]=1,z[R]===0&&(e.enableVertexAttribArray(R),z[R]=1),N[R]!==F&&(e.vertexAttribDivisor(R,F),N[R]=F)}function S(){const R=r.newAttributes,F=r.enabledAttributes;for(let B=0,z=F.length;B<z;B++)F[B]!==R[B]&&(e.disableVertexAttribArray(B),F[B]=0)}function b(R,F,B,z,N,I,H){H===!0?e.vertexAttribIPointer(R,F,B,N,I):e.vertexAttribPointer(R,F,B,z,N,I)}function C(R,F,B,z){T();const N=z.attributes,I=B.getAttributes(),H=F.defaultAttributeValues;for(const k in I){const K=I[k];if(K.location>=0){let re=N[k];if(re===void 0&&(k==="instanceMatrix"&&R.instanceMatrix&&(re=R.instanceMatrix),k==="instanceColor"&&R.instanceColor&&(re=R.instanceColor)),re!==void 0){const he=re.normalized,J=re.itemSize,Ae=n.get(re);if(Ae===void 0)continue;const Ne=Ae.buffer,Ce=Ae.type,Y=Ae.bytesPerElement,le=Ce===e.INT||Ce===e.UNSIGNED_INT||re.gpuType===oo;if(re.isInterleavedBufferAttribute){const ee=re.data,be=ee.stride,we=re.offset;if(ee.isInstancedInterleavedBuffer){for(let Re=0;Re<K.locationSize;Re++)h(K.location+Re,ee.meshPerAttribute);R.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Re=0;Re<K.locationSize;Re++)p(K.location+Re);e.bindBuffer(e.ARRAY_BUFFER,Ne);for(let Re=0;Re<K.locationSize;Re++)b(K.location+Re,J/K.locationSize,Ce,he,be*Y,(we+J/K.locationSize*Re)*Y,le)}else{if(re.isInstancedBufferAttribute){for(let ee=0;ee<K.locationSize;ee++)h(K.location+ee,re.meshPerAttribute);R.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ee=0;ee<K.locationSize;ee++)p(K.location+ee);e.bindBuffer(e.ARRAY_BUFFER,Ne);for(let ee=0;ee<K.locationSize;ee++)b(K.location+ee,J/K.locationSize,Ce,he,J*Y,J/K.locationSize*ee*Y,le)}}else if(H!==void 0){const he=H[k];if(he!==void 0)switch(he.length){case 2:e.vertexAttrib2fv(K.location,he);break;case 3:e.vertexAttrib3fv(K.location,he);break;case 4:e.vertexAttrib4fv(K.location,he);break;default:e.vertexAttrib1fv(K.location,he)}}}}S()}function w(){M();for(const R in i){const F=i[R];for(const B in F){const z=F[B];for(const N in z){const I=z[N];for(const H in I)d(I[H].object),delete I[H];delete z[N]}}delete i[R]}}function A(R){if(i[R.id]===void 0)return;const F=i[R.id];for(const B in F){const z=F[B];for(const N in z){const I=z[N];for(const H in I)d(I[H].object),delete I[H];delete z[N]}}delete i[R.id]}function L(R){for(const F in i){const B=i[F];for(const z in B){const N=B[z];if(N[R.id]===void 0)continue;const I=N[R.id];for(const H in I)d(I[H].object),delete I[H];delete N[R.id]}}}function v(R){for(const F in i){const B=i[F],z=R.isInstancedMesh===!0?R.id:0,N=B[z];if(N!==void 0){for(const I in N){const H=N[I];for(const k in H)d(H[k].object),delete H[k];delete N[I]}delete B[z],Object.keys(B).length===0&&delete i[F]}}}function M(){P(),o=!0,r!==a&&(r=a,l(r.object))}function P(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:s,reset:M,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:L,initAttributes:T,enableAttribute:p,disableUnusedAttributes:S}}function Lu(e,n,t){let i;function a(c){i=c}function r(c,l){e.drawArrays(i,c,l),t.update(l,i,1)}function o(c,l,d){d!==0&&(e.drawArraysInstanced(i,c,l,d),t.update(l,i,d))}function s(c,l,d){if(d===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,d);let f=0;for(let _=0;_<d;_++)f+=l[_];t.update(f,i,1)}this.setMode=a,this.render=r,this.renderInstances=o,this.renderMultiDraw=s}function Pu(e,n,t,i){let a;function r(){if(a!==void 0)return a;if(n.has("EXT_texture_filter_anisotropic")===!0){const L=n.get("EXT_texture_filter_anisotropic");a=e.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function o(L){return!(L!==zt&&i.convert(L)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(L){const v=L===ln&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(L!==kt&&i.convert(L)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==an&&!v)}function c(L){if(L==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(We("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&We("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const _=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),E=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=e.getParameter(e.MAX_TEXTURE_SIZE),p=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),h=e.getParameter(e.MAX_VERTEX_ATTRIBS),S=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),b=e.getParameter(e.MAX_VARYING_VECTORS),C=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),w=e.getParameter(e.MAX_SAMPLES),A=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:_,maxVertexTextures:E,maxTextureSize:T,maxCubemapSize:p,maxAttributes:h,maxVertexUniforms:S,maxVaryings:b,maxFragmentUniforms:C,maxSamples:w,samples:A}}function yu(e){const n=this;let t=null,i=0,a=!1,r=!1;const o=new Ns,s=new He,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const _=u.length!==0||f||i!==0||a;return a=f,i=u.length,_},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=d(u,f,0)},this.setState=function(u,f,_){const E=u.clippingPlanes,T=u.clipIntersection,p=u.clipShadows,h=e.get(u);if(!a||E===null||E.length===0||r&&!p)r?d(null):l();else{const S=r?0:i,b=S*4;let C=h.clippingState||null;c.value=C,C=d(E,f,b,_);for(let w=0;w!==b;++w)C[w]=t[w];h.clippingState=C,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function d(u,f,_,E){const T=u!==null?u.length:0;let p=null;if(T!==0){if(p=c.value,E!==!0||p===null){const h=_+T*4,S=f.matrixWorldInverse;s.getNormalMatrix(S),(p===null||p.length<h)&&(p=new Float32Array(h));for(let b=0,C=_;b!==T;++b,C+=4)o.copy(u[b]).applyMatrix4(S,s),o.normal.toArray(p,C),p[C+3]=o.constant}c.value=p,c.needsUpdate=!0}return n.numPlanes=T,n.numIntersection=0,p}}const on=4,ca=[.125,.215,.35,.446,.526,.582],hn=20,Iu=256,In=new rr,la=new ze;let Ii=null,Ui=0,Di=0,Ni=!1;const Uu=new ae;class fa{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(n,t=0,i=.1,a=100,r={}){const{size:o=256,position:s=Uu}=r;Ii=this._renderer.getRenderTarget(),Ui=this._renderer.getActiveCubeFace(),Di=this._renderer.getActiveMipmapLevel(),Ni=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(n,i,a,c,s),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=da(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodMeshes.length;n++)this._lodMeshes[n].geometry.dispose()}_cleanup(n){this._renderer.setRenderTarget(Ii,Ui,Di),this._renderer.xr.enabled=Ni,n.scissorTest=!1,Sn(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===jn||n.mapping===wn?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),Ii=this._renderer.getRenderTarget(),Ui=this._renderer.getActiveCubeFace(),Di=this._renderer.getActiveMipmapLevel(),Ni=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:mt,minFilter:mt,generateMipmaps:!1,type:ln,format:zt,colorSpace:Ft,depthBuffer:!1},a=ua(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ua(n,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Du(r)),this._blurMaterial=Fu(r,n,t),this._ggxMaterial=Nu(r,n,t)}return a}_compileMaterial(n){const t=new Kt(new _n,n);this._renderer.compile(t,In)}_sceneToCubeUV(n,t,i,a,r){const c=new zn(90,1,t,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,_=u.toneMapping;u.getClearColor(la),u.toneMapping=Wt,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(a),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Kt(new Ln,new Tn({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1})));const T=this._backgroundBox,p=T.material;let h=!1;const S=n.background;S?S.isColor&&(p.color.copy(S),n.background=null,h=!0):(p.color.copy(la),h=!0);for(let b=0;b<6;b++){const C=b%3;C===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+d[b],r.y,r.z)):C===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+d[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+d[b]));const w=this._cubeSize;Sn(a,C*w,b>2?w:0,w,w),u.setRenderTarget(a),h&&u.render(T,c),u.render(n,c)}u.toneMapping=_,u.autoClear=f,n.background=S}_textureToCubeUV(n,t){const i=this._renderer,a=n.mapping===jn||n.mapping===wn;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=pa()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=da());const r=a?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const s=r.uniforms;s.envMap.value=n;const c=this._cubeSize;Sn(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,In)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const a=this._lodMeshes.length;for(let r=1;r<a;r++)this._applyGGXFilter(n,r-1,r);t.autoClear=i}_applyGGXFilter(n,t,i){const a=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,s=this._lodMeshes[i];s.material=o;const c=o.uniforms,l=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-d*d),f=0+l*1.25,_=u*f,{_lodMax:E}=this,T=this._sizeLods[i],p=3*T*(i>E-on?i-E+on:0),h=4*(this._cubeSize-T);c.envMap.value=n.texture,c.roughness.value=_,c.mipInt.value=E-t,Sn(r,p,h,3*T,2*T),a.setRenderTarget(r),a.render(s,In),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=E-i,Sn(n,p,h,3*T,2*T),a.setRenderTarget(n),a.render(s,In)}_blur(n,t,i,a,r){const o=this._pingPongRenderTarget;this._halfBlur(n,o,t,i,a,"latitudinal",r),this._halfBlur(o,n,i,i,a,"longitudinal",r)}_halfBlur(n,t,i,a,r,o,s){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Je("blur direction must be either latitudinal or longitudinal!");const d=3,u=this._lodMeshes[a];u.material=l;const f=l.uniforms,_=this._sizeLods[i]-1,E=isFinite(r)?Math.PI/(2*_):2*Math.PI/(2*hn-1),T=r/E,p=isFinite(r)?1+Math.floor(d*T):hn;p>hn&&We(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${hn}`);const h=[];let S=0;for(let L=0;L<hn;++L){const v=L/T,M=Math.exp(-v*v/2);h.push(M),L===0?S+=M:L<p&&(S+=2*M)}for(let L=0;L<h.length;L++)h[L]=h[L]/S;f.envMap.value=n.texture,f.samples.value=p,f.weights.value=h,f.latitudinal.value=o==="latitudinal",s&&(f.poleAxis.value=s);const{_lodMax:b}=this;f.dTheta.value=E,f.mipInt.value=b-i;const C=this._sizeLods[a],w=3*C*(a>b-on?a-b+on:0),A=4*(this._cubeSize-C);Sn(t,w,A,3*C,2*C),c.setRenderTarget(t),c.render(u,In)}}function Du(e){const n=[],t=[],i=[];let a=e;const r=e-on+1+ca.length;for(let o=0;o<r;o++){const s=Math.pow(2,a);n.push(s);let c=1/s;o>e-on?c=ca[o-e+on-1]:o===0&&(c=0),t.push(c);const l=1/(s-2),d=-l,u=1+l,f=[d,d,u,d,u,u,d,d,u,u,d,u],_=6,E=6,T=3,p=2,h=1,S=new Float32Array(T*E*_),b=new Float32Array(p*E*_),C=new Float32Array(h*E*_);for(let A=0;A<_;A++){const L=A%3*2/3-1,v=A>2?0:-1,M=[L,v,0,L+2/3,v,0,L+2/3,v+1,0,L,v,0,L+2/3,v+1,0,L,v+1,0];S.set(M,T*E*A),b.set(f,p*E*A);const P=[A,A,A,A,A,A];C.set(P,h*E*A)}const w=new _n;w.setAttribute("position",new sn(S,T)),w.setAttribute("uv",new sn(b,p)),w.setAttribute("faceIndex",new sn(C,h)),i.push(new Kt(w,null)),a>on&&a--}return{lodMeshes:i,sizeLods:n,sigmas:t}}function ua(e,n,t){const i=new Xt(e,n,t);return i.texture.mapping=vi,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Sn(e,n,t,i,a){e.viewport.set(n,t,i,a),e.scissor.set(n,t,i,a)}function Nu(e,n,t){return new Qt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Iu,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xi(),fragmentShader:`

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
		`,blending:$t,depthTest:!1,depthWrite:!1})}function Fu(e,n,t){const i=new Float32Array(hn),a=new ae(0,1,0);return new Qt({name:"SphericalGaussianBlur",defines:{n:hn,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:xi(),fragmentShader:`

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
		`,blending:$t,depthTest:!1,depthWrite:!1})}function da(){return new Qt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xi(),fragmentShader:`

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
		`,blending:$t,depthTest:!1,depthWrite:!1})}function pa(){return new Qt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xi(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$t,depthTest:!1,depthWrite:!1})}function xi(){return`

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
	`}class wo extends Xt{constructor(n=1,t={}){super(n,n,t),this.isWebGLCubeRenderTarget=!0;const i={width:n,height:n,depth:1},a=[i,i,i,i,i,i];this.texture=new lo(a),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(n,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new Ln(5,5,5),r=new Qt({name:"CubemapFromEquirect",uniforms:qi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ct,blending:$t});r.uniforms.tEquirect.value=t;const o=new Kt(a,r),s=t.minFilter;return t.minFilter===jt&&(t.minFilter=mt),new ac(1,10,this).update(n,o),t.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(n,t=!0,i=!0,a=!0){const r=n.getRenderTarget();for(let o=0;o<6;o++)n.setRenderTarget(this,o),n.clear(t,i,a);n.setRenderTarget(r)}}function Ou(e){let n=new WeakMap,t=new WeakMap,i=null;function a(f,_=!1){return f==null?null:_?o(f):r(f)}function r(f){if(f&&f.isTexture){const _=f.mapping;if(_===Li||_===Pi)if(n.has(f)){const E=n.get(f).texture;return s(E,f.mapping)}else{const E=f.image;if(E&&E.height>0){const T=new wo(E.height);return T.fromEquirectangularTexture(e,f),n.set(f,T),f.addEventListener("dispose",l),s(T.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const _=f.mapping,E=_===Li||_===Pi,T=_===jn||_===wn;if(E||T){let p=t.get(f);const h=p!==void 0?p.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==h)return i===null&&(i=new fa(e)),p=E?i.fromEquirectangular(f,p):i.fromCubemap(f,p),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),p.texture;if(p!==void 0)return p.texture;{const S=f.image;return E&&S&&S.height>0||T&&S&&c(S)?(i===null&&(i=new fa(e)),p=E?i.fromEquirectangular(f):i.fromCubemap(f),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),f.addEventListener("dispose",d),p.texture):null}}}return f}function s(f,_){return _===Li?f.mapping=jn:_===Pi&&(f.mapping=wn),f}function c(f){let _=0;const E=6;for(let T=0;T<E;T++)f[T]!==void 0&&_++;return _===E}function l(f){const _=f.target;_.removeEventListener("dispose",l);const E=n.get(_);E!==void 0&&(n.delete(_),E.dispose())}function d(f){const _=f.target;_.removeEventListener("dispose",d);const E=t.get(_);E!==void 0&&(t.delete(_),E.dispose())}function u(){n=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:u}}function Bu(e){const n={};function t(i){if(n[i]!==void 0)return n[i];const a=e.getExtension(i);return n[i]=a,a}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const a=t(i);return a===null&&us("WebGLRenderer: "+i+" extension not supported."),a}}}function Gu(e,n,t,i){const a={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&n.remove(f.index);for(const E in f.attributes)n.remove(f.attributes[E]);f.removeEventListener("dispose",o),delete a[f.id];const _=r.get(f);_&&(n.remove(_),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function s(u,f){return a[f.id]===!0||(f.addEventListener("dispose",o),a[f.id]=!0,t.memory.geometries++),f}function c(u){const f=u.attributes;for(const _ in f)n.update(f[_],e.ARRAY_BUFFER)}function l(u){const f=[],_=u.index,E=u.attributes.position;let T=0;if(E===void 0)return;if(_!==null){const S=_.array;T=_.version;for(let b=0,C=S.length;b<C;b+=3){const w=S[b+0],A=S[b+1],L=S[b+2];f.push(w,A,A,L,L,w)}}else{const S=E.array;T=E.version;for(let b=0,C=S.length/3-1;b<C;b+=3){const w=b+0,A=b+1,L=b+2;f.push(w,A,A,L,L,w)}}const p=new(E.count>=65535?oc:cr)(f,1);p.version=T;const h=r.get(u);h&&n.remove(h),r.set(u,p)}function d(u){const f=r.get(u);if(f){const _=u.index;_!==null&&f.version<_.version&&l(u)}else l(u);return r.get(u)}return{get:s,update:c,getWireframeAttribute:d}}function Hu(e,n,t){let i;function a(u){i=u}let r,o;function s(u){r=u.type,o=u.bytesPerElement}function c(u,f){e.drawElements(i,f,r,u*o),t.update(f,i,1)}function l(u,f,_){_!==0&&(e.drawElementsInstanced(i,f,r,u*o,_),t.update(f,i,_))}function d(u,f,_){if(_===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,u,0,_);let T=0;for(let p=0;p<_;p++)T+=f[p];t.update(T,i,1)}this.setMode=a,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function Vu(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,s){switch(t.calls++,o){case e.TRIANGLES:t.triangles+=s*(r/3);break;case e.LINES:t.lines+=s*(r/2);break;case e.LINE_STRIP:t.lines+=s*(r-1);break;case e.LINE_LOOP:t.lines+=s*r;break;case e.POINTS:t.points+=s*r;break;default:Je("WebGLInfo: Unknown draw mode:",o);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:a,update:i}}function ku(e,n,t){const i=new WeakMap,a=new Mt;function r(o,s,c){const l=o.morphTargetInfluences,d=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,u=d!==void 0?d.length:0;let f=i.get(s);if(f===void 0||f.count!==u){let M=function(){L.dispose(),i.delete(s),s.removeEventListener("dispose",M)};f!==void 0&&f.texture.dispose();const _=s.morphAttributes.position!==void 0,E=s.morphAttributes.normal!==void 0,T=s.morphAttributes.color!==void 0,p=s.morphAttributes.position||[],h=s.morphAttributes.normal||[],S=s.morphAttributes.color||[];let b=0;_===!0&&(b=1),E===!0&&(b=2),T===!0&&(b=3);let C=s.attributes.position.count*b,w=1;C>n.maxTextureSize&&(w=Math.ceil(C/n.maxTextureSize),C=n.maxTextureSize);const A=new Float32Array(C*w*4*u),L=new so(A,C,w,u);L.type=an,L.needsUpdate=!0;const v=b*4;for(let P=0;P<u;P++){const R=p[P],F=h[P],B=S[P],z=C*w*4*P;for(let N=0;N<R.count;N++){const I=N*v;_===!0&&(a.fromBufferAttribute(R,N),A[z+I+0]=a.x,A[z+I+1]=a.y,A[z+I+2]=a.z,A[z+I+3]=0),E===!0&&(a.fromBufferAttribute(F,N),A[z+I+4]=a.x,A[z+I+5]=a.y,A[z+I+6]=a.z,A[z+I+7]=0),T===!0&&(a.fromBufferAttribute(B,N),A[z+I+8]=a.x,A[z+I+9]=a.y,A[z+I+10]=a.z,A[z+I+11]=B.itemSize===4?a.w:1)}}f={count:u,texture:L,size:new St(C,w)},i.set(s,f),s.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(e,"morphTexture",o.morphTexture,t);else{let _=0;for(let T=0;T<l.length;T++)_+=l[T];const E=s.morphTargetsRelative?1:1-_;c.getUniforms().setValue(e,"morphTargetBaseInfluence",E),c.getUniforms().setValue(e,"morphTargetInfluences",l)}c.getUniforms().setValue(e,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(e,"morphTargetsTextureSize",f.size)}return{update:r}}function zu(e,n,t,i,a){let r=new WeakMap;function o(l){const d=a.render.frame,u=l.geometry,f=n.get(l,u);if(r.get(f)!==d&&(n.update(f),r.set(f,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==d&&(t.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,e.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){const _=l.skeleton;r.get(_)!==d&&(_.update(),r.set(_,d))}return f}function s(){r=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:o,dispose:s}}const Wu={[go]:"LINEAR_TONE_MAPPING",[_o]:"REINHARD_TONE_MAPPING",[mo]:"CINEON_TONE_MAPPING",[ho]:"ACES_FILMIC_TONE_MAPPING",[po]:"AGX_TONE_MAPPING",[uo]:"NEUTRAL_TONE_MAPPING",[fo]:"CUSTOM_TONE_MAPPING"};function Xu(e,n,t,i,a){const r=new Xt(n,t,{type:e,depthBuffer:i,stencilBuffer:a,depthTexture:i?new Kn(n,t):void 0}),o=new Xt(n,t,{type:ln,depthBuffer:!1,stencilBuffer:!1}),s=new _n;s.setAttribute("position",new rn([-1,3,0,-1,-1,0,3,-1,0],3)),s.setAttribute("uv",new rn([0,2,0,0,2,0],2));const c=new ss({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new Kt(s,c),d=new rr(-1,1,1,-1,0,1);let u=null,f=null,_=!1,E,T=null,p=[],h=!1;this.setSize=function(S,b){r.setSize(S,b),o.setSize(S,b);for(let C=0;C<p.length;C++){const w=p[C];w.setSize&&w.setSize(S,b)}},this.setEffects=function(S){p=S,h=p.length>0&&p[0].isRenderPass===!0;const b=r.width,C=r.height;for(let w=0;w<p.length;w++){const A=p[w];A.setSize&&A.setSize(b,C)}},this.begin=function(S,b){if(_||S.toneMapping===Wt&&p.length===0)return!1;if(T=b,b!==null){const C=b.width,w=b.height;(r.width!==C||r.height!==w)&&this.setSize(C,w)}return h===!1&&S.setRenderTarget(r),E=S.toneMapping,S.toneMapping=Wt,!0},this.hasRenderPass=function(){return h},this.end=function(S,b){S.toneMapping=E,_=!0;let C=r,w=o;for(let A=0;A<p.length;A++){const L=p[A];if(L.enabled!==!1&&(L.render(S,w,C,b),L.needsSwap!==!1)){const v=C;C=w,w=v}}if(u!==S.outputColorSpace||f!==S.toneMapping){u=S.outputColorSpace,f=S.toneMapping,c.defines={},tt.getTransfer(u)===Qe&&(c.defines.SRGB_TRANSFER="");const A=Wu[f];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=C.texture,S.setRenderTarget(T),S.render(l,d),T=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),s.dispose(),c.dispose()}}const Lo=new mi,ji=new Kn(1,1),Po=new so,yo=new cc,Io=new lo,ha=[],ma=[],_a=new Float32Array(16),ga=new Float32Array(9),va=new Float32Array(4);function Pn(e,n,t){const i=e[0];if(i<=0||i>0)return e;const a=n*t;let r=ha[a];if(r===void 0&&(r=new Float32Array(a),ha[a]=r),n!==0){i.toArray(r,0);for(let o=1,s=0;o!==n;++o)s+=t,e[o].toArray(r,s)}return r}function pt(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function ht(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function Ei(e,n){let t=ma[n];t===void 0&&(t=new Int32Array(n),ma[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Ku(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function qu(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(pt(t,n))return;e.uniform2fv(this.addr,n),ht(t,n)}}function Yu(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(pt(t,n))return;e.uniform3fv(this.addr,n),ht(t,n)}}function ju(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(pt(t,n))return;e.uniform4fv(this.addr,n),ht(t,n)}}function Zu(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(pt(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),ht(t,n)}else{if(pt(t,i))return;va.set(i),e.uniformMatrix2fv(this.addr,!1,va),ht(t,i)}}function $u(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(pt(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),ht(t,n)}else{if(pt(t,i))return;ga.set(i),e.uniformMatrix3fv(this.addr,!1,ga),ht(t,i)}}function Qu(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(pt(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),ht(t,n)}else{if(pt(t,i))return;_a.set(i),e.uniformMatrix4fv(this.addr,!1,_a),ht(t,i)}}function Ju(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function ed(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(pt(t,n))return;e.uniform2iv(this.addr,n),ht(t,n)}}function td(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(pt(t,n))return;e.uniform3iv(this.addr,n),ht(t,n)}}function nd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(pt(t,n))return;e.uniform4iv(this.addr,n),ht(t,n)}}function id(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function rd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(pt(t,n))return;e.uniform2uiv(this.addr,n),ht(t,n)}}function ad(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(pt(t,n))return;e.uniform3uiv(this.addr,n),ht(t,n)}}function od(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(pt(t,n))return;e.uniform4uiv(this.addr,n),ht(t,n)}}function sd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let r;this.type===e.SAMPLER_2D_SHADOW?(ji.compareFunction=t.isReversedDepthBuffer()?ar:or,r=ji):r=Lo,t.setTexture2D(n||r,a)}function cd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTexture3D(n||yo,a)}function ld(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTextureCube(n||Io,a)}function fd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTexture2DArray(n||Po,a)}function ud(e){switch(e){case 5126:return Ku;case 35664:return qu;case 35665:return Yu;case 35666:return ju;case 35674:return Zu;case 35675:return $u;case 35676:return Qu;case 5124:case 35670:return Ju;case 35667:case 35671:return ed;case 35668:case 35672:return td;case 35669:case 35673:return nd;case 5125:return id;case 36294:return rd;case 36295:return ad;case 36296:return od;case 35678:case 36198:case 36298:case 36306:case 35682:return sd;case 35679:case 36299:case 36307:return cd;case 35680:case 36300:case 36308:case 36293:return ld;case 36289:case 36303:case 36311:case 36292:return fd}}function dd(e,n){e.uniform1fv(this.addr,n)}function pd(e,n){const t=Pn(n,this.size,2);e.uniform2fv(this.addr,t)}function hd(e,n){const t=Pn(n,this.size,3);e.uniform3fv(this.addr,t)}function md(e,n){const t=Pn(n,this.size,4);e.uniform4fv(this.addr,t)}function _d(e,n){const t=Pn(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function gd(e,n){const t=Pn(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function vd(e,n){const t=Pn(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function Sd(e,n){e.uniform1iv(this.addr,n)}function xd(e,n){e.uniform2iv(this.addr,n)}function Ed(e,n){e.uniform3iv(this.addr,n)}function Md(e,n){e.uniform4iv(this.addr,n)}function Td(e,n){e.uniform1uiv(this.addr,n)}function Ad(e,n){e.uniform2uiv(this.addr,n)}function bd(e,n){e.uniform3uiv(this.addr,n)}function Rd(e,n){e.uniform4uiv(this.addr,n)}function Cd(e,n,t){const i=this.cache,a=n.length,r=Ei(t,a);pt(i,r)||(e.uniform1iv(this.addr,r),ht(i,r));let o;this.type===e.SAMPLER_2D_SHADOW?o=ji:o=Lo;for(let s=0;s!==a;++s)t.setTexture2D(n[s]||o,r[s])}function wd(e,n,t){const i=this.cache,a=n.length,r=Ei(t,a);pt(i,r)||(e.uniform1iv(this.addr,r),ht(i,r));for(let o=0;o!==a;++o)t.setTexture3D(n[o]||yo,r[o])}function Ld(e,n,t){const i=this.cache,a=n.length,r=Ei(t,a);pt(i,r)||(e.uniform1iv(this.addr,r),ht(i,r));for(let o=0;o!==a;++o)t.setTextureCube(n[o]||Io,r[o])}function Pd(e,n,t){const i=this.cache,a=n.length,r=Ei(t,a);pt(i,r)||(e.uniform1iv(this.addr,r),ht(i,r));for(let o=0;o!==a;++o)t.setTexture2DArray(n[o]||Po,r[o])}function yd(e){switch(e){case 5126:return dd;case 35664:return pd;case 35665:return hd;case 35666:return md;case 35674:return _d;case 35675:return gd;case 35676:return vd;case 5124:case 35670:return Sd;case 35667:case 35671:return xd;case 35668:case 35672:return Ed;case 35669:case 35673:return Md;case 5125:return Td;case 36294:return Ad;case 36295:return bd;case 36296:return Rd;case 35678:case 36198:case 36298:case 36306:case 35682:return Cd;case 35679:case 36299:case 36307:return wd;case 35680:case 36300:case 36308:case 36293:return Ld;case 36289:case 36303:case 36311:case 36292:return Pd}}class Id{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=ud(t.type)}}class Ud{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=yd(t.type)}}class Dd{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const a=this.seq;for(let r=0,o=a.length;r!==o;++r){const s=a[r];s.setValue(n,t[s.id],i)}}}const Fi=/(\w+)(\])?(\[|\.)?/g;function Sa(e,n){e.seq.push(n),e.map[n.id]=n}function Nd(e,n,t){const i=e.name,a=i.length;for(Fi.lastIndex=0;;){const r=Fi.exec(i),o=Fi.lastIndex;let s=r[1];const c=r[2]==="]",l=r[3];if(c&&(s=s|0),l===void 0||l==="["&&o+2===a){Sa(t,l===void 0?new Id(s,e,n):new Ud(s,e,n));break}else{let u=t.map[s];u===void 0&&(u=new Dd(s),Sa(t,u)),t=u}}}class fi{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const s=n.getActiveUniform(t,o),c=n.getUniformLocation(t,s.name);Nd(s,c,this)}const a=[],r=[];for(const o of this.seq)o.type===n.SAMPLER_2D_SHADOW||o.type===n.SAMPLER_CUBE_SHADOW||o.type===n.SAMPLER_2D_ARRAY_SHADOW?a.push(o):r.push(o);a.length>0&&(this.seq=a.concat(r))}setValue(n,t,i,a){const r=this.map[t];r!==void 0&&r.setValue(n,i,a)}setOptional(n,t,i){const a=t[i];a!==void 0&&this.setValue(n,i,a)}static upload(n,t,i,a){for(let r=0,o=t.length;r!==o;++r){const s=t[r],c=i[s.id];c.needsUpdate!==!1&&s.setValue(n,c.value,a)}}static seqWithValue(n,t){const i=[];for(let a=0,r=n.length;a!==r;++a){const o=n[a];o.id in t&&i.push(o)}return i}}function xa(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const Fd=37297;let Od=0;function Bd(e,n){const t=e.split(`
`),i=[],a=Math.max(n-6,0),r=Math.min(n+6,t.length);for(let o=a;o<r;o++){const s=o+1;i.push(`${s===n?">":" "} ${s}: ${t[o]}`)}return i.join(`
`)}const Ea=new He;function Gd(e){tt._getMatrix(Ea,tt.workingColorSpace,e);const n=`mat3( ${Ea.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(e)){case vo:return[n,"LinearTransferOETF"];case Qe:return[n,"sRGBTransferOETF"];default:return We("WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function Ma(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),r=(e.getShaderInfoLog(n)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const s=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Bd(e.getShaderSource(n),s)}else return r}function Hd(e,n){const t=Gd(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Vd={[go]:"Linear",[_o]:"Reinhard",[mo]:"Cineon",[ho]:"ACESFilmic",[po]:"AgX",[uo]:"Neutral",[fo]:"Custom"};function kd(e,n){const t=Vd[n];return t===void 0?(We("WebGLProgram: Unsupported toneMapping:",n),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Jn=new ae;function zd(){tt.getLuminanceCoefficients(Jn);const e=Jn.x.toFixed(4),n=Jn.y.toFixed(4),t=Jn.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wd(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vn).join(`
`)}function Xd(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Kd(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const r=e.getActiveAttrib(n,a),o=r.name;let s=1;r.type===e.FLOAT_MAT2&&(s=2),r.type===e.FLOAT_MAT3&&(s=3),r.type===e.FLOAT_MAT4&&(s=4),t[o]={type:r.type,location:e.getAttribLocation(n,o),locationSize:s}}return t}function Vn(e){return e!==""}function Ta(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function Aa(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const qd=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zi(e){return e.replace(qd,jd)}const Yd=new Map;function jd(e,n){let t=Ue[n];if(t===void 0){const i=Yd.get(n);if(i!==void 0)t=Ue[i],We('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return Zi(t)}const Zd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ba(e){return e.replace(Zd,$d)}function $d(e,n,t,i){let a="";for(let r=parseInt(n);r<parseInt(t);r++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function Ra(e){let n=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?n+=`
#define HIGH_PRECISION`:e.precision==="mediump"?n+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(n+=`
#define LOW_PRECISION`),n}const Qd={[si]:"SHADOWMAP_TYPE_PCF",[Gn]:"SHADOWMAP_TYPE_VSM"};function Jd(e){return Qd[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const ep={[jn]:"ENVMAP_TYPE_CUBE",[wn]:"ENVMAP_TYPE_CUBE",[vi]:"ENVMAP_TYPE_CUBE_UV"};function tp(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":ep[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const np={[wn]:"ENVMAP_MODE_REFRACTION"};function ip(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":np[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const rp={[dc]:"ENVMAP_BLENDING_MULTIPLY",[uc]:"ENVMAP_BLENDING_MIX",[fc]:"ENVMAP_BLENDING_ADD"};function ap(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":rp[e.combine]||"ENVMAP_BLENDING_NONE"}function op(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function sp(e,n,t,i){const a=e.getContext(),r=t.defines;let o=t.vertexShader,s=t.fragmentShader;const c=Jd(t),l=tp(t),d=ip(t),u=ap(t),f=op(t),_=Wd(t),E=Xd(r),T=a.createProgram();let p,h,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(Vn).join(`
`),p.length>0&&(p+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(Vn).join(`
`),h.length>0&&(h+=`
`)):(p=[Ra(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vn).join(`
`),h=[Ra(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Wt?"#define TONE_MAPPING":"",t.toneMapping!==Wt?Ue.tonemapping_pars_fragment:"",t.toneMapping!==Wt?kd("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,Hd("linearToOutputTexel",t.outputColorSpace),zd(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vn).join(`
`)),o=Zi(o),o=Ta(o,t),o=Aa(o,t),s=Zi(s),s=Ta(s,t),s=Aa(s,t),o=ba(o),s=ba(s),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[_,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,h=["#define varying in",t.glslVersion===ra?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ra?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const b=S+p+o,C=S+h+s,w=xa(a,a.VERTEX_SHADER,b),A=xa(a,a.FRAGMENT_SHADER,C);a.attachShader(T,w),a.attachShader(T,A),t.index0AttributeName!==void 0?a.bindAttribLocation(T,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(T,0,"position"),a.linkProgram(T);function L(R){if(e.debug.checkShaderErrors){const F=a.getProgramInfoLog(T)||"",B=a.getShaderInfoLog(w)||"",z=a.getShaderInfoLog(A)||"",N=F.trim(),I=B.trim(),H=z.trim();let k=!0,K=!0;if(a.getProgramParameter(T,a.LINK_STATUS)===!1)if(k=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,T,w,A);else{const re=Ma(a,w,"vertex"),he=Ma(a,A,"fragment");Je("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(T,a.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+N+`
`+re+`
`+he)}else N!==""?We("WebGLProgram: Program Info Log:",N):(I===""||H==="")&&(K=!1);K&&(R.diagnostics={runnable:k,programLog:N,vertexShader:{log:I,prefix:p},fragmentShader:{log:H,prefix:h}})}a.deleteShader(w),a.deleteShader(A),v=new fi(a,T),M=Kd(a,T)}let v;this.getUniforms=function(){return v===void 0&&L(this),v};let M;this.getAttributes=function(){return M===void 0&&L(this),M};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=a.getProgramParameter(T,Fd)),P},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(T),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Od++,this.cacheKey=n,this.usedTimes=1,this.program=T,this.vertexShader=w,this.fragmentShader=A,this}let cp=0;class lp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,a=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(n);return o.has(a)===!1&&(o.add(a),a.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new fp(n),t.set(n,i)),i}}class fp{constructor(n){this.id=cp++,this.code=n,this.usedTimes=0}}function up(e){return e===Cn||e===Xi||e===Ki}function dp(e,n,t,i,a,r){const o=new sc,s=new lp,c=new Set,l=[],d=new Map,u=i.logarithmicDepthBuffer;let f=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(v){return c.add(v),v===0?"uv":`uv${v}`}function T(v,M,P,R,F,B){const z=R.fog,N=F.geometry,I=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?R.environment:null,H=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,k=n.get(v.envMap||I,H),K=k&&k.mapping===vi?k.image.height:null,re=_[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),f!==v.precision&&We("WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const he=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,J=he!==void 0?he.length:0;let Ae=0;N.morphAttributes.position!==void 0&&(Ae=1),N.morphAttributes.normal!==void 0&&(Ae=2),N.morphAttributes.color!==void 0&&(Ae=3);let Ne,Ce,Y,le;if(re){const Pe=Vt[re];Ne=Pe.vertexShader,Ce=Pe.fragmentShader}else Ne=v.vertexShader,Ce=v.fragmentShader,s.update(v),Y=s.getVertexShaderID(v),le=s.getFragmentShaderID(v);const ee=e.getRenderTarget(),be=e.state.buffers.depth.getReversed(),we=F.isInstancedMesh===!0,Re=F.isBatchedMesh===!0,nt=!!v.map,Be=!!v.matcap,Xe=!!k,et=!!v.aoMap,Oe=!!v.lightMap,ut=!!v.bumpMap,it=!!v.normalMap,At=!!v.displacementMap,U=!!v.emissiveMap,dt=!!v.metalnessMap,Ge=!!v.roughnessMap,Ze=v.anisotropy>0,fe=v.clearcoat>0,rt=v.dispersion>0,x=v.iridescence>0,m=v.sheen>0,O=v.transmission>0,j=Ze&&!!v.anisotropyMap,Q=fe&&!!v.clearcoatMap,te=fe&&!!v.clearcoatNormalMap,ce=fe&&!!v.clearcoatRoughnessMap,X=x&&!!v.iridescenceMap,Z=x&&!!v.iridescenceThicknessMap,me=m&&!!v.sheenColorMap,ve=m&&!!v.sheenRoughnessMap,oe=!!v.specularMap,ne=!!v.specularColorMap,Le=!!v.specularIntensityMap,Ie=O&&!!v.transmissionMap,ke=O&&!!v.thicknessMap,y=!!v.gradientMap,ie=!!v.alphaMap,q=v.alphaTest>0,_e=!!v.alphaHash,se=!!v.extensions;let $=Wt;v.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&($=e.toneMapping);const Ee={shaderID:re,shaderType:v.type,shaderName:v.name,vertexShader:Ne,fragmentShader:Ce,defines:v.defines,customVertexShaderID:Y,customFragmentShaderID:le,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:Re,batchingColor:Re&&F._colorsTexture!==null,instancing:we,instancingColor:we&&F.instanceColor!==null,instancingMorph:we&&F.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:tt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:nt,matcap:Be,envMap:Xe,envMapMode:Xe&&k.mapping,envMapCubeUVHeight:K,aoMap:et,lightMap:Oe,bumpMap:ut,normalMap:it,displacementMap:At,emissiveMap:U,normalMapObjectSpace:it&&v.normalMapType===rc,normalMapTangentSpace:it&&v.normalMapType===na,packedNormalMap:it&&v.normalMapType===na&&up(v.normalMap.format),metalnessMap:dt,roughnessMap:Ge,anisotropy:Ze,anisotropyMap:j,clearcoat:fe,clearcoatMap:Q,clearcoatNormalMap:te,clearcoatRoughnessMap:ce,dispersion:rt,iridescence:x,iridescenceMap:X,iridescenceThicknessMap:Z,sheen:m,sheenColorMap:me,sheenRoughnessMap:ve,specularMap:oe,specularColorMap:ne,specularIntensityMap:Le,transmission:O,transmissionMap:Ie,thicknessMap:ke,gradientMap:y,opaque:v.transparent===!1&&v.blending===ci&&v.alphaToCoverage===!1,alphaMap:ie,alphaTest:q,alphaHash:_e,combine:v.combine,mapUv:nt&&E(v.map.channel),aoMapUv:et&&E(v.aoMap.channel),lightMapUv:Oe&&E(v.lightMap.channel),bumpMapUv:ut&&E(v.bumpMap.channel),normalMapUv:it&&E(v.normalMap.channel),displacementMapUv:At&&E(v.displacementMap.channel),emissiveMapUv:U&&E(v.emissiveMap.channel),metalnessMapUv:dt&&E(v.metalnessMap.channel),roughnessMapUv:Ge&&E(v.roughnessMap.channel),anisotropyMapUv:j&&E(v.anisotropyMap.channel),clearcoatMapUv:Q&&E(v.clearcoatMap.channel),clearcoatNormalMapUv:te&&E(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&E(v.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&E(v.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&E(v.iridescenceThicknessMap.channel),sheenColorMapUv:me&&E(v.sheenColorMap.channel),sheenRoughnessMapUv:ve&&E(v.sheenRoughnessMap.channel),specularMapUv:oe&&E(v.specularMap.channel),specularColorMapUv:ne&&E(v.specularColorMap.channel),specularIntensityMapUv:Le&&E(v.specularIntensityMap.channel),transmissionMapUv:Ie&&E(v.transmissionMap.channel),thicknessMapUv:ke&&E(v.thicknessMap.channel),alphaMapUv:ie&&E(v.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(it||Ze),vertexNormals:!!N.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!N.attributes.uv&&(nt||ie),fog:!!z,useFog:v.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||N.attributes.normal===void 0&&it===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:be,skinning:F.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:Ae,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:e.shadowMap.enabled&&P.length>0,shadowMapType:e.shadowMap.type,toneMapping:$,decodeVideoTexture:nt&&v.map.isVideoTexture===!0&&tt.getTransfer(v.map.colorSpace)===Qe,decodeVideoTextureEmissive:U&&v.emissiveMap.isVideoTexture===!0&&tt.getTransfer(v.emissiveMap.colorSpace)===Qe,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===yt,flipSided:v.side===Ct,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:se&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&v.extensions.multiDraw===!0||Re)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ee.vertexUv1s=c.has(1),Ee.vertexUv2s=c.has(2),Ee.vertexUv3s=c.has(3),c.clear(),Ee}function p(v){const M=[];if(v.shaderID?M.push(v.shaderID):(M.push(v.customVertexShaderID),M.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)M.push(P),M.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(h(M,v),S(M,v),M.push(e.outputColorSpace)),M.push(v.customProgramCacheKey),M.join()}function h(v,M){v.push(M.precision),v.push(M.outputColorSpace),v.push(M.envMapMode),v.push(M.envMapCubeUVHeight),v.push(M.mapUv),v.push(M.alphaMapUv),v.push(M.lightMapUv),v.push(M.aoMapUv),v.push(M.bumpMapUv),v.push(M.normalMapUv),v.push(M.displacementMapUv),v.push(M.emissiveMapUv),v.push(M.metalnessMapUv),v.push(M.roughnessMapUv),v.push(M.anisotropyMapUv),v.push(M.clearcoatMapUv),v.push(M.clearcoatNormalMapUv),v.push(M.clearcoatRoughnessMapUv),v.push(M.iridescenceMapUv),v.push(M.iridescenceThicknessMapUv),v.push(M.sheenColorMapUv),v.push(M.sheenRoughnessMapUv),v.push(M.specularMapUv),v.push(M.specularColorMapUv),v.push(M.specularIntensityMapUv),v.push(M.transmissionMapUv),v.push(M.thicknessMapUv),v.push(M.combine),v.push(M.fogExp2),v.push(M.sizeAttenuation),v.push(M.morphTargetsCount),v.push(M.morphAttributeCount),v.push(M.numDirLights),v.push(M.numPointLights),v.push(M.numSpotLights),v.push(M.numSpotLightMaps),v.push(M.numHemiLights),v.push(M.numRectAreaLights),v.push(M.numDirLightShadows),v.push(M.numPointLightShadows),v.push(M.numSpotLightShadows),v.push(M.numSpotLightShadowsWithMaps),v.push(M.numLightProbes),v.push(M.shadowMapType),v.push(M.toneMapping),v.push(M.numClippingPlanes),v.push(M.numClipIntersection),v.push(M.depthPacking)}function S(v,M){o.disableAll(),M.instancing&&o.enable(0),M.instancingColor&&o.enable(1),M.instancingMorph&&o.enable(2),M.matcap&&o.enable(3),M.envMap&&o.enable(4),M.normalMapObjectSpace&&o.enable(5),M.normalMapTangentSpace&&o.enable(6),M.clearcoat&&o.enable(7),M.iridescence&&o.enable(8),M.alphaTest&&o.enable(9),M.vertexColors&&o.enable(10),M.vertexAlphas&&o.enable(11),M.vertexUv1s&&o.enable(12),M.vertexUv2s&&o.enable(13),M.vertexUv3s&&o.enable(14),M.vertexTangents&&o.enable(15),M.anisotropy&&o.enable(16),M.alphaHash&&o.enable(17),M.batching&&o.enable(18),M.dispersion&&o.enable(19),M.batchingColor&&o.enable(20),M.gradientMap&&o.enable(21),M.packedNormalMap&&o.enable(22),M.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),M.numLightProbeGrids>0&&o.enable(22),v.push(o.mask)}function b(v){const M=_[v.type];let P;if(M){const R=Vt[M];P=ic.clone(R.uniforms)}else P=v.uniforms;return P}function C(v,M){let P=d.get(M);return P!==void 0?++P.usedTimes:(P=new sp(e,M,v,a),l.push(P),d.set(M,P)),P}function w(v){if(--v.usedTimes===0){const M=l.indexOf(v);l[M]=l[l.length-1],l.pop(),d.delete(v.cacheKey),v.destroy()}}function A(v){s.remove(v)}function L(){s.dispose()}return{getParameters:T,getProgramCacheKey:p,getUniforms:b,acquireProgram:C,releaseProgram:w,releaseShaderCache:A,programs:l,dispose:L}}function pp(){let e=new WeakMap;function n(o){return e.has(o)}function t(o){let s=e.get(o);return s===void 0&&(s={},e.set(o,s)),s}function i(o){e.delete(o)}function a(o,s,c){e.get(o)[s]=c}function r(){e=new WeakMap}return{has:n,get:t,remove:i,update:a,dispose:r}}function hp(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.materialVariant!==n.materialVariant?e.materialVariant-n.materialVariant:e.z!==n.z?e.z-n.z:e.id-n.id}function Ca(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function wa(){const e=[];let n=0;const t=[],i=[],a=[];function r(){n=0,t.length=0,i.length=0,a.length=0}function o(f){let _=0;return f.isInstancedMesh&&(_+=2),f.isSkinnedMesh&&(_+=1),_}function s(f,_,E,T,p,h){let S=e[n];return S===void 0?(S={id:f.id,object:f,geometry:_,material:E,materialVariant:o(f),groupOrder:T,renderOrder:f.renderOrder,z:p,group:h},e[n]=S):(S.id=f.id,S.object=f,S.geometry=_,S.material=E,S.materialVariant=o(f),S.groupOrder=T,S.renderOrder=f.renderOrder,S.z=p,S.group=h),n++,S}function c(f,_,E,T,p,h){const S=s(f,_,E,T,p,h);E.transmission>0?i.push(S):E.transparent===!0?a.push(S):t.push(S)}function l(f,_,E,T,p,h){const S=s(f,_,E,T,p,h);E.transmission>0?i.unshift(S):E.transparent===!0?a.unshift(S):t.unshift(S)}function d(f,_){t.length>1&&t.sort(f||hp),i.length>1&&i.sort(_||Ca),a.length>1&&a.sort(_||Ca)}function u(){for(let f=n,_=e.length;f<_;f++){const E=e[f];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:t,transmissive:i,transparent:a,init:r,push:c,unshift:l,finish:u,sort:d}}function mp(){let e=new WeakMap;function n(i,a){const r=e.get(i);let o;return r===void 0?(o=new wa,e.set(i,[o])):a>=r.length?(o=new wa,r.push(o)):o=r[a],o}function t(){e=new WeakMap}return{get:n,dispose:t}}function _p(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new ae,color:new ze};break;case"SpotLight":t={position:new ae,direction:new ae,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ae,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ae,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new ae,halfWidth:new ae,halfHeight:new ae};break}return e[n.id]=t,t}}}function gp(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let vp=0;function Sp(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function xp(e){const n=new _p,t=gp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new ae);const a=new ae,r=new vt,o=new vt;function s(l){let d=0,u=0,f=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let _=0,E=0,T=0,p=0,h=0,S=0,b=0,C=0,w=0,A=0,L=0;l.sort(Sp);for(let M=0,P=l.length;M<P;M++){const R=l[M],F=R.color,B=R.intensity,z=R.distance;let N=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Cn?N=R.shadow.map.texture:N=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)d+=F.r*B,u+=F.g*B,f+=F.b*B;else if(R.isLightProbe){for(let I=0;I<9;I++)i.probe[I].addScaledVector(R.sh.coefficients[I],B);L++}else if(R.isDirectionalLight){const I=n.get(R);if(I.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const H=R.shadow,k=t.get(R);k.shadowIntensity=H.intensity,k.shadowBias=H.bias,k.shadowNormalBias=H.normalBias,k.shadowRadius=H.radius,k.shadowMapSize=H.mapSize,i.directionalShadow[_]=k,i.directionalShadowMap[_]=N,i.directionalShadowMatrix[_]=R.shadow.matrix,S++}i.directional[_]=I,_++}else if(R.isSpotLight){const I=n.get(R);I.position.setFromMatrixPosition(R.matrixWorld),I.color.copy(F).multiplyScalar(B),I.distance=z,I.coneCos=Math.cos(R.angle),I.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),I.decay=R.decay,i.spot[T]=I;const H=R.shadow;if(R.map&&(i.spotLightMap[w]=R.map,w++,H.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[T]=H.matrix,R.castShadow){const k=t.get(R);k.shadowIntensity=H.intensity,k.shadowBias=H.bias,k.shadowNormalBias=H.normalBias,k.shadowRadius=H.radius,k.shadowMapSize=H.mapSize,i.spotShadow[T]=k,i.spotShadowMap[T]=N,C++}T++}else if(R.isRectAreaLight){const I=n.get(R);I.color.copy(F).multiplyScalar(B),I.halfWidth.set(R.width*.5,0,0),I.halfHeight.set(0,R.height*.5,0),i.rectArea[p]=I,p++}else if(R.isPointLight){const I=n.get(R);if(I.color.copy(R.color).multiplyScalar(R.intensity),I.distance=R.distance,I.decay=R.decay,R.castShadow){const H=R.shadow,k=t.get(R);k.shadowIntensity=H.intensity,k.shadowBias=H.bias,k.shadowNormalBias=H.normalBias,k.shadowRadius=H.radius,k.shadowMapSize=H.mapSize,k.shadowCameraNear=H.camera.near,k.shadowCameraFar=H.camera.far,i.pointShadow[E]=k,i.pointShadowMap[E]=N,i.pointShadowMatrix[E]=R.shadow.matrix,b++}i.point[E]=I,E++}else if(R.isHemisphereLight){const I=n.get(R);I.skyColor.copy(R.color).multiplyScalar(B),I.groundColor.copy(R.groundColor).multiplyScalar(B),i.hemi[h]=I,h++}}p>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ue.LTC_FLOAT_1,i.rectAreaLTC2=ue.LTC_FLOAT_2):(i.rectAreaLTC1=ue.LTC_HALF_1,i.rectAreaLTC2=ue.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=f;const v=i.hash;(v.directionalLength!==_||v.pointLength!==E||v.spotLength!==T||v.rectAreaLength!==p||v.hemiLength!==h||v.numDirectionalShadows!==S||v.numPointShadows!==b||v.numSpotShadows!==C||v.numSpotMaps!==w||v.numLightProbes!==L)&&(i.directional.length=_,i.spot.length=T,i.rectArea.length=p,i.point.length=E,i.hemi.length=h,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=C,i.spotShadowMap.length=C,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=C+w-A,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=L,v.directionalLength=_,v.pointLength=E,v.spotLength=T,v.rectAreaLength=p,v.hemiLength=h,v.numDirectionalShadows=S,v.numPointShadows=b,v.numSpotShadows=C,v.numSpotMaps=w,v.numLightProbes=L,i.version=vp++)}function c(l,d){let u=0,f=0,_=0,E=0,T=0;const p=d.matrixWorldInverse;for(let h=0,S=l.length;h<S;h++){const b=l[h];if(b.isDirectionalLight){const C=i.directional[u];C.direction.setFromMatrixPosition(b.matrixWorld),a.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(a),C.direction.transformDirection(p),u++}else if(b.isSpotLight){const C=i.spot[_];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(b.matrixWorld),a.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(a),C.direction.transformDirection(p),_++}else if(b.isRectAreaLight){const C=i.rectArea[E];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),o.identity(),r.copy(b.matrixWorld),r.premultiply(p),o.extractRotation(r),C.halfWidth.set(b.width*.5,0,0),C.halfHeight.set(0,b.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),E++}else if(b.isPointLight){const C=i.point[f];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){const C=i.hemi[T];C.direction.setFromMatrixPosition(b.matrixWorld),C.direction.transformDirection(p),T++}}}return{setup:s,setupView:c,state:i}}function La(e){const n=new xp(e),t=[],i=[],a=[];function r(f){u.camera=f,t.length=0,i.length=0,a.length=0}function o(f){t.push(f)}function s(f){i.push(f)}function c(f){a.push(f)}function l(){n.setup(t)}function d(f){n.setupView(t,f)}const u={lightsArray:t,shadowsArray:i,lightProbeGridArray:a,camera:null,lights:n,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:d,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Ep(e){let n=new WeakMap;function t(a,r=0){const o=n.get(a);let s;return o===void 0?(s=new La(e),n.set(a,[s])):r>=o.length?(s=new La(e),o.push(s)):s=o[r],s}function i(){n=new WeakMap}return{get:t,dispose:i}}const Mp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Tp=`uniform sampler2D shadow_pass;
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
}`,Ap=[new ae(1,0,0),new ae(-1,0,0),new ae(0,1,0),new ae(0,-1,0),new ae(0,0,1),new ae(0,0,-1)],bp=[new ae(0,-1,0),new ae(0,-1,0),new ae(0,0,1),new ae(0,0,-1),new ae(0,-1,0),new ae(0,-1,0)],Pa=new vt,Un=new ae,Oi=new ae;function Rp(e,n,t){let i=new Za;const a=new St,r=new St,o=new Mt,s=new Fs,c=new Os,l={},d=t.maxTextureSize,u={[bn]:Ct,[Ct]:bn,[yt]:yt},f=new Qt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new St},radius:{value:4}},vertexShader:Mp,fragmentShader:Tp}),_=f.clone();_.defines.HORIZONTAL_PASS=1;const E=new _n;E.setAttribute("position",new sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new Kt(E,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=si;let h=this.type;this.render=function(A,L,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;this.type===Bs&&(We("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=si);const M=e.getRenderTarget(),P=e.getActiveCubeFace(),R=e.getActiveMipmapLevel(),F=e.state;F.setBlending($t),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const B=h!==this.type;B&&L.traverse(function(z){z.material&&(Array.isArray(z.material)?z.material.forEach(N=>N.needsUpdate=!0):z.material.needsUpdate=!0)});for(let z=0,N=A.length;z<N;z++){const I=A[z],H=I.shadow;if(H===void 0){We("WebGLShadowMap:",I,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;a.copy(H.mapSize);const k=H.getFrameExtents();a.multiply(k),r.copy(H.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(r.x=Math.floor(d/k.x),a.x=r.x*k.x,H.mapSize.x=r.x),a.y>d&&(r.y=Math.floor(d/k.y),a.y=r.y*k.y,H.mapSize.y=r.y));const K=e.state.buffers.depth.getReversed();if(H.camera._reversedDepth=K,H.map===null||B===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Gn){if(I.isPointLight){We("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Xt(a.x,a.y,{format:Cn,type:ln,minFilter:mt,magFilter:mt,generateMipmaps:!1}),H.map.texture.name=I.name+".shadowMap",H.map.depthTexture=new Kn(a.x,a.y,an),H.map.depthTexture.name=I.name+".shadowMapDepth",H.map.depthTexture.format=Rn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Zt,H.map.depthTexture.magFilter=Zt}else I.isPointLight?(H.map=new wo(a.x),H.map.depthTexture=new Gs(a.x,mn)):(H.map=new Xt(a.x,a.y),H.map.depthTexture=new Kn(a.x,a.y,mn)),H.map.depthTexture.name=I.name+".shadowMap",H.map.depthTexture.format=Rn,this.type===si?(H.map.depthTexture.compareFunction=K?ar:or,H.map.depthTexture.minFilter=mt,H.map.depthTexture.magFilter=mt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Zt,H.map.depthTexture.magFilter=Zt);H.camera.updateProjectionMatrix()}const re=H.map.isWebGLCubeRenderTarget?6:1;for(let he=0;he<re;he++){if(H.map.isWebGLCubeRenderTarget)e.setRenderTarget(H.map,he),e.clear();else{he===0&&(e.setRenderTarget(H.map),e.clear());const J=H.getViewport(he);o.set(r.x*J.x,r.y*J.y,r.x*J.z,r.y*J.w),F.viewport(o)}if(I.isPointLight){const J=H.camera,Ae=H.matrix,Ne=I.distance||J.far;Ne!==J.far&&(J.far=Ne,J.updateProjectionMatrix()),Un.setFromMatrixPosition(I.matrixWorld),J.position.copy(Un),Oi.copy(J.position),Oi.add(Ap[he]),J.up.copy(bp[he]),J.lookAt(Oi),J.updateMatrixWorld(),Ae.makeTranslation(-Un.x,-Un.y,-Un.z),Pa.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Pa,J.coordinateSystem,J.reversedDepth)}else H.updateMatrices(I);i=H.getFrustum(),C(L,v,H.camera,I,this.type)}H.isPointLightShadow!==!0&&this.type===Gn&&S(H,v),H.needsUpdate=!1}h=this.type,p.needsUpdate=!1,e.setRenderTarget(M,P,R)};function S(A,L){const v=n.update(T);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,_.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,_.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Xt(a.x,a.y,{format:Cn,type:ln})),f.uniforms.shadow_pass.value=A.map.depthTexture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,e.setRenderTarget(A.mapPass),e.clear(),e.renderBufferDirect(L,null,v,f,T,null),_.uniforms.shadow_pass.value=A.mapPass.texture,_.uniforms.resolution.value=A.mapSize,_.uniforms.radius.value=A.radius,e.setRenderTarget(A.map),e.clear(),e.renderBufferDirect(L,null,v,_,T,null)}function b(A,L,v,M){let P=null;const R=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)P=R;else if(P=v.isPointLight===!0?c:s,e.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const F=P.uuid,B=L.uuid;let z=l[F];z===void 0&&(z={},l[F]=z);let N=z[B];N===void 0&&(N=P.clone(),z[B]=N,L.addEventListener("dispose",w)),P=N}if(P.visible=L.visible,P.wireframe=L.wireframe,M===Gn?P.side=L.shadowSide!==null?L.shadowSide:L.side:P.side=L.shadowSide!==null?L.shadowSide:u[L.side],P.alphaMap=L.alphaMap,P.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,P.map=L.map,P.clipShadows=L.clipShadows,P.clippingPlanes=L.clippingPlanes,P.clipIntersection=L.clipIntersection,P.displacementMap=L.displacementMap,P.displacementScale=L.displacementScale,P.displacementBias=L.displacementBias,P.wireframeLinewidth=L.wireframeLinewidth,P.linewidth=L.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const F=e.properties.get(P);F.light=v}return P}function C(A,L,v,M,P){if(A.visible===!1)return;if(A.layers.test(L.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&P===Gn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);const B=n.update(A),z=A.material;if(Array.isArray(z)){const N=B.groups;for(let I=0,H=N.length;I<H;I++){const k=N[I],K=z[k.materialIndex];if(K&&K.visible){const re=b(A,K,M,P);A.onBeforeShadow(e,A,L,v,B,re,k),e.renderBufferDirect(v,null,B,re,A,k),A.onAfterShadow(e,A,L,v,B,re,k)}}}else if(z.visible){const N=b(A,z,M,P);A.onBeforeShadow(e,A,L,v,B,N,null),e.renderBufferDirect(v,null,B,N,A,null),A.onAfterShadow(e,A,L,v,B,N,null)}}const F=A.children;for(let B=0,z=F.length;B<z;B++)C(F[B],L,v,M,P)}function w(A){A.target.removeEventListener("dispose",w);for(const v in l){const M=l[v],P=A.target.uuid;P in M&&(M[P].dispose(),delete M[P])}}}function Cp(e,n){function t(){let y=!1;const ie=new Mt;let q=null;const _e=new Mt(0,0,0,0);return{setMask:function(se){q!==se&&!y&&(e.colorMask(se,se,se,se),q=se)},setLocked:function(se){y=se},setClear:function(se,$,Ee,Pe,st){st===!0&&(se*=Pe,$*=Pe,Ee*=Pe),ie.set(se,$,Ee,Pe),_e.equals(ie)===!1&&(e.clearColor(se,$,Ee,Pe),_e.copy(ie))},reset:function(){y=!1,q=null,_e.set(-1,0,0,0)}}}function i(){let y=!1,ie=!1,q=null,_e=null,se=null;return{setReversed:function($){if(ie!==$){const Ee=n.get("EXT_clip_control");$?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),ie=$;const Pe=se;se=null,this.setClear(Pe)}},getReversed:function(){return ie},setTest:function($){$?ee(e.DEPTH_TEST):be(e.DEPTH_TEST)},setMask:function($){q!==$&&!y&&(e.depthMask($),q=$)},setFunc:function($){if(ie&&($=pc[$]),_e!==$){switch($){case Js:e.depthFunc(e.NEVER);break;case Qs:e.depthFunc(e.ALWAYS);break;case $s:e.depthFunc(e.LESS);break;case Er:e.depthFunc(e.LEQUAL);break;case Zs:e.depthFunc(e.EQUAL);break;case js:e.depthFunc(e.GEQUAL);break;case Ys:e.depthFunc(e.GREATER);break;case qs:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}_e=$}},setLocked:function($){y=$},setClear:function($){se!==$&&(se=$,ie&&($=1-$),e.clearDepth($))},reset:function(){y=!1,q=null,_e=null,se=null,ie=!1}}}function a(){let y=!1,ie=null,q=null,_e=null,se=null,$=null,Ee=null,Pe=null,st=null;return{setTest:function(Ke){y||(Ke?ee(e.STENCIL_TEST):be(e.STENCIL_TEST))},setMask:function(Ke){ie!==Ke&&!y&&(e.stencilMask(Ke),ie=Ke)},setFunc:function(Ke,Yt,Ot){(q!==Ke||_e!==Yt||se!==Ot)&&(e.stencilFunc(Ke,Yt,Ot),q=Ke,_e=Yt,se=Ot)},setOp:function(Ke,Yt,Ot){($!==Ke||Ee!==Yt||Pe!==Ot)&&(e.stencilOp(Ke,Yt,Ot),$=Ke,Ee=Yt,Pe=Ot)},setLocked:function(Ke){y=Ke},setClear:function(Ke){st!==Ke&&(e.clearStencil(Ke),st=Ke)},reset:function(){y=!1,ie=null,q=null,_e=null,se=null,$=null,Ee=null,Pe=null,st=null}}}const r=new t,o=new i,s=new a,c=new WeakMap,l=new WeakMap;let d={},u={},f={},_=new WeakMap,E=[],T=null,p=!1,h=null,S=null,b=null,C=null,w=null,A=null,L=null,v=new ze(0,0,0),M=0,P=!1,R=null,F=null,B=null,z=null,N=null;const I=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,k=0;const K=e.getParameter(e.VERSION);K.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(K)[1]),H=k>=1):K.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),H=k>=2);let re=null,he={};const J=e.getParameter(e.SCISSOR_BOX),Ae=e.getParameter(e.VIEWPORT),Ne=new Mt().fromArray(J),Ce=new Mt().fromArray(Ae);function Y(y,ie,q,_e){const se=new Uint8Array(4),$=e.createTexture();e.bindTexture(y,$),e.texParameteri(y,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(y,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Ee=0;Ee<q;Ee++)y===e.TEXTURE_3D||y===e.TEXTURE_2D_ARRAY?e.texImage3D(ie,0,e.RGBA,1,1,_e,0,e.RGBA,e.UNSIGNED_BYTE,se):e.texImage2D(ie+Ee,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,se);return $}const le={};le[e.TEXTURE_2D]=Y(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=Y(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=Y(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=Y(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ee(e.DEPTH_TEST),o.setFunc(Er),ut(!1),it(Qr),ee(e.CULL_FACE),et($t);function ee(y){d[y]!==!0&&(e.enable(y),d[y]=!0)}function be(y){d[y]!==!1&&(e.disable(y),d[y]=!1)}function we(y,ie){return f[y]!==ie?(e.bindFramebuffer(y,ie),f[y]=ie,y===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=ie),y===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=ie),!0):!1}function Re(y,ie){let q=E,_e=!1;if(y){q=_.get(ie),q===void 0&&(q=[],_.set(ie,q));const se=y.textures;if(q.length!==se.length||q[0]!==e.COLOR_ATTACHMENT0){for(let $=0,Ee=se.length;$<Ee;$++)q[$]=e.COLOR_ATTACHMENT0+$;q.length=se.length,_e=!0}}else q[0]!==e.BACK&&(q[0]=e.BACK,_e=!0);_e&&e.drawBuffers(q)}function nt(y){return T!==y?(e.useProgram(y),T=y,!0):!1}const Be={[yn]:e.FUNC_ADD,[ps]:e.FUNC_SUBTRACT,[ds]:e.FUNC_REVERSE_SUBTRACT};Be[hc]=e.MIN,Be[mc]=e.MAX;const Xe={[ws]:e.ZERO,[Cs]:e.ONE,[Rs]:e.SRC_COLOR,[bs]:e.SRC_ALPHA,[As]:e.SRC_ALPHA_SATURATE,[Ts]:e.DST_COLOR,[Ms]:e.DST_ALPHA,[Es]:e.ONE_MINUS_SRC_COLOR,[xs]:e.ONE_MINUS_SRC_ALPHA,[Ss]:e.ONE_MINUS_DST_COLOR,[vs]:e.ONE_MINUS_DST_ALPHA,[gs]:e.CONSTANT_COLOR,[_s]:e.ONE_MINUS_CONSTANT_COLOR,[ms]:e.CONSTANT_ALPHA,[hs]:e.ONE_MINUS_CONSTANT_ALPHA};function et(y,ie,q,_e,se,$,Ee,Pe,st,Ke){if(y===$t){p===!0&&(be(e.BLEND),p=!1);return}if(p===!1&&(ee(e.BLEND),p=!0),y!==nc){if(y!==h||Ke!==P){if((S!==yn||w!==yn)&&(e.blendEquation(e.FUNC_ADD),S=yn,w=yn),Ke)switch(y){case ci:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case ta:e.blendFunc(e.ONE,e.ONE);break;case ea:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Jr:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Je("WebGLState: Invalid blending: ",y);break}else switch(y){case ci:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case ta:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case ea:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jr:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",y);break}b=null,C=null,A=null,L=null,v.set(0,0,0),M=0,h=y,P=Ke}return}se=se||ie,$=$||q,Ee=Ee||_e,(ie!==S||se!==w)&&(e.blendEquationSeparate(Be[ie],Be[se]),S=ie,w=se),(q!==b||_e!==C||$!==A||Ee!==L)&&(e.blendFuncSeparate(Xe[q],Xe[_e],Xe[$],Xe[Ee]),b=q,C=_e,A=$,L=Ee),(Pe.equals(v)===!1||st!==M)&&(e.blendColor(Pe.r,Pe.g,Pe.b,st),v.copy(Pe),M=st),h=y,P=!1}function Oe(y,ie){y.side===yt?be(e.CULL_FACE):ee(e.CULL_FACE);let q=y.side===Ct;ie&&(q=!q),ut(q),y.blending===ci&&y.transparent===!1?et($t):et(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),o.setFunc(y.depthFunc),o.setTest(y.depthTest),o.setMask(y.depthWrite),r.setMask(y.colorWrite);const _e=y.stencilWrite;s.setTest(_e),_e&&(s.setMask(y.stencilWriteMask),s.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),s.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass)),U(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?ee(e.SAMPLE_ALPHA_TO_COVERAGE):be(e.SAMPLE_ALPHA_TO_COVERAGE)}function ut(y){R!==y&&(y?e.frontFace(e.CW):e.frontFace(e.CCW),R=y)}function it(y){y!==ec?(ee(e.CULL_FACE),y!==F&&(y===Qr?e.cullFace(e.BACK):y===tc?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):be(e.CULL_FACE),F=y}function At(y){y!==B&&(H&&e.lineWidth(y),B=y)}function U(y,ie,q){y?(ee(e.POLYGON_OFFSET_FILL),(z!==ie||N!==q)&&(z=ie,N=q,o.getReversed()&&(ie=-ie),e.polygonOffset(ie,q))):be(e.POLYGON_OFFSET_FILL)}function dt(y){y?ee(e.SCISSOR_TEST):be(e.SCISSOR_TEST)}function Ge(y){y===void 0&&(y=e.TEXTURE0+I-1),re!==y&&(e.activeTexture(y),re=y)}function Ze(y,ie,q){q===void 0&&(re===null?q=e.TEXTURE0+I-1:q=re);let _e=he[q];_e===void 0&&(_e={type:void 0,texture:void 0},he[q]=_e),(_e.type!==y||_e.texture!==ie)&&(re!==q&&(e.activeTexture(q),re=q),e.bindTexture(y,ie||le[y]),_e.type=y,_e.texture=ie)}function fe(){const y=he[re];y!==void 0&&y.type!==void 0&&(e.bindTexture(y.type,null),y.type=void 0,y.texture=void 0)}function rt(){try{e.compressedTexImage2D(...arguments)}catch(y){Je("WebGLState:",y)}}function x(){try{e.compressedTexImage3D(...arguments)}catch(y){Je("WebGLState:",y)}}function m(){try{e.texSubImage2D(...arguments)}catch(y){Je("WebGLState:",y)}}function O(){try{e.texSubImage3D(...arguments)}catch(y){Je("WebGLState:",y)}}function j(){try{e.compressedTexSubImage2D(...arguments)}catch(y){Je("WebGLState:",y)}}function Q(){try{e.compressedTexSubImage3D(...arguments)}catch(y){Je("WebGLState:",y)}}function te(){try{e.texStorage2D(...arguments)}catch(y){Je("WebGLState:",y)}}function ce(){try{e.texStorage3D(...arguments)}catch(y){Je("WebGLState:",y)}}function X(){try{e.texImage2D(...arguments)}catch(y){Je("WebGLState:",y)}}function Z(){try{e.texImage3D(...arguments)}catch(y){Je("WebGLState:",y)}}function me(y){return u[y]!==void 0?u[y]:e.getParameter(y)}function ve(y,ie){u[y]!==ie&&(e.pixelStorei(y,ie),u[y]=ie)}function oe(y){Ne.equals(y)===!1&&(e.scissor(y.x,y.y,y.z,y.w),Ne.copy(y))}function ne(y){Ce.equals(y)===!1&&(e.viewport(y.x,y.y,y.z,y.w),Ce.copy(y))}function Le(y,ie){let q=l.get(ie);q===void 0&&(q=new WeakMap,l.set(ie,q));let _e=q.get(y);_e===void 0&&(_e=e.getUniformBlockIndex(ie,y.name),q.set(y,_e))}function Ie(y,ie){const _e=l.get(ie).get(y);c.get(ie)!==_e&&(e.uniformBlockBinding(ie,_e,y.__bindingPointIndex),c.set(ie,_e))}function ke(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),d={},u={},re=null,he={},f={},_=new WeakMap,E=[],T=null,p=!1,h=null,S=null,b=null,C=null,w=null,A=null,L=null,v=new ze(0,0,0),M=0,P=!1,R=null,F=null,B=null,z=null,N=null,Ne.set(0,0,e.canvas.width,e.canvas.height),Ce.set(0,0,e.canvas.width,e.canvas.height),r.reset(),o.reset(),s.reset()}return{buffers:{color:r,depth:o,stencil:s},enable:ee,disable:be,bindFramebuffer:we,drawBuffers:Re,useProgram:nt,setBlending:et,setMaterial:Oe,setFlipSided:ut,setCullFace:it,setLineWidth:At,setPolygonOffset:U,setScissorTest:dt,activeTexture:Ge,bindTexture:Ze,unbindTexture:fe,compressedTexImage2D:rt,compressedTexImage3D:x,texImage2D:X,texImage3D:Z,pixelStorei:ve,getParameter:me,updateUBOMapping:Le,uniformBlockBinding:Ie,texStorage2D:te,texStorage3D:ce,texSubImage2D:m,texSubImage3D:O,compressedTexSubImage2D:j,compressedTexSubImage3D:Q,scissor:oe,viewport:ne,reset:ke}}function wp(e,n,t,i,a,r,o){const s=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new St,d=new WeakMap,u=new Set;let f;const _=new WeakMap;let E=!1;try{E=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(x,m){return E?new OffscreenCanvas(x,m):lc("canvas")}function p(x,m,O){let j=1;const Q=rt(x);if((Q.width>O||Q.height>O)&&(j=O/Math.max(Q.width,Q.height)),j<1)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap||typeof VideoFrame<"u"&&x instanceof VideoFrame){const te=Math.floor(j*Q.width),ce=Math.floor(j*Q.height);f===void 0&&(f=T(te,ce));const X=m?T(te,ce):f;return X.width=te,X.height=ce,X.getContext("2d").drawImage(x,0,0,te,ce),We("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+te+"x"+ce+")."),X}else return"data"in x&&We("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),x;return x}function h(x){return x.generateMipmaps}function S(x){e.generateMipmap(x)}function b(x){return x.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:x.isWebGL3DRenderTarget?e.TEXTURE_3D:x.isWebGLArrayRenderTarget||x.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function C(x,m,O,j,Q,te=!1){if(x!==null){if(e[x]!==void 0)return e[x];We("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let ce;j&&(ce=n.get("EXT_texture_norm16"),ce||We("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=m;if(m===e.RED&&(O===e.FLOAT&&(X=e.R32F),O===e.HALF_FLOAT&&(X=e.R16F),O===e.UNSIGNED_BYTE&&(X=e.R8),O===e.UNSIGNED_SHORT&&ce&&(X=ce.R16_EXT),O===e.SHORT&&ce&&(X=ce.R16_SNORM_EXT)),m===e.RED_INTEGER&&(O===e.UNSIGNED_BYTE&&(X=e.R8UI),O===e.UNSIGNED_SHORT&&(X=e.R16UI),O===e.UNSIGNED_INT&&(X=e.R32UI),O===e.BYTE&&(X=e.R8I),O===e.SHORT&&(X=e.R16I),O===e.INT&&(X=e.R32I)),m===e.RG&&(O===e.FLOAT&&(X=e.RG32F),O===e.HALF_FLOAT&&(X=e.RG16F),O===e.UNSIGNED_BYTE&&(X=e.RG8),O===e.UNSIGNED_SHORT&&ce&&(X=ce.RG16_EXT),O===e.SHORT&&ce&&(X=ce.RG16_SNORM_EXT)),m===e.RG_INTEGER&&(O===e.UNSIGNED_BYTE&&(X=e.RG8UI),O===e.UNSIGNED_SHORT&&(X=e.RG16UI),O===e.UNSIGNED_INT&&(X=e.RG32UI),O===e.BYTE&&(X=e.RG8I),O===e.SHORT&&(X=e.RG16I),O===e.INT&&(X=e.RG32I)),m===e.RGB_INTEGER&&(O===e.UNSIGNED_BYTE&&(X=e.RGB8UI),O===e.UNSIGNED_SHORT&&(X=e.RGB16UI),O===e.UNSIGNED_INT&&(X=e.RGB32UI),O===e.BYTE&&(X=e.RGB8I),O===e.SHORT&&(X=e.RGB16I),O===e.INT&&(X=e.RGB32I)),m===e.RGBA_INTEGER&&(O===e.UNSIGNED_BYTE&&(X=e.RGBA8UI),O===e.UNSIGNED_SHORT&&(X=e.RGBA16UI),O===e.UNSIGNED_INT&&(X=e.RGBA32UI),O===e.BYTE&&(X=e.RGBA8I),O===e.SHORT&&(X=e.RGBA16I),O===e.INT&&(X=e.RGBA32I)),m===e.RGB&&(O===e.UNSIGNED_SHORT&&ce&&(X=ce.RGB16_EXT),O===e.SHORT&&ce&&(X=ce.RGB16_SNORM_EXT),O===e.UNSIGNED_INT_5_9_9_9_REV&&(X=e.RGB9_E5),O===e.UNSIGNED_INT_10F_11F_11F_REV&&(X=e.R11F_G11F_B10F)),m===e.RGBA){const Z=te?vo:tt.getTransfer(Q);O===e.FLOAT&&(X=e.RGBA32F),O===e.HALF_FLOAT&&(X=e.RGBA16F),O===e.UNSIGNED_BYTE&&(X=Z===Qe?e.SRGB8_ALPHA8:e.RGBA8),O===e.UNSIGNED_SHORT&&ce&&(X=ce.RGBA16_EXT),O===e.SHORT&&ce&&(X=ce.RGBA16_SNORM_EXT),O===e.UNSIGNED_SHORT_4_4_4_4&&(X=e.RGBA4),O===e.UNSIGNED_SHORT_5_5_5_1&&(X=e.RGB5_A1)}return(X===e.R16F||X===e.R32F||X===e.RG16F||X===e.RG32F||X===e.RGBA16F||X===e.RGBA32F)&&n.get("EXT_color_buffer_float"),X}function w(x,m){let O;return x?m===null||m===mn||m===qn?O=e.DEPTH24_STENCIL8:m===an?O=e.DEPTH32F_STENCIL8:m===hi&&(O=e.DEPTH24_STENCIL8,We("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):m===null||m===mn||m===qn?O=e.DEPTH_COMPONENT24:m===an?O=e.DEPTH_COMPONENT32F:m===hi&&(O=e.DEPTH_COMPONENT16),O}function A(x,m){return h(x)===!0||x.isFramebufferTexture&&x.minFilter!==Zt&&x.minFilter!==mt?Math.log2(Math.max(m.width,m.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?m.mipmaps.length:1}function L(x){const m=x.target;m.removeEventListener("dispose",L),M(m),m.isVideoTexture&&d.delete(m),m.isHTMLTexture&&u.delete(m)}function v(x){const m=x.target;m.removeEventListener("dispose",v),R(m)}function M(x){const m=i.get(x);if(m.__webglInit===void 0)return;const O=x.source,j=_.get(O);if(j){const Q=j[m.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&P(x),Object.keys(j).length===0&&_.delete(O)}i.remove(x)}function P(x){const m=i.get(x);e.deleteTexture(m.__webglTexture);const O=x.source,j=_.get(O);delete j[m.__cacheKey],o.memory.textures--}function R(x){const m=i.get(x);if(x.depthTexture&&(x.depthTexture.dispose(),i.remove(x.depthTexture)),x.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(m.__webglFramebuffer[j]))for(let Q=0;Q<m.__webglFramebuffer[j].length;Q++)e.deleteFramebuffer(m.__webglFramebuffer[j][Q]);else e.deleteFramebuffer(m.__webglFramebuffer[j]);m.__webglDepthbuffer&&e.deleteRenderbuffer(m.__webglDepthbuffer[j])}else{if(Array.isArray(m.__webglFramebuffer))for(let j=0;j<m.__webglFramebuffer.length;j++)e.deleteFramebuffer(m.__webglFramebuffer[j]);else e.deleteFramebuffer(m.__webglFramebuffer);if(m.__webglDepthbuffer&&e.deleteRenderbuffer(m.__webglDepthbuffer),m.__webglMultisampledFramebuffer&&e.deleteFramebuffer(m.__webglMultisampledFramebuffer),m.__webglColorRenderbuffer)for(let j=0;j<m.__webglColorRenderbuffer.length;j++)m.__webglColorRenderbuffer[j]&&e.deleteRenderbuffer(m.__webglColorRenderbuffer[j]);m.__webglDepthRenderbuffer&&e.deleteRenderbuffer(m.__webglDepthRenderbuffer)}const O=x.textures;for(let j=0,Q=O.length;j<Q;j++){const te=i.get(O[j]);te.__webglTexture&&(e.deleteTexture(te.__webglTexture),o.memory.textures--),i.remove(O[j])}i.remove(x)}let F=0;function B(){F=0}function z(){return F}function N(x){F=x}function I(){const x=F;return x>=a.maxTextures&&We("WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+a.maxTextures),F+=1,x}function H(x){const m=[];return m.push(x.wrapS),m.push(x.wrapT),m.push(x.wrapR||0),m.push(x.magFilter),m.push(x.minFilter),m.push(x.anisotropy),m.push(x.internalFormat),m.push(x.format),m.push(x.type),m.push(x.generateMipmaps),m.push(x.premultiplyAlpha),m.push(x.flipY),m.push(x.unpackAlignment),m.push(x.colorSpace),m.join()}function k(x,m){const O=i.get(x);if(x.isVideoTexture&&Ze(x),x.isRenderTargetTexture===!1&&x.isExternalTexture!==!0&&x.version>0&&O.__version!==x.version){const j=x.image;if(j===null)We("WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)We("WebGLRenderer: Texture marked for update but image is incomplete");else{be(O,x,m);return}}else x.isExternalTexture&&(O.__webglTexture=x.sourceTexture?x.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,O.__webglTexture,e.TEXTURE0+m)}function K(x,m){const O=i.get(x);if(x.isRenderTargetTexture===!1&&x.version>0&&O.__version!==x.version){be(O,x,m);return}else x.isExternalTexture&&(O.__webglTexture=x.sourceTexture?x.sourceTexture:null);t.bindTexture(e.TEXTURE_2D_ARRAY,O.__webglTexture,e.TEXTURE0+m)}function re(x,m){const O=i.get(x);if(x.isRenderTargetTexture===!1&&x.version>0&&O.__version!==x.version){be(O,x,m);return}t.bindTexture(e.TEXTURE_3D,O.__webglTexture,e.TEXTURE0+m)}function he(x,m){const O=i.get(x);if(x.isCubeDepthTexture!==!0&&x.version>0&&O.__version!==x.version){we(O,x,m);return}t.bindTexture(e.TEXTURE_CUBE_MAP,O.__webglTexture,e.TEXTURE0+m)}const J={[pi]:e.REPEAT,[Yn]:e.CLAMP_TO_EDGE,[Qa]:e.MIRRORED_REPEAT},Ae={[Zt]:e.NEAREST,[Ja]:e.NEAREST_MIPMAP_NEAREST,[Bn]:e.NEAREST_MIPMAP_LINEAR,[mt]:e.LINEAR,[oi]:e.LINEAR_MIPMAP_NEAREST,[jt]:e.LINEAR_MIPMAP_LINEAR},Ne={[Ds]:e.NEVER,[Us]:e.ALWAYS,[Is]:e.LESS,[or]:e.LEQUAL,[ys]:e.EQUAL,[ar]:e.GEQUAL,[Ps]:e.GREATER,[Ls]:e.NOTEQUAL};function Ce(x,m){if(m.type===an&&n.has("OES_texture_float_linear")===!1&&(m.magFilter===mt||m.magFilter===oi||m.magFilter===Bn||m.magFilter===jt||m.minFilter===mt||m.minFilter===oi||m.minFilter===Bn||m.minFilter===jt)&&We("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(x,e.TEXTURE_WRAP_S,J[m.wrapS]),e.texParameteri(x,e.TEXTURE_WRAP_T,J[m.wrapT]),(x===e.TEXTURE_3D||x===e.TEXTURE_2D_ARRAY)&&e.texParameteri(x,e.TEXTURE_WRAP_R,J[m.wrapR]),e.texParameteri(x,e.TEXTURE_MAG_FILTER,Ae[m.magFilter]),e.texParameteri(x,e.TEXTURE_MIN_FILTER,Ae[m.minFilter]),m.compareFunction&&(e.texParameteri(x,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(x,e.TEXTURE_COMPARE_FUNC,Ne[m.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(m.magFilter===Zt||m.minFilter!==Bn&&m.minFilter!==jt||m.type===an&&n.has("OES_texture_float_linear")===!1)return;if(m.anisotropy>1||i.get(m).__currentAnisotropy){const O=n.get("EXT_texture_filter_anisotropic");e.texParameterf(x,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(m.anisotropy,a.getMaxAnisotropy())),i.get(m).__currentAnisotropy=m.anisotropy}}}function Y(x,m){let O=!1;x.__webglInit===void 0&&(x.__webglInit=!0,m.addEventListener("dispose",L));const j=m.source;let Q=_.get(j);Q===void 0&&(Q={},_.set(j,Q));const te=H(m);if(te!==x.__cacheKey){Q[te]===void 0&&(Q[te]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,O=!0),Q[te].usedTimes++;const ce=Q[x.__cacheKey];ce!==void 0&&(Q[x.__cacheKey].usedTimes--,ce.usedTimes===0&&P(m)),x.__cacheKey=te,x.__webglTexture=Q[te].texture}return O}function le(x,m,O){return Math.floor(Math.floor(x/O)/m)}function ee(x,m,O,j){const te=x.updateRanges;if(te.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,m.width,m.height,O,j,m.data);else{te.sort((ve,oe)=>ve.start-oe.start);let ce=0;for(let ve=1;ve<te.length;ve++){const oe=te[ce],ne=te[ve],Le=oe.start+oe.count,Ie=le(ne.start,m.width,4),ke=le(oe.start,m.width,4);ne.start<=Le+1&&Ie===ke&&le(ne.start+ne.count-1,m.width,4)===Ie?oe.count=Math.max(oe.count,ne.start+ne.count-oe.start):(++ce,te[ce]=ne)}te.length=ce+1;const X=t.getParameter(e.UNPACK_ROW_LENGTH),Z=t.getParameter(e.UNPACK_SKIP_PIXELS),me=t.getParameter(e.UNPACK_SKIP_ROWS);t.pixelStorei(e.UNPACK_ROW_LENGTH,m.width);for(let ve=0,oe=te.length;ve<oe;ve++){const ne=te[ve],Le=Math.floor(ne.start/4),Ie=Math.ceil(ne.count/4),ke=Le%m.width,y=Math.floor(Le/m.width),ie=Ie,q=1;t.pixelStorei(e.UNPACK_SKIP_PIXELS,ke),t.pixelStorei(e.UNPACK_SKIP_ROWS,y),t.texSubImage2D(e.TEXTURE_2D,0,ke,y,ie,q,O,j,m.data)}x.clearUpdateRanges(),t.pixelStorei(e.UNPACK_ROW_LENGTH,X),t.pixelStorei(e.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(e.UNPACK_SKIP_ROWS,me)}}function be(x,m,O){let j=e.TEXTURE_2D;(m.isDataArrayTexture||m.isCompressedArrayTexture)&&(j=e.TEXTURE_2D_ARRAY),m.isData3DTexture&&(j=e.TEXTURE_3D);const Q=Y(x,m),te=m.source;t.bindTexture(j,x.__webglTexture,e.TEXTURE0+O);const ce=i.get(te);if(te.version!==ce.__version||Q===!0){if(t.activeTexture(e.TEXTURE0+O),(typeof ImageBitmap<"u"&&m.image instanceof ImageBitmap)===!1){const q=tt.getPrimaries(tt.workingColorSpace),_e=m.colorSpace===xn?null:tt.getPrimaries(m.colorSpace),se=m.colorSpace===xn||q===_e?e.NONE:e.BROWSER_DEFAULT_WEBGL;t.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,m.flipY),t.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),t.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,se)}t.pixelStorei(e.UNPACK_ALIGNMENT,m.unpackAlignment);let Z=p(m.image,!1,a.maxTextureSize);Z=fe(m,Z);const me=r.convert(m.format,m.colorSpace),ve=r.convert(m.type);let oe=C(m.internalFormat,me,ve,m.normalized,m.colorSpace,m.isVideoTexture);Ce(j,m);let ne;const Le=m.mipmaps,Ie=m.isVideoTexture!==!0,ke=ce.__version===void 0||Q===!0,y=te.dataReady,ie=A(m,Z);if(m.isDepthTexture)oe=w(m.format===Mn,m.type),ke&&(Ie?t.texStorage2D(e.TEXTURE_2D,1,oe,Z.width,Z.height):t.texImage2D(e.TEXTURE_2D,0,oe,Z.width,Z.height,0,me,ve,null));else if(m.isDataTexture)if(Le.length>0){Ie&&ke&&t.texStorage2D(e.TEXTURE_2D,ie,oe,Le[0].width,Le[0].height);for(let q=0,_e=Le.length;q<_e;q++)ne=Le[q],Ie?y&&t.texSubImage2D(e.TEXTURE_2D,q,0,0,ne.width,ne.height,me,ve,ne.data):t.texImage2D(e.TEXTURE_2D,q,oe,ne.width,ne.height,0,me,ve,ne.data);m.generateMipmaps=!1}else Ie?(ke&&t.texStorage2D(e.TEXTURE_2D,ie,oe,Z.width,Z.height),y&&ee(m,Z,me,ve)):t.texImage2D(e.TEXTURE_2D,0,oe,Z.width,Z.height,0,me,ve,Z.data);else if(m.isCompressedTexture)if(m.isCompressedArrayTexture){Ie&&ke&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ie,oe,Le[0].width,Le[0].height,Z.depth);for(let q=0,_e=Le.length;q<_e;q++)if(ne=Le[q],m.format!==zt)if(me!==null)if(Ie){if(y)if(m.layerUpdates.size>0){const se=ia(ne.width,ne.height,m.format,m.type);for(const $ of m.layerUpdates){const Ee=ne.data.subarray($*se/ne.data.BYTES_PER_ELEMENT,($+1)*se/ne.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,q,0,0,$,ne.width,ne.height,1,me,Ee)}m.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,q,0,0,0,ne.width,ne.height,Z.depth,me,ne.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,q,oe,ne.width,ne.height,Z.depth,0,ne.data,0,0);else We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ie?y&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,q,0,0,0,ne.width,ne.height,Z.depth,me,ve,ne.data):t.texImage3D(e.TEXTURE_2D_ARRAY,q,oe,ne.width,ne.height,Z.depth,0,me,ve,ne.data)}else{Ie&&ke&&t.texStorage2D(e.TEXTURE_2D,ie,oe,Le[0].width,Le[0].height);for(let q=0,_e=Le.length;q<_e;q++)ne=Le[q],m.format!==zt?me!==null?Ie?y&&t.compressedTexSubImage2D(e.TEXTURE_2D,q,0,0,ne.width,ne.height,me,ne.data):t.compressedTexImage2D(e.TEXTURE_2D,q,oe,ne.width,ne.height,0,ne.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ie?y&&t.texSubImage2D(e.TEXTURE_2D,q,0,0,ne.width,ne.height,me,ve,ne.data):t.texImage2D(e.TEXTURE_2D,q,oe,ne.width,ne.height,0,me,ve,ne.data)}else if(m.isDataArrayTexture)if(Ie){if(ke&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ie,oe,Z.width,Z.height,Z.depth),y)if(m.layerUpdates.size>0){const q=ia(Z.width,Z.height,m.format,m.type);for(const _e of m.layerUpdates){const se=Z.data.subarray(_e*q/Z.data.BYTES_PER_ELEMENT,(_e+1)*q/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,_e,Z.width,Z.height,1,me,ve,se)}m.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,me,ve,Z.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,oe,Z.width,Z.height,Z.depth,0,me,ve,Z.data);else if(m.isData3DTexture)Ie?(ke&&t.texStorage3D(e.TEXTURE_3D,ie,oe,Z.width,Z.height,Z.depth),y&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,me,ve,Z.data)):t.texImage3D(e.TEXTURE_3D,0,oe,Z.width,Z.height,Z.depth,0,me,ve,Z.data);else if(m.isFramebufferTexture){if(ke)if(Ie)t.texStorage2D(e.TEXTURE_2D,ie,oe,Z.width,Z.height);else{let q=Z.width,_e=Z.height;for(let se=0;se<ie;se++)t.texImage2D(e.TEXTURE_2D,se,oe,q,_e,0,me,ve,null),q>>=1,_e>>=1}}else if(m.isHTMLTexture){if("texElementImage2D"in e){const q=e.canvas;if(q.hasAttribute("layoutsubtree")||q.setAttribute("layoutsubtree","true"),Z.parentNode!==q){q.appendChild(Z),u.add(m),q.onpaint=Pe=>{const st=Pe.changedElements;for(const Ke of u)st.includes(Ke.image)&&(Ke.needsUpdate=!0)},q.requestPaint();return}const _e=0,se=e.RGBA,$=e.RGBA,Ee=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,_e,se,$,Ee,Z),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Le.length>0){if(Ie&&ke){const q=rt(Le[0]);t.texStorage2D(e.TEXTURE_2D,ie,oe,q.width,q.height)}for(let q=0,_e=Le.length;q<_e;q++)ne=Le[q],Ie?y&&t.texSubImage2D(e.TEXTURE_2D,q,0,0,me,ve,ne):t.texImage2D(e.TEXTURE_2D,q,oe,me,ve,ne);m.generateMipmaps=!1}else if(Ie){if(ke){const q=rt(Z);t.texStorage2D(e.TEXTURE_2D,ie,oe,q.width,q.height)}y&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,me,ve,Z)}else t.texImage2D(e.TEXTURE_2D,0,oe,me,ve,Z);h(m)&&S(j),ce.__version=te.version,m.onUpdate&&m.onUpdate(m)}x.__version=m.version}function we(x,m,O){if(m.image.length!==6)return;const j=Y(x,m),Q=m.source;t.bindTexture(e.TEXTURE_CUBE_MAP,x.__webglTexture,e.TEXTURE0+O);const te=i.get(Q);if(Q.version!==te.__version||j===!0){t.activeTexture(e.TEXTURE0+O);const ce=tt.getPrimaries(tt.workingColorSpace),X=m.colorSpace===xn?null:tt.getPrimaries(m.colorSpace),Z=m.colorSpace===xn||ce===X?e.NONE:e.BROWSER_DEFAULT_WEBGL;t.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,m.flipY),t.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),t.pixelStorei(e.UNPACK_ALIGNMENT,m.unpackAlignment),t.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const me=m.isCompressedTexture||m.image[0].isCompressedTexture,ve=m.image[0]&&m.image[0].isDataTexture,oe=[];for(let $=0;$<6;$++)!me&&!ve?oe[$]=p(m.image[$],!0,a.maxCubemapSize):oe[$]=ve?m.image[$].image:m.image[$],oe[$]=fe(m,oe[$]);const ne=oe[0],Le=r.convert(m.format,m.colorSpace),Ie=r.convert(m.type),ke=C(m.internalFormat,Le,Ie,m.normalized,m.colorSpace),y=m.isVideoTexture!==!0,ie=te.__version===void 0||j===!0,q=Q.dataReady;let _e=A(m,ne);Ce(e.TEXTURE_CUBE_MAP,m);let se;if(me){y&&ie&&t.texStorage2D(e.TEXTURE_CUBE_MAP,_e,ke,ne.width,ne.height);for(let $=0;$<6;$++){se=oe[$].mipmaps;for(let Ee=0;Ee<se.length;Ee++){const Pe=se[Ee];m.format!==zt?Le!==null?y?q&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee,0,0,Pe.width,Pe.height,Le,Pe.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee,ke,Pe.width,Pe.height,0,Pe.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):y?q&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee,0,0,Pe.width,Pe.height,Le,Ie,Pe.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee,ke,Pe.width,Pe.height,0,Le,Ie,Pe.data)}}}else{if(se=m.mipmaps,y&&ie){se.length>0&&_e++;const $=rt(oe[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,_e,ke,$.width,$.height)}for(let $=0;$<6;$++)if(ve){y?q&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,oe[$].width,oe[$].height,Le,Ie,oe[$].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,ke,oe[$].width,oe[$].height,0,Le,Ie,oe[$].data);for(let Ee=0;Ee<se.length;Ee++){const st=se[Ee].image[$].image;y?q&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee+1,0,0,st.width,st.height,Le,Ie,st.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee+1,ke,st.width,st.height,0,Le,Ie,st.data)}}else{y?q&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Le,Ie,oe[$]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,ke,Le,Ie,oe[$]);for(let Ee=0;Ee<se.length;Ee++){const Pe=se[Ee];y?q&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee+1,0,0,Le,Ie,Pe.image[$]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee+1,ke,Le,Ie,Pe.image[$])}}}h(m)&&S(e.TEXTURE_CUBE_MAP),te.__version=Q.version,m.onUpdate&&m.onUpdate(m)}x.__version=m.version}function Re(x,m,O,j,Q,te){const ce=r.convert(O.format,O.colorSpace),X=r.convert(O.type),Z=C(O.internalFormat,ce,X,O.normalized,O.colorSpace),me=i.get(m),ve=i.get(O);if(ve.__renderTarget=m,!me.__hasExternalTextures){const oe=Math.max(1,m.width>>te),ne=Math.max(1,m.height>>te);Q===e.TEXTURE_3D||Q===e.TEXTURE_2D_ARRAY?t.texImage3D(Q,te,Z,oe,ne,m.depth,0,ce,X,null):t.texImage2D(Q,te,Z,oe,ne,0,ce,X,null)}t.bindFramebuffer(e.FRAMEBUFFER,x),Ge(m)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,j,Q,ve.__webglTexture,0,dt(m)):(Q===e.TEXTURE_2D||Q>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,j,Q,ve.__webglTexture,te),t.bindFramebuffer(e.FRAMEBUFFER,null)}function nt(x,m,O){if(e.bindRenderbuffer(e.RENDERBUFFER,x),m.depthBuffer){const j=m.depthTexture,Q=j&&j.isDepthTexture?j.type:null,te=w(m.stencilBuffer,Q),ce=m.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ge(m)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,dt(m),te,m.width,m.height):O?e.renderbufferStorageMultisample(e.RENDERBUFFER,dt(m),te,m.width,m.height):e.renderbufferStorage(e.RENDERBUFFER,te,m.width,m.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,ce,e.RENDERBUFFER,x)}else{const j=m.textures;for(let Q=0;Q<j.length;Q++){const te=j[Q],ce=r.convert(te.format,te.colorSpace),X=r.convert(te.type),Z=C(te.internalFormat,ce,X,te.normalized,te.colorSpace);Ge(m)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,dt(m),Z,m.width,m.height):O?e.renderbufferStorageMultisample(e.RENDERBUFFER,dt(m),Z,m.width,m.height):e.renderbufferStorage(e.RENDERBUFFER,Z,m.width,m.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Be(x,m,O){const j=m.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(e.FRAMEBUFFER,x),!(m.depthTexture&&m.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=i.get(m.depthTexture);if(Q.__renderTarget=m,(!Q.__webglTexture||m.depthTexture.image.width!==m.width||m.depthTexture.image.height!==m.height)&&(m.depthTexture.image.width=m.width,m.depthTexture.image.height=m.height,m.depthTexture.needsUpdate=!0),j){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,m.depthTexture.addEventListener("dispose",L)),Q.__webglTexture===void 0){Q.__webglTexture=e.createTexture(),t.bindTexture(e.TEXTURE_CUBE_MAP,Q.__webglTexture),Ce(e.TEXTURE_CUBE_MAP,m.depthTexture);const me=r.convert(m.depthTexture.format),ve=r.convert(m.depthTexture.type);let oe;m.depthTexture.format===Rn?oe=e.DEPTH_COMPONENT24:m.depthTexture.format===Mn&&(oe=e.DEPTH24_STENCIL8);for(let ne=0;ne<6;ne++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,oe,m.width,m.height,0,me,ve,null)}}else k(m.depthTexture,0);const te=Q.__webglTexture,ce=dt(m),X=j?e.TEXTURE_CUBE_MAP_POSITIVE_X+O:e.TEXTURE_2D,Z=m.depthTexture.format===Mn?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(m.depthTexture.format===Rn)Ge(m)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Z,X,te,0,ce):e.framebufferTexture2D(e.FRAMEBUFFER,Z,X,te,0);else if(m.depthTexture.format===Mn)Ge(m)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Z,X,te,0,ce):e.framebufferTexture2D(e.FRAMEBUFFER,Z,X,te,0);else throw new Error("Unknown depthTexture format")}function Xe(x){const m=i.get(x),O=x.isWebGLCubeRenderTarget===!0;if(m.__boundDepthTexture!==x.depthTexture){const j=x.depthTexture;if(m.__depthDisposeCallback&&m.__depthDisposeCallback(),j){const Q=()=>{delete m.__boundDepthTexture,delete m.__depthDisposeCallback,j.removeEventListener("dispose",Q)};j.addEventListener("dispose",Q),m.__depthDisposeCallback=Q}m.__boundDepthTexture=j}if(x.depthTexture&&!m.__autoAllocateDepthBuffer)if(O)for(let j=0;j<6;j++)Be(m.__webglFramebuffer[j],x,j);else{const j=x.texture.mipmaps;j&&j.length>0?Be(m.__webglFramebuffer[0],x,0):Be(m.__webglFramebuffer,x,0)}else if(O){m.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(e.FRAMEBUFFER,m.__webglFramebuffer[j]),m.__webglDepthbuffer[j]===void 0)m.__webglDepthbuffer[j]=e.createRenderbuffer(),nt(m.__webglDepthbuffer[j],x,!1);else{const Q=x.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,te=m.__webglDepthbuffer[j];e.bindRenderbuffer(e.RENDERBUFFER,te),e.framebufferRenderbuffer(e.FRAMEBUFFER,Q,e.RENDERBUFFER,te)}}else{const j=x.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(e.FRAMEBUFFER,m.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,m.__webglFramebuffer),m.__webglDepthbuffer===void 0)m.__webglDepthbuffer=e.createRenderbuffer(),nt(m.__webglDepthbuffer,x,!1);else{const Q=x.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,te=m.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,te),e.framebufferRenderbuffer(e.FRAMEBUFFER,Q,e.RENDERBUFFER,te)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function et(x,m,O){const j=i.get(x);m!==void 0&&Re(j.__webglFramebuffer,x,x.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),O!==void 0&&Xe(x)}function Oe(x){const m=x.texture,O=i.get(x),j=i.get(m);x.addEventListener("dispose",v);const Q=x.textures,te=x.isWebGLCubeRenderTarget===!0,ce=Q.length>1;if(ce||(j.__webglTexture===void 0&&(j.__webglTexture=e.createTexture()),j.__version=m.version,o.memory.textures++),te){O.__webglFramebuffer=[];for(let X=0;X<6;X++)if(m.mipmaps&&m.mipmaps.length>0){O.__webglFramebuffer[X]=[];for(let Z=0;Z<m.mipmaps.length;Z++)O.__webglFramebuffer[X][Z]=e.createFramebuffer()}else O.__webglFramebuffer[X]=e.createFramebuffer()}else{if(m.mipmaps&&m.mipmaps.length>0){O.__webglFramebuffer=[];for(let X=0;X<m.mipmaps.length;X++)O.__webglFramebuffer[X]=e.createFramebuffer()}else O.__webglFramebuffer=e.createFramebuffer();if(ce)for(let X=0,Z=Q.length;X<Z;X++){const me=i.get(Q[X]);me.__webglTexture===void 0&&(me.__webglTexture=e.createTexture(),o.memory.textures++)}if(x.samples>0&&Ge(x)===!1){O.__webglMultisampledFramebuffer=e.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let X=0;X<Q.length;X++){const Z=Q[X];O.__webglColorRenderbuffer[X]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,O.__webglColorRenderbuffer[X]);const me=r.convert(Z.format,Z.colorSpace),ve=r.convert(Z.type),oe=C(Z.internalFormat,me,ve,Z.normalized,Z.colorSpace,x.isXRRenderTarget===!0),ne=dt(x);e.renderbufferStorageMultisample(e.RENDERBUFFER,ne,oe,x.width,x.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+X,e.RENDERBUFFER,O.__webglColorRenderbuffer[X])}e.bindRenderbuffer(e.RENDERBUFFER,null),x.depthBuffer&&(O.__webglDepthRenderbuffer=e.createRenderbuffer(),nt(O.__webglDepthRenderbuffer,x,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(te){t.bindTexture(e.TEXTURE_CUBE_MAP,j.__webglTexture),Ce(e.TEXTURE_CUBE_MAP,m);for(let X=0;X<6;X++)if(m.mipmaps&&m.mipmaps.length>0)for(let Z=0;Z<m.mipmaps.length;Z++)Re(O.__webglFramebuffer[X][Z],x,m,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+X,Z);else Re(O.__webglFramebuffer[X],x,m,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);h(m)&&S(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let X=0,Z=Q.length;X<Z;X++){const me=Q[X],ve=i.get(me);let oe=e.TEXTURE_2D;(x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(oe=x.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(oe,ve.__webglTexture),Ce(oe,me),Re(O.__webglFramebuffer,x,me,e.COLOR_ATTACHMENT0+X,oe,0),h(me)&&S(oe)}t.unbindTexture()}else{let X=e.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(X=x.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(X,j.__webglTexture),Ce(X,m),m.mipmaps&&m.mipmaps.length>0)for(let Z=0;Z<m.mipmaps.length;Z++)Re(O.__webglFramebuffer[Z],x,m,e.COLOR_ATTACHMENT0,X,Z);else Re(O.__webglFramebuffer,x,m,e.COLOR_ATTACHMENT0,X,0);h(m)&&S(X),t.unbindTexture()}x.depthBuffer&&Xe(x)}function ut(x){const m=x.textures;for(let O=0,j=m.length;O<j;O++){const Q=m[O];if(h(Q)){const te=b(x),ce=i.get(Q).__webglTexture;t.bindTexture(te,ce),S(te),t.unbindTexture()}}}const it=[],At=[];function U(x){if(x.samples>0){if(Ge(x)===!1){const m=x.textures,O=x.width,j=x.height;let Q=e.COLOR_BUFFER_BIT;const te=x.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ce=i.get(x),X=m.length>1;if(X)for(let me=0;me<m.length;me++)t.bindFramebuffer(e.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,ce.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const Z=x.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let me=0;me<m.length;me++){if(x.resolveDepthBuffer&&(x.depthBuffer&&(Q|=e.DEPTH_BUFFER_BIT),x.stencilBuffer&&x.resolveStencilBuffer&&(Q|=e.STENCIL_BUFFER_BIT)),X){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,ce.__webglColorRenderbuffer[me]);const ve=i.get(m[me]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,ve,0)}e.blitFramebuffer(0,0,O,j,0,0,O,j,Q,e.NEAREST),c===!0&&(it.length=0,At.length=0,it.push(e.COLOR_ATTACHMENT0+me),x.depthBuffer&&x.resolveDepthBuffer===!1&&(it.push(te),At.push(te),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,At)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,it))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),X)for(let me=0;me<m.length;me++){t.bindFramebuffer(e.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.RENDERBUFFER,ce.__webglColorRenderbuffer[me]);const ve=i.get(m[me]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,ce.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.TEXTURE_2D,ve,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(x.depthBuffer&&x.resolveDepthBuffer===!1&&c){const m=x.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[m])}}}function dt(x){return Math.min(a.maxSamples,x.samples)}function Ge(x){const m=i.get(x);return x.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&m.__useRenderToTexture!==!1}function Ze(x){const m=o.render.frame;d.get(x)!==m&&(d.set(x,m),x.update())}function fe(x,m){const O=x.colorSpace,j=x.format,Q=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||O!==Ft&&O!==xn&&(tt.getTransfer(O)===Qe?(j!==zt||Q!==kt)&&We("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",O)),m}function rt(x){return typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement?(l.width=x.naturalWidth||x.width,l.height=x.naturalHeight||x.height):typeof VideoFrame<"u"&&x instanceof VideoFrame?(l.width=x.displayWidth,l.height=x.displayHeight):(l.width=x.width,l.height=x.height),l}this.allocateTextureUnit=I,this.resetTextureUnits=B,this.getTextureUnits=z,this.setTextureUnits=N,this.setTexture2D=k,this.setTexture2DArray=K,this.setTexture3D=re,this.setTextureCube=he,this.rebindTextures=et,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=U,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=Ge,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Lp(e,n){function t(i,a=xn){let r;const o=tt.getTransfer(a);if(i===kt)return e.UNSIGNED_BYTE;if(i===io)return e.UNSIGNED_SHORT_4_4_4_4;if(i===ro)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Hs)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Vs)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===ks)return e.BYTE;if(i===zs)return e.SHORT;if(i===hi)return e.UNSIGNED_SHORT;if(i===oo)return e.INT;if(i===mn)return e.UNSIGNED_INT;if(i===an)return e.FLOAT;if(i===ln)return e.HALF_FLOAT;if(i===Ws)return e.ALPHA;if(i===Xs)return e.RGB;if(i===zt)return e.RGBA;if(i===Rn)return e.DEPTH_COMPONENT;if(i===Mn)return e.DEPTH_STENCIL;if(i===Ks)return e.RED;if(i===no)return e.RED_INTEGER;if(i===Cn)return e.RG;if(i===to)return e.RG_INTEGER;if(i===eo)return e.RGBA_INTEGER;if(i===bi||i===Ri||i===Ci||i===wi)if(o===Qe)if(r=n.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===bi)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ri)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ci)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===wi)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=n.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===bi)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ri)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ci)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===wi)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Mr||i===Tr||i===Ar||i===br)if(r=n.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Mr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Tr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ar)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===br)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Rr||i===Cr||i===wr||i===Lr||i===Pr||i===Xi||i===yr)if(r=n.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Rr||i===Cr)return o===Qe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===wr)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Lr)return r.COMPRESSED_R11_EAC;if(i===Pr)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Xi)return r.COMPRESSED_RG11_EAC;if(i===yr)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ir||i===Ur||i===Dr||i===Nr||i===Fr||i===Or||i===Br||i===Gr||i===Hr||i===Vr||i===kr||i===zr||i===Wr||i===Xr)if(r=n.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ir)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ur)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Dr)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Nr)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Fr)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Or)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Br)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Gr)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Hr)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Vr)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===kr)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===zr)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wr)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Xr)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Kr||i===qr||i===Yr)if(r=n.get("EXT_texture_compression_bptc"),r!==null){if(i===Kr)return o===Qe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===qr)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Yr)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===jr||i===Zr||i===Ki||i===$r)if(r=n.get("EXT_texture_compression_rgtc"),r!==null){if(i===jr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Zr)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ki)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===$r)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===qn?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const Pp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yp=`
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

}`;class Ip{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new ao(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Qt({vertexShader:Pp,fragmentShader:yp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Kt(new sr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Up extends cs{constructor(n,t){super();const i=this;let a=null,r=1,o=null,s="local-floor",c=1,l=null,d=null,u=null,f=null,_=null,E=null;const T=typeof XRWebGLBinding<"u",p=new Ip,h={},S=t.getContextAttributes();let b=null,C=null;const w=[],A=[],L=new St;let v=null;const M=new zn;M.viewport=new Mt;const P=new zn;P.viewport=new Mt;const R=[M,P],F=new ls;let B=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let le=w[Y];return le===void 0&&(le=new Ai,w[Y]=le),le.getTargetRaySpace()},this.getControllerGrip=function(Y){let le=w[Y];return le===void 0&&(le=new Ai,w[Y]=le),le.getGripSpace()},this.getHand=function(Y){let le=w[Y];return le===void 0&&(le=new Ai,w[Y]=le),le.getHandSpace()};function N(Y){const le=A.indexOf(Y.inputSource);if(le===-1)return;const ee=w[le];ee!==void 0&&(ee.update(Y.inputSource,Y.frame,l||o),ee.dispatchEvent({type:Y.type,data:Y.inputSource}))}function I(){a.removeEventListener("select",N),a.removeEventListener("selectstart",N),a.removeEventListener("selectend",N),a.removeEventListener("squeeze",N),a.removeEventListener("squeezestart",N),a.removeEventListener("squeezeend",N),a.removeEventListener("end",I),a.removeEventListener("inputsourceschange",H);for(let Y=0;Y<w.length;Y++){const le=A[Y];le!==null&&(A[Y]=null,w[Y].disconnect(le))}B=null,z=null,p.reset();for(const Y in h)delete h[Y];n.setRenderTarget(b),_=null,f=null,u=null,a=null,C=null,Ce.stop(),i.isPresenting=!1,n.setPixelRatio(v),n.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&We("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){s=Y,i.isPresenting===!0&&We("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:_},this.getBinding=function(){return u===null&&T&&(u=new XRWebGLBinding(a,t)),u},this.getFrame=function(){return E},this.getSession=function(){return a},this.setSession=async function(Y){if(a=Y,a!==null){if(b=n.getRenderTarget(),a.addEventListener("select",N),a.addEventListener("selectstart",N),a.addEventListener("selectend",N),a.addEventListener("squeeze",N),a.addEventListener("squeezestart",N),a.addEventListener("squeezeend",N),a.addEventListener("end",I),a.addEventListener("inputsourceschange",H),S.xrCompatible!==!0&&await t.makeXRCompatible(),v=n.getPixelRatio(),n.getSize(L),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,be=null,we=null;S.depth&&(we=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=S.stencil?Mn:Rn,be=S.stencil?qn:mn);const Re={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Re),a.updateRenderState({layers:[f]}),n.setPixelRatio(1),n.setSize(f.textureWidth,f.textureHeight,!1),C=new Xt(f.textureWidth,f.textureHeight,{format:zt,type:kt,depthTexture:new Kn(f.textureWidth,f.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:S.stencil,colorSpace:n.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ee={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};_=new XRWebGLLayer(a,t,ee),a.updateRenderState({baseLayer:_}),n.setPixelRatio(1),n.setSize(_.framebufferWidth,_.framebufferHeight,!1),C=new Xt(_.framebufferWidth,_.framebufferHeight,{format:zt,type:kt,colorSpace:n.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await a.requestReferenceSpace(s),Ce.setContext(a),Ce.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function H(Y){for(let le=0;le<Y.removed.length;le++){const ee=Y.removed[le],be=A.indexOf(ee);be>=0&&(A[be]=null,w[be].disconnect(ee))}for(let le=0;le<Y.added.length;le++){const ee=Y.added[le];let be=A.indexOf(ee);if(be===-1){for(let Re=0;Re<w.length;Re++)if(Re>=A.length){A.push(ee),be=Re;break}else if(A[Re]===null){A[Re]=ee,be=Re;break}if(be===-1)break}const we=w[be];we&&we.connect(ee)}}const k=new ae,K=new ae;function re(Y,le,ee){k.setFromMatrixPosition(le.matrixWorld),K.setFromMatrixPosition(ee.matrixWorld);const be=k.distanceTo(K),we=le.projectionMatrix.elements,Re=ee.projectionMatrix.elements,nt=we[14]/(we[10]-1),Be=we[14]/(we[10]+1),Xe=(we[9]+1)/we[5],et=(we[9]-1)/we[5],Oe=(we[8]-1)/we[0],ut=(Re[8]+1)/Re[0],it=nt*Oe,At=nt*ut,U=be/(-Oe+ut),dt=U*-Oe;if(le.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(dt),Y.translateZ(U),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),we[10]===-1)Y.projectionMatrix.copy(le.projectionMatrix),Y.projectionMatrixInverse.copy(le.projectionMatrixInverse);else{const Ge=nt+U,Ze=Be+U,fe=it-dt,rt=At+(be-dt),x=Xe*Be/Ze*Ge,m=et*Be/Ze*Ge;Y.projectionMatrix.makePerspective(fe,rt,x,m,Ge,Ze),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function he(Y,le){le===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(le.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(a===null)return;let le=Y.near,ee=Y.far;p.texture!==null&&(p.depthNear>0&&(le=p.depthNear),p.depthFar>0&&(ee=p.depthFar)),F.near=P.near=M.near=le,F.far=P.far=M.far=ee,(B!==F.near||z!==F.far)&&(a.updateRenderState({depthNear:F.near,depthFar:F.far}),B=F.near,z=F.far),F.layers.mask=Y.layers.mask|6,M.layers.mask=F.layers.mask&-5,P.layers.mask=F.layers.mask&-3;const be=Y.parent,we=F.cameras;he(F,be);for(let Re=0;Re<we.length;Re++)he(we[Re],be);we.length===2?re(F,M,P):F.projectionMatrix.copy(M.projectionMatrix),J(Y,F,be)};function J(Y,le,ee){ee===null?Y.matrix.copy(le.matrixWorld):(Y.matrix.copy(ee.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(le.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(le.projectionMatrix),Y.projectionMatrixInverse.copy(le.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=fs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&_===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=Y)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(Y){return h[Y]};let Ae=null;function Ne(Y,le){if(d=le.getViewerPose(l||o),E=le,d!==null){const ee=d.views;_!==null&&(n.setRenderTargetFramebuffer(C,_.framebuffer),n.setRenderTarget(C));let be=!1;ee.length!==F.cameras.length&&(F.cameras.length=0,be=!0);for(let Be=0;Be<ee.length;Be++){const Xe=ee[Be];let et=null;if(_!==null)et=_.getViewport(Xe);else{const ut=u.getViewSubImage(f,Xe);et=ut.viewport,Be===0&&(n.setRenderTargetTextures(C,ut.colorTexture,ut.depthStencilTexture),n.setRenderTarget(C))}let Oe=R[Be];Oe===void 0&&(Oe=new zn,Oe.layers.enable(Be),Oe.viewport=new Mt,R[Be]=Oe),Oe.matrix.fromArray(Xe.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(Xe.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(et.x,et.y,et.width,et.height),Be===0&&(F.matrix.copy(Oe.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),be===!0&&F.cameras.push(Oe)}const we=a.enabledFeatures;if(we&&we.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&T){u=i.getBinding();const Be=u.getDepthInformation(ee[0]);Be&&Be.isValid&&Be.texture&&p.init(Be,a.renderState)}if(we&&we.includes("camera-access")&&T){n.state.unbindTexture(),u=i.getBinding();for(let Be=0;Be<ee.length;Be++){const Xe=ee[Be].camera;if(Xe){let et=h[Xe];et||(et=new ao,h[Xe]=et);const Oe=u.getCameraImage(Xe);et.sourceTexture=Oe}}}}for(let ee=0;ee<w.length;ee++){const be=A[ee],we=w[ee];be!==null&&we!==void 0&&we.update(be,le,l||o)}Ae&&Ae(Y,le),le.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:le}),E=null}const Ce=new Ro;Ce.setAnimationLoop(Ne),this.setAnimationLoop=function(Y){Ae=Y},this.dispose=function(){}}}const Dp=new vt,Uo=new He;Uo.set(-1,0,0,0,1,0,0,0,1);function Np(e,n){function t(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function i(p,h){h.color.getRGB(p.fogColor.value,co(e)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function a(p,h,S,b,C){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(p,h):h.isMeshLambertMaterial?(r(p,h),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(p,h),u(p,h)):h.isMeshPhongMaterial?(r(p,h),d(p,h),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(p,h),f(p,h),h.isMeshPhysicalMaterial&&_(p,h,C)):h.isMeshMatcapMaterial?(r(p,h),E(p,h)):h.isMeshDepthMaterial?r(p,h):h.isMeshDistanceMaterial?(r(p,h),T(p,h)):h.isMeshNormalMaterial?r(p,h):h.isLineBasicMaterial?(o(p,h),h.isLineDashedMaterial&&s(p,h)):h.isPointsMaterial?c(p,h,S,b):h.isSpriteMaterial?l(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,t(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===Ct&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,t(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===Ct&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,t(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,t(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);const S=n.get(h),b=S.envMap,C=S.envMapRotation;b&&(p.envMap.value=b,p.envMapRotation.value.setFromMatrix4(Dp.makeRotationFromEuler(C)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Uo),p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap&&(p.lightMap.value=h.lightMap,p.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,p.lightMapTransform)),h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,p.aoMapTransform))}function o(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform))}function s(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function c(p,h,S,b){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*S,p.scale.value=b*.5,h.map&&(p.map.value=h.map,t(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function l(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function d(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function u(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function f(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,p.roughnessMapTransform)),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function _(p,h,S){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Ct&&p.clearcoatNormalScale.value.negate())),h.dispersion>0&&(p.dispersion.value=h.dispersion),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,p.specularIntensityMapTransform))}function E(p,h){h.matcap&&(p.matcap.value=h.matcap)}function T(p,h){const S=n.get(h).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function Fp(e,n,t,i){let a={},r={},o=[];const s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,b){const C=b.program;i.uniformBlockBinding(S,C)}function l(S,b){let C=a[S.id];C===void 0&&(E(S),C=d(S),a[S.id]=C,S.addEventListener("dispose",p));const w=b.program;i.updateUBOMapping(S,w);const A=n.render.frame;r[S.id]!==A&&(f(S),r[S.id]=A)}function d(S){const b=u();S.__bindingPointIndex=b;const C=e.createBuffer(),w=S.__size,A=S.usage;return e.bindBuffer(e.UNIFORM_BUFFER,C),e.bufferData(e.UNIFORM_BUFFER,w,A),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,b,C),C}function u(){for(let S=0;S<s;S++)if(o.indexOf(S)===-1)return o.push(S),S;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const b=a[S.id],C=S.uniforms,w=S.__cache;e.bindBuffer(e.UNIFORM_BUFFER,b);for(let A=0,L=C.length;A<L;A++){const v=Array.isArray(C[A])?C[A]:[C[A]];for(let M=0,P=v.length;M<P;M++){const R=v[M];if(_(R,A,M,w)===!0){const F=R.__offset,B=Array.isArray(R.value)?R.value:[R.value];let z=0;for(let N=0;N<B.length;N++){const I=B[N],H=T(I);typeof I=="number"||typeof I=="boolean"?(R.__data[0]=I,e.bufferSubData(e.UNIFORM_BUFFER,F+z,R.__data)):I.isMatrix3?(R.__data[0]=I.elements[0],R.__data[1]=I.elements[1],R.__data[2]=I.elements[2],R.__data[3]=0,R.__data[4]=I.elements[3],R.__data[5]=I.elements[4],R.__data[6]=I.elements[5],R.__data[7]=0,R.__data[8]=I.elements[6],R.__data[9]=I.elements[7],R.__data[10]=I.elements[8],R.__data[11]=0):ArrayBuffer.isView(I)?R.__data.set(new I.constructor(I.buffer,I.byteOffset,R.__data.length)):(I.toArray(R.__data,z),z+=H.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,F,R.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function _(S,b,C,w){const A=S.value,L=b+"_"+C;if(w[L]===void 0)return typeof A=="number"||typeof A=="boolean"?w[L]=A:ArrayBuffer.isView(A)?w[L]=A.slice():w[L]=A.clone(),!0;{const v=w[L];if(typeof A=="number"||typeof A=="boolean"){if(v!==A)return w[L]=A,!0}else{if(ArrayBuffer.isView(A))return!0;if(v.equals(A)===!1)return v.copy(A),!0}}return!1}function E(S){const b=S.uniforms;let C=0;const w=16;for(let L=0,v=b.length;L<v;L++){const M=Array.isArray(b[L])?b[L]:[b[L]];for(let P=0,R=M.length;P<R;P++){const F=M[P],B=Array.isArray(F.value)?F.value:[F.value];for(let z=0,N=B.length;z<N;z++){const I=B[z],H=T(I),k=C%w,K=k%H.boundary,re=k+K;C+=K,re!==0&&w-re<H.storage&&(C+=w-re),F.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=C,C+=H.storage}}}const A=C%w;return A>0&&(C+=w-A),S.__size=C,S.__cache={},this}function T(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?We("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(b.boundary=16,b.storage=S.byteLength):We("WebGLRenderer: Unsupported uniform value type.",S),b}function p(S){const b=S.target;b.removeEventListener("dispose",p);const C=o.indexOf(b.__bindingPointIndex);o.splice(C,1),e.deleteBuffer(a[b.id]),delete a[b.id],delete r[b.id]}function h(){for(const S in a)e.deleteBuffer(a[S]);o=[],a={},r={}}return{bind:c,update:l,dispose:h}}const Op=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Gt=null;function Bp(){return Gt===null&&(Gt=new $a(Op,16,16,Cn,ln),Gt.name="DFG_LUT",Gt.minFilter=mt,Gt.magFilter=mt,Gt.wrapS=Yn,Gt.wrapT=Yn,Gt.generateMipmaps=!1,Gt.needsUpdate=!0),Gt}class Tm{constructor(n={}){const{canvas:t=rs(),context:i=null,depth:a=!0,stencil:r=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:_=kt}=n;this.isWebGLRenderer=!0;let E;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=i.getContextAttributes().alpha}else E=o;const T=_,p=new Set([eo,to,no]),h=new Set([kt,mn,hi,qn,io,ro]),S=new Uint32Array(4),b=new Int32Array(4),C=new ae;let w=null,A=null;const L=[],v=[];let M=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let R=!1,F=null;this._outputColorSpace=cn;let B=0,z=0,N=null,I=-1,H=null;const k=new Mt,K=new Mt;let re=null;const he=new ze(0);let J=0,Ae=t.width,Ne=t.height,Ce=1,Y=null,le=null;const ee=new Mt(0,0,Ae,Ne),be=new Mt(0,0,Ae,Ne);let we=!1;const Re=new Za;let nt=!1,Be=!1;const Xe=new vt,et=new ae,Oe=new Mt,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let it=!1;function At(){return N===null?Ce:1}let U=i;function dt(g,D){return t.getContext(g,D)}try{const g={alpha:!0,depth:a,stencil:r,antialias:s,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${as}`),t.addEventListener("webglcontextlost",$,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),U===null){const D="webgl2";if(U=dt(D,g),U===null)throw dt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(g){throw Je("WebGLRenderer: "+g.message),g}let Ge,Ze,fe,rt,x,m,O,j,Q,te,ce,X,Z,me,ve,oe,ne,Le,Ie,ke,y,ie,q;function _e(){Ge=new Bu(U),Ge.init(),y=new Lp(U,Ge),Ze=new Pu(U,Ge,n,y),fe=new Cp(U,Ge),Ze.reversedDepthBuffer&&f&&fe.buffers.depth.setReversed(!0),rt=new Vu(U),x=new pp,m=new wp(U,Ge,fe,x,Ze,y,rt),O=new Ou(P),j=new Wc(U),ie=new wu(U,j),Q=new Gu(U,j,rt,ie),te=new zu(U,Q,j,ie,rt),Le=new ku(U,Ze,m),ve=new yu(x),ce=new dp(P,O,Ge,Ze,ie,ve),X=new Np(P,x),Z=new mp,me=new Ep(Ge),ne=new Cu(P,O,fe,te,E,c),oe=new Rp(P,te,Ze),q=new Fp(U,rt,Ze,fe),Ie=new Lu(U,Ge,rt),ke=new Hu(U,Ge,rt),rt.programs=ce.programs,P.capabilities=Ze,P.extensions=Ge,P.properties=x,P.renderLists=Z,P.shadowMap=oe,P.state=fe,P.info=rt}_e(),T!==kt&&(M=new Xu(T,t.width,t.height,a,r));const se=new Up(P,U);this.xr=se,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const g=Ge.get("WEBGL_lose_context");g&&g.loseContext()},this.forceContextRestore=function(){const g=Ge.get("WEBGL_lose_context");g&&g.restoreContext()},this.getPixelRatio=function(){return Ce},this.setPixelRatio=function(g){g!==void 0&&(Ce=g,this.setSize(Ae,Ne,!1))},this.getSize=function(g){return g.set(Ae,Ne)},this.setSize=function(g,D,W=!0){if(se.isPresenting){We("WebGLRenderer: Can't change size while VR device is presenting.");return}Ae=g,Ne=D,t.width=Math.floor(g*Ce),t.height=Math.floor(D*Ce),W===!0&&(t.style.width=g+"px",t.style.height=D+"px"),M!==null&&M.setSize(t.width,t.height),this.setViewport(0,0,g,D)},this.getDrawingBufferSize=function(g){return g.set(Ae*Ce,Ne*Ce).floor()},this.setDrawingBufferSize=function(g,D,W){Ae=g,Ne=D,Ce=W,t.width=Math.floor(g*W),t.height=Math.floor(D*W),this.setViewport(0,0,g,D)},this.setEffects=function(g){if(T===kt){Je("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(g){for(let D=0;D<g.length;D++)if(g[D].isOutputPass===!0){We("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(g||[])},this.getCurrentViewport=function(g){return g.copy(k)},this.getViewport=function(g){return g.copy(ee)},this.setViewport=function(g,D,W,G){g.isVector4?ee.set(g.x,g.y,g.z,g.w):ee.set(g,D,W,G),fe.viewport(k.copy(ee).multiplyScalar(Ce).round())},this.getScissor=function(g){return g.copy(be)},this.setScissor=function(g,D,W,G){g.isVector4?be.set(g.x,g.y,g.z,g.w):be.set(g,D,W,G),fe.scissor(K.copy(be).multiplyScalar(Ce).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(g){fe.setScissorTest(we=g)},this.setOpaqueSort=function(g){Y=g},this.setTransparentSort=function(g){le=g},this.getClearColor=function(g){return g.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor(...arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha(...arguments)},this.clear=function(g=!0,D=!0,W=!0){let G=0;if(g){let V=!1;if(N!==null){const pe=N.texture.format;V=p.has(pe)}if(V){const pe=N.texture.type,Se=h.has(pe),de=ne.getClearColor(),xe=ne.getClearAlpha(),Me=de.r,ye=de.g,De=de.b;Se?(S[0]=Me,S[1]=ye,S[2]=De,S[3]=xe,U.clearBufferuiv(U.COLOR,0,S)):(b[0]=Me,b[1]=ye,b[2]=De,b[3]=xe,U.clearBufferiv(U.COLOR,0,b))}else G|=U.COLOR_BUFFER_BIT}D&&(G|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(G|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&U.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(g){g.setRenderer(this),F=g},this.dispose=function(){t.removeEventListener("webglcontextlost",$,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),ne.dispose(),Z.dispose(),me.dispose(),x.dispose(),O.dispose(),te.dispose(),ie.dispose(),q.dispose(),ce.dispose(),se.dispose(),se.removeEventListener("sessionstart",ur),se.removeEventListener("sessionend",dr),fn.stop()};function $(g){g.preventDefault(),Sr("WebGLRenderer: Context Lost."),R=!0}function Ee(){Sr("WebGLRenderer: Context Restored."),R=!1;const g=rt.autoReset,D=oe.enabled,W=oe.autoUpdate,G=oe.needsUpdate,V=oe.type;_e(),rt.autoReset=g,oe.enabled=D,oe.autoUpdate=W,oe.needsUpdate=G,oe.type=V}function Pe(g){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",g.statusMessage)}function st(g){const D=g.target;D.removeEventListener("dispose",st),Ke(D)}function Ke(g){Yt(g),x.remove(g)}function Yt(g){const D=x.get(g).programs;D!==void 0&&(D.forEach(function(W){ce.releaseProgram(W)}),g.isShaderMaterial&&ce.releaseShaderCache(g))}this.renderBufferDirect=function(g,D,W,G,V,pe){D===null&&(D=ut);const Se=V.isMesh&&V.matrixWorld.determinant()<0,de=Zo(g,D,W,G,V);fe.setMaterial(G,Se);let xe=W.index,Me=1;if(G.wireframe===!0){if(xe=Q.getWireframeAttribute(W),xe===void 0)return;Me=2}const ye=W.drawRange,De=W.attributes.position;let Te=ye.start*Me,qe=(ye.start+ye.count)*Me;pe!==null&&(Te=Math.max(Te,pe.start*Me),qe=Math.min(qe,(pe.start+pe.count)*Me)),xe!==null?(Te=Math.max(Te,0),qe=Math.min(qe,xe.count)):De!=null&&(Te=Math.max(Te,0),qe=Math.min(qe,De.count));const ct=qe-Te;if(ct<0||ct===1/0)return;ie.setup(V,G,de,W,xe);let at,Ye=Ie;if(xe!==null&&(at=j.get(xe),Ye=ke,Ye.setIndex(at)),V.isMesh)G.wireframe===!0?(fe.setLineWidth(G.wireframeLinewidth*At()),Ye.setMode(U.LINES)):Ye.setMode(U.TRIANGLES);else if(V.isLine){let _t=G.linewidth;_t===void 0&&(_t=1),fe.setLineWidth(_t*At()),V.isLineSegments?Ye.setMode(U.LINES):V.isLineLoop?Ye.setMode(U.LINE_LOOP):Ye.setMode(U.LINE_STRIP)}else V.isPoints?Ye.setMode(U.POINTS):V.isSprite&&Ye.setMode(U.TRIANGLES);if(V.isBatchedMesh)if(Ge.get("WEBGL_multi_draw"))Ye.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const _t=V._multiDrawStarts,ge=V._multiDrawCounts,bt=V._multiDrawCount,Ve=xe?j.get(xe).bytesPerElement:1,wt=x.get(G).currentProgram.getUniforms();for(let Bt=0;Bt<bt;Bt++)wt.setValue(U,"_gl_DrawID",Bt),Ye.render(_t[Bt]/Ve,ge[Bt])}else if(V.isInstancedMesh)Ye.renderInstances(Te,ct,V.count);else if(W.isInstancedBufferGeometry){const _t=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,ge=Math.min(W.instanceCount,_t);Ye.renderInstances(Te,ct,ge)}else Ye.render(Te,ct)};function Ot(g,D,W){g.transparent===!0&&g.side===yt&&g.forceSinglePass===!1?(g.side=Ct,g.needsUpdate=!0,$n(g,D,W),g.side=bn,g.needsUpdate=!0,$n(g,D,W),g.side=yt):$n(g,D,W)}this.compile=function(g,D,W=null){W===null&&(W=g),A=me.get(W),A.init(D),v.push(A),W.traverseVisible(function(V){V.isLight&&V.layers.test(D.layers)&&(A.pushLight(V),V.castShadow&&A.pushShadow(V))}),g!==W&&g.traverseVisible(function(V){V.isLight&&V.layers.test(D.layers)&&(A.pushLight(V),V.castShadow&&A.pushShadow(V))}),A.setupLights();const G=new Set;return g.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const pe=V.material;if(pe)if(Array.isArray(pe))for(let Se=0;Se<pe.length;Se++){const de=pe[Se];Ot(de,W,V),G.add(de)}else Ot(pe,W,V),G.add(pe)}),A=v.pop(),G},this.compileAsync=function(g,D,W=null){const G=this.compile(g,D,W);return new Promise(V=>{function pe(){if(G.forEach(function(Se){x.get(Se).currentProgram.isReady()&&G.delete(Se)}),G.size===0){V(g);return}setTimeout(pe,10)}Ge.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Mi=null;function Yo(g){Mi&&Mi(g)}function ur(){fn.stop()}function dr(){fn.start()}const fn=new Ro;fn.setAnimationLoop(Yo),typeof self<"u"&&fn.setContext(self),this.setAnimationLoop=function(g){Mi=g,se.setAnimationLoop(g),g===null?fn.stop():fn.start()},se.addEventListener("sessionstart",ur),se.addEventListener("sessionend",dr),this.render=function(g,D){if(D!==void 0&&D.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;F!==null&&F.renderStart(g,D);const W=se.enabled===!0&&se.isPresenting===!0,G=M!==null&&(N===null||W)&&M.begin(P,N);if(g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(se.cameraAutoUpdate===!0&&se.updateCamera(D),D=se.getCamera()),g.isScene===!0&&g.onBeforeRender(P,g,D,N),A=me.get(g,v.length),A.init(D),A.state.textureUnits=m.getTextureUnits(),v.push(A),Xe.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Re.setFromProjectionMatrix(Xe,xr,D.reversedDepth),Be=this.localClippingEnabled,nt=ve.init(this.clippingPlanes,Be),w=Z.get(g,L.length),w.init(),L.push(w),se.enabled===!0&&se.isPresenting===!0){const Se=P.xr.getDepthSensingMesh();Se!==null&&Ti(Se,D,-1/0,P.sortObjects)}Ti(g,D,0,P.sortObjects),w.finish(),P.sortObjects===!0&&w.sort(Y,le),it=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,it&&ne.addToRenderList(w,g),this.info.render.frame++,nt===!0&&ve.beginShadows();const V=A.state.shadowsArray;if(oe.render(V,g,D),nt===!0&&ve.endShadows(),this.info.autoReset===!0&&this.info.reset(),(G&&M.hasRenderPass())===!1){const Se=w.opaque,de=w.transmissive;if(A.setupLights(),D.isArrayCamera){const xe=D.cameras;if(de.length>0)for(let Me=0,ye=xe.length;Me<ye;Me++){const De=xe[Me];hr(Se,de,g,De)}it&&ne.render(g);for(let Me=0,ye=xe.length;Me<ye;Me++){const De=xe[Me];pr(w,g,De,De.viewport)}}else de.length>0&&hr(Se,de,g,D),it&&ne.render(g),pr(w,g,D)}N!==null&&z===0&&(m.updateMultisampleRenderTarget(N),m.updateRenderTargetMipmap(N)),G&&M.end(P),g.isScene===!0&&g.onAfterRender(P,g,D),ie.resetDefaultState(),I=-1,H=null,v.pop(),v.length>0?(A=v[v.length-1],m.setTextureUnits(A.state.textureUnits),nt===!0&&ve.setGlobalState(P.clippingPlanes,A.state.camera)):A=null,L.pop(),L.length>0?w=L[L.length-1]:w=null,F!==null&&F.renderEnd()};function Ti(g,D,W,G){if(g.visible===!1)return;if(g.layers.test(D.layers)){if(g.isGroup)W=g.renderOrder;else if(g.isLOD)g.autoUpdate===!0&&g.update(D);else if(g.isLightProbeGrid)A.pushLightProbeGrid(g);else if(g.isLight)A.pushLight(g),g.castShadow&&A.pushShadow(g);else if(g.isSprite){if(!g.frustumCulled||Re.intersectsSprite(g)){G&&Oe.setFromMatrixPosition(g.matrixWorld).applyMatrix4(Xe);const Se=te.update(g),de=g.material;de.visible&&w.push(g,Se,de,W,Oe.z,null)}}else if((g.isMesh||g.isLine||g.isPoints)&&(!g.frustumCulled||Re.intersectsObject(g))){const Se=te.update(g),de=g.material;if(G&&(g.boundingSphere!==void 0?(g.boundingSphere===null&&g.computeBoundingSphere(),Oe.copy(g.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Oe.copy(Se.boundingSphere.center)),Oe.applyMatrix4(g.matrixWorld).applyMatrix4(Xe)),Array.isArray(de)){const xe=Se.groups;for(let Me=0,ye=xe.length;Me<ye;Me++){const De=xe[Me],Te=de[De.materialIndex];Te&&Te.visible&&w.push(g,Se,Te,W,Oe.z,De)}}else de.visible&&w.push(g,Se,de,W,Oe.z,null)}}const pe=g.children;for(let Se=0,de=pe.length;Se<de;Se++)Ti(pe[Se],D,W,G)}function pr(g,D,W,G){const{opaque:V,transmissive:pe,transparent:Se}=g;A.setupLightsView(W),nt===!0&&ve.setGlobalState(P.clippingPlanes,W),G&&fe.viewport(k.copy(G)),V.length>0&&Zn(V,D,W),pe.length>0&&Zn(pe,D,W),Se.length>0&&Zn(Se,D,W),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function hr(g,D,W,G){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[G.id]===void 0){const Te=Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[G.id]=new Xt(1,1,{generateMipmaps:!0,type:Te?ln:kt,minFilter:jt,samples:Math.max(4,Ze.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace})}const pe=A.state.transmissionRenderTarget[G.id],Se=G.viewport||k;pe.setSize(Se.z*P.transmissionResolutionScale,Se.w*P.transmissionResolutionScale);const de=P.getRenderTarget(),xe=P.getActiveCubeFace(),Me=P.getActiveMipmapLevel();P.setRenderTarget(pe),P.getClearColor(he),J=P.getClearAlpha(),J<1&&P.setClearColor(16777215,.5),P.clear(),it&&ne.render(W);const ye=P.toneMapping;P.toneMapping=Wt;const De=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),A.setupLightsView(G),nt===!0&&ve.setGlobalState(P.clippingPlanes,G),Zn(g,W,G),m.updateMultisampleRenderTarget(pe),m.updateRenderTargetMipmap(pe),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let qe=0,ct=D.length;qe<ct;qe++){const at=D[qe],{object:Ye,geometry:_t,material:ge,group:bt}=at;if(ge.side===yt&&Ye.layers.test(G.layers)){const Ve=ge.side;ge.side=Ct,ge.needsUpdate=!0,mr(Ye,W,G,_t,ge,bt),ge.side=Ve,ge.needsUpdate=!0,Te=!0}}Te===!0&&(m.updateMultisampleRenderTarget(pe),m.updateRenderTargetMipmap(pe))}P.setRenderTarget(de,xe,Me),P.setClearColor(he,J),De!==void 0&&(G.viewport=De),P.toneMapping=ye}function Zn(g,D,W){const G=D.isScene===!0?D.overrideMaterial:null;for(let V=0,pe=g.length;V<pe;V++){const Se=g[V],{object:de,geometry:xe,group:Me}=Se;let ye=Se.material;ye.allowOverride===!0&&G!==null&&(ye=G),de.layers.test(W.layers)&&mr(de,D,W,xe,ye,Me)}}function mr(g,D,W,G,V,pe){g.onBeforeRender(P,D,W,G,V,pe),g.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,g.matrixWorld),g.normalMatrix.getNormalMatrix(g.modelViewMatrix),V.onBeforeRender(P,D,W,G,g,pe),V.transparent===!0&&V.side===yt&&V.forceSinglePass===!1?(V.side=Ct,V.needsUpdate=!0,P.renderBufferDirect(W,D,G,V,g,pe),V.side=bn,V.needsUpdate=!0,P.renderBufferDirect(W,D,G,V,g,pe),V.side=yt):P.renderBufferDirect(W,D,G,V,g,pe),g.onAfterRender(P,D,W,G,V,pe)}function $n(g,D,W){D.isScene!==!0&&(D=ut);const G=x.get(g),V=A.state.lights,pe=A.state.shadowsArray,Se=V.state.version,de=ce.getParameters(g,V.state,pe,D,W,A.state.lightProbeGridArray),xe=ce.getProgramCacheKey(de);let Me=G.programs;G.environment=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?D.environment:null,G.fog=D.fog;const ye=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap;G.envMap=O.get(g.envMap||G.environment,ye),G.envMapRotation=G.environment!==null&&g.envMap===null?D.environmentRotation:g.envMapRotation,Me===void 0&&(g.addEventListener("dispose",st),Me=new Map,G.programs=Me);let De=Me.get(xe);if(De!==void 0){if(G.currentProgram===De&&G.lightsStateVersion===Se)return gr(g,de),De}else de.uniforms=ce.getUniforms(g),F!==null&&g.isNodeMaterial&&F.build(g,W,de),g.onBeforeCompile(de,P),De=ce.acquireProgram(de,xe),Me.set(xe,De),G.uniforms=de.uniforms;const Te=G.uniforms;return(!g.isShaderMaterial&&!g.isRawShaderMaterial||g.clipping===!0)&&(Te.clippingPlanes=ve.uniform),gr(g,de),G.needsLights=Qo(g),G.lightsStateVersion=Se,G.needsLights&&(Te.ambientLightColor.value=V.state.ambient,Te.lightProbe.value=V.state.probe,Te.directionalLights.value=V.state.directional,Te.directionalLightShadows.value=V.state.directionalShadow,Te.spotLights.value=V.state.spot,Te.spotLightShadows.value=V.state.spotShadow,Te.rectAreaLights.value=V.state.rectArea,Te.ltc_1.value=V.state.rectAreaLTC1,Te.ltc_2.value=V.state.rectAreaLTC2,Te.pointLights.value=V.state.point,Te.pointLightShadows.value=V.state.pointShadow,Te.hemisphereLights.value=V.state.hemi,Te.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Te.spotLightMatrix.value=V.state.spotLightMatrix,Te.spotLightMap.value=V.state.spotLightMap,Te.pointShadowMatrix.value=V.state.pointShadowMatrix),G.lightProbeGrid=A.state.lightProbeGridArray.length>0,G.currentProgram=De,G.uniformsList=null,De}function _r(g){if(g.uniformsList===null){const D=g.currentProgram.getUniforms();g.uniformsList=fi.seqWithValue(D.seq,g.uniforms)}return g.uniformsList}function gr(g,D){const W=x.get(g);W.outputColorSpace=D.outputColorSpace,W.batching=D.batching,W.batchingColor=D.batchingColor,W.instancing=D.instancing,W.instancingColor=D.instancingColor,W.instancingMorph=D.instancingMorph,W.skinning=D.skinning,W.morphTargets=D.morphTargets,W.morphNormals=D.morphNormals,W.morphColors=D.morphColors,W.morphTargetsCount=D.morphTargetsCount,W.numClippingPlanes=D.numClippingPlanes,W.numIntersection=D.numClipIntersection,W.vertexAlphas=D.vertexAlphas,W.vertexTangents=D.vertexTangents,W.toneMapping=D.toneMapping}function jo(g,D){if(g.length===0)return null;if(g.length===1)return g[0].texture!==null?g[0]:null;C.setFromMatrixPosition(D.matrixWorld);for(let W=0,G=g.length;W<G;W++){const V=g[W];if(V.texture!==null&&V.boundingBox.containsPoint(C))return V}return null}function Zo(g,D,W,G,V){D.isScene!==!0&&(D=ut),m.resetTextureUnits();const pe=D.fog,Se=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?D.environment:null,de=N===null?P.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:tt.workingColorSpace,xe=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Me=O.get(G.envMap||Se,xe),ye=G.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,De=!!W.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Te=!!W.morphAttributes.position,qe=!!W.morphAttributes.normal,ct=!!W.morphAttributes.color;let at=Wt;G.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(at=P.toneMapping);const Ye=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,_t=Ye!==void 0?Ye.length:0,ge=x.get(G),bt=A.state.lights;if(nt===!0&&(Be===!0||g!==H)){const $e=g===H&&G.id===I;ve.setState(G,g,$e)}let Ve=!1;G.version===ge.__version?(ge.needsLights&&ge.lightsStateVersion!==bt.state.version||ge.outputColorSpace!==de||V.isBatchedMesh&&ge.batching===!1||!V.isBatchedMesh&&ge.batching===!0||V.isBatchedMesh&&ge.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&ge.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&ge.instancing===!1||!V.isInstancedMesh&&ge.instancing===!0||V.isSkinnedMesh&&ge.skinning===!1||!V.isSkinnedMesh&&ge.skinning===!0||V.isInstancedMesh&&ge.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&ge.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&ge.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&ge.instancingMorph===!1&&V.morphTexture!==null||ge.envMap!==Me||G.fog===!0&&ge.fog!==pe||ge.numClippingPlanes!==void 0&&(ge.numClippingPlanes!==ve.numPlanes||ge.numIntersection!==ve.numIntersection)||ge.vertexAlphas!==ye||ge.vertexTangents!==De||ge.morphTargets!==Te||ge.morphNormals!==qe||ge.morphColors!==ct||ge.toneMapping!==at||ge.morphTargetsCount!==_t||!!ge.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(Ve=!0):(Ve=!0,ge.__version=G.version);let wt=ge.currentProgram;Ve===!0&&(wt=$n(G,D,V),F&&G.isNodeMaterial&&F.onUpdateProgram(G,wt,ge));let Bt=!1,Jt=!1,gn=!1;const je=wt.getUniforms(),lt=ge.uniforms;if(fe.useProgram(wt.program)&&(Bt=!0,Jt=!0,gn=!0),G.id!==I&&(I=G.id,Jt=!0),ge.needsLights){const $e=jo(A.state.lightProbeGridArray,V);ge.lightProbeGrid!==$e&&(ge.lightProbeGrid=$e,Jt=!0)}if(Bt||H!==g){fe.buffers.depth.getReversed()&&g.reversedDepth!==!0&&(g._reversedDepth=!0,g.updateProjectionMatrix()),je.setValue(U,"projectionMatrix",g.projectionMatrix),je.setValue(U,"viewMatrix",g.matrixWorldInverse);const tn=je.map.cameraPosition;tn!==void 0&&tn.setValue(U,et.setFromMatrixPosition(g.matrixWorld)),Ze.logarithmicDepthBuffer&&je.setValue(U,"logDepthBufFC",2/(Math.log(g.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&je.setValue(U,"isOrthographic",g.isOrthographicCamera===!0),H!==g&&(H=g,Jt=!0,gn=!0)}if(ge.needsLights&&(bt.state.directionalShadowMap.length>0&&je.setValue(U,"directionalShadowMap",bt.state.directionalShadowMap,m),bt.state.spotShadowMap.length>0&&je.setValue(U,"spotShadowMap",bt.state.spotShadowMap,m),bt.state.pointShadowMap.length>0&&je.setValue(U,"pointShadowMap",bt.state.pointShadowMap,m)),V.isSkinnedMesh){je.setOptional(U,V,"bindMatrix"),je.setOptional(U,V,"bindMatrixInverse");const $e=V.skeleton;$e&&($e.boneTexture===null&&$e.computeBoneTexture(),je.setValue(U,"boneTexture",$e.boneTexture,m))}V.isBatchedMesh&&(je.setOptional(U,V,"batchingTexture"),je.setValue(U,"batchingTexture",V._matricesTexture,m),je.setOptional(U,V,"batchingIdTexture"),je.setValue(U,"batchingIdTexture",V._indirectTexture,m),je.setOptional(U,V,"batchingColorTexture"),V._colorsTexture!==null&&je.setValue(U,"batchingColorTexture",V._colorsTexture,m));const en=W.morphAttributes;if((en.position!==void 0||en.normal!==void 0||en.color!==void 0)&&Le.update(V,W,wt),(Jt||ge.receiveShadow!==V.receiveShadow)&&(ge.receiveShadow=V.receiveShadow,je.setValue(U,"receiveShadow",V.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&D.environment!==null&&(lt.envMapIntensity.value=D.environmentIntensity),lt.dfgLUT!==void 0&&(lt.dfgLUT.value=Bp()),Jt){if(je.setValue(U,"toneMappingExposure",P.toneMappingExposure),ge.needsLights&&$o(lt,gn),pe&&G.fog===!0&&X.refreshFogUniforms(lt,pe),X.refreshMaterialUniforms(lt,G,Ce,Ne,A.state.transmissionRenderTarget[g.id]),ge.needsLights&&ge.lightProbeGrid){const $e=ge.lightProbeGrid;lt.probesSH.value=$e.texture,lt.probesMin.value.copy($e.boundingBox.min),lt.probesMax.value.copy($e.boundingBox.max),lt.probesResolution.value.copy($e.resolution)}fi.upload(U,_r(ge),lt,m)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(fi.upload(U,_r(ge),lt,m),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&je.setValue(U,"center",V.center),je.setValue(U,"modelViewMatrix",V.modelViewMatrix),je.setValue(U,"normalMatrix",V.normalMatrix),je.setValue(U,"modelMatrix",V.matrixWorld),G.uniformsGroups!==void 0){const $e=G.uniformsGroups;for(let tn=0,vn=$e.length;tn<vn;tn++){const vr=$e[tn];q.update(vr,wt),q.bind(vr,wt)}}return wt}function $o(g,D){g.ambientLightColor.needsUpdate=D,g.lightProbe.needsUpdate=D,g.directionalLights.needsUpdate=D,g.directionalLightShadows.needsUpdate=D,g.pointLights.needsUpdate=D,g.pointLightShadows.needsUpdate=D,g.spotLights.needsUpdate=D,g.spotLightShadows.needsUpdate=D,g.rectAreaLights.needsUpdate=D,g.hemisphereLights.needsUpdate=D}function Qo(g){return g.isMeshLambertMaterial||g.isMeshToonMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isShadowMaterial||g.isShaderMaterial&&g.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(g,D,W){const G=x.get(g);G.__autoAllocateDepthBuffer=g.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),x.get(g.texture).__webglTexture=D,x.get(g.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:W,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(g,D){const W=x.get(g);W.__webglFramebuffer=D,W.__useDefaultFramebuffer=D===void 0};const Jo=U.createFramebuffer();this.setRenderTarget=function(g,D=0,W=0){N=g,B=D,z=W;let G=null,V=!1,pe=!1;if(g){const de=x.get(g);if(de.__useDefaultFramebuffer!==void 0){fe.bindFramebuffer(U.FRAMEBUFFER,de.__webglFramebuffer),k.copy(g.viewport),K.copy(g.scissor),re=g.scissorTest,fe.viewport(k),fe.scissor(K),fe.setScissorTest(re),I=-1;return}else if(de.__webglFramebuffer===void 0)m.setupRenderTarget(g);else if(de.__hasExternalTextures)m.rebindTextures(g,x.get(g.texture).__webglTexture,x.get(g.depthTexture).__webglTexture);else if(g.depthBuffer){const ye=g.depthTexture;if(de.__boundDepthTexture!==ye){if(ye!==null&&x.has(ye)&&(g.width!==ye.image.width||g.height!==ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");m.setupDepthRenderbuffer(g)}}const xe=g.texture;(xe.isData3DTexture||xe.isDataArrayTexture||xe.isCompressedArrayTexture)&&(pe=!0);const Me=x.get(g).__webglFramebuffer;g.isWebGLCubeRenderTarget?(Array.isArray(Me[D])?G=Me[D][W]:G=Me[D],V=!0):g.samples>0&&m.useMultisampledRTT(g)===!1?G=x.get(g).__webglMultisampledFramebuffer:Array.isArray(Me)?G=Me[W]:G=Me,k.copy(g.viewport),K.copy(g.scissor),re=g.scissorTest}else k.copy(ee).multiplyScalar(Ce).floor(),K.copy(be).multiplyScalar(Ce).floor(),re=we;if(W!==0&&(G=Jo),fe.bindFramebuffer(U.FRAMEBUFFER,G)&&fe.drawBuffers(g,G),fe.viewport(k),fe.scissor(K),fe.setScissorTest(re),V){const de=x.get(g.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,de.__webglTexture,W)}else if(pe){const de=D;for(let xe=0;xe<g.textures.length;xe++){const Me=x.get(g.textures[xe]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+xe,Me.__webglTexture,W,de)}}else if(g!==null&&W!==0){const de=x.get(g.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,de.__webglTexture,W)}I=-1},this.readRenderTargetPixels=function(g,D,W,G,V,pe,Se,de=0){if(!(g&&g.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=x.get(g).__webglFramebuffer;if(g.isWebGLCubeRenderTarget&&Se!==void 0&&(xe=xe[Se]),xe){fe.bindFramebuffer(U.FRAMEBUFFER,xe);try{const Me=g.textures[de],ye=Me.format,De=Me.type;if(g.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+de),!Ze.textureFormatReadable(ye)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ze.textureTypeReadable(De)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=g.width-G&&W>=0&&W<=g.height-V&&U.readPixels(D,W,G,V,y.convert(ye),y.convert(De),pe)}finally{const Me=N!==null?x.get(N).__webglFramebuffer:null;fe.bindFramebuffer(U.FRAMEBUFFER,Me)}}},this.readRenderTargetPixelsAsync=async function(g,D,W,G,V,pe,Se,de=0){if(!(g&&g.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=x.get(g).__webglFramebuffer;if(g.isWebGLCubeRenderTarget&&Se!==void 0&&(xe=xe[Se]),xe)if(D>=0&&D<=g.width-G&&W>=0&&W<=g.height-V){fe.bindFramebuffer(U.FRAMEBUFFER,xe);const Me=g.textures[de],ye=Me.format,De=Me.type;if(g.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+de),!Ze.textureFormatReadable(ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ze.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Te),U.bufferData(U.PIXEL_PACK_BUFFER,pe.byteLength,U.STREAM_READ),U.readPixels(D,W,G,V,y.convert(ye),y.convert(De),0);const qe=N!==null?x.get(N).__webglFramebuffer:null;fe.bindFramebuffer(U.FRAMEBUFFER,qe);const ct=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await os(U,ct,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Te),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,pe),U.deleteBuffer(Te),U.deleteSync(ct),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(g,D=null,W=0){const G=Math.pow(2,-W),V=Math.floor(g.image.width*G),pe=Math.floor(g.image.height*G),Se=D!==null?D.x:0,de=D!==null?D.y:0;m.setTexture2D(g,0),U.copyTexSubImage2D(U.TEXTURE_2D,W,0,0,Se,de,V,pe),fe.unbindTexture()};const es=U.createFramebuffer(),ts=U.createFramebuffer();this.copyTextureToTexture=function(g,D,W=null,G=null,V=0,pe=0){let Se,de,xe,Me,ye,De,Te,qe,ct;const at=g.isCompressedTexture?g.mipmaps[pe]:g.image;if(W!==null)Se=W.max.x-W.min.x,de=W.max.y-W.min.y,xe=W.isBox3?W.max.z-W.min.z:1,Me=W.min.x,ye=W.min.y,De=W.isBox3?W.min.z:0;else{const lt=Math.pow(2,-V);Se=Math.floor(at.width*lt),de=Math.floor(at.height*lt),g.isDataArrayTexture?xe=at.depth:g.isData3DTexture?xe=Math.floor(at.depth*lt):xe=1,Me=0,ye=0,De=0}G!==null?(Te=G.x,qe=G.y,ct=G.z):(Te=0,qe=0,ct=0);const Ye=y.convert(D.format),_t=y.convert(D.type);let ge;D.isData3DTexture?(m.setTexture3D(D,0),ge=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(m.setTexture2DArray(D,0),ge=U.TEXTURE_2D_ARRAY):(m.setTexture2D(D,0),ge=U.TEXTURE_2D),fe.activeTexture(U.TEXTURE0),fe.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),fe.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),fe.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);const bt=fe.getParameter(U.UNPACK_ROW_LENGTH),Ve=fe.getParameter(U.UNPACK_IMAGE_HEIGHT),wt=fe.getParameter(U.UNPACK_SKIP_PIXELS),Bt=fe.getParameter(U.UNPACK_SKIP_ROWS),Jt=fe.getParameter(U.UNPACK_SKIP_IMAGES);fe.pixelStorei(U.UNPACK_ROW_LENGTH,at.width),fe.pixelStorei(U.UNPACK_IMAGE_HEIGHT,at.height),fe.pixelStorei(U.UNPACK_SKIP_PIXELS,Me),fe.pixelStorei(U.UNPACK_SKIP_ROWS,ye),fe.pixelStorei(U.UNPACK_SKIP_IMAGES,De);const gn=g.isDataArrayTexture||g.isData3DTexture,je=D.isDataArrayTexture||D.isData3DTexture;if(g.isDepthTexture){const lt=x.get(g),en=x.get(D),$e=x.get(lt.__renderTarget),tn=x.get(en.__renderTarget);fe.bindFramebuffer(U.READ_FRAMEBUFFER,$e.__webglFramebuffer),fe.bindFramebuffer(U.DRAW_FRAMEBUFFER,tn.__webglFramebuffer);for(let vn=0;vn<xe;vn++)gn&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,x.get(g).__webglTexture,V,De+vn),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,x.get(D).__webglTexture,pe,ct+vn)),U.blitFramebuffer(Me,ye,Se,de,Te,qe,Se,de,U.DEPTH_BUFFER_BIT,U.NEAREST);fe.bindFramebuffer(U.READ_FRAMEBUFFER,null),fe.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(V!==0||g.isRenderTargetTexture||x.has(g)){const lt=x.get(g),en=x.get(D);fe.bindFramebuffer(U.READ_FRAMEBUFFER,es),fe.bindFramebuffer(U.DRAW_FRAMEBUFFER,ts);for(let $e=0;$e<xe;$e++)gn?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,lt.__webglTexture,V,De+$e):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,lt.__webglTexture,V),je?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,en.__webglTexture,pe,ct+$e):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,en.__webglTexture,pe),V!==0?U.blitFramebuffer(Me,ye,Se,de,Te,qe,Se,de,U.COLOR_BUFFER_BIT,U.NEAREST):je?U.copyTexSubImage3D(ge,pe,Te,qe,ct+$e,Me,ye,Se,de):U.copyTexSubImage2D(ge,pe,Te,qe,Me,ye,Se,de);fe.bindFramebuffer(U.READ_FRAMEBUFFER,null),fe.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else je?g.isDataTexture||g.isData3DTexture?U.texSubImage3D(ge,pe,Te,qe,ct,Se,de,xe,Ye,_t,at.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(ge,pe,Te,qe,ct,Se,de,xe,Ye,at.data):U.texSubImage3D(ge,pe,Te,qe,ct,Se,de,xe,Ye,_t,at):g.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,pe,Te,qe,Se,de,Ye,_t,at.data):g.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,pe,Te,qe,at.width,at.height,Ye,at.data):U.texSubImage2D(U.TEXTURE_2D,pe,Te,qe,Se,de,Ye,_t,at);fe.pixelStorei(U.UNPACK_ROW_LENGTH,bt),fe.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ve),fe.pixelStorei(U.UNPACK_SKIP_PIXELS,wt),fe.pixelStorei(U.UNPACK_SKIP_ROWS,Bt),fe.pixelStorei(U.UNPACK_SKIP_IMAGES,Jt),pe===0&&D.generateMipmaps&&U.generateMipmap(ge),fe.unbindTexture()},this.initRenderTarget=function(g){x.get(g).__webglFramebuffer===void 0&&m.setupRenderTarget(g)},this.initTexture=function(g){g.isCubeTexture?m.setTextureCube(g,0):g.isData3DTexture?m.setTexture3D(g,0):g.isDataArrayTexture||g.isCompressedArrayTexture?m.setTexture2DArray(g,0):m.setTexture2D(g,0),fe.unbindTexture()},this.resetState=function(){B=0,z=0,N=null,fe.reset(),ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(n),t.unpackColorSpace=tt._getUnpackColorSpace()}}function _i(e,n=!1){const t=e[0].index!==null,i=new Set(Object.keys(e[0].attributes)),a=new Set(Object.keys(e[0].morphAttributes)),r={},o={},s=e[0].morphTargetsRelative,c=new _n;let l=0;for(let d=0;d<e.length;++d){const u=e[d];let f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const _ in u.attributes){if(!i.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+_+'" attribute exists among all geometries, or in none of them.'),null;r[_]===void 0&&(r[_]=[]),r[_].push(u.attributes[_]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(s!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const _ in u.morphAttributes){if(!a.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;o[_]===void 0&&(o[_]=[]),o[_].push(u.morphAttributes[_])}if(n){let _;if(t)_=u.index.count;else if(u.attributes.position!==void 0)_=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,_,d),l+=_}}if(t){let d=0;const u=[];for(let f=0;f<e.length;++f){const _=e[f].index;for(let E=0;E<_.count;++E)u.push(_.getX(E)+d);d+=e[f].attributes.position.count}c.setIndex(u)}for(const d in r){const u=ya(r[d]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,u)}for(const d in o){const u=o[d][0].length;if(u!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let f=0;f<u;++f){const _=[];for(let T=0;T<o[d].length;++T)_.push(o[d][T][f]);const E=ya(_);if(!E)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(E)}}}return c}function ya(e){let n,t,i,a=-1,r=0;for(let l=0;l<e.length;++l){const d=e[l];if(n===void 0&&(n=d.array.constructor),n!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=d.itemSize),t!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=d.normalized),i!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(a===-1&&(a=d.gpuType),a!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=d.count*t}const o=new n(r),s=new sn(o,t,i);let c=0;for(let l=0;l<e.length;++l){const d=e[l];if(d.isInterleavedBufferAttribute){const u=c/t;for(let f=0,_=d.count;f<_;f++)for(let E=0;E<t;E++){const T=d.getComponent(f,E);s.setComponent(f+u,E,T)}}else o.set(d.array,c);c+=d.count*t}return a!==void 0&&(s.gpuType=a),s}function Am(e,n=1e-4){n=Math.max(n,Number.EPSILON);const t={},i=e.getIndex(),a=e.getAttribute("position"),r=i?i.count:a.count;let o=0;const s=Object.keys(e.attributes),c={},l={},d=[],u=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let S=0,b=s.length;S<b;S++){const C=s[S],w=e.attributes[C];c[C]=new w.constructor(new w.array.constructor(w.count*w.itemSize),w.itemSize,w.normalized);const A=e.morphAttributes[C];A&&(l[C]||(l[C]=[]),A.forEach((L,v)=>{const M=new L.array.constructor(L.count*L.itemSize);l[C][v]=new L.constructor(M,L.itemSize,L.normalized)}))}const _=n*.5,E=Math.log10(1/n),T=Math.pow(10,E),p=_*T;for(let S=0;S<r;S++){const b=i?i.getX(S):S;let C="";for(let w=0,A=s.length;w<A;w++){const L=s[w],v=e.getAttribute(L),M=v.itemSize;for(let P=0;P<M;P++)C+=`${~~(v[u[P]](b)*T+p)},`}if(C in t)d.push(t[C]);else{for(let w=0,A=s.length;w<A;w++){const L=s[w],v=e.getAttribute(L),M=e.morphAttributes[L],P=v.itemSize,R=c[L],F=l[L];for(let B=0;B<P;B++){const z=u[B],N=f[B];if(R[N](o,v[z](b)),M)for(let I=0,H=M.length;I<H;I++)F[I][N](o,M[I][z](b))}}t[C]=o,d.push(o),o++}}const h=e.clone();for(const S in e.attributes){const b=c[S];if(h.setAttribute(S,new b.constructor(b.array.slice(0,o*b.itemSize),b.itemSize,b.normalized)),S in l)for(let C=0;C<l[S].length;C++){const w=l[S][C];h.morphAttributes[S][C]=new w.constructor(w.array.slice(0,o*w.itemSize),w.itemSize,w.normalized)}}return h.setIndex(d),h}function Ia(e,n){if(n===_c)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),e;if(n===Yi||n===So){let t=e.getIndex();if(t===null){const o=[],s=e.getAttribute("position");if(s!==void 0){for(let c=0;c<s.count;c++)o.push(c);e.setIndex(o),t=e.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),e}const i=t.count-2,a=[];if(n===Yi)for(let o=1;o<=i;o++)a.push(t.getX(0)),a.push(t.getX(o)),a.push(t.getX(o+1));else for(let o=0;o<i;o++)o%2===0?(a.push(t.getX(o)),a.push(t.getX(o+1)),a.push(t.getX(o+2))):(a.push(t.getX(o+2)),a.push(t.getX(o+1)),a.push(t.getX(o)));a.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=e.clone();return r.setIndex(a),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",n),e}function Do(e){const n=new Map,t=new Map,i=e.clone();return No(e,i,function(a,r){n.set(r,a),t.set(a,r)}),i.traverse(function(a){if(!a.isSkinnedMesh)return;const r=a,o=n.get(a),s=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=s.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),i}function No(e,n,t){t(e,n);for(let i=0;i<e.children.length;i++)No(e.children[i],n.children[i],t)}class Gp extends gc{constructor(n){super(n),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Wp(t)}),this.register(function(t){return new Xp(t)}),this.register(function(t){return new eh(t)}),this.register(function(t){return new th(t)}),this.register(function(t){return new nh(t)}),this.register(function(t){return new qp(t)}),this.register(function(t){return new Yp(t)}),this.register(function(t){return new jp(t)}),this.register(function(t){return new Zp(t)}),this.register(function(t){return new zp(t)}),this.register(function(t){return new $p(t)}),this.register(function(t){return new Kp(t)}),this.register(function(t){return new Jp(t)}),this.register(function(t){return new Qp(t)}),this.register(function(t){return new Vp(t)}),this.register(function(t){return new Ua(t,Fe.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Ua(t,Fe.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new ih(t)})}load(n,t,i,a){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Wn.extractUrlBase(n);o=Wn.resolveURL(l,this.path)}else o=Wn.extractUrlBase(n);this.manager.itemStart(n);const s=function(l){a?a(l):console.error(l),r.manager.itemError(n),r.manager.itemEnd(n)},c=new xo(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(n,function(l){try{r.parse(l,o,function(d){t(d),r.manager.itemEnd(n)},s)}catch(d){s(d)}},i,s)}setDRACOLoader(n){return this.dracoLoader=n,this}setKTX2Loader(n){return this.ktx2Loader=n,this}setMeshoptDecoder(n){return this.meshoptDecoder=n,this}register(n){return this.pluginCallbacks.indexOf(n)===-1&&this.pluginCallbacks.push(n),this}unregister(n){return this.pluginCallbacks.indexOf(n)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(n),1),this}parse(n,t,i,a){let r;const o={},s={},c=new TextDecoder;if(typeof n=="string")r=JSON.parse(n);else if(n instanceof ArrayBuffer)if(c.decode(new Uint8Array(n,0,4))===Fo){try{o[Fe.KHR_BINARY_GLTF]=new rh(n)}catch(u){a&&a(u);return}r=JSON.parse(o[Fe.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(n));else r=n;if(r.asset===void 0||r.asset.version[0]<2){a&&a(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new gh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const u=this.pluginCallbacks[d](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),s[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let d=0;d<r.extensionsUsed.length;++d){const u=r.extensionsUsed[d],f=r.extensionsRequired||[];switch(u){case Fe.KHR_MATERIALS_UNLIT:o[u]=new kp;break;case Fe.KHR_DRACO_MESH_COMPRESSION:o[u]=new ah(r,this.dracoLoader);break;case Fe.KHR_TEXTURE_TRANSFORM:o[u]=new oh;break;case Fe.KHR_MESH_QUANTIZATION:o[u]=new sh;break;default:f.indexOf(u)>=0&&s[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(s),l.parse(i,a)}parseAsync(n,t){const i=this;return new Promise(function(a,r){i.parse(n,t,a,r)})}}function Hp(){let e={};return{get:function(n){return e[n]},add:function(n,t){e[n]=t},remove:function(n){delete e[n]},removeAll:function(){e={}}}}function ft(e,n,t){const i=e.json.materials[n];return i.extensions&&i.extensions[t]?i.extensions[t]:null}const Fe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Vp{constructor(n){this.parser=n,this.name=Fe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const n=this.parser,t=this.parser.json.nodes||[];for(let i=0,a=t.length;i<a;i++){const r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&n._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(n){const t=this.parser,i="light:"+n;let a=t.cache.get(i);if(a)return a;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[n];let l;const d=new ze(16777215);c.color!==void 0&&d.setRGB(c.color[0],c.color[1],c.color[2],Ft);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new xc(d),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Sc(d),l.distance=u;break;case"spot":l=new vc(d),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Ht(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+n),a=Promise.resolve(l),t.cache.add(i,a),a}getDependency(n,t){if(n==="light")return this._loadLight(t)}createNodeAttachment(n){const t=this,i=this.parser,r=i.json.nodes[n],s=(r.extensions&&r.extensions[this.name]||{}).light;return s===void 0?null:this._loadLight(s).then(function(c){return i._getNodeRef(t.cache,s,c)})}}class kp{constructor(){this.name=Fe.KHR_MATERIALS_UNLIT}getMaterialType(){return Tn}extendParams(n,t,i){const a=[];n.color=new ze(1,1,1),n.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;n.color.setRGB(o[0],o[1],o[2],Ft),n.opacity=o[3]}r.baseColorTexture!==void 0&&a.push(i.assignTexture(n,"map",r.baseColorTexture,cn))}return Promise.all(a)}}class zp{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(n,t){const i=ft(this.parser,n,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class Wp{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_CLEARCOAT}getMaterialType(n){return ft(this.parser,n,this.name)!==null?qt:null}extendMaterialParams(n,t){const i=ft(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&a.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&a.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(a.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const r=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new St(r,r)}return Promise.all(a)}}class Xp{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_DISPERSION}getMaterialType(n){return ft(this.parser,n,this.name)!==null?qt:null}extendMaterialParams(n,t){const i=ft(this.parser,n,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class Kp{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(n){return ft(this.parser,n,this.name)!==null?qt:null}extendMaterialParams(n,t){const i=ft(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&a.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&a.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(a)}}class qp{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_SHEEN}getMaterialType(n){return ft(this.parser,n,this.name)!==null?qt:null}extendMaterialParams(n,t){const i=ft(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];if(t.sheenColor=new ze(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){const r=i.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Ft)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&a.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,cn)),i.sheenRoughnessTexture!==void 0&&a.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(a)}}class Yp{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_TRANSMISSION}getMaterialType(n){return ft(this.parser,n,this.name)!==null?qt:null}extendMaterialParams(n,t){const i=ft(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&a.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(a)}}class jp{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_VOLUME}getMaterialType(n){return ft(this.parser,n,this.name)!==null?qt:null}extendMaterialParams(n,t){const i=ft(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&a.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;const r=i.attenuationColor||[1,1,1];return t.attenuationColor=new ze().setRGB(r[0],r[1],r[2],Ft),Promise.all(a)}}class Zp{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_IOR}getMaterialType(n){return ft(this.parser,n,this.name)!==null?qt:null}extendMaterialParams(n,t){const i=ft(this.parser,n,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class $p{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_SPECULAR}getMaterialType(n){return ft(this.parser,n,this.name)!==null?qt:null}extendMaterialParams(n,t){const i=ft(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&a.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));const r=i.specularColorFactor||[1,1,1];return t.specularColor=new ze().setRGB(r[0],r[1],r[2],Ft),i.specularColorTexture!==void 0&&a.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,cn)),Promise.all(a)}}class Qp{constructor(n){this.parser=n,this.name=Fe.EXT_MATERIALS_BUMP}getMaterialType(n){return ft(this.parser,n,this.name)!==null?qt:null}extendMaterialParams(n,t){const i=ft(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&a.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(a)}}class Jp{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_ANISOTROPY}getMaterialType(n){return ft(this.parser,n,this.name)!==null?qt:null}extendMaterialParams(n,t){const i=ft(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&a.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(a)}}class eh{constructor(n){this.parser=n,this.name=Fe.KHR_TEXTURE_BASISU}loadTexture(n){const t=this.parser,i=t.json,a=i.textures[n];if(!a.extensions||!a.extensions[this.name])return null;const r=a.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(n,r.source,o)}}class th{constructor(n){this.parser=n,this.name=Fe.EXT_TEXTURE_WEBP}loadTexture(n){const t=this.name,i=this.parser,a=i.json,r=a.textures[n];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],s=a.images[o.source];let c=i.textureLoader;if(s.uri){const l=i.options.manager.getHandler(s.uri);l!==null&&(c=l)}return i.loadTextureImage(n,o.source,c)}}class nh{constructor(n){this.parser=n,this.name=Fe.EXT_TEXTURE_AVIF}loadTexture(n){const t=this.name,i=this.parser,a=i.json,r=a.textures[n];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],s=a.images[o.source];let c=i.textureLoader;if(s.uri){const l=i.options.manager.getHandler(s.uri);l!==null&&(c=l)}return i.loadTextureImage(n,o.source,c)}}class Ua{constructor(n,t){this.name=t,this.parser=n}loadBufferView(n){const t=this.parser.json,i=t.bufferViews[n];if(i.extensions&&i.extensions[this.name]){const a=i.extensions[this.name],r=this.parser.getDependency("buffer",a.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(s){const c=a.byteOffset||0,l=a.byteLength||0,d=a.count,u=a.byteStride,f=new Uint8Array(s,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(d,u,f,a.mode,a.filter).then(function(_){return _.buffer}):o.ready.then(function(){const _=new ArrayBuffer(d*u);return o.decodeGltfBuffer(new Uint8Array(_),d,u,f,a.mode,a.filter),_})})}else return null}}class ih{constructor(n){this.name=Fe.EXT_MESH_GPU_INSTANCING,this.parser=n}createNodeMesh(n){const t=this.parser.json,i=t.nodes[n];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const a=t.meshes[i.mesh];for(const l of a.primitives)if(l.mode!==Pt.TRIANGLES&&l.mode!==Pt.TRIANGLE_STRIP&&l.mode!==Pt.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=i.extensions[this.name].attributes,s=[],c={};for(const l in o)s.push(this.parser.getDependency("accessor",o[l]).then(d=>(c[l]=d,c[l])));return s.length<1?null:(s.push(this.parser.createNodeMesh(n)),Promise.all(s).then(l=>{const d=l.pop(),u=d.isGroup?d.children:[d],f=l[0].count,_=[];for(const E of u){const T=new vt,p=new ae,h=new Tt,S=new ae(1,1,1),b=new Ec(E.geometry,E.material,f);for(let C=0;C<f;C++)c.TRANSLATION&&p.fromBufferAttribute(c.TRANSLATION,C),c.ROTATION&&h.fromBufferAttribute(c.ROTATION,C),c.SCALE&&S.fromBufferAttribute(c.SCALE,C),b.setMatrixAt(C,T.compose(p,h,S));for(const C in c)if(C==="_COLOR_0"){const w=c[C];b.instanceColor=new Mc(w.array,w.itemSize,w.normalized)}else C!=="TRANSLATION"&&C!=="ROTATION"&&C!=="SCALE"&&E.geometry.setAttribute(C,c[C]);Eo.prototype.copy.call(b,E),this.parser.assignFinalMaterial(b),_.push(b)}return d.isGroup?(d.clear(),d.add(..._),d):_[0]}))}}const Fo="glTF",Dn=12,Da={JSON:1313821514,BIN:5130562};class rh{constructor(n){this.name=Fe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(n,0,Dn),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(n.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Fo)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const a=this.header.length-Dn,r=new DataView(n,Dn);let o=0;for(;o<a;){const s=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===Da.JSON){const l=new Uint8Array(n,Dn+o,s);this.content=i.decode(l)}else if(c===Da.BIN){const l=Dn+o;this.body=n.slice(l,l+s)}o+=s}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class ah{constructor(n,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Fe.KHR_DRACO_MESH_COMPRESSION,this.json=n,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(n,t){const i=this.json,a=this.dracoLoader,r=n.extensions[this.name].bufferView,o=n.extensions[this.name].attributes,s={},c={},l={};for(const d in o){const u=$i[d]||d.toLowerCase();s[u]=o[d]}for(const d in n.attributes){const u=$i[d]||d.toLowerCase();if(o[d]!==void 0){const f=i.accessors[n.attributes[d]],_=An[f.componentType];l[u]=_.name,c[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(d){return new Promise(function(u,f){a.decodeDracoFile(d,function(_){for(const E in _.attributes){const T=_.attributes[E],p=c[E];p!==void 0&&(T.normalized=p)}u(_)},s,l,Ft,f)})})}}class oh{constructor(){this.name=Fe.KHR_TEXTURE_TRANSFORM}extendTexture(n,t){return(t.texCoord===void 0||t.texCoord===n.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(n=n.clone(),t.texCoord!==void 0&&(n.channel=t.texCoord),t.offset!==void 0&&n.offset.fromArray(t.offset),t.rotation!==void 0&&(n.rotation=t.rotation),t.scale!==void 0&&n.repeat.fromArray(t.scale),n.needsUpdate=!0),n}}class sh{constructor(){this.name=Fe.KHR_MESH_QUANTIZATION}}class Oo extends Fc{constructor(n,t,i,a){super(n,t,i,a)}copySampleValue_(n){const t=this.resultBuffer,i=this.sampleValues,a=this.valueSize,r=n*a*3+a;for(let o=0;o!==a;o++)t[o]=i[r+o];return t}interpolate_(n,t,i,a){const r=this.resultBuffer,o=this.sampleValues,s=this.valueSize,c=s*2,l=s*3,d=a-t,u=(i-t)/d,f=u*u,_=f*u,E=n*l,T=E-l,p=-2*_+3*f,h=_-f,S=1-p,b=h-f+u;for(let C=0;C!==s;C++){const w=o[T+C+s],A=o[T+C+c]*d,L=o[E+C+s],v=o[E+C]*d;r[C]=S*w+b*A+p*L+h*v}return r}}const ch=new Tt;class lh extends Oo{interpolate_(n,t,i,a){const r=super.interpolate_(n,t,i,a);return ch.fromArray(r).normalize().toArray(r),r}}const Pt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},An={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Na={9728:Zt,9729:mt,9984:Ja,9985:oi,9986:Bn,9987:jt},Fa={33071:Yn,33648:Qa,10497:pi},Bi={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},$i={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},nn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},fh={CUBICSPLINE:void 0,LINEAR:Ao,STEP:Dc},Gi={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function uh(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new Si({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:bn})),e.DefaultMaterial}function un(e,n,t){for(const i in t.extensions)e[i]===void 0&&(n.userData.gltfExtensions=n.userData.gltfExtensions||{},n.userData.gltfExtensions[i]=t.extensions[i])}function Ht(e,n){n.extras!==void 0&&(typeof n.extras=="object"?Object.assign(e.userData,n.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+n.extras))}function dh(e,n,t){let i=!1,a=!1,r=!1;for(let l=0,d=n.length;l<d;l++){const u=n[l];if(u.POSITION!==void 0&&(i=!0),u.NORMAL!==void 0&&(a=!0),u.COLOR_0!==void 0&&(r=!0),i&&a&&r)break}if(!i&&!a&&!r)return Promise.resolve(e);const o=[],s=[],c=[];for(let l=0,d=n.length;l<d;l++){const u=n[l];if(i){const f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):e.attributes.position;o.push(f)}if(a){const f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):e.attributes.normal;s.push(f)}if(r){const f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):e.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(l){const d=l[0],u=l[1],f=l[2];return i&&(e.morphAttributes.position=d),a&&(e.morphAttributes.normal=u),r&&(e.morphAttributes.color=f),e.morphTargetsRelative=!0,e})}function ph(e,n){if(e.updateMorphTargets(),n.weights!==void 0)for(let t=0,i=n.weights.length;t<i;t++)e.morphTargetInfluences[t]=n.weights[t];if(n.extras&&Array.isArray(n.extras.targetNames)){const t=n.extras.targetNames;if(e.morphTargetInfluences.length===t.length){e.morphTargetDictionary={};for(let i=0,a=t.length;i<a;i++)e.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function hh(e){let n;const t=e.extensions&&e.extensions[Fe.KHR_DRACO_MESH_COMPRESSION];if(t?n="draco:"+t.bufferView+":"+t.indices+":"+Hi(t.attributes):n=e.indices+":"+Hi(e.attributes)+":"+e.mode,e.targets!==void 0)for(let i=0,a=e.targets.length;i<a;i++)n+=":"+Hi(e.targets[i]);return n}function Hi(e){let n="";const t=Object.keys(e).sort();for(let i=0,a=t.length;i<a;i++)n+=t[i]+":"+e[t[i]]+";";return n}function Qi(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function mh(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?"image/jpeg":e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?"image/webp":e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const _h=new vt;class gh{constructor(n={},t={}){this.json=n,this.extensions={},this.plugins={},this.options=t,this.cache=new Hp,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,a=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const s=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(s)===!0;const c=s.match(/Version\/(\d+)/);a=i&&c?parseInt(c[1],10):-1,r=s.indexOf("Firefox")>-1,o=r?s.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&a<17||r&&o<98?this.textureLoader=new Tc(this.options.manager):this.textureLoader=new Ac(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new xo(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(n){this.extensions=n}setPlugins(n){this.plugins=n}parse(n,t){const i=this,a=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){const s={scene:o[0][a.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:a.asset,parser:i,userData:{}};return un(r,s,a),Ht(s,a),Promise.all(i._invokeAll(function(c){return c.afterRoot&&c.afterRoot(s)})).then(function(){for(const c of s.scenes)c.updateMatrixWorld();n(s)})}).catch(t)}_markDefs(){const n=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let a=0,r=t.length;a<r;a++){const o=t[a].joints;for(let s=0,c=o.length;s<c;s++)n[o[s]].isBone=!0}for(let a=0,r=n.length;a<r;a++){const o=n[a];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(n,t){t!==void 0&&(n.refs[t]===void 0&&(n.refs[t]=n.uses[t]=0),n.refs[t]++)}_getNodeRef(n,t,i){if(n.refs[t]<=1)return i;const a=i.clone(),r=(o,s)=>{const c=this.associations.get(o);c!=null&&this.associations.set(s,c);for(const[l,d]of o.children.entries())r(d,s.children[l])};return r(i,a),a.name+="_instance_"+n.uses[t]++,a}_invokeOne(n){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const a=n(t[i]);if(a)return a}return null}_invokeAll(n){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let a=0;a<t.length;a++){const r=n(t[a]);r&&i.push(r)}return i}getDependency(n,t){const i=n+":"+t;let a=this.cache.get(i);if(!a){switch(n){case"scene":a=this.loadScene(t);break;case"node":a=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":a=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":a=this.loadAccessor(t);break;case"bufferView":a=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":a=this.loadBuffer(t);break;case"material":a=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":a=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":a=this.loadSkin(t);break;case"animation":a=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":a=this.loadCamera(t);break;default:if(a=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(n,t)}),!a)throw new Error("Unknown type: "+n);break}this.cache.add(i,a)}return a}getDependencies(n){let t=this.cache.get(n);if(!t){const i=this,a=this.json[n+(n==="mesh"?"es":"s")]||[];t=Promise.all(a.map(function(r,o){return i.getDependency(n,o)})),this.cache.add(n,t)}return t}loadBuffer(n){const t=this.json.buffers[n],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&n===0)return Promise.resolve(this.extensions[Fe.KHR_BINARY_GLTF].body);const a=this.options;return new Promise(function(r,o){i.load(Wn.resolveURL(t.uri,a.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(n){const t=this.json.bufferViews[n];return this.getDependency("buffer",t.buffer).then(function(i){const a=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+a)})}loadAccessor(n){const t=this,i=this.json,a=this.json.accessors[n];if(a.bufferView===void 0&&a.sparse===void 0){const o=Bi[a.type],s=An[a.componentType],c=a.normalized===!0,l=new s(a.count*o);return Promise.resolve(new sn(l,o,c))}const r=[];return a.bufferView!==void 0?r.push(this.getDependency("bufferView",a.bufferView)):r.push(null),a.sparse!==void 0&&(r.push(this.getDependency("bufferView",a.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",a.sparse.values.bufferView))),Promise.all(r).then(function(o){const s=o[0],c=Bi[a.type],l=An[a.componentType],d=l.BYTES_PER_ELEMENT,u=d*c,f=a.byteOffset||0,_=a.bufferView!==void 0?i.bufferViews[a.bufferView].byteStride:void 0,E=a.normalized===!0;let T,p;if(_&&_!==u){const h=Math.floor(f/_),S="InterleavedBuffer:"+a.bufferView+":"+a.componentType+":"+h+":"+a.count;let b=t.cache.get(S);b||(T=new l(s,h*_,a.count*_/d),b=new bc(T,_/d),t.cache.add(S,b)),p=new Nc(b,c,f%_/d,E)}else s===null?T=new l(a.count*c):T=new l(s,f,a.count*c),p=new sn(T,c,E);if(a.sparse!==void 0){const h=Bi.SCALAR,S=An[a.sparse.indices.componentType],b=a.sparse.indices.byteOffset||0,C=a.sparse.values.byteOffset||0,w=new S(o[1],b,a.sparse.count*h),A=new l(o[2],C,a.sparse.count*c);s!==null&&(p=new sn(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let L=0,v=w.length;L<v;L++){const M=w[L];if(p.setX(M,A[L*c]),c>=2&&p.setY(M,A[L*c+1]),c>=3&&p.setZ(M,A[L*c+2]),c>=4&&p.setW(M,A[L*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=E}return p})}loadTexture(n){const t=this.json,i=this.options,r=t.textures[n].source,o=t.images[r];let s=this.textureLoader;if(o.uri){const c=i.manager.getHandler(o.uri);c!==null&&(s=c)}return this.loadTextureImage(n,r,s)}loadTextureImage(n,t,i){const a=this,r=this.json,o=r.textures[n],s=r.images[t],c=(s.uri||s.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,i).then(function(d){d.flipY=!1,d.name=o.name||s.name||"",d.name===""&&typeof s.uri=="string"&&s.uri.startsWith("data:image/")===!1&&(d.name=s.uri);const f=(r.samplers||{})[o.sampler]||{};return d.magFilter=Na[f.magFilter]||mt,d.minFilter=Na[f.minFilter]||jt,d.wrapS=Fa[f.wrapS]||pi,d.wrapT=Fa[f.wrapT]||pi,d.generateMipmaps=!d.isCompressedTexture&&d.minFilter!==Zt&&d.minFilter!==mt,a.associations.set(d,{textures:n}),d}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(n,t){const i=this,a=this.json,r=this.options;if(this.sourceCache[n]!==void 0)return this.sourceCache[n].then(u=>u.clone());const o=a.images[n],s=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=i.getDependency("bufferView",o.bufferView).then(function(u){l=!0;const f=new Blob([u],{type:o.mimeType});return c=s.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+n+" is missing URI and bufferView");const d=Promise.resolve(c).then(function(u){return new Promise(function(f,_){let E=f;t.isImageBitmapLoader===!0&&(E=function(T){const p=new mi(T);p.needsUpdate=!0,f(p)}),t.load(Wn.resolveURL(u,r.path),E,void 0,_)})}).then(function(u){return l===!0&&s.revokeObjectURL(c),Ht(u,o),u.userData.mimeType=o.mimeType||mh(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[n]=d,d}assignTexture(n,t,i,a){const r=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),r.extensions[Fe.KHR_TEXTURE_TRANSFORM]){const s=i.extensions!==void 0?i.extensions[Fe.KHR_TEXTURE_TRANSFORM]:void 0;if(s){const c=r.associations.get(o);o=r.extensions[Fe.KHR_TEXTURE_TRANSFORM].extendTexture(o,s),r.associations.set(o,c)}}return a!==void 0&&(o.colorSpace=a),n[t]=o,o})}assignFinalMaterial(n){const t=n.geometry;let i=n.material;const a=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(n.isPoints){const s="PointsMaterial:"+i.uuid;let c=this.cache.get(s);c||(c=new Rc,yi.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,c.sizeAttenuation=!1,this.cache.add(s,c)),i=c}else if(n.isLine){const s="LineBasicMaterial:"+i.uuid;let c=this.cache.get(s);c||(c=new Cc,yi.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,this.cache.add(s,c)),i=c}if(a||r||o){let s="ClonedMaterial:"+i.uuid+":";a&&(s+="derivative-tangents:"),r&&(s+="vertex-colors:"),o&&(s+="flat-shading:");let c=this.cache.get(s);c||(c=i.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),a&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(s,c),this.associations.set(c,this.associations.get(i))),i=c}n.material=i}getMaterialType(){return Si}loadMaterial(n){const t=this,i=this.json,a=this.extensions,r=i.materials[n];let o;const s={},c=r.extensions||{},l=[];if(c[Fe.KHR_MATERIALS_UNLIT]){const u=a[Fe.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(s,r,t))}else{const u=r.pbrMetallicRoughness||{};if(s.color=new ze(1,1,1),s.opacity=1,Array.isArray(u.baseColorFactor)){const f=u.baseColorFactor;s.color.setRGB(f[0],f[1],f[2],Ft),s.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(s,"map",u.baseColorTexture,cn)),s.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,s.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(s,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(s,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(n)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(n,s)})))}r.doubleSided===!0&&(s.side=yt);const d=r.alphaMode||Gi.OPAQUE;if(d===Gi.BLEND?(s.transparent=!0,s.depthWrite=!1):(s.transparent=!1,d===Gi.MASK&&(s.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Tn&&(l.push(t.assignTexture(s,"normalMap",r.normalTexture)),s.normalScale=new St(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;s.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Tn&&(l.push(t.assignTexture(s,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(s.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Tn){const u=r.emissiveFactor;s.emissive=new ze().setRGB(u[0],u[1],u[2],Ft)}return r.emissiveTexture!==void 0&&o!==Tn&&l.push(t.assignTexture(s,"emissiveMap",r.emissiveTexture,cn)),Promise.all(l).then(function(){const u=new o(s);return r.name&&(u.name=r.name),Ht(u,r),t.associations.set(u,{materials:n}),r.extensions&&un(a,u,r),u})}createUniqueName(n){const t=wc.sanitizeNodeName(n||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(n){const t=this,i=this.extensions,a=this.primitiveCache;function r(s){return i[Fe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(s,t).then(function(c){return Oa(c,s,t)})}const o=[];for(let s=0,c=n.length;s<c;s++){const l=n[s],d=hh(l),u=a[d];if(u)o.push(u.promise);else{let f;l.extensions&&l.extensions[Fe.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Oa(new _n,l,t),a[d]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(n){const t=this,i=this.json,a=this.extensions,r=i.meshes[n],o=r.primitives,s=[];for(let c=0,l=o.length;c<l;c++){const d=o[c].material===void 0?uh(this.cache):this.getDependency("material",o[c].material);s.push(d)}return s.push(t.loadGeometries(o)),Promise.all(s).then(function(c){const l=c.slice(0,c.length-1),d=c[c.length-1],u=[];for(let _=0,E=d.length;_<E;_++){const T=d[_],p=o[_];let h;const S=l[_];if(p.mode===Pt.TRIANGLES||p.mode===Pt.TRIANGLE_STRIP||p.mode===Pt.TRIANGLE_FAN||p.mode===void 0)h=r.isSkinnedMesh===!0?new lr(T,S):new Kt(T,S),h.isSkinnedMesh===!0&&h.normalizeSkinWeights(),p.mode===Pt.TRIANGLE_STRIP?h.geometry=Ia(h.geometry,So):p.mode===Pt.TRIANGLE_FAN&&(h.geometry=Ia(h.geometry,Yi));else if(p.mode===Pt.LINES)h=new Lc(T,S);else if(p.mode===Pt.LINE_STRIP)h=new Pc(T,S);else if(p.mode===Pt.LINE_LOOP)h=new yc(T,S);else if(p.mode===Pt.POINTS)h=new Ic(T,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(h.geometry.morphAttributes).length>0&&ph(h,r),h.name=t.createUniqueName(r.name||"mesh_"+n),Ht(h,r),p.extensions&&un(a,h,p),t.assignFinalMaterial(h),u.push(h)}for(let _=0,E=u.length;_<E;_++)t.associations.set(u[_],{meshes:n,primitives:_});if(u.length===1)return r.extensions&&un(a,u[0],r),u[0];const f=new li;r.extensions&&un(a,f,r),t.associations.set(f,{meshes:n});for(let _=0,E=u.length;_<E;_++)f.add(u[_]);return f})}loadCamera(n){let t;const i=this.json.cameras[n],a=i[i.type];if(!a){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new zn(Mo.radToDeg(a.yfov),a.aspectRatio||1,a.znear||1,a.zfar||2e6):i.type==="orthographic"&&(t=new rr(-a.xmag,a.xmag,a.ymag,-a.ymag,a.znear,a.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Ht(t,i),Promise.resolve(t)}loadSkin(n){const t=this.json.skins[n],i=[];for(let a=0,r=t.joints.length;a<r;a++)i.push(this._loadNodeShallow(t.joints[a]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(a){const r=a.pop(),o=a,s=[],c=[];for(let l=0,d=o.length;l<d;l++){const u=o[l];if(u){s.push(u);const f=new vt;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new To(s,c)})}loadAnimation(n){const t=this.json,i=this,a=t.animations[n],r=a.name?a.name:"animation_"+n,o=[],s=[],c=[],l=[],d=[];for(let u=0,f=a.channels.length;u<f;u++){const _=a.channels[u],E=a.samplers[_.sampler],T=_.target,p=T.node,h=a.parameters!==void 0?a.parameters[E.input]:E.input,S=a.parameters!==void 0?a.parameters[E.output]:E.output;T.node!==void 0&&(o.push(this.getDependency("node",p)),s.push(this.getDependency("accessor",h)),c.push(this.getDependency("accessor",S)),l.push(E),d.push(T))}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l),Promise.all(d)]).then(function(u){const f=u[0],_=u[1],E=u[2],T=u[3],p=u[4],h=[];for(let b=0,C=f.length;b<C;b++){const w=f[b],A=_[b],L=E[b],v=T[b],M=p[b];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();const P=i._createAnimationTracks(w,A,L,v,M);if(P)for(let R=0;R<P.length;R++)h.push(P[R])}const S=new Uc(r,void 0,h);return Ht(S,a),S})}createNodeMesh(n){const t=this.json,i=this,a=t.nodes[n];return a.mesh===void 0?null:i.getDependency("mesh",a.mesh).then(function(r){const o=i._getNodeRef(i.meshCache,a.mesh,r);return a.weights!==void 0&&o.traverse(function(s){if(s.isMesh)for(let c=0,l=a.weights.length;c<l;c++)s.morphTargetInfluences[c]=a.weights[c]}),o})}loadNode(n){const t=this.json,i=this,a=t.nodes[n],r=i._loadNodeShallow(n),o=[],s=a.children||[];for(let l=0,d=s.length;l<d;l++)o.push(i.getDependency("node",s[l]));const c=a.skin===void 0?Promise.resolve(null):i.getDependency("skin",a.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const d=l[0],u=l[1],f=l[2];f!==null&&d.traverse(function(_){_.isSkinnedMesh&&_.bind(f,_h)});for(let _=0,E=u.length;_<E;_++)d.add(u[_]);if(d.userData.pivot!==void 0&&u.length>0){const _=d.userData.pivot,E=u[0];d.pivot=new ae().fromArray(_),d.position.x-=_[0],d.position.y-=_[1],d.position.z-=_[2],E.position.set(0,0,0),delete d.userData.pivot}return d})}_loadNodeShallow(n){const t=this.json,i=this.extensions,a=this;if(this.nodeCache[n]!==void 0)return this.nodeCache[n];const r=t.nodes[n],o=r.name?a.createUniqueName(r.name):"",s=[],c=a._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(n)});return c&&s.push(c),r.camera!==void 0&&s.push(a.getDependency("camera",r.camera).then(function(l){return a._getNodeRef(a.cameraCache,r.camera,l)})),a._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(n)}).forEach(function(l){s.push(l)}),this.nodeCache[n]=Promise.all(s).then(function(l){let d;if(r.isBone===!0?d=new Hn:l.length>1?d=new li:l.length===1?d=l[0]:d=new Eo,d!==l[0])for(let u=0,f=l.length;u<f;u++)d.add(l[u]);if(r.name&&(d.userData.name=r.name,d.name=o),Ht(d,r),r.extensions&&un(i,d,r),r.matrix!==void 0){const u=new vt;u.fromArray(r.matrix),d.applyMatrix4(u)}else r.translation!==void 0&&d.position.fromArray(r.translation),r.rotation!==void 0&&d.quaternion.fromArray(r.rotation),r.scale!==void 0&&d.scale.fromArray(r.scale);if(!a.associations.has(d))a.associations.set(d,{});else if(r.mesh!==void 0&&a.meshCache.refs[r.mesh]>1){const u=a.associations.get(d);a.associations.set(d,{...u})}return a.associations.get(d).nodes=n,d}),this.nodeCache[n]}loadScene(n){const t=this.extensions,i=this.json.scenes[n],a=this,r=new li;i.name&&(r.name=a.createUniqueName(i.name)),Ht(r,i),i.extensions&&un(t,r,i);const o=i.nodes||[],s=[];for(let c=0,l=o.length;c<l;c++)s.push(a.getDependency("node",o[c]));return Promise.all(s).then(function(c){for(let d=0,u=c.length;d<u;d++){const f=c[d];f.parent!==null?r.add(Do(f)):r.add(f)}const l=d=>{const u=new Map;for(const[f,_]of a.associations)(f instanceof yi||f instanceof mi)&&u.set(f,_);return d.traverse(f=>{const _=a.associations.get(f);_!=null&&u.set(f,_)}),u};return a.associations=l(r),r})}_createAnimationTracks(n,t,i,a,r){const o=[],s=n.name?n.name:n.uuid,c=[];function l(_){_.morphTargetInfluences&&c.push(_.name?_.name:_.uuid)}nn[r.path]===nn.weights?(l(n),n.isGroup&&n.children.forEach(l)):c.push(s);let d;switch(nn[r.path]){case nn.weights:d=oa;break;case nn.rotation:d=sa;break;case nn.translation:case nn.scale:d=aa;break;default:switch(i.itemSize){case 1:d=oa;break;case 2:case 3:default:d=aa;break}break}const u=a.interpolation!==void 0?fh[a.interpolation]:Ao,f=this._getArrayFromAccessor(i);for(let _=0,E=c.length;_<E;_++){const T=new d(c[_]+"."+nn[r.path],t.array,f,u);a.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(T),o.push(T)}return o}_getArrayFromAccessor(n){let t=n.array;if(n.normalized){const i=Qi(t.constructor),a=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)a[r]=t[r]*i;t=a}return t}_createCubicSplineTrackInterpolant(n){n.createInterpolant=function(i){const a=this instanceof sa?lh:Oo;return new a(this.times,this.values,this.getValueSize()/3,i)},n.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function vh(e,n,t){const i=n.attributes,a=new bo;if(i.POSITION!==void 0){const s=t.json.accessors[i.POSITION],c=s.min,l=s.max;if(c!==void 0&&l!==void 0){if(a.set(new ae(c[0],c[1],c[2]),new ae(l[0],l[1],l[2])),s.normalized){const d=Qi(An[s.componentType]);a.min.multiplyScalar(d),a.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=n.targets;if(r!==void 0){const s=new ae,c=new ae;for(let l=0,d=r.length;l<d;l++){const u=r[l];if(u.POSITION!==void 0){const f=t.json.accessors[u.POSITION],_=f.min,E=f.max;if(_!==void 0&&E!==void 0){if(c.setX(Math.max(Math.abs(_[0]),Math.abs(E[0]))),c.setY(Math.max(Math.abs(_[1]),Math.abs(E[1]))),c.setZ(Math.max(Math.abs(_[2]),Math.abs(E[2]))),f.normalized){const T=Qi(An[f.componentType]);c.multiplyScalar(T)}s.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}a.expandByVector(s)}e.boundingBox=a;const o=new Oc;a.getCenter(o.center),o.radius=a.min.distanceTo(a.max)/2,e.boundingSphere=o}function Oa(e,n,t){const i=n.attributes,a=[];function r(o,s){return t.getDependency("accessor",o).then(function(c){e.setAttribute(s,c)})}for(const o in i){const s=$i[o]||o.toLowerCase();s in e.attributes||a.push(r(i[o],s))}if(n.indices!==void 0&&!e.index){const o=t.getDependency("accessor",n.indices).then(function(s){e.setIndex(s)});a.push(o)}return tt.workingColorSpace!==Ft&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${tt.workingColorSpace}" not supported.`),Ht(e,n),vh(e,n,t),Promise.all(a).then(function(){return n.targets!==void 0?dh(e,n.targets,t):e})}const Sh=e=>e.replace(/_/g," ");function Bo(e,n){return e.bones.findIndex(t=>Sh(t.name)===n)}function Ba(e,n){const t=Bo(e,n);return t<0?null:new ae().setFromMatrixPosition(e.boneInverses[t].clone().invert())}function Nn(e,n,t,i,a){const r=Bo(i.skeleton,t);if(r<0)return null;const o=e.getAttribute("position").count;e.setAttribute("skinIndex",new cr(new Array(o*4).fill(0).map((c,l)=>l%4===0?r:0),4)),e.setAttribute("skinWeight",new rn(new Array(o*4).fill(0).map((c,l)=>l%4===0?1:0),4));const s=new lr(e,n);return s.name=a,s.frustumCulled=!1,s.castShadow=!0,s.bind(i.skeleton,i.bindMatrix),s}const Xn=(e,n,t=!1,i=28)=>new Hc(new Vc(e,t,"catmullrom",.5),i,n,5,t);function xh(e,n){const t=e.getAttribute("position");let i=n.eye.z+.012;for(let a=0;a<t.count;a++){const r=Math.abs(t.getX(a)-n.eye.x),o=t.getY(a)-n.eye.y;r>.02&&r<.045&&o>-.02&&o<.025&&(i=Math.max(i,t.getZ(a)))}return i}function Eh(e,n,t){const i=n.eyeHalf,a=Math.max(n.eye.z+.02,t+.006),r=n.eye.y+.002,o=e==="metal"?.0245:.027,s=e==="metal"?.0026:e==="square"?.0048:.0056,c=[],l=[],d=_=>{const E=[];for(let p=0;p<24;p++){const h=p/24*Math.PI*2;if(e==="square"){const b=Math.cos(h),C=Math.sin(h);E.push(new ae(_+Math.sign(b)*Math.pow(Math.abs(b),.38)*.031,r+Math.sign(C)*Math.pow(Math.abs(C),.38)*.021,a))}else E.push(new ae(_+Math.cos(h)*o,r+Math.sin(h)*o,a))}return E};for(const _ of[1,-1]){const E=n.eye.x+_*i;c.push(Xn(d(E),s,!0,36));const T=e==="square"?new sr(.058,.04):new Bc(o*.97,20);T.translate(E,r,a),l.push(T);const p=E+_*(e==="square"?.031:o);c.push(Xn([new ae(p,r+.003,a),new ae(_*.071,r+.002,a-.045),new ae(_*.079,r-.004,n.eye.z-.085)],s*.9,!1,10))}const u=e==="square"?.031:o;c.push(Xn([new ae(n.eye.x+i-u,r+.006,a),new ae(n.eye.x,r+.011,a+.002),new ae(n.eye.x-i+u,r+.006,a)],s,!1,8));const f=_=>_.index?_.toNonIndexed():_;return{frame:_i(c.map(f)),lens:_i(l.map(f))}}function Mh(e){const n=(a,r,o)=>new ae(e.x+a,e.y+r,e.z+o),t=Xn([n(.082,-.07,.07),n(.1,-.015,0),n(.074,.02,-.075),n(0,.03,-.095),n(-.074,.02,-.075),n(-.1,-.015,0),n(-.082,-.07,.07)],.0065,!1,36),i=[t.index?t.toNonIndexed():t];for(const a of[1,-1]){const r=new Gc(.034,.034,.024,20);r.rotateZ(Math.PI/2),r.translate(a*.084,0,0),r.translate(e.x,e.y-.082,e.z+.078),i.push(r.index?r.toNonIndexed():r)}return _i(i)}function Th(e){const n=e.skull.center,t=e.skull.radii,i=1.05,a=.78,r=new ae(t.x*Math.sin(i)*Math.cos(a),t.y*Math.sin(a),t.z*Math.cos(i)*Math.cos(a)),o=new ae(r.x/(t.x*t.x),r.y/(t.y*t.y),r.z/(t.z*t.z)).normalize(),s=new Ln(.034,.008,.009),c=new Tt().setFromUnitVectors(new ae(0,0,1),o);return s.applyQuaternion(c),s.rotateY(0),s.translate(n.x+r.x+o.x*.016,n.y+r.y+o.y*.016,n.z+r.z+o.z*.016),s}function Ah(e){const n=[],t=new Ln(.3,.4,.14,1,1,1);t.translate(e.x,e.y-.02,e.z-.185);const i=new Ln(.2,.15,.04);i.translate(e.x,e.y-.12,e.z-.275),n.push(t,i);for(const a of[1,-1])n.push(Xn([new ae(e.x+a*.1,e.y+.16,e.z-.2),new ae(e.x+a*.12,e.y+.2,e.z-.06),new ae(e.x+a*.125,e.y+.1,e.z+.075),new ae(e.x+a*.115,e.y-.08,e.z+.085)],.014,!1,14));return _i(n.map(a=>a.index?a.toNonIndexed():a))}function bh(e){const{ids:n,lm:t,headMesh:i,bodyMesh:a}=e,r={meshes:[],materials:[]},o=(l,d=.4,u=.1,f={})=>{const _=new Si({color:l,roughness:d,metalness:u,...f});return r.materials.push(_),_},s=l=>{l&&r.meshes.push(l)},c=n.find(l=>l==="roundGlasses"||l==="squareGlasses"||l==="metalRoundGlasses");if(c){const l=c==="squareGlasses"?"square":c==="metalRoundGlasses"?"metal":"round",d=Eh(l,t,xh(i.geometry,t)),u=l==="metal"?14270318:e.color??2303534;s(Nn(d.frame,o(u,l==="metal"?.25:.4,l==="metal"?.8:.1),"Head",i,"human-glasses-frame")),s(Nn(d.lens,o(10470632,.05,0,{transparent:!0,opacity:.2,depthWrite:!1,side:yt}),"Head",i,"human-glasses-lens"))}if(n.includes("neckHeadphones")){const l=Ba(a.skeleton,"Neck");l&&s(Nn(Mh(l),o(2303533,.5,.15),"Neck",a,"human-headphones"))}if(n.includes("hairClip")&&s(Nn(Th(t),o(15780308,.35,.3),"Head",i,"human-hairclip")),n.includes("backpack")){const l=Ba(a.skeleton,"Spine2");if(l){const d=Nn(Ah(l),o(1513500,.8,0),"Spine2",a,"human-backpack");d&&(s(d),r.backpack=d)}}return r}const Go=(e,n,t)=>{const i=n.getAttribute("skinIndex"),a=n.getAttribute("skinWeight");let r=0,o=-1;for(let s=0;s<4;s++){const c=a.getComponent(t,s);c>o&&(o=c,r=i.getComponent(t,s))}return{name:(e[r]??"").replace(/_/g," "),weight:o}},Rh=[.08,.112,.108];function Ga(e,n){const t=e.getAttribute("position"),i=new ae;let a=0,r=1/0,o=-1/0;for(let l=0;l<t.count;l++){const{name:d,weight:u}=Go(n,e,l);u>.6&&(d==="Bip01 LEye"||d==="Bip01 REye")&&(i.add(new ae(t.getX(l),t.getY(l),t.getZ(l))),r=Math.min(r,t.getX(l)),o=Math.max(o,t.getX(l)),a++)}if(!a)return null;const s=i.multiplyScalar(1/a),c=new ae(0,s.y+.005,s.z-.066);return{eye:s,eyeHalf:(Math.abs(o-r)/2>.03,.031),skull:{center:c,radii:new ae(...Rh)}}}function Ch(e,n,t){const i=e.getAttribute("position"),a=new Uint8Array(i.count);for(let r=0;r<i.count;r++){const{name:o,weight:s}=Go(n,e,r);if(o!=="Head"||s<.5)continue;const c=i.getX(r)-t.eye.x,l=i.getY(r)-t.eye.y,d=i.getZ(r)-t.eye.z,u=Math.abs(c);u>.062&&u<.096&&Math.abs(l)<.05&&d>-.13&&d<-.02||(l>.05||u>.096&&l>-.1||d<-.06&&l>-.13||d<-.12)&&(a[r]=1)}return a}function wh(e,n,t){const i=Ch(e,n,t),a=e.getAttribute("position"),r=t.skull.center,o=t.skull.radii;let s=0;for(let c=0;c<a.count;c++){if(!i[c])continue;const l=a.getX(c)-r.x,d=a.getY(c)-r.y,u=a.getZ(c)-r.z,f=(l/o.x)**2+(d/o.y)**2+(u/o.z)**2;if(f<=1)continue;const _=1/Math.sqrt(f);a.setXYZ(c,r.x+l*_,r.y+d*_,r.z+u*_),s++}return a.needsUpdate=!0,e.computeBoundingSphere(),s}function Lh(e,n){const t=e.getAttribute("position"),i=o=>{const s=t.getX(o)-n.eye.x,c=t.getY(o)-n.eye.y,l=t.getZ(o)-n.eye.z;return Math.abs(c)<.045&&l>-.03&&Math.abs(s)<.085},a=e.getIndex(),r=[];if(a)for(let o=0;o<a.count;o+=3){const s=a.getX(o),c=a.getX(o+1),l=a.getX(o+2);i(s)&&i(c)&&i(l)&&r.push(s,c,l)}else for(let o=0;o<t.count;o+=3)i(o)&&i(o+1)&&i(o+2)&&r.push(o,o+1,o+2);return e.setIndex(r),r.length/3}function Ph(e){let n=(e^1374496523)>>>0;return()=>{n=n+1831565813>>>0;let t=n;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const ot=(e,n,t)=>{const i=Math.min(1,Math.max(0,(t-e)/(n-e)));return i*i*(3-2*i)},yh=e=>Math.hypot(e[0],e[1],e[2]),Dt=e=>{const n=yh(e)||1;return[e[0]/n,e[1]/n,e[2]/n]},Vi=(e,n)=>[e[1]*n[2]-e[2]*n[1],e[2]*n[0]-e[0]*n[2],e[0]*n[1]-e[1]*n[0]],gt=(e,n,t)=>e+(n-e)*t,Ih=(e,n)=>{if(n<=e[0][0])return e[0][1];for(let t=1;t<e.length;t++)if(n<=e[t][0])return gt(e[t-1][1],e[t][1],(n-e[t-1][0])/(e[t][0]-e[t-1][0]));return e[e.length-1][1]},Uh=[[0,.8],[.8,.78],[1.2,.58],[1.5,.42],[1.9,.3],[2.3,-.05],[3.15,-.3]],Lt=(e,n=0)=>t=>Ih(Uh,t)+(e-.8)*(1-ot(.9,1.5,t))+n*ot(1.2,1.9,t),Dh={messyCrop:{endLat:Lt(.7),thick:(e,n,t)=>.006+.012*Math.sin(n)+t(e*4,n*6)*.01*Math.cos(n),cards:{count:26,width:[.025,.04],tipExtra:.02}},sidePart:{endLat:Lt(.74),thick:(e,n,t)=>.006+.008*Math.sin(n)+.007*Math.max(0,Math.sin(e-.4))*Math.cos(n)+t(e*3,n*4)*.003,cards:{count:14,width:[.03,.045],tipExtra:.012}},buzz:{endLat:Lt(.82,.05),thick:()=>.003},wavy:{endLat:Lt(.68,-.05),thick:(e,n,t)=>.012+.016*Math.sin(n)+t(e*6,n*9)*.01*Math.cos(n),hang:e=>.03*ot(1.5,2.4,e),flare:.02,cards:{count:24,width:[.03,.05],tipExtra:.025}},shortTieUp:{endLat:Lt(.72),thick:(e,n)=>.006+.007*Math.sin(n),cards:{count:10,width:[.025,.04]},bundle:{kind:"tail",tie:[0,-.04,-.115],len:.075,radius:.016,sway:!0},sway:{pivot:[0,-.04,-.115],mid:[0,-.07,-.125],tip:[0,-.105,-.13]}},bob:{endLat:Lt(.64),hang:e=>.1*ot(1.7,2.3,e),flare:.03,back:.015,swing:.5,thick:(e,n)=>.008+.012*Math.sin(n)+.012*ot(1.2,2,Math.abs(e))*Math.cos(n),cards:{count:22,width:[.035,.055],minA:1.7},sway:{pivot:[0,0,-.1],mid:[0,-.07,-.13],tip:[0,-.15,-.14]}},earShort:{endLat:Lt(.66),hang:e=>.06*ot(1.9,2.4,e),flare:.012,swing:.2,thick:(e,n)=>.007+.011*Math.sin(n)+.006*ot(1.2,2,Math.abs(e))*Math.cos(n),cards:{count:12,width:[.03,.045],minA:1.7}},longStraight:{endLat:Lt(.66),hang:e=>.1*ot(1.6,2,e)+.26*ot(1.7,2.4,e),flare:.012,back:.05,swing:.7,thick:(e,n)=>.007+.01*Math.sin(n)+.01*ot(1.2,2,Math.abs(e))*Math.cos(n),cards:{count:24,width:[.04,.06],minA:1.9},sway:{pivot:[0,-.02,-.105],mid:[0,-.13,-.15],tip:[0,-.26,-.17]}},highPonytail:{endLat:Lt(.76),thick:(e,n)=>.005+.006*Math.sin(n)+.01*Math.exp(-(((Math.abs(e)-3.14)/.5)**2+((n-.62)/.3)**2)),bundle:{kind:"tail",tie:[0,.066,-.101],len:.3,radius:.03,sway:!0},sway:{pivot:[0,.066,-.101],mid:[0,-.04,-.15],tip:[0,-.2,-.17]}},lowPonytail:{endLat:Lt(.74),thick:(e,n)=>.005+.006*Math.sin(n)+.01*Math.exp(-(((Math.abs(e)-3.14)/.5)**2+((n+.3)/.3)**2)),bundle:{kind:"tail",tie:[0,-.034,-.116],len:.28,radius:.028,sway:!0},sway:{pivot:[0,-.034,-.116],mid:[0,-.12,-.14],tip:[0,-.27,-.15]}},sideBun:{endLat:Lt(.76),thick:(e,n)=>.005+.006*Math.sin(n),bundle:{kind:"bun",center:[.052,.03,-.112],radius:.04}},thinningSwept:{endLat:Lt(1.12,.05),thick:(e,n)=>.003+.004*Math.sin(n),cards:{count:16,width:[.02,.03],minA:1}}};function Nh(e){const n=(t,i)=>{let a=Math.imul(t*374761393+i*668265263+e*2246822519,1274126177);return a=(a^a>>>13)>>>0,(a&65535)/65535*2-1};return(t,i)=>{const a=Math.floor(t),r=Math.floor(i),o=ot(0,1,t-a),s=ot(0,1,i-r);return gt(gt(n(a,r),n(a+1,r),o),gt(n(a,r+1),n(a+1,r+1),o),s)}}const ei=Math.PI*2,dn=56,Ha=9,Va=7,ti=(e,n,t,i,a,r,o,s)=>{e.positions.push(n[0],n[1],n[2]),e.normals.push(t[0],t[1],t[2]),e.uvs.push(i,a),e.colors.push(r,r,r),e.skinIndex.push(0,1,2,0),e.skinWeight.push(1-o,o*(1-s),o*s,0)};function Fh(e,n,t){var b,C;const i=Dh[e],a=Ph(t*977+e.length*13),r=Nh(t+5),o=n.skull.radii,s=n.skull.center,c={positions:[],normals:[],uvs:[],colors:[],skinIndex:[],skinWeight:[],index:[]},l=(w,A)=>[o.x*Math.sin(w)*Math.cos(A),o.y*Math.sin(A),o.z*Math.cos(w)*Math.cos(A)],d=w=>Dt([w[0]/(o.x*o.x),w[1]/(o.y*o.y),w[2]/(o.z*o.z)]),u=[];for(let w=0;w<=dn;w++){const A=-Math.PI+w/dn*ei,L=Math.abs(A),v=i.endLat(L),M=[];for(let R=0;R<=Ha;R++){const F=gt(Math.PI/2-.02,v,R/Ha),B=l(A,F),z=d(B),N=i.thick(A,F,r);M.push({p:[B[0]+z[0]*N,B[1]+z[1]*N,B[2]+z[2]*N],n:z,sw:0})}const P=i.hang?i.hang(L):0;if(P>.004){const R=M[M.length-1].p,F=Dt([R[0],0,R[2]]);for(let B=1;B<=Va;B++){const z=B/Va,N=(i.flare??0)*z*z,I=[R[0]*(1-.12*z)+F[0]*N,R[1]-P*z,R[2]+F[2]*N-(i.back??0)*z];M.push({p:I,n:Dt([F[0],.25,F[2]]),sw:(i.swing??0)*Math.pow(z,1.1)})}}u.push(M)}const f=w=>{const A=[0];for(let L=1;L<w.length;L++)A.push(A[L-1]+Math.hypot(w[L].p[0]-w[L-1].p[0],w[L].p[1]-w[L-1].p[1],w[L].p[2]-w[L-1].p[2]));return A.map(L=>L/(A[A.length-1]||1))},_=(w,A,L)=>{let v=1;for(;v<A.length-1&&A[v]<L;)v++;const M=(L-A[v-1])/(A[v]-A[v-1]||1),P=w[v-1],R=w[v];return{p:[gt(P.p[0],R.p[0],M),gt(P.p[1],R.p[1],M),gt(P.p[2],R.p[2],M)],n:Dt([gt(P.n[0],R.n[0],M),gt(P.n[1],R.n[1],M),gt(P.n[2],R.n[2],M)]),sw:gt(P.sw,R.sw,M)}},E=w=>.5+.55*Math.pow(w,.8);u.forEach((w,A)=>{const L=f(w),v=.9+r(A*.7,3.3)*.12;w.forEach((M,P)=>{ti(c,[s.x+M.p[0],s.y+M.p[1],s.z+M.p[2]],M.n,.02+.46*(A/dn),L[P],E(L[P])*v,M.sw,ot(.3,1,L[P]))})}),u[0].length;const T=[];let p=0;for(const w of u)T.push(p),p+=w.length;for(let w=0;w<dn;w++){const A=u[w],L=u[w+1],v=Math.max(A.length,L.length),M=(P,R)=>Math.min(P-1,Math.round(R/(v-1)*(P-1)));for(let P=0;P<v-1;P++){const R=T[w]+M(A.length,P),F=T[w]+M(A.length,P+1),B=T[w+1]+M(L.length,P),z=T[w+1]+M(L.length,P+1);R===F&&B===z||c.index.push(R,B,F,B,z,F)}}if(i.cards){const w=i.cards.count;for(let A=0;A<w;A++){let L=Math.floor(a()*dn),v=0;for(;Math.abs(-Math.PI+L/dn*ei)<(i.cards.minA??.9)&&v++<20;)L=Math.floor(a()*dn);const M=u[L],P=f(M),R=.45+a()*.25,F=1,B=gt(i.cards.width[0],i.cards.width[1],a()),z=.85+a()*.25,N=6,I=[];for(let J=0;J<=N;J++)I.push(_(M,P,gt(R,F,J/N)));const H=I[I.length-1],k=I[I.length-2],K=Dt([H.p[0]-k.p[0],H.p[1]-k.p[1],H.p[2]-k.p[2]]),re=i.cards.tipExtra??.01;I.push({p:[H.p[0]+K[0]*re,H.p[1]+K[1]*re,H.p[2]+K[2]*re],n:H.n,sw:H.sw});const he=c.positions.length/3;I.forEach((J,Ae)=>{const Ne=I[Math.min(I.length-1,Ae+1)],Ce=I[Math.max(0,Ae-1)],Y=Dt([Ne.p[0]-Ce.p[0],Ne.p[1]-Ce.p[1],Ne.p[2]-Ce.p[2]]),le=Dt(Vi(Y,J.n)),ee=B/2*(1-.55*Math.pow(Ae/(I.length-1),2)),be=.0035+.002*(Ae/I.length),we=Ae/(I.length-1);for(const Re of[-1,1])ti(c,[s.x+J.p[0]+J.n[0]*be+le[0]*ee*Re,s.y+J.p[1]+J.n[1]*be+le[1]*ee*Re,s.z+J.p[2]+J.n[2]*be+le[2]*ee*Re],J.n,.5+(Re<0?0:.5),we,E(gt(R,1,we))*z,J.sw,ot(.3,1,gt(R,1,we)))});for(let J=0;J<I.length-1;J++){const Ae=he+J*2;c.index.push(Ae,Ae+1,Ae+2,Ae+1,Ae+3,Ae+2)}}}let h=null;if(((b=i.bundle)==null?void 0:b.kind)==="tail"){const{tie:w,len:A,radius:L,sway:v}=i.bundle,M=16,P=12,R=[];for(let B=0;B<=M;B++){const z=B/M;R.push([w[0]+r(z*3,1.7)*.006*z,w[1]-A*Math.pow(z,1.1),w[2]-.055*(1-Math.exp(-z*5))-.02*z])}const F=c.positions.length/3;for(let B=0;B<=M;B++){const z=B/M,N=Dt([R[Math.min(M,B+1)][0]-R[Math.max(0,B-1)][0],R[Math.min(M,B+1)][1]-R[Math.max(0,B-1)][1],R[Math.min(M,B+1)][2]-R[Math.max(0,B-1)][2]]),I=Dt(Vi(N,[0,0,1])),H=Dt(Vi(I,N)),k=z<.04?L*.45:L*(.45+.55*ot(.04,.28,z))*(1-.82*ot(.3,1,z));for(let K=0;K<=P;K++){const re=K/P*ei,he=Math.cos(re),J=Math.sin(re),Ae=[R[B][0]+(I[0]*he*1+H[0]*J*.8)*k,R[B][1]+(I[1]*he+H[1]*J*.8)*k,R[B][2]+(I[2]*he+H[2]*J*.8)*k],Ne=Dt([I[0]*he+H[0]*J,I[1]*he+H[1]*J,I[2]*he+H[2]*J]),Ce=z<.045;ti(c,[s.x+Ae[0],s.y+Ae[1],s.z+Ae[2]],Ne,.02+.46*(K/P),z,Ce?.28:E(z)*(.92+.1*Math.sin(re*3)),v?Math.pow(z,1.3):0,ot(.3,1,z))}}for(let B=0;B<M;B++)for(let z=0;z<P;z++){const N=F+B*(P+1)+z,I=N+P+1;c.index.push(N,I,N+1,N+1,I,I+1)}}else if(((C=i.bundle)==null?void 0:C.kind)==="bun"){const{center:w,radius:A}=i.bundle,L=c.positions.length/3,v=10,M=14;for(let P=0;P<=v;P++){const R=-Math.PI/2+P/v*Math.PI;for(let F=0;F<=M;F++){const B=F/M*ei,z=1+.06*Math.sin(B*3+R*4),N=[Math.cos(R)*Math.cos(B),Math.sin(R),Math.cos(R)*Math.sin(B)];ti(c,[s.x+w[0]+N[0]*A*z,s.y+w[1]+N[1]*A*.9*z,s.z+w[2]+N[2]*A*z],N,.02+.46*(F/M),P/v,.75+.3*(P/v),0,0)}}for(let P=0;P<v;P++)for(let R=0;R<M;R++){const F=L+P*(M+1)+R,B=F+M+1;c.index.push(F,B,F+1,F+1,B,B+1)}}i.sway&&(h=i.sway);const S=new _n;return S.setAttribute("position",new rn(c.positions,3)),S.setAttribute("normal",new rn(c.normals,3)),S.setAttribute("uv",new rn(c.uvs,2)),S.setAttribute("color",new rn(c.colors,3)),S.setAttribute("skinIndex",new cr(c.skinIndex,4)),S.setAttribute("skinWeight",new rn(c.skinWeight,4)),S.setIndex(c.index),S.computeBoundingSphere(),{geometry:S,tail:h,vertexCount:c.positions.length/3}}const kn=256,ui=256;function ni(e){let n=Math.imul(e+2654435769,2246822507);return n=(n^n>>>13)>>>0,n=Math.imul(n,3266489909),((n^n>>>16)>>>0)/4294967296}function Oh(){const e=new Uint8ClampedArray(kn*ui*4),n=kn/2;for(let t=0;t<ui;t++){const i=t/(ui-1);for(let a=0;a<kn;a++){const r=a>=n,o=r?a-n:a,s=(o+.5)/n,c=ni(o*7+3)*.55+ni(o*3+11)*.3+ni(Math.floor(o/5)*17+5)*.15,l=Math.sin(i*7+o*.31)*.05;let d=.66+.34*c+l;d*=1+.13*Math.exp(-(((i-.3)/.1)**2));let u=1;const f=ni(o*13+(r?91:5));r?(u*=ot(0,.16,s)*ot(0,.16,1-s),u*=ot(0,.12,i),u*=1-ot(.72+f*.12,1,i)):u*=1-ot(.93+f*.04,1,i);const _=(t*kn+a)*4,E=Math.min(255,Math.max(0,d*255));e[_]=e[_+1]=e[_+2]=E,e[_+3]=Math.min(255,u*255)}}return e}let Nt;function Bh(){return Nt||(Nt=new $a(Oh(),kn,ui,zt),Nt.colorSpace=cn,Nt.wrapS=Nt.wrapT=Yn,Nt.generateMipmaps=!0,Nt.minFilter=jt,Nt.magFilter=mt,Nt.userData.shared=!0,Nt.needsUpdate=!0),Nt}function Gh(e){const n=new Si({color:e,map:Bh(),vertexColors:!0,alphaTest:.35,side:yt,roughness:.85,metalness:0,envMapIntensity:.15});return n.name="human-hair",n}function Hh(e,n,t,i,a){const r=t.skeleton.bones.find(T=>T.name==="Head");if(!r)return null;const o=t.skeleton.bones.indexOf(r),s=t.skeleton.boneInverses[o],c=Fh(e,n,a),l=[r],d=[s.clone()];let u=null;const f=T=>new ae(n.skull.center.x+T[0],n.skull.center.y+T[1],n.skull.center.z+T[2]).applyMatrix4(s);if(c.tail){const T=f(c.tail.pivot),p=f(c.tail.mid),h=f(c.tail.tip),S=new Hn,b=new Hn;S.name="hair-sway-a",b.name="hair-sway-b",S.position.copy(T),b.position.copy(p).sub(T),S.add(b),r.add(S);const C=new vt().copy(s).invert().multiply(new vt().makeTranslation(T.x,T.y,T.z)),w=C.clone().multiply(new vt().makeTranslation(b.position.x,b.position.y,b.position.z));l.push(S,b),d.push(C.invert(),w.invert()),u=new kh(r,S,b,T,p,h)}else l.push(new Hn,new Hn),d.push(new vt,new vt);const _=new lr(c.geometry,i);_.name=`human-hair-${e}`,_.frustumCulled=!1,_.castShadow=!0,_.receiveShadow=!0;const E=new To(l,d);return _.bind(E,t.bindMatrix),{mesh:_,sway:u,vertexCount:c.vertexCount,style:e}}const ki=new ae,Vh=new ae;class kh{constructor(n,t,i,a,r,o){Ut(this,"posA",new ae);Ut(this,"velA",new ae);Ut(this,"posB",new ae);Ut(this,"velB",new ae);Ut(this,"ready",!1);Ut(this,"restDirA");Ut(this,"restDirB");Ut(this,"lenA");Ut(this,"lenB");Ut(this,"angle",0);this.head=n,this.boneA=t,this.boneB=i,this.pivot=a,this.mid=r,this.tip=o,this.restDirA=r.clone().sub(a),this.restDirB=o.clone().sub(r),this.lenA=this.restDirA.length(),this.lenB=this.restDirB.length()}update(n){if(n<=0)return;const t=Math.min(n,1/30);this.head.updateWorldMatrix(!0,!1);const i=this.head.localToWorld(ki.copy(this.pivot)).clone(),a=this.head.localToWorld(ki.copy(this.mid)).clone(),r=this.head.localToWorld(ki.copy(this.tip)).clone();this.ready||(this.posA.copy(a),this.posB.copy(r),this.ready=!0);const o=70;for(const[T,p,h]of[[this.posA,this.velA,a],[this.posB,this.velB,r]])p.addScaledVector(h.clone().sub(T),o*t).addScaledVector(p,-7*t),p.y-=1.2*t,T.addScaledVector(p,t);const s=this.head.getWorldScale(Vh).x*1,c=this.lenA*s,l=this.lenB*s;this.posA.sub(i).setLength(c).add(i),this.posB.sub(this.posA).setLength(l).add(this.posA);const d=(T,p)=>this.head.worldToLocal(p.clone()).sub(this.head.worldToLocal(T.clone())).normalize(),u=d(i,this.posA),f=new Tt().setFromUnitVectors(this.restDirA.clone().normalize(),u);this.clamp(f,.7),this.boneA.quaternion.copy(f);const _=d(this.posA,this.posB).applyQuaternion(f.clone().invert()),E=new Tt().setFromUnitVectors(this.restDirB.clone().normalize(),_);this.clamp(E,.7),this.boneB.quaternion.copy(E),this.angle=2*Math.acos(Math.min(1,Math.abs(f.w)))}clamp(n,t){const i=2*Math.acos(Math.min(1,Math.abs(n.w)));i>t&&n.slerp(new Tt,1-t/i)}}const Ho=["jawWidth","jawLength","cheekbone","cheekFull","noseLength","noseWidth","noseBridge","eyeSpacing","eyeSize","browHeight","browArch","mouthWidth","lipThickness","foreheadHeight","headAspect"],zh=Object.fromEntries(Ho.map(e=>[e,0])),Wh=e=>Vo({...zh,...e});function Vo(e){const n={...e};for(const t of Ho)n[t]=Math.min(1,Math.max(-1,Number.isFinite(n[t])?n[t]:0));return n}function Xh(e){return Wh({...e,cheekFull:e.cheekFull-.45,browHeight:e.browHeight-.35,jawLength:e.jawLength+.1,cheekbone:e.cheekbone+.1})}const Fn={pos:.008,jaw:.012,scale:.14,jawScale:.2,head:.06},xt=(e,n,t,i=[0,0,0])=>{const a=e[n]??(e[n]={pos:[0,0,0],scale:[0,0,0]});for(let r=0;r<3;r++)a.pos[r]+=t[r],a.scale[r]+=i[r]};function Kh(e){const n=Vo(e),t={},i=Fn.pos,a=Fn.scale,r=Fn.jaw,o=Fn.jawScale;xt(t,"Bip01 MJaw",[0,-r*n.jawLength,r*.4*n.jawLength],[o*n.jawWidth,o*.85*n.jawLength,o*.35*n.jawWidth]);for(const[l,d]of[[1,"Bip01 LCheek"],[-1,"Bip01 RCheek"]])xt(t,d,[l*i*.9*n.cheekbone,i*.2*n.cheekbone,i*.8*n.cheekbone+i*.6*n.cheekFull],[a*n.cheekFull,a*n.cheekFull,a*n.cheekFull]);for(const[l,d]of[[1,"Bip01 LMasseter"],[-1,"Bip01 RMasseter"]])xt(t,d,[l*i*.6*n.jawWidth,0,0],[a*.6*n.cheekFull,0,a*.6*n.cheekFull]);xt(t,"Bip01 MNose",[0,-i*.3*n.noseLength,i*.7*n.noseBridge],[a*n.noseWidth,a*.9*n.noseLength,a*.9*n.noseBridge]);for(const[l,d,u,f]of[[1,"Bip01 LEye","Bip01 LEyeBlinkTop","Bip01 LEyeBlinkBottom"],[-1,"Bip01 REye","Bip01 REyeBlinkTop","Bip01 REyeBlinkBottom"]]){const _=l*i*.5*n.eyeSpacing;xt(t,d,[_,0,0],[a*.5*n.eyeSize,a*.5*n.eyeSize,a*.5*n.eyeSize]),xt(t,u,[_,i*.15*n.eyeSize,0]),xt(t,f,[_,-i*.15*n.eyeSize,0])}for(const l of[1,-1]){const d=l===1?"L":"R";xt(t,`Bip01 ${d}InnerEyebrow`,[0,i*.7*n.browHeight-i*.3*n.browArch,0]),xt(t,`Bip01 ${d}OuterEyebrow`,[l*i*.2*n.browArch,i*.7*n.browHeight+i*.5*n.browArch,0])}xt(t,"Bip01 MMiddleEyebrow",[0,i*.7*n.browHeight,0]);for(const[l,d]of[[1,"L"],[-1,"R"]])xt(t,`Bip01 ${d}MouthCorner`,[l*i*.9*n.mouthWidth,0,0]),xt(t,`Bip01 ${d}Upperlip`,[l*i*.4*n.mouthWidth,i*.3*n.lipThickness,i*.4*n.lipThickness]);xt(t,"Bip01 MUpperLip",[0,i*.3*n.lipThickness,i*.5*n.lipThickness],[0,a*.5*n.lipThickness,a*.5*n.lipThickness]),xt(t,"Bip01 MBottomLip",[0,-i*.3*n.lipThickness,i*.5*n.lipThickness],[0,a*.5*n.lipThickness,a*.5*n.lipThickness]);const s=Fn.head;xt(t,"Head",[0,0,0],[s*n.headAspect,s*n.foreheadHeight,-s*.75*n.headAspect]);for(const[l,d]of Object.entries(t)){const u=l==="Bip01 MJaw"?r:i,f=l==="Bip01 MJaw"?o:a;for(let _=0;_<3;_++)d.pos[_]=Math.min(u,Math.max(-u,d.pos[_])),d.scale[_]=Math.min(f,Math.max(-f,d.scale[_]))}const c=t.Head;if(c)for(let l=0;l<3;l++)c.scale[l]=Math.min(s,Math.max(-s,c.scale[l]));return t}const ii=new vt,ka=new ae;function qh(e,n){e.updateMatrixWorld(!0);const t=Kh(n);for(const[i,a]of Object.entries(t)){const r=e.getObjectByName(i)??e.getObjectByName(i.replace(/ /g,"_"));if(r)if(i!=="Head"&&r.parent&&(ii.copy(r.parent.matrixWorld),ii.setPosition(0,0,0),ii.invert(),ka.set(a.pos[0],a.pos[1],a.pos[2]).applyMatrix4(ii),r.position.add(ka)),i==="Head"){const o=Yh(e),s=[0,0,0];s[o.x]+=a.scale[0],s[o.y]+=a.scale[1],s[o.z]+=a.scale[2],r.scale.set(r.scale.x*(1+s[0]),r.scale.y*(1+s[1]),r.scale.z*(1+s[2]))}else{const o=ko(r),s=[0,0,0];s[o.x]+=a.scale[0],s[o.y]+=a.scale[1],s[o.z]+=a.scale[2],r.scale.set(r.scale.x*(1+s[0]),r.scale.y*(1+s[1]),r.scale.z*(1+s[2]))}}e.updateMatrixWorld(!0)}function ko(e){e.updateWorldMatrix(!0,!1);const n=e.getWorldQuaternion(new Tt).invert(),t=i=>{i.applyQuaternion(n);const a=[Math.abs(i.x),Math.abs(i.y),Math.abs(i.z)];return a.indexOf(Math.max(...a))};return{x:t(new ae(1,0,0)),y:t(new ae(0,1,0)),z:t(new ae(0,0,1))}}function Yh(e){const n=e.getObjectByName("Head");return n?ko(n):{x:0,y:1,z:2}}const za=.02,jh=(e,n,t)=>{const i=n.getAttribute("skinIndex"),a=n.getAttribute("skinWeight");let r=0,o=-1;for(let s=0;s<4;s++){const c=a.getComponent(t,s);c>o&&(o=c,r=i.getComponent(t,s))}return{name:(e[r]??"").replace(/_/g," "),weight:o}},pn=(e,n,t,i,a)=>{const r=e-i[0],o=n-i[1],s=t-i[2];return Math.exp(-(r*r+o*o+s*s)/(2*a*a))},Zh=e=>e/Math.sqrt(e*e+.012*.012);function $h(e,n,t,i,a){let r=0,o=0,s=0;const c=Zh(e),l=Math.abs(e),d=(T,p,h,S)=>pn(l,n,t,[T,p,h],S);let u=d(.058,-.088,-.005,.042);r+=c*u*.014*i.jawWidth,u=d(.066,-.075,-.04,.035),r+=c*u*.008*i.jawWidth,o-=u*.007*i.jawLength,u=pn(l,n,t,[0,-.12,.045],.04),o-=u*.016*i.jawLength,s+=u*.006*i.jawLength,r+=c*pn(l,n,t,[.015,-.115,.04],.03)*.007*i.jawWidth,u=d(.056,-.018,.02,.034),r+=c*u*.011*i.cheekbone,s+=u*.004*i.cheekbone,u=d(.046,-.055,.03,.038),r+=c*u*.006*i.cheekFull,s+=u*.009*i.cheekFull,u=pn(l,n,t,[0,-.032,.045],.022),o-=u*.011*i.noseLength,s+=u*.012*i.noseLength,u=d(.016,-.036,.03,.016),r+=c*u*.008*i.noseWidth,u=pn(l,n,t,[0,.005,.035],.022),s+=u*.01*i.noseBridge;const f=d(.031,0,.025,.024);r+=(l-.031)*c*.12*i.eyeSize*f,o+=n*.12*i.eyeSize*f,r+=c*d(.031,0,.025,.036)*.0065*i.eyeSpacing,u=d(.03,.03,.03,.022),s+=u*.007*i.browHeight,o+=u*.005*i.browHeight,o+=d(.035,.036,.03,.02)*.004*i.browArch,u=pn(l,n,t,[0,-.072,.045],.022),s+=u*.006*i.lipThickness,r+=c*d(.025,-.072,.035,.022)*.009*i.mouthWidth,o+=pn(l,n,t,[0,.065,.035],.045)*.014*i.foreheadHeight;const _=Math.exp(-((n+.04)**2)/(2*.11**2))*Qh(-.12,0,t);r+=e*.07*i.headAspect*_,o-=(n+.03)*.06*i.headAspect*_;const E=Math.hypot(r,o,s);if(E>za){const T=za/E;r*=T,o*=T,s*=T}return a[0]=r,a[1]=o,a[2]=s,a}function Qh(e,n,t){const i=Math.min(1,Math.max(0,(t-e)/(n-e)));return i*i*(3-2*i)}function Jh(e){const n=e.getAttribute("position"),t=e.getIndex(),i=u=>`${Math.round(n.getX(u)*1e5)},${Math.round(n.getY(u)*1e5)},${Math.round(n.getZ(u)*1e5)}`,a=new Map,r=new ae,o=new ae,s=new ae,c=new ae,l=(u,f,_)=>{r.fromBufferAttribute(n,u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,_),c.crossVectors(s.clone().sub(o),r.clone().sub(o));for(const E of[u,f,_]){const T=i(E),p=a.get(T);p?p.add(c):a.set(T,c.clone())}};if(t)for(let u=0;u<t.count;u+=3)l(t.getX(u),t.getX(u+1),t.getX(u+2));else for(let u=0;u<n.count;u+=3)l(u,u+1,u+2);const d=e.getAttribute("normal");for(let u=0;u<n.count;u++){const f=a.get(i(u));!f||f.lengthSq()<1e-14||(f.normalize(),d.setXYZ(u,f.x,f.y,f.z))}d.needsUpdate=!0}function em(e,n,t,i,a=[]){const r=e.getAttribute("position"),o=t.eye,s=[0,0,0],c=T=>$h(T.x-o.x,T.y-o.y,T.z-o.z,i,s),l={"Bip01 LEye":{sum:new ae,n:0},"Bip01 REye":{sum:new ae,n:0}},d=new Array(r.count).fill(""),u=new Array(r.count).fill(!1);for(let T=0;T<r.count;T++){const{name:p,weight:h}=jh(n,e,T);(p==="Neck"||p.startsWith("Spine")||p.endsWith("Shoulder"))&&(u[T]=!0),h>.5&&l[p]&&(d[T]=p,l[p].sum.add(new ae(r.getX(T),r.getY(T),r.getZ(T))),l[p].n++)}const f={};for(const[T,p]of Object.entries(l)){if(!p.n)continue;const h=p.sum.clone().multiplyScalar(1/p.n);f[T]={c:h,d:[...c(h)]}}const _=1+.07*i.eyeSize;let E=0;for(let T=0;T<r.count;T++){if(u[T])continue;const p=new ae(r.getX(T),r.getY(T),r.getZ(T));let h;const S=d[T]?f[d[T]]:void 0;if(S){const b=p.clone().sub(S.c).multiplyScalar(_-1);h=[S.d[0]+b.x,S.d[1]+b.y,S.d[2]+b.z]}else h=[...c(p)];r.setXYZ(T,p.x+h[0],p.y+h[1],p.z+h[2]),E=Math.max(E,Math.hypot(h[0],h[1],h[2]))}r.needsUpdate=!0,Jh(e),e.computeBoundingSphere();for(const T of a){const p=T.getAttribute("position");for(let h=0;h<p.count;h++){const S=c({x:p.getX(h),y:p.getY(h),z:p.getZ(h)});p.setXYZ(h,p.getX(h)+S[0],p.getY(h)+S[1],p.getZ(h)+S[2])}p.needsUpdate=!0,T.computeBoundingSphere()}return E}function zo(e){let n=(e^2654435769)>>>0;return()=>{n=n+1831565813>>>0;let t=n;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const It=e=>[e>>16&255,e>>8&255,e&255],tm=(e,n,t)=>Math.round(e)<<16|Math.round(n)<<8|Math.round(t);function zi(e){const[n,t,i]=It(e);return(.2126*n+.7152*t+.0722*i)/255}function Ji(e,n,t){const i=a=>{const r=(a+e*12)%12;return t-n*Math.min(t,1-t)*Math.max(-1,Math.min(r-3,9-r,1))};return tm(i(0)*255,i(8)*255,i(4)*255)}function nm(e,n){const[t,i,a]=er(e);return Ji(t,i,Math.min(.92,Math.max(.12,a+n)))}function er(e){const[n,t,i]=It(e).map(d=>d/255),a=Math.max(n,t,i),r=Math.min(n,t,i),o=(a+r)/2,s=a-r;let c=0,l=0;return s>1e-6&&(l=s/(1-Math.abs(2*o-1)),a===n?c=(t-i)/s%6:a===t?c=(i-n)/s+2:c=(n-t)/s+4,c=(c/6+1)%1),[c,l,o]}const im={hoodie:[7305090,4151413,8097642,9329246,12163672,5662589,10129286],tee:[14209992,8036536,13208970,9416844,14729850,10787520],cardigan:[8088144,7109258,9071196,6257258],knit:[14272942,12157791,8031390,13088936,9149306],shirtJacket:[6126230,8096346,10123866,7307151,10789017]},rm=[15789800,14341318,10467276,15254720,13162178,3095114,12169929],am=[3753823,3096149,5924215,7170654,9142895,2829620,4869976],om=[1709072,2365972,3811870,4863014,2761760,5914672,1380622],sm=[15263456,14276303,12567497,3487549,14735560],cm=[4026293,13716042,3092275,5939322,14721072],lm=["hoodie","tee","knit","shirtJacket","hoodie","cardigan"];function fm(e,n={},t){const i=t??n.seed??1,a=zo(i*7919+(e==="male"?11:29)),r=p=>p[Math.floor(a()*p.length)%p.length],o=n.aged===!0,s=["hoodie","tee","cardigan","knit","shirtJacket"].find(p=>p===n.outfit)??(o?"cardigan":r(lm)),c=(p,h)=>{const[S,b,C]=er(p);return Ji((S+(a()-.5)*.03+1)%1,Math.min(1,Math.max(0,b*(.9+a()*.2))),Math.min(.9,Math.max(.08,C+(a()-.5)*h)))},l=p=>{const[h,S,b]=er(p);return b<.28?Ji(h,Math.min(.55,Math.max(S,.2)),.3+a()*.08):p},d=n.shirt!==void 0?c(l(n.shirt),.08):r(im[s]);let u=r(rm);Math.abs(zi(u)-zi(d))<.12&&(u=zi(d)>.55?3095114:15789800);const f=n.look,_=f?f.hairColor:o?13619154:n.hair!==void 0?c(n.hair,.04):r(om),E=n.skin??14727316,T=f&&f.skinTone!==0?nm(E,f.skinTone*.17):E;return{kind:e,seed:i,outfit:s,outer:d,inner:u,trousers:n.trousers!==void 0?c(n.trousers,.08):r(am),shoes:r(sm),shoesAccent:r(cm),hair:_,skin:T,beard:e==="female"?"none":f?f.facialHair??"none":o?"full":a()<.25?"stubble":"none",aged:o,browColor:f==null?void 0:f.browColor,browThickness:(f==null?void 0:f.browThickness)??.5,browShape:f==null?void 0:f.browShape,blush:(f==null?void 0:f.blush)??0,lip:(f==null?void 0:f.lip)??0,lipColor:(f==null?void 0:f.lipColor)??12607583,freckles:(f==null?void 0:f.freckles)??0,moles:(f==null?void 0:f.moles)??[],heightScale:(f==null?void 0:f.heightScale)??(o?.975:.96+a()*.08),widthScale:o?.985:.97+a()*.06}}const di=(e,n,t)=>e>=t[0]&&e<t[2]&&n>=t[1]&&n<t[3],On=(e,n,t)=>t.some(i=>di(e,n,i)),um={male:{jacket:[[146,0,366,190],[0,222,152,392],[362,222,512,392],[160,190,352,412]],pants:[[0,0,152,218],[360,0,512,218]],shoes:[[108,352,204,512],[328,340,410,512]],skin:[[0,424,126,512],[384,424,512,512]],inner:[[148,0,362,100],[222,186,284,314],[164,402,352,448]]},female:{jacket:[[96,0,416,256],[0,148,512,258],[150,256,352,412]],pants:[[8,276,158,458],[356,276,506,458]],shoes:[[36,448,158,512],[366,448,502,512]],skin:[[0,0,96,136],[418,0,512,136],[222,224,294,282]],inner:[[232,268,284,322]]}},gi=(e,n,t)=>(.2126*e+.7152*n+.0722*t)/255,Rt=(e,n,t)=>Math.min(t,Math.max(n,e)),tr=(e,n,t)=>{const i=Rt((t-e)/(n-e),0,1);return i*i*(3-2*i)};function En(e,n,t,i,a=.45,r=1.9,o=1){const s=gi(e[n],e[n+1],e[n+2]),c=Rt(s/i,a,r);e[n]+=(Rt(t[0]*c,0,255)-e[n])*o,e[n+1]+=(Rt(t[1]*c,0,255)-e[n+1])*o,e[n+2]+=(Rt(t[2]*c,0,255)-e[n+2])*o}function ri(e,n,t){const i=Math.max(e,n,t),a=Math.min(e,n,t);return i>60&&(i-a)/Math.max(1,i)>.42}function dm(e,n,t,i,a){const r=um[i.kind],o=It(i.outer),s=It(i.inner),c=It(i.trousers),l=It(i.shoes),d=It(i.shoesAccent),u=i.kind==="male"?.15:.13,f=i.kind==="male"?.27:.42;for(let _=0;_<t;_++)for(let E=0;E<n;E++){const T=(_*n+E)*4,p=e[T],h=e[T+1],S=e[T+2];if(!(p+h+S<24)){if(On(E,_,r.skin)){a&&(e[T]=Rt(p*a[0],0,255),e[T+1]=Rt(h*a[1],0,255),e[T+2]=Rt(S*a[2],0,255));continue}if(On(E,_,r.inner)&&ri(p,h,S)){En(e,T,s,.45,.6,1.4);continue}if(On(E,_,r.shoes)){if(gi(p,h,S)<.09&&!ri(p,h,S))continue;ri(p,h,S)?En(e,T,d,.4,.5,1.5):En(e,T,l,.78,.7,1.15,.7);continue}if(On(E,_,r.pants)){En(e,T,c,f,.4,2);continue}if(On(E,_,r.jacket)){if(gi(p,h,S)>.38&&!ri(p,h,S)&&i.kind==="male")continue;En(e,T,o,u,.5,2.4)}}}}const Wo={male:{hairMax:.3,eyes:[196,134,322,166],brows:[190,112,330,134],beard:[140,196,380,320],cheek:[190,160,250,190]},female:{hairMax:.42,eyes:[196,134,322,166],brows:[190,112,330,134],beard:[0,0,0,0],cheek:[190,170,240,200]}};function Xo(e,n,t){const i=Wo[t].cheek;let a=0,r=0,o=0,s=0;for(let c=i[1];c<i[3];c++)for(let l=i[0];l<i[2];l++){const d=(c*n+l)*4;a+=e[d],r+=e[d+1],o+=e[d+2],s++}return s?[a/s,r/s,o/s]:null}function pm(e,n){if(!n)return[1,1,1];const t=It(e);return[0,1,2].map(i=>Rt(.55+.45*(t[i]/Math.max(1,n[i])),.8,1.2))}function ai(e,n,t){let i=Math.imul(e*374761393+n*668265263+t*2246822519,1274126177);return i=(i^i>>>13)>>>0,(i&65535)/65535}function Wi(e,n,t,i){const a=e/t,r=n/t,o=Math.floor(a),s=Math.floor(r),c=tr(0,1,a-o),l=tr(0,1,r-s),d=ai(o,s,i),u=ai(o+1,s,i),f=ai(o,s+1,i),_=ai(o+1,s+1,i);return d+(u-d)*c+(f-d)*l+(d-u-f+_)*c*l}function hm(e,n,t,i,a){const r=Wo[i.kind],o=It(i.hair),s=It(i.browColor??i.hair),c=i.kind==="male"?.17:.24,l=i.aged;for(let d=0;d<t;d++)for(let u=0;u<n;u++){const f=(d*n+u)*4,_=e[f],E=e[f+1],T=e[f+2];if(_+E+T<6)continue;const p=gi(_,E,T),h=di(u,d,r.eyes),S=di(u,d,r.brows),b=i.kind==="male"&&di(u,d,r.beard)&&!S,C=_>E*1.55&&_>T*1.7&&p<.4,w=b&&i.beard!=="full"?r.hairMax+.1:S?r.hairMax+.24*i.browThickness:r.hairMax,A=h||C||d>300&&u<190&&i.kind==="male"?0:1-tr(w-.14,w,p);if(A>.01){if(b&&i.beard!=="full"){const P=i.beard==="none"?.92:.6,R=[_,E,T],F=Ko.get(e)??[200,150,120];for(let B=0;B<3;B++)R[B]=F[B]*(.88+.12*Rt(p/.2,0,1.4))*a[B];e[f]+=(R[0]-_)*A*P,e[f+1]+=(R[1]-E)*A*P,e[f+2]+=(R[2]-T)*A*P}else En(e,f,S?s:o,c,.55,l?1.25:1.6,A);continue}let L=_*a[0],v=E*a[1],M=T*a[2];if(l&&p>.3&&!C){const P=.3*L+.59*v+.11*M;L=L+(P-L)*.2,v=v+(P-v)*.2,M=M+(P-M)*.2;const R=Math.max(0,Math.sin(d*.9+Wi(u,d,14,i.seed)*4))*Wi(u*.4,d,9,i.seed+3),F=Wi(u,d,7,i.seed+9),B=1-.07*R-.06*Math.max(0,F-.62)*3;L*=B,v*=B,M*=B*.99}e[f]=Rt(L,0,255),e[f+1]=Rt(v,0,255),e[f+2]=Rt(M,0,255)}}function mm(e,n,t){const i=zo(t.seed*31+7),a=(o,s,c,l,d)=>{for(let u=Math.floor(s-c-1);u<=s+c+1;u++)for(let f=Math.floor(o-c-1);f<=o+c+1;f++){const _=Math.hypot(f-o,u-s)/c;if(_>1||f<0||u<0||f>=n||u>=n)continue;const E=l*(1-_*_),T=(u*n+f)*4;for(let p=0;p<3;p++)e[T+p]=e[T+p]*(1-E)+d[p]*E}},r=Math.round(t.freckles*140);for(let o=0;o<r;o++){const s=i()<.3,c=s?256+(i()-.5)*30:i()<.5?200+i()*46:266+i()*46,l=s?160+i()*28:168+i()*40;a(c,l,1.1+i()*1.5,.28+i()*.2,[120,74,48])}for(const[o,s]of t.moles)a(o,s,2.6,.75,[70,42,30]);if(t.browShape){const o=It(t.browColor??t.hair),s=t.browShape==="arched"?7:t.browShape==="soft"?3.5:.8,c=1.6+3.4*t.browThickness;for(const l of[!1,!0])for(let d=0;d<=40;d++){const u=d/40,f=198+52*u,_=131-s*Math.sin(Math.PI*Math.min(1,u*1.25))+3*u,E=c*(.45+.55*Math.sin(Math.PI*Math.min(1,.25+u*.9)));a(l?511-f:f,_,E,.7,[o[0]*.8,o[1]*.8,o[2]*.8])}}if(t.blush>0)for(const o of[212,300])a(o,186,26,.2*t.blush,[226,120,118]);if(t.lip>0){const o=It(t.lipColor);for(let s=200;s<=216;s++)for(let c=232;c<=280;c++){const l=((c-256)/21)**2+((s-208)/6)**2;if(l>1)continue;const d=(s*n+c)*4,u=.5*t.lip*(1-l);for(let f=0;f<3;f++)e[d+f]=e[d+f]*(1-u)+o[f]*u}}}const Ko=new WeakMap;function _m(e,n,t){const i=Xo(e,n,t);return i&&Ko.set(e,i),i}function gm(e){const t=new DataView(e).getUint32(12,!0),i=JSON.parse(new TextDecoder().decode(new Uint8Array(e,20,t))),a=20+t+8;return(i.images??[]).flatMap(r=>{if(r.bufferView===void 0)return[];const o=i.bufferViews[r.bufferView];return[{name:r.name??"",mime:r.mimeType??"image/png",bytes:new Uint8Array(e,a+(o.byteOffset??0),o.byteLength)}]})}const fr={},qo={};let Wa;async function Xa(e,n){var r;if(typeof createImageBitmap!="function"||typeof document>"u")return;const t=await createImageBitmap(new Blob([e],{type:n}),{premultiplyAlpha:"none",colorSpaceConversion:"none"}),i=document.createElement("canvas");i.width=t.width,i.height=t.height;const a=i.getContext("2d",{willReadFrequently:!0});if(a)return a.drawImage(t,0,0),(r=t.close)==null||r.call(t),a.getImageData(0,0,i.width,i.height)}function nr(e,n,t){fr[e]=n,t&&(qo[e]=t)}function vm(){return Wa??(Wa=Promise.all(["male","female"].map(async e=>{const n=`./models/humans/${e}.glb`,t=await(await fetch(n)).arrayBuffer(),i=await new Gp().parseAsync(t,n.slice(0,n.lastIndexOf("/")+1));i.scene.traverse(a=>{const r=a;if(r.isMesh)for(const o of Array.isArray(r.material)?r.material:[r.material])for(const s of Object.values(o))s instanceof mi&&(s.userData.shared=!0)}),nr(e,i.scene);try{const a=gm(t),r=l=>a.find(d=>d.name.endsWith(l)),o=r("body_color"),s=r("head_color"),c=s?await Xa(s.bytes,s.mime):void 0;nr(e,i.scene,{body:o?await Xa(o.bytes,o.mime):void 0,head:c,skin:c?Xo(c.data,c.width,e)??void 0:void 0})}catch(a){console.warn("[characters] Appearance textures unavailable; using the base outfit",a)}})).then(()=>{}).catch(e=>{Wa=void 0,console.warn("[characters] Local human model unavailable; keeping fallback",e)}))}function Sm(e="male"){return!!fr[e]}const Ka=new Tt,qa=new Tt;function ir(e,n,t,i){return Ka.setFromEuler(t),qa.copy(n).invert(),i.copy(e).multiply(qa).multiply(Ka).multiply(n).normalize()}function Ya(e,n,t){if(typeof document>"u")return;const i=document.createElement("canvas");i.width=n.width,i.height=n.height;const a=i.getContext("2d");if(!a)return;const r=new ImageData(new Uint8ClampedArray(n.data),n.width,n.height);t(r.data),a.putImageData(r,0,0);const o=new zc(i);return o.colorSpace=cn,o.flipY=!1,e&&(o.wrapS=e.wrapS,o.wrapT=e.wrapT,o.anisotropy=e.anisotropy,o.channel=e.channel),o}function xm(e,n,t="male",i={}){const a=fr[t];if(!a)return;const r=fm(t,i,i.seed),o=[],s=qo[t],c=Do(a);c.name="human-visual";const l=new Map,d=e.userData.ownedMaterials,u=[];c.traverse(k=>{const K=k;if(!K.isMesh)return;K.geometry=K.geometry.clone();const re=he=>{let J=l.get(he);if(!J){J=he.clone();const Ae=J;if(Ae.roughness=.8,Ae.metalness=0,he.name.endsWith("_body")&&(s!=null&&s.body)){const Ne=Ya(Ae.map,s.body,Ce=>dm(Ce,s.body.width,s.body.height,r,ja(s,r)));Ne&&(Ae.map=Ne,o.push(Ne))}else if(he.name.endsWith("_head")&&(s!=null&&s.head)){const Ne=ja(s,r),Ce=Ya(Ae.map,s.head,Y=>{_m(Y,s.head.width,t),hm(Y,s.head.width,s.head.height,r,Ne),mm(Y,s.head.width,r)});Ce&&(Ae.map=Ce,o.push(Ce))}else he.name.endsWith("_opacity")&&(Ae.color=new ze(r.hair));l.set(he,J),d==null||d.add(J)}return J};K.material=Array.isArray(K.material)?K.material.map(re):re(K.material),K.castShadow=K.receiveShadow=!0,K.frustumCulled=!1,K.morphTargetDictionary&&u.push(K)});const f=i.look,_=[];c.traverse(k=>{k.isSkinnedMesh&&_.push(k)});const E=_.find(k=>k.material.name.endsWith("_head")),T=_.find(k=>k.material.name.endsWith("_opacity")),p=_.find(k=>k.material.name.endsWith("_body")),h=E?E.skeleton.bones.map(k=>k.name):[];let S=E?Ga(E.geometry,h):null;if(f){const k=f.aged?Xh(f.face):f.face;qh(c,k),E&&S&&(em(E.geometry,h,S,k,T?[T.geometry]:[]),S=Ga(E.geometry,h)??S)}f&&E&&S&&(wh(E.geometry,E.skeleton.bones.map(k=>k.name),S),T&&Lh(T.geometry,S)===0&&(T.visible=!1)),c.updateMatrixWorld(!0);const b=new bo().setFromObject(c),w=1.8/(b.max.y-b.min.y);c.scale.set(w*r.widthScale,w*r.heightScale,w*r.widthScale),c.position.y-=b.min.y*w*r.heightScale;const A=c.position.y;c.updateMatrixWorld(!0);const L=[];c.traverse(k=>{k!==c&&L.push({node:k,q:k.quaternion.clone(),p:k.position.clone()})});const v=()=>{for(const k of L)k.node.quaternion.copy(k.q),k.node.position.copy(k.p);c.position.y=A,c.updateMatrixWorld(!0)};let M,P;if(f&&E&&p&&S){const k=Gh(f.hairColor);d==null||d.add(k),M=Hh(f.hairStyle,S,E,k,i.seed??1)??void 0,M&&c.add(M.mesh),P=bh({ids:f.accessories??[],lm:S,headMesh:E,bodyMesh:p,color:f.accessoryColor});for(const K of P.meshes)c.add(K);for(const K of P.materials)d==null||d.add(K);c.updateMatrixWorld(!0)}const R=["Spine","Head","LeftArm","RightArm","LeftForeArm","RightForeArm","LeftUpLeg","RightUpLeg","LeftLeg","RightLeg","LeftFoot","RightFoot"],F=[n.body,n.head,n.leftArm,n.rightArm,n.leftElbow,n.rightElbow,n.leftHip,n.rightHip,n.leftKnee,n.rightKnee,n.leftAnkle,n.rightAnkle],B=R.map((k,K)=>{const re=c.getObjectByName(k);return re?{bone:re,source:F[K],restLocal:re.quaternion.clone(),restWorld:re.getWorldQuaternion(new Tt)}:void 0}).filter(k=>k!==void 0);e.traverse(k=>{if(k.isLight&&(k.visible=!1),k.isMesh&&!k.userData.isFootRing){let K=k;for(;K&&K!==e&&!K.userData.personDynamicAccessory;)K=K.parent;K!=null&&K.userData.personDynamicAccessory||(k.visible=!1)}}),e.add(c);for(const k of n.props??[]){const K=c.getObjectByName(k.hand);if(!K)continue;const re=new li,he=e.getWorldQuaternion(new Tt);re.quaternion.copy(K.getWorldQuaternion(new Tt).invert().multiply(he)),re.scale.copy(e.getWorldScale(new ae)).divide(K.getWorldScale(new ae)),K.add(re),re.add(k.object)}const z=[];c.traverse(k=>{/^(Left|Right)Hand(Index|Middle|Ring|Pinky)[123]$/.test(k.name)&&z.push({bone:k,local:k.quaternion.clone(),world:e.getWorldQuaternion(new Tt).invert().multiply(k.getWorldQuaternion(new Tt)),sign:k.name.startsWith("Left")?-1:1})});const N=new kc,I=(k,K)=>{var re;for(const he of u){const J=(re=he.morphTargetDictionary)==null?void 0:re[k];J!==void 0&&he.morphTargetInfluences&&(he.morphTargetInfluences[J]=Mo.clamp(K,0,1))}},H=()=>{var re,he;c.position.y=A+n.body.position.y-n.bodyRestY;for(const J of B)N.copy(J.source.rotation),ir(J.restLocal,J.restWorld,N,J.bone.quaternion);for(const J of z)N.set(0,0,J.sign*(((re=n.grip)==null?void 0:re.call(n))??0)),ir(J.local,J.world,N,J.bone.quaternion);I("eyeBlinkLeft",n.blinkLeft()),I("eyeBlinkRight",n.blinkRight()),I("jawOpen",n.mouthOpen()),I("mouthSmileLeft",n.smile()),I("mouthSmileRight",n.smile());const k=n.gazeX(),K=n.gazeY();I("eyeLookInLeft",Math.max(0,k)),I("eyeLookOutRight",Math.max(0,k)),I("eyeLookOutLeft",Math.max(0,-k)),I("eyeLookInRight",Math.max(0,-k)),I("eyeLookUpLeft",Math.max(0,K)),I("eyeLookUpRight",Math.max(0,K)),I("eyeLookDownLeft",Math.max(0,-K)),I("eyeLookDownRight",Math.max(0,-K)),I("browInnerUp",((he=n.browLift)==null?void 0:he.call(n))??.08),I("eyeSquintLeft",n.smile()*.18),I("eyeSquintRight",n.smile()*.18)};return e.userData.updateHumanVisual=H,e.userData.humanModel=t,e.userData.humanVisual={visual:c,faces:u,kind:t,appearance:r,ownedTextures:o,recolored:o.length>0,baseY:A,restoreRest:v,hair:M,accessories:P},H(),H}function ja(e,n){return pm(n.skin,e.skin??null)}const bm=Object.freeze(Object.defineProperty({__proto__:null,attachHumanVisual:xm,hasHumanModel:Sm,loadHumanModels:vm,registerHumanModel:nr,retargetRotation:ir},Symbol.toStringTag,{value:"Module"}));export{Gp as G,fa as P,ue as U,Tm as W,_i as a,xm as b,bm as c,Wh as f,Sm as h,vm as l,Am as m};
