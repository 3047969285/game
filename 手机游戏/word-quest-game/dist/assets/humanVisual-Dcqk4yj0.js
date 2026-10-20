import{U as wt,bo as $a,bp as Dt,S as fn,r as Ve,M as Nt,bq as ja,br as Je,bs as ke,a8 as vt,bt as Di,bu as ta,bv as Ii,aX as It,b0 as tt,K as qt,aY as jt,D as Ut,al as xt,aC as un,V as be,bw as Qa,be as bn,a as mn,av as Ni,a$ as Ja,c as yt,aW as Si,b1 as Qe,bx as eo,ab as An,by as to,bz as qn,a2 as _t,H as Gt,bf as sn,bA as dn,bg as Cn,bB as tn,bC as no,aR as io,bD as pn,L as mt,aS as Bn,bE as Pn,bF as hn,j as Ei,d as cn,bG as ro,N as on,bH as yi,bI as ao,bJ as oo,b9 as gn,bK as so,bL as co,bM as lo,bN as fo,bO as uo,bP as po,bQ as ho,bR as mo,bb as _o,bc as go,bS as vo,bT as So,bU as Eo,bV as xo,ba as Mo,bW as na,J as Gn,bX as In,bY as xn,bZ as ia,bh as Ht,b_ as To,b$ as Ao,c0 as xi,c1 as Ro,c2 as Mi,c3 as bo,c4 as Co,c5 as Po,c6 as Be,aG as Lo,aA as wo,aT as Uo,ak as kt,b as $t,ac as Nn,ad as Do,aZ as Vt,c7 as Mn,c8 as Yt,c9 as Io,ca as ra,cb as aa,cc as oa,cd as Hn,ce as sa,cf as ca,cg as la,P as fa,ch as kn,ci as At,cj as No,ck as yo,cl as Fo,cm as Oo,cn as ua,co as Bo,cp as Go,bk as Ho,cq as Yn,cr as Zn,cs as $n,ct as jn,cu as Fi,cv as Oi,cw as Bi,cx as Gi,cy as Hi,cz as Vi,cA as ki,cB as Wi,cC as zi,cD as fi,cE as Xi,cF as Ki,cG as qi,cH as Yi,cI as Zi,cJ as $i,cK as ji,cL as Qi,cM as Ji,cN as er,cO as tr,cP as nr,cQ as ir,cR as rr,cS as ar,cT as or,cU as sr,cV as cr,cW as lr,cX as fr,cY as ui,cZ as ur,c_ as Vo,c$ as ko,d0 as Wo,d1 as zo,d2 as Xo,d3 as Ko,d4 as qo,d5 as Yo,d6 as dr,d7 as Zo,d8 as yn,bd as $o,d9 as pr,da as hr,$ as mr,F as da,aD as jo,db as _r,dc as Qo,dd as pa,de as di,df as ha,dg as Jo,b7 as ma,b6 as _a,ae as ga,b5 as va,b4 as Sa,b3 as Ea,b2 as xa,dh as gr,di as Ma,dj as Qn,dk as Jn,aU as es,aV as ts,dl as vr,dm as gt,dn as ns,dp as is,dq as rs,dr as as,ds as os,dt as ss,du as Vn,dv as cs,dw as ls,dx as fs,dy as us,dz as pi,dA as Ta,dB as ds,dC as Rn,dD as Aa,aE as Ft,h as ps,n as hs,ar as ms,t as _s,Q as Bt,dE as gs,a0 as Ra,dF as vs,dG as Ss,dH as Es,ao as xs,dI as ei,dJ as Ms,f as ba,dK as Ts,bn as As,dL as Rs,dM as bs,dN as Cs,an as Ps,G as Fn,o as Ca,bm as Ls,dO as ws,bl as Us,dP as Ds,dQ as Pa,dR as Is,dS as Sr,dT as Er,dU as xr,dV as Ns,e as La,ay as ys,E as Fs}from"./index-kTa2nJli.js";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function wa(){let e=null,n=!1,t=null,i=null;function r(a,o){t(a,o),i=e.requestAnimationFrame(r)}return{start:function(){n!==!0&&t!==null&&e!==null&&(i=e.requestAnimationFrame(r),n=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(a){t=a},setContext:function(a){e=a}}}function Os(e){const n=new WeakMap;function t(c,l){const d=c.array,_=c.usage,m=d.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,d,_),c.onUploadCallback();let S;if(d instanceof Float32Array)S=e.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)S=e.HALF_FLOAT;else if(d instanceof Uint16Array)c.isFloat16BufferAttribute?S=e.HALF_FLOAT:S=e.UNSIGNED_SHORT;else if(d instanceof Int16Array)S=e.SHORT;else if(d instanceof Uint32Array)S=e.UNSIGNED_INT;else if(d instanceof Int32Array)S=e.INT;else if(d instanceof Int8Array)S=e.BYTE;else if(d instanceof Uint8Array)S=e.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)S=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:u,type:S,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:m}}function i(c,l,d){const _=l.array,m=l.updateRanges;if(e.bindBuffer(d,c),m.length===0)e.bufferSubData(d,0,_);else{m.sort((S,A)=>S.start-A.start);let u=0;for(let S=1;S<m.length;S++){const A=m[u],D=m[S];D.start<=A.start+A.count+1?A.count=Math.max(A.count,D.start+D.count-A.start):(++u,m[u]=D)}m.length=u+1;for(let S=0,A=m.length;S<A;S++){const D=m[S];e.bufferSubData(d,D.start*_.BYTES_PER_ELEMENT,_,D.start,D.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const l=n.get(c);l&&(e.deleteBuffer(l.buffer),n.delete(c))}function o(c,l){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const _=n.get(c);(!_||_.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const d=n.get(c);if(d===void 0)n.set(c,t(c,l));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(d.buffer,c,l),d.version=c.version}}return{get:r,remove:a,update:o}}var Bs=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gs=`#ifdef USE_ALPHAHASH
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
#endif`,Hs=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vs=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ks=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ws=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zs=`#ifdef USE_AOMAP
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
#endif`,Xs=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ks=`#ifdef USE_BATCHING
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
#endif`,qs=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ys=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zs=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$s=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,js=`#ifdef USE_IRIDESCENCE
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
#endif`,Qs=`#ifdef USE_BUMPMAP
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
#endif`,Js=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ec=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nc=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ic=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,rc=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ac=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,oc=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,sc=`#define PI 3.141592653589793
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
} // validated`,cc=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lc=`vec3 transformedNormal = objectNormal;
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
#endif`,fc=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uc=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dc=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pc=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hc="gl_FragColor = linearToOutputTexel( gl_FragColor );",mc=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_c=`#ifdef USE_ENVMAP
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
#endif`,gc=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,vc=`#ifdef USE_ENVMAP
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
#endif`,Sc=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ec=`#ifdef USE_ENVMAP
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
#endif`,xc=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mc=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Tc=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ac=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rc=`#ifdef USE_GRADIENTMAP
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
}`,bc=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cc=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pc=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lc=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,wc=`#ifdef USE_ENVMAP
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
#endif`,Uc=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Dc=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ic=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Nc=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yc=`PhysicalMaterial material;
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
#endif`,Fc=`uniform sampler2D dfgLUT;
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
}`,Oc=`
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
#endif`,Bc=`#if defined( RE_IndirectDiffuse )
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
#endif`,Gc=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hc=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Vc=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kc=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wc=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zc=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xc=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kc=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qc=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Yc=`#if defined( USE_POINTS_UV )
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
#endif`,Zc=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$c=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jc=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qc=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jc=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,el=`#ifdef USE_MORPHTARGETS
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
#endif`,tl=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nl=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,il=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,rl=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,al=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ol=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sl=`#ifdef USE_NORMALMAP
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
#endif`,cl=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ll=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fl=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ul=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dl=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pl=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,hl=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ml=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_l=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gl=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vl=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sl=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,El=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xl=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ml=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Tl=`float getShadowMask() {
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
}`,Al=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rl=`#ifdef USE_SKINNING
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
#endif`,bl=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cl=`#ifdef USE_SKINNING
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
#endif`,Pl=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ll=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wl=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ul=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dl=`#ifdef USE_TRANSMISSION
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
#endif`,Il=`#ifdef USE_TRANSMISSION
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
#endif`,Nl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ol=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bl=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gl=`uniform sampler2D t2D;
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
}`,Hl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vl=`#ifdef ENVMAP_TYPE_CUBE
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
}`,kl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wl=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zl=`#include <common>
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
}`,Xl=`#if DEPTH_PACKING == 3200
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
}`,Kl=`#define DISTANCE
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
}`,ql=`#define DISTANCE
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
}`,Yl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zl=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$l=`uniform float scale;
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
}`,jl=`uniform vec3 diffuse;
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
}`,Ql=`#include <common>
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
}`,Jl=`uniform vec3 diffuse;
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
}`,ef=`#define LAMBERT
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
}`,tf=`#define LAMBERT
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
}`,nf=`#define MATCAP
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
}`,rf=`#define MATCAP
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
}`,af=`#define NORMAL
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
}`,of=`#define NORMAL
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
}`,sf=`#define PHONG
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
}`,cf=`#define PHONG
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
}`,lf=`#define STANDARD
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
}`,ff=`#define STANDARD
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
}`,uf=`#define TOON
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
}`,df=`#define TOON
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
}`,pf=`uniform float size;
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
}`,hf=`uniform vec3 diffuse;
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
}`,mf=`#include <common>
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
}`,_f=`uniform vec3 color;
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
}`,gf=`uniform float rotation;
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
}`,vf=`uniform vec3 diffuse;
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
}`,Ue={alphahash_fragment:Bs,alphahash_pars_fragment:Gs,alphamap_fragment:Hs,alphamap_pars_fragment:Vs,alphatest_fragment:ks,alphatest_pars_fragment:Ws,aomap_fragment:zs,aomap_pars_fragment:Xs,batching_pars_vertex:Ks,batching_vertex:qs,begin_vertex:Ys,beginnormal_vertex:Zs,bsdfs:$s,iridescence_fragment:js,bumpmap_pars_fragment:Qs,clipping_planes_fragment:Js,clipping_planes_pars_fragment:ec,clipping_planes_pars_vertex:tc,clipping_planes_vertex:nc,color_fragment:ic,color_pars_fragment:rc,color_pars_vertex:ac,color_vertex:oc,common:sc,cube_uv_reflection_fragment:cc,defaultnormal_vertex:lc,displacementmap_pars_vertex:fc,displacementmap_vertex:uc,emissivemap_fragment:dc,emissivemap_pars_fragment:pc,colorspace_fragment:hc,colorspace_pars_fragment:mc,envmap_fragment:_c,envmap_common_pars_fragment:gc,envmap_pars_fragment:vc,envmap_pars_vertex:Sc,envmap_physical_pars_fragment:wc,envmap_vertex:Ec,fog_vertex:xc,fog_pars_vertex:Mc,fog_fragment:Tc,fog_pars_fragment:Ac,gradientmap_pars_fragment:Rc,lightmap_pars_fragment:bc,lights_lambert_fragment:Cc,lights_lambert_pars_fragment:Pc,lights_pars_begin:Lc,lights_toon_fragment:Uc,lights_toon_pars_fragment:Dc,lights_phong_fragment:Ic,lights_phong_pars_fragment:Nc,lights_physical_fragment:yc,lights_physical_pars_fragment:Fc,lights_fragment_begin:Oc,lights_fragment_maps:Bc,lights_fragment_end:Gc,lightprobes_pars_fragment:Hc,logdepthbuf_fragment:Vc,logdepthbuf_pars_fragment:kc,logdepthbuf_pars_vertex:Wc,logdepthbuf_vertex:zc,map_fragment:Xc,map_pars_fragment:Kc,map_particle_fragment:qc,map_particle_pars_fragment:Yc,metalnessmap_fragment:Zc,metalnessmap_pars_fragment:$c,morphinstance_vertex:jc,morphcolor_vertex:Qc,morphnormal_vertex:Jc,morphtarget_pars_vertex:el,morphtarget_vertex:tl,normal_fragment_begin:nl,normal_fragment_maps:il,normal_pars_fragment:rl,normal_pars_vertex:al,normal_vertex:ol,normalmap_pars_fragment:sl,clearcoat_normal_fragment_begin:cl,clearcoat_normal_fragment_maps:ll,clearcoat_pars_fragment:fl,iridescence_pars_fragment:ul,opaque_fragment:dl,packing:pl,premultiplied_alpha_fragment:hl,project_vertex:ml,dithering_fragment:_l,dithering_pars_fragment:gl,roughnessmap_fragment:vl,roughnessmap_pars_fragment:Sl,shadowmap_pars_fragment:El,shadowmap_pars_vertex:xl,shadowmap_vertex:Ml,shadowmask_pars_fragment:Tl,skinbase_vertex:Al,skinning_pars_vertex:Rl,skinning_vertex:bl,skinnormal_vertex:Cl,specularmap_fragment:Pl,specularmap_pars_fragment:Ll,tonemapping_fragment:wl,tonemapping_pars_fragment:Ul,transmission_fragment:Dl,transmission_pars_fragment:Il,uv_pars_fragment:Nl,uv_pars_vertex:yl,uv_vertex:Fl,worldpos_vertex:Ol,background_vert:Bl,background_frag:Gl,backgroundCube_vert:Hl,backgroundCube_frag:Vl,cube_vert:kl,cube_frag:Wl,depth_vert:zl,depth_frag:Xl,distance_vert:Kl,distance_frag:ql,equirect_vert:Yl,equirect_frag:Zl,linedashed_vert:$l,linedashed_frag:jl,meshbasic_vert:Ql,meshbasic_frag:Jl,meshlambert_vert:ef,meshlambert_frag:tf,meshmatcap_vert:nf,meshmatcap_frag:rf,meshnormal_vert:af,meshnormal_frag:of,meshphong_vert:sf,meshphong_frag:cf,meshphysical_vert:lf,meshphysical_frag:ff,meshtoon_vert:uf,meshtoon_frag:df,points_vert:pf,points_frag:hf,shadow_vert:mf,shadow_frag:_f,sprite_vert:gf,sprite_frag:vf},oe={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new be},probesMax:{value:new be},probesResolution:{value:new be}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},Lt={basic:{uniforms:gt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:gt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Ve(0)},envMapIntensity:{value:1}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:gt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:gt([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:gt([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:gt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:gt([oe.points,oe.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:gt([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:gt([oe.common,oe.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:gt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:gt([oe.sprite,oe.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distance:{uniforms:gt([oe.common,oe.displacementmap,{referencePosition:{value:new be},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distance_vert,fragmentShader:Ue.distance_frag},shadow:{uniforms:gt([oe.lights,oe.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};Lt.physical={uniforms:gt([Lt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const Un={r:0,b:0,g:0},Sf=new Nt,Ua=new Be;Ua.set(-1,0,0,0,1,0,0,0,1);function Ef(e,n,t,i,r,a){const o=new Ve(0);let c=r===!0?0:1,l,d,_=null,m=0,u=null;function S(x){let M=x.isScene===!0?x.background:null;if(M&&M.isTexture){const E=x.backgroundBlurriness>0;M=n.get(M,E)}return M}function A(x){let M=!1;const E=S(x);E===null?p(o,c):E&&E.isColor&&(p(E,1),M=!0);const L=e.xr.getEnvironmentBlendMode();L==="additive"?t.buffers.color.setClear(0,0,0,1,a):L==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(e.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function D(x,M){const E=S(M);E&&(E.isCubeTexture||E.mapping===kn)?(d===void 0&&(d=new yt(new Ei(1,1,1),new kt({name:"BackgroundCubeMaterial",uniforms:di(Lt.backgroundCube.uniforms),vertexShader:Lt.backgroundCube.vertexShader,fragmentShader:Lt.backgroundCube.fragmentShader,side:xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(L,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(d)),d.material.uniforms.envMap.value=E,d.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Sf.makeRotationFromEuler(M.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(Ua),d.material.toneMapped=tt.getTransfer(E.colorSpace)!==Qe,(_!==E||m!==E.version||u!==e.toneMapping)&&(d.material.needsUpdate=!0,_=E,m=E.version,u=e.toneMapping),d.layers.enableAll(),x.unshift(d,d.geometry,d.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new yt(new fa(2,2),new kt({name:"BackgroundMaterial",uniforms:di(Lt.background.uniforms),vertexShader:Lt.background.vertexShader,fragmentShader:Lt.background.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=tt.getTransfer(E.colorSpace)!==Qe,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(_!==E||m!==E.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,_=E,m=E.version,u=e.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,M){x.getRGB(Un,pa(e)),t.buffers.color.setClear(Un.r,Un.g,Un.b,M,a)}function f(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,M=1){o.set(x),c=M,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,p(o,c)},render:A,addToRenderList:D,dispose:f}}function xf(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=u(null);let a=r,o=!1;function c(U,V,Y,q,B){let G=!1;const H=m(U,q,Y,V);a!==H&&(a=H,d(a.object)),G=S(U,q,Y,B),G&&A(U,q,Y,B),B!==null&&n.update(B,e.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,E(U,V,Y,q),B!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(B).buffer))}function l(){return e.createVertexArray()}function d(U){return e.bindVertexArray(U)}function _(U){return e.deleteVertexArray(U)}function m(U,V,Y,q){const B=q.wireframe===!0;let G=i[V.id];G===void 0&&(G={},i[V.id]=G);const H=U.isInstancedMesh===!0?U.id:0;let j=G[H];j===void 0&&(j={},G[H]=j);let ue=j[Y.id];ue===void 0&&(ue={},j[Y.id]=ue);let ve=ue[B];return ve===void 0&&(ve=u(l()),ue[B]=ve),ve}function u(U){const V=[],Y=[],q=[];for(let B=0;B<t;B++)V[B]=0,Y[B]=0,q[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:Y,attributeDivisors:q,object:U,attributes:{},index:null}}function S(U,V,Y,q){const B=a.attributes,G=V.attributes;let H=0;const j=Y.getAttributes();for(const ue in j)if(j[ue].location>=0){const Ae=B[ue];let xe=G[ue];if(xe===void 0&&(ue==="instanceMatrix"&&U.instanceMatrix&&(xe=U.instanceMatrix),ue==="instanceColor"&&U.instanceColor&&(xe=U.instanceColor)),Ae===void 0||Ae.attribute!==xe||xe&&Ae.data!==xe.data)return!0;H++}return a.attributesNum!==H||a.index!==q}function A(U,V,Y,q){const B={},G=V.attributes;let H=0;const j=Y.getAttributes();for(const ue in j)if(j[ue].location>=0){let Ae=G[ue];Ae===void 0&&(ue==="instanceMatrix"&&U.instanceMatrix&&(Ae=U.instanceMatrix),ue==="instanceColor"&&U.instanceColor&&(Ae=U.instanceColor));const xe={};xe.attribute=Ae,Ae&&Ae.data&&(xe.data=Ae.data),B[ue]=xe,H++}a.attributes=B,a.attributesNum=H,a.index=q}function D(){const U=a.newAttributes;for(let V=0,Y=U.length;V<Y;V++)U[V]=0}function p(U){f(U,0)}function f(U,V){const Y=a.newAttributes,q=a.enabledAttributes,B=a.attributeDivisors;Y[U]=1,q[U]===0&&(e.enableVertexAttribArray(U),q[U]=1),B[U]!==V&&(e.vertexAttribDivisor(U,V),B[U]=V)}function x(){const U=a.newAttributes,V=a.enabledAttributes;for(let Y=0,q=V.length;Y<q;Y++)V[Y]!==U[Y]&&(e.disableVertexAttribArray(Y),V[Y]=0)}function M(U,V,Y,q,B,G,H){H===!0?e.vertexAttribIPointer(U,V,Y,B,G):e.vertexAttribPointer(U,V,Y,q,B,G)}function E(U,V,Y,q){D();const B=q.attributes,G=Y.getAttributes(),H=V.defaultAttributeValues;for(const j in G){const ue=G[j];if(ue.location>=0){let ve=B[j];if(ve===void 0&&(j==="instanceMatrix"&&U.instanceMatrix&&(ve=U.instanceMatrix),j==="instanceColor"&&U.instanceColor&&(ve=U.instanceColor)),ve!==void 0){const Ae=ve.normalized,xe=ve.itemSize,We=n.get(ve);if(We===void 0)continue;const Ze=We.buffer,Ie=We.type,K=We.bytesPerElement,le=Ie===e.INT||Ie===e.UNSIGNED_INT||ve.gpuType===ua;if(ve.isInterleavedBufferAttribute){const te=ve.data,Me=te.stride,Ce=ve.offset;if(te.isInstancedInterleavedBuffer){for(let Te=0;Te<ue.locationSize;Te++)f(ue.location+Te,te.meshPerAttribute);U.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Te=0;Te<ue.locationSize;Te++)p(ue.location+Te);e.bindBuffer(e.ARRAY_BUFFER,Ze);for(let Te=0;Te<ue.locationSize;Te++)M(ue.location+Te,xe/ue.locationSize,Ie,Ae,Me*K,(Ce+xe/ue.locationSize*Te)*K,le)}else{if(ve.isInstancedBufferAttribute){for(let te=0;te<ue.locationSize;te++)f(ue.location+te,ve.meshPerAttribute);U.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let te=0;te<ue.locationSize;te++)p(ue.location+te);e.bindBuffer(e.ARRAY_BUFFER,Ze);for(let te=0;te<ue.locationSize;te++)M(ue.location+te,xe/ue.locationSize,Ie,Ae,xe*K,xe/ue.locationSize*te*K,le)}}else if(H!==void 0){const Ae=H[j];if(Ae!==void 0)switch(Ae.length){case 2:e.vertexAttrib2fv(ue.location,Ae);break;case 3:e.vertexAttrib3fv(ue.location,Ae);break;case 4:e.vertexAttrib4fv(ue.location,Ae);break;default:e.vertexAttrib1fv(ue.location,Ae)}}}}x()}function L(){R();for(const U in i){const V=i[U];for(const Y in V){const q=V[Y];for(const B in q){const G=q[B];for(const H in G)_(G[H].object),delete G[H];delete q[B]}}delete i[U]}}function T(U){if(i[U.id]===void 0)return;const V=i[U.id];for(const Y in V){const q=V[Y];for(const B in q){const G=q[B];for(const H in G)_(G[H].object),delete G[H];delete q[B]}}delete i[U.id]}function C(U){for(const V in i){const Y=i[V];for(const q in Y){const B=Y[q];if(B[U.id]===void 0)continue;const G=B[U.id];for(const H in G)_(G[H].object),delete G[H];delete B[U.id]}}}function g(U){for(const V in i){const Y=i[V],q=U.isInstancedMesh===!0?U.id:0,B=Y[q];if(B!==void 0){for(const G in B){const H=B[G];for(const j in H)_(H[j].object),delete H[j];delete B[G]}delete Y[q],Object.keys(Y).length===0&&delete i[V]}}}function R(){F(),o=!0,a!==r&&(a=r,d(a.object))}function F(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:c,reset:R,resetDefaultState:F,dispose:L,releaseStatesOfGeometry:T,releaseStatesOfObject:g,releaseStatesOfProgram:C,initAttributes:D,enableAttribute:p,disableUnusedAttributes:x}}function Mf(e,n,t){let i;function r(l){i=l}function a(l,d){e.drawArrays(i,l,d),t.update(d,i,1)}function o(l,d,_){_!==0&&(e.drawArraysInstanced(i,l,d,_),t.update(d,i,_))}function c(l,d,_){if(_===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,d,0,_);let u=0;for(let S=0;S<_;S++)u+=d[S];t.update(u,i,1)}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=c}function Tf(e,n,t,i){let r;function a(){if(r!==void 0)return r;if(n.has("EXT_texture_filter_anisotropic")===!0){const C=n.get("EXT_texture_filter_anisotropic");r=e.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==Gt&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(C){const g=C===jt&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(C!==wt&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Yt&&!g)}function l(C){if(C==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=t.precision!==void 0?t.precision:"highp";const _=l(d);_!==d&&(ke("WebGLRenderer:",d,"not supported, using",_,"instead."),d=_);const m=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const S=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),A=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),D=e.getParameter(e.MAX_TEXTURE_SIZE),p=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),x=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),M=e.getParameter(e.MAX_VARYING_VECTORS),E=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),L=e.getParameter(e.MAX_SAMPLES),T=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:c,precision:d,logarithmicDepthBuffer:m,reversedDepthBuffer:u,maxTextures:S,maxVertexTextures:A,maxTextureSize:D,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:E,maxSamples:L,samples:T}}function Af(e){const n=this;let t=null,i=0,r=!1,a=!1;const o=new Lo,c=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(m,u){const S=m.length!==0||u||i!==0||r;return r=u,i=m.length,S},this.beginShadows=function(){a=!0,_(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(m,u){t=_(m,u,0)},this.setState=function(m,u,S){const A=m.clippingPlanes,D=m.clipIntersection,p=m.clipShadows,f=e.get(m);if(!r||A===null||A.length===0||a&&!p)a?_(null):d();else{const x=a?0:i,M=x*4;let E=f.clippingState||null;l.value=E,E=_(A,u,M,S);for(let L=0;L!==M;++L)E[L]=t[L];f.clippingState=E,this.numIntersection=D?this.numPlanes:0,this.numPlanes+=x}};function d(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function _(m,u,S,A){const D=m!==null?m.length:0;let p=null;if(D!==0){if(p=l.value,A!==!0||p===null){const f=S+D*4,x=u.matrixWorldInverse;c.getNormalMatrix(x),(p===null||p.length<f)&&(p=new Float32Array(f));for(let M=0,E=S;M!==D;++M,E+=4)o.copy(m[M]).applyMatrix4(x,c),o.normal.toArray(p,E),p[E+3]=o.constant}l.value=p,l.needsUpdate=!0}return n.numPlanes=D,n.numIntersection=0,p}}const Zt=4,Mr=[.125,.215,.35,.446,.526,.582],en=20,Rf=256,vn=new Si,Tr=new Ve;let ti=null,ni=0,ii=0,ri=!1;const bf=new be;class Ar{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(n,t=0,i=.1,r=100,a={}){const{size:o=256,position:c=bf}=a;ti=this._renderer.getRenderTarget(),ni=this._renderer.getActiveCubeFace(),ii=this._renderer.getActiveMipmapLevel(),ri=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(n,i,r,l,c),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cr(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=br(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodMeshes.length;n++)this._lodMeshes[n].geometry.dispose()}_cleanup(n){this._renderer.setRenderTarget(ti,ni,ii),this._renderer.xr.enabled=ri,n.scissorTest=!1,an(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===Pn||n.mapping===hn?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),ti=this._renderer.getRenderTarget(),ni=this._renderer.getActiveCubeFace(),ii=this._renderer.getActiveMipmapLevel(),ri=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:mt,minFilter:mt,generateMipmaps:!1,type:jt,format:Gt,colorSpace:At,depthBuffer:!1},r=Rr(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rr(n,t,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Cf(a)),this._blurMaterial=Lf(a,n,t),this._ggxMaterial=Pf(a,n,t)}return r}_compileMaterial(n){const t=new yt(new mn,n);this._renderer.compile(t,vn)}_sceneToCubeUV(n,t,i,r,a){const l=new An(90,1,t,i),d=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],m=this._renderer,u=m.autoClear,S=m.toneMapping;m.getClearColor(Tr),m.toneMapping=Dt,m.autoClear=!1,m.state.buffers.depth.getReversed()&&(m.setRenderTarget(r),m.clearDepth(),m.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new yt(new Ei,new cn({name:"PMREM.Background",side:xt,depthWrite:!1,depthTest:!1})));const D=this._backgroundBox,p=D.material;let f=!1;const x=n.background;x?x.isColor&&(p.color.copy(x),n.background=null,f=!0):(p.color.copy(Tr),f=!0);for(let M=0;M<6;M++){const E=M%3;E===0?(l.up.set(0,d[M],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+_[M],a.y,a.z)):E===1?(l.up.set(0,0,d[M]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+_[M],a.z)):(l.up.set(0,d[M],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+_[M]));const L=this._cubeSize;an(r,E*L,M>2?L:0,L,L),m.setRenderTarget(r),f&&m.render(D,l),m.render(n,l)}m.toneMapping=S,m.autoClear=u,n.background=x}_textureToCubeUV(n,t){const i=this._renderer,r=n.mapping===Pn||n.mapping===hn;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cr()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=br());const a=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=a;const c=a.uniforms;c.envMap.value=n;const l=this._cubeSize;an(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,vn)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(n,a-1,a);t.autoClear=i}_applyGGXFilter(n,t,i){const r=this._renderer,a=this._pingPongRenderTarget,o=this._ggxMaterial,c=this._lodMeshes[i];c.material=o;const l=o.uniforms,d=i/(this._lodMeshes.length-1),_=t/(this._lodMeshes.length-1),m=Math.sqrt(d*d-_*_),u=0+d*1.25,S=m*u,{_lodMax:A}=this,D=this._sizeLods[i],p=3*D*(i>A-Zt?i-A+Zt:0),f=4*(this._cubeSize-D);l.envMap.value=n.texture,l.roughness.value=S,l.mipInt.value=A-t,an(a,p,f,3*D,2*D),r.setRenderTarget(a),r.render(c,vn),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=A-i,an(n,p,f,3*D,2*D),r.setRenderTarget(n),r.render(c,vn)}_blur(n,t,i,r,a){const o=this._pingPongRenderTarget;this._halfBlur(n,o,t,i,r,"latitudinal",a),this._halfBlur(o,n,i,i,r,"longitudinal",a)}_halfBlur(n,t,i,r,a,o,c){const l=this._renderer,d=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Je("blur direction must be either latitudinal or longitudinal!");const _=3,m=this._lodMeshes[r];m.material=d;const u=d.uniforms,S=this._sizeLods[i]-1,A=isFinite(a)?Math.PI/(2*S):2*Math.PI/(2*en-1),D=a/A,p=isFinite(a)?1+Math.floor(_*D):en;p>en&&ke(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${en}`);const f=[];let x=0;for(let C=0;C<en;++C){const g=C/D,R=Math.exp(-g*g/2);f.push(R),C===0?x+=R:C<p&&(x+=2*R)}for(let C=0;C<f.length;C++)f[C]=f[C]/x;u.envMap.value=n.texture,u.samples.value=p,u.weights.value=f,u.latitudinal.value=o==="latitudinal",c&&(u.poleAxis.value=c);const{_lodMax:M}=this;u.dTheta.value=A,u.mipInt.value=M-i;const E=this._sizeLods[r],L=3*E*(r>M-Zt?r-M+Zt:0),T=4*(this._cubeSize-E);an(t,L,T,3*E,2*E),l.setRenderTarget(t),l.render(m,vn)}}function Cf(e){const n=[],t=[],i=[];let r=e;const a=e-Zt+1+Mr.length;for(let o=0;o<a;o++){const c=Math.pow(2,r);n.push(c);let l=1/c;o>e-Zt?l=Mr[o-e+Zt-1]:o===0&&(l=0),t.push(l);const d=1/(c-2),_=-d,m=1+d,u=[_,_,m,_,m,m,_,_,m,m,_,m],S=6,A=6,D=3,p=2,f=1,x=new Float32Array(D*A*S),M=new Float32Array(p*A*S),E=new Float32Array(f*A*S);for(let T=0;T<S;T++){const C=T%3*2/3-1,g=T>2?0:-1,R=[C,g,0,C+2/3,g,0,C+2/3,g+1,0,C,g,0,C+2/3,g+1,0,C,g+1,0];x.set(R,D*A*T),M.set(u,p*A*T);const F=[T,T,T,T,T,T];E.set(F,f*A*T)}const L=new mn;L.setAttribute("position",new $t(x,D)),L.setAttribute("uv",new $t(M,p)),L.setAttribute("faceIndex",new $t(E,f)),i.push(new yt(L,null)),r>Zt&&r--}return{lodMeshes:i,sizeLods:n,sigmas:t}}function Rr(e,n,t){const i=new It(e,n,t);return i.texture.mapping=kn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function an(e,n,t,i,r){e.viewport.set(n,t,i,r),e.scissor.set(n,t,i,r)}function Pf(e,n,t){return new kt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Rf,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Wn(),fragmentShader:`

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
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function Lf(e,n,t){const i=new Float32Array(en),r=new be(0,1,0);return new kt({name:"SphericalGaussianBlur",defines:{n:en,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Wn(),fragmentShader:`

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
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function br(){return new kt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wn(),fragmentShader:`

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
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function Cr(){return new kt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function Wn(){return`

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
	`}class Da extends It{constructor(n=1,t={}){super(n,n,t),this.isWebGLCubeRenderTarget=!0;const i={width:n,height:n,depth:1},r=[i,i,i,i,i,i];this.texture=new ha(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(n,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ei(5,5,5),a=new kt({name:"CubemapFromEquirect",uniforms:di(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:xt,blending:Vt});a.uniforms.tEquirect.value=t;const o=new yt(r,a),c=t.minFilter;return t.minFilter===qt&&(t.minFilter=mt),new Jo(1,10,this).update(n,o),t.minFilter=c,o.geometry.dispose(),o.material.dispose(),this}clear(n,t=!0,i=!0,r=!0){const a=n.getRenderTarget();for(let o=0;o<6;o++)n.setRenderTarget(this,o),n.clear(t,i,r);n.setRenderTarget(a)}}function wf(e){let n=new WeakMap,t=new WeakMap,i=null;function r(u,S=!1){return u==null?null:S?o(u):a(u)}function a(u){if(u&&u.isTexture){const S=u.mapping;if(S===Qn||S===Jn)if(n.has(u)){const A=n.get(u).texture;return c(A,u.mapping)}else{const A=u.image;if(A&&A.height>0){const D=new Da(A.height);return D.fromEquirectangularTexture(e,u),n.set(u,D),u.addEventListener("dispose",d),c(D.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){const S=u.mapping,A=S===Qn||S===Jn,D=S===Pn||S===hn;if(A||D){let p=t.get(u);const f=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new Ar(e)),p=A?i.fromEquirectangular(u,p):i.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),p.texture;if(p!==void 0)return p.texture;{const x=u.image;return A&&x&&x.height>0||D&&x&&l(x)?(i===null&&(i=new Ar(e)),p=A?i.fromEquirectangular(u):i.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),u.addEventListener("dispose",_),p.texture):null}}}return u}function c(u,S){return S===Qn?u.mapping=Pn:S===Jn&&(u.mapping=hn),u}function l(u){let S=0;const A=6;for(let D=0;D<A;D++)u[D]!==void 0&&S++;return S===A}function d(u){const S=u.target;S.removeEventListener("dispose",d);const A=n.get(S);A!==void 0&&(n.delete(S),A.dispose())}function _(u){const S=u.target;S.removeEventListener("dispose",_);const A=t.get(S);A!==void 0&&(t.delete(S),A.dispose())}function m(){n=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:m}}function Uf(e){const n={};function t(i){if(n[i]!==void 0)return n[i];const r=e.getExtension(i);return n[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&ro("WebGLRenderer: "+i+" extension not supported."),r}}}function Df(e,n,t,i){const r={},a=new WeakMap;function o(m){const u=m.target;u.index!==null&&n.remove(u.index);for(const A in u.attributes)n.remove(u.attributes[A]);u.removeEventListener("dispose",o),delete r[u.id];const S=a.get(u);S&&(n.remove(S),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function c(m,u){return r[u.id]===!0||(u.addEventListener("dispose",o),r[u.id]=!0,t.memory.geometries++),u}function l(m){const u=m.attributes;for(const S in u)n.update(u[S],e.ARRAY_BUFFER)}function d(m){const u=[],S=m.index,A=m.attributes.position;let D=0;if(A===void 0)return;if(S!==null){const x=S.array;D=S.version;for(let M=0,E=x.length;M<E;M+=3){const L=x[M+0],T=x[M+1],C=x[M+2];u.push(L,T,T,C,C,L)}}else{const x=A.array;D=A.version;for(let M=0,E=x.length/3-1;M<E;M+=3){const L=M+0,T=M+1,C=M+2;u.push(L,T,T,C,C,L)}}const p=new(A.count>=65535?es:ts)(u,1);p.version=D;const f=a.get(m);f&&n.remove(f),a.set(m,p)}function _(m){const u=a.get(m);if(u){const S=m.index;S!==null&&u.version<S.version&&d(m)}else d(m);return a.get(m)}return{get:c,update:l,getWireframeAttribute:_}}function If(e,n,t){let i;function r(m){i=m}let a,o;function c(m){a=m.type,o=m.bytesPerElement}function l(m,u){e.drawElements(i,u,a,m*o),t.update(u,i,1)}function d(m,u,S){S!==0&&(e.drawElementsInstanced(i,u,a,m*o,S),t.update(u,i,S))}function _(m,u,S){if(S===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,a,m,0,S);let D=0;for(let p=0;p<S;p++)D+=u[p];t.update(D,i,1)}this.setMode=r,this.setIndex=c,this.render=l,this.renderInstances=d,this.renderMultiDraw=_}function Nf(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,c){switch(t.calls++,o){case e.TRIANGLES:t.triangles+=c*(a/3);break;case e.LINES:t.lines+=c*(a/2);break;case e.LINE_STRIP:t.lines+=c*(a-1);break;case e.LINE_LOOP:t.lines+=c*a;break;case e.POINTS:t.points+=c*a;break;default:Je("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:r,update:i}}function yf(e,n,t){const i=new WeakMap,r=new vt;function a(o,c,l){const d=o.morphTargetInfluences,_=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,m=_!==void 0?_.length:0;let u=i.get(c);if(u===void 0||u.count!==m){let R=function(){C.dispose(),i.delete(c),c.removeEventListener("dispose",R)};u!==void 0&&u.texture.dispose();const S=c.morphAttributes.position!==void 0,A=c.morphAttributes.normal!==void 0,D=c.morphAttributes.color!==void 0,p=c.morphAttributes.position||[],f=c.morphAttributes.normal||[],x=c.morphAttributes.color||[];let M=0;S===!0&&(M=1),A===!0&&(M=2),D===!0&&(M=3);let E=c.attributes.position.count*M,L=1;E>n.maxTextureSize&&(L=Math.ceil(E/n.maxTextureSize),E=n.maxTextureSize);const T=new Float32Array(E*L*4*m),C=new da(T,E,L,m);C.type=Yt,C.needsUpdate=!0;const g=M*4;for(let F=0;F<m;F++){const U=p[F],V=f[F],Y=x[F],q=E*L*4*F;for(let B=0;B<U.count;B++){const G=B*g;S===!0&&(r.fromBufferAttribute(U,B),T[q+G+0]=r.x,T[q+G+1]=r.y,T[q+G+2]=r.z,T[q+G+3]=0),A===!0&&(r.fromBufferAttribute(V,B),T[q+G+4]=r.x,T[q+G+5]=r.y,T[q+G+6]=r.z,T[q+G+7]=0),D===!0&&(r.fromBufferAttribute(Y,B),T[q+G+8]=r.x,T[q+G+9]=r.y,T[q+G+10]=r.z,T[q+G+11]=Y.itemSize===4?r.w:1)}}u={count:m,texture:C,size:new _t(E,L)},i.set(c,u),c.addEventListener("dispose",R)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",o.morphTexture,t);else{let S=0;for(let D=0;D<d.length;D++)S+=d[D];const A=c.morphTargetsRelative?1:1-S;l.getUniforms().setValue(e,"morphTargetBaseInfluence",A),l.getUniforms().setValue(e,"morphTargetInfluences",d)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:a}}function Ff(e,n,t,i,r){let a=new WeakMap;function o(d){const _=r.render.frame,m=d.geometry,u=n.get(d,m);if(a.get(u)!==_&&(n.update(u),a.set(u,_)),d.isInstancedMesh&&(d.hasEventListener("dispose",l)===!1&&d.addEventListener("dispose",l),a.get(d)!==_&&(t.update(d.instanceMatrix,e.ARRAY_BUFFER),d.instanceColor!==null&&t.update(d.instanceColor,e.ARRAY_BUFFER),a.set(d,_))),d.isSkinnedMesh){const S=d.skeleton;a.get(S)!==_&&(S.update(),a.set(S,_))}return u}function c(){a=new WeakMap}function l(d){const _=d.target;_.removeEventListener("dispose",l),i.releaseStatesOfObject(_),t.remove(_.instanceMatrix),_.instanceColor!==null&&t.remove(_.instanceColor)}return{update:o,dispose:c}}const Of={[xa]:"LINEAR_TONE_MAPPING",[Ea]:"REINHARD_TONE_MAPPING",[Sa]:"CINEON_TONE_MAPPING",[va]:"ACES_FILMIC_TONE_MAPPING",[ga]:"AGX_TONE_MAPPING",[_a]:"NEUTRAL_TONE_MAPPING",[ma]:"CUSTOM_TONE_MAPPING"};function Bf(e,n,t,i,r){const a=new It(n,t,{type:e,depthBuffer:i,stencilBuffer:r,depthTexture:i?new bn(n,t):void 0}),o=new It(n,t,{type:jt,depthBuffer:!1,stencilBuffer:!1}),c=new mn;c.setAttribute("position",new Ni([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ni([0,2,0,0,2,0],2));const l=new Ja({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new yt(c,l),_=new Si(-1,1,1,-1,0,1);let m=null,u=null,S=!1,A,D=null,p=[],f=!1;this.setSize=function(x,M){a.setSize(x,M),o.setSize(x,M);for(let E=0;E<p.length;E++){const L=p[E];L.setSize&&L.setSize(x,M)}},this.setEffects=function(x){p=x,f=p.length>0&&p[0].isRenderPass===!0;const M=a.width,E=a.height;for(let L=0;L<p.length;L++){const T=p[L];T.setSize&&T.setSize(M,E)}},this.begin=function(x,M){if(S||x.toneMapping===Dt&&p.length===0)return!1;if(D=M,M!==null){const E=M.width,L=M.height;(a.width!==E||a.height!==L)&&this.setSize(E,L)}return f===!1&&x.setRenderTarget(a),A=x.toneMapping,x.toneMapping=Dt,!0},this.hasRenderPass=function(){return f},this.end=function(x,M){x.toneMapping=A,S=!0;let E=a,L=o;for(let T=0;T<p.length;T++){const C=p[T];if(C.enabled!==!1&&(C.render(x,L,E,M),C.needsSwap!==!1)){const g=E;E=L,L=g}}if(m!==x.outputColorSpace||u!==x.toneMapping){m=x.outputColorSpace,u=x.toneMapping,l.defines={},tt.getTransfer(m)===Qe&&(l.defines.SRGB_TRANSFER="");const T=Of[u];T&&(l.defines[T]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=E.texture,x.setRenderTarget(D),x.render(d,_),D=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}const Ia=new Vn,hi=new bn(1,1),Na=new da,ya=new is,Fa=new ha,Pr=[],Lr=[],wr=new Float32Array(16),Ur=new Float32Array(9),Dr=new Float32Array(4);function _n(e,n,t){const i=e[0];if(i<=0||i>0)return e;const r=n*t;let a=Pr[r];if(a===void 0&&(a=new Float32Array(r),Pr[r]=a),n!==0){i.toArray(a,0);for(let o=1,c=0;o!==n;++o)c+=t,e[o].toArray(a,c)}return a}function dt(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function pt(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function zn(e,n){let t=Lr[n];t===void 0&&(t=new Int32Array(n),Lr[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Gf(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function Hf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(dt(t,n))return;e.uniform2fv(this.addr,n),pt(t,n)}}function Vf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(dt(t,n))return;e.uniform3fv(this.addr,n),pt(t,n)}}function kf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(dt(t,n))return;e.uniform4fv(this.addr,n),pt(t,n)}}function Wf(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(dt(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),pt(t,n)}else{if(dt(t,i))return;Dr.set(i),e.uniformMatrix2fv(this.addr,!1,Dr),pt(t,i)}}function zf(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(dt(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),pt(t,n)}else{if(dt(t,i))return;Ur.set(i),e.uniformMatrix3fv(this.addr,!1,Ur),pt(t,i)}}function Xf(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(dt(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),pt(t,n)}else{if(dt(t,i))return;wr.set(i),e.uniformMatrix4fv(this.addr,!1,wr),pt(t,i)}}function Kf(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function qf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(dt(t,n))return;e.uniform2iv(this.addr,n),pt(t,n)}}function Yf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(dt(t,n))return;e.uniform3iv(this.addr,n),pt(t,n)}}function Zf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(dt(t,n))return;e.uniform4iv(this.addr,n),pt(t,n)}}function $f(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function jf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(dt(t,n))return;e.uniform2uiv(this.addr,n),pt(t,n)}}function Qf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(dt(t,n))return;e.uniform3uiv(this.addr,n),pt(t,n)}}function Jf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(dt(t,n))return;e.uniform4uiv(this.addr,n),pt(t,n)}}function eu(e,n,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r);let a;this.type===e.SAMPLER_2D_SHADOW?(hi.compareFunction=t.isReversedDepthBuffer()?xi:Mi,a=hi):a=Ia,t.setTexture2D(n||a,r)}function tu(e,n,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(n||ya,r)}function nu(e,n,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(n||Fa,r)}function iu(e,n,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(n||Na,r)}function ru(e){switch(e){case 5126:return Gf;case 35664:return Hf;case 35665:return Vf;case 35666:return kf;case 35674:return Wf;case 35675:return zf;case 35676:return Xf;case 5124:case 35670:return Kf;case 35667:case 35671:return qf;case 35668:case 35672:return Yf;case 35669:case 35673:return Zf;case 5125:return $f;case 36294:return jf;case 36295:return Qf;case 36296:return Jf;case 35678:case 36198:case 36298:case 36306:case 35682:return eu;case 35679:case 36299:case 36307:return tu;case 35680:case 36300:case 36308:case 36293:return nu;case 36289:case 36303:case 36311:case 36292:return iu}}function au(e,n){e.uniform1fv(this.addr,n)}function ou(e,n){const t=_n(n,this.size,2);e.uniform2fv(this.addr,t)}function su(e,n){const t=_n(n,this.size,3);e.uniform3fv(this.addr,t)}function cu(e,n){const t=_n(n,this.size,4);e.uniform4fv(this.addr,t)}function lu(e,n){const t=_n(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function fu(e,n){const t=_n(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function uu(e,n){const t=_n(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function du(e,n){e.uniform1iv(this.addr,n)}function pu(e,n){e.uniform2iv(this.addr,n)}function hu(e,n){e.uniform3iv(this.addr,n)}function mu(e,n){e.uniform4iv(this.addr,n)}function _u(e,n){e.uniform1uiv(this.addr,n)}function gu(e,n){e.uniform2uiv(this.addr,n)}function vu(e,n){e.uniform3uiv(this.addr,n)}function Su(e,n){e.uniform4uiv(this.addr,n)}function Eu(e,n,t){const i=this.cache,r=n.length,a=zn(t,r);dt(i,a)||(e.uniform1iv(this.addr,a),pt(i,a));let o;this.type===e.SAMPLER_2D_SHADOW?o=hi:o=Ia;for(let c=0;c!==r;++c)t.setTexture2D(n[c]||o,a[c])}function xu(e,n,t){const i=this.cache,r=n.length,a=zn(t,r);dt(i,a)||(e.uniform1iv(this.addr,a),pt(i,a));for(let o=0;o!==r;++o)t.setTexture3D(n[o]||ya,a[o])}function Mu(e,n,t){const i=this.cache,r=n.length,a=zn(t,r);dt(i,a)||(e.uniform1iv(this.addr,a),pt(i,a));for(let o=0;o!==r;++o)t.setTextureCube(n[o]||Fa,a[o])}function Tu(e,n,t){const i=this.cache,r=n.length,a=zn(t,r);dt(i,a)||(e.uniform1iv(this.addr,a),pt(i,a));for(let o=0;o!==r;++o)t.setTexture2DArray(n[o]||Na,a[o])}function Au(e){switch(e){case 5126:return au;case 35664:return ou;case 35665:return su;case 35666:return cu;case 35674:return lu;case 35675:return fu;case 35676:return uu;case 5124:case 35670:return du;case 35667:case 35671:return pu;case 35668:case 35672:return hu;case 35669:case 35673:return mu;case 5125:return _u;case 36294:return gu;case 36295:return vu;case 36296:return Su;case 35678:case 36198:case 36298:case 36306:case 35682:return Eu;case 35679:case 36299:case 36307:return xu;case 35680:case 36300:case 36308:case 36293:return Mu;case 36289:case 36303:case 36311:case 36292:return Tu}}class Ru{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=ru(t.type)}}class bu{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Au(t.type)}}class Cu{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const c=r[a];c.setValue(n,t[c.id],i)}}}const ai=/(\w+)(\])?(\[|\.)?/g;function Ir(e,n){e.seq.push(n),e.map[n.id]=n}function Pu(e,n,t){const i=e.name,r=i.length;for(ai.lastIndex=0;;){const a=ai.exec(i),o=ai.lastIndex;let c=a[1];const l=a[2]==="]",d=a[3];if(l&&(c=c|0),d===void 0||d==="["&&o+2===r){Ir(t,d===void 0?new Ru(c,e,n):new bu(c,e,n));break}else{let m=t.map[c];m===void 0&&(m=new Cu(c),Ir(t,m)),t=m}}}class On{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const c=n.getActiveUniform(t,o),l=n.getUniformLocation(t,c.name);Pu(c,l,this)}const r=[],a=[];for(const o of this.seq)o.type===n.SAMPLER_2D_SHADOW||o.type===n.SAMPLER_CUBE_SHADOW||o.type===n.SAMPLER_2D_ARRAY_SHADOW?r.push(o):a.push(o);r.length>0&&(this.seq=r.concat(a))}setValue(n,t,i,r){const a=this.map[t];a!==void 0&&a.setValue(n,i,r)}setOptional(n,t,i){const r=t[i];r!==void 0&&this.setValue(n,i,r)}static upload(n,t,i,r){for(let a=0,o=t.length;a!==o;++a){const c=t[a],l=i[c.id];l.needsUpdate!==!1&&c.setValue(n,l.value,r)}}static seqWithValue(n,t){const i=[];for(let r=0,a=n.length;r!==a;++r){const o=n[r];o.id in t&&i.push(o)}return i}}function Nr(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const Lu=37297;let wu=0;function Uu(e,n){const t=e.split(`
`),i=[],r=Math.max(n-6,0),a=Math.min(n+6,t.length);for(let o=r;o<a;o++){const c=o+1;i.push(`${c===n?">":" "} ${c}: ${t[o]}`)}return i.join(`
`)}const yr=new Be;function Du(e){tt._getMatrix(yr,tt.workingColorSpace,e);const n=`mat3( ${yr.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(e)){case Ma:return[n,"LinearTransferOETF"];case Qe:return[n,"sRGBTransferOETF"];default:return ke("WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function Fr(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),a=(e.getShaderInfoLog(n)||"").trim();if(i&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+a+`

`+Uu(e.getShaderSource(n),c)}else return a}function Iu(e,n){const t=Du(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Nu={[xa]:"Linear",[Ea]:"Reinhard",[Sa]:"Cineon",[va]:"ACESFilmic",[ga]:"AgX",[_a]:"Neutral",[ma]:"Custom"};function yu(e,n){const t=Nu[n];return t===void 0?(ke("WebGLProgram: Unsupported toneMapping:",n),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Dn=new be;function Fu(){tt.getLuminanceCoefficients(Dn);const e=Dn.x.toFixed(4),n=Dn.y.toFixed(4),t=Dn.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ou(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Tn).join(`
`)}function Bu(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Gu(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=e.getActiveAttrib(n,r),o=a.name;let c=1;a.type===e.FLOAT_MAT2&&(c=2),a.type===e.FLOAT_MAT3&&(c=3),a.type===e.FLOAT_MAT4&&(c=4),t[o]={type:a.type,location:e.getAttribLocation(n,o),locationSize:c}}return t}function Tn(e){return e!==""}function Or(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function Br(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const Hu=/^[ \t]*#include +<([\w\d./]+)>/gm;function mi(e){return e.replace(Hu,ku)}const Vu=new Map;function ku(e,n){let t=Ue[n];if(t===void 0){const i=Vu.get(n);if(i!==void 0)t=Ue[i],ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return mi(t)}const Wu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gr(e){return e.replace(Wu,zu)}function zu(e,n,t,i){let r="";for(let a=parseInt(n);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Hr(e){let n=`precision ${e.precision} float;
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
#define LOW_PRECISION`),n}const Xu={[Nn]:"SHADOWMAP_TYPE_PCF",[Mn]:"SHADOWMAP_TYPE_VSM"};function Ku(e){return Xu[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const qu={[Pn]:"ENVMAP_TYPE_CUBE",[hn]:"ENVMAP_TYPE_CUBE",[kn]:"ENVMAP_TYPE_CUBE_UV"};function Yu(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":qu[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const Zu={[hn]:"ENVMAP_MODE_REFRACTION"};function $u(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":Zu[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ju={[ss]:"ENVMAP_BLENDING_MULTIPLY",[os]:"ENVMAP_BLENDING_MIX",[as]:"ENVMAP_BLENDING_ADD"};function Qu(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":ju[e.combine]||"ENVMAP_BLENDING_NONE"}function Ju(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function ed(e,n,t,i){const r=e.getContext(),a=t.defines;let o=t.vertexShader,c=t.fragmentShader;const l=Ku(t),d=Yu(t),_=$u(t),m=Qu(t),u=Ju(t),S=Ou(t),A=Bu(a),D=r.createProgram();let p,f,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,A].filter(Tn).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,A].filter(Tn).join(`
`),f.length>0&&(f+=`
`)):(p=[Hr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,A,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+_:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Tn).join(`
`),f=[Hr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,A,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+_:"",t.envMap?"#define "+m:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Dt?"#define TONE_MAPPING":"",t.toneMapping!==Dt?Ue.tonemapping_pars_fragment:"",t.toneMapping!==Dt?yu("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,Iu("linearToOutputTexel",t.outputColorSpace),Fu(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Tn).join(`
`)),o=mi(o),o=Or(o,t),o=Br(o,t),c=mi(c),c=Or(c,t),c=Br(c,t),o=Gr(o),c=Gr(c),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",t.glslVersion===vr?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===vr?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=x+p+o,E=x+f+c,L=Nr(r,r.VERTEX_SHADER,M),T=Nr(r,r.FRAGMENT_SHADER,E);r.attachShader(D,L),r.attachShader(D,T),t.index0AttributeName!==void 0?r.bindAttribLocation(D,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(D,0,"position"),r.linkProgram(D);function C(U){if(e.debug.checkShaderErrors){const V=r.getProgramInfoLog(D)||"",Y=r.getShaderInfoLog(L)||"",q=r.getShaderInfoLog(T)||"",B=V.trim(),G=Y.trim(),H=q.trim();let j=!0,ue=!0;if(r.getProgramParameter(D,r.LINK_STATUS)===!1)if(j=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,D,L,T);else{const ve=Fr(r,L,"vertex"),Ae=Fr(r,T,"fragment");Je("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(D,r.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+B+`
`+ve+`
`+Ae)}else B!==""?ke("WebGLProgram: Program Info Log:",B):(G===""||H==="")&&(ue=!1);ue&&(U.diagnostics={runnable:j,programLog:B,vertexShader:{log:G,prefix:p},fragmentShader:{log:H,prefix:f}})}r.deleteShader(L),r.deleteShader(T),g=new On(r,D),R=Gu(r,D)}let g;this.getUniforms=function(){return g===void 0&&C(this),g};let R;this.getAttributes=function(){return R===void 0&&C(this),R};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=r.getProgramParameter(D,Lu)),F},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(D),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=wu++,this.cacheKey=n,this.usedTimes=1,this.program=D,this.vertexShader=L,this.fragmentShader=T,this}let td=0;class nd{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(i),o=this._getShaderCacheForMaterial(n);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new id(n),t.set(n,i)),i}}class id{constructor(n){this.id=td++,this.code=n,this.usedTimes=0}}function rd(e){return e===pn||e===fi||e===ui}function ad(e,n,t,i,r,a){const o=new ns,c=new nd,l=new Set,d=[],_=new Map,m=i.logarithmicDepthBuffer;let u=i.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(g){return l.add(g),g===0?"uv":`uv${g}`}function D(g,R,F,U,V,Y){const q=U.fog,B=V.geometry,G=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?U.environment:null,H=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,j=n.get(g.envMap||G,H),ue=j&&j.mapping===kn?j.image.height:null,ve=S[g.type];g.precision!==null&&(u=i.getMaxPrecision(g.precision),u!==g.precision&&ke("WebGLProgram.getParameters:",g.precision,"not supported, using",u,"instead."));const Ae=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,xe=Ae!==void 0?Ae.length:0;let We=0;B.morphAttributes.position!==void 0&&(We=1),B.morphAttributes.normal!==void 0&&(We=2),B.morphAttributes.color!==void 0&&(We=3);let Ze,Ie,K,le;if(ve){const Pe=Lt[ve];Ze=Pe.vertexShader,Ie=Pe.fragmentShader}else Ze=g.vertexShader,Ie=g.fragmentShader,c.update(g),K=c.getVertexShaderID(g),le=c.getFragmentShaderID(g);const te=e.getRenderTarget(),Me=e.state.buffers.depth.getReversed(),Ce=V.isInstancedMesh===!0,Te=V.isBatchedMesh===!0,nt=!!g.map,Fe=!!g.matcap,ze=!!j,et=!!g.aoMap,ye=!!g.lightMap,ft=!!g.bumpMap,it=!!g.normalMap,St=!!g.displacementMap,P=!!g.emissiveMap,ut=!!g.metalnessMap,Oe=!!g.roughnessMap,$e=g.anisotropy>0,ae=g.clearcoat>0,rt=g.dispersion>0,v=g.iridescence>0,s=g.sheen>0,I=g.transmission>0,z=$e&&!!g.anisotropyMap,$=ae&&!!g.clearcoatMap,Q=ae&&!!g.clearcoatNormalMap,re=ae&&!!g.clearcoatRoughnessMap,k=v&&!!g.iridescenceMap,X=v&&!!g.iridescenceThicknessMap,fe=s&&!!g.sheenColorMap,he=s&&!!g.sheenRoughnessMap,ne=!!g.specularMap,J=!!g.specularColorMap,Re=!!g.specularIntensityMap,we=I&&!!g.transmissionMap,He=I&&!!g.thicknessMap,b=!!g.gradientMap,ee=!!g.alphaMap,W=g.alphaTest>0,de=!!g.alphaHash,ie=!!g.extensions;let Z=Dt;g.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Z=e.toneMapping);const ge={shaderID:ve,shaderType:g.type,shaderName:g.name,vertexShader:Ze,fragmentShader:Ie,defines:g.defines,customVertexShaderID:K,customFragmentShaderID:le,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:u,batching:Te,batchingColor:Te&&V._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&V.instanceColor!==null,instancingMorph:Ce&&V.morphTexture!==null,outputColorSpace:te===null?e.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:tt.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:nt,matcap:Fe,envMap:ze,envMapMode:ze&&j.mapping,envMapCubeUVHeight:ue,aoMap:et,lightMap:ye,bumpMap:ft,normalMap:it,displacementMap:St,emissiveMap:P,normalMapObjectSpace:it&&g.normalMapType===Qo,normalMapTangentSpace:it&&g.normalMapType===_r,packedNormalMap:it&&g.normalMapType===_r&&rd(g.normalMap.format),metalnessMap:ut,roughnessMap:Oe,anisotropy:$e,anisotropyMap:z,clearcoat:ae,clearcoatMap:$,clearcoatNormalMap:Q,clearcoatRoughnessMap:re,dispersion:rt,iridescence:v,iridescenceMap:k,iridescenceThicknessMap:X,sheen:s,sheenColorMap:fe,sheenRoughnessMap:he,specularMap:ne,specularColorMap:J,specularIntensityMap:Re,transmission:I,transmissionMap:we,thicknessMap:He,gradientMap:b,opaque:g.transparent===!1&&g.blending===yn&&g.alphaToCoverage===!1,alphaMap:ee,alphaTest:W,alphaHash:de,combine:g.combine,mapUv:nt&&A(g.map.channel),aoMapUv:et&&A(g.aoMap.channel),lightMapUv:ye&&A(g.lightMap.channel),bumpMapUv:ft&&A(g.bumpMap.channel),normalMapUv:it&&A(g.normalMap.channel),displacementMapUv:St&&A(g.displacementMap.channel),emissiveMapUv:P&&A(g.emissiveMap.channel),metalnessMapUv:ut&&A(g.metalnessMap.channel),roughnessMapUv:Oe&&A(g.roughnessMap.channel),anisotropyMapUv:z&&A(g.anisotropyMap.channel),clearcoatMapUv:$&&A(g.clearcoatMap.channel),clearcoatNormalMapUv:Q&&A(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&A(g.clearcoatRoughnessMap.channel),iridescenceMapUv:k&&A(g.iridescenceMap.channel),iridescenceThicknessMapUv:X&&A(g.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&A(g.sheenColorMap.channel),sheenRoughnessMapUv:he&&A(g.sheenRoughnessMap.channel),specularMapUv:ne&&A(g.specularMap.channel),specularColorMapUv:J&&A(g.specularColorMap.channel),specularIntensityMapUv:Re&&A(g.specularIntensityMap.channel),transmissionMapUv:we&&A(g.transmissionMap.channel),thicknessMapUv:He&&A(g.thicknessMap.channel),alphaMapUv:ee&&A(g.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(it||$e),vertexNormals:!!B.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!B.attributes.uv&&(nt||ee),fog:!!q,useFog:g.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||B.attributes.normal===void 0&&it===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:Me,skinning:V.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:We,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:Y.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:g.dithering,shadowMapEnabled:e.shadowMap.enabled&&F.length>0,shadowMapType:e.shadowMap.type,toneMapping:Z,decodeVideoTexture:nt&&g.map.isVideoTexture===!0&&tt.getTransfer(g.map.colorSpace)===Qe,decodeVideoTextureEmissive:P&&g.emissiveMap.isVideoTexture===!0&&tt.getTransfer(g.emissiveMap.colorSpace)===Qe,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Ut,flipSided:g.side===xt,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:ie&&g.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ie&&g.extensions.multiDraw===!0||Te)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return ge.vertexUv1s=l.has(1),ge.vertexUv2s=l.has(2),ge.vertexUv3s=l.has(3),l.clear(),ge}function p(g){const R=[];if(g.shaderID?R.push(g.shaderID):(R.push(g.customVertexShaderID),R.push(g.customFragmentShaderID)),g.defines!==void 0)for(const F in g.defines)R.push(F),R.push(g.defines[F]);return g.isRawShaderMaterial===!1&&(f(R,g),x(R,g),R.push(e.outputColorSpace)),R.push(g.customProgramCacheKey),R.join()}function f(g,R){g.push(R.precision),g.push(R.outputColorSpace),g.push(R.envMapMode),g.push(R.envMapCubeUVHeight),g.push(R.mapUv),g.push(R.alphaMapUv),g.push(R.lightMapUv),g.push(R.aoMapUv),g.push(R.bumpMapUv),g.push(R.normalMapUv),g.push(R.displacementMapUv),g.push(R.emissiveMapUv),g.push(R.metalnessMapUv),g.push(R.roughnessMapUv),g.push(R.anisotropyMapUv),g.push(R.clearcoatMapUv),g.push(R.clearcoatNormalMapUv),g.push(R.clearcoatRoughnessMapUv),g.push(R.iridescenceMapUv),g.push(R.iridescenceThicknessMapUv),g.push(R.sheenColorMapUv),g.push(R.sheenRoughnessMapUv),g.push(R.specularMapUv),g.push(R.specularColorMapUv),g.push(R.specularIntensityMapUv),g.push(R.transmissionMapUv),g.push(R.thicknessMapUv),g.push(R.combine),g.push(R.fogExp2),g.push(R.sizeAttenuation),g.push(R.morphTargetsCount),g.push(R.morphAttributeCount),g.push(R.numDirLights),g.push(R.numPointLights),g.push(R.numSpotLights),g.push(R.numSpotLightMaps),g.push(R.numHemiLights),g.push(R.numRectAreaLights),g.push(R.numDirLightShadows),g.push(R.numPointLightShadows),g.push(R.numSpotLightShadows),g.push(R.numSpotLightShadowsWithMaps),g.push(R.numLightProbes),g.push(R.shadowMapType),g.push(R.toneMapping),g.push(R.numClippingPlanes),g.push(R.numClipIntersection),g.push(R.depthPacking)}function x(g,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),g.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),g.push(o.mask)}function M(g){const R=S[g.type];let F;if(R){const U=Lt[R];F=jo.clone(U.uniforms)}else F=g.uniforms;return F}function E(g,R){let F=_.get(R);return F!==void 0?++F.usedTimes:(F=new ed(e,R,g,r),d.push(F),_.set(R,F)),F}function L(g){if(--g.usedTimes===0){const R=d.indexOf(g);d[R]=d[d.length-1],d.pop(),_.delete(g.cacheKey),g.destroy()}}function T(g){c.remove(g)}function C(){c.dispose()}return{getParameters:D,getProgramCacheKey:p,getUniforms:M,acquireProgram:E,releaseProgram:L,releaseShaderCache:T,programs:d,dispose:C}}function od(){let e=new WeakMap;function n(o){return e.has(o)}function t(o){let c=e.get(o);return c===void 0&&(c={},e.set(o,c)),c}function i(o){e.delete(o)}function r(o,c,l){e.get(o)[c]=l}function a(){e=new WeakMap}return{has:n,get:t,remove:i,update:r,dispose:a}}function sd(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.materialVariant!==n.materialVariant?e.materialVariant-n.materialVariant:e.z!==n.z?e.z-n.z:e.id-n.id}function Vr(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function kr(){const e=[];let n=0;const t=[],i=[],r=[];function a(){n=0,t.length=0,i.length=0,r.length=0}function o(u){let S=0;return u.isInstancedMesh&&(S+=2),u.isSkinnedMesh&&(S+=1),S}function c(u,S,A,D,p,f){let x=e[n];return x===void 0?(x={id:u.id,object:u,geometry:S,material:A,materialVariant:o(u),groupOrder:D,renderOrder:u.renderOrder,z:p,group:f},e[n]=x):(x.id=u.id,x.object=u,x.geometry=S,x.material=A,x.materialVariant=o(u),x.groupOrder=D,x.renderOrder=u.renderOrder,x.z=p,x.group=f),n++,x}function l(u,S,A,D,p,f){const x=c(u,S,A,D,p,f);A.transmission>0?i.push(x):A.transparent===!0?r.push(x):t.push(x)}function d(u,S,A,D,p,f){const x=c(u,S,A,D,p,f);A.transmission>0?i.unshift(x):A.transparent===!0?r.unshift(x):t.unshift(x)}function _(u,S){t.length>1&&t.sort(u||sd),i.length>1&&i.sort(S||Vr),r.length>1&&r.sort(S||Vr)}function m(){for(let u=n,S=e.length;u<S;u++){const A=e[u];if(A.id===null)break;A.id=null,A.object=null,A.geometry=null,A.material=null,A.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:l,unshift:d,finish:m,sort:_}}function cd(){let e=new WeakMap;function n(i,r){const a=e.get(i);let o;return a===void 0?(o=new kr,e.set(i,[o])):r>=a.length?(o=new kr,a.push(o)):o=a[r],o}function t(){e=new WeakMap}return{get:n,dispose:t}}function ld(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new be,color:new Ve};break;case"SpotLight":t={position:new be,direction:new be,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new be,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new be,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new be,halfWidth:new be,halfHeight:new be};break}return e[n.id]=t,t}}}function fd(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let ud=0;function dd(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function pd(e){const n=new ld,t=fd(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)i.probe.push(new be);const r=new be,a=new Nt,o=new Nt;function c(d){let _=0,m=0,u=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let S=0,A=0,D=0,p=0,f=0,x=0,M=0,E=0,L=0,T=0,C=0;d.sort(dd);for(let R=0,F=d.length;R<F;R++){const U=d[R],V=U.color,Y=U.intensity,q=U.distance;let B=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===pn?B=U.shadow.map.texture:B=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)_+=V.r*Y,m+=V.g*Y,u+=V.b*Y;else if(U.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(U.sh.coefficients[G],Y);C++}else if(U.isDirectionalLight){const G=n.get(U);if(G.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const H=U.shadow,j=t.get(U);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,i.directionalShadow[S]=j,i.directionalShadowMap[S]=B,i.directionalShadowMatrix[S]=U.shadow.matrix,x++}i.directional[S]=G,S++}else if(U.isSpotLight){const G=n.get(U);G.position.setFromMatrixPosition(U.matrixWorld),G.color.copy(V).multiplyScalar(Y),G.distance=q,G.coneCos=Math.cos(U.angle),G.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),G.decay=U.decay,i.spot[D]=G;const H=U.shadow;if(U.map&&(i.spotLightMap[L]=U.map,L++,H.updateMatrices(U),U.castShadow&&T++),i.spotLightMatrix[D]=H.matrix,U.castShadow){const j=t.get(U);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,i.spotShadow[D]=j,i.spotShadowMap[D]=B,E++}D++}else if(U.isRectAreaLight){const G=n.get(U);G.color.copy(V).multiplyScalar(Y),G.halfWidth.set(U.width*.5,0,0),G.halfHeight.set(0,U.height*.5,0),i.rectArea[p]=G,p++}else if(U.isPointLight){const G=n.get(U);if(G.color.copy(U.color).multiplyScalar(U.intensity),G.distance=U.distance,G.decay=U.decay,U.castShadow){const H=U.shadow,j=t.get(U);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,j.shadowCameraNear=H.camera.near,j.shadowCameraFar=H.camera.far,i.pointShadow[A]=j,i.pointShadowMap[A]=B,i.pointShadowMatrix[A]=U.shadow.matrix,M++}i.point[A]=G,A++}else if(U.isHemisphereLight){const G=n.get(U);G.skyColor.copy(U.color).multiplyScalar(Y),G.groundColor.copy(U.groundColor).multiplyScalar(Y),i.hemi[f]=G,f++}}p>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=oe.LTC_FLOAT_1,i.rectAreaLTC2=oe.LTC_FLOAT_2):(i.rectAreaLTC1=oe.LTC_HALF_1,i.rectAreaLTC2=oe.LTC_HALF_2)),i.ambient[0]=_,i.ambient[1]=m,i.ambient[2]=u;const g=i.hash;(g.directionalLength!==S||g.pointLength!==A||g.spotLength!==D||g.rectAreaLength!==p||g.hemiLength!==f||g.numDirectionalShadows!==x||g.numPointShadows!==M||g.numSpotShadows!==E||g.numSpotMaps!==L||g.numLightProbes!==C)&&(i.directional.length=S,i.spot.length=D,i.rectArea.length=p,i.point.length=A,i.hemi.length=f,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=E+L-T,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=C,g.directionalLength=S,g.pointLength=A,g.spotLength=D,g.rectAreaLength=p,g.hemiLength=f,g.numDirectionalShadows=x,g.numPointShadows=M,g.numSpotShadows=E,g.numSpotMaps=L,g.numLightProbes=C,i.version=ud++)}function l(d,_){let m=0,u=0,S=0,A=0,D=0;const p=_.matrixWorldInverse;for(let f=0,x=d.length;f<x;f++){const M=d[f];if(M.isDirectionalLight){const E=i.directional[m];E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),m++}else if(M.isSpotLight){const E=i.spot[S];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),S++}else if(M.isRectAreaLight){const E=i.rectArea[A];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),o.identity(),a.copy(M.matrixWorld),a.premultiply(p),o.extractRotation(a),E.halfWidth.set(M.width*.5,0,0),E.halfHeight.set(0,M.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),A++}else if(M.isPointLight){const E=i.point[u];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),u++}else if(M.isHemisphereLight){const E=i.hemi[D];E.direction.setFromMatrixPosition(M.matrixWorld),E.direction.transformDirection(p),D++}}}return{setup:c,setupView:l,state:i}}function Wr(e){const n=new pd(e),t=[],i=[],r=[];function a(u){m.camera=u,t.length=0,i.length=0,r.length=0}function o(u){t.push(u)}function c(u){i.push(u)}function l(u){r.push(u)}function d(){n.setup(t)}function _(u){n.setupView(t,u)}const m={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:n,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:m,setupLights:d,setupLightsView:_,pushLight:o,pushShadow:c,pushLightProbeGrid:l}}function hd(e){let n=new WeakMap;function t(r,a=0){const o=n.get(r);let c;return o===void 0?(c=new Wr(e),n.set(r,[c])):a>=o.length?(c=new Wr(e),o.push(c)):c=o[a],c}function i(){n=new WeakMap}return{get:t,dispose:i}}const md=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_d=`uniform sampler2D shadow_pass;
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
}`,gd=[new be(1,0,0),new be(-1,0,0),new be(0,1,0),new be(0,-1,0),new be(0,0,1),new be(0,0,-1)],vd=[new be(0,-1,0),new be(0,-1,0),new be(0,0,1),new be(0,0,-1),new be(0,-1,0),new be(0,-1,0)],zr=new Nt,Sn=new be,oi=new be;function Sd(e,n,t){let i=new ta;const r=new _t,a=new _t,o=new vt,c=new wo,l=new Uo,d={},_=t.maxTextureSize,m={[un]:xt,[xt]:un,[Ut]:Ut},u=new kt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:md,fragmentShader:_d}),S=u.clone();S.defines.HORIZONTAL_PASS=1;const A=new mn;A.setAttribute("position",new $t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const D=new yt(A,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nn;let f=this.type;this.render=function(T,C,g){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===Do&&(ke("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Nn);const R=e.getRenderTarget(),F=e.getActiveCubeFace(),U=e.getActiveMipmapLevel(),V=e.state;V.setBlending(Vt),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const Y=f!==this.type;Y&&C.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(B=>B.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,B=T.length;q<B;q++){const G=T[q],H=G.shadow;if(H===void 0){ke("WebGLShadowMap:",G,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const j=H.getFrameExtents();r.multiply(j),a.copy(H.mapSize),(r.x>_||r.y>_)&&(r.x>_&&(a.x=Math.floor(_/j.x),r.x=a.x*j.x,H.mapSize.x=a.x),r.y>_&&(a.y=Math.floor(_/j.y),r.y=a.y*j.y,H.mapSize.y=a.y));const ue=e.state.buffers.depth.getReversed();if(H.camera._reversedDepth=ue,H.map===null||Y===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Mn){if(G.isPointLight){ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new It(r.x,r.y,{format:pn,type:jt,minFilter:mt,magFilter:mt,generateMipmaps:!1}),H.map.texture.name=G.name+".shadowMap",H.map.depthTexture=new bn(r.x,r.y,Yt),H.map.depthTexture.name=G.name+".shadowMapDepth",H.map.depthTexture.format=dn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Ht,H.map.depthTexture.magFilter=Ht}else G.isPointLight?(H.map=new Da(r.x),H.map.depthTexture=new Io(r.x,tn)):(H.map=new It(r.x,r.y),H.map.depthTexture=new bn(r.x,r.y,tn)),H.map.depthTexture.name=G.name+".shadowMap",H.map.depthTexture.format=dn,this.type===Nn?(H.map.depthTexture.compareFunction=ue?xi:Mi,H.map.depthTexture.minFilter=mt,H.map.depthTexture.magFilter=mt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Ht,H.map.depthTexture.magFilter=Ht);H.camera.updateProjectionMatrix()}const ve=H.map.isWebGLCubeRenderTarget?6:1;for(let Ae=0;Ae<ve;Ae++){if(H.map.isWebGLCubeRenderTarget)e.setRenderTarget(H.map,Ae),e.clear();else{Ae===0&&(e.setRenderTarget(H.map),e.clear());const xe=H.getViewport(Ae);o.set(a.x*xe.x,a.y*xe.y,a.x*xe.z,a.y*xe.w),V.viewport(o)}if(G.isPointLight){const xe=H.camera,We=H.matrix,Ze=G.distance||xe.far;Ze!==xe.far&&(xe.far=Ze,xe.updateProjectionMatrix()),Sn.setFromMatrixPosition(G.matrixWorld),xe.position.copy(Sn),oi.copy(xe.position),oi.add(gd[Ae]),xe.up.copy(vd[Ae]),xe.lookAt(oi),xe.updateMatrixWorld(),We.makeTranslation(-Sn.x,-Sn.y,-Sn.z),zr.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),H._frustum.setFromProjectionMatrix(zr,xe.coordinateSystem,xe.reversedDepth)}else H.updateMatrices(G);i=H.getFrustum(),E(C,g,H.camera,G,this.type)}H.isPointLightShadow!==!0&&this.type===Mn&&x(H,g),H.needsUpdate=!1}f=this.type,p.needsUpdate=!1,e.setRenderTarget(R,F,U)};function x(T,C){const g=n.update(D);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,S.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,S.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new It(r.x,r.y,{format:pn,type:jt})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,e.setRenderTarget(T.mapPass),e.clear(),e.renderBufferDirect(C,null,g,u,D,null),S.uniforms.shadow_pass.value=T.mapPass.texture,S.uniforms.resolution.value=T.mapSize,S.uniforms.radius.value=T.radius,e.setRenderTarget(T.map),e.clear(),e.renderBufferDirect(C,null,g,S,D,null)}function M(T,C,g,R){let F=null;const U=g.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(U!==void 0)F=U;else if(F=g.isPointLight===!0?l:c,e.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const V=F.uuid,Y=C.uuid;let q=d[V];q===void 0&&(q={},d[V]=q);let B=q[Y];B===void 0&&(B=F.clone(),q[Y]=B,C.addEventListener("dispose",L)),F=B}if(F.visible=C.visible,F.wireframe=C.wireframe,R===Mn?F.side=C.shadowSide!==null?C.shadowSide:C.side:F.side=C.shadowSide!==null?C.shadowSide:m[C.side],F.alphaMap=C.alphaMap,F.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,F.map=C.map,F.clipShadows=C.clipShadows,F.clippingPlanes=C.clippingPlanes,F.clipIntersection=C.clipIntersection,F.displacementMap=C.displacementMap,F.displacementScale=C.displacementScale,F.displacementBias=C.displacementBias,F.wireframeLinewidth=C.wireframeLinewidth,F.linewidth=C.linewidth,g.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const V=e.properties.get(F);V.light=g}return F}function E(T,C,g,R,F){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&F===Mn)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse,T.matrixWorld);const Y=n.update(T),q=T.material;if(Array.isArray(q)){const B=Y.groups;for(let G=0,H=B.length;G<H;G++){const j=B[G],ue=q[j.materialIndex];if(ue&&ue.visible){const ve=M(T,ue,R,F);T.onBeforeShadow(e,T,C,g,Y,ve,j),e.renderBufferDirect(g,null,Y,ve,T,j),T.onAfterShadow(e,T,C,g,Y,ve,j)}}}else if(q.visible){const B=M(T,q,R,F);T.onBeforeShadow(e,T,C,g,Y,B,null),e.renderBufferDirect(g,null,Y,B,T,null),T.onAfterShadow(e,T,C,g,Y,B,null)}}const V=T.children;for(let Y=0,q=V.length;Y<q;Y++)E(V[Y],C,g,R,F)}function L(T){T.target.removeEventListener("dispose",L);for(const g in d){const R=d[g],F=T.target.uuid;F in R&&(R[F].dispose(),delete R[F])}}}function Ed(e,n){function t(){let b=!1;const ee=new vt;let W=null;const de=new vt(0,0,0,0);return{setMask:function(ie){W!==ie&&!b&&(e.colorMask(ie,ie,ie,ie),W=ie)},setLocked:function(ie){b=ie},setClear:function(ie,Z,ge,Pe,ot){ot===!0&&(ie*=Pe,Z*=Pe,ge*=Pe),ee.set(ie,Z,ge,Pe),de.equals(ee)===!1&&(e.clearColor(ie,Z,ge,Pe),de.copy(ee))},reset:function(){b=!1,W=null,de.set(-1,0,0,0)}}}function i(){let b=!1,ee=!1,W=null,de=null,ie=null;return{setReversed:function(Z){if(ee!==Z){const ge=n.get("EXT_clip_control");Z?ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.ZERO_TO_ONE_EXT):ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.NEGATIVE_ONE_TO_ONE_EXT),ee=Z;const Pe=ie;ie=null,this.setClear(Pe)}},getReversed:function(){return ee},setTest:function(Z){Z?te(e.DEPTH_TEST):Me(e.DEPTH_TEST)},setMask:function(Z){W!==Z&&!b&&(e.depthMask(Z),W=Z)},setFunc:function(Z){if(ee&&(Z=cs[Z]),de!==Z){switch(Z){case qo:e.depthFunc(e.NEVER);break;case Ko:e.depthFunc(e.ALWAYS);break;case Xo:e.depthFunc(e.LESS);break;case yi:e.depthFunc(e.LEQUAL);break;case zo:e.depthFunc(e.EQUAL);break;case Wo:e.depthFunc(e.GEQUAL);break;case ko:e.depthFunc(e.GREATER);break;case Vo:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}de=Z}},setLocked:function(Z){b=Z},setClear:function(Z){ie!==Z&&(ie=Z,ee&&(Z=1-Z),e.clearDepth(Z))},reset:function(){b=!1,W=null,de=null,ie=null,ee=!1}}}function r(){let b=!1,ee=null,W=null,de=null,ie=null,Z=null,ge=null,Pe=null,ot=null;return{setTest:function(Xe){b||(Xe?te(e.STENCIL_TEST):Me(e.STENCIL_TEST))},setMask:function(Xe){ee!==Xe&&!b&&(e.stencilMask(Xe),ee=Xe)},setFunc:function(Xe,Ot,Rt){(W!==Xe||de!==Ot||ie!==Rt)&&(e.stencilFunc(Xe,Ot,Rt),W=Xe,de=Ot,ie=Rt)},setOp:function(Xe,Ot,Rt){(Z!==Xe||ge!==Ot||Pe!==Rt)&&(e.stencilOp(Xe,Ot,Rt),Z=Xe,ge=Ot,Pe=Rt)},setLocked:function(Xe){b=Xe},setClear:function(Xe){ot!==Xe&&(e.clearStencil(Xe),ot=Xe)},reset:function(){b=!1,ee=null,W=null,de=null,ie=null,Z=null,ge=null,Pe=null,ot=null}}}const a=new t,o=new i,c=new r,l=new WeakMap,d=new WeakMap;let _={},m={},u={},S=new WeakMap,A=[],D=null,p=!1,f=null,x=null,M=null,E=null,L=null,T=null,C=null,g=new Ve(0,0,0),R=0,F=!1,U=null,V=null,Y=null,q=null,B=null;const G=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,j=0;const ue=e.getParameter(e.VERSION);ue.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(ue)[1]),H=j>=1):ue.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(ue)[1]),H=j>=2);let ve=null,Ae={};const xe=e.getParameter(e.SCISSOR_BOX),We=e.getParameter(e.VIEWPORT),Ze=new vt().fromArray(xe),Ie=new vt().fromArray(We);function K(b,ee,W,de){const ie=new Uint8Array(4),Z=e.createTexture();e.bindTexture(b,Z),e.texParameteri(b,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(b,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let ge=0;ge<W;ge++)b===e.TEXTURE_3D||b===e.TEXTURE_2D_ARRAY?e.texImage3D(ee,0,e.RGBA,1,1,de,0,e.RGBA,e.UNSIGNED_BYTE,ie):e.texImage2D(ee+ge,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,ie);return Z}const le={};le[e.TEXTURE_2D]=K(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=K(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=K(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=K(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),c.setClear(0),te(e.DEPTH_TEST),o.setFunc(yi),ft(!1),it(dr),te(e.CULL_FACE),et(Vt);function te(b){_[b]!==!0&&(e.enable(b),_[b]=!0)}function Me(b){_[b]!==!1&&(e.disable(b),_[b]=!1)}function Ce(b,ee){return u[b]!==ee?(e.bindFramebuffer(b,ee),u[b]=ee,b===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=ee),b===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=ee),!0):!1}function Te(b,ee){let W=A,de=!1;if(b){W=S.get(ee),W===void 0&&(W=[],S.set(ee,W));const ie=b.textures;if(W.length!==ie.length||W[0]!==e.COLOR_ATTACHMENT0){for(let Z=0,ge=ie.length;Z<ge;Z++)W[Z]=e.COLOR_ATTACHMENT0+Z;W.length=ie.length,de=!0}}else W[0]!==e.BACK&&(W[0]=e.BACK,de=!0);de&&e.drawBuffers(W)}function nt(b){return D!==b?(e.useProgram(b),D=b,!0):!1}const Fe={[gn]:e.FUNC_ADD,[oo]:e.FUNC_SUBTRACT,[ao]:e.FUNC_REVERSE_SUBTRACT};Fe[ls]=e.MIN,Fe[fs]=e.MAX;const ze={[Mo]:e.ZERO,[xo]:e.ONE,[Eo]:e.SRC_COLOR,[So]:e.SRC_ALPHA,[vo]:e.SRC_ALPHA_SATURATE,[go]:e.DST_COLOR,[_o]:e.DST_ALPHA,[mo]:e.ONE_MINUS_SRC_COLOR,[ho]:e.ONE_MINUS_SRC_ALPHA,[po]:e.ONE_MINUS_DST_COLOR,[uo]:e.ONE_MINUS_DST_ALPHA,[fo]:e.CONSTANT_COLOR,[lo]:e.ONE_MINUS_CONSTANT_COLOR,[co]:e.CONSTANT_ALPHA,[so]:e.ONE_MINUS_CONSTANT_ALPHA};function et(b,ee,W,de,ie,Z,ge,Pe,ot,Xe){if(b===Vt){p===!0&&(Me(e.BLEND),p=!1);return}if(p===!1&&(te(e.BLEND),p=!0),b!==$o){if(b!==f||Xe!==F){if((x!==gn||L!==gn)&&(e.blendEquation(e.FUNC_ADD),x=gn,L=gn),Xe)switch(b){case yn:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case mr:e.blendFunc(e.ONE,e.ONE);break;case hr:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case pr:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Je("WebGLState: Invalid blending: ",b);break}else switch(b){case yn:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case mr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case hr:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case pr:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",b);break}M=null,E=null,T=null,C=null,g.set(0,0,0),R=0,f=b,F=Xe}return}ie=ie||ee,Z=Z||W,ge=ge||de,(ee!==x||ie!==L)&&(e.blendEquationSeparate(Fe[ee],Fe[ie]),x=ee,L=ie),(W!==M||de!==E||Z!==T||ge!==C)&&(e.blendFuncSeparate(ze[W],ze[de],ze[Z],ze[ge]),M=W,E=de,T=Z,C=ge),(Pe.equals(g)===!1||ot!==R)&&(e.blendColor(Pe.r,Pe.g,Pe.b,ot),g.copy(Pe),R=ot),f=b,F=!1}function ye(b,ee){b.side===Ut?Me(e.CULL_FACE):te(e.CULL_FACE);let W=b.side===xt;ee&&(W=!W),ft(W),b.blending===yn&&b.transparent===!1?et(Vt):et(b.blending,b.blendEquation,b.blendSrc,b.blendDst,b.blendEquationAlpha,b.blendSrcAlpha,b.blendDstAlpha,b.blendColor,b.blendAlpha,b.premultipliedAlpha),o.setFunc(b.depthFunc),o.setTest(b.depthTest),o.setMask(b.depthWrite),a.setMask(b.colorWrite);const de=b.stencilWrite;c.setTest(de),de&&(c.setMask(b.stencilWriteMask),c.setFunc(b.stencilFunc,b.stencilRef,b.stencilFuncMask),c.setOp(b.stencilFail,b.stencilZFail,b.stencilZPass)),P(b.polygonOffset,b.polygonOffsetFactor,b.polygonOffsetUnits),b.alphaToCoverage===!0?te(e.SAMPLE_ALPHA_TO_COVERAGE):Me(e.SAMPLE_ALPHA_TO_COVERAGE)}function ft(b){U!==b&&(b?e.frontFace(e.CW):e.frontFace(e.CCW),U=b)}function it(b){b!==Yo?(te(e.CULL_FACE),b!==V&&(b===dr?e.cullFace(e.BACK):b===Zo?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Me(e.CULL_FACE),V=b}function St(b){b!==Y&&(H&&e.lineWidth(b),Y=b)}function P(b,ee,W){b?(te(e.POLYGON_OFFSET_FILL),(q!==ee||B!==W)&&(q=ee,B=W,o.getReversed()&&(ee=-ee),e.polygonOffset(ee,W))):Me(e.POLYGON_OFFSET_FILL)}function ut(b){b?te(e.SCISSOR_TEST):Me(e.SCISSOR_TEST)}function Oe(b){b===void 0&&(b=e.TEXTURE0+G-1),ve!==b&&(e.activeTexture(b),ve=b)}function $e(b,ee,W){W===void 0&&(ve===null?W=e.TEXTURE0+G-1:W=ve);let de=Ae[W];de===void 0&&(de={type:void 0,texture:void 0},Ae[W]=de),(de.type!==b||de.texture!==ee)&&(ve!==W&&(e.activeTexture(W),ve=W),e.bindTexture(b,ee||le[b]),de.type=b,de.texture=ee)}function ae(){const b=Ae[ve];b!==void 0&&b.type!==void 0&&(e.bindTexture(b.type,null),b.type=void 0,b.texture=void 0)}function rt(){try{e.compressedTexImage2D(...arguments)}catch(b){Je("WebGLState:",b)}}function v(){try{e.compressedTexImage3D(...arguments)}catch(b){Je("WebGLState:",b)}}function s(){try{e.texSubImage2D(...arguments)}catch(b){Je("WebGLState:",b)}}function I(){try{e.texSubImage3D(...arguments)}catch(b){Je("WebGLState:",b)}}function z(){try{e.compressedTexSubImage2D(...arguments)}catch(b){Je("WebGLState:",b)}}function $(){try{e.compressedTexSubImage3D(...arguments)}catch(b){Je("WebGLState:",b)}}function Q(){try{e.texStorage2D(...arguments)}catch(b){Je("WebGLState:",b)}}function re(){try{e.texStorage3D(...arguments)}catch(b){Je("WebGLState:",b)}}function k(){try{e.texImage2D(...arguments)}catch(b){Je("WebGLState:",b)}}function X(){try{e.texImage3D(...arguments)}catch(b){Je("WebGLState:",b)}}function fe(b){return m[b]!==void 0?m[b]:e.getParameter(b)}function he(b,ee){m[b]!==ee&&(e.pixelStorei(b,ee),m[b]=ee)}function ne(b){Ze.equals(b)===!1&&(e.scissor(b.x,b.y,b.z,b.w),Ze.copy(b))}function J(b){Ie.equals(b)===!1&&(e.viewport(b.x,b.y,b.z,b.w),Ie.copy(b))}function Re(b,ee){let W=d.get(ee);W===void 0&&(W=new WeakMap,d.set(ee,W));let de=W.get(b);de===void 0&&(de=e.getUniformBlockIndex(ee,b.name),W.set(b,de))}function we(b,ee){const de=d.get(ee).get(b);l.get(ee)!==de&&(e.uniformBlockBinding(ee,de,b.__bindingPointIndex),l.set(ee,de))}function He(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),_={},m={},ve=null,Ae={},u={},S=new WeakMap,A=[],D=null,p=!1,f=null,x=null,M=null,E=null,L=null,T=null,C=null,g=new Ve(0,0,0),R=0,F=!1,U=null,V=null,Y=null,q=null,B=null,Ze.set(0,0,e.canvas.width,e.canvas.height),Ie.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),c.reset()}return{buffers:{color:a,depth:o,stencil:c},enable:te,disable:Me,bindFramebuffer:Ce,drawBuffers:Te,useProgram:nt,setBlending:et,setMaterial:ye,setFlipSided:ft,setCullFace:it,setLineWidth:St,setPolygonOffset:P,setScissorTest:ut,activeTexture:Oe,bindTexture:$e,unbindTexture:ae,compressedTexImage2D:rt,compressedTexImage3D:v,texImage2D:k,texImage3D:X,pixelStorei:he,getParameter:fe,updateUBOMapping:Re,uniformBlockBinding:we,texStorage2D:Q,texStorage3D:re,texSubImage2D:s,texSubImage3D:I,compressedTexSubImage2D:z,compressedTexSubImage3D:$,scissor:ne,viewport:J,reset:He}}function xd(e,n,t,i,r,a,o){const c=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new _t,_=new WeakMap,m=new Set;let u;const S=new WeakMap;let A=!1;try{A=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function D(v,s){return A?new OffscreenCanvas(v,s):rs("canvas")}function p(v,s,I){let z=1;const $=rt(v);if(($.width>I||$.height>I)&&(z=I/Math.max($.width,$.height)),z<1)if(typeof HTMLImageElement<"u"&&v instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&v instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&v instanceof ImageBitmap||typeof VideoFrame<"u"&&v instanceof VideoFrame){const Q=Math.floor(z*$.width),re=Math.floor(z*$.height);u===void 0&&(u=D(Q,re));const k=s?D(Q,re):u;return k.width=Q,k.height=re,k.getContext("2d").drawImage(v,0,0,Q,re),ke("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+Q+"x"+re+")."),k}else return"data"in v&&ke("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),v;return v}function f(v){return v.generateMipmaps}function x(v){e.generateMipmap(v)}function M(v){return v.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:v.isWebGL3DRenderTarget?e.TEXTURE_3D:v.isWebGLArrayRenderTarget||v.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function E(v,s,I,z,$,Q=!1){if(v!==null){if(e[v]!==void 0)return e[v];ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+v+"'")}let re;z&&(re=n.get("EXT_texture_norm16"),re||ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let k=s;if(s===e.RED&&(I===e.FLOAT&&(k=e.R32F),I===e.HALF_FLOAT&&(k=e.R16F),I===e.UNSIGNED_BYTE&&(k=e.R8),I===e.UNSIGNED_SHORT&&re&&(k=re.R16_EXT),I===e.SHORT&&re&&(k=re.R16_SNORM_EXT)),s===e.RED_INTEGER&&(I===e.UNSIGNED_BYTE&&(k=e.R8UI),I===e.UNSIGNED_SHORT&&(k=e.R16UI),I===e.UNSIGNED_INT&&(k=e.R32UI),I===e.BYTE&&(k=e.R8I),I===e.SHORT&&(k=e.R16I),I===e.INT&&(k=e.R32I)),s===e.RG&&(I===e.FLOAT&&(k=e.RG32F),I===e.HALF_FLOAT&&(k=e.RG16F),I===e.UNSIGNED_BYTE&&(k=e.RG8),I===e.UNSIGNED_SHORT&&re&&(k=re.RG16_EXT),I===e.SHORT&&re&&(k=re.RG16_SNORM_EXT)),s===e.RG_INTEGER&&(I===e.UNSIGNED_BYTE&&(k=e.RG8UI),I===e.UNSIGNED_SHORT&&(k=e.RG16UI),I===e.UNSIGNED_INT&&(k=e.RG32UI),I===e.BYTE&&(k=e.RG8I),I===e.SHORT&&(k=e.RG16I),I===e.INT&&(k=e.RG32I)),s===e.RGB_INTEGER&&(I===e.UNSIGNED_BYTE&&(k=e.RGB8UI),I===e.UNSIGNED_SHORT&&(k=e.RGB16UI),I===e.UNSIGNED_INT&&(k=e.RGB32UI),I===e.BYTE&&(k=e.RGB8I),I===e.SHORT&&(k=e.RGB16I),I===e.INT&&(k=e.RGB32I)),s===e.RGBA_INTEGER&&(I===e.UNSIGNED_BYTE&&(k=e.RGBA8UI),I===e.UNSIGNED_SHORT&&(k=e.RGBA16UI),I===e.UNSIGNED_INT&&(k=e.RGBA32UI),I===e.BYTE&&(k=e.RGBA8I),I===e.SHORT&&(k=e.RGBA16I),I===e.INT&&(k=e.RGBA32I)),s===e.RGB&&(I===e.UNSIGNED_SHORT&&re&&(k=re.RGB16_EXT),I===e.SHORT&&re&&(k=re.RGB16_SNORM_EXT),I===e.UNSIGNED_INT_5_9_9_9_REV&&(k=e.RGB9_E5),I===e.UNSIGNED_INT_10F_11F_11F_REV&&(k=e.R11F_G11F_B10F)),s===e.RGBA){const X=Q?Ma:tt.getTransfer($);I===e.FLOAT&&(k=e.RGBA32F),I===e.HALF_FLOAT&&(k=e.RGBA16F),I===e.UNSIGNED_BYTE&&(k=X===Qe?e.SRGB8_ALPHA8:e.RGBA8),I===e.UNSIGNED_SHORT&&re&&(k=re.RGBA16_EXT),I===e.SHORT&&re&&(k=re.RGBA16_SNORM_EXT),I===e.UNSIGNED_SHORT_4_4_4_4&&(k=e.RGBA4),I===e.UNSIGNED_SHORT_5_5_5_1&&(k=e.RGB5_A1)}return(k===e.R16F||k===e.R32F||k===e.RG16F||k===e.RG32F||k===e.RGBA16F||k===e.RGBA32F)&&n.get("EXT_color_buffer_float"),k}function L(v,s){let I;return v?s===null||s===tn||s===Cn?I=e.DEPTH24_STENCIL8:s===Yt?I=e.DEPTH32F_STENCIL8:s===Hn&&(I=e.DEPTH24_STENCIL8,ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):s===null||s===tn||s===Cn?I=e.DEPTH_COMPONENT24:s===Yt?I=e.DEPTH_COMPONENT32F:s===Hn&&(I=e.DEPTH_COMPONENT16),I}function T(v,s){return f(v)===!0||v.isFramebufferTexture&&v.minFilter!==Ht&&v.minFilter!==mt?Math.log2(Math.max(s.width,s.height))+1:v.mipmaps!==void 0&&v.mipmaps.length>0?v.mipmaps.length:v.isCompressedTexture&&Array.isArray(v.image)?s.mipmaps.length:1}function C(v){const s=v.target;s.removeEventListener("dispose",C),R(s),s.isVideoTexture&&_.delete(s),s.isHTMLTexture&&m.delete(s)}function g(v){const s=v.target;s.removeEventListener("dispose",g),U(s)}function R(v){const s=i.get(v);if(s.__webglInit===void 0)return;const I=v.source,z=S.get(I);if(z){const $=z[s.__cacheKey];$.usedTimes--,$.usedTimes===0&&F(v),Object.keys(z).length===0&&S.delete(I)}i.remove(v)}function F(v){const s=i.get(v);e.deleteTexture(s.__webglTexture);const I=v.source,z=S.get(I);delete z[s.__cacheKey],o.memory.textures--}function U(v){const s=i.get(v);if(v.depthTexture&&(v.depthTexture.dispose(),i.remove(v.depthTexture)),v.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(s.__webglFramebuffer[z]))for(let $=0;$<s.__webglFramebuffer[z].length;$++)e.deleteFramebuffer(s.__webglFramebuffer[z][$]);else e.deleteFramebuffer(s.__webglFramebuffer[z]);s.__webglDepthbuffer&&e.deleteRenderbuffer(s.__webglDepthbuffer[z])}else{if(Array.isArray(s.__webglFramebuffer))for(let z=0;z<s.__webglFramebuffer.length;z++)e.deleteFramebuffer(s.__webglFramebuffer[z]);else e.deleteFramebuffer(s.__webglFramebuffer);if(s.__webglDepthbuffer&&e.deleteRenderbuffer(s.__webglDepthbuffer),s.__webglMultisampledFramebuffer&&e.deleteFramebuffer(s.__webglMultisampledFramebuffer),s.__webglColorRenderbuffer)for(let z=0;z<s.__webglColorRenderbuffer.length;z++)s.__webglColorRenderbuffer[z]&&e.deleteRenderbuffer(s.__webglColorRenderbuffer[z]);s.__webglDepthRenderbuffer&&e.deleteRenderbuffer(s.__webglDepthRenderbuffer)}const I=v.textures;for(let z=0,$=I.length;z<$;z++){const Q=i.get(I[z]);Q.__webglTexture&&(e.deleteTexture(Q.__webglTexture),o.memory.textures--),i.remove(I[z])}i.remove(v)}let V=0;function Y(){V=0}function q(){return V}function B(v){V=v}function G(){const v=V;return v>=r.maxTextures&&ke("WebGLTextures: Trying to use "+v+" texture units while this GPU supports only "+r.maxTextures),V+=1,v}function H(v){const s=[];return s.push(v.wrapS),s.push(v.wrapT),s.push(v.wrapR||0),s.push(v.magFilter),s.push(v.minFilter),s.push(v.anisotropy),s.push(v.internalFormat),s.push(v.format),s.push(v.type),s.push(v.generateMipmaps),s.push(v.premultiplyAlpha),s.push(v.flipY),s.push(v.unpackAlignment),s.push(v.colorSpace),s.join()}function j(v,s){const I=i.get(v);if(v.isVideoTexture&&$e(v),v.isRenderTargetTexture===!1&&v.isExternalTexture!==!0&&v.version>0&&I.__version!==v.version){const z=v.image;if(z===null)ke("WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)ke("WebGLRenderer: Texture marked for update but image is incomplete");else{Me(I,v,s);return}}else v.isExternalTexture&&(I.__webglTexture=v.sourceTexture?v.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,I.__webglTexture,e.TEXTURE0+s)}function ue(v,s){const I=i.get(v);if(v.isRenderTargetTexture===!1&&v.version>0&&I.__version!==v.version){Me(I,v,s);return}else v.isExternalTexture&&(I.__webglTexture=v.sourceTexture?v.sourceTexture:null);t.bindTexture(e.TEXTURE_2D_ARRAY,I.__webglTexture,e.TEXTURE0+s)}function ve(v,s){const I=i.get(v);if(v.isRenderTargetTexture===!1&&v.version>0&&I.__version!==v.version){Me(I,v,s);return}t.bindTexture(e.TEXTURE_3D,I.__webglTexture,e.TEXTURE0+s)}function Ae(v,s){const I=i.get(v);if(v.isCubeDepthTexture!==!0&&v.version>0&&I.__version!==v.version){Ce(I,v,s);return}t.bindTexture(e.TEXTURE_CUBE_MAP,I.__webglTexture,e.TEXTURE0+s)}const xe={[Gn]:e.REPEAT,[Bn]:e.CLAMP_TO_EDGE,[na]:e.MIRRORED_REPEAT},We={[Ht]:e.NEAREST,[ia]:e.NEAREST_MIPMAP_NEAREST,[xn]:e.NEAREST_MIPMAP_LINEAR,[mt]:e.LINEAR,[In]:e.LINEAR_MIPMAP_NEAREST,[qt]:e.LINEAR_MIPMAP_LINEAR},Ze={[Po]:e.NEVER,[Co]:e.ALWAYS,[bo]:e.LESS,[Mi]:e.LEQUAL,[Ro]:e.EQUAL,[xi]:e.GEQUAL,[Ao]:e.GREATER,[To]:e.NOTEQUAL};function Ie(v,s){if(s.type===Yt&&n.has("OES_texture_float_linear")===!1&&(s.magFilter===mt||s.magFilter===In||s.magFilter===xn||s.magFilter===qt||s.minFilter===mt||s.minFilter===In||s.minFilter===xn||s.minFilter===qt)&&ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(v,e.TEXTURE_WRAP_S,xe[s.wrapS]),e.texParameteri(v,e.TEXTURE_WRAP_T,xe[s.wrapT]),(v===e.TEXTURE_3D||v===e.TEXTURE_2D_ARRAY)&&e.texParameteri(v,e.TEXTURE_WRAP_R,xe[s.wrapR]),e.texParameteri(v,e.TEXTURE_MAG_FILTER,We[s.magFilter]),e.texParameteri(v,e.TEXTURE_MIN_FILTER,We[s.minFilter]),s.compareFunction&&(e.texParameteri(v,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(v,e.TEXTURE_COMPARE_FUNC,Ze[s.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(s.magFilter===Ht||s.minFilter!==xn&&s.minFilter!==qt||s.type===Yt&&n.has("OES_texture_float_linear")===!1)return;if(s.anisotropy>1||i.get(s).__currentAnisotropy){const I=n.get("EXT_texture_filter_anisotropic");e.texParameterf(v,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(s.anisotropy,r.getMaxAnisotropy())),i.get(s).__currentAnisotropy=s.anisotropy}}}function K(v,s){let I=!1;v.__webglInit===void 0&&(v.__webglInit=!0,s.addEventListener("dispose",C));const z=s.source;let $=S.get(z);$===void 0&&($={},S.set(z,$));const Q=H(s);if(Q!==v.__cacheKey){$[Q]===void 0&&($[Q]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,I=!0),$[Q].usedTimes++;const re=$[v.__cacheKey];re!==void 0&&($[v.__cacheKey].usedTimes--,re.usedTimes===0&&F(s)),v.__cacheKey=Q,v.__webglTexture=$[Q].texture}return I}function le(v,s,I){return Math.floor(Math.floor(v/I)/s)}function te(v,s,I,z){const Q=v.updateRanges;if(Q.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,s.width,s.height,I,z,s.data);else{Q.sort((he,ne)=>he.start-ne.start);let re=0;for(let he=1;he<Q.length;he++){const ne=Q[re],J=Q[he],Re=ne.start+ne.count,we=le(J.start,s.width,4),He=le(ne.start,s.width,4);J.start<=Re+1&&we===He&&le(J.start+J.count-1,s.width,4)===we?ne.count=Math.max(ne.count,J.start+J.count-ne.start):(++re,Q[re]=J)}Q.length=re+1;const k=t.getParameter(e.UNPACK_ROW_LENGTH),X=t.getParameter(e.UNPACK_SKIP_PIXELS),fe=t.getParameter(e.UNPACK_SKIP_ROWS);t.pixelStorei(e.UNPACK_ROW_LENGTH,s.width);for(let he=0,ne=Q.length;he<ne;he++){const J=Q[he],Re=Math.floor(J.start/4),we=Math.ceil(J.count/4),He=Re%s.width,b=Math.floor(Re/s.width),ee=we,W=1;t.pixelStorei(e.UNPACK_SKIP_PIXELS,He),t.pixelStorei(e.UNPACK_SKIP_ROWS,b),t.texSubImage2D(e.TEXTURE_2D,0,He,b,ee,W,I,z,s.data)}v.clearUpdateRanges(),t.pixelStorei(e.UNPACK_ROW_LENGTH,k),t.pixelStorei(e.UNPACK_SKIP_PIXELS,X),t.pixelStorei(e.UNPACK_SKIP_ROWS,fe)}}function Me(v,s,I){let z=e.TEXTURE_2D;(s.isDataArrayTexture||s.isCompressedArrayTexture)&&(z=e.TEXTURE_2D_ARRAY),s.isData3DTexture&&(z=e.TEXTURE_3D);const $=K(v,s),Q=s.source;t.bindTexture(z,v.__webglTexture,e.TEXTURE0+I);const re=i.get(Q);if(Q.version!==re.__version||$===!0){if(t.activeTexture(e.TEXTURE0+I),(typeof ImageBitmap<"u"&&s.image instanceof ImageBitmap)===!1){const W=tt.getPrimaries(tt.workingColorSpace),de=s.colorSpace===on?null:tt.getPrimaries(s.colorSpace),ie=s.colorSpace===on||W===de?e.NONE:e.BROWSER_DEFAULT_WEBGL;t.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),t.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),t.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie)}t.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment);let X=p(s.image,!1,r.maxTextureSize);X=ae(s,X);const fe=a.convert(s.format,s.colorSpace),he=a.convert(s.type);let ne=E(s.internalFormat,fe,he,s.normalized,s.colorSpace,s.isVideoTexture);Ie(z,s);let J;const Re=s.mipmaps,we=s.isVideoTexture!==!0,He=re.__version===void 0||$===!0,b=Q.dataReady,ee=T(s,X);if(s.isDepthTexture)ne=L(s.format===sn,s.type),He&&(we?t.texStorage2D(e.TEXTURE_2D,1,ne,X.width,X.height):t.texImage2D(e.TEXTURE_2D,0,ne,X.width,X.height,0,fe,he,null));else if(s.isDataTexture)if(Re.length>0){we&&He&&t.texStorage2D(e.TEXTURE_2D,ee,ne,Re[0].width,Re[0].height);for(let W=0,de=Re.length;W<de;W++)J=Re[W],we?b&&t.texSubImage2D(e.TEXTURE_2D,W,0,0,J.width,J.height,fe,he,J.data):t.texImage2D(e.TEXTURE_2D,W,ne,J.width,J.height,0,fe,he,J.data);s.generateMipmaps=!1}else we?(He&&t.texStorage2D(e.TEXTURE_2D,ee,ne,X.width,X.height),b&&te(s,X,fe,he)):t.texImage2D(e.TEXTURE_2D,0,ne,X.width,X.height,0,fe,he,X.data);else if(s.isCompressedTexture)if(s.isCompressedArrayTexture){we&&He&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ee,ne,Re[0].width,Re[0].height,X.depth);for(let W=0,de=Re.length;W<de;W++)if(J=Re[W],s.format!==Gt)if(fe!==null)if(we){if(b)if(s.layerUpdates.size>0){const ie=gr(J.width,J.height,s.format,s.type);for(const Z of s.layerUpdates){const ge=J.data.subarray(Z*ie/J.data.BYTES_PER_ELEMENT,(Z+1)*ie/J.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,W,0,0,Z,J.width,J.height,1,fe,ge)}s.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,W,0,0,0,J.width,J.height,X.depth,fe,J.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,W,ne,J.width,J.height,X.depth,0,J.data,0,0);else ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else we?b&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,W,0,0,0,J.width,J.height,X.depth,fe,he,J.data):t.texImage3D(e.TEXTURE_2D_ARRAY,W,ne,J.width,J.height,X.depth,0,fe,he,J.data)}else{we&&He&&t.texStorage2D(e.TEXTURE_2D,ee,ne,Re[0].width,Re[0].height);for(let W=0,de=Re.length;W<de;W++)J=Re[W],s.format!==Gt?fe!==null?we?b&&t.compressedTexSubImage2D(e.TEXTURE_2D,W,0,0,J.width,J.height,fe,J.data):t.compressedTexImage2D(e.TEXTURE_2D,W,ne,J.width,J.height,0,J.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):we?b&&t.texSubImage2D(e.TEXTURE_2D,W,0,0,J.width,J.height,fe,he,J.data):t.texImage2D(e.TEXTURE_2D,W,ne,J.width,J.height,0,fe,he,J.data)}else if(s.isDataArrayTexture)if(we){if(He&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ee,ne,X.width,X.height,X.depth),b)if(s.layerUpdates.size>0){const W=gr(X.width,X.height,s.format,s.type);for(const de of s.layerUpdates){const ie=X.data.subarray(de*W/X.data.BYTES_PER_ELEMENT,(de+1)*W/X.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,de,X.width,X.height,1,fe,he,ie)}s.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,X.width,X.height,X.depth,fe,he,X.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,ne,X.width,X.height,X.depth,0,fe,he,X.data);else if(s.isData3DTexture)we?(He&&t.texStorage3D(e.TEXTURE_3D,ee,ne,X.width,X.height,X.depth),b&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,X.width,X.height,X.depth,fe,he,X.data)):t.texImage3D(e.TEXTURE_3D,0,ne,X.width,X.height,X.depth,0,fe,he,X.data);else if(s.isFramebufferTexture){if(He)if(we)t.texStorage2D(e.TEXTURE_2D,ee,ne,X.width,X.height);else{let W=X.width,de=X.height;for(let ie=0;ie<ee;ie++)t.texImage2D(e.TEXTURE_2D,ie,ne,W,de,0,fe,he,null),W>>=1,de>>=1}}else if(s.isHTMLTexture){if("texElementImage2D"in e){const W=e.canvas;if(W.hasAttribute("layoutsubtree")||W.setAttribute("layoutsubtree","true"),X.parentNode!==W){W.appendChild(X),m.add(s),W.onpaint=Pe=>{const ot=Pe.changedElements;for(const Xe of m)ot.includes(Xe.image)&&(Xe.needsUpdate=!0)},W.requestPaint();return}const de=0,ie=e.RGBA,Z=e.RGBA,ge=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,de,ie,Z,ge,X),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Re.length>0){if(we&&He){const W=rt(Re[0]);t.texStorage2D(e.TEXTURE_2D,ee,ne,W.width,W.height)}for(let W=0,de=Re.length;W<de;W++)J=Re[W],we?b&&t.texSubImage2D(e.TEXTURE_2D,W,0,0,fe,he,J):t.texImage2D(e.TEXTURE_2D,W,ne,fe,he,J);s.generateMipmaps=!1}else if(we){if(He){const W=rt(X);t.texStorage2D(e.TEXTURE_2D,ee,ne,W.width,W.height)}b&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,fe,he,X)}else t.texImage2D(e.TEXTURE_2D,0,ne,fe,he,X);f(s)&&x(z),re.__version=Q.version,s.onUpdate&&s.onUpdate(s)}v.__version=s.version}function Ce(v,s,I){if(s.image.length!==6)return;const z=K(v,s),$=s.source;t.bindTexture(e.TEXTURE_CUBE_MAP,v.__webglTexture,e.TEXTURE0+I);const Q=i.get($);if($.version!==Q.__version||z===!0){t.activeTexture(e.TEXTURE0+I);const re=tt.getPrimaries(tt.workingColorSpace),k=s.colorSpace===on?null:tt.getPrimaries(s.colorSpace),X=s.colorSpace===on||re===k?e.NONE:e.BROWSER_DEFAULT_WEBGL;t.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),t.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),t.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),t.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,X);const fe=s.isCompressedTexture||s.image[0].isCompressedTexture,he=s.image[0]&&s.image[0].isDataTexture,ne=[];for(let Z=0;Z<6;Z++)!fe&&!he?ne[Z]=p(s.image[Z],!0,r.maxCubemapSize):ne[Z]=he?s.image[Z].image:s.image[Z],ne[Z]=ae(s,ne[Z]);const J=ne[0],Re=a.convert(s.format,s.colorSpace),we=a.convert(s.type),He=E(s.internalFormat,Re,we,s.normalized,s.colorSpace),b=s.isVideoTexture!==!0,ee=Q.__version===void 0||z===!0,W=$.dataReady;let de=T(s,J);Ie(e.TEXTURE_CUBE_MAP,s);let ie;if(fe){b&&ee&&t.texStorage2D(e.TEXTURE_CUBE_MAP,de,He,J.width,J.height);for(let Z=0;Z<6;Z++){ie=ne[Z].mipmaps;for(let ge=0;ge<ie.length;ge++){const Pe=ie[ge];s.format!==Gt?Re!==null?b?W&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge,0,0,Pe.width,Pe.height,Re,Pe.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge,He,Pe.width,Pe.height,0,Pe.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):b?W&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge,0,0,Pe.width,Pe.height,Re,we,Pe.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge,He,Pe.width,Pe.height,0,Re,we,Pe.data)}}}else{if(ie=s.mipmaps,b&&ee){ie.length>0&&de++;const Z=rt(ne[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,de,He,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(he){b?W&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ne[Z].width,ne[Z].height,Re,we,ne[Z].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,He,ne[Z].width,ne[Z].height,0,Re,we,ne[Z].data);for(let ge=0;ge<ie.length;ge++){const ot=ie[ge].image[Z].image;b?W&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge+1,0,0,ot.width,ot.height,Re,we,ot.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge+1,He,ot.width,ot.height,0,Re,we,ot.data)}}else{b?W&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Re,we,ne[Z]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,He,Re,we,ne[Z]);for(let ge=0;ge<ie.length;ge++){const Pe=ie[ge];b?W&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge+1,0,0,Re,we,Pe.image[Z]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge+1,He,Re,we,Pe.image[Z])}}}f(s)&&x(e.TEXTURE_CUBE_MAP),Q.__version=$.version,s.onUpdate&&s.onUpdate(s)}v.__version=s.version}function Te(v,s,I,z,$,Q){const re=a.convert(I.format,I.colorSpace),k=a.convert(I.type),X=E(I.internalFormat,re,k,I.normalized,I.colorSpace),fe=i.get(s),he=i.get(I);if(he.__renderTarget=s,!fe.__hasExternalTextures){const ne=Math.max(1,s.width>>Q),J=Math.max(1,s.height>>Q);$===e.TEXTURE_3D||$===e.TEXTURE_2D_ARRAY?t.texImage3D($,Q,X,ne,J,s.depth,0,re,k,null):t.texImage2D($,Q,X,ne,J,0,re,k,null)}t.bindFramebuffer(e.FRAMEBUFFER,v),Oe(s)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,z,$,he.__webglTexture,0,ut(s)):($===e.TEXTURE_2D||$>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,z,$,he.__webglTexture,Q),t.bindFramebuffer(e.FRAMEBUFFER,null)}function nt(v,s,I){if(e.bindRenderbuffer(e.RENDERBUFFER,v),s.depthBuffer){const z=s.depthTexture,$=z&&z.isDepthTexture?z.type:null,Q=L(s.stencilBuffer,$),re=s.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Oe(s)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ut(s),Q,s.width,s.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,ut(s),Q,s.width,s.height):e.renderbufferStorage(e.RENDERBUFFER,Q,s.width,s.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,re,e.RENDERBUFFER,v)}else{const z=s.textures;for(let $=0;$<z.length;$++){const Q=z[$],re=a.convert(Q.format,Q.colorSpace),k=a.convert(Q.type),X=E(Q.internalFormat,re,k,Q.normalized,Q.colorSpace);Oe(s)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ut(s),X,s.width,s.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,ut(s),X,s.width,s.height):e.renderbufferStorage(e.RENDERBUFFER,X,s.width,s.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Fe(v,s,I){const z=s.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(e.FRAMEBUFFER,v),!(s.depthTexture&&s.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=i.get(s.depthTexture);if($.__renderTarget=s,(!$.__webglTexture||s.depthTexture.image.width!==s.width||s.depthTexture.image.height!==s.height)&&(s.depthTexture.image.width=s.width,s.depthTexture.image.height=s.height,s.depthTexture.needsUpdate=!0),z){if($.__webglInit===void 0&&($.__webglInit=!0,s.depthTexture.addEventListener("dispose",C)),$.__webglTexture===void 0){$.__webglTexture=e.createTexture(),t.bindTexture(e.TEXTURE_CUBE_MAP,$.__webglTexture),Ie(e.TEXTURE_CUBE_MAP,s.depthTexture);const fe=a.convert(s.depthTexture.format),he=a.convert(s.depthTexture.type);let ne;s.depthTexture.format===dn?ne=e.DEPTH_COMPONENT24:s.depthTexture.format===sn&&(ne=e.DEPTH24_STENCIL8);for(let J=0;J<6;J++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ne,s.width,s.height,0,fe,he,null)}}else j(s.depthTexture,0);const Q=$.__webglTexture,re=ut(s),k=z?e.TEXTURE_CUBE_MAP_POSITIVE_X+I:e.TEXTURE_2D,X=s.depthTexture.format===sn?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(s.depthTexture.format===dn)Oe(s)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,X,k,Q,0,re):e.framebufferTexture2D(e.FRAMEBUFFER,X,k,Q,0);else if(s.depthTexture.format===sn)Oe(s)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,X,k,Q,0,re):e.framebufferTexture2D(e.FRAMEBUFFER,X,k,Q,0);else throw new Error("Unknown depthTexture format")}function ze(v){const s=i.get(v),I=v.isWebGLCubeRenderTarget===!0;if(s.__boundDepthTexture!==v.depthTexture){const z=v.depthTexture;if(s.__depthDisposeCallback&&s.__depthDisposeCallback(),z){const $=()=>{delete s.__boundDepthTexture,delete s.__depthDisposeCallback,z.removeEventListener("dispose",$)};z.addEventListener("dispose",$),s.__depthDisposeCallback=$}s.__boundDepthTexture=z}if(v.depthTexture&&!s.__autoAllocateDepthBuffer)if(I)for(let z=0;z<6;z++)Fe(s.__webglFramebuffer[z],v,z);else{const z=v.texture.mipmaps;z&&z.length>0?Fe(s.__webglFramebuffer[0],v,0):Fe(s.__webglFramebuffer,v,0)}else if(I){s.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer[z]),s.__webglDepthbuffer[z]===void 0)s.__webglDepthbuffer[z]=e.createRenderbuffer(),nt(s.__webglDepthbuffer[z],v,!1);else{const $=v.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Q=s.__webglDepthbuffer[z];e.bindRenderbuffer(e.RENDERBUFFER,Q),e.framebufferRenderbuffer(e.FRAMEBUFFER,$,e.RENDERBUFFER,Q)}}else{const z=v.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),s.__webglDepthbuffer===void 0)s.__webglDepthbuffer=e.createRenderbuffer(),nt(s.__webglDepthbuffer,v,!1);else{const $=v.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Q=s.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,Q),e.framebufferRenderbuffer(e.FRAMEBUFFER,$,e.RENDERBUFFER,Q)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function et(v,s,I){const z=i.get(v);s!==void 0&&Te(z.__webglFramebuffer,v,v.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),I!==void 0&&ze(v)}function ye(v){const s=v.texture,I=i.get(v),z=i.get(s);v.addEventListener("dispose",g);const $=v.textures,Q=v.isWebGLCubeRenderTarget===!0,re=$.length>1;if(re||(z.__webglTexture===void 0&&(z.__webglTexture=e.createTexture()),z.__version=s.version,o.memory.textures++),Q){I.__webglFramebuffer=[];for(let k=0;k<6;k++)if(s.mipmaps&&s.mipmaps.length>0){I.__webglFramebuffer[k]=[];for(let X=0;X<s.mipmaps.length;X++)I.__webglFramebuffer[k][X]=e.createFramebuffer()}else I.__webglFramebuffer[k]=e.createFramebuffer()}else{if(s.mipmaps&&s.mipmaps.length>0){I.__webglFramebuffer=[];for(let k=0;k<s.mipmaps.length;k++)I.__webglFramebuffer[k]=e.createFramebuffer()}else I.__webglFramebuffer=e.createFramebuffer();if(re)for(let k=0,X=$.length;k<X;k++){const fe=i.get($[k]);fe.__webglTexture===void 0&&(fe.__webglTexture=e.createTexture(),o.memory.textures++)}if(v.samples>0&&Oe(v)===!1){I.__webglMultisampledFramebuffer=e.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let k=0;k<$.length;k++){const X=$[k];I.__webglColorRenderbuffer[k]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,I.__webglColorRenderbuffer[k]);const fe=a.convert(X.format,X.colorSpace),he=a.convert(X.type),ne=E(X.internalFormat,fe,he,X.normalized,X.colorSpace,v.isXRRenderTarget===!0),J=ut(v);e.renderbufferStorageMultisample(e.RENDERBUFFER,J,ne,v.width,v.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+k,e.RENDERBUFFER,I.__webglColorRenderbuffer[k])}e.bindRenderbuffer(e.RENDERBUFFER,null),v.depthBuffer&&(I.__webglDepthRenderbuffer=e.createRenderbuffer(),nt(I.__webglDepthRenderbuffer,v,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(Q){t.bindTexture(e.TEXTURE_CUBE_MAP,z.__webglTexture),Ie(e.TEXTURE_CUBE_MAP,s);for(let k=0;k<6;k++)if(s.mipmaps&&s.mipmaps.length>0)for(let X=0;X<s.mipmaps.length;X++)Te(I.__webglFramebuffer[k][X],v,s,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+k,X);else Te(I.__webglFramebuffer[k],v,s,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+k,0);f(s)&&x(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(re){for(let k=0,X=$.length;k<X;k++){const fe=$[k],he=i.get(fe);let ne=e.TEXTURE_2D;(v.isWebGL3DRenderTarget||v.isWebGLArrayRenderTarget)&&(ne=v.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(ne,he.__webglTexture),Ie(ne,fe),Te(I.__webglFramebuffer,v,fe,e.COLOR_ATTACHMENT0+k,ne,0),f(fe)&&x(ne)}t.unbindTexture()}else{let k=e.TEXTURE_2D;if((v.isWebGL3DRenderTarget||v.isWebGLArrayRenderTarget)&&(k=v.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(k,z.__webglTexture),Ie(k,s),s.mipmaps&&s.mipmaps.length>0)for(let X=0;X<s.mipmaps.length;X++)Te(I.__webglFramebuffer[X],v,s,e.COLOR_ATTACHMENT0,k,X);else Te(I.__webglFramebuffer,v,s,e.COLOR_ATTACHMENT0,k,0);f(s)&&x(k),t.unbindTexture()}v.depthBuffer&&ze(v)}function ft(v){const s=v.textures;for(let I=0,z=s.length;I<z;I++){const $=s[I];if(f($)){const Q=M(v),re=i.get($).__webglTexture;t.bindTexture(Q,re),x(Q),t.unbindTexture()}}}const it=[],St=[];function P(v){if(v.samples>0){if(Oe(v)===!1){const s=v.textures,I=v.width,z=v.height;let $=e.COLOR_BUFFER_BIT;const Q=v.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,re=i.get(v),k=s.length>1;if(k)for(let fe=0;fe<s.length;fe++)t.bindFramebuffer(e.FRAMEBUFFER,re.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+fe,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,re.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+fe,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer);const X=v.texture.mipmaps;X&&X.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,re.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let fe=0;fe<s.length;fe++){if(v.resolveDepthBuffer&&(v.depthBuffer&&($|=e.DEPTH_BUFFER_BIT),v.stencilBuffer&&v.resolveStencilBuffer&&($|=e.STENCIL_BUFFER_BIT)),k){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,re.__webglColorRenderbuffer[fe]);const he=i.get(s[fe]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,he,0)}e.blitFramebuffer(0,0,I,z,0,0,I,z,$,e.NEAREST),l===!0&&(it.length=0,St.length=0,it.push(e.COLOR_ATTACHMENT0+fe),v.depthBuffer&&v.resolveDepthBuffer===!1&&(it.push(Q),St.push(Q),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,St)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,it))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),k)for(let fe=0;fe<s.length;fe++){t.bindFramebuffer(e.FRAMEBUFFER,re.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+fe,e.RENDERBUFFER,re.__webglColorRenderbuffer[fe]);const he=i.get(s[fe]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,re.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+fe,e.TEXTURE_2D,he,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}else if(v.depthBuffer&&v.resolveDepthBuffer===!1&&l){const s=v.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[s])}}}function ut(v){return Math.min(r.maxSamples,v.samples)}function Oe(v){const s=i.get(v);return v.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&s.__useRenderToTexture!==!1}function $e(v){const s=o.render.frame;_.get(v)!==s&&(_.set(v,s),v.update())}function ae(v,s){const I=v.colorSpace,z=v.format,$=v.type;return v.isCompressedTexture===!0||v.isVideoTexture===!0||I!==At&&I!==on&&(tt.getTransfer(I)===Qe?(z!==Gt||$!==wt)&&ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",I)),s}function rt(v){return typeof HTMLImageElement<"u"&&v instanceof HTMLImageElement?(d.width=v.naturalWidth||v.width,d.height=v.naturalHeight||v.height):typeof VideoFrame<"u"&&v instanceof VideoFrame?(d.width=v.displayWidth,d.height=v.displayHeight):(d.width=v.width,d.height=v.height),d}this.allocateTextureUnit=G,this.resetTextureUnits=Y,this.getTextureUnits=q,this.setTextureUnits=B,this.setTexture2D=j,this.setTexture2DArray=ue,this.setTexture3D=ve,this.setTextureCube=Ae,this.rebindTextures=et,this.setupRenderTarget=ye,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=P,this.setupDepthRenderbuffer=ze,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=Oe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Md(e,n){function t(i,r=on){let a;const o=tt.getTransfer(r);if(i===wt)return e.UNSIGNED_BYTE;if(i===sa)return e.UNSIGNED_SHORT_4_4_4_4;if(i===ca)return e.UNSIGNED_SHORT_5_5_5_1;if(i===No)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===yo)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Fo)return e.BYTE;if(i===Oo)return e.SHORT;if(i===Hn)return e.UNSIGNED_SHORT;if(i===ua)return e.INT;if(i===tn)return e.UNSIGNED_INT;if(i===Yt)return e.FLOAT;if(i===jt)return e.HALF_FLOAT;if(i===Bo)return e.ALPHA;if(i===Go)return e.RGB;if(i===Gt)return e.RGBA;if(i===dn)return e.DEPTH_COMPONENT;if(i===sn)return e.DEPTH_STENCIL;if(i===Ho)return e.RED;if(i===oa)return e.RED_INTEGER;if(i===pn)return e.RG;if(i===aa)return e.RG_INTEGER;if(i===ra)return e.RGBA_INTEGER;if(i===Yn||i===Zn||i===$n||i===jn)if(o===Qe)if(a=n.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Yn)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Zn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===$n)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===jn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=n.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Yn)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Zn)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===$n)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===jn)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Fi||i===Oi||i===Bi||i===Gi)if(a=n.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Fi)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Oi)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Bi)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Gi)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Hi||i===Vi||i===ki||i===Wi||i===zi||i===fi||i===Xi)if(a=n.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Hi||i===Vi)return o===Qe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===ki)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===Wi)return a.COMPRESSED_R11_EAC;if(i===zi)return a.COMPRESSED_SIGNED_R11_EAC;if(i===fi)return a.COMPRESSED_RG11_EAC;if(i===Xi)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ki||i===qi||i===Yi||i===Zi||i===$i||i===ji||i===Qi||i===Ji||i===er||i===tr||i===nr||i===ir||i===rr||i===ar)if(a=n.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Ki)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===qi)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Yi)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Zi)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===$i)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ji)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Qi)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ji)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===er)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===tr)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===nr)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ir)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===rr)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ar)return o===Qe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===or||i===sr||i===cr)if(a=n.get("EXT_texture_compression_bptc"),a!==null){if(i===or)return o===Qe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===sr)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===cr)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===lr||i===fr||i===ui||i===ur)if(a=n.get("EXT_texture_compression_rgtc"),a!==null){if(i===lr)return a.COMPRESSED_RED_RGTC1_EXT;if(i===fr)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ui)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ur)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Cn?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const Td=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ad=`
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

}`;class Rd{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new la(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new kt({vertexShader:Td,fragmentShader:Ad,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new yt(new fa(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class bd extends eo{constructor(n,t){super();const i=this;let r=null,a=1,o=null,c="local-floor",l=1,d=null,_=null,m=null,u=null,S=null,A=null;const D=typeof XRWebGLBinding<"u",p=new Rd,f={},x=t.getContextAttributes();let M=null,E=null;const L=[],T=[],C=new _t;let g=null;const R=new An;R.viewport=new vt;const F=new An;F.viewport=new vt;const U=[R,F],V=new to;let Y=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let le=L[K];return le===void 0&&(le=new qn,L[K]=le),le.getTargetRaySpace()},this.getControllerGrip=function(K){let le=L[K];return le===void 0&&(le=new qn,L[K]=le),le.getGripSpace()},this.getHand=function(K){let le=L[K];return le===void 0&&(le=new qn,L[K]=le),le.getHandSpace()};function B(K){const le=T.indexOf(K.inputSource);if(le===-1)return;const te=L[le];te!==void 0&&(te.update(K.inputSource,K.frame,d||o),te.dispatchEvent({type:K.type,data:K.inputSource}))}function G(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",H);for(let K=0;K<L.length;K++){const le=T[K];le!==null&&(T[K]=null,L[K].disconnect(le))}Y=null,q=null,p.reset();for(const K in f)delete f[K];n.setRenderTarget(M),S=null,u=null,m=null,r=null,E=null,Ie.stop(),i.isPresenting=!1,n.setPixelRatio(g),n.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){a=K,i.isPresenting===!0&&ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){c=K,i.isPresenting===!0&&ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||o},this.setReferenceSpace=function(K){d=K},this.getBaseLayer=function(){return u!==null?u:S},this.getBinding=function(){return m===null&&D&&(m=new XRWebGLBinding(r,t)),m},this.getFrame=function(){return A},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(M=n.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",G),r.addEventListener("inputsourceschange",H),x.xrCompatible!==!0&&await t.makeXRCompatible(),g=n.getPixelRatio(),n.getSize(C),D&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,Me=null,Ce=null;x.depth&&(Ce=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=x.stencil?sn:dn,Me=x.stencil?Cn:tn);const Te={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:a};m=this.getBinding(),u=m.createProjectionLayer(Te),r.updateRenderState({layers:[u]}),n.setPixelRatio(1),n.setSize(u.textureWidth,u.textureHeight,!1),E=new It(u.textureWidth,u.textureHeight,{format:Gt,type:wt,depthTexture:new bn(u.textureWidth,u.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:x.stencil,colorSpace:n.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const te={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:a};S=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:S}),n.setPixelRatio(1),n.setSize(S.framebufferWidth,S.framebufferHeight,!1),E=new It(S.framebufferWidth,S.framebufferHeight,{format:Gt,type:wt,colorSpace:n.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),d=null,o=await r.requestReferenceSpace(c),Ie.setContext(r),Ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function H(K){for(let le=0;le<K.removed.length;le++){const te=K.removed[le],Me=T.indexOf(te);Me>=0&&(T[Me]=null,L[Me].disconnect(te))}for(let le=0;le<K.added.length;le++){const te=K.added[le];let Me=T.indexOf(te);if(Me===-1){for(let Te=0;Te<L.length;Te++)if(Te>=T.length){T.push(te),Me=Te;break}else if(T[Te]===null){T[Te]=te,Me=Te;break}if(Me===-1)break}const Ce=L[Me];Ce&&Ce.connect(te)}}const j=new be,ue=new be;function ve(K,le,te){j.setFromMatrixPosition(le.matrixWorld),ue.setFromMatrixPosition(te.matrixWorld);const Me=j.distanceTo(ue),Ce=le.projectionMatrix.elements,Te=te.projectionMatrix.elements,nt=Ce[14]/(Ce[10]-1),Fe=Ce[14]/(Ce[10]+1),ze=(Ce[9]+1)/Ce[5],et=(Ce[9]-1)/Ce[5],ye=(Ce[8]-1)/Ce[0],ft=(Te[8]+1)/Te[0],it=nt*ye,St=nt*ft,P=Me/(-ye+ft),ut=P*-ye;if(le.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ut),K.translateZ(P),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ce[10]===-1)K.projectionMatrix.copy(le.projectionMatrix),K.projectionMatrixInverse.copy(le.projectionMatrixInverse);else{const Oe=nt+P,$e=Fe+P,ae=it-ut,rt=St+(Me-ut),v=ze*Fe/$e*Oe,s=et*Fe/$e*Oe;K.projectionMatrix.makePerspective(ae,rt,v,s,Oe,$e),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Ae(K,le){le===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(le.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let le=K.near,te=K.far;p.texture!==null&&(p.depthNear>0&&(le=p.depthNear),p.depthFar>0&&(te=p.depthFar)),V.near=F.near=R.near=le,V.far=F.far=R.far=te,(Y!==V.near||q!==V.far)&&(r.updateRenderState({depthNear:V.near,depthFar:V.far}),Y=V.near,q=V.far),V.layers.mask=K.layers.mask|6,R.layers.mask=V.layers.mask&-5,F.layers.mask=V.layers.mask&-3;const Me=K.parent,Ce=V.cameras;Ae(V,Me);for(let Te=0;Te<Ce.length;Te++)Ae(Ce[Te],Me);Ce.length===2?ve(V,R,F):V.projectionMatrix.copy(R.projectionMatrix),xe(K,V,Me)};function xe(K,le,te){te===null?K.matrix.copy(le.matrixWorld):(K.matrix.copy(te.matrixWorld),K.matrix.invert(),K.matrix.multiply(le.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(le.projectionMatrix),K.projectionMatrixInverse.copy(le.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=no*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(u===null&&S===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=K)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(V)},this.getCameraTexture=function(K){return f[K]};let We=null;function Ze(K,le){if(_=le.getViewerPose(d||o),A=le,_!==null){const te=_.views;S!==null&&(n.setRenderTargetFramebuffer(E,S.framebuffer),n.setRenderTarget(E));let Me=!1;te.length!==V.cameras.length&&(V.cameras.length=0,Me=!0);for(let Fe=0;Fe<te.length;Fe++){const ze=te[Fe];let et=null;if(S!==null)et=S.getViewport(ze);else{const ft=m.getViewSubImage(u,ze);et=ft.viewport,Fe===0&&(n.setRenderTargetTextures(E,ft.colorTexture,ft.depthStencilTexture),n.setRenderTarget(E))}let ye=U[Fe];ye===void 0&&(ye=new An,ye.layers.enable(Fe),ye.viewport=new vt,U[Fe]=ye),ye.matrix.fromArray(ze.transform.matrix),ye.matrix.decompose(ye.position,ye.quaternion,ye.scale),ye.projectionMatrix.fromArray(ze.projectionMatrix),ye.projectionMatrixInverse.copy(ye.projectionMatrix).invert(),ye.viewport.set(et.x,et.y,et.width,et.height),Fe===0&&(V.matrix.copy(ye.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Me===!0&&V.cameras.push(ye)}const Ce=r.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&D){m=i.getBinding();const Fe=m.getDepthInformation(te[0]);Fe&&Fe.isValid&&Fe.texture&&p.init(Fe,r.renderState)}if(Ce&&Ce.includes("camera-access")&&D){n.state.unbindTexture(),m=i.getBinding();for(let Fe=0;Fe<te.length;Fe++){const ze=te[Fe].camera;if(ze){let et=f[ze];et||(et=new la,f[ze]=et);const ye=m.getCameraImage(ze);et.sourceTexture=ye}}}}for(let te=0;te<L.length;te++){const Me=T[te],Ce=L[te];Me!==null&&Ce!==void 0&&Ce.update(Me,le,d||o)}We&&We(K,le),le.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:le}),A=null}const Ie=new wa;Ie.setAnimationLoop(Ze),this.setAnimationLoop=function(K){We=K},this.dispose=function(){}}}const Cd=new Nt,Oa=new Be;Oa.set(-1,0,0,0,1,0,0,0,1);function Pd(e,n){function t(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,pa(e)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,x,M,E){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?a(p,f):f.isMeshLambertMaterial?(a(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(a(p,f),m(p,f)):f.isMeshPhongMaterial?(a(p,f),_(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(a(p,f),u(p,f),f.isMeshPhysicalMaterial&&S(p,f,E)):f.isMeshMatcapMaterial?(a(p,f),A(p,f)):f.isMeshDepthMaterial?a(p,f):f.isMeshDistanceMaterial?(a(p,f),D(p,f)):f.isMeshNormalMaterial?a(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&c(p,f)):f.isPointsMaterial?l(p,f,x,M):f.isSpriteMaterial?d(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,t(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===xt&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,t(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===xt&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,t(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,t(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const x=n.get(f),M=x.envMap,E=x.envMapRotation;M&&(p.envMap.value=M,p.envMapRotation.value.setFromMatrix4(Cd.makeRotationFromEuler(E)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Oa),p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform))}function c(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,x,M){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*x,p.scale.value=M*.5,f.map&&(p.map.value=f.map,t(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function d(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function _(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function m(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function u(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function S(p,f,x){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===xt&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,p.specularIntensityMapTransform))}function A(p,f){f.matcap&&(p.matcap.value=f.matcap)}function D(p,f){const x=n.get(f).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Ld(e,n,t,i){let r={},a={},o=[];const c=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){const E=M.program;i.uniformBlockBinding(x,E)}function d(x,M){let E=r[x.id];E===void 0&&(A(x),E=_(x),r[x.id]=E,x.addEventListener("dispose",p));const L=M.program;i.updateUBOMapping(x,L);const T=n.render.frame;a[x.id]!==T&&(u(x),a[x.id]=T)}function _(x){const M=m();x.__bindingPointIndex=M;const E=e.createBuffer(),L=x.__size,T=x.usage;return e.bindBuffer(e.UNIFORM_BUFFER,E),e.bufferData(e.UNIFORM_BUFFER,L,T),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,M,E),E}function m(){for(let x=0;x<c;x++)if(o.indexOf(x)===-1)return o.push(x),x;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const M=r[x.id],E=x.uniforms,L=x.__cache;e.bindBuffer(e.UNIFORM_BUFFER,M);for(let T=0,C=E.length;T<C;T++){const g=Array.isArray(E[T])?E[T]:[E[T]];for(let R=0,F=g.length;R<F;R++){const U=g[R];if(S(U,T,R,L)===!0){const V=U.__offset,Y=Array.isArray(U.value)?U.value:[U.value];let q=0;for(let B=0;B<Y.length;B++){const G=Y[B],H=D(G);typeof G=="number"||typeof G=="boolean"?(U.__data[0]=G,e.bufferSubData(e.UNIFORM_BUFFER,V+q,U.__data)):G.isMatrix3?(U.__data[0]=G.elements[0],U.__data[1]=G.elements[1],U.__data[2]=G.elements[2],U.__data[3]=0,U.__data[4]=G.elements[3],U.__data[5]=G.elements[4],U.__data[6]=G.elements[5],U.__data[7]=0,U.__data[8]=G.elements[6],U.__data[9]=G.elements[7],U.__data[10]=G.elements[8],U.__data[11]=0):ArrayBuffer.isView(G)?U.__data.set(new G.constructor(G.buffer,G.byteOffset,U.__data.length)):(G.toArray(U.__data,q),q+=H.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,V,U.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function S(x,M,E,L){const T=x.value,C=M+"_"+E;if(L[C]===void 0)return typeof T=="number"||typeof T=="boolean"?L[C]=T:ArrayBuffer.isView(T)?L[C]=T.slice():L[C]=T.clone(),!0;{const g=L[C];if(typeof T=="number"||typeof T=="boolean"){if(g!==T)return L[C]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(g.equals(T)===!1)return g.copy(T),!0}}return!1}function A(x){const M=x.uniforms;let E=0;const L=16;for(let C=0,g=M.length;C<g;C++){const R=Array.isArray(M[C])?M[C]:[M[C]];for(let F=0,U=R.length;F<U;F++){const V=R[F],Y=Array.isArray(V.value)?V.value:[V.value];for(let q=0,B=Y.length;q<B;q++){const G=Y[q],H=D(G),j=E%L,ue=j%H.boundary,ve=j+ue;E+=ue,ve!==0&&L-ve<H.storage&&(E+=L-ve),V.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=E,E+=H.storage}}}const T=E%L;return T>0&&(E+=L-T),x.__size=E,x.__cache={},this}function D(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(M.boundary=16,M.storage=x.byteLength):ke("WebGLRenderer: Unsupported uniform value type.",x),M}function p(x){const M=x.target;M.removeEventListener("dispose",p);const E=o.indexOf(M.__bindingPointIndex);o.splice(E,1),e.deleteBuffer(r[M.id]),delete r[M.id],delete a[M.id]}function f(){for(const x in r)e.deleteBuffer(r[x]);o=[],r={},a={}}return{bind:l,update:d,dispose:f}}const wd=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ct=null;function Ud(){return Ct===null&&(Ct=new io(wd,16,16,pn,jt),Ct.name="DFG_LUT",Ct.minFilter=mt,Ct.magFilter=mt,Ct.wrapS=Bn,Ct.wrapT=Bn,Ct.generateMipmaps=!1,Ct.needsUpdate=!0),Ct}class _p{constructor(n={}){const{canvas:t=$a(),context:i=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:d=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:u=!1,outputBufferType:S=wt}=n;this.isWebGLRenderer=!0;let A;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");A=i.getContextAttributes().alpha}else A=o;const D=S,p=new Set([ra,aa,oa]),f=new Set([wt,tn,Hn,Cn,sa,ca]),x=new Uint32Array(4),M=new Int32Array(4),E=new be;let L=null,T=null;const C=[],g=[];let R=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Dt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const F=this;let U=!1,V=null;this._outputColorSpace=fn;let Y=0,q=0,B=null,G=-1,H=null;const j=new vt,ue=new vt;let ve=null;const Ae=new Ve(0);let xe=0,We=t.width,Ze=t.height,Ie=1,K=null,le=null;const te=new vt(0,0,We,Ze),Me=new vt(0,0,We,Ze);let Ce=!1;const Te=new ta;let nt=!1,Fe=!1;const ze=new Nt,et=new be,ye=new vt,ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let it=!1;function St(){return B===null?Ie:1}let P=i;function ut(h,w){return t.getContext(h,w)}try{const h={alpha:!0,depth:r,stencil:a,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:d,powerPreference:_,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ja}`),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",ge,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),P===null){const w="webgl2";if(P=ut(w,h),P===null)throw ut(w)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(h){throw Je("WebGLRenderer: "+h.message),h}let Oe,$e,ae,rt,v,s,I,z,$,Q,re,k,X,fe,he,ne,J,Re,we,He,b,ee,W;function de(){Oe=new Uf(P),Oe.init(),b=new Md(P,Oe),$e=new Tf(P,Oe,n,b),ae=new Ed(P,Oe),$e.reversedDepthBuffer&&u&&ae.buffers.depth.setReversed(!0),rt=new Nf(P),v=new od,s=new xd(P,Oe,ae,v,$e,b,rt),I=new wf(F),z=new Os(P),ee=new xf(P,z),$=new Df(P,z,rt,ee),Q=new Ff(P,$,z,ee,rt),Re=new yf(P,$e,s),he=new Af(v),re=new ad(F,I,Oe,$e,ee,he),k=new Pd(F,v),X=new cd,fe=new hd(Oe),J=new Ef(F,I,ae,Q,A,l),ne=new Sd(F,Q,$e),W=new Ld(P,rt,$e,ae),we=new Mf(P,Oe,rt),He=new If(P,Oe,rt),rt.programs=re.programs,F.capabilities=$e,F.extensions=Oe,F.properties=v,F.renderLists=X,F.shadowMap=ne,F.state=ae,F.info=rt}de(),D!==wt&&(R=new Bf(D,t.width,t.height,r,a));const ie=new bd(F,P);this.xr=ie,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const h=Oe.get("WEBGL_lose_context");h&&h.loseContext()},this.forceContextRestore=function(){const h=Oe.get("WEBGL_lose_context");h&&h.restoreContext()},this.getPixelRatio=function(){return Ie},this.setPixelRatio=function(h){h!==void 0&&(Ie=h,this.setSize(We,Ze,!1))},this.getSize=function(h){return h.set(We,Ze)},this.setSize=function(h,w,O=!0){if(ie.isPresenting){ke("WebGLRenderer: Can't change size while VR device is presenting.");return}We=h,Ze=w,t.width=Math.floor(h*Ie),t.height=Math.floor(w*Ie),O===!0&&(t.style.width=h+"px",t.style.height=w+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,h,w)},this.getDrawingBufferSize=function(h){return h.set(We*Ie,Ze*Ie).floor()},this.setDrawingBufferSize=function(h,w,O){We=h,Ze=w,Ie=O,t.width=Math.floor(h*O),t.height=Math.floor(w*O),this.setViewport(0,0,h,w)},this.setEffects=function(h){if(D===wt){Je("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(h){for(let w=0;w<h.length;w++)if(h[w].isOutputPass===!0){ke("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(h||[])},this.getCurrentViewport=function(h){return h.copy(j)},this.getViewport=function(h){return h.copy(te)},this.setViewport=function(h,w,O,N){h.isVector4?te.set(h.x,h.y,h.z,h.w):te.set(h,w,O,N),ae.viewport(j.copy(te).multiplyScalar(Ie).round())},this.getScissor=function(h){return h.copy(Me)},this.setScissor=function(h,w,O,N){h.isVector4?Me.set(h.x,h.y,h.z,h.w):Me.set(h,w,O,N),ae.scissor(ue.copy(Me).multiplyScalar(Ie).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(h){ae.setScissorTest(Ce=h)},this.setOpaqueSort=function(h){K=h},this.setTransparentSort=function(h){le=h},this.getClearColor=function(h){return h.copy(J.getClearColor())},this.setClearColor=function(){J.setClearColor(...arguments)},this.getClearAlpha=function(){return J.getClearAlpha()},this.setClearAlpha=function(){J.setClearAlpha(...arguments)},this.clear=function(h=!0,w=!0,O=!0){let N=0;if(h){let y=!1;if(B!==null){const ce=B.texture.format;y=p.has(ce)}if(y){const ce=B.texture.type,me=f.has(ce),se=J.getClearColor(),_e=J.getClearAlpha(),Se=se.r,Le=se.g,De=se.b;me?(x[0]=Se,x[1]=Le,x[2]=De,x[3]=_e,P.clearBufferuiv(P.COLOR,0,x)):(M[0]=Se,M[1]=Le,M[2]=De,M[3]=_e,P.clearBufferiv(P.COLOR,0,M))}else N|=P.COLOR_BUFFER_BIT}w&&(N|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),O&&(N|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N!==0&&P.clear(N)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(h){h.setRenderer(this),V=h},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",ge,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),J.dispose(),X.dispose(),fe.dispose(),v.dispose(),I.dispose(),Q.dispose(),ee.dispose(),W.dispose(),re.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",Ai),ie.removeEventListener("sessionend",Ri),Qt.stop()};function Z(h){h.preventDefault(),Di("WebGLRenderer: Context Lost."),U=!0}function ge(){Di("WebGLRenderer: Context Restored."),U=!1;const h=rt.autoReset,w=ne.enabled,O=ne.autoUpdate,N=ne.needsUpdate,y=ne.type;de(),rt.autoReset=h,ne.enabled=w,ne.autoUpdate=O,ne.needsUpdate=N,ne.type=y}function Pe(h){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",h.statusMessage)}function ot(h){const w=h.target;w.removeEventListener("dispose",ot),Xe(w)}function Xe(h){Ot(h),v.remove(h)}function Ot(h){const w=v.get(h).programs;w!==void 0&&(w.forEach(function(O){re.releaseProgram(O)}),h.isShaderMaterial&&re.releaseShaderCache(h))}this.renderBufferDirect=function(h,w,O,N,y,ce){w===null&&(w=ft);const me=y.isMesh&&y.matrixWorld.determinant()<0,se=za(h,w,O,N,y);ae.setMaterial(N,me);let _e=O.index,Se=1;if(N.wireframe===!0){if(_e=$.getWireframeAttribute(O),_e===void 0)return;Se=2}const Le=O.drawRange,De=O.attributes.position;let Ee=Le.start*Se,Ke=(Le.start+Le.count)*Se;ce!==null&&(Ee=Math.max(Ee,ce.start*Se),Ke=Math.min(Ke,(ce.start+ce.count)*Se)),_e!==null?(Ee=Math.max(Ee,0),Ke=Math.min(Ke,_e.count)):De!=null&&(Ee=Math.max(Ee,0),Ke=Math.min(Ke,De.count));const st=Ke-Ee;if(st<0||st===1/0)return;ee.setup(y,N,se,O,_e);let at,qe=we;if(_e!==null&&(at=z.get(_e),qe=He,qe.setIndex(at)),y.isMesh)N.wireframe===!0?(ae.setLineWidth(N.wireframeLinewidth*St()),qe.setMode(P.LINES)):qe.setMode(P.TRIANGLES);else if(y.isLine){let ht=N.linewidth;ht===void 0&&(ht=1),ae.setLineWidth(ht*St()),y.isLineSegments?qe.setMode(P.LINES):y.isLineLoop?qe.setMode(P.LINE_LOOP):qe.setMode(P.LINE_STRIP)}else y.isPoints?qe.setMode(P.POINTS):y.isSprite&&qe.setMode(P.TRIANGLES);if(y.isBatchedMesh)if(Oe.get("WEBGL_multi_draw"))qe.renderMultiDraw(y._multiDrawStarts,y._multiDrawCounts,y._multiDrawCount);else{const ht=y._multiDrawStarts,pe=y._multiDrawCounts,Et=y._multiDrawCount,Ge=_e?z.get(_e).bytesPerElement:1,Mt=v.get(N).currentProgram.getUniforms();for(let bt=0;bt<Et;bt++)Mt.setValue(P,"_gl_DrawID",bt),qe.render(ht[bt]/Ge,pe[bt])}else if(y.isInstancedMesh)qe.renderInstances(Ee,st,y.count);else if(O.isInstancedBufferGeometry){const ht=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,pe=Math.min(O.instanceCount,ht);qe.renderInstances(Ee,st,pe)}else qe.render(Ee,st)};function Rt(h,w,O){h.transparent===!0&&h.side===Ut&&h.forceSinglePass===!1?(h.side=xt,h.needsUpdate=!0,wn(h,w,O),h.side=un,h.needsUpdate=!0,wn(h,w,O),h.side=Ut):wn(h,w,O)}this.compile=function(h,w,O=null){O===null&&(O=h),T=fe.get(O),T.init(w),g.push(T),O.traverseVisible(function(y){y.isLight&&y.layers.test(w.layers)&&(T.pushLight(y),y.castShadow&&T.pushShadow(y))}),h!==O&&h.traverseVisible(function(y){y.isLight&&y.layers.test(w.layers)&&(T.pushLight(y),y.castShadow&&T.pushShadow(y))}),T.setupLights();const N=new Set;return h.traverse(function(y){if(!(y.isMesh||y.isPoints||y.isLine||y.isSprite))return;const ce=y.material;if(ce)if(Array.isArray(ce))for(let me=0;me<ce.length;me++){const se=ce[me];Rt(se,O,y),N.add(se)}else Rt(ce,O,y),N.add(ce)}),T=g.pop(),N},this.compileAsync=function(h,w,O=null){const N=this.compile(h,w,O);return new Promise(y=>{function ce(){if(N.forEach(function(me){v.get(me).currentProgram.isReady()&&N.delete(me)}),N.size===0){y(h);return}setTimeout(ce,10)}Oe.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let Xn=null;function ka(h){Xn&&Xn(h)}function Ai(){Qt.stop()}function Ri(){Qt.start()}const Qt=new wa;Qt.setAnimationLoop(ka),typeof self<"u"&&Qt.setContext(self),this.setAnimationLoop=function(h){Xn=h,ie.setAnimationLoop(h),h===null?Qt.stop():Qt.start()},ie.addEventListener("sessionstart",Ai),ie.addEventListener("sessionend",Ri),this.render=function(h,w){if(w!==void 0&&w.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;V!==null&&V.renderStart(h,w);const O=ie.enabled===!0&&ie.isPresenting===!0,N=R!==null&&(B===null||O)&&R.begin(F,B);if(h.matrixWorldAutoUpdate===!0&&h.updateMatrixWorld(),w.parent===null&&w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(w),w=ie.getCamera()),h.isScene===!0&&h.onBeforeRender(F,h,w,B),T=fe.get(h,g.length),T.init(w),T.state.textureUnits=s.getTextureUnits(),g.push(T),ze.multiplyMatrices(w.projectionMatrix,w.matrixWorldInverse),Te.setFromProjectionMatrix(ze,Ii,w.reversedDepth),Fe=this.localClippingEnabled,nt=he.init(this.clippingPlanes,Fe),L=X.get(h,C.length),L.init(),C.push(L),ie.enabled===!0&&ie.isPresenting===!0){const me=F.xr.getDepthSensingMesh();me!==null&&Kn(me,w,-1/0,F.sortObjects)}Kn(h,w,0,F.sortObjects),L.finish(),F.sortObjects===!0&&L.sort(K,le),it=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,it&&J.addToRenderList(L,h),this.info.render.frame++,nt===!0&&he.beginShadows();const y=T.state.shadowsArray;if(ne.render(y,h,w),nt===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset(),(N&&R.hasRenderPass())===!1){const me=L.opaque,se=L.transmissive;if(T.setupLights(),w.isArrayCamera){const _e=w.cameras;if(se.length>0)for(let Se=0,Le=_e.length;Se<Le;Se++){const De=_e[Se];Ci(me,se,h,De)}it&&J.render(h);for(let Se=0,Le=_e.length;Se<Le;Se++){const De=_e[Se];bi(L,h,De,De.viewport)}}else se.length>0&&Ci(me,se,h,w),it&&J.render(h),bi(L,h,w)}B!==null&&q===0&&(s.updateMultisampleRenderTarget(B),s.updateRenderTargetMipmap(B)),N&&R.end(F),h.isScene===!0&&h.onAfterRender(F,h,w),ee.resetDefaultState(),G=-1,H=null,g.pop(),g.length>0?(T=g[g.length-1],s.setTextureUnits(T.state.textureUnits),nt===!0&&he.setGlobalState(F.clippingPlanes,T.state.camera)):T=null,C.pop(),C.length>0?L=C[C.length-1]:L=null,V!==null&&V.renderEnd()};function Kn(h,w,O,N){if(h.visible===!1)return;if(h.layers.test(w.layers)){if(h.isGroup)O=h.renderOrder;else if(h.isLOD)h.autoUpdate===!0&&h.update(w);else if(h.isLightProbeGrid)T.pushLightProbeGrid(h);else if(h.isLight)T.pushLight(h),h.castShadow&&T.pushShadow(h);else if(h.isSprite){if(!h.frustumCulled||Te.intersectsSprite(h)){N&&ye.setFromMatrixPosition(h.matrixWorld).applyMatrix4(ze);const me=Q.update(h),se=h.material;se.visible&&L.push(h,me,se,O,ye.z,null)}}else if((h.isMesh||h.isLine||h.isPoints)&&(!h.frustumCulled||Te.intersectsObject(h))){const me=Q.update(h),se=h.material;if(N&&(h.boundingSphere!==void 0?(h.boundingSphere===null&&h.computeBoundingSphere(),ye.copy(h.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),ye.copy(me.boundingSphere.center)),ye.applyMatrix4(h.matrixWorld).applyMatrix4(ze)),Array.isArray(se)){const _e=me.groups;for(let Se=0,Le=_e.length;Se<Le;Se++){const De=_e[Se],Ee=se[De.materialIndex];Ee&&Ee.visible&&L.push(h,me,Ee,O,ye.z,De)}}else se.visible&&L.push(h,me,se,O,ye.z,null)}}const ce=h.children;for(let me=0,se=ce.length;me<se;me++)Kn(ce[me],w,O,N)}function bi(h,w,O,N){const{opaque:y,transmissive:ce,transparent:me}=h;T.setupLightsView(O),nt===!0&&he.setGlobalState(F.clippingPlanes,O),N&&ae.viewport(j.copy(N)),y.length>0&&Ln(y,w,O),ce.length>0&&Ln(ce,w,O),me.length>0&&Ln(me,w,O),ae.buffers.depth.setTest(!0),ae.buffers.depth.setMask(!0),ae.buffers.color.setMask(!0),ae.setPolygonOffset(!1)}function Ci(h,w,O,N){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[N.id]===void 0){const Ee=Oe.has("EXT_color_buffer_half_float")||Oe.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[N.id]=new It(1,1,{generateMipmaps:!0,type:Ee?jt:wt,minFilter:qt,samples:Math.max(4,$e.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace})}const ce=T.state.transmissionRenderTarget[N.id],me=N.viewport||j;ce.setSize(me.z*F.transmissionResolutionScale,me.w*F.transmissionResolutionScale);const se=F.getRenderTarget(),_e=F.getActiveCubeFace(),Se=F.getActiveMipmapLevel();F.setRenderTarget(ce),F.getClearColor(Ae),xe=F.getClearAlpha(),xe<1&&F.setClearColor(16777215,.5),F.clear(),it&&J.render(O);const Le=F.toneMapping;F.toneMapping=Dt;const De=N.viewport;if(N.viewport!==void 0&&(N.viewport=void 0),T.setupLightsView(N),nt===!0&&he.setGlobalState(F.clippingPlanes,N),Ln(h,O,N),s.updateMultisampleRenderTarget(ce),s.updateRenderTargetMipmap(ce),Oe.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let Ke=0,st=w.length;Ke<st;Ke++){const at=w[Ke],{object:qe,geometry:ht,material:pe,group:Et}=at;if(pe.side===Ut&&qe.layers.test(N.layers)){const Ge=pe.side;pe.side=xt,pe.needsUpdate=!0,Pi(qe,O,N,ht,pe,Et),pe.side=Ge,pe.needsUpdate=!0,Ee=!0}}Ee===!0&&(s.updateMultisampleRenderTarget(ce),s.updateRenderTargetMipmap(ce))}F.setRenderTarget(se,_e,Se),F.setClearColor(Ae,xe),De!==void 0&&(N.viewport=De),F.toneMapping=Le}function Ln(h,w,O){const N=w.isScene===!0?w.overrideMaterial:null;for(let y=0,ce=h.length;y<ce;y++){const me=h[y],{object:se,geometry:_e,group:Se}=me;let Le=me.material;Le.allowOverride===!0&&N!==null&&(Le=N),se.layers.test(O.layers)&&Pi(se,w,O,_e,Le,Se)}}function Pi(h,w,O,N,y,ce){h.onBeforeRender(F,w,O,N,y,ce),h.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,h.matrixWorld),h.normalMatrix.getNormalMatrix(h.modelViewMatrix),y.onBeforeRender(F,w,O,N,h,ce),y.transparent===!0&&y.side===Ut&&y.forceSinglePass===!1?(y.side=xt,y.needsUpdate=!0,F.renderBufferDirect(O,w,N,y,h,ce),y.side=un,y.needsUpdate=!0,F.renderBufferDirect(O,w,N,y,h,ce),y.side=Ut):F.renderBufferDirect(O,w,N,y,h,ce),h.onAfterRender(F,w,O,N,y,ce)}function wn(h,w,O){w.isScene!==!0&&(w=ft);const N=v.get(h),y=T.state.lights,ce=T.state.shadowsArray,me=y.state.version,se=re.getParameters(h,y.state,ce,w,O,T.state.lightProbeGridArray),_e=re.getProgramCacheKey(se);let Se=N.programs;N.environment=h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial?w.environment:null,N.fog=w.fog;const Le=h.isMeshStandardMaterial||h.isMeshLambertMaterial&&!h.envMap||h.isMeshPhongMaterial&&!h.envMap;N.envMap=I.get(h.envMap||N.environment,Le),N.envMapRotation=N.environment!==null&&h.envMap===null?w.environmentRotation:h.envMapRotation,Se===void 0&&(h.addEventListener("dispose",ot),Se=new Map,N.programs=Se);let De=Se.get(_e);if(De!==void 0){if(N.currentProgram===De&&N.lightsStateVersion===me)return wi(h,se),De}else se.uniforms=re.getUniforms(h),V!==null&&h.isNodeMaterial&&V.build(h,O,se),h.onBeforeCompile(se,F),De=re.acquireProgram(se,_e),Se.set(_e,De),N.uniforms=se.uniforms;const Ee=N.uniforms;return(!h.isShaderMaterial&&!h.isRawShaderMaterial||h.clipping===!0)&&(Ee.clippingPlanes=he.uniform),wi(h,se),N.needsLights=Ka(h),N.lightsStateVersion=me,N.needsLights&&(Ee.ambientLightColor.value=y.state.ambient,Ee.lightProbe.value=y.state.probe,Ee.directionalLights.value=y.state.directional,Ee.directionalLightShadows.value=y.state.directionalShadow,Ee.spotLights.value=y.state.spot,Ee.spotLightShadows.value=y.state.spotShadow,Ee.rectAreaLights.value=y.state.rectArea,Ee.ltc_1.value=y.state.rectAreaLTC1,Ee.ltc_2.value=y.state.rectAreaLTC2,Ee.pointLights.value=y.state.point,Ee.pointLightShadows.value=y.state.pointShadow,Ee.hemisphereLights.value=y.state.hemi,Ee.directionalShadowMatrix.value=y.state.directionalShadowMatrix,Ee.spotLightMatrix.value=y.state.spotLightMatrix,Ee.spotLightMap.value=y.state.spotLightMap,Ee.pointShadowMatrix.value=y.state.pointShadowMatrix),N.lightProbeGrid=T.state.lightProbeGridArray.length>0,N.currentProgram=De,N.uniformsList=null,De}function Li(h){if(h.uniformsList===null){const w=h.currentProgram.getUniforms();h.uniformsList=On.seqWithValue(w.seq,h.uniforms)}return h.uniformsList}function wi(h,w){const O=v.get(h);O.outputColorSpace=w.outputColorSpace,O.batching=w.batching,O.batchingColor=w.batchingColor,O.instancing=w.instancing,O.instancingColor=w.instancingColor,O.instancingMorph=w.instancingMorph,O.skinning=w.skinning,O.morphTargets=w.morphTargets,O.morphNormals=w.morphNormals,O.morphColors=w.morphColors,O.morphTargetsCount=w.morphTargetsCount,O.numClippingPlanes=w.numClippingPlanes,O.numIntersection=w.numClipIntersection,O.vertexAlphas=w.vertexAlphas,O.vertexTangents=w.vertexTangents,O.toneMapping=w.toneMapping}function Wa(h,w){if(h.length===0)return null;if(h.length===1)return h[0].texture!==null?h[0]:null;E.setFromMatrixPosition(w.matrixWorld);for(let O=0,N=h.length;O<N;O++){const y=h[O];if(y.texture!==null&&y.boundingBox.containsPoint(E))return y}return null}function za(h,w,O,N,y){w.isScene!==!0&&(w=ft),s.resetTextureUnits();const ce=w.fog,me=N.isMeshStandardMaterial||N.isMeshLambertMaterial||N.isMeshPhongMaterial?w.environment:null,se=B===null?F.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:tt.workingColorSpace,_e=N.isMeshStandardMaterial||N.isMeshLambertMaterial&&!N.envMap||N.isMeshPhongMaterial&&!N.envMap,Se=I.get(N.envMap||me,_e),Le=N.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,De=!!O.attributes.tangent&&(!!N.normalMap||N.anisotropy>0),Ee=!!O.morphAttributes.position,Ke=!!O.morphAttributes.normal,st=!!O.morphAttributes.color;let at=Dt;N.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(at=F.toneMapping);const qe=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ht=qe!==void 0?qe.length:0,pe=v.get(N),Et=T.state.lights;if(nt===!0&&(Fe===!0||h!==H)){const je=h===H&&N.id===G;he.setState(N,h,je)}let Ge=!1;N.version===pe.__version?(pe.needsLights&&pe.lightsStateVersion!==Et.state.version||pe.outputColorSpace!==se||y.isBatchedMesh&&pe.batching===!1||!y.isBatchedMesh&&pe.batching===!0||y.isBatchedMesh&&pe.batchingColor===!0&&y.colorTexture===null||y.isBatchedMesh&&pe.batchingColor===!1&&y.colorTexture!==null||y.isInstancedMesh&&pe.instancing===!1||!y.isInstancedMesh&&pe.instancing===!0||y.isSkinnedMesh&&pe.skinning===!1||!y.isSkinnedMesh&&pe.skinning===!0||y.isInstancedMesh&&pe.instancingColor===!0&&y.instanceColor===null||y.isInstancedMesh&&pe.instancingColor===!1&&y.instanceColor!==null||y.isInstancedMesh&&pe.instancingMorph===!0&&y.morphTexture===null||y.isInstancedMesh&&pe.instancingMorph===!1&&y.morphTexture!==null||pe.envMap!==Se||N.fog===!0&&pe.fog!==ce||pe.numClippingPlanes!==void 0&&(pe.numClippingPlanes!==he.numPlanes||pe.numIntersection!==he.numIntersection)||pe.vertexAlphas!==Le||pe.vertexTangents!==De||pe.morphTargets!==Ee||pe.morphNormals!==Ke||pe.morphColors!==st||pe.toneMapping!==at||pe.morphTargetsCount!==ht||!!pe.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Ge=!0):(Ge=!0,pe.__version=N.version);let Mt=pe.currentProgram;Ge===!0&&(Mt=wn(N,w,y),V&&N.isNodeMaterial&&V.onUpdateProgram(N,Mt,pe));let bt=!1,Wt=!1,nn=!1;const Ye=Mt.getUniforms(),ct=pe.uniforms;if(ae.useProgram(Mt.program)&&(bt=!0,Wt=!0,nn=!0),N.id!==G&&(G=N.id,Wt=!0),pe.needsLights){const je=Wa(T.state.lightProbeGridArray,y);pe.lightProbeGrid!==je&&(pe.lightProbeGrid=je,Wt=!0)}if(bt||H!==h){ae.buffers.depth.getReversed()&&h.reversedDepth!==!0&&(h._reversedDepth=!0,h.updateProjectionMatrix()),Ye.setValue(P,"projectionMatrix",h.projectionMatrix),Ye.setValue(P,"viewMatrix",h.matrixWorldInverse);const Xt=Ye.map.cameraPosition;Xt!==void 0&&Xt.setValue(P,et.setFromMatrixPosition(h.matrixWorld)),$e.logarithmicDepthBuffer&&Ye.setValue(P,"logDepthBufFC",2/(Math.log(h.far+1)/Math.LN2)),(N.isMeshPhongMaterial||N.isMeshToonMaterial||N.isMeshLambertMaterial||N.isMeshBasicMaterial||N.isMeshStandardMaterial||N.isShaderMaterial)&&Ye.setValue(P,"isOrthographic",h.isOrthographicCamera===!0),H!==h&&(H=h,Wt=!0,nn=!0)}if(pe.needsLights&&(Et.state.directionalShadowMap.length>0&&Ye.setValue(P,"directionalShadowMap",Et.state.directionalShadowMap,s),Et.state.spotShadowMap.length>0&&Ye.setValue(P,"spotShadowMap",Et.state.spotShadowMap,s),Et.state.pointShadowMap.length>0&&Ye.setValue(P,"pointShadowMap",Et.state.pointShadowMap,s)),y.isSkinnedMesh){Ye.setOptional(P,y,"bindMatrix"),Ye.setOptional(P,y,"bindMatrixInverse");const je=y.skeleton;je&&(je.boneTexture===null&&je.computeBoneTexture(),Ye.setValue(P,"boneTexture",je.boneTexture,s))}y.isBatchedMesh&&(Ye.setOptional(P,y,"batchingTexture"),Ye.setValue(P,"batchingTexture",y._matricesTexture,s),Ye.setOptional(P,y,"batchingIdTexture"),Ye.setValue(P,"batchingIdTexture",y._indirectTexture,s),Ye.setOptional(P,y,"batchingColorTexture"),y._colorsTexture!==null&&Ye.setValue(P,"batchingColorTexture",y._colorsTexture,s));const zt=O.morphAttributes;if((zt.position!==void 0||zt.normal!==void 0||zt.color!==void 0)&&Re.update(y,O,Mt),(Wt||pe.receiveShadow!==y.receiveShadow)&&(pe.receiveShadow=y.receiveShadow,Ye.setValue(P,"receiveShadow",y.receiveShadow)),(N.isMeshStandardMaterial||N.isMeshLambertMaterial||N.isMeshPhongMaterial)&&N.envMap===null&&w.environment!==null&&(ct.envMapIntensity.value=w.environmentIntensity),ct.dfgLUT!==void 0&&(ct.dfgLUT.value=Ud()),Wt){if(Ye.setValue(P,"toneMappingExposure",F.toneMappingExposure),pe.needsLights&&Xa(ct,nn),ce&&N.fog===!0&&k.refreshFogUniforms(ct,ce),k.refreshMaterialUniforms(ct,N,Ie,Ze,T.state.transmissionRenderTarget[h.id]),pe.needsLights&&pe.lightProbeGrid){const je=pe.lightProbeGrid;ct.probesSH.value=je.texture,ct.probesMin.value.copy(je.boundingBox.min),ct.probesMax.value.copy(je.boundingBox.max),ct.probesResolution.value.copy(je.resolution)}On.upload(P,Li(pe),ct,s)}if(N.isShaderMaterial&&N.uniformsNeedUpdate===!0&&(On.upload(P,Li(pe),ct,s),N.uniformsNeedUpdate=!1),N.isSpriteMaterial&&Ye.setValue(P,"center",y.center),Ye.setValue(P,"modelViewMatrix",y.modelViewMatrix),Ye.setValue(P,"normalMatrix",y.normalMatrix),Ye.setValue(P,"modelMatrix",y.matrixWorld),N.uniformsGroups!==void 0){const je=N.uniformsGroups;for(let Xt=0,rn=je.length;Xt<rn;Xt++){const Ui=je[Xt];W.update(Ui,Mt),W.bind(Ui,Mt)}}return Mt}function Xa(h,w){h.ambientLightColor.needsUpdate=w,h.lightProbe.needsUpdate=w,h.directionalLights.needsUpdate=w,h.directionalLightShadows.needsUpdate=w,h.pointLights.needsUpdate=w,h.pointLightShadows.needsUpdate=w,h.spotLights.needsUpdate=w,h.spotLightShadows.needsUpdate=w,h.rectAreaLights.needsUpdate=w,h.hemisphereLights.needsUpdate=w}function Ka(h){return h.isMeshLambertMaterial||h.isMeshToonMaterial||h.isMeshPhongMaterial||h.isMeshStandardMaterial||h.isShadowMaterial||h.isShaderMaterial&&h.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(h,w,O){const N=v.get(h);N.__autoAllocateDepthBuffer=h.resolveDepthBuffer===!1,N.__autoAllocateDepthBuffer===!1&&(N.__useRenderToTexture=!1),v.get(h.texture).__webglTexture=w,v.get(h.depthTexture).__webglTexture=N.__autoAllocateDepthBuffer?void 0:O,N.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(h,w){const O=v.get(h);O.__webglFramebuffer=w,O.__useDefaultFramebuffer=w===void 0};const qa=P.createFramebuffer();this.setRenderTarget=function(h,w=0,O=0){B=h,Y=w,q=O;let N=null,y=!1,ce=!1;if(h){const se=v.get(h);if(se.__useDefaultFramebuffer!==void 0){ae.bindFramebuffer(P.FRAMEBUFFER,se.__webglFramebuffer),j.copy(h.viewport),ue.copy(h.scissor),ve=h.scissorTest,ae.viewport(j),ae.scissor(ue),ae.setScissorTest(ve),G=-1;return}else if(se.__webglFramebuffer===void 0)s.setupRenderTarget(h);else if(se.__hasExternalTextures)s.rebindTextures(h,v.get(h.texture).__webglTexture,v.get(h.depthTexture).__webglTexture);else if(h.depthBuffer){const Le=h.depthTexture;if(se.__boundDepthTexture!==Le){if(Le!==null&&v.has(Le)&&(h.width!==Le.image.width||h.height!==Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");s.setupDepthRenderbuffer(h)}}const _e=h.texture;(_e.isData3DTexture||_e.isDataArrayTexture||_e.isCompressedArrayTexture)&&(ce=!0);const Se=v.get(h).__webglFramebuffer;h.isWebGLCubeRenderTarget?(Array.isArray(Se[w])?N=Se[w][O]:N=Se[w],y=!0):h.samples>0&&s.useMultisampledRTT(h)===!1?N=v.get(h).__webglMultisampledFramebuffer:Array.isArray(Se)?N=Se[O]:N=Se,j.copy(h.viewport),ue.copy(h.scissor),ve=h.scissorTest}else j.copy(te).multiplyScalar(Ie).floor(),ue.copy(Me).multiplyScalar(Ie).floor(),ve=Ce;if(O!==0&&(N=qa),ae.bindFramebuffer(P.FRAMEBUFFER,N)&&ae.drawBuffers(h,N),ae.viewport(j),ae.scissor(ue),ae.setScissorTest(ve),y){const se=v.get(h.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+w,se.__webglTexture,O)}else if(ce){const se=w;for(let _e=0;_e<h.textures.length;_e++){const Se=v.get(h.textures[_e]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+_e,Se.__webglTexture,O,se)}}else if(h!==null&&O!==0){const se=v.get(h.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,se.__webglTexture,O)}G=-1},this.readRenderTargetPixels=function(h,w,O,N,y,ce,me,se=0){if(!(h&&h.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=v.get(h).__webglFramebuffer;if(h.isWebGLCubeRenderTarget&&me!==void 0&&(_e=_e[me]),_e){ae.bindFramebuffer(P.FRAMEBUFFER,_e);try{const Se=h.textures[se],Le=Se.format,De=Se.type;if(h.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+se),!$e.textureFormatReadable(Le)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$e.textureTypeReadable(De)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}w>=0&&w<=h.width-N&&O>=0&&O<=h.height-y&&P.readPixels(w,O,N,y,b.convert(Le),b.convert(De),ce)}finally{const Se=B!==null?v.get(B).__webglFramebuffer:null;ae.bindFramebuffer(P.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(h,w,O,N,y,ce,me,se=0){if(!(h&&h.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=v.get(h).__webglFramebuffer;if(h.isWebGLCubeRenderTarget&&me!==void 0&&(_e=_e[me]),_e)if(w>=0&&w<=h.width-N&&O>=0&&O<=h.height-y){ae.bindFramebuffer(P.FRAMEBUFFER,_e);const Se=h.textures[se],Le=Se.format,De=Se.type;if(h.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+se),!$e.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$e.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ee=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Ee),P.bufferData(P.PIXEL_PACK_BUFFER,ce.byteLength,P.STREAM_READ),P.readPixels(w,O,N,y,b.convert(Le),b.convert(De),0);const Ke=B!==null?v.get(B).__webglFramebuffer:null;ae.bindFramebuffer(P.FRAMEBUFFER,Ke);const st=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Qa(P,st,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Ee),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ce),P.deleteBuffer(Ee),P.deleteSync(st),ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(h,w=null,O=0){const N=Math.pow(2,-O),y=Math.floor(h.image.width*N),ce=Math.floor(h.image.height*N),me=w!==null?w.x:0,se=w!==null?w.y:0;s.setTexture2D(h,0),P.copyTexSubImage2D(P.TEXTURE_2D,O,0,0,me,se,y,ce),ae.unbindTexture()};const Ya=P.createFramebuffer(),Za=P.createFramebuffer();this.copyTextureToTexture=function(h,w,O=null,N=null,y=0,ce=0){let me,se,_e,Se,Le,De,Ee,Ke,st;const at=h.isCompressedTexture?h.mipmaps[ce]:h.image;if(O!==null)me=O.max.x-O.min.x,se=O.max.y-O.min.y,_e=O.isBox3?O.max.z-O.min.z:1,Se=O.min.x,Le=O.min.y,De=O.isBox3?O.min.z:0;else{const ct=Math.pow(2,-y);me=Math.floor(at.width*ct),se=Math.floor(at.height*ct),h.isDataArrayTexture?_e=at.depth:h.isData3DTexture?_e=Math.floor(at.depth*ct):_e=1,Se=0,Le=0,De=0}N!==null?(Ee=N.x,Ke=N.y,st=N.z):(Ee=0,Ke=0,st=0);const qe=b.convert(w.format),ht=b.convert(w.type);let pe;w.isData3DTexture?(s.setTexture3D(w,0),pe=P.TEXTURE_3D):w.isDataArrayTexture||w.isCompressedArrayTexture?(s.setTexture2DArray(w,0),pe=P.TEXTURE_2D_ARRAY):(s.setTexture2D(w,0),pe=P.TEXTURE_2D),ae.activeTexture(P.TEXTURE0),ae.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,w.flipY),ae.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),ae.pixelStorei(P.UNPACK_ALIGNMENT,w.unpackAlignment);const Et=ae.getParameter(P.UNPACK_ROW_LENGTH),Ge=ae.getParameter(P.UNPACK_IMAGE_HEIGHT),Mt=ae.getParameter(P.UNPACK_SKIP_PIXELS),bt=ae.getParameter(P.UNPACK_SKIP_ROWS),Wt=ae.getParameter(P.UNPACK_SKIP_IMAGES);ae.pixelStorei(P.UNPACK_ROW_LENGTH,at.width),ae.pixelStorei(P.UNPACK_IMAGE_HEIGHT,at.height),ae.pixelStorei(P.UNPACK_SKIP_PIXELS,Se),ae.pixelStorei(P.UNPACK_SKIP_ROWS,Le),ae.pixelStorei(P.UNPACK_SKIP_IMAGES,De);const nn=h.isDataArrayTexture||h.isData3DTexture,Ye=w.isDataArrayTexture||w.isData3DTexture;if(h.isDepthTexture){const ct=v.get(h),zt=v.get(w),je=v.get(ct.__renderTarget),Xt=v.get(zt.__renderTarget);ae.bindFramebuffer(P.READ_FRAMEBUFFER,je.__webglFramebuffer),ae.bindFramebuffer(P.DRAW_FRAMEBUFFER,Xt.__webglFramebuffer);for(let rn=0;rn<_e;rn++)nn&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,v.get(h).__webglTexture,y,De+rn),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,v.get(w).__webglTexture,ce,st+rn)),P.blitFramebuffer(Se,Le,me,se,Ee,Ke,me,se,P.DEPTH_BUFFER_BIT,P.NEAREST);ae.bindFramebuffer(P.READ_FRAMEBUFFER,null),ae.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(y!==0||h.isRenderTargetTexture||v.has(h)){const ct=v.get(h),zt=v.get(w);ae.bindFramebuffer(P.READ_FRAMEBUFFER,Ya),ae.bindFramebuffer(P.DRAW_FRAMEBUFFER,Za);for(let je=0;je<_e;je++)nn?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ct.__webglTexture,y,De+je):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ct.__webglTexture,y),Ye?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,zt.__webglTexture,ce,st+je):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,zt.__webglTexture,ce),y!==0?P.blitFramebuffer(Se,Le,me,se,Ee,Ke,me,se,P.COLOR_BUFFER_BIT,P.NEAREST):Ye?P.copyTexSubImage3D(pe,ce,Ee,Ke,st+je,Se,Le,me,se):P.copyTexSubImage2D(pe,ce,Ee,Ke,Se,Le,me,se);ae.bindFramebuffer(P.READ_FRAMEBUFFER,null),ae.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Ye?h.isDataTexture||h.isData3DTexture?P.texSubImage3D(pe,ce,Ee,Ke,st,me,se,_e,qe,ht,at.data):w.isCompressedArrayTexture?P.compressedTexSubImage3D(pe,ce,Ee,Ke,st,me,se,_e,qe,at.data):P.texSubImage3D(pe,ce,Ee,Ke,st,me,se,_e,qe,ht,at):h.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ce,Ee,Ke,me,se,qe,ht,at.data):h.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ce,Ee,Ke,at.width,at.height,qe,at.data):P.texSubImage2D(P.TEXTURE_2D,ce,Ee,Ke,me,se,qe,ht,at);ae.pixelStorei(P.UNPACK_ROW_LENGTH,Et),ae.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Ge),ae.pixelStorei(P.UNPACK_SKIP_PIXELS,Mt),ae.pixelStorei(P.UNPACK_SKIP_ROWS,bt),ae.pixelStorei(P.UNPACK_SKIP_IMAGES,Wt),ce===0&&w.generateMipmaps&&P.generateMipmap(pe),ae.unbindTexture()},this.initRenderTarget=function(h){v.get(h).__webglFramebuffer===void 0&&s.setupRenderTarget(h)},this.initTexture=function(h){h.isCubeTexture?s.setTextureCube(h,0):h.isData3DTexture?s.setTexture3D(h,0):h.isDataArrayTexture||h.isCompressedArrayTexture?s.setTexture2DArray(h,0):s.setTexture2D(h,0),ae.unbindTexture()},this.resetState=function(){Y=0,q=0,B=null,ae.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(n),t.unpackColorSpace=tt._getUnpackColorSpace()}}function gp(e,n=!1){const t=e[0].index!==null,i=new Set(Object.keys(e[0].attributes)),r=new Set(Object.keys(e[0].morphAttributes)),a={},o={},c=e[0].morphTargetsRelative,l=new mn;let d=0;for(let _=0;_<e.length;++_){const m=e[_];let u=0;if(t!==(m.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+_+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const S in m.attributes){if(!i.has(S))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+_+'. All geometries must have compatible attributes; make sure "'+S+'" attribute exists among all geometries, or in none of them.'),null;a[S]===void 0&&(a[S]=[]),a[S].push(m.attributes[S]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+_+". Make sure all geometries have the same number of attributes."),null;if(c!==m.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+_+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const S in m.morphAttributes){if(!r.has(S))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+_+".  .morphAttributes must be consistent throughout all geometries."),null;o[S]===void 0&&(o[S]=[]),o[S].push(m.morphAttributes[S])}if(n){let S;if(t)S=m.index.count;else if(m.attributes.position!==void 0)S=m.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+_+". The geometry must have either an index or a position attribute"),null;l.addGroup(d,S,_),d+=S}}if(t){let _=0;const m=[];for(let u=0;u<e.length;++u){const S=e[u].index;for(let A=0;A<S.count;++A)m.push(S.getX(A)+_);_+=e[u].attributes.position.count}l.setIndex(m)}for(const _ in a){const m=Xr(a[_]);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+_+" attribute."),null;l.setAttribute(_,m)}for(const _ in o){const m=o[_][0].length;if(m!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[_]=[];for(let u=0;u<m;++u){const S=[];for(let D=0;D<o[_].length;++D)S.push(o[_][D][u]);const A=Xr(S);if(!A)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+_+" morphAttribute."),null;l.morphAttributes[_].push(A)}}}return l}function Xr(e){let n,t,i,r=-1,a=0;for(let d=0;d<e.length;++d){const _=e[d];if(n===void 0&&(n=_.array.constructor),n!==_.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=_.itemSize),t!==_.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=_.normalized),i!==_.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=_.gpuType),r!==_.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;a+=_.count*t}const o=new n(a),c=new $t(o,t,i);let l=0;for(let d=0;d<e.length;++d){const _=e[d];if(_.isInterleavedBufferAttribute){const m=l/t;for(let u=0,S=_.count;u<S;u++)for(let A=0;A<t;A++){const D=_.getComponent(u,A);c.setComponent(u+m,A,D)}}else o.set(_.array,l);l+=_.count*t}return r!==void 0&&(c.gpuType=r),c}function vp(e,n=1e-4){n=Math.max(n,Number.EPSILON);const t={},i=e.getIndex(),r=e.getAttribute("position"),a=i?i.count:r.count;let o=0;const c=Object.keys(e.attributes),l={},d={},_=[],m=["getX","getY","getZ","getW"],u=["setX","setY","setZ","setW"];for(let x=0,M=c.length;x<M;x++){const E=c[x],L=e.attributes[E];l[E]=new L.constructor(new L.array.constructor(L.count*L.itemSize),L.itemSize,L.normalized);const T=e.morphAttributes[E];T&&(d[E]||(d[E]=[]),T.forEach((C,g)=>{const R=new C.array.constructor(C.count*C.itemSize);d[E][g]=new C.constructor(R,C.itemSize,C.normalized)}))}const S=n*.5,A=Math.log10(1/n),D=Math.pow(10,A),p=S*D;for(let x=0;x<a;x++){const M=i?i.getX(x):x;let E="";for(let L=0,T=c.length;L<T;L++){const C=c[L],g=e.getAttribute(C),R=g.itemSize;for(let F=0;F<R;F++)E+=`${~~(g[m[F]](M)*D+p)},`}if(E in t)_.push(t[E]);else{for(let L=0,T=c.length;L<T;L++){const C=c[L],g=e.getAttribute(C),R=e.morphAttributes[C],F=g.itemSize,U=l[C],V=d[C];for(let Y=0;Y<F;Y++){const q=m[Y],B=u[Y];if(U[B](o,g[q](M)),R)for(let G=0,H=R.length;G<H;G++)V[G][B](o,R[G][q](M))}}t[E]=o,_.push(o),o++}}const f=e.clone();for(const x in e.attributes){const M=l[x];if(f.setAttribute(x,new M.constructor(M.array.slice(0,o*M.itemSize),M.itemSize,M.normalized)),x in d)for(let E=0;E<d[x].length;E++){const L=d[x][E];f.morphAttributes[x][E]=new L.constructor(L.array.slice(0,o*L.itemSize),L.itemSize,L.normalized)}}return f.setIndex(_),f}function Kr(e,n){if(n===us)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),e;if(n===pi||n===Ta){let t=e.getIndex();if(t===null){const o=[],c=e.getAttribute("position");if(c!==void 0){for(let l=0;l<c.count;l++)o.push(l);e.setIndex(o),t=e.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),e}const i=t.count-2,r=[];if(n===pi)for(let o=1;o<=i;o++)r.push(t.getX(0)),r.push(t.getX(o)),r.push(t.getX(o+1));else for(let o=0;o<i;o++)o%2===0?(r.push(t.getX(o)),r.push(t.getX(o+1)),r.push(t.getX(o+2))):(r.push(t.getX(o+2)),r.push(t.getX(o+1)),r.push(t.getX(o)));r.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const a=e.clone();return a.setIndex(r),a.clearGroups(),a}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",n),e}function Ba(e){const n=new Map,t=new Map,i=e.clone();return Ga(e,i,function(r,a){n.set(a,r),t.set(r,a)}),i.traverse(function(r){if(!r.isSkinnedMesh)return;const a=r,o=n.get(r),c=o.skeleton.bones;a.skeleton=o.skeleton.clone(),a.bindMatrix.copy(o.bindMatrix),a.skeleton.bones=c.map(function(l){return t.get(l)}),a.bind(a.skeleton,a.bindMatrix)}),i}function Ga(e,n,t){t(e,n);for(let i=0;i<e.children.length;i++)Ga(e.children[i],n.children[i],t)}class Dd extends ds{constructor(n){super(n),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Od(t)}),this.register(function(t){return new Bd(t)}),this.register(function(t){return new qd(t)}),this.register(function(t){return new Yd(t)}),this.register(function(t){return new Zd(t)}),this.register(function(t){return new Hd(t)}),this.register(function(t){return new Vd(t)}),this.register(function(t){return new kd(t)}),this.register(function(t){return new Wd(t)}),this.register(function(t){return new Fd(t)}),this.register(function(t){return new zd(t)}),this.register(function(t){return new Gd(t)}),this.register(function(t){return new Kd(t)}),this.register(function(t){return new Xd(t)}),this.register(function(t){return new Nd(t)}),this.register(function(t){return new qr(t,Ne.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new qr(t,Ne.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new $d(t)})}load(n,t,i,r){const a=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const d=Rn.extractUrlBase(n);o=Rn.resolveURL(d,this.path)}else o=Rn.extractUrlBase(n);this.manager.itemStart(n);const c=function(d){r?r(d):console.error(d),a.manager.itemError(n),a.manager.itemEnd(n)},l=new Aa(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(n,function(d){try{a.parse(d,o,function(_){t(_),a.manager.itemEnd(n)},c)}catch(_){c(_)}},i,c)}setDRACOLoader(n){return this.dracoLoader=n,this}setKTX2Loader(n){return this.ktx2Loader=n,this}setMeshoptDecoder(n){return this.meshoptDecoder=n,this}register(n){return this.pluginCallbacks.indexOf(n)===-1&&this.pluginCallbacks.push(n),this}unregister(n){return this.pluginCallbacks.indexOf(n)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(n),1),this}parse(n,t,i,r){let a;const o={},c={},l=new TextDecoder;if(typeof n=="string")a=JSON.parse(n);else if(n instanceof ArrayBuffer)if(l.decode(new Uint8Array(n,0,4))===Ha){try{o[Ne.KHR_BINARY_GLTF]=new jd(n)}catch(m){r&&r(m);return}a=JSON.parse(o[Ne.KHR_BINARY_GLTF].content)}else a=JSON.parse(l.decode(n));else a=n;if(a.asset===void 0||a.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const d=new fp(a,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});d.fileLoader.setRequestHeader(this.requestHeader);for(let _=0;_<this.pluginCallbacks.length;_++){const m=this.pluginCallbacks[_](d);m.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),c[m.name]=m,o[m.name]=!0}if(a.extensionsUsed)for(let _=0;_<a.extensionsUsed.length;++_){const m=a.extensionsUsed[_],u=a.extensionsRequired||[];switch(m){case Ne.KHR_MATERIALS_UNLIT:o[m]=new yd;break;case Ne.KHR_DRACO_MESH_COMPRESSION:o[m]=new Qd(a,this.dracoLoader);break;case Ne.KHR_TEXTURE_TRANSFORM:o[m]=new Jd;break;case Ne.KHR_MESH_QUANTIZATION:o[m]=new ep;break;default:u.indexOf(m)>=0&&c[m]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+m+'".')}}d.setExtensions(o),d.setPlugins(c),d.parse(i,r)}parseAsync(n,t){const i=this;return new Promise(function(r,a){i.parse(n,t,r,a)})}}function Id(){let e={};return{get:function(n){return e[n]},add:function(n,t){e[n]=t},remove:function(n){delete e[n]},removeAll:function(){e={}}}}function lt(e,n,t){const i=e.json.materials[n];return i.extensions&&i.extensions[t]?i.extensions[t]:null}const Ne={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Nd{constructor(n){this.parser=n,this.name=Ne.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const n=this.parser,t=this.parser.json.nodes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i];a.extensions&&a.extensions[this.name]&&a.extensions[this.name].light!==void 0&&n._addNodeRef(this.cache,a.extensions[this.name].light)}}_loadLight(n){const t=this.parser,i="light:"+n;let r=t.cache.get(i);if(r)return r;const a=t.json,l=((a.extensions&&a.extensions[this.name]||{}).lights||[])[n];let d;const _=new Ve(16777215);l.color!==void 0&&_.setRGB(l.color[0],l.color[1],l.color[2],At);const m=l.range!==void 0?l.range:0;switch(l.type){case"directional":d=new ms(_),d.target.position.set(0,0,-1),d.add(d.target);break;case"point":d=new hs(_),d.distance=m;break;case"spot":d=new ps(_),d.distance=m,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,d.angle=l.spot.outerConeAngle,d.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,d.target.position.set(0,0,-1),d.add(d.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return d.position.set(0,0,0),Pt(d,l),l.intensity!==void 0&&(d.intensity=l.intensity),d.name=t.createUniqueName(l.name||"light_"+n),r=Promise.resolve(d),t.cache.add(i,r),r}getDependency(n,t){if(n==="light")return this._loadLight(t)}createNodeAttachment(n){const t=this,i=this.parser,a=i.json.nodes[n],c=(a.extensions&&a.extensions[this.name]||{}).light;return c===void 0?null:this._loadLight(c).then(function(l){return i._getNodeRef(t.cache,c,l)})}}class yd{constructor(){this.name=Ne.KHR_MATERIALS_UNLIT}getMaterialType(){return cn}extendParams(n,t,i){const r=[];n.color=new Ve(1,1,1),n.opacity=1;const a=t.pbrMetallicRoughness;if(a){if(Array.isArray(a.baseColorFactor)){const o=a.baseColorFactor;n.color.setRGB(o[0],o[1],o[2],At),n.opacity=o[3]}a.baseColorTexture!==void 0&&r.push(i.assignTexture(n,"map",a.baseColorTexture,fn))}return Promise.all(r)}}class Fd{constructor(n){this.parser=n,this.name=Ne.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(n,t){const i=lt(this.parser,n,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class Od{constructor(n){this.parser=n,this.name=Ne.KHR_MATERIALS_CLEARCOAT}getMaterialType(n){return lt(this.parser,n,this.name)!==null?Ft:null}extendMaterialParams(n,t){const i=lt(this.parser,n,this.name);if(i===null)return Promise.resolve();const r=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const a=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new _t(a,a)}return Promise.all(r)}}class Bd{constructor(n){this.parser=n,this.name=Ne.KHR_MATERIALS_DISPERSION}getMaterialType(n){return lt(this.parser,n,this.name)!==null?Ft:null}extendMaterialParams(n,t){const i=lt(this.parser,n,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class Gd{constructor(n){this.parser=n,this.name=Ne.KHR_MATERIALS_IRIDESCENCE}getMaterialType(n){return lt(this.parser,n,this.name)!==null?Ft:null}extendMaterialParams(n,t){const i=lt(this.parser,n,this.name);if(i===null)return Promise.resolve();const r=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(r)}}class Hd{constructor(n){this.parser=n,this.name=Ne.KHR_MATERIALS_SHEEN}getMaterialType(n){return lt(this.parser,n,this.name)!==null?Ft:null}extendMaterialParams(n,t){const i=lt(this.parser,n,this.name);if(i===null)return Promise.resolve();const r=[];if(t.sheenColor=new Ve(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){const a=i.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],At)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,fn)),i.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(r)}}class Vd{constructor(n){this.parser=n,this.name=Ne.KHR_MATERIALS_TRANSMISSION}getMaterialType(n){return lt(this.parser,n,this.name)!==null?Ft:null}extendMaterialParams(n,t){const i=lt(this.parser,n,this.name);if(i===null)return Promise.resolve();const r=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(r)}}class kd{constructor(n){this.parser=n,this.name=Ne.KHR_MATERIALS_VOLUME}getMaterialType(n){return lt(this.parser,n,this.name)!==null?Ft:null}extendMaterialParams(n,t){const i=lt(this.parser,n,this.name);if(i===null)return Promise.resolve();const r=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;const a=i.attenuationColor||[1,1,1];return t.attenuationColor=new Ve().setRGB(a[0],a[1],a[2],At),Promise.all(r)}}class Wd{constructor(n){this.parser=n,this.name=Ne.KHR_MATERIALS_IOR}getMaterialType(n){return lt(this.parser,n,this.name)!==null?Ft:null}extendMaterialParams(n,t){const i=lt(this.parser,n,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class zd{constructor(n){this.parser=n,this.name=Ne.KHR_MATERIALS_SPECULAR}getMaterialType(n){return lt(this.parser,n,this.name)!==null?Ft:null}extendMaterialParams(n,t){const i=lt(this.parser,n,this.name);if(i===null)return Promise.resolve();const r=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));const a=i.specularColorFactor||[1,1,1];return t.specularColor=new Ve().setRGB(a[0],a[1],a[2],At),i.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,fn)),Promise.all(r)}}class Xd{constructor(n){this.parser=n,this.name=Ne.EXT_MATERIALS_BUMP}getMaterialType(n){return lt(this.parser,n,this.name)!==null?Ft:null}extendMaterialParams(n,t){const i=lt(this.parser,n,this.name);if(i===null)return Promise.resolve();const r=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(r)}}class Kd{constructor(n){this.parser=n,this.name=Ne.KHR_MATERIALS_ANISOTROPY}getMaterialType(n){return lt(this.parser,n,this.name)!==null?Ft:null}extendMaterialParams(n,t){const i=lt(this.parser,n,this.name);if(i===null)return Promise.resolve();const r=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(r)}}class qd{constructor(n){this.parser=n,this.name=Ne.KHR_TEXTURE_BASISU}loadTexture(n){const t=this.parser,i=t.json,r=i.textures[n];if(!r.extensions||!r.extensions[this.name])return null;const a=r.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(n,a.source,o)}}class Yd{constructor(n){this.parser=n,this.name=Ne.EXT_TEXTURE_WEBP}loadTexture(n){const t=this.name,i=this.parser,r=i.json,a=r.textures[n];if(!a.extensions||!a.extensions[t])return null;const o=a.extensions[t],c=r.images[o.source];let l=i.textureLoader;if(c.uri){const d=i.options.manager.getHandler(c.uri);d!==null&&(l=d)}return i.loadTextureImage(n,o.source,l)}}class Zd{constructor(n){this.parser=n,this.name=Ne.EXT_TEXTURE_AVIF}loadTexture(n){const t=this.name,i=this.parser,r=i.json,a=r.textures[n];if(!a.extensions||!a.extensions[t])return null;const o=a.extensions[t],c=r.images[o.source];let l=i.textureLoader;if(c.uri){const d=i.options.manager.getHandler(c.uri);d!==null&&(l=d)}return i.loadTextureImage(n,o.source,l)}}class qr{constructor(n,t){this.name=t,this.parser=n}loadBufferView(n){const t=this.parser.json,i=t.bufferViews[n];if(i.extensions&&i.extensions[this.name]){const r=i.extensions[this.name],a=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return a.then(function(c){const l=r.byteOffset||0,d=r.byteLength||0,_=r.count,m=r.byteStride,u=new Uint8Array(c,l,d);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(_,m,u,r.mode,r.filter).then(function(S){return S.buffer}):o.ready.then(function(){const S=new ArrayBuffer(_*m);return o.decodeGltfBuffer(new Uint8Array(S),_,m,u,r.mode,r.filter),S})})}else return null}}class $d{constructor(n){this.name=Ne.EXT_MESH_GPU_INSTANCING,this.parser=n}createNodeMesh(n){const t=this.parser.json,i=t.nodes[n];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const r=t.meshes[i.mesh];for(const d of r.primitives)if(d.mode!==Tt.TRIANGLES&&d.mode!==Tt.TRIANGLE_STRIP&&d.mode!==Tt.TRIANGLE_FAN&&d.mode!==void 0)return null;const o=i.extensions[this.name].attributes,c=[],l={};for(const d in o)c.push(this.parser.getDependency("accessor",o[d]).then(_=>(l[d]=_,l[d])));return c.length<1?null:(c.push(this.parser.createNodeMesh(n)),Promise.all(c).then(d=>{const _=d.pop(),m=_.isGroup?_.children:[_],u=d[0].count,S=[];for(const A of m){const D=new Nt,p=new be,f=new Bt,x=new be(1,1,1),M=new _s(A.geometry,A.material,u);for(let E=0;E<u;E++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,E),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,E),l.SCALE&&x.fromBufferAttribute(l.SCALE,E),M.setMatrixAt(E,D.compose(p,f,x));for(const E in l)if(E==="_COLOR_0"){const L=l[E];M.instanceColor=new gs(L.array,L.itemSize,L.normalized)}else E!=="TRANSLATION"&&E!=="ROTATION"&&E!=="SCALE"&&A.geometry.setAttribute(E,l[E]);Ra.prototype.copy.call(M,A),this.parser.assignFinalMaterial(M),S.push(M)}return _.isGroup?(_.clear(),_.add(...S),_):S[0]}))}}const Ha="glTF",En=12,Yr={JSON:1313821514,BIN:5130562};class jd{constructor(n){this.name=Ne.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(n,0,En),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(n.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ha)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-En,a=new DataView(n,En);let o=0;for(;o<r;){const c=a.getUint32(o,!0);o+=4;const l=a.getUint32(o,!0);if(o+=4,l===Yr.JSON){const d=new Uint8Array(n,En+o,c);this.content=i.decode(d)}else if(l===Yr.BIN){const d=En+o;this.body=n.slice(d,d+c)}o+=c}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Qd{constructor(n,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ne.KHR_DRACO_MESH_COMPRESSION,this.json=n,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(n,t){const i=this.json,r=this.dracoLoader,a=n.extensions[this.name].bufferView,o=n.extensions[this.name].attributes,c={},l={},d={};for(const _ in o){const m=_i[_]||_.toLowerCase();c[m]=o[_]}for(const _ in n.attributes){const m=_i[_]||_.toLowerCase();if(o[_]!==void 0){const u=i.accessors[n.attributes[_]],S=ln[u.componentType];d[m]=S.name,l[m]=u.normalized===!0}}return t.getDependency("bufferView",a).then(function(_){return new Promise(function(m,u){r.decodeDracoFile(_,function(S){for(const A in S.attributes){const D=S.attributes[A],p=l[A];p!==void 0&&(D.normalized=p)}m(S)},c,d,At,u)})})}}class Jd{constructor(){this.name=Ne.KHR_TEXTURE_TRANSFORM}extendTexture(n,t){return(t.texCoord===void 0||t.texCoord===n.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(n=n.clone(),t.texCoord!==void 0&&(n.channel=t.texCoord),t.offset!==void 0&&n.offset.fromArray(t.offset),t.rotation!==void 0&&(n.rotation=t.rotation),t.scale!==void 0&&n.repeat.fromArray(t.scale),n.needsUpdate=!0),n}}class ep{constructor(){this.name=Ne.KHR_MESH_QUANTIZATION}}class Va extends Ns{constructor(n,t,i,r){super(n,t,i,r)}copySampleValue_(n){const t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=n*r*3+r;for(let o=0;o!==r;o++)t[o]=i[a+o];return t}interpolate_(n,t,i,r){const a=this.resultBuffer,o=this.sampleValues,c=this.valueSize,l=c*2,d=c*3,_=r-t,m=(i-t)/_,u=m*m,S=u*m,A=n*d,D=A-d,p=-2*S+3*u,f=S-u,x=1-p,M=f-u+m;for(let E=0;E!==c;E++){const L=o[D+E+c],T=o[D+E+l]*_,C=o[A+E+c],g=o[A+E]*_;a[E]=x*L+M*T+p*C+f*g}return a}}const tp=new Bt;class np extends Va{interpolate_(n,t,i,r){const a=super.interpolate_(n,t,i,r);return tp.fromArray(a).normalize().toArray(a),a}}const Tt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ln={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Zr={9728:Ht,9729:mt,9984:ia,9985:In,9986:xn,9987:qt},$r={33071:Bn,33648:na,10497:Gn},si={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},_i={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Kt={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},ip={CUBICSPLINE:void 0,LINEAR:Pa,STEP:Ds},ci={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function rp(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new ba({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:un})),e.DefaultMaterial}function Jt(e,n,t){for(const i in t.extensions)e[i]===void 0&&(n.userData.gltfExtensions=n.userData.gltfExtensions||{},n.userData.gltfExtensions[i]=t.extensions[i])}function Pt(e,n){n.extras!==void 0&&(typeof n.extras=="object"?Object.assign(e.userData,n.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+n.extras))}function ap(e,n,t){let i=!1,r=!1,a=!1;for(let d=0,_=n.length;d<_;d++){const m=n[d];if(m.POSITION!==void 0&&(i=!0),m.NORMAL!==void 0&&(r=!0),m.COLOR_0!==void 0&&(a=!0),i&&r&&a)break}if(!i&&!r&&!a)return Promise.resolve(e);const o=[],c=[],l=[];for(let d=0,_=n.length;d<_;d++){const m=n[d];if(i){const u=m.POSITION!==void 0?t.getDependency("accessor",m.POSITION):e.attributes.position;o.push(u)}if(r){const u=m.NORMAL!==void 0?t.getDependency("accessor",m.NORMAL):e.attributes.normal;c.push(u)}if(a){const u=m.COLOR_0!==void 0?t.getDependency("accessor",m.COLOR_0):e.attributes.color;l.push(u)}}return Promise.all([Promise.all(o),Promise.all(c),Promise.all(l)]).then(function(d){const _=d[0],m=d[1],u=d[2];return i&&(e.morphAttributes.position=_),r&&(e.morphAttributes.normal=m),a&&(e.morphAttributes.color=u),e.morphTargetsRelative=!0,e})}function op(e,n){if(e.updateMorphTargets(),n.weights!==void 0)for(let t=0,i=n.weights.length;t<i;t++)e.morphTargetInfluences[t]=n.weights[t];if(n.extras&&Array.isArray(n.extras.targetNames)){const t=n.extras.targetNames;if(e.morphTargetInfluences.length===t.length){e.morphTargetDictionary={};for(let i=0,r=t.length;i<r;i++)e.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function sp(e){let n;const t=e.extensions&&e.extensions[Ne.KHR_DRACO_MESH_COMPRESSION];if(t?n="draco:"+t.bufferView+":"+t.indices+":"+li(t.attributes):n=e.indices+":"+li(e.attributes)+":"+e.mode,e.targets!==void 0)for(let i=0,r=e.targets.length;i<r;i++)n+=":"+li(e.targets[i]);return n}function li(e){let n="";const t=Object.keys(e).sort();for(let i=0,r=t.length;i<r;i++)n+=t[i]+":"+e[t[i]]+";";return n}function gi(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function cp(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?"image/jpeg":e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?"image/webp":e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const lp=new Nt;class fp{constructor(n={},t={}){this.json=n,this.extensions={},this.plugins={},this.options=t,this.cache=new Id,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,r=-1,a=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const c=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(c)===!0;const l=c.match(/Version\/(\d+)/);r=i&&l?parseInt(l[1],10):-1,a=c.indexOf("Firefox")>-1,o=a?c.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&r<17||a&&o<98?this.textureLoader=new vs(this.options.manager):this.textureLoader=new Ss(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Aa(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(n){this.extensions=n}setPlugins(n){this.plugins=n}parse(n,t){const i=this,r=this.json,a=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){const c={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:i,userData:{}};return Jt(a,c,r),Pt(c,r),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(c)})).then(function(){for(const l of c.scenes)l.updateMatrixWorld();n(c)})}).catch(t)}_markDefs(){const n=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let r=0,a=t.length;r<a;r++){const o=t[r].joints;for(let c=0,l=o.length;c<l;c++)n[o[c]].isBone=!0}for(let r=0,a=n.length;r<a;r++){const o=n[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(n,t){t!==void 0&&(n.refs[t]===void 0&&(n.refs[t]=n.uses[t]=0),n.refs[t]++)}_getNodeRef(n,t,i){if(n.refs[t]<=1)return i;const r=i.clone(),a=(o,c)=>{const l=this.associations.get(o);l!=null&&this.associations.set(c,l);for(const[d,_]of o.children.entries())a(_,c.children[d])};return a(i,r),r.name+="_instance_"+n.uses[t]++,r}_invokeOne(n){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const r=n(t[i]);if(r)return r}return null}_invokeAll(n){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let r=0;r<t.length;r++){const a=n(t[r]);a&&i.push(a)}return i}getDependency(n,t){const i=n+":"+t;let r=this.cache.get(i);if(!r){switch(n){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(a){return a.loadNode&&a.loadNode(t)});break;case"mesh":r=this._invokeOne(function(a){return a.loadMesh&&a.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(a){return a.loadBufferView&&a.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(a){return a.loadMaterial&&a.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(a){return a.loadTexture&&a.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(a){return a.loadAnimation&&a.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(a){return a!=this&&a.getDependency&&a.getDependency(n,t)}),!r)throw new Error("Unknown type: "+n);break}this.cache.add(i,r)}return r}getDependencies(n){let t=this.cache.get(n);if(!t){const i=this,r=this.json[n+(n==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(a,o){return i.getDependency(n,o)})),this.cache.add(n,t)}return t}loadBuffer(n){const t=this.json.buffers[n],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&n===0)return Promise.resolve(this.extensions[Ne.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(a,o){i.load(Rn.resolveURL(t.uri,r.path),a,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(n){const t=this.json.bufferViews[n];return this.getDependency("buffer",t.buffer).then(function(i){const r=t.byteLength||0,a=t.byteOffset||0;return i.slice(a,a+r)})}loadAccessor(n){const t=this,i=this.json,r=this.json.accessors[n];if(r.bufferView===void 0&&r.sparse===void 0){const o=si[r.type],c=ln[r.componentType],l=r.normalized===!0,d=new c(r.count*o);return Promise.resolve(new $t(d,o,l))}const a=[];return r.bufferView!==void 0?a.push(this.getDependency("bufferView",r.bufferView)):a.push(null),r.sparse!==void 0&&(a.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),a.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(a).then(function(o){const c=o[0],l=si[r.type],d=ln[r.componentType],_=d.BYTES_PER_ELEMENT,m=_*l,u=r.byteOffset||0,S=r.bufferView!==void 0?i.bufferViews[r.bufferView].byteStride:void 0,A=r.normalized===!0;let D,p;if(S&&S!==m){const f=Math.floor(u/S),x="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+f+":"+r.count;let M=t.cache.get(x);M||(D=new d(c,f*S,r.count*S/_),M=new Es(D,S/_),t.cache.add(x,M)),p=new Is(M,l,u%S/_,A)}else c===null?D=new d(r.count*l):D=new d(c,u,r.count*l),p=new $t(D,l,A);if(r.sparse!==void 0){const f=si.SCALAR,x=ln[r.sparse.indices.componentType],M=r.sparse.indices.byteOffset||0,E=r.sparse.values.byteOffset||0,L=new x(o[1],M,r.sparse.count*f),T=new d(o[2],E,r.sparse.count*l);c!==null&&(p=new $t(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let C=0,g=L.length;C<g;C++){const R=L[C];if(p.setX(R,T[C*l]),l>=2&&p.setY(R,T[C*l+1]),l>=3&&p.setZ(R,T[C*l+2]),l>=4&&p.setW(R,T[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=A}return p})}loadTexture(n){const t=this.json,i=this.options,a=t.textures[n].source,o=t.images[a];let c=this.textureLoader;if(o.uri){const l=i.manager.getHandler(o.uri);l!==null&&(c=l)}return this.loadTextureImage(n,a,c)}loadTextureImage(n,t,i){const r=this,a=this.json,o=a.textures[n],c=a.images[t],l=(c.uri||c.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const d=this.loadImageSource(t,i).then(function(_){_.flipY=!1,_.name=o.name||c.name||"",_.name===""&&typeof c.uri=="string"&&c.uri.startsWith("data:image/")===!1&&(_.name=c.uri);const u=(a.samplers||{})[o.sampler]||{};return _.magFilter=Zr[u.magFilter]||mt,_.minFilter=Zr[u.minFilter]||qt,_.wrapS=$r[u.wrapS]||Gn,_.wrapT=$r[u.wrapT]||Gn,_.generateMipmaps=!_.isCompressedTexture&&_.minFilter!==Ht&&_.minFilter!==mt,r.associations.set(_,{textures:n}),_}).catch(function(){return null});return this.textureCache[l]=d,d}loadImageSource(n,t){const i=this,r=this.json,a=this.options;if(this.sourceCache[n]!==void 0)return this.sourceCache[n].then(m=>m.clone());const o=r.images[n],c=self.URL||self.webkitURL;let l=o.uri||"",d=!1;if(o.bufferView!==void 0)l=i.getDependency("bufferView",o.bufferView).then(function(m){d=!0;const u=new Blob([m],{type:o.mimeType});return l=c.createObjectURL(u),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+n+" is missing URI and bufferView");const _=Promise.resolve(l).then(function(m){return new Promise(function(u,S){let A=u;t.isImageBitmapLoader===!0&&(A=function(D){const p=new Vn(D);p.needsUpdate=!0,u(p)}),t.load(Rn.resolveURL(m,a.path),A,void 0,S)})}).then(function(m){return d===!0&&c.revokeObjectURL(l),Pt(m,o),m.userData.mimeType=o.mimeType||cp(o.uri),m}).catch(function(m){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),m});return this.sourceCache[n]=_,_}assignTexture(n,t,i,r){const a=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),a.extensions[Ne.KHR_TEXTURE_TRANSFORM]){const c=i.extensions!==void 0?i.extensions[Ne.KHR_TEXTURE_TRANSFORM]:void 0;if(c){const l=a.associations.get(o);o=a.extensions[Ne.KHR_TEXTURE_TRANSFORM].extendTexture(o,c),a.associations.set(o,l)}}return r!==void 0&&(o.colorSpace=r),n[t]=o,o})}assignFinalMaterial(n){const t=n.geometry;let i=n.material;const r=t.attributes.tangent===void 0,a=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(n.isPoints){const c="PointsMaterial:"+i.uuid;let l=this.cache.get(c);l||(l=new xs,ei.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(c,l)),i=l}else if(n.isLine){const c="LineBasicMaterial:"+i.uuid;let l=this.cache.get(c);l||(l=new Ms,ei.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(c,l)),i=l}if(r||a||o){let c="ClonedMaterial:"+i.uuid+":";r&&(c+="derivative-tangents:"),a&&(c+="vertex-colors:"),o&&(c+="flat-shading:");let l=this.cache.get(c);l||(l=i.clone(),a&&(l.vertexColors=!0),o&&(l.flatShading=!0),r&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(c,l),this.associations.set(l,this.associations.get(i))),i=l}n.material=i}getMaterialType(){return ba}loadMaterial(n){const t=this,i=this.json,r=this.extensions,a=i.materials[n];let o;const c={},l=a.extensions||{},d=[];if(l[Ne.KHR_MATERIALS_UNLIT]){const m=r[Ne.KHR_MATERIALS_UNLIT];o=m.getMaterialType(),d.push(m.extendParams(c,a,t))}else{const m=a.pbrMetallicRoughness||{};if(c.color=new Ve(1,1,1),c.opacity=1,Array.isArray(m.baseColorFactor)){const u=m.baseColorFactor;c.color.setRGB(u[0],u[1],u[2],At),c.opacity=u[3]}m.baseColorTexture!==void 0&&d.push(t.assignTexture(c,"map",m.baseColorTexture,fn)),c.metalness=m.metallicFactor!==void 0?m.metallicFactor:1,c.roughness=m.roughnessFactor!==void 0?m.roughnessFactor:1,m.metallicRoughnessTexture!==void 0&&(d.push(t.assignTexture(c,"metalnessMap",m.metallicRoughnessTexture)),d.push(t.assignTexture(c,"roughnessMap",m.metallicRoughnessTexture))),o=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(n)}),d.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(n,c)})))}a.doubleSided===!0&&(c.side=Ut);const _=a.alphaMode||ci.OPAQUE;if(_===ci.BLEND?(c.transparent=!0,c.depthWrite=!1):(c.transparent=!1,_===ci.MASK&&(c.alphaTest=a.alphaCutoff!==void 0?a.alphaCutoff:.5)),a.normalTexture!==void 0&&o!==cn&&(d.push(t.assignTexture(c,"normalMap",a.normalTexture)),c.normalScale=new _t(1,1),a.normalTexture.scale!==void 0)){const m=a.normalTexture.scale;c.normalScale.set(m,m)}if(a.occlusionTexture!==void 0&&o!==cn&&(d.push(t.assignTexture(c,"aoMap",a.occlusionTexture)),a.occlusionTexture.strength!==void 0&&(c.aoMapIntensity=a.occlusionTexture.strength)),a.emissiveFactor!==void 0&&o!==cn){const m=a.emissiveFactor;c.emissive=new Ve().setRGB(m[0],m[1],m[2],At)}return a.emissiveTexture!==void 0&&o!==cn&&d.push(t.assignTexture(c,"emissiveMap",a.emissiveTexture,fn)),Promise.all(d).then(function(){const m=new o(c);return a.name&&(m.name=a.name),Pt(m,a),t.associations.set(m,{materials:n}),a.extensions&&Jt(r,m,a),m})}createUniqueName(n){const t=Ts.sanitizeNodeName(n||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(n){const t=this,i=this.extensions,r=this.primitiveCache;function a(c){return i[Ne.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(c,t).then(function(l){return jr(l,c,t)})}const o=[];for(let c=0,l=n.length;c<l;c++){const d=n[c],_=sp(d),m=r[_];if(m)o.push(m.promise);else{let u;d.extensions&&d.extensions[Ne.KHR_DRACO_MESH_COMPRESSION]?u=a(d):u=jr(new mn,d,t),r[_]={primitive:d,promise:u},o.push(u)}}return Promise.all(o)}loadMesh(n){const t=this,i=this.json,r=this.extensions,a=i.meshes[n],o=a.primitives,c=[];for(let l=0,d=o.length;l<d;l++){const _=o[l].material===void 0?rp(this.cache):this.getDependency("material",o[l].material);c.push(_)}return c.push(t.loadGeometries(o)),Promise.all(c).then(function(l){const d=l.slice(0,l.length-1),_=l[l.length-1],m=[];for(let S=0,A=_.length;S<A;S++){const D=_[S],p=o[S];let f;const x=d[S];if(p.mode===Tt.TRIANGLES||p.mode===Tt.TRIANGLE_STRIP||p.mode===Tt.TRIANGLE_FAN||p.mode===void 0)f=a.isSkinnedMesh===!0?new As(D,x):new yt(D,x),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),p.mode===Tt.TRIANGLE_STRIP?f.geometry=Kr(f.geometry,Ta):p.mode===Tt.TRIANGLE_FAN&&(f.geometry=Kr(f.geometry,pi));else if(p.mode===Tt.LINES)f=new Rs(D,x);else if(p.mode===Tt.LINE_STRIP)f=new bs(D,x);else if(p.mode===Tt.LINE_LOOP)f=new Cs(D,x);else if(p.mode===Tt.POINTS)f=new Ps(D,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(f.geometry.morphAttributes).length>0&&op(f,a),f.name=t.createUniqueName(a.name||"mesh_"+n),Pt(f,a),p.extensions&&Jt(r,f,p),t.assignFinalMaterial(f),m.push(f)}for(let S=0,A=m.length;S<A;S++)t.associations.set(m[S],{meshes:n,primitives:S});if(m.length===1)return a.extensions&&Jt(r,m[0],a),m[0];const u=new Fn;a.extensions&&Jt(r,u,a),t.associations.set(u,{meshes:n});for(let S=0,A=m.length;S<A;S++)u.add(m[S]);return u})}loadCamera(n){let t;const i=this.json.cameras[n],r=i[i.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new An(Ca.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):i.type==="orthographic"&&(t=new Si(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Pt(t,i),Promise.resolve(t)}loadSkin(n){const t=this.json.skins[n],i=[];for(let r=0,a=t.joints.length;r<a;r++)i.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(r){const a=r.pop(),o=r,c=[],l=[];for(let d=0,_=o.length;d<_;d++){const m=o[d];if(m){c.push(m);const u=new Nt;a!==null&&u.fromArray(a.array,d*16),l.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[d])}return new Ls(c,l)})}loadAnimation(n){const t=this.json,i=this,r=t.animations[n],a=r.name?r.name:"animation_"+n,o=[],c=[],l=[],d=[],_=[];for(let m=0,u=r.channels.length;m<u;m++){const S=r.channels[m],A=r.samplers[S.sampler],D=S.target,p=D.node,f=r.parameters!==void 0?r.parameters[A.input]:A.input,x=r.parameters!==void 0?r.parameters[A.output]:A.output;D.node!==void 0&&(o.push(this.getDependency("node",p)),c.push(this.getDependency("accessor",f)),l.push(this.getDependency("accessor",x)),d.push(A),_.push(D))}return Promise.all([Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(d),Promise.all(_)]).then(function(m){const u=m[0],S=m[1],A=m[2],D=m[3],p=m[4],f=[];for(let M=0,E=u.length;M<E;M++){const L=u[M],T=S[M],C=A[M],g=D[M],R=p[M];if(L===void 0)continue;L.updateMatrix&&L.updateMatrix();const F=i._createAnimationTracks(L,T,C,g,R);if(F)for(let U=0;U<F.length;U++)f.push(F[U])}const x=new ws(a,void 0,f);return Pt(x,r),x})}createNodeMesh(n){const t=this.json,i=this,r=t.nodes[n];return r.mesh===void 0?null:i.getDependency("mesh",r.mesh).then(function(a){const o=i._getNodeRef(i.meshCache,r.mesh,a);return r.weights!==void 0&&o.traverse(function(c){if(c.isMesh)for(let l=0,d=r.weights.length;l<d;l++)c.morphTargetInfluences[l]=r.weights[l]}),o})}loadNode(n){const t=this.json,i=this,r=t.nodes[n],a=i._loadNodeShallow(n),o=[],c=r.children||[];for(let d=0,_=c.length;d<_;d++)o.push(i.getDependency("node",c[d]));const l=r.skin===void 0?Promise.resolve(null):i.getDependency("skin",r.skin);return Promise.all([a,Promise.all(o),l]).then(function(d){const _=d[0],m=d[1],u=d[2];u!==null&&_.traverse(function(S){S.isSkinnedMesh&&S.bind(u,lp)});for(let S=0,A=m.length;S<A;S++)_.add(m[S]);if(_.userData.pivot!==void 0&&m.length>0){const S=_.userData.pivot,A=m[0];_.pivot=new be().fromArray(S),_.position.x-=S[0],_.position.y-=S[1],_.position.z-=S[2],A.position.set(0,0,0),delete _.userData.pivot}return _})}_loadNodeShallow(n){const t=this.json,i=this.extensions,r=this;if(this.nodeCache[n]!==void 0)return this.nodeCache[n];const a=t.nodes[n],o=a.name?r.createUniqueName(a.name):"",c=[],l=r._invokeOne(function(d){return d.createNodeMesh&&d.createNodeMesh(n)});return l&&c.push(l),a.camera!==void 0&&c.push(r.getDependency("camera",a.camera).then(function(d){return r._getNodeRef(r.cameraCache,a.camera,d)})),r._invokeAll(function(d){return d.createNodeAttachment&&d.createNodeAttachment(n)}).forEach(function(d){c.push(d)}),this.nodeCache[n]=Promise.all(c).then(function(d){let _;if(a.isBone===!0?_=new Us:d.length>1?_=new Fn:d.length===1?_=d[0]:_=new Ra,_!==d[0])for(let m=0,u=d.length;m<u;m++)_.add(d[m]);if(a.name&&(_.userData.name=a.name,_.name=o),Pt(_,a),a.extensions&&Jt(i,_,a),a.matrix!==void 0){const m=new Nt;m.fromArray(a.matrix),_.applyMatrix4(m)}else a.translation!==void 0&&_.position.fromArray(a.translation),a.rotation!==void 0&&_.quaternion.fromArray(a.rotation),a.scale!==void 0&&_.scale.fromArray(a.scale);if(!r.associations.has(_))r.associations.set(_,{});else if(a.mesh!==void 0&&r.meshCache.refs[a.mesh]>1){const m=r.associations.get(_);r.associations.set(_,{...m})}return r.associations.get(_).nodes=n,_}),this.nodeCache[n]}loadScene(n){const t=this.extensions,i=this.json.scenes[n],r=this,a=new Fn;i.name&&(a.name=r.createUniqueName(i.name)),Pt(a,i),i.extensions&&Jt(t,a,i);const o=i.nodes||[],c=[];for(let l=0,d=o.length;l<d;l++)c.push(r.getDependency("node",o[l]));return Promise.all(c).then(function(l){for(let _=0,m=l.length;_<m;_++){const u=l[_];u.parent!==null?a.add(Ba(u)):a.add(u)}const d=_=>{const m=new Map;for(const[u,S]of r.associations)(u instanceof ei||u instanceof Vn)&&m.set(u,S);return _.traverse(u=>{const S=r.associations.get(u);S!=null&&m.set(u,S)}),m};return r.associations=d(a),a})}_createAnimationTracks(n,t,i,r,a){const o=[],c=n.name?n.name:n.uuid,l=[];function d(S){S.morphTargetInfluences&&l.push(S.name?S.name:S.uuid)}Kt[a.path]===Kt.weights?(d(n),n.isGroup&&n.children.forEach(d)):l.push(c);let _;switch(Kt[a.path]){case Kt.weights:_=Er;break;case Kt.rotation:_=xr;break;case Kt.translation:case Kt.scale:_=Sr;break;default:switch(i.itemSize){case 1:_=Er;break;case 2:case 3:default:_=Sr;break}break}const m=r.interpolation!==void 0?ip[r.interpolation]:Pa,u=this._getArrayFromAccessor(i);for(let S=0,A=l.length;S<A;S++){const D=new _(l[S]+"."+Kt[a.path],t.array,u,m);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(D),o.push(D)}return o}_getArrayFromAccessor(n){let t=n.array;if(n.normalized){const i=gi(t.constructor),r=new Float32Array(t.length);for(let a=0,o=t.length;a<o;a++)r[a]=t[a]*i;t=r}return t}_createCubicSplineTrackInterpolant(n){n.createInterpolant=function(i){const r=this instanceof xr?np:Va;return new r(this.times,this.values,this.getValueSize()/3,i)},n.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function up(e,n,t){const i=n.attributes,r=new La;if(i.POSITION!==void 0){const c=t.json.accessors[i.POSITION],l=c.min,d=c.max;if(l!==void 0&&d!==void 0){if(r.set(new be(l[0],l[1],l[2]),new be(d[0],d[1],d[2])),c.normalized){const _=gi(ln[c.componentType]);r.min.multiplyScalar(_),r.max.multiplyScalar(_)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const a=n.targets;if(a!==void 0){const c=new be,l=new be;for(let d=0,_=a.length;d<_;d++){const m=a[d];if(m.POSITION!==void 0){const u=t.json.accessors[m.POSITION],S=u.min,A=u.max;if(S!==void 0&&A!==void 0){if(l.setX(Math.max(Math.abs(S[0]),Math.abs(A[0]))),l.setY(Math.max(Math.abs(S[1]),Math.abs(A[1]))),l.setZ(Math.max(Math.abs(S[2]),Math.abs(A[2]))),u.normalized){const D=gi(ln[u.componentType]);l.multiplyScalar(D)}c.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(c)}e.boundingBox=r;const o=new ys;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,e.boundingSphere=o}function jr(e,n,t){const i=n.attributes,r=[];function a(o,c){return t.getDependency("accessor",o).then(function(l){e.setAttribute(c,l)})}for(const o in i){const c=_i[o]||o.toLowerCase();c in e.attributes||r.push(a(i[o],c))}if(n.indices!==void 0&&!e.index){const o=t.getDependency("accessor",n.indices).then(function(c){e.setIndex(c)});r.push(o)}return tt.workingColorSpace!==At&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${tt.workingColorSpace}" not supported.`),Pt(e,n),up(e,n,t),Promise.all(r).then(function(){return n.targets!==void 0?ap(e,n.targets,t):e})}const Ti={};let Qr;function dp(){return Qr??(Qr=Promise.all(["male","female"].map(async e=>{const n=await new Dd().loadAsync(`./models/humans/${e}.glb`);n.scene.traverse(t=>{const i=t;if(i.isMesh)for(const r of Array.isArray(i.material)?i.material:[i.material])for(const a of Object.values(r))a instanceof Vn&&(a.userData.shared=!0)}),Ti[e]=n.scene})).then(()=>{}).catch(e=>{Qr=void 0,console.warn("[characters] Local human model unavailable; keeping fallback",e)}))}function pp(e="male"){return!!Ti[e]}const Jr=new Bt,ea=new Bt;function vi(e,n,t,i){return Jr.setFromEuler(t),ea.copy(n).invert(),i.copy(e).multiply(ea).multiply(Jr).multiply(n).normalize()}function hp(e,n,t="male"){const i=Ti[t];if(!i)return;const r=Ba(i);r.name="human-visual";const a=new Map,o=e.userData.ownedMaterials,c=[];r.traverse(M=>{const E=M;if(!E.isMesh)return;E.geometry=E.geometry.clone();const L=T=>{let C=a.get(T);if(!C){C=T.clone();const g=C;g.roughness=.8,g.metalness=0,a.set(T,C),o==null||o.add(C)}return C};E.material=Array.isArray(E.material)?E.material.map(L):L(E.material),E.castShadow=E.receiveShadow=!0,E.frustumCulled=!1,E.morphTargetDictionary&&c.push(E)}),r.updateMatrixWorld(!0);const l=new La().setFromObject(r),_=1.8/(l.max.y-l.min.y);r.scale.multiplyScalar(_),r.position.y-=l.min.y*_;const m=r.position.y;r.updateMatrixWorld(!0);const u=["Spine","Head","LeftArm","RightArm","LeftForeArm","RightForeArm","LeftUpLeg","RightUpLeg","LeftLeg","RightLeg","LeftFoot","RightFoot"],S=[n.body,n.head,n.leftArm,n.rightArm,n.leftElbow,n.rightElbow,n.leftHip,n.rightHip,n.leftKnee,n.rightKnee,n.leftAnkle,n.rightAnkle],A=u.map((M,E)=>{const L=r.getObjectByName(M);return L?{bone:L,source:S[E],restLocal:L.quaternion.clone(),restWorld:L.getWorldQuaternion(new Bt)}:void 0}).filter(M=>M!==void 0);e.traverse(M=>{if(M.isLight&&(M.visible=!1),M.isMesh&&!M.userData.isFootRing){let E=M;for(;E&&E!==e&&!E.userData.personDynamicAccessory;)E=E.parent;E!=null&&E.userData.personDynamicAccessory||(M.visible=!1)}}),e.add(r);for(const M of n.props??[]){const E=r.getObjectByName(M.hand);if(!E)continue;const L=new Fn,T=e.getWorldQuaternion(new Bt);L.quaternion.copy(E.getWorldQuaternion(new Bt).invert().multiply(T)),L.scale.copy(e.getWorldScale(new be)).divide(E.getWorldScale(new be)),E.add(L),L.add(M.object)}const D=[];r.traverse(M=>{/^(Left|Right)Hand(Index|Middle|Ring|Pinky)[123]$/.test(M.name)&&D.push({bone:M,local:M.quaternion.clone(),world:e.getWorldQuaternion(new Bt).invert().multiply(M.getWorldQuaternion(new Bt)),sign:M.name.startsWith("Left")?-1:1})});const p=new Fs,f=(M,E)=>{var L;for(const T of c){const C=(L=T.morphTargetDictionary)==null?void 0:L[M];C!==void 0&&T.morphTargetInfluences&&(T.morphTargetInfluences[C]=Ca.clamp(E,0,1))}},x=()=>{var L,T;r.position.y=m+n.body.position.y-n.bodyRestY;for(const C of A)p.copy(C.source.rotation),vi(C.restLocal,C.restWorld,p,C.bone.quaternion);for(const C of D)p.set(0,0,C.sign*(((L=n.grip)==null?void 0:L.call(n))??0)),vi(C.local,C.world,p,C.bone.quaternion);f("eyeBlinkLeft",n.blinkLeft()),f("eyeBlinkRight",n.blinkRight()),f("jawOpen",n.mouthOpen()),f("mouthSmileLeft",n.smile()),f("mouthSmileRight",n.smile());const M=n.gazeX(),E=n.gazeY();f("eyeLookInLeft",Math.max(0,M)),f("eyeLookOutRight",Math.max(0,M)),f("eyeLookOutLeft",Math.max(0,-M)),f("eyeLookInRight",Math.max(0,-M)),f("eyeLookUpLeft",Math.max(0,E)),f("eyeLookUpRight",Math.max(0,E)),f("eyeLookDownLeft",Math.max(0,-E)),f("eyeLookDownRight",Math.max(0,-E)),f("browInnerUp",((T=n.browLift)==null?void 0:T.call(n))??.08),f("eyeSquintLeft",n.smile()*.18),f("eyeSquintRight",n.smile()*.18)};return e.userData.updateHumanVisual=x,e.userData.humanModel=t,x(),x}const Sp=Object.freeze(Object.defineProperty({__proto__:null,attachHumanVisual:hp,hasHumanModel:pp,loadHumanModels:dp,retargetRotation:vi},Symbol.toStringTag,{value:"Module"}));export{Dd as G,Ar as P,oe as U,_p as W,gp as a,hp as b,Sp as c,pp as h,dp as l,vp as m};
