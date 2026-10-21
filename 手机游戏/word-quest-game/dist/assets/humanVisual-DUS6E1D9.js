var Ss=Object.defineProperty;var xs=(e,n,t)=>n in e?Ss(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var Ye=(e,n,t)=>xs(e,typeof n!="symbol"?n+"":n,t);import{U as zt,bB as Es,bC as Xt,S as ln,x as ze,c as mt,bD as Ms,bE as et,bF as We,ac as At,bG as Pr,aL as lo,bH as yr,aW as Kt,b6 as nt,Z as jt,aX as fn,D as Ut,au as Lt,aF as wn,V as Z,bI as Ts,a_ as $n,B as gn,F as an,b5 as As,M as qt,aV as dr,b7 as Je,bJ as bs,af as Xn,bK as Rs,bL as Li,a6 as Et,N as Wt,bl as Tn,bM as Cn,bm as jn,be as _n,bN as ws,bg as fo,bO as Ln,Y as vt,br as Zn,bP as Qn,bQ as Pn,l as yn,e as An,bR as Cs,W as En,bS as Ir,bT as Ls,bU as Ps,b2 as Un,bV as ys,bW as Is,bX as Us,bY as Ds,bZ as Ns,b_ as Fs,b3 as Os,b$ as Bs,bi as Hs,bj as Gs,c0 as Vs,b4 as ks,c1 as zs,c2 as Ws,bh as Xs,c3 as uo,X as Si,c4 as ui,c5 as Gn,c6 as po,b0 as Zt,c7 as Ks,c8 as qs,c9 as pr,ca as Ys,bf as hr,cb as $s,cc as js,cd as Zs,ce as Ge,aJ as Qs,aD as Js,bs as ec,az as Jt,a as cn,ag as di,ah as tc,aY as Qt,cf as Vn,cg as on,ch as nc,ci as ho,cj as mo,ck as _o,a$ as xi,cl as go,cm as vo,cn as So,P as mr,co as Ti,cp as Ot,cq as ic,cr as rc,cs as ac,ct as oc,cu as xo,cv as sc,cw as cc,bq as lc,cx as Pi,cy as yi,cz as Ii,cA as Ui,cB as Ur,cC as Dr,cD as Nr,cE as Fr,cF as Or,cG as Br,cH as Hr,cI as Gr,cJ as Vr,cK as Zi,cL as kr,cM as zr,cN as Wr,cO as Xr,cP as Kr,cQ as qr,cR as Yr,cS as $r,cT as jr,cU as Zr,cV as Qr,cW as Jr,cX as ea,cY as ta,cZ as na,c_ as ia,c$ as ra,d0 as aa,d1 as oa,d2 as sa,d3 as Qi,d4 as ca,d5 as fc,d6 as uc,d7 as dc,d8 as pc,d9 as hc,da as mc,db as _c,dc as gc,dd as la,de as vc,aA as pi,bk as Sc,df as fa,dg as ua,a3 as da,K as Eo,aG as xc,dh as pa,di as Ec,dj as Mo,dk as Ji,dl as To,dm as Mc,bd as Ao,bc as bo,ai as Ro,bb as wo,ba as Co,b9 as Lo,b8 as Po,dn as ha,dp as yo,dq as Di,dr as Ni,bt as Tc,bu as _r,ds as ma,dt as Tt,du as Ac,dv as bc,dw as Rc,dx as wc,dy as Cc,dz as Lc,dA as Jn,dB as Pc,dC as yc,dD as Ic,dE as Uc,dF as er,dG as Io,dH as Dc,dI as Kn,dJ as Uo,aH as Yt,j as Nc,p as Fc,at as Oc,y as Bc,Q as dt,bx as Hc,a4 as Do,dK as Gc,dL as Vc,dM as kc,aq as zc,dN as Fi,dO as Wc,d as Ai,dP as Xc,bA as gr,dQ as Kc,dR as qc,dS as Yc,ap as $c,G as hi,q as No,bz as Fo,dT as jc,by as kn,dU as Zc,dV as Oo,dW as Qc,dX as _a,dY as ga,dZ as va,d_ as Jc,g as vr,aB as el,a2 as tl,h as nl,a1 as il,a0 as rl,E as al,C as ol}from"./index-BsX9HqVR.js";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Bo(){let e=null,n=!1,t=null,i=null;function a(r,o){t(r,o),i=e.requestAnimationFrame(a)}return{start:function(){n!==!0&&t!==null&&e!==null&&(i=e.requestAnimationFrame(a),n=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(r){t=r},setContext:function(r){e=r}}}function sl(e){const n=new WeakMap;function t(s,c){const l=s.array,p=s.usage,u=l.byteLength,f=e.createBuffer();e.bindBuffer(c,f),e.bufferData(c,l,p),s.onUploadCallback();let m;if(l instanceof Float32Array)m=e.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=e.HALF_FLOAT;else if(l instanceof Uint16Array)s.isFloat16BufferAttribute?m=e.HALF_FLOAT:m=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=e.SHORT;else if(l instanceof Uint32Array)m=e.UNSIGNED_INT;else if(l instanceof Int32Array)m=e.INT;else if(l instanceof Int8Array)m=e.BYTE;else if(l instanceof Uint8Array)m=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:s.version,size:u}}function i(s,c,l){const p=c.array,u=c.updateRanges;if(e.bindBuffer(l,s),u.length===0)e.bufferSubData(l,0,p);else{u.sort((m,S)=>m.start-S.start);let f=0;for(let m=1;m<u.length;m++){const S=u[f],x=u[m];x.start<=S.start+S.count+1?S.count=Math.max(S.count,x.start+x.count-S.start):(++f,u[f]=x)}u.length=f+1;for(let m=0,S=u.length;m<S;m++){const x=u[m];e.bufferSubData(l,x.start*p.BYTES_PER_ELEMENT,p,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function a(s){return s.isInterleavedBufferAttribute&&(s=s.data),n.get(s)}function r(s){s.isInterleavedBufferAttribute&&(s=s.data);const c=n.get(s);c&&(e.deleteBuffer(c.buffer),n.delete(s))}function o(s,c){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){const p=n.get(s);(!p||p.version<s.version)&&n.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}const l=n.get(s);if(l===void 0)n.set(s,t(s,c));else if(l.version<s.version){if(l.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,s,c),l.version=s.version}}return{get:a,remove:r,update:o}}var cl=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ll=`#ifdef USE_ALPHAHASH
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
#endif`,fl=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ul=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dl=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pl=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hl=`#ifdef USE_AOMAP
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
#endif`,ml=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_l=`#ifdef USE_BATCHING
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
#endif`,gl=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vl=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sl=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xl=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,El=`#ifdef USE_IRIDESCENCE
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
#endif`,Ml=`#ifdef USE_BUMPMAP
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
#endif`,Tl=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Al=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bl=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rl=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Cl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ll=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Pl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,yl=`#define PI 3.141592653589793
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
} // validated`,Il=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ul=`vec3 transformedNormal = objectNormal;
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
#endif`,Dl=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nl=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Fl=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ol=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bl="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hl=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gl=`#ifdef USE_ENVMAP
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
#endif`,Vl=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,kl=`#ifdef USE_ENVMAP
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
#endif`,zl=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wl=`#ifdef USE_ENVMAP
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
#endif`,Xl=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kl=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ql=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yl=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$l=`#ifdef USE_GRADIENTMAP
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
}`,jl=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zl=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ql=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jl=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ef=`#ifdef USE_ENVMAP
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
#endif`,tf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,af=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,of=`PhysicalMaterial material;
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
#endif`,sf=`uniform sampler2D dfgLUT;
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
}`,cf=`
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
#endif`,lf=`#if defined( RE_IndirectDiffuse )
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
#endif`,ff=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,uf=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,df=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_f=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Sf=`#if defined( USE_POINTS_UV )
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
#endif`,xf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ef=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Tf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Af=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bf=`#ifdef USE_MORPHTARGETS
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
#endif`,Rf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Cf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Lf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,If=`#ifdef USE_NORMALMAP
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
#endif`,Uf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Df=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Nf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ff=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Of=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Bf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Hf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Wf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Yf=`float getShadowMask() {
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
}`,$f=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jf=`#ifdef USE_SKINNING
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
#endif`,Zf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Qf=`#ifdef USE_SKINNING
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
#endif`,Jf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,eu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nu=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,iu=`#ifdef USE_TRANSMISSION
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
#endif`,ru=`#ifdef USE_TRANSMISSION
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
#endif`,au=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ou=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,su=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fu=`uniform sampler2D t2D;
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
}`,uu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,du=`#ifdef ENVMAP_TYPE_CUBE
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
}`,pu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mu=`#include <common>
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
}`,_u=`#if DEPTH_PACKING == 3200
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
}`,gu=`#define DISTANCE
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
}`,vu=`#define DISTANCE
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
}`,Su=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eu=`uniform float scale;
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
}`,Mu=`uniform vec3 diffuse;
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
}`,Tu=`#include <common>
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
}`,Au=`uniform vec3 diffuse;
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
}`,bu=`#define LAMBERT
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
}`,Ru=`#define LAMBERT
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
}`,wu=`#define MATCAP
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
}`,Cu=`#define MATCAP
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
}`,Lu=`#define NORMAL
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
}`,Pu=`#define NORMAL
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
}`,yu=`#define PHONG
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
}`,Iu=`#define PHONG
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
}`,Uu=`#define STANDARD
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
}`,Du=`#define STANDARD
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
}`,Nu=`#define TOON
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
}`,Fu=`#define TOON
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
}`,Ou=`uniform float size;
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
}`,Bu=`uniform vec3 diffuse;
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
}`,Hu=`#include <common>
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
}`,Gu=`uniform vec3 color;
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
}`,Vu=`uniform float rotation;
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
}`,ku=`uniform vec3 diffuse;
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
}`,Ue={alphahash_fragment:cl,alphahash_pars_fragment:ll,alphamap_fragment:fl,alphamap_pars_fragment:ul,alphatest_fragment:dl,alphatest_pars_fragment:pl,aomap_fragment:hl,aomap_pars_fragment:ml,batching_pars_vertex:_l,batching_vertex:gl,begin_vertex:vl,beginnormal_vertex:Sl,bsdfs:xl,iridescence_fragment:El,bumpmap_pars_fragment:Ml,clipping_planes_fragment:Tl,clipping_planes_pars_fragment:Al,clipping_planes_pars_vertex:bl,clipping_planes_vertex:Rl,color_fragment:wl,color_pars_fragment:Cl,color_pars_vertex:Ll,color_vertex:Pl,common:yl,cube_uv_reflection_fragment:Il,defaultnormal_vertex:Ul,displacementmap_pars_vertex:Dl,displacementmap_vertex:Nl,emissivemap_fragment:Fl,emissivemap_pars_fragment:Ol,colorspace_fragment:Bl,colorspace_pars_fragment:Hl,envmap_fragment:Gl,envmap_common_pars_fragment:Vl,envmap_pars_fragment:kl,envmap_pars_vertex:zl,envmap_physical_pars_fragment:ef,envmap_vertex:Wl,fog_vertex:Xl,fog_pars_vertex:Kl,fog_fragment:ql,fog_pars_fragment:Yl,gradientmap_pars_fragment:$l,lightmap_pars_fragment:jl,lights_lambert_fragment:Zl,lights_lambert_pars_fragment:Ql,lights_pars_begin:Jl,lights_toon_fragment:tf,lights_toon_pars_fragment:nf,lights_phong_fragment:rf,lights_phong_pars_fragment:af,lights_physical_fragment:of,lights_physical_pars_fragment:sf,lights_fragment_begin:cf,lights_fragment_maps:lf,lights_fragment_end:ff,lightprobes_pars_fragment:uf,logdepthbuf_fragment:df,logdepthbuf_pars_fragment:pf,logdepthbuf_pars_vertex:hf,logdepthbuf_vertex:mf,map_fragment:_f,map_pars_fragment:gf,map_particle_fragment:vf,map_particle_pars_fragment:Sf,metalnessmap_fragment:xf,metalnessmap_pars_fragment:Ef,morphinstance_vertex:Mf,morphcolor_vertex:Tf,morphnormal_vertex:Af,morphtarget_pars_vertex:bf,morphtarget_vertex:Rf,normal_fragment_begin:wf,normal_fragment_maps:Cf,normal_pars_fragment:Lf,normal_pars_vertex:Pf,normal_vertex:yf,normalmap_pars_fragment:If,clearcoat_normal_fragment_begin:Uf,clearcoat_normal_fragment_maps:Df,clearcoat_pars_fragment:Nf,iridescence_pars_fragment:Ff,opaque_fragment:Of,packing:Bf,premultiplied_alpha_fragment:Hf,project_vertex:Gf,dithering_fragment:Vf,dithering_pars_fragment:kf,roughnessmap_fragment:zf,roughnessmap_pars_fragment:Wf,shadowmap_pars_fragment:Xf,shadowmap_pars_vertex:Kf,shadowmap_vertex:qf,shadowmask_pars_fragment:Yf,skinbase_vertex:$f,skinning_pars_vertex:jf,skinning_vertex:Zf,skinnormal_vertex:Qf,specularmap_fragment:Jf,specularmap_pars_fragment:eu,tonemapping_fragment:tu,tonemapping_pars_fragment:nu,transmission_fragment:iu,transmission_pars_fragment:ru,uv_pars_fragment:au,uv_pars_vertex:ou,uv_vertex:su,worldpos_vertex:cu,background_vert:lu,background_frag:fu,backgroundCube_vert:uu,backgroundCube_frag:du,cube_vert:pu,cube_frag:hu,depth_vert:mu,depth_frag:_u,distance_vert:gu,distance_frag:vu,equirect_vert:Su,equirect_frag:xu,linedashed_vert:Eu,linedashed_frag:Mu,meshbasic_vert:Tu,meshbasic_frag:Au,meshlambert_vert:bu,meshlambert_frag:Ru,meshmatcap_vert:wu,meshmatcap_frag:Cu,meshnormal_vert:Lu,meshnormal_frag:Pu,meshphong_vert:yu,meshphong_frag:Iu,meshphysical_vert:Uu,meshphysical_frag:Du,meshtoon_vert:Nu,meshtoon_frag:Fu,points_vert:Ou,points_frag:Bu,shadow_vert:Hu,shadow_frag:Gu,sprite_vert:Vu,sprite_frag:ku},de={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Z},probesMax:{value:new Z},probesResolution:{value:new Z}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},kt={basic:{uniforms:Tt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:Tt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ze(0)},envMapIntensity:{value:1}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:Tt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:Tt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:Tt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:Tt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:Tt([de.points,de.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:Tt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:Tt([de.common,de.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:Tt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:Tt([de.sprite,de.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distance:{uniforms:Tt([de.common,de.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distance_vert,fragmentShader:Ue.distance_frag},shadow:{uniforms:Tt([de.lights,de.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};kt.physical={uniforms:Tt([kt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const ni={r:0,b:0,g:0},zu=new mt,Ho=new Ge;Ho.set(-1,0,0,0,1,0,0,0,1);function Wu(e,n,t,i,a,r){const o=new ze(0);let s=a===!0?0:1,c,l,p=null,u=0,f=null;function m(E){let R=E.isScene===!0?E.background:null;if(R&&R.isTexture){const b=E.backgroundBlurriness>0;R=n.get(R,b)}return R}function S(E){let R=!1;const b=m(E);b===null?d(o,s):b&&b.isColor&&(d(b,1),R=!0);const C=e.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(e.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function x(E,R){const b=m(R);b&&(b.isCubeTexture||b.mapping===Ti)?(l===void 0&&(l=new qt(new yn(1,1,1),new Jt({name:"BackgroundCubeMaterial",uniforms:Ji(kt.backgroundCube.uniforms),vertexShader:kt.backgroundCube.vertexShader,fragmentShader:kt.backgroundCube.fragmentShader,side:Lt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(C,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(zu.makeRotationFromEuler(R.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ho),l.material.toneMapped=nt.getTransfer(b.colorSpace)!==Je,(p!==b||u!==b.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,p=b,u=b.version,f=e.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new qt(new mr(2,2),new Jt({name:"BackgroundMaterial",uniforms:Ji(kt.background.uniforms),vertexShader:kt.background.vertexShader,fragmentShader:kt.background.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.toneMapped=nt.getTransfer(b.colorSpace)!==Je,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(p!==b||u!==b.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,p=b,u=b.version,f=e.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function d(E,R){E.getRGB(ni,Mo(e)),t.buffers.color.setClear(ni.r,ni.g,ni.b,R,r)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,R=1){o.set(E),s=R,d(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(E){s=E,d(o,s)},render:S,addToRenderList:x,dispose:h}}function Xu(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=f(null);let r=a,o=!1;function s(w,O,H,G,U){let F=!1;const L=u(w,G,H,O);r!==L&&(r=L,l(r.object)),F=m(w,G,H,U),F&&S(w,G,H,U),U!==null&&n.update(U,e.ELEMENT_ARRAY_BUFFER),(F||o)&&(o=!1,b(w,O,H,G),U!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(U).buffer))}function c(){return e.createVertexArray()}function l(w){return e.bindVertexArray(w)}function p(w){return e.deleteVertexArray(w)}function u(w,O,H,G){const U=G.wireframe===!0;let F=i[O.id];F===void 0&&(F={},i[O.id]=F);const L=w.isInstancedMesh===!0?w.id:0;let W=F[L];W===void 0&&(W={},F[L]=W);let j=W[H.id];j===void 0&&(j={},W[H.id]=j);let se=j[U];return se===void 0&&(se=f(c()),j[U]=se),se}function f(w){const O=[],H=[],G=[];for(let U=0;U<t;U++)O[U]=0,H[U]=0,G[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:H,attributeDivisors:G,object:w,attributes:{},index:null}}function m(w,O,H,G){const U=r.attributes,F=O.attributes;let L=0;const W=H.getAttributes();for(const j in W)if(W[j].location>=0){const le=U[j];let re=F[j];if(re===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(re=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(re=w.instanceColor)),le===void 0||le.attribute!==re||re&&le.data!==re.data)return!0;L++}return r.attributesNum!==L||r.index!==G}function S(w,O,H,G){const U={},F=O.attributes;let L=0;const W=H.getAttributes();for(const j in W)if(W[j].location>=0){let le=F[j];le===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(le=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(le=w.instanceColor));const re={};re.attribute=le,le&&le.data&&(re.data=le.data),U[j]=re,L++}r.attributes=U,r.attributesNum=L,r.index=G}function x(){const w=r.newAttributes;for(let O=0,H=w.length;O<H;O++)w[O]=0}function d(w){h(w,0)}function h(w,O){const H=r.newAttributes,G=r.enabledAttributes,U=r.attributeDivisors;H[w]=1,G[w]===0&&(e.enableVertexAttribArray(w),G[w]=1),U[w]!==O&&(e.vertexAttribDivisor(w,O),U[w]=O)}function E(){const w=r.newAttributes,O=r.enabledAttributes;for(let H=0,G=O.length;H<G;H++)O[H]!==w[H]&&(e.disableVertexAttribArray(H),O[H]=0)}function R(w,O,H,G,U,F,L){L===!0?e.vertexAttribIPointer(w,O,H,U,F):e.vertexAttribPointer(w,O,H,G,U,F)}function b(w,O,H,G){x();const U=G.attributes,F=H.getAttributes(),L=O.defaultAttributeValues;for(const W in F){const j=F[W];if(j.location>=0){let se=U[W];if(se===void 0&&(W==="instanceMatrix"&&w.instanceMatrix&&(se=w.instanceMatrix),W==="instanceColor"&&w.instanceColor&&(se=w.instanceColor)),se!==void 0){const le=se.normalized,re=se.itemSize,Re=n.get(se);if(Re===void 0)continue;const Ne=Re.buffer,we=Re.type,$=Re.bytesPerElement,fe=we===e.INT||we===e.UNSIGNED_INT||se.gpuType===xo;if(se.isInterleavedBufferAttribute){const ee=se.data,Ae=ee.stride,Ce=se.offset;if(ee.isInstancedInterleavedBuffer){for(let be=0;be<j.locationSize;be++)h(j.location+be,ee.meshPerAttribute);w.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let be=0;be<j.locationSize;be++)d(j.location+be);e.bindBuffer(e.ARRAY_BUFFER,Ne);for(let be=0;be<j.locationSize;be++)R(j.location+be,re/j.locationSize,we,le,Ae*$,(Ce+re/j.locationSize*be)*$,fe)}else{if(se.isInstancedBufferAttribute){for(let ee=0;ee<j.locationSize;ee++)h(j.location+ee,se.meshPerAttribute);w.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ee=0;ee<j.locationSize;ee++)d(j.location+ee);e.bindBuffer(e.ARRAY_BUFFER,Ne);for(let ee=0;ee<j.locationSize;ee++)R(j.location+ee,re/j.locationSize,we,le,re*$,re/j.locationSize*ee*$,fe)}}else if(L!==void 0){const le=L[W];if(le!==void 0)switch(le.length){case 2:e.vertexAttrib2fv(j.location,le);break;case 3:e.vertexAttrib3fv(j.location,le);break;case 4:e.vertexAttrib4fv(j.location,le);break;default:e.vertexAttrib1fv(j.location,le)}}}}E()}function C(){T();for(const w in i){const O=i[w];for(const H in O){const G=O[H];for(const U in G){const F=G[U];for(const L in F)p(F[L].object),delete F[L];delete G[U]}}delete i[w]}}function A(w){if(i[w.id]===void 0)return;const O=i[w.id];for(const H in O){const G=O[H];for(const U in G){const F=G[U];for(const L in F)p(F[L].object),delete F[L];delete G[U]}}delete i[w.id]}function P(w){for(const O in i){const H=i[O];for(const G in H){const U=H[G];if(U[w.id]===void 0)continue;const F=U[w.id];for(const L in F)p(F[L].object),delete F[L];delete U[w.id]}}}function v(w){for(const O in i){const H=i[O],G=w.isInstancedMesh===!0?w.id:0,U=H[G];if(U!==void 0){for(const F in U){const L=U[F];for(const W in L)p(L[W].object),delete L[W];delete U[F]}delete H[G],Object.keys(H).length===0&&delete i[O]}}}function T(){y(),o=!0,r!==a&&(r=a,l(r.object))}function y(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:s,reset:T,resetDefaultState:y,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:d,disableUnusedAttributes:E}}function Ku(e,n,t){let i;function a(c){i=c}function r(c,l){e.drawArrays(i,c,l),t.update(l,i,1)}function o(c,l,p){p!==0&&(e.drawArraysInstanced(i,c,l,p),t.update(l,i,p))}function s(c,l,p){if(p===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,p);let f=0;for(let m=0;m<p;m++)f+=l[m];t.update(f,i,1)}this.setMode=a,this.render=r,this.renderInstances=o,this.renderMultiDraw=s}function qu(e,n,t,i){let a;function r(){if(a!==void 0)return a;if(n.has("EXT_texture_filter_anisotropic")===!0){const P=n.get("EXT_texture_filter_anisotropic");a=e.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function o(P){return!(P!==Wt&&i.convert(P)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(P){const v=P===fn&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(P!==zt&&i.convert(P)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==on&&!v)}function c(P){if(P==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const p=c(l);p!==l&&(We("WebGLRenderer:",l,"not supported, using",p,"instead."),l=p);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&We("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),S=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_TEXTURE_SIZE),d=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),h=e.getParameter(e.MAX_VERTEX_ATTRIBS),E=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),R=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),C=e.getParameter(e.MAX_SAMPLES),A=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:m,maxVertexTextures:S,maxTextureSize:x,maxCubemapSize:d,maxAttributes:h,maxVertexUniforms:E,maxVaryings:R,maxFragmentUniforms:b,maxSamples:C,samples:A}}function Yu(e){const n=this;let t=null,i=0,a=!1,r=!1;const o=new Qs,s=new Ge,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const m=u.length!==0||f||i!==0||a;return a=f,i=u.length,m},this.beginShadows=function(){r=!0,p(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=p(u,f,0)},this.setState=function(u,f,m){const S=u.clippingPlanes,x=u.clipIntersection,d=u.clipShadows,h=e.get(u);if(!a||S===null||S.length===0||r&&!d)r?p(null):l();else{const E=r?0:i,R=E*4;let b=h.clippingState||null;c.value=b,b=p(S,f,R,m);for(let C=0;C!==R;++C)b[C]=t[C];h.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function p(u,f,m,S){const x=u!==null?u.length:0;let d=null;if(x!==0){if(d=c.value,S!==!0||d===null){const h=m+x*4,E=f.matrixWorldInverse;s.getNormalMatrix(E),(d===null||d.length<h)&&(d=new Float32Array(h));for(let R=0,b=m;R!==x;++R,b+=4)o.copy(u[R]).applyMatrix4(E,s),o.normal.toArray(d,b),d[b+3]=o.constant}c.value=d,c.needsUpdate=!0}return n.numPlanes=x,n.numIntersection=0,d}}const sn=4,Sa=[.125,.215,.35,.446,.526,.582],mn=20,$u=256,Dn=new dr,xa=new ze;let Oi=null,Bi=0,Hi=0,Gi=!1;const ju=new Z;class Ea{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(n,t=0,i=.1,a=100,r={}){const{size:o=256,position:s=ju}=r;Oi=this._renderer.getRenderTarget(),Bi=this._renderer.getActiveCubeFace(),Hi=this._renderer.getActiveMipmapLevel(),Gi=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(n,i,a,c,s),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Aa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ta(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodMeshes.length;n++)this._lodMeshes[n].geometry.dispose()}_cleanup(n){this._renderer.setRenderTarget(Oi,Bi,Hi),this._renderer.xr.enabled=Gi,n.scissorTest=!1,xn(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===Qn||n.mapping===Pn?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),Oi=this._renderer.getRenderTarget(),Bi=this._renderer.getActiveCubeFace(),Hi=this._renderer.getActiveMipmapLevel(),Gi=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:vt,minFilter:vt,generateMipmaps:!1,type:fn,format:Wt,colorSpace:Ot,depthBuffer:!1},a=Ma(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ma(n,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Zu(r)),this._blurMaterial=Ju(r,n,t),this._ggxMaterial=Qu(r,n,t)}return a}_compileMaterial(n){const t=new qt(new gn,n);this._renderer.compile(t,Dn)}_sceneToCubeUV(n,t,i,a,r){const c=new Xn(90,1,t,i),l=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,m=u.toneMapping;u.getClearColor(xa),u.toneMapping=Xt,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(a),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qt(new yn,new An({name:"PMREM.Background",side:Lt,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,d=x.material;let h=!1;const E=n.background;E?E.isColor&&(d.color.copy(E),n.background=null,h=!0):(d.color.copy(xa),h=!0);for(let R=0;R<6;R++){const b=R%3;b===0?(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+p[R],r.y,r.z)):b===1?(c.up.set(0,0,l[R]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+p[R],r.z)):(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+p[R]));const C=this._cubeSize;xn(a,b*C,R>2?C:0,C,C),u.setRenderTarget(a),h&&u.render(x,c),u.render(n,c)}u.toneMapping=m,u.autoClear=f,n.background=E}_textureToCubeUV(n,t){const i=this._renderer,a=n.mapping===Qn||n.mapping===Pn;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Aa()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ta());const r=a?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const s=r.uniforms;s.envMap.value=n;const c=this._cubeSize;xn(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,Dn)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const a=this._lodMeshes.length;for(let r=1;r<a;r++)this._applyGGXFilter(n,r-1,r);t.autoClear=i}_applyGGXFilter(n,t,i){const a=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,s=this._lodMeshes[i];s.material=o;const c=o.uniforms,l=i/(this._lodMeshes.length-1),p=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-p*p),f=0+l*1.25,m=u*f,{_lodMax:S}=this,x=this._sizeLods[i],d=3*x*(i>S-sn?i-S+sn:0),h=4*(this._cubeSize-x);c.envMap.value=n.texture,c.roughness.value=m,c.mipInt.value=S-t,xn(r,d,h,3*x,2*x),a.setRenderTarget(r),a.render(s,Dn),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=S-i,xn(n,d,h,3*x,2*x),a.setRenderTarget(n),a.render(s,Dn)}_blur(n,t,i,a,r){const o=this._pingPongRenderTarget;this._halfBlur(n,o,t,i,a,"latitudinal",r),this._halfBlur(o,n,i,i,a,"longitudinal",r)}_halfBlur(n,t,i,a,r,o,s){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&et("blur direction must be either latitudinal or longitudinal!");const p=3,u=this._lodMeshes[a];u.material=l;const f=l.uniforms,m=this._sizeLods[i]-1,S=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*mn-1),x=r/S,d=isFinite(r)?1+Math.floor(p*x):mn;d>mn&&We(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${mn}`);const h=[];let E=0;for(let P=0;P<mn;++P){const v=P/x,T=Math.exp(-v*v/2);h.push(T),P===0?E+=T:P<d&&(E+=2*T)}for(let P=0;P<h.length;P++)h[P]=h[P]/E;f.envMap.value=n.texture,f.samples.value=d,f.weights.value=h,f.latitudinal.value=o==="latitudinal",s&&(f.poleAxis.value=s);const{_lodMax:R}=this;f.dTheta.value=S,f.mipInt.value=R-i;const b=this._sizeLods[a],C=3*b*(a>R-sn?a-R+sn:0),A=4*(this._cubeSize-b);xn(t,C,A,3*b,2*b),c.setRenderTarget(t),c.render(u,Dn)}}function Zu(e){const n=[],t=[],i=[];let a=e;const r=e-sn+1+Sa.length;for(let o=0;o<r;o++){const s=Math.pow(2,a);n.push(s);let c=1/s;o>e-sn?c=Sa[o-e+sn-1]:o===0&&(c=0),t.push(c);const l=1/(s-2),p=-l,u=1+l,f=[p,p,u,p,u,u,p,p,u,u,p,u],m=6,S=6,x=3,d=2,h=1,E=new Float32Array(x*S*m),R=new Float32Array(d*S*m),b=new Float32Array(h*S*m);for(let A=0;A<m;A++){const P=A%3*2/3-1,v=A>2?0:-1,T=[P,v,0,P+2/3,v,0,P+2/3,v+1,0,P,v,0,P+2/3,v+1,0,P,v+1,0];E.set(T,x*S*A),R.set(f,d*S*A);const y=[A,A,A,A,A,A];b.set(y,h*S*A)}const C=new gn;C.setAttribute("position",new cn(E,x)),C.setAttribute("uv",new cn(R,d)),C.setAttribute("faceIndex",new cn(b,h)),i.push(new qt(C,null)),a>sn&&a--}return{lodMeshes:i,sizeLods:n,sigmas:t}}function Ma(e,n,t){const i=new Kt(e,n,t);return i.texture.mapping=Ti,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function xn(e,n,t,i,a){e.viewport.set(n,t,i,a),e.scissor.set(n,t,i,a)}function Qu(e,n,t){return new Jt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:$u,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:bi(),fragmentShader:`

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
		`,blending:Qt,depthTest:!1,depthWrite:!1})}function Ju(e,n,t){const i=new Float32Array(mn),a=new Z(0,1,0);return new Jt({name:"SphericalGaussianBlur",defines:{n:mn,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:bi(),fragmentShader:`

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
		`,blending:Qt,depthTest:!1,depthWrite:!1})}function Ta(){return new Jt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bi(),fragmentShader:`

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
		`,blending:Qt,depthTest:!1,depthWrite:!1})}function Aa(){return new Jt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bi(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qt,depthTest:!1,depthWrite:!1})}function bi(){return`

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
	`}class Go extends Kt{constructor(n=1,t={}){super(n,n,t),this.isWebGLCubeRenderTarget=!0;const i={width:n,height:n,depth:1},a=[i,i,i,i,i,i];this.texture=new To(a),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(n,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new yn(5,5,5),r=new Jt({name:"CubemapFromEquirect",uniforms:Ji(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Lt,blending:Qt});r.uniforms.tEquirect.value=t;const o=new qt(a,r),s=t.minFilter;return t.minFilter===jt&&(t.minFilter=vt),new Mc(1,10,this).update(n,o),t.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(n,t=!0,i=!0,a=!0){const r=n.getRenderTarget();for(let o=0;o<6;o++)n.setRenderTarget(this,o),n.clear(t,i,a);n.setRenderTarget(r)}}function ed(e){let n=new WeakMap,t=new WeakMap,i=null;function a(f,m=!1){return f==null?null:m?o(f):r(f)}function r(f){if(f&&f.isTexture){const m=f.mapping;if(m===Di||m===Ni)if(n.has(f)){const S=n.get(f).texture;return s(S,f.mapping)}else{const S=f.image;if(S&&S.height>0){const x=new Go(S.height);return x.fromEquirectangularTexture(e,f),n.set(f,x),f.addEventListener("dispose",l),s(x.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const m=f.mapping,S=m===Di||m===Ni,x=m===Qn||m===Pn;if(S||x){let d=t.get(f);const h=d!==void 0?d.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==h)return i===null&&(i=new Ea(e)),d=S?i.fromEquirectangular(f,d):i.fromCubemap(f,d),d.texture.pmremVersion=f.pmremVersion,t.set(f,d),d.texture;if(d!==void 0)return d.texture;{const E=f.image;return S&&E&&E.height>0||x&&E&&c(E)?(i===null&&(i=new Ea(e)),d=S?i.fromEquirectangular(f):i.fromCubemap(f),d.texture.pmremVersion=f.pmremVersion,t.set(f,d),f.addEventListener("dispose",p),d.texture):null}}}return f}function s(f,m){return m===Di?f.mapping=Qn:m===Ni&&(f.mapping=Pn),f}function c(f){let m=0;const S=6;for(let x=0;x<S;x++)f[x]!==void 0&&m++;return m===S}function l(f){const m=f.target;m.removeEventListener("dispose",l);const S=n.get(m);S!==void 0&&(n.delete(m),S.dispose())}function p(f){const m=f.target;m.removeEventListener("dispose",p);const S=t.get(m);S!==void 0&&(t.delete(m),S.dispose())}function u(){n=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:u}}function td(e){const n={};function t(i){if(n[i]!==void 0)return n[i];const a=e.getExtension(i);return n[i]=a,a}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const a=t(i);return a===null&&Cs("WebGLRenderer: "+i+" extension not supported."),a}}}function nd(e,n,t,i){const a={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&n.remove(f.index);for(const S in f.attributes)n.remove(f.attributes[S]);f.removeEventListener("dispose",o),delete a[f.id];const m=r.get(f);m&&(n.remove(m),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function s(u,f){return a[f.id]===!0||(f.addEventListener("dispose",o),a[f.id]=!0,t.memory.geometries++),f}function c(u){const f=u.attributes;for(const m in f)n.update(f[m],e.ARRAY_BUFFER)}function l(u){const f=[],m=u.index,S=u.attributes.position;let x=0;if(S===void 0)return;if(m!==null){const E=m.array;x=m.version;for(let R=0,b=E.length;R<b;R+=3){const C=E[R+0],A=E[R+1],P=E[R+2];f.push(C,A,A,P,P,C)}}else{const E=S.array;x=S.version;for(let R=0,b=E.length/3-1;R<b;R+=3){const C=R+0,A=R+1,P=R+2;f.push(C,A,A,P,P,C)}}const d=new(S.count>=65535?Tc:_r)(f,1);d.version=x;const h=r.get(u);h&&n.remove(h),r.set(u,d)}function p(u){const f=r.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&l(u)}else l(u);return r.get(u)}return{get:s,update:c,getWireframeAttribute:p}}function id(e,n,t){let i;function a(u){i=u}let r,o;function s(u){r=u.type,o=u.bytesPerElement}function c(u,f){e.drawElements(i,f,r,u*o),t.update(f,i,1)}function l(u,f,m){m!==0&&(e.drawElementsInstanced(i,f,r,u*o,m),t.update(f,i,m))}function p(u,f,m){if(m===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,u,0,m);let x=0;for(let d=0;d<m;d++)x+=f[d];t.update(x,i,1)}this.setMode=a,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=p}function rd(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,s){switch(t.calls++,o){case e.TRIANGLES:t.triangles+=s*(r/3);break;case e.LINES:t.lines+=s*(r/2);break;case e.LINE_STRIP:t.lines+=s*(r-1);break;case e.LINE_LOOP:t.lines+=s*r;break;case e.POINTS:t.points+=s*r;break;default:et("WebGLInfo: Unknown draw mode:",o);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:a,update:i}}function ad(e,n,t){const i=new WeakMap,a=new At;function r(o,s,c){const l=o.morphTargetInfluences,p=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,u=p!==void 0?p.length:0;let f=i.get(s);if(f===void 0||f.count!==u){let T=function(){P.dispose(),i.delete(s),s.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const m=s.morphAttributes.position!==void 0,S=s.morphAttributes.normal!==void 0,x=s.morphAttributes.color!==void 0,d=s.morphAttributes.position||[],h=s.morphAttributes.normal||[],E=s.morphAttributes.color||[];let R=0;m===!0&&(R=1),S===!0&&(R=2),x===!0&&(R=3);let b=s.attributes.position.count*R,C=1;b>n.maxTextureSize&&(C=Math.ceil(b/n.maxTextureSize),b=n.maxTextureSize);const A=new Float32Array(b*C*4*u),P=new Eo(A,b,C,u);P.type=on,P.needsUpdate=!0;const v=R*4;for(let y=0;y<u;y++){const w=d[y],O=h[y],H=E[y],G=b*C*4*y;for(let U=0;U<w.count;U++){const F=U*v;m===!0&&(a.fromBufferAttribute(w,U),A[G+F+0]=a.x,A[G+F+1]=a.y,A[G+F+2]=a.z,A[G+F+3]=0),S===!0&&(a.fromBufferAttribute(O,U),A[G+F+4]=a.x,A[G+F+5]=a.y,A[G+F+6]=a.z,A[G+F+7]=0),x===!0&&(a.fromBufferAttribute(H,U),A[G+F+8]=a.x,A[G+F+9]=a.y,A[G+F+10]=a.z,A[G+F+11]=H.itemSize===4?a.w:1)}}f={count:u,texture:P,size:new Et(b,C)},i.set(s,f),s.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(e,"morphTexture",o.morphTexture,t);else{let m=0;for(let x=0;x<l.length;x++)m+=l[x];const S=s.morphTargetsRelative?1:1-m;c.getUniforms().setValue(e,"morphTargetBaseInfluence",S),c.getUniforms().setValue(e,"morphTargetInfluences",l)}c.getUniforms().setValue(e,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(e,"morphTargetsTextureSize",f.size)}return{update:r}}function od(e,n,t,i,a){let r=new WeakMap;function o(l){const p=a.render.frame,u=l.geometry,f=n.get(l,u);if(r.get(f)!==p&&(n.update(f),r.set(f,p)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==p&&(t.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,e.ARRAY_BUFFER),r.set(l,p))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==p&&(m.update(),r.set(m,p))}return f}function s(){r=new WeakMap}function c(l){const p=l.target;p.removeEventListener("dispose",c),i.releaseStatesOfObject(p),t.remove(p.instanceMatrix),p.instanceColor!==null&&t.remove(p.instanceColor)}return{update:o,dispose:s}}const sd={[Po]:"LINEAR_TONE_MAPPING",[Lo]:"REINHARD_TONE_MAPPING",[Co]:"CINEON_TONE_MAPPING",[wo]:"ACES_FILMIC_TONE_MAPPING",[Ro]:"AGX_TONE_MAPPING",[bo]:"NEUTRAL_TONE_MAPPING",[Ao]:"CUSTOM_TONE_MAPPING"};function cd(e,n,t,i,a){const r=new Kt(n,t,{type:e,depthBuffer:i,stencilBuffer:a,depthTexture:i?new $n(n,t):void 0}),o=new Kt(n,t,{type:fn,depthBuffer:!1,stencilBuffer:!1}),s=new gn;s.setAttribute("position",new an([-1,3,0,-1,-1,0,3,-1,0],3)),s.setAttribute("uv",new an([0,2,0,0,2,0],2));const c=new As({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new qt(s,c),p=new dr(-1,1,1,-1,0,1);let u=null,f=null,m=!1,S,x=null,d=[],h=!1;this.setSize=function(E,R){r.setSize(E,R),o.setSize(E,R);for(let b=0;b<d.length;b++){const C=d[b];C.setSize&&C.setSize(E,R)}},this.setEffects=function(E){d=E,h=d.length>0&&d[0].isRenderPass===!0;const R=r.width,b=r.height;for(let C=0;C<d.length;C++){const A=d[C];A.setSize&&A.setSize(R,b)}},this.begin=function(E,R){if(m||E.toneMapping===Xt&&d.length===0)return!1;if(x=R,R!==null){const b=R.width,C=R.height;(r.width!==b||r.height!==C)&&this.setSize(b,C)}return h===!1&&E.setRenderTarget(r),S=E.toneMapping,E.toneMapping=Xt,!0},this.hasRenderPass=function(){return h},this.end=function(E,R){E.toneMapping=S,m=!0;let b=r,C=o;for(let A=0;A<d.length;A++){const P=d[A];if(P.enabled!==!1&&(P.render(E,C,b,R),P.needsSwap!==!1)){const v=b;b=C,C=v}}if(u!==E.outputColorSpace||f!==E.toneMapping){u=E.outputColorSpace,f=E.toneMapping,c.defines={},nt.getTransfer(u)===Je&&(c.defines.SRGB_TRANSFER="");const A=sd[f];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=b.texture,E.setRenderTarget(x),E.render(l,p),x=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),s.dispose(),c.dispose()}}const Vo=new Jn,tr=new $n(1,1),ko=new Eo,zo=new bc,Wo=new To,ba=[],Ra=[],wa=new Float32Array(16),Ca=new Float32Array(9),La=new Float32Array(4);function In(e,n,t){const i=e[0];if(i<=0||i>0)return e;const a=n*t;let r=ba[a];if(r===void 0&&(r=new Float32Array(a),ba[a]=r),n!==0){i.toArray(r,0);for(let o=1,s=0;o!==n;++o)s+=t,e[o].toArray(r,s)}return r}function _t(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function gt(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function Ri(e,n){let t=Ra[n];t===void 0&&(t=new Int32Array(n),Ra[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function ld(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function fd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(_t(t,n))return;e.uniform2fv(this.addr,n),gt(t,n)}}function ud(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(_t(t,n))return;e.uniform3fv(this.addr,n),gt(t,n)}}function dd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(_t(t,n))return;e.uniform4fv(this.addr,n),gt(t,n)}}function pd(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(_t(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),gt(t,n)}else{if(_t(t,i))return;La.set(i),e.uniformMatrix2fv(this.addr,!1,La),gt(t,i)}}function hd(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(_t(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),gt(t,n)}else{if(_t(t,i))return;Ca.set(i),e.uniformMatrix3fv(this.addr,!1,Ca),gt(t,i)}}function md(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(_t(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),gt(t,n)}else{if(_t(t,i))return;wa.set(i),e.uniformMatrix4fv(this.addr,!1,wa),gt(t,i)}}function _d(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function gd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(_t(t,n))return;e.uniform2iv(this.addr,n),gt(t,n)}}function vd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(_t(t,n))return;e.uniform3iv(this.addr,n),gt(t,n)}}function Sd(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(_t(t,n))return;e.uniform4iv(this.addr,n),gt(t,n)}}function xd(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function Ed(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(_t(t,n))return;e.uniform2uiv(this.addr,n),gt(t,n)}}function Md(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(_t(t,n))return;e.uniform3uiv(this.addr,n),gt(t,n)}}function Td(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(_t(t,n))return;e.uniform4uiv(this.addr,n),gt(t,n)}}function Ad(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let r;this.type===e.SAMPLER_2D_SHADOW?(tr.compareFunction=t.isReversedDepthBuffer()?pr:hr,r=tr):r=Vo,t.setTexture2D(n||r,a)}function bd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTexture3D(n||zo,a)}function Rd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTextureCube(n||Wo,a)}function wd(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTexture2DArray(n||ko,a)}function Cd(e){switch(e){case 5126:return ld;case 35664:return fd;case 35665:return ud;case 35666:return dd;case 35674:return pd;case 35675:return hd;case 35676:return md;case 5124:case 35670:return _d;case 35667:case 35671:return gd;case 35668:case 35672:return vd;case 35669:case 35673:return Sd;case 5125:return xd;case 36294:return Ed;case 36295:return Md;case 36296:return Td;case 35678:case 36198:case 36298:case 36306:case 35682:return Ad;case 35679:case 36299:case 36307:return bd;case 35680:case 36300:case 36308:case 36293:return Rd;case 36289:case 36303:case 36311:case 36292:return wd}}function Ld(e,n){e.uniform1fv(this.addr,n)}function Pd(e,n){const t=In(n,this.size,2);e.uniform2fv(this.addr,t)}function yd(e,n){const t=In(n,this.size,3);e.uniform3fv(this.addr,t)}function Id(e,n){const t=In(n,this.size,4);e.uniform4fv(this.addr,t)}function Ud(e,n){const t=In(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function Dd(e,n){const t=In(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function Nd(e,n){const t=In(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function Fd(e,n){e.uniform1iv(this.addr,n)}function Od(e,n){e.uniform2iv(this.addr,n)}function Bd(e,n){e.uniform3iv(this.addr,n)}function Hd(e,n){e.uniform4iv(this.addr,n)}function Gd(e,n){e.uniform1uiv(this.addr,n)}function Vd(e,n){e.uniform2uiv(this.addr,n)}function kd(e,n){e.uniform3uiv(this.addr,n)}function zd(e,n){e.uniform4uiv(this.addr,n)}function Wd(e,n,t){const i=this.cache,a=n.length,r=Ri(t,a);_t(i,r)||(e.uniform1iv(this.addr,r),gt(i,r));let o;this.type===e.SAMPLER_2D_SHADOW?o=tr:o=Vo;for(let s=0;s!==a;++s)t.setTexture2D(n[s]||o,r[s])}function Xd(e,n,t){const i=this.cache,a=n.length,r=Ri(t,a);_t(i,r)||(e.uniform1iv(this.addr,r),gt(i,r));for(let o=0;o!==a;++o)t.setTexture3D(n[o]||zo,r[o])}function Kd(e,n,t){const i=this.cache,a=n.length,r=Ri(t,a);_t(i,r)||(e.uniform1iv(this.addr,r),gt(i,r));for(let o=0;o!==a;++o)t.setTextureCube(n[o]||Wo,r[o])}function qd(e,n,t){const i=this.cache,a=n.length,r=Ri(t,a);_t(i,r)||(e.uniform1iv(this.addr,r),gt(i,r));for(let o=0;o!==a;++o)t.setTexture2DArray(n[o]||ko,r[o])}function Yd(e){switch(e){case 5126:return Ld;case 35664:return Pd;case 35665:return yd;case 35666:return Id;case 35674:return Ud;case 35675:return Dd;case 35676:return Nd;case 5124:case 35670:return Fd;case 35667:case 35671:return Od;case 35668:case 35672:return Bd;case 35669:case 35673:return Hd;case 5125:return Gd;case 36294:return Vd;case 36295:return kd;case 36296:return zd;case 35678:case 36198:case 36298:case 36306:case 35682:return Wd;case 35679:case 36299:case 36307:return Xd;case 35680:case 36300:case 36308:case 36293:return Kd;case 36289:case 36303:case 36311:case 36292:return qd}}class $d{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Cd(t.type)}}class jd{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Yd(t.type)}}class Zd{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const a=this.seq;for(let r=0,o=a.length;r!==o;++r){const s=a[r];s.setValue(n,t[s.id],i)}}}const Vi=/(\w+)(\])?(\[|\.)?/g;function Pa(e,n){e.seq.push(n),e.map[n.id]=n}function Qd(e,n,t){const i=e.name,a=i.length;for(Vi.lastIndex=0;;){const r=Vi.exec(i),o=Vi.lastIndex;let s=r[1];const c=r[2]==="]",l=r[3];if(c&&(s=s|0),l===void 0||l==="["&&o+2===a){Pa(t,l===void 0?new $d(s,e,n):new jd(s,e,n));break}else{let u=t.map[s];u===void 0&&(u=new Zd(s),Pa(t,u)),t=u}}}class mi{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const s=n.getActiveUniform(t,o),c=n.getUniformLocation(t,s.name);Qd(s,c,this)}const a=[],r=[];for(const o of this.seq)o.type===n.SAMPLER_2D_SHADOW||o.type===n.SAMPLER_CUBE_SHADOW||o.type===n.SAMPLER_2D_ARRAY_SHADOW?a.push(o):r.push(o);a.length>0&&(this.seq=a.concat(r))}setValue(n,t,i,a){const r=this.map[t];r!==void 0&&r.setValue(n,i,a)}setOptional(n,t,i){const a=t[i];a!==void 0&&this.setValue(n,i,a)}static upload(n,t,i,a){for(let r=0,o=t.length;r!==o;++r){const s=t[r],c=i[s.id];c.needsUpdate!==!1&&s.setValue(n,c.value,a)}}static seqWithValue(n,t){const i=[];for(let a=0,r=n.length;a!==r;++a){const o=n[a];o.id in t&&i.push(o)}return i}}function ya(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const Jd=37297;let ep=0;function tp(e,n){const t=e.split(`
`),i=[],a=Math.max(n-6,0),r=Math.min(n+6,t.length);for(let o=a;o<r;o++){const s=o+1;i.push(`${s===n?">":" "} ${s}: ${t[o]}`)}return i.join(`
`)}const Ia=new Ge;function np(e){nt._getMatrix(Ia,nt.workingColorSpace,e);const n=`mat3( ${Ia.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(e)){case yo:return[n,"LinearTransferOETF"];case Je:return[n,"sRGBTransferOETF"];default:return We("WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function Ua(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),r=(e.getShaderInfoLog(n)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const s=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+tp(e.getShaderSource(n),s)}else return r}function ip(e,n){const t=np(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const rp={[Po]:"Linear",[Lo]:"Reinhard",[Co]:"Cineon",[wo]:"ACESFilmic",[Ro]:"AgX",[bo]:"Neutral",[Ao]:"Custom"};function ap(e,n){const t=rp[n];return t===void 0?(We("WebGLProgram: Unsupported toneMapping:",n),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ii=new Z;function op(){nt.getLuminanceCoefficients(ii);const e=ii.x.toFixed(4),n=ii.y.toFixed(4),t=ii.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sp(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zn).join(`
`)}function cp(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function lp(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const r=e.getActiveAttrib(n,a),o=r.name;let s=1;r.type===e.FLOAT_MAT2&&(s=2),r.type===e.FLOAT_MAT3&&(s=3),r.type===e.FLOAT_MAT4&&(s=4),t[o]={type:r.type,location:e.getAttribLocation(n,o),locationSize:s}}return t}function zn(e){return e!==""}function Da(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function Na(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const fp=/^[ \t]*#include +<([\w\d./]+)>/gm;function nr(e){return e.replace(fp,dp)}const up=new Map;function dp(e,n){let t=Ue[n];if(t===void 0){const i=up.get(n);if(i!==void 0)t=Ue[i],We('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return nr(t)}const pp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fa(e){return e.replace(pp,hp)}function hp(e,n,t,i){let a="";for(let r=parseInt(n);r<parseInt(t);r++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function Oa(e){let n=`precision ${e.precision} float;
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
#define LOW_PRECISION`),n}const mp={[di]:"SHADOWMAP_TYPE_PCF",[Vn]:"SHADOWMAP_TYPE_VSM"};function _p(e){return mp[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const gp={[Qn]:"ENVMAP_TYPE_CUBE",[Pn]:"ENVMAP_TYPE_CUBE",[Ti]:"ENVMAP_TYPE_CUBE_UV"};function vp(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":gp[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const Sp={[Pn]:"ENVMAP_MODE_REFRACTION"};function xp(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":Sp[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Ep={[Lc]:"ENVMAP_BLENDING_MULTIPLY",[Cc]:"ENVMAP_BLENDING_MIX",[wc]:"ENVMAP_BLENDING_ADD"};function Mp(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":Ep[e.combine]||"ENVMAP_BLENDING_NONE"}function Tp(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Ap(e,n,t,i){const a=e.getContext(),r=t.defines;let o=t.vertexShader,s=t.fragmentShader;const c=_p(t),l=vp(t),p=xp(t),u=Mp(t),f=Tp(t),m=sp(t),S=cp(r),x=a.createProgram();let d,h,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S].filter(zn).join(`
`),d.length>0&&(d+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S].filter(zn).join(`
`),h.length>0&&(h+=`
`)):(d=[Oa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zn).join(`
`),h=[Oa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+p:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xt?"#define TONE_MAPPING":"",t.toneMapping!==Xt?Ue.tonemapping_pars_fragment:"",t.toneMapping!==Xt?ap("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,ip("linearToOutputTexel",t.outputColorSpace),op(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(zn).join(`
`)),o=nr(o),o=Da(o,t),o=Na(o,t),s=nr(s),s=Da(s,t),s=Na(s,t),o=Fa(o),s=Fa(s),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,d=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,h=["#define varying in",t.glslVersion===ma?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ma?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const R=E+d+o,b=E+h+s,C=ya(a,a.VERTEX_SHADER,R),A=ya(a,a.FRAGMENT_SHADER,b);a.attachShader(x,C),a.attachShader(x,A),t.index0AttributeName!==void 0?a.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(x,0,"position"),a.linkProgram(x);function P(w){if(e.debug.checkShaderErrors){const O=a.getProgramInfoLog(x)||"",H=a.getShaderInfoLog(C)||"",G=a.getShaderInfoLog(A)||"",U=O.trim(),F=H.trim(),L=G.trim();let W=!0,j=!0;if(a.getProgramParameter(x,a.LINK_STATUS)===!1)if(W=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,x,C,A);else{const se=Ua(a,C,"vertex"),le=Ua(a,A,"fragment");et("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(x,a.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+U+`
`+se+`
`+le)}else U!==""?We("WebGLProgram: Program Info Log:",U):(F===""||L==="")&&(j=!1);j&&(w.diagnostics={runnable:W,programLog:U,vertexShader:{log:F,prefix:d},fragmentShader:{log:L,prefix:h}})}a.deleteShader(C),a.deleteShader(A),v=new mi(a,x),T=lp(a,x)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=a.getProgramParameter(x,Jd)),y},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ep++,this.cacheKey=n,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=A,this}let bp=0;class Rp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,a=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(n);return o.has(a)===!1&&(o.add(a),a.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new wp(n),t.set(n,i)),i}}class wp{constructor(n){this.id=bp++,this.code=n,this.usedTimes=0}}function Cp(e){return e===Ln||e===Zi||e===Qi}function Lp(e,n,t,i,a,r){const o=new Ac,s=new Rp,c=new Set,l=[],p=new Map,u=i.logarithmicDepthBuffer;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(v){return c.add(v),v===0?"uv":`uv${v}`}function x(v,T,y,w,O,H){const G=w.fog,U=O.geometry,F=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?w.environment:null,L=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,W=n.get(v.envMap||F,L),j=W&&W.mapping===Ti?W.image.height:null,se=m[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),f!==v.precision&&We("WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const le=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,re=le!==void 0?le.length:0;let Re=0;U.morphAttributes.position!==void 0&&(Re=1),U.morphAttributes.normal!==void 0&&(Re=2),U.morphAttributes.color!==void 0&&(Re=3);let Ne,we,$,fe;if(se){const Pe=kt[se];Ne=Pe.vertexShader,we=Pe.fragmentShader}else Ne=v.vertexShader,we=v.fragmentShader,s.update(v),$=s.getVertexShaderID(v),fe=s.getFragmentShaderID(v);const ee=e.getRenderTarget(),Ae=e.state.buffers.depth.getReversed(),Ce=O.isInstancedMesh===!0,be=O.isBatchedMesh===!0,it=!!v.map,Be=!!v.matcap,Xe=!!W,tt=!!v.aoMap,Oe=!!v.lightMap,pt=!!v.bumpMap,rt=!!v.normalMap,bt=!!v.displacementMap,D=!!v.emissiveMap,ht=!!v.metalnessMap,He=!!v.roughnessMap,Ze=v.anisotropy>0,ue=v.clearcoat>0,at=v.dispersion>0,M=v.iridescence>0,_=v.sheen>0,B=v.transmission>0,q=Ze&&!!v.anisotropyMap,J=ue&&!!v.clearcoatMap,te=ue&&!!v.clearcoatNormalMap,ce=ue&&!!v.clearcoatRoughnessMap,X=M&&!!v.iridescenceMap,Y=M&&!!v.iridescenceThicknessMap,me=_&&!!v.sheenColorMap,ve=_&&!!v.sheenRoughnessMap,ae=!!v.specularMap,ne=!!v.specularColorMap,Le=!!v.specularIntensityMap,Ie=B&&!!v.transmissionMap,ke=B&&!!v.thicknessMap,I=!!v.gradientMap,ie=!!v.alphaMap,K=v.alphaTest>0,_e=!!v.alphaHash,oe=!!v.extensions;let Q=Xt;v.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Q=e.toneMapping);const Ee={shaderID:se,shaderType:v.type,shaderName:v.name,vertexShader:Ne,fragmentShader:we,defines:v.defines,customVertexShaderID:$,customFragmentShaderID:fe,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:be,batchingColor:be&&O._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&O.instanceColor!==null,instancingMorph:Ce&&O.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:nt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:it,matcap:Be,envMap:Xe,envMapMode:Xe&&W.mapping,envMapCubeUVHeight:j,aoMap:tt,lightMap:Oe,bumpMap:pt,normalMap:rt,displacementMap:bt,emissiveMap:D,normalMapObjectSpace:rt&&v.normalMapType===Ec,normalMapTangentSpace:rt&&v.normalMapType===pa,packedNormalMap:rt&&v.normalMapType===pa&&Cp(v.normalMap.format),metalnessMap:ht,roughnessMap:He,anisotropy:Ze,anisotropyMap:q,clearcoat:ue,clearcoatMap:J,clearcoatNormalMap:te,clearcoatRoughnessMap:ce,dispersion:at,iridescence:M,iridescenceMap:X,iridescenceThicknessMap:Y,sheen:_,sheenColorMap:me,sheenRoughnessMap:ve,specularMap:ae,specularColorMap:ne,specularIntensityMap:Le,transmission:B,transmissionMap:Ie,thicknessMap:ke,gradientMap:I,opaque:v.transparent===!1&&v.blending===pi&&v.alphaToCoverage===!1,alphaMap:ie,alphaTest:K,alphaHash:_e,combine:v.combine,mapUv:it&&S(v.map.channel),aoMapUv:tt&&S(v.aoMap.channel),lightMapUv:Oe&&S(v.lightMap.channel),bumpMapUv:pt&&S(v.bumpMap.channel),normalMapUv:rt&&S(v.normalMap.channel),displacementMapUv:bt&&S(v.displacementMap.channel),emissiveMapUv:D&&S(v.emissiveMap.channel),metalnessMapUv:ht&&S(v.metalnessMap.channel),roughnessMapUv:He&&S(v.roughnessMap.channel),anisotropyMapUv:q&&S(v.anisotropyMap.channel),clearcoatMapUv:J&&S(v.clearcoatMap.channel),clearcoatNormalMapUv:te&&S(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&S(v.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&S(v.iridescenceMap.channel),iridescenceThicknessMapUv:Y&&S(v.iridescenceThicknessMap.channel),sheenColorMapUv:me&&S(v.sheenColorMap.channel),sheenRoughnessMapUv:ve&&S(v.sheenRoughnessMap.channel),specularMapUv:ae&&S(v.specularMap.channel),specularColorMapUv:ne&&S(v.specularColorMap.channel),specularIntensityMapUv:Le&&S(v.specularIntensityMap.channel),transmissionMapUv:Ie&&S(v.transmissionMap.channel),thicknessMapUv:ke&&S(v.thicknessMap.channel),alphaMapUv:ie&&S(v.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(rt||Ze),vertexNormals:!!U.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!U.attributes.uv&&(it||ie),fog:!!G,useFog:v.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||U.attributes.normal===void 0&&rt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ae,skinning:O.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:Re,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:e.shadowMap.enabled&&y.length>0,shadowMapType:e.shadowMap.type,toneMapping:Q,decodeVideoTexture:it&&v.map.isVideoTexture===!0&&nt.getTransfer(v.map.colorSpace)===Je,decodeVideoTextureEmissive:D&&v.emissiveMap.isVideoTexture===!0&&nt.getTransfer(v.emissiveMap.colorSpace)===Je,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Ut,flipSided:v.side===Lt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:oe&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&v.extensions.multiDraw===!0||be)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ee.vertexUv1s=c.has(1),Ee.vertexUv2s=c.has(2),Ee.vertexUv3s=c.has(3),c.clear(),Ee}function d(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const y in v.defines)T.push(y),T.push(v.defines[y]);return v.isRawShaderMaterial===!1&&(h(T,v),E(T,v),T.push(e.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function h(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function E(v,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),v.push(o.mask)}function R(v){const T=m[v.type];let y;if(T){const w=kt[T];y=xc.clone(w.uniforms)}else y=v.uniforms;return y}function b(v,T){let y=p.get(T);return y!==void 0?++y.usedTimes:(y=new Ap(e,T,v,a),l.push(y),p.set(T,y)),y}function C(v){if(--v.usedTimes===0){const T=l.indexOf(v);l[T]=l[l.length-1],l.pop(),p.delete(v.cacheKey),v.destroy()}}function A(v){s.remove(v)}function P(){s.dispose()}return{getParameters:x,getProgramCacheKey:d,getUniforms:R,acquireProgram:b,releaseProgram:C,releaseShaderCache:A,programs:l,dispose:P}}function Pp(){let e=new WeakMap;function n(o){return e.has(o)}function t(o){let s=e.get(o);return s===void 0&&(s={},e.set(o,s)),s}function i(o){e.delete(o)}function a(o,s,c){e.get(o)[s]=c}function r(){e=new WeakMap}return{has:n,get:t,remove:i,update:a,dispose:r}}function yp(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.materialVariant!==n.materialVariant?e.materialVariant-n.materialVariant:e.z!==n.z?e.z-n.z:e.id-n.id}function Ba(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function Ha(){const e=[];let n=0;const t=[],i=[],a=[];function r(){n=0,t.length=0,i.length=0,a.length=0}function o(f){let m=0;return f.isInstancedMesh&&(m+=2),f.isSkinnedMesh&&(m+=1),m}function s(f,m,S,x,d,h){let E=e[n];return E===void 0?(E={id:f.id,object:f,geometry:m,material:S,materialVariant:o(f),groupOrder:x,renderOrder:f.renderOrder,z:d,group:h},e[n]=E):(E.id=f.id,E.object=f,E.geometry=m,E.material=S,E.materialVariant=o(f),E.groupOrder=x,E.renderOrder=f.renderOrder,E.z=d,E.group=h),n++,E}function c(f,m,S,x,d,h){const E=s(f,m,S,x,d,h);S.transmission>0?i.push(E):S.transparent===!0?a.push(E):t.push(E)}function l(f,m,S,x,d,h){const E=s(f,m,S,x,d,h);S.transmission>0?i.unshift(E):S.transparent===!0?a.unshift(E):t.unshift(E)}function p(f,m){t.length>1&&t.sort(f||yp),i.length>1&&i.sort(m||Ba),a.length>1&&a.sort(m||Ba)}function u(){for(let f=n,m=e.length;f<m;f++){const S=e[f];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:i,transparent:a,init:r,push:c,unshift:l,finish:u,sort:p}}function Ip(){let e=new WeakMap;function n(i,a){const r=e.get(i);let o;return r===void 0?(o=new Ha,e.set(i,[o])):a>=r.length?(o=new Ha,r.push(o)):o=r[a],o}function t(){e=new WeakMap}return{get:n,dispose:t}}function Up(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new Z,color:new ze};break;case"SpotLight":t={position:new Z,direction:new Z,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Z,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Z,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return e[n.id]=t,t}}}function Dp(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let Np=0;function Fp(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Op(e){const n=new Up,t=Dp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new Z);const a=new Z,r=new mt,o=new mt;function s(l){let p=0,u=0,f=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let m=0,S=0,x=0,d=0,h=0,E=0,R=0,b=0,C=0,A=0,P=0;l.sort(Fp);for(let T=0,y=l.length;T<y;T++){const w=l[T],O=w.color,H=w.intensity,G=w.distance;let U=null;if(w.shadow&&w.shadow.map&&(w.shadow.map.texture.format===Ln?U=w.shadow.map.texture:U=w.shadow.map.depthTexture||w.shadow.map.texture),w.isAmbientLight)p+=O.r*H,u+=O.g*H,f+=O.b*H;else if(w.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(w.sh.coefficients[F],H);P++}else if(w.isDirectionalLight){const F=n.get(w);if(F.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const L=w.shadow,W=t.get(w);W.shadowIntensity=L.intensity,W.shadowBias=L.bias,W.shadowNormalBias=L.normalBias,W.shadowRadius=L.radius,W.shadowMapSize=L.mapSize,i.directionalShadow[m]=W,i.directionalShadowMap[m]=U,i.directionalShadowMatrix[m]=w.shadow.matrix,E++}i.directional[m]=F,m++}else if(w.isSpotLight){const F=n.get(w);F.position.setFromMatrixPosition(w.matrixWorld),F.color.copy(O).multiplyScalar(H),F.distance=G,F.coneCos=Math.cos(w.angle),F.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),F.decay=w.decay,i.spot[x]=F;const L=w.shadow;if(w.map&&(i.spotLightMap[C]=w.map,C++,L.updateMatrices(w),w.castShadow&&A++),i.spotLightMatrix[x]=L.matrix,w.castShadow){const W=t.get(w);W.shadowIntensity=L.intensity,W.shadowBias=L.bias,W.shadowNormalBias=L.normalBias,W.shadowRadius=L.radius,W.shadowMapSize=L.mapSize,i.spotShadow[x]=W,i.spotShadowMap[x]=U,b++}x++}else if(w.isRectAreaLight){const F=n.get(w);F.color.copy(O).multiplyScalar(H),F.halfWidth.set(w.width*.5,0,0),F.halfHeight.set(0,w.height*.5,0),i.rectArea[d]=F,d++}else if(w.isPointLight){const F=n.get(w);if(F.color.copy(w.color).multiplyScalar(w.intensity),F.distance=w.distance,F.decay=w.decay,w.castShadow){const L=w.shadow,W=t.get(w);W.shadowIntensity=L.intensity,W.shadowBias=L.bias,W.shadowNormalBias=L.normalBias,W.shadowRadius=L.radius,W.shadowMapSize=L.mapSize,W.shadowCameraNear=L.camera.near,W.shadowCameraFar=L.camera.far,i.pointShadow[S]=W,i.pointShadowMap[S]=U,i.pointShadowMatrix[S]=w.shadow.matrix,R++}i.point[S]=F,S++}else if(w.isHemisphereLight){const F=n.get(w);F.skyColor.copy(w.color).multiplyScalar(H),F.groundColor.copy(w.groundColor).multiplyScalar(H),i.hemi[h]=F,h++}}d>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2)),i.ambient[0]=p,i.ambient[1]=u,i.ambient[2]=f;const v=i.hash;(v.directionalLength!==m||v.pointLength!==S||v.spotLength!==x||v.rectAreaLength!==d||v.hemiLength!==h||v.numDirectionalShadows!==E||v.numPointShadows!==R||v.numSpotShadows!==b||v.numSpotMaps!==C||v.numLightProbes!==P)&&(i.directional.length=m,i.spot.length=x,i.rectArea.length=d,i.point.length=S,i.hemi.length=h,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=b+C-A,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=P,v.directionalLength=m,v.pointLength=S,v.spotLength=x,v.rectAreaLength=d,v.hemiLength=h,v.numDirectionalShadows=E,v.numPointShadows=R,v.numSpotShadows=b,v.numSpotMaps=C,v.numLightProbes=P,i.version=Np++)}function c(l,p){let u=0,f=0,m=0,S=0,x=0;const d=p.matrixWorldInverse;for(let h=0,E=l.length;h<E;h++){const R=l[h];if(R.isDirectionalLight){const b=i.directional[u];b.direction.setFromMatrixPosition(R.matrixWorld),a.setFromMatrixPosition(R.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(d),u++}else if(R.isSpotLight){const b=i.spot[m];b.position.setFromMatrixPosition(R.matrixWorld),b.position.applyMatrix4(d),b.direction.setFromMatrixPosition(R.matrixWorld),a.setFromMatrixPosition(R.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(d),m++}else if(R.isRectAreaLight){const b=i.rectArea[S];b.position.setFromMatrixPosition(R.matrixWorld),b.position.applyMatrix4(d),o.identity(),r.copy(R.matrixWorld),r.premultiply(d),o.extractRotation(r),b.halfWidth.set(R.width*.5,0,0),b.halfHeight.set(0,R.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),S++}else if(R.isPointLight){const b=i.point[f];b.position.setFromMatrixPosition(R.matrixWorld),b.position.applyMatrix4(d),f++}else if(R.isHemisphereLight){const b=i.hemi[x];b.direction.setFromMatrixPosition(R.matrixWorld),b.direction.transformDirection(d),x++}}}return{setup:s,setupView:c,state:i}}function Ga(e){const n=new Op(e),t=[],i=[],a=[];function r(f){u.camera=f,t.length=0,i.length=0,a.length=0}function o(f){t.push(f)}function s(f){i.push(f)}function c(f){a.push(f)}function l(){n.setup(t)}function p(f){n.setupView(t,f)}const u={lightsArray:t,shadowsArray:i,lightProbeGridArray:a,camera:null,lights:n,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:p,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Bp(e){let n=new WeakMap;function t(a,r=0){const o=n.get(a);let s;return o===void 0?(s=new Ga(e),n.set(a,[s])):r>=o.length?(s=new Ga(e),o.push(s)):s=o[r],s}function i(){n=new WeakMap}return{get:t,dispose:i}}const Hp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gp=`uniform sampler2D shadow_pass;
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
}`,Vp=[new Z(1,0,0),new Z(-1,0,0),new Z(0,1,0),new Z(0,-1,0),new Z(0,0,1),new Z(0,0,-1)],kp=[new Z(0,-1,0),new Z(0,-1,0),new Z(0,0,1),new Z(0,0,-1),new Z(0,-1,0),new Z(0,-1,0)],Va=new mt,Nn=new Z,ki=new Z;function zp(e,n,t){let i=new lo;const a=new Et,r=new Et,o=new At,s=new Js,c=new ec,l={},p=t.maxTextureSize,u={[wn]:Lt,[Lt]:wn,[Ut]:Ut},f=new Jt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:Hp,fragmentShader:Gp}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const S=new gn;S.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new qt(S,f),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=di;let h=this.type;this.render=function(A,P,v){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||A.length===0)return;this.type===tc&&(We("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=di);const T=e.getRenderTarget(),y=e.getActiveCubeFace(),w=e.getActiveMipmapLevel(),O=e.state;O.setBlending(Qt),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const H=h!==this.type;H&&P.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(U=>U.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,U=A.length;G<U;G++){const F=A[G],L=F.shadow;if(L===void 0){We("WebGLShadowMap:",F,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;a.copy(L.mapSize);const W=L.getFrameExtents();a.multiply(W),r.copy(L.mapSize),(a.x>p||a.y>p)&&(a.x>p&&(r.x=Math.floor(p/W.x),a.x=r.x*W.x,L.mapSize.x=r.x),a.y>p&&(r.y=Math.floor(p/W.y),a.y=r.y*W.y,L.mapSize.y=r.y));const j=e.state.buffers.depth.getReversed();if(L.camera._reversedDepth=j,L.map===null||H===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===Vn){if(F.isPointLight){We("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new Kt(a.x,a.y,{format:Ln,type:fn,minFilter:vt,magFilter:vt,generateMipmaps:!1}),L.map.texture.name=F.name+".shadowMap",L.map.depthTexture=new $n(a.x,a.y,on),L.map.depthTexture.name=F.name+".shadowMapDepth",L.map.depthTexture.format=Cn,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Zt,L.map.depthTexture.magFilter=Zt}else F.isPointLight?(L.map=new Go(a.x),L.map.depthTexture=new nc(a.x,_n)):(L.map=new Kt(a.x,a.y),L.map.depthTexture=new $n(a.x,a.y,_n)),L.map.depthTexture.name=F.name+".shadowMap",L.map.depthTexture.format=Cn,this.type===di?(L.map.depthTexture.compareFunction=j?pr:hr,L.map.depthTexture.minFilter=vt,L.map.depthTexture.magFilter=vt):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Zt,L.map.depthTexture.magFilter=Zt);L.camera.updateProjectionMatrix()}const se=L.map.isWebGLCubeRenderTarget?6:1;for(let le=0;le<se;le++){if(L.map.isWebGLCubeRenderTarget)e.setRenderTarget(L.map,le),e.clear();else{le===0&&(e.setRenderTarget(L.map),e.clear());const re=L.getViewport(le);o.set(r.x*re.x,r.y*re.y,r.x*re.z,r.y*re.w),O.viewport(o)}if(F.isPointLight){const re=L.camera,Re=L.matrix,Ne=F.distance||re.far;Ne!==re.far&&(re.far=Ne,re.updateProjectionMatrix()),Nn.setFromMatrixPosition(F.matrixWorld),re.position.copy(Nn),ki.copy(re.position),ki.add(Vp[le]),re.up.copy(kp[le]),re.lookAt(ki),re.updateMatrixWorld(),Re.makeTranslation(-Nn.x,-Nn.y,-Nn.z),Va.multiplyMatrices(re.projectionMatrix,re.matrixWorldInverse),L._frustum.setFromProjectionMatrix(Va,re.coordinateSystem,re.reversedDepth)}else L.updateMatrices(F);i=L.getFrustum(),b(P,v,L.camera,F,this.type)}L.isPointLightShadow!==!0&&this.type===Vn&&E(L,v),L.needsUpdate=!1}h=this.type,d.needsUpdate=!1,e.setRenderTarget(T,y,w)};function E(A,P){const v=n.update(x);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Kt(a.x,a.y,{format:Ln,type:fn})),f.uniforms.shadow_pass.value=A.map.depthTexture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,e.setRenderTarget(A.mapPass),e.clear(),e.renderBufferDirect(P,null,v,f,x,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,e.setRenderTarget(A.map),e.clear(),e.renderBufferDirect(P,null,v,m,x,null)}function R(A,P,v,T){let y=null;const w=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(w!==void 0)y=w;else if(y=v.isPointLight===!0?c:s,e.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const O=y.uuid,H=P.uuid;let G=l[O];G===void 0&&(G={},l[O]=G);let U=G[H];U===void 0&&(U=y.clone(),G[H]=U,P.addEventListener("dispose",C)),y=U}if(y.visible=P.visible,y.wireframe=P.wireframe,T===Vn?y.side=P.shadowSide!==null?P.shadowSide:P.side:y.side=P.shadowSide!==null?P.shadowSide:u[P.side],y.alphaMap=P.alphaMap,y.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,y.map=P.map,y.clipShadows=P.clipShadows,y.clippingPlanes=P.clippingPlanes,y.clipIntersection=P.clipIntersection,y.displacementMap=P.displacementMap,y.displacementScale=P.displacementScale,y.displacementBias=P.displacementBias,y.wireframeLinewidth=P.wireframeLinewidth,y.linewidth=P.linewidth,v.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const O=e.properties.get(y);O.light=v}return y}function b(A,P,v,T,y){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===Vn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);const H=n.update(A),G=A.material;if(Array.isArray(G)){const U=H.groups;for(let F=0,L=U.length;F<L;F++){const W=U[F],j=G[W.materialIndex];if(j&&j.visible){const se=R(A,j,T,y);A.onBeforeShadow(e,A,P,v,H,se,W),e.renderBufferDirect(v,null,H,se,A,W),A.onAfterShadow(e,A,P,v,H,se,W)}}}else if(G.visible){const U=R(A,G,T,y);A.onBeforeShadow(e,A,P,v,H,U,null),e.renderBufferDirect(v,null,H,U,A,null),A.onAfterShadow(e,A,P,v,H,U,null)}}const O=A.children;for(let H=0,G=O.length;H<G;H++)b(O[H],P,v,T,y)}function C(A){A.target.removeEventListener("dispose",C);for(const v in l){const T=l[v],y=A.target.uuid;y in T&&(T[y].dispose(),delete T[y])}}}function Wp(e,n){function t(){let I=!1;const ie=new At;let K=null;const _e=new At(0,0,0,0);return{setMask:function(oe){K!==oe&&!I&&(e.colorMask(oe,oe,oe,oe),K=oe)},setLocked:function(oe){I=oe},setClear:function(oe,Q,Ee,Pe,ct){ct===!0&&(oe*=Pe,Q*=Pe,Ee*=Pe),ie.set(oe,Q,Ee,Pe),_e.equals(ie)===!1&&(e.clearColor(oe,Q,Ee,Pe),_e.copy(ie))},reset:function(){I=!1,K=null,_e.set(-1,0,0,0)}}}function i(){let I=!1,ie=!1,K=null,_e=null,oe=null;return{setReversed:function(Q){if(ie!==Q){const Ee=n.get("EXT_clip_control");Q?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),ie=Q;const Pe=oe;oe=null,this.setClear(Pe)}},getReversed:function(){return ie},setTest:function(Q){Q?ee(e.DEPTH_TEST):Ae(e.DEPTH_TEST)},setMask:function(Q){K!==Q&&!I&&(e.depthMask(Q),K=Q)},setFunc:function(Q){if(ie&&(Q=Pc[Q]),_e!==Q){switch(Q){case _c:e.depthFunc(e.NEVER);break;case mc:e.depthFunc(e.ALWAYS);break;case hc:e.depthFunc(e.LESS);break;case Ir:e.depthFunc(e.LEQUAL);break;case pc:e.depthFunc(e.EQUAL);break;case dc:e.depthFunc(e.GEQUAL);break;case uc:e.depthFunc(e.GREATER);break;case fc:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}_e=Q}},setLocked:function(Q){I=Q},setClear:function(Q){oe!==Q&&(oe=Q,ie&&(Q=1-Q),e.clearDepth(Q))},reset:function(){I=!1,K=null,_e=null,oe=null,ie=!1}}}function a(){let I=!1,ie=null,K=null,_e=null,oe=null,Q=null,Ee=null,Pe=null,ct=null;return{setTest:function(Ke){I||(Ke?ee(e.STENCIL_TEST):Ae(e.STENCIL_TEST))},setMask:function(Ke){ie!==Ke&&!I&&(e.stencilMask(Ke),ie=Ke)},setFunc:function(Ke,$t,Bt){(K!==Ke||_e!==$t||oe!==Bt)&&(e.stencilFunc(Ke,$t,Bt),K=Ke,_e=$t,oe=Bt)},setOp:function(Ke,$t,Bt){(Q!==Ke||Ee!==$t||Pe!==Bt)&&(e.stencilOp(Ke,$t,Bt),Q=Ke,Ee=$t,Pe=Bt)},setLocked:function(Ke){I=Ke},setClear:function(Ke){ct!==Ke&&(e.clearStencil(Ke),ct=Ke)},reset:function(){I=!1,ie=null,K=null,_e=null,oe=null,Q=null,Ee=null,Pe=null,ct=null}}}const r=new t,o=new i,s=new a,c=new WeakMap,l=new WeakMap;let p={},u={},f={},m=new WeakMap,S=[],x=null,d=!1,h=null,E=null,R=null,b=null,C=null,A=null,P=null,v=new ze(0,0,0),T=0,y=!1,w=null,O=null,H=null,G=null,U=null;const F=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let L=!1,W=0;const j=e.getParameter(e.VERSION);j.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(j)[1]),L=W>=1):j.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),L=W>=2);let se=null,le={};const re=e.getParameter(e.SCISSOR_BOX),Re=e.getParameter(e.VIEWPORT),Ne=new At().fromArray(re),we=new At().fromArray(Re);function $(I,ie,K,_e){const oe=new Uint8Array(4),Q=e.createTexture();e.bindTexture(I,Q),e.texParameteri(I,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(I,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Ee=0;Ee<K;Ee++)I===e.TEXTURE_3D||I===e.TEXTURE_2D_ARRAY?e.texImage3D(ie,0,e.RGBA,1,1,_e,0,e.RGBA,e.UNSIGNED_BYTE,oe):e.texImage2D(ie+Ee,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,oe);return Q}const fe={};fe[e.TEXTURE_2D]=$(e.TEXTURE_2D,e.TEXTURE_2D,1),fe[e.TEXTURE_CUBE_MAP]=$(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[e.TEXTURE_2D_ARRAY]=$(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),fe[e.TEXTURE_3D]=$(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ee(e.DEPTH_TEST),o.setFunc(Ir),pt(!1),rt(la),ee(e.CULL_FACE),tt(Qt);function ee(I){p[I]!==!0&&(e.enable(I),p[I]=!0)}function Ae(I){p[I]!==!1&&(e.disable(I),p[I]=!1)}function Ce(I,ie){return f[I]!==ie?(e.bindFramebuffer(I,ie),f[I]=ie,I===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=ie),I===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=ie),!0):!1}function be(I,ie){let K=S,_e=!1;if(I){K=m.get(ie),K===void 0&&(K=[],m.set(ie,K));const oe=I.textures;if(K.length!==oe.length||K[0]!==e.COLOR_ATTACHMENT0){for(let Q=0,Ee=oe.length;Q<Ee;Q++)K[Q]=e.COLOR_ATTACHMENT0+Q;K.length=oe.length,_e=!0}}else K[0]!==e.BACK&&(K[0]=e.BACK,_e=!0);_e&&e.drawBuffers(K)}function it(I){return x!==I?(e.useProgram(I),x=I,!0):!1}const Be={[Un]:e.FUNC_ADD,[Ps]:e.FUNC_SUBTRACT,[Ls]:e.FUNC_REVERSE_SUBTRACT};Be[yc]=e.MIN,Be[Ic]=e.MAX;const Xe={[Xs]:e.ZERO,[Ws]:e.ONE,[zs]:e.SRC_COLOR,[ks]:e.SRC_ALPHA,[Vs]:e.SRC_ALPHA_SATURATE,[Gs]:e.DST_COLOR,[Hs]:e.DST_ALPHA,[Bs]:e.ONE_MINUS_SRC_COLOR,[Os]:e.ONE_MINUS_SRC_ALPHA,[Fs]:e.ONE_MINUS_DST_COLOR,[Ns]:e.ONE_MINUS_DST_ALPHA,[Ds]:e.CONSTANT_COLOR,[Us]:e.ONE_MINUS_CONSTANT_COLOR,[Is]:e.CONSTANT_ALPHA,[ys]:e.ONE_MINUS_CONSTANT_ALPHA};function tt(I,ie,K,_e,oe,Q,Ee,Pe,ct,Ke){if(I===Qt){d===!0&&(Ae(e.BLEND),d=!1);return}if(d===!1&&(ee(e.BLEND),d=!0),I!==Sc){if(I!==h||Ke!==y){if((E!==Un||C!==Un)&&(e.blendEquation(e.FUNC_ADD),E=Un,C=Un),Ke)switch(I){case pi:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case da:e.blendFunc(e.ONE,e.ONE);break;case ua:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case fa:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:et("WebGLState: Invalid blending: ",I);break}else switch(I){case pi:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case da:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case ua:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case fa:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",I);break}R=null,b=null,A=null,P=null,v.set(0,0,0),T=0,h=I,y=Ke}return}oe=oe||ie,Q=Q||K,Ee=Ee||_e,(ie!==E||oe!==C)&&(e.blendEquationSeparate(Be[ie],Be[oe]),E=ie,C=oe),(K!==R||_e!==b||Q!==A||Ee!==P)&&(e.blendFuncSeparate(Xe[K],Xe[_e],Xe[Q],Xe[Ee]),R=K,b=_e,A=Q,P=Ee),(Pe.equals(v)===!1||ct!==T)&&(e.blendColor(Pe.r,Pe.g,Pe.b,ct),v.copy(Pe),T=ct),h=I,y=!1}function Oe(I,ie){I.side===Ut?Ae(e.CULL_FACE):ee(e.CULL_FACE);let K=I.side===Lt;ie&&(K=!K),pt(K),I.blending===pi&&I.transparent===!1?tt(Qt):tt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);const _e=I.stencilWrite;s.setTest(_e),_e&&(s.setMask(I.stencilWriteMask),s.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),s.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),D(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ee(e.SAMPLE_ALPHA_TO_COVERAGE):Ae(e.SAMPLE_ALPHA_TO_COVERAGE)}function pt(I){w!==I&&(I?e.frontFace(e.CW):e.frontFace(e.CCW),w=I)}function rt(I){I!==gc?(ee(e.CULL_FACE),I!==O&&(I===la?e.cullFace(e.BACK):I===vc?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Ae(e.CULL_FACE),O=I}function bt(I){I!==H&&(L&&e.lineWidth(I),H=I)}function D(I,ie,K){I?(ee(e.POLYGON_OFFSET_FILL),(G!==ie||U!==K)&&(G=ie,U=K,o.getReversed()&&(ie=-ie),e.polygonOffset(ie,K))):Ae(e.POLYGON_OFFSET_FILL)}function ht(I){I?ee(e.SCISSOR_TEST):Ae(e.SCISSOR_TEST)}function He(I){I===void 0&&(I=e.TEXTURE0+F-1),se!==I&&(e.activeTexture(I),se=I)}function Ze(I,ie,K){K===void 0&&(se===null?K=e.TEXTURE0+F-1:K=se);let _e=le[K];_e===void 0&&(_e={type:void 0,texture:void 0},le[K]=_e),(_e.type!==I||_e.texture!==ie)&&(se!==K&&(e.activeTexture(K),se=K),e.bindTexture(I,ie||fe[I]),_e.type=I,_e.texture=ie)}function ue(){const I=le[se];I!==void 0&&I.type!==void 0&&(e.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function at(){try{e.compressedTexImage2D(...arguments)}catch(I){et("WebGLState:",I)}}function M(){try{e.compressedTexImage3D(...arguments)}catch(I){et("WebGLState:",I)}}function _(){try{e.texSubImage2D(...arguments)}catch(I){et("WebGLState:",I)}}function B(){try{e.texSubImage3D(...arguments)}catch(I){et("WebGLState:",I)}}function q(){try{e.compressedTexSubImage2D(...arguments)}catch(I){et("WebGLState:",I)}}function J(){try{e.compressedTexSubImage3D(...arguments)}catch(I){et("WebGLState:",I)}}function te(){try{e.texStorage2D(...arguments)}catch(I){et("WebGLState:",I)}}function ce(){try{e.texStorage3D(...arguments)}catch(I){et("WebGLState:",I)}}function X(){try{e.texImage2D(...arguments)}catch(I){et("WebGLState:",I)}}function Y(){try{e.texImage3D(...arguments)}catch(I){et("WebGLState:",I)}}function me(I){return u[I]!==void 0?u[I]:e.getParameter(I)}function ve(I,ie){u[I]!==ie&&(e.pixelStorei(I,ie),u[I]=ie)}function ae(I){Ne.equals(I)===!1&&(e.scissor(I.x,I.y,I.z,I.w),Ne.copy(I))}function ne(I){we.equals(I)===!1&&(e.viewport(I.x,I.y,I.z,I.w),we.copy(I))}function Le(I,ie){let K=l.get(ie);K===void 0&&(K=new WeakMap,l.set(ie,K));let _e=K.get(I);_e===void 0&&(_e=e.getUniformBlockIndex(ie,I.name),K.set(I,_e))}function Ie(I,ie){const _e=l.get(ie).get(I);c.get(ie)!==_e&&(e.uniformBlockBinding(ie,_e,I.__bindingPointIndex),c.set(ie,_e))}function ke(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),p={},u={},se=null,le={},f={},m=new WeakMap,S=[],x=null,d=!1,h=null,E=null,R=null,b=null,C=null,A=null,P=null,v=new ze(0,0,0),T=0,y=!1,w=null,O=null,H=null,G=null,U=null,Ne.set(0,0,e.canvas.width,e.canvas.height),we.set(0,0,e.canvas.width,e.canvas.height),r.reset(),o.reset(),s.reset()}return{buffers:{color:r,depth:o,stencil:s},enable:ee,disable:Ae,bindFramebuffer:Ce,drawBuffers:be,useProgram:it,setBlending:tt,setMaterial:Oe,setFlipSided:pt,setCullFace:rt,setLineWidth:bt,setPolygonOffset:D,setScissorTest:ht,activeTexture:He,bindTexture:Ze,unbindTexture:ue,compressedTexImage2D:at,compressedTexImage3D:M,texImage2D:X,texImage3D:Y,pixelStorei:ve,getParameter:me,updateUBOMapping:Le,uniformBlockBinding:Ie,texStorage2D:te,texStorage3D:ce,texSubImage2D:_,texSubImage3D:B,compressedTexSubImage2D:q,compressedTexSubImage3D:J,scissor:ae,viewport:ne,reset:ke}}function Xp(e,n,t,i,a,r,o){const s=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Et,p=new WeakMap,u=new Set;let f;const m=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(M,_){return S?new OffscreenCanvas(M,_):Rc("canvas")}function d(M,_,B){let q=1;const J=at(M);if((J.width>B||J.height>B)&&(q=B/Math.max(J.width,J.height)),q<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const te=Math.floor(q*J.width),ce=Math.floor(q*J.height);f===void 0&&(f=x(te,ce));const X=_?x(te,ce):f;return X.width=te,X.height=ce,X.getContext("2d").drawImage(M,0,0,te,ce),We("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+te+"x"+ce+")."),X}else return"data"in M&&We("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),M;return M}function h(M){return M.generateMipmaps}function E(M){e.generateMipmap(M)}function R(M){return M.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?e.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(M,_,B,q,J,te=!1){if(M!==null){if(e[M]!==void 0)return e[M];We("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let ce;q&&(ce=n.get("EXT_texture_norm16"),ce||We("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=_;if(_===e.RED&&(B===e.FLOAT&&(X=e.R32F),B===e.HALF_FLOAT&&(X=e.R16F),B===e.UNSIGNED_BYTE&&(X=e.R8),B===e.UNSIGNED_SHORT&&ce&&(X=ce.R16_EXT),B===e.SHORT&&ce&&(X=ce.R16_SNORM_EXT)),_===e.RED_INTEGER&&(B===e.UNSIGNED_BYTE&&(X=e.R8UI),B===e.UNSIGNED_SHORT&&(X=e.R16UI),B===e.UNSIGNED_INT&&(X=e.R32UI),B===e.BYTE&&(X=e.R8I),B===e.SHORT&&(X=e.R16I),B===e.INT&&(X=e.R32I)),_===e.RG&&(B===e.FLOAT&&(X=e.RG32F),B===e.HALF_FLOAT&&(X=e.RG16F),B===e.UNSIGNED_BYTE&&(X=e.RG8),B===e.UNSIGNED_SHORT&&ce&&(X=ce.RG16_EXT),B===e.SHORT&&ce&&(X=ce.RG16_SNORM_EXT)),_===e.RG_INTEGER&&(B===e.UNSIGNED_BYTE&&(X=e.RG8UI),B===e.UNSIGNED_SHORT&&(X=e.RG16UI),B===e.UNSIGNED_INT&&(X=e.RG32UI),B===e.BYTE&&(X=e.RG8I),B===e.SHORT&&(X=e.RG16I),B===e.INT&&(X=e.RG32I)),_===e.RGB_INTEGER&&(B===e.UNSIGNED_BYTE&&(X=e.RGB8UI),B===e.UNSIGNED_SHORT&&(X=e.RGB16UI),B===e.UNSIGNED_INT&&(X=e.RGB32UI),B===e.BYTE&&(X=e.RGB8I),B===e.SHORT&&(X=e.RGB16I),B===e.INT&&(X=e.RGB32I)),_===e.RGBA_INTEGER&&(B===e.UNSIGNED_BYTE&&(X=e.RGBA8UI),B===e.UNSIGNED_SHORT&&(X=e.RGBA16UI),B===e.UNSIGNED_INT&&(X=e.RGBA32UI),B===e.BYTE&&(X=e.RGBA8I),B===e.SHORT&&(X=e.RGBA16I),B===e.INT&&(X=e.RGBA32I)),_===e.RGB&&(B===e.UNSIGNED_SHORT&&ce&&(X=ce.RGB16_EXT),B===e.SHORT&&ce&&(X=ce.RGB16_SNORM_EXT),B===e.UNSIGNED_INT_5_9_9_9_REV&&(X=e.RGB9_E5),B===e.UNSIGNED_INT_10F_11F_11F_REV&&(X=e.R11F_G11F_B10F)),_===e.RGBA){const Y=te?yo:nt.getTransfer(J);B===e.FLOAT&&(X=e.RGBA32F),B===e.HALF_FLOAT&&(X=e.RGBA16F),B===e.UNSIGNED_BYTE&&(X=Y===Je?e.SRGB8_ALPHA8:e.RGBA8),B===e.UNSIGNED_SHORT&&ce&&(X=ce.RGBA16_EXT),B===e.SHORT&&ce&&(X=ce.RGBA16_SNORM_EXT),B===e.UNSIGNED_SHORT_4_4_4_4&&(X=e.RGBA4),B===e.UNSIGNED_SHORT_5_5_5_1&&(X=e.RGB5_A1)}return(X===e.R16F||X===e.R32F||X===e.RG16F||X===e.RG32F||X===e.RGBA16F||X===e.RGBA32F)&&n.get("EXT_color_buffer_float"),X}function C(M,_){let B;return M?_===null||_===_n||_===jn?B=e.DEPTH24_STENCIL8:_===on?B=e.DEPTH32F_STENCIL8:_===xi&&(B=e.DEPTH24_STENCIL8,We("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===_n||_===jn?B=e.DEPTH_COMPONENT24:_===on?B=e.DEPTH_COMPONENT32F:_===xi&&(B=e.DEPTH_COMPONENT16),B}function A(M,_){return h(M)===!0||M.isFramebufferTexture&&M.minFilter!==Zt&&M.minFilter!==vt?Math.log2(Math.max(_.width,_.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?_.mipmaps.length:1}function P(M){const _=M.target;_.removeEventListener("dispose",P),T(_),_.isVideoTexture&&p.delete(_),_.isHTMLTexture&&u.delete(_)}function v(M){const _=M.target;_.removeEventListener("dispose",v),w(_)}function T(M){const _=i.get(M);if(_.__webglInit===void 0)return;const B=M.source,q=m.get(B);if(q){const J=q[_.__cacheKey];J.usedTimes--,J.usedTimes===0&&y(M),Object.keys(q).length===0&&m.delete(B)}i.remove(M)}function y(M){const _=i.get(M);e.deleteTexture(_.__webglTexture);const B=M.source,q=m.get(B);delete q[_.__cacheKey],o.memory.textures--}function w(M){const _=i.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),i.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let J=0;J<_.__webglFramebuffer[q].length;J++)e.deleteFramebuffer(_.__webglFramebuffer[q][J]);else e.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)e.deleteFramebuffer(_.__webglFramebuffer[q]);else e.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&e.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&e.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&e.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const B=M.textures;for(let q=0,J=B.length;q<J;q++){const te=i.get(B[q]);te.__webglTexture&&(e.deleteTexture(te.__webglTexture),o.memory.textures--),i.remove(B[q])}i.remove(M)}let O=0;function H(){O=0}function G(){return O}function U(M){O=M}function F(){const M=O;return M>=a.maxTextures&&We("WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+a.maxTextures),O+=1,M}function L(M){const _=[];return _.push(M.wrapS),_.push(M.wrapT),_.push(M.wrapR||0),_.push(M.magFilter),_.push(M.minFilter),_.push(M.anisotropy),_.push(M.internalFormat),_.push(M.format),_.push(M.type),_.push(M.generateMipmaps),_.push(M.premultiplyAlpha),_.push(M.flipY),_.push(M.unpackAlignment),_.push(M.colorSpace),_.join()}function W(M,_){const B=i.get(M);if(M.isVideoTexture&&Ze(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&B.__version!==M.version){const q=M.image;if(q===null)We("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)We("WebGLRenderer: Texture marked for update but image is incomplete");else{Ae(B,M,_);return}}else M.isExternalTexture&&(B.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,B.__webglTexture,e.TEXTURE0+_)}function j(M,_){const B=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&B.__version!==M.version){Ae(B,M,_);return}else M.isExternalTexture&&(B.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(e.TEXTURE_2D_ARRAY,B.__webglTexture,e.TEXTURE0+_)}function se(M,_){const B=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&B.__version!==M.version){Ae(B,M,_);return}t.bindTexture(e.TEXTURE_3D,B.__webglTexture,e.TEXTURE0+_)}function le(M,_){const B=i.get(M);if(M.isCubeDepthTexture!==!0&&M.version>0&&B.__version!==M.version){Ce(B,M,_);return}t.bindTexture(e.TEXTURE_CUBE_MAP,B.__webglTexture,e.TEXTURE0+_)}const re={[Si]:e.REPEAT,[Zn]:e.CLAMP_TO_EDGE,[uo]:e.MIRRORED_REPEAT},Re={[Zt]:e.NEAREST,[po]:e.NEAREST_MIPMAP_NEAREST,[Gn]:e.NEAREST_MIPMAP_LINEAR,[vt]:e.LINEAR,[ui]:e.LINEAR_MIPMAP_NEAREST,[jt]:e.LINEAR_MIPMAP_LINEAR},Ne={[Zs]:e.NEVER,[js]:e.ALWAYS,[$s]:e.LESS,[hr]:e.LEQUAL,[Ys]:e.EQUAL,[pr]:e.GEQUAL,[qs]:e.GREATER,[Ks]:e.NOTEQUAL};function we(M,_){if(_.type===on&&n.has("OES_texture_float_linear")===!1&&(_.magFilter===vt||_.magFilter===ui||_.magFilter===Gn||_.magFilter===jt||_.minFilter===vt||_.minFilter===ui||_.minFilter===Gn||_.minFilter===jt)&&We("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(M,e.TEXTURE_WRAP_S,re[_.wrapS]),e.texParameteri(M,e.TEXTURE_WRAP_T,re[_.wrapT]),(M===e.TEXTURE_3D||M===e.TEXTURE_2D_ARRAY)&&e.texParameteri(M,e.TEXTURE_WRAP_R,re[_.wrapR]),e.texParameteri(M,e.TEXTURE_MAG_FILTER,Re[_.magFilter]),e.texParameteri(M,e.TEXTURE_MIN_FILTER,Re[_.minFilter]),_.compareFunction&&(e.texParameteri(M,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(M,e.TEXTURE_COMPARE_FUNC,Ne[_.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Zt||_.minFilter!==Gn&&_.minFilter!==jt||_.type===on&&n.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const B=n.get("EXT_texture_filter_anisotropic");e.texParameterf(M,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,a.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function $(M,_){let B=!1;M.__webglInit===void 0&&(M.__webglInit=!0,_.addEventListener("dispose",P));const q=_.source;let J=m.get(q);J===void 0&&(J={},m.set(q,J));const te=L(_);if(te!==M.__cacheKey){J[te]===void 0&&(J[te]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,B=!0),J[te].usedTimes++;const ce=J[M.__cacheKey];ce!==void 0&&(J[M.__cacheKey].usedTimes--,ce.usedTimes===0&&y(_)),M.__cacheKey=te,M.__webglTexture=J[te].texture}return B}function fe(M,_,B){return Math.floor(Math.floor(M/B)/_)}function ee(M,_,B,q){const te=M.updateRanges;if(te.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,_.width,_.height,B,q,_.data);else{te.sort((ve,ae)=>ve.start-ae.start);let ce=0;for(let ve=1;ve<te.length;ve++){const ae=te[ce],ne=te[ve],Le=ae.start+ae.count,Ie=fe(ne.start,_.width,4),ke=fe(ae.start,_.width,4);ne.start<=Le+1&&Ie===ke&&fe(ne.start+ne.count-1,_.width,4)===Ie?ae.count=Math.max(ae.count,ne.start+ne.count-ae.start):(++ce,te[ce]=ne)}te.length=ce+1;const X=t.getParameter(e.UNPACK_ROW_LENGTH),Y=t.getParameter(e.UNPACK_SKIP_PIXELS),me=t.getParameter(e.UNPACK_SKIP_ROWS);t.pixelStorei(e.UNPACK_ROW_LENGTH,_.width);for(let ve=0,ae=te.length;ve<ae;ve++){const ne=te[ve],Le=Math.floor(ne.start/4),Ie=Math.ceil(ne.count/4),ke=Le%_.width,I=Math.floor(Le/_.width),ie=Ie,K=1;t.pixelStorei(e.UNPACK_SKIP_PIXELS,ke),t.pixelStorei(e.UNPACK_SKIP_ROWS,I),t.texSubImage2D(e.TEXTURE_2D,0,ke,I,ie,K,B,q,_.data)}M.clearUpdateRanges(),t.pixelStorei(e.UNPACK_ROW_LENGTH,X),t.pixelStorei(e.UNPACK_SKIP_PIXELS,Y),t.pixelStorei(e.UNPACK_SKIP_ROWS,me)}}function Ae(M,_,B){let q=e.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=e.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=e.TEXTURE_3D);const J=$(M,_),te=_.source;t.bindTexture(q,M.__webglTexture,e.TEXTURE0+B);const ce=i.get(te);if(te.version!==ce.__version||J===!0){if(t.activeTexture(e.TEXTURE0+B),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const K=nt.getPrimaries(nt.workingColorSpace),_e=_.colorSpace===En?null:nt.getPrimaries(_.colorSpace),oe=_.colorSpace===En||K===_e?e.NONE:e.BROWSER_DEFAULT_WEBGL;t.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe)}t.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment);let Y=d(_.image,!1,a.maxTextureSize);Y=ue(_,Y);const me=r.convert(_.format,_.colorSpace),ve=r.convert(_.type);let ae=b(_.internalFormat,me,ve,_.normalized,_.colorSpace,_.isVideoTexture);we(q,_);let ne;const Le=_.mipmaps,Ie=_.isVideoTexture!==!0,ke=ce.__version===void 0||J===!0,I=te.dataReady,ie=A(_,Y);if(_.isDepthTexture)ae=C(_.format===Tn,_.type),ke&&(Ie?t.texStorage2D(e.TEXTURE_2D,1,ae,Y.width,Y.height):t.texImage2D(e.TEXTURE_2D,0,ae,Y.width,Y.height,0,me,ve,null));else if(_.isDataTexture)if(Le.length>0){Ie&&ke&&t.texStorage2D(e.TEXTURE_2D,ie,ae,Le[0].width,Le[0].height);for(let K=0,_e=Le.length;K<_e;K++)ne=Le[K],Ie?I&&t.texSubImage2D(e.TEXTURE_2D,K,0,0,ne.width,ne.height,me,ve,ne.data):t.texImage2D(e.TEXTURE_2D,K,ae,ne.width,ne.height,0,me,ve,ne.data);_.generateMipmaps=!1}else Ie?(ke&&t.texStorage2D(e.TEXTURE_2D,ie,ae,Y.width,Y.height),I&&ee(_,Y,me,ve)):t.texImage2D(e.TEXTURE_2D,0,ae,Y.width,Y.height,0,me,ve,Y.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ie&&ke&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ie,ae,Le[0].width,Le[0].height,Y.depth);for(let K=0,_e=Le.length;K<_e;K++)if(ne=Le[K],_.format!==Wt)if(me!==null)if(Ie){if(I)if(_.layerUpdates.size>0){const oe=ha(ne.width,ne.height,_.format,_.type);for(const Q of _.layerUpdates){const Ee=ne.data.subarray(Q*oe/ne.data.BYTES_PER_ELEMENT,(Q+1)*oe/ne.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,K,0,0,Q,ne.width,ne.height,1,me,Ee)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,K,0,0,0,ne.width,ne.height,Y.depth,me,ne.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,K,ae,ne.width,ne.height,Y.depth,0,ne.data,0,0);else We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ie?I&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,K,0,0,0,ne.width,ne.height,Y.depth,me,ve,ne.data):t.texImage3D(e.TEXTURE_2D_ARRAY,K,ae,ne.width,ne.height,Y.depth,0,me,ve,ne.data)}else{Ie&&ke&&t.texStorage2D(e.TEXTURE_2D,ie,ae,Le[0].width,Le[0].height);for(let K=0,_e=Le.length;K<_e;K++)ne=Le[K],_.format!==Wt?me!==null?Ie?I&&t.compressedTexSubImage2D(e.TEXTURE_2D,K,0,0,ne.width,ne.height,me,ne.data):t.compressedTexImage2D(e.TEXTURE_2D,K,ae,ne.width,ne.height,0,ne.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ie?I&&t.texSubImage2D(e.TEXTURE_2D,K,0,0,ne.width,ne.height,me,ve,ne.data):t.texImage2D(e.TEXTURE_2D,K,ae,ne.width,ne.height,0,me,ve,ne.data)}else if(_.isDataArrayTexture)if(Ie){if(ke&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ie,ae,Y.width,Y.height,Y.depth),I)if(_.layerUpdates.size>0){const K=ha(Y.width,Y.height,_.format,_.type);for(const _e of _.layerUpdates){const oe=Y.data.subarray(_e*K/Y.data.BYTES_PER_ELEMENT,(_e+1)*K/Y.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,_e,Y.width,Y.height,1,me,ve,oe)}_.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,me,ve,Y.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,ae,Y.width,Y.height,Y.depth,0,me,ve,Y.data);else if(_.isData3DTexture)Ie?(ke&&t.texStorage3D(e.TEXTURE_3D,ie,ae,Y.width,Y.height,Y.depth),I&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,me,ve,Y.data)):t.texImage3D(e.TEXTURE_3D,0,ae,Y.width,Y.height,Y.depth,0,me,ve,Y.data);else if(_.isFramebufferTexture){if(ke)if(Ie)t.texStorage2D(e.TEXTURE_2D,ie,ae,Y.width,Y.height);else{let K=Y.width,_e=Y.height;for(let oe=0;oe<ie;oe++)t.texImage2D(e.TEXTURE_2D,oe,ae,K,_e,0,me,ve,null),K>>=1,_e>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in e){const K=e.canvas;if(K.hasAttribute("layoutsubtree")||K.setAttribute("layoutsubtree","true"),Y.parentNode!==K){K.appendChild(Y),u.add(_),K.onpaint=Pe=>{const ct=Pe.changedElements;for(const Ke of u)ct.includes(Ke.image)&&(Ke.needsUpdate=!0)},K.requestPaint();return}const _e=0,oe=e.RGBA,Q=e.RGBA,Ee=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,_e,oe,Q,Ee,Y),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Le.length>0){if(Ie&&ke){const K=at(Le[0]);t.texStorage2D(e.TEXTURE_2D,ie,ae,K.width,K.height)}for(let K=0,_e=Le.length;K<_e;K++)ne=Le[K],Ie?I&&t.texSubImage2D(e.TEXTURE_2D,K,0,0,me,ve,ne):t.texImage2D(e.TEXTURE_2D,K,ae,me,ve,ne);_.generateMipmaps=!1}else if(Ie){if(ke){const K=at(Y);t.texStorage2D(e.TEXTURE_2D,ie,ae,K.width,K.height)}I&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,me,ve,Y)}else t.texImage2D(e.TEXTURE_2D,0,ae,me,ve,Y);h(_)&&E(q),ce.__version=te.version,_.onUpdate&&_.onUpdate(_)}M.__version=_.version}function Ce(M,_,B){if(_.image.length!==6)return;const q=$(M,_),J=_.source;t.bindTexture(e.TEXTURE_CUBE_MAP,M.__webglTexture,e.TEXTURE0+B);const te=i.get(J);if(J.version!==te.__version||q===!0){t.activeTexture(e.TEXTURE0+B);const ce=nt.getPrimaries(nt.workingColorSpace),X=_.colorSpace===En?null:nt.getPrimaries(_.colorSpace),Y=_.colorSpace===En||ce===X?e.NONE:e.BROWSER_DEFAULT_WEBGL;t.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);const me=_.isCompressedTexture||_.image[0].isCompressedTexture,ve=_.image[0]&&_.image[0].isDataTexture,ae=[];for(let Q=0;Q<6;Q++)!me&&!ve?ae[Q]=d(_.image[Q],!0,a.maxCubemapSize):ae[Q]=ve?_.image[Q].image:_.image[Q],ae[Q]=ue(_,ae[Q]);const ne=ae[0],Le=r.convert(_.format,_.colorSpace),Ie=r.convert(_.type),ke=b(_.internalFormat,Le,Ie,_.normalized,_.colorSpace),I=_.isVideoTexture!==!0,ie=te.__version===void 0||q===!0,K=J.dataReady;let _e=A(_,ne);we(e.TEXTURE_CUBE_MAP,_);let oe;if(me){I&&ie&&t.texStorage2D(e.TEXTURE_CUBE_MAP,_e,ke,ne.width,ne.height);for(let Q=0;Q<6;Q++){oe=ae[Q].mipmaps;for(let Ee=0;Ee<oe.length;Ee++){const Pe=oe[Ee];_.format!==Wt?Le!==null?I?K&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee,0,0,Pe.width,Pe.height,Le,Pe.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee,ke,Pe.width,Pe.height,0,Pe.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?K&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee,0,0,Pe.width,Pe.height,Le,Ie,Pe.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee,ke,Pe.width,Pe.height,0,Le,Ie,Pe.data)}}}else{if(oe=_.mipmaps,I&&ie){oe.length>0&&_e++;const Q=at(ae[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,_e,ke,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ve){I?K&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ae[Q].width,ae[Q].height,Le,Ie,ae[Q].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,ke,ae[Q].width,ae[Q].height,0,Le,Ie,ae[Q].data);for(let Ee=0;Ee<oe.length;Ee++){const ct=oe[Ee].image[Q].image;I?K&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee+1,0,0,ct.width,ct.height,Le,Ie,ct.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee+1,ke,ct.width,ct.height,0,Le,Ie,ct.data)}}else{I?K&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Le,Ie,ae[Q]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,ke,Le,Ie,ae[Q]);for(let Ee=0;Ee<oe.length;Ee++){const Pe=oe[Ee];I?K&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee+1,0,0,Le,Ie,Pe.image[Q]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee+1,ke,Le,Ie,Pe.image[Q])}}}h(_)&&E(e.TEXTURE_CUBE_MAP),te.__version=J.version,_.onUpdate&&_.onUpdate(_)}M.__version=_.version}function be(M,_,B,q,J,te){const ce=r.convert(B.format,B.colorSpace),X=r.convert(B.type),Y=b(B.internalFormat,ce,X,B.normalized,B.colorSpace),me=i.get(_),ve=i.get(B);if(ve.__renderTarget=_,!me.__hasExternalTextures){const ae=Math.max(1,_.width>>te),ne=Math.max(1,_.height>>te);J===e.TEXTURE_3D||J===e.TEXTURE_2D_ARRAY?t.texImage3D(J,te,Y,ae,ne,_.depth,0,ce,X,null):t.texImage2D(J,te,Y,ae,ne,0,ce,X,null)}t.bindFramebuffer(e.FRAMEBUFFER,M),He(_)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,q,J,ve.__webglTexture,0,ht(_)):(J===e.TEXTURE_2D||J>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,q,J,ve.__webglTexture,te),t.bindFramebuffer(e.FRAMEBUFFER,null)}function it(M,_,B){if(e.bindRenderbuffer(e.RENDERBUFFER,M),_.depthBuffer){const q=_.depthTexture,J=q&&q.isDepthTexture?q.type:null,te=C(_.stencilBuffer,J),ce=_.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;He(_)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ht(_),te,_.width,_.height):B?e.renderbufferStorageMultisample(e.RENDERBUFFER,ht(_),te,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,te,_.width,_.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,ce,e.RENDERBUFFER,M)}else{const q=_.textures;for(let J=0;J<q.length;J++){const te=q[J],ce=r.convert(te.format,te.colorSpace),X=r.convert(te.type),Y=b(te.internalFormat,ce,X,te.normalized,te.colorSpace);He(_)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ht(_),Y,_.width,_.height):B?e.renderbufferStorageMultisample(e.RENDERBUFFER,ht(_),Y,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,Y,_.width,_.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Be(M,_,B){const q=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(e.FRAMEBUFFER,M),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=i.get(_.depthTexture);if(J.__renderTarget=_,(!J.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q){if(J.__webglInit===void 0&&(J.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),J.__webglTexture===void 0){J.__webglTexture=e.createTexture(),t.bindTexture(e.TEXTURE_CUBE_MAP,J.__webglTexture),we(e.TEXTURE_CUBE_MAP,_.depthTexture);const me=r.convert(_.depthTexture.format),ve=r.convert(_.depthTexture.type);let ae;_.depthTexture.format===Cn?ae=e.DEPTH_COMPONENT24:_.depthTexture.format===Tn&&(ae=e.DEPTH24_STENCIL8);for(let ne=0;ne<6;ne++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,ae,_.width,_.height,0,me,ve,null)}}else W(_.depthTexture,0);const te=J.__webglTexture,ce=ht(_),X=q?e.TEXTURE_CUBE_MAP_POSITIVE_X+B:e.TEXTURE_2D,Y=_.depthTexture.format===Tn?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(_.depthTexture.format===Cn)He(_)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Y,X,te,0,ce):e.framebufferTexture2D(e.FRAMEBUFFER,Y,X,te,0);else if(_.depthTexture.format===Tn)He(_)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Y,X,te,0,ce):e.framebufferTexture2D(e.FRAMEBUFFER,Y,X,te,0);else throw new Error("Unknown depthTexture format")}function Xe(M){const _=i.get(M),B=M.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==M.depthTexture){const q=M.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){const J=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",J)};q.addEventListener("dispose",J),_.__depthDisposeCallback=J}_.__boundDepthTexture=q}if(M.depthTexture&&!_.__autoAllocateDepthBuffer)if(B)for(let q=0;q<6;q++)Be(_.__webglFramebuffer[q],M,q);else{const q=M.texture.mipmaps;q&&q.length>0?Be(_.__webglFramebuffer[0],M,0):Be(_.__webglFramebuffer,M,0)}else if(B){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=e.createRenderbuffer(),it(_.__webglDepthbuffer[q],M,!1);else{const J=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,te=_.__webglDepthbuffer[q];e.bindRenderbuffer(e.RENDERBUFFER,te),e.framebufferRenderbuffer(e.FRAMEBUFFER,J,e.RENDERBUFFER,te)}}else{const q=M.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=e.createRenderbuffer(),it(_.__webglDepthbuffer,M,!1);else{const J=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,te=_.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,te),e.framebufferRenderbuffer(e.FRAMEBUFFER,J,e.RENDERBUFFER,te)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function tt(M,_,B){const q=i.get(M);_!==void 0&&be(q.__webglFramebuffer,M,M.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),B!==void 0&&Xe(M)}function Oe(M){const _=M.texture,B=i.get(M),q=i.get(_);M.addEventListener("dispose",v);const J=M.textures,te=M.isWebGLCubeRenderTarget===!0,ce=J.length>1;if(ce||(q.__webglTexture===void 0&&(q.__webglTexture=e.createTexture()),q.__version=_.version,o.memory.textures++),te){B.__webglFramebuffer=[];for(let X=0;X<6;X++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[X]=[];for(let Y=0;Y<_.mipmaps.length;Y++)B.__webglFramebuffer[X][Y]=e.createFramebuffer()}else B.__webglFramebuffer[X]=e.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let X=0;X<_.mipmaps.length;X++)B.__webglFramebuffer[X]=e.createFramebuffer()}else B.__webglFramebuffer=e.createFramebuffer();if(ce)for(let X=0,Y=J.length;X<Y;X++){const me=i.get(J[X]);me.__webglTexture===void 0&&(me.__webglTexture=e.createTexture(),o.memory.textures++)}if(M.samples>0&&He(M)===!1){B.__webglMultisampledFramebuffer=e.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let X=0;X<J.length;X++){const Y=J[X];B.__webglColorRenderbuffer[X]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,B.__webglColorRenderbuffer[X]);const me=r.convert(Y.format,Y.colorSpace),ve=r.convert(Y.type),ae=b(Y.internalFormat,me,ve,Y.normalized,Y.colorSpace,M.isXRRenderTarget===!0),ne=ht(M);e.renderbufferStorageMultisample(e.RENDERBUFFER,ne,ae,M.width,M.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+X,e.RENDERBUFFER,B.__webglColorRenderbuffer[X])}e.bindRenderbuffer(e.RENDERBUFFER,null),M.depthBuffer&&(B.__webglDepthRenderbuffer=e.createRenderbuffer(),it(B.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(te){t.bindTexture(e.TEXTURE_CUBE_MAP,q.__webglTexture),we(e.TEXTURE_CUBE_MAP,_);for(let X=0;X<6;X++)if(_.mipmaps&&_.mipmaps.length>0)for(let Y=0;Y<_.mipmaps.length;Y++)be(B.__webglFramebuffer[X][Y],M,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+X,Y);else be(B.__webglFramebuffer[X],M,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);h(_)&&E(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let X=0,Y=J.length;X<Y;X++){const me=J[X],ve=i.get(me);let ae=e.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(ae=M.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(ae,ve.__webglTexture),we(ae,me),be(B.__webglFramebuffer,M,me,e.COLOR_ATTACHMENT0+X,ae,0),h(me)&&E(ae)}t.unbindTexture()}else{let X=e.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(X=M.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(X,q.__webglTexture),we(X,_),_.mipmaps&&_.mipmaps.length>0)for(let Y=0;Y<_.mipmaps.length;Y++)be(B.__webglFramebuffer[Y],M,_,e.COLOR_ATTACHMENT0,X,Y);else be(B.__webglFramebuffer,M,_,e.COLOR_ATTACHMENT0,X,0);h(_)&&E(X),t.unbindTexture()}M.depthBuffer&&Xe(M)}function pt(M){const _=M.textures;for(let B=0,q=_.length;B<q;B++){const J=_[B];if(h(J)){const te=R(M),ce=i.get(J).__webglTexture;t.bindTexture(te,ce),E(te),t.unbindTexture()}}}const rt=[],bt=[];function D(M){if(M.samples>0){if(He(M)===!1){const _=M.textures,B=M.width,q=M.height;let J=e.COLOR_BUFFER_BIT;const te=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ce=i.get(M),X=_.length>1;if(X)for(let me=0;me<_.length;me++)t.bindFramebuffer(e.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,ce.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const Y=M.texture.mipmaps;Y&&Y.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let me=0;me<_.length;me++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(J|=e.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(J|=e.STENCIL_BUFFER_BIT)),X){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,ce.__webglColorRenderbuffer[me]);const ve=i.get(_[me]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,ve,0)}e.blitFramebuffer(0,0,B,q,0,0,B,q,J,e.NEAREST),c===!0&&(rt.length=0,bt.length=0,rt.push(e.COLOR_ATTACHMENT0+me),M.depthBuffer&&M.resolveDepthBuffer===!1&&(rt.push(te),bt.push(te),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,bt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,rt))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),X)for(let me=0;me<_.length;me++){t.bindFramebuffer(e.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.RENDERBUFFER,ce.__webglColorRenderbuffer[me]);const ve=i.get(_[me]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,ce.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.TEXTURE_2D,ve,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&c){const _=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[_])}}}function ht(M){return Math.min(a.maxSamples,M.samples)}function He(M){const _=i.get(M);return M.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Ze(M){const _=o.render.frame;p.get(M)!==_&&(p.set(M,_),M.update())}function ue(M,_){const B=M.colorSpace,q=M.format,J=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||B!==Ot&&B!==En&&(nt.getTransfer(B)===Je?(q!==Wt||J!==zt)&&We("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",B)),_}function at(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(l.width=M.naturalWidth||M.width,l.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(l.width=M.displayWidth,l.height=M.displayHeight):(l.width=M.width,l.height=M.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=H,this.getTextureUnits=G,this.setTextureUnits=U,this.setTexture2D=W,this.setTexture2DArray=j,this.setTexture3D=se,this.setTextureCube=le,this.rebindTextures=tt,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=pt,this.updateMultisampleRenderTarget=D,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=be,this.useMultisampledRTT=He,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Kp(e,n){function t(i,a=En){let r;const o=nt.getTransfer(a);if(i===zt)return e.UNSIGNED_BYTE;if(i===go)return e.UNSIGNED_SHORT_4_4_4_4;if(i===vo)return e.UNSIGNED_SHORT_5_5_5_1;if(i===ic)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===rc)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===ac)return e.BYTE;if(i===oc)return e.SHORT;if(i===xi)return e.UNSIGNED_SHORT;if(i===xo)return e.INT;if(i===_n)return e.UNSIGNED_INT;if(i===on)return e.FLOAT;if(i===fn)return e.HALF_FLOAT;if(i===sc)return e.ALPHA;if(i===cc)return e.RGB;if(i===Wt)return e.RGBA;if(i===Cn)return e.DEPTH_COMPONENT;if(i===Tn)return e.DEPTH_STENCIL;if(i===lc)return e.RED;if(i===_o)return e.RED_INTEGER;if(i===Ln)return e.RG;if(i===mo)return e.RG_INTEGER;if(i===ho)return e.RGBA_INTEGER;if(i===Pi||i===yi||i===Ii||i===Ui)if(o===Je)if(r=n.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Pi)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===yi)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ii)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ui)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=n.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Pi)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===yi)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ii)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ui)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ur||i===Dr||i===Nr||i===Fr)if(r=n.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ur)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Dr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Nr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Fr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Or||i===Br||i===Hr||i===Gr||i===Vr||i===Zi||i===kr)if(r=n.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Or||i===Br)return o===Je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Hr)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Gr)return r.COMPRESSED_R11_EAC;if(i===Vr)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Zi)return r.COMPRESSED_RG11_EAC;if(i===kr)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===zr||i===Wr||i===Xr||i===Kr||i===qr||i===Yr||i===$r||i===jr||i===Zr||i===Qr||i===Jr||i===ea||i===ta||i===na)if(r=n.get("WEBGL_compressed_texture_astc"),r!==null){if(i===zr)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Wr)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Xr)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Kr)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===qr)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Yr)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===$r)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===jr)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Zr)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Qr)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Jr)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ea)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ta)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===na)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ia||i===ra||i===aa)if(r=n.get("EXT_texture_compression_bptc"),r!==null){if(i===ia)return o===Je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ra)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===aa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===oa||i===sa||i===Qi||i===ca)if(r=n.get("EXT_texture_compression_rgtc"),r!==null){if(i===oa)return r.COMPRESSED_RED_RGTC1_EXT;if(i===sa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Qi)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ca)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===jn?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const qp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yp=`
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

}`;class $p{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new So(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Jt({vertexShader:qp,fragmentShader:Yp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qt(new mr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class jp extends bs{constructor(n,t){super();const i=this;let a=null,r=1,o=null,s="local-floor",c=1,l=null,p=null,u=null,f=null,m=null,S=null;const x=typeof XRWebGLBinding<"u",d=new $p,h={},E=t.getContextAttributes();let R=null,b=null;const C=[],A=[],P=new Et;let v=null;const T=new Xn;T.viewport=new At;const y=new Xn;y.viewport=new At;const w=[T,y],O=new Rs;let H=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let fe=C[$];return fe===void 0&&(fe=new Li,C[$]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function($){let fe=C[$];return fe===void 0&&(fe=new Li,C[$]=fe),fe.getGripSpace()},this.getHand=function($){let fe=C[$];return fe===void 0&&(fe=new Li,C[$]=fe),fe.getHandSpace()};function U($){const fe=A.indexOf($.inputSource);if(fe===-1)return;const ee=C[fe];ee!==void 0&&(ee.update($.inputSource,$.frame,l||o),ee.dispatchEvent({type:$.type,data:$.inputSource}))}function F(){a.removeEventListener("select",U),a.removeEventListener("selectstart",U),a.removeEventListener("selectend",U),a.removeEventListener("squeeze",U),a.removeEventListener("squeezestart",U),a.removeEventListener("squeezeend",U),a.removeEventListener("end",F),a.removeEventListener("inputsourceschange",L);for(let $=0;$<C.length;$++){const fe=A[$];fe!==null&&(A[$]=null,C[$].disconnect(fe))}H=null,G=null,d.reset();for(const $ in h)delete h[$];n.setRenderTarget(R),m=null,f=null,u=null,a=null,b=null,we.stop(),i.isPresenting=!1,n.setPixelRatio(v),n.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,i.isPresenting===!0&&We("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){s=$,i.isPresenting===!0&&We("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(a,t)),u},this.getFrame=function(){return S},this.getSession=function(){return a},this.setSession=async function($){if(a=$,a!==null){if(R=n.getRenderTarget(),a.addEventListener("select",U),a.addEventListener("selectstart",U),a.addEventListener("selectend",U),a.addEventListener("squeeze",U),a.addEventListener("squeezestart",U),a.addEventListener("squeezeend",U),a.addEventListener("end",F),a.addEventListener("inputsourceschange",L),E.xrCompatible!==!0&&await t.makeXRCompatible(),v=n.getPixelRatio(),n.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Ae=null,Ce=null;E.depth&&(Ce=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=E.stencil?Tn:Cn,Ae=E.stencil?jn:_n);const be={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(be),a.updateRenderState({layers:[f]}),n.setPixelRatio(1),n.setSize(f.textureWidth,f.textureHeight,!1),b=new Kt(f.textureWidth,f.textureHeight,{format:Wt,type:zt,depthTexture:new $n(f.textureWidth,f.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:E.stencil,colorSpace:n.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ee={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(a,t,ee),a.updateRenderState({baseLayer:m}),n.setPixelRatio(1),n.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new Kt(m.framebufferWidth,m.framebufferHeight,{format:Wt,type:zt,colorSpace:n.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await a.requestReferenceSpace(s),we.setContext(a),we.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function L($){for(let fe=0;fe<$.removed.length;fe++){const ee=$.removed[fe],Ae=A.indexOf(ee);Ae>=0&&(A[Ae]=null,C[Ae].disconnect(ee))}for(let fe=0;fe<$.added.length;fe++){const ee=$.added[fe];let Ae=A.indexOf(ee);if(Ae===-1){for(let be=0;be<C.length;be++)if(be>=A.length){A.push(ee),Ae=be;break}else if(A[be]===null){A[be]=ee,Ae=be;break}if(Ae===-1)break}const Ce=C[Ae];Ce&&Ce.connect(ee)}}const W=new Z,j=new Z;function se($,fe,ee){W.setFromMatrixPosition(fe.matrixWorld),j.setFromMatrixPosition(ee.matrixWorld);const Ae=W.distanceTo(j),Ce=fe.projectionMatrix.elements,be=ee.projectionMatrix.elements,it=Ce[14]/(Ce[10]-1),Be=Ce[14]/(Ce[10]+1),Xe=(Ce[9]+1)/Ce[5],tt=(Ce[9]-1)/Ce[5],Oe=(Ce[8]-1)/Ce[0],pt=(be[8]+1)/be[0],rt=it*Oe,bt=it*pt,D=Ae/(-Oe+pt),ht=D*-Oe;if(fe.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ht),$.translateZ(D),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ce[10]===-1)$.projectionMatrix.copy(fe.projectionMatrix),$.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{const He=it+D,Ze=Be+D,ue=rt-ht,at=bt+(Ae-ht),M=Xe*Be/Ze*He,_=tt*Be/Ze*He;$.projectionMatrix.makePerspective(ue,at,M,_,He,Ze),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function le($,fe){fe===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(fe.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(a===null)return;let fe=$.near,ee=$.far;d.texture!==null&&(d.depthNear>0&&(fe=d.depthNear),d.depthFar>0&&(ee=d.depthFar)),O.near=y.near=T.near=fe,O.far=y.far=T.far=ee,(H!==O.near||G!==O.far)&&(a.updateRenderState({depthNear:O.near,depthFar:O.far}),H=O.near,G=O.far),O.layers.mask=$.layers.mask|6,T.layers.mask=O.layers.mask&-5,y.layers.mask=O.layers.mask&-3;const Ae=$.parent,Ce=O.cameras;le(O,Ae);for(let be=0;be<Ce.length;be++)le(Ce[be],Ae);Ce.length===2?se(O,T,y):O.projectionMatrix.copy(T.projectionMatrix),re($,O,Ae)};function re($,fe,ee){ee===null?$.matrix.copy(fe.matrixWorld):($.matrix.copy(ee.matrixWorld),$.matrix.invert(),$.matrix.multiply(fe.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(fe.projectionMatrix),$.projectionMatrixInverse.copy(fe.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=ws*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function($){c=$,f!==null&&(f.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(O)},this.getCameraTexture=function($){return h[$]};let Re=null;function Ne($,fe){if(p=fe.getViewerPose(l||o),S=fe,p!==null){const ee=p.views;m!==null&&(n.setRenderTargetFramebuffer(b,m.framebuffer),n.setRenderTarget(b));let Ae=!1;ee.length!==O.cameras.length&&(O.cameras.length=0,Ae=!0);for(let Be=0;Be<ee.length;Be++){const Xe=ee[Be];let tt=null;if(m!==null)tt=m.getViewport(Xe);else{const pt=u.getViewSubImage(f,Xe);tt=pt.viewport,Be===0&&(n.setRenderTargetTextures(b,pt.colorTexture,pt.depthStencilTexture),n.setRenderTarget(b))}let Oe=w[Be];Oe===void 0&&(Oe=new Xn,Oe.layers.enable(Be),Oe.viewport=new At,w[Be]=Oe),Oe.matrix.fromArray(Xe.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(Xe.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(tt.x,tt.y,tt.width,tt.height),Be===0&&(O.matrix.copy(Oe.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ae===!0&&O.cameras.push(Oe)}const Ce=a.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&x){u=i.getBinding();const Be=u.getDepthInformation(ee[0]);Be&&Be.isValid&&Be.texture&&d.init(Be,a.renderState)}if(Ce&&Ce.includes("camera-access")&&x){n.state.unbindTexture(),u=i.getBinding();for(let Be=0;Be<ee.length;Be++){const Xe=ee[Be].camera;if(Xe){let tt=h[Xe];tt||(tt=new So,h[Xe]=tt);const Oe=u.getCameraImage(Xe);tt.sourceTexture=Oe}}}}for(let ee=0;ee<C.length;ee++){const Ae=A[ee],Ce=C[ee];Ae!==null&&Ce!==void 0&&Ce.update(Ae,fe,l||o)}Re&&Re($,fe),fe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:fe}),S=null}const we=new Bo;we.setAnimationLoop(Ne),this.setAnimationLoop=function($){Re=$},this.dispose=function(){}}}const Zp=new mt,Xo=new Ge;Xo.set(-1,0,0,0,1,0,0,0,1);function Qp(e,n){function t(d,h){d.matrixAutoUpdate===!0&&d.updateMatrix(),h.value.copy(d.matrix)}function i(d,h){h.color.getRGB(d.fogColor.value,Mo(e)),h.isFog?(d.fogNear.value=h.near,d.fogFar.value=h.far):h.isFogExp2&&(d.fogDensity.value=h.density)}function a(d,h,E,R,b){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(d,h):h.isMeshLambertMaterial?(r(d,h),h.envMap&&(d.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(d,h),u(d,h)):h.isMeshPhongMaterial?(r(d,h),p(d,h),h.envMap&&(d.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(d,h),f(d,h),h.isMeshPhysicalMaterial&&m(d,h,b)):h.isMeshMatcapMaterial?(r(d,h),S(d,h)):h.isMeshDepthMaterial?r(d,h):h.isMeshDistanceMaterial?(r(d,h),x(d,h)):h.isMeshNormalMaterial?r(d,h):h.isLineBasicMaterial?(o(d,h),h.isLineDashedMaterial&&s(d,h)):h.isPointsMaterial?c(d,h,E,R):h.isSpriteMaterial?l(d,h):h.isShadowMaterial?(d.color.value.copy(h.color),d.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(d,h){d.opacity.value=h.opacity,h.color&&d.diffuse.value.copy(h.color),h.emissive&&d.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(d.map.value=h.map,t(h.map,d.mapTransform)),h.alphaMap&&(d.alphaMap.value=h.alphaMap,t(h.alphaMap,d.alphaMapTransform)),h.bumpMap&&(d.bumpMap.value=h.bumpMap,t(h.bumpMap,d.bumpMapTransform),d.bumpScale.value=h.bumpScale,h.side===Lt&&(d.bumpScale.value*=-1)),h.normalMap&&(d.normalMap.value=h.normalMap,t(h.normalMap,d.normalMapTransform),d.normalScale.value.copy(h.normalScale),h.side===Lt&&d.normalScale.value.negate()),h.displacementMap&&(d.displacementMap.value=h.displacementMap,t(h.displacementMap,d.displacementMapTransform),d.displacementScale.value=h.displacementScale,d.displacementBias.value=h.displacementBias),h.emissiveMap&&(d.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,d.emissiveMapTransform)),h.specularMap&&(d.specularMap.value=h.specularMap,t(h.specularMap,d.specularMapTransform)),h.alphaTest>0&&(d.alphaTest.value=h.alphaTest);const E=n.get(h),R=E.envMap,b=E.envMapRotation;R&&(d.envMap.value=R,d.envMapRotation.value.setFromMatrix4(Zp.makeRotationFromEuler(b)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&d.envMapRotation.value.premultiply(Xo),d.reflectivity.value=h.reflectivity,d.ior.value=h.ior,d.refractionRatio.value=h.refractionRatio),h.lightMap&&(d.lightMap.value=h.lightMap,d.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,d.lightMapTransform)),h.aoMap&&(d.aoMap.value=h.aoMap,d.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,d.aoMapTransform))}function o(d,h){d.diffuse.value.copy(h.color),d.opacity.value=h.opacity,h.map&&(d.map.value=h.map,t(h.map,d.mapTransform))}function s(d,h){d.dashSize.value=h.dashSize,d.totalSize.value=h.dashSize+h.gapSize,d.scale.value=h.scale}function c(d,h,E,R){d.diffuse.value.copy(h.color),d.opacity.value=h.opacity,d.size.value=h.size*E,d.scale.value=R*.5,h.map&&(d.map.value=h.map,t(h.map,d.uvTransform)),h.alphaMap&&(d.alphaMap.value=h.alphaMap,t(h.alphaMap,d.alphaMapTransform)),h.alphaTest>0&&(d.alphaTest.value=h.alphaTest)}function l(d,h){d.diffuse.value.copy(h.color),d.opacity.value=h.opacity,d.rotation.value=h.rotation,h.map&&(d.map.value=h.map,t(h.map,d.mapTransform)),h.alphaMap&&(d.alphaMap.value=h.alphaMap,t(h.alphaMap,d.alphaMapTransform)),h.alphaTest>0&&(d.alphaTest.value=h.alphaTest)}function p(d,h){d.specular.value.copy(h.specular),d.shininess.value=Math.max(h.shininess,1e-4)}function u(d,h){h.gradientMap&&(d.gradientMap.value=h.gradientMap)}function f(d,h){d.metalness.value=h.metalness,h.metalnessMap&&(d.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,d.metalnessMapTransform)),d.roughness.value=h.roughness,h.roughnessMap&&(d.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,d.roughnessMapTransform)),h.envMap&&(d.envMapIntensity.value=h.envMapIntensity)}function m(d,h,E){d.ior.value=h.ior,h.sheen>0&&(d.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),d.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(d.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,d.sheenColorMapTransform)),h.sheenRoughnessMap&&(d.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,d.sheenRoughnessMapTransform))),h.clearcoat>0&&(d.clearcoat.value=h.clearcoat,d.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(d.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,d.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(d.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Lt&&d.clearcoatNormalScale.value.negate())),h.dispersion>0&&(d.dispersion.value=h.dispersion),h.iridescence>0&&(d.iridescence.value=h.iridescence,d.iridescenceIOR.value=h.iridescenceIOR,d.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(d.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,d.iridescenceMapTransform)),h.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),h.transmission>0&&(d.transmission.value=h.transmission,d.transmissionSamplerMap.value=E.texture,d.transmissionSamplerSize.value.set(E.width,E.height),h.transmissionMap&&(d.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,d.transmissionMapTransform)),d.thickness.value=h.thickness,h.thicknessMap&&(d.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=h.attenuationDistance,d.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(d.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(d.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=h.specularIntensity,d.specularColor.value.copy(h.specularColor),h.specularColorMap&&(d.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,d.specularColorMapTransform)),h.specularIntensityMap&&(d.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,d.specularIntensityMapTransform))}function S(d,h){h.matcap&&(d.matcap.value=h.matcap)}function x(d,h){const E=n.get(h).light;d.referencePosition.value.setFromMatrixPosition(E.matrixWorld),d.nearDistance.value=E.shadow.camera.near,d.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function Jp(e,n,t,i){let a={},r={},o=[];const s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,R){const b=R.program;i.uniformBlockBinding(E,b)}function l(E,R){let b=a[E.id];b===void 0&&(S(E),b=p(E),a[E.id]=b,E.addEventListener("dispose",d));const C=R.program;i.updateUBOMapping(E,C);const A=n.render.frame;r[E.id]!==A&&(f(E),r[E.id]=A)}function p(E){const R=u();E.__bindingPointIndex=R;const b=e.createBuffer(),C=E.__size,A=E.usage;return e.bindBuffer(e.UNIFORM_BUFFER,b),e.bufferData(e.UNIFORM_BUFFER,C,A),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,R,b),b}function u(){for(let E=0;E<s;E++)if(o.indexOf(E)===-1)return o.push(E),E;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const R=a[E.id],b=E.uniforms,C=E.__cache;e.bindBuffer(e.UNIFORM_BUFFER,R);for(let A=0,P=b.length;A<P;A++){const v=Array.isArray(b[A])?b[A]:[b[A]];for(let T=0,y=v.length;T<y;T++){const w=v[T];if(m(w,A,T,C)===!0){const O=w.__offset,H=Array.isArray(w.value)?w.value:[w.value];let G=0;for(let U=0;U<H.length;U++){const F=H[U],L=x(F);typeof F=="number"||typeof F=="boolean"?(w.__data[0]=F,e.bufferSubData(e.UNIFORM_BUFFER,O+G,w.__data)):F.isMatrix3?(w.__data[0]=F.elements[0],w.__data[1]=F.elements[1],w.__data[2]=F.elements[2],w.__data[3]=0,w.__data[4]=F.elements[3],w.__data[5]=F.elements[4],w.__data[6]=F.elements[5],w.__data[7]=0,w.__data[8]=F.elements[6],w.__data[9]=F.elements[7],w.__data[10]=F.elements[8],w.__data[11]=0):ArrayBuffer.isView(F)?w.__data.set(new F.constructor(F.buffer,F.byteOffset,w.__data.length)):(F.toArray(w.__data,G),G+=L.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,O,w.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function m(E,R,b,C){const A=E.value,P=R+"_"+b;if(C[P]===void 0)return typeof A=="number"||typeof A=="boolean"?C[P]=A:ArrayBuffer.isView(A)?C[P]=A.slice():C[P]=A.clone(),!0;{const v=C[P];if(typeof A=="number"||typeof A=="boolean"){if(v!==A)return C[P]=A,!0}else{if(ArrayBuffer.isView(A))return!0;if(v.equals(A)===!1)return v.copy(A),!0}}return!1}function S(E){const R=E.uniforms;let b=0;const C=16;for(let P=0,v=R.length;P<v;P++){const T=Array.isArray(R[P])?R[P]:[R[P]];for(let y=0,w=T.length;y<w;y++){const O=T[y],H=Array.isArray(O.value)?O.value:[O.value];for(let G=0,U=H.length;G<U;G++){const F=H[G],L=x(F),W=b%C,j=W%L.boundary,se=W+j;b+=j,se!==0&&C-se<L.storage&&(b+=C-se),O.__data=new Float32Array(L.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=b,b+=L.storage}}}const A=b%C;return A>0&&(b+=C-A),E.__size=b,E.__cache={},this}function x(E){const R={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(R.boundary=4,R.storage=4):E.isVector2?(R.boundary=8,R.storage=8):E.isVector3||E.isColor?(R.boundary=16,R.storage=12):E.isVector4?(R.boundary=16,R.storage=16):E.isMatrix3?(R.boundary=48,R.storage=48):E.isMatrix4?(R.boundary=64,R.storage=64):E.isTexture?We("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(R.boundary=16,R.storage=E.byteLength):We("WebGLRenderer: Unsupported uniform value type.",E),R}function d(E){const R=E.target;R.removeEventListener("dispose",d);const b=o.indexOf(R.__bindingPointIndex);o.splice(b,1),e.deleteBuffer(a[R.id]),delete a[R.id],delete r[R.id]}function h(){for(const E in a)e.deleteBuffer(a[E]);o=[],a={},r={}}return{bind:c,update:l,dispose:h}}const eh=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Gt=null;function th(){return Gt===null&&(Gt=new fo(eh,16,16,Ln,fn),Gt.name="DFG_LUT",Gt.minFilter=vt,Gt.magFilter=vt,Gt.wrapS=Zn,Gt.wrapT=Zn,Gt.generateMipmaps=!1,Gt.needsUpdate=!0),Gt}class Qm{constructor(n={}){const{canvas:t=Es(),context:i=null,depth:a=!0,stencil:r=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:m=zt}=n;this.isWebGLRenderer=!0;let S;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=i.getContextAttributes().alpha}else S=o;const x=m,d=new Set([ho,mo,_o]),h=new Set([zt,_n,xi,jn,go,vo]),E=new Uint32Array(4),R=new Int32Array(4),b=new Z;let C=null,A=null;const P=[],v=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let w=!1,O=null;this._outputColorSpace=ln;let H=0,G=0,U=null,F=-1,L=null;const W=new At,j=new At;let se=null;const le=new ze(0);let re=0,Re=t.width,Ne=t.height,we=1,$=null,fe=null;const ee=new At(0,0,Re,Ne),Ae=new At(0,0,Re,Ne);let Ce=!1;const be=new lo;let it=!1,Be=!1;const Xe=new mt,tt=new Z,Oe=new At,pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let rt=!1;function bt(){return U===null?we:1}let D=i;function ht(g,N){return t.getContext(g,N)}try{const g={alpha:!0,depth:a,stencil:r,antialias:s,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:p,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ms}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),D===null){const N="webgl2";if(D=ht(N,g),D===null)throw ht(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(g){throw et("WebGLRenderer: "+g.message),g}let He,Ze,ue,at,M,_,B,q,J,te,ce,X,Y,me,ve,ae,ne,Le,Ie,ke,I,ie,K;function _e(){He=new td(D),He.init(),I=new Kp(D,He),Ze=new qu(D,He,n,I),ue=new Wp(D,He),Ze.reversedDepthBuffer&&f&&ue.buffers.depth.setReversed(!0),at=new rd(D),M=new Pp,_=new Xp(D,He,ue,M,Ze,I,at),B=new ed(y),q=new sl(D),ie=new Xu(D,q),J=new nd(D,q,at,ie),te=new od(D,J,q,ie,at),Le=new ad(D,Ze,_),ve=new Yu(M),ce=new Lp(y,B,He,Ze,ie,ve),X=new Qp(y,M),Y=new Ip,me=new Bp(He),ne=new Wu(y,B,ue,te,S,c),ae=new zp(y,te,Ze),K=new Jp(D,at,Ze,ue),Ie=new Ku(D,He,at),ke=new id(D,He,at),at.programs=ce.programs,y.capabilities=Ze,y.extensions=He,y.properties=M,y.renderLists=Y,y.shadowMap=ae,y.state=ue,y.info=at}_e(),x!==zt&&(T=new cd(x,t.width,t.height,a,r));const oe=new jp(y,D);this.xr=oe,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const g=He.get("WEBGL_lose_context");g&&g.loseContext()},this.forceContextRestore=function(){const g=He.get("WEBGL_lose_context");g&&g.restoreContext()},this.getPixelRatio=function(){return we},this.setPixelRatio=function(g){g!==void 0&&(we=g,this.setSize(Re,Ne,!1))},this.getSize=function(g){return g.set(Re,Ne)},this.setSize=function(g,N,z=!0){if(oe.isPresenting){We("WebGLRenderer: Can't change size while VR device is presenting.");return}Re=g,Ne=N,t.width=Math.floor(g*we),t.height=Math.floor(N*we),z===!0&&(t.style.width=g+"px",t.style.height=N+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,g,N)},this.getDrawingBufferSize=function(g){return g.set(Re*we,Ne*we).floor()},this.setDrawingBufferSize=function(g,N,z){Re=g,Ne=N,we=z,t.width=Math.floor(g*z),t.height=Math.floor(N*z),this.setViewport(0,0,g,N)},this.setEffects=function(g){if(x===zt){et("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(g){for(let N=0;N<g.length;N++)if(g[N].isOutputPass===!0){We("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(g||[])},this.getCurrentViewport=function(g){return g.copy(W)},this.getViewport=function(g){return g.copy(ee)},this.setViewport=function(g,N,z,V){g.isVector4?ee.set(g.x,g.y,g.z,g.w):ee.set(g,N,z,V),ue.viewport(W.copy(ee).multiplyScalar(we).round())},this.getScissor=function(g){return g.copy(Ae)},this.setScissor=function(g,N,z,V){g.isVector4?Ae.set(g.x,g.y,g.z,g.w):Ae.set(g,N,z,V),ue.scissor(j.copy(Ae).multiplyScalar(we).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(g){ue.setScissorTest(Ce=g)},this.setOpaqueSort=function(g){$=g},this.setTransparentSort=function(g){fe=g},this.getClearColor=function(g){return g.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor(...arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha(...arguments)},this.clear=function(g=!0,N=!0,z=!0){let V=0;if(g){let k=!1;if(U!==null){const he=U.texture.format;k=d.has(he)}if(k){const he=U.texture.type,Se=h.has(he),pe=ne.getClearColor(),xe=ne.getClearAlpha(),Me=pe.r,ye=pe.g,De=pe.b;Se?(E[0]=Me,E[1]=ye,E[2]=De,E[3]=xe,D.clearBufferuiv(D.COLOR,0,E)):(R[0]=Me,R[1]=ye,R[2]=De,R[3]=xe,D.clearBufferiv(D.COLOR,0,R))}else V|=D.COLOR_BUFFER_BIT}N&&(V|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),z&&(V|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&D.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(g){g.setRenderer(this),O=g},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),ne.dispose(),Y.dispose(),me.dispose(),M.dispose(),B.dispose(),te.dispose(),ie.dispose(),K.dispose(),ce.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Mr),oe.removeEventListener("sessionend",Tr),un.stop()};function Q(g){g.preventDefault(),Pr("WebGLRenderer: Context Lost."),w=!0}function Ee(){Pr("WebGLRenderer: Context Restored."),w=!1;const g=at.autoReset,N=ae.enabled,z=ae.autoUpdate,V=ae.needsUpdate,k=ae.type;_e(),at.autoReset=g,ae.enabled=N,ae.autoUpdate=z,ae.needsUpdate=V,ae.type=k}function Pe(g){et("WebGLRenderer: A WebGL context could not be created. Reason: ",g.statusMessage)}function ct(g){const N=g.target;N.removeEventListener("dispose",ct),Ke(N)}function Ke(g){$t(g),M.remove(g)}function $t(g){const N=M.get(g).programs;N!==void 0&&(N.forEach(function(z){ce.releaseProgram(z)}),g.isShaderMaterial&&ce.releaseShaderCache(g))}this.renderBufferDirect=function(g,N,z,V,k,he){N===null&&(N=pt);const Se=k.isMesh&&k.matrixWorld.determinant()<0,pe=ps(g,N,z,V,k);ue.setMaterial(V,Se);let xe=z.index,Me=1;if(V.wireframe===!0){if(xe=J.getWireframeAttribute(z),xe===void 0)return;Me=2}const ye=z.drawRange,De=z.attributes.position;let Te=ye.start*Me,qe=(ye.start+ye.count)*Me;he!==null&&(Te=Math.max(Te,he.start*Me),qe=Math.min(qe,(he.start+he.count)*Me)),xe!==null?(Te=Math.max(Te,0),qe=Math.min(qe,xe.count)):De!=null&&(Te=Math.max(Te,0),qe=Math.min(qe,De.count));const lt=qe-Te;if(lt<0||lt===1/0)return;ie.setup(k,V,pe,z,xe);let ot,$e=Ie;if(xe!==null&&(ot=q.get(xe),$e=ke,$e.setIndex(ot)),k.isMesh)V.wireframe===!0?(ue.setLineWidth(V.wireframeLinewidth*bt()),$e.setMode(D.LINES)):$e.setMode(D.TRIANGLES);else if(k.isLine){let St=V.linewidth;St===void 0&&(St=1),ue.setLineWidth(St*bt()),k.isLineSegments?$e.setMode(D.LINES):k.isLineLoop?$e.setMode(D.LINE_LOOP):$e.setMode(D.LINE_STRIP)}else k.isPoints?$e.setMode(D.POINTS):k.isSprite&&$e.setMode(D.TRIANGLES);if(k.isBatchedMesh)if(He.get("WEBGL_multi_draw"))$e.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const St=k._multiDrawStarts,ge=k._multiDrawCounts,Rt=k._multiDrawCount,Ve=xe?q.get(xe).bytesPerElement:1,Pt=M.get(V).currentProgram.getUniforms();for(let Ht=0;Ht<Rt;Ht++)Pt.setValue(D,"_gl_DrawID",Ht),$e.render(St[Ht]/Ve,ge[Ht])}else if(k.isInstancedMesh)$e.renderInstances(Te,lt,k.count);else if(z.isInstancedBufferGeometry){const St=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,ge=Math.min(z.instanceCount,St);$e.renderInstances(Te,lt,ge)}else $e.render(Te,lt)};function Bt(g,N,z){g.transparent===!0&&g.side===Ut&&g.forceSinglePass===!1?(g.side=Lt,g.needsUpdate=!0,ti(g,N,z),g.side=wn,g.needsUpdate=!0,ti(g,N,z),g.side=Ut):ti(g,N,z)}this.compile=function(g,N,z=null){z===null&&(z=g),A=me.get(z),A.init(N),v.push(A),z.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(A.pushLight(k),k.castShadow&&A.pushShadow(k))}),g!==z&&g.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(A.pushLight(k),k.castShadow&&A.pushShadow(k))}),A.setupLights();const V=new Set;return g.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const he=k.material;if(he)if(Array.isArray(he))for(let Se=0;Se<he.length;Se++){const pe=he[Se];Bt(pe,z,k),V.add(pe)}else Bt(he,z,k),V.add(he)}),A=v.pop(),V},this.compileAsync=function(g,N,z=null){const V=this.compile(g,N,z);return new Promise(k=>{function he(){if(V.forEach(function(Se){M.get(Se).currentProgram.isReady()&&V.delete(Se)}),V.size===0){k(g);return}setTimeout(he,10)}He.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let wi=null;function us(g){wi&&wi(g)}function Mr(){un.stop()}function Tr(){un.start()}const un=new Bo;un.setAnimationLoop(us),typeof self<"u"&&un.setContext(self),this.setAnimationLoop=function(g){wi=g,oe.setAnimationLoop(g),g===null?un.stop():un.start()},oe.addEventListener("sessionstart",Mr),oe.addEventListener("sessionend",Tr),this.render=function(g,N){if(N!==void 0&&N.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;O!==null&&O.renderStart(g,N);const z=oe.enabled===!0&&oe.isPresenting===!0,V=T!==null&&(U===null||z)&&T.begin(y,U);if(g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(N),N=oe.getCamera()),g.isScene===!0&&g.onBeforeRender(y,g,N,U),A=me.get(g,v.length),A.init(N),A.state.textureUnits=_.getTextureUnits(),v.push(A),Xe.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),be.setFromProjectionMatrix(Xe,yr,N.reversedDepth),Be=this.localClippingEnabled,it=ve.init(this.clippingPlanes,Be),C=Y.get(g,P.length),C.init(),P.push(C),oe.enabled===!0&&oe.isPresenting===!0){const Se=y.xr.getDepthSensingMesh();Se!==null&&Ci(Se,N,-1/0,y.sortObjects)}Ci(g,N,0,y.sortObjects),C.finish(),y.sortObjects===!0&&C.sort($,fe),rt=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,rt&&ne.addToRenderList(C,g),this.info.render.frame++,it===!0&&ve.beginShadows();const k=A.state.shadowsArray;if(ae.render(k,g,N),it===!0&&ve.endShadows(),this.info.autoReset===!0&&this.info.reset(),(V&&T.hasRenderPass())===!1){const Se=C.opaque,pe=C.transmissive;if(A.setupLights(),N.isArrayCamera){const xe=N.cameras;if(pe.length>0)for(let Me=0,ye=xe.length;Me<ye;Me++){const De=xe[Me];br(Se,pe,g,De)}rt&&ne.render(g);for(let Me=0,ye=xe.length;Me<ye;Me++){const De=xe[Me];Ar(C,g,De,De.viewport)}}else pe.length>0&&br(Se,pe,g,N),rt&&ne.render(g),Ar(C,g,N)}U!==null&&G===0&&(_.updateMultisampleRenderTarget(U),_.updateRenderTargetMipmap(U)),V&&T.end(y),g.isScene===!0&&g.onAfterRender(y,g,N),ie.resetDefaultState(),F=-1,L=null,v.pop(),v.length>0?(A=v[v.length-1],_.setTextureUnits(A.state.textureUnits),it===!0&&ve.setGlobalState(y.clippingPlanes,A.state.camera)):A=null,P.pop(),P.length>0?C=P[P.length-1]:C=null,O!==null&&O.renderEnd()};function Ci(g,N,z,V){if(g.visible===!1)return;if(g.layers.test(N.layers)){if(g.isGroup)z=g.renderOrder;else if(g.isLOD)g.autoUpdate===!0&&g.update(N);else if(g.isLightProbeGrid)A.pushLightProbeGrid(g);else if(g.isLight)A.pushLight(g),g.castShadow&&A.pushShadow(g);else if(g.isSprite){if(!g.frustumCulled||be.intersectsSprite(g)){V&&Oe.setFromMatrixPosition(g.matrixWorld).applyMatrix4(Xe);const Se=te.update(g),pe=g.material;pe.visible&&C.push(g,Se,pe,z,Oe.z,null)}}else if((g.isMesh||g.isLine||g.isPoints)&&(!g.frustumCulled||be.intersectsObject(g))){const Se=te.update(g),pe=g.material;if(V&&(g.boundingSphere!==void 0?(g.boundingSphere===null&&g.computeBoundingSphere(),Oe.copy(g.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Oe.copy(Se.boundingSphere.center)),Oe.applyMatrix4(g.matrixWorld).applyMatrix4(Xe)),Array.isArray(pe)){const xe=Se.groups;for(let Me=0,ye=xe.length;Me<ye;Me++){const De=xe[Me],Te=pe[De.materialIndex];Te&&Te.visible&&C.push(g,Se,Te,z,Oe.z,De)}}else pe.visible&&C.push(g,Se,pe,z,Oe.z,null)}}const he=g.children;for(let Se=0,pe=he.length;Se<pe;Se++)Ci(he[Se],N,z,V)}function Ar(g,N,z,V){const{opaque:k,transmissive:he,transparent:Se}=g;A.setupLightsView(z),it===!0&&ve.setGlobalState(y.clippingPlanes,z),V&&ue.viewport(W.copy(V)),k.length>0&&ei(k,N,z),he.length>0&&ei(he,N,z),Se.length>0&&ei(Se,N,z),ue.buffers.depth.setTest(!0),ue.buffers.depth.setMask(!0),ue.buffers.color.setMask(!0),ue.setPolygonOffset(!1)}function br(g,N,z,V){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[V.id]===void 0){const Te=He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[V.id]=new Kt(1,1,{generateMipmaps:!0,type:Te?fn:zt,minFilter:jt,samples:Math.max(4,Ze.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace})}const he=A.state.transmissionRenderTarget[V.id],Se=V.viewport||W;he.setSize(Se.z*y.transmissionResolutionScale,Se.w*y.transmissionResolutionScale);const pe=y.getRenderTarget(),xe=y.getActiveCubeFace(),Me=y.getActiveMipmapLevel();y.setRenderTarget(he),y.getClearColor(le),re=y.getClearAlpha(),re<1&&y.setClearColor(16777215,.5),y.clear(),rt&&ne.render(z);const ye=y.toneMapping;y.toneMapping=Xt;const De=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),A.setupLightsView(V),it===!0&&ve.setGlobalState(y.clippingPlanes,V),ei(g,z,V),_.updateMultisampleRenderTarget(he),_.updateRenderTargetMipmap(he),He.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let qe=0,lt=N.length;qe<lt;qe++){const ot=N[qe],{object:$e,geometry:St,material:ge,group:Rt}=ot;if(ge.side===Ut&&$e.layers.test(V.layers)){const Ve=ge.side;ge.side=Lt,ge.needsUpdate=!0,Rr($e,z,V,St,ge,Rt),ge.side=Ve,ge.needsUpdate=!0,Te=!0}}Te===!0&&(_.updateMultisampleRenderTarget(he),_.updateRenderTargetMipmap(he))}y.setRenderTarget(pe,xe,Me),y.setClearColor(le,re),De!==void 0&&(V.viewport=De),y.toneMapping=ye}function ei(g,N,z){const V=N.isScene===!0?N.overrideMaterial:null;for(let k=0,he=g.length;k<he;k++){const Se=g[k],{object:pe,geometry:xe,group:Me}=Se;let ye=Se.material;ye.allowOverride===!0&&V!==null&&(ye=V),pe.layers.test(z.layers)&&Rr(pe,N,z,xe,ye,Me)}}function Rr(g,N,z,V,k,he){g.onBeforeRender(y,N,z,V,k,he),g.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,g.matrixWorld),g.normalMatrix.getNormalMatrix(g.modelViewMatrix),k.onBeforeRender(y,N,z,V,g,he),k.transparent===!0&&k.side===Ut&&k.forceSinglePass===!1?(k.side=Lt,k.needsUpdate=!0,y.renderBufferDirect(z,N,V,k,g,he),k.side=wn,k.needsUpdate=!0,y.renderBufferDirect(z,N,V,k,g,he),k.side=Ut):y.renderBufferDirect(z,N,V,k,g,he),g.onAfterRender(y,N,z,V,k,he)}function ti(g,N,z){N.isScene!==!0&&(N=pt);const V=M.get(g),k=A.state.lights,he=A.state.shadowsArray,Se=k.state.version,pe=ce.getParameters(g,k.state,he,N,z,A.state.lightProbeGridArray),xe=ce.getProgramCacheKey(pe);let Me=V.programs;V.environment=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?N.environment:null,V.fog=N.fog;const ye=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap;V.envMap=B.get(g.envMap||V.environment,ye),V.envMapRotation=V.environment!==null&&g.envMap===null?N.environmentRotation:g.envMapRotation,Me===void 0&&(g.addEventListener("dispose",ct),Me=new Map,V.programs=Me);let De=Me.get(xe);if(De!==void 0){if(V.currentProgram===De&&V.lightsStateVersion===Se)return Cr(g,pe),De}else pe.uniforms=ce.getUniforms(g),O!==null&&g.isNodeMaterial&&O.build(g,z,pe),g.onBeforeCompile(pe,y),De=ce.acquireProgram(pe,xe),Me.set(xe,De),V.uniforms=pe.uniforms;const Te=V.uniforms;return(!g.isShaderMaterial&&!g.isRawShaderMaterial||g.clipping===!0)&&(Te.clippingPlanes=ve.uniform),Cr(g,pe),V.needsLights=ms(g),V.lightsStateVersion=Se,V.needsLights&&(Te.ambientLightColor.value=k.state.ambient,Te.lightProbe.value=k.state.probe,Te.directionalLights.value=k.state.directional,Te.directionalLightShadows.value=k.state.directionalShadow,Te.spotLights.value=k.state.spot,Te.spotLightShadows.value=k.state.spotShadow,Te.rectAreaLights.value=k.state.rectArea,Te.ltc_1.value=k.state.rectAreaLTC1,Te.ltc_2.value=k.state.rectAreaLTC2,Te.pointLights.value=k.state.point,Te.pointLightShadows.value=k.state.pointShadow,Te.hemisphereLights.value=k.state.hemi,Te.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Te.spotLightMatrix.value=k.state.spotLightMatrix,Te.spotLightMap.value=k.state.spotLightMap,Te.pointShadowMatrix.value=k.state.pointShadowMatrix),V.lightProbeGrid=A.state.lightProbeGridArray.length>0,V.currentProgram=De,V.uniformsList=null,De}function wr(g){if(g.uniformsList===null){const N=g.currentProgram.getUniforms();g.uniformsList=mi.seqWithValue(N.seq,g.uniforms)}return g.uniformsList}function Cr(g,N){const z=M.get(g);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function ds(g,N){if(g.length===0)return null;if(g.length===1)return g[0].texture!==null?g[0]:null;b.setFromMatrixPosition(N.matrixWorld);for(let z=0,V=g.length;z<V;z++){const k=g[z];if(k.texture!==null&&k.boundingBox.containsPoint(b))return k}return null}function ps(g,N,z,V,k){N.isScene!==!0&&(N=pt),_.resetTextureUnits();const he=N.fog,Se=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?N.environment:null,pe=U===null?y.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:nt.workingColorSpace,xe=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Me=B.get(V.envMap||Se,xe),ye=V.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,De=!!z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Te=!!z.morphAttributes.position,qe=!!z.morphAttributes.normal,lt=!!z.morphAttributes.color;let ot=Xt;V.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(ot=y.toneMapping);const $e=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,St=$e!==void 0?$e.length:0,ge=M.get(V),Rt=A.state.lights;if(it===!0&&(Be===!0||g!==L)){const Qe=g===L&&V.id===F;ve.setState(V,g,Qe)}let Ve=!1;V.version===ge.__version?(ge.needsLights&&ge.lightsStateVersion!==Rt.state.version||ge.outputColorSpace!==pe||k.isBatchedMesh&&ge.batching===!1||!k.isBatchedMesh&&ge.batching===!0||k.isBatchedMesh&&ge.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&ge.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&ge.instancing===!1||!k.isInstancedMesh&&ge.instancing===!0||k.isSkinnedMesh&&ge.skinning===!1||!k.isSkinnedMesh&&ge.skinning===!0||k.isInstancedMesh&&ge.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&ge.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&ge.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&ge.instancingMorph===!1&&k.morphTexture!==null||ge.envMap!==Me||V.fog===!0&&ge.fog!==he||ge.numClippingPlanes!==void 0&&(ge.numClippingPlanes!==ve.numPlanes||ge.numIntersection!==ve.numIntersection)||ge.vertexAlphas!==ye||ge.vertexTangents!==De||ge.morphTargets!==Te||ge.morphNormals!==qe||ge.morphColors!==lt||ge.toneMapping!==ot||ge.morphTargetsCount!==St||!!ge.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(Ve=!0):(Ve=!0,ge.__version=V.version);let Pt=ge.currentProgram;Ve===!0&&(Pt=ti(V,N,k),O&&V.isNodeMaterial&&O.onUpdateProgram(V,Pt,ge));let Ht=!1,en=!1,vn=!1;const je=Pt.getUniforms(),ft=ge.uniforms;if(ue.useProgram(Pt.program)&&(Ht=!0,en=!0,vn=!0),V.id!==F&&(F=V.id,en=!0),ge.needsLights){const Qe=ds(A.state.lightProbeGridArray,k);ge.lightProbeGrid!==Qe&&(ge.lightProbeGrid=Qe,en=!0)}if(Ht||L!==g){ue.buffers.depth.getReversed()&&g.reversedDepth!==!0&&(g._reversedDepth=!0,g.updateProjectionMatrix()),je.setValue(D,"projectionMatrix",g.projectionMatrix),je.setValue(D,"viewMatrix",g.matrixWorldInverse);const nn=je.map.cameraPosition;nn!==void 0&&nn.setValue(D,tt.setFromMatrixPosition(g.matrixWorld)),Ze.logarithmicDepthBuffer&&je.setValue(D,"logDepthBufFC",2/(Math.log(g.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&je.setValue(D,"isOrthographic",g.isOrthographicCamera===!0),L!==g&&(L=g,en=!0,vn=!0)}if(ge.needsLights&&(Rt.state.directionalShadowMap.length>0&&je.setValue(D,"directionalShadowMap",Rt.state.directionalShadowMap,_),Rt.state.spotShadowMap.length>0&&je.setValue(D,"spotShadowMap",Rt.state.spotShadowMap,_),Rt.state.pointShadowMap.length>0&&je.setValue(D,"pointShadowMap",Rt.state.pointShadowMap,_)),k.isSkinnedMesh){je.setOptional(D,k,"bindMatrix"),je.setOptional(D,k,"bindMatrixInverse");const Qe=k.skeleton;Qe&&(Qe.boneTexture===null&&Qe.computeBoneTexture(),je.setValue(D,"boneTexture",Qe.boneTexture,_))}k.isBatchedMesh&&(je.setOptional(D,k,"batchingTexture"),je.setValue(D,"batchingTexture",k._matricesTexture,_),je.setOptional(D,k,"batchingIdTexture"),je.setValue(D,"batchingIdTexture",k._indirectTexture,_),je.setOptional(D,k,"batchingColorTexture"),k._colorsTexture!==null&&je.setValue(D,"batchingColorTexture",k._colorsTexture,_));const tn=z.morphAttributes;if((tn.position!==void 0||tn.normal!==void 0||tn.color!==void 0)&&Le.update(k,z,Pt),(en||ge.receiveShadow!==k.receiveShadow)&&(ge.receiveShadow=k.receiveShadow,je.setValue(D,"receiveShadow",k.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&N.environment!==null&&(ft.envMapIntensity.value=N.environmentIntensity),ft.dfgLUT!==void 0&&(ft.dfgLUT.value=th()),en){if(je.setValue(D,"toneMappingExposure",y.toneMappingExposure),ge.needsLights&&hs(ft,vn),he&&V.fog===!0&&X.refreshFogUniforms(ft,he),X.refreshMaterialUniforms(ft,V,we,Ne,A.state.transmissionRenderTarget[g.id]),ge.needsLights&&ge.lightProbeGrid){const Qe=ge.lightProbeGrid;ft.probesSH.value=Qe.texture,ft.probesMin.value.copy(Qe.boundingBox.min),ft.probesMax.value.copy(Qe.boundingBox.max),ft.probesResolution.value.copy(Qe.resolution)}mi.upload(D,wr(ge),ft,_)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(mi.upload(D,wr(ge),ft,_),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&je.setValue(D,"center",k.center),je.setValue(D,"modelViewMatrix",k.modelViewMatrix),je.setValue(D,"normalMatrix",k.normalMatrix),je.setValue(D,"modelMatrix",k.matrixWorld),V.uniformsGroups!==void 0){const Qe=V.uniformsGroups;for(let nn=0,Sn=Qe.length;nn<Sn;nn++){const Lr=Qe[nn];K.update(Lr,Pt),K.bind(Lr,Pt)}}return Pt}function hs(g,N){g.ambientLightColor.needsUpdate=N,g.lightProbe.needsUpdate=N,g.directionalLights.needsUpdate=N,g.directionalLightShadows.needsUpdate=N,g.pointLights.needsUpdate=N,g.pointLightShadows.needsUpdate=N,g.spotLights.needsUpdate=N,g.spotLightShadows.needsUpdate=N,g.rectAreaLights.needsUpdate=N,g.hemisphereLights.needsUpdate=N}function ms(g){return g.isMeshLambertMaterial||g.isMeshToonMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isShadowMaterial||g.isShaderMaterial&&g.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(g,N,z){const V=M.get(g);V.__autoAllocateDepthBuffer=g.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),M.get(g.texture).__webglTexture=N,M.get(g.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:z,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(g,N){const z=M.get(g);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0};const _s=D.createFramebuffer();this.setRenderTarget=function(g,N=0,z=0){U=g,H=N,G=z;let V=null,k=!1,he=!1;if(g){const pe=M.get(g);if(pe.__useDefaultFramebuffer!==void 0){ue.bindFramebuffer(D.FRAMEBUFFER,pe.__webglFramebuffer),W.copy(g.viewport),j.copy(g.scissor),se=g.scissorTest,ue.viewport(W),ue.scissor(j),ue.setScissorTest(se),F=-1;return}else if(pe.__webglFramebuffer===void 0)_.setupRenderTarget(g);else if(pe.__hasExternalTextures)_.rebindTextures(g,M.get(g.texture).__webglTexture,M.get(g.depthTexture).__webglTexture);else if(g.depthBuffer){const ye=g.depthTexture;if(pe.__boundDepthTexture!==ye){if(ye!==null&&M.has(ye)&&(g.width!==ye.image.width||g.height!==ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");_.setupDepthRenderbuffer(g)}}const xe=g.texture;(xe.isData3DTexture||xe.isDataArrayTexture||xe.isCompressedArrayTexture)&&(he=!0);const Me=M.get(g).__webglFramebuffer;g.isWebGLCubeRenderTarget?(Array.isArray(Me[N])?V=Me[N][z]:V=Me[N],k=!0):g.samples>0&&_.useMultisampledRTT(g)===!1?V=M.get(g).__webglMultisampledFramebuffer:Array.isArray(Me)?V=Me[z]:V=Me,W.copy(g.viewport),j.copy(g.scissor),se=g.scissorTest}else W.copy(ee).multiplyScalar(we).floor(),j.copy(Ae).multiplyScalar(we).floor(),se=Ce;if(z!==0&&(V=_s),ue.bindFramebuffer(D.FRAMEBUFFER,V)&&ue.drawBuffers(g,V),ue.viewport(W),ue.scissor(j),ue.setScissorTest(se),k){const pe=M.get(g.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+N,pe.__webglTexture,z)}else if(he){const pe=N;for(let xe=0;xe<g.textures.length;xe++){const Me=M.get(g.textures[xe]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+xe,Me.__webglTexture,z,pe)}}else if(g!==null&&z!==0){const pe=M.get(g.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,pe.__webglTexture,z)}F=-1},this.readRenderTargetPixels=function(g,N,z,V,k,he,Se,pe=0){if(!(g&&g.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=M.get(g).__webglFramebuffer;if(g.isWebGLCubeRenderTarget&&Se!==void 0&&(xe=xe[Se]),xe){ue.bindFramebuffer(D.FRAMEBUFFER,xe);try{const Me=g.textures[pe],ye=Me.format,De=Me.type;if(g.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+pe),!Ze.textureFormatReadable(ye)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ze.textureTypeReadable(De)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=g.width-V&&z>=0&&z<=g.height-k&&D.readPixels(N,z,V,k,I.convert(ye),I.convert(De),he)}finally{const Me=U!==null?M.get(U).__webglFramebuffer:null;ue.bindFramebuffer(D.FRAMEBUFFER,Me)}}},this.readRenderTargetPixelsAsync=async function(g,N,z,V,k,he,Se,pe=0){if(!(g&&g.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=M.get(g).__webglFramebuffer;if(g.isWebGLCubeRenderTarget&&Se!==void 0&&(xe=xe[Se]),xe)if(N>=0&&N<=g.width-V&&z>=0&&z<=g.height-k){ue.bindFramebuffer(D.FRAMEBUFFER,xe);const Me=g.textures[pe],ye=Me.format,De=Me.type;if(g.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+pe),!Ze.textureFormatReadable(ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ze.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Te),D.bufferData(D.PIXEL_PACK_BUFFER,he.byteLength,D.STREAM_READ),D.readPixels(N,z,V,k,I.convert(ye),I.convert(De),0);const qe=U!==null?M.get(U).__webglFramebuffer:null;ue.bindFramebuffer(D.FRAMEBUFFER,qe);const lt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Ts(D,lt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Te),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,he),D.deleteBuffer(Te),D.deleteSync(lt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(g,N=null,z=0){const V=Math.pow(2,-z),k=Math.floor(g.image.width*V),he=Math.floor(g.image.height*V),Se=N!==null?N.x:0,pe=N!==null?N.y:0;_.setTexture2D(g,0),D.copyTexSubImage2D(D.TEXTURE_2D,z,0,0,Se,pe,k,he),ue.unbindTexture()};const gs=D.createFramebuffer(),vs=D.createFramebuffer();this.copyTextureToTexture=function(g,N,z=null,V=null,k=0,he=0){let Se,pe,xe,Me,ye,De,Te,qe,lt;const ot=g.isCompressedTexture?g.mipmaps[he]:g.image;if(z!==null)Se=z.max.x-z.min.x,pe=z.max.y-z.min.y,xe=z.isBox3?z.max.z-z.min.z:1,Me=z.min.x,ye=z.min.y,De=z.isBox3?z.min.z:0;else{const ft=Math.pow(2,-k);Se=Math.floor(ot.width*ft),pe=Math.floor(ot.height*ft),g.isDataArrayTexture?xe=ot.depth:g.isData3DTexture?xe=Math.floor(ot.depth*ft):xe=1,Me=0,ye=0,De=0}V!==null?(Te=V.x,qe=V.y,lt=V.z):(Te=0,qe=0,lt=0);const $e=I.convert(N.format),St=I.convert(N.type);let ge;N.isData3DTexture?(_.setTexture3D(N,0),ge=D.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(_.setTexture2DArray(N,0),ge=D.TEXTURE_2D_ARRAY):(_.setTexture2D(N,0),ge=D.TEXTURE_2D),ue.activeTexture(D.TEXTURE0),ue.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,N.flipY),ue.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),ue.pixelStorei(D.UNPACK_ALIGNMENT,N.unpackAlignment);const Rt=ue.getParameter(D.UNPACK_ROW_LENGTH),Ve=ue.getParameter(D.UNPACK_IMAGE_HEIGHT),Pt=ue.getParameter(D.UNPACK_SKIP_PIXELS),Ht=ue.getParameter(D.UNPACK_SKIP_ROWS),en=ue.getParameter(D.UNPACK_SKIP_IMAGES);ue.pixelStorei(D.UNPACK_ROW_LENGTH,ot.width),ue.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ot.height),ue.pixelStorei(D.UNPACK_SKIP_PIXELS,Me),ue.pixelStorei(D.UNPACK_SKIP_ROWS,ye),ue.pixelStorei(D.UNPACK_SKIP_IMAGES,De);const vn=g.isDataArrayTexture||g.isData3DTexture,je=N.isDataArrayTexture||N.isData3DTexture;if(g.isDepthTexture){const ft=M.get(g),tn=M.get(N),Qe=M.get(ft.__renderTarget),nn=M.get(tn.__renderTarget);ue.bindFramebuffer(D.READ_FRAMEBUFFER,Qe.__webglFramebuffer),ue.bindFramebuffer(D.DRAW_FRAMEBUFFER,nn.__webglFramebuffer);for(let Sn=0;Sn<xe;Sn++)vn&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,M.get(g).__webglTexture,k,De+Sn),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,M.get(N).__webglTexture,he,lt+Sn)),D.blitFramebuffer(Me,ye,Se,pe,Te,qe,Se,pe,D.DEPTH_BUFFER_BIT,D.NEAREST);ue.bindFramebuffer(D.READ_FRAMEBUFFER,null),ue.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(k!==0||g.isRenderTargetTexture||M.has(g)){const ft=M.get(g),tn=M.get(N);ue.bindFramebuffer(D.READ_FRAMEBUFFER,gs),ue.bindFramebuffer(D.DRAW_FRAMEBUFFER,vs);for(let Qe=0;Qe<xe;Qe++)vn?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ft.__webglTexture,k,De+Qe):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ft.__webglTexture,k),je?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,tn.__webglTexture,he,lt+Qe):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,tn.__webglTexture,he),k!==0?D.blitFramebuffer(Me,ye,Se,pe,Te,qe,Se,pe,D.COLOR_BUFFER_BIT,D.NEAREST):je?D.copyTexSubImage3D(ge,he,Te,qe,lt+Qe,Me,ye,Se,pe):D.copyTexSubImage2D(ge,he,Te,qe,Me,ye,Se,pe);ue.bindFramebuffer(D.READ_FRAMEBUFFER,null),ue.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else je?g.isDataTexture||g.isData3DTexture?D.texSubImage3D(ge,he,Te,qe,lt,Se,pe,xe,$e,St,ot.data):N.isCompressedArrayTexture?D.compressedTexSubImage3D(ge,he,Te,qe,lt,Se,pe,xe,$e,ot.data):D.texSubImage3D(ge,he,Te,qe,lt,Se,pe,xe,$e,St,ot):g.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,he,Te,qe,Se,pe,$e,St,ot.data):g.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,he,Te,qe,ot.width,ot.height,$e,ot.data):D.texSubImage2D(D.TEXTURE_2D,he,Te,qe,Se,pe,$e,St,ot);ue.pixelStorei(D.UNPACK_ROW_LENGTH,Rt),ue.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ve),ue.pixelStorei(D.UNPACK_SKIP_PIXELS,Pt),ue.pixelStorei(D.UNPACK_SKIP_ROWS,Ht),ue.pixelStorei(D.UNPACK_SKIP_IMAGES,en),he===0&&N.generateMipmaps&&D.generateMipmap(ge),ue.unbindTexture()},this.initRenderTarget=function(g){M.get(g).__webglFramebuffer===void 0&&_.setupRenderTarget(g)},this.initTexture=function(g){g.isCubeTexture?_.setTextureCube(g,0):g.isData3DTexture?_.setTexture3D(g,0):g.isDataArrayTexture||g.isCompressedArrayTexture?_.setTexture2DArray(g,0):_.setTexture2D(g,0),ue.unbindTexture()},this.resetState=function(){H=0,G=0,U=null,ue.reset(),ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(n),t.unpackColorSpace=nt._getUnpackColorSpace()}}function Ei(e,n=!1){const t=e[0].index!==null,i=new Set(Object.keys(e[0].attributes)),a=new Set(Object.keys(e[0].morphAttributes)),r={},o={},s=e[0].morphTargetsRelative,c=new gn;let l=0;for(let p=0;p<e.length;++p){const u=e[p];let f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in u.attributes){if(!i.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;r[m]===void 0&&(r[m]=[]),r[m].push(u.attributes[m]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+". Make sure all geometries have the same number of attributes."),null;if(s!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in u.morphAttributes){if(!a.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+".  .morphAttributes must be consistent throughout all geometries."),null;o[m]===void 0&&(o[m]=[]),o[m].push(u.morphAttributes[m])}if(n){let m;if(t)m=u.index.count;else if(u.attributes.position!==void 0)m=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,m,p),l+=m}}if(t){let p=0;const u=[];for(let f=0;f<e.length;++f){const m=e[f].index;for(let S=0;S<m.count;++S)u.push(m.getX(S)+p);p+=e[f].attributes.position.count}c.setIndex(u)}for(const p in r){const u=ka(r[p]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+p+" attribute."),null;c.setAttribute(p,u)}for(const p in o){const u=o[p][0].length;if(u!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[p]=[];for(let f=0;f<u;++f){const m=[];for(let x=0;x<o[p].length;++x)m.push(o[p][x][f]);const S=ka(m);if(!S)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+p+" morphAttribute."),null;c.morphAttributes[p].push(S)}}}return c}function ka(e){let n,t,i,a=-1,r=0;for(let l=0;l<e.length;++l){const p=e[l];if(n===void 0&&(n=p.array.constructor),n!==p.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=p.itemSize),t!==p.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=p.normalized),i!==p.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(a===-1&&(a=p.gpuType),a!==p.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=p.count*t}const o=new n(r),s=new cn(o,t,i);let c=0;for(let l=0;l<e.length;++l){const p=e[l];if(p.isInterleavedBufferAttribute){const u=c/t;for(let f=0,m=p.count;f<m;f++)for(let S=0;S<t;S++){const x=p.getComponent(f,S);s.setComponent(f+u,S,x)}}else o.set(p.array,c);c+=p.count*t}return a!==void 0&&(s.gpuType=a),s}function Jm(e,n=1e-4){n=Math.max(n,Number.EPSILON);const t={},i=e.getIndex(),a=e.getAttribute("position"),r=i?i.count:a.count;let o=0;const s=Object.keys(e.attributes),c={},l={},p=[],u=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let E=0,R=s.length;E<R;E++){const b=s[E],C=e.attributes[b];c[b]=new C.constructor(new C.array.constructor(C.count*C.itemSize),C.itemSize,C.normalized);const A=e.morphAttributes[b];A&&(l[b]||(l[b]=[]),A.forEach((P,v)=>{const T=new P.array.constructor(P.count*P.itemSize);l[b][v]=new P.constructor(T,P.itemSize,P.normalized)}))}const m=n*.5,S=Math.log10(1/n),x=Math.pow(10,S),d=m*x;for(let E=0;E<r;E++){const R=i?i.getX(E):E;let b="";for(let C=0,A=s.length;C<A;C++){const P=s[C],v=e.getAttribute(P),T=v.itemSize;for(let y=0;y<T;y++)b+=`${~~(v[u[y]](R)*x+d)},`}if(b in t)p.push(t[b]);else{for(let C=0,A=s.length;C<A;C++){const P=s[C],v=e.getAttribute(P),T=e.morphAttributes[P],y=v.itemSize,w=c[P],O=l[P];for(let H=0;H<y;H++){const G=u[H],U=f[H];if(w[U](o,v[G](R)),T)for(let F=0,L=T.length;F<L;F++)O[F][U](o,T[F][G](R))}}t[b]=o,p.push(o),o++}}const h=e.clone();for(const E in e.attributes){const R=c[E];if(h.setAttribute(E,new R.constructor(R.array.slice(0,o*R.itemSize),R.itemSize,R.normalized)),E in l)for(let b=0;b<l[E].length;b++){const C=l[E][b];h.morphAttributes[E][b]=new C.constructor(C.array.slice(0,o*C.itemSize),C.itemSize,C.normalized)}}return h.setIndex(p),h}function za(e,n){if(n===Uc)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),e;if(n===er||n===Io){let t=e.getIndex();if(t===null){const o=[],s=e.getAttribute("position");if(s!==void 0){for(let c=0;c<s.count;c++)o.push(c);e.setIndex(o),t=e.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),e}const i=t.count-2,a=[];if(n===er)for(let o=1;o<=i;o++)a.push(t.getX(0)),a.push(t.getX(o)),a.push(t.getX(o+1));else for(let o=0;o<i;o++)o%2===0?(a.push(t.getX(o)),a.push(t.getX(o+1)),a.push(t.getX(o+2))):(a.push(t.getX(o+2)),a.push(t.getX(o+1)),a.push(t.getX(o)));a.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=e.clone();return r.setIndex(a),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",n),e}function Ko(e){const n=new Map,t=new Map,i=e.clone();return qo(e,i,function(a,r){n.set(r,a),t.set(a,r)}),i.traverse(function(a){if(!a.isSkinnedMesh)return;const r=a,o=n.get(a),s=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=s.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),i}function qo(e,n,t){t(e,n);for(let i=0;i<e.children.length;i++)qo(e.children[i],n.children[i],t)}class Yo extends Dc{constructor(n){super(n),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new oh(t)}),this.register(function(t){return new sh(t)}),this.register(function(t){return new _h(t)}),this.register(function(t){return new gh(t)}),this.register(function(t){return new vh(t)}),this.register(function(t){return new lh(t)}),this.register(function(t){return new fh(t)}),this.register(function(t){return new uh(t)}),this.register(function(t){return new dh(t)}),this.register(function(t){return new ah(t)}),this.register(function(t){return new ph(t)}),this.register(function(t){return new ch(t)}),this.register(function(t){return new mh(t)}),this.register(function(t){return new hh(t)}),this.register(function(t){return new ih(t)}),this.register(function(t){return new Wa(t,Fe.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Wa(t,Fe.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Sh(t)})}load(n,t,i,a){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Kn.extractUrlBase(n);o=Kn.resolveURL(l,this.path)}else o=Kn.extractUrlBase(n);this.manager.itemStart(n);const s=function(l){a?a(l):console.error(l),r.manager.itemError(n),r.manager.itemEnd(n)},c=new Uo(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(n,function(l){try{r.parse(l,o,function(p){t(p),r.manager.itemEnd(n)},s)}catch(p){s(p)}},i,s)}setDRACOLoader(n){return this.dracoLoader=n,this}setKTX2Loader(n){return this.ktx2Loader=n,this}setMeshoptDecoder(n){return this.meshoptDecoder=n,this}register(n){return this.pluginCallbacks.indexOf(n)===-1&&this.pluginCallbacks.push(n),this}unregister(n){return this.pluginCallbacks.indexOf(n)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(n),1),this}parse(n,t,i,a){let r;const o={},s={},c=new TextDecoder;if(typeof n=="string")r=JSON.parse(n);else if(n instanceof ArrayBuffer)if(c.decode(new Uint8Array(n,0,4))===$o){try{o[Fe.KHR_BINARY_GLTF]=new xh(n)}catch(u){a&&a(u);return}r=JSON.parse(o[Fe.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(n));else r=n;if(r.asset===void 0||r.asset.version[0]<2){a&&a(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Uh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let p=0;p<this.pluginCallbacks.length;p++){const u=this.pluginCallbacks[p](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),s[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let p=0;p<r.extensionsUsed.length;++p){const u=r.extensionsUsed[p],f=r.extensionsRequired||[];switch(u){case Fe.KHR_MATERIALS_UNLIT:o[u]=new rh;break;case Fe.KHR_DRACO_MESH_COMPRESSION:o[u]=new Eh(r,this.dracoLoader);break;case Fe.KHR_TEXTURE_TRANSFORM:o[u]=new Mh;break;case Fe.KHR_MESH_QUANTIZATION:o[u]=new Th;break;default:f.indexOf(u)>=0&&s[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(s),l.parse(i,a)}parseAsync(n,t){const i=this;return new Promise(function(a,r){i.parse(n,t,a,r)})}}function nh(){let e={};return{get:function(n){return e[n]},add:function(n,t){e[n]=t},remove:function(n){delete e[n]},removeAll:function(){e={}}}}function ut(e,n,t){const i=e.json.materials[n];return i.extensions&&i.extensions[t]?i.extensions[t]:null}const Fe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class ih{constructor(n){this.parser=n,this.name=Fe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const n=this.parser,t=this.parser.json.nodes||[];for(let i=0,a=t.length;i<a;i++){const r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&n._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(n){const t=this.parser,i="light:"+n;let a=t.cache.get(i);if(a)return a;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[n];let l;const p=new ze(16777215);c.color!==void 0&&p.setRGB(c.color[0],c.color[1],c.color[2],Ot);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Oc(p),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Fc(p),l.distance=u;break;case"spot":l=new Nc(p),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Vt(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+n),a=Promise.resolve(l),t.cache.add(i,a),a}getDependency(n,t){if(n==="light")return this._loadLight(t)}createNodeAttachment(n){const t=this,i=this.parser,r=i.json.nodes[n],s=(r.extensions&&r.extensions[this.name]||{}).light;return s===void 0?null:this._loadLight(s).then(function(c){return i._getNodeRef(t.cache,s,c)})}}class rh{constructor(){this.name=Fe.KHR_MATERIALS_UNLIT}getMaterialType(){return An}extendParams(n,t,i){const a=[];n.color=new ze(1,1,1),n.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;n.color.setRGB(o[0],o[1],o[2],Ot),n.opacity=o[3]}r.baseColorTexture!==void 0&&a.push(i.assignTexture(n,"map",r.baseColorTexture,ln))}return Promise.all(a)}}class ah{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(n,t){const i=ut(this.parser,n,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class oh{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_CLEARCOAT}getMaterialType(n){return ut(this.parser,n,this.name)!==null?Yt:null}extendMaterialParams(n,t){const i=ut(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&a.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&a.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(a.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const r=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Et(r,r)}return Promise.all(a)}}class sh{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_DISPERSION}getMaterialType(n){return ut(this.parser,n,this.name)!==null?Yt:null}extendMaterialParams(n,t){const i=ut(this.parser,n,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class ch{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(n){return ut(this.parser,n,this.name)!==null?Yt:null}extendMaterialParams(n,t){const i=ut(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&a.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&a.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(a)}}class lh{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_SHEEN}getMaterialType(n){return ut(this.parser,n,this.name)!==null?Yt:null}extendMaterialParams(n,t){const i=ut(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];if(t.sheenColor=new ze(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){const r=i.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Ot)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&a.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,ln)),i.sheenRoughnessTexture!==void 0&&a.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(a)}}class fh{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_TRANSMISSION}getMaterialType(n){return ut(this.parser,n,this.name)!==null?Yt:null}extendMaterialParams(n,t){const i=ut(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&a.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(a)}}class uh{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_VOLUME}getMaterialType(n){return ut(this.parser,n,this.name)!==null?Yt:null}extendMaterialParams(n,t){const i=ut(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&a.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;const r=i.attenuationColor||[1,1,1];return t.attenuationColor=new ze().setRGB(r[0],r[1],r[2],Ot),Promise.all(a)}}class dh{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_IOR}getMaterialType(n){return ut(this.parser,n,this.name)!==null?Yt:null}extendMaterialParams(n,t){const i=ut(this.parser,n,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class ph{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_SPECULAR}getMaterialType(n){return ut(this.parser,n,this.name)!==null?Yt:null}extendMaterialParams(n,t){const i=ut(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&a.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));const r=i.specularColorFactor||[1,1,1];return t.specularColor=new ze().setRGB(r[0],r[1],r[2],Ot),i.specularColorTexture!==void 0&&a.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,ln)),Promise.all(a)}}class hh{constructor(n){this.parser=n,this.name=Fe.EXT_MATERIALS_BUMP}getMaterialType(n){return ut(this.parser,n,this.name)!==null?Yt:null}extendMaterialParams(n,t){const i=ut(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&a.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(a)}}class mh{constructor(n){this.parser=n,this.name=Fe.KHR_MATERIALS_ANISOTROPY}getMaterialType(n){return ut(this.parser,n,this.name)!==null?Yt:null}extendMaterialParams(n,t){const i=ut(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&a.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(a)}}class _h{constructor(n){this.parser=n,this.name=Fe.KHR_TEXTURE_BASISU}loadTexture(n){const t=this.parser,i=t.json,a=i.textures[n];if(!a.extensions||!a.extensions[this.name])return null;const r=a.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(n,r.source,o)}}class gh{constructor(n){this.parser=n,this.name=Fe.EXT_TEXTURE_WEBP}loadTexture(n){const t=this.name,i=this.parser,a=i.json,r=a.textures[n];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],s=a.images[o.source];let c=i.textureLoader;if(s.uri){const l=i.options.manager.getHandler(s.uri);l!==null&&(c=l)}return i.loadTextureImage(n,o.source,c)}}class vh{constructor(n){this.parser=n,this.name=Fe.EXT_TEXTURE_AVIF}loadTexture(n){const t=this.name,i=this.parser,a=i.json,r=a.textures[n];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],s=a.images[o.source];let c=i.textureLoader;if(s.uri){const l=i.options.manager.getHandler(s.uri);l!==null&&(c=l)}return i.loadTextureImage(n,o.source,c)}}class Wa{constructor(n,t){this.name=t,this.parser=n}loadBufferView(n){const t=this.parser.json,i=t.bufferViews[n];if(i.extensions&&i.extensions[this.name]){const a=i.extensions[this.name],r=this.parser.getDependency("buffer",a.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(s){const c=a.byteOffset||0,l=a.byteLength||0,p=a.count,u=a.byteStride,f=new Uint8Array(s,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(p,u,f,a.mode,a.filter).then(function(m){return m.buffer}):o.ready.then(function(){const m=new ArrayBuffer(p*u);return o.decodeGltfBuffer(new Uint8Array(m),p,u,f,a.mode,a.filter),m})})}else return null}}class Sh{constructor(n){this.name=Fe.EXT_MESH_GPU_INSTANCING,this.parser=n}createNodeMesh(n){const t=this.parser.json,i=t.nodes[n];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const a=t.meshes[i.mesh];for(const l of a.primitives)if(l.mode!==It.TRIANGLES&&l.mode!==It.TRIANGLE_STRIP&&l.mode!==It.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=i.extensions[this.name].attributes,s=[],c={};for(const l in o)s.push(this.parser.getDependency("accessor",o[l]).then(p=>(c[l]=p,c[l])));return s.length<1?null:(s.push(this.parser.createNodeMesh(n)),Promise.all(s).then(l=>{const p=l.pop(),u=p.isGroup?p.children:[p],f=l[0].count,m=[];for(const S of u){const x=new mt,d=new Z,h=new dt,E=new Z(1,1,1),R=new Bc(S.geometry,S.material,f);for(let b=0;b<f;b++)c.TRANSLATION&&d.fromBufferAttribute(c.TRANSLATION,b),c.ROTATION&&h.fromBufferAttribute(c.ROTATION,b),c.SCALE&&E.fromBufferAttribute(c.SCALE,b),R.setMatrixAt(b,x.compose(d,h,E));for(const b in c)if(b==="_COLOR_0"){const C=c[b];R.instanceColor=new Hc(C.array,C.itemSize,C.normalized)}else b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"&&S.geometry.setAttribute(b,c[b]);Do.prototype.copy.call(R,S),this.parser.assignFinalMaterial(R),m.push(R)}return p.isGroup?(p.clear(),p.add(...m),p):m[0]}))}}const $o="glTF",Fn=12,Xa={JSON:1313821514,BIN:5130562};class xh{constructor(n){this.name=Fe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(n,0,Fn),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(n.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==$o)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const a=this.header.length-Fn,r=new DataView(n,Fn);let o=0;for(;o<a;){const s=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===Xa.JSON){const l=new Uint8Array(n,Fn+o,s);this.content=i.decode(l)}else if(c===Xa.BIN){const l=Fn+o;this.body=n.slice(l,l+s)}o+=s}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Eh{constructor(n,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Fe.KHR_DRACO_MESH_COMPRESSION,this.json=n,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(n,t){const i=this.json,a=this.dracoLoader,r=n.extensions[this.name].bufferView,o=n.extensions[this.name].attributes,s={},c={},l={};for(const p in o){const u=ir[p]||p.toLowerCase();s[u]=o[p]}for(const p in n.attributes){const u=ir[p]||p.toLowerCase();if(o[p]!==void 0){const f=i.accessors[n.attributes[p]],m=Rn[f.componentType];l[u]=m.name,c[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(p){return new Promise(function(u,f){a.decodeDracoFile(p,function(m){for(const S in m.attributes){const x=m.attributes[S],d=c[S];d!==void 0&&(x.normalized=d)}u(m)},s,l,Ot,f)})})}}class Mh{constructor(){this.name=Fe.KHR_TEXTURE_TRANSFORM}extendTexture(n,t){return(t.texCoord===void 0||t.texCoord===n.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(n=n.clone(),t.texCoord!==void 0&&(n.channel=t.texCoord),t.offset!==void 0&&n.offset.fromArray(t.offset),t.rotation!==void 0&&(n.rotation=t.rotation),t.scale!==void 0&&n.repeat.fromArray(t.scale),n.needsUpdate=!0),n}}class Th{constructor(){this.name=Fe.KHR_MESH_QUANTIZATION}}class jo extends Jc{constructor(n,t,i,a){super(n,t,i,a)}copySampleValue_(n){const t=this.resultBuffer,i=this.sampleValues,a=this.valueSize,r=n*a*3+a;for(let o=0;o!==a;o++)t[o]=i[r+o];return t}interpolate_(n,t,i,a){const r=this.resultBuffer,o=this.sampleValues,s=this.valueSize,c=s*2,l=s*3,p=a-t,u=(i-t)/p,f=u*u,m=f*u,S=n*l,x=S-l,d=-2*m+3*f,h=m-f,E=1-d,R=h-f+u;for(let b=0;b!==s;b++){const C=o[x+b+s],A=o[x+b+c]*p,P=o[S+b+s],v=o[S+b]*p;r[b]=E*C+R*A+d*P+h*v}return r}}const Ah=new dt;class bh extends jo{interpolate_(n,t,i,a){const r=super.interpolate_(n,t,i,a);return Ah.fromArray(r).normalize().toArray(r),r}}const It={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Rn={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ka={9728:Zt,9729:vt,9984:po,9985:ui,9986:Gn,9987:jt},qa={33071:Zn,33648:uo,10497:Si},zi={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ir={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},rn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Rh={CUBICSPLINE:void 0,LINEAR:Oo,STEP:Zc},Wi={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function wh(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new Ai({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:wn})),e.DefaultMaterial}function dn(e,n,t){for(const i in t.extensions)e[i]===void 0&&(n.userData.gltfExtensions=n.userData.gltfExtensions||{},n.userData.gltfExtensions[i]=t.extensions[i])}function Vt(e,n){n.extras!==void 0&&(typeof n.extras=="object"?Object.assign(e.userData,n.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+n.extras))}function Ch(e,n,t){let i=!1,a=!1,r=!1;for(let l=0,p=n.length;l<p;l++){const u=n[l];if(u.POSITION!==void 0&&(i=!0),u.NORMAL!==void 0&&(a=!0),u.COLOR_0!==void 0&&(r=!0),i&&a&&r)break}if(!i&&!a&&!r)return Promise.resolve(e);const o=[],s=[],c=[];for(let l=0,p=n.length;l<p;l++){const u=n[l];if(i){const f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):e.attributes.position;o.push(f)}if(a){const f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):e.attributes.normal;s.push(f)}if(r){const f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):e.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(l){const p=l[0],u=l[1],f=l[2];return i&&(e.morphAttributes.position=p),a&&(e.morphAttributes.normal=u),r&&(e.morphAttributes.color=f),e.morphTargetsRelative=!0,e})}function Lh(e,n){if(e.updateMorphTargets(),n.weights!==void 0)for(let t=0,i=n.weights.length;t<i;t++)e.morphTargetInfluences[t]=n.weights[t];if(n.extras&&Array.isArray(n.extras.targetNames)){const t=n.extras.targetNames;if(e.morphTargetInfluences.length===t.length){e.morphTargetDictionary={};for(let i=0,a=t.length;i<a;i++)e.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ph(e){let n;const t=e.extensions&&e.extensions[Fe.KHR_DRACO_MESH_COMPRESSION];if(t?n="draco:"+t.bufferView+":"+t.indices+":"+Xi(t.attributes):n=e.indices+":"+Xi(e.attributes)+":"+e.mode,e.targets!==void 0)for(let i=0,a=e.targets.length;i<a;i++)n+=":"+Xi(e.targets[i]);return n}function Xi(e){let n="";const t=Object.keys(e).sort();for(let i=0,a=t.length;i<a;i++)n+=t[i]+":"+e[t[i]]+";";return n}function rr(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function yh(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?"image/jpeg":e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?"image/webp":e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Ih=new mt;class Uh{constructor(n={},t={}){this.json=n,this.extensions={},this.plugins={},this.options=t,this.cache=new nh,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,a=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const s=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(s)===!0;const c=s.match(/Version\/(\d+)/);a=i&&c?parseInt(c[1],10):-1,r=s.indexOf("Firefox")>-1,o=r?s.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&a<17||r&&o<98?this.textureLoader=new Gc(this.options.manager):this.textureLoader=new Vc(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Uo(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(n){this.extensions=n}setPlugins(n){this.plugins=n}parse(n,t){const i=this,a=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){const s={scene:o[0][a.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:a.asset,parser:i,userData:{}};return dn(r,s,a),Vt(s,a),Promise.all(i._invokeAll(function(c){return c.afterRoot&&c.afterRoot(s)})).then(function(){for(const c of s.scenes)c.updateMatrixWorld();n(s)})}).catch(t)}_markDefs(){const n=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let a=0,r=t.length;a<r;a++){const o=t[a].joints;for(let s=0,c=o.length;s<c;s++)n[o[s]].isBone=!0}for(let a=0,r=n.length;a<r;a++){const o=n[a];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(n,t){t!==void 0&&(n.refs[t]===void 0&&(n.refs[t]=n.uses[t]=0),n.refs[t]++)}_getNodeRef(n,t,i){if(n.refs[t]<=1)return i;const a=i.clone(),r=(o,s)=>{const c=this.associations.get(o);c!=null&&this.associations.set(s,c);for(const[l,p]of o.children.entries())r(p,s.children[l])};return r(i,a),a.name+="_instance_"+n.uses[t]++,a}_invokeOne(n){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const a=n(t[i]);if(a)return a}return null}_invokeAll(n){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let a=0;a<t.length;a++){const r=n(t[a]);r&&i.push(r)}return i}getDependency(n,t){const i=n+":"+t;let a=this.cache.get(i);if(!a){switch(n){case"scene":a=this.loadScene(t);break;case"node":a=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":a=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":a=this.loadAccessor(t);break;case"bufferView":a=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":a=this.loadBuffer(t);break;case"material":a=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":a=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":a=this.loadSkin(t);break;case"animation":a=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":a=this.loadCamera(t);break;default:if(a=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(n,t)}),!a)throw new Error("Unknown type: "+n);break}this.cache.add(i,a)}return a}getDependencies(n){let t=this.cache.get(n);if(!t){const i=this,a=this.json[n+(n==="mesh"?"es":"s")]||[];t=Promise.all(a.map(function(r,o){return i.getDependency(n,o)})),this.cache.add(n,t)}return t}loadBuffer(n){const t=this.json.buffers[n],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&n===0)return Promise.resolve(this.extensions[Fe.KHR_BINARY_GLTF].body);const a=this.options;return new Promise(function(r,o){i.load(Kn.resolveURL(t.uri,a.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(n){const t=this.json.bufferViews[n];return this.getDependency("buffer",t.buffer).then(function(i){const a=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+a)})}loadAccessor(n){const t=this,i=this.json,a=this.json.accessors[n];if(a.bufferView===void 0&&a.sparse===void 0){const o=zi[a.type],s=Rn[a.componentType],c=a.normalized===!0,l=new s(a.count*o);return Promise.resolve(new cn(l,o,c))}const r=[];return a.bufferView!==void 0?r.push(this.getDependency("bufferView",a.bufferView)):r.push(null),a.sparse!==void 0&&(r.push(this.getDependency("bufferView",a.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",a.sparse.values.bufferView))),Promise.all(r).then(function(o){const s=o[0],c=zi[a.type],l=Rn[a.componentType],p=l.BYTES_PER_ELEMENT,u=p*c,f=a.byteOffset||0,m=a.bufferView!==void 0?i.bufferViews[a.bufferView].byteStride:void 0,S=a.normalized===!0;let x,d;if(m&&m!==u){const h=Math.floor(f/m),E="InterleavedBuffer:"+a.bufferView+":"+a.componentType+":"+h+":"+a.count;let R=t.cache.get(E);R||(x=new l(s,h*m,a.count*m/p),R=new kc(x,m/p),t.cache.add(E,R)),d=new Qc(R,c,f%m/p,S)}else s===null?x=new l(a.count*c):x=new l(s,f,a.count*c),d=new cn(x,c,S);if(a.sparse!==void 0){const h=zi.SCALAR,E=Rn[a.sparse.indices.componentType],R=a.sparse.indices.byteOffset||0,b=a.sparse.values.byteOffset||0,C=new E(o[1],R,a.sparse.count*h),A=new l(o[2],b,a.sparse.count*c);s!==null&&(d=new cn(d.array.slice(),d.itemSize,d.normalized)),d.normalized=!1;for(let P=0,v=C.length;P<v;P++){const T=C[P];if(d.setX(T,A[P*c]),c>=2&&d.setY(T,A[P*c+1]),c>=3&&d.setZ(T,A[P*c+2]),c>=4&&d.setW(T,A[P*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}d.normalized=S}return d})}loadTexture(n){const t=this.json,i=this.options,r=t.textures[n].source,o=t.images[r];let s=this.textureLoader;if(o.uri){const c=i.manager.getHandler(o.uri);c!==null&&(s=c)}return this.loadTextureImage(n,r,s)}loadTextureImage(n,t,i){const a=this,r=this.json,o=r.textures[n],s=r.images[t],c=(s.uri||s.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,i).then(function(p){p.flipY=!1,p.name=o.name||s.name||"",p.name===""&&typeof s.uri=="string"&&s.uri.startsWith("data:image/")===!1&&(p.name=s.uri);const f=(r.samplers||{})[o.sampler]||{};return p.magFilter=Ka[f.magFilter]||vt,p.minFilter=Ka[f.minFilter]||jt,p.wrapS=qa[f.wrapS]||Si,p.wrapT=qa[f.wrapT]||Si,p.generateMipmaps=!p.isCompressedTexture&&p.minFilter!==Zt&&p.minFilter!==vt,a.associations.set(p,{textures:n}),p}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(n,t){const i=this,a=this.json,r=this.options;if(this.sourceCache[n]!==void 0)return this.sourceCache[n].then(u=>u.clone());const o=a.images[n],s=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=i.getDependency("bufferView",o.bufferView).then(function(u){l=!0;const f=new Blob([u],{type:o.mimeType});return c=s.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+n+" is missing URI and bufferView");const p=Promise.resolve(c).then(function(u){return new Promise(function(f,m){let S=f;t.isImageBitmapLoader===!0&&(S=function(x){const d=new Jn(x);d.needsUpdate=!0,f(d)}),t.load(Kn.resolveURL(u,r.path),S,void 0,m)})}).then(function(u){return l===!0&&s.revokeObjectURL(c),Vt(u,o),u.userData.mimeType=o.mimeType||yh(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[n]=p,p}assignTexture(n,t,i,a){const r=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),r.extensions[Fe.KHR_TEXTURE_TRANSFORM]){const s=i.extensions!==void 0?i.extensions[Fe.KHR_TEXTURE_TRANSFORM]:void 0;if(s){const c=r.associations.get(o);o=r.extensions[Fe.KHR_TEXTURE_TRANSFORM].extendTexture(o,s),r.associations.set(o,c)}}return a!==void 0&&(o.colorSpace=a),n[t]=o,o})}assignFinalMaterial(n){const t=n.geometry;let i=n.material;const a=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(n.isPoints){const s="PointsMaterial:"+i.uuid;let c=this.cache.get(s);c||(c=new zc,Fi.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,c.sizeAttenuation=!1,this.cache.add(s,c)),i=c}else if(n.isLine){const s="LineBasicMaterial:"+i.uuid;let c=this.cache.get(s);c||(c=new Wc,Fi.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,this.cache.add(s,c)),i=c}if(a||r||o){let s="ClonedMaterial:"+i.uuid+":";a&&(s+="derivative-tangents:"),r&&(s+="vertex-colors:"),o&&(s+="flat-shading:");let c=this.cache.get(s);c||(c=i.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),a&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(s,c),this.associations.set(c,this.associations.get(i))),i=c}n.material=i}getMaterialType(){return Ai}loadMaterial(n){const t=this,i=this.json,a=this.extensions,r=i.materials[n];let o;const s={},c=r.extensions||{},l=[];if(c[Fe.KHR_MATERIALS_UNLIT]){const u=a[Fe.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(s,r,t))}else{const u=r.pbrMetallicRoughness||{};if(s.color=new ze(1,1,1),s.opacity=1,Array.isArray(u.baseColorFactor)){const f=u.baseColorFactor;s.color.setRGB(f[0],f[1],f[2],Ot),s.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(s,"map",u.baseColorTexture,ln)),s.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,s.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(s,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(s,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(n)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(n,s)})))}r.doubleSided===!0&&(s.side=Ut);const p=r.alphaMode||Wi.OPAQUE;if(p===Wi.BLEND?(s.transparent=!0,s.depthWrite=!1):(s.transparent=!1,p===Wi.MASK&&(s.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==An&&(l.push(t.assignTexture(s,"normalMap",r.normalTexture)),s.normalScale=new Et(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;s.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==An&&(l.push(t.assignTexture(s,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(s.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==An){const u=r.emissiveFactor;s.emissive=new ze().setRGB(u[0],u[1],u[2],Ot)}return r.emissiveTexture!==void 0&&o!==An&&l.push(t.assignTexture(s,"emissiveMap",r.emissiveTexture,ln)),Promise.all(l).then(function(){const u=new o(s);return r.name&&(u.name=r.name),Vt(u,r),t.associations.set(u,{materials:n}),r.extensions&&dn(a,u,r),u})}createUniqueName(n){const t=Xc.sanitizeNodeName(n||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(n){const t=this,i=this.extensions,a=this.primitiveCache;function r(s){return i[Fe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(s,t).then(function(c){return Ya(c,s,t)})}const o=[];for(let s=0,c=n.length;s<c;s++){const l=n[s],p=Ph(l),u=a[p];if(u)o.push(u.promise);else{let f;l.extensions&&l.extensions[Fe.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Ya(new gn,l,t),a[p]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(n){const t=this,i=this.json,a=this.extensions,r=i.meshes[n],o=r.primitives,s=[];for(let c=0,l=o.length;c<l;c++){const p=o[c].material===void 0?wh(this.cache):this.getDependency("material",o[c].material);s.push(p)}return s.push(t.loadGeometries(o)),Promise.all(s).then(function(c){const l=c.slice(0,c.length-1),p=c[c.length-1],u=[];for(let m=0,S=p.length;m<S;m++){const x=p[m],d=o[m];let h;const E=l[m];if(d.mode===It.TRIANGLES||d.mode===It.TRIANGLE_STRIP||d.mode===It.TRIANGLE_FAN||d.mode===void 0)h=r.isSkinnedMesh===!0?new gr(x,E):new qt(x,E),h.isSkinnedMesh===!0&&h.normalizeSkinWeights(),d.mode===It.TRIANGLE_STRIP?h.geometry=za(h.geometry,Io):d.mode===It.TRIANGLE_FAN&&(h.geometry=za(h.geometry,er));else if(d.mode===It.LINES)h=new Kc(x,E);else if(d.mode===It.LINE_STRIP)h=new qc(x,E);else if(d.mode===It.LINE_LOOP)h=new Yc(x,E);else if(d.mode===It.POINTS)h=new $c(x,E);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+d.mode);Object.keys(h.geometry.morphAttributes).length>0&&Lh(h,r),h.name=t.createUniqueName(r.name||"mesh_"+n),Vt(h,r),d.extensions&&dn(a,h,d),t.assignFinalMaterial(h),u.push(h)}for(let m=0,S=u.length;m<S;m++)t.associations.set(u[m],{meshes:n,primitives:m});if(u.length===1)return r.extensions&&dn(a,u[0],r),u[0];const f=new hi;r.extensions&&dn(a,f,r),t.associations.set(f,{meshes:n});for(let m=0,S=u.length;m<S;m++)f.add(u[m]);return f})}loadCamera(n){let t;const i=this.json.cameras[n],a=i[i.type];if(!a){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new Xn(No.radToDeg(a.yfov),a.aspectRatio||1,a.znear||1,a.zfar||2e6):i.type==="orthographic"&&(t=new dr(-a.xmag,a.xmag,a.ymag,-a.ymag,a.znear,a.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Vt(t,i),Promise.resolve(t)}loadSkin(n){const t=this.json.skins[n],i=[];for(let a=0,r=t.joints.length;a<r;a++)i.push(this._loadNodeShallow(t.joints[a]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(a){const r=a.pop(),o=a,s=[],c=[];for(let l=0,p=o.length;l<p;l++){const u=o[l];if(u){s.push(u);const f=new mt;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Fo(s,c)})}loadAnimation(n){const t=this.json,i=this,a=t.animations[n],r=a.name?a.name:"animation_"+n,o=[],s=[],c=[],l=[],p=[];for(let u=0,f=a.channels.length;u<f;u++){const m=a.channels[u],S=a.samplers[m.sampler],x=m.target,d=x.node,h=a.parameters!==void 0?a.parameters[S.input]:S.input,E=a.parameters!==void 0?a.parameters[S.output]:S.output;x.node!==void 0&&(o.push(this.getDependency("node",d)),s.push(this.getDependency("accessor",h)),c.push(this.getDependency("accessor",E)),l.push(S),p.push(x))}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l),Promise.all(p)]).then(function(u){const f=u[0],m=u[1],S=u[2],x=u[3],d=u[4],h=[];for(let R=0,b=f.length;R<b;R++){const C=f[R],A=m[R],P=S[R],v=x[R],T=d[R];if(C===void 0)continue;C.updateMatrix&&C.updateMatrix();const y=i._createAnimationTracks(C,A,P,v,T);if(y)for(let w=0;w<y.length;w++)h.push(y[w])}const E=new jc(r,void 0,h);return Vt(E,a),E})}createNodeMesh(n){const t=this.json,i=this,a=t.nodes[n];return a.mesh===void 0?null:i.getDependency("mesh",a.mesh).then(function(r){const o=i._getNodeRef(i.meshCache,a.mesh,r);return a.weights!==void 0&&o.traverse(function(s){if(s.isMesh)for(let c=0,l=a.weights.length;c<l;c++)s.morphTargetInfluences[c]=a.weights[c]}),o})}loadNode(n){const t=this.json,i=this,a=t.nodes[n],r=i._loadNodeShallow(n),o=[],s=a.children||[];for(let l=0,p=s.length;l<p;l++)o.push(i.getDependency("node",s[l]));const c=a.skin===void 0?Promise.resolve(null):i.getDependency("skin",a.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const p=l[0],u=l[1],f=l[2];f!==null&&p.traverse(function(m){m.isSkinnedMesh&&m.bind(f,Ih)});for(let m=0,S=u.length;m<S;m++)p.add(u[m]);if(p.userData.pivot!==void 0&&u.length>0){const m=p.userData.pivot,S=u[0];p.pivot=new Z().fromArray(m),p.position.x-=m[0],p.position.y-=m[1],p.position.z-=m[2],S.position.set(0,0,0),delete p.userData.pivot}return p})}_loadNodeShallow(n){const t=this.json,i=this.extensions,a=this;if(this.nodeCache[n]!==void 0)return this.nodeCache[n];const r=t.nodes[n],o=r.name?a.createUniqueName(r.name):"",s=[],c=a._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(n)});return c&&s.push(c),r.camera!==void 0&&s.push(a.getDependency("camera",r.camera).then(function(l){return a._getNodeRef(a.cameraCache,r.camera,l)})),a._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(n)}).forEach(function(l){s.push(l)}),this.nodeCache[n]=Promise.all(s).then(function(l){let p;if(r.isBone===!0?p=new kn:l.length>1?p=new hi:l.length===1?p=l[0]:p=new Do,p!==l[0])for(let u=0,f=l.length;u<f;u++)p.add(l[u]);if(r.name&&(p.userData.name=r.name,p.name=o),Vt(p,r),r.extensions&&dn(i,p,r),r.matrix!==void 0){const u=new mt;u.fromArray(r.matrix),p.applyMatrix4(u)}else r.translation!==void 0&&p.position.fromArray(r.translation),r.rotation!==void 0&&p.quaternion.fromArray(r.rotation),r.scale!==void 0&&p.scale.fromArray(r.scale);if(!a.associations.has(p))a.associations.set(p,{});else if(r.mesh!==void 0&&a.meshCache.refs[r.mesh]>1){const u=a.associations.get(p);a.associations.set(p,{...u})}return a.associations.get(p).nodes=n,p}),this.nodeCache[n]}loadScene(n){const t=this.extensions,i=this.json.scenes[n],a=this,r=new hi;i.name&&(r.name=a.createUniqueName(i.name)),Vt(r,i),i.extensions&&dn(t,r,i);const o=i.nodes||[],s=[];for(let c=0,l=o.length;c<l;c++)s.push(a.getDependency("node",o[c]));return Promise.all(s).then(function(c){for(let p=0,u=c.length;p<u;p++){const f=c[p];f.parent!==null?r.add(Ko(f)):r.add(f)}const l=p=>{const u=new Map;for(const[f,m]of a.associations)(f instanceof Fi||f instanceof Jn)&&u.set(f,m);return p.traverse(f=>{const m=a.associations.get(f);m!=null&&u.set(f,m)}),u};return a.associations=l(r),r})}_createAnimationTracks(n,t,i,a,r){const o=[],s=n.name?n.name:n.uuid,c=[];function l(m){m.morphTargetInfluences&&c.push(m.name?m.name:m.uuid)}rn[r.path]===rn.weights?(l(n),n.isGroup&&n.children.forEach(l)):c.push(s);let p;switch(rn[r.path]){case rn.weights:p=ga;break;case rn.rotation:p=va;break;case rn.translation:case rn.scale:p=_a;break;default:switch(i.itemSize){case 1:p=ga;break;case 2:case 3:default:p=_a;break}break}const u=a.interpolation!==void 0?Rh[a.interpolation]:Oo,f=this._getArrayFromAccessor(i);for(let m=0,S=c.length;m<S;m++){const x=new p(c[m]+"."+rn[r.path],t.array,f,u);a.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),o.push(x)}return o}_getArrayFromAccessor(n){let t=n.array;if(n.normalized){const i=rr(t.constructor),a=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)a[r]=t[r]*i;t=a}return t}_createCubicSplineTrackInterpolant(n){n.createInterpolant=function(i){const a=this instanceof va?bh:jo;return new a(this.times,this.values,this.getValueSize()/3,i)},n.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Dh(e,n,t){const i=n.attributes,a=new vr;if(i.POSITION!==void 0){const s=t.json.accessors[i.POSITION],c=s.min,l=s.max;if(c!==void 0&&l!==void 0){if(a.set(new Z(c[0],c[1],c[2]),new Z(l[0],l[1],l[2])),s.normalized){const p=rr(Rn[s.componentType]);a.min.multiplyScalar(p),a.max.multiplyScalar(p)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=n.targets;if(r!==void 0){const s=new Z,c=new Z;for(let l=0,p=r.length;l<p;l++){const u=r[l];if(u.POSITION!==void 0){const f=t.json.accessors[u.POSITION],m=f.min,S=f.max;if(m!==void 0&&S!==void 0){if(c.setX(Math.max(Math.abs(m[0]),Math.abs(S[0]))),c.setY(Math.max(Math.abs(m[1]),Math.abs(S[1]))),c.setZ(Math.max(Math.abs(m[2]),Math.abs(S[2]))),f.normalized){const x=rr(Rn[f.componentType]);c.multiplyScalar(x)}s.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}a.expandByVector(s)}e.boundingBox=a;const o=new el;a.getCenter(o.center),o.radius=a.min.distanceTo(a.max)/2,e.boundingSphere=o}function Ya(e,n,t){const i=n.attributes,a=[];function r(o,s){return t.getDependency("accessor",o).then(function(c){e.setAttribute(s,c)})}for(const o in i){const s=ir[o]||o.toLowerCase();s in e.attributes||a.push(r(i[o],s))}if(n.indices!==void 0&&!e.index){const o=t.getDependency("accessor",n.indices).then(function(s){e.setIndex(s)});a.push(o)}return nt.workingColorSpace!==Ot&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${nt.workingColorSpace}" not supported.`),Vt(e,n),Dh(e,n,t),Promise.all(a).then(function(){return n.targets!==void 0?Ch(e,n.targets,t):e})}const Zo=["Hips","Spine","Spine1","Spine2","Neck","Head","LeftShoulder","LeftArm","LeftForeArm","LeftHand","RightShoulder","RightArm","RightForeArm","RightHand","LeftUpLeg","LeftLeg","LeftFoot","LeftToeBase","RightUpLeg","RightLeg","RightFoot","RightToeBase"],_i=["Left","Right"],bn=["Thumb","Index","Middle","Ring","Pinky"],e_=bn.length,wt=new dt,Ki=new dt,Nh=new dt,Fh=new dt,qn=new Z,Sr=new Z,Qo=new Z,$a=new Z,ar=new mt,Oh={Thumb:[.55,.75,.8],Index:[1.25,1.5,.95],Middle:[1.3,1.55,1],Ring:[1.35,1.5,1],Pinky:[1.4,1.5,1]};function Bh(e,n,t,i,a,r,o){const s=qn.copy(n).sub(e),c=s.length();c<1e-6?s.set(0,-1,0):s.multiplyScalar(1/c);const l=t+i,p=Math.abs(t-i)+1e-4,u=c<=l-1e-5&&c>=p,f=Math.min(l-1e-5,Math.max(p,c)),m=(t*t-i*i+f*f)/(2*f),S=Math.sqrt(Math.max(0,t*t-m*m)),x=Sr.copy(a).addScaledVector(s,-a.dot(s));return x.lengthSq()<1e-8&&(x.set(0,0,1).addScaledVector(s,-s.z),x.lengthSq()<1e-8&&x.set(0,1,0)),x.normalize(),r.copy(e).addScaledVector(s,m).addScaledVector(x,S),o.copy(e).addScaledVector(s,f),u}function ja(e,n,t){const i=qn.copy(e).normalize(),a=Sr.copy(n).addScaledVector(i,-n.dot(i));a.lengthSq()<1e-8&&a.set(0,1,0).addScaledVector(i,-i.y),a.normalize();const r=Qo.crossVectors(i,a);return ar.makeBasis(i,a,r),t.setFromRotationMatrix(ar)}function Hh(e,n,t,i){return wt.copy(n).invert(),i.copy(e).multiply(wt).multiply(t).multiply(n).normalize()}class t_{constructor(n,t){Ye(this,"bones",new Map);Ye(this,"missing",[]);Ye(this,"dims");Ye(this,"arms");Ye(this,"legs");Ye(this,"handLocal");Ye(this,"footLocal");Ye(this,"fingerJoints");Ye(this,"frameInv",new mt);Ye(this,"frameQInv",new dt);Ye(this,"frameToBip",new mt);Ye(this,"hips");Ye(this,"hipsParent");Ye(this,"driven",[]);Ye(this,"rootTmp",new Z);Ye(this,"mid",new Z);Ye(this,"end",new Z);var m;this.visual=n,this.frame=t,t.updateWorldMatrix(!0,!1),n.updateMatrixWorld(!0),this.syncFrame();const i=S=>{const x=n.getObjectByName(S);if(!x){this.missing.push(S);return}x.getWorldQuaternion(wt);const d={name:S,node:x,restLocal:x.quaternion.clone(),restLocalPos:x.position.clone(),restWorld:this.frameQInv.clone().multiply(wt.clone()),restPos:this.toFrame(x,new Z)};return this.bones.set(S,d),d};for(const S of Zo){const x=i(S);x&&this.driven.push(x)}this.fingerJoints={Left:[],Right:[]};for(const S of _i)for(const x of bn){const d=[];for(const h of[1,2,3]){const E=i(`${S}Hand${x}${h}`);E&&d.push(E)}this.fingerJoints[S].push(d.map(h=>({bone:h,axis:new Z(1,0,0)})))}this.missing.length&&console.warn("[humanRig] missing bones:",this.missing.join(", "));const a=S=>{const x=this.bones.get(S);if(!x)throw new Error(`humanRig: bone ${S} missing`);return x};this.hips=a("Hips"),this.hipsParent=this.hips.node.parent,(m=this.hipsParent)==null||m.updateWorldMatrix(!0,!1),this.hipsParent&&this.frameToBip.copy(this.frameInv).invert().premultiply(ar.copy(this.hipsParent.matrixWorld).invert());const r=(S,x)=>({upper:a(`${S}${x[0]}`),lower:a(`${S}${x[1]}`),end:a(`${S}${x[2]}`)});this.arms={Left:r("Left",["Arm","ForeArm","Hand"]),Right:r("Right",["Arm","ForeArm","Hand"])},this.legs={Left:r("Left",["UpLeg","Leg","Foot"]),Right:r("Right",["UpLeg","Leg","Foot"])};const o=(S,x)=>S.restPos.distanceTo(x.restPos),s=a("Neck"),c=a("Head"),l=n.getObjectByName("Bip01 LEye"),p=l?this.toFrame(l,new Z):c.restPos.clone().add(new Z(0,.09,.08));this.dims={thigh:o(this.legs.Left.upper,this.legs.Left.lower),shin:o(this.legs.Left.lower,this.legs.Left.end),upperArm:o(this.arms.Left.upper,this.arms.Left.lower),foreArm:o(this.arms.Left.lower,this.arms.Left.end),ankleHeight:this.legs.Left.end.restPos.y,hipsHeight:this.hips.restPos.y,hipHalfWidth:Math.abs(this.legs.Left.upper.restPos.x),shoulderHalfWidth:Math.abs(this.arms.Left.upper.restPos.x),hipsToShoulderY:this.arms.Left.upper.restPos.y-this.hips.restPos.y,hipsToShoulderZ:this.arms.Left.upper.restPos.z-this.hips.restPos.z,hipsToNeckY:s.restPos.y-this.hips.restPos.y,hipsToHeadY:c.restPos.y-this.hips.restPos.y,headToEyeY:p.y-c.restPos.y,headToEyeZ:p.z-c.restPos.z,eyeHalf:Math.abs(p.x)>.01?Math.abs(p.x):.032,sitDrop:0},this.dims.sitDrop=Gh(.125+(.965-this.dims.hipsHeight)*.343,.1,.18);const u={},f={};for(const S of _i){const x=this.arms[S].end,d=this.bones.get(`${S}HandMiddle1`),h=this.bones.get(`${S}HandIndex1`),E=this.bones.get(`${S}HandPinky1`),R=this.bones.get(`${S}HandThumb1`);let b=new Z(0,-1,.1),C=new Z(S==="Left"?-1:1,0,0);if(d&&h&&E&&R){b=d.restPos.clone().sub(x.restPos).normalize();const T=R.restPos.clone().sub(E.restPos);T.addScaledVector(b,-T.dot(b)).normalize(),C=new Z().crossVectors(b,T).multiplyScalar(S==="Left"?1:-1).normalize()}u[S]=this.localBasis(x,b,C);const A=this.legs[S].end,P=this.bones.get(`${S}ToeBase`),v=P?P.restPos.clone().sub(A.restPos):new Z(0,0,.12);v.y=0,v.normalize(),f[S]=this.localBasis(A,v,new Z(0,1,0)),this.fingerJoints[S].forEach(T=>{T.forEach((y,w)=>{var U;const O=((U=T[w+1])==null?void 0:U.bone)??null,H=O?O.restPos.clone().sub(y.bone.restPos):y.bone.restPos.clone().sub(T[w-1]?T[w-1].bone.restPos:x.restPos);H.normalize();const G=new Z().crossVectors(H,C);G.lengthSq()<1e-8&&G.copy(Vh(S)),G.normalize(),y.axis.copy(G).applyQuaternion(wt.copy(y.bone.restWorld).invert())})})}this.handLocal=u,this.footLocal=f}localBasis(n,t,i){const a=n.restWorld.clone().invert(),r=t.clone().applyQuaternion(a),o=i.clone().applyQuaternion(a);return{f:r,n:o,basisInv:ja(r,o,new dt).invert()}}syncFrame(){this.frame.updateWorldMatrix(!0,!1),this.frameInv.copy(this.frame.matrixWorld).invert(),this.frame.matrixWorld.decompose(qn,wt,$a),this.frameQInv.copy(wt).invert()}toFrame(n,t){return t.setFromMatrixPosition(n.matrixWorld).applyMatrix4(this.frameInv)}worldQuatF(n,t){return n?(n.matrixWorld.decompose(qn,t,$a),t.premultiply(this.frameQInv)):t.identity()}bone(n){return this.bones.get(n)}resetPose(){for(const n of this.driven)n.node.quaternion.copy(n.restLocal);for(const n of _i)for(const t of this.fingerJoints[n])for(const i of t)i.bone.node.quaternion.copy(i.bone.restLocal)}setHipsPosition(n){this.hips.node.position.copy(n).applyMatrix4(this.frameToBip)}rotate(n,t){const i=this.bones.get(n);i&&Hh(i.restLocal,i.restWorld,t,i.node.quaternion)}updateWorld(){this.hips.node.updateMatrixWorld(!0)}characterRotation(n,t){const i=this.bones.get(n);return i?(this.worldQuatF(i.node,t),t.multiply(Ki.copy(i.restWorld).invert())):t.identity()}position(n,t){const i=this.bones.get(n);return i?this.toFrame(i.node,t):t.set(0,0,0)}aim(n,t,i){const a=this.toFrame(n.node,qn),r=this.toFrame(t.node,Sr).sub(a),o=Qo.copy(i).sub(a);if(r.lengthSq()<1e-10||o.lengthSq()<1e-10)return;wt.setFromUnitVectors(r.normalize(),o.normalize());const s=this.worldQuatF(n.node.parent,Ki),c=Nh.copy(s).multiply(n.node.quaternion);c.premultiply(wt),n.node.quaternion.copy(s.invert().multiply(c)).normalize(),n.node.updateMatrixWorld(!0)}solveLimb(n,t,i){const a=this.toFrame(n.upper.node,this.rootTmp),r=n.upper.restPos.distanceTo(n.lower.restPos),o=n.lower.restPos.distanceTo(n.end.restPos),s=Bh(a,t,r,o,i,this.mid,this.end);return this.aim(n.upper,n.lower,this.mid),this.aim(n.lower,n.end,this.end),s}orientEnd(n,t,i,a){const r=t==="hand"?this.arms[n]:this.legs[n],o=t==="hand"?this.handLocal[n]:this.footLocal[n],s=ja(i,a,Fh).multiply(o.basisInv),c=this.worldQuatF(r.end.node.parent,Ki);r.end.node.quaternion.copy(c.invert().multiply(s)).normalize(),r.end.node.updateMatrixWorld(!0)}setCurl(n,t){this.fingerJoints[n].forEach((i,a)=>{const r=Math.min(1,Math.max(0,t[a]??0)),o=Oh[bn[a]];i.forEach((s,c)=>{wt.setFromAxisAngle(s.axis,o[c]*r),s.bone.node.quaternion.copy(s.bone.restLocal).multiply(wt)})})}addFingerBend(n,t,i,a){var o;const r=(o=this.fingerJoints[n][bn.indexOf(t)])==null?void 0:o[i];r&&(wt.setFromAxisAngle(r.axis,a),r.bone.node.quaternion.multiply(wt))}fingertip(n,t,i){const a=this.fingerJoints[n][bn.indexOf(t)],r=a[a.length-1];return r?(this.updateWorld(),this.toFrame(r.bone.node,i)):i.set(0,0,0)}}function Gh(e,n,t){return Math.min(t,Math.max(n,e))}function Vh(e){return new Z(e==="Left"?1:-1,0,0)}const or={me2026:"heroes/me2026.glb",lin:"heroes/lin.glb"},kh=["eyeBlinkLeft","eyeBlinkRight","jawOpen","mouthSmileLeft","mouthSmileRight","browInnerUp"],xr=new Map,ri=new Map;function Jo(e){return/^(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.glb$/.test(e)}function zh(e){e.updateMatrixWorld(!0);const n=new Set,t=new Set,i=new Set;let a=0,r=0;const o=new vr;if(e.traverse(f=>{var x;f.isBone&&n.add(f.name);const m=f;if(!m.isMesh)return;m.isSkinnedMesh&&a++;const S=m.geometry.getAttribute("position");if(!S)throw new Error(`Mesh ${m.name} has no positions`);for(let d=0;d<S.count;d++)if(!Number.isFinite(S.getX(d)+S.getY(d)+S.getZ(d)))throw new Error("Non-finite model geometry");r+=(((x=m.geometry.index)==null?void 0:x.count)??S.count)/3;for(const d of Array.isArray(m.material)?m.material:[m.material])i.add(d);for(const d of Object.keys(m.morphTargetDictionary??{}))t.add(d);o.expandByObject(m)}),!a)throw new Error("Character must contain a skinned mesh");const s=Zo.filter(f=>!n.has(f));if(s.length)throw new Error(`Missing core bones: ${s.join(", ")}`);const c=o.max.y-o.min.y;if(!Number.isFinite(c)||c<.5||c>3)throw new Error("Character dimensions must use meters (height 0.5–3 m)");const l=[];for(const f of _i)for(const m of bn)for(const S of[1,2,3]){const x=`${f}Hand${m}${S}`;n.has(x)||l.push(x)}const p=kh.filter(f=>!t.has(f)),u=[];return Math.abs(o.min.y)>.03&&u.push(`Feet y=${o.min.y.toFixed(3)}, expected 0`),r>6e4&&u.push(`Triangle budget exceeded: ${Math.round(r)}`),i.size>3&&u.push(`Material budget exceeded: ${i.size}`),p.length&&u.push(`Missing morphs: ${p.join(", ")}`),l.length&&u.push(`Missing ${l.length} finger joints`),{height:c,feetY:o.min.y,triangles:r,materials:i.size,missingMorphs:[...p],missingFingers:l,warnings:u}}function Wh(e,n){if(!Jo(e))throw new Error("Invalid local character model path");const t=zh(n),i=e===or.me2026?1.84:e===or.lin?1.68:void 0;return i&&Math.abs(t.height-i)>.025&&t.warnings.push(`Height ${t.height.toFixed(3)} m; expected ${i.toFixed(2)} m`),n.traverse(a=>{const r=a;if(r.isMesh)for(const o of Array.isArray(r.material)?r.material:[r.material])for(const s of Object.values(o))s instanceof Jn&&(s.userData.shared=!0)}),xr.set(e,{scene:n,report:t}),t}function es(e){var n;return e?(n=xr.get(e))==null?void 0:n.scene:void 0}async function Xh(e){if(!Jo(e))return{path:e,status:"invalid",message:"Invalid local character model path"};const n=xr.get(e);if(n)return{path:e,status:"ready",report:n.report};const t=ri.get(e);if(t)return t;const i=(async()=>{try{const a=`./models/${e}`,r=await fetch(a);if(r.status===404)return{path:e,status:"missing",message:"Not delivered yet; using fallback"};if(!r.ok)return{path:e,status:"failed",message:`HTTP ${r.status}`};const o=await r.arrayBuffer();if(o.byteLength<12||new DataView(o).getUint32(0,!0)!==1179937895)return{path:e,status:"invalid",message:"Response is not a GLB file"};const s=await new Yo().parseAsync(o,a.slice(0,a.lastIndexOf("/")+1));return{path:e,status:"ready",report:Wh(e,s.scene)}}catch(a){return{path:e,status:"failed",message:a instanceof Error?a.message:String(a)}}})();ri.set(e,i);try{return await i}finally{ri.get(e)===i&&ri.delete(e)}}async function Kh(e){return Promise.all([...new Set(e)].map(Xh))}const qh=e=>e.replace(/_/g," ");function ts(e,n){return e.bones.findIndex(t=>qh(t.name)===n)}function Za(e,n){const t=ts(e,n);return t<0?null:new Z().setFromMatrixPosition(e.boneInverses[t].clone().invert())}function On(e,n,t,i,a){const r=ts(i.skeleton,t);if(r<0)return null;const o=e.getAttribute("position").count;e.setAttribute("skinIndex",new _r(new Array(o*4).fill(0).map((c,l)=>l%4===0?r:0),4)),e.setAttribute("skinWeight",new an(new Array(o*4).fill(0).map((c,l)=>l%4===0?1:0),4));const s=new gr(e,n);return s.name=a,s.frustumCulled=!1,s.castShadow=!0,s.bind(i.skeleton,i.bindMatrix),s}const Yn=(e,n,t=!1,i=28)=>new il(new rl(e,t,"catmullrom",.5),i,n,5,t);function Yh(e,n){const t=e.getAttribute("position");let i=n.eye.z+.012;for(let a=0;a<t.count;a++){const r=Math.abs(t.getX(a)-n.eye.x),o=t.getY(a)-n.eye.y;r>.02&&r<.045&&o>-.02&&o<.025&&(i=Math.max(i,t.getZ(a)))}return i}function $h(e,n,t){const i=n.eyeHalf,a=Math.max(n.eye.z+.02,t+.006),r=n.eye.y+.002,o=e==="metal"?.0245:.027,s=e==="metal"?.0026:e==="square"?.0048:.0056,c=[],l=[],p=m=>{const S=[];for(let d=0;d<24;d++){const h=d/24*Math.PI*2;if(e==="square"){const R=Math.cos(h),b=Math.sin(h);S.push(new Z(m+Math.sign(R)*Math.pow(Math.abs(R),.38)*.031,r+Math.sign(b)*Math.pow(Math.abs(b),.38)*.021,a))}else S.push(new Z(m+Math.cos(h)*o,r+Math.sin(h)*o,a))}return S};for(const m of[1,-1]){const S=n.eye.x+m*i;c.push(Yn(p(S),s,!0,36));const x=e==="square"?new mr(.058,.04):new tl(o*.97,20);x.translate(S,r,a),l.push(x);const d=S+m*(e==="square"?.031:o);c.push(Yn([new Z(d,r+.003,a),new Z(m*.071,r+.002,a-.045),new Z(m*.079,r-.004,n.eye.z-.085)],s*.9,!1,10))}const u=e==="square"?.031:o;c.push(Yn([new Z(n.eye.x+i-u,r+.006,a),new Z(n.eye.x,r+.011,a+.002),new Z(n.eye.x-i+u,r+.006,a)],s,!1,8));const f=m=>m.index?m.toNonIndexed():m;return{frame:Ei(c.map(f)),lens:Ei(l.map(f))}}function jh(e){const n=(a,r,o)=>new Z(e.x+a,e.y+r,e.z+o),t=Yn([n(.082,-.07,.07),n(.1,-.015,0),n(.074,.02,-.075),n(0,.03,-.095),n(-.074,.02,-.075),n(-.1,-.015,0),n(-.082,-.07,.07)],.0065,!1,36),i=[t.index?t.toNonIndexed():t];for(const a of[1,-1]){const r=new nl(.034,.034,.024,20);r.rotateZ(Math.PI/2),r.translate(a*.084,0,0),r.translate(e.x,e.y-.082,e.z+.078),i.push(r.index?r.toNonIndexed():r)}return Ei(i)}function Zh(e){const n=e.skull.center,t=e.skull.radii,i=1.05,a=.78,r=new Z(t.x*Math.sin(i)*Math.cos(a),t.y*Math.sin(a),t.z*Math.cos(i)*Math.cos(a)),o=new Z(r.x/(t.x*t.x),r.y/(t.y*t.y),r.z/(t.z*t.z)).normalize(),s=new yn(.034,.008,.009),c=new dt().setFromUnitVectors(new Z(0,0,1),o);return s.applyQuaternion(c),s.rotateY(0),s.translate(n.x+r.x+o.x*.016,n.y+r.y+o.y*.016,n.z+r.z+o.z*.016),s}function Qh(e){const n=[],t=new yn(.3,.4,.14,1,1,1);t.translate(e.x,e.y-.02,e.z-.185);const i=new yn(.2,.15,.04);i.translate(e.x,e.y-.12,e.z-.275),n.push(t,i);for(const a of[1,-1])n.push(Yn([new Z(e.x+a*.1,e.y+.16,e.z-.2),new Z(e.x+a*.12,e.y+.2,e.z-.06),new Z(e.x+a*.125,e.y+.1,e.z+.075),new Z(e.x+a*.115,e.y-.08,e.z+.085)],.014,!1,14));return Ei(n.map(a=>a.index?a.toNonIndexed():a))}function Jh(e){const{ids:n,lm:t,headMesh:i,bodyMesh:a}=e,r={meshes:[],materials:[]},o=(l,p=.4,u=.1,f={})=>{const m=new Ai({color:l,roughness:p,metalness:u,...f});return r.materials.push(m),m},s=l=>{l&&r.meshes.push(l)},c=n.find(l=>l==="roundGlasses"||l==="squareGlasses"||l==="metalRoundGlasses");if(c){const l=c==="squareGlasses"?"square":c==="metalRoundGlasses"?"metal":"round",p=$h(l,t,Yh(i.geometry,t)),u=l==="metal"?14270318:e.color??2303534;s(On(p.frame,o(u,l==="metal"?.25:.4,l==="metal"?.8:.1),"Head",i,"human-glasses-frame")),s(On(p.lens,o(10470632,.05,0,{transparent:!0,opacity:.2,depthWrite:!1,side:Ut}),"Head",i,"human-glasses-lens"))}if(n.includes("neckHeadphones")){const l=Za(a.skeleton,"Neck");l&&s(On(jh(l),o(2303533,.5,.15),"Neck",a,"human-headphones"))}if(n.includes("hairClip")&&s(On(Zh(t),o(15780308,.35,.3),"Head",i,"human-hairclip")),n.includes("backpack")){const l=Za(a.skeleton,"Spine2");if(l){const p=On(Qh(l),o(1513500,.8,0),"Spine2",a,"human-backpack");p&&(s(p),r.backpack=p)}}return r}const ns=(e,n,t)=>{const i=n.getAttribute("skinIndex"),a=n.getAttribute("skinWeight");let r=0,o=-1;for(let s=0;s<4;s++){const c=a.getComponent(t,s);c>o&&(o=c,r=i.getComponent(t,s))}return{name:(e[r]??"").replace(/_/g," "),weight:o}},em=[.08,.112,.108];function Qa(e,n){const t=e.getAttribute("position"),i=new Z;let a=0,r=1/0,o=-1/0;for(let l=0;l<t.count;l++){const{name:p,weight:u}=ns(n,e,l);u>.6&&(p==="Bip01 LEye"||p==="Bip01 REye")&&(i.add(new Z(t.getX(l),t.getY(l),t.getZ(l))),r=Math.min(r,t.getX(l)),o=Math.max(o,t.getX(l)),a++)}if(!a)return null;const s=i.multiplyScalar(1/a),c=new Z(0,s.y+.005,s.z-.066);return{eye:s,eyeHalf:(Math.abs(o-r)/2>.03,.031),skull:{center:c,radii:new Z(...em)}}}function tm(e,n,t){const i=e.getAttribute("position"),a=new Uint8Array(i.count);for(let r=0;r<i.count;r++){const{name:o,weight:s}=ns(n,e,r);if(o!=="Head"||s<.5)continue;const c=i.getX(r)-t.eye.x,l=i.getY(r)-t.eye.y,p=i.getZ(r)-t.eye.z,u=Math.abs(c);u>.062&&u<.096&&Math.abs(l)<.05&&p>-.13&&p<-.02||(l>.05||u>.096&&l>-.1||p<-.06&&l>-.13||p<-.12)&&(a[r]=1)}return a}function nm(e,n,t){const i=tm(e,n,t),a=e.getAttribute("position"),r=t.skull.center,o=t.skull.radii;let s=0;for(let c=0;c<a.count;c++){if(!i[c])continue;const l=a.getX(c)-r.x,p=a.getY(c)-r.y,u=a.getZ(c)-r.z,f=(l/o.x)**2+(p/o.y)**2+(u/o.z)**2;if(f<=1)continue;const m=1/Math.sqrt(f);a.setXYZ(c,r.x+l*m,r.y+p*m,r.z+u*m),s++}return a.needsUpdate=!0,e.computeBoundingSphere(),s}function im(e,n){const t=e.getAttribute("position"),i=o=>{const s=t.getX(o)-n.eye.x,c=t.getY(o)-n.eye.y,l=t.getZ(o)-n.eye.z;return Math.abs(c)<.045&&l>-.03&&Math.abs(s)<.085},a=e.getIndex(),r=[];if(a)for(let o=0;o<a.count;o+=3){const s=a.getX(o),c=a.getX(o+1),l=a.getX(o+2);i(s)&&i(c)&&i(l)&&r.push(s,c,l)}else for(let o=0;o<t.count;o+=3)i(o)&&i(o+1)&&i(o+2)&&r.push(o,o+1,o+2);return e.setIndex(r),r.length/3}function rm(e){let n=(e^1374496523)>>>0;return()=>{n=n+1831565813>>>0;let t=n;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const st=(e,n,t)=>{const i=Math.min(1,Math.max(0,(t-e)/(n-e)));return i*i*(3-2*i)},am=e=>Math.hypot(e[0],e[1],e[2]),Nt=e=>{const n=am(e)||1;return[e[0]/n,e[1]/n,e[2]/n]},qi=(e,n)=>[e[1]*n[2]-e[2]*n[1],e[2]*n[0]-e[0]*n[2],e[0]*n[1]-e[1]*n[0]],xt=(e,n,t)=>e+(n-e)*t,om=(e,n)=>{if(n<=e[0][0])return e[0][1];for(let t=1;t<e.length;t++)if(n<=e[t][0])return xt(e[t-1][1],e[t][1],(n-e[t-1][0])/(e[t][0]-e[t-1][0]));return e[e.length-1][1]},sm=[[0,.8],[.8,.78],[1.2,.58],[1.5,.42],[1.9,.3],[2.3,-.05],[3.15,-.3]],yt=(e,n=0)=>t=>om(sm,t)+(e-.8)*(1-st(.9,1.5,t))+n*st(1.2,1.9,t),cm={messyCrop:{endLat:yt(.7),thick:(e,n,t)=>.006+.012*Math.sin(n)+t(e*4,n*6)*.01*Math.cos(n),cards:{count:26,width:[.025,.04],tipExtra:.02}},sidePart:{endLat:yt(.74),thick:(e,n,t)=>.006+.008*Math.sin(n)+.007*Math.max(0,Math.sin(e-.4))*Math.cos(n)+t(e*3,n*4)*.003,cards:{count:14,width:[.03,.045],tipExtra:.012}},buzz:{endLat:yt(.82,.05),thick:()=>.003},wavy:{endLat:yt(.68,-.05),thick:(e,n,t)=>.012+.016*Math.sin(n)+t(e*6,n*9)*.01*Math.cos(n),hang:e=>.03*st(1.5,2.4,e),flare:.02,cards:{count:24,width:[.03,.05],tipExtra:.025}},shortTieUp:{endLat:yt(.72),thick:(e,n)=>.006+.007*Math.sin(n),cards:{count:10,width:[.025,.04]},bundle:{kind:"tail",tie:[0,-.04,-.115],len:.075,radius:.016,sway:!0},sway:{pivot:[0,-.04,-.115],mid:[0,-.07,-.125],tip:[0,-.105,-.13]}},bob:{endLat:yt(.64),hang:e=>.1*st(1.7,2.3,e),flare:.03,back:.015,swing:.5,thick:(e,n)=>.008+.012*Math.sin(n)+.012*st(1.2,2,Math.abs(e))*Math.cos(n),cards:{count:22,width:[.035,.055],minA:1.7},sway:{pivot:[0,0,-.1],mid:[0,-.07,-.13],tip:[0,-.15,-.14]}},earShort:{endLat:yt(.66),hang:e=>.06*st(1.9,2.4,e),flare:.012,swing:.2,thick:(e,n)=>.007+.011*Math.sin(n)+.006*st(1.2,2,Math.abs(e))*Math.cos(n),cards:{count:12,width:[.03,.045],minA:1.7}},longStraight:{endLat:yt(.66),hang:e=>.1*st(1.6,2,e)+.26*st(1.7,2.4,e),flare:.012,back:.05,swing:.7,thick:(e,n)=>.007+.01*Math.sin(n)+.01*st(1.2,2,Math.abs(e))*Math.cos(n),cards:{count:24,width:[.04,.06],minA:1.9},sway:{pivot:[0,-.02,-.105],mid:[0,-.13,-.15],tip:[0,-.26,-.17]}},highPonytail:{endLat:yt(.76),thick:(e,n)=>.005+.006*Math.sin(n)+.01*Math.exp(-(((Math.abs(e)-3.14)/.5)**2+((n-.62)/.3)**2)),bundle:{kind:"tail",tie:[0,.066,-.101],len:.3,radius:.03,sway:!0},sway:{pivot:[0,.066,-.101],mid:[0,-.04,-.15],tip:[0,-.2,-.17]}},lowPonytail:{endLat:yt(.74),thick:(e,n)=>.005+.006*Math.sin(n)+.01*Math.exp(-(((Math.abs(e)-3.14)/.5)**2+((n+.3)/.3)**2)),bundle:{kind:"tail",tie:[0,-.034,-.116],len:.28,radius:.028,sway:!0},sway:{pivot:[0,-.034,-.116],mid:[0,-.12,-.14],tip:[0,-.27,-.15]}},sideBun:{endLat:yt(.76),thick:(e,n)=>.005+.006*Math.sin(n),bundle:{kind:"bun",center:[.052,.03,-.112],radius:.04}},thinningSwept:{endLat:yt(1.12,.05),thick:(e,n)=>.003+.004*Math.sin(n),cards:{count:16,width:[.02,.03],minA:1}}};function lm(e){const n=(t,i)=>{let a=Math.imul(t*374761393+i*668265263+e*2246822519,1274126177);return a=(a^a>>>13)>>>0,(a&65535)/65535*2-1};return(t,i)=>{const a=Math.floor(t),r=Math.floor(i),o=st(0,1,t-a),s=st(0,1,i-r);return xt(xt(n(a,r),n(a+1,r),o),xt(n(a,r+1),n(a+1,r+1),o),s)}}const ai=Math.PI*2,pn=56,Ja=9,eo=7,oi=(e,n,t,i,a,r,o,s)=>{e.positions.push(n[0],n[1],n[2]),e.normals.push(t[0],t[1],t[2]),e.uvs.push(i,a),e.colors.push(r,r,r),e.skinIndex.push(0,1,2,0),e.skinWeight.push(1-o,o*(1-s),o*s,0)};function fm(e,n,t){var R,b;const i=cm[e],a=rm(t*977+e.length*13),r=lm(t+5),o=n.skull.radii,s=n.skull.center,c={positions:[],normals:[],uvs:[],colors:[],skinIndex:[],skinWeight:[],index:[]},l=(C,A)=>[o.x*Math.sin(C)*Math.cos(A),o.y*Math.sin(A),o.z*Math.cos(C)*Math.cos(A)],p=C=>Nt([C[0]/(o.x*o.x),C[1]/(o.y*o.y),C[2]/(o.z*o.z)]),u=[];for(let C=0;C<=pn;C++){const A=-Math.PI+C/pn*ai,P=Math.abs(A),v=i.endLat(P),T=[];for(let w=0;w<=Ja;w++){const O=xt(Math.PI/2-.02,v,w/Ja),H=l(A,O),G=p(H),U=i.thick(A,O,r);T.push({p:[H[0]+G[0]*U,H[1]+G[1]*U,H[2]+G[2]*U],n:G,sw:0})}const y=i.hang?i.hang(P):0;if(y>.004){const w=T[T.length-1].p,O=Nt([w[0],0,w[2]]);for(let H=1;H<=eo;H++){const G=H/eo,U=(i.flare??0)*G*G,F=[w[0]*(1-.12*G)+O[0]*U,w[1]-y*G,w[2]+O[2]*U-(i.back??0)*G];T.push({p:F,n:Nt([O[0],.25,O[2]]),sw:(i.swing??0)*Math.pow(G,1.1)})}}u.push(T)}const f=C=>{const A=[0];for(let P=1;P<C.length;P++)A.push(A[P-1]+Math.hypot(C[P].p[0]-C[P-1].p[0],C[P].p[1]-C[P-1].p[1],C[P].p[2]-C[P-1].p[2]));return A.map(P=>P/(A[A.length-1]||1))},m=(C,A,P)=>{let v=1;for(;v<A.length-1&&A[v]<P;)v++;const T=(P-A[v-1])/(A[v]-A[v-1]||1),y=C[v-1],w=C[v];return{p:[xt(y.p[0],w.p[0],T),xt(y.p[1],w.p[1],T),xt(y.p[2],w.p[2],T)],n:Nt([xt(y.n[0],w.n[0],T),xt(y.n[1],w.n[1],T),xt(y.n[2],w.n[2],T)]),sw:xt(y.sw,w.sw,T)}},S=C=>.5+.55*Math.pow(C,.8);u.forEach((C,A)=>{const P=f(C),v=.9+r(A*.7,3.3)*.12;C.forEach((T,y)=>{oi(c,[s.x+T.p[0],s.y+T.p[1],s.z+T.p[2]],T.n,.02+.46*(A/pn),P[y],S(P[y])*v,T.sw,st(.3,1,P[y]))})}),u[0].length;const x=[];let d=0;for(const C of u)x.push(d),d+=C.length;for(let C=0;C<pn;C++){const A=u[C],P=u[C+1],v=Math.max(A.length,P.length),T=(y,w)=>Math.min(y-1,Math.round(w/(v-1)*(y-1)));for(let y=0;y<v-1;y++){const w=x[C]+T(A.length,y),O=x[C]+T(A.length,y+1),H=x[C+1]+T(P.length,y),G=x[C+1]+T(P.length,y+1);w===O&&H===G||c.index.push(w,H,O,H,G,O)}}if(i.cards){const C=i.cards.count;for(let A=0;A<C;A++){let P=Math.floor(a()*pn),v=0;for(;Math.abs(-Math.PI+P/pn*ai)<(i.cards.minA??.9)&&v++<20;)P=Math.floor(a()*pn);const T=u[P],y=f(T),w=.45+a()*.25,O=1,H=xt(i.cards.width[0],i.cards.width[1],a()),G=.85+a()*.25,U=6,F=[];for(let re=0;re<=U;re++)F.push(m(T,y,xt(w,O,re/U)));const L=F[F.length-1],W=F[F.length-2],j=Nt([L.p[0]-W.p[0],L.p[1]-W.p[1],L.p[2]-W.p[2]]),se=i.cards.tipExtra??.01;F.push({p:[L.p[0]+j[0]*se,L.p[1]+j[1]*se,L.p[2]+j[2]*se],n:L.n,sw:L.sw});const le=c.positions.length/3;F.forEach((re,Re)=>{const Ne=F[Math.min(F.length-1,Re+1)],we=F[Math.max(0,Re-1)],$=Nt([Ne.p[0]-we.p[0],Ne.p[1]-we.p[1],Ne.p[2]-we.p[2]]),fe=Nt(qi($,re.n)),ee=H/2*(1-.55*Math.pow(Re/(F.length-1),2)),Ae=.0035+.002*(Re/F.length),Ce=Re/(F.length-1);for(const be of[-1,1])oi(c,[s.x+re.p[0]+re.n[0]*Ae+fe[0]*ee*be,s.y+re.p[1]+re.n[1]*Ae+fe[1]*ee*be,s.z+re.p[2]+re.n[2]*Ae+fe[2]*ee*be],re.n,.5+(be<0?0:.5),Ce,S(xt(w,1,Ce))*G,re.sw,st(.3,1,xt(w,1,Ce)))});for(let re=0;re<F.length-1;re++){const Re=le+re*2;c.index.push(Re,Re+1,Re+2,Re+1,Re+3,Re+2)}}}let h=null;if(((R=i.bundle)==null?void 0:R.kind)==="tail"){const{tie:C,len:A,radius:P,sway:v}=i.bundle,T=16,y=12,w=[];for(let H=0;H<=T;H++){const G=H/T;w.push([C[0]+r(G*3,1.7)*.006*G,C[1]-A*Math.pow(G,1.1),C[2]-.055*(1-Math.exp(-G*5))-.02*G])}const O=c.positions.length/3;for(let H=0;H<=T;H++){const G=H/T,U=Nt([w[Math.min(T,H+1)][0]-w[Math.max(0,H-1)][0],w[Math.min(T,H+1)][1]-w[Math.max(0,H-1)][1],w[Math.min(T,H+1)][2]-w[Math.max(0,H-1)][2]]),F=Nt(qi(U,[0,0,1])),L=Nt(qi(F,U)),W=G<.04?P*.45:P*(.45+.55*st(.04,.28,G))*(1-.82*st(.3,1,G));for(let j=0;j<=y;j++){const se=j/y*ai,le=Math.cos(se),re=Math.sin(se),Re=[w[H][0]+(F[0]*le*1+L[0]*re*.8)*W,w[H][1]+(F[1]*le+L[1]*re*.8)*W,w[H][2]+(F[2]*le+L[2]*re*.8)*W],Ne=Nt([F[0]*le+L[0]*re,F[1]*le+L[1]*re,F[2]*le+L[2]*re]),we=G<.045;oi(c,[s.x+Re[0],s.y+Re[1],s.z+Re[2]],Ne,.02+.46*(j/y),G,we?.28:S(G)*(.92+.1*Math.sin(se*3)),v?Math.pow(G,1.3):0,st(.3,1,G))}}for(let H=0;H<T;H++)for(let G=0;G<y;G++){const U=O+H*(y+1)+G,F=U+y+1;c.index.push(U,F,U+1,U+1,F,F+1)}}else if(((b=i.bundle)==null?void 0:b.kind)==="bun"){const{center:C,radius:A}=i.bundle,P=c.positions.length/3,v=10,T=14;for(let y=0;y<=v;y++){const w=-Math.PI/2+y/v*Math.PI;for(let O=0;O<=T;O++){const H=O/T*ai,G=1+.06*Math.sin(H*3+w*4),U=[Math.cos(w)*Math.cos(H),Math.sin(w),Math.cos(w)*Math.sin(H)];oi(c,[s.x+C[0]+U[0]*A*G,s.y+C[1]+U[1]*A*.9*G,s.z+C[2]+U[2]*A*G],U,.02+.46*(O/T),y/v,.75+.3*(y/v),0,0)}}for(let y=0;y<v;y++)for(let w=0;w<T;w++){const O=P+y*(T+1)+w,H=O+T+1;c.index.push(O,H,O+1,O+1,H,H+1)}}i.sway&&(h=i.sway);const E=new gn;return E.setAttribute("position",new an(c.positions,3)),E.setAttribute("normal",new an(c.normals,3)),E.setAttribute("uv",new an(c.uvs,2)),E.setAttribute("color",new an(c.colors,3)),E.setAttribute("skinIndex",new _r(c.skinIndex,4)),E.setAttribute("skinWeight",new an(c.skinWeight,4)),E.setIndex(c.index),E.computeBoundingSphere(),{geometry:E,tail:h,vertexCount:c.positions.length/3}}const Wn=256,gi=256;function si(e){let n=Math.imul(e+2654435769,2246822507);return n=(n^n>>>13)>>>0,n=Math.imul(n,3266489909),((n^n>>>16)>>>0)/4294967296}function um(){const e=new Uint8ClampedArray(Wn*gi*4),n=Wn/2;for(let t=0;t<gi;t++){const i=t/(gi-1);for(let a=0;a<Wn;a++){const r=a>=n,o=r?a-n:a,s=(o+.5)/n,c=si(o*7+3)*.55+si(o*3+11)*.3+si(Math.floor(o/5)*17+5)*.15,l=Math.sin(i*7+o*.31)*.05;let p=.66+.34*c+l;p*=1+.13*Math.exp(-(((i-.3)/.1)**2));let u=1;const f=si(o*13+(r?91:5));r?(u*=st(0,.16,s)*st(0,.16,1-s),u*=st(0,.12,i),u*=1-st(.72+f*.12,1,i)):u*=1-st(.93+f*.04,1,i);const m=(t*Wn+a)*4,S=Math.min(255,Math.max(0,p*255));e[m]=e[m+1]=e[m+2]=S,e[m+3]=Math.min(255,u*255)}}return e}let Ft;function dm(){return Ft||(Ft=new fo(um(),Wn,gi,Wt),Ft.colorSpace=ln,Ft.wrapS=Ft.wrapT=Zn,Ft.generateMipmaps=!0,Ft.minFilter=jt,Ft.magFilter=vt,Ft.userData.shared=!0,Ft.needsUpdate=!0),Ft}function pm(e){const n=new Ai({color:e,map:dm(),vertexColors:!0,alphaTest:.35,side:Ut,roughness:.85,metalness:0,envMapIntensity:.15});return n.name="human-hair",n}function hm(e,n,t,i,a){const r=t.skeleton.bones.find(x=>x.name==="Head");if(!r)return null;const o=t.skeleton.bones.indexOf(r),s=t.skeleton.boneInverses[o],c=fm(e,n,a),l=[r],p=[s.clone()];let u=null;const f=x=>new Z(n.skull.center.x+x[0],n.skull.center.y+x[1],n.skull.center.z+x[2]).applyMatrix4(s);if(c.tail){const x=f(c.tail.pivot),d=f(c.tail.mid),h=f(c.tail.tip),E=new kn,R=new kn;E.name="hair-sway-a",R.name="hair-sway-b",E.position.copy(x),R.position.copy(d).sub(x),E.add(R),r.add(E);const b=new mt().copy(s).invert().multiply(new mt().makeTranslation(x.x,x.y,x.z)),C=b.clone().multiply(new mt().makeTranslation(R.position.x,R.position.y,R.position.z));l.push(E,R),p.push(b.invert(),C.invert()),u=new _m(r,E,R,x,d,h)}else l.push(new kn,new kn),p.push(new mt,new mt);const m=new gr(c.geometry,i);m.name=`human-hair-${e}`,m.frustumCulled=!1,m.castShadow=!0,m.receiveShadow=!0;const S=new Fo(l,p);return m.bind(S,t.bindMatrix),{mesh:m,sway:u,vertexCount:c.vertexCount,style:e}}const Yi=new Z,mm=new Z;class _m{constructor(n,t,i,a,r,o){Ye(this,"posA",new Z);Ye(this,"velA",new Z);Ye(this,"posB",new Z);Ye(this,"velB",new Z);Ye(this,"ready",!1);Ye(this,"restDirA");Ye(this,"restDirB");Ye(this,"lenA");Ye(this,"lenB");Ye(this,"angle",0);this.head=n,this.boneA=t,this.boneB=i,this.pivot=a,this.mid=r,this.tip=o,this.restDirA=r.clone().sub(a),this.restDirB=o.clone().sub(r),this.lenA=this.restDirA.length(),this.lenB=this.restDirB.length()}update(n){if(n<=0)return;const t=Math.min(n,1/30);this.head.updateWorldMatrix(!0,!1);const i=this.head.localToWorld(Yi.copy(this.pivot)).clone(),a=this.head.localToWorld(Yi.copy(this.mid)).clone(),r=this.head.localToWorld(Yi.copy(this.tip)).clone();this.ready||(this.posA.copy(a),this.posB.copy(r),this.ready=!0);const o=70;for(const[x,d,h]of[[this.posA,this.velA,a],[this.posB,this.velB,r]])d.addScaledVector(h.clone().sub(x),o*t).addScaledVector(d,-7*t),d.y-=1.2*t,x.addScaledVector(d,t);const s=this.head.getWorldScale(mm).x*1,c=this.lenA*s,l=this.lenB*s;this.posA.sub(i).setLength(c).add(i),this.posB.sub(this.posA).setLength(l).add(this.posA);const p=(x,d)=>this.head.worldToLocal(d.clone()).sub(this.head.worldToLocal(x.clone())).normalize(),u=p(i,this.posA),f=new dt().setFromUnitVectors(this.restDirA.clone().normalize(),u);this.clamp(f,.7),this.boneA.quaternion.copy(f);const m=p(this.posA,this.posB).applyQuaternion(f.clone().invert()),S=new dt().setFromUnitVectors(this.restDirB.clone().normalize(),m);this.clamp(S,.7),this.boneB.quaternion.copy(S),this.angle=2*Math.acos(Math.min(1,Math.abs(f.w)))}clamp(n,t){const i=2*Math.acos(Math.min(1,Math.abs(n.w)));i>t&&n.slerp(new dt,1-t/i)}}const is=["jawWidth","jawLength","cheekbone","cheekFull","noseLength","noseWidth","noseBridge","eyeSpacing","eyeSize","browHeight","browArch","mouthWidth","lipThickness","foreheadHeight","headAspect"],gm=Object.fromEntries(is.map(e=>[e,0])),vm=e=>rs({...gm,...e});function rs(e){const n={...e};for(const t of is)n[t]=Math.min(1,Math.max(-1,Number.isFinite(n[t])?n[t]:0));return n}function Sm(e){return vm({...e,cheekFull:e.cheekFull-.45,browHeight:e.browHeight-.35,jawLength:e.jawLength+.1,cheekbone:e.cheekbone+.1})}const Bn={pos:.008,jaw:.012,scale:.14,jawScale:.2,head:.06},Mt=(e,n,t,i=[0,0,0])=>{const a=e[n]??(e[n]={pos:[0,0,0],scale:[0,0,0]});for(let r=0;r<3;r++)a.pos[r]+=t[r],a.scale[r]+=i[r]};function xm(e){const n=rs(e),t={},i=Bn.pos,a=Bn.scale,r=Bn.jaw,o=Bn.jawScale;Mt(t,"Bip01 MJaw",[0,-r*n.jawLength,r*.4*n.jawLength],[o*n.jawWidth,o*.85*n.jawLength,o*.35*n.jawWidth]);for(const[l,p]of[[1,"Bip01 LCheek"],[-1,"Bip01 RCheek"]])Mt(t,p,[l*i*.9*n.cheekbone,i*.2*n.cheekbone,i*.8*n.cheekbone+i*.6*n.cheekFull],[a*n.cheekFull,a*n.cheekFull,a*n.cheekFull]);for(const[l,p]of[[1,"Bip01 LMasseter"],[-1,"Bip01 RMasseter"]])Mt(t,p,[l*i*.6*n.jawWidth,0,0],[a*.6*n.cheekFull,0,a*.6*n.cheekFull]);Mt(t,"Bip01 MNose",[0,-i*.3*n.noseLength,i*.7*n.noseBridge],[a*n.noseWidth,a*.9*n.noseLength,a*.9*n.noseBridge]);for(const[l,p,u,f]of[[1,"Bip01 LEye","Bip01 LEyeBlinkTop","Bip01 LEyeBlinkBottom"],[-1,"Bip01 REye","Bip01 REyeBlinkTop","Bip01 REyeBlinkBottom"]]){const m=l*i*.5*n.eyeSpacing;Mt(t,p,[m,0,0],[a*.5*n.eyeSize,a*.5*n.eyeSize,a*.5*n.eyeSize]),Mt(t,u,[m,i*.15*n.eyeSize,0]),Mt(t,f,[m,-i*.15*n.eyeSize,0])}for(const l of[1,-1]){const p=l===1?"L":"R";Mt(t,`Bip01 ${p}InnerEyebrow`,[0,i*.7*n.browHeight-i*.3*n.browArch,0]),Mt(t,`Bip01 ${p}OuterEyebrow`,[l*i*.2*n.browArch,i*.7*n.browHeight+i*.5*n.browArch,0])}Mt(t,"Bip01 MMiddleEyebrow",[0,i*.7*n.browHeight,0]);for(const[l,p]of[[1,"L"],[-1,"R"]])Mt(t,`Bip01 ${p}MouthCorner`,[l*i*.9*n.mouthWidth,0,0]),Mt(t,`Bip01 ${p}Upperlip`,[l*i*.4*n.mouthWidth,i*.3*n.lipThickness,i*.4*n.lipThickness]);Mt(t,"Bip01 MUpperLip",[0,i*.3*n.lipThickness,i*.5*n.lipThickness],[0,a*.5*n.lipThickness,a*.5*n.lipThickness]),Mt(t,"Bip01 MBottomLip",[0,-i*.3*n.lipThickness,i*.5*n.lipThickness],[0,a*.5*n.lipThickness,a*.5*n.lipThickness]);const s=Bn.head;Mt(t,"Head",[0,0,0],[s*n.headAspect,s*n.foreheadHeight,-s*.75*n.headAspect]);for(const[l,p]of Object.entries(t)){const u=l==="Bip01 MJaw"?r:i,f=l==="Bip01 MJaw"?o:a;for(let m=0;m<3;m++)p.pos[m]=Math.min(u,Math.max(-u,p.pos[m])),p.scale[m]=Math.min(f,Math.max(-f,p.scale[m]))}const c=t.Head;if(c)for(let l=0;l<3;l++)c.scale[l]=Math.min(s,Math.max(-s,c.scale[l]));return t}const ci=new mt,to=new Z;function Em(e,n){e.updateMatrixWorld(!0);const t=xm(n);for(const[i,a]of Object.entries(t)){const r=e.getObjectByName(i)??e.getObjectByName(i.replace(/ /g,"_"));if(r)if(i!=="Head"&&r.parent&&(ci.copy(r.parent.matrixWorld),ci.setPosition(0,0,0),ci.invert(),to.set(a.pos[0],a.pos[1],a.pos[2]).applyMatrix4(ci),r.position.add(to)),i==="Head"){const o=Mm(e),s=[0,0,0];s[o.x]+=a.scale[0],s[o.y]+=a.scale[1],s[o.z]+=a.scale[2],r.scale.set(r.scale.x*(1+s[0]),r.scale.y*(1+s[1]),r.scale.z*(1+s[2]))}else{const o=as(r),s=[0,0,0];s[o.x]+=a.scale[0],s[o.y]+=a.scale[1],s[o.z]+=a.scale[2],r.scale.set(r.scale.x*(1+s[0]),r.scale.y*(1+s[1]),r.scale.z*(1+s[2]))}}e.updateMatrixWorld(!0)}function as(e){e.updateWorldMatrix(!0,!1);const n=e.getWorldQuaternion(new dt).invert(),t=i=>{i.applyQuaternion(n);const a=[Math.abs(i.x),Math.abs(i.y),Math.abs(i.z)];return a.indexOf(Math.max(...a))};return{x:t(new Z(1,0,0)),y:t(new Z(0,1,0)),z:t(new Z(0,0,1))}}function Mm(e){const n=e.getObjectByName("Head");return n?as(n):{x:0,y:1,z:2}}const no=.02,Tm=(e,n,t)=>{const i=n.getAttribute("skinIndex"),a=n.getAttribute("skinWeight");let r=0,o=-1;for(let s=0;s<4;s++){const c=a.getComponent(t,s);c>o&&(o=c,r=i.getComponent(t,s))}return{name:(e[r]??"").replace(/_/g," "),weight:o}},hn=(e,n,t,i,a)=>{const r=e-i[0],o=n-i[1],s=t-i[2];return Math.exp(-(r*r+o*o+s*s)/(2*a*a))},Am=e=>e/Math.sqrt(e*e+.012*.012);function bm(e,n,t,i,a){let r=0,o=0,s=0;const c=Am(e),l=Math.abs(e),p=(x,d,h,E)=>hn(l,n,t,[x,d,h],E);let u=p(.058,-.088,-.005,.042);r+=c*u*.014*i.jawWidth,u=p(.066,-.075,-.04,.035),r+=c*u*.008*i.jawWidth,o-=u*.007*i.jawLength,u=hn(l,n,t,[0,-.12,.045],.04),o-=u*.016*i.jawLength,s+=u*.006*i.jawLength,r+=c*hn(l,n,t,[.015,-.115,.04],.03)*.007*i.jawWidth,u=p(.056,-.018,.02,.034),r+=c*u*.011*i.cheekbone,s+=u*.004*i.cheekbone,u=p(.046,-.055,.03,.038),r+=c*u*.006*i.cheekFull,s+=u*.009*i.cheekFull,u=hn(l,n,t,[0,-.032,.045],.022),o-=u*.011*i.noseLength,s+=u*.012*i.noseLength,u=p(.016,-.036,.03,.016),r+=c*u*.008*i.noseWidth,u=hn(l,n,t,[0,.005,.035],.022),s+=u*.01*i.noseBridge;const f=p(.031,0,.025,.024);r+=(l-.031)*c*.12*i.eyeSize*f,o+=n*.12*i.eyeSize*f,r+=c*p(.031,0,.025,.036)*.0065*i.eyeSpacing,u=p(.03,.03,.03,.022),s+=u*.007*i.browHeight,o+=u*.005*i.browHeight,o+=p(.035,.036,.03,.02)*.004*i.browArch,u=hn(l,n,t,[0,-.072,.045],.022),s+=u*.006*i.lipThickness,r+=c*p(.025,-.072,.035,.022)*.009*i.mouthWidth,o+=hn(l,n,t,[0,.065,.035],.045)*.014*i.foreheadHeight;const m=Math.exp(-((n+.04)**2)/(2*.11**2))*Rm(-.12,0,t);r+=e*.07*i.headAspect*m,o-=(n+.03)*.06*i.headAspect*m;const S=Math.hypot(r,o,s);if(S>no){const x=no/S;r*=x,o*=x,s*=x}return a[0]=r,a[1]=o,a[2]=s,a}function Rm(e,n,t){const i=Math.min(1,Math.max(0,(t-e)/(n-e)));return i*i*(3-2*i)}function wm(e){const n=e.getAttribute("position"),t=e.getIndex(),i=u=>`${Math.round(n.getX(u)*1e5)},${Math.round(n.getY(u)*1e5)},${Math.round(n.getZ(u)*1e5)}`,a=new Map,r=new Z,o=new Z,s=new Z,c=new Z,l=(u,f,m)=>{r.fromBufferAttribute(n,u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,m),c.crossVectors(s.clone().sub(o),r.clone().sub(o));for(const S of[u,f,m]){const x=i(S),d=a.get(x);d?d.add(c):a.set(x,c.clone())}};if(t)for(let u=0;u<t.count;u+=3)l(t.getX(u),t.getX(u+1),t.getX(u+2));else for(let u=0;u<n.count;u+=3)l(u,u+1,u+2);const p=e.getAttribute("normal");for(let u=0;u<n.count;u++){const f=a.get(i(u));!f||f.lengthSq()<1e-14||(f.normalize(),p.setXYZ(u,f.x,f.y,f.z))}p.needsUpdate=!0}function Cm(e,n,t,i,a=[]){const r=e.getAttribute("position"),o=t.eye,s=[0,0,0],c=x=>bm(x.x-o.x,x.y-o.y,x.z-o.z,i,s),l={"Bip01 LEye":{sum:new Z,n:0},"Bip01 REye":{sum:new Z,n:0}},p=new Array(r.count).fill(""),u=new Array(r.count).fill(!1);for(let x=0;x<r.count;x++){const{name:d,weight:h}=Tm(n,e,x);(d==="Neck"||d.startsWith("Spine")||d.endsWith("Shoulder"))&&(u[x]=!0),h>.5&&l[d]&&(p[x]=d,l[d].sum.add(new Z(r.getX(x),r.getY(x),r.getZ(x))),l[d].n++)}const f={};for(const[x,d]of Object.entries(l)){if(!d.n)continue;const h=d.sum.clone().multiplyScalar(1/d.n);f[x]={c:h,d:[...c(h)]}}const m=1+.07*i.eyeSize;let S=0;for(let x=0;x<r.count;x++){if(u[x])continue;const d=new Z(r.getX(x),r.getY(x),r.getZ(x));let h;const E=p[x]?f[p[x]]:void 0;if(E){const R=d.clone().sub(E.c).multiplyScalar(m-1);h=[E.d[0]+R.x,E.d[1]+R.y,E.d[2]+R.z]}else h=[...c(d)];r.setXYZ(x,d.x+h[0],d.y+h[1],d.z+h[2]),S=Math.max(S,Math.hypot(h[0],h[1],h[2]))}r.needsUpdate=!0,wm(e),e.computeBoundingSphere();for(const x of a){const d=x.getAttribute("position");for(let h=0;h<d.count;h++){const E=c({x:d.getX(h),y:d.getY(h),z:d.getZ(h)});d.setXYZ(h,d.getX(h)+E[0],d.getY(h)+E[1],d.getZ(h)+E[2])}d.needsUpdate=!0,x.computeBoundingSphere()}return S}function os(e){let n=(e^2654435769)>>>0;return()=>{n=n+1831565813>>>0;let t=n;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const Dt=e=>[e>>16&255,e>>8&255,e&255],Lm=(e,n,t)=>Math.round(e)<<16|Math.round(n)<<8|Math.round(t);function $i(e){const[n,t,i]=Dt(e);return(.2126*n+.7152*t+.0722*i)/255}function sr(e,n,t){const i=a=>{const r=(a+e*12)%12;return t-n*Math.min(t,1-t)*Math.max(-1,Math.min(r-3,9-r,1))};return Lm(i(0)*255,i(8)*255,i(4)*255)}function Pm(e,n){const[t,i,a]=cr(e);return sr(t,i,Math.min(.92,Math.max(.12,a+n)))}function cr(e){const[n,t,i]=Dt(e).map(p=>p/255),a=Math.max(n,t,i),r=Math.min(n,t,i),o=(a+r)/2,s=a-r;let c=0,l=0;return s>1e-6&&(l=s/(1-Math.abs(2*o-1)),a===n?c=(t-i)/s%6:a===t?c=(i-n)/s+2:c=(n-t)/s+4,c=(c/6+1)%1),[c,l,o]}const ym={hoodie:[7305090,4151413,8097642,9329246,12163672,5662589,10129286],tee:[14209992,8036536,13208970,9416844,14729850,10787520],cardigan:[8088144,7109258,9071196,6257258],knit:[14272942,12157791,8031390,13088936,9149306],shirtJacket:[6126230,8096346,10123866,7307151,10789017]},Im=[15789800,14341318,10467276,15254720,13162178,3095114,12169929],Um=[3753823,3096149,5924215,7170654,9142895,2829620,4869976],Dm=[1709072,2365972,3811870,4863014,2761760,5914672,1380622],Nm=[15263456,14276303,12567497,3487549,14735560],Fm=[4026293,13716042,3092275,5939322,14721072],Om=["hoodie","tee","knit","shirtJacket","hoodie","cardigan"];function Bm(e,n={},t){const i=t??n.seed??1,a=os(i*7919+(e==="male"?11:29)),r=d=>d[Math.floor(a()*d.length)%d.length],o=n.aged===!0,s=["hoodie","tee","cardigan","knit","shirtJacket"].find(d=>d===n.outfit)??(o?"cardigan":r(Om)),c=(d,h)=>{const[E,R,b]=cr(d);return sr((E+(a()-.5)*.03+1)%1,Math.min(1,Math.max(0,R*(.9+a()*.2))),Math.min(.9,Math.max(.08,b+(a()-.5)*h)))},l=d=>{const[h,E,R]=cr(d);return R<.28?sr(h,Math.min(.55,Math.max(E,.2)),.3+a()*.08):d},p=n.shirt!==void 0?c(l(n.shirt),.08):r(ym[s]);let u=r(Im);Math.abs($i(u)-$i(p))<.12&&(u=$i(p)>.55?3095114:15789800);const f=n.look,m=f?f.hairColor:o?13619154:n.hair!==void 0?c(n.hair,.04):r(Dm),S=n.skin??14727316,x=f&&f.skinTone!==0?Pm(S,f.skinTone*.17):S;return{kind:e,seed:i,outfit:s,outer:p,inner:u,trousers:n.trousers!==void 0?c(n.trousers,.08):r(Um),shoes:r(Nm),shoesAccent:r(Fm),hair:m,skin:x,beard:e==="female"?"none":f?f.facialHair??"none":o?"full":a()<.25?"stubble":"none",aged:o,browColor:f==null?void 0:f.browColor,browThickness:(f==null?void 0:f.browThickness)??.5,browShape:f==null?void 0:f.browShape,blush:(f==null?void 0:f.blush)??0,lip:(f==null?void 0:f.lip)??0,lipColor:(f==null?void 0:f.lipColor)??12607583,freckles:(f==null?void 0:f.freckles)??0,moles:(f==null?void 0:f.moles)??[],heightScale:(f==null?void 0:f.heightScale)??(o?.975:.96+a()*.08),widthScale:o?.985:.97+a()*.06}}const vi=(e,n,t)=>e>=t[0]&&e<t[2]&&n>=t[1]&&n<t[3],Hn=(e,n,t)=>t.some(i=>vi(e,n,i)),Hm={male:{jacket:[[146,0,366,190],[0,222,152,392],[362,222,512,392],[160,190,352,412]],pants:[[0,0,152,218],[360,0,512,218]],shoes:[[108,352,204,512],[328,340,410,512]],skin:[[0,424,126,512],[384,424,512,512]],inner:[[148,0,362,100],[222,186,284,314],[164,402,352,448]]},female:{jacket:[[96,0,416,256],[0,148,512,258],[150,256,352,412]],pants:[[8,276,158,458],[356,276,506,458]],shoes:[[36,448,158,512],[366,448,502,512]],skin:[[0,0,96,136],[418,0,512,136],[222,224,294,282]],inner:[[232,268,284,322]]}},Mi=(e,n,t)=>(.2126*e+.7152*n+.0722*t)/255,Ct=(e,n,t)=>Math.min(t,Math.max(n,e)),lr=(e,n,t)=>{const i=Ct((t-e)/(n-e),0,1);return i*i*(3-2*i)};function Mn(e,n,t,i,a=.45,r=1.9,o=1){const s=Mi(e[n],e[n+1],e[n+2]),c=Ct(s/i,a,r);e[n]+=(Ct(t[0]*c,0,255)-e[n])*o,e[n+1]+=(Ct(t[1]*c,0,255)-e[n+1])*o,e[n+2]+=(Ct(t[2]*c,0,255)-e[n+2])*o}function li(e,n,t){const i=Math.max(e,n,t),a=Math.min(e,n,t);return i>60&&(i-a)/Math.max(1,i)>.42}function Gm(e,n,t,i,a){const r=Hm[i.kind],o=Dt(i.outer),s=Dt(i.inner),c=Dt(i.trousers),l=Dt(i.shoes),p=Dt(i.shoesAccent),u=i.kind==="male"?.15:.13,f=i.kind==="male"?.27:.42;for(let m=0;m<t;m++)for(let S=0;S<n;S++){const x=(m*n+S)*4,d=e[x],h=e[x+1],E=e[x+2];if(!(d+h+E<24)){if(Hn(S,m,r.skin)){a&&(e[x]=Ct(d*a[0],0,255),e[x+1]=Ct(h*a[1],0,255),e[x+2]=Ct(E*a[2],0,255));continue}if(Hn(S,m,r.inner)&&li(d,h,E)){Mn(e,x,s,.45,.6,1.4);continue}if(Hn(S,m,r.shoes)){if(Mi(d,h,E)<.09&&!li(d,h,E))continue;li(d,h,E)?Mn(e,x,p,.4,.5,1.5):Mn(e,x,l,.78,.7,1.15,.7);continue}if(Hn(S,m,r.pants)){Mn(e,x,c,f,.4,2);continue}if(Hn(S,m,r.jacket)){if(Mi(d,h,E)>.38&&!li(d,h,E)&&i.kind==="male")continue;Mn(e,x,o,u,.5,2.4)}}}}const ss={male:{hairMax:.3,eyes:[196,134,322,166],brows:[190,112,330,134],beard:[140,196,380,320],cheek:[190,160,250,190]},female:{hairMax:.42,eyes:[196,134,322,166],brows:[190,112,330,134],beard:[0,0,0,0],cheek:[190,170,240,200]}};function cs(e,n,t){const i=ss[t].cheek;let a=0,r=0,o=0,s=0;for(let c=i[1];c<i[3];c++)for(let l=i[0];l<i[2];l++){const p=(c*n+l)*4;a+=e[p],r+=e[p+1],o+=e[p+2],s++}return s?[a/s,r/s,o/s]:null}function Vm(e,n){if(!n)return[1,1,1];const t=Dt(e);return[0,1,2].map(i=>Ct(.55+.45*(t[i]/Math.max(1,n[i])),.8,1.2))}function fi(e,n,t){let i=Math.imul(e*374761393+n*668265263+t*2246822519,1274126177);return i=(i^i>>>13)>>>0,(i&65535)/65535}function ji(e,n,t,i){const a=e/t,r=n/t,o=Math.floor(a),s=Math.floor(r),c=lr(0,1,a-o),l=lr(0,1,r-s),p=fi(o,s,i),u=fi(o+1,s,i),f=fi(o,s+1,i),m=fi(o+1,s+1,i);return p+(u-p)*c+(f-p)*l+(p-u-f+m)*c*l}function km(e,n,t,i,a){const r=ss[i.kind],o=Dt(i.hair),s=Dt(i.browColor??i.hair),c=i.kind==="male"?.17:.24,l=i.aged;for(let p=0;p<t;p++)for(let u=0;u<n;u++){const f=(p*n+u)*4,m=e[f],S=e[f+1],x=e[f+2];if(m+S+x<6)continue;const d=Mi(m,S,x),h=vi(u,p,r.eyes),E=vi(u,p,r.brows),R=i.kind==="male"&&vi(u,p,r.beard)&&!E,b=m>S*1.55&&m>x*1.7&&d<.4,C=R&&i.beard!=="full"?r.hairMax+.1:E?r.hairMax+.24*i.browThickness:r.hairMax,A=h||b||p>300&&u<190&&i.kind==="male"?0:1-lr(C-.14,C,d);if(A>.01){if(R&&i.beard!=="full"){const y=i.beard==="none"?.92:.6,w=[m,S,x],O=ls.get(e)??[200,150,120];for(let H=0;H<3;H++)w[H]=O[H]*(.88+.12*Ct(d/.2,0,1.4))*a[H];e[f]+=(w[0]-m)*A*y,e[f+1]+=(w[1]-S)*A*y,e[f+2]+=(w[2]-x)*A*y}else Mn(e,f,E?s:o,c,.55,l?1.25:1.6,A);continue}let P=m*a[0],v=S*a[1],T=x*a[2];if(l&&d>.3&&!b){const y=.3*P+.59*v+.11*T;P=P+(y-P)*.2,v=v+(y-v)*.2,T=T+(y-T)*.2;const w=Math.max(0,Math.sin(p*.9+ji(u,p,14,i.seed)*4))*ji(u*.4,p,9,i.seed+3),O=ji(u,p,7,i.seed+9),H=1-.07*w-.06*Math.max(0,O-.62)*3;P*=H,v*=H,T*=H*.99}e[f]=Ct(P,0,255),e[f+1]=Ct(v,0,255),e[f+2]=Ct(T,0,255)}}function zm(e,n,t){const i=os(t.seed*31+7),a=(o,s,c,l,p)=>{for(let u=Math.floor(s-c-1);u<=s+c+1;u++)for(let f=Math.floor(o-c-1);f<=o+c+1;f++){const m=Math.hypot(f-o,u-s)/c;if(m>1||f<0||u<0||f>=n||u>=n)continue;const S=l*(1-m*m),x=(u*n+f)*4;for(let d=0;d<3;d++)e[x+d]=e[x+d]*(1-S)+p[d]*S}},r=Math.round(t.freckles*140);for(let o=0;o<r;o++){const s=i()<.3,c=s?256+(i()-.5)*30:i()<.5?200+i()*46:266+i()*46,l=s?160+i()*28:168+i()*40;a(c,l,1.1+i()*1.5,.28+i()*.2,[120,74,48])}for(const[o,s]of t.moles)a(o,s,2.6,.75,[70,42,30]);if(t.browShape){const o=Dt(t.browColor??t.hair),s=t.browShape==="arched"?7:t.browShape==="soft"?3.5:.8,c=1.6+3.4*t.browThickness;for(const l of[!1,!0])for(let p=0;p<=40;p++){const u=p/40,f=198+52*u,m=131-s*Math.sin(Math.PI*Math.min(1,u*1.25))+3*u,S=c*(.45+.55*Math.sin(Math.PI*Math.min(1,.25+u*.9)));a(l?511-f:f,m,S,.7,[o[0]*.8,o[1]*.8,o[2]*.8])}}if(t.blush>0)for(const o of[212,300])a(o,186,26,.2*t.blush,[226,120,118]);if(t.lip>0){const o=Dt(t.lipColor);for(let s=200;s<=216;s++)for(let c=232;c<=280;c++){const l=((c-256)/21)**2+((s-208)/6)**2;if(l>1)continue;const p=(s*n+c)*4,u=.5*t.lip*(1-l);for(let f=0;f<3;f++)e[p+f]=e[p+f]*(1-u)+o[f]*u}}}const ls=new WeakMap;function Wm(e,n,t){const i=cs(e,n,t);return i&&ls.set(e,i),i}function Xm(e){const t=new DataView(e).getUint32(12,!0),i=JSON.parse(new TextDecoder().decode(new Uint8Array(e,20,t))),a=20+t+8;return(i.images??[]).flatMap(r=>{if(r.bufferView===void 0)return[];const o=i.bufferViews[r.bufferView];return[{name:r.name??"",mime:r.mimeType??"image/png",bytes:new Uint8Array(e,a+(o.byteOffset??0),o.byteLength)}]})}const Er={},fs={};let io;async function ro(e,n){var r;if(typeof createImageBitmap!="function"||typeof document>"u")return;const t=await createImageBitmap(new Blob([e],{type:n}),{premultiplyAlpha:"none",colorSpaceConversion:"none"}),i=document.createElement("canvas");i.width=t.width,i.height=t.height;const a=i.getContext("2d",{willReadFrequently:!0});if(a)return a.drawImage(t,0,0),(r=t.close)==null||r.call(t),a.getImageData(0,0,i.width,i.height)}function fr(e,n,t){Er[e]=n,t&&(fs[e]=t)}function Km(){return io??(io=Promise.all(["male","female"].map(async e=>{const n=`./models/humans/${e}.glb`,t=await(await fetch(n)).arrayBuffer(),i=await new Yo().parseAsync(t,n.slice(0,n.lastIndexOf("/")+1));i.scene.traverse(a=>{const r=a;if(r.isMesh)for(const o of Array.isArray(r.material)?r.material:[r.material])for(const s of Object.values(o))s instanceof Jn&&(s.userData.shared=!0)}),fr(e,i.scene);try{const a=Xm(t),r=l=>a.find(p=>p.name.endsWith(l)),o=r("body_color"),s=r("head_color"),c=s?await ro(s.bytes,s.mime):void 0;fr(e,i.scene,{body:o?await ro(o.bytes,o.mime):void 0,head:c,skin:c?cs(c.data,c.width,e)??void 0:void 0})}catch(a){console.warn("[characters] Appearance textures unavailable; using the base outfit",a)}})).then(()=>{}).catch(e=>{io=void 0,console.warn("[characters] Local human model unavailable; keeping fallback",e)}))}async function qm(e=Object.values(or)){const[,n]=await Promise.all([Km(),Kh(e)]);for(const t of n)(t.status==="failed"||t.status==="invalid")&&console.warn(`[characters] ${t.path}: ${t.message}; using fallback`)}function Ym(e="male",n){return!!es(n)||!!Er[e]}const ao=new dt,oo=new dt;function ur(e,n,t,i){return ao.setFromEuler(t),oo.copy(n).invert(),i.copy(e).multiply(oo).multiply(ao).multiply(n).normalize()}function so(e,n,t){if(typeof document>"u")return;const i=document.createElement("canvas");i.width=n.width,i.height=n.height;const a=i.getContext("2d");if(!a)return;const r=new ImageData(new Uint8ClampedArray(n.data),n.width,n.height);t(r.data),a.putImageData(r,0,0);const o=new ol(i);return o.colorSpace=ln,o.flipY=!1,e&&(o.wrapS=e.wrapS,o.wrapT=e.wrapT,o.anisotropy=e.anisotropy,o.channel=e.channel),o}function $m(e,n,t="male",i={}){const a=es(i.model),r=a??Er[t];if(!r)return;const o=Bm(t,i,i.seed),s=[],c=a?void 0:fs[t],l=Ko(r);l.name="human-visual";const p=new Map,u=e.userData.ownedMaterials,f=[];l.traverse(L=>{const W=L;if(!W.isMesh)return;W.geometry=W.geometry.clone();const j=se=>{let le=p.get(se);if(!le){le=se.clone();const re=le;if(a||(re.roughness=.8,re.metalness=0),se.name.endsWith("_body")&&(c!=null&&c.body)){const Re=so(re.map,c.body,Ne=>Gm(Ne,c.body.width,c.body.height,o,co(c,o)));Re&&(re.map=Re,s.push(Re))}else if(se.name.endsWith("_head")&&(c!=null&&c.head)){const Re=co(c,o),Ne=so(re.map,c.head,we=>{Wm(we,c.head.width,t),km(we,c.head.width,c.head.height,o,Re),zm(we,c.head.width,o)});Ne&&(re.map=Ne,s.push(Ne))}else!a&&se.name.endsWith("_opacity")&&(re.color=new ze(o.hair));p.set(se,le),u==null||u.add(le)}return le};W.material=Array.isArray(W.material)?W.material.map(j):j(W.material),W.castShadow=W.receiveShadow=!0,W.frustumCulled=!1,W.morphTargetDictionary&&f.push(W)});const m=i.look,S=[];l.traverse(L=>{L.isSkinnedMesh&&S.push(L)});const x=(L,W)=>(Array.isArray(L.material)?L.material:[L.material]).some(j=>j.name.endsWith(W)),d=a?void 0:S.find(L=>x(L,"_head")),h=a?void 0:S.find(L=>x(L,"_opacity")),E=a?void 0:S.find(L=>x(L,"_body")),R=d?d.skeleton.bones.map(L=>L.name):[];let b=d?Qa(d.geometry,R):null;if(!a&&m){const L=m.aged?Sm(m.face):m.face;Em(l,L),d&&b&&(Cm(d.geometry,R,b,L,h?[h.geometry]:[]),b=Qa(d.geometry,R)??b)}if(!a&&m&&d&&b&&(nm(d.geometry,d.skeleton.bones.map(L=>L.name),b),h&&im(h.geometry,b)===0&&(h.visible=!1)),l.updateMatrixWorld(!0),!a){const L=new vr().setFromObject(l),j=1.8/(L.max.y-L.min.y);l.scale.set(j*o.widthScale,j*o.heightScale,j*o.widthScale),l.position.y-=L.min.y*j*o.heightScale}const C=l.position.y;l.updateMatrixWorld(!0);const A=[];l.traverse(L=>{L!==l&&A.push({node:L,q:L.quaternion.clone(),p:L.position.clone()})});const P=()=>{for(const L of A)L.node.quaternion.copy(L.q),L.node.position.copy(L.p);l.position.y=C,l.updateMatrixWorld(!0)};let v,T;if(!a&&m&&d&&E&&b){const L=pm(m.hairColor);u==null||u.add(L),v=hm(m.hairStyle,b,d,L,i.seed??1)??void 0,v&&l.add(v.mesh),T=Jh({ids:m.accessories??[],lm:b,headMesh:d,bodyMesh:E,color:m.accessoryColor});for(const W of T.meshes)l.add(W);for(const W of T.materials)u==null||u.add(W);l.updateMatrixWorld(!0)}const y=["Spine","Head","LeftArm","RightArm","LeftForeArm","RightForeArm","LeftUpLeg","RightUpLeg","LeftLeg","RightLeg","LeftFoot","RightFoot"],w=[n.body,n.head,n.leftArm,n.rightArm,n.leftElbow,n.rightElbow,n.leftHip,n.rightHip,n.leftKnee,n.rightKnee,n.leftAnkle,n.rightAnkle],O=y.map((L,W)=>{const j=l.getObjectByName(L);return j?{bone:j,source:w[W],restLocal:j.quaternion.clone(),restWorld:j.getWorldQuaternion(new dt)}:void 0}).filter(L=>L!==void 0);e.traverse(L=>{if(L.isLight&&(L.visible=!1),L.isMesh&&!L.userData.isFootRing){let W=L;for(;W&&W!==e&&!W.userData.personDynamicAccessory;)W=W.parent;W!=null&&W.userData.personDynamicAccessory||(L.visible=!1)}}),e.add(l);for(const L of n.props??[]){const W=l.getObjectByName(L.hand);if(!W)continue;const j=new hi,se=e.getWorldQuaternion(new dt);j.quaternion.copy(W.getWorldQuaternion(new dt).invert().multiply(se)),j.scale.copy(e.getWorldScale(new Z)).divide(W.getWorldScale(new Z)),W.add(j),j.add(L.object)}const H=[];l.traverse(L=>{/^(Left|Right)Hand(Index|Middle|Ring|Pinky)[123]$/.test(L.name)&&H.push({bone:L,local:L.quaternion.clone(),world:e.getWorldQuaternion(new dt).invert().multiply(L.getWorldQuaternion(new dt)),sign:L.name.startsWith("Left")?-1:1})});const G=new al,U=(L,W)=>{var j;for(const se of f){const le=(j=se.morphTargetDictionary)==null?void 0:j[L];le!==void 0&&se.morphTargetInfluences&&(se.morphTargetInfluences[le]=No.clamp(W,0,1))}},F=()=>{var j,se;l.position.y=C+n.body.position.y-n.bodyRestY;for(const le of O)G.copy(le.source.rotation),ur(le.restLocal,le.restWorld,G,le.bone.quaternion);for(const le of H)G.set(0,0,le.sign*(((j=n.grip)==null?void 0:j.call(n))??0)),ur(le.local,le.world,G,le.bone.quaternion);U("eyeBlinkLeft",n.blinkLeft()),U("eyeBlinkRight",n.blinkRight()),U("jawOpen",n.mouthOpen()),U("mouthSmileLeft",n.smile()),U("mouthSmileRight",n.smile());const L=n.gazeX(),W=n.gazeY();U("eyeLookInLeft",Math.max(0,L)),U("eyeLookOutRight",Math.max(0,L)),U("eyeLookOutLeft",Math.max(0,-L)),U("eyeLookInRight",Math.max(0,-L)),U("eyeLookUpLeft",Math.max(0,W)),U("eyeLookUpRight",Math.max(0,W)),U("eyeLookDownLeft",Math.max(0,-W)),U("eyeLookDownRight",Math.max(0,-W)),U("browInnerUp",((se=n.browLift)==null?void 0:se.call(n))??.08),U("eyeSquintLeft",n.smile()*.18),U("eyeSquintRight",n.smile()*.18)};return e.userData.updateHumanVisual=F,e.userData.humanModel=t,e.userData.characterModel=a?i.model:void 0,e.userData.humanVisual={visual:l,faces:f,kind:t,sourceModel:a?i.model:void 0,appearance:o,ownedTextures:s,recolored:s.length>0,baseY:C,restoreRest:P,hair:v,accessories:T},F(),F}function co(e,n){return Vm(n.skin,e.skin??null)}const n_=Object.freeze(Object.defineProperty({__proto__:null,attachHumanVisual:$m,hasHumanModel:Ym,loadHumanModels:qm,registerHumanModel:fr,retargetRotation:ur},Symbol.toStringTag,{value:"Module"}));export{e_ as F,Yo as G,or as H,Ea as P,_i as S,de as U,Qm as W,Ei as a,ja as b,t_ as c,Ue as d,$m as e,vm as f,n_ as g,Ym as h,qm as l,Jm as m};
