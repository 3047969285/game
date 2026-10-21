var ci=Object.defineProperty;var hi=(o,t,e)=>t in o?ci(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var I=(o,t,e)=>hi(o,typeof t!="symbol"?t+"":t,e);import{d as Rs,a as Xt,m as He,P as ui,e as la}from"./humanVisual-DXw9OOKD.js";import{c as K,ax as wt,aq as fi,aE as Nt,j as xo,V as C,M as st,ap as di,o as $,e as ca,a2 as ut,f as at,F as mi,H as So,U as ko,N as To,J as me,L as je,K as Jo,b as ct,S as ts,C as ha,aF as ze,D as mt,aT as qe,r as G,aU as Cs,aB as pi,aC as gi,aV as vi,a as Ot,au as gt,g as Rt,_ as es,i as xt,P as At,G as vt,Q as Ie,E as os,s as Yt,R as ua,l as Qe,n as fa,aW as xi,aX as da,a1 as wi,I as ma,aY as Mi,aZ as zt,a_ as Wt,a$ as yt,b0 as yi,$ as bi,d as wo,b1 as Ls,b2 as Si,b3 as Lt,b4 as pa,b5 as Ge,b6 as tn,b7 as en,ay as fs,b8 as ki,b9 as Ti,ba as Ai,bb as _i,bc as Pi,bd as Di,be as Ri,ae as Ci,bf as Ei,bg as Ni,bh as _o,bi as on,bj as sn,bk as zi,bl as Ii,bm as Fi,bn as Li,ab as Po,a9 as Ui,W as ke,X as Fe,aA as Do,az as ga,Y as ss,Z as ns,a3 as Es,T as Dt,u as nn,bo as Oi,a6 as Bi,bp as Gi,bq as Wi,a8 as Mo,br as Vi,bs as Hi,bt as ji,bu as $i,bv as Xi,a5 as Yi}from"./index-DQr5rjn9.js";class as extends K{constructor(){const t=as.SkyShader,e=new wt({name:t.name,uniforms:Nt.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:fi,depthWrite:!1});super(new xo(1,1,1),e),this.isSky=!0}}as.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new C},up:{value:new C(0,1,0)},cloudScale:{value:2e-4},cloudSpeed:{value:1e-4},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},time:{value:0}},vertexShader:`
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

		}`};const ds=new st;class is{constructor(t){t=t||{},this.zNear=t.webGL===!0?-1:0,this.vertices={near:[new C,new C,new C,new C],far:[new C,new C,new C,new C]},t.projectionMatrix!==void 0&&this.setFromProjectionMatrix(t.projectionMatrix,t.maxFar||1e4)}setFromProjectionMatrix(t,e){const s=this.zNear,n=t.elements[11]===0;return ds.copy(t).invert(),this.vertices.near[0].set(1,1,s),this.vertices.near[1].set(1,-1,s),this.vertices.near[2].set(-1,-1,s),this.vertices.near[3].set(-1,1,s),this.vertices.near.forEach(function(a){a.applyMatrix4(ds)}),this.vertices.far[0].set(1,1,1),this.vertices.far[1].set(1,-1,1),this.vertices.far[2].set(-1,-1,1),this.vertices.far[3].set(-1,1,1),this.vertices.far.forEach(function(a){a.applyMatrix4(ds);const i=Math.abs(a.z);n?a.z*=Math.min(e/i,1):a.multiplyScalar(Math.min(e/i,1))}),this.vertices}split(t,e){for(;t.length>e.length;)e.push(new is);e.length=t.length;for(let s=0;s<t.length;s++){const n=e[s];if(s===0)for(let a=0;a<4;a++)n.vertices.near[a].copy(this.vertices.near[a]);else for(let a=0;a<4;a++)n.vertices.near[a].lerpVectors(this.vertices.near[a],this.vertices.far[a],t[s-1]);if(s===t.length-1)for(let a=0;a<4;a++)n.vertices.far[a].copy(this.vertices.far[a]);else for(let a=0;a<4;a++)n.vertices.far[a].lerpVectors(this.vertices.near[a],this.vertices.far[a],t[s])}}toSpace(t,e){for(let s=0;s<4;s++)e.vertices.near[s].copy(this.vertices.near[s]).applyMatrix4(t),e.vertices.far[s].copy(this.vertices.far[s]).applyMatrix4(t)}}const an={lights_fragment_begin:`
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
	`+Rs.lights_pars_begin},rn=new st,ms=new is({webGL:!0}),re=new C,Ki=new C,lo=new ca,ps=[],gs=[],vs=new st,ln=new st,Zi=new C(0,1,0);class qi{constructor(t){this.camera=t.camera,this.parent=t.parent,this.cascades=t.cascades||3,this.maxFar=t.maxFar||1e5,this.mode=t.mode||"practical",this.shadowMapSize=t.shadowMapSize||2048,this.shadowBias=t.shadowBias||1e-6,this.lightDirection=t.lightDirection||new C(1,-1,1).normalize(),this.lightIntensity=t.lightIntensity||3,this.lightNear=t.lightNear||1,this.lightFar=t.lightFar||2e3,this.lightMargin=t.lightMargin||200,this.customSplitsCallback=t.customSplitsCallback,this.fade=!1,this.mainFrustum=new is({webGL:!0}),this.frustums=[],this.breaks=[],this.lights=[],this.shaders=new Map,this._createLights(),this.updateFrustums(),this._injectInclude()}_createLights(){for(let t=0;t<this.cascades;t++){const e=new di(16777215,this.lightIntensity);e.castShadow=!0,e.shadow.mapSize.width=this.shadowMapSize,e.shadow.mapSize.height=this.shadowMapSize,e.shadow.camera.near=this.lightNear,e.shadow.camera.far=this.lightFar,e.shadow.bias=this.shadowBias,this.parent.add(e),this.parent.add(e.target),this.lights.push(e)}}_initCascades(){const t=this.camera;t.updateProjectionMatrix(),this.mainFrustum.setFromProjectionMatrix(t.projectionMatrix,this.maxFar),this.mainFrustum.split(this.breaks,this.frustums)}_updateShadowBounds(){const t=this.frustums;for(let e=0;e<t.length;e++){const n=this.lights[e].shadow.camera,a=this.frustums[e],i=a.vertices.near,r=a.vertices.far,l=r[0];let c;l.distanceTo(r[2])>l.distanceTo(i[2])?c=r[2]:c=i[2];let h=l.distanceTo(c);if(this.fade){const d=this.camera,m=Math.max(d.far,this.maxFar),p=a.vertices.far[0].z/(m-d.near),u=.25*Math.pow(p,2)*(m-d.near);h+=u}n.left=-h/2,n.right=h/2,n.top=h/2,n.bottom=-h/2,n.updateProjectionMatrix()}}_getBreaks(){const t=this.camera,e=Math.min(t.far,this.maxFar);switch(this.breaks.length=0,this.mode){case"uniform":s(this.cascades,t.near,e,this.breaks);break;case"logarithmic":n(this.cascades,t.near,e,this.breaks);break;case"practical":a(this.cascades,t.near,e,.5,this.breaks);break;case"custom":this.customSplitsCallback===void 0&&console.error("CSM: Custom split scheme callback not defined."),this.customSplitsCallback(this.cascades,t.near,e,this.breaks);break}function s(i,r,l,c){for(let h=1;h<i;h++)c.push((r+(l-r)*h/i)/l);c.push(1)}function n(i,r,l,c){for(let h=1;h<i;h++)c.push(r*(l/r)**(h/i)/l);c.push(1)}function a(i,r,l,c,h){ps.length=0,gs.length=0,n(i,r,l,gs),s(i,r,l,ps);for(let d=1;d<i;d++)h.push($.lerp(ps[d-1],gs[d-1],c));h.push(1)}}update(){const t=this.camera,e=this.frustums;vs.lookAt(Ki,this.lightDirection,Zi),ln.copy(vs).invert();for(let s=0;s<e.length;s++){const n=this.lights[s],a=n.shadow.camera,i=(a.right-a.left)/this.shadowMapSize,r=(a.top-a.bottom)/this.shadowMapSize;rn.multiplyMatrices(ln,t.matrixWorld),e[s].toSpace(rn,ms);const l=ms.vertices.near,c=ms.vertices.far;lo.makeEmpty();for(let h=0;h<4;h++)lo.expandByPoint(l[h]),lo.expandByPoint(c[h]);lo.getCenter(re),re.z=lo.max.z+this.lightMargin,re.x=Math.floor(re.x/i)*i,re.y=Math.floor(re.y/r)*r,re.applyMatrix4(vs),n.position.copy(re),n.target.position.copy(re),n.target.position.x+=this.lightDirection.x,n.target.position.y+=this.lightDirection.y,n.target.position.z+=this.lightDirection.z}}_injectInclude(){Rs.lights_fragment_begin=an.lights_fragment_begin,Rs.lights_pars_begin=an.lights_pars_begin}setupMaterial(t){t.defines=t.defines||{},t.defines.USE_CSM=1,t.defines.CSM_CASCADES=this.cascades,this.fade&&(t.defines.CSM_FADE="");const e=[],s=this,n=this.shaders;t.onBeforeCompile=function(a){const i=Math.min(s.camera.far,s.maxFar);s._getExtendedBreaks(e),a.uniforms.CSM_cascades={value:e},a.uniforms.cameraNear={value:s.camera.near},a.uniforms.shadowFar={value:i},n.set(t,a)},n.set(t,null)}_updateUniforms(){const t=Math.min(this.camera.far,this.maxFar);this.shaders.forEach(function(s,n){if(s!==null){const a=s.uniforms;this._getExtendedBreaks(a.CSM_cascades.value),a.cameraNear.value=this.camera.near,a.shadowFar.value=t}!this.fade&&"CSM_FADE"in n.defines?(delete n.defines.CSM_FADE,n.needsUpdate=!0):this.fade&&!("CSM_FADE"in n.defines)&&(n.defines.CSM_FADE="",n.needsUpdate=!0)},this)}_getExtendedBreaks(t){for(;t.length<this.breaks.length;)t.push(new ut);t.length=this.breaks.length;for(let e=0;e<this.cascades;e++){const s=this.breaks[e],n=this.breaks[e-1]||0;t[e].x=n,t[e].y=s}}updateFrustums(){this._getBreaks(),this._initCascades(),this._updateShadowBounds(),this._updateUniforms()}remove(){for(let t=0;t<this.lights.length;t++)this.parent.remove(this.lights[t].target),this.parent.remove(this.lights[t])}dispose(){const t=this.shaders;t.forEach(function(e,s){delete s.onBeforeCompile,delete s.defines.USE_CSM,delete s.defines.CSM_CASCADES,delete s.defines.CSM_FADE,e!==null&&(delete e.uniforms.CSM_cascades,delete e.uniforms.cameraNear,delete e.uniforms.shadowFar),s.needsUpdate=!0}),t.clear()}}function va(o,t=31.2,e=172){const s=$.degToRad($.clamp(t,-89,89)),n=$.degToRad(23.44)*Math.sin(2*Math.PI*(284+e)/365),a=((o%24+24)%24-12)*Math.PI/12;return new C(-Math.cos(n)*Math.sin(a),Math.sin(s)*Math.sin(n)+Math.cos(s)*Math.cos(n)*Math.cos(a),Math.sin(s)*Math.cos(n)*Math.cos(a)-Math.cos(s)*Math.sin(n)).normalize()}function Qi(o,t,e){const s=$.clamp(.22/Math.max(.01,t),.72,1.35);return $.lerp(o,s,1-Math.exp(-Math.max(0,Math.min(e,.1))/(s<o?.9:2.4)))}function Ji(o){const t=new as;t.name="physical-rayleigh-mie-sky",t.material.fragmentShader=t.material.fragmentShader.replace("vec4( texColor, 1.0 )","vec4( texColor * 0.16, 1.0 )"),t.scale.setScalar(o),t.frustumCulled=!1;const e=t.material.uniforms;return e.turbidity.value=2.5,e.rayleigh.value=1.25,e.mieCoefficient.value=.004,e.mieDirectionalG.value=.78,e.sunPosition.value.copy(va(14)).multiplyScalar(45e4),e.cloudScale.value=.0015,e.cloudCoverage.value=.25,e.cloudDensity.value=.55,t}class vc{constructor(t,e,s){I(this,"csm");I(this,"known",new WeakSet);I(this,"scanned",0);I(this,"projection","");this.scene=t,this.camera=e,this.csm=new qi({camera:e,parent:t,cascades:s==="high"?3:2,mode:"practical",maxFar:s==="high"?150:90,shadowMapSize:s==="high"?2048:1024,lightDirection:va(14).negate(),lightIntensity:1,lightNear:.1,lightFar:650,shadowBias:-5e-5,lightMargin:160}),this.csm.fade=!0;for(const n of this.csm.lights)n.shadow.normalBias=.018,n.shadow.radius=2}update(t,e){this.scanned++%30===0&&this.scene.traverse(n=>{const a=n;if(a.isMesh)for(const i of Array.isArray(a.material)?a.material:[a.material]){if(!(i instanceof at)||this.known.has(i))continue;this.known.add(i);const r=i.onBeforeCompile,l=i.customProgramCacheKey.bind(i);this.csm.setupMaterial(i);const c=i.onBeforeCompile;i.onBeforeCompile=function(h,d){c.call(this,h,d),r.call(this,h,d)},i.customProgramCacheKey=()=>`${l()}|world-csm-${this.csm.cascades}`,i.needsUpdate=!0,i.addEventListener("dispose",()=>this.csm.shaders.delete(i))}});const s=`${this.camera.aspect}/${this.camera.fov}/${this.camera.far}`;s!==this.projection&&(this.projection=s,this.csm.updateFrustums()),this.csm.lightDirection.copy(e).negate();for(const n of this.csm.lights)n.color.copy(t.color),n.intensity=t.intensity;t.visible=!1,this.camera.updateMatrixWorld(),this.csm.update()}dispose(){this.csm.remove(),this.csm.dispose()}}const co=new C;function Vt(o,t,e,s,n,a){const i=2*Math.PI*n/4,r=Math.max(a-2*n,0),l=Math.PI/4;co.copy(t),co[s]=0,co.normalize();const c=.5*i/(i+r),h=1-co.angleTo(o)/l;return Math.sign(co[e])===1?h*c:r/(i+r)+c+c*(1-h)}class Se extends xo{constructor(t=1,e=1,s=1,n=2,a=.1){const i=n*2+1;if(a=Math.min(t/2,e/2,s/2,a),super(1,1,1,i,i,i),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:s,segments:n,radius:a},i===1)return;const r=this.toNonIndexed();this.index=null,this.attributes.position=r.attributes.position,this.attributes.normal=r.attributes.normal,this.attributes.uv=r.attributes.uv;const l=new C,c=new C,h=new C(t,e,s).divideScalar(2).subScalar(a),d=this.attributes.position.array,m=this.attributes.normal.array,p=this.attributes.uv.array,u=d.length/6,v=new C,x=.5/i;for(let M=0,f=0;M<d.length;M+=3,f+=2)switch(l.fromArray(d,M),c.copy(l),c.x-=Math.sign(c.x)*x,c.y-=Math.sign(c.y)*x,c.z-=Math.sign(c.z)*x,c.normalize(),d[M+0]=h.x*Math.sign(l.x)+c.x*a,d[M+1]=h.y*Math.sign(l.y)+c.y*a,d[M+2]=h.z*Math.sign(l.z)+c.z*a,m[M+0]=c.x,m[M+1]=c.y,m[M+2]=c.z,Math.floor(M/u)){case 0:v.set(1,0,0),p[f+0]=Vt(v,c,"z","y",a,s),p[f+1]=1-Vt(v,c,"y","z",a,e);break;case 1:v.set(-1,0,0),p[f+0]=1-Vt(v,c,"z","y",a,s),p[f+1]=1-Vt(v,c,"y","z",a,e);break;case 2:v.set(0,1,0),p[f+0]=1-Vt(v,c,"x","z",a,t),p[f+1]=Vt(v,c,"z","x",a,s);break;case 3:v.set(0,-1,0),p[f+0]=1-Vt(v,c,"x","z",a,t),p[f+1]=1-Vt(v,c,"z","x",a,s);break;case 4:v.set(0,0,1),p[f+0]=1-Vt(v,c,"x","y",a,t),p[f+1]=1-Vt(v,c,"y","x",a,e);break;case 5:v.set(0,0,-1),p[f+0]=Vt(v,c,"x","y",a,t),p[f+1]=1-Vt(v,c,"y","x",a,e);break}}static fromJSON(t){return new Se(t.width,t.height,t.depth,t.segments,t.radius)}}const Us=["masonry","brick","plaster","paving","wood","tiles","metal","concrete"],t0={masonry:2.4,brick:1.2,plaster:1.6,paving:1.8,wood:1.6,tiles:1.2,metal:1,concrete:2};function xa(o){return Us.indexOf(o)}const wa=.65,Ma=.87,ya=.66;function e0(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const ft=(o,t,e)=>{const s=(e-o)/(t-o);return s<=0?0:s>=1?1:s*s*(3-2*s)},$t=(o,t,e)=>o+(t-o)*e,o0=o=>o<0?0:o>1?1:o;function J(o,t,e,s,n,a=.5){const i=new Float32Array(o*o);let r=1,l=0;const c=new Int32Array(o),h=new Int32Array(o),d=new Float32Array(o);for(let p=0;p<n;p++){const u=e<<p,v=s<<p;if(u>o/2||v>o/2)break;const x=new Float32Array(u*v);for(let f=0;f<x.length;f++)x[f]=t();for(let f=0;f<o;f++){const g=f*u/o,w=Math.floor(g),y=g-w;c[f]=w%u,h[f]=(w+1)%u,d[f]=y*y*(3-2*y)}const M=new Float32Array(u);for(let f=0;f<o;f++){const g=f*v/o,w=Math.floor(g),y=g-w,S=y*y*(3-2*y),k=w%v*u,b=(w+1)%v*u;for(let A=0;A<u;A++)M[A]=x[k+A]+(x[b+A]-x[k+A])*S;const T=f*o;for(let A=0;A<o;A++){const _=M[c[A]];i[T+A]+=r*(_+(M[h[A]]-_)*d[A])}}l+=r,r*=a}if(l===0)throw new Error("noiseField: cells exceed size");const m=1/l;for(let p=0;p<i.length;p++)i[p]*=m;return i}function s0(o){const t=o*o;return{S:o,mask:o-1,s:o/512,H:new Float32Array(t),R:new Float32Array(t).fill(1),G:new Float32Array(t).fill(1),B:new Float32Array(t).fill(1),F:new Float32Array(t).fill(ya),A:new Float32Array(t).fill(1)}}function cn(o,t,e,s,n){const a=o-1,i=Math.ceil(s),r=Math.round(t),l=Math.round(e);for(let c=-i;c<=i;c++)for(let h=-i;h<=i;h++){const d=Math.sqrt(h*h+c*c)/s;d>=1||n((l+c&a)*o+(r+h&a),1-d)}}function Os(o,t,e){const s=o-1,n=o/512,a=new Int32Array(e.rows+1);{const w=[];let y=0;for(let k=0;k<e.rows;k++){const b=1+(t()-.5)*2*e.rowJitter;w.push(b),y+=b}let S=0;for(let k=0;k<e.rows;k++)a[k]=Math.round(S/y*o),S+=w[k];a[e.rows]=o}const i=new Int16Array(o);for(let w=0;w<e.rows;w++)for(let y=a[w];y<a[w+1];y++)i[y]=w;const r=[],l=new Int32Array(e.rows),c=new Int32Array(e.rows+1),h=new Uint16Array(e.rows*o);let d=0;for(let w=0;w<e.rows;w++){const y=Math.max(1,e.perRow+(e.perRowVar?(t()*3|0)-1:0)),S=[];let k=0;for(let A=0;A<y;A++){const _=1+(t()-.5)*2*e.widthJitter;S.push(_),k+=_}const b=new Int32Array(y+1);let T=0;for(let A=0;A<y;A++)b[A]=Math.round(T/k*o),T+=S[A];b[y]=o,r.push(b),l[w]=e.offset==="random"?Math.floor(t()*o):e.offset==="half"?(w&1)*Math.round(o/y/2):0;for(let A=0;A<y;A++)for(let _=b[A];_<b[A+1];_++)h[w*o+_]=A;c[w]=d,d+=y}c[e.rows]=d;const m=J(o,t,6,6,3),p=e.warp*n*2.6,u=o/3|0,v=o/5|0,x=new Float32Array(o*o),M=new Int32Array(o*o),f=new Float32Array(o*o),g=new Float32Array(o*o);for(let w=0;w<o;w++)for(let y=0;y<o;y++){const S=w*o+y,k=(y+(m[S]-.5)*p|0)&s,b=(w+(m[(w+u&s)*o+(y+v&s)]-.5)*p|0)&s,T=i[b],A=k-l[T]&s,_=h[T*o+A],P=r[T],D=P[_],R=P[_+1],N=a[T],z=a[T+1],F=Math.min(A-D,R-1-A,b-N,z-1-b)+.5;x[S]=F,M[S]=c[T]+_,f[S]=(A-D+.5)/(R-D),g[S]=(b-N+.5)/(z-N)}return{d:x,id:M,fu:f,fv:g,total:d}}function n0(o,t){const e=o.S,s=o.s,n=Os(e,t,{rows:6,rowJitter:.3,perRow:3,perRowVar:!0,widthJitter:.45,offset:"random",warp:4.5}),a=J(e,t,3,3,3),i=J(e,t,10,10,3),r=J(e,t,e/4,e/4,2),l=J(e,t,4,4,3),c=new Float32Array(n.total),h=new Float32Array(n.total),d=new Float32Array(n.total),m=new Float32Array(n.total*2);for(let u=0;u<n.total;u++)c[u]=(.78+t()*.42)*(t()<.1?.8:1),h[u]=.5+t()*.3,d[u]=(t()-.5)*.1,m[u*2]=(t()-.5)*.16,m[u*2+1]=(t()-.5)*.16;const p=Math.max(2,5*s);for(let u=0;u<e*e;u++){const v=n.d[u],x=n.id[u],M=n.fu[u],f=n.fv[u],g=ft(p*.55,p*.55+8*s,v),w=1-ft(p*.45,p*1.25,v),y=Math.sin(Math.PI*M)*Math.sin(Math.PI*f),S=h[x]*(.82+.26*a[u])+y*.1+(M-.5)*m[x*2]+(f-.5)*m[x*2+1]+(i[u]-.5)*.16+(r[u]-.5)*.08;o.H[u]=$t(.04+(r[u]-.5)*.05,S,g);let k=c[x]*(.88+.28*i[u])*(.9+.2*l[u])*(.84+.16*ft(p,p+12*s,v));k*=.94+.12*r[u];const b=1.04*(.82+.34*r[u]);k=$t(k,b,w);const T=d[x]*(1-w);o.R[u]=k*(1+T+w*.03),o.G[u]=k*(1+T*.3),o.B[u]=k*(1-T*.9-w*.07),o.F[u]=$t(.6+(i[u]-.5)*.3,.95,w),o.A[u]=1-w*.35}}function a0(o,t){const e=o.S,s=o.s,n=Os(e,t,{rows:16,rowJitter:0,perRow:6,perRowVar:!1,widthJitter:0,offset:"half",warp:.8}),a=J(e,t,8,8,3),i=J(e,t,e/4,e/4,2),r=J(e,t,5,5,3),l=new Float32Array(n.total),c=new Float32Array(n.total),h=new Float32Array(n.total);for(let m=0;m<n.total;m++)l[m]=(.82+t()*.3)*(t()<.08?.72:1)*(t()<.05?1.12:1),c[m]=t()-.5,h[m]=.76+t()*.12;const d=Math.max(2,4*s);for(let m=0;m<e*e;m++){const p=n.d[m],u=n.id[m],v=ft(d*.5,d+2.6*s,p),x=1-ft(d*.4,d*1.15,p),M=(i[m]-.5)*.07;o.H[m]=$t(.06+M*.4,h[u]+M+(a[m]-.5)*.06,v);let f=l[u]*(.9+.2*a[m])*(.92+.16*i[m])*(.94+.12*r[m]);f*=.9+.1*ft(d,d+6*s,p);const g=1.3*(.84+.32*i[m]);f=$t(f,g,x);const w=c[u]*(1-x);o.R[m]=f*(1+w*.16+x*.04),o.G[m]=f*(1-w*.04+x*.14),o.B[m]=f*(1-w*.3+x*.2),o.F[m]=$t(.74+(i[m]-.5)*.2,.96,x),o.A[m]=1-x*.4}}function i0(o,t){const e=o.S,s=o.s,n=Os(e,t,{rows:3,rowJitter:.04,perRow:3,perRowVar:!1,widthJitter:.05,offset:"random",warp:1.6}),a=J(e,t,3,3,3),i=J(e,t,12,12,3),r=J(e,t,e/4,e/4,2),l=J(e,t,5,5,4),c=new Float32Array(n.total),h=new Float32Array(n.total),d=new Float32Array(n.total),m=new Float32Array(n.total*2);for(let u=0;u<n.total;u++)c[u]=.86+t()*.26,h[u]=(t()-.5)*.08,d[u]=.62+t()*.16,m[u*2]=(t()-.5)*.1,m[u*2+1]=(t()-.5)*.1;const p=Math.max(2,4.5*s);for(let u=0;u<e*e;u++){const v=n.d[u],x=n.id[u],M=ft(p*.5,p+4*s,v),f=1-ft(p*.4,p*1.2,v),g=l[u],w=d[x]+(n.fu[u]-.5)*m[x*2]+(n.fv[u]-.5)*m[x*2+1]-g*.12+(i[u]-.5)*.08+(r[u]-.5)*.05;o.H[u]=$t(.05+(r[u]-.5)*.06,w,M);let y=c[x]*(.9+.2*a[u])*(.9+.2*i[u])*(.95+.1*r[u]);y*=.88+.12*ft(p,p+8*s,v),y=$t(y,.78*(.8+.4*r[u]),f);const S=h[x]*(1-f);o.R[u]=y*(1+S+f*.04),o.G[u]=y*(1+S*.2+f*.02),o.B[u]=y*(1-S*.8-f*.06),o.F[u]=$t(.68+(g-.5)*.3,.96,f),o.A[u]=1-f*.4}}function r0(o,t){const e=o.S,s=o.s,n=o.mask,a=J(e,t,3,3,5),i=J(e,t,12,12,3),r=J(e,t,e/2,e/2,1),l=J(e,t,5,5,3),c=J(e,t,6,6,4),h=J(e,t,24,24,3),d=new Float32Array(e*e),m=(u,v,x,M,f)=>{for(let g=0;g<M;g++){x+=(t()-.5)*.5,u+=Math.cos(x),v+=Math.sin(x);const w=Math.round(u)&n,y=Math.round(v)&n,S=1-g/M*.5,k=y*e+w;d[k]<S&&(d[k]=S);const b=y*e+(w+1&n),T=(y+1&n)*e+w;d[b]=Math.max(d[b],S*.35),d[T]=Math.max(d[T],S*.35),f<2&&t()<.0035&&m(u,v,x+(t()<.5?-1:1)*(.5+t()*.6),M*.45,f+1)}},p=1;for(let u=0;u<p;u++)m(t()*e,t()*e,t()*Math.PI*2,(110+t()*150)*s,0);for(let u=0;u<e*e;u++){const v=ft(.8,.84,c[u]+(h[u]-.5)*.3),x=v*(1-ft(.8,1,v)),M=(r[u]-.5)*2+(t()-.5)*.9,f=d[u],g=.62+(l[u]-.5)*.18+M*.03-v*.2-f*.3+x*.04;o.H[u]=g;let w=(.95+.1*a[u])*(.96+.08*i[u])*(1+M*.035);w=$t(w,w*.94,v),w*=1-f*.18,o.R[u]=w*(1+v*.01),o.G[u]=w*(1-v*.04),o.B[u]=w*(1-v*.12),o.F[u]=$t(.84+(i[u]-.5)*.14,.98,v),o.A[u]=1-f*.3-v*.1}}function l0(o,t){const e=o.S,s=o.s,n=o.mask,a=10,i=new Int32Array(a+1);{const k=[];let b=0;for(let A=0;A<a;A++){const _=.88+t()*.24;k.push(_),b+=_}let T=0;for(let A=0;A<a;A++)i[A]=Math.round(T/b*e),T+=k[A];i[a]=e}const r=new Int16Array(e);for(let k=0;k<a;k++)for(let b=i[k];b<i[k+1];b++)r[b]=k;const l=new Int32Array(a),c=new Int32Array(a),h=new Float32Array(a*2),d=new Float32Array(a*2),m=new Float32Array(a*2),p=new Float32Array(a*2);for(let k=0;k<a;k++){l[k]=Math.floor(t()*e),c[k]=l[k]+Math.round(e*(.38+t()*.24))&n;for(let b=0;b<2;b++)h[k*2+b]=.8+t()*.4,d[k*2+b]=t()-.5,m[k*2+b]=2.5+t()*3.5,p[k*2+b]=t()*6.28}const u=J(e,t,2,32,3),v=J(e,t,6,6,3),x=J(e,t,12,e/2,1),M=J(e,t,4,4,3),f=new Float32Array(e*e),g=[];for(let k=0;k<3;k++)g.push({x:t()*e,y:t()*e,r:(13+t()*9)*s});for(const k of g){const b=Math.ceil(k.r*2.6);for(let T=-b;T<=b;T++)for(let A=-b;A<=b;A++){const _=Math.sqrt(A/1.7*(A/1.7)+T*T)/k.r;if(_>2.6)continue;const P=(Math.round(k.y+T)&n)*e+(Math.round(k.x+A)&n);f[P]+=Math.sign(T||1)*10*s*Math.exp(-_*_*.9)*(_<.2?_/.2:1)}}const w=new Float32Array(e*e).fill(1),y=new Float32Array(e*e);for(const k of g){const b=Math.ceil(k.r*1.2);for(let T=-b;T<=b;T++)for(let A=-b;A<=b;A++){const _=Math.sqrt(A/1.7*(A/1.7)+T*T)/k.r;if(_>=1.1)continue;const P=(Math.round(k.y+T)&n)*e+(Math.round(k.x+A)&n),D=.5+.5*Math.cos(_*16),R=1-ft(.6,1.1,_);w[P]*=1-R*(.5-.18*D),y[P]+=R*(.06+.04*D)-ft(.2,.5,_)*(1-ft(.5,1,_))*.03}}const S=Math.PI*2;for(let k=0;k<e;k++){const b=r[k],T=i[b],A=i[b+1]-T,_=k-T,P=Math.min(_,A-1-_)+.5,D=1-ft(.3*s,2.8*s,P);for(let R=0;R<e;R++){const N=k*e+R,F=(k+(f[N]|0)&n)*e+R,W=Math.abs(R-l[b]),U=Math.abs(R-c[b]),V=Math.min(W,e-W,U,e-U)+.5,B=1-ft(.3*s,2.2*s,V),X=(R-l[b]&n)<(c[b]-l[b]&n)?0:1,H=b*2+X,tt=u[F],dt=v[F],pt=.5+.5*Math.sin(((_+f[N])/A*m[H]+dt*1.7+tt*1.1)*S+p[H]),q=ft(.56,.78,x[F]);let et=h[H]*(.78+.3*tt+.2*pt)*(.92+.16*M[N])*w[N];et*=1-q*.22;const lt=Math.max(D,B);et*=1-lt*.55;const nt=d[H];o.R[N]=et*(1+nt*.12),o.G[N]=et*(1+nt*.03),o.B[N]=et*(1-nt*.16),o.H[N]=(.72+pt*.05-q*.05+(tt-.5)*.04+y[N])*(1-lt*.85),o.F[N]=.7+(tt-.5)*.16+q*.16+lt*.2,o.A[N]=1-lt*.5-q*.12}}}function c0(o,t){const e=o.S,s=o.s,n=o.mask,a=6,i=5,r=J(e,t,4,4,2),l=J(e,t,10,10,3),c=J(e,t,e/4,e/4,2),h=J(e,t,4,4,4),d=new Float32Array(a*i),m=new Float32Array(a*i),p=new Float32Array(a*i),u=new Float32Array(a*i);for(let M=0;M<d.length;M++)d[M]=.8+t()*.36,m[M]=t()-.5,p[M]=(t()-.5)*.14,u[M]=t();const v=2.4*s*2.6,x=Math.PI;for(let M=0;M<e;M++)for(let f=0;f<e;f++){const g=M*e+f,w=f+(r[g]-.5)*v,S=(M+(r[(M+83&n)*e+(f+171&n)]-.5)*v)/e*i;let k=Math.floor(S);const b=S-k;k=(k%i+i)%i;const T=w/e*a+.5*(k&1),A=Math.floor(T),_=T-A,P=(A%a+a)%a,D=k*a+P,R=Math.sqrt(Math.sin(x*_)),N=.5+.5*b*(.4+.6*b),z=1-ft(.9,1,b)*.12,F=R*N*z*.9+p[D]*(b-.5)+(c[g]-.5)*.04+(l[g]-.5)*.05;o.H[g]=F;const W=ft(0,.22,b),U=1-ft(.02,.18,Math.min(_,1-_));let V=d[D]*(.88+.12*W)*(.92+.16*l[g])*(.94+.12*c[g])*(1-.18*ft(.55,.8,h[g]));V*=1+.12*ft(.93,1,b),V*=1-U*.22;const B=m[D];o.R[g]=V*(1+B*.1),o.G[g]=V*(1-B*.01),o.B[g]=V*(1-B*.14),o.F[g]=.62+u[D]*.16+(c[g]-.5)*.1+U*.2,o.A[g]=(.6+.4*W)*(1-U*.25)}}function h0(o,t){const e=o.S,s=o.s,n=o.mask,a=J(e,t,2,e/8,3),i=J(e,t,1,e/4,2),r=J(e,t,3,3,3),l=J(e,t,4,4,5),c=J(e,t,24,24,3),h=J(e,t,e/2,e/2,1),d=new Float32Array(e*e),m=new Float32Array(e*e),p=Math.round(70*s*Math.max(1,s));for(let u=0;u<p;u++){let v=t()*e,x=t()*e;const M=t()<.7?(t()-.5)*.5:t()*Math.PI*2,f=(14+t()*t()*130)*s,g=t()<.15,w=.3+t()*.5,y=Math.cos(M),S=Math.sin(M),k=g?m:d;for(let b=0;b<f;b+=.6){v+=y*.6,x+=S*.6;const T=(Math.round(x)&n)*e+(Math.round(v)&n),A=1-Math.abs(b/f-.5)*1.1;k[T]<w*A&&(k[T]=w*A)}}for(let u=0;u<e*e;u++){const v=(a[u]-.5)*1.4+(i[u]-.5)*.8,x=ft(.56,.8,l[u]+(c[u]-.5)*.28)*(.6+.4*c[u]),M=d[u],f=m[u];let g=(1+v*.2)*(.94+.12*r[u])*(1+(h[u]-.5)*.06);g*=1+M*.38-f*.3,g=$t(g,g*.8,x),o.R[u]=g*(1+x*.07),o.G[u]=g*(1-x*0),o.B[u]=g*(1-x*.14),o.H[u]=.6+v*.03+(r[u]-.5)*.12-M*.12-f*.18+x*.04,o.F[u]=.5+v*.14+M*.18+x*.42+(h[u]-.5)*.06,o.A[u]=1-x*.12-f*.1}}function u0(o,t){const e=o.S,s=o.s,n=J(e,t,3,3,4),a=J(e,t,14,14,3),i=J(e,t,e/2,e/2,1),r=J(e,t,10,2,3),l=new Float32Array(e*e),c=new Float32Array(e*e),h=Math.round(260*s*s);for(let u=0;u<h;u++){const v=(.9+t()*t()*3.6)*s,x=.4+t()*.6;cn(e,t()*e,t()*e,Math.max(1.2,v),(M,f)=>{const g=x*Math.min(1,f*1.8);l[M]<g&&(l[M]=g),c[M]=Math.max(c[M],g)})}const d=e/2,m=new Float32Array(e*e);for(let u=0;u<2;u++)for(let v=0;v<2;v++)for(const[x,M]of[[.25,.25],[.75,.25],[.25,.75],[.75,.75]])cn(e,v*d+x*d,u*d+M*d,5*s,(f,g)=>{const w=Math.min(1,g*1.6);m[f]<w&&(m[f]=w)});const p=[1,.96,1.04,.98];for(let u=0;u<e;u++){const v=Math.min(u%d,d-u%d);for(let x=0;x<e;x++){const M=u*e+x,f=Math.min(x%d,d-x%d),g=1-ft(.2*s,2.4*s,Math.min(f,v)+.5),w=p[(x>=d?1:0)+(u>=d?2:0)],y=(i[M]-.5)*2,S=l[M],k=m[M],b=.68+(a[M]-.5)*.1+y*.035-S*.5-g*.45-k*.55;o.H[M]=b;let T=w*(.9+.2*n[M])*(.94+.12*a[M])*(.86+.28*r[M])*(1+y*.05);T*=1-S*.42-g*.2-k*.5,o.R[M]=T*1.01,o.G[M]=T,o.B[M]=T*.985,o.F[M]=.8+(a[M]-.5)*.18+S*.12,o.A[M]=1-S*.5-g*.25-k*.5}}}const f0={masonry:{normal:3.2,ao:2.4,aoRadius:9},brick:{normal:3,ao:2.2,aoRadius:6},plaster:{normal:2,ao:1.4,aoRadius:5},paving:{normal:3,ao:2.2,aoRadius:8},wood:{normal:2.2,ao:1.8,aoRadius:4},tiles:{normal:4.6,ao:2.4,aoRadius:9},metal:{normal:1.6,ao:1.2,aoRadius:3},concrete:{normal:2.2,ao:1.8,aoRadius:5}};function d0(o,t,e){const s=new Float32Array(t*t),n=new Float32Array(t*t),a=t-1,r=1/(2*e+1);for(let l=0;l<t;l++){const c=l*t;let h=0;for(let d=-e;d<=e;d++)h+=o[c+(d&a)];for(let d=0;d<t;d++)s[c+d]=h*r,h+=o[c+(d+e+1&a)]-o[c+(d-e&a)]}for(let l=0;l<t;l++){let c=0;for(let h=-e;h<=e;h++)c+=s[(h&a)*t+l];for(let h=0;h<t;h++)n[h*t+l]=c*r,c+=s[(h+e+1&a)*t+l]-s[(h-e&a)*t+l]}return n}function m0(o,t){const e=o.S,s=e*e,n=f0[t],a=o.mask,i=w=>w<=0?0:w>=1?255:w*255+.5|0;let r=0;for(let w=0;w<s;w++)r+=o.R[w]*.3+o.G[w]*.59+o.B[w]*.11;const l=wa/(r/s),c=d0(o.H,e,Math.max(2,Math.round(n.aoRadius*o.s))),h=new Float32Array(s);let d=0;for(let w=0;w<s;w++){const y=c[w]-o.H[w],S=o0(1-Math.max(0,y)*n.ao*3.2+Math.max(0,-y)*.25)*o.A[w];h[w]=S<.35?.35:S,d+=h[w]}const m=d/s,p=Math.log(Ma)/Math.log(Math.min(.99,Math.max(.3,m))),u=new Uint8Array(1025);for(let w=0;w<=1024;w++)u[w]=i(Math.pow(w/1024,p));const v=new Uint8Array(s*4),x=new Uint8Array(s*4),M=new Uint8Array(s),f=o.H,g=n.normal;for(let w=0;w<e;w++){const y=(w-1&a)*e,S=w*e,k=(w+1&a)*e;for(let b=0;b<e;b++){const T=b-1&a,A=b+1&a,_=f[y+A]+2*f[S+A]+f[k+A]-f[y+T]-2*f[S+T]-f[k+T],P=f[k+T]+2*f[k+b]+f[k+A]-f[y+T]-2*f[y+b]-f[y+A],D=-_*g/8,R=-P*g/8,N=1/Math.sqrt(D*D+R*R+1),z=S+b,F=z*4;v[F]=i(o.R[z]*l),v[F+1]=i(o.G[z]*l),v[F+2]=i(o.B[z]*l),v[F+3]=u[h[z]*1024+.5|0],x[F]=i(D*N*.5+.5),x[F+1]=i(R*N*.5+.5),x[F+2]=i(N*.5+.5),x[F+3]=i(o.F[z]),M[z]=i(f[z])}}return{size:e,albedo:v,normal:x,height:M}}const p0={masonry:n0,brick:a0,plaster:r0,paving:i0,wood:l0,tiles:c0,metal:h0,concrete:u0};function g0(o,t,e){if(t<64||(t&t-1)!==0)throw new Error("size must be a power of two >= 64");const s=e0(e*7919+xa(o)*104729+1),n=s0(t);return p0[o](n,s),m0(n,o)}const v0=20260616;let Bs="high",te;function xc(o){te||(Bs=o)}function x0(){return te?te.quality:Bs}function hn(o,t,e){const s=t*t*4,n=new Uint8Array(s*o.length);o.forEach((i,r)=>n.set(i,r*s));const a=new mi(n,t,t,o.length);return a.format=So,a.type=ko,a.colorSpace=To,a.wrapS=a.wrapT=me,a.magFilter=je,a.minFilter=Jo,a.generateMipmaps=!0,a.anisotropy=e,a.userData.shared=!0,a.needsUpdate=!0,a}function w0(o=Bs,t=4){if(te)return te;const e=o==="low"?256:512,s=typeof performance<"u"?performance.now():Date.now(),n=[],a=[];for(const c of Us){const h=g0(c,e,v0);n.push(h.albedo),a.push(h.normal)}const i=hn(n,e,t),r=hn(a,e,t),l=(typeof performance<"u"?performance.now():Date.now())-s;return te={quality:o,size:e,albedo:i,normal:r,generationMs:l,dispose(){i.dispose(),r.dispose()}},te}function wc(){te==null||te.dispose(),te=void 0}const $e="aKitBase";function jo(o){var n;if(o.getAttribute($e))return;const t=o.getAttribute("position");if(!t)return;o.boundingBox||o.computeBoundingBox();const e=(n=o.boundingBox)==null?void 0:n.min.y;if(e===void 0||!Number.isFinite(e))return;const s=new Float32Array(t.count*2);for(let a=0;a<t.count;a++)s[a*2]=e,s[a*2+1]=1;o.setAttribute($e,new ct(s,2))}function ba(o){return o.userData.kitKind!==void 0}const M0={masonry:{grime:1,streak:.8,wear:.85,edgeRough:.08},brick:{grime:1,streak:.7,wear:.8,edgeRough:.06},plaster:{grime:1,streak:1,wear:.55,edgeRough:.1},paving:{grime:.5,streak:0,wear:.7,edgeRough:.06},wood:{grime:.7,streak:.4,wear:.9,edgeRough:.06},tiles:{grime:.35,streak:.2,wear:.6,edgeRough:.06},metal:{grime:.4,streak:.35,wear:1,edgeRough:-.28},concrete:{grime:1,streak:1,wear:.5,edgeRough:.06}},Pe=o=>o.toFixed(3),y0=`
attribute vec2 aKitBase;
varying vec3 vKitWorld;
varying float vKitH;
`,b0=`
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
`,S0=`
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
`;function k0(o,t){const e=xa(o).toFixed(1),n=`
  vec3 kN = inverseTransformDirection(normal, viewMatrix);
  vec3 kAbs = abs(kN);
  float kDist = length(vViewPosition);
  vec3 kP = vKitWorld * ${(1/t0[o]).toFixed(5)};
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
`;return n+a}function T0(o,t){const e=M0[o];return`
{
${k0(o,t)}
  // edge curvature (1/m) = normal change rate / world position change rate, distance independent; fades out far away
  float kCurv = length(fwidth(kN)) / max(length(fwidth(vKitWorld)), 1e-5);
  float kEdge = smoothstep(7.0, 22.0, kCurv) * (1.0 - smoothstep(18.0, 60.0, kDist)) * uKitWear * ${Pe(e.wear)};

  // color: modulation around the material color; AO is applied after aomap_fragment
  diffuseColor.rgb *= kA.rgb * ${Pe(1/wa)};
  kAo = kA.a;
  roughnessFactor = clamp(roughnessFactor * kRg * ${Pe(1/ya)}, 0.04, 1.0);

  // normal: relaxes to the geometric normal with distance
  float kNF = 1.0 - 0.7 * smoothstep(30.0, 100.0, kDist);
  normal = normalize((viewMatrix * vec4(normalize(mix(kN, kBn, kNF)), 0.0)).xyz);

  // wall-base grime: vertical faces within 0-1.2 m of the object's lowest point get darker and browner, broken up by noise
  float kWall = 1.0 - smoothstep(0.55, 0.88, kAbs.y);
  float kHu = vKitWorld.x * kAbs.z + vKitWorld.z * kAbs.x;
  float kBreak = kNoise(vec2(kHu * 2.3, vKitWorld.y * 1.1 + 3.0));
  float kG = (1.0 - smoothstep(0.0, 1.15 * (0.45 + 0.9 * kBreak), vKitH)) * kWall * uKitGrime * ${Pe(e.grime)};
  kG = clamp(kG, 0.0, 1.0);
  diffuseColor.rgb *= mix(vec3(1.0), vec3(0.5, 0.43, 0.35), kG * 0.8);
  roughnessFactor = mix(roughnessFactor, max(roughnessFactor, 0.9), kG * 0.6);
  kAo *= 1.0 - 0.25 * kG * (1.0 - smoothstep(0.0, 0.35, vKitH));
${t||e.streak<=0?"":`
  // vertical rain streaks
  float kS1 = kNoise(vec2(kHu * 8.0, vKitWorld.y * 0.5));
  float kS2 = kNoise(vec2(kHu * 1.4 + 7.0, vKitWorld.y * 0.12));
  float kStr = smoothstep(0.64, 0.9, kS1) * smoothstep(0.4, 0.75, kS2) * kWall * uKitGrime * ${Pe(e.streak)} * smoothstep(0.3, 1.6, vKitH);
  diffuseColor.rgb *= 1.0 - kStr * vec3(0.26, 0.24, 0.2);
`}
  // edge wear: brighter, less saturated exposed material
  float kLum = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
  vec3 kChip = mix(diffuseColor.rgb, vec3(kLum), 0.35) * 1.28 + 0.012;
  diffuseColor.rgb = mix(diffuseColor.rgb, kChip, kEdge * 0.85);
  roughnessFactor = clamp(roughnessFactor + kEdge * ${Pe(e.edgeRough)}, 0.04, 1.0);
}
`}const A0=`
{
  // normalized by the texture's mean AO so flat areas keep their brightness and only cavities darken
  float kAoN = min(kAo * ${Pe(1/Ma)}, 1.06);
  reflectedLight.indirectDiffuse *= kAoN;
  reflectedLight.indirectSpecular *= mix(1.0, kAoN, 0.6);
  reflectedLight.directDiffuse *= mix(1.0, kAoN, 0.35);
}
`;function Et(o,t,e={}){const s=o.userData.kitUniforms;if(s){e.grime!==void 0&&(s.grime.value=e.grime),e.wear!==void 0&&(s.wear.value=e.wear);return}const n={grime:{value:e.grime??1},wear:{value:e.wear??1}};o.userData.kitUniforms=n,o.userData.kitKind=t;const a=o.onBeforeCompile,i=o.onBeforeRender,r=o.customProgramCacheKey();o.onBeforeCompile=(l,c)=>{a.call(o,l,c);const h=w0(),d=h.quality==="low";l.uniforms.uKitAlb={value:h.albedo},l.uniforms.uKitNrm={value:h.normal},l.uniforms.uKitGrime=n.grime,l.uniforms.uKitWear=n.wear,l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
${y0}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${b0}`),l.fragmentShader=l.fragmentShader.replace("#include <common>",`#include <common>
${S0}`).replace("#include <color_fragment>",`#include <color_fragment>
float kAo = 1.0;`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${T0(t,d)}`).replace("#include <aomap_fragment>",`#include <aomap_fragment>
${A0}`)},o.onBeforeRender=(l,c,h,d,m,p)=>{i.call(o,l,c,h,d,m,p),d.getAttribute($e)||jo(d)},o.customProgramCacheKey=()=>`kit-v2-${t}-${x0()}+${r}`,o.needsUpdate=!0}const un={h:0,s:0,l:0};function _0(o,t){if(o.type!=="MeshStandardMaterial"||o.userData.shared||o.map||o.normalMap||o.bumpMap||o.roughnessMap||o.metalnessMap||o.aoMap||o.alphaMap||o.emissiveMap||o.displacementMap||o.lightMap||o.vertexColors||o.transparent||o.opacity<1||o.alphaTest>0||o.wireframe)return null;const e=o.emissive;if(o.emissiveIntensity*Math.max(e.r,e.g,e.b)>.04)return null;const s=t??o.userData.surfaceKind;if(s&&Us.includes(s))return s;if(o.metalness>.5)return"metal";o.color.getHSL(un,ts);const{h:n,s:a,l:i}=un;if(i>.86||i<.1||a>.62)return null;if(a<.08)return i>=.62?"concrete":i>=.18?"masonry":null;if(!(n<.17||n>=.95))return n>=.17&&n<.46&&a>.1||n>=.46&&a>.15?null:i>=.62?"concrete":i>=.18?"masonry":null;if(o.roughness>=.95&&a>=.2||o.roughness>=.99&&a>=.08)return null;if(i>=.6)return"plaster";if(a>.5&&n>=.065&&n<.17)return null;if(a>=.28&&(n<.065||n>=.95)){if(i>=.42)return"tiles";if(n<.04||n>=.95)return"brick"}return a>=.1?i>=.14?"wood":null:i>=.18?"masonry":null}function P0(o,t=5.5){o.onBeforeCompile=e=>{e.vertexShader=`varying vec3 vCobWorld;
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
           vec3 v = cVor(vCobWorld.xz * ${t.toFixed(2)});
           float edge = v.y - v.x;
           cGap = 1.0 - smoothstep(0.03, 0.16, edge);
           diffuseColor.rgb *= (0.78 + v.z * 0.42) * (1.0 - cGap * 0.5);
         }`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
 roughnessFactor = mix(roughnessFactor, 1.0, cGap);`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
         {
           float cFade = 1.0 - smoothstep(20.0, 70.0, length(vViewPosition));
           if (cFade > 0.01) {
             vec2 q = vCobWorld.xz * ${t.toFixed(2)};
             const float cE = 0.03;
             float h0 = cDome(q);
             vec2 gr = vec2(cDome(q + vec2(cE, 0.0)) - h0, cDome(q + vec2(0.0, cE)) - h0) / cE;
             vec3 gv = mat3(viewMatrix) * vec3(gr.x, 0.0, gr.y);
             gv -= normal * dot(gv, normal);
             normal = normalize(normal - gv * 0.09 * cFade);
           }
         }`)},o.customProgramCacheKey=()=>`cobble-${t}`,o.needsUpdate=!0}const fn=new WeakSet,D0=`
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
`;function R0(o,t){for(let e=o;e;e=e.parent){if(e.name==="scene-person"||e.userData.noSurface)return!0;if(e===t)break}return!1}function Mc(o,t=1){o.traverse(e=>{const s=e;if(!s.isMesh)return;const n=R0(s,o),a=Array.isArray(s.material)?s.material:[s.material];for(const i of a){if(i.type!=="MeshStandardMaterial")continue;const r=i;if(ba(r)){jo(s.geometry);continue}if(fn.has(i)||r.map||r.normalMap||r.bumpMap||r.vertexColors||r.transparent||r.emissiveIntensity>.25&&r.emissive.getHex()!==0)continue;const l=n?null:_0(r,s.userData.surfaceKind??void 0);if(l){Et(r,l,{grime:t,wear:t}),jo(s.geometry);continue}fn.add(i);const c=r.onBeforeCompile;r.onBeforeCompile=(d,m)=>{c==null||c.call(r,d,m),d.vertexShader=`varying vec3 vGrainWorld;
`+d.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
           vec4 gLocal = vec4(transformed, 1.0);
           #ifdef USE_INSTANCING
             gLocal = instanceMatrix * gLocal;
           #endif
           vGrainWorld = (modelMatrix * gLocal).xyz;`),d.fragmentShader=D0+d.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
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
             }`)};const h=r.customProgramCacheKey();r.customProgramCacheKey=()=>`grain+${h}`,r.needsUpdate=!0}})}function C0(o,t){return new ze({color:o,emissive:o,emissiveIntensity:t,metalness:.15,roughness:.08,clearcoat:1,clearcoatRoughness:.05,reflectivity:1,transparent:!0,opacity:.92,side:mt})}function yc(o,t=.82){return new at({color:o,roughness:t,metalness:.06,envMapIntensity:.4})}function bc(o){const e=document.createElement("canvas");e.width=64,e.height=64;const s=e.getContext("2d"),n=s.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return n.addColorStop(0,o),n.addColorStop(.4,"rgba(255,220,140,0.35)"),n.addColorStop(1,"rgba(0,0,0,0)"),s.fillStyle=n,s.fillRect(0,0,64,64),new ha(e)}function Sc(){return new at({color:4871528,roughness:.45,metalness:.85})}function kc(o){return new ze({color:o,emissive:o,emissiveIntensity:1.4,roughness:.04,metalness:0,transparent:!0,opacity:.82,clearcoat:1})}const ne={broadleaf:0,broadleafDark:1,conifer:2,shrub:3};function E0(o){const t=o%2,e=Math.floor(o/2);return[t*.5,e*.5,t*.5+.5,e*.5+.5]}function Sa(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function be(o,t,e){let s=Math.imul(o,374761393)+Math.imul(t,668265263)+Math.imul(e,1442695041)|0;return s=Math.imul(s^s>>>13,1274126177),s^=s>>>16,(s>>>0)/4294967296}function $o(o){return o*o*(3-2*o)}function jt(o,t,e){const s=Math.min(1,Math.max(0,(e-o)/(t-o)));return s*s*(3-2*s)}function dn(o,t,e){const s=Math.floor(o),n=Math.floor(t),a=$o(o-s),i=$o(t-n),r=be(s,n,e),l=be(s+1,n,e),c=be(s,n+1,e),h=be(s+1,n+1,e);return r+(l-r)*a+(c-r)*i+(r-l-c+h)*a*i}function yo(o,t){return(o%t+t)%t}const mn=new Map;function Ct(o,t,e,s,n){const a=(e*1024+s)*8192+(n&8191);let i=mn.get(a);if(!i){i=new Float32Array(e*s);for(let g=0;g<s;g++)for(let w=0;w<e;w++)i[g*e+w]=be(w,g,n);mn.set(a,i)}const r=Math.floor(o),l=Math.floor(t),c=$o(o-r),h=$o(t-l),d=yo(r,e),m=d+1===e?0:d+1,p=yo(l,s)*e,u=(p+e)%(e*s),v=i[p+d],x=i[p+m],M=i[u+d],f=i[u+m];return v+(x-v)*c+(M-v)*h+(v-x-M+f)*c*h}let we=0,Me=0,ye=0;function ka(o,t,e){o=o-Math.floor(o);const s=Math.floor(o*6),n=o*6-s,a=e*(1-t),i=e*(1-n*t),r=e*(1-(1-n)*t);switch(s%6){case 0:we=e,Me=r,ye=a;break;case 1:we=i,Me=e,ye=a;break;case 2:we=a,Me=e,ye=r;break;case 3:we=a,Me=i,ye=e;break;case 4:we=r,Me=a,ye=e;break;default:we=e,Me=a,ye=i;break}}function N0(o){const t=o*o;return{size:o,r:new Float32Array(t),g:new Float32Array(t),b:new Float32Array(t),a:new Float32Array(t),h:new Float32Array(t).fill(.5)}}function Ta(o,t,e,s,n,a,i){const r=o.a[t];if(r<=0){o.r[t]=e,o.g[t]=s,o.b[t]=n,o.a[t]=a,o.h[t]=i;return}const l=a+r*(1-a),c=a/l,h=1-c;o.r[t]=o.r[t]*h+e*c,o.g[t]=o.g[t]*h+s*c,o.b[t]=o.b[t]*h+n*c,o.a[t]=l,o.h[t]=o.h[t]*h+i*c}function Xo(o,t,e,s,n,a,i,r,l,c,h,d,m,p){const{B:u,ox:v,oy:x,S:M,m:f}=o,g=Math.max(a,i)+1,w=Math.max(f,Math.floor(Math.min(t,s)-g)),y=Math.min(M-f-1,Math.ceil(Math.max(t,s)+g)),S=Math.max(f,Math.floor(Math.min(e,n)-g)),k=Math.min(M-f-1,Math.ceil(Math.max(e,n)+g)),b=s-t,T=n-e,A=b*b+T*T||1e-6;for(let _=S;_<=k;_++){const P=(x+_)*u.size+v;for(let D=w;D<=y;D++){const R=D+.5-t,N=_+.5-e;let z=(R*b+N*T)/A;z=z<0?0:z>1?1:z;const F=R-b*z,W=N-T*z,U=a+(i-a)*z,V=F*F+W*W,B=U+1;if(V>B*B)continue;const X=Math.sqrt(V)-U,H=X<=-.5?1:X>=.5?0:.5-X;if(H<=.003)continue;const tt=1-Math.min(1,Math.abs(X+U*.5)/(U+.5))*.35;ka(r+(h-r)*z,l+(d-l)*z,(c+(m-c)*z)*tt*(.92+.16*p)),Ta(u,P+D,we,Me,ye,H,.62-Math.min(1,Math.abs(X)/(U+.5))*.2)}}}function z0(o,t){const{B:e,ox:s,oy:n,S:a,m:i}=o,r=Math.cos(t.ang),l=Math.sin(t.ang),c=t.x,h=t.y,d=c+r*t.len,m=h+l*t.len,p=t.wid+2,u=Math.max(i,Math.floor(Math.min(c,d)-p)),v=Math.min(a-i-1,Math.ceil(Math.max(c,d)+p)),x=Math.max(i,Math.floor(Math.min(h,m)-p)),M=Math.min(a-i-1,Math.ceil(Math.max(h,m)+p)),f=Math.max(5,Math.round(t.len/11)),g=1/t.len,w=.5+t.len*.0035;for(let y=x;y<=M;y++){const S=(n+y)*e.size+s;for(let k=u;k<=v;k++){const b=k+.5-c,T=y+.5-h,A=b*r+T*l;if(A<0||A>t.len)continue;const _=A*g,P=-b*l+T*r,D=P<0?-P:P;let R=t.wid*Math.pow(Math.max(0,Math.sin(Math.PI*Math.pow(_,t.shapeExp))),.78);if(R*=1+t.serr*(Math.abs(Math.sin(_*f*Math.PI))-.5),R<.4)continue;const N=R-D+.5;if(N<=.003)continue;const z=N>=1?1:N,F=D/R,W=dn(k*.045,y*.045,t.seed),U=dn(k*.19,y*.19,t.seed+5);let V=t.val*(.8+.3*_)*(.86+.26*W)*(.94+.1*U);V*=1-.24*jt(.76,1,F),V*=1+.12*t.fold*(P/R);let B=t.sat*(1-.18*_);const X=t.hue-.028*_+.03*(W-.5),H=jt(w+.9,w*.4,D)*(1-.5*_),tt=(A-D*.82)/t.veinGap,dt=tt-Math.floor(tt),pt=(dt<.5?dt:1-dt)*t.veinGap*.8,q=jt(1.3,.25,pt)*Math.pow(Math.max(0,1-F),.7)*jt(.06,.2,_)*jt(1,.8,_);let et=Math.max(H,q*.85);t.back&&(V*=1.16,B*=.62,et*=1.35),V*=1+.3*et,B*=1-.38*et,ka(X,B,Math.min(1,V));const lt=.55+.2*(1-F*F)*(t.back?.6:1)-et*(t.back?-.1:.16);Ta(e,S+k,we,Me,ye,z,lt)}}}function Aa(o,t,e,s,n,a,i){const r=t+Math.max(2,o*.012),l=o-2*r,c=Math.max(1e-6,n-e),h=Math.max(1e-6,a-s),d=Math.min(l/c,l/h,i);return{scale:d,ox:o/2-(e+n)/2*d,oy:o/2-(s+a)/2*d}}function xs(o,t){const e=Sa(o.seed),s=o.S,n=[],a=[],i=t.dark?.285+e()*.03:.235+e()*.04,r=(x,M,f,g,w)=>{const y=i+(e()-.5)*(t.dark?.04:.09)+(e()>.88&&!t.dark?-.04:0),S=(t.dark?.5:.42)+e()*.12,k=(t.dark?.27:t.round?.5:.46)+e()*.14;n.push({leaf:{x:x.x,y:x.y,ang:M,len:f,wid:f*g,hue:y,sat:S,val:k,serr:t.round?.04:.08,shapeExp:t.round?.8+e()*.2:.62+e()*.25,back:e()>.74,fold:e()*2-1,veinGap:Math.max(6,f*(t.round?.2:.16)),seed:Math.floor(e()*99999),petiole:w}})};if(t.round){const x=5+Math.floor(e()*2);for(let M=0;M<x;M++){const f=Math.PI/2+(M-(x-1)/2)*.5+(e()-.5)*.15,g=.55+e()*.25,w=(e()-.5)*.5,y=[],S=_=>f+w*_;let k=0,b=0;for(let _=0;_<=8;_++){y.push({x:k,y:b});const P=S(_/8);k+=Math.cos(P)*(g/8),b+=Math.sin(P)*(g/8)}a.push({pts:y,r0:.01});const T=3+Math.floor(e()*3);for(let _=0;_<T;_++){const P=.3+.7*(_/T)+e()*.05,D=Math.min(8,Math.floor(P*8)),R=y[D],N=_%2===0?1:-1;r(R,S(P)+N*(.7+e()*.5),(.2+e()*.12)*(1.1-.3*P),.55+e()*.12,.012)}const A=y[8];r(A,S(1)+(e()-.5)*.4,.26+e()*.08,.6,0)}}else{const x=8+Math.floor(e()*7),M=(e()-.5)*.35,f=[];for(let y=0;y<=12;y++){const S=y/12;f.push({x:M*S*S,y:S})}a.push({pts:f,r0:.014});const g=y=>({p:{x:M*y*y,y},dir:Math.atan2(1,2*M*y)});for(let y=0;y<x;y++){const S=.2+.72*(y/Math.max(1,x-1))+(e()-.5)*.03,{p:k,dir:b}=g(S),T=y%2===0?1:-1,A=.75+e()*.5+(1-S)*.25,_=(.4-.1*S)*(.8+e()*.34);r(k,b+T*A,_,.3+e()*.12,.03)}const w=g(1);r(w.p,w.dir+(e()-.5)*.2,.42*(.9+e()*.2),.34,0)}let l=1/0,c=1/0,h=-1/0,d=-1/0;const m=(x,M)=>{x<l&&(l=x),x>h&&(h=x),M<c&&(c=M),M>d&&(d=M)};for(const{leaf:x}of n){const M=Math.cos(x.ang),f=Math.sin(x.ang);m(x.x,x.y),m(x.x+M*x.len,x.y+f*x.len);for(const g of[.3,.45])for(const w of[-1,1])m(x.x+M*x.len*g-f*x.wid*w,x.y+f*x.len*g+M*x.wid*w)}for(const x of a)for(const M of x.pts)m(M.x,M.y);m(0,-.04);const p=Aa(s,o.m,l,c,h,d,s*.97),u=x=>({x:x.x*p.scale+p.ox,y:x.y*p.scale+p.oy});for(const x of a)for(let M=0;M<x.pts.length-1;M++){const f=u(x.pts[M]),g=u(x.pts[M+1]),w=M/(x.pts.length-1),y=Math.max(1.1,x.r0*p.scale*(1-w*.55)),S=Math.max(.8,x.r0*p.scale*(1-(w+1/(x.pts.length-1))*.55));Xo(o,f.x,f.y,g.x,g.y,y,S,.085,.45,.28,.1,.4,.36,e())}const v=n.map((x,M)=>M).sort(()=>e()-.5);for(const x of v){const M=n[x].leaf,f=u({x:M.x,y:M.y}),g=M.len*p.scale,w={...M,x:f.x,y:f.y,len:g,wid:M.wid*p.scale};if(M.petiole>0){const y=M.petiole*p.scale;Xo(o,f.x,f.y,f.x+Math.cos(M.ang)*y,f.y+Math.sin(M.ang)*y,1.1,.8,.11,.42,.3,.14,.4,.4,e()),w.x+=Math.cos(M.ang)*y*.9,w.y+=Math.sin(M.ang)*y*.9}z0(o,w)}}function I0(o,t,e,s,n,a,i,r,l,c){const h=t+Math.cos(s)*n,d=e+Math.sin(s)*n;Xo(o,t,e,h,d,a,a*.45,i,r,l*.72,i-.02,r*.9,l*1.12,c)}function F0(o,t){const e=Sa(t),s=o.S,n=(e()-.5)*.08,a=f=>({x:n*f*f,y:f}),i=[],r=[];r.push({a:a(0),b:a(1),r0:.0105,r1:.003});const l=15,c=(f,g,w)=>{const y=f.length-1;for(let S=0;S<y;S++)for(const k of[0,.34,.67]){const b=f[S],T=f[S+1],A=(S+k)/y,_=b.x+(T.x-b.x)*k,P=b.y+(T.y-b.y)*k,D=g[S];for(const R of[-1,1]){const N=A>w,z=D+R*(.62+e()*.3),F=.1*(1-.4*A)*(.82+e()*.36)*(N?.8:1);i.push({x:_,y:P,ang:z,len:F,hue:N?.22+e()*.04:.37+e()*.04,sat:N?.5:.46+e()*.12,val:N?.58+e()*.08:.36+e()*.12,r:e()})}}};for(let f=0;f<l;f++){const g=.08+.84*(f/(l-1)),w=a(g);for(const y of[-1,1]){const S=.5*Math.pow(1-g*.8,.85)*(.88+e()*.24),k=Math.PI/2-y*(1.08-g*.2+(e()-.5)*.12),b=[w],T=[];let A=w.x,_=w.y;const P=6;for(let D=0;D<P;D++){const R=k+y*(D/P)*.55;T.push(R),A+=Math.cos(R)*(S/P),_+=Math.sin(R)*(S/P),b.push({x:A,y:_})}for(let D=0;D<P;D++)r.push({a:b[D],b:b[D+1],r0:.0055*(1-D/P*.5),r1:.0055*(1-(D+1)/P*.5)});c(b,T,.78);for(let D=0;D<4;D++)i.push({x:A,y:_,ang:T[P-1]+(D-1.5)*.28,len:.06*(.85+e()*.3),hue:.23+e()*.04,sat:.5,val:.58,r:e()})}}{const f=[],g=[];for(let y=0;y<=14;y++)f.push(a(.15+y/14*.85));for(let y=0;y<14;y++)g.push(Math.atan2(f[y+1].y-f[y].y,f[y+1].x-f[y].x));c(f,g,.7);const w=a(1);for(let y=0;y<6;y++)i.push({x:w.x,y:w.y,ang:Math.PI/2+(y-2.5)*.34,len:.07,hue:.23,sat:.5,val:.6,r:e()})}let h=1/0,d=1/0,m=-1/0,p=-1/0;const u=(f,g)=>{f<h&&(h=f),f>m&&(m=f),g<d&&(d=g),g>p&&(p=g)};for(const f of i)u(f.x,f.y),u(f.x+Math.cos(f.ang)*f.len,f.y+Math.sin(f.ang)*f.len);for(const f of r)u(f.a.x,f.a.y),u(f.b.x,f.b.y);u(0,-.03);const v=Aa(s,o.m,h,d,m,p,s*.97),x=f=>({x:f.x*v.scale+v.ox,y:f.y*v.scale+v.oy}),M=Math.max(.9,s*.0034);for(const f of r){const g=x(f.a),w=x(f.b);Xo(o,g.x,g.y,w.x,w.y,Math.max(.9,f.r0*v.scale),Math.max(.8,f.r1*v.scale),.07,.5,.27,.075,.45,.32,e())}i.sort(()=>e()-.5);for(const f of i){const g=x(f);I0(o,g.x,g.y,f.ang,f.len*v.scale,M,f.hue,f.sat,f.val,f.r)}}function _a(o,t,e,s,n){const a=new Uint8Array(e*e*4),i=new Int32Array(e),r=new Int32Array(e);for(let l=0;l<e;l++)i[l]=n?(l+e-1)%e:Math.max(0,l-1),r[l]=n?(l+1)%e:Math.min(e-1,l+1);for(let l=0;l<e;l++){const c=(n?(l+e-1)%e:Math.max(0,l-1))*e,h=l*e,d=(n?(l+1)%e:Math.min(e-1,l+1))*e;for(let m=0;m<e;m++){const p=h+m,u=p*4;if(t&&t[p]<.02){a[u]=128,a[u+1]=128,a[u+2]=255,a[u+3]=255;continue}const v=i[m],x=r[m],M=(o[c+x]+2*o[h+x]+o[d+x]-o[c+v]-2*o[h+v]-o[d+v])/8,f=(o[d+v]+2*o[d+m]+o[d+x]-o[c+v]-2*o[c+m]-o[c+x])/8,g=-M*s,w=-f*s,y=1/Math.sqrt(g*g+w*w+1);a[u]=(g*y*.5+.5)*255+.5|0,a[u+1]=(w*y*.5+.5)*255+.5|0,a[u+2]=(y*.5+.5)*255+.5|0,a[u+3]=255}}return a}function se(o){const t=Math.round(o*255);return t<0?0:t>255?255:t}function L0(o,t){const e=N0(o),s=Math.floor(o/2),n=Math.max(3,Math.round(s*.03)),a=[{id:ne.broadleaf,paint:c=>xs(c,{dark:!1,round:!1})},{id:ne.broadleafDark,paint:c=>xs(c,{dark:!0,round:!1})},{id:ne.conifer,paint:c=>F0(c,t*31+3)},{id:ne.shrub,paint:c=>xs(c,{dark:!1,round:!0})}],i=new Float32Array(a.length*3);for(const{id:c,paint:h}of a){const d=c%2*s,m=Math.floor(c/2)*s;h({B:e,ox:d,oy:m,S:s,m:n,seed:t});let p=0,u=0,v=0,x=0;for(let M=0;M<s;M++){const f=M>=n&&M<s-n;for(let g=0;g<s;g++){const w=(m+M)*o+d+g;!f||g<n||g>=s-n?(e.a[w]=0,e.h[w]=.5):e.a[w]>.5&&(p+=e.r[w],u+=e.g[w],v+=e.b[w],x++)}}x>0&&(i[c*3]=p/x,i[c*3+1]=u/x,i[c*3+2]=v/x)}const r=new Uint8Array(o*o*4);for(let c=0;c<o;c++)for(let h=0;h<o;h++){const d=c*o+h,m=d*4,p=Math.min(1,Math.floor(h/s))+Math.min(1,Math.floor(c/s))*2,u=e.a[d];u<.004?(r[m]=se(i[p*3]),r[m+1]=se(i[p*3+1]),r[m+2]=se(i[p*3+2]),r[m+3]=0):(r[m]=se(e.r[d]),r[m+1]=se(e.g[d]),r[m+2]=se(e.b[d]),r[m+3]=se(u))}const l=_a(e.h,e.a,o,7*(o/1024),!1);return{albedo:{size:o,data:r},normal:{size:o,data:l}}}function ws(o,t,e){const s=new Float32Array(o*t),n=new Float32Array(o*t),a=new Float32Array(o*t);for(let i=0;i<t;i++)for(let r=0;r<o;r++){const l=i*o+r;s[l]=.15+be(r,i,e)*.7,n[l]=.15+be(r,i,e+17)*.7,a[l]=be(r,i,e+31)}return{gx:o,gy:t,fx:s,fy:n,id:a}}function pn(o,t,e,s){const{gx:n,gy:a}=e,i=o*n,r=t*a,l=Math.floor(i),c=Math.floor(r);let h=9,d=9,m=0;for(let p=-1;p<=1;p++){const u=c+p,v=yo(u,a);for(let x=-1;x<=1;x++){const M=l+x,f=v*n+yo(M,n),g=i-(M+e.fx[f]),w=r-(u+e.fy[f]),y=g*g+w*w;y<h?(d=h,h=y,m=e.id[f]):y<d&&(d=y)}}s[0]=Math.sqrt(h),s[1]=Math.sqrt(d),s[2]=m}function U0(o,t,e){const{gx:s}=t,n=o*s,a=Math.floor(n);let i=9,r=9,l=0;for(let c=-1;c<=1;c++){const h=a+c,d=yo(h,s),m=Math.abs(n-(h+t.fx[d]));m<i?(r=i,i=m,l=t.id[d]):m<r&&(r=m)}e[0]=i,e[1]=r,e[2]=l}function O0(o,t,e){const s=o,n=new Uint8Array(s*s*4),a=new Float32Array(s*s),i=[0,0,0],r=t*7+(e==="conifer"?101:3),l=e==="broadleaf"?ws(10,1,r+9):ws(11,3,r+9),c=ws(22,8,r+12);for(let d=0;d<s;d++){const m=(d+.5)/s;for(let p=0;p<s;p++){const u=(p+.5)/s,v=d*s+p;let x,M,f,g;const w=Ct(u*4,m*4,4,4,r+1);if(e==="broadleaf"){const S=Ct(u*2,m*5,2,5,r+3)-.5,k=Ct(u*5,m*11,5,11,r+4)-.5,b=u+.028*S+.01*k;U0(b,l,i);const T=i[1]-i[0],A=jt(.3,.6,Ct(u*10,m*4,10,4,r+5)),_=1-jt(0,.13,T);pn(b+.31,m+.07*S,c,i);const P=i[1]-i[0],D=(1-jt(0,.09,P))*.5*jt(.3,.7,Ct(u*6,m*9,6,9,r+6)),R=Math.min(1,Math.max(_*(.4+.6*A),D)),N=Ct(u*120,m*8,120,8,r+7),z=Ct(u*70,m*40,70,40,r+11),F=.9+.2*Ct(u*10,m*3,10,3,r+8);g=(1-R*.9)*(.85+.15*N)+.05*z;const W=F*(.82+.4*w)*(.86+.28*N)*(.94+.1*z)*(1-.82*R);x=.4*W,M=.35*W,f=.3*W;const U=jt(.64,.78,Ct(u*7,m*7,7,7,r+12))*(1-R)*.2;x+=(.5*W-x)*U,M+=(.54*W-M)*U,f+=(.4*W-f)*U}else{const S=.03*(Ct(u*5,m*3,5,3,r+3)-.5)+.012*(Ct(u*14,m*8,14,8,r+4)-.5),k=.06*(Ct(u*4,m*5,4,5,r+5)-.5);pn(u+S,m+k,l,i);const b=i[1]-i[0],T=.6+.8*Ct(u*7,m*6,7,6,r+6),A=jt(0,.16*T,b),_=1-Math.min(1,i[0]*1.1),P=Ct(u*60,m*5,60,5,r+10),D=Ct(u*90,m*30,90,30,r+11);g=A*(.5+.35*_)*(.88+.16*P)+.05*D;const N=(.75+.5*i[2])*(.85+.3*w)*(.8+.4*P)*(.9+.2*D)*(.3+.7*A)*(.88+.2*_);x=.37*N,M=.28*N,f=.22*N;const z=jt(.5,.85,i[2])*.4;x+=(.4*N-x)*z,M+=(.34*N-M)*z,f+=(.3*N-f)*z}const y=v*4;n[y]=se(x),n[y+1]=se(M),n[y+2]=se(f),n[y+3]=255,a[v]=g}}const h=_a(a,null,s,(e==="broadleaf"?5:6)*(s/512),!0);return{albedo:{size:s,data:n},normal:{size:s,data:h}}}const Tc=5,it={rockA:.16,rockB:.42,hiA:14,hiB:38,dryA:.58,dryB:.78,dryGain:.5,hiGain:.22,dirtA:.54,dirtB:.74,dirtGain:.9,gravelA:.62,gravelB:.76,hBias:.2};function ho(o,t,e){const s=Math.min(1,Math.max(0,(e-o)/(t-o)));return s*s*(3-2*s)}function Ac(o){const t=ho(it.rockA,it.rockB,1-o.normalY),e=ho(it.hiA,it.hiB,o.height),s=Math.min(1,ho(it.dryA,it.dryB,o.nDry)*it.dryGain+e*it.hiGain),n=ho(it.dirtA,it.dirtB,o.nDirt)*it.dirtGain,a=ho(it.gravelA,it.gravelB,o.nGravel),i=1-t,r=i*n,l=i*(1-n),c=l*a,h=l*(1-a),d=h*s,m=h*(1-s),p=o.layerHeights??[.5,.5,.5,.5,.5],u=[m,d,r,c,t];let v=0;const x=u.map((f,g)=>{const w=f*(p[g]+it.hBias),y=w*w;return v+=y,y}),M=1/Math.max(v,1e-6);return[x[0]*M,x[1]*M,x[2]*M,x[3]*M,x[4]*M]}function Ft(o){const t=String(o);return/[.e]/.test(t)?t:`${t}.0`}function _c(){return`
void layerWeights(float normalY, float height, float nDry, float nDirt, float nGravel, float lh[5], out float w[5]) {
  float rock = smoothstep(${Ft(it.rockA)}, ${Ft(it.rockB)}, 1.0 - normalY);
  float hi = smoothstep(${Ft(it.hiA)}, ${Ft(it.hiB)}, height);
  float dry = min(1.0, smoothstep(${Ft(it.dryA)}, ${Ft(it.dryB)}, nDry) * ${Ft(it.dryGain)} + hi * ${Ft(it.hiGain)});
  float dirt = smoothstep(${Ft(it.dirtA)}, ${Ft(it.dirtB)}, nDirt) * ${Ft(it.dirtGain)};
  float gravel = smoothstep(${Ft(it.gravelA)}, ${Ft(it.gravelB)}, nGravel);
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
    float v = w[k] * (lh[k] + ${Ft(it.hBias)});
    w[k] = v * v;
    sum += w[k];
  }
  float inv = 1.0 / max(sum, 1e-6);
  for (int k = 0; k < 5; k++) w[k] *= inv;
}
`}function Ro(o,t){const e=Math.sin(o*127.1+t*311.7)*43758.5453123;return e-Math.floor(e)}function B0(o,t){const e=Math.floor(o),s=Math.floor(t),n=o-e,a=t-s,i=n*n*(3-2*n),r=a*a*(3-2*a);return Ro(e,s)*(1-i)*(1-r)+Ro(e+1,s)*i*(1-r)+Ro(e,s+1)*(1-i)*r+Ro(e+1,s+1)*i*r}function Co(o,t,e){let s=.5,n=1,a=0,i=0;for(let r=0;r<e;r++)a+=s*B0(o*n,t*n),i+=s,s*=.5,n*=2;return a/i}function Pc(o,t){return{nDry:Co(o*.012+13,t*.012+71,3),nDirt:Co(o*.009+31,t*.009+17,4)*.68+Co(o*.045,t*.045,3)*.32,nGravel:Co(o*.028+150,t*.028+20,4)}}function Dc(){return`
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
`}const Gt=o=>[(o>>16&255)/255,(o>>8&255)/255,(o&255)/255],uo=o=>{const t=e=>Math.round(Math.min(1,Math.max(0,e))*255);return t(o[0])<<16|t(o[1])<<8|t(o[2])},Be=(o,t,e)=>[o[0]+(t[0]-o[0])*e,o[1]+(t[1]-o[1])*e,o[2]+(t[2]-o[2])*e],Ue=o=>o[0]*.299+o[1]*.587+o[2]*.114;function Rc(o){const t=Gt(o.grass),e=Gt(o.dirt),s=Gt(o.rock),n=Be(t,[Ue(t),Ue(t),Ue(t)],.1),i=Be(n,[.66,.6,.33],.62),r=Be(e,[Ue(e),Ue(e),Ue(e)],.08),l=Be(Be(s,e,.38),[1,1,1],.1),c=s;return{grass:uo(n),dryGrass:uo(i),dirt:uo(r),gravel:uo(l),rock:uo(c)}}function G0(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function W0(o){const t=o*o;return{S:o,mask:o-1,R:new Float32Array(t),G:new Float32Array(t),B:new Float32Array(t),H:new Float32Array(t)}}function de(o,t,e,s,n,a=.5){const i=new Float32Array(o*o);let r=1,l=0;const c=new Int32Array(o),h=new Int32Array(o),d=new Float32Array(o);for(let p=0;p<n;p++){const u=e<<p,v=s<<p;if(u>o/2||v>o/2)break;const x=new Float32Array(u*v);for(let M=0;M<x.length;M++)x[M]=t();for(let M=0;M<o;M++){const f=M*u/o,g=Math.floor(f),w=f-g;c[M]=g%u,h[M]=(g+1)%u,d[M]=w*w*(3-2*w)}for(let M=0;M<o;M++){const f=M*v/o,g=Math.floor(f),w=f-g,y=w*w*(3-2*w),S=g%v*u,k=(g+1)%v*u,b=M*o;for(let T=0;T<o;T++){const A=x[S+c[T]],_=x[S+h[T]],P=x[k+c[T]],D=x[k+h[T]],R=d[T],N=A+(_-A)*R;i[b+T]=i[b+T]+r*(N+(P+(D-P)*R-N)*y)}}l+=r,r*=a}const m=1/l;for(let p=0;p<i.length;p++)i[p]*=m;return i}function Yo(o,t){for(let e=0;e<o.length;e++){const s=(o[e]-.5)*t+.5;o[e]=s<0?0:s>1?1:s}}function gn(o,t,e,s,n,a,i,r){const l=(e&o.mask)*o.S+(t&o.mask);o.R[l]+=(s-o.R[l])*i,o.G[l]+=(n-o.G[l])*i,o.B[l]+=(a-o.B[l])*i,r>o.H[l]&&(o.H[l]=r)}function Ms(o,t,e){const s=o.S;for(let n=0;n<e.count;n++){let a=t()*s,i=t()*s,r=t()*Math.PI*2;const l=e.lenMin+t()*(e.lenMax-e.lenMin),c=e.wMin+t()*(e.wMax-e.wMin),h=(t()-.5)*e.curve,d=e.bright[0]+t()*(e.bright[1]-e.bright[0]),m=e.alt&&t()<e.alt.p?e.alt.color:e.base,p=(t()-.5)*e.hueJitter,u=Math.max(3,Math.round(l/.8)),v=.8+t()*.2;for(let x=0;x<u;x++){const M=x/(u-1),f=Math.cos(r),g=Math.sin(r),w=Math.max(.9,c*(1-M*.8)),y=e.baseDark+(e.tipLight-e.baseDark)*M,S=m[0]*d*y*(1+p+e.tipYellow*M),k=m[1]*d*y*(1+e.tipYellow*M*.3),b=m[2]*d*y*(1-p-e.tipYellow*M*1.2),T=(.38+.62*Math.pow(M,.55))*v,A=w*.5,_=Math.round(a),P=Math.round(i);if(w<1.5)gn(o,_,P,S,k,b,.9,T);else for(let D=-A;D<=A+.01;D+=1){const R=Math.abs(D)>A-.5?.65:.95;gn(o,Math.round(a-g*D),Math.round(i+f*D),S,k,b,R,T)}a+=f*.8,i+=g*.8,r+=h*.05}}}function Ko(o,t){const e=Math.cos(t.ang),s=Math.sin(t.ang),n=Math.ceil(Math.max(t.rx,t.ry)*1.7)+1,a=Math.round(t.cx),i=Math.round(t.cy),r=-.6,l=-.8;for(let c=-n;c<=n;c++)for(let h=-n;h<=n;h++){const d=h+(a-t.cx),m=c+(i-t.cy),p=(d*e+m*s)/t.rx,u=(-d*s+m*e)/t.ry,v=p*p+u*u;if(v>2.9)continue;const x=(i+c&o.mask)*o.S+(a+h&o.mask);if(v<1){const M=Math.sqrt(1-v),f=(d*r+m*l)/(Math.max(t.rx,t.ry)*1),g=.74+.3*M-.28*f*(1-M*.6),w=v>.8?.8:1;o.R[x]+=(t.color[0]*g-o.R[x])*w,o.G[x]+=(t.color[1]*g-o.G[x])*w,o.B[x]+=(t.color[2]*g-o.B[x])*w;const y=M*t.hScale;y>o.H[x]&&(o.H[x]=y)}else if(t.shadow>0){const M=(d*-r+m*-l)/(Math.sqrt(d*d+m*m)+1e-4),f=1-(Math.sqrt(v)-1)/.7;if(f>0&&M>-.2){const g=1-t.shadow*f*Math.min(1,M+.3);o.R[x]*=g,o.G[x]*=g,o.B[x]*=g}}}}function Ns(o,t,e,s){const n=t*t,a=new Float32Array(n),i=new Float32Array(n),r=new Float32Array(n),l=new Float32Array(n),c=new Float32Array(n),h=new Float32Array(n);for(let u=0;u<n;u++){a[u]=.5+(e()-.5)*.85,i[u]=.5+(e()-.5)*.85;const v=e()*Math.PI;r[u]=Math.cos(v),l[u]=Math.sin(v);const x=s?.75+e()*.7:1,M=s?.8+e()*.45:1;c[u]=1/(M*x),h[u]=1/(M/x)}const d=new Float32Array(o*o),m=new Float32Array(o*o),p=new Int32Array(o*o);for(let u=0;u<o;u++){const v=u*t/o,x=Math.floor(v);for(let M=0;M<o;M++){const f=M*t/o,g=Math.floor(f);let w=1e9,y=1e9,S=0;for(let b=-1;b<=1;b++){const T=x+b,A=(T%t+t)%t;for(let _=-1;_<=1;_++){const P=g+_,D=(P%t+t)%t,R=A*t+D,N=f-(P+a[R]),z=v-(T+i[R]),F=N*r[R]+z*l[R],W=-N*l[R]+z*r[R],U=F*F*c[R]*c[R]+W*W*h[R]*h[R];U<w?(y=w,w=U,S=R):U<y&&(y=U)}}const k=u*o+M;d[k]=Math.sqrt(w),m[k]=Math.sqrt(y),p[k]=S}}return{d1:d,d2:m,id:p}}const De=(o,t,e)=>{const s=Math.min(1,Math.max(0,(e-o)/(t-o)));return s*s*(3-2*s)};function vn(o,t,e,s){const n=o.S,a=n/512,i=Gt(e.grass),r=Gt(e.dryGrass),l=Gt(e.dirt),c=de(n,t,4,4,5),h=de(n,t,16,16,3);if(Yo(c,1.8),s){for(let d=0;d<n*n;d++){const m=De(.5,.72,c[d]),p=h[d];o.R[d]=(r[0]*.62+(l[0]*.8-r[0]*.62)*m*.55)*(.78+.4*p),o.G[d]=(r[1]*.62+(l[1]*.8-r[1]*.62)*m*.55)*(.78+.4*p),o.B[d]=(r[2]*.62+(l[2]*.8-r[2]*.62)*m*.55)*(.78+.4*p),o.H[d]=.1+.18*p}Ms(o,t,{count:Math.round(11e3*a*a),lenMin:24*a+4,lenMax:58*a+4,wMin:1.3,wMax:2.1,curve:3.4,base:r,baseDark:.62,tipLight:1.08,tipYellow:.08,bright:[.7,1.3],alt:{p:.12,color:[l[0]*1.1,l[1]*1.05,l[2]]},hueJitter:.1}),Ms(o,t,{count:Math.round(1200*a*a),lenMin:10*a+3,lenMax:22*a+3,wMin:1.4,wMax:2,curve:1.4,base:Gt(e.grass),baseDark:.6,tipLight:1.05,tipYellow:.1,bright:[.7,1],hueJitter:.06})}else{const d=[i[0]*.5,i[1]*.5,i[2]*.45];for(let u=0;u<n*n;u++){const v=c[u]*.7+h[u]*.3;o.R[u]=d[0]*(.7+.6*v),o.G[u]=d[1]*(.7+.6*v),o.B[u]=d[2]*(.7+.6*v),o.H[u]=.12+.2*h[u]}Ms(o,t,{count:Math.round(26e3*a*a),lenMin:12*a+3,lenMax:30*a+3,wMin:1.5,wMax:2.5,curve:1.2,base:i,baseDark:.58,tipLight:1.12,tipYellow:.16,bright:[.75,1.25],alt:{p:.05,color:r},hueJitter:.08});const m=[[.93,.92,.84],[.93,.78,.22],[.9,.9,.92]],p=Math.round(9*a*a)+3;for(let u=0;u<p;u++){const v=t()*n,x=t()*n,M=m[Math.floor(t()*m.length)],f=(1.3+t()*.8)*Math.max(.8,a);for(let g=0;g<5;g++){const w=g/5*Math.PI*2+t();Ko(o,{cx:v+Math.cos(w)*f,cy:x+Math.sin(w)*f,rx:f*.7,ry:f*.7,ang:0,color:M,hScale:.9,shadow:0})}Ko(o,{cx:v,cy:x,rx:f*.55,ry:f*.55,ang:0,color:[.95,.72,.15],hScale:.95,shadow:0})}}}function V0(o,t,e){const s=o.S,n=s/512,a=Gt(e.dirt),i=Gt(e.rock),r=de(s,t,4,4,5),l=de(s,t,32,32,3);Yo(r,1.8);for(let m=0;m<s*s;m++){const p=.94+t()*.12,u=(.76+.46*r[m])*(.9+.2*l[m])*p,v=r[m]>.55?1.04:.98;o.R[m]=a[0]*u*v,o.G[m]=a[1]*u,o.B[m]=a[2]*u/v,o.H[m]=.28+.2*l[m]+.1*r[m]}const c=Math.round(110*n*n);for(let m=0;m<c;m++){const p=(5+t()*8)*n+1.5,u=.9+t()*.25;Ko(o,{cx:t()*s,cy:t()*s,rx:p*(.8+t()*.5),ry:p*(.8+t()*.5),ang:t()*3.14,color:[a[0]*u,a[1]*u,a[2]*u],hScale:.55+t()*.15,shadow:.2})}const h=Math.round(520*n*n);for(let m=0;m<h;m++){const p=(1.5+Math.pow(t(),2)*5)*Math.max(.7,n),u=t()*.65,v=.72+t()*.55;Ko(o,{cx:t()*s,cy:t()*s,rx:p*(.85+t()*.5),ry:p*(.7+t()*.4),ang:t()*3.14,color:[(i[0]+(a[0]-i[0])*u)*v,(i[1]+(a[1]-i[1])*u)*v,(i[2]+(a[2]-i[2])*u)*v],hScale:.8+t()*.2,shadow:.38})}const d=Math.round(16*n)+4;for(let m=0;m<d;m++){let p=t()*s,u=t()*s,v=t()*Math.PI*2;const x=Math.round((70+t()*150)*n)+20;for(let M=0;M<x;M++){v+=(t()-.5)*.7,p+=Math.cos(v),u+=Math.sin(v);const f=Math.round(p),g=Math.round(u),w=(g&o.mask)*s+(f&o.mask);if(o.R[w]*=.5,o.G[w]*=.5,o.B[w]*=.5,o.H[w]=Math.min(o.H[w],.04),M%3===0){const y=(g&o.mask)*s+(f+1&o.mask);o.R[y]*=.8,o.G[y]*=.8,o.B[y]*=.8,o.H[y]=Math.min(o.H[y],.18)}}}}function H0(o,t,e){const s=o.S,n=s/512,a=Gt(e.gravel),i=Gt(e.dirt),r=Math.round(24*n+2)|0,l=Math.max(8,r),c=Ns(s,l,t,!0),h=new Float32Array(l*l),d=new Float32Array(l*l),m=new Float32Array(l*l);for(let v=0;v<h.length;v++)h[v]=.62+t()*.75,d[v]=t(),m[v]=.6+t()*.4;const p=[i[0]*.38,i[1]*.36,i[2]*.33],u=de(s,t,24,24,2);for(let v=0;v<s*s;v++){const x=c.id[v],M=c.d1[v],f=De(0,.1,c.d2[v]-M),g=Math.max(0,1-M*.85),w=d[x],y=h[x]*(.86+.28*u[v])*(.78+.3*g)*(.95+t()*.1),S=a[0]*y*(.94+.14*w),k=a[1]*y*(.97+.04*w),b=a[2]*y*(1.04-.14*w),T=f*f;o.R[v]=p[0]+(S-p[0])*T,o.G[v]=p[1]+(k-p[1])*T,o.B[v]=p[2]+(b-p[2])*T,o.H[v]=.04+.96*Math.pow(g,.7)*f*m[x]}}function j0(o,t,e){const s=o.S,n=s/512,a=Gt(e.rock),i=Be(Gt(e.grass),[.1,.12,.06],.35),r=de(s,t,2,12,5),l=de(s,t,6,6,4),c=de(s,t,32,32,3),h=de(s,t,3,3,4);Yo(r,1.6),Yo(h,1.8);const d=Ns(s,Math.max(4,Math.round(9*Math.max(.7,n))),t,!1),m=Ns(s,Math.max(8,Math.round(15*Math.max(.7,n*1))),t,!1);for(let p=0;p<s*s;p++){const u=r[p]*.5+l[p]*.32+c[p]*.18,v=(c[p]-.5)*.09,x=1-De(0,.035,d.d2[p]-d.d1[p]+v),M=(1-De(0,.05,m.d2[p]-m.d1[p]+v))*.55*De(.35,.7,l[p]),f=Math.min(1,x+M),g=u*(1-.8*f),w=.74+.5*r[p],y=l[p];let S=a[0]*w*(.96+.1*y),k=a[1]*w,b=a[2]*w*(1.04-.1*y);const T=.62+.55*g,A=1-.38*f;S*=T*A,k*=T*A,b*=T*A;const _=De(.55,.78,h[p])*De(.6,.2,u)*.55;_>0&&(S+=(i[0]*(.7+.5*c[p])-S)*_,k+=(i[1]*(.7+.5*c[p])-k)*_,b+=(i[2]*(.7+.5*c[p])-b)*_);const P=.94+t()*.12;o.R[p]=S*P,o.G[p]=k*P,o.B[p]=b*P,o.H[p]=g}}const $0={0:1.8,1:1.5,2:2.4,3:3.4,4:3},X0={0:.9,1:.94,2:.97,3:.84,4:.9};function Y0(o,t){const e=o.S,s=new Uint8Array(e*e*4),n=new Uint8Array(e*e*4),a=h=>h<=0?0:h>=1?255:h*255+.5|0,i=o.H,r=o.mask,l=$0[t],c=X0[t];for(let h=0;h<e;h++){const d=(h-1&r)*e,m=h*e,p=(h+1&r)*e;for(let u=0;u<e;u++){const v=u-1&r,x=u+1&r,M=i[d+x]+2*i[m+x]+i[p+x]-i[d+v]-2*i[m+v]-i[p+v],f=i[p+v]+2*i[p+u]+i[p+x]-i[d+v]-2*i[d+u]-i[d+x],g=-M*l/8,w=-f*l/8,y=1/Math.sqrt(g*g+w*w+1),S=(m+u)*4,k=m+u;s[S]=a(o.R[k]),s[S+1]=a(o.G[k]),s[S+2]=a(o.B[k]),s[S+3]=a(i[k]),n[S]=a(g*y*.5+.5),n[S+1]=a(w*y*.5+.5),n[S+2]=a(y*.5+.5),n[S+3]=a(c+(.5-i[k])*.12)}}return{size:e,albedo:s,normal:n}}function K0(o,t,e,s){if(t<64||(t&t-1)!==0)throw new Error("size must be a power of two >= 64");const n=G0(e*7919+o*104729+1),a=W0(t);switch(o){case 0:vn(a,n,s,!1);break;case 1:vn(a,n,s,!0);break;case 2:V0(a,n,s);break;case 3:H0(a,n,s);break;default:j0(a,n,s)}return Y0(a,o)}const Z0=256,q0=2207,Gs=1.1,Q0={grass:9079172,dryGrass:9079172,dirt:7300698,gravel:9276293,rock:9079172};let qt,Re;function xn(o,t,e){const s=new qe(o,t,t,So,ko);return s.colorSpace=e?ts:To,s.wrapS=s.wrapT=me,s.magFilter=je,s.minFilter=Jo,s.generateMipmaps=!0,s.anisotropy=4,s.needsUpdate=!0,s}function Pa(){if(qt)return qt;const o=K0(4,Z0,q0,Q0);return qt={albedo:xn(o.albedo,o.size,!0),normal:xn(o.normal,o.size,!1)},qt}const wn=`
varying vec3 vRkPos;
varying vec3 vRkNrm;
varying vec3 vRkWorldN;
varying mat3 vRkM;
`,J0=`
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
`,tr=`
vRkPos = transformed;
`,er=`
{
  mat4 rkModel = modelMatrix;
  #ifdef USE_BATCHING
    rkModel = modelMatrix * batchingMatrix;
  #endif
  vRkM = mat3(rkModel);
  vRkNrm = normalize(objectNormal);
  vRkWorldN = normalize(vRkM * objectNormal);
}
`,or=`
vec3 rkN = normalize(vRkNrm);
vec3 rkW = pow(abs(rkN), vec3(5.0));
rkW /= (rkW.x + rkW.y + rkW.z);
vec3 rkP = vRkPos * ${Gs.toFixed(3)};
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
`,sr=`
{
  vec3 rkNo = normalize(vRkNrm);
  vec3 rkWn = pow(abs(rkNo), vec3(5.0));
  rkWn /= (rkWn.x + rkWn.y + rkWn.z);
  vec3 rkQ = vRkPos * ${Gs.toFixed(3)};
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
`,nr=`
{
  vec3 rkNr = normalize(vRkNrm);
  vec3 rkWr = pow(abs(rkNr), vec3(5.0));
  rkWr /= (rkWr.x + rkWr.y + rkWr.z);
  vec3 rkR = vRkPos * ${Gs.toFixed(3)};
  float rkRough = texture2D(rkNormal, rkR.zy).a * rkWr.x + texture2D(rkNormal, rkR.xz + 0.37).a * rkWr.y + texture2D(rkNormal, rkR.xy + 0.71).a * rkWr.z;
  roughnessFactor = mix(rkRough, 0.97, rkMoss * 0.8);
  roughnessFactor = mix(roughnessFactor, roughnessFactor * 0.72, rkGround);
}
`;function ar(){if(Re)return Re;const o=Pa(),t=new at({color:16777215,vertexColors:!0,roughness:.92,metalness:0});return t.userData.shared=!0,t.onBeforeCompile=e=>{e.uniforms.rkAlbedo={value:o.albedo},e.uniforms.rkNormal={value:o.normal},e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
${wn}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${tr}`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
${er}`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
${wn}${J0}`).replace("#include <color_fragment>",`#include <color_fragment>
${or}`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
${nr}`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${sr}`)},t.customProgramCacheKey=()=>"rock-triplanar-v1",Re=t,t}let ue;function ir(){if(ue)return ue;const o=Pa();return ue=new at({color:16777215,map:o.albedo,normalMap:o.normal,normalScale:new ut(.7,.7),vertexColors:!0,roughness:.9,metalness:0}),ue.userData.shared=!0,ue}function rr(){Re==null||Re.dispose(),Re=void 0,ue==null||ue.dispose(),ue=void 0,qt==null||qt.albedo.dispose(),qt==null||qt.normal.dispose(),qt=void 0}const lr={value:0},cr={value:1},Mn={dir:{value:new C(.4,.8,-.45).normalize()},color:{value:new G(1,.95,.85)}};let Ce="high";function Cc(o){!Ee&&Object.keys(Ve).length===0&&(Ce=o)}const hr=.45,ur=`
uniform float windTime;
uniform float windStrength;
attribute vec2 aSway;
`,fr=`
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
`;function Ws(o){o.uniforms.windTime=lr,o.uniforms.windStrength=cr,o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
${ur}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${fr}`)}const dr=`
uniform vec3 foliageSunDir;
uniform vec3 foliageSunColor;
`,mr=`
{
  vec3 tlSun = normalize((viewMatrix * vec4(foliageSunDir, 0.0)).xyz);
  vec3 tlView = normalize(vViewPosition);
  float tlBack = pow(max(dot(-tlView, tlSun), 0.0), 4.0);
  totalEmissiveRadiance += diffuseColor.rgb * foliageSunColor * (tlBack * 0.35);
}
`;function Zo(o,t,e,s){const n=new qe(o.data,o.size,o.size,So,ko);return n.colorSpace=t?ts:To,n.wrapS=n.wrapT=e?me:Cs,n.magFilter=je,n.minFilter=Jo,n.generateMipmaps=!0,n.anisotropy=s,n.needsUpdate=!0,n}const pr=`
#ifdef USE_MAP
  vec2 fTexSz = vec2(textureSize(map, 0));
  vec2 fDx = dFdx(vMapUv * fTexSz);
  vec2 fDy = dFdy(vMapUv * fTexSz);
  float fMip = max(0.0, 0.5 * log2(max(dot(fDx, fDx), dot(fDy, fDy))));
  diffuseColor.a *= 1.0 + fMip * 0.3;
#endif`;function Da(o){o.fragmentShader=o.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
${pr}`)}const gr=4177,vr=913;let Ee;const Ve={},qo=new Map;function Ra(o,t){const e=new pi({depthPacking:gi}),s=new vi;for(const n of[e,s])n.map=o.map,n.alphaTest=o.alphaTest,n.onBeforeCompile=a=>{Ws(a),Da(a)},n.customProgramCacheKey=()=>`wind-shadow-${t}-v2`;qo.set(o,{depth:e,distance:s})}function Ca(){if(Ee)return Ee;const t=L0(Ce==="high"?1024:512,gr),e=new at({map:Zo(t.albedo,!0,!1,Ce==="high"?4:2),normalMap:Zo(t.normal,!1,!1,Ce==="high"?4:2),normalScale:new ut(.8,.8),alphaTest:hr,vertexColors:!0,side:mt,roughness:.82,metalness:0});return e.onBeforeCompile=s=>{Ws(s),Da(s),s.uniforms.foliageSunDir=Mn.dir,s.uniforms.foliageSunColor=Mn.color,s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
${dr}`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
${mr}`)},e.customProgramCacheKey=()=>"foliage-wind-v2",e.userData.shared=!0,Ee=e,Ra(e,"foliage"),e}function Vs(o){const t=Ve[o];if(t)return t;const s=O0(Ce==="high"?512:256,vr,o),n=new at({map:Zo(s.albedo,!0,!0,Ce==="high"?4:2),normalMap:Zo(s.normal,!1,!0,Ce==="high"?4:2),normalScale:new ut(1,1),vertexColors:!0,roughness:.96,metalness:0});return n.onBeforeCompile=a=>Ws(a),n.customProgramCacheKey=()=>"bark-wind-v1",n.userData.shared=!0,Ve[o]=n,Ra(n,`bark-${o}`),n}function Qo(o,t){const e=qo.get(t);e&&(o.customDepthMaterial=e.depth,o.customDistanceMaterial=e.distance)}function Ec(){var t,e;const o=[];Ee&&o.push(Ee);for(const s of Object.values(Ve))s&&o.push(s);for(const s of o){(t=s.map)==null||t.dispose(),(e=s.normalMap)==null||e.dispose(),s.dispose();const n=qo.get(s);n==null||n.depth.dispose(),n==null||n.distance.dispose(),qo.delete(s)}rr(),Ee=void 0,delete Ve.broadleaf,delete Ve.conifer}function xr(o){const t=new Ot;let e=0,s=0;const n=o.some(m=>m.attributes.color);for(const m of o)e+=m.attributes.position.count,s+=m.index?m.index.count:m.attributes.position.count;const a=new Float32Array(e*3),i=new Float32Array(e*3),r=new Float32Array(e*2),l=n?new Float32Array(e*3):null,c=new Uint32Array(s);let h=0,d=0;for(const m of o){const p=m.attributes.position,u=m.attributes.normal,v=m.attributes.uv;a.set(p.array,h*3),u&&i.set(u.array,h*3),v&&r.set(v.array,h*2),l&&(m.attributes.color?l.set(m.attributes.color.array,h*3):l.fill(1,h*3,(h+p.count)*3));const x=m.index;if(x)for(let M=0;M<x.count;M++)c[d++]=x.getX(M)+h;else for(let M=0;M<p.count;M++)c[d++]=M+h;h+=p.count}return t.setAttribute("position",new ct(a,3)),t.setAttribute("normal",new ct(i,3)),t.setAttribute("uv",new ct(r,2)),l&&t.setAttribute("color",new ct(l,3)),t.setIndex(new ct(c,1)),t}const wr=.5;function Nc(o=18){const t=Yt(90210),e=[];for(let s=0;s<o;s++){const n=t(),a=Math.sqrt(n)*.45,i=t()*Math.PI*2,r=Math.cos(i)*a,l=Math.sin(i)*a,c=.16+t()*.34,h=.05+t()*.04,d=.06+a*.7+t()*.12,m=3,p=[],u=[],v=[],x=Math.cos(i),M=Math.sin(i),f=t()*Math.PI,g=Math.cos(f),w=Math.sin(f);for(let T=0;T<=m;T++){const A=T/m,_=A*c,P=h*(1-A*.92)*.5,D=d*A*A,R=r+x*D,N=l+M*D;p.push(R-g*P,_,N-w*P),p.push(R+g*P,_,N+w*P),u.push(0,A,1,A)}for(let T=0;T<m;T++){const A=T*2,_=T*2+1,P=T*2+2,D=T*2+3;v.push(A,P,_,_,P,D)}const y=new Ot;y.setAttribute("position",new gt(p,3)),y.setAttribute("uv",new gt(u,2)),y.setIndex(v),y.computeVertexNormals();const S=.78+t()*.3,k=t()>.82?1:0,b=new Float32Array(p.length);for(let T=0;T<p.length/3;T++){const A=$.clamp(p[T*3+1]/wr,0,1),_=[.07+A*.27,.15+A*.34,.045+A*.1],P=[.2+A*.34,.17+A*.26,.07+A*.1];for(let D=0;D<3;D++)b[T*3+D]=(_[D]*(1-k)+P[D]*k)*S}y.setAttribute("color",new ct(b,3)),e.push(y)}return xr(e)}const yn=new Map;function Ea(o=.88,t="leaf"){const e=`${t}:${o}`;let s=yn.get(e);return s||(s=new at({color:16777215,vertexColors:!0,roughness:o,metalness:.02}),yn.set(e,s)),s}function mo(o,t,e,s){return Math.sin(o*2.3+s)*Math.cos(t*2.1+s*1.3)*.5+Math.sin(e*2.7-s*.7+o*1.1)*.35+Math.sin((o+t+e)*4.1+s)*.15}const bn=new Map;function Mr(o,t,e){const s=`${o}:${t}:${e}`,n=bn.get(s);if(n)return n;const a=He(new ma(1,t),1e-4),i=a.attributes.position,r=new C;for(let l=0;l<i.count;l++){r.fromBufferAttribute(i,l);const c=mo(r.x,r.y,r.z,o);r.multiplyScalar(1+c*e),i.setXYZ(l,r.x,r.y,r.z)}return a.computeVertexNormals(),a.deleteAttribute("uv"),bn.set(s,a),a}function St(o,t,e,s=()=>1,n=!1){const a=o.clone();n||a.deleteAttribute("uv"),a.attributes.normal||a.computeVertexNormals();const i=a.attributes.position,r=a.attributes.normal,l=new Float32Array(i.count*3);for(let c=0;c<i.count;c++){const h=s(i.getY(c),r.getY(c));l[c*3]=e.r*h,l[c*3+1]=e.g*h,l[c*3+2]=e.b*h}return a.setAttribute("color",new ct(l,3)),a.applyMatrix4(t),a.index?a:He(a,1e-4)}const yr=new st,Sn=new Ie,kn=new os,Tn=new C,An=new C;function It(o,t,e,s=1,n=s,a=s,i=0,r=0,l=0){return kn.set(i,r,l),Sn.setFromEuler(kn),Tn.set(o,t,e),An.set(s,n,a),yr.clone().compose(Tn,Sn,An)}function Hs(o,t,e,s=!0){if(t.length===0)return;const n=Xt(t,!1);if(!n)return;const a=new K(n,e);a.castShadow=s,a.receiveShadow=!0,Qo(a,e),o.add(a)}function js(o,t,e,s,n,a=!1,i=16,r=18){const l=[];for(let u=0;u<=i;u++){const v=u/i,x=t*.6*Math.exp(-v*13);l.push(new ut($.lerp(t,e,Math.pow(v,.85))+x,-.08*o+v*o*1.08))}const c=new wi(l,r),h=c.attributes.position,d=new Float32Array(h.count*3);for(let u=0;u<h.count;u++){const v=h.getX(u),x=h.getZ(u),M=h.getY(u),f=Math.atan2(x,v),g=Math.sin(f*7+M*.9/Math.max(.2,o*.15))*.5+Math.sin(f*13-M*1.7/Math.max(.2,o*.15))*.3+mo(v*3,M*2.2,x*3,3)*.6,w=Math.max(0,Math.sin(f*5+.7))*Math.exp(-Math.max(0,M)/(o*.12)),y=1+g*.055+w*.28;h.setX(u,v*y+n*Math.pow(Math.max(0,M)/o,2)*o),h.setZ(u,x*y);const S=.72+.28*$.clamp(.5+g*.6,0,1),k=.7+.3*Math.min(1,Math.max(0,M)/(o*.3)),b=S*k;d[u*3]=s.r*b,d[u*3+1]=s.g*b,d[u*3+2]=s.b*b}if(c.setAttribute("color",new ct(d,3)),a){const u=c.attributes.uv,v=Math.PI*2*((t+e)/2+t*.1);for(let x=0;x<u.count;x++)u.setY(x,u.getY(x)*o*1.08/v)}else c.deleteAttribute("uv");c.computeVertexNormals();const m=c.attributes.normal,p=i+1;for(let u=0;u<p;u++){const v=u,x=r*p+u,M=m.getX(v)+m.getX(x),f=m.getY(v)+m.getY(x),g=m.getZ(v)+m.getZ(x),w=Math.hypot(M,f,g)||1;m.setXYZ(v,M/w,f/w,g/w),m.setXYZ(x,M/w,f/w,g/w)}return c}const br=.03,bo=.05,fe=new C(0,1,0);class rs{constructor(){I(this,"pos",[]);I(this,"nor",[]);I(this,"uvs",[]);I(this,"col",[]);I(this,"sw",[]);I(this,"idx",[]);I(this,"n",new C)}get cardCount(){return this.pos.length/12}add(t,e,s,n,a,i,r,l,c,h,d,m=!1){this.n.crossVectors(e,s).normalize();const p=this.n.dot(c)<0?-1:1;p<0&&this.n.negate();const u=this.n.clone().multiplyScalar(1-d).addScaledVector(h,d).normalize(),[v,x,M,f]=E0(i),g=this.pos.length/3;for(let w=0;w<4;w++){const y=w===1||w===2?1:0,S=w>=2?1:0,k=(y-.5)*n*p,b=(S-.5)*a;this.pos.push(t.x+e.x*k+s.x*b,t.y+e.y*k+s.y*b,t.z+e.z*k+s.z*b),this.nor.push(u.x,u.y,u.z);const T=m?1-y:y;this.uvs.push(v+(M-v)*T,x+(f-x)*S);const A=.88+.12*S;this.col.push(r[0]*A,r[1]*A,r[2]*A),this.sw.push(0,l*(.3+.7*S))}this.idx.push(g,g+1,g+2,g,g+2,g+3)}build(){const t=new Ot;return t.setAttribute("position",new gt(this.pos,3)),t.setAttribute("normal",new gt(this.nor,3)),t.setAttribute("uv",new gt(this.uvs,2)),t.setAttribute("color",new gt(this.col,3)),t.setAttribute("aSway",new gt(this.sw,2)),t.setIndex(this.pos.length/3>65535?new xi(this.idx,1):new da(this.idx,1)),t}}function _n(o,t){const e=o.attributes.position;let s=o.attributes.aSway;s||(s=new ct(new Float32Array(e.count*2),2),o.setAttribute("aSway",s));const n=br*t;for(let a=0;a<e.count;a++){const i=$.clamp(e.getY(a)/t,0,1);s.setX(a,n*i*i)}s.needsUpdate=!0}function Sr(o){let t=.001;for(const e of o){const s=e.attributes.position;for(let n=0;n<s.count;n++)s.getY(n)>t&&(t=s.getY(n))}return t}function $s(o,t,e,s){const n=t.length>0?Xt(t,!1):null,a=Sr([...n?[n]:[],...e?[e]:[]]);if(n){_n(n,a);const i=new K(n,s);i.castShadow=!0,i.receiveShadow=!0,Qo(i,s),o.add(i)}if(e){_n(e,a);const i=Ca(),r=new K(e,i);r.castShadow=!0,r.receiveShadow=!0,Qo(r,i),o.add(r)}}function po(o,t,e,s,n,a,i){const r=t.clone().sub(o),l=r.length(),c=new Rt(s,e,l,n,1,!0);c.translate(0,l/2,0);const h=c.attributes.uv,d=i(),m=i(),p=l/(Math.PI*(e+s));for(let x=0;x<h.count;x++)h.setXY(x,h.getX(x)+d,h.getY(x)*p+m);const u=c.attributes.position,v=new Float32Array(u.count*3);for(let x=0;x<u.count;x++){const M=a*(.78+.22*Math.min(1,u.getY(x)/l));v[x*3]=M,v[x*3+1]=M,v[x*3+2]=M}return c.setAttribute("color",new ct(v,3)),c.applyMatrix4(new st().compose(o,new Ie().setFromUnitVectors(fe,r.normalize()),new C(1,1,1))),c}const Na=new G(1,.96,.9);function Ne(o,t){return t.set(o()+o()+o()-1.5,o()+o()+o()-1.5,o()+o()+o()-1.5),t.lengthSq()<1e-6&&t.set(0,1,0),t.normalize()}function kr(o,t,e,s,n,a){const i=new rs,r=Ne(e,new C),l=new C().crossVectors(r,Math.abs(r.y)>.9?new C(1,0,0):fe).normalize(),c=new C().crossVectors(r,l).normalize(),h=e()*Math.PI*2,d=l.clone().multiplyScalar(Math.cos(h)).addScaledVector(c,Math.sin(h)),m=c.clone().multiplyScalar(Math.cos(h)).addScaledVector(l,-Math.sin(h)),p=.62+.4*$.clamp(.5+s*.6,0,1),u=.94+e()*.12;return i.add(o,d,m,t,t,ne.shrub,[p*u,p,p*(1.1-(u-.94))],t*bo,r,r,.4,e()>.5),i.build()}function za(o){const t=new vt,e=Yt(o.seed),s=o.u,n=[],a=(w,y,S,k,b=1)=>{n.push(po(w,y,S,k,o.radial,b,e))},i=13*s;n.push(js(i,1.9*s,1.15*s,Na,(e()-.5)*.02,!0,o.trunkRows,o.trunkRadial));for(let w=0;w<o.roots;w++){const y=w/o.roots*Math.PI*2+e()*.4,S=(3.4+e()*2.2)*s;a(new C(Math.cos(y)*s,2.2*s,Math.sin(y)*s),new C(Math.cos(y)*S,-.25*s,Math.sin(y)*S),.7*s,.18*s,.95)}const r=[];for(let w=0;w<o.limbs;w++){const y=w/o.limbs*Math.PI*2+e()*.4,S=i*(.62+e()*.3),k=(7.5+e()*3.5)*s,b=(5+e()*4)*s;let T=new C(Math.cos(y)*.5*s,S,Math.sin(y)*.5*s);for(let A=1;A<=o.segs;A++){const _=A/o.segs,P=new C(Math.cos(y)*k*_,S+b*Math.pow(_,.8)+Math.sin(_*3+w)*.4*s,Math.sin(y)*k*_),D=Math.max(.1*s,.62*s*(1-(A-1)/o.segs*.85)),R=Math.max(.07*s,.62*s*(1-A/o.segs*.85));if(a(T,P,D,R),A>=o.forkFrom)for(const N of[-1,1]){const z=y+N*(.5+e()*.5),F=P.clone().add(new C(Math.cos(z)*(2.2+e()*1.6)*s,(1.6+e()*2.2)*s,Math.sin(z)*(2.2+e()*1.6)*s));a(P,F,R*.8,.05*s),r.push({p:F,r:(1.9+e()*1)*s});for(let W=0;W<o.twigs;W++){const U=z+(W===0?-1:1)*(.6+e()*.7)*(e()>.5?1:-1),V=F.clone().add(new C(Math.cos(U)*(1.3+e()*1.2)*s,(.5+e()*1.6)*s,Math.sin(U)*(1.3+e()*1.2)*s));a(F,V,.05*s,.025*s),r.push({p:V,r:(1.4+e()*.8)*s})}}A===2&&r.push({p:P.clone().add(new C(0,1.2*s,0)),r:(2.2+e()*1)*s}),T=P}r.push({p:T.clone().add(new C(0,.8*s,0)),r:(2.5+e()*1)*s})}r.push({p:new C(0,i+4.5*s,0),r:3.4*s});const l=new C;for(const w of r)l.add(w.p);l.multiplyScalar(1/r.length);let c=.001;for(const w of r)c=Math.max(c,w.p.distanceTo(l)+w.r);let h=0;for(const w of r)h+=w.r*w.r;const d=new rs,m=new C,p=new C,u=new C,v=new C,x=new C,M=new C,f=new C,g=new C;for(const w of r){const y=Math.max(2,Math.round(o.cards*w.r*w.r/h));v.copy(w.p).sub(l).normalize();for(let S=0;S<y;S++){Ne(e,m).multiplyScalar(.8).addScaledVector(v,.55).normalize(),p.copy(w.p).addScaledVector(m,w.r*(.25+e()*.85)),u.copy(p).sub(l);const k=$.clamp(u.length()/c,0,1);u.normalize(),x.copy(u).multiplyScalar(.7).addScaledVector(fe,.45).add(Ne(e,g).multiplyScalar(.55)).normalize(),M.copy(u).addScaledVector(x,-u.dot(x)),M.lengthSq()<.02&&Ne(e,M),M.normalize();const b=(e()-.5)*1.8;g.crossVectors(x,M),M.multiplyScalar(Math.cos(b)).addScaledVector(g,Math.sin(b)).normalize(),f.crossVectors(M,x).normalize();const A=k<.55&&e()<.75?ne.broadleafDark:ne.broadleaf,_=$.lerp(.34,1.02,$.smoothstep(k,.15,1))*(.82+.18*$.clamp(.5+u.y*.8,0,1))*(.9+.2*e()),P=.96+e()*.1,D=(o.cardSize[0]+e()*(o.cardSize[1]-o.cardSize[0]))*s;d.add(p,f,M,D,D,A,[_*P,_,_*(1.08-(P-.96))],D*bo,u,u,.55,e()>.5)}}return $s(t,n,d.build(),Vs("broadleaf")),t}function zc(o=1,t="high"){const e=t==="low";return za({u:.2*o,limbs:4,segs:3,forkFrom:3,roots:3,cards:e?440:1900,cardSize:e?[2.2,3.6]:[1.3,2.3],twigs:e?0:2,radial:e?4:6,trunkRows:e?8:16,trunkRadial:e?8:18,seed:Math.floor(o*1e4)+77})}function Ic(){return za({u:1,limbs:8,segs:4,forkFrom:2,roots:8,cards:9e3,cardSize:[1.5,2.9],twigs:2,radial:7,trunkRows:16,trunkRadial:18,seed:4411})}function Fc(o=1,t="high"){const e=new vt,s=Yt(Math.floor(o*7919)+13),n=o,a=t==="low",i=4.3*n,r=[];r.push(js(i*.97,.15*n,.022*n,Na,(s()-.5)*.03,!0,a?8:16,a?6:12));const l=a?5:9,c=a?2:4,h=new rs,d=new C,m=new C,p=new C,u=new C,v=new C,x=new C,M=new C,f=new C,g=new C,w=new Ie,y=a?1.4:1;for(let k=0;k<l;k++){const b=k/(l-1),T=(.9+b*3.05)*n,A=(1.1-.9*b)*n*(.92+s()*.16),_=a?4:Math.round(7-b*2.5),P=s()*Math.PI*2,D=.4-.1*b;for(let R=0;R<_;R++){const N=P+R/_*Math.PI*2+(s()-.5)*.5,z=A*(.85+s()*.3);v.set(Math.cos(N),0,Math.sin(N)),d.set(0,T+(s()-.5)*.12*n,0);const F=(B,X)=>X.set(v.x*z*B,d.y+z*(.12*B-D*B*B),v.z*z*B),W=a?2:3;m.copy(d);for(let B=1;B<=W;B++){F(B/W,p);const X=Math.max(.006*n,.045*n*(1-.65*b)*(1-(B-1)/W*.8)),H=Math.max(.004*n,.045*n*(1-.65*b)*(1-B/W*.8));r.push(po(m,p,X,H,a?3:4,.85,s)),m.copy(p)}const U=$.clamp(z*.55,.38*n,.8*n)*y,V=$.clamp(Math.round(z/(U*.42)),a?2:3,a?3:7);for(let B=0;B<V;B++){const X=.2+B/Math.max(1,V-1)*.8;F(X,g),F(Math.min(1.02,X+.05),u).sub(g).normalize(),g.addScaledVector(u,U*.35);const H=$.lerp(.5,1.02,$.smoothstep(X,.1,.8));for(let tt=0;tt<c;tt++){const dt=c===4?(tt-1.5)*.5:(tt-.5)*.9;M.copy(u),x.crossVectors(M,fe).normalize(),w.setFromAxisAngle(M,dt+(s()-.5)*.25),x.applyQuaternion(w),f.crossVectors(x,M).normalize();const pt=(s()-.5)*.35;w.setFromAxisAngle(f,pt);const q=M.clone().applyQuaternion(w),et=x.clone().applyQuaternion(w),lt=c===4&&tt===0?.82:1,nt=H*(.7+.3*b)*lt*(.9+.2*s()),kt=U*(.9+s()*.2);h.add(g,et,q,kt,kt,ne.conifer,[nt,nt,nt*1.04],kt*bo,fe,v.clone().multiplyScalar(.5).addScaledVector(fe,.5).normalize(),.3,s()>.5)}}}}const S=a?2:3;for(let k=0;k<S;k++){const b=k/S*Math.PI+s()*.3;x.set(Math.cos(b),0,Math.sin(b)),g.set(0,i*.9+.12*n,0);const T=.62*n*y;h.add(g,x,fe,T,T,ne.conifer,[1,1,1.04],T*bo*.6,f.crossVectors(x,fe),f.clone(),0,s()>.5)}return $s(e,r,h.build(),Vs("conifer")),e}function Tr(o=1,t="high"){const e=new vt,s=Yt(Math.floor(o*31337)+5),n=t==="low",a=o,i=[],r=n?4:5+Math.floor(s()*5);for(let y=0;y<r;y++){const S=y/r*Math.PI*2+s()*.8,k=(.35+s()*.4)*a,b=(.4+s()*.4)*a,T=new C(Math.cos(S)*k*.35,b*.5,Math.sin(S)*k*.35),A=new C(Math.cos(S)*k,b,Math.sin(S)*k),_=new C(Math.cos(S)*.03*a,0,Math.sin(S)*.03*a);n?i.push(po(_,A,.02*a,.008*a,3,.8,s)):(i.push(po(_,T,.022*a,.014*a,3,.8,s)),i.push(po(T,A,.014*a,.006*a,3,.8,s)))}const l=new rs,c=n?150:520,h=n?[.36,.56]:[.26,.44],d=new C(0,.38*a,0),m=new C,p=new C,u=new C,v=new C,x=new C,M=new C,f=new C;let g=0,w=0;for(;g<c&&w++<c*6;){Ne(s,m);const y=(.4+.6*Math.sqrt(s()))*.72*a;if(p.set(m.x*y,d.y+m.y*y*.85,m.z*y),p.y<.06*a)continue;const S=$.clamp((p.y-.06*a)/(.3*a),0,1);if(s()>.25+.75*S)continue;u.copy(p).sub(d).normalize(),v.copy(u).multiplyScalar(.75).addScaledVector(fe,.35).add(Ne(s,f).multiplyScalar(.5)).normalize(),x.copy(u).addScaledVector(v,-u.dot(v)),x.lengthSq()<.02&&Ne(s,x),x.normalize();const k=(s()-.5)*1.6;f.crossVectors(v,x),x.multiplyScalar(Math.cos(k)).addScaledVector(f,Math.sin(k)).normalize(),M.crossVectors(x,v).normalize();const b=$.clamp(p.distanceTo(d)/(.72*a),0,1),T=$.lerp(.45,1.02,$.smoothstep(b,.2,1))*(.62+.38*S)*(.9+.2*s()),A=.95+s()*.1,_=(h[0]+s()*(h[1]-h[0]))*a;l.add(p,M,x,_,_,ne.shrub,[T*A,T,T*(1.07-(A-.95))],_*bo,u,u,.5,s()>.5),g++}if($s(e,i,l.build(),Vs("broadleaf")),!n&&s()>.6){const y=[],S=new xt(.035*o,6,5),k=new G([14240600,6966233,15909198][Math.floor(s()*3)]);for(let b=0;b<9;b++){const T=s()*Math.PI*2,A=(.25+s()*.35)*o;y.push(St(S,It(Math.cos(T)*A,(.35+s()*.3)*o,Math.sin(T)*A),k))}Hs(e,y,Ea(.5,"berry"),!1)}return e}let ys;function Xs(){return ys||(ys=new at({color:16777215,vertexColors:!0,roughness:.78,metalness:0,side:mt})),ys}function go(o,t,e,s,n){return new st().makeTranslation(o,t,e).multiply(new st().makeRotationY(s)).multiply(new st().makeRotationX(n))}function Lc(o=1){const t=new vt,e=Yt(Math.floor(o*6151)+29),s=[15913547,15695784,16185072,12160240,15897419,15226959],n=new G(4880954),a=[],i=3+Math.floor(e()*3);for(let r=0;r<i;r++){const l=(.28+e()*.3)*o,c=new G(s[Math.floor(e()*s.length)]),h=e()*Math.PI*2,d=e()*.24*o,m=Math.cos(h)*d,p=Math.sin(h)*d,u=new Rt(.007*o,.012*o,l,5,1);u.translate(0,l/2,0),a.push(St(u,It(m,0,p),n.clone().multiplyScalar(.85+e()*.3)));for(let x=0;x<2;x++){const M=new At(.11*o,.034*o,2,1);M.translate(.055*o,0,0),M.rotateX(-Math.PI/2),a.push(St(M,go(m,l*(.22+x*.22),p,x*Math.PI+e()*2,.35),n.clone().multiplyScalar(1.1+e()*.2)))}const v=6;for(let x=0;x<v;x++){const M=new es(1,8);M.scale(.034*o,.062*o,1),M.translate(0,.064*o,0),M.rotateX(-Math.PI/2),a.push(St(M,go(m,l,p,x/v*Math.PI*2,-.5),c.clone().multiplyScalar(.92+e()*.16),f=>1))}a.push(St(new xt(.022*o,7,5),It(m,l+.01*o,p),new G(14262813)))}return Hs(t,a,Xs(),!1),t}function Ar(o,t,e,s,n,a){const r=[],l=[],c=[],h=new G;for(let m=0;m<=4;m++){const p=m/4,u=t*(1-p*.9)/2,v=e*p*p,x=s*p*p;if(r.push(v-u,p*o,x,v+u,p*o,x),h.copy(n).lerp(a,p),l.push(h.r,h.g,h.b,h.r,h.g,h.b),m>0){const M=(m-1)*2;c.push(M,M+2,M+1,M+1,M+2,M+3)}}const d=new Ot;return d.setAttribute("position",new gt(r,3)),d.setAttribute("color",new gt(l,3)),d.setIndex(c),d.computeVertexNormals(),d}function Uc(o=1){const t=new vt,e=Yt(Math.floor(o*4111)+3),s=[],n=new G(10203735),a=new G(4153392);for(let i=0;i<9;i++){const r=(.7+e()*1)*o,l=e()*Math.PI*2,c=Math.sqrt(e())*.28*o,h=Ar(r,(.05+e()*.035)*o,(e()-.5)*.55*o,(e()-.5)*.55*o,a.clone().multiplyScalar(.85+e()*.3),n.clone().multiplyScalar(.85+e()*.3));if(h.applyMatrix4(It(Math.cos(l)*c,0,Math.sin(l)*c,1,1,1,0,e()*Math.PI*2,0)),s.push(h),e()>.68){const d=r*(.8+e()*.15),m=new Rt(.006*o,.01*o,d,4,1);m.translate(0,d/2,0),s.push(St(m,It(Math.cos(l)*c,0,Math.sin(l)*c),a.clone().multiplyScalar(1.2)));const p=new Rt(.022*o,.022*o,.14*o,7,1);p.translate(0,.07*o,0),s.push(St(p,It(Math.cos(l)*c,d*.96,Math.sin(l)*c),new G(5913122)))}}return Hs(t,s,Xs(),!1),t}function Oc(o=1){const t=Yt(Math.floor(o*2027)+11),e=(1.8+t()*1.4)*o,s=(.17+t()*.06)*o,n=new G(5652526),a=[],i=js(e,s*1.05,s*.85,n,0);i.rotateZ(-Math.PI/2),i.translate(-e/2,s*.82,0),a.push(i);const r=new es(s*.85,14);a.push(St(r,It(e/2+.002,s*.82,0,1,1,1,0,Math.PI/2,0),new G(12096874)));const l=new ua(s*.35,s*.4,14);a.push(St(l,It(e/2+.004,s*.82,0,1,1,1,0,Math.PI/2,0),new G(9070660)));for(let m=0;m<2;m++){const p=new Rt(s*.12,s*.2,s*1.1,6,1);p.translate(0,s*.55,0),a.push(St(p,It((t()-.5)*e*.6,s*1.3,(t()>.5?1:-1)*s*.5,1,1,1,(t()-.5)*.7,0,(t()-.5)*.8),n.clone().multiplyScalar(.9)))}const c=new G(5075768);for(let m=0;m<4;m++){const p=s*(.35+t()*.3);a.push(St(Mr(Math.floor(t()*3)+1,1,.3),It((t()-.5)*e*.8,s*1.62,(t()-.5)*s*.8,p*1.3,p*.45,p),c.clone().multiplyScalar(.8+t()*.4),(u,v)=>.75+.25*$.clamp(.5+.5*v,0,1)))}const h=Xt(a,!1),d=new K(h,Xs());return d.rotation.y=t()*Math.PI,d.castShadow=!0,d.receiveShadow=!0,d}const Pn=new Map;function _r(o){let t=Pn.get(o);if(!t){const e=new ma(1,o);e.deleteAttribute("normal"),e.deleteAttribute("uv"),t=He(e,1e-4),e.dispose(),Pn.set(o,t)}return t}function Dn(o,t){const e=_r(t.detail).clone(),s=e.attributes.position,n=[];for(let p=0;p<t.cuts;p++){const u=new C(o()-.5,o()*1.1-.3,o()-.5).normalize();n.push({n:u,d:.6+o()*.22})}const a=new C((o()-.5)*.55,1,(o()-.5)*.55).normalize(),i=3.2+o()*2.2,r=o()*4,l=new C,c=-.56;for(let p=0;p<s.count;p++){l.fromBufferAttribute(s,p),l.multiplyScalar(1+mo(l.x*1.4,l.y*1.4,l.z*1.4,t.seed)*.2);for(const w of n){const y=l.dot(w.n);y>w.d&&l.addScaledVector(w.n,w.d-y)}const v=l.dot(a)*i+r,x=v-Math.floor(v),g=1+(Math.floor(v)+$.smoothstep(x,.62,1)-v)/i*.55*t.strata;l.x*=g,l.z*=g,l.multiplyScalar(1+mo(l.x*7,l.y*7,l.z*7,t.seed+5)*.035),l.y<c&&(l.y=c),s.setXYZ(p,l.x*t.rx,(l.y-c)*t.ry,l.z*t.rz)}e.computeVertexNormals();const h=e.attributes.normal,d=new Float32Array(s.count*3),m=new Float32Array(s.count*2);for(let p=0;p<s.count;p++){const u=.9+.2*(.5+mo(s.getX(p)*5,s.getY(p)*5,s.getZ(p)*5,t.seed+9));d[p*3]=t.tone.r*u,d[p*3+1]=t.tone.g*u,d[p*3+2]=t.tone.b*u;const v=Math.abs(h.getX(p)),x=Math.abs(h.getY(p)),M=Math.abs(h.getZ(p));x>=v&&x>=M?(m[p*2]=s.getX(p),m[p*2+1]=s.getZ(p)):v>=M?(m[p*2]=s.getZ(p),m[p*2+1]=s.getY(p)):(m[p*2]=s.getX(p),m[p*2+1]=s.getY(p))}return e.setAttribute("color",new ct(d,3)),e.setAttribute("uv",new ct(m,2)),e}function Bc(o=1){const t=Yt(Math.floor(o*9973)+17),e=[],s=new G().setHSL(.09+(t()-.5)*.08,.04+t()*.05,.86+(t()-.5)*.12),n=1+Math.floor(t()*2.4);for(let l=0;l<n;l++){const c=(l===0?.55:.2+t()*.22)*o,h=t()*Math.PI*2,d=l===0?0:(.55+t()*.3)*o,m=Dn(t,{detail:l===0?6:4,seed:11+l*5+Math.floor(t()*40),rx:c*(1.05+t()*.25),ry:c*(.82+t()*.3),rz:c*(.9+t()*.25),cuts:4+Math.floor(t()*4),strata:.6+t()*.5,tone:s.clone().offsetHSL(0,0,(t()-.5)*.07)}),p=new st().compose(new C(Math.cos(h)*d,0,Math.sin(h)*d),new Ie().setFromEuler(new os(l===0?0:(t()-.5)*.2,t()*6.28,l===0?0:(t()-.5)*.2)),new C(1,1,1));m.applyMatrix4(p),e.push(m)}const a=2+Math.floor(t()*3);for(let l=0;l<a;l++){const c=(.05+t()*.06)*o,h=t()*Math.PI*2,d=(.6+t()*.5)*o,m=Dn(t,{detail:2,seed:40+l,rx:c*1.2,ry:c*.8,rz:c,cuts:3,strata:.2,tone:s.clone().offsetHSL(0,0,(t()-.5)*.1)});m.rotateY(t()*6.28),m.translate(Math.cos(h)*d,0,Math.sin(h)*d),e.push(m)}const i=Xt(e,!1);for(const l of e)l.dispose();const r=new K(i,ar());return r.castShadow=!0,r.receiveShadow=!0,r}function Gc(o){const t=new vt,e=new G(9210756),s=[],n=(h,d,m=e,p=1,u=1,v=1)=>{s.push(St(h,It(0,d,0,p,u,v),m,(x,M)=>.78+.22*$.clamp(.5+.5*M,0,1)))};n(new Se(.46,.14,.46,1,.03),.07),n(new Rt(.075,.1,.62,10),.45),n(new Se(.34,.08,.34,1,.025),.8);for(const[h,d]of[[-.13,-.13],[.13,-.13],[-.13,.13],[.13,.13]])s.push(St(new xo(.045,.34,.045),It(h,1.02,d),e.clone().multiplyScalar(.9)));n(new Se(.4,.07,.4,1,.025),1.22);const a=new Qe(.34,.24,4,1);s.push(St(a,It(0,1.38,0,1,1,1,0,Math.PI/4,0),e.clone().multiplyScalar(.85))),n(new xt(.05,10,8),1.55);const i=new K(Xt(s,!1),Ea(.9,"lantern"));i.castShadow=!0,i.receiveShadow=!0;const r=C0(o,.9),l=new K(new xo(.2,.3,.2),r);l.position.y=1.02;const c=new fa(o,.8,6);return c.position.y=1.05,t.add(i,l,c),t}function Wc(){const o=[],t=new Rt(.004,.006,.26,4,1);t.translate(0,.13,0),o.push(St(t,It(0,0,0),new G(.2,.34,.12)));for(let s=0;s<6;s++){const n=new es(1,7);n.scale(.022,.044,1),n.translate(0,.046,0),n.rotateX(-Math.PI/2),o.push(St(n,go(0,.27,0,s/6*Math.PI*2,-.45),new G(1,1,1)))}o.push(St(new xt(.014,6,5),It(0,.275,0),new G(1,.82,.25)));const e=new At(.07,.022,2,1);return e.translate(.035,0,0),e.rotateX(-Math.PI/2),o.push(St(e,go(0,.07,0,.6,.4),new G(.22,.4,.14))),o.push(St(e,go(0,.1,0,3.5,.4),new G(.22,.4,.14))),Xt(o,!1)}function Ia(o,t,e=26){const s=Yt(o),n=[];for(let a=0;a<e;a++){const i=new C(s()-.5,s()*.7-.1,s()-.5).normalize();n.push(kr(i.multiplyScalar(t*(.35+s()*.65)),t*(.7+s()*.5),s,i.y))}return n}function Vc(o,t,e){const s=Ia(o,t,e),n=Xt(s,!1);for(const a of s)a.dispose();return n}function Hc(o=1,t="high"){const e=Tr(o,t);e.updateMatrixWorld(!0);const s=[];return e.traverse(n=>{const a=n;if(!a.isMesh)return;const i=a.geometry.clone();i.applyMatrix4(a.matrixWorld),s.push({geometry:i,material:a.material}),a.geometry.dispose()}),s}const ie={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class pe{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Pr=new Mi(-1,1,1,-1,0,1);class Dr extends Ot{constructor(){super(),this.setAttribute("position",new gt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new gt([0,2,0,0,2,0],2))}}const Rr=new Dr;class Le{constructor(t){this._mesh=new K(Rr,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Pr)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Ys extends pe{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof wt?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Nt.clone(t.uniforms),this.material=new wt({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Le(this.material)}render(t,e,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Rn extends pe{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,s){const n=t.getContext(),a=t.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let i,r;this.inverse?(i=0,r=1):(i=1,r=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),a.buffers.stencil.setFunc(n.ALWAYS,i,4294967295),a.buffers.stencil.setClear(r),a.buffers.stencil.setLocked(!0),t.setRenderTarget(s),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(n.EQUAL,1,4294967295),a.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),a.buffers.stencil.setLocked(!0)}}class Cr extends pe{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Er{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const s=t.getSize(new ut);this._width=s.width,this._height=s.height,e=new zt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Wt}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ys(ie),this.copyPass.material.blending=yt,this.timer=new yi}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let s=!1;for(let n=0,a=this.passes.length;n<a;n++){const i=this.passes[n];if(i.enabled!==!1){if(i.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),i.render(this.renderer,this.writeBuffer,this.readBuffer,t,s),i.needsSwap){if(s){const r=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}Rn!==void 0&&(i instanceof Rn?s=!0:i instanceof Cr&&(s=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ut);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const s=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(s,n),this.renderTarget2.setSize(s,n);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(s,n)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Nr extends pe{constructor(t,e,s=null,n=null,a=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=s,this.clearColor=n,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new G}render(t,e,s){const n=t.autoClear;t.autoClear=!1;let a,i;this.overrideMaterial!==null&&(i=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(a=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=i),t.autoClear=n}}const zr={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new G(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Xe extends pe{constructor(t,e=1,s,n){super(),this.strength=e,this.radius=s,this.threshold=n,this.resolution=t!==void 0?new ut(t.x,t.y):new ut(256,256),this.clearColor=new G(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);this.renderTargetBright=new zt(a,i,{type:Wt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new zt(a,i,{type:Wt});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const m=new zt(a,i,{type:Wt});m.texture.name="UnrealBloomPass.v"+h,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),a=Math.round(a/2),i=Math.round(i/2)}const r=zr;this.highPassUniforms=Nt.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new wt({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];a=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ut(1/a,1/i),a=Math.round(a/2),i=Math.round(i/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Nt.clone(ie.uniforms),this.blendMaterial=new wt({uniforms:this.copyUniforms,vertexShader:ie.vertexShader,fragmentShader:ie.fragmentShader,premultipliedAlpha:!0,blending:bi,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new G,this._oldClearAlpha=1,this._basic=new wo,this._fsQuad=new Le(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let s=Math.round(t/2),n=Math.round(e/2);this.renderTargetBright.setSize(s,n);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(s,n),this.renderTargetsVertical[a].setSize(s,n),this.separableBlurMaterials[a].uniforms.invSize.value=new ut(1/s,1/n),s=Math.round(s/2),n=Math.round(n/2)}render(t,e,s,n,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const i=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=s.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let r=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[l].uniforms.direction.value=Xe.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Xe.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),r=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(s),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=i}_getSeparableBlurMaterial(t){const e=[],s=t/3;for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(s*s))/s);return new wt({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new ut(.5,.5)},direction:{value:new ut(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`

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

				}`})}}Xe.BlurDirectionX=new ut(1,0);Xe.BlurDirectionY=new ut(0,1);const oe={defines:{MAX_STEP:0,PERSPECTIVE_CAMERA:!0,DISTANCE_ATTENUATION:!0,FRESNEL:!0,INFINITE_THICK:!1,SELECTIVE:!1},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tMetalness:{value:null},tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new ut},cameraProjectionMatrix:{value:new st},cameraInverseProjectionMatrix:{value:new st},opacity:{value:.5},maxDistance:{value:180},cameraRange:{value:0},thickness:{value:.018}},vertexShader:`

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
	`},Eo={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`

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

	`},ve={uniforms:{tDiffuse:{value:null},resolution:{value:new ut},opacity:{value:.5}},vertexShader:`

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
	`};class he extends pe{constructor({renderer:t,scene:e,camera:s,width:n=512,height:a=512,selects:i=null,bouncing:r=!1,groundReflector:l=null}){super(),this.width=n,this.height=a,this.clear=!0,this.renderer=t,this.scene=e,this.camera=s,this.groundReflector=l,this.opacity=oe.uniforms.opacity.value,this.output=0,this.maxDistance=oe.uniforms.maxDistance.value,this.thickness=oe.uniforms.thickness.value,this.tempColor=new G,this._selects=i,this._resolutionScale=1,this.selective=Array.isArray(this._selects),Object.defineProperty(this,"selects",{get(){return this._selects},set(h){this._selects!==h&&(this._selects=h,Array.isArray(h)?(this.selective=!0,this.ssrMaterial.defines.SELECTIVE=!0,this.ssrMaterial.needsUpdate=!0):(this.selective=!1,this.ssrMaterial.defines.SELECTIVE=!1,this.ssrMaterial.needsUpdate=!0))}}),this._bouncing=r,Object.defineProperty(this,"bouncing",{get(){return this._bouncing},set(h){this._bouncing!==h&&(this._bouncing=h,h?this.ssrMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture:this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture)}}),this.blur=!0,this._distanceAttenuation=oe.defines.DISTANCE_ATTENUATION,Object.defineProperty(this,"distanceAttenuation",{get(){return this._distanceAttenuation},set(h){this._distanceAttenuation!==h&&(this._distanceAttenuation=h,this.ssrMaterial.defines.DISTANCE_ATTENUATION=h,this.ssrMaterial.needsUpdate=!0)}}),this._fresnel=oe.defines.FRESNEL,Object.defineProperty(this,"fresnel",{get(){return this._fresnel},set(h){this._fresnel!==h&&(this._fresnel=h,this.ssrMaterial.defines.FRESNEL=h,this.ssrMaterial.needsUpdate=!0)}}),this._infiniteThick=oe.defines.INFINITE_THICK,Object.defineProperty(this,"infiniteThick",{get(){return this._infiniteThick},set(h){this._infiniteThick!==h&&(this._infiniteThick=h,this.ssrMaterial.defines.INFINITE_THICK=h,this.ssrMaterial.needsUpdate=!0)}});const c=new Ls;c.type=Si,c.minFilter=Lt,c.magFilter=Lt,this.beautyRenderTarget=new zt(this.width,this.height,{minFilter:Lt,magFilter:Lt,type:Wt,depthTexture:c,depthBuffer:!0}),this.prevRenderTarget=new zt(this.width,this.height,{minFilter:Lt,magFilter:Lt}),this.normalRenderTarget=new zt(this.width,this.height,{minFilter:Lt,magFilter:Lt,type:Wt}),this.metalnessRenderTarget=new zt(this.width,this.height,{minFilter:Lt,magFilter:Lt,type:Wt}),this.ssrRenderTarget=new zt(this.width,this.height,{minFilter:Lt,magFilter:Lt}),this.blurRenderTarget=this.ssrRenderTarget.clone(),this.blurRenderTarget2=this.ssrRenderTarget.clone(),this.ssrMaterial=new wt({defines:Object.assign({},oe.defines,{MAX_STEP:Math.sqrt(this.width*this.width+this.height*this.height)}),uniforms:Nt.clone(oe.uniforms),vertexShader:oe.vertexShader,fragmentShader:oe.fragmentShader,blending:yt}),this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.ssrMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssrMaterial.defines.SELECTIVE=this.selective,this.ssrMaterial.needsUpdate=!0,this.ssrMaterial.uniforms.tMetalness.value=this.metalnessRenderTarget.texture,this.ssrMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.ssrMaterial.uniforms.cameraNear.value=this.camera.near,this.ssrMaterial.uniforms.cameraFar.value=this.camera.far,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.ssrMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new pa,this.normalMaterial.blending=yt,this.metalnessOnMaterial=new wo({color:"white"}),this.metalnessOffMaterial=new wo({color:"black"}),this.blurMaterial=new wt({defines:Object.assign({},ve.defines),uniforms:Nt.clone(ve.uniforms),vertexShader:ve.vertexShader,fragmentShader:ve.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.blurMaterial2=new wt({defines:Object.assign({},ve.defines),uniforms:Nt.clone(ve.uniforms),vertexShader:ve.vertexShader,fragmentShader:ve.fragmentShader}),this.blurMaterial2.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.blurMaterial2.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new wt({defines:Object.assign({},Eo.defines),uniforms:Nt.clone(Eo.uniforms),vertexShader:Eo.vertexShader,fragmentShader:Eo.fragmentShader,blending:yt}),this.depthRenderMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new wt({uniforms:Nt.clone(ie.uniforms),vertexShader:ie.vertexShader,fragmentShader:ie.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:en,blendDst:tn,blendEquation:Ge,blendSrcAlpha:en,blendDstAlpha:tn,blendEquationAlpha:Ge}),this.fsQuad=new Le(null),this.originalClearColor=new G}get resolutionScale(){return this._resolutionScale}set resolutionScale(t){this._resolutionScale=t,this.setSize(this.width,this.height)}dispose(){this.beautyRenderTarget.dispose(),this.prevRenderTarget.dispose(),this.normalRenderTarget.dispose(),this.metalnessRenderTarget.dispose(),this.ssrRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.blurRenderTarget2.dispose(),this.normalMaterial.dispose(),this.metalnessOnMaterial.dispose(),this.metalnessOffMaterial.dispose(),this.blurMaterial.dispose(),this.blurMaterial2.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(t,e){switch(t.setRenderTarget(this.beautyRenderTarget),t.clear(),this.groundReflector&&(this.groundReflector.visible=!1,this.groundReflector.doRender(this.renderer,this.scene,this.camera),this.groundReflector.visible=!0),t.render(this.scene,this.camera),this.groundReflector&&(this.groundReflector.visible=!1),this._renderOverride(t,this.normalMaterial,this.normalRenderTarget,0,0),this.selective&&this._renderMetalness(t,this.metalnessOnMaterial,this.metalnessRenderTarget,0,0),this.ssrMaterial.uniforms.opacity.value=this.opacity,this.ssrMaterial.uniforms.maxDistance.value=this.maxDistance,this.ssrMaterial.uniforms.thickness.value=this.thickness,this._renderPass(t,this.ssrMaterial,this.ssrRenderTarget),this.blur&&(this._renderPass(t,this.blurMaterial,this.blurRenderTarget),this._renderPass(t,this.blurMaterial2,this.blurRenderTarget2)),this.output){case he.OUTPUT.Default:this.bouncing?(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.prevRenderTarget),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=fs,this._renderPass(t,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e)):(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=fs,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e));break;case he.OUTPUT.SSR:this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.bouncing&&(this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=fs,this._renderPass(t,this.copyMaterial,this.prevRenderTarget));break;case he.OUTPUT.Beauty:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case he.OUTPUT.Depth:this._renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case he.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case he.OUTPUT.Metalness:this.copyMaterial.uniforms.tDiffuse.value=this.metalnessRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.SSRPass: Unknown output type.")}}setSize(t,e){this.width=t,this.height=e;const s=Math.round(this.resolutionScale*t),n=Math.round(this.resolutionScale*e);this.ssrMaterial.defines.MAX_STEP=Math.sqrt(s*s+n*n),this.ssrMaterial.needsUpdate=!0,this.beautyRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.metalnessRenderTarget.setSize(t,e),this.ssrRenderTarget.setSize(s,n),this.prevRenderTarget.setSize(s,n),this.blurRenderTarget.setSize(s,n),this.blurRenderTarget2.setSize(s,n),this.ssrMaterial.uniforms.resolution.value.set(s,n),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(s,n),this.blurMaterial2.uniforms.resolution.value.set(s,n)}_renderPass(t,e,s,n,a){this.originalClearColor.copy(t.getClearColor(this.tempColor));const i=t.getClearAlpha(this.tempColor),r=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this.fsQuad.material=e,this.fsQuad.render(t),t.autoClear=r,t.setClearColor(this.originalClearColor),t.setClearAlpha(i)}_renderOverride(t,e,s,n,a){this.originalClearColor.copy(t.getClearColor(this.tempColor));const i=t.getClearAlpha(this.tempColor),r=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,n=e.clearColor||n,a=e.clearAlpha||a,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=r,t.setClearColor(this.originalClearColor),t.setClearAlpha(i)}_renderMetalness(t,e,s,n,a){this.originalClearColor.copy(t.getClearColor(this.tempColor));const i=t.getClearAlpha(this.tempColor),r=t.autoClear,l=this.scene.background,c=this.scene.fog;t.setRenderTarget(s),t.autoClear=!1,this.scene.background=null,this.scene.fog=null,n=e.clearColor||n,a=e.clearAlpha||a,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this.scene.traverseVisible(h=>{h._SSRPassBackupMaterial=h.material,this._selects.includes(h)?h.material=this.metalnessOnMaterial:h.material=this.metalnessOffMaterial}),t.render(this.scene,this.camera),this.scene.traverseVisible(h=>{h.material=h._SSRPassBackupMaterial}),t.autoClear=r,t.setClearColor(this.originalClearColor),t.setClearAlpha(i),this.scene.background=l,this.scene.fog=c}}he.OUTPUT={Default:0,SSR:1,Beauty:3,Depth:4,Normal:5,Metalness:7};class Ir extends pe{constructor(e,s){super();I(this,"history",new zt(1,1,{type:Wt,depthBuffer:!1}));I(this,"copy",new wt({uniforms:{tex:{value:this.history.texture}},vertexShader:Cn,fragmentShader:"uniform sampler2D tex;varying vec2 vUv;void main(){gl_FragColor=vec4(texture2D(tex,vUv).rgb,1.0);}"}));I(this,"resolve",new wt({uniforms:{current:{value:null},history:{value:this.history.texture},depth:{value:null},inverseVP:{value:new st},previousVP:{value:new st},resolution:{value:new ut(1,1)},valid:{value:0}},vertexShader:Cn,fragmentShader:`
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
    }`}));I(this,"quad",new Le(this.resolve));I(this,"resolved",new zt(1,1,{type:Wt,depthBuffer:!1}));I(this,"vp",new st);I(this,"previousPosition",new C(1/0,0,0));I(this,"previousRotation",new Ie);I(this,"frame",0);this.camera=e,this.depthSource=s}setSize(e,s){this.history.setSize(e,s),this.resolved.setSize(e,s),this.resolve.uniforms.resolution.value.set(e,s),this.reset()}reset(){this.resolve.uniforms.valid.value=0,this.frame=0}jitter(e,s){const n=this.frame++%8+1;this.camera.setViewOffset(e,s,En(n,2)-.5,En(n,3)-.5,e,s)}render(e,s,n){this.camera.updateMatrixWorld(),this.vp.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),(this.previousPosition.distanceToSquared(this.camera.position)>9||this.previousRotation.angleTo(this.camera.quaternion)>.35)&&this.reset();const a=this.resolve.uniforms;a.current.value=n.texture,a.depth.value=this.depthSource(),a.inverseVP.value.copy(this.vp).invert(),this.quad.material=this.resolve,e.setRenderTarget(this.resolved),this.quad.render(e);const i=this.history;this.history=this.resolved,this.resolved=i,a.history.value=this.history.texture,this.copy.uniforms.tex.value=this.history.texture,this.quad.material=this.copy,e.setRenderTarget(this.renderToScreen?null:s),this.quad.render(e),a.previousVP.value.copy(this.vp),a.valid.value=1,this.previousPosition.copy(this.camera.position),this.previousRotation.copy(this.camera.quaternion),this.camera.clearViewOffset()}dispose(){this.history.dispose(),this.resolved.dispose(),this.copy.dispose(),this.resolve.dispose(),this.quad.dispose()}}const Cn="varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}";function En(o,t){let e=1,s=0;for(;o>0;)e/=t,s+=e*(o%t),o=Math.floor(o/t);return s}const No={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Fr extends pe{constructor(){super(),this.isOutputPass=!0,this.uniforms=Nt.clone(No.uniforms),this.material=new ki({name:No.name,uniforms:this.uniforms,vertexShader:No.vertexShader,fragmentShader:No.fragmentShader}),this._fsQuad=new Le(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Ti.getTransfer(this._outputColorSpace)===Ai&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===_i?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Pi?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Di?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ri?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ci?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ei?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Ni&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Lr extends Fr{constructor(){super(...arguments);I(this,"meter",new zt(1,1,{depthBuffer:!1}));I(this,"mat",new wt({uniforms:{tex:{value:null}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:"uniform sampler2D tex;void main(){float l=0.0;for(int x=0;x<4;x++)for(int y=0;y<4;y++){vec3 c=texture2D(tex,(vec2(float(x),float(y))+.5)/4.0).rgb;l+=log2(max(.0001,dot(c,vec3(.2126,.7152,.0722))));}gl_FragColor=vec4(clamp((l/16.0+12.0)/24.0,0.0,1.0),0.0,0.0,1.0);}"}));I(this,"quad",new Le(this.mat));I(this,"counter",0);I(this,"luminance",.22);I(this,"exposure",1);I(this,"pending",!1);I(this,"alive",!0)}render(e,s,n,a){if(this.counter++%24===0&&!this.pending){this.mat.uniforms.tex.value=n.texture,e.setRenderTarget(this.meter),this.quad.render(e);const r=new Uint8Array(4);this.pending=!0,e.readRenderTargetPixelsAsync(this.meter,0,0,1,1,r).then(()=>{this.alive&&(this.luminance=Math.pow(2,r[0]/255*24-12))}).catch(()=>{}).finally(()=>{this.pending=!1})}this.exposure=Qi(this.exposure,this.luminance,a||1/60);const i=e.toneMappingExposure;e.toneMappingExposure=i*this.exposure;try{super.render(e,s,n,a,!1)}finally{e.toneMappingExposure=i}}dispose(){this.alive=!1,this.meter.dispose(),this.mat.dispose(),this.quad.dispose(),super.dispose()}}function Ur(o,t,e){const s=new Ys({uniforms:{tDiffuse:{value:null},tDepth:{value:null},inverseProjection:{value:o.projectionMatrixInverse},cameraWorld:{value:o.matrixWorld},eye:{value:o.position},sun:{value:new C(.4,.7,-.4).normalize()},fogColor:{value:new G(.45,.62,.8)},density:{value:8e-4}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:`uniform sampler2D tDiffuse,tDepth;uniform mat4 inverseProjection,cameraWorld;uniform vec3 eye,sun,fogColor;uniform float density;varying vec2 vUv;
    void main(){vec3 c=texture2D(tDiffuse,vUv).rgb;float z=texture2D(tDepth,vUv).r;
      vec4 p=inverseProjection*vec4(vUv*2.0-1.0,z*2.0-1.0,1.0);p/=p.w;
      vec3 end=(cameraWorld*p).xyz;vec3 ray=end-eye;float distance_=min(length(ray),450.0);vec3 direction=normalize(ray);
      float optical=0.0;for(int i=0;i<8;i++){vec3 s=eye+direction*distance_*(float(i)+.5)/8.0;optical+=exp(-max(s.y,0.0)/32.0)*distance_/8.0;}
      float extinction=1.0-exp(-optical*density);float mu=dot(direction,sun);float g=.72;
      float phase=(1.0-g*g)/pow(max(.05,1.0+g*g-2.0*g*mu),1.5);
      vec3 scatter=fogColor*(.7+.18*min(phase,6.0));
      if(z>.99999)extinction*=.2;
      gl_FragColor=vec4(mix(c,scatter,clamp(extinction,0.0,.65)),1.0);
    }`}),n=s.render.bind(s);return s.render=(a,i,r,l,c)=>{s.uniforms.tDepth.value=e();const h=t.fog;h&&(s.uniforms.fogColor.value.copy(h.color),s.uniforms.density.value=Math.min(.004,h.density*.22)),n(a,i,r,l,c)},s}const zo={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ut},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new st},cameraProjectionMatrixInverse:{value:new st},cameraWorldMatrix:{value:new st},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new C(-1,-1,-1)},sceneBoxMax:{value:new C(1,1,1)}},vertexShader:`

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

		}`},bs={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function Or(o=5){const t=Math.floor(o)%2===0?Math.floor(o)+1:Math.floor(o),e=Br(t),s=e.length,n=new Uint8Array(s*4);for(let i=0;i<s;++i){const r=e[i],l=2*Math.PI*r/s,c=new C(Math.cos(l),Math.sin(l),0).normalize();n[i*4]=(c.x*.5+.5)*255,n[i*4+1]=(c.y*.5+.5)*255,n[i*4+2]=127,n[i*4+3]=255}const a=new qe(n,t,t);return a.wrapS=me,a.wrapT=me,a.needsUpdate=!0,a}function Br(o){const t=Math.floor(o)%2===0?Math.floor(o)+1:Math.floor(o),e=t*t,s=Array(e).fill(0);let n=Math.floor(t/2),a=t-1;for(let i=1;i<=e;){if(n===-1&&a===t?(a=t-2,n=0):(a===t&&(a=0),n<0&&(n=t-1)),s[n*t+a]!==0){a-=2,n++;continue}else s[n*t+a]=i++;a++,n--}return s}const Fo={defines:{SAMPLES:16,SAMPLE_VECTORS:Fa(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ut},cameraProjectionMatrixInverse:{value:new st},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Fa(o,t,e){const s=Gr(o,t,e);let n="vec3[SAMPLES](";for(let a=0;a<o;a++){const i=s[a];n+=`vec3(${i.x}, ${i.y}, ${i.z})${a<o-1?",":")"}`}return n}function Gr(o,t,e){const s=[];for(let n=0;n<o;n++){const a=2*Math.PI*t*n/o,i=Math.pow(n/(o-1),e);s.push(new C(Math.cos(a),Math.sin(a),i))}return s}class Wr{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(t.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(t,e){let s,n,a;const i=.5*(Math.sqrt(3)-1),r=(t+e)*i,l=Math.floor(t+r),c=Math.floor(e+r),h=(3-Math.sqrt(3))/6,d=(l+c)*h,m=l-d,p=c-d,u=t-m,v=e-p;let x,M;u>v?(x=1,M=0):(x=0,M=1);const f=u-x+h,g=v-M+h,w=u-1+2*h,y=v-1+2*h,S=l&255,k=c&255,b=this.perm[S+this.perm[k]]%12,T=this.perm[S+x+this.perm[k+M]]%12,A=this.perm[S+1+this.perm[k+1]]%12;let _=.5-u*u-v*v;_<0?s=0:(_*=_,s=_*_*this._dot(this.grad3[b],u,v));let P=.5-f*f-g*g;P<0?n=0:(P*=P,n=P*P*this._dot(this.grad3[T],f,g));let D=.5-w*w-y*y;return D<0?a=0:(D*=D,a=D*D*this._dot(this.grad3[A],w,y)),70*(s+n+a)}noise3d(t,e,s){let n,a,i,r;const c=(t+e+s)*.3333333333333333,h=Math.floor(t+c),d=Math.floor(e+c),m=Math.floor(s+c),p=1/6,u=(h+d+m)*p,v=h-u,x=d-u,M=m-u,f=t-v,g=e-x,w=s-M;let y,S,k,b,T,A;f>=g?g>=w?(y=1,S=0,k=0,b=1,T=1,A=0):f>=w?(y=1,S=0,k=0,b=1,T=0,A=1):(y=0,S=0,k=1,b=1,T=0,A=1):g<w?(y=0,S=0,k=1,b=0,T=1,A=1):f<w?(y=0,S=1,k=0,b=0,T=1,A=1):(y=0,S=1,k=0,b=1,T=1,A=0);const _=f-y+p,P=g-S+p,D=w-k+p,R=f-b+2*p,N=g-T+2*p,z=w-A+2*p,F=f-1+3*p,W=g-1+3*p,U=w-1+3*p,V=h&255,B=d&255,X=m&255,H=this.perm[V+this.perm[B+this.perm[X]]]%12,tt=this.perm[V+y+this.perm[B+S+this.perm[X+k]]]%12,dt=this.perm[V+b+this.perm[B+T+this.perm[X+A]]]%12,pt=this.perm[V+1+this.perm[B+1+this.perm[X+1]]]%12;let q=.6-f*f-g*g-w*w;q<0?n=0:(q*=q,n=q*q*this._dot3(this.grad3[H],f,g,w));let et=.6-_*_-P*P-D*D;et<0?a=0:(et*=et,a=et*et*this._dot3(this.grad3[tt],_,P,D));let lt=.6-R*R-N*N-z*z;lt<0?i=0:(lt*=lt,i=lt*lt*this._dot3(this.grad3[dt],R,N,z));let nt=.6-F*F-W*W-U*U;return nt<0?r=0:(nt*=nt,r=nt*nt*this._dot3(this.grad3[pt],F,W,U)),32*(n+a+i+r)}noise4d(t,e,s,n){const a=this.grad4,i=this.simplex,r=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let h,d,m,p,u;const v=(t+e+s+n)*l,x=Math.floor(t+v),M=Math.floor(e+v),f=Math.floor(s+v),g=Math.floor(n+v),w=(x+M+f+g)*c,y=x-w,S=M-w,k=f-w,b=g-w,T=t-y,A=e-S,_=s-k,P=n-b,D=T>A?32:0,R=T>_?16:0,N=A>_?8:0,z=T>P?4:0,F=A>P?2:0,W=_>P?1:0,U=D+R+N+z+F+W,V=i[U][0]>=3?1:0,B=i[U][1]>=3?1:0,X=i[U][2]>=3?1:0,H=i[U][3]>=3?1:0,tt=i[U][0]>=2?1:0,dt=i[U][1]>=2?1:0,pt=i[U][2]>=2?1:0,q=i[U][3]>=2?1:0,et=i[U][0]>=1?1:0,lt=i[U][1]>=1?1:0,nt=i[U][2]>=1?1:0,kt=i[U][3]>=1?1:0,Tt=T-V+c,E=A-B+c,O=_-X+c,j=P-H+c,Y=T-tt+2*c,Mt=A-dt+2*c,Pt=_-pt+2*c,bt=P-q+2*c,Q=T-et+3*c,_t=A-lt+3*c,ee=_-nt+3*c,ge=P-kt+3*c,Te=T-1+4*c,cs=A-1+4*c,hs=_-1+4*c,us=P-1+4*c,Je=x&255,to=M&255,eo=f&255,oo=g&255,ni=r[Je+r[to+r[eo+r[oo]]]]%32,ai=r[Je+V+r[to+B+r[eo+X+r[oo+H]]]]%32,ii=r[Je+tt+r[to+dt+r[eo+pt+r[oo+q]]]]%32,ri=r[Je+et+r[to+lt+r[eo+nt+r[oo+kt]]]]%32,li=r[Je+1+r[to+1+r[eo+1+r[oo+1]]]]%32;let so=.6-T*T-A*A-_*_-P*P;so<0?h=0:(so*=so,h=so*so*this._dot4(a[ni],T,A,_,P));let no=.6-Tt*Tt-E*E-O*O-j*j;no<0?d=0:(no*=no,d=no*no*this._dot4(a[ai],Tt,E,O,j));let ao=.6-Y*Y-Mt*Mt-Pt*Pt-bt*bt;ao<0?m=0:(ao*=ao,m=ao*ao*this._dot4(a[ii],Y,Mt,Pt,bt));let io=.6-Q*Q-_t*_t-ee*ee-ge*ge;io<0?p=0:(io*=io,p=io*io*this._dot4(a[ri],Q,_t,ee,ge));let ro=.6-Te*Te-cs*cs-hs*hs-us*us;return ro<0?u=0:(ro*=ro,u=ro*ro*this._dot4(a[li],Te,cs,hs,us)),27*(h+d+m+p+u)}_dot(t,e,s){return t[0]*e+t[1]*s}_dot3(t,e,s,n){return t[0]*e+t[1]*s+t[2]*n}_dot4(t,e,s,n,a){return t[0]*e+t[1]*s+t[2]*n+t[3]*a}}class Qt extends pe{constructor(t,e,s=512,n=512,a,i,r){super(),this.width=s,this.height=n,this.clear=!0,this.camera=e,this.scene=t,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Or(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new zt(this.width,this.height,{type:Wt}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new wt({defines:Object.assign({},zo.defines),uniforms:Nt.clone(zo.uniforms),vertexShader:zo.vertexShader,fragmentShader:zo.fragmentShader,blending:yt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new pa,this.normalMaterial.blending=yt,this.pdMaterial=new wt({defines:Object.assign({},Fo.defines),uniforms:Nt.clone(Fo.uniforms),vertexShader:Fo.vertexShader,fragmentShader:Fo.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new wt({defines:Object.assign({},Io.defines),uniforms:Nt.clone(Io.uniforms),vertexShader:Io.vertexShader,fragmentShader:Io.fragmentShader,blending:yt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new wt({uniforms:Nt.clone(ie.uniforms),vertexShader:ie.vertexShader,fragmentShader:ie.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:sn,blendDst:_o,blendEquation:Ge,blendSrcAlpha:on,blendDstAlpha:_o,blendEquationAlpha:Ge}),this.blendMaterial=new wt({uniforms:Nt.clone(bs.uniforms),vertexShader:bs.vertexShader,fragmentShader:bs.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:zi,blendSrc:sn,blendDst:_o,blendEquation:Ge,blendSrcAlpha:on,blendDstAlpha:_o,blendEquationAlpha:Ge}),this._fsQuad=new Le(null),this._originalClearColor=new G,this.setGBuffer(a?a.depthTexture:void 0,a?a.normalTexture:void 0),i!==void 0&&this.updateGtaoMaterial(i),r!==void 0&&this.updatePdMaterial(r)}setSize(t,e){this.width=t,this.height=e,this.gtaoRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.pdRenderTarget.setSize(t,e),this.gtaoMaterial.uniforms.resolution.value.set(t,e),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(t,e),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(t,e){t!==void 0?(this.depthTexture=t,this.normalTexture=e,this._renderGBuffer=!1):(this.depthTexture=new Ls,this.depthTexture.format=Ii,this.depthTexture.type=Fi,this.normalRenderTarget=new zt(this.width,this.height,{minFilter:Lt,magFilter:Lt,type:Wt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const s=this.normalTexture?1:0,n=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=s,this.gtaoMaterial.defines.DEPTH_SWIZZLING=n,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=s,this.pdMaterial.defines.DEPTH_SWIZZLING=n,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(t){t?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(t.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(t.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(t){t.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=t.radius),t.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=t.distanceExponent),t.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=t.thickness),t.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=t.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),t.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=t.scale),t.samples!==void 0&&t.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=t.samples,this.gtaoMaterial.needsUpdate=!0),t.screenSpaceRadius!==void 0&&(t.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=t.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(t){let e=!1;t.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=t.lumaPhi),t.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=t.depthPhi),t.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=t.normalPhi),t.radius!==void 0&&t.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=t.radius),t.radiusExponent!==void 0&&t.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=t.radiusExponent,e=!0),t.rings!==void 0&&t.rings!==this.pdRings&&(this.pdRings=t.rings,e=!0),t.samples!==void 0&&t.samples!==this.pdSamples&&(this.pdSamples=t.samples,e=!0),e&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Fa(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,e,s){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case Qt.OUTPUT.Off:break;case Qt.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=s.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Qt.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Qt.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Qt.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case Qt.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Qt.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=s.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(t,this.blendMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(t,e,s,n,a){t.getClearColor(this._originalClearColor);const i=t.getClearAlpha(),r=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this._fsQuad.material=e,this._fsQuad.render(t),t.autoClear=r,t.setClearColor(this._originalClearColor),t.setClearAlpha(i)}_renderOverride(t,e,s,n,a){t.getClearColor(this._originalClearColor);const i=t.getClearAlpha(),r=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,n=e.clearColor||n,a=e.clearAlpha||a,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=r,t.setClearColor(this._originalClearColor),t.setClearAlpha(i)}_overrideVisibility(){const t=this.scene,e=this._visibilityCache;t.traverse(function(s){(s.isPoints||s.isLine||s.isLine2)&&s.visible&&(s.visible=!1,e.push(s))})}_restoreVisibility(){const t=this._visibilityCache;for(let e=0;e<t.length;e++)t[e].visible=!0;t.length=0}_generateNoise(t=64){const e=new Wr,s=t*t*4,n=new Uint8Array(s);for(let i=0;i<t;i++)for(let r=0;r<t;r++){const l=i,c=r;n[(i*t+r)*4]=(e.noise(l,c)*.5+.5)*255,n[(i*t+r)*4+1]=(e.noise(l+t,c)*.5+.5)*255,n[(i*t+r)*4+2]=(e.noise(l,c+t)*.5+.5)*255,n[(i*t+r)*4+3]=(e.noise(l+t,c+t)*.5+.5)*255}const a=new qe(n,t,t,So,ko);return a.wrapS=me,a.wrapT=me,a.needsUpdate=!0,a}}Qt.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const Ks=["fogMul","sunMul","tintAmt","exposure","contrast","saturation","lift","bloom","aberration","scanline","vignette"],Zs=["skyTop","skyMid","skyBot","fog","sun","hemiSky","hemiGround","ambient","shadowTint","highlightTint","dustA","dustB"],xe={fogMul:1,sunMul:1,tintAmt:.14,exposure:1,contrast:1.06,saturation:1.04,lift:.012,bloom:1,aberration:.0016,scanline:.035,vignette:.2},Ss={unit01:{...xe,id:"unit01",label:"数字 · 冰蓝",skyTop:2781104,skyMid:8372708,skyBot:14676984,fog:12575722,sun:15661311,hemiSky:12576501,hemiGround:3493978,ambient:11061718,shadowTint:3123396,highlightTint:15267583,dustA:8382719,dustB:13235199,aberration:.0019,scanline:.05},unit02:{...xe,id:"unit02",label:"传记 · 档案银",skyTop:5929108,skyMid:12174544,skyBot:15392739,fog:13882844,sun:16183796,hemiSky:13818340,hemiGround:5196370,ambient:12106436,shadowTint:7245744,highlightTint:16183026,tintAmt:.12,saturation:.94,contrast:1.08,dustA:13620962,dustB:15319244,scanline:.028},unit03:{...xe,id:"unit03",label:"旅行 · 黎明青",skyTop:3112851,skyMid:9227720,skyBot:15981014,fog:12573910,sun:16773614,hemiSky:11984088,hemiGround:4149062,ambient:10930372,shadowTint:2794392,highlightTint:16773360,tintAmt:.15,saturation:1.08,dustA:9429974,dustB:16752527},unit04:{...xe,id:"unit04",label:"工艺 · 石墨",skyTop:4871779,skyMid:10134443,skyBot:14276306,fog:12172480,sun:15986150,hemiSky:13159634,hemiGround:3881532,ambient:11053485,shadowTint:6256264,highlightTint:15920874,tintAmt:.1,saturation:.92,contrast:1.1,dustA:14275789,dustB:11846360,bloom:1.1,scanline:.03},unit05:{...xe,id:"unit05",label:"航天 · 深靛",skyTop:922176,skyMid:3817359,skyBot:9078472,fog:4869772,sun:14672639,hemiSky:9411032,hemiGround:1841728,ambient:7173048,shadowTint:4870096,highlightTint:15131903,tintAmt:.18,exposure:1.04,fogMul:1.1,dustA:12167423,dustB:14933247,bloom:1.2,aberration:.0021},unit06:{...xe,id:"unit06",label:"经济 · 港湾板岩",skyTop:3429742,skyMid:8362664,skyBot:13621976,fog:11123904,sun:15660274,hemiSky:11059396,hemiGround:3162175,ambient:9414314,shadowTint:2923142,highlightTint:15398130,tintAmt:.15,dustA:5235624,dustB:11060428},memory2090:{...xe,id:"memory2090",label:"2090 · 深蓝夜",skyTop:660008,skyMid:1851488,skyBot:2109512,fog:791588,sun:13623551,hemiSky:6260424,hemiGround:1382431,ambient:4876950,shadowTint:2781104,highlightTint:15003647,tintAmt:.16,exposure:1.02,sunMul:.9,dustA:8369407,dustB:12901631,scanline:.04},neutral:{...xe,id:"neutral",label:"回溯 · 冷白",skyTop:4159416,skyMid:10274020,skyBot:15003378,fog:13031650,sun:16054527,hemiSky:12901104,hemiGround:4214876,ambient:11584210,shadowTint:3903416,highlightTint:15397887,dustA:9425128,dustB:13821682}};function jc(o){return o?Ss[o]??Ss.neutral:Ss.neutral}function Vr(o,t={r:0,g:0,b:0}){return t.r=(o>>16&255)/255,t.g=(o>>8&255)/255,t.b=(o&255)/255,t}function zs(){const o={};for(const t of Ks)o[t]=0;for(const t of Zs)o[t]={r:0,g:0,b:0};return o}function Lo(o,t=zs()){for(const e of Ks)t[e]=o[e];for(const e of Zs)Vr(o[e],t[e]);return t}function Nn(o,t,e,s){for(const n of Ks)s[n]=o[n]+(t[n]-o[n])*e;for(const n of Zs){const a=o[n],i=t[n],r=s[n];r.r=a.r+(i.r-a.r)*e,r.g=a.g+(i.g-a.g)*e,r.b=a.b+(i.b-a.b)*e}return s}const Hr=o=>{const t=o<0?0:o>1?1:o;return t*t*(3-2*t)};class $c{constructor(t){I(this,"current");I(this,"from",zs());I(this,"to",zs());I(this,"elapsed",1);I(this,"duration",1);I(this,"_target");I(this,"version",0);this._target=t,this.current=Lo(t),Lo(t,this.from),Lo(t,this.to)}get target(){return this._target}get settled(){return this.elapsed>=this.duration-1e-6}setTarget(t,e=2){t===this._target&&this.settled||(this._target=t,Nn(this.current,this.current,0,this.from),Lo(t,this.to),this.duration=Math.max(0,e),this.elapsed=0,this.version++,this.duration===0&&this.update(0))}update(t){if(this.settled&&this.duration>0)return this.current;this.elapsed=Math.min(this.duration,this.elapsed+t);const e=this.duration<=0?1:Hr(this.elapsed/this.duration);return Nn(this.from,this.to,e,this.current),this.current}}function zn(o,t){const e=Math.max(.05,o.r*.2126+o.g*.7152+o.b*.0722);return t[0]=o.r/e,t[1]=o.g/e,t[2]=o.b/e,t}const jr={high:{pixelRatio:2,grassRadius:40,grassCell:1.1,shadowMap:2048,bloom:!0,bloomScale:.6},med:{pixelRatio:1.5,grassRadius:34,grassCell:1.5,shadowMap:1536,bloom:!0,bloomScale:.45},low:{pixelRatio:1,grassRadius:26,grassCell:1.9,shadowMap:1024,bloom:!1,bloomScale:.5}};function Xc(){var a;if(typeof window>"u")return"med";const o=((a=window.matchMedia)==null?void 0:a.call(window,"(pointer: coarse)").matches)??!1,t=Math.min(window.innerWidth,window.innerHeight)<540,e=navigator.hardwareConcurrency??4,s=navigator.deviceMemory??4,n=o||t;return n&&(e<=4||s<=3)?"low":n||e<=4||s<=4?"med":"high"}function Yc(o,t,e,s,n={}){const a=jr[s];if(!(!a.bloom&&!n.forceComposer))try{const i=o.getSize(new ut),r=i.x,l=i.y,c=Math.min(window.devicePixelRatio,a.pixelRatio),h=new zt(Math.max(1,Math.floor(r*c)),Math.max(1,Math.floor(l*c)),{type:Wt,samples:0,depthTexture:new Ls(Math.max(1,Math.floor(r*c)),Math.max(1,Math.floor(l*c)),Li)}),d=new Er(o,h),m=new Nr(t,e);let p=null;const u=e instanceof Po?new Ir(e,()=>p):void 0,v=s==="high"&&n.ao!==!1&&e instanceof Po?new he({renderer:o,scene:t,camera:e,width:r,height:l,selects:[],groundReflector:null}):void 0;if(v){v.opacity=.2,v.maxDistance=10,v.thickness=.08,v.resolutionScale=.5,v.ssrMaterial.defines.MAX_STEP=48;const S=m.setSize.bind(m);m.setSize=(b,T)=>{S(b,T),v.setSize(b,T)};const k=m.dispose.bind(m);m.dispose=()=>{v.dispose(),k()}}let x=0,M=[];const f=new C,g=m.render.bind(m);if(m.render=(S,k,b,T,A)=>{u!=null&&u.enabled?u.jitter(b.width,b.height):e instanceof Po&&e.clearViewOffset(),v&&x++%30===0&&(M=[],t.traverse(_=>{const P=_;if(!P.isMesh||(P.getWorldPosition(f),f.distanceToSquared(e.position)>2025))return;(Array.isArray(P.material)?P.material:[P.material]).some(R=>R instanceof at&&R.roughness<.3&&R.metalness>.3)&&M.push(P)}),v.selects=M),v&&M.length?(v.render(S,b,b,T,A),p=v.beautyRenderTarget.depthTexture):(g(S,k,b,T,A),p=b.depthTexture)},d.addPass(m),e instanceof Po&&e.far>200&&d.addPass(Ur(e,t,()=>p)),u&&d.addPass(u),s!=="low"&&n.ao!==!1){const S=new Qt(t,e,r,l),k=S.setSize.bind(S);S.setSize=(b,T)=>k(Math.max(1,Math.floor(b*.5)),Math.max(1,Math.floor(T*.5))),S.output=Qt.OUTPUT.Default,S.blendIntensity=.55,S.updateGtaoMaterial({radius:1.1,distanceExponent:1.4,thickness:2,scale:1.1,samples:12,distanceFallOff:1,screenSpaceRadius:!1}),S.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:5,rings:2,samples:8}),d.addPass(S)}let w;if(a.bloom){const S=a.bloomScale;w=new Xe(new ut(r*S,l*S),.62,.5,.78);const k=w.setSize.bind(w);w.setSize=(b,T)=>k(Math.max(1,Math.floor(b*S)),Math.max(1,Math.floor(T*S))),d.addPass(w)}d.addPass(new Lr);const y=new Ys({uniforms:{tDiffuse:{value:null},uContrast:{value:1.06},uSat:{value:1.04},uLift:{value:.012},uShadow:{value:new C(.7,1.15,1.3)},uHighlight:{value:new C(.96,1,1.05)},uTintAmt:{value:.14},uAberration:{value:.0016},uScan:{value:.035},uVig:{value:.2},uRes:{value:new ut(1280,720)},uTime:{value:0}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
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
        `});return d.addPass(y),d.setPixelRatio(Math.min(window.devicePixelRatio,a.pixelRatio)),d.setSize(r,l),{composer:d,bloomPass:w,gradePass:y}}catch{return}}function Kc(o,t){try{const e=new ui(o),s=new Ui,n=Ji(10);t.sunDir&&n.material.uniforms.sunPosition.value.copy(t.sunDir).multiplyScalar(45e4),n.material.uniforms.showSunDisc.value=!1,s.add(n);const a=e.fromScene(s,.02);return s.traverse(i=>{const r=i;r.isMesh&&(r.geometry.dispose(),r.material.dispose())}),e.dispose(),a}catch{return}}const Uo=[1,1,1],Oo=[1,1,1];function Zc(o,t,e,s,n){const a=o.uniforms;a.uContrast.value=t.contrast,a.uSat.value=t.saturation,a.uLift.value=t.lift,a.uTintAmt.value=t.tintAmt,a.uAberration.value=t.aberration,a.uScan.value=t.scanline,a.uVig.value=t.vignette,a.uTime.value=e,a.uRes.value.set(s,n),zn(t.shadowTint,Uo),zn(t.highlightTint,Oo),a.uShadow.value.set(Uo[0],Uo[1],Uo[2]),a.uHighlight.value.set(Oo[0],Oo[1],Oo[2])}const $r=new st,In=new Ie,Fn=new os,Ln=new C(1,1,1),Un=new C;function La(o,t,e,s=.04){return s<.0075?new xo(o,t,e):new Se(o,t,e,1,Math.min(s,o/2.01,t/2.01,e/2.01))}function Ye(o,t,e,s=16){return new Rt(o,t,e,s,1)}function qc(o,t,e,s=8){const n=new ke;for(let i=0;i<s;i++){const r=(i+.5)/s*Math.PI*2,l=Math.cos(r)*o,c=Math.sin(r)*o;i===0?n.moveTo(l,c):n.lineTo(l,c)}n.closePath();const a=new Fe(n,{depth:Math.max(.001,t-e*2),bevelEnabled:!0,bevelThickness:e,bevelSize:e,bevelSegments:1});return a.rotateX(-Math.PI/2),a.translate(0,e,0),a}function Qc(o,t,e,s,n){const a=new ke;a.moveTo(Math.cos(e)*o,Math.sin(e)*o),a.lineTo(Math.cos(e)*t,Math.sin(e)*t),a.absarc(0,0,t,e,s,!1),a.lineTo(Math.cos(s)*o,Math.sin(s)*o),a.absarc(0,0,o,s,e,!0);const i=new Fe(a,{depth:n,bevelEnabled:!1,curveSegments:3});return i.rotateX(-Math.PI/2),i}function Xr(o,t,e,s=6){const n=new C(...o),a=new C(...t).sub(n),i=new Rt(e,e,a.length(),s,1),r=new Ie().setFromUnitVectors(new C(0,1,0),a.clone().normalize());return i.applyMatrix4(new st().compose(n.clone().addScaledVector(a,.5),r,new C(1,1,1))),i}function Jc(o,t,e,s=.04){const n=new ke;n.absarc(0,0,o,0,Math.PI,!1),n.lineTo(-t,0),n.absarc(0,0,t,Math.PI,0,!0),n.closePath();const a=new Fe(n,{depth:Math.max(.001,e-s*2),bevelEnabled:!0,bevelThickness:s,bevelSize:s*.8,bevelSegments:1,curveSegments:18});return a.translate(0,0,-(e-s*2)/2),a}function On(o,t,e){const s=new ke;s.moveTo(-o/2,0),s.lineTo(o/2,0),s.lineTo(0,t),s.closePath();const n=new Fe(s,{depth:e,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});return n.translate(0,0,-e/2),n}class Ua{constructor(){I(this,"buckets",new Map)}add(t,e,s={}){const n=t.clone();e.map||n.deleteAttribute("uv"),n.deleteAttribute($e),Fn.set(s.rx??0,s.ry??0,s.rz??0),In.setFromEuler(Fn),Un.set(s.x??0,s.y??0,s.z??0),Ln.set(s.sx??1,s.sy??1,s.sz??1),n.applyMatrix4($r.compose(Un,In,Ln));const a=n.index?n:He(n,1e-4),i=this.buckets.get(e)??[];i.push(a),this.buckets.set(e,i)}addMatrix(t,e,s){const n=t.clone();e.map||n.deleteAttribute("uv"),n.deleteAttribute($e),n.applyMatrix4(s);const a=n.index?n:He(n,1e-4),i=this.buckets.get(e)??[];i.push(a),this.buckets.set(e,i)}build(t,e="detail",s={}){const n=[];let a=0;for(const[i,r]of this.buckets){const l=Xt(r,!1);if(!l)continue;l.computeBoundingSphere(),ba(i)&&jo(l);const c=new K(l,i);c.name=`${e}-${a++}`,c.castShadow=!0,c.receiveShadow=!0,Qo(c,i),Object.assign(c.userData,s),t.add(c),n.push(c)}return this.buckets.clear(),n}}function Yr(o){var n;o.updateMatrixWorld(!0);const t=new st().copy(o.matrixWorld).invert(),e=new Map,s=[];o.traverse(a=>{a.isMesh&&s.push(a)});for(const a of s){const i=a.geometry.clone();i.deleteAttribute("uv"),i.deleteAttribute($e),i.applyMatrix4(new st().multiplyMatrices(t,a.matrixWorld));const r=i.index?i:He(i,1e-4),l=e.get(a.material)??[];l.push(r),e.set(a.material,l)}for(const a of s)(n=a.parent)==null||n.remove(a);for(const a of[...o.children])a.type==="Group"&&o.remove(a);for(const[a,i]of e){const r=Xt(i,!1);if(!r)continue;const l=new K(r,a);l.castShadow=!0,l.receiveShadow=!0,l.userData.isLandscapeStage=!0,o.add(l)}}function t1(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Kr(){const o=(e,s,n=.02,a={})=>{const i=new at({color:e,roughness:s,metalness:n,...a});return i.fog=!1,i},t={stone:o(12170150,.9),stoneDark:o(9078397,.92),stoneWarm:o(13221286,.9),paveA:o(10132116,.95),paveB:o(8751752,.95),slate:o(4870744,.86,.06),wood:o(9071178,.82,.02),woodDark:o(5915440,.85,.02),brass:o(11962940,.36,.8),steel:o(9345444,.4,.8),copper:o(5216908,.52,.55),leaf:o(4157253,.95),leafLight:o(6263120,.95),soil:o(4864812,1),lampGlass:o(15923199,.3,0,{emissive:13625087,emissiveIntensity:.9}),paper:o(15524815,.95),darkSteel:o(3093819,.5,.7),rock:o(8093056,.95),terracottaRoof:o(11887946,.82),glass:(()=>{const e=new ze({color:7315376,roughness:.04,metalness:0,transparent:!0,opacity:.34,clearcoat:1,envMapIntensity:1.6,depthWrite:!1});return e.fog=!1,e})()};return Et(t.stone,"masonry"),Et(t.stoneDark,"masonry"),Et(t.stoneWarm,"masonry"),Et(t.rock,"masonry"),Et(t.paveA,"paving"),Et(t.paveB,"paving"),Et(t.wood,"wood"),Et(t.woodDark,"wood"),Et(t.terracottaRoof,"tiles"),Et(t.slate,"tiles"),Et(t.brass,"metal"),Et(t.steel,"metal"),Et(t.copper,"metal"),Et(t.darkSteel,"metal"),t}class Zr extends K{constructor(t,e,s=!1,n=!1,a=1e4){const i=new Ot;super(i,e),this.isMarchingCubes=!0;const r=this,l=new Float32Array(36),c=new Float32Array(36),h=new Float32Array(36);this.enableUvs=s,this.enableColors=n,this.init=function(f){this.resolution=f,this.isolation=80,this.size=f,this.size2=this.size*this.size,this.size3=this.size2*this.size,this.halfsize=this.size/2,this.delta=2/this.size,this.yd=this.size,this.zd=this.size2,this.field=new Float32Array(this.size3),this.normal_cache=new Float32Array(this.size3*3),this.palette=new Float32Array(this.size3*3),this.count=0;const g=a*3;this.positionArray=new Float32Array(g*3);const w=new ct(this.positionArray,3);w.setUsage(Do),i.setAttribute("position",w),this.normalArray=new Float32Array(g*3);const y=new ct(this.normalArray,3);if(y.setUsage(Do),i.setAttribute("normal",y),this.enableUvs){this.uvArray=new Float32Array(g*2);const S=new ct(this.uvArray,2);S.setUsage(Do),i.setAttribute("uv",S)}if(this.enableColors){this.colorArray=new Float32Array(g*3);const S=new ct(this.colorArray,3);S.setUsage(Do),i.setAttribute("color",S)}i.boundingSphere=new ga(new C,1)};function d(f,g,w){return f+(g-f)*w}function m(f,g,w,y,S,k,b,T,A,_){const P=(w-b)/(T-b),D=r.normal_cache;l[g+0]=y+P*r.delta,l[g+1]=S,l[g+2]=k,c[g+0]=d(D[f+0],D[f+3],P),c[g+1]=d(D[f+1],D[f+4],P),c[g+2]=d(D[f+2],D[f+5],P),h[g+0]=d(r.palette[A*3+0],r.palette[_*3+0],P),h[g+1]=d(r.palette[A*3+1],r.palette[_*3+1],P),h[g+2]=d(r.palette[A*3+2],r.palette[_*3+2],P)}function p(f,g,w,y,S,k,b,T,A,_){const P=(w-b)/(T-b),D=r.normal_cache;l[g+0]=y,l[g+1]=S+P*r.delta,l[g+2]=k;const R=f+r.yd*3;c[g+0]=d(D[f+0],D[R+0],P),c[g+1]=d(D[f+1],D[R+1],P),c[g+2]=d(D[f+2],D[R+2],P),h[g+0]=d(r.palette[A*3+0],r.palette[_*3+0],P),h[g+1]=d(r.palette[A*3+1],r.palette[_*3+1],P),h[g+2]=d(r.palette[A*3+2],r.palette[_*3+2],P)}function u(f,g,w,y,S,k,b,T,A,_){const P=(w-b)/(T-b),D=r.normal_cache;l[g+0]=y,l[g+1]=S,l[g+2]=k+P*r.delta;const R=f+r.zd*3;c[g+0]=d(D[f+0],D[R+0],P),c[g+1]=d(D[f+1],D[R+1],P),c[g+2]=d(D[f+2],D[R+2],P),h[g+0]=d(r.palette[A*3+0],r.palette[_*3+0],P),h[g+1]=d(r.palette[A*3+1],r.palette[_*3+1],P),h[g+2]=d(r.palette[A*3+2],r.palette[_*3+2],P)}function v(f){const g=f*3;r.normal_cache[g]===0&&(r.normal_cache[g+0]=r.field[f-1]-r.field[f+1],r.normal_cache[g+1]=r.field[f-r.yd]-r.field[f+r.yd],r.normal_cache[g+2]=r.field[f-r.zd]-r.field[f+r.zd])}function x(f,g,w,y,S){const k=y+1,b=y+r.yd,T=y+r.zd,A=k+r.yd,_=k+r.zd,P=y+r.yd+r.zd,D=k+r.yd+r.zd;let R=0;const N=r.field[y],z=r.field[k],F=r.field[b],W=r.field[A],U=r.field[T],V=r.field[_],B=r.field[P],X=r.field[D];N<S&&(R|=1),z<S&&(R|=2),F<S&&(R|=8),W<S&&(R|=4),U<S&&(R|=16),V<S&&(R|=32),B<S&&(R|=128),X<S&&(R|=64);const H=qr[R];if(H===0)return 0;const tt=r.delta,dt=f+tt,pt=g+tt,q=w+tt;H&1&&(v(y),v(k),m(y*3,0,S,f,g,w,N,z,y,k)),H&2&&(v(k),v(A),p(k*3,3,S,dt,g,w,z,W,k,A)),H&4&&(v(b),v(A),m(b*3,6,S,f,pt,w,F,W,b,A)),H&8&&(v(y),v(b),p(y*3,9,S,f,g,w,N,F,y,b)),H&16&&(v(T),v(_),m(T*3,12,S,f,g,q,U,V,T,_)),H&32&&(v(_),v(D),p(_*3,15,S,dt,g,q,V,X,_,D)),H&64&&(v(P),v(D),m(P*3,18,S,f,pt,q,B,X,P,D)),H&128&&(v(T),v(P),p(T*3,21,S,f,g,q,U,B,T,P)),H&256&&(v(y),v(T),u(y*3,24,S,f,g,w,N,U,y,T)),H&512&&(v(k),v(_),u(k*3,27,S,dt,g,w,z,V,k,_)),H&1024&&(v(A),v(D),u(A*3,30,S,dt,pt,w,W,X,A,D)),H&2048&&(v(b),v(P),u(b*3,33,S,f,pt,w,F,B,b,P)),R<<=4;let et,lt,nt,kt=0,Tt=0;for(;Bo[R+Tt]!=-1;)et=R+Tt,lt=et+1,nt=et+2,M(l,c,h,3*Bo[et],3*Bo[lt],3*Bo[nt]),Tt+=3,kt++;return kt}function M(f,g,w,y,S,k){const b=r.count*3;if(r.positionArray[b+0]=f[y],r.positionArray[b+1]=f[y+1],r.positionArray[b+2]=f[y+2],r.positionArray[b+3]=f[S],r.positionArray[b+4]=f[S+1],r.positionArray[b+5]=f[S+2],r.positionArray[b+6]=f[k],r.positionArray[b+7]=f[k+1],r.positionArray[b+8]=f[k+2],r.material.flatShading===!0){const T=(g[y+0]+g[S+0]+g[k+0])/3,A=(g[y+1]+g[S+1]+g[k+1])/3,_=(g[y+2]+g[S+2]+g[k+2])/3;r.normalArray[b+0]=T,r.normalArray[b+1]=A,r.normalArray[b+2]=_,r.normalArray[b+3]=T,r.normalArray[b+4]=A,r.normalArray[b+5]=_,r.normalArray[b+6]=T,r.normalArray[b+7]=A,r.normalArray[b+8]=_}else r.normalArray[b+0]=g[y+0],r.normalArray[b+1]=g[y+1],r.normalArray[b+2]=g[y+2],r.normalArray[b+3]=g[S+0],r.normalArray[b+4]=g[S+1],r.normalArray[b+5]=g[S+2],r.normalArray[b+6]=g[k+0],r.normalArray[b+7]=g[k+1],r.normalArray[b+8]=g[k+2];if(r.enableUvs){const T=r.count*2;r.uvArray[T+0]=f[y+0],r.uvArray[T+1]=f[y+2],r.uvArray[T+2]=f[S+0],r.uvArray[T+3]=f[S+2],r.uvArray[T+4]=f[k+0],r.uvArray[T+5]=f[k+2]}r.enableColors&&(r.colorArray[b+0]=w[y+0],r.colorArray[b+1]=w[y+1],r.colorArray[b+2]=w[y+2],r.colorArray[b+3]=w[S+0],r.colorArray[b+4]=w[S+1],r.colorArray[b+5]=w[S+2],r.colorArray[b+6]=w[k+0],r.colorArray[b+7]=w[k+1],r.colorArray[b+8]=w[k+2]),r.count+=3}this.addBall=function(f,g,w,y,S,k){const b=Math.sign(y);y=Math.abs(y);const T=k!=null;let A=new G(f,g,w);if(T)try{A=k instanceof G?k:Array.isArray(k)?new G(Math.min(Math.abs(k[0]),1),Math.min(Math.abs(k[1]),1),Math.min(Math.abs(k[2]),1)):new G(k)}catch{A=new G(f,g,w)}const _=this.size*Math.sqrt(y/S),P=w*this.size,D=g*this.size,R=f*this.size;let N=Math.floor(P-_);N<1&&(N=1);let z=Math.floor(P+_);z>this.size-1&&(z=this.size-1);let F=Math.floor(D-_);F<1&&(F=1);let W=Math.floor(D+_);W>this.size-1&&(W=this.size-1);let U=Math.floor(R-_);U<1&&(U=1);let V=Math.floor(R+_);V>this.size-1&&(V=this.size-1);let B,X,H,tt,dt,pt,q,et,lt,nt,kt;for(H=N;H<z;H++)for(dt=this.size2*H,et=H/this.size-w,lt=et*et,X=F;X<W;X++)for(tt=dt+this.size*X,q=X/this.size-g,nt=q*q,B=U;B<V;B++)if(pt=B/this.size-f,kt=y/(1e-6+pt*pt+nt+lt)-S,kt>0){this.field[tt+B]+=kt*b;const Tt=Math.sqrt((B-R)*(B-R)+(X-D)*(X-D)+(H-P)*(H-P))/_,E=1-Tt*Tt*Tt*(Tt*(Tt*6-15)+10);this.palette[(tt+B)*3+0]+=A.r*E,this.palette[(tt+B)*3+1]+=A.g*E,this.palette[(tt+B)*3+2]+=A.b*E}},this.addPlaneX=function(f,g){const w=this.size,y=this.yd,S=this.zd,k=this.field;let b,T,A,_,P,D,R,N=w*Math.sqrt(f/g);for(N>w&&(N=w),b=0;b<N;b++)if(D=b/w,_=D*D,P=f/(1e-4+_)-g,P>0)for(T=0;T<w;T++)for(R=b+T*y,A=0;A<w;A++)k[S*A+R]+=P},this.addPlaneY=function(f,g){const w=this.size,y=this.yd,S=this.zd,k=this.field;let b,T,A,_,P,D,R,N,z=w*Math.sqrt(f/g);for(z>w&&(z=w),T=0;T<z;T++)if(D=T/w,_=D*D,P=f/(1e-4+_)-g,P>0)for(R=T*y,b=0;b<w;b++)for(N=R+b,A=0;A<w;A++)k[S*A+N]+=P},this.addPlaneZ=function(f,g){const w=this.size,y=this.yd,S=this.zd,k=this.field;let b,T,A,_,P,D,R,N,z=w*Math.sqrt(f/g);for(z>w&&(z=w),A=0;A<z;A++)if(D=A/w,_=D*D,P=f/(1e-4+_)-g,P>0)for(R=S*A,T=0;T<w;T++)for(N=R+T*y,b=0;b<w;b++)k[N+b]+=P},this.setCell=function(f,g,w,y){const S=this.size2*w+this.size*g+f;this.field[S]=y},this.getCell=function(f,g,w){const y=this.size2*w+this.size*g+f;return this.field[y]},this.blur=function(f=1){const g=this.field,w=g.slice(),y=this.size,S=this.size2;for(let k=0;k<y;k++)for(let b=0;b<y;b++)for(let T=0;T<y;T++){const A=S*T+y*b+k;let _=w[A],P=1;for(let D=-1;D<=1;D+=2){const R=D+k;if(!(R<0||R>=y))for(let N=-1;N<=1;N+=2){const z=N+b;if(!(z<0||z>=y))for(let F=-1;F<=1;F+=2){const W=F+T;if(W<0||W>=y)continue;const U=S*W+y*z+R,V=w[U];P++,_+=f*(V-_)/P}}}g[A]=_}},this.reset=function(){for(let f=0;f<this.size3;f++)this.normal_cache[f*3]=0,this.field[f]=0,this.palette[f*3]=this.palette[f*3+1]=this.palette[f*3+2]=0},this.update=function(){this.count=0;const f=this.size-2;for(let g=1;g<f;g++){const w=this.size2*g,y=(g-this.halfsize)/this.halfsize;for(let S=1;S<f;S++){const k=w+this.size*S,b=(S-this.halfsize)/this.halfsize;for(let T=1;T<f;T++){const A=(T-this.halfsize)/this.halfsize,_=k+T;x(A,b,y,_,this.isolation)}}}this.geometry.setDrawRange(0,this.count),i.getAttribute("position").needsUpdate=!0,i.getAttribute("normal").needsUpdate=!0,this.enableUvs&&(i.getAttribute("uv").needsUpdate=!0),this.enableColors&&(i.getAttribute("color").needsUpdate=!0),this.count/3>a&&console.warn("THREE.MarchingCubes: Geometry buffers too small for rendering. Please create an instance with a higher poly count.")},this.init(t)}}const qr=new Int32Array([0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0]),Bo=new Int32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1,3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1,3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1,9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1,9,2,10,9,0,2,8,4,7,-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1,8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1,9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1,4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1,3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1,1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1,4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1,4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1,5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1,2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1,9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1,0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1,2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1,10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1,4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1,5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1,5,4,8,5,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1,1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1,10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1,8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1,2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1,2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1,11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,-1,9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1,5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1,11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1,11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1,1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1,9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1,5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1,2,3,11,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1,5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1,6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1,0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1,3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1,6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1,1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1,10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1,6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,-1,-1,-1,1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1,8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1,7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1,3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1,0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1,9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1,8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1,5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1,0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1,6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1,10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1,10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1,1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1,0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1,0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1,3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1,6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1,9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1,8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1,3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1,6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1,0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1,10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1,10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1,1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1,2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1,7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1,7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1,2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1,1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1,11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1,8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1,0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1,10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1,2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1,6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1,7,2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1,2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1,1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1,10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1,0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1,7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1,6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1,8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1,9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1,6,8,4,6,11,8,2,10,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1,4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1,10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1,8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1,1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1,8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1,10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1,4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1,10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,5,11,7,6,-1,-1,-1,-1,-1,-1,-1,5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1,9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1,6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1,7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1,3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1,7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1,3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1,6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1,9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1,1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1,4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,-1,7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1,6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1,3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1,0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1,6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1,0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1,11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1,6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1,5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1,9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1,1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1,1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1,10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1,0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1,5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1,10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1,11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1,9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1,7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1,2,5,10,2,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1,9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1,9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1,1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1,9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1,9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1,0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1,10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1,2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1,0,4,11,0,11,3,4,5,11,2,11,1,5,1,11,-1,0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1,9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1,5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1,3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1,5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1,8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1,0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1,9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1,1,10,11,1,11,4,1,4,0,7,4,11,-1,-1,-1,-1,3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1,4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1,9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1,11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1,2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1,9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1,3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1,1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1,4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1,0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1,3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1,0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1,9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1,1,10,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]),ce=(o,t,e,s,n,a,i)=>Math.sqrt((o-s)*(o-s)+(t-n)*(t-n)+(e-a)*(e-a))-i;function ot(o,t,e,s,n,a,i,r,l){const c=o-s,h=t-n,d=e-a,m=Math.sqrt((c/i)**2+(h/r)**2+(d/l)**2),p=Math.sqrt((c/(i*i))**2+(h/(r*r))**2+(d/(l*l))**2);return p<1e-9?-Math.min(i,r,l):m*(m-1)/p}function rt(o,t,e,s,n,a,i,r,l,c,h){const d=o-s,m=t-n,p=e-a,u=i-s,v=r-n,x=l-a,M=Math.min(1,Math.max(0,(d*u+m*v+p*x)/(u*u+v*v+x*x))),f=d-u*M,g=m-v*M,w=p-x*M;return Math.sqrt(f*f+g*g+w*w)-(c+(h-c)*M)}function Ke(o,t,e,s,n,a,i,r){const l=Math.sqrt((o-s)*(o-s)+(e-a)*(e-a))-i,c=t-n;return Math.sqrt(l*l+c*c)-r}function Jt(o,t,e,s,n,a,i,r,l,c=0){const h=Math.abs(o-s)-i+c,d=Math.abs(t-n)-r+c,m=Math.abs(e-a)-l+c,p=Math.max(h,0),u=Math.max(d,0),v=Math.max(m,0);return Math.sqrt(p*p+u*u+v*v)+Math.min(Math.max(h,d,m),0)-c}function L(o,t,e){const s=Math.max(e-Math.abs(o-t),0)/e;return Math.min(o,t)-s*s*e*.25}function Ut(o,t,e){const s=Math.max(e-Math.abs(o-t),0)/e;return Math.max(o,t)+s*s*e*.25}function Kt(o,t,e,s,n={}){const a=new Zr(s,new wo,!1,!1,n.maxTris??9e4);a.isolation=0;const i=a.field,r=s/2,l=n.boundR!==void 0?n.boundR*n.boundR:1/0;let c=0;for(let u=0;u<s;u++){const v=t[2]+(u-r)/r*e;for(let x=0;x<s;x++){const M=t[1]+(x-r)/r*e;for(let f=0;f<s;f++){const g=t[0]+(f-r)/r*e,w=g-t[0],y=M-t[1],S=v-t[2];w*w+y*y+S*S>l?i[c++]=-1:i[c++]=-o(g,M,v)/e}}}a.update();const h=a.count,d=new Float32Array(h*3),m=new Float32Array(h*3);for(let u=0;u<h*3;u+=3){d[u]=t[0]+a.positionArray[u]*e,d[u+1]=t[1]+a.positionArray[u+1]*e,d[u+2]=t[2]+a.positionArray[u+2]*e;const v=a.normalArray[u],x=a.normalArray[u+1],M=a.normalArray[u+2],f=Math.sqrt(v*v+x*x+M*M)||1;m[u]=v/f,m[u+1]=x/f,m[u+2]=M/f}a.geometry.dispose();const p=new Ot;return p.setAttribute("position",new ct(d,3)),p.setAttribute("normal",new ct(m,3)),p}function vo(o){const t=o.attributes.position.array,e=o.attributes.normal.array,s=t.length/3,n=new Float32Array(t.length),a=new Float32Array(e.length);for(let r=0;r<s;r+=3)for(let l=0;l<3;l++){const c=(r+l)*3,h=(r+(l===1?2:l===2?1:0))*3;n[h]=-t[c],n[h+1]=t[c+1],n[h+2]=t[c+2],a[h]=-e[c],a[h+1]=e[c+1],a[h+2]=e[c+2]}const i=new Ot;return i.setAttribute("position",new ct(n,3)),i.setAttribute("normal",new ct(a,3)),i}function Qr(o){const t=o.attributes.position,e=new Float32Array(t.count*3),s=(n,a)=>Math.max(0,1-n/a)**1.5;for(let n=0;n<t.count;n++){const a=Math.abs(t.getX(n)),i=t.getY(n),r=t.getZ(n);let l=1,c=1,h=1;const d=(m,p,u,v)=>{l+=(p-l)*m,c+=(u-c)*m,h+=(v-h)*m};if(r>.06){const m=s(Math.sqrt((a/.024)**2+((i-.132)/.0105)**2),1);d(m*.52,.98,.77,.75),d(s(Math.hypot(a-.047,i-.158,r-.065),.034)*.24,1,.88,.86),d(s(Math.hypot(a-.034,(i-.2)*1.25,r-.075),.03)*.16,.91,.84,.82),d(s(Math.hypot(a-.034,i-.18,r-.075),.014)*.045,.97,.91,.91),d(s(Math.hypot(a-.0066,i-.15,r-.099),.009)*.35,.68,.53,.51),d(s(Math.hypot(a,i-.158,r-.108),.012)*.18,1,.88,.86)}e[n*3]=l,e[n*3+1]=c,e[n*3+2]=h}return o.setAttribute("color",new ct(e,3)),o}function Oa(o=1){return Qr(Kt((e,s,n)=>{const a=Math.abs(e);let i=ot(a,s,n,0,.217,-.018,.074,.09,.098);return i=L(i,ot(a,s,n,0,.187,.02,.06,.076,.068),.052),i=L(i,rt(a,s,n,.042,.15,-.014,0,.116,.059,.0115,.0105),.038),i=L(i,ce(a,s,n,0,.113,.06,.019),.03),i=L(i,ce(a,s,n,.048,.178,.043,.0145),.04),i=L(i,ot(a,s,n,.04,.16,.045,.012,.014,.011),.04),i=L(i,rt(a,s,n,0,.212,.078,.046,.207,.069,.0115,.0105),.02),i=L(i,rt(a,s,n,0,.207,.081,0,.168,.092,.0065,.008),.018),i=L(i,ce(a,s,n,0,.16,.094,.009),.014),i=L(i,ce(a,s,n,.0095,.156,.091,.0065),.01),i=L(i,rt(a,s,n,0,.095,-.016,0,0,-.004,.037,.044),.04),i=L(i,ce(a,s,n,0,.07,.04,.0045),.012),i=L(i,ot(a,s,n,.0775,.191,-.012,.0085,.034,.022),.012),i=L(i,rt(a,s,n,0,.1372,.0792,.019,.1338,.0725,.0055,.0045),.009),i=L(i,ce(a,s,n,.0042,.1376,.0805,.0036),.005),i=L(i,rt(a,s,n,0,.1222,.0765,.016,.1242,.0705,.006,.005),.009),i=Ut(i,-ot(a,s,n,.034,.2,.083,.021,.016,.02),.012),i=Ut(i,-ce(a,s,n,.0066,.149,.097,.0042),.003),i=Ut(i,-ot(a,s,n,0,.13,.082,.019,7e-4,.011),.002),i=Ut(i,-rt(a,s,n,.003,.148,.095,.003,.141,.09,9e-4,9e-4),.002),i=Ut(i,-rt(a,s,n,.022,.15,.078,.028,.128,.07,.0012,.001),.005),i=L(i,ce(a,s,n,.05,.15,-.012,.012),.04),i=L(i,rt(a,s,n,.044,.118,-.032,.02,0,.016,.014,.014),.04),i=Ut(i,-ot(a,s,n,.085,.19,-.008,.008,.02,.011),.006),i=L(i,ot(a,s,n,.034,.2135,.0745,.0165,.0065,.0115),.006),i=L(i,ot(a,s,n,.034,.1865,.0745,.0155,.004,.01),.005),i},[0,.16,.02],.2,Math.max(24,Math.round(84*o)),{boundR:.26}))}function Ba(o=1){const t=(s,n,a,i,r,l,c)=>{let h=1e9,d=0,m=-.082,p=i,u=0;const v=[r*.5,r*.32,r*.24],x=[l,l*.88,l*.78];for(let M=0;M<3;M++){u+=c*(M===0?.55:1);const f=d-Math.sin(u)*v[M],g=m-Math.cos(u)*v[M];h=Math.min(h,rt(s,n,a,d,m,p,f,g,p,x[M],x[Math.min(M+1,2)]*.96)),d=f,m=g}return h};return Kt((s,n,a)=>{let i=Jt(s,n,a,0,-.044,0,.014,.036,.036,.011);i=L(i,rt(s,n,a,0,.012,0,0,-.02,0,.021,.026),.02),i=L(i,ot(s,n,a,-.004,-.032,.03,.014,.024,.013),.015);const r=.52;return i=L(i,t(s,n,a,.027,.074,.0088,r),.006),i=L(i,t(s,n,a,.009,.082,.0091,r+.03),.006),i=L(i,t(s,n,a,-.009,.076,.0086,r+.06),.006),i=L(i,t(s,n,a,-.026,.06,.0078,r+.1),.006),i=L(i,rt(s,n,a,-.004,-.04,.034,-.012,-.066,.046,.0108,.0092),.01),i=L(i,rt(s,n,a,-.012,-.066,.046,-.02,-.086,.05,.0092,.0078),.008),i},[-.02,-.07,.005],.1,Math.max(24,Math.round(64*o)),{boundR:.13})}function Jr(o,t){return o===1?t:vo(t)}function qs(o,t,e){const s=Math.abs(o);let n=ot(s,t,e,0,1.33,0,.143,.17,.096);n=L(n,ot(s,t,e,.055,1.31,.028,.073,.061,.071),.055),n=L(n,ot(s,t,e,0,1.14,0,.126,.17,.09),.075),n=L(n,ot(s,t,e,0,.97,-.004,.145,.13,.104),.075),n=L(n,rt(s,t,e,.018,1.475,-.01,.145,1.355,-.002,.035,.04),.068),n=L(n,ot(s,t,e,.145,1.35,0,.042,.056,.055),.052),n=L(n,rt(s,t,e,0,1.46,-.02,0,1.535,-.02,.061,.046),.065),n=L(n,Ke(s,t,e,0,1.525,0,.074,.026),.02),n=L(n,Jt(s,t,e,.085,1.27,.094,.04,.03,.014,.006),.006),n=Ut(n,.88-t,.03),n=Ut(n,-rt(s,t,e,0,1.43,-.006,0,1.62,-.006,.058,.058),.014);const a=Math.atan2(e,o);return n+=(Math.sin(a*7+t*13)*.5+Math.sin(a*12-t*8+1.7)*.3)*(t<1.15?.0055:.0028),n}function Ga(o=1){return Kt(qs,[0,1.22,-.005],.5,Math.max(24,Math.round(92*o)),{boundR:.55,maxTris:16e4})}function tl(){const o=(e,s,n)=>Math.abs(qs(e,s,n)-.0075)-.0075;return Kt((e,s,n)=>{const a=Math.abs(e),i=Jt(a,s,n,.04,1.335,.058,.04,.006,.11,.003),r=Math.abs(s-1.045)-.017,l=Math.min(i,r);return Math.max(o(e,s,n),l)},[0,1.25,-.005],.4,100,{boundR:.46,maxTris:12e4})}function el(){const o=(e,s,n)=>Math.abs(qs(e,s,n)-.006)-.006;return Kt((e,s,n)=>Math.max(o(e,s,n),Jt(e,s,n,0,1.2,.12,.0055,.265,.1,.002)),[0,1.2,.08],.3,80,{boundR:.34,maxTris:4e4})}function Wa(o=1){return Kt((e,s,n)=>{let a=rt(e,s,n,0,0,0,0,-.28,0,.052,.044);a=L(a,ce(e,s,n,0,.005,0,.052),.024),a=L(a,ot(e,s,n,.004,-.045,0,.052,.072,.053),.035),a=L(a,ot(e,s,n,0,-.13,.011,.048,.09,.046),.03);const i=Math.atan2(n,e);return a+=(Math.sin(i*6+s*17)*.5+Math.sin(i*3-s*9)*.3)*.0028,a},[0,-.14,0],.23,Math.max(24,Math.round(60*o)),{boundR:.3})}function Va(o=1){return Kt((e,s,n)=>{let a=rt(e,s,n,0,0,0,0,-.255,0,.046,.039);a=L(a,ot(e,s,n,0,-.07,.004,.05,.095,.046),.03),a=L(a,Ke(e,s,n,0,-.246,0,.039,.0092),.01);const i=Math.atan2(n,e);return a+=(Math.sin(i*5+s*21)*.5+Math.sin(i*9-s*11)*.3)*.0026*(s>-.2?1:.4),a},[0,-.13,0],.21,Math.max(24,Math.round(56*o)),{boundR:.24})}function Ha(o=1){return Kt((e,s,n)=>{let a=rt(e,s,n,0,0,0,0,-.42,0,.108,.074);a=L(a,ot(e,s,n,0,-.16,.02,.1,.17,.095),.05),a=L(a,ot(e,s,n,0,-.1,-.035,.092,.12,.085),.05);const i=Math.atan2(n,e);return a+=(Math.sin(i*6+s*15)*.5+Math.sin(i*3-s*8+2.1)*.35)*.0034,a+=Math.max(0,Math.sin(s*70+1.1))*.0018*(s<-.3?1:0),a},[0,-.2,0],.28,Math.max(24,Math.round(60*o)),{boundR:.34})}function ja(o=1){return Kt((e,s,n)=>{let a=rt(e,s,n,0,0,0,0,-.26,0,.074,.058);a=L(a,ot(e,s,n,0,-.1,-.03,.06,.12,.06),.04),a=L(a,Ke(e,s,n,0,-.232,0,.063,.014),.012),a=L(a,Ke(e,s,n,0,-.215,0,.066,.012),.01);const i=Math.atan2(n,e);return a+=(Math.sin(i*5+s*19)*.5+Math.sin(i*8-s*9)*.3)*.0028,a},[0,-.13,0],.22,Math.max(24,Math.round(56*o)),{boundR:.26})}function $a(o=1){return Kt((e,s,n)=>{const a=Math.abs(e);let i=rt(a,s,n,0,-.17,0,0,-.39,.012,.06,.058);i=L(i,ot(a,s,n,0,-.432,-.04,.046,.042,.048),.03),i=L(i,ot(a,s,n,0,-.436,.03,.05,.04,.085),.03),i=L(i,ot(a,s,n,0,-.446,.12,.051,.034,.062),.03),i=L(i,Ke(a,s,n,0,-.285,0,.059,.011),.01);const r=Jt(a,s-Math.max(0,n-.11)*.18,n,0,-.468,.062,.06,.02,.148,.014);return i=L(i,r,.008),i+=Math.max(0,Math.sin(n*120))*.0012*(s<-.482?1:0),i},[0,-.36,.04],.24,Math.max(24,Math.round(80*o)),{boundR:.28})}function Is(o=1,t="short"){const e=t==="long",s=h=>Math.min(1,Math.max(0,h)),n=[[-.052,.261,.064,-.058,.239,.084],[-.036,.265,.07,-.045,.234,.091],[-.019,.267,.073,-.023,.239,.094],[0,.267,.075,.007,.231,.095],[.02,.266,.071,.03,.238,.092],[.039,.263,.067,.05,.241,.086],[.053,.258,.062,.06,.244,.08]],r=Kt((h,d,m)=>{const p=Math.abs(h);let u=ot(p,d,m,0,.221,-.018,.0855,.099,.106);u=L(u,ot(p,d,m,0,.205,-.055,.078,.088,.07),.02),e&&(u=L(u,rt(p,d,m,0,.17,-.078,0,-.04,-.09,.072,.06),.05));const v=.262-.05*(p/.08)*(p/.08),x=s((m+.01)/.03);u=Ut(u,(v-d)*x-(1-x)*.5,.014),u=Ut(u,-ot(p,d,m,.079,.191,-.012,.022,.044,.034),.01),u=Ut(u,(e?-.07:.158)-d,.014);for(const f of n)u=L(u,rt(h,d,m,f[0],f[1],f[2],f[3],f[4],f[5],.006,.0028),.005);const M=Math.atan2(h,m);return u+=.0012*Math.sin(M*80+Math.sin(d*45)*2.2),u},e?[0,.1,-.04]:[0,.19,-.015],e?.24:.15,Math.max(24,Math.round(80*o)),{boundR:e?.3:.2}),l=r.attributes.position,c=new Float32Array(l.count*3);for(let h=0;h<l.count;h++){const d=l.getX(h),m=l.getY(h),p=l.getZ(h),u=Math.atan2(d,p),v=Math.sin(u*70+Math.sin(m*45)*2.2)*.5+.5,x=Math.sin(u*9+m*22)*.5+.5,M=.55+v*.45+x*.25+Math.max(0,m-.28)*2.2;c[h*3]=.075*M,c[h*3+1]=.05*M,c[h*3+2]=.034*M}return r.setAttribute("color",new ct(c,3)),r}function ol(o=1){return Kt((e,s,n)=>{const a=Math.abs(e);let i=Jt(a,s,n,0,1.3,-.165,.122,.182,.072,.05);return i=L(i,Jt(a,s,n,0,1.46,-.168,.116,.036,.08,.03),.012),i=L(i,Jt(a,s,n,0,1.425,-.092,.118,.012,.012,.006),.008),i=L(i,Jt(a,s,n,0,1.19,-.235,.095,.07,.024,.02),.012),i=L(i,rt(a,s,n,.14,1.14,-.165,.14,1.27,-.165,.03,.028),.01),i=L(i,rt(a,s,n,-.11,1.1,-.18,.11,1.1,-.18,.034,.034),.01),i+=.0016*Math.exp(-(((a-.07)/.003)**2))*(s>1.1?1:0),i=Ut(i,-Jt(a,s,n,0,1.2,-.285,.003,.07,.01,.001),.001),i},[0,1.25,-.17],.3,Math.max(24,Math.round(88*o)),{boundR:.4,maxTris:9e4})}const sl=`
varying vec3 vAvLoc;
varying mat3 vAvNM;
float avH(vec3 p) { p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float avN(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(avH(i), avH(i + vec3(1, 0, 0)), f.x), mix(avH(i + vec3(0, 1, 0)), avH(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(avH(i + vec3(0, 0, 1)), avH(i + vec3(1, 0, 1)), f.x), mix(avH(i + vec3(0, 1, 1)), avH(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
`,nl={fabric:{fine:260,mid:48,weave:1,bump:4e-4,tone:.06,rough:.1},leather:{fine:210,mid:34,weave:0,bump:.0012,tone:.1,rough:.16},skin:{fine:330,mid:70,weave:0,bump:22e-5,tone:.025,rough:.06},metal:{fine:420,mid:22,weave:0,bump:6e-4,tone:.1,rough:.12}};function Zt(o,t){const e=nl[t];return o.onBeforeCompile=s=>{s.vertexShader=`varying vec3 vAvLoc;
varying mat3 vAvNM;
`+s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vAvLoc = position;
 vAvNM = normalMatrix;`);const n=t==="metal"?`avN(vec3(p.x * ${e.fine.toFixed(1)}, p.y * 6.0, p.z * ${e.fine.toFixed(1)})) * 0.5 + avN(p * ${e.mid.toFixed(1)}) * 0.5`:`avN(p * ${e.mid.toFixed(1)}) * 0.55 + avN(p * ${e.fine.toFixed(1)}) * 0.45${e.weave?" + (sin(p.x * 520.0) * sin(p.y * 520.0) + sin(p.y * 520.0 + 1.0) * sin(p.z * 520.0)) * 0.12":""}`;s.fragmentShader=sl+`float avHeight(vec3 p) { return ${n}; }
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
         #include <opaque_fragment>`)},o.customProgramCacheKey=()=>`avatar-${t}-${o.vertexColors?"vc":"plain"}`,o.needsUpdate=!0,o}function al(){const o=(e,s,n=.02,a={})=>new at({color:e,roughness:s,metalness:n,...a});return{jacket:Zt(o(4147772,.84,0,{side:mt}),"fabric"),inner:Zt(o(15526626,.9,0,{side:mt}),"fabric"),trousers:Zt(o(3425628,.88),"fabric"),skin:Zt(o(14858392,.55,0,{emissive:3806728,emissiveIntensity:.05}),"skin"),skinFace:Zt(o(14858392,.5,0,{emissive:3806728,emissiveIntensity:.05,vertexColors:!0}),"skin"),leather:Zt(o(7030320,.62,.04),"leather"),leatherDark:Zt(o(4139549,.66,.04),"leather"),boot:Zt(o(7031344,.6,.05),"leather"),sole:o(1775637,.9),hair:new at({color:16777215,vertexColors:!0,roughness:.42,metalness:.15,side:mt}),brow:o(3811356,.7),trim:o(13214282,.4,.75,{emissive:5913096,emissiveIntensity:.18}),scarf:Zt(o(10238510,.9,0,{side:mt}),"fabric"),brass:Zt(o(11962940,.34,.85),"metal"),armor:Object.assign(new ze({color:1845043,roughness:.38,metalness:.6,clearcoat:.7,clearcoatRoughness:.25}),{}),eyeWhite:new ze({color:15986410,roughness:.22,clearcoat:.9,clearcoatRoughness:.08}),lip:o(10113096,.46),tunicVc:Zt(o(16777215,.84,0,{vertexColors:!0,side:mt}),"fabric"),paper:o(16769696,.5,0,{emissive:16753978,emissiveIntensity:1,transparent:!0,opacity:.92})}}class Ao{constructor(){I(this,"b",new Ua)}add(t,e,s={}){this.b.add(t,e,s)}box(t,e,s,n,a={},i=.01){this.b.add(new Se(e,s,n,2,Math.min(i,e/2.05,s/2.05,n/2.05)),t,a)}cyl(t,e,s,n,a={},i=16){this.b.add(new Rt(e,s,n,i,1),t,a)}ball(t,e,s={},n=14){this.b.add(new xt(e,n,Math.max(8,n-4)),t,s)}torus(t,e,s,n={},a=Math.PI*2,i=22){this.b.add(new Dt(e,s,8,i,a),t,n)}build(t,e){this.b.build(t,e,{})}}function Ze(o,t,e){const s=new vt;return s.position.set(o,t,e),s}function il(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d"),s=Yt(77);e.fillStyle="#2a1a10",e.fillRect(0,0,256,256);const n=256/2,a=e.createRadialGradient(n,n,256*.08,n,n,256*.5);a.addColorStop(0,"#5a3a1f"),a.addColorStop(.55,"#8a5a2c"),a.addColorStop(.88,"#3a2412"),a.addColorStop(1,"#150c06"),e.fillStyle=a,e.beginPath(),e.arc(n,n,256*.5,0,Math.PI*2),e.fill();for(let r=0;r<220;r++){const l=s()*Math.PI*2,c=256*(.1+s()*.08),h=256*(.28+s()*.2);e.strokeStyle=`rgba(${s()>.5?"190,140,80":"60,36,18"},${.12+s()*.25})`,e.lineWidth=1+s()*1.4,e.beginPath(),e.moveTo(n+Math.cos(l)*c,n+Math.sin(l)*c),e.lineTo(n+Math.cos(l+(s()-.5)*.12)*h,n+Math.sin(l+(s()-.5)*.12)*h),e.stroke()}e.fillStyle="#060403",e.beginPath(),e.arc(n,n,256*.115,0,Math.PI*2),e.fill();const i=new ha(t);return i.colorSpace=ts,i}let Bn;function Gn(o,t){const e=new K(new xt(.0115,20,14),o.eyeWhite);e.position.set(t*.034,.2,.062),e.scale.set(1,.94,1),Bn??(Bn=il());const s=new vt;s.position.z=.0112;const n=new K(new es(.0072,28),new at({map:Bn,roughness:.28,metalness:0}));n.position.set(0,0,.002);const a=new K(new xt(.0072,18,12,0,Math.PI*2,0,Math.PI*.5),new ze({color:16777215,roughness:.02,metalness:0,transparent:!0,opacity:.16,clearcoat:1,clearcoatRoughness:.02}));a.rotation.x=Math.PI/2,a.position.set(0,0,5e-4);const i=(h,d)=>new xt(.0139,22,10,0,Math.PI*2,h,d-h),r=new K(i(0,Math.PI*.45),o.skin),l=new K(i(Math.PI*.86,Math.PI),o.skin),c=new K(new Dt(.0132,6e-4,4,18,Math.PI*.85),o.brow);return c.rotation.set(0,0,Math.PI*.075),c.position.set(0,0,0),c.scale.set(1,1,.5),c.rotation.x=-.38,c.position.set(0,.004,.0058),s.add(n,a),e.add(s,r,l,c),{eye:e,gaze:s}}function rl(o,t){const e=Ze(0,1.5,0),s=new K(Oa(),o.skinFace);s.castShadow=!0,e.add(s);const n=Gn(o,1),a=Gn(o,-1),i=[];for(const m of[-1,1]){const p=new ss([new C(m*.016,-.001,0),new C(m*.034,.004,.003),new C(m*.052,.002,0),new C(m*.062,-.005,-.006)]),u=new ns(p,10,.0032,6,!1);u.scale(1,.7,.55),i.push(u)}const r=.2165,l=new K(Xt(i.map(m=>{const p=m.toNonIndexed();return p.deleteAttribute("uv"),p})),o.brow);l.position.set(0,r,.0925),l.rotation.x=-.1;const c=.132,h=new K(new Es(.0026,.03,3,8),o.lip);h.rotation.z=Math.PI/2,h.scale.set(1,1,.6),h.position.set(0,c,.0875);const d=new K(Is(),o.hair);return d.castShadow=!0,e.add(n.eye,a.eye,l,h,d),t.eyeL=n.eye,t.eyeR=a.eye,t.gazeL=n.gaze,t.gazeR=a.gaze,t.brow=l,t.mouth=h,{head:e,browY:r,mouthY:c}}let ht={};function Wn(o,t){const e=new vt;ht.upper??(ht.upper=Wa()),ht.lower??(ht.lower=Va()),ht.hand??(ht.hand=Ba());const s=c=>t===1?c:vo(c),n=new K(s(ht.upper),o.jacket);n.castShadow=!0,e.add(n);const a=Ze(0,-.28,0);a.rotation.x=-.22,e.add(a),e.userData.elbow=a;const i=new K(s(ht.lower),o.jacket);i.castShadow=!0,a.add(i);const r=Ze(0,-.27,0);r.rotation.z=t*.04;const l=new K(Jr(t,ht.hand),o.skin);if(l.castShadow=!0,r.add(l),t===1){const c=new Ao;c.box(o.leatherDark,.026,.155,.115,{x:-.044,y:-.108,z:.02,rz:-.06},.006),c.box(o.inner,.016,.146,.104,{x:-.034,y:-.108,z:.02,rz:-.06},.003),c.box(o.brass,.03,.15,.008,{x:-.044,y:-.108,z:-.036,rz:-.06},.003),c.build(r,"notebook")}return a.add(r),e}function Vn(o,t){const e=new vt;ht.thigh??(ht.thigh=Ha()),ht.shin??(ht.shin=ja()),ht.boot??(ht.boot=$a());const s=new K(ht.thigh.clone(),o.trousers);s.castShadow=!0,e.add(s);const n=Ze(0,-.42,0);e.add(n);const a=new K(ht.shin.clone(),o.trousers);a.castShadow=!0,n.add(a);const i=Ze(0,-.43,0);n.add(i);const r=ht.boot.clone();r.translate(0,.43,0);const l=new K(r,o.boot);l.castShadow=!0,i.add(l);const c=new Ao;for(let h=0;h<5;h++)c.box(o.inner,.056,.005,.005,{y:.032-h*.002,z:.052+h*.016,rx:-.4},.002),c.ball(o.brass,.0036,{x:.03,y:.035-h*.002,z:.052+h*.016},6),c.ball(o.brass,.0036,{x:-.03,y:.035-h*.002,z:.052+h*.016},6);return c.build(i,"laces"),{hip:e,knee:n,ankle:i}}function ll(o){const t=new K(Ga(),o.jacket);return t.castShadow=!0,t}function cl(o){const t=new Ao;t.box(o.trousers,.35,.2,.21,{y:.97},.06),t.box(o.brass,.034,.028,.012,{y:1.04,z:.14},.004),t.torus(o.jacket,.085,.024,{y:1.51,rx:Math.PI/2,sx:1.06},Math.PI*2,26),t.torus(o.inner,.078,.014,{y:1.532,rx:Math.PI/2},Math.PI*2,26);for(const e of[-1,1])t.ball(o.brass,.0048,{x:e*.085,y:1.262,z:.112},6);return t.torus(o.scarf,.074,.032,{y:1.54,rx:Math.PI/2},Math.PI*2,26),t.torus(o.scarf,.082,.026,{y:1.51,rx:Math.PI/2-.12},Math.PI*2,26),t.ball(o.scarf,.044,{x:-.056,y:1.5,z:.075,sy:1.1,sz:.9},12),t}function hl(o){const t=Ze(.07,1.48,-.08),e=new At(.15,.52,3,10);e.translate(0,-.26,0);const s=e.attributes.position;for(let i=0;i<s.count;i++){const r=s.getX(i),l=s.getY(i);s.setZ(i,Math.sin(r*60+l*8)*.008*(1+-l*1.5)- -l*.03)}e.computeVertexNormals();const n=new K(e,o.scarf);n.castShadow=!0;const a=new Ao;for(let i=0;i<8;i++)a.cyl(o.scarf,.0016,.0016,.035,{x:-.066+i*.019,y:-.54,z:-.018},4);return a.build(t,"scarf-fringe"),t.add(n),t.rotation.x=.16,t}function ul(o){const t=new vt,e=new Ao;e.cyl(o.paper,.046,.04,.1,{y:0},6),e.cyl(o.brass,.06,.05,.016,{y:.058},6),e.add(new Qe(.066,.05,6),o.brass,{y:.09}),e.cyl(o.brass,.05,.05,.014,{y:-.057},6);for(let n=0;n<6;n++){const a=n/6*Math.PI*2;e.cyl(o.brass,.0022,.0022,.1,{x:Math.cos(a)*.045,y:0,z:Math.sin(a)*.045},4)}e.torus(o.brass,.034,.0035,{y:.108},Math.PI,12),e.ball(o.brass,.008,{y:.122},8),e.build(t,"lantern");const s=new fa(16757575,1.2,10);return t.add(s),t}function e1(o){const t=new vt;t.name="Explorer";const e=al(),s=new vt;s.position.y=.98;const n=new vt;n.position.y=-.98,s.add(n),t.add(s),n.add(ll(e));const a=new K(tl(),e.leatherDark);a.castShadow=!0;const i=new K(el(),e.brass),r=new K(ol(),e.leather);r.castShadow=!0,n.add(a,i,r),cl(e).build(n,"torso");const l={},{head:c,browY:h,mouthY:d}=rl(e,l);c.position.y-=.98,s.add(c);const m=hl(e);m.position.y-=.98,s.add(m);const p=Vn(e);p.hip.position.set(.09,.91,0);const u=Vn(e);u.hip.position.set(-.09,.91,0),t.add(p.hip,u.hip);const v=Wn(e,1);v.position.set(.166,1.405-.98,0);const x=Wn(e,-1);x.position.set(-.166,1.405-.98,0),v.rotation.z=.035,x.rotation.z=-.035,s.add(v,x);const M=ul(e);M.name="ExplorerLantern",M.position.set(0,-.69,.1),x.add(M);const f=new K(new ua(.5,.64,36),new wo({color:9684477,transparent:!0,opacity:.22,side:mt}));f.rotation.x=-Math.PI/2,f.position.y=.03,f.userData.isFootRing=!0,t.add(f);const g={leftLeg:p,rightLeg:u,spine:s,leftArm:v,rightArm:x,head:c,cape:m,eyeL:l.eyeL,eyeR:l.eyeR,gazeL:l.gazeL,gazeR:l.gazeR,brow:l.brow,mouth:l.mouth,faceRest:{browY:h,mouthY:d},mats:{jacket:e.jacket,trim:e.trim,cape:e.scarf}};return t.userData.rig=g,la(t,{body:g.spine,bodyRestY:.98,head:g.head,leftArm:g.leftArm,rightArm:g.rightArm,leftElbow:g.leftArm.userData.elbow,rightElbow:g.rightArm.userData.elbow,leftHip:g.leftLeg.hip,rightHip:g.rightLeg.hip,leftKnee:g.leftLeg.knee,rightKnee:g.rightLeg.knee,leftAnkle:g.leftLeg.ankle,rightAnkle:g.rightLeg.ankle,blinkLeft:()=>1-g.eyeL.scale.y,blinkRight:()=>1-g.eyeR.scale.y,mouthOpen:()=>Math.max(0,g.mouth.scale.y-1)*.15,smile:()=>Math.max(0,g.mouth.scale.x-1)*.6,gazeX:()=>g.gazeL.position.x*80,gazeY:()=>g.gazeL.position.y*80},"male",{model:o}),t}function Xa(o){return[{off:-o-.55,lift:-.04,tone:.55},{off:-o-.18,lift:.1,tone:.78},{off:-o,lift:.17,tone:.95},{off:-o*.7,lift:.09,tone:1},{off:0,lift:.13,tone:1.06},{off:o*.7,lift:.09,tone:1},{off:o,lift:.17,tone:.95},{off:o+.18,lift:.1,tone:.78},{off:o+.55,lift:-.04,tone:.55}]}function fl(o,t){const e=Xa(t);if(o<=e[0].off)return e[0].lift;for(let s=1;s<e.length;s++)if(o<=e[s].off){const n=e[s-1],a=e[s],i=(o-n.off)/(a.off-n.off||1);return n.lift+(a.lift-n.lift)*i}return e[e.length-1].lift}function o1(o,t){const e=new vt;e.name="road";const s=t.width/2,n=new G(t.base),a=Xa(s),i=a.length,r=[],l=[],c=[],h=new C,d=new C,m=new G,p=new G(5208632);for(let M=0;M<=t.steps;M++){const f=M/t.steps;o.getPoint(f,h),o.getTangent(f,d);const g=-d.z,w=d.x,y=Math.hypot(g,w)||1;for(let S=0;S<i;S++){const{off:k,lift:b,tone:T}=a[S],A=h.x+g/y*k,_=h.z+w/y*k;r.push(A,t.groundY(A,_)+b,_);const P=.88+.24*nn(A*1.7,_*1.7,2);m.copy(n).multiplyScalar(T*P);const D=1-.14*Math.exp(-Math.pow((Math.abs(k)-s*.5)/(s*.18),2));if(m.multiplyScalar(D),Math.abs(k)>s){const R=.4+.5*nn(A*.9+40,_*.9+12,2);m.lerp(p,Math.min(.95,R*((Math.abs(k)-s)/.55+.35)))}l.push(m.r,m.g,m.b)}if(M>0){const S=M*i,k=(M-1)*i;for(let b=0;b<i-1;b++)c.push(k+b,S+b,k+b+1,k+b+1,S+b,S+b+1)}}const u=new Ot;u.setAttribute("position",new gt(r,3)),u.setAttribute("color",new gt(l,3)),u.setIndex(c),u.computeVertexNormals();const v=new at({color:16777215,vertexColors:!0,roughness:.96,metalness:.02,side:mt});P0(v);const x=new K(u,v);if(x.receiveShadow=!0,e.add(x),t.inlay){const M=[],f=[];for(let S=0;S<=t.steps;S++){const k=S/t.steps;o.getPoint(k,h),o.getTangent(k,d);const b=-d.z,T=d.x,A=Math.hypot(b,T)||1;for(const _ of[-.09,.09]){const P=h.x+b/A*_,D=h.z+T/A*_;M.push(P,t.groundY(P,D)+.17,D)}if(S>0){const _=S*2,P=(S-1)*2;f.push(P,_,P+1,P+1,_,_+1)}}const g=new Ot;g.setAttribute("position",new gt(M,3)),g.setIndex(f),g.computeVertexNormals();const w=new at({color:t.inlay.color,emissive:t.inlay.emissive,emissiveIntensity:t.inlay.intensity,roughness:.4,side:mt}),y=new K(g,w);y.userData.noShadow=!0,e.add(y)}return e}const ks=[.02,.04],dl=.1;function Ya(o){let t=0;for(let e=0;e<o.length;e++){const[s,n]=o[e],[a,i]=o[(e+1)%o.length];t+=s*i-a*n}return t*.5}function Ka(o,t,e,s){const n=[];for(let a=0;a<o.length;a++){const i=o[a],r=o[(a+1)%o.length],l=t*i[0]+e*i[1]-s,c=t*r[0]+e*r[1]-s;if(l<=0&&n.push(i),l<0&&c>0||l>0&&c<0){const h=l/(l-c);n.push([i[0]+(r[0]-i[0])*h,i[1]+(r[1]-i[1])*h])}}return n}function ml(o,t){let e=o;const s=o.length;for(let n=0;n<s&&e.length>=3;n++){const a=o[n],i=o[(n+1)%s],r=i[0]-a[0],l=i[1]-a[1],c=Math.hypot(r,l);if(c<1e-6)continue;const h=l/c,d=-r/c;e=Ka(e,h,d,h*a[0]+d*a[1]-t)}return e}function Hn(o,t=1e-5){const e=[];for(const s of o){const n=e[e.length-1];(!n||Math.hypot(s[0]-n[0],s[1]-n[1])>t)&&e.push(s)}for(;e.length>1&&Math.hypot(e[0][0]-e[e.length-1][0],e[0][1]-e[e.length-1][1])<=t;)e.pop();return e}function pl(o){const t=o.slice();for(;t.length>8;){let e=0,s=1/0;for(let n=0;n<t.length;n++){const a=t[(n+t.length-1)%t.length],i=t[n],r=t[(n+1)%t.length],l=Math.abs((i[0]-a[0])*(r[1]-a[1])-(r[0]-a[0])*(i[1]-a[1]));l<s&&(s=l,e=n)}t.splice(e,1)}for(;t.length<5;){let e=0,s=-1;for(let c=0;c<t.length;c++){const h=t[c],d=t[(c+1)%t.length],m=Math.hypot(d[0]-h[0],d[1]-h[1]);m>s&&(s=m,e=c)}const n=t[e],a=t[(e+1)%t.length],i=a[0]-n[0],r=a[1]-n[1],l=Math.hypot(i,r)||1;t.splice(e+1,0,[(n[0]+a[0])/2+r/l*.003,(n[1]+a[1])/2-i/l*.003])}return t}function gl(o){const t=[o[0].x],e=[o[0].z],s=[0];for(let l=1;l<o.length;l++){const c=Math.hypot(o[l].x-o[l-1].x,o[l].z-o[l-1].z);c<1e-6||(t.push(o[l].x),e.push(o[l].z),s.push(s[s.length-1]+c))}const n=s[s.length-1],a=t.length,i=[],r=[];for(let l=0;l<a;l++){const c=Math.max(0,l-1),h=Math.min(a-1,l+1),d=t[h]-t[c],m=e[h]-e[c],p=Math.hypot(d,m)||1;i.push(d/p),r.push(m/p)}return{length:n,at(l){const c=Math.min(n,Math.max(0,l));let h=0,d=a-1;for(;d-h>1;){const M=h+d>>1;s[M]<=c?h=M:d=M}const m=Math.max(1e-9,s[d]-s[h]),p=(c-s[h])/m;let u=i[h]+(i[d]-i[h])*p,v=r[h]+(r[d]-r[h])*p;const x=Math.hypot(u,v)||1;return u/=x,v/=x,{x:t[h]+(t[d]-t[h])*p,z:e[h]+(e[d]-e[h])*p,tx:u,tz:v}}}}function jn(o,t,e){const s=o.at(t);return[s.x-s.tz*e,s.z+s.tx*e]}function vl(o,t,e,s=0,n=o){const a=Yt(Math.floor(e)*2654435+91),i=Math.max(2,Math.round(t/.82)),r=t/i,l=r*1.3,c=t/2,h=Math.floor(s/l)-1,d=Math.ceil(n/l)+1,m=[];for(let u=h;u<=d;u++)for(let v=0;v<i;v++)m.push({s:(u+.5+.5*(v&1))*l+(a()-.5)*.6*l,t:-c+(v+.5)*r+(a()-.5)*.6*r});const p=[];for(let u=0;u<m.length;u++){const v=m[u],x=-c+a()*.1,M=c-a()*.1,f=a()<.04,g=ks[0]+a()*(ks[1]-ks[0]),w=a();if(v.s<s-l||v.s>n+l)continue;let y=[[Math.max(s,v.s-2*l),x],[Math.min(n,v.s+2*l),x],[Math.min(n,v.s+2*l),M],[Math.max(s,v.s-2*l),M]];if(y[0][0]>=y[1][0])continue;const S=Math.max(0,u-4*i),k=Math.min(m.length,u+4*i+1);for(let _=S;_<k&&y.length>=3;_++){if(_===u)continue;const P=m[_];if(Math.abs(P.s-v.s)>2.6*l||Math.abs(P.t-v.t)>2.6*r)continue;const D=P.s-v.s,R=P.t-v.t,N=(P.s+v.s)/2,z=(P.t+v.t)/2;y=Ka(y,D,R,D*N+R*z)}if(y.length<3||f||(y=Hn(y),y.length<3)||(y=Hn(ml(y,g)),y.length<3)||Ya(y)<dl)continue;y=pl(y);let T=0,A=0;for(const _ of y)T+=_[0],A+=_[1];p.push({poly:y,cs:T/y.length,ct:A/y.length,tone:w})}return p}function s1(o,t=6){if(o.length<3)return o.map(s=>({x:s.x,z:s.z}));const e=[{x:o[0].x,z:o[0].z}];for(let s=1;s<o.length-1;s++){const n=o[s-1],a=o[s],i=o[s+1],r=Math.hypot(a.x-n.x,a.z-n.z)||1,l=Math.hypot(i.x-a.x,i.z-a.z)||1,c=Math.min(t,r*.45),h=Math.min(t,l*.45);e.push({x:a.x+(n.x-a.x)/r*c,z:a.z+(n.z-a.z)/r*c},{x:a.x,z:a.z},{x:a.x+(i.x-a.x)/l*h,z:a.z+(i.z-a.z)/l*h})}return e.push({x:o[o.length-1].x,z:o[o.length-1].z}),e}const xl=[13094096,13619146,14208703,12897224],wl=[8095636,7502984,6910847,7700618],Ml=new G(5202741),Ht=.7;function $n(o,t,e,s,n,a,i,r){const l=t.length;let c=0,h=0;for(const T of t)c+=T[0],h+=T[1];c/=l,h/=l;const d=[];for(let T=0;T<l;T++){const[A,_]=t[T];d.push(s(A,_)+n(e[T])+(Oi(A*2.1+3,_*2.1)-.5)*.02)}const m=d.reduce((T,A)=>T+A,0)/l,p=new G(a[Math.min(a.length-1,Math.floor(i.tone*a.length))]),u=new G(a[Math.min(a.length-1,Math.floor(i.tone*a.length)+1)%a.length]);p.lerp(u,i.tone*a.length%1),p.multiplyScalar(.84+r()*.26);const v=new G,x=(T,A,_,P,D,R,N)=>(v.copy(p).multiplyScalar(N).lerp(Ml,R),o.pos.push(T,A,_),o.col.push(v.r,v.g,v.b),o.uv.push(P,D),o.pos.length/3-1),M=t.map(([T,A])=>{const _=T-c,P=A-h,D=Math.hypot(_,P)||1,R=Math.min(i.bevel,D*.35)/D;return[T-_*R,A-P*R]}),f=x(c,m+.008,h,c*Ht,h*Ht,0,1.04),g=[];for(let T=0;T<l;T++){const A=.93+r()*.07;g.push(x(M[T][0],d[T],M[T][1],M[T][0]*Ht,M[T][1]*Ht,i.mossy*.25*r(),A))}for(let T=0;T<l;T++)o.idx.push(f,g[(T+1)%l],g[T]);const w=[],y=[];for(let T=0;T<l;T++)w.push(x(M[T][0],d[T],M[T][1],M[T][0]*Ht,M[T][1]*Ht,i.mossy*.25,.94)),y.push(x(t[T][0],d[T]-i.drop-r()*.006,t[T][1],t[T][0]*Ht,t[T][1]*Ht,i.mossy*.55*(.5+r()),.8));const S=[],k=[];let b=0;for(let T=0;T<l;T++){const[A,_]=t[T],P=t[(T+l-1)%l];b+=Math.hypot(A-P[0],_-P[1]);const D=d[T]-i.drop,R=Math.min(D-i.thickness+i.drop,s(A,_)-.06);S.push(x(A,D,_,b*Ht,D*Ht,i.mossy*.7,.72)),k.push(x(A,R,_,b*Ht,R*Ht,i.mossy*.9,.45))}for(let T=0;T<l;T++){const A=(T+1)%l;o.idx.push(w[T],w[A],y[T],w[A],y[A],y[T]),o.idx.push(S[T],S[A],k[T],S[A],k[A],k[T])}}function yl(o,t,e,s){const n=5+Math.floor(s()*2),a=s()*6.28,i=.85+s()*.5,r=[];for(let l=0;l<n;l++){const c=a+l/n*Math.PI*2+(s()-.5)*.4,h=e*(.75+s()*.5);r.push([o+Math.cos(c)*h*i,t+Math.sin(c)*h])}return r}function bl(o,t){const e=new vt;e.name="flagstone-path";const s={pos:[],col:[],uv:[],idx:[]},n=t.width/2,a=t.lift??(h=>fl(h,n)+.05),i=t.palette==="unit"?wl:xl,r=t.quality==="high"?1.2:t.quality==="med"?.7:.3;if(o.forEach((h,d)=>{if(h.length<2)return;const m=gl(h),p=t.startInset??0,u=m.length-(t.endInset??0);if(u-p<1)return;const v=t.seed+d*977,x=Yt(v*31+7);for(const f of vl(m.length,t.width,v,p,u)){const g=f.poly.map(([y,S])=>jn(m,y,S)),w=f.poly.map(([,y])=>y);Ya(g)<0&&(g.reverse(),w.reverse()),$n(s,g,w,t.groundY,a,i,{thickness:.08+x()*.04,bevel:.022+x()*.012,drop:.02+x()*.01,tone:f.tone,mossy:x()<.4?.3+x()*.7:x()*.25},x)}const M=Math.floor((u-p)*r);for(let f=0;f<M;f++){const g=f&1?1:-1,w=p+x()*(u-p),y=g*(n-.15+Math.pow(x(),1.6)*.75),[S,k]=jn(m,w,y),b=.045+x()*x()*.12,T=yl(S,k,b,x);$n(s,T,T.map(()=>y),t.groundY,A=>Math.max(.012,a(A)-.04),i,{thickness:.05,bevel:Math.min(.015,b*.3),drop:.012,tone:x(),mossy:x()*.6},x)}}),s.idx.length===0)return e;const l=new Ot;l.setAttribute("position",new gt(s.pos,3)),l.setAttribute("color",new gt(s.col,3)),l.setAttribute("uv",new gt(s.uv,2)),l.setIndex(new ct(s.pos.length/3>65535?new Uint32Array(s.idx):new Uint16Array(s.idx),1)),l.computeVertexNormals(),l.computeBoundingSphere();const c=new K(l,ir());return c.name="flagstones",c.receiveShadow=!0,c.castShadow=!1,e.add(c),e}function n1(o,t){const e=o.getLength(),s=o.getSpacedPoints(Math.max(4,Math.ceil(e/.5))).map(n=>({x:n.x,z:n.z}));return bl([s],t)}function Go(o,t,e){let s=Math.imul(o|0,374761393)^Math.imul(t|0,668265263)^Math.imul((e|0)+1,1442695041);return s=Math.imul(s^s>>>13,1274126177),s^=s>>>16,(s>>>0)/4294967295}const Xn=o=>o*o*o*(o*(o*6-15)+10);function Fs(o,t,e,s){const n=o*e,a=t*e,i=Math.floor(n),r=Math.floor(a),l=Xn(n-i),c=Xn(a-r),h=(i%e+e)%e,d=(r%e+e)%e,m=(h+1)%e,p=(d+1)%e,u=Go(h,d,s),v=Go(m,d,s),x=Go(h,p,s),M=Go(m,p,s);return u+(v-u)*l+(x-u)*c+(u-v-x+M)*l*c}function Sl(o,t,e){let s=0,n=1,a=4;for(let i=0;i<5;i++){const r=Fs(o,t,a,e*17+i*101),l=1-Math.abs(2*r-1);s+=(r*.45+l*.55)*n,n*=.55,a*=2}return s}function kl(o,t){const e=new Float32Array(o*o);let s=1/0,n=-1/0;for(let c=0;c<o;c++)for(let h=0;h<o;h++){const d=Sl(h/o,c/o,t);e[c*o+h]=d,d<s&&(s=d),d>n&&(n=d)}const a=new Uint8Array(o*o*4),i=o/256*1.6,r=n-s||1,l=c=>(c+o)%o;for(let c=0;c<o;c++)for(let h=0;h<o;h++){const d=(e[c*o+l(h+1)]-e[c*o+l(h-1)])*.5*i*2.2,m=(e[l(c+1)*o+h]-e[l(c-1)*o+h])*.5*i*2.2,p=Math.hypot(d,m,1),u=(c*o+h)*4;a[u]=Math.round((-d/p*.5+.5)*255),a[u+1]=Math.round((-m/p*.5+.5)*255),a[u+2]=Math.round((1/p*.5+.5)*255),a[u+3]=Math.round((e[c*o+h]-s)/r*255)}return{size:o,data:a}}function Tl(o,t){const e=new Uint8Array(o*o*4);for(let s=0;s<o;s++)for(let n=0;n<o;n++){const a=n/o,i=s/o;let r=0,l=.5,c=6;for(let u=0;u<4;u++){const v=Fs(a,i,c,t*31+u*53);r+=(1-Math.abs(2*v-1))*l,l*=.5,c*=2}const h=Fs(a,i,5,t*7+3),d=Math.min(1,Math.max(0,Math.pow(r/.9375,1.6)*(.55+h*.7))),m=(s*o+n)*4,p=Math.round(d*255);e[m]=p,e[m+1]=p,e[m+2]=p,e[m+3]=255}return{size:o,data:e}}const fo={rate:[.55,.35,.3],alphaMin:.12,alphaMax:.97,alphaRate:.9},Ts={time:{value:0},sunDir:{value:new C(.3,.6,-.5).normalize()},sunColor:{value:new G(1,.95,.85)}},Za=6268306,qa=801342,Yn=new Map,Kn=new Map;function Qa(o,t,e){const s=new qe(o,t,t,So,ko);return s.wrapS=me,s.wrapT=me,s.magFilter=je,s.minFilter=Jo,s.generateMipmaps=!0,s.anisotropy=e,s.colorSpace=To,s.needsUpdate=!0,s}function Al(o){let t=Yn.get(o);return t||(t=Qa(kl(o,11).data,o,4),Yn.set(o,t)),t}function _l(o){let t=Kn.get(o);return t||(t=Qa(Tl(o,23).data,o,2),Kn.set(o,t)),t}const Pl=`
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
`,Dl=`
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
  vec3 wCol = mix(uWShallow, uWDeep, 1.0 - exp(-wPath * vec3(${fo.rate.map(o=>o.toFixed(2)).join(", ")})));
  float wAlpha = ${fo.alphaMin.toFixed(2)} + (${fo.alphaMax.toFixed(2)} - ${fo.alphaMin.toFixed(2)}) * (1.0 - exp(-wPath * ${fo.alphaRate.toFixed(2)}));
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
`,Rl=`
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
`;function Ja(o){const t=new ze({color:16777215,roughness:.14,metalness:0,ior:1.333,transparent:!0,depthWrite:!0,envMapIntensity:1});t.fog=o.fog;const e=Al(o.quality==="low"?128:256),s=o.quality==="low"||!o.depthTex?void 0:_l(256),n=new G(o.shallow),a=new G(o.deep),i=o.ramp??new Mo(0,1,.8,.8),r=[o.depthTex?"#define W_DEPTH_TEX":"",s?"#define W_FOAM_TEX":"",o.quality!=="low"?"#define W_FAR":"",o.quality==="low"?"#define W_LOWENV":""].join(`
`);t.onBeforeCompile=c=>{c.uniforms.uWTime=Ts.time,c.uniforms.uWSunDir=Ts.sunDir,c.uniforms.uWSunColor=Ts.sunColor,c.uniforms.uWNormal={value:e},c.uniforms.uWShallow={value:n},c.uniforms.uWDeep={value:a},c.uniforms.uWRamp={value:i},o.depthTex&&(c.uniforms.uWDepthTex={value:o.depthTex},c.uniforms.uWBox={value:o.box??new Mo(0,0,1,1)}),s&&(c.uniforms.uWFoam={value:s}),c.vertexShader=`varying vec3 vWPos;
varying float vWLocalZ;
`+c.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
       vWLocalZ = transformed.z;`),c.fragmentShader=r+`
`+Pl+c.fragmentShader.replace("#include <normal_fragment_maps>",Dl).replace("#include <lights_fragment_maps>",Rl).replace("#include <fog_fragment>",`#ifdef USE_FOG
           // 与地形同一套雾公式：远处水面融入雾色
           float tf = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
           tf = max(tf, smoothstep(150.0, 340.0, vFogDepth) * 0.92);
           gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, tf);
         #endif`)};const l=`water-v1-${o.quality}-${o.depthTex?"d":"f"}-${s?"f":"n"}`;return t.customProgramCacheKey=()=>l,t}function a1(o){const{outline:t,x:e,y:s,z:n,groundY:a,quality:i}=o,r=new Bi(new ke(t),1);r.rotateX(-Math.PI/2);let l=1/0,c=-1/0,h=1/0,d=-1/0;for(const w of t)l=Math.min(l,e+w.x),c=Math.max(c,e+w.x),h=Math.min(h,n-w.y),d=Math.max(d,n-w.y);const m=1.5;l-=m,h-=m,c+=m,d+=m;const p=c-l,u=d-h,v=i==="low"?32:64,x=new Uint16Array(v*v);for(let w=0;w<v;w++){const y=h+(w+.5)/v*u;for(let S=0;S<v;S++){const k=l+(S+.5)/v*p,b=$.clamp(a(k,y)-s,-16,16);x[w*v+S]=Gi.toHalfFloat(b)}}const M=new qe(x,v,v,Wi,Wt);M.magFilter=je,M.minFilter=je,M.wrapS=Cs,M.wrapT=Cs,M.generateMipmaps=!1,M.colorSpace=To,M.needsUpdate=!0;const f=Ja({quality:i,shallow:o.shallowColor??Za,deep:o.deepColor??qa,fog:!0,depthTex:M,box:new Mo(l,h,1/p,1/u)}),g=new K(r,f);return g.position.set(e,s,n),g.userData.isWater=!0,g.castShadow=!1,g.receiveShadow=!1,{mesh:g,dispose(){r.dispose(),f.dispose(),M.dispose()}}}function Cl(o={}){const t=o.depth??.6,e=o.ramp;return Ja({quality:o.quality??"med",shallow:o.shallowColor??Za,deep:o.deepColor??qa,fog:o.fog??!1,ramp:e?new Mo(e.z0,e.z1,e.near,e.far):new Mo(0,1,t,t)})}class i1{constructor(t){I(this,"ratio");I(this,"avgMs",16.7);I(this,"max");I(this,"min");I(this,"step");I(this,"high");I(this,"low");I(this,"hold");I(this,"slow",0);I(this,"fast",0);I(this,"cooldown",0);I(this,"clock",0);I(this,"lastRaiseAt",-1/0);I(this,"ceiling",1/0);I(this,"ceilingUntil",0);this.max=t.max,this.min=Math.min(t.min??.75,t.max),this.step=t.step??.25,this.high=t.high??18,this.low=t.low??12,this.hold=t.hold??2,this.ratio=Math.min(t.max,Math.max(this.min,t.initial??t.max))}setMax(t){this.max=t,this.ratio>t&&(this.ratio=t)}push(t,e){if(!(t>0)||t>300||!(e>0)||e>.5)return null;if(this.clock+=e,this.avgMs+=(t-this.avgMs)*(1-Math.exp(-e/.35)),this.cooldown>0)return this.cooldown-=e,this.slow=this.fast=0,null;if(this.avgMs>this.high?(this.slow+=e,this.fast=0):this.avgMs<this.low?(this.fast+=e,this.slow=0):this.slow=this.fast=0,this.slow>=this.hold&&this.ratio>this.min+1e-6){const n=Math.max(this.min,this.ratio-this.step);return this.clock-this.lastRaiseAt<12&&(this.ceiling=n,this.ceilingUntil=this.clock+30),this.apply(n)}const s=this.clock<this.ceilingUntil?Math.min(this.max,this.ceiling):this.max;return this.fast>=this.hold&&this.ratio<s-1e-6?(this.lastRaiseAt=this.clock,this.apply(Math.min(s,this.ratio+this.step))):null}apply(t){return this.ratio=t,this.slow=this.fast=0,this.cooldown=this.hold,t}}function r1(){return!1}function l1(o,t,e){const s=document.createElement("div");s.setAttribute("data-perf-overlay",""),s.style.cssText="position:absolute;left:8px;bottom:8px;z-index:9999;padding:6px 8px;border-radius:6px;background:rgba(6,14,24,.72);color:#9fe8ff;font:11px/1.45 ui-monospace,monospace;pointer-events:none;white-space:pre",t.appendChild(s),o.info.autoReset=!1;let n=0,a=0,i=0;return{update(r){if(a++,i+=r,n+=r,n>=250){const l=i/a,c=o.info.render;s.textContent=`${(1e3/Math.max(.1,l)).toFixed(0)} fps  ${l.toFixed(1)} ms
calls ${Math.round(c.calls)}  tris ${Math.round(c.triangles)}
ratio ${o.getPixelRatio().toFixed(2)}${e?`  avg ${e.avgMs.toFixed(1)} ms`:""}`,n=0,a=0,i=0}o.info.reset()},dispose(){o.info.autoReset=!0,s.remove()}}}const El=["clear","overcast","lightRain","heavyRain","drizzleMist","snow","windGusts","dusk","night"];function c1(o){return typeof o=="string"&&El.includes(o)}const Nl=["cloud","sunMul","hemiMul","envMul","exposureMul","fogMul","skyGrey","skyDark","sunTintR","sunTintG","sunTintB","skyTintR","skyTintG","skyTintB","skyTintAmt","rain","snow","mist","wind","gust","wetTarget"],le=o=>({cloud:.12,sunMul:1,hemiMul:1,envMul:1,exposureMul:1,fogMul:1,skyGrey:0,skyDark:1,sunTintR:1,sunTintG:1,sunTintB:1,skyTintR:.5,skyTintG:.5,skyTintB:.5,skyTintAmt:0,rain:0,snow:0,mist:0,wind:.25,gust:.15,wetTarget:0,...o}),As={clear:le({}),overcast:le({cloud:.85,sunMul:.35,hemiMul:.95,envMul:.85,fogMul:1.25,skyGrey:.55,skyDark:.82,sunTintR:.94,sunTintG:.97,sunTintB:1,wind:.35,gust:.25}),lightRain:le({cloud:.92,sunMul:.22,hemiMul:.85,envMul:.8,exposureMul:1.02,fogMul:1.5,skyGrey:.66,skyDark:.72,sunTintR:.9,sunTintG:.95,sunTintB:1,rain:.45,wind:.4,gust:.3,wetTarget:.7}),heavyRain:le({cloud:1,sunMul:.1,hemiMul:.7,envMul:.65,exposureMul:1.06,fogMul:2.1,skyGrey:.8,skyDark:.55,sunTintR:.86,sunTintG:.92,sunTintB:1,rain:1,wind:.7,gust:.6,wetTarget:1}),drizzleMist:le({cloud:.8,sunMul:.28,hemiMul:.9,envMul:.85,fogMul:2.8,skyGrey:.6,skyDark:.85,sunTintR:.94,sunTintG:.98,sunTintB:1,rain:.16,mist:1,wind:.12,gust:.08,wetTarget:.5}),snow:le({cloud:.9,sunMul:.3,hemiMul:1,envMul:1,exposureMul:1.05,fogMul:1.8,skyGrey:.5,skyDark:.9,sunTintR:.95,sunTintG:.98,sunTintB:1.05,snow:.8,wind:.3,gust:.2,wetTarget:.2}),windGusts:le({cloud:.45,sunMul:.8,skyGrey:.15,wind:.85,gust:1}),dusk:le({cloud:.4,sunMul:.55,hemiMul:.72,envMul:.7,exposureMul:.97,fogMul:1.2,skyDark:.78,sunTintR:1,sunTintG:.72,sunTintB:.82,skyTintR:.78,skyTintG:.5,skyTintB:.68,skyTintAmt:.38,wind:.2,gust:.1}),night:le({cloud:.3,sunMul:.08,hemiMul:.38,envMul:.32,exposureMul:1.15,fogMul:1.3,skyDark:.14,sunTintR:.55,sunTintG:.7,sunTintB:1.15,skyTintR:.05,skyTintG:.1,skyTintB:.24,skyTintAmt:.86,wind:.18,gust:.1})},zl={high:1.5,med:1,low:.5},Il=2e3,Fl=1200,Ll=160;function Ul(o){const t=zl[o];return{drops:Math.floor(Il*t),flakes:Math.floor(Fl*t),splashes:Math.floor(Ll*t)}}const Zn=(o,t)=>1-Math.exp(-Math.max(0,o)*t);class h1{constructor(t="clear"){I(this,"kind");I(this,"target");I(this,"params");I(this,"wet",0);I(this,"rate",1);I(this,"transitioning",!1);I(this,"version",0);this.kind=this.target=t,this.params={...As[t]},this.wet=this.params.wetTarget}set(t,e=4){if(!(t===this.target&&!(e<=0&&this.transitioning))){if(this.target=t,this.kind=t,this.version++,e<=0){Object.assign(this.params,As[t]),this.wet=this.params.wetTarget,this.transitioning=!1,this.rate=1;return}this.rate=4/e,this.transitioning=!0}}update(t){if(t<=0)return;const e=As[this.target],s=this.params,n=Zn(t,this.rate);let a=0;for(const r of Nl){let l=e[r];(r==="snow"&&l>0&&s.rain>.02||r==="rain"&&l>0&&s.snow>.02)&&(l=0);const c=(r==="rain"||r==="snow")&&l<s[r]?Math.min(1,n*1.6):n;s[r]+=(l-s[r])*c,a=Math.max(a,Math.abs(e[r]-s[r]))}this.transitioning&&a<.004&&(Object.assign(s,e),this.transitioning=!1);const i=Zn(t,s.wetTarget>this.wet?.25:.05);this.wet+=(s.wetTarget-this.wet)*i}windNow(t){const e=Math.max(0,Math.sin(t*.31)*Math.sin(t*.83+1.7));return this.params.wind+this.params.gust*e*e*1.6}get precipitating(){return this.params.rain>.01||this.params.snow>.01}}function u1(o){return .75+Math.min(1.4,o)*1.1}function f1(o,t,e,s=1){const n=1-(1-t.skyDark)*s;let a=o.r*n,i=o.g*n,r=o.b*n;const l=a*.2126+i*.7152+r*.0722,c=t.skyGrey*s;a+=(l-a)*c,i+=(l-i)*c,r+=(l-r)*c;const h=t.skyTintAmt*s,d=Math.max(.05,t.skyTintR*.2126+t.skyTintG*.7152+t.skyTintB*.0722),m=Math.max(l,.02)/d;return e.r=a+(Math.min(1,t.skyTintR*m)-a)*h,e.g=i+(Math.min(1,t.skyTintG*m)-i)*h,e.b=r+(Math.min(1,t.skyTintB*m)-r)*h,e}const d1={unit01:"clear",unit02:"overcast",unit03:"drizzleMist",unit04:"windGusts",unit05:"night",unit06:"lightRain"},Ol=new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0]),Bl=new Float32Array([0,0,1,0,1,1,0,1]),Gl=[0,1,2,0,2,3];function _s(o,t){const e=new Vi;e.setAttribute("position",new ct(Ol,3)),e.setAttribute("uv",new ct(Bl,2)),e.setIndex(Gl);const s=new Float32Array(o*4);let n=t>>>0;const a=()=>{n=n+1831565813>>>0;let i=n;return i=Math.imul(i^i>>>15,i|1),i^=i+Math.imul(i^i>>>7,i|61),((i^i>>>14)>>>0)/4294967296};for(let i=0;i<o;i++)s[i*4]=a(),s[i*4+1]=a(),s[i*4+2]=a(),s[i*4+3]=(i+a())/Math.max(1,o);return e.setAttribute("aRnd",new Hi(s,4)),e.instanceCount=o,e.boundingSphere=new ga(new C,1e6),e.boundingBox=new ca(new C(-1e6,-1e6,-1e6),new C(1e6,1e6,1e6)),e}const qn=`
attribute vec4 aRnd;
uniform vec3 uBoxMin;
uniform vec3 uVol;
uniform vec3 uOff;      // 累积位移（风 + 下落）
uniform vec3 uVel;      // 当前速度方向参考（只用于条纹朝向）
uniform float uIntensity;
uniform float uGroundY;
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
  float below = step(uGroundY, p.y);
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
`,Wl=`
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
`,Vl=`
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
`,Hl=`
attribute vec4 aRnd;
uniform vec3 uCamXZ;
uniform float uRadius;
uniform float uGroundY;
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
  vec3 wp = vec3(wp2.x + position.x * size * 2.0, uGroundY + 0.012, wp2.y + position.y * size * 2.0);
  vUv = uv;
  vAge = ph;
  float d = length(off) / uRadius;
  vA = vis * (1.0 - ph) * (1.0 - ph) * (1.0 - smoothstep(0.6, 1.0, d));
  vec4 mv = viewMatrix * vec4(wp, 1.0);
  gl_Position = vis > 0.5 ? projectionMatrix * mv : vec4(2.0, 2.0, 2.0, 1.0);
}
`,jl=`
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
`,$l=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,Xl=`
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
`,Yl=`
varying vec3 vW;
varying vec2 vUv;
void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vUv = uv; gl_Position = projectionMatrix * viewMatrix * w; }
`,Kl=`
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
`,Oe=new C;class m1{constructor(t){I(this,"object",new vt);I(this,"rain");I(this,"snow");I(this,"ripples");I(this,"glass");I(this,"puddle");I(this,"rainU");I(this,"snowU");I(this,"rippleU");I(this,"glassU");I(this,"puddleU");I(this,"disposables",[]);I(this,"off",new C);I(this,"snowOff",new C);I(this,"vel",new C(0,-9,0));I(this,"vol");I(this,"boxMin",new C);I(this,"t",0);I(this,"groundY");I(this,"opts");this.opts=t,this.groundY=t.groundY??0;const e=t.radius??12;this.vol=new C(e*2,14,e*2),this.object.name="weather-fx";const s=Ul(t.quality),n=()=>({uBoxMin:{value:this.boxMin},uVol:{value:this.vol},uOff:{value:this.off},uVel:{value:this.vel},uIntensity:{value:0},uGroundY:{value:this.groundY},uMode:{value:1},uLen:{value:.55},uWidth:{value:.012},uPx:{value:.0015},uT:{value:0},uColor:{value:new G(.62,.74,.86)},uOpacity:{value:.5}});this.rainU=n(),this.snowU=n(),this.snowU.uMode.value=0,this.snowU.uOff.value=this.snowOff,this.snowU.uWidth.value=.028,this.snowU.uColor.value=new G(.9,.95,1),this.snowU.uOpacity.value=.85,this.rippleU={uCamXZ:{value:new C},uRadius:{value:9},uGroundY:{value:this.groundY},uIntensity:{value:0},uT:{value:0},uColor:{value:new G(.7,.8,.9)},uOpacity:{value:.5}},this.glassU={uT:{value:0},uWet:{value:0},uSnow:{value:0},uSize:{value:new ut(1,1)},uTint:{value:new G(.6,.66,.72)},uOpacity:{value:1}},this.puddleU={uWet:{value:0},uSky:{value:new G(.55,.65,.78)}};const a=(r,l,c,h={})=>{const d=new wt({vertexShader:r,fragmentShader:l,uniforms:c,transparent:!0,depthWrite:!1,fog:!1,side:mt,...h});return this.disposables.push(d),d},i=(r,l,c,h)=>{this.disposables.push(r);const d=new K(r,l);return d.frustumCulled=!1,d.renderOrder=c,d.name=h,d.raycast=()=>{},d.visible=!1,this.object.add(d),d};if(t.mode==="outdoor"){if(this.rain=i(_s(s.drops,101),a(qn,Wl,this.rainU),12,"weather-rain"),this.snow=i(_s(s.flakes,202),a(qn,Vl,this.snowU),12,"weather-snow"),this.ripples=i(_s(s.splashes,303),a(Hl,jl,this.rippleU),11,"weather-ripples"),t.flatGround){const r=new At(60,60);r.rotateX(-Math.PI/2),this.puddle=i(r,a(Yl,Kl,this.puddleU,{polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),10,"weather-puddle")}}else if(t.mode==="window"&&t.window){const r=t.window,l=new At(r.width,r.height);this.glassU.uSize.value.set(r.width,r.height),this.glass=i(l,a($l,Xl,this.glassU),13,"weather-glass"),this.glass.position.set(r.x,r.y,r.z)}}setGround(t){this.groundY=t}get mode(){return this.opts.mode}update(t,e,s,n,a,i,r){this.t+=t;const l=e.params,c=this.opts.mode;if(c==="window"){if(!this.glass)return;const g=Math.min(1,l.rain*1.1+l.mist*.55),w=g>.01||l.snow>.01;this.glass.visible=w,w&&(this.glassU.uT.value=this.t,this.glassU.uWet.value=g,this.glassU.uSnow.value=l.snow,this.glassU.uTint.value.setRGB(.5+.2*n,.56+.2*n,.64+.2*n));return}if(c!=="outdoor")return;const h=.82*r*4.5,d=.57*r*4.5;this.vel.set(h,-9,d),this.off.x+=h*t,this.off.y+=-9*t,this.off.z+=d*t,this.snowOff.x+=h*.5*t,this.snowOff.y+=-1.3*t,this.snowOff.z+=d*.5*t,this.off.x%=this.vol.x*64,this.off.y%=this.vol.y*64,this.off.z%=this.vol.z*64,this.snowOff.x%=this.vol.x*64,this.snowOff.y%=this.vol.y*64,this.snowOff.z%=this.vol.z*64,s.getWorldDirection(Oe),Oe.y=0,Oe.lengthSq()>1e-4&&Oe.normalize();const m=s.position.x+Oe.x*this.vol.x*.18,p=s.position.z+Oe.z*this.vol.z*.18,u=s.position.y;this.boxMin.set(m-this.vol.x*.5,u-this.vol.y*.55,p-this.vol.z*.5);const v=2*Math.tan($.degToRad(i)/2)/Math.max(1,a),x=.25+.75*n,M=l.rain>.005;if(this.rain){this.rain.visible=M;const g=this.rainU;g.uT.value=this.t,g.uIntensity.value=l.rain,g.uGroundY.value=this.groundY,g.uPx.value=v,g.uOpacity.value=.42*x,g.uLen.value=.5+.2*l.rain}const f=l.snow>.005;if(this.snow){this.snow.visible=f;const g=this.snowU;g.uT.value=this.t,g.uIntensity.value=l.snow,g.uGroundY.value=this.groundY,g.uPx.value=v,g.uOpacity.value=.85*(.4+.6*x)}if(this.ripples){this.ripples.visible=M;const g=this.rippleU;g.uIntensity.value=l.rain,g.uT.value=this.t,g.uGroundY.value=this.groundY,g.uCamXZ.value.set(s.position.x,0,s.position.z),g.uOpacity.value=.5*x}if(this.puddle){const g=e.wet;this.puddle.visible=g>.2,this.puddle.visible&&(this.puddle.position.set(Math.round(s.position.x/4)*4,this.groundY+.012,Math.round(s.position.z/4)*4),this.puddleU.uWet.value=g,this.puddleU.uSky.value.setRGB(.4+.35*n,.48+.35*n,.6+.3*n))}}dispose(){for(const t of this.disposables)t.dispose();this.disposables.length=0,this.object.removeFromParent()}}class p1{constructor(){I(this,"roots",new Set);I(this,"applied",-1)}add(t){t&&!this.roots.has(t)&&(this.roots.add(t),this.applied=-1)}clear(){this.roots.clear(),this.applied=-1}invalidate(){this.applied=-1}apply(t){if(Math.abs(t-this.applied)<.01&&this.applied>=0)return;this.applied=t;const e=1-.34*t;for(const s of this.roots)s.traverse(n=>{const a=n;if(!a.isMesh)return;const i=Array.isArray(a.material)?a.material:[a.material];for(const r of i){const l=r;if(!l.isMeshStandardMaterial||!l.color)continue;let c=l.userData.wetBase;c||(c={r:l.color.r,g:l.color.g,b:l.color.b,rough:l.roughness},l.userData.wetBase=c),l.color.setRGB(c.r*e,c.g*e,c.b*(1-.3*t)),l.roughness=Math.max(.1,c.rough*(1-.5*t))}})}}const Zl={low:{pathSegments:10,radialSegments:4,lineRadius:.0014,buttonSegments:6},high:{pathSegments:22,radialSegments:5,lineRadius:.0011,buttonSegments:8}};function Qn(o,t,e){const s=Math.abs(o);let n=ot(s,t,e,0,1.33,0,.143,.17,.096);n=L(n,ot(s,t,e,.055,1.31,.028,.073,.061,.071),.055),n=L(n,ot(s,t,e,0,1.14,0,.126,.17,.09),.075),n=L(n,ot(s,t,e,0,.97,-.004,.145,.13,.104),.075),n=L(n,rt(s,t,e,.018,1.492,-.01,.147,1.417,-.002,.043,.047),.085),n=L(n,ot(s,t,e,.151,1.405,0,.048,.064,.061),.058),n=L(n,rt(s,t,e,0,1.46,-.02,0,1.535,-.02,.061,.046),.065),n=L(n,Ke(s,t,e,0,1.525,0,.074,.026),.02),n=L(n,Jt(s,t,e,.085,1.27,.094,.04,.03,.014,.006),.006),n=Ut(n,.88-t,.03),n=Ut(n,-rt(s,t,e,0,1.43,-.006,0,1.62,-.006,.058,.058),.014);const a=Math.atan2(e,o);return n+=(Math.sin(a*7+t*13)*.5+Math.sin(a*12-t*8+1.7)*.3)*(t<1.15?.0055:.0028),n}function Qs(o,t){let e=0,s=.32;if(Qn(o,t,e)>0)return .066;for(let n=0;n<18;n++){const a=(e+s)/2;Qn(o,t,a)<=0?e=a:s=a}return(e+s)/2+.004}function Vo(o,t){const e=$.clamp(Math.abs(t)/(o==="upperArm"?.28:.255),0,1);return o==="upperArm"?[$.lerp(.058,.046,e),$.lerp(.06,.046,e)]:[$.lerp(.039,.05,1-e),$.lerp(.038,.046,1-e)]}function ql(o,t,e){const[s,n]=Vo(o,e),a=Math.max(.12,1-(t/s)**2);return n*Math.sqrt(a)+.0035}function Ho(o,t,e,s){const n=`${t}:${e}:${s}`;let a=o.get(n);return a||(a={anchor:t,side:e,material:s,parts:[]},o.set(n,a)),a}function ae(o,t,e,s=e.lineRadius,n=!1){if(t.length<3)return;const a=new ss(t,n,"centripetal");o.parts.push(new ns(a,e.pathSegments,s,e.radialSegments,n))}function We(o){return o.map(([t,e])=>new C(t,e,Qs(t,e)))}function Ql(o,t){const e=[],s=t.pathSegments;for(let n=0;n<=s;n++){const a=$.lerp(-Math.PI/2,Math.PI/2,n/s),i=.057*Math.sin(a),r=1.495-.043*Math.cos(a);e.push(new C(i,r,Math.max(Qs(i,r),.086)))}ae(o,e,t,t.lineRadius*1.25)}function Wo(o,t,e,s,n,a,i=!1,r){const l=t-s/2,c=t+s/2,h=e-n/2,d=e+n/2,m=[[l+.006,h],[c-.006,h],[c,h+.006],[c,d-.006],[c-.006,d],[l+.006,d],[l,d-.006],[l,h+.006]],p=v=>v.map(x=>x.setZ(r??x.z)),u=p(We(m));ae(o,u,a,a.lineRadius*1.1,!0),i&&ae(o,p(We([[l+.006,d-.012],[t,d-.012],[c-.006,d-.012]])),a,a.lineRadius*1.15)}function Jl(o,t,e){const s=Ho(e,"torso",0,"cloth");if(Ql(s,t),o==="tee"){for(const r of[-1,1])ae(s,We([[r*.056,1.48],[r*.082,1.455],[r*.111,1.425],[r*.127,1.395]]),t,t.lineRadius);Wo(s,-.077,1.265,.045,.061,t,!0,.111);return}if(o==="hoodie"){const r=Ho(e,"torso",0,"trim");for(const l of[-1,1])ae(r,We([[l*.012,1.465],[l*.016,1.405],[l*.021,1.335]]),t,t.lineRadius*1.4);Wo(s,0,1,.178,.066,t,!1,.141);return}const n=Ho(e,"torso",0,"trim");ae(s,We([[0,1.49],[0,1.38],[0,1.25],[0,1.11],[0,.99]]),t,t.lineRadius*1.8);for(const r of[-1,1])ae(s,We([[r*.026,1.49],[r*.05,1.43],[r*.081,1.35],[r*.102,1.26]]),t,t.lineRadius*1.3),Wo(s,r*.09,1.045,.052,.06,t,!0);Wo(s,.078,1.267,.047,.052,t,!0,.111);const i=t.pathSegments>10?4:3;for(let r=0;r<i;r++){const l=$.lerp(1.405,1.055,r/(i-1)),c=new Rt(.0034,.0034,.0016,t.buttonSegments,1);c.rotateX(Math.PI/2),c.translate(0,l,Qs(0,l)),n.parts.push(c)}}function tc(o,t,e,s){const n=[];for(let a=0;a<s;a++){const i=a/s*Math.PI*2;n.push(new C(Math.cos(i)*o,e,Math.sin(i)*t))}return n}function Jn(o,t,e,s,n){const a=Ho(s,o,n,"cloth"),i=o==="upperArm"?-.265:-.226,[r,l]=Vo(o,i);ae(a,tc(r*1.04,l*1.04,i,e.pathSegments),e,e.lineRadius*1.35,!0);const c=o==="forearm"&&e.pathSegments>10?3:1;for(let h=0;h<c;h++){const d=o==="forearm"?-.025-h*.036:-.12,[m]=Vo(o,d),p=m*.72,u=[],v=e.pathSegments;for(let x=0;x<=v;x++){const M=x/v*2-1,f=M*p,g=d+.006*M+Math.sin((M+1)*Math.PI)*(h%2?-.0025:.0025);u.push(new C(f,g,ql(o,f,g)+.001))}ae(a,u,e,e.lineRadius*(o==="forearm"?1.2:1))}if(o==="upperArm"&&t!=="tee"&&e.pathSegments>10){const h=[];for(let d=0;d<=e.pathSegments;d++){const m=$.lerp(-.025,-.23,d/e.pathSegments),[p,u]=Vo(o,m);h.push(new C(n*p*1.01,m,u*.18+.002))}ae(a,h,e,e.lineRadius*.9)}}function ec(o){const t=Zl[o.detail],e=new Map;Jl(o.style,t,e);for(const n of[-1,1])Jn("upperArm",o.style,t,e,n),Jn("forearm",o.style,t,e,n);const s={torso:0,upperArm:1,forearm:2};return[...e.values()].sort((n,a)=>s[n.anchor]-s[a.anchor]||n.side-a.side||n.material.localeCompare(a.material)).map(n=>{const a=Xt(n.parts,!1);if(!a)throw new Error(`Could not merge garment details for ${n.anchor}:${n.side}:${n.material}`);return n.parts.forEach(i=>i.dispose()),a.computeBoundingBox(),a.computeBoundingSphere(),a.userData.garmentDetail={anchor:n.anchor,side:n.side,material:n.material},{anchor:n.anchor,side:n.side,material:n.material,geometry:a}})}let Ps;const Ae=.4;function oc(){if(!Ps){const o=Wa(Ae),t=Va(Ae),e=Ba(Ae);Ps={head:Oa(.58),hair:{short:Is(.5,"short"),long:Is(.5,"long")},jacket:Ga(Ae),upper:o,upperR:vo(o),lower:t,lowerR:vo(t),hand:e,handR:vo(e),thigh:Ha(Ae),shin:ja(Ae),boot:$a(Ae)}}return Ps}const ti=(()=>{let o;return()=>(o??(o={eyeWhite:new at({color:15854822,roughness:.25}),iris:new at({color:4861984,roughness:.3}),lip:new at({color:10113096,roughness:.5}),shoe:new at({color:4863526,roughness:.65}),phone:new at({color:2107181,roughness:.35,metalness:.3}),screen:new at({color:8049872,emissive:2071200,emissiveIntensity:.55,roughness:.3})}),o)})();function Z(o,t){const e=new K(o,t);return e.castShadow=!0,e.receiveShadow=!0,e.userData.isLandscapeStage=!0,e}function _e(o,t,e,s,n){return Z(new Se(o,t,e,1,Math.min(s,o/2.01,t/2.01,e/2.01)),n)}function Bt(o){return o?new ji:new vt}const ei={stand:{left:{shoulder:.04,elbow:-.15},right:{shoulder:-.04,elbow:-.15}},phone:{left:{shoulder:-.7,elbow:-1.35,side:-.06},right:{shoulder:-.7,elbow:-1.35,side:.06}},listen:{left:{shoulder:-.55,elbow:-.95},right:{shoulder:-.5,elbow:-.95}},talk:{left:{shoulder:-.5,elbow:-.95},right:{shoulder:-1.15,elbow:-.75,side:.1}},write:{left:{shoulder:-.55,elbow:-.9},right:{shoulder:-.85,elbow:-1.2,side:.05}},read:{left:{shoulder:-.38,elbow:-1,side:-.12},right:{shoulder:-.38,elbow:-1,side:.12}},walk:{left:{shoulder:.45,elbow:-.25},right:{shoulder:-.45,elbow:-.5}},point:{left:{shoulder:.04,elbow:-.15},right:{shoulder:-1.45,elbow:-.1,side:.12}},lap:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.42,elbow:-.55,side:-.08}},reach1:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.55,elbow:-.62,side:-.08}},reach2:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.78,elbow:-.72,side:-.1}},reach3:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.98,elbow:-.8,side:-.12}},reach4:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-1.12,elbow:-.86,side:-.12}}};function g1(o){const t=ti(),e=oc(),s=o.animated===!0,n=new vt;n.name="scene-person";const a=o.seated??!1,i=o.pose??(a?"listen":"stand"),r=new Set,l=(E,O,j={})=>{const Y=new at({color:E,roughness:O,metalness:.02,...j});return r.add(Y),Y},c=new G(o.skin??14858392),h=new G(o.shirt),d={h:0,s:0,l:0},m={h:0,s:0,l:0};h.getHSL(d),c.getHSL(m),Math.min(Math.abs(d.h-m.h),1-Math.abs(d.h-m.h))<.055&&d.s>.18&&Math.abs(d.l-m.l)<.24&&h.set(5205894).offsetHSL(0,0,(d.l-.5)*.2);const u=l(h.getHex(),.86,{side:mt}),v=l(o.trousers??3753562,.88),x=l(o.skin??14858392,.55,{emissive:3806728,emissiveIntensity:.05});x.name="person-skin";const M=new at({color:x.color.getHex(),roughness:.55,metalness:.02,vertexColors:!0,emissive:3806728,emissiveIntensity:.05});M.name="person-face";const f=new at({color:16777215,vertexColors:!0,roughness:.42,metalness:.08,side:mt});f.name="person-hair",r.add(M),r.add(f);const g=o.hair??2825494,w=l(new G(g).multiplyScalar(.8).getHex(),.7);w.name="person-face-detail";const y=a?.1:.91,S=Bt(s);S.position.y=y,S.rotation.x=o.lean??0,n.add(S);const k=Bt(s);k.position.y=-.91,S.add(k),k.add(Z(e.jacket,u));const b=Bt(s);b.position.y=1.5,b.rotation.x=i==="phone"||i==="read"?.38:i==="write"?.3:o.lean?-o.lean*.6:0,k.add(b),b.add(Z(e.head,M));const T=[],A=[],_=[];for(const E of[-1,1]){const O=Bt(s);O.position.set(E*.034,.2,.0685);const j=Z(new xt(.0125,16,12),t.eyeWhite);O.add(j);const Y=Bt(s);Y.position.z=.0118;const Mt=Z(new xt(.0072,12,10),t.iris);Mt.scale.set(1,1,.35),Y.add(Mt);const Pt=Z(new xt(.0021,8,6),t.eyeWhite);Pt.position.set(-.0022,.0027,.0023),Y.add(Pt),O.add(Y);const bt=Z(new Dt(.0118,.0017,5,16,Math.PI),x);bt.position.set(0,.001,.006),bt.scale.y=.72,O.add(bt),T.push(O),A.push(Y),b.add(O);const Q=Bt(s);Q.position.set(E*.037,.2165,.0885),Q.rotation.z=-E*.1;const _t=new ss([new C(-E*.015,-.001,0),new C(-E*.004,.003,.001),new C(E*.009,.002,0)]);Q.add(Z(new ns(_t,8,.0027,5,!1),w)),b.add(Q),_.push(Q)}const P=Bt(s);P.position.set(0,.132,.0875);const D=l(5515817,.78);D.name="person-face-detail";const R=Z(new xt(.0058,12,8),D);R.scale.set(1.7,.55,.4),P.add(R);const N=Z(new Es(.0023,.025,3,8),t.lip);N.rotation.z=Math.PI/2,N.scale.set(1,1,.55),N.position.y=.001,P.add(N);const z=Z(new Es(.0016,.019,3,8),x);z.rotation.z=Math.PI/2,z.position.set(0,-.0042,.001),P.add(z),b.add(P);const F=o.hairStyle??"short",W=(F==="long"?e.hair.long:e.hair.short).clone(),U=new G(g),V=(U.r+U.g+U.b)/3,B=W.attributes.color;for(let E=0;E<B.count;E++){const O=(B.getX(E)+B.getY(E)+B.getZ(E))/3/.05;B.setXYZ(E,U.r*O*(.35/Math.max(.05,V))*.6,U.g*O*(.35/Math.max(.05,V))*.6,U.b*O*(.35/Math.max(.05,V))*.6)}if(b.add(Z(W,f)),F==="bun"){const E=Z(new xt(.05,14,10),l(g,.7));E.scale.set(1,.9,1),E.position.set(0,.3,-.07),b.add(E)}if(o.helmet){const E=Z(new xt(.145,24,16),l(15659764,.3,{metalness:.2}));E.scale.set(1,1.12,1.08),E.position.y=.2,b.add(E);const O=Z(new xt(.12,20,12),l(1782855,.12,{metalness:.7}));O.scale.set(.95,.68,.55),O.position.set(0,.2,.108),b.add(O);const j=Z(new Dt(.1,.018,8,20),l(13226196,.4,{metalness:.5}));j.rotation.x=Math.PI/2,j.position.y=.07,b.add(j)}if(o.glasses){const E=l(1710618,.4,{metalness:.4});for(const j of[-1,1]){const Y=Z(new Dt(.0245,.0032,6,18),E);Y.position.set(j*.034,.2,.092),b.add(Y)}const O=Z(new Rt(.0028,.0028,.02,5),E);O.rotation.z=Math.PI/2,O.position.set(0,.204,.093),b.add(O)}const X=l(15657696,.9,{side:mt}),H=Z(new Dt(.07,.012,8,24),X);if(H.rotation.x=Math.PI/2,H.position.y=1.535,H.scale.set(1.05,1,1),k.add(H),o.scarf!==void 0){const E=Z(new Dt(.074,.032,8,20),l(o.scarf,.92));E.rotation.x=Math.PI/2,E.position.y=1.54,k.add(E)}if(o.backpack!==void 0){const E=_e(.29,.4,.15,.06,l(o.backpack,.85));E.position.set(0,1.27+.2-.2,-.155),k.add(E)}const tt=(Math.imul(o.shirt^(o.hair??0)*31,2654435761)>>>16)+(o.hairStyle==="long"?3:0),dt=o.outfit??(o.helmet||o.scarf!==void 0?"tee":["tee","hoodie","coat","dress","tee","hoodie"][tt%6]),pt=(o.hairStyle??"short")==="long",q=dt==="dress"&&!pt&&o.hairStyle!=="bun"?"coat":dt;if(q==="hoodie"&&!o.helmet){const E=Z(new Dt(.083,.03,10,24),u);E.rotation.x=Math.PI/2-.35,E.position.set(0,1.545,-.03),E.scale.set(1.05,1,1.15),k.add(E);const O=_e(.2,.09,.02,.01,u);O.position.set(0,1,.128),k.add(O)}if(!a&&(q==="coat"||q==="dress")){const E=q==="coat"?.62:.46,O=Z(new Rt(.19,q==="coat"?.235:.27,E,28,1,!0),u);if(O.scale.set(1.12,1,.9),O.position.y=1-E/2+.02,O.receiveShadow=!1,k.add(O),q==="coat"){const j=_e(.016,.5,.02,.006,X);j.position.set(0,1.25,.121),k.add(j)}}const et=o.hat??(tt%7===3&&!a?8010555:tt%7===5&&!a?3099231:void 0);if(et!==void 0&&!o.helmet){const E=l(et,.9),O=Z(new xt(.098,20,12,0,Math.PI*2,0,Math.PI*.52),E);O.scale.set(.9,1.06,1.06),O.position.set(0,.215,-.014),b.add(O);const j=Z(new Dt(.09,.012,8,20),E);j.rotation.x=Math.PI/2,j.scale.set(.92,1.08,1),j.position.set(0,.2,-.014),b.add(j)}const lt=ei[i],nt={},kt={};for(const E of[-1,1]){const O=E===1?lt.left:lt.right,j=Bt(s);j.position.set(E*.19,1.42,0),j.rotation.x=O.shoulder,j.rotation.z=(O.side??0)*E,k.add(j),j.add(Z(E===1?e.upper:e.upperR,u));const Y=Bt(s);Y.position.y=-.28,Y.rotation.x=O.elbow,j.add(Y),Y.add(Z(E===1?e.lower:e.lowerR,u));const Mt=Z(new xt(.043,12,9),u);Mt.scale.set(.95,.86,.95),Y.add(Mt);const Pt=Z(new Dt(.041,.008,6,16),X);Pt.rotation.x=Math.PI/2,Pt.position.y=-.252,Y.add(Pt);const bt=Bt(s);if(bt.position.y=-.27,Y.add(bt),bt.add(Z(E===1?e.hand:e.handR,x)),s&&E===1){const Q=new vt;Q.name="actor-book-prop";const _t=_e(.2,.03,.27,.008,l(3104138,.8));_t.position.set(-.12,-.12,.06),_t.rotation.set(1.2,0,.1),Q.add(_t),Q.userData.personDynamicAccessory=!0,Q.visible=i==="read",bt.add(Q),kt.book=Q;const ee=new vt;ee.name="actor-phone-prop";const ge=_e(.075,.016,.15,.006,t.phone);ge.position.set(-.05,-.1,.02),ge.rotation.set(-.4,0,.1),ee.add(ge);const Te=Z(new At(.062,.128),t.screen);Te.rotation.x=-Math.PI/2,Te.position.set(0,.0085,0),ge.add(Te),ee.userData.personDynamicAccessory=!0,ee.visible=i==="phone",bt.add(ee),kt.phone=ee}else if(i==="read"&&E===1){const Q=_e(.2,.03,.27,.008,l(3104138,.8));Q.position.set(-.12,-.12,.06),Q.rotation.set(1.2,0,.1),bt.add(Q)}if(s&&E===-1){const Q=new vt;Q.name="actor-pen-prop";const _t=Z(new Rt(.008,.008,.15,6),l(1911629,.4));_t.position.set(0,-.12,.03),_t.rotation.x=-.9,Q.add(_t),Q.userData.personDynamicAccessory=!0,Q.visible=i==="write",bt.add(Q),kt.pen=Q}else if(i==="write"&&E===-1){const Q=Z(new Rt(.008,.008,.15,6),l(1911629,.4));Q.position.set(0,-.12,.03),Q.rotation.x=-.9,bt.add(Q)}if(!s&&i==="phone"&&E===1){const Q=_e(.075,.016,.15,.006,t.phone);Q.position.set(-.05,-.1,.02),Q.rotation.set(-.4,0,.1),bt.add(Q);const _t=Z(new At(.062,.128),t.screen);_t.rotation.x=-Math.PI/2,_t.position.set(0,.0085,0),Q.add(_t)}E===1?nt.left={shoulder:j,elbow:Y,hand:bt}:nt.right={shoulder:j,elbow:Y,hand:bt}}const Tt={};for(const E of[-1,1]){const O=Bt(s);O.position.set(E*.09,.91,0),O.rotation.x=a?-Math.PI/2+.03:i==="walk"?.42*-E:0,k.add(O),O.add(Z(e.thigh,v));const j=Bt(s);j.position.y=-.42,j.rotation.x=a?Math.PI/2-.03:i==="walk"&&E===1?.55:.03,O.add(j);const Y=Z(new xt(.068,14,10),v);Y.scale.set(1,.86,.9),j.add(Y),j.add(Z(e.shin,v));const Mt=Bt(s);Mt.position.y=-.26,j.add(Mt);const Pt=e.boot.clone();Pt.translate(0,.26,0),Mt.add(Z(Pt,t.shoe)),E===1?Tt.left={hip:O,knee:j,ankle:Mt}:Tt.right={hip:O,knee:j,ankle:Mt}}if(s){const E=q==="hoodie"?"hoodie":q==="coat"||q==="dress"?"coat":"tee";for(const O of ec({style:E,detail:o.garmentDetail??"low"})){const j=O.anchor==="torso"?k:O.anchor==="upperArm"?O.side===1?nt.left.shoulder:nt.right.shoulder:O.side===1?nt.left.elbow:nt.right.elbow,Y=Z(O.geometry,O.material==="cloth"?u:X);Y.name=`garment-${O.anchor}-${O.side}-${O.material}`,Y.userData.garmentGeometry=!0,j.add(Y)}}if(n.scale.setScalar(o.scale??1),s){const E={body:S,head:b,arms:nt,legs:Tt,eyes:T,gazes:A,brows:_,mouth:P,props:kt,setExpression:()=>{},setPose:()=>{},update:()=>{}};sc(E,i,a,o.lean??0);const O=new Set([e.head,e.hair.short,e.hair.long,e.jacket,e.upper,e.upperR,e.lower,e.lowerR,e.hand,e.handR,e.thigh,e.shin,e.boot]);nc(n,O,r),n.userData.personRig=E,n.userData.ownedMaterials=r;const j=la(n,{body:E.body,bodyRestY:.91,head:E.head,props:[...[E.props.book,E.props.phone].filter(Y=>!!Y).map(Y=>({object:Y,hand:"LeftHand"})),...E.props.pen?[{object:E.props.pen,hand:"RightHand"}]:[]],grip:()=>{var Y,Mt,Pt;return(Y=E.props.book)!=null&&Y.visible||(Mt=E.props.phone)!=null&&Mt.visible||(Pt=E.props.pen)!=null&&Pt.visible?.6:0},leftArm:E.arms.left.shoulder,rightArm:E.arms.right.shoulder,leftElbow:E.arms.left.elbow,rightElbow:E.arms.right.elbow,leftHip:E.legs.left.hip,rightHip:E.legs.right.hip,leftKnee:E.legs.left.knee,rightKnee:E.legs.right.knee,leftAnkle:E.legs.left.ankle,rightAnkle:E.legs.right.ankle,blinkLeft:()=>1-E.eyes[1].scale.y,blinkRight:()=>1-E.eyes[0].scale.y,mouthOpen:()=>Math.max(0,E.mouth.scale.y-.08)*.65,smile:()=>Math.max(0,E.mouth.scale.x-1)*10,browLift:()=>Math.max(0,E.brows[0].position.y-.2165)*100,gazeX:()=>E.gazes[0].position.x*80,gazeY:()=>E.gazes[0].position.y*80},o.hairStyle==="long"||o.hairStyle==="bun"?"female":"male",{model:o.model,shirt:o.shirt,trousers:o.trousers,hair:o.hair,skin:o.skin,outfit:o.humanOutfit,aged:o.aged,glasses:o.glasses,seed:o.seed,look:o.humanLook});if(j){const Y=E.update;E.update=(...Mt)=>{Y(...Mt),j()}}}else Yr(n);return n}function ta(o,t,e,s){const n=ei[t],a=n.left,i=n.right,r=[{node:o.body,path:"position",axis:"y",value:e?.1:.91},{node:o.body,path:"rotation",axis:"x",value:s+(t==="talk"?-.025:0)},{node:o.body,path:"rotation",axis:"z",value:t==="talk"?.012:0},{node:o.head,path:"rotation",axis:"x",value:t==="phone"||t==="read"?.34:t==="write"?.25:t==="lap"||t.startsWith("reach")?-.035:-s*.5},{node:o.head,path:"rotation",axis:"y",value:t==="point"?.08:0},{node:o.arms.left.shoulder,path:"rotation",axis:"x",value:a.shoulder},{node:o.arms.left.shoulder,path:"rotation",axis:"z",value:a.side??0},{node:o.arms.left.elbow,path:"rotation",axis:"x",value:a.elbow},{node:o.arms.left.hand,path:"rotation",axis:"x",value:t==="phone"||t==="read"?-.14:-.04},{node:o.arms.right.shoulder,path:"rotation",axis:"x",value:i.shoulder},{node:o.arms.right.shoulder,path:"rotation",axis:"z",value:-(i.side??0)},{node:o.arms.right.elbow,path:"rotation",axis:"x",value:i.elbow},{node:o.arms.right.hand,path:"rotation",axis:"x",value:t==="phone"||t==="read"?-.14:-.04}];for(const l of[o.legs.left,o.legs.right])r.push({node:l.hip,path:"rotation",axis:"x",value:e?-Math.PI/2+.03:0},{node:l.knee,path:"rotation",axis:"x",value:e?Math.PI/2-.03:.03},{node:l.ankle,path:"rotation",axis:"x",value:0});return r}function Ds(o){return o.node[o.path][o.axis]}function ea(o,t){o.node[o.path][o.axis]=t}function oa(o){return o==="talk"?"talk":o==="listen"?"listen":o==="read"||o==="write"||o==="phone"?"think":o==="stand"?"softSmile":"neutral"}function sa(o){switch(o){case"listen":return[.0022,.018,.16,.15,0];case"think":return[8e-4,-.012,.1,0,7e-4];case"softSmile":return[0,0,.1,.38,0];case"talk":return[.0012,.006,.48,.08,0];default:return[0,0,.08,.02,0]}}function sc(o,t,e,s){let n=ta(o,t,e,s),a=n.map(d=>({...d,value:Ds(d)})),i=null,r=oa(t),l=sa(r),c=null,h=0;o.setExpression=(d,m=.24)=>{if(d===r)return;const p=sa(d);c=m>0?{from:l.slice(),to:p,elapsed:0,duration:m}:null,r=d,m<=0&&(l=p)},o.setPose=(d,m,p=.42)=>{n=ta(o,d,m,s);const u=n.map(x=>x.value),v=n.map((x,M)=>{const f=a[M];return Ds(f||x)});i=p>0?{from:v,to:u,elapsed:0,duration:p}:null,a=n.map((x,M)=>({...x,value:p>0?v[M]:u[M]})),p<=0&&a.forEach((x,M)=>ea(x,u[M])),o.setExpression(oa(d),Math.min(.32,p)),o.props.book&&(o.props.book.visible=d==="read"),o.props.phone&&(o.props.phone.visible=d==="phone"),o.props.pen&&(o.props.pen.visible=d==="write")},o.update=(d,m,p,u,v)=>{if(i){i.elapsed+=d;const S=Math.min(1,i.elapsed/i.duration),k=S*S*(3-2*S);a=n.map((b,T)=>({...b,value:$.lerp(i.from[T],i.to[T],k)})),S>=1&&(i=null)}for(const S of a)ea(S,S.value);if(c){c.elapsed+=d;const S=Math.min(1,c.elapsed/c.duration),k=S*S*(3-2*S);l=c.from.map((b,T)=>$.lerp(b,c.to[T],k)),S>=1&&(c=null)}const x=Math.sin(m*1.65+v)*.003;if(o.body.position.y+=p?Math.abs(Math.sin(u*2))*.007:x*.7,o.body.scale.y=1+x*.35,o.body.rotation.x+=p?.025:x*1.4,o.body.rotation.y=Math.sin(m*.47+v)*(p?.012:.008),o.body.rotation.z+=p?Math.sin(u)*.016:Math.sin(m*.72+v)*.009,o.head.rotation.y+=Math.sin(m*.38+v*1.7)*.027,o.head.rotation.z=Math.sin(m*.63+v)*.014,p){const S=Math.sin(u),k=Math.sin(u+Math.PI);o.legs.left.hip.rotation.x+=S*.36,o.legs.right.hip.rotation.x+=k*.36,o.legs.left.knee.rotation.x+=Math.max(0,Math.cos(u))*.62,o.legs.right.knee.rotation.x+=Math.max(0,Math.cos(u+Math.PI))*.62,o.legs.left.ankle.rotation.x=-o.legs.left.hip.rotation.x*.45-o.legs.left.knee.rotation.x*.7,o.legs.right.ankle.rotation.x=-o.legs.right.hip.rotation.x*.45-o.legs.right.knee.rotation.x*.7,o.arms.left.shoulder.rotation.x-=S*.19,o.arms.right.shoulder.rotation.x-=k*.19,o.arms.left.elbow.rotation.x+=.08+Math.max(0,S)*.12,o.arms.right.elbow.rotation.x+=.08+Math.max(0,k)*.12}else o.arms.left.shoulder.rotation.z+=Math.sin(m*.8+v)*.012,o.arms.right.shoulder.rotation.z-=Math.sin(m*.8+v)*.012;const M=$.euclideanModulo(m+v*1.31,4.2);o.eyes.forEach((S,k)=>{const b=$.euclideanModulo(M+k*.09,4.2),T=b<.13?Math.sin(b/.13*Math.PI):0;S.scale.y=1-T*.9;const A=o.gazes[k];if(A){const _=r==="listen"?Math.sin(m*.19+v*.8)*.0015:Math.sin(m*.31+v+k*.2)*.0022;A.position.x=_,A.position.y=Math.sin(m*.24+v*.7)*.0011-l[4]}});const[f,g,w,y]=l;o.brows.forEach((S,k)=>{const b=k===0?-1:1;S.position.y=.2165+f+Math.sin(m*.53+v+k*1.8)*(r==="listen"?4e-4:15e-5),S.rotation.z=-b*.1+b*g}),h+=r==="talk"?d*(5.5+Math.sin(m*1.9)*1.1):-h*Math.min(1,d*8),o.mouth.scale.x=1+y*.12-w*.08,o.mouth.scale.y=.08+w*(r==="talk"?.75+Math.sin(h)*.45:.32),o.mouth.rotation.z=y*.075+Math.sin(m*.55+v)*.004,o.mouth.position.y=.132+y*6e-4},o.setPose(t,e,0)}function nc(o,t,e){o.updateMatrixWorld(!0);const s=o.matrixWorld.clone().invert(),n=[],a=[];o.traverse(f=>{if(f.isBone&&a.push(f),f.isMesh){let g=f;for(;g&&g!==o&&!g.userData.personDynamicAccessory;)g=g.parent;g!=null&&g.userData.personDynamicAccessory||n.push(f)}});const i=new Map(a.map((f,g)=>[f,g])),r=new Map,l=new Set,c=ti(),h=f=>f===c.eyeWhite?"eyeWhite":f===c.iris?"iris":f===c.lip?"faceDetail":f===c.phone?"phone":f===c.screen?"screen":f.name==="person-hair"?"hair":f.name==="person-face-detail"?"faceDetail":f.name==="person-skin"||f.name==="person-face"?"skin":"cloth",d=f=>{if(f==="phone")return c.phone;if(f==="screen")return c.screen;const g={color:16777215,vertexColors:!0,metalness:.02,side:mt};f==="skin"?Object.assign(g,{roughness:.55,emissive:3806728,emissiveIntensity:.05}):f==="hair"?Object.assign(g,{roughness:.42,metalness:.08}):f==="eyeWhite"?Object.assign(g,{roughness:.3,metalness:0}):f==="iris"?Object.assign(g,{roughness:.34,metalness:0}):f==="faceDetail"?Object.assign(g,{roughness:.72,metalness:0}):Object.assign(g,{roughness:.86});const w=new at(g);return w.name=`person-${f}`,e.add(w),w},m=new Map;for(const f of n){let g=f;for(;g&&!g.isBone;)g=g.parent;if(!g)throw new Error(`Animated character mesh "${f.name}" has no bone parent`);const w=i.get(g);if(w===void 0)throw new Error("Animated character bone is absent from its skeleton");let y=f.geometry.clone();if(y.index){const R=y.toNonIndexed();y.dispose(),y=R}y.applyMatrix4(new st().multiplyMatrices(s,f.matrixWorld));const S=y.getAttribute("color");for(const R of Object.keys(y.attributes))["position","normal","color"].includes(R)||y.deleteAttribute(R);y.getAttribute("normal")||y.computeVertexNormals();const k=f.material,b=h(k),T=m.get(b)??d(b);m.set(b,T);const A=y.getAttribute("position").count;if(b!=="phone"&&b!=="screen"){const R=new Float32Array(A*3),N=k.color??new G(1,1,1);for(let z=0;z<A;z++){const F=k.vertexColors&&S&&z<S.count;R[z*3]=N.r*(F?S.getX(z):1),R[z*3+1]=N.g*(F?S.getY(z):1),R[z*3+2]=N.b*(F?S.getZ(z):1)}y.setAttribute("color",new gt(R,3))}else y.deleteAttribute("color"),b==="phone"&&y.deleteAttribute("uv");const _=new Uint16Array(A*4),P=new Float32Array(A*4);for(let R=0;R<A;R++)_[R*4]=w,P[R*4]=1;y.setAttribute("skinIndex",new da(_,4)),y.setAttribute("skinWeight",new gt(P,4));const D=r.get(b)??[];D.push(y),r.set(b,D),t.has(f.geometry)||l.add(f.geometry)}const p=new $i(a);p.calculateInverses();const u=new Set(n.map(f=>f.material).filter(f=>!Array.isArray(f)));for(const[f,g]of r){const w=Xt(g,!1);if(g.forEach(S=>S.dispose()),!w)throw new Error(`Could not merge animated character ${f} geometry`);const y=new Xi(w,m.get(f));y.name="person-skin",y.castShadow=!0,y.receiveShadow=!0,y.bind(p,o.matrixWorld.clone()),o.add(y)}n.forEach(f=>f.removeFromParent()),l.forEach(f=>f.dispose()),u.forEach(f=>{e.has(f)&&(f.dispose(),e.delete(f))});let v=0,x=0,M=0;o.traverse(f=>{var S;if(!f.isMesh)return;const g=f,w=g.geometry.getAttribute("position").count;M+=w,x+=(((S=g.geometry.index)==null?void 0:S.count)??w)/3;let y=f;for(;y&&y!==o&&!y.userData.personDynamicAccessory;)y=y.parent;y!=null&&y.userData.personDynamicAccessory&&(v+=1)}),o.userData.personGeometryStats={draws:r.size+v,triangles:x,vertices:M,joints:a.length}}function Js(o){const t=$.clamp(o,0,1);return .025+.02*Math.sin(t*Math.PI)+.006*t}function ac(o,t=10){const e=new ke,s=a=>o*(.004+a*.201);e.moveTo(s(0),.014),e.lineTo(s(1),.014);for(let a=t;a>=0;a--){const i=a/t;e.lineTo(s(i),Js(i))}e.closePath();const n=new Fe(e,{depth:.274,steps:1,bevelEnabled:!1,curveSegments:1});return n.translate(0,0,-.137),n}function ic(o){const t=[],e=[];for(let a=0;a<10;a++){const i=-.108+a*.022,r=a===0?.68:a===5||a===9?.58:.86+a%3*.025,l=a===0?.004:.0018,c=a===0?2:5+a%2,h=.023,d=(r-.13-h*(c-1))/c;for(let m=0;m<c;m++){const p=t.length/3,u=.13+m*(d+h);for(let v=0;v<=2;v++){const x=u+d*v/2,M=o*(.004+x*.201),f=Js(x)+.001;if(t.push(M,f,i,M,f,i+l),v===2)continue;const g=p+v*2,w=[g,g+1,g+2,g+1,g+3,g+2];e.push(...o===1?w:[g,g+2,g+1,g+1,g+2,g+3])}}}const n=new Ot;return n.setAttribute("position",new gt(t,3)),n.setIndex(e),n.computeVertexNormals(),n}function rc(){const o=[],t=[],e=Js(.5771144278606964)+.0018;for(let n=0;n<=10;n++){const a=.065+n*.0115,i=$.clamp((a-.137)/.043,0,1),r=e-i*i*.032;if(o.push(.114,r,a,.126,r,a),n<10){const l=n*2;t.push(l,l+2,l+1,l+1,l+2,l+3)}}const s=new Ot;return s.setAttribute("position",new gt(o,3)),s.setIndex(t),s.computeVertexNormals(),s}function lc(o,t=.055){const e=new ke;e.absarc(0,0,o*1.05,0,Math.PI*2,!1);const s=new Yi;s.absarc(0,0,o*.86,0,Math.PI*2,!0),e.holes.push(s);const n=new Fe(e,{depth:t,bevelEnabled:!1,steps:1,curveSegments:16});return n.rotateX(-Math.PI/2),n}function cc(){const o=[0,0,0],t=8;for(let n=0;n<t;n++){const a=n/t*Math.PI*2,i=.55+Math.cos(a)*.55;o.push(Math.sin(a)*.32,i*i*.2,i)}const e=[];for(let n=0;n<t;n++)e.push(0,n+1,(n+1)%t+1);const s=new Ot;return s.setAttribute("position",new gt(o,3)),s.setIndex(e),s.computeVertexNormals(),s}function v1(o="high"){const t=(s,n=.85,a=.02,i={})=>{const r=new at({color:s,roughness:n,metalness:a,...i});return r.fog=!1,r},e=[10173754,3104138,4160079,13081146,6965898,14209208,8018490,2964038];return{detail:o,kit:new Ua,m:Kr(),p:{books:e.map(s=>t(s,.82)),fabricRed:t(11553344,.95,0,{side:mt}),fabricBlue:t(3891087,.95,0,{side:mt}),fabricGreen:t(5077589,.95,0,{side:mt}),fabricGrey:t(8225932,.95,0,{side:mt}),fabricCream:t(15261382,.95,0,{side:mt}),screenOn:t(8049872,.3,.1,{emissive:2071200,emissiveIntensity:.7}),screenOff:t(1317150,.2,.4),boardGreen:t(3099199,.9),boardWhite:t(15790056,.6),ceramic:t(15854818,.35),leather:t(5913128,.7,.05),plasticDark:t(2106923,.45,.2),printInk:t(4278605,.98,0),water:Cl({depth:.55,quality:o==="low"?"low":"high"}),canvasOlive:t(8359786,.95,0,{side:mt})}}}const na=new st,aa=new st,hc=new st,ia=new os;class oi{constructor(t,e=0,s=0,n=0,a=0,i=1,r=new st){this.kit=t,this.x=e,this.y=s,this.z=n,this.ry=a,this.s=i,this.base=r,this.base=new st().makeTranslation(e,s,n).multiply(new st().makeRotationY(a)).multiply(new st().makeScale(i,i,i))}child(t,e,s,n=0){const a=new oi(this.kit,0,0,0,0,1);return a.base=this.base.clone().multiply(na.makeTranslation(t,e,s)).multiply(aa.makeRotationY(n)),a}put(t,e,s=0,n=0,a=0,i=0,r=0,l=0,c=1,h=1,d=1){ia.set(i,r,l);const m=this.base.clone().multiply(na.makeTranslation(s,n,a)).multiply(aa.makeRotationFromEuler(ia)).multiply(hc.makeScale(c,h,d));this.kit.addMatrix(t,e,m)}box(t,e,s,n,a,i,r,l=.02,c=0,h=0,d=0){this.put(La(e,s,n,l),t,a,i+s/2,r,c,h,d)}cyl(t,e,s,n,a,i,r,l=20){this.put(Ye(e,s,n,l),t,a,i+n/2,r)}strut(t,e,s,n,a=6){this.put(Xr(e,s,n,a),t)}ball(t,e,s,n,a,i=1,r=1,l=1){this.put(new xt(e,14,10),t,s,n,a,0,0,0,i,r,l)}}function x1(o,t,e=1.8){const{m:s}=o;for(let n=0;n<4;n++)t.box(s.wood,e,.035,.085,0,.44,-.18+n*.1,.008);for(let n=0;n<3;n++)t.box(s.wood,e,.08,.03,0,.62+n*.12,-.27-n*.02,.008,-.12);for(const n of[-1,1]){const a=n*(e-.12)/2;for(const r of[-.23,.19])t.box(s.darkSteel,.1,.035,.13,a,0,r,.006),t.strut(s.darkSteel,[a,.035,r],[a,.435,r*.78],.026,8);t.strut(s.darkSteel,[a,.425,-.28],[a,.425,.23],.027,8),t.strut(s.darkSteel,[a,.4,-.27],[a,.96,-.35],.024,8);const i=new ss([new C(a,.58,.2),new C(a,.65,.13),new C(a,.66,-.14),new C(a,.63,-.29)]);if(t.put(new ns(i,o.detail==="high"?12:6,.024,6,!1),s.darkSteel),t.strut(s.darkSteel,[a,.45,.18],[a,.61,.18],.02,6),o.detail==="high"){for(let r=0;r<4;r++)t.cyl(s.steel,.008,.008,.004,a,.476,-.18+r*.1,6);for(let r=0;r<3;r++)t.put(Ye(.008,.008,.004,6),s.steel,a,.66+r*.12,-.248-r*.02,Math.PI/2)}}}function w1(o,t,e=o.m.wood){const{m:s}=o;t.box(e,.42,.04,.42,0,.44,0,.01),t.box(e,.42,.34,.03,0,.5,-.2,.01,-.08);for(const n of[-1,1])for(const a of[-1,1])t.cyl(s.woodDark,.018,.022,.44,n*.18,0,a*.18,8);t.box(s.woodDark,.38,.02,.02,0,.18,.18,.005)}function M1(o,t,e=.46){t.cyl(o.m.wood,.17,.17,.04,0,e-.04,0,20);for(let s=0;s<3;s++){const n=s/3*Math.PI*2;t.strut(o.m.woodDark,[Math.cos(n)*.13,e-.04,Math.sin(n)*.13],[Math.cos(n)*.2,0,Math.sin(n)*.2],.018,6)}}function y1(o,t,e=1.4,s=.8,n=.75,a=o.m.wood){t.box(a,e,.045,s,0,n-.045,0,.012);for(const i of[-1,1])for(const r of[-1,1])t.box(o.m.woodDark,.06,n-.045,.06,i*(e/2-.08),0,r*(s/2-.08),.01);t.box(o.m.woodDark,e-.2,.05,.03,0,n-.13,s/2-.08,.008)}function b1(o,t,e=.6,s=.74){t.cyl(o.m.wood,e,e,.04,0,s-.04,0,36),t.cyl(o.m.woodDark,.05,.07,s-.04,0,0,0,12),t.cyl(o.m.woodDark,.28,.3,.04,0,0,0,20)}function S1(o,t,e=1.5,s=.75,n=.75){const{m:a}=o;t.box(a.wood,e,.04,s,0,n-.04,0,.012),t.box(a.woodDark,.04,n-.04,s-.06,-e/2+.05,0,0,.008),t.box(a.woodDark,.5,n-.04,s-.06,e/2-.3,0,0,.008);for(let i=0;i<3;i++)t.box(a.wood,.44,.17,.02,e/2-.3,.06+i*.21,s/2-.02,.006),t.box(a.brass,.1,.014,.014,e/2-.3,.14+i*.21,s/2+.005,.004)}function k1(o,t,e=2.2,s=2.4,n=5,a=1){const{m:i,p:r}=o,l=ls(a);t.box(i.woodDark,.05,s,.34,-e/2+.025,0,0,.008),t.box(i.woodDark,.05,s,.34,e/2-.025,0,0,.008),t.box(i.woodDark,e,s,.02,0,0,-.16,.006),t.box(i.wood,e,.05,.36,0,s,0,.01);const c=(s-.1)/n;for(let h=0;h<=n;h++)t.box(i.wood,e-.08,.035,.32,0,.05+h*c,0,.008);for(let h=0;h<n;h++){let d=-e/2+.08;for(;d<e/2-.12;){const m=.03+l()*.035,p=c*(.55+l()*.38);l()>.07&&t.box(r.books[Math.floor(l()*r.books.length)],m,p,.22+l()*.05,d+m/2,.085+h*c,.01,.004,0,0,(l()-.5)*(l()>.9?.4:0)),d+=m+.004}}}function T1(o,t,e=4,s=3){const n=ls(s);let a=0;for(let i=0;i<e;i++){const r=.03+n()*.03,l=o.p.books[Math.floor(n()*o.p.books.length)],c=Math.max(.1,.26-i*.012),h=t.child(0,a,0,(n()-.5)*.4);if(h.box(l,c,.003,.19,0,0,0,.001),h.box(o.m.paper,c-.01,r-.006,.18,.002,.003,0,.001),h.box(l,c,.003,.19,0,r-.003,0,.001),h.box(l,.006,r,.19,-c/2+.003,0,0,.001),o.detail==="high"){for(const d of[-.06,.06])h.box(o.m.brass,.001,r*.6,.006,-c/2-6e-4,r*.2,d,0);h.box(o.m.brass,c*.45,8e-4,.035,0,r+2e-4,0,0)}a+=r}}function A1(o,t){for(const e of[-1,1])t.box(o.p.leather,.216,.009,.3,e*.108,.002,0,.003),t.put(ac(e,o.detail==="high"?10:4),o.m.paper),o.detail==="high"&&t.put(ic(e),o.p.printInk);t.strut(o.p.leather,[0,.015,-.15],[0,.015,.15],.008,8),o.detail==="high"&&t.put(rc(),o.p.fabricRed)}function _1(o,t,e=.62,s=.36,n=o.p.screenOn){t.cyl(o.p.plasticDark,.1,.13,.015,0,0,0,16),t.box(o.p.plasticDark,.04,.2,.03,0,.01,0,.006),t.box(o.p.plasticDark,e+.03,s+.03,.03,0,.2,0,.01),t.put(new At(e,s),n,0,.2+(s+.03)/2,.0166)}function P1(o,t,e=o.p.screenOn){t.box(o.m.steel,.34,.015,.23,0,0,0,.005),t.box(o.p.plasticDark,.292,.0015,.101,0,.0152,-.026,.001),t.box(o.p.plasticDark,.098,.001,.048,0,.0153,.073,.001),t.box(o.m.steel,.094,.001,.044,0,.0164,.073,.001),t.strut(o.m.darkSteel,[-.115,.018,-.103],[.115,.018,-.103],.008,8);const s=.3,n=Math.cos(s),a=Math.sin(s),i=(r,l,c,h,d)=>t.put(r,l,c,.018+h*n+d*a,-.103-h*a+d*n,-s);if(i(La(.34,.22,.009,.004),o.m.steel,0,.11,0),i(new At(.315,.193),o.p.plasticDark,0,.11,.005),i(new At(.295,.169),e,0,.11,.0056),o.detail==="high"){for(let r=0;r<4;r++)for(let l=0;l<10;l++)t.box(o.m.darkSteel,.023,.0018,.017,-.125+l*.0278,.0168,-.063+r*.023,5e-4);t.box(o.m.darkSteel,.11,.0018,.013,0,.0168,.026,5e-4);for(const r of[-.157,.157])for(let l=0;l<6;l++)t.box(o.p.plasticDark,.003,6e-4,.01,r,.0155,-.067+l*.016,0);i(new At(.258,.009),o.m.paper,0,.174,.0059);for(let r=0;r<4;r++)i(new At(.16-r*.018,.003),o.m.paper,-.024,.145-r*.02,.0059);i(new At(.003,.003),o.p.plasticDark,0,.212,.0058)}}function D1(o,t,e=o.p.screenOn){t.box(o.p.plasticDark,.07,.008,.145,0,0,0,.004),t.put(new At(.062,.13),e,0,.0085,0,-Math.PI/2)}function R1(o,t){t.box(o.m.woodDark,.6,1,.45,0,0,0,.015),t.box(o.m.wood,.7,.04,.55,0,1,0,.01,-.28),t.box(o.m.brass,.4,.012,.012,0,.98,.22,.003)}function C1(o,t,e=2.4,s=1.2,n=o.p.boardGreen){t.box(o.m.woodDark,e+.12,s+.12,.05,0,0,0,.012),t.box(n,e,s,.02,0,.06,.03,.006),t.box(o.m.wood,e*.7,.04,.08,0,.04,.07,.008)}function E1(o,t,e=.5,s=5){const n=ls(s);t.put(new Rt(e,e*1.04,.38,24,1,!0),o.m.stoneDark,0,.19,0),t.put(lc(e,.08),o.m.stone,0,.355,0),t.cyl(o.m.soil,e*.88,e*.88,.045,0,.31,0,24);const a=Ca();for(const i of Ia(s*13+5,e*.62,o.detail==="high"?96:30)){const r=i.attributes.color;for(let l=0;l<r.count;l++)r.setXYZ(l,r.getX(l)*.82,r.getY(l)*.82,r.getZ(l)*.82);t.put(i,a,0,.66,0)}for(let i=0;i<(o.detail==="high"?7:3);i++){const r=n()*Math.PI*2,l=Math.sqrt(n())*e*.6,c=Math.cos(r)*l,h=Math.sin(r)*l,d=.78+n()*.22,m=e*(.12+n()*.05);t.strut(o.m.leaf,[c*.85,.35,h*.85],[c,d,h],.008,5);const p=t.child(c,d,h,r),u=o.detail==="high"?6:4;for(let v=0;v<u;v++)p.put(cc(),i%2?o.p.fabricCream:o.p.fabricRed,0,0,0,0,v/u*Math.PI*2,0,m,m,m);p.put(new xt(m*.25,8,5),o.p.books[3],0,.008,0,0,0,0,1,.55,1)}}function N1(o,t,e=3.4){t.cyl(o.m.slate,.14,.18,.18,0,0,0,10),t.cyl(o.m.slate,.045,.065,e,0,.18,0,8),t.strut(o.m.slate,[0,e+.18,0],[.45,e+.3,0],.03,5),t.put(new Qe(.26,.2,8),o.m.slate,.5,e+.34),t.cyl(o.m.lampGlass,.12,.18,.32,.5,e-.02,0,8)}function z1(o,t,e,s=1,n=o.m.steel){const a=Math.max(2,Math.round(e/1));for(let i=0;i<=a;i++)t.cyl(n,.02,.025,s,i/a*e,0,0,8);t.box(n,e,.04,.04,e/2,s,0,.01),t.box(n,e,.025,.025,e/2,s*.5,0,.006)}function I1(o,t,e=2,s=4,n=.17,a=.32){for(let i=0;i<s;i++)t.box(o.m.stoneWarm,e,n*(i+1),a,0,0,i*a,.015)}function F1(o,t,e=.6,s=.45,n=.5){t.box(o.m.wood,e,s,n,0,0,0,.012);for(let a=1;a<3;a++)t.box(o.m.woodDark,e+.004,.025,n+.004,0,s*a/3,0,.004);for(const a of[-1,1])t.box(o.m.woodDark,.04,s+.004,n+.004,a*(e/2-.03),0,0,.004)}function L1(o,t,e=.28,s=.7){t.put(Ye(e*.92,e*.92,s,20),o.m.woodDark,0,s/2,0),t.put(Ye(e,e,s*.5,20),o.m.woodDark,0,s/2,0);for(const n of[.14,.4,.6])t.put(new Dt(e*.98,.012,5,24),o.m.darkSteel,0,n*(s/.74),0,Math.PI/2)}function U1(o,t,e=.5,s=.7,n=.25,a=o.p.fabricBlue){t.box(a,e,s,n,0,.05,0,.04),t.box(o.m.darkSteel,.03,s*.5,.03,0,s+.05,-n*.2,.005),t.box(o.m.darkSteel,e*.5,.025,.03,0,s+.28,-n*.2,.005);for(const i of[-1,1])t.cyl(o.p.plasticDark,.025,.025,.05,i*(e/2-.06),0,0,10)}function O1(o,t,e=.6,s=.45,n=o.p.fabricCream){t.box(o.m.woodDark,e+.06,s+.06,.03,0,0,0,.008),t.put(new At(e,s),n,0,s/2+.03,.017)}function B1(o,t,e=.2){t.cyl(o.m.brass,.1,.12,.03,0,0,0,16),t.cyl(o.m.brass,.015,.015,.2,0,.03,0,8),t.put(new xt(e,24,16),o.p.fabricBlue,0,.3+e*.5,0,.4),t.put(new Dt(e*1.08,.01,6,36,Math.PI*1.5),o.m.brass,0,.3+e*.5,0,.4,Math.PI/2)}function G1(o,t){t.cyl(o.p.ceramic,.055,.055,.008,0,0,0,16),t.cyl(o.p.ceramic,.04,.03,.065,0,.008,0,16),t.put(new Dt(.02,.006,5,10,Math.PI),o.p.ceramic,.05,.04,0,0,0,-Math.PI/2)}function W1(o,t,e=2.4,s=1,n=8,a=o.p.fabricRed,i=o.p.fabricCream){for(let r=0;r<n;r++)t.box(r%2?i:a,e/n,.015,s,-e/2+(r+.5)*(e/n),2.3,s/2,.004,.32);t.box(o.m.woodDark,e+.06,.05,.05,0,2.62,.02,.01);for(const r of[-1,1])t.cyl(o.m.woodDark,.025,.03,2.4,r*(e/2),0,s-.05,8)}function V1(o,t,e=1.4,s=o.m.terracottaRoof){for(const[n,a]of[[-1,-1],[1,-1],[-1,1],[1,1]])t.cyl(o.m.woodDark,.06,.07,2.4,n*e,0,a*e,10);t.box(o.m.woodDark,e*2+.2,.1,.1,0,2.4,-e,.01),t.box(o.m.woodDark,e*2+.2,.1,.1,0,2.4,e,.01),t.box(o.m.woodDark,.1,.1,e*2+.2,-e,2.4,0,.01),t.box(o.m.woodDark,.1,.1,e*2+.2,e,2.4,0,.01),t.put(new Qe(e*1.7,1,4),s,0,3,0,0,Math.PI/4),t.ball(o.m.brass,.07,0,3.55,0)}const si=.045;function uc(o,t){const e=Math.min(1.65,t-.35),s=Math.min(.56,Math.max(.2,(o-1.25)/2)),n=Math.min(1.2,t-.8),a=Math.min(.64,t-n-.16),i=.025,r=.025,l=.05,c=Math.max(i,r,si),h=o/2-l-c-s/2;return[{kind:"door",x:0,y:.3,width:Math.min(.82,o-.08),height:e},{kind:"window",x:-h,y:n,width:s,height:a,sillOverhang:i,lintelOverhang:r},{kind:"window",x:h,y:n,width:s,height:a,curtain:!0,sillOverhang:i,lintelOverhang:r}]}function fc(o,t,e,s,n,a,i,r){const l=[...new Set([-e/2,e/2,...r.flatMap(c=>[c.x-c.width/2,c.x+c.width/2])])].sort((c,h)=>c-h);for(let c=0;c<l.length-1;c++){const h=l[c],d=l[c+1];if(d-h<.006)continue;const m=(h+d)/2,p=r.filter(v=>m>v.x-v.width/2&&m<v.x+v.width/2).sort((v,x)=>v.y-x.y);let u=a;for(const v of p){const x=$.clamp(v.y,a,s),M=$.clamp(v.y+v.height,a,s);x-u>.006&&o.box(t,d-h,x-u,i,m,u,n-i/2,0),u=Math.max(u,M)}s-u>.006&&o.box(t,d-h,s-u,i,m,u,n-i/2,0)}}function H1(o,t,e=2.4,s=2.6,n=2.2,a=o.m.terracottaRoof,i=o.m.paper){const{m:r}=o,l=.3,c=Math.max(.1,s-l),h=Math.min(.16,n*.12),d=n/2,m=uc(e,s),p=m[0],u=m.slice(1);t.box(r.stoneDark,e+.1,l,n+.1,0,0,0,.02),t.box(i,h,c,n,-e/2+h/2,l,0,0),t.box(i,h,c,n,e/2-h/2,l,0,0),t.box(i,e,c,h,0,l,-n/2+h/2,0),fc(t,i,e,s,d,l,h,m),t.put(On(e+.5,.95+e*.12,n+.5),a,0,s,0),t.put(On(e+.3,.8+e*.12,n+.3),r.woodDark,0,s-.04,0,0,0,0,1,.97,.99);const v=.06,x=d+.008,M=p.x-p.width/2,f=p.x+p.width/2,g=d-h/2+.01,w=Math.max(.2,p.height-.08),y=p.y+w;t.box(r.woodDark,v,w,h+.04,M+v/2,p.y,g,.008),t.box(r.woodDark,v,w,h+.04,f-v/2,p.y,g,.008),t.box(r.woodDark,p.width,.08,h+.04,p.x,y,g,.008);const S=Math.max(.48,p.width-v*2-.08),k=p.height-.11;if(t.box(r.wood,S,k,.055,p.x,p.y,x,.008),o.detail==="high"){for(const b of[p.y+.56,p.y+1.12])b<p.y+k-.04&&t.box(r.woodDark,S-.08,.025,.012,p.x,b,x+.034,.003);for(const b of[-.14,0,.14])t.box(r.woodDark,.012,k-.12,.012,p.x+b,p.y+.06,x+.034,.002);for(const b of[p.y+.16,p.y+p.height-.22])t.box(r.brass,.035,.075,.012,M+v/2,b,x+.038,.003)}t.box(r.stoneWarm,Math.max(.9,p.width+.38),.16,.45,0,0,d+.22,.02),t.box(r.brass,.05,.05,.04,p.x+Math.min(.24,S*.4),p.y+Math.min(.75,k*.49),x+.04,.008);for(const b of u){const T=t.child(b.x,b.y,d+.006);dc(o,T,b.width,b.height,{cols:o.detail==="high"?2:1,rows:o.detail==="high"?2:1,curtain:o.detail==="high"&&b.curtain,lit:!0,frame:r.woodDark,recess:h+.03,sillOverhang:b.sillOverhang,lintelOverhang:b.lintelOverhang});const A=h,_=d-A/2;for(const P of[-1,1])t.box(r.woodDark,.025,b.height,A,b.x+P*b.width/2,b.y,_,.003)}t.box(r.stoneDark,.32,1,.32,e/2-.45,s+.15,-n/4,.02)}function j1(o,t,e=2.4,s=1,n=1){t.put(Ye(e+.28,e+.34,.3,40),o.m.stoneDark,0,.15,0,0,0,0,s,1,n),t.put(Ye(e,e,.2,40),o.p.water,0,.27,0,0,0,0,s,1,n)}function $1(o,t,e=3.2,s=1,n=o.p.fabricCream,a=o.m.woodDark){const{m:i}=o,r=e*.3,l=e*.22,c=new ke;c.moveTo(-e/2,l),c.lineTo(-e*.36,0),c.lineTo(e*.3,0),c.quadraticCurveTo(e*.5,l*.25,e/2+.12,l*.92),c.lineTo(-e/2,l);const h=new Fe(c,{depth:r,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});h.translate(0,0,-r/2),t.put(h,a,0,.05,0),t.box(o.p.fabricRed,e*.98,.05,.04,0,l*.95,r/2+.02,.01),t.box(o.p.fabricRed,e*.98,.05,.04,0,l*.95,-r/2-.02,.01),t.box(i.wood,e*.9,.04,r*.92,0,l*.9,0,.01);for(let m=0;m<9;m++)for(const p of[-1,1])t.box(i.woodDark,.02,l*.22,.02,-e*.42+m*e*.1,l*.95,p*(r/2-.02),.004);t.box(i.woodDark,e*.22,l*.55,r*.7,-e*.3,l*.92,0,.02),t.box(i.slate,e*.1,.1,.02,-e*.3,l*1.25,r*.36,.005),t.box(i.woodDark,.02,l*.6,r*.12,-e/2-.02,l*.2,0,.004),t.strut(i.woodDark,[-e/2-.02,l*.75,0],[-e/2+.2,l*1,0],.012,5),t.strut(i.woodDark,[e/2-.1,l*.95,0],[e/2+.28,l*1.35,0],.02,6),t.put(new Dt(.05,.01,6,14,Math.PI),i.darkSteel,e*.36,l*.9,r/2+.05,0,0,Math.PI),t.strut(i.darkSteel,[e*.36,l*.9,r/2+.05],[e*.36,l*.9+.14,r/2+.05],.008,4),t.cyl(i.wood,.07,.07,.04,e*.2,l*.93,r*.25,12);const d=e*.5/Math.max(1,s);for(let m=0;m<s;m++){const p=e*.12-m*d*.9,u=e*(.95-m*.12),v=l*.92;t.cyl(i.woodDark,.022,.04,u,p,v,0,10);const x=v+u*.92,M=v+u*.3,f=e*.34;t.strut(i.woodDark,[p,x,-f/2],[p,x,f/2],.014,6),t.strut(i.woodDark,[p,M,-f/2*1.1],[p,M,f/2*1.1],.016,6);const g=new At(1,1,12,10),w=g.attributes.position,y=x-M;for(let S=0;S<w.count;S++){const k=w.getX(S)+.5,b=w.getY(S)+.5,T=f/2*(.78+.22*(1-b)),A=(k-.5)*2*T,_=M+b*y,P=Math.sin(k*Math.PI)*Math.sin(b*Math.PI*.9+.2)*.1*e*.3;w.setXYZ(S,P,_,A)}g.computeVertexNormals(),t.put(g,n,p,0,0);for(let S=1;S<5;S++)t.strut(i.woodDark,[p+.012,M+y*S/5,-f/2*.86],[p+.012,M+y*S/5,f/2*.86],.004,4);t.cyl(i.woodDark,.07,.06,.04,p,x+.02,0,10),t.strut(i.steel,[p,v+u,0],[e/2+.05,l*.9,0],.008,4),t.strut(i.steel,[p,v+u,0],[-e/2,l*1,0],.008,4);for(const S of[-1,1]){t.strut(i.steel,[p,x,0],[p,l*.95,S*(r/2+.03)],.006,4);for(let k=1;k<6;k++){const b=k/6;t.strut(i.steel,[p,x-(x-l*.95)*b,S*(r/2+.03)*b],[p+.001,x-(x-l*.95)*b,S*(r/2+.03)*b+0],.004,3)}}m===0&&t.box(o.p.fabricRed,.22,.14,.01,p+.11,v+u+.06,0,.003)}}function X1(o,t,e=4.4,s=3.4,n=2.6,a=o.p.canvasOlive){for(const i of[-1,1])for(const r of[-1,1])t.cyl(o.m.woodDark,.05,.06,n,i*(e/2-.1),0,r*(s/2-.1),10);for(const i of[-1,1])t.box(a,e+.4,.04,s*.62,0,n+.28,i*s*.27,.01,-i*.22);t.box(o.m.woodDark,e+.1,.06,.06,0,n+.5,0,.01),t.box(a,e+.3,.45,.03,0,n-.4,s/2+.02,.01)}function Y1(o,t,e,s=2.6){t.cyl(o.m.woodDark,.06,.085,s,0,0,0,10),t.cyl(o.m.stoneDark,.2,.24,.18,0,0,0,12),e.forEach((n,a)=>{const i=s-.3-a*.34,r=n.len??.95,l=t.child(0,i,0,n.yaw);l.box(n.tone??o.m.wood,r,.24,.045,r/2-.05,0,0,.012),l.put(new Qe(.16,.2,3),n.tone??o.m.wood,r+.04,.12,0,0,0,-Math.PI/2,1,1,.3),l.box(o.m.paper,r*.6,.05,.01,r/2-.05,.1,.03,.003)}),t.ball(o.m.brass,.07,0,s+.05,0)}function K1(o,t,e=o.p.fabricRed){const{m:s}=o;for(const n of[-.55,.55]){t.put(new Dt(.33,.018,8,28),s.darkSteel,n,.36,0);for(let a=0;a<6;a++){const i=a/6*Math.PI;t.strut(s.steel,[n+Math.cos(i)*.32,.36+Math.sin(i)*.32,0],[n-Math.cos(i)*.32,.36-Math.sin(i)*.32,0],.004,3)}t.cyl(s.steel,.03,.03,.05,n,.36,0,8)}t.strut(e,[-.55,.36,0],[-.1,.38,0],.016,6),t.strut(e,[-.1,.38,0],[.4,.74,0],.016,6),t.strut(e,[-.55,.36,0],[-.1,.75,0],.016,6),t.strut(e,[-.1,.75,0],[.4,.74,0],.016,6),t.strut(e,[.4,.74,0],[.55,.36,0],.016,6),t.box(o.p.leather,.22,.04,.1,-.12,.8,0,.015),t.strut(s.darkSteel,[.4,.74,0],[.38,.95,0],.012,5),t.box(s.darkSteel,.03,.03,.4,.38,.95,0,.008)}function Z1(o,t,e=6,s=.72){const n=Math.floor(e/.42);for(let a=0;a<=n;a++)t.box(o.m.woodDark,.2,.1,s+.7,a/n*e,0,0,.02);for(const a of[-1,1])t.box(o.m.steel,e,.07,.07,e/2,.1,a*s/2,.012)}function q1(o,t,e=.55,s=o.p.fabricRed){t.cyl(o.m.darkSteel,.012,.012,1.5,0,0,0,6),t.put(new Qe(e,.28,16,1,!0),s,0,1.58,0),t.ball(o.m.brass,.025,0,1.76,0)}function Q1(o,t,e=2.4){for(const a of[-1,1])t.strut(o.m.wood,[a*.22,0,.3],[a*.22,e,.3-e*.2],.025,6);const n=Math.floor(e/.3);for(let a=1;a<=n;a++){const i=a*.3/e;t.box(o.m.woodDark,.44,.03,.08,0,i*e-.015,.3-i*e*.2,.008)}for(const a of[-1,1])t.cyl(o.p.plasticDark,.03,.03,.04,a*.22,0,.3,8)}function J1(o,t,e=2){const s=ls(e);t.box(o.m.wood,1.2,.05,.5,0,.35,0,.012),t.box(o.m.woodDark,1.2,.3,.04,0,.35,-.23,.01);for(const n of[-1,1])t.box(o.m.woodDark,.05,.8,.5,n*.58,.35,0,.01);t.box(o.m.woodDark,1.2,.04,.4,0,.7,0,.01,-.2);for(const n of[-1,1])for(const a of[-1,1])t.put(new Dt(.1,.03,8,14),o.m.darkSteel,n*.5,.12,a*.2,0,Math.PI/2);for(let n=0;n<2;n++){let a=-.52;for(;a<.5;){const i=.04+s()*.03;t.box(o.p.books[Math.floor(s()*o.p.books.length)],i,.18+s()*.1,.22,a+i/2,n===0?.4:.74,-.02,.004,0,0,n===1?-.2:0),a+=i+.004}}}function ls(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const ra=new WeakMap;function dc(o,t,e,s,n={}){const{m:a}=o,i=n.cols??2,r=n.rows??2,l=n.frame??a.woodDark;let c=ra.get(o);c||(c={glow:new at({color:16769704,emissive:16757850,emissiveIntensity:.55,roughness:.7}),curtain:new at({color:14272680,roughness:.95,side:mt})},ra.set(o,c));const h=si;n.lit!==!1&&t.box(c.glow,e-h,s-h,.01,0,h/2,-(n.recess??.02),.002),t.put(new At(e-h*1.4,s-h*1.4),a.glass,0,s/2,.02),t.box(l,e+h*2,h,.08,0,-h,0,.006),t.box(l,e+h*2,h,.08,0,s,0,.006),t.box(l,h,s+h*2,.08,-e/2-h/2,-h,0,.006),t.box(l,h,s+h*2,.08,e/2+h/2,-h,0,.006);for(let p=1;p<i;p++)t.box(l,.022,s,.05,-e/2+e*p/i,0,.03,.003);for(let p=1;p<r;p++)t.box(l,e,.022,.05,0,s*p/r,.03,.003);const d=Math.max(0,n.sillOverhang??.11),m=Math.max(0,n.lintelOverhang??.1);if(t.box(a.stoneWarm,e+d*2,.05,.16,0,-h-.05,.05,.01),t.box(a.stoneDark,e+m*2,.06,.1,0,s+h,.03,.01),n.curtain){for(const p of[-1,1]){const u=new At(e*.3,s*.92,5,1),v=u.attributes.position;for(let x=0;x<v.count;x++)v.setZ(x,Math.sin(v.getX(x)*40)*.012);u.computeVertexNormals(),t.put(u,c.curtain,p*e*.33,s*.5,.06)}t.box(a.brass,e+.08,.015,.015,0,s-.03,.07,.004)}}export{O1 as $,N1 as A,y1 as B,F1 as C,T1 as D,x1 as E,oi as F,b1 as G,U1 as H,E1 as I,V1 as J,G1 as K,Tc as L,Ua as M,D1 as N,S1 as O,w1 as P,P1 as Q,A1 as R,C1 as S,W1 as T,L1 as U,B1 as V,Jc as W,$1 as X,X1 as Y,I1 as Z,R1 as _,Qo as a,u1 as a$,j1 as a0,Z1 as a1,q1 as a2,Y1 as a3,dc as a4,K1 as a5,ar as a6,M1 as a7,On as a8,Q1 as a9,Ji as aA,Kc as aB,Rc as aC,X0 as aD,Dc as aE,_c as aF,Nc as aG,wr as aH,Wc as aI,o1 as aJ,s1 as aK,bc as aL,Sc as aM,kc as aN,Uc as aO,Lc as aP,Oc as aQ,a1 as aR,f1 as aS,Mn as aT,Ts as aU,Zc as aV,va as aW,lr as aX,wc as aY,Pc as aZ,cr as a_,J1 as aa,k1 as ab,_1 as ac,Se as ad,Cl as ae,Ic as af,$c as ag,jc as ah,h1 as ai,p1 as aj,Xc as ak,jr as al,Cc as am,xc as an,w0 as ao,vc as ap,i1 as aq,r1 as ar,l1 as as,m1 as at,Yc as au,d1 as av,Vr as aw,Ac as ax,Ec as ay,e1 as az,Fc as b,Ys as b0,c1 as b1,Et as b2,n1 as b3,Ss as b4,zc as c,Tr as d,Bc as e,Gc as f,C0 as g,Mc as h,Kr as i,Ye as j,bl as k,Xr as l,K0 as m,Qc as n,La as o,qc as p,Ca as q,Vc as r,yc as s,Hc as t,t1 as u,Ea as v,v1 as w,g1 as x,z1 as y,H1 as z};
