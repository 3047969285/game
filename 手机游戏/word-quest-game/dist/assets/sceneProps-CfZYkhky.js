var Mi=Object.defineProperty;var yi=(o,t,e)=>t in o?Mi(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var F=(o,t,e)=>yi(o,typeof t!="symbol"?t+"":t,e);import{b as Y,aX as bi,f as Gt,F as gt,aC as wt,aJ as Nt,aa as ut,aY as Rt,aZ as It,a_ as yt,a$ as Si,H as W,V as C,a7 as ki,l as yo,i as q,b0 as ts,b1 as Ti,b2 as Ut,b3 as pa,b4 as je,b5 as nn,b6 as an,aD as ms,Q as Ue,b7 as Ai,b8 as _i,b9 as Pi,ba as Di,bb as Ri,bc as Ci,bd as Ei,al as zi,be as Ni,bf as Fi,ax as Ii,q as bo,aw as Li,e as $,d as Bs,a as at,bg as ga,bh as Ui,bi as Oe,$ as me,bj as Do,bk as rn,bl as ln,bm as Oi,bn as Gi,bo as Bi,Y as To,Z as Ao,y as Ee,ai as $e,ag as Wi,bp as Vi,bq as va,aA as ps,ae as Hi,a2 as Te,br as xa,bs as wa,a0 as Ie,bt as zs,_ as _o,c as Le,af as ke,a1 as es,aN as ji,aL as cn,X as $i,h as ct,k as os,j as Ma,D as mt,aG as Xi,aH as Yi,bu as Ki,C as Ct,a6 as ss,p as xt,P as At,G as vt,J as ns,E as Xt,n as ya,u as eo,w as ba,bv as Zi,bw as Sa,a9 as qi,x as ka,a3 as Ge,aF as Ro,aE as Ta,a4 as as,a5 as is,ab as Ns,m as Dt,g as hn,bx as Qi,by as Ji,bz as t0,bA as e0,bB as o0,S as s0,ad as n0}from"./index-BrdnVHZ8.js";import{d as Fs,P as a0,a as Yt,m as Ke,e as Aa}from"./humanVisual-CMIo4Q_G.js";const ie={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class pe{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const i0=new bi(-1,1,1,-1,0,1);class r0 extends Gt{constructor(){super(),this.setAttribute("position",new gt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new gt([0,2,0,0,2,0],2))}}const l0=new r0;class Be{constructor(t){this._mesh=new Y(l0,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,i0)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Ws extends pe{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof wt?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Nt.clone(t.uniforms),this.material=new wt({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Be(this.material)}render(t,e,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class un extends pe{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,s){const n=t.getContext(),a=t.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let i,r;this.inverse?(i=0,r=1):(i=1,r=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),a.buffers.stencil.setFunc(n.ALWAYS,i,4294967295),a.buffers.stencil.setClear(r),a.buffers.stencil.setLocked(!0),t.setRenderTarget(s),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(n.EQUAL,1,4294967295),a.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),a.buffers.stencil.setLocked(!0)}}class c0 extends pe{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class h0{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const s=t.getSize(new ut);this._width=s.width,this._height=s.height,e=new Rt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:It}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ws(ie),this.copyPass.material.blending=yt,this.timer=new Si}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let s=!1;for(let n=0,a=this.passes.length;n<a;n++){const i=this.passes[n];if(i.enabled!==!1){if(i.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),i.render(this.renderer,this.writeBuffer,this.readBuffer,t,s),i.needsSwap){if(s){const r=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}un!==void 0&&(i instanceof un?s=!0:i instanceof c0&&(s=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ut);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const s=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(s,n),this.renderTarget2.setSize(s,n);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(s,n)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class u0 extends pe{constructor(t,e,s=null,n=null,a=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=s,this.clearColor=n,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new W}render(t,e,s){const n=t.autoClear;t.autoClear=!1;let a,i;this.overrideMaterial!==null&&(i=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(a=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=i),t.autoClear=n}}const f0={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new W(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Ze extends pe{constructor(t,e=1,s,n){super(),this.strength=e,this.radius=s,this.threshold=n,this.resolution=t!==void 0?new ut(t.x,t.y):new ut(256,256),this.clearColor=new W(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);this.renderTargetBright=new Rt(a,i,{type:It}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const f=new Rt(a,i,{type:It});f.texture.name="UnrealBloomPass.h"+h,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const p=new Rt(a,i,{type:It});p.texture.name="UnrealBloomPass.v"+h,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),a=Math.round(a/2),i=Math.round(i/2)}const r=f0;this.highPassUniforms=Nt.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new wt({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];a=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ut(1/a,1/i),a=Math.round(a/2),i=Math.round(i/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Nt.clone(ie.uniforms),this.blendMaterial=new wt({uniforms:this.copyUniforms,vertexShader:ie.vertexShader,fragmentShader:ie.fragmentShader,premultipliedAlpha:!0,blending:ki,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new W,this._oldClearAlpha=1,this._basic=new yo,this._fsQuad=new Be(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let s=Math.round(t/2),n=Math.round(e/2);this.renderTargetBright.setSize(s,n);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(s,n),this.renderTargetsVertical[a].setSize(s,n),this.separableBlurMaterials[a].uniforms.invSize.value=new ut(1/s,1/n),s=Math.round(s/2),n=Math.round(n/2)}render(t,e,s,n,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const i=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=s.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let r=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ze.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ze.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),r=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(s),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=i}_getSeparableBlurMaterial(t){const e=[],s=t/3;for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(s*s))/s);return new wt({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new ut(.5,.5)},direction:{value:new ut(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`

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

				}`})}}Ze.BlurDirectionX=new ut(1,0);Ze.BlurDirectionY=new ut(0,1);const oe={defines:{MAX_STEP:0,PERSPECTIVE_CAMERA:!0,DISTANCE_ATTENUATION:!0,FRESNEL:!0,INFINITE_THICK:!1,SELECTIVE:!1},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tMetalness:{value:null},tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new ut},cameraProjectionMatrix:{value:new q},cameraInverseProjectionMatrix:{value:new q},opacity:{value:.5},maxDistance:{value:180},cameraRange:{value:0},thickness:{value:.018}},vertexShader:`

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
	`},Co={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`

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
	`};class he extends pe{constructor({renderer:t,scene:e,camera:s,width:n=512,height:a=512,selects:i=null,bouncing:r=!1,groundReflector:l=null}){super(),this.width=n,this.height=a,this.clear=!0,this.renderer=t,this.scene=e,this.camera=s,this.groundReflector=l,this.opacity=oe.uniforms.opacity.value,this.output=0,this.maxDistance=oe.uniforms.maxDistance.value,this.thickness=oe.uniforms.thickness.value,this.tempColor=new W,this._selects=i,this._resolutionScale=1,this.selective=Array.isArray(this._selects),Object.defineProperty(this,"selects",{get(){return this._selects},set(h){this._selects!==h&&(this._selects=h,Array.isArray(h)?(this.selective=!0,this.ssrMaterial.defines.SELECTIVE=!0,this.ssrMaterial.needsUpdate=!0):(this.selective=!1,this.ssrMaterial.defines.SELECTIVE=!1,this.ssrMaterial.needsUpdate=!0))}}),this._bouncing=r,Object.defineProperty(this,"bouncing",{get(){return this._bouncing},set(h){this._bouncing!==h&&(this._bouncing=h,h?this.ssrMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture:this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture)}}),this.blur=!0,this._distanceAttenuation=oe.defines.DISTANCE_ATTENUATION,Object.defineProperty(this,"distanceAttenuation",{get(){return this._distanceAttenuation},set(h){this._distanceAttenuation!==h&&(this._distanceAttenuation=h,this.ssrMaterial.defines.DISTANCE_ATTENUATION=h,this.ssrMaterial.needsUpdate=!0)}}),this._fresnel=oe.defines.FRESNEL,Object.defineProperty(this,"fresnel",{get(){return this._fresnel},set(h){this._fresnel!==h&&(this._fresnel=h,this.ssrMaterial.defines.FRESNEL=h,this.ssrMaterial.needsUpdate=!0)}}),this._infiniteThick=oe.defines.INFINITE_THICK,Object.defineProperty(this,"infiniteThick",{get(){return this._infiniteThick},set(h){this._infiniteThick!==h&&(this._infiniteThick=h,this.ssrMaterial.defines.INFINITE_THICK=h,this.ssrMaterial.needsUpdate=!0)}});const c=new ts;c.type=Ti,c.minFilter=Ut,c.magFilter=Ut,this.beautyRenderTarget=new Rt(this.width,this.height,{minFilter:Ut,magFilter:Ut,type:It,depthTexture:c,depthBuffer:!0}),this.prevRenderTarget=new Rt(this.width,this.height,{minFilter:Ut,magFilter:Ut}),this.normalRenderTarget=new Rt(this.width,this.height,{minFilter:Ut,magFilter:Ut,type:It}),this.metalnessRenderTarget=new Rt(this.width,this.height,{minFilter:Ut,magFilter:Ut,type:It}),this.ssrRenderTarget=new Rt(this.width,this.height,{minFilter:Ut,magFilter:Ut}),this.blurRenderTarget=this.ssrRenderTarget.clone(),this.blurRenderTarget2=this.ssrRenderTarget.clone(),this.ssrMaterial=new wt({defines:Object.assign({},oe.defines,{MAX_STEP:Math.sqrt(this.width*this.width+this.height*this.height)}),uniforms:Nt.clone(oe.uniforms),vertexShader:oe.vertexShader,fragmentShader:oe.fragmentShader,blending:yt}),this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.ssrMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssrMaterial.defines.SELECTIVE=this.selective,this.ssrMaterial.needsUpdate=!0,this.ssrMaterial.uniforms.tMetalness.value=this.metalnessRenderTarget.texture,this.ssrMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.ssrMaterial.uniforms.cameraNear.value=this.camera.near,this.ssrMaterial.uniforms.cameraFar.value=this.camera.far,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.ssrMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new pa,this.normalMaterial.blending=yt,this.metalnessOnMaterial=new yo({color:"white"}),this.metalnessOffMaterial=new yo({color:"black"}),this.blurMaterial=new wt({defines:Object.assign({},ve.defines),uniforms:Nt.clone(ve.uniforms),vertexShader:ve.vertexShader,fragmentShader:ve.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.blurMaterial2=new wt({defines:Object.assign({},ve.defines),uniforms:Nt.clone(ve.uniforms),vertexShader:ve.vertexShader,fragmentShader:ve.fragmentShader}),this.blurMaterial2.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.blurMaterial2.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new wt({defines:Object.assign({},Co.defines),uniforms:Nt.clone(Co.uniforms),vertexShader:Co.vertexShader,fragmentShader:Co.fragmentShader,blending:yt}),this.depthRenderMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new wt({uniforms:Nt.clone(ie.uniforms),vertexShader:ie.vertexShader,fragmentShader:ie.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:an,blendDst:nn,blendEquation:je,blendSrcAlpha:an,blendDstAlpha:nn,blendEquationAlpha:je}),this.fsQuad=new Be(null),this.originalClearColor=new W}get resolutionScale(){return this._resolutionScale}set resolutionScale(t){this._resolutionScale=t,this.setSize(this.width,this.height)}dispose(){this.beautyRenderTarget.dispose(),this.prevRenderTarget.dispose(),this.normalRenderTarget.dispose(),this.metalnessRenderTarget.dispose(),this.ssrRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.blurRenderTarget2.dispose(),this.normalMaterial.dispose(),this.metalnessOnMaterial.dispose(),this.metalnessOffMaterial.dispose(),this.blurMaterial.dispose(),this.blurMaterial2.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(t,e){switch(t.setRenderTarget(this.beautyRenderTarget),t.clear(),this.groundReflector&&(this.groundReflector.visible=!1,this.groundReflector.doRender(this.renderer,this.scene,this.camera),this.groundReflector.visible=!0),t.render(this.scene,this.camera),this.groundReflector&&(this.groundReflector.visible=!1),this._renderOverride(t,this.normalMaterial,this.normalRenderTarget,0,0),this.selective&&this._renderMetalness(t,this.metalnessOnMaterial,this.metalnessRenderTarget,0,0),this.ssrMaterial.uniforms.opacity.value=this.opacity,this.ssrMaterial.uniforms.maxDistance.value=this.maxDistance,this.ssrMaterial.uniforms.thickness.value=this.thickness,this._renderPass(t,this.ssrMaterial,this.ssrRenderTarget),this.blur&&(this._renderPass(t,this.blurMaterial,this.blurRenderTarget),this._renderPass(t,this.blurMaterial2,this.blurRenderTarget2)),this.output){case he.OUTPUT.Default:this.bouncing?(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.prevRenderTarget),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=ms,this._renderPass(t,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e)):(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=ms,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e));break;case he.OUTPUT.SSR:this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.bouncing&&(this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=ms,this._renderPass(t,this.copyMaterial,this.prevRenderTarget));break;case he.OUTPUT.Beauty:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case he.OUTPUT.Depth:this._renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case he.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case he.OUTPUT.Metalness:this.copyMaterial.uniforms.tDiffuse.value=this.metalnessRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.SSRPass: Unknown output type.")}}setSize(t,e){this.width=t,this.height=e;const s=Math.round(this.resolutionScale*t),n=Math.round(this.resolutionScale*e);this.ssrMaterial.defines.MAX_STEP=Math.sqrt(s*s+n*n),this.ssrMaterial.needsUpdate=!0,this.beautyRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.metalnessRenderTarget.setSize(t,e),this.ssrRenderTarget.setSize(s,n),this.prevRenderTarget.setSize(s,n),this.blurRenderTarget.setSize(s,n),this.blurRenderTarget2.setSize(s,n),this.ssrMaterial.uniforms.resolution.value.set(s,n),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(s,n),this.blurMaterial2.uniforms.resolution.value.set(s,n)}_renderPass(t,e,s,n,a){this.originalClearColor.copy(t.getClearColor(this.tempColor));const i=t.getClearAlpha(this.tempColor),r=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this.fsQuad.material=e,this.fsQuad.render(t),t.autoClear=r,t.setClearColor(this.originalClearColor),t.setClearAlpha(i)}_renderOverride(t,e,s,n,a){this.originalClearColor.copy(t.getClearColor(this.tempColor));const i=t.getClearAlpha(this.tempColor),r=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,n=e.clearColor||n,a=e.clearAlpha||a,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=r,t.setClearColor(this.originalClearColor),t.setClearAlpha(i)}_renderMetalness(t,e,s,n,a){this.originalClearColor.copy(t.getClearColor(this.tempColor));const i=t.getClearAlpha(this.tempColor),r=t.autoClear,l=this.scene.background,c=this.scene.fog;t.setRenderTarget(s),t.autoClear=!1,this.scene.background=null,this.scene.fog=null,n=e.clearColor||n,a=e.clearAlpha||a,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this.scene.traverseVisible(h=>{h._SSRPassBackupMaterial=h.material,this._selects.includes(h)?h.material=this.metalnessOnMaterial:h.material=this.metalnessOffMaterial}),t.render(this.scene,this.camera),this.scene.traverseVisible(h=>{h.material=h._SSRPassBackupMaterial}),t.autoClear=r,t.setClearColor(this.originalClearColor),t.setClearAlpha(i),this.scene.background=l,this.scene.fog=c}}he.OUTPUT={Default:0,SSR:1,Beauty:3,Depth:4,Normal:5,Metalness:7};class d0 extends pe{constructor(e,s){super();F(this,"history",new Rt(1,1,{type:It,depthBuffer:!1}));F(this,"copy",new wt({uniforms:{tex:{value:this.history.texture}},vertexShader:fn,fragmentShader:"uniform sampler2D tex;varying vec2 vUv;void main(){gl_FragColor=vec4(texture2D(tex,vUv).rgb,1.0);}"}));F(this,"resolve",new wt({uniforms:{current:{value:null},history:{value:this.history.texture},depth:{value:null},inverseVP:{value:new q},previousVP:{value:new q},resolution:{value:new ut(1,1)},valid:{value:0}},vertexShader:fn,fragmentShader:`
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
    }`}));F(this,"quad",new Be(this.resolve));F(this,"resolved",new Rt(1,1,{type:It,depthBuffer:!1}));F(this,"vp",new q);F(this,"previousPosition",new C(1/0,0,0));F(this,"previousRotation",new Ue);F(this,"frame",0);this.camera=e,this.depthSource=s}setSize(e,s){this.history.setSize(e,s),this.resolved.setSize(e,s),this.resolve.uniforms.resolution.value.set(e,s),this.reset()}reset(){this.resolve.uniforms.valid.value=0,this.frame=0}jitter(e,s){const n=this.frame++%8+1;this.camera.setViewOffset(e,s,dn(n,2)-.5,dn(n,3)-.5,e,s)}render(e,s,n){this.camera.updateMatrixWorld(),this.vp.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),(this.previousPosition.distanceToSquared(this.camera.position)>9||this.previousRotation.angleTo(this.camera.quaternion)>.35)&&this.reset();const a=this.resolve.uniforms;a.current.value=n.texture,a.depth.value=this.depthSource(),a.inverseVP.value.copy(this.vp).invert(),this.quad.material=this.resolve,e.setRenderTarget(this.resolved),this.quad.render(e);const i=this.history;this.history=this.resolved,this.resolved=i,a.history.value=this.history.texture,this.copy.uniforms.tex.value=this.history.texture,this.quad.material=this.copy,e.setRenderTarget(this.renderToScreen?null:s),this.quad.render(e),a.previousVP.value.copy(this.vp),a.valid.value=1,this.previousPosition.copy(this.camera.position),this.previousRotation.copy(this.camera.quaternion),this.camera.clearViewOffset()}dispose(){this.history.dispose(),this.resolved.dispose(),this.copy.dispose(),this.resolve.dispose(),this.quad.dispose()}}const fn="varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}";function dn(o,t){let e=1,s=0;for(;o>0;)e/=t,s+=e*(o%t),o=Math.floor(o/t);return s}const Eo={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class m0 extends pe{constructor(){super(),this.isOutputPass=!0,this.uniforms=Nt.clone(Eo.uniforms),this.material=new Ai({name:Eo.name,uniforms:this.uniforms,vertexShader:Eo.vertexShader,fragmentShader:Eo.fragmentShader}),this._fsQuad=new Be(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},_i.getTransfer(this._outputColorSpace)===Pi&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Di?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ri?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ci?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ei?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===zi?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ni?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Fi&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class rs extends Y{constructor(){const t=rs.SkyShader,e=new wt({name:t.name,uniforms:Nt.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:Ii,depthWrite:!1});super(new bo(1,1,1),e),this.isSky=!0}}rs.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new C},up:{value:new C(0,1,0)},cloudScale:{value:2e-4},cloudSpeed:{value:1e-4},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},time:{value:0}},vertexShader:`
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

		}`};const gs=new q;class ls{constructor(t){t=t||{},this.zNear=t.webGL===!0?-1:0,this.vertices={near:[new C,new C,new C,new C],far:[new C,new C,new C,new C]},t.projectionMatrix!==void 0&&this.setFromProjectionMatrix(t.projectionMatrix,t.maxFar||1e4)}setFromProjectionMatrix(t,e){const s=this.zNear,n=t.elements[11]===0;return gs.copy(t).invert(),this.vertices.near[0].set(1,1,s),this.vertices.near[1].set(1,-1,s),this.vertices.near[2].set(-1,-1,s),this.vertices.near[3].set(-1,1,s),this.vertices.near.forEach(function(a){a.applyMatrix4(gs)}),this.vertices.far[0].set(1,1,1),this.vertices.far[1].set(1,-1,1),this.vertices.far[2].set(-1,-1,1),this.vertices.far[3].set(-1,1,1),this.vertices.far.forEach(function(a){a.applyMatrix4(gs);const i=Math.abs(a.z);n?a.z*=Math.min(e/i,1):a.multiplyScalar(Math.min(e/i,1))}),this.vertices}split(t,e){for(;t.length>e.length;)e.push(new ls);e.length=t.length;for(let s=0;s<t.length;s++){const n=e[s];if(s===0)for(let a=0;a<4;a++)n.vertices.near[a].copy(this.vertices.near[a]);else for(let a=0;a<4;a++)n.vertices.near[a].lerpVectors(this.vertices.near[a],this.vertices.far[a],t[s-1]);if(s===t.length-1)for(let a=0;a<4;a++)n.vertices.far[a].copy(this.vertices.far[a]);else for(let a=0;a<4;a++)n.vertices.far[a].lerpVectors(this.vertices.near[a],this.vertices.far[a],t[s])}}toSpace(t,e){for(let s=0;s<4;s++)e.vertices.near[s].copy(this.vertices.near[s]).applyMatrix4(t),e.vertices.far[s].copy(this.vertices.far[s]).applyMatrix4(t)}}const mn={lights_fragment_begin:`
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
	`+Fs.lights_pars_begin},pn=new q,vs=new ls({webGL:!0}),re=new C,p0=new C,uo=new Bs,xs=[],ws=[],Ms=new q,gn=new q,g0=new C(0,1,0);class v0{constructor(t){this.camera=t.camera,this.parent=t.parent,this.cascades=t.cascades||3,this.maxFar=t.maxFar||1e5,this.mode=t.mode||"practical",this.shadowMapSize=t.shadowMapSize||2048,this.shadowBias=t.shadowBias||1e-6,this.lightDirection=t.lightDirection||new C(1,-1,1).normalize(),this.lightIntensity=t.lightIntensity||3,this.lightNear=t.lightNear||1,this.lightFar=t.lightFar||2e3,this.lightMargin=t.lightMargin||200,this.customSplitsCallback=t.customSplitsCallback,this.fade=!1,this.mainFrustum=new ls({webGL:!0}),this.frustums=[],this.breaks=[],this.lights=[],this.shaders=new Map,this._createLights(),this.updateFrustums(),this._injectInclude()}_createLights(){for(let t=0;t<this.cascades;t++){const e=new Li(16777215,this.lightIntensity);e.castShadow=!0,e.shadow.mapSize.width=this.shadowMapSize,e.shadow.mapSize.height=this.shadowMapSize,e.shadow.camera.near=this.lightNear,e.shadow.camera.far=this.lightFar,e.shadow.bias=this.shadowBias,this.parent.add(e),this.parent.add(e.target),this.lights.push(e)}}_initCascades(){const t=this.camera;t.updateProjectionMatrix(),this.mainFrustum.setFromProjectionMatrix(t.projectionMatrix,this.maxFar),this.mainFrustum.split(this.breaks,this.frustums)}_updateShadowBounds(){const t=this.frustums;for(let e=0;e<t.length;e++){const n=this.lights[e].shadow.camera,a=this.frustums[e],i=a.vertices.near,r=a.vertices.far,l=r[0];let c;l.distanceTo(r[2])>l.distanceTo(i[2])?c=r[2]:c=i[2];let h=l.distanceTo(c);if(this.fade){const f=this.camera,p=Math.max(f.far,this.maxFar),m=a.vertices.far[0].z/(p-f.near),u=.25*Math.pow(m,2)*(p-f.near);h+=u}n.left=-h/2,n.right=h/2,n.top=h/2,n.bottom=-h/2,n.updateProjectionMatrix()}}_getBreaks(){const t=this.camera,e=Math.min(t.far,this.maxFar);switch(this.breaks.length=0,this.mode){case"uniform":s(this.cascades,t.near,e,this.breaks);break;case"logarithmic":n(this.cascades,t.near,e,this.breaks);break;case"practical":a(this.cascades,t.near,e,.5,this.breaks);break;case"custom":this.customSplitsCallback===void 0&&console.error("CSM: Custom split scheme callback not defined."),this.customSplitsCallback(this.cascades,t.near,e,this.breaks);break}function s(i,r,l,c){for(let h=1;h<i;h++)c.push((r+(l-r)*h/i)/l);c.push(1)}function n(i,r,l,c){for(let h=1;h<i;h++)c.push(r*(l/r)**(h/i)/l);c.push(1)}function a(i,r,l,c,h){xs.length=0,ws.length=0,n(i,r,l,ws),s(i,r,l,xs);for(let f=1;f<i;f++)h.push($.lerp(xs[f-1],ws[f-1],c));h.push(1)}}update(){const t=this.camera,e=this.frustums;Ms.lookAt(p0,this.lightDirection,g0),gn.copy(Ms).invert();for(let s=0;s<e.length;s++){const n=this.lights[s],a=n.shadow.camera,i=(a.right-a.left)/this.shadowMapSize,r=(a.top-a.bottom)/this.shadowMapSize;pn.multiplyMatrices(gn,t.matrixWorld),e[s].toSpace(pn,vs);const l=vs.vertices.near,c=vs.vertices.far;uo.makeEmpty();for(let h=0;h<4;h++)uo.expandByPoint(l[h]),uo.expandByPoint(c[h]);uo.getCenter(re),re.z=uo.max.z+this.lightMargin,re.x=Math.floor(re.x/i)*i,re.y=Math.floor(re.y/r)*r,re.applyMatrix4(Ms),n.position.copy(re),n.target.position.copy(re),n.target.position.x+=this.lightDirection.x,n.target.position.y+=this.lightDirection.y,n.target.position.z+=this.lightDirection.z}}_injectInclude(){Fs.lights_fragment_begin=mn.lights_fragment_begin,Fs.lights_pars_begin=mn.lights_pars_begin}setupMaterial(t){t.defines=t.defines||{},t.defines.USE_CSM=1,t.defines.CSM_CASCADES=this.cascades,this.fade&&(t.defines.CSM_FADE="");const e=[],s=this,n=this.shaders;t.onBeforeCompile=function(a){const i=Math.min(s.camera.far,s.maxFar);s._getExtendedBreaks(e),a.uniforms.CSM_cascades={value:e},a.uniforms.cameraNear={value:s.camera.near},a.uniforms.shadowFar={value:i},n.set(t,a)},n.set(t,null)}_updateUniforms(){const t=Math.min(this.camera.far,this.maxFar);this.shaders.forEach(function(s,n){if(s!==null){const a=s.uniforms;this._getExtendedBreaks(a.CSM_cascades.value),a.cameraNear.value=this.camera.near,a.shadowFar.value=t}!this.fade&&"CSM_FADE"in n.defines?(delete n.defines.CSM_FADE,n.needsUpdate=!0):this.fade&&!("CSM_FADE"in n.defines)&&(n.defines.CSM_FADE="",n.needsUpdate=!0)},this)}_getExtendedBreaks(t){for(;t.length<this.breaks.length;)t.push(new ut);t.length=this.breaks.length;for(let e=0;e<this.cascades;e++){const s=this.breaks[e],n=this.breaks[e-1]||0;t[e].x=n,t[e].y=s}}updateFrustums(){this._getBreaks(),this._initCascades(),this._updateShadowBounds(),this._updateUniforms()}remove(){for(let t=0;t<this.lights.length;t++)this.parent.remove(this.lights[t].target),this.parent.remove(this.lights[t])}dispose(){const t=this.shaders;t.forEach(function(e,s){delete s.onBeforeCompile,delete s.defines.USE_CSM,delete s.defines.CSM_CASCADES,delete s.defines.CSM_FADE,e!==null&&(delete e.uniforms.CSM_cascades,delete e.uniforms.cameraNear,delete e.uniforms.shadowFar),s.needsUpdate=!0}),t.clear()}}function _a(o,t=31.2,e=172){const s=$.degToRad($.clamp(t,-89,89)),n=$.degToRad(23.44)*Math.sin(2*Math.PI*(284+e)/365),a=((o%24+24)%24-12)*Math.PI/12;return new C(-Math.cos(n)*Math.sin(a),Math.sin(s)*Math.sin(n)+Math.cos(s)*Math.cos(n)*Math.cos(a),Math.sin(s)*Math.cos(n)*Math.cos(a)-Math.cos(s)*Math.sin(n)).normalize()}function x0(o,t,e){const s=$.clamp(.22/Math.max(.01,t),.72,1.35);return $.lerp(o,s,1-Math.exp(-Math.max(0,Math.min(e,.1))/(s<o?.9:2.4)))}function w0(o){const t=new rs;t.name="physical-rayleigh-mie-sky",t.material.fragmentShader=t.material.fragmentShader.replace("vec4( texColor, 1.0 )","vec4( texColor * 0.16, 1.0 )"),t.scale.setScalar(o),t.frustumCulled=!1;const e=t.material.uniforms;return e.turbidity.value=2.5,e.rayleigh.value=1.25,e.mieCoefficient.value=.004,e.mieDirectionalG.value=.78,e.sunPosition.value.copy(_a(14)).multiplyScalar(45e4),e.cloudScale.value=.0015,e.cloudCoverage.value=.25,e.cloudDensity.value=.55,t}class zc{constructor(t,e,s){F(this,"csm");F(this,"known",new WeakSet);F(this,"scanned",0);F(this,"projection","");this.scene=t,this.camera=e,this.csm=new v0({camera:e,parent:t,cascades:s==="high"?3:2,mode:"practical",maxFar:s==="high"?150:90,shadowMapSize:s==="high"?2048:1024,lightDirection:_a(14).negate(),lightIntensity:1,lightNear:.1,lightFar:650,shadowBias:-5e-5,lightMargin:160}),this.csm.fade=!0;for(const n of this.csm.lights)n.shadow.normalBias=.018,n.shadow.radius=2}update(t,e){this.scanned++%30===0&&this.scene.traverse(n=>{const a=n;if(a.isMesh)for(const i of Array.isArray(a.material)?a.material:[a.material]){if(!(i instanceof at)||this.known.has(i))continue;this.known.add(i);const r=i.onBeforeCompile,l=i.customProgramCacheKey.bind(i);this.csm.setupMaterial(i);const c=i.onBeforeCompile;i.onBeforeCompile=function(h,f){c.call(this,h,f),r.call(this,h,f)},i.customProgramCacheKey=()=>`${l()}|world-csm-${this.csm.cascades}`,i.needsUpdate=!0,i.addEventListener("dispose",()=>this.csm.shaders.delete(i))}});const s=`${this.camera.aspect}/${this.camera.fov}/${this.camera.far}`;s!==this.projection&&(this.projection=s,this.csm.updateFrustums()),this.csm.lightDirection.copy(e).negate();for(const n of this.csm.lights)n.color.copy(t.color),n.intensity=t.intensity;t.visible=!1,this.camera.updateMatrixWorld(),this.csm.update()}setShadowSize(t){var e;if(this.csm.shadowMapSize!==t){this.csm.shadowMapSize=t;for(const s of this.csm.lights)(e=s.shadow.map)==null||e.dispose(),s.shadow.map=null,s.shadow.mapSize.set(t,t),s.shadow.needsUpdate=!0;this.csm.updateFrustums()}}dispose(){this.csm.remove(),this.csm.dispose()}}class M0 extends m0{constructor(){super(...arguments);F(this,"meter",new Rt(1,1,{depthBuffer:!1}));F(this,"mat",new wt({uniforms:{tex:{value:null}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:"uniform sampler2D tex;void main(){float l=0.0;for(int x=0;x<4;x++)for(int y=0;y<4;y++){vec3 c=texture2D(tex,(vec2(float(x),float(y))+.5)/4.0).rgb;l+=log2(max(.0001,dot(c,vec3(.2126,.7152,.0722))));}gl_FragColor=vec4(clamp((l/16.0+12.0)/24.0,0.0,1.0),0.0,0.0,1.0);}"}));F(this,"quad",new Be(this.mat));F(this,"counter",0);F(this,"luminance",.22);F(this,"exposure",1);F(this,"pending",!1);F(this,"alive",!0)}render(e,s,n,a){if(this.counter++%24===0&&!this.pending){this.mat.uniforms.tex.value=n.texture,e.setRenderTarget(this.meter),this.quad.render(e);const r=new Uint8Array(4);this.pending=!0,e.readRenderTargetPixelsAsync(this.meter,0,0,1,1,r).then(()=>{this.alive&&(this.luminance=Math.pow(2,r[0]/255*24-12))}).catch(()=>{}).finally(()=>{this.pending=!1})}this.exposure=x0(this.exposure,this.luminance,a||1/60);const i=e.toneMappingExposure;e.toneMappingExposure=i*this.exposure;try{super.render(e,s,n,a,!1)}finally{e.toneMappingExposure=i}}dispose(){this.alive=!1,this.meter.dispose(),this.mat.dispose(),this.quad.dispose(),super.dispose()}}function y0(o,t,e){const s=new ts(1,1,ga);s.compareFunction=Ui,s.needsUpdate=!0;const n=new Ws({uniforms:{tDiffuse:{value:null},tDepth:{value:null},inverseProjection:{value:o.projectionMatrixInverse},cameraWorld:{value:o.matrixWorld},eye:{value:o.position},sun:{value:new C(.4,.7,-.4).normalize()},shadow0:{value:s},shadow1:{value:s},shadow2:{value:s},shadowMatrix0:{value:new q},shadowMatrix1:{value:new q},shadowMatrix2:{value:new q},shadowCount:{value:0},sunEnergy:{value:0},fogColor:{value:new W(.45,.62,.8)},density:{value:8e-4}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:`uniform sampler2D tDiffuse,tDepth;uniform mat4 inverseProjection,cameraWorld;uniform vec3 eye,sun,fogColor;uniform float density;varying vec2 vUv;
    uniform highp sampler2DShadow shadow0,shadow1,shadow2;
    uniform mat4 shadowMatrix0,shadowMatrix1,shadowMatrix2;uniform float shadowCount,sunEnergy;
    bool insideShadow(vec3 p){return p.x>=0.0&&p.x<=1.0&&p.y>=0.0&&p.y<=1.0&&p.z>=0.0&&p.z<=1.0;}
    float visibility(vec3 world){
      vec4 a=shadowMatrix0*vec4(world,1.0);vec3 p=a.xyz/a.w;
      if(shadowCount>.5&&insideShadow(p))return texture(shadow0,vec3(p.xy,p.z-.0004));
      a=shadowMatrix1*vec4(world,1.0);p=a.xyz/a.w;
      if(shadowCount>1.5&&insideShadow(p))return texture(shadow1,vec3(p.xy,p.z-.0004));
      a=shadowMatrix2*vec4(world,1.0);p=a.xyz/a.w;
      if(shadowCount>2.5&&insideShadow(p))return texture(shadow2,vec3(p.xy,p.z-.0004));
      return 1.0;
    }
    void main(){vec3 c=texture2D(tDiffuse,vUv).rgb;float z=texture2D(tDepth,vUv).r;
      vec4 p=inverseProjection*vec4(vUv*2.0-1.0,z*2.0-1.0,1.0);p/=p.w;
      vec3 end=(cameraWorld*p).xyz;vec3 ray=end-eye;float distance_=min(length(ray),450.0);vec3 direction=normalize(ray);
      float optical=0.0,illuminated=0.0;for(int i=0;i<8;i++){vec3 s=eye+direction*distance_*(float(i)+.5)/8.0;float column=exp(-max(s.y,0.0)/32.0)*distance_/8.0;optical+=column;illuminated+=column*visibility(s);}
      float extinction=1.0-exp(-optical*density);float mu=dot(direction,sun);float g=.72;
      float phase=(1.0-g*g)/pow(max(.05,1.0+g*g-2.0*g*mu),1.5);
      vec3 scatter=fogColor*(.7+.18*min(phase,6.0)*sunEnergy*illuminated/max(optical,.001));
      if(z>.99999)extinction*=.2;
      gl_FragColor=vec4(mix(c,scatter,clamp(extinction,0.0,.65)),1.0);
    }`}),a=[],i=n.render.bind(n);n.render=(l,c,h,f,p)=>{var x,M;n.uniforms.tDepth.value=e();const m=t.userData.atmosphereShadows??[];if(a.length=0,l.shadowMap.enabled)for(const d of m)(x=d.shadow.map)!=null&&x.depthTexture&&a.push(d);n.uniforms.shadowCount.value=a.length;for(let d=0;d<3;d++){const v=a[d]??a[0];n.uniforms[`shadow${d}`].value=((M=v==null?void 0:v.shadow.map)==null?void 0:M.depthTexture)??s,v&&n.uniforms[`shadowMatrix${d}`].value.copy(v.shadow.matrix)}const u=t.userData.atmosphereSun;u&&(n.uniforms.sun.value.copy(u.position).sub(u.target.position).normalize(),n.uniforms.sunEnergy.value=Math.min(1,u.intensity/2));const g=t.fog;g&&(n.uniforms.fogColor.value.copy(g.color),n.uniforms.density.value=Math.min(.004,g.density*.22)),i(l,c,h,f,p)};const r=n.dispose.bind(n);return n.dispose=()=>{s.dispose(),r()},n}const zo={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ut},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new q},cameraProjectionMatrixInverse:{value:new q},cameraWorldMatrix:{value:new q},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new C(-1,-1,-1)},sceneBoxMax:{value:new C(1,1,1)}},vertexShader:`

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
		}`},No={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},ys={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function b0(o=5){const t=Math.floor(o)%2===0?Math.floor(o)+1:Math.floor(o),e=S0(t),s=e.length,n=new Uint8Array(s*4);for(let i=0;i<s;++i){const r=e[i],l=2*Math.PI*r/s,c=new C(Math.cos(l),Math.sin(l),0).normalize();n[i*4]=(c.x*.5+.5)*255,n[i*4+1]=(c.y*.5+.5)*255,n[i*4+2]=127,n[i*4+3]=255}const a=new Oe(n,t,t);return a.wrapS=me,a.wrapT=me,a.needsUpdate=!0,a}function S0(o){const t=Math.floor(o)%2===0?Math.floor(o)+1:Math.floor(o),e=t*t,s=Array(e).fill(0);let n=Math.floor(t/2),a=t-1;for(let i=1;i<=e;){if(n===-1&&a===t?(a=t-2,n=0):(a===t&&(a=0),n<0&&(n=t-1)),s[n*t+a]!==0){a-=2,n++;continue}else s[n*t+a]=i++;a++,n--}return s}const Fo={defines:{SAMPLES:16,SAMPLE_VECTORS:Pa(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ut},cameraProjectionMatrixInverse:{value:new q},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Pa(o,t,e){const s=k0(o,t,e);let n="vec3[SAMPLES](";for(let a=0;a<o;a++){const i=s[a];n+=`vec3(${i.x}, ${i.y}, ${i.z})${a<o-1?",":")"}`}return n}function k0(o,t,e){const s=[];for(let n=0;n<o;n++){const a=2*Math.PI*t*n/o,i=Math.pow(n/(o-1),e);s.push(new C(Math.cos(a),Math.sin(a),i))}return s}class T0{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(t.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(t,e){let s,n,a;const i=.5*(Math.sqrt(3)-1),r=(t+e)*i,l=Math.floor(t+r),c=Math.floor(e+r),h=(3-Math.sqrt(3))/6,f=(l+c)*h,p=l-f,m=c-f,u=t-p,g=e-m;let x,M;u>g?(x=1,M=0):(x=0,M=1);const d=u-x+h,v=g-M+h,w=u-1+2*h,y=g-1+2*h,k=l&255,A=c&255,S=this.perm[k+this.perm[A]]%12,T=this.perm[k+x+this.perm[A+M]]%12,b=this.perm[k+1+this.perm[A+1]]%12;let _=.5-u*u-g*g;_<0?s=0:(_*=_,s=_*_*this._dot(this.grad3[S],u,g));let P=.5-d*d-v*v;P<0?n=0:(P*=P,n=P*P*this._dot(this.grad3[T],d,v));let D=.5-w*w-y*y;return D<0?a=0:(D*=D,a=D*D*this._dot(this.grad3[b],w,y)),70*(s+n+a)}noise3d(t,e,s){let n,a,i,r;const c=(t+e+s)*.3333333333333333,h=Math.floor(t+c),f=Math.floor(e+c),p=Math.floor(s+c),m=1/6,u=(h+f+p)*m,g=h-u,x=f-u,M=p-u,d=t-g,v=e-x,w=s-M;let y,k,A,S,T,b;d>=v?v>=w?(y=1,k=0,A=0,S=1,T=1,b=0):d>=w?(y=1,k=0,A=0,S=1,T=0,b=1):(y=0,k=0,A=1,S=1,T=0,b=1):v<w?(y=0,k=0,A=1,S=0,T=1,b=1):d<w?(y=0,k=1,A=0,S=0,T=1,b=1):(y=0,k=1,A=0,S=1,T=1,b=0);const _=d-y+m,P=v-k+m,D=w-A+m,R=d-S+2*m,E=v-T+2*m,z=w-b+2*m,I=d-1+3*m,O=v-1+3*m,L=w-1+3*m,V=h&255,G=f&255,X=p&255,H=this.perm[V+this.perm[G+this.perm[X]]]%12,et=this.perm[V+y+this.perm[G+k+this.perm[X+A]]]%12,dt=this.perm[V+S+this.perm[G+T+this.perm[X+b]]]%12,pt=this.perm[V+1+this.perm[G+1+this.perm[X+1]]]%12;let Q=.6-d*d-v*v-w*w;Q<0?n=0:(Q*=Q,n=Q*Q*this._dot3(this.grad3[H],d,v,w));let ot=.6-_*_-P*P-D*D;ot<0?a=0:(ot*=ot,a=ot*ot*this._dot3(this.grad3[et],_,P,D));let lt=.6-R*R-E*E-z*z;lt<0?i=0:(lt*=lt,i=lt*lt*this._dot3(this.grad3[dt],R,E,z));let nt=.6-I*I-O*O-L*L;return nt<0?r=0:(nt*=nt,r=nt*nt*this._dot3(this.grad3[pt],I,O,L)),32*(n+a+i+r)}noise4d(t,e,s,n){const a=this.grad4,i=this.simplex,r=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let h,f,p,m,u;const g=(t+e+s+n)*l,x=Math.floor(t+g),M=Math.floor(e+g),d=Math.floor(s+g),v=Math.floor(n+g),w=(x+M+d+v)*c,y=x-w,k=M-w,A=d-w,S=v-w,T=t-y,b=e-k,_=s-A,P=n-S,D=T>b?32:0,R=T>_?16:0,E=b>_?8:0,z=T>P?4:0,I=b>P?2:0,O=_>P?1:0,L=D+R+E+z+I+O,V=i[L][0]>=3?1:0,G=i[L][1]>=3?1:0,X=i[L][2]>=3?1:0,H=i[L][3]>=3?1:0,et=i[L][0]>=2?1:0,dt=i[L][1]>=2?1:0,pt=i[L][2]>=2?1:0,Q=i[L][3]>=2?1:0,ot=i[L][0]>=1?1:0,lt=i[L][1]>=1?1:0,nt=i[L][2]>=1?1:0,kt=i[L][3]>=1?1:0,Tt=T-V+c,N=b-G+c,B=_-X+c,j=P-H+c,K=T-et+2*c,Mt=b-dt+2*c,Pt=_-pt+2*c,bt=P-Q+2*c,J=T-ot+3*c,_t=b-lt+3*c,ee=_-nt+3*c,ge=P-kt+3*c,Ae=T-1+4*c,us=b-1+4*c,fs=_-1+4*c,ds=P-1+4*c,oo=x&255,so=M&255,no=d&255,ao=v&255,pi=r[oo+r[so+r[no+r[ao]]]]%32,gi=r[oo+V+r[so+G+r[no+X+r[ao+H]]]]%32,vi=r[oo+et+r[so+dt+r[no+pt+r[ao+Q]]]]%32,xi=r[oo+ot+r[so+lt+r[no+nt+r[ao+kt]]]]%32,wi=r[oo+1+r[so+1+r[no+1+r[ao+1]]]]%32;let io=.6-T*T-b*b-_*_-P*P;io<0?h=0:(io*=io,h=io*io*this._dot4(a[pi],T,b,_,P));let ro=.6-Tt*Tt-N*N-B*B-j*j;ro<0?f=0:(ro*=ro,f=ro*ro*this._dot4(a[gi],Tt,N,B,j));let lo=.6-K*K-Mt*Mt-Pt*Pt-bt*bt;lo<0?p=0:(lo*=lo,p=lo*lo*this._dot4(a[vi],K,Mt,Pt,bt));let co=.6-J*J-_t*_t-ee*ee-ge*ge;co<0?m=0:(co*=co,m=co*co*this._dot4(a[xi],J,_t,ee,ge));let ho=.6-Ae*Ae-us*us-fs*fs-ds*ds;return ho<0?u=0:(ho*=ho,u=ho*ho*this._dot4(a[wi],Ae,us,fs,ds)),27*(h+f+p+m+u)}_dot(t,e,s){return t[0]*e+t[1]*s}_dot3(t,e,s,n){return t[0]*e+t[1]*s+t[2]*n}_dot4(t,e,s,n,a){return t[0]*e+t[1]*s+t[2]*n+t[3]*a}}class qt extends pe{constructor(t,e,s=512,n=512,a,i,r){super(),this.width=s,this.height=n,this.clear=!0,this.camera=e,this.scene=t,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=b0(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Rt(this.width,this.height,{type:It}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new wt({defines:Object.assign({},zo.defines),uniforms:Nt.clone(zo.uniforms),vertexShader:zo.vertexShader,fragmentShader:zo.fragmentShader,blending:yt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new pa,this.normalMaterial.blending=yt,this.pdMaterial=new wt({defines:Object.assign({},Fo.defines),uniforms:Nt.clone(Fo.uniforms),vertexShader:Fo.vertexShader,fragmentShader:Fo.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new wt({defines:Object.assign({},No.defines),uniforms:Nt.clone(No.uniforms),vertexShader:No.vertexShader,fragmentShader:No.fragmentShader,blending:yt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new wt({uniforms:Nt.clone(ie.uniforms),vertexShader:ie.vertexShader,fragmentShader:ie.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:ln,blendDst:Do,blendEquation:je,blendSrcAlpha:rn,blendDstAlpha:Do,blendEquationAlpha:je}),this.blendMaterial=new wt({uniforms:Nt.clone(ys.uniforms),vertexShader:ys.vertexShader,fragmentShader:ys.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Oi,blendSrc:ln,blendDst:Do,blendEquation:je,blendSrcAlpha:rn,blendDstAlpha:Do,blendEquationAlpha:je}),this._fsQuad=new Be(null),this._originalClearColor=new W,this.setGBuffer(a?a.depthTexture:void 0,a?a.normalTexture:void 0),i!==void 0&&this.updateGtaoMaterial(i),r!==void 0&&this.updatePdMaterial(r)}setSize(t,e){this.width=t,this.height=e,this.gtaoRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.pdRenderTarget.setSize(t,e),this.gtaoMaterial.uniforms.resolution.value.set(t,e),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(t,e),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(t,e){t!==void 0?(this.depthTexture=t,this.normalTexture=e,this._renderGBuffer=!1):(this.depthTexture=new ts,this.depthTexture.format=Gi,this.depthTexture.type=Bi,this.normalRenderTarget=new Rt(this.width,this.height,{minFilter:Ut,magFilter:Ut,type:It,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const s=this.normalTexture?1:0,n=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=s,this.gtaoMaterial.defines.DEPTH_SWIZZLING=n,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=s,this.pdMaterial.defines.DEPTH_SWIZZLING=n,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(t){t?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(t.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(t.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(t){t.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=t.radius),t.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=t.distanceExponent),t.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=t.thickness),t.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=t.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),t.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=t.scale),t.samples!==void 0&&t.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=t.samples,this.gtaoMaterial.needsUpdate=!0),t.screenSpaceRadius!==void 0&&(t.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=t.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(t){let e=!1;t.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=t.lumaPhi),t.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=t.depthPhi),t.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=t.normalPhi),t.radius!==void 0&&t.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=t.radius),t.radiusExponent!==void 0&&t.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=t.radiusExponent,e=!0),t.rings!==void 0&&t.rings!==this.pdRings&&(this.pdRings=t.rings,e=!0),t.samples!==void 0&&t.samples!==this.pdSamples&&(this.pdSamples=t.samples,e=!0),e&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Pa(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,e,s){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case qt.OUTPUT.Off:break;case qt.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=s.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case qt.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case qt.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case qt.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case qt.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case qt.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=s.texture,this.copyMaterial.blending=yt,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(t,this.blendMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(t,e,s,n,a){t.getClearColor(this._originalClearColor);const i=t.getClearAlpha(),r=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this._fsQuad.material=e,this._fsQuad.render(t),t.autoClear=r,t.setClearColor(this._originalClearColor),t.setClearAlpha(i)}_renderOverride(t,e,s,n,a){t.getClearColor(this._originalClearColor);const i=t.getClearAlpha(),r=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,n=e.clearColor||n,a=e.clearAlpha||a,n!=null&&(t.setClearColor(n),t.setClearAlpha(a||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=r,t.setClearColor(this._originalClearColor),t.setClearAlpha(i)}_overrideVisibility(){const t=this.scene,e=this._visibilityCache;t.traverse(function(s){(s.isPoints||s.isLine||s.isLine2)&&s.visible&&(s.visible=!1,e.push(s))})}_restoreVisibility(){const t=this._visibilityCache;for(let e=0;e<t.length;e++)t[e].visible=!0;t.length=0}_generateNoise(t=64){const e=new T0,s=t*t*4,n=new Uint8Array(s);for(let i=0;i<t;i++)for(let r=0;r<t;r++){const l=i,c=r;n[(i*t+r)*4]=(e.noise(l,c)*.5+.5)*255,n[(i*t+r)*4+1]=(e.noise(l+t,c)*.5+.5)*255,n[(i*t+r)*4+2]=(e.noise(l,c+t)*.5+.5)*255,n[(i*t+r)*4+3]=(e.noise(l+t,c+t)*.5+.5)*255}const a=new Oe(n,t,t,To,Ao);return a.wrapS=me,a.wrapT=me,a.needsUpdate=!0,a}}qt.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const Vs=["fogMul","sunMul","tintAmt","exposure","contrast","saturation","lift","bloom","aberration","scanline","vignette"],Hs=["skyTop","skyMid","skyBot","fog","sun","hemiSky","hemiGround","ambient","shadowTint","highlightTint","dustA","dustB"],xe={fogMul:1,sunMul:1,tintAmt:.14,exposure:1,contrast:1.06,saturation:1.04,lift:.012,bloom:1,aberration:.0016,scanline:.035,vignette:.2},bs={unit01:{...xe,id:"unit01",label:"数字 · 冰蓝",skyTop:2781104,skyMid:8372708,skyBot:14676984,fog:12575722,sun:15661311,hemiSky:12576501,hemiGround:3493978,ambient:11061718,shadowTint:3123396,highlightTint:15267583,dustA:8382719,dustB:13235199,aberration:.0019,scanline:.05},unit02:{...xe,id:"unit02",label:"传记 · 档案银",skyTop:5929108,skyMid:12174544,skyBot:15392739,fog:13882844,sun:16183796,hemiSky:13818340,hemiGround:5196370,ambient:12106436,shadowTint:7245744,highlightTint:16183026,tintAmt:.12,saturation:.94,contrast:1.08,dustA:13620962,dustB:15319244,scanline:.028},unit03:{...xe,id:"unit03",label:"旅行 · 黎明青",skyTop:3112851,skyMid:9227720,skyBot:15981014,fog:12573910,sun:16773614,hemiSky:11984088,hemiGround:4149062,ambient:10930372,shadowTint:2794392,highlightTint:16773360,tintAmt:.15,saturation:1.08,dustA:9429974,dustB:16752527},unit04:{...xe,id:"unit04",label:"工艺 · 石墨",skyTop:4871779,skyMid:10134443,skyBot:14276306,fog:12172480,sun:15986150,hemiSky:13159634,hemiGround:3881532,ambient:11053485,shadowTint:6256264,highlightTint:15920874,tintAmt:.1,saturation:.92,contrast:1.1,dustA:14275789,dustB:11846360,bloom:1.1,scanline:.03},unit05:{...xe,id:"unit05",label:"航天 · 深靛",skyTop:922176,skyMid:3817359,skyBot:9078472,fog:4869772,sun:14672639,hemiSky:9411032,hemiGround:1841728,ambient:7173048,shadowTint:4870096,highlightTint:15131903,tintAmt:.18,exposure:1.04,fogMul:1.1,dustA:12167423,dustB:14933247,bloom:1.2,aberration:.0021},unit06:{...xe,id:"unit06",label:"经济 · 港湾板岩",skyTop:3429742,skyMid:8362664,skyBot:13621976,fog:11123904,sun:15660274,hemiSky:11059396,hemiGround:3162175,ambient:9414314,shadowTint:2923142,highlightTint:15398130,tintAmt:.15,dustA:5235624,dustB:11060428},memory2090:{...xe,id:"memory2090",label:"2090 · 深蓝夜",skyTop:660008,skyMid:1851488,skyBot:2109512,fog:791588,sun:13623551,hemiSky:6260424,hemiGround:1382431,ambient:4876950,shadowTint:2781104,highlightTint:15003647,tintAmt:.16,exposure:1.02,sunMul:.9,dustA:8369407,dustB:12901631,scanline:.04},neutral:{...xe,id:"neutral",label:"回溯 · 冷白",skyTop:4159416,skyMid:10274020,skyBot:15003378,fog:13031650,sun:16054527,hemiSky:12901104,hemiGround:4214876,ambient:11584210,shadowTint:3903416,highlightTint:15397887,dustA:9425128,dustB:13821682}};function Nc(o){return o?bs[o]??bs.neutral:bs.neutral}function A0(o,t={r:0,g:0,b:0}){return t.r=(o>>16&255)/255,t.g=(o>>8&255)/255,t.b=(o&255)/255,t}function Is(){const o={};for(const t of Vs)o[t]=0;for(const t of Hs)o[t]={r:0,g:0,b:0};return o}function Io(o,t=Is()){for(const e of Vs)t[e]=o[e];for(const e of Hs)A0(o[e],t[e]);return t}function vn(o,t,e,s){for(const n of Vs)s[n]=o[n]+(t[n]-o[n])*e;for(const n of Hs){const a=o[n],i=t[n],r=s[n];r.r=a.r+(i.r-a.r)*e,r.g=a.g+(i.g-a.g)*e,r.b=a.b+(i.b-a.b)*e}return s}const _0=o=>{const t=o<0?0:o>1?1:o;return t*t*(3-2*t)};class Fc{constructor(t){F(this,"current");F(this,"from",Is());F(this,"to",Is());F(this,"elapsed",1);F(this,"duration",1);F(this,"_target");F(this,"version",0);this._target=t,this.current=Io(t),Io(t,this.from),Io(t,this.to)}get target(){return this._target}get settled(){return this.elapsed>=this.duration-1e-6}setTarget(t,e=2){t===this._target&&this.settled||(this._target=t,vn(this.current,this.current,0,this.from),Io(t,this.to),this.duration=Math.max(0,e),this.elapsed=0,this.version++,this.duration===0&&this.update(0))}update(t){if(this.settled&&this.duration>0)return this.current;this.elapsed=Math.min(this.duration,this.elapsed+t);const e=this.duration<=0?1:_0(this.elapsed/this.duration);return vn(this.from,this.to,e,this.current),this.current}}function xn(o,t){const e=Math.max(.05,o.r*.2126+o.g*.7152+o.b*.0722);return t[0]=o.r/e,t[1]=o.g/e,t[2]=o.b/e,t}const Da={high:{pixelRatio:2,grassRadius:40,grassCell:.8,shadowMap:2048,bloom:!0,bloomScale:.6},med:{pixelRatio:1.5,grassRadius:34,grassCell:1.1,shadowMap:1536,bloom:!0,bloomScale:.45},low:{pixelRatio:1,grassRadius:26,grassCell:1.9,shadowMap:1024,bloom:!1,bloomScale:.5}};function Ic(){var i;const o=Ee().tier;if(o!=="auto")return o;if(typeof window>"u")return"med";const t=((i=window.matchMedia)==null?void 0:i.call(window,"(pointer: coarse)").matches)??!1,e=Math.min(window.innerWidth,window.innerHeight)<540,s=navigator.hardwareConcurrency??4,n=navigator.deviceMemory??4,a=t||e;return a&&(s<=4||n<=3)?"low":a||s<=4||n<=4?"med":"high"}function Lc(o,t,e,s,n={}){const a=Da[s];if(!(!a.bloom&&!n.forceComposer))try{const i=o.getSize(new ut),r=i.x,l=i.y,c=o.getPixelRatio(),h=new Rt(Math.max(1,Math.floor(r*c)),Math.max(1,Math.floor(l*c)),{type:It,samples:0,depthTexture:new ts(Math.max(1,Math.floor(r*c)),Math.max(1,Math.floor(l*c)),ga)}),f=new h0(o,h),p=new u0(t,e);let m=null,u,g=0,x=!0,M=!0;const d=s!=="low"&&e instanceof $e?new d0(e,()=>m):void 0,v=s==="high"&&n.ao!==!1&&e instanceof $e?new he({renderer:o,scene:t,camera:e,width:r,height:l,selects:[],groundReflector:null}):void 0;if(v){v.opacity=.2,v.maxDistance=10,v.thickness=.08,v.resolutionScale=.5,v.ssrMaterial.defines.MAX_STEP=48;const P=p.setSize.bind(p);p.setSize=(R,E)=>{P(R,E),v.setSize(R,E)};const D=p.dispose.bind(p);p.dispose=()=>{v.dispose(),D()}}let w=0,y=[];const k=new C,A=p.render.bind(p);p.render=(P,D,R,E,z)=>{d!=null&&d.enabled?d.jitter(R.width,R.height):e instanceof $e&&e.clearViewOffset(),v&&w++%30===0&&(y=[],t.traverse(I=>{const O=I;if(!O.isMesh||(O.getWorldPosition(k),k.distanceToSquared(e.position)>2025))return;(Array.isArray(O.material)?O.material:[O.material]).some(V=>V instanceof at&&V.roughness<.3&&V.metalness>.3)&&y.push(O)}),v.selects=y),v&&x&&g===0&&y.length?(v.render(P,R,R,E,z),m=v.beautyRenderTarget.depthTexture,u=v.normalRenderTarget.texture):(A(P,D,R,E,z),m=R.depthTexture,u=void 0)},f.addPass(p);const S=e instanceof $e&&e.far>200?y0(e,t,()=>m):void 0;S&&f.addPass(S);let T;if(s!=="low"&&n.ao!==!1){T=new qt(t,e,r,l);const P=T,D=P.setSize.bind(P);P.setSize=(I,O)=>D(Math.max(1,Math.floor(I*.5)),Math.max(1,Math.floor(O*.5))),T.output=qt.OUTPUT.Default,T.blendIntensity=.55,T.updateGtaoMaterial({radius:1.1,distanceExponent:1.4,thickness:2,scale:1.1,samples:12,distanceFallOff:1,screenSpaceRadius:!1}),T.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:5,rings:2,samples:8});let R,E=!1;const z=P.render.bind(P);P.render=(I,O,L,V,G)=>{m&&(P.setGBuffer(m,u),(!E||R!==u)&&(P.gtaoMaterial.needsUpdate=!0,P.pdMaterial.needsUpdate=!0,R=u,E=!0)),z(I,O,L,V,G)},f.addPass(T)}d&&f.addPass(d);let b;if(a.bloom){const P=a.bloomScale;b=new Ze(new ut(r*P,l*P),.62,.5,.78);const D=b.setSize.bind(b);b.setSize=(R,E)=>D(Math.max(1,Math.floor(R*P)),Math.max(1,Math.floor(E*P))),f.addPass(b)}f.addPass(new M0);const _=new Ws({uniforms:{tDiffuse:{value:null},uContrast:{value:1.06},uSat:{value:1.04},uLift:{value:.012},uShadow:{value:new C(.7,1.15,1.3)},uHighlight:{value:new C(.96,1,1.05)},uTintAmt:{value:.14},uAberration:{value:.0016},uScan:{value:.035},uVig:{value:.2},uRes:{value:new ut(1280,720)},uTime:{value:0}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
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
        `});return f.addPass(_),f.setPixelRatio(o.getPixelRatio()),f.setSize(r,l),{composer:f,bloomPass:b,gradePass:_,setBudget(P){g=P,T&&(T.enabled=M&&P<2)},setFeature(P,D){P==="ssr"&&(x=D),P==="ao"&&(M=D,T&&(T.enabled=D&&g<2)),P==="taa"&&d&&(d.enabled=D,d.reset()),P==="aerial"&&S&&(S.enabled=D),P==="bloom"&&b&&(b.enabled=D)}}}catch{return}}function Uc(o,t){try{const e=new a0(o),s=new Wi,n=w0(10);t.sunDir&&n.material.uniforms.sunPosition.value.copy(t.sunDir).multiplyScalar(45e4),n.material.uniforms.showSunDisc.value=!1,s.add(n);const a=e.fromScene(s,.02);return s.traverse(i=>{const r=i;r.isMesh&&(r.geometry.dispose(),r.material.dispose())}),e.dispose(),a}catch{return}}const Lo=[1,1,1],Uo=[1,1,1];function Oc(o,t,e,s,n){const a=o.uniforms;a.uContrast.value=t.contrast,a.uSat.value=t.saturation,a.uLift.value=t.lift,a.uTintAmt.value=t.tintAmt,a.uAberration.value=t.aberration,a.uScan.value=t.scanline,a.uVig.value=t.vignette,a.uTime.value=e,a.uRes.value.set(s,n),xn(t.shadowTint,Lo),xn(t.highlightTint,Uo),a.uShadow.value.set(Lo[0],Lo[1],Lo[2]),a.uHighlight.value.set(Uo[0],Uo[1],Uo[2])}function Gc(){return Ee().resolution}function Bc(o,t,e,s,n=1,a=8192){if(!(o>0&&t>0))return 1;const i=e==="quality"?Math.min(2560/o,1440/t):e==="1080p"?Math.min(1920/o,1080/t):Math.min(n,Da[s].pixelRatio);return Math.max(.1,Math.min(i,a/Math.max(o,t)))}class Wc{constructor(){F(this,"level",0);F(this,"avgMs",16.7);F(this,"slow",0);F(this,"fast",0);F(this,"cooldown",0)}update(t,e){return!(e>0)||e>.3||!(t>0)||t>250||(this.avgMs+=(t-this.avgMs)*(1-Math.exp(-e/.5)),this.cooldown=Math.max(0,this.cooldown-e),this.slow=this.avgMs>18?this.slow+e:0,this.fast=this.avgMs<12?this.fast+e:0,this.cooldown>0)?null:this.slow>2&&this.level<2?(this.level=this.level+1,this.changed(),this.level):this.fast>12&&this.level>0?(this.level=this.level-1,this.changed(),this.level):null}changed(){this.slow=this.fast=0,this.cooldown=8}}function Vc(o,t){var T;const e=document.createElement("div");e.className="world-settings",e.style.setProperty("--world-settings-height",`${o.clientHeight||innerHeight}px`);const s=document.createElement("style");s.textContent=`
.world-settings{position:absolute;left:14px;top:54px;z-index:10020;color:#e4eef6;font:13px/1.5 system-ui}.world-settings button,.world-settings select{font:inherit;color:inherit;background:#203245;border:1px solid #657e95;border-radius:8px;padding:7px 12px}.world-settings button{cursor:pointer}.world-settings select{max-width:230px}.world-settings .settings-sheet{position:absolute;left:0;top:42px;width:min(570px,calc(100vw - 64px));box-sizing:border-box;max-height:min(620px,calc(var(--world-settings-height,100dvh) - 114px));overflow:auto;padding:20px;background:#101e2ef5;border:1px solid #637c94;border-radius:16px;box-shadow:0 20px 70px #0008;backdrop-filter:blur(18px)}.world-settings [hidden]{display:none!important}.world-settings h2{margin:0;font-size:20px}.world-settings nav{display:flex;gap:8px;margin:14px 0}.world-settings button[aria-selected=true]{background:#365c81;border-color:#acd5fb}.world-settings .setting-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid #a1c0df22}.world-settings input[type=range]{width:160px;accent-color:#9ed5ff}.world-settings input[type=checkbox]{width:18px;height:18px;accent-color:#9ed5ff}.world-settings .settings-info{color:#a8c1d7;font-size:12px;margin:10px 0;white-space:pre-line}.world-settings .settings-head{position:sticky;top:-20px;padding-top:8px;background:#101e2ef5;z-index:1}.world-settings .settings-footer{position:sticky;bottom:-20px;padding:10px 0;background:#101e2ef5;display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}@media(max-width:540px){.world-settings .settings-sheet{padding:14px}.world-settings .setting-row{gap:6px}.world-settings select{max-width:175px}.world-settings input[type=range]{width:120px}}
`;const n=document.createElement("button");n.type="button",n.textContent="⚙ 设置",n.setAttribute("aria-expanded","false");const a=document.createElement("section");a.className="settings-sheet",a.hidden=!0,a.setAttribute("role","dialog"),a.setAttribute("aria-label","游戏设置");const i=document.createElement("h2");i.textContent="游戏设置";const r=document.createElement("nav");r.setAttribute("aria-label","设置分类");const l=new Map,c=new Map;for(const b of["画面","环境","声音","操作"]){const _=document.createElement("button");_.type="button",_.textContent=b,_.setAttribute("aria-selected",String(b==="画面"));const P=document.createElement("div");P.hidden=b!=="画面",l.set(b,P),c.set(b,_),_.onclick=()=>{for(const[D,R]of l)R.hidden=D!==b,c.get(D).setAttribute("aria-selected",String(D===b))},r.append(_)}const h=new Map;function f(b,_,P){const D=document.createElement("label");D.className="setting-row";const R=document.createElement("span");R.textContent=_,D.append(R,P),l.get(b).append(D)}function p(b,_,P,D="画面"){const R=document.createElement("select");R.setAttribute("aria-label",_);for(const[E,z]of P){const I=document.createElement("option");I.value=E,I.textContent=z,R.append(I)}return R.value=String(Ee()[b]),R.onchange=()=>ps({[b]:b==="fpsLimit"||b==="shadowSize"?+R.value:R.value}),h.set(b,R),f(D,_,R),R}function m(b,_,P="画面"){var R;const D=document.createElement("input");D.type="checkbox",D.setAttribute("aria-label",_),D.checked=!!Ee()[b],D.onchange=()=>ps({[b]:D.checked}),t.tier==="low"&&["ssr","ao","taa","aerial","bloom"].includes(b)&&(D.disabled=!0),t.tier!=="high"&&b==="ssr"&&(D.disabled=!0),(R=t.unavailableFeatures)!=null&&R.includes(b)&&(D.disabled=!0),D.disabled&&(D.title="当前场景不启用此效果"),h.set(b,D),f(P,_,D)}function u(b,_,P,D,R,E){const z=document.createElement("input");z.type="range",z.min=P,z.max=D,z.step=R,z.value=String(Ee()[b]),z.setAttribute("aria-label",_),z.oninput=()=>ps({[b]:+z.value}),h.set(b,z),f(E,_,z)}p("resolution","渲染分辨率",[["quality","2K / 1440p · 画质优先"],["1080p","1080p · 固定清晰度"],["balanced","自动分辨率 · 流畅优先"]]),p("tier","场景细节档位",[["auto","自动匹配设备"],["high","高"],["med","中"],["low","低"]]),p("fpsLimit","帧率上限",[["0","不限"],["60","60 fps"],["120","120 fps"]]),p("shadowSize","阴影精度",[["1024","标准 · 1024"],["2048","精细 · 2048"]]),m("shadows","动态阴影"),m("ssr","屏幕空间反射"),m("ao","环境遮蔽"),m("taa","时间抗锯齿"),m("aerial","空气透视"),m("bloom","高光泛光"),m("showStats","显示帧率与实际分辨率");const g=document.createElement("p");g.className="settings-info",g.textContent=`当前场景档位：${{high:"高",med:"中",low:"低"}[t.tier]}。画面开关即时生效；细节档位在重载后生效。
自动性能预算可能暂时减少反射、环境遮蔽与阴影更新频率。`,(T=t.unavailableFeatures)!=null&&T.length&&(g.textContent+=`
回忆显形期间不启用环境遮蔽与屏幕空间反射，避免未重现物件提前产生遮挡。`),l.get("画面").append(g);const x=document.createElement("output");if(x.className="settings-info",x.setAttribute("aria-label","实际渲染分辨率"),l.get("画面").append(x),t.exploration&&u("hazeStrength","大气雾强度","0","1",".05","环境"),t.weather){const b=document.createElement("select");b.setAttribute("aria-label","世界天气");for(const[_,P]of[["clear","晴"],["overcast","多云"],["lightRain","小雨"],["heavyRain","大雨"],["drizzleMist","雾"],["snow","雪"],["dusk","黄昏"],["night","夜晚"]]){const D=document.createElement("option");D.value=_,D.textContent=P,b.append(D)}b.onchange=()=>t.weather(b.value),f("环境","天气",b)}if(t.time){const b=document.createElement("input");b.type="range",b.min="0",b.max="24",b.step=".25",b.value="14",b.setAttribute("aria-label","太阳时刻");const _=document.createElement("output");_.textContent="14:00",b.oninput=()=>{_.textContent=`${Math.floor(+b.value).toString().padStart(2,"0")}:${Math.round(+b.value%1*60).toString().padStart(2,"0")}`,t.time(+b.value)},f("环境","太阳时刻",b),l.get("环境").append(_)}else{const b=document.createElement("p");b.className="settings-info",b.textContent="回忆中的太阳方向由场景设置与剧情镜头决定。",l.get("环境").append(b)}let M;if(t.music){const b=document.createElement("input");b.type="range",b.min="0",b.max="1",b.step=".01",b.setAttribute("aria-label","背景音乐音量"),b.value=String(t.music.level),b.oninput=()=>t.music.setVolume(+b.value),f("声音","背景音乐音量",b);const _=document.createElement("button");_.type="button",_.onclick=()=>t.music.toggle(),l.get("声音").append(_),M=t.music.subscribe(()=>{b.value=String(t.music.level),_.textContent=t.music.playing?"暂停配乐":"播放配乐"})}u("sfxVolume","界面音效音量","0","1",".05","声音"),u("sensitivity","视角灵敏度",".25","2.5",".05","操作"),t.exploration||m("invertY","回忆视角反转 Y 轴","操作"),t.exploration&&(u("exploreFov","探索视野角度","40","75","1","操作"),u("followDistance","第三人称跟随距离","2.5","12",".1","操作"));const d=document.createElement("div");d.className="settings-footer";const v=document.createElement("button");v.type="button",v.textContent="应用细节档位并重载",v.onclick=()=>window.location.reload();const w=document.createElement("button");w.type="button",w.textContent="恢复默认",w.onclick=Vi;const y=document.createElement("button");y.type="button",y.textContent="返回游戏";function k(b){var _,P;a.hidden=!b,n.setAttribute("aria-expanded",String(b)),(_=t.onOpen)==null||_.call(t,b),b?(a.scrollTop=0,(P=Array.from(c.values()).find(D=>D.getAttribute("aria-selected")==="true"))==null||P.focus({preventScroll:!0})):n.focus()}n.onclick=()=>k(a.hidden),y.onclick=()=>k(!1),a.addEventListener("keydown",b=>{if(b.key==="Escape"&&(b.stopPropagation(),k(!1)),b.key==="Tab"){const _=Array.from(a.querySelectorAll("button,input,select")).filter(R=>!R.closest("[hidden]")),P=_[0],D=_.at(-1);b.shiftKey&&document.activeElement===P?(b.preventDefault(),D==null||D.focus()):!b.shiftKey&&document.activeElement===D&&(b.preventDefault(),P==null||P.focus())}}),d.append(v,w,y);const A=document.createElement("div");A.className="settings-head",A.append(i,r),a.append(A,...l.values(),d),e.append(s,n,a),o.append(e),e.addEventListener("pointerdown",b=>b.stopPropagation()),e.addEventListener("keydown",b=>{a.hidden||b.key!=="Escape"&&b.stopPropagation()});const S=va(b=>{for(const[_,P]of h)P instanceof HTMLInputElement&&P.type==="checkbox"?P.checked=!!b[_]:P.value=String(b[_])});return Object.assign(()=>{S(),M==null||M(),e.remove()},{setResolution(b,_){e.style.setProperty("--world-settings-height",`${o.clientHeight||innerHeight}px`),x.textContent=`实际绘制 ${b}×${_} 像素`}})}function Hc(o,t,e){let s={};const n=a=>{var i;a.shadows!==s.shadows&&(o.shadowMap.enabled=a.shadows,o.shadowMap.needsUpdate=!0);for(const r of["ssr","ao","taa","aerial","bloom"])a[r]!==s[r]&&(t==null||t.setFeature(r,a[r]));a.shadowSize!==s.shadowSize&&e.shadowSize(a.shadowSize),a.exploreFov!==s.exploreFov&&((i=e.fov)==null||i.call(e,a.exploreFov)),a.resolution!==s.resolution&&e.resolution(a.resolution),a.showStats!==s.showStats&&e.stats(),s={...a}};return n(Ee()),va(n)}class jc{constructor(){F(this,"previous",0);F(this,"debt",0)}ready(t,e){if(!e)return this.previous=t,this.debt=0,!0;if(!this.previous||t-this.previous>300)return this.previous=t,this.debt=0,!0;this.debt+=Math.max(0,t-this.previous),this.previous=t;const s=1e3/e;return this.debt<s-.3?!1:(this.debt=Math.max(0,this.debt-s),this.debt>s*2&&(this.debt=0),!0)}}const P0={wet:{value:0},rain:{value:0},time:{value:0}};function Oo(o,t,e){let s=Math.imul(o|0,374761393)^Math.imul(t|0,668265263)^Math.imul((e|0)+1,1442695041);return s=Math.imul(s^s>>>13,1274126177),s^=s>>>16,(s>>>0)/4294967295}const wn=o=>o*o*o*(o*(o*6-15)+10);function Ls(o,t,e,s){const n=o*e,a=t*e,i=Math.floor(n),r=Math.floor(a),l=wn(n-i),c=wn(a-r),h=(i%e+e)%e,f=(r%e+e)%e,p=(h+1)%e,m=(f+1)%e,u=Oo(h,f,s),g=Oo(p,f,s),x=Oo(h,m,s),M=Oo(p,m,s);return u+(g-u)*l+(x-u)*c+(u-g-x+M)*l*c}function D0(o,t,e){let s=0,n=1,a=4;for(let i=0;i<5;i++){const r=Ls(o,t,a,e*17+i*101),l=1-Math.abs(2*r-1);s+=(r*.45+l*.55)*n,n*=.55,a*=2}return s}function R0(o,t){const e=new Float32Array(o*o);let s=1/0,n=-1/0;for(let c=0;c<o;c++)for(let h=0;h<o;h++){const f=D0(h/o,c/o,t);e[c*o+h]=f,f<s&&(s=f),f>n&&(n=f)}const a=new Uint8Array(o*o*4),i=o/256*1.6,r=n-s||1,l=c=>(c+o)%o;for(let c=0;c<o;c++)for(let h=0;h<o;h++){const f=(e[c*o+l(h+1)]-e[c*o+l(h-1)])*.5*i*2.2,p=(e[l(c+1)*o+h]-e[l(c-1)*o+h])*.5*i*2.2,m=Math.hypot(f,p,1),u=(c*o+h)*4;a[u]=Math.round((-f/m*.5+.5)*255),a[u+1]=Math.round((-p/m*.5+.5)*255),a[u+2]=Math.round((1/m*.5+.5)*255),a[u+3]=Math.round((e[c*o+h]-s)/r*255)}return{size:o,data:a}}function C0(o,t){const e=new Uint8Array(o*o*4);for(let s=0;s<o;s++)for(let n=0;n<o;n++){const a=n/o,i=s/o;let r=0,l=.5,c=6;for(let u=0;u<4;u++){const g=Ls(a,i,c,t*31+u*53);r+=(1-Math.abs(2*g-1))*l,l*=.5,c*=2}const h=Ls(a,i,5,t*7+3),f=Math.min(1,Math.max(0,Math.pow(r/.9375,1.6)*(.55+h*.7))),p=(s*o+n)*4,m=Math.round(f*255);e[p]=m,e[p+1]=m,e[p+2]=m,e[p+3]=255}return{size:o,data:e}}const fo={rate:[.55,.35,.3],alphaMin:.12,alphaMax:.97,alphaRate:.9},Ss={time:{value:0},sunDir:{value:new C(.3,.6,-.5).normalize()},sunColor:{value:new W(1,.95,.85)}};let E0=0;const Us=new Map;function z0(){return{reflection:{value:null},refraction:{value:null},reflectionMatrix:{value:new q},refractionMatrix:{value:new q},ready:{value:0},planeY:{value:0}}}function Mn(o){return Us.get(o.userData.waterViewId)}const Ra=6268306,Ca=801342,yn=new Map,bn=new Map;function Ea(o,t,e){const s=new Oe(o,t,t,To,Ao);return s.wrapS=me,s.wrapT=me,s.magFilter=Ie,s.minFilter=es,s.generateMipmaps=!0,s.anisotropy=e,s.colorSpace=_o,s.needsUpdate=!0,s}function N0(o){let t=yn.get(o);return t||(t=Ea(R0(o,11).data,o,4),yn.set(o,t)),t}function F0(o){let t=bn.get(o);return t||(t=Ea(C0(o,23).data,o,2),bn.set(o,t)),t}const I0=`
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
`,L0=`
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
`,U0=`
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
`;function za(o){const t=new Le({color:16777215,roughness:.14,metalness:0,ior:1.333,transparent:!0,depthWrite:!0,envMapIntensity:1});t.fog=o.fog;const e=z0(),s=++E0;Us.set(s,e),t.userData.waterViewId=s,t.addEventListener("dispose",()=>Us.delete(s));const n=N0(o.quality==="low"?128:256),a=o.quality==="low"||!o.depthTex?void 0:F0(256),i=new W(o.shallow),r=new W(o.deep),l=o.ramp??new ke(0,1,.8,.8),c=[o.depthTex?"#define W_DEPTH_TEX":"",a?"#define W_FOAM_TEX":"",o.quality!=="low"?"#define W_FAR":"",o.quality==="low"?"#define W_LOWENV":""].join(`
`);t.onBeforeCompile=f=>{f.uniforms.uWReflection=e.reflection,f.uniforms.uWRefraction=e.refraction,f.uniforms.uWReflectionMatrix=e.reflectionMatrix,f.uniforms.uWRefractionMatrix=e.refractionMatrix,f.uniforms.uWViewReady=e.ready,f.uniforms.uWPlaneY=e.planeY,f.uniforms.uWTime=Ss.time,f.uniforms.uWSunDir=Ss.sunDir,f.uniforms.uWSunColor=Ss.sunColor,f.uniforms.uWNormal={value:n},f.uniforms.uWShallow={value:i},f.uniforms.uWDeep={value:r},f.uniforms.uWRamp={value:l},o.depthTex&&(f.uniforms.uWDepthTex={value:o.depthTex},f.uniforms.uWBox={value:o.box??new ke(0,0,1,1)}),a&&(f.uniforms.uWFoam={value:a}),f.vertexShader=`varying vec3 vWPos;
varying float vWLocalZ;
`+f.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
       vWLocalZ = transformed.z;`),f.fragmentShader=c+`
`+I0+f.fragmentShader.replace("#include <normal_fragment_maps>",L0).replace("#include <lights_fragment_maps>",U0).replace("#include <fog_fragment>",`#ifdef USE_FOG
           // 与地形同一套雾公式：远处水面融入雾色
           float tf = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
           tf = max(tf, smoothstep(150.0, 340.0, vFogDepth) * 0.92);
           gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, tf);
         #endif`)};const h=`water-v1-${o.quality}-${o.depthTex?"d":"f"}-${a?"f":"n"}`;return t.customProgramCacheKey=()=>h,t}function $c(o){const{outline:t,x:e,y:s,z:n,groundY:a,quality:i}=o,r=new Hi(new Te(t),1);r.rotateX(-Math.PI/2);let l=1/0,c=-1/0,h=1/0,f=-1/0;for(const w of t)l=Math.min(l,e+w.x),c=Math.max(c,e+w.x),h=Math.min(h,n-w.y),f=Math.max(f,n-w.y);const p=1.5;l-=p,h-=p,c+=p,f+=p;const m=c-l,u=f-h,g=i==="low"?32:64,x=new Uint16Array(g*g);for(let w=0;w<g;w++){const y=h+(w+.5)/g*u;for(let k=0;k<g;k++){const A=l+(k+.5)/g*m,S=$.clamp(a(A,y)-s,-16,16);x[w*g+k]=xa.toHalfFloat(S)}}const M=new Oe(x,g,g,wa,It);M.magFilter=Ie,M.minFilter=Ie,M.wrapS=zs,M.wrapT=zs,M.generateMipmaps=!1,M.colorSpace=_o,M.needsUpdate=!0;const d=za({quality:i,shallow:o.shallowColor??Ra,deep:o.deepColor??Ca,fog:!0,depthTex:M,box:new ke(l,h,1/m,1/u)}),v=new Y(r,d);return v.position.set(e,s,n),v.userData.isWater=!0,v.castShadow=!1,v.receiveShadow=!1,{mesh:v,dispose(){r.dispose(),d.dispose(),M.dispose()}}}function O0(o={}){const t=o.depth??.6,e=o.ramp;return za({quality:o.quality??"med",shallow:o.shallowColor??Ra,deep:o.deepColor??Ca,fog:o.fog??!1,ramp:e?new ke(e.z0,e.z1,e.near,e.far):new ke(0,1,t,t)})}function G0(o,t,e=new $e){e.copy(o),o.updateMatrixWorld(),e.position.y=2*t-o.position.y;const s=o.getWorldDirection(new C);return s.y=-s.y,e.up.copy(o.up),e.up.y=-e.up.y,e.lookAt(e.position.clone().add(s)),e.updateMatrixWorld(),e}const Sn=new q().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1);class Xc{constructor(t){F(this,"reflection");F(this,"refraction");F(this,"reflected",new $e);F(this,"frame",0);F(this,"interval",4);F(this,"frustum",new ji);F(this,"projection",new q);F(this,"previousView");this.tier=t;const e=t==="high"?512:256;this.reflection=new Rt(e,e,{type:It}),this.refraction=this.reflection.clone()}setBudget(t){this.interval=4*Math.pow(2,t)}update(t,e,s){if(this.tier==="low"||this.frame++%this.interval!==0)return;this.previousView&&(this.previousView.ready.value=0);const n=[];e.updateMatrixWorld(),s.updateMatrixWorld(),this.frustum.setFromProjectionMatrix(this.projection.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse));const a=new Bs,i=new C;if(e.traverse(g=>{if(!(g instanceof Y)||!g.visible)return;const x=Array.isArray(g.material)?g.material:[g.material];for(const M of x){const d=Mn(M);if(!d||(a.setFromObject(g),!this.frustum.intersectsBox(a)))continue;a.getCenter(i);const v=a.distanceToPoint(s.position);s.position.y>a.max.y+.1&&v<65&&n.push({mesh:g,view:d,y:a.max.y,distance:v})}}),!n.length)return;n.sort((g,x)=>g.distance-x.distance);const r=n[0];for(const g of n)g.view.ready.value=0;const l=[];e.traverse(g=>{g instanceof Y&&(Array.isArray(g.material)?g.material:[g.material]).some(x=>!!Mn(x))&&(l.push([g,g.visible]),g.visible=!1)});const c=t.getRenderTarget(),h=t.clippingPlanes,f=t.shadowMap.autoUpdate,p=t.xr.enabled,m=t.autoClear,u=t.shadowMap.needsUpdate;try{t.xr.enabled=!1,t.shadowMap.autoUpdate=!1,t.shadowMap.needsUpdate=!1,t.autoClear=!0,G0(s,r.y,this.reflected),t.clippingPlanes=[new cn(new C(0,1,0),-r.y+.03)],t.setRenderTarget(this.reflection),t.clear(),t.render(e,this.reflected),t.clippingPlanes=[new cn(new C(0,-1,0),r.y+.03)],t.setRenderTarget(this.refraction),t.clear(),t.render(e,s);const g=r.view;g.reflection.value=this.reflection.texture,g.refraction.value=this.refraction.texture,g.reflectionMatrix.value.copy(Sn).multiply(this.reflected.projectionMatrix).multiply(this.reflected.matrixWorldInverse),g.refractionMatrix.value.copy(Sn).multiply(s.projectionMatrix).multiply(s.matrixWorldInverse),g.planeY.value=r.y,g.ready.value=1,this.previousView=g}finally{for(const[g,x]of l)g.visible=x;t.clippingPlanes=h,t.shadowMap.autoUpdate=f,t.shadowMap.needsUpdate=u,t.xr.enabled=p,t.autoClear=m,t.setRenderTarget(c)}}dispose(){this.reflection.dispose(),this.refraction.dispose()}}const mo=new C;function Vt(o,t,e,s,n,a){const i=2*Math.PI*n/4,r=Math.max(a-2*n,0),l=Math.PI/4;mo.copy(t),mo[s]=0,mo.normalize();const c=.5*i/(i+r),h=1-mo.angleTo(o)/l;return Math.sign(mo[e])===1?h*c:r/(i+r)+c+c*(1-h)}class Se extends bo{constructor(t=1,e=1,s=1,n=2,a=.1){const i=n*2+1;if(a=Math.min(t/2,e/2,s/2,a),super(1,1,1,i,i,i),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:s,segments:n,radius:a},i===1)return;const r=this.toNonIndexed();this.index=null,this.attributes.position=r.attributes.position,this.attributes.normal=r.attributes.normal,this.attributes.uv=r.attributes.uv;const l=new C,c=new C,h=new C(t,e,s).divideScalar(2).subScalar(a),f=this.attributes.position.array,p=this.attributes.normal.array,m=this.attributes.uv.array,u=f.length/6,g=new C,x=.5/i;for(let M=0,d=0;M<f.length;M+=3,d+=2)switch(l.fromArray(f,M),c.copy(l),c.x-=Math.sign(c.x)*x,c.y-=Math.sign(c.y)*x,c.z-=Math.sign(c.z)*x,c.normalize(),f[M+0]=h.x*Math.sign(l.x)+c.x*a,f[M+1]=h.y*Math.sign(l.y)+c.y*a,f[M+2]=h.z*Math.sign(l.z)+c.z*a,p[M+0]=c.x,p[M+1]=c.y,p[M+2]=c.z,Math.floor(M/u)){case 0:g.set(1,0,0),m[d+0]=Vt(g,c,"z","y",a,s),m[d+1]=1-Vt(g,c,"y","z",a,e);break;case 1:g.set(-1,0,0),m[d+0]=1-Vt(g,c,"z","y",a,s),m[d+1]=1-Vt(g,c,"y","z",a,e);break;case 2:g.set(0,1,0),m[d+0]=1-Vt(g,c,"x","z",a,t),m[d+1]=Vt(g,c,"z","x",a,s);break;case 3:g.set(0,-1,0),m[d+0]=1-Vt(g,c,"x","z",a,t),m[d+1]=1-Vt(g,c,"z","x",a,s);break;case 4:g.set(0,0,1),m[d+0]=1-Vt(g,c,"x","y",a,t),m[d+1]=1-Vt(g,c,"y","x",a,e);break;case 5:g.set(0,0,-1),m[d+0]=Vt(g,c,"x","y",a,t),m[d+1]=1-Vt(g,c,"y","x",a,e);break}}static fromJSON(t){return new Se(t.width,t.height,t.depth,t.segments,t.radius)}}const js=["masonry","brick","plaster","paving","wood","tiles","metal","concrete"],B0={masonry:2.4,brick:1.2,plaster:1.6,paving:1.8,wood:1.6,tiles:1.2,metal:1,concrete:2};function Na(o){return js.indexOf(o)}const Fa=.65,Ia=.87,La=.66;function W0(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const ft=(o,t,e)=>{const s=(e-o)/(t-o);return s<=0?0:s>=1?1:s*s*(3-2*s)},$t=(o,t,e)=>o+(t-o)*e,V0=o=>o<0?0:o>1?1:o;function tt(o,t,e,s,n,a=.5){const i=new Float32Array(o*o);let r=1,l=0;const c=new Int32Array(o),h=new Int32Array(o),f=new Float32Array(o);for(let m=0;m<n;m++){const u=e<<m,g=s<<m;if(u>o/2||g>o/2)break;const x=new Float32Array(u*g);for(let d=0;d<x.length;d++)x[d]=t();for(let d=0;d<o;d++){const v=d*u/o,w=Math.floor(v),y=v-w;c[d]=w%u,h[d]=(w+1)%u,f[d]=y*y*(3-2*y)}const M=new Float32Array(u);for(let d=0;d<o;d++){const v=d*g/o,w=Math.floor(v),y=v-w,k=y*y*(3-2*y),A=w%g*u,S=(w+1)%g*u;for(let b=0;b<u;b++)M[b]=x[A+b]+(x[S+b]-x[A+b])*k;const T=d*o;for(let b=0;b<o;b++){const _=M[c[b]];i[T+b]+=r*(_+(M[h[b]]-_)*f[b])}}l+=r,r*=a}if(l===0)throw new Error("noiseField: cells exceed size");const p=1/l;for(let m=0;m<i.length;m++)i[m]*=p;return i}function H0(o){const t=o*o;return{S:o,mask:o-1,s:o/512,H:new Float32Array(t),R:new Float32Array(t).fill(1),G:new Float32Array(t).fill(1),B:new Float32Array(t).fill(1),F:new Float32Array(t).fill(La),A:new Float32Array(t).fill(1)}}function kn(o,t,e,s,n){const a=o-1,i=Math.ceil(s),r=Math.round(t),l=Math.round(e);for(let c=-i;c<=i;c++)for(let h=-i;h<=i;h++){const f=Math.sqrt(h*h+c*c)/s;f>=1||n((l+c&a)*o+(r+h&a),1-f)}}function $s(o,t,e){const s=o-1,n=o/512,a=new Int32Array(e.rows+1);{const w=[];let y=0;for(let A=0;A<e.rows;A++){const S=1+(t()-.5)*2*e.rowJitter;w.push(S),y+=S}let k=0;for(let A=0;A<e.rows;A++)a[A]=Math.round(k/y*o),k+=w[A];a[e.rows]=o}const i=new Int16Array(o);for(let w=0;w<e.rows;w++)for(let y=a[w];y<a[w+1];y++)i[y]=w;const r=[],l=new Int32Array(e.rows),c=new Int32Array(e.rows+1),h=new Uint16Array(e.rows*o);let f=0;for(let w=0;w<e.rows;w++){const y=Math.max(1,e.perRow+(e.perRowVar?(t()*3|0)-1:0)),k=[];let A=0;for(let b=0;b<y;b++){const _=1+(t()-.5)*2*e.widthJitter;k.push(_),A+=_}const S=new Int32Array(y+1);let T=0;for(let b=0;b<y;b++)S[b]=Math.round(T/A*o),T+=k[b];S[y]=o,r.push(S),l[w]=e.offset==="random"?Math.floor(t()*o):e.offset==="half"?(w&1)*Math.round(o/y/2):0;for(let b=0;b<y;b++)for(let _=S[b];_<S[b+1];_++)h[w*o+_]=b;c[w]=f,f+=y}c[e.rows]=f;const p=tt(o,t,6,6,3),m=e.warp*n*2.6,u=o/3|0,g=o/5|0,x=new Float32Array(o*o),M=new Int32Array(o*o),d=new Float32Array(o*o),v=new Float32Array(o*o);for(let w=0;w<o;w++)for(let y=0;y<o;y++){const k=w*o+y,A=(y+(p[k]-.5)*m|0)&s,S=(w+(p[(w+u&s)*o+(y+g&s)]-.5)*m|0)&s,T=i[S],b=A-l[T]&s,_=h[T*o+b],P=r[T],D=P[_],R=P[_+1],E=a[T],z=a[T+1],I=Math.min(b-D,R-1-b,S-E,z-1-S)+.5;x[k]=I,M[k]=c[T]+_,d[k]=(b-D+.5)/(R-D),v[k]=(S-E+.5)/(z-E)}return{d:x,id:M,fu:d,fv:v,total:f}}function j0(o,t){const e=o.S,s=o.s,n=$s(e,t,{rows:6,rowJitter:.3,perRow:3,perRowVar:!0,widthJitter:.45,offset:"random",warp:4.5}),a=tt(e,t,3,3,3),i=tt(e,t,10,10,3),r=tt(e,t,e/4,e/4,2),l=tt(e,t,4,4,3),c=new Float32Array(n.total),h=new Float32Array(n.total),f=new Float32Array(n.total),p=new Float32Array(n.total*2);for(let u=0;u<n.total;u++)c[u]=(.78+t()*.42)*(t()<.1?.8:1),h[u]=.5+t()*.3,f[u]=(t()-.5)*.1,p[u*2]=(t()-.5)*.16,p[u*2+1]=(t()-.5)*.16;const m=Math.max(2,5*s);for(let u=0;u<e*e;u++){const g=n.d[u],x=n.id[u],M=n.fu[u],d=n.fv[u],v=ft(m*.55,m*.55+8*s,g),w=1-ft(m*.45,m*1.25,g),y=Math.sin(Math.PI*M)*Math.sin(Math.PI*d),k=h[x]*(.82+.26*a[u])+y*.1+(M-.5)*p[x*2]+(d-.5)*p[x*2+1]+(i[u]-.5)*.16+(r[u]-.5)*.08;o.H[u]=$t(.04+(r[u]-.5)*.05,k,v);let A=c[x]*(.88+.28*i[u])*(.9+.2*l[u])*(.84+.16*ft(m,m+12*s,g));A*=.94+.12*r[u];const S=1.04*(.82+.34*r[u]);A=$t(A,S,w);const T=f[x]*(1-w);o.R[u]=A*(1+T+w*.03),o.G[u]=A*(1+T*.3),o.B[u]=A*(1-T*.9-w*.07),o.F[u]=$t(.6+(i[u]-.5)*.3,.95,w),o.A[u]=1-w*.35}}function $0(o,t){const e=o.S,s=o.s,n=$s(e,t,{rows:16,rowJitter:0,perRow:6,perRowVar:!1,widthJitter:0,offset:"half",warp:.8}),a=tt(e,t,8,8,3),i=tt(e,t,e/4,e/4,2),r=tt(e,t,5,5,3),l=new Float32Array(n.total),c=new Float32Array(n.total),h=new Float32Array(n.total);for(let p=0;p<n.total;p++)l[p]=(.82+t()*.3)*(t()<.08?.72:1)*(t()<.05?1.12:1),c[p]=t()-.5,h[p]=.76+t()*.12;const f=Math.max(2,4*s);for(let p=0;p<e*e;p++){const m=n.d[p],u=n.id[p],g=ft(f*.5,f+2.6*s,m),x=1-ft(f*.4,f*1.15,m),M=(i[p]-.5)*.07;o.H[p]=$t(.06+M*.4,h[u]+M+(a[p]-.5)*.06,g);let d=l[u]*(.9+.2*a[p])*(.92+.16*i[p])*(.94+.12*r[p]);d*=.9+.1*ft(f,f+6*s,m);const v=1.3*(.84+.32*i[p]);d=$t(d,v,x);const w=c[u]*(1-x);o.R[p]=d*(1+w*.16+x*.04),o.G[p]=d*(1-w*.04+x*.14),o.B[p]=d*(1-w*.3+x*.2),o.F[p]=$t(.74+(i[p]-.5)*.2,.96,x),o.A[p]=1-x*.4}}function X0(o,t){const e=o.S,s=o.s,n=$s(e,t,{rows:3,rowJitter:.04,perRow:3,perRowVar:!1,widthJitter:.05,offset:"random",warp:1.6}),a=tt(e,t,3,3,3),i=tt(e,t,12,12,3),r=tt(e,t,e/4,e/4,2),l=tt(e,t,5,5,4),c=new Float32Array(n.total),h=new Float32Array(n.total),f=new Float32Array(n.total),p=new Float32Array(n.total*2);for(let u=0;u<n.total;u++)c[u]=.86+t()*.26,h[u]=(t()-.5)*.08,f[u]=.62+t()*.16,p[u*2]=(t()-.5)*.1,p[u*2+1]=(t()-.5)*.1;const m=Math.max(2,4.5*s);for(let u=0;u<e*e;u++){const g=n.d[u],x=n.id[u],M=ft(m*.5,m+4*s,g),d=1-ft(m*.4,m*1.2,g),v=l[u],w=f[x]+(n.fu[u]-.5)*p[x*2]+(n.fv[u]-.5)*p[x*2+1]-v*.12+(i[u]-.5)*.08+(r[u]-.5)*.05;o.H[u]=$t(.05+(r[u]-.5)*.06,w,M);let y=c[x]*(.9+.2*a[u])*(.9+.2*i[u])*(.95+.1*r[u]);y*=.88+.12*ft(m,m+8*s,g),y=$t(y,.78*(.8+.4*r[u]),d);const k=h[x]*(1-d);o.R[u]=y*(1+k+d*.04),o.G[u]=y*(1+k*.2+d*.02),o.B[u]=y*(1-k*.8-d*.06),o.F[u]=$t(.68+(v-.5)*.3,.96,d),o.A[u]=1-d*.4}}function Y0(o,t){const e=o.S,s=o.s,n=o.mask,a=tt(e,t,3,3,5),i=tt(e,t,12,12,3),r=tt(e,t,e/2,e/2,1),l=tt(e,t,5,5,3),c=tt(e,t,6,6,4),h=tt(e,t,24,24,3),f=new Float32Array(e*e),p=(u,g,x,M,d)=>{for(let v=0;v<M;v++){x+=(t()-.5)*.5,u+=Math.cos(x),g+=Math.sin(x);const w=Math.round(u)&n,y=Math.round(g)&n,k=1-v/M*.5,A=y*e+w;f[A]<k&&(f[A]=k);const S=y*e+(w+1&n),T=(y+1&n)*e+w;f[S]=Math.max(f[S],k*.35),f[T]=Math.max(f[T],k*.35),d<2&&t()<.0035&&p(u,g,x+(t()<.5?-1:1)*(.5+t()*.6),M*.45,d+1)}},m=1;for(let u=0;u<m;u++)p(t()*e,t()*e,t()*Math.PI*2,(110+t()*150)*s,0);for(let u=0;u<e*e;u++){const g=ft(.8,.84,c[u]+(h[u]-.5)*.3),x=g*(1-ft(.8,1,g)),M=(r[u]-.5)*2+(t()-.5)*.9,d=f[u],v=.62+(l[u]-.5)*.18+M*.03-g*.2-d*.3+x*.04;o.H[u]=v;let w=(.95+.1*a[u])*(.96+.08*i[u])*(1+M*.035);w=$t(w,w*.94,g),w*=1-d*.18,o.R[u]=w*(1+g*.01),o.G[u]=w*(1-g*.04),o.B[u]=w*(1-g*.12),o.F[u]=$t(.84+(i[u]-.5)*.14,.98,g),o.A[u]=1-d*.3-g*.1}}function K0(o,t){const e=o.S,s=o.s,n=o.mask,a=10,i=new Int32Array(a+1);{const A=[];let S=0;for(let b=0;b<a;b++){const _=.88+t()*.24;A.push(_),S+=_}let T=0;for(let b=0;b<a;b++)i[b]=Math.round(T/S*e),T+=A[b];i[a]=e}const r=new Int16Array(e);for(let A=0;A<a;A++)for(let S=i[A];S<i[A+1];S++)r[S]=A;const l=new Int32Array(a),c=new Int32Array(a),h=new Float32Array(a*2),f=new Float32Array(a*2),p=new Float32Array(a*2),m=new Float32Array(a*2);for(let A=0;A<a;A++){l[A]=Math.floor(t()*e),c[A]=l[A]+Math.round(e*(.38+t()*.24))&n;for(let S=0;S<2;S++)h[A*2+S]=.8+t()*.4,f[A*2+S]=t()-.5,p[A*2+S]=2.5+t()*3.5,m[A*2+S]=t()*6.28}const u=tt(e,t,2,32,3),g=tt(e,t,6,6,3),x=tt(e,t,12,e/2,1),M=tt(e,t,4,4,3),d=new Float32Array(e*e),v=[];for(let A=0;A<3;A++)v.push({x:t()*e,y:t()*e,r:(13+t()*9)*s});for(const A of v){const S=Math.ceil(A.r*2.6);for(let T=-S;T<=S;T++)for(let b=-S;b<=S;b++){const _=Math.sqrt(b/1.7*(b/1.7)+T*T)/A.r;if(_>2.6)continue;const P=(Math.round(A.y+T)&n)*e+(Math.round(A.x+b)&n);d[P]+=Math.sign(T||1)*10*s*Math.exp(-_*_*.9)*(_<.2?_/.2:1)}}const w=new Float32Array(e*e).fill(1),y=new Float32Array(e*e);for(const A of v){const S=Math.ceil(A.r*1.2);for(let T=-S;T<=S;T++)for(let b=-S;b<=S;b++){const _=Math.sqrt(b/1.7*(b/1.7)+T*T)/A.r;if(_>=1.1)continue;const P=(Math.round(A.y+T)&n)*e+(Math.round(A.x+b)&n),D=.5+.5*Math.cos(_*16),R=1-ft(.6,1.1,_);w[P]*=1-R*(.5-.18*D),y[P]+=R*(.06+.04*D)-ft(.2,.5,_)*(1-ft(.5,1,_))*.03}}const k=Math.PI*2;for(let A=0;A<e;A++){const S=r[A],T=i[S],b=i[S+1]-T,_=A-T,P=Math.min(_,b-1-_)+.5,D=1-ft(.3*s,2.8*s,P);for(let R=0;R<e;R++){const E=A*e+R,I=(A+(d[E]|0)&n)*e+R,O=Math.abs(R-l[S]),L=Math.abs(R-c[S]),V=Math.min(O,e-O,L,e-L)+.5,G=1-ft(.3*s,2.2*s,V),X=(R-l[S]&n)<(c[S]-l[S]&n)?0:1,H=S*2+X,et=u[I],dt=g[I],pt=.5+.5*Math.sin(((_+d[E])/b*p[H]+dt*1.7+et*1.1)*k+m[H]),Q=ft(.56,.78,x[I]);let ot=h[H]*(.78+.3*et+.2*pt)*(.92+.16*M[E])*w[E];ot*=1-Q*.22;const lt=Math.max(D,G);ot*=1-lt*.55;const nt=f[H];o.R[E]=ot*(1+nt*.12),o.G[E]=ot*(1+nt*.03),o.B[E]=ot*(1-nt*.16),o.H[E]=(.72+pt*.05-Q*.05+(et-.5)*.04+y[E])*(1-lt*.85),o.F[E]=.7+(et-.5)*.16+Q*.16+lt*.2,o.A[E]=1-lt*.5-Q*.12}}}function Z0(o,t){const e=o.S,s=o.s,n=o.mask,a=6,i=5,r=tt(e,t,4,4,2),l=tt(e,t,10,10,3),c=tt(e,t,e/4,e/4,2),h=tt(e,t,4,4,4),f=new Float32Array(a*i),p=new Float32Array(a*i),m=new Float32Array(a*i),u=new Float32Array(a*i);for(let M=0;M<f.length;M++)f[M]=.8+t()*.36,p[M]=t()-.5,m[M]=(t()-.5)*.14,u[M]=t();const g=2.4*s*2.6,x=Math.PI;for(let M=0;M<e;M++)for(let d=0;d<e;d++){const v=M*e+d,w=d+(r[v]-.5)*g,k=(M+(r[(M+83&n)*e+(d+171&n)]-.5)*g)/e*i;let A=Math.floor(k);const S=k-A;A=(A%i+i)%i;const T=w/e*a+.5*(A&1),b=Math.floor(T),_=T-b,P=(b%a+a)%a,D=A*a+P,R=Math.sqrt(Math.sin(x*_)),E=.5+.5*S*(.4+.6*S),z=1-ft(.9,1,S)*.12,I=R*E*z*.9+m[D]*(S-.5)+(c[v]-.5)*.04+(l[v]-.5)*.05;o.H[v]=I;const O=ft(0,.22,S),L=1-ft(.02,.18,Math.min(_,1-_));let V=f[D]*(.88+.12*O)*(.92+.16*l[v])*(.94+.12*c[v])*(1-.18*ft(.55,.8,h[v]));V*=1+.12*ft(.93,1,S),V*=1-L*.22;const G=p[D];o.R[v]=V*(1+G*.1),o.G[v]=V*(1-G*.01),o.B[v]=V*(1-G*.14),o.F[v]=.62+u[D]*.16+(c[v]-.5)*.1+L*.2,o.A[v]=(.6+.4*O)*(1-L*.25)}}function q0(o,t){const e=o.S,s=o.s,n=o.mask,a=tt(e,t,2,e/8,3),i=tt(e,t,1,e/4,2),r=tt(e,t,3,3,3),l=tt(e,t,4,4,5),c=tt(e,t,24,24,3),h=tt(e,t,e/2,e/2,1),f=new Float32Array(e*e),p=new Float32Array(e*e),m=Math.round(70*s*Math.max(1,s));for(let u=0;u<m;u++){let g=t()*e,x=t()*e;const M=t()<.7?(t()-.5)*.5:t()*Math.PI*2,d=(14+t()*t()*130)*s,v=t()<.15,w=.3+t()*.5,y=Math.cos(M),k=Math.sin(M),A=v?p:f;for(let S=0;S<d;S+=.6){g+=y*.6,x+=k*.6;const T=(Math.round(x)&n)*e+(Math.round(g)&n),b=1-Math.abs(S/d-.5)*1.1;A[T]<w*b&&(A[T]=w*b)}}for(let u=0;u<e*e;u++){const g=(a[u]-.5)*1.4+(i[u]-.5)*.8,x=ft(.56,.8,l[u]+(c[u]-.5)*.28)*(.6+.4*c[u]),M=f[u],d=p[u];let v=(1+g*.2)*(.94+.12*r[u])*(1+(h[u]-.5)*.06);v*=1+M*.38-d*.3,v=$t(v,v*.8,x),o.R[u]=v*(1+x*.07),o.G[u]=v*(1-x*0),o.B[u]=v*(1-x*.14),o.H[u]=.6+g*.03+(r[u]-.5)*.12-M*.12-d*.18+x*.04,o.F[u]=.5+g*.14+M*.18+x*.42+(h[u]-.5)*.06,o.A[u]=1-x*.12-d*.1}}function Q0(o,t){const e=o.S,s=o.s,n=tt(e,t,3,3,4),a=tt(e,t,14,14,3),i=tt(e,t,e/2,e/2,1),r=tt(e,t,10,2,3),l=new Float32Array(e*e),c=new Float32Array(e*e),h=Math.round(260*s*s);for(let u=0;u<h;u++){const g=(.9+t()*t()*3.6)*s,x=.4+t()*.6;kn(e,t()*e,t()*e,Math.max(1.2,g),(M,d)=>{const v=x*Math.min(1,d*1.8);l[M]<v&&(l[M]=v),c[M]=Math.max(c[M],v)})}const f=e/2,p=new Float32Array(e*e);for(let u=0;u<2;u++)for(let g=0;g<2;g++)for(const[x,M]of[[.25,.25],[.75,.25],[.25,.75],[.75,.75]])kn(e,g*f+x*f,u*f+M*f,5*s,(d,v)=>{const w=Math.min(1,v*1.6);p[d]<w&&(p[d]=w)});const m=[1,.96,1.04,.98];for(let u=0;u<e;u++){const g=Math.min(u%f,f-u%f);for(let x=0;x<e;x++){const M=u*e+x,d=Math.min(x%f,f-x%f),v=1-ft(.2*s,2.4*s,Math.min(d,g)+.5),w=m[(x>=f?1:0)+(u>=f?2:0)],y=(i[M]-.5)*2,k=l[M],A=p[M],S=.68+(a[M]-.5)*.1+y*.035-k*.5-v*.45-A*.55;o.H[M]=S;let T=w*(.9+.2*n[M])*(.94+.12*a[M])*(.86+.28*r[M])*(1+y*.05);T*=1-k*.42-v*.2-A*.5,o.R[M]=T*1.01,o.G[M]=T,o.B[M]=T*.985,o.F[M]=.8+(a[M]-.5)*.18+k*.12,o.A[M]=1-k*.5-v*.25-A*.5}}}const J0={masonry:{normal:3.2,ao:2.4,aoRadius:9},brick:{normal:3,ao:2.2,aoRadius:6},plaster:{normal:2,ao:1.4,aoRadius:5},paving:{normal:3,ao:2.2,aoRadius:8},wood:{normal:2.2,ao:1.8,aoRadius:4},tiles:{normal:4.6,ao:2.4,aoRadius:9},metal:{normal:1.6,ao:1.2,aoRadius:3},concrete:{normal:2.2,ao:1.8,aoRadius:5}};function tr(o,t,e){const s=new Float32Array(t*t),n=new Float32Array(t*t),a=t-1,r=1/(2*e+1);for(let l=0;l<t;l++){const c=l*t;let h=0;for(let f=-e;f<=e;f++)h+=o[c+(f&a)];for(let f=0;f<t;f++)s[c+f]=h*r,h+=o[c+(f+e+1&a)]-o[c+(f-e&a)]}for(let l=0;l<t;l++){let c=0;for(let h=-e;h<=e;h++)c+=s[(h&a)*t+l];for(let h=0;h<t;h++)n[h*t+l]=c*r,c+=s[(h+e+1&a)*t+l]-s[(h-e&a)*t+l]}return n}function er(o,t){const e=o.S,s=e*e,n=J0[t],a=o.mask,i=w=>w<=0?0:w>=1?255:w*255+.5|0;let r=0;for(let w=0;w<s;w++)r+=o.R[w]*.3+o.G[w]*.59+o.B[w]*.11;const l=Fa/(r/s),c=tr(o.H,e,Math.max(2,Math.round(n.aoRadius*o.s))),h=new Float32Array(s);let f=0;for(let w=0;w<s;w++){const y=c[w]-o.H[w],k=V0(1-Math.max(0,y)*n.ao*3.2+Math.max(0,-y)*.25)*o.A[w];h[w]=k<.35?.35:k,f+=h[w]}const p=f/s,m=Math.log(Ia)/Math.log(Math.min(.99,Math.max(.3,p))),u=new Uint8Array(1025);for(let w=0;w<=1024;w++)u[w]=i(Math.pow(w/1024,m));const g=new Uint8Array(s*4),x=new Uint8Array(s*4),M=new Uint8Array(s),d=o.H,v=n.normal;for(let w=0;w<e;w++){const y=(w-1&a)*e,k=w*e,A=(w+1&a)*e;for(let S=0;S<e;S++){const T=S-1&a,b=S+1&a,_=d[y+b]+2*d[k+b]+d[A+b]-d[y+T]-2*d[k+T]-d[A+T],P=d[A+T]+2*d[A+S]+d[A+b]-d[y+T]-2*d[y+S]-d[y+b],D=-_*v/8,R=-P*v/8,E=1/Math.sqrt(D*D+R*R+1),z=k+S,I=z*4;g[I]=i(o.R[z]*l),g[I+1]=i(o.G[z]*l),g[I+2]=i(o.B[z]*l),g[I+3]=u[h[z]*1024+.5|0],x[I]=i(D*E*.5+.5),x[I+1]=i(R*E*.5+.5),x[I+2]=i(E*.5+.5),x[I+3]=i(o.F[z]),M[z]=i(d[z])}}return{size:e,albedo:g,normal:x,height:M}}const or={masonry:j0,brick:$0,plaster:Y0,paving:X0,wood:K0,tiles:Z0,metal:q0,concrete:Q0};function sr(o,t,e){if(t<64||(t&t-1)!==0)throw new Error("size must be a power of two >= 64");const s=W0(e*7919+Na(o)*104729+1),n=H0(t);return or[o](n,s),er(n,o)}const nr=20260616;let Xs="high",te;function Yc(o){te||(Xs=o)}function ar(){return te?te.quality:Xs}function Tn(o,t,e){const s=t*t*4,n=new Uint8Array(s*o.length);o.forEach((i,r)=>n.set(i,r*s));const a=new $i(n,t,t,o.length);return a.format=To,a.type=Ao,a.colorSpace=_o,a.wrapS=a.wrapT=me,a.magFilter=Ie,a.minFilter=es,a.generateMipmaps=!0,a.anisotropy=e,a.userData.shared=!0,a.needsUpdate=!0,a}function ir(o=Xs,t=4){if(te)return te;const e=o==="low"?256:512,s=typeof performance<"u"?performance.now():Date.now(),n=[],a=[];for(const c of js){const h=sr(c,e,nr);n.push(h.albedo),a.push(h.normal)}const i=Tn(n,e,t),r=Tn(a,e,t),l=(typeof performance<"u"?performance.now():Date.now())-s;return te={quality:o,size:e,albedo:i,normal:r,generationMs:l,dispose(){i.dispose(),r.dispose()}},te}function Kc(){te==null||te.dispose(),te=void 0}const qe="aKitBase";function $o(o){var n;if(o.getAttribute(qe))return;const t=o.getAttribute("position");if(!t)return;o.boundingBox||o.computeBoundingBox();const e=(n=o.boundingBox)==null?void 0:n.min.y;if(e===void 0||!Number.isFinite(e))return;const s=new Float32Array(t.count*2);for(let a=0;a<t.count;a++)s[a*2]=e,s[a*2+1]=1;o.setAttribute(qe,new ct(s,2))}function Ua(o){return o.userData.kitKind!==void 0}const rr={masonry:{grime:1,streak:.8,wear:.85,edgeRough:.08},brick:{grime:1,streak:.7,wear:.8,edgeRough:.06},plaster:{grime:1,streak:1,wear:.55,edgeRough:.1},paving:{grime:.5,streak:0,wear:.7,edgeRough:.06},wood:{grime:.7,streak:.4,wear:.9,edgeRough:.06},tiles:{grime:.35,streak:.2,wear:.6,edgeRough:.06},metal:{grime:.4,streak:.35,wear:1,edgeRough:-.28},concrete:{grime:1,streak:1,wear:.5,edgeRough:.06}},De=o=>o.toFixed(3),lr=`
attribute vec2 aKitBase;
varying vec3 vKitWorld;
varying float vKitH;
`,cr=`
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
`,hr=`
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
`;function ur(o,t){const e=Na(o).toFixed(1),n=`
  vec3 kN = inverseTransformDirection(normal, viewMatrix);
  vec3 kAbs = abs(kN);
  float kDist = length(vViewPosition);
  vec3 kP = vKitWorld * ${(1/B0[o]).toFixed(5)};
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
`;return n+a}function fr(o,t){const e=rr[o];return`
{
${ur(o,t)}
  // edge curvature (1/m) = normal change rate / world position change rate, distance independent; fades out far away
  float kCurv = length(fwidth(kN)) / max(length(fwidth(vKitWorld)), 1e-5);
  float kEdge = smoothstep(7.0, 22.0, kCurv) * (1.0 - smoothstep(18.0, 60.0, kDist)) * uKitWear * ${De(e.wear)};

  // color: modulation around the material color; AO is applied after aomap_fragment
  diffuseColor.rgb *= kA.rgb * ${De(1/Fa)};
  kAo = kA.a;
  roughnessFactor = clamp(roughnessFactor * kRg * ${De(1/La)}, 0.04, 1.0);

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
`}const dr=`
{
  // normalized by the texture's mean AO so flat areas keep their brightness and only cavities darken
  float kAoN = min(kAo * ${De(1/Ia)}, 1.06);
  reflectedLight.indirectDiffuse *= kAoN;
  reflectedLight.indirectSpecular *= mix(1.0, kAoN, 0.6);
  reflectedLight.directDiffuse *= mix(1.0, kAoN, 0.35);
}
`;function zt(o,t,e={}){const s=o.userData.kitUniforms;if(s){e.grime!==void 0&&(s.grime.value=e.grime),e.wear!==void 0&&(s.wear.value=e.wear);return}const n={grime:{value:e.grime??1},wear:{value:e.wear??1}};o.userData.kitUniforms=n,o.userData.kitKind=t;const a=o.onBeforeCompile,i=o.onBeforeRender,r=o.customProgramCacheKey();o.onBeforeCompile=(l,c)=>{a.call(o,l,c);const h=ir(),f=h.quality==="low";l.uniforms.uKitAlb={value:h.albedo},l.uniforms.uKitNrm={value:h.normal},l.uniforms.uKitGrime=n.grime,l.uniforms.uKitWear=n.wear,l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
${lr}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${cr}`),l.fragmentShader=l.fragmentShader.replace("#include <common>",`#include <common>
${hr}`).replace("#include <color_fragment>",`#include <color_fragment>
float kAo = 1.0;`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${fr(t,f)}`).replace("#include <aomap_fragment>",`#include <aomap_fragment>
${dr}`)},o.onBeforeRender=(l,c,h,f,p,m)=>{i.call(o,l,c,h,f,p,m),f.getAttribute(qe)||$o(f)},o.customProgramCacheKey=()=>`kit-v2-${t}-${ar()}+${r}`,o.needsUpdate=!0}const An={h:0,s:0,l:0};function mr(o,t){if(o.type!=="MeshStandardMaterial"||o.userData.shared||o.map||o.normalMap||o.bumpMap||o.roughnessMap||o.metalnessMap||o.aoMap||o.alphaMap||o.emissiveMap||o.displacementMap||o.lightMap||o.vertexColors||o.transparent||o.opacity<1||o.alphaTest>0||o.wireframe)return null;const e=o.emissive;if(o.emissiveIntensity*Math.max(e.r,e.g,e.b)>.04)return null;const s=t??o.userData.surfaceKind;if(s&&js.includes(s))return s;if(o.metalness>.5)return"metal";o.color.getHSL(An,os);const{h:n,s:a,l:i}=An;if(i>.86||i<.1||a>.62)return null;if(a<.08)return i>=.62?"concrete":i>=.18?"masonry":null;if(!(n<.17||n>=.95))return n>=.17&&n<.46&&a>.1||n>=.46&&a>.15?null:i>=.62?"concrete":i>=.18?"masonry":null;if(o.roughness>=.95&&a>=.2||o.roughness>=.99&&a>=.08)return null;if(i>=.6)return"plaster";if(a>.5&&n>=.065&&n<.17)return null;if(a>=.28&&(n<.065||n>=.95)){if(i>=.42)return"tiles";if(n<.04||n>=.95)return"brick"}return a>=.1?i>=.14?"wood":null:i>=.18?"masonry":null}function pr(o,t=5.5){o.userData.isRoadSurface=!0,o.onBeforeCompile=e=>{e.uniforms.uRoadWet=P0.wet,e.vertexShader=`varying vec3 vCobWorld;
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
         }`)},o.customProgramCacheKey=()=>`cobble-weather-${t}`,o.needsUpdate=!0}const _n=new WeakSet,gr=`
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
`;function vr(o,t){for(let e=o;e;e=e.parent){if(e.name==="scene-person"||e.userData.noSurface)return!0;if(e===t)break}return!1}function Zc(o,t=1){o.traverse(e=>{const s=e;if(!s.isMesh)return;const n=vr(s,o),a=Array.isArray(s.material)?s.material:[s.material];for(const i of a){if(i.type!=="MeshStandardMaterial")continue;const r=i;if(Ua(r)){$o(s.geometry);continue}if(_n.has(i)||r.map||r.normalMap||r.bumpMap||r.vertexColors||r.transparent||r.emissiveIntensity>.25&&r.emissive.getHex()!==0)continue;const l=n?null:mr(r,s.userData.surfaceKind??void 0);if(l){zt(r,l,{grime:t,wear:t}),$o(s.geometry);continue}_n.add(i);const c=r.onBeforeCompile;r.onBeforeCompile=(f,p)=>{c==null||c.call(r,f,p),f.vertexShader=`varying vec3 vGrainWorld;
`+f.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
           vec4 gLocal = vec4(transformed, 1.0);
           #ifdef USE_INSTANCING
             gLocal = instanceMatrix * gLocal;
           #endif
           vGrainWorld = (modelMatrix * gLocal).xyz;`),f.fragmentShader=gr+f.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
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
             }`)};const h=r.customProgramCacheKey();r.customProgramCacheKey=()=>`grain+${h}`,r.needsUpdate=!0}})}function xr(o,t){return new Le({color:o,emissive:o,emissiveIntensity:t,metalness:.15,roughness:.08,clearcoat:1,clearcoatRoughness:.05,reflectivity:1,transparent:!0,opacity:.92,side:mt})}function qc(o,t=.82){return new at({color:o,roughness:t,metalness:.06,envMapIntensity:.4})}function Qc(o){const e=document.createElement("canvas");e.width=64,e.height=64;const s=e.getContext("2d"),n=s.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return n.addColorStop(0,o),n.addColorStop(.4,"rgba(255,220,140,0.35)"),n.addColorStop(1,"rgba(0,0,0,0)"),s.fillStyle=n,s.fillRect(0,0,64,64),new Ma(e)}function Jc(){return new at({color:4871528,roughness:.45,metalness:.85})}function t1(o){return new Le({color:o,emissive:o,emissiveIntensity:1.4,roughness:.04,metalness:0,transparent:!0,opacity:.82,clearcoat:1})}const ne={broadleaf:0,broadleafDark:1,conifer:2,shrub:3};function wr(o){const t=o%2,e=Math.floor(o/2);return[t*.5,e*.5,t*.5+.5,e*.5+.5]}function Oa(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function be(o,t,e){let s=Math.imul(o,374761393)+Math.imul(t,668265263)+Math.imul(e,1442695041)|0;return s=Math.imul(s^s>>>13,1274126177),s^=s>>>16,(s>>>0)/4294967296}function Xo(o){return o*o*(3-2*o)}function jt(o,t,e){const s=Math.min(1,Math.max(0,(e-o)/(t-o)));return s*s*(3-2*s)}function Pn(o,t,e){const s=Math.floor(o),n=Math.floor(t),a=Xo(o-s),i=Xo(t-n),r=be(s,n,e),l=be(s+1,n,e),c=be(s,n+1,e),h=be(s+1,n+1,e);return r+(l-r)*a+(c-r)*i+(r-l-c+h)*a*i}function So(o,t){return(o%t+t)%t}const Dn=new Map;function Et(o,t,e,s,n){const a=(e*1024+s)*8192+(n&8191);let i=Dn.get(a);if(!i){i=new Float32Array(e*s);for(let v=0;v<s;v++)for(let w=0;w<e;w++)i[v*e+w]=be(w,v,n);Dn.set(a,i)}const r=Math.floor(o),l=Math.floor(t),c=Xo(o-r),h=Xo(t-l),f=So(r,e),p=f+1===e?0:f+1,m=So(l,s)*e,u=(m+e)%(e*s),g=i[m+f],x=i[m+p],M=i[u+f],d=i[u+p];return g+(x-g)*c+(M-g)*h+(g-x-M+d)*c*h}let we=0,Me=0,ye=0;function Ga(o,t,e){o=o-Math.floor(o);const s=Math.floor(o*6),n=o*6-s,a=e*(1-t),i=e*(1-n*t),r=e*(1-(1-n)*t);switch(s%6){case 0:we=e,Me=r,ye=a;break;case 1:we=i,Me=e,ye=a;break;case 2:we=a,Me=e,ye=r;break;case 3:we=a,Me=i,ye=e;break;case 4:we=r,Me=a,ye=e;break;default:we=e,Me=a,ye=i;break}}function Mr(o){const t=o*o;return{size:o,r:new Float32Array(t),g:new Float32Array(t),b:new Float32Array(t),a:new Float32Array(t),h:new Float32Array(t).fill(.5)}}function Ba(o,t,e,s,n,a,i){const r=o.a[t];if(r<=0){o.r[t]=e,o.g[t]=s,o.b[t]=n,o.a[t]=a,o.h[t]=i;return}const l=a+r*(1-a),c=a/l,h=1-c;o.r[t]=o.r[t]*h+e*c,o.g[t]=o.g[t]*h+s*c,o.b[t]=o.b[t]*h+n*c,o.a[t]=l,o.h[t]=o.h[t]*h+i*c}function Yo(o,t,e,s,n,a,i,r,l,c,h,f,p,m){const{B:u,ox:g,oy:x,S:M,m:d}=o,v=Math.max(a,i)+1,w=Math.max(d,Math.floor(Math.min(t,s)-v)),y=Math.min(M-d-1,Math.ceil(Math.max(t,s)+v)),k=Math.max(d,Math.floor(Math.min(e,n)-v)),A=Math.min(M-d-1,Math.ceil(Math.max(e,n)+v)),S=s-t,T=n-e,b=S*S+T*T||1e-6;for(let _=k;_<=A;_++){const P=(x+_)*u.size+g;for(let D=w;D<=y;D++){const R=D+.5-t,E=_+.5-e;let z=(R*S+E*T)/b;z=z<0?0:z>1?1:z;const I=R-S*z,O=E-T*z,L=a+(i-a)*z,V=I*I+O*O,G=L+1;if(V>G*G)continue;const X=Math.sqrt(V)-L,H=X<=-.5?1:X>=.5?0:.5-X;if(H<=.003)continue;const et=1-Math.min(1,Math.abs(X+L*.5)/(L+.5))*.35;Ga(r+(h-r)*z,l+(f-l)*z,(c+(p-c)*z)*et*(.92+.16*m)),Ba(u,P+D,we,Me,ye,H,.62-Math.min(1,Math.abs(X)/(L+.5))*.2)}}}function yr(o,t){const{B:e,ox:s,oy:n,S:a,m:i}=o,r=Math.cos(t.ang),l=Math.sin(t.ang),c=t.x,h=t.y,f=c+r*t.len,p=h+l*t.len,m=t.wid+2,u=Math.max(i,Math.floor(Math.min(c,f)-m)),g=Math.min(a-i-1,Math.ceil(Math.max(c,f)+m)),x=Math.max(i,Math.floor(Math.min(h,p)-m)),M=Math.min(a-i-1,Math.ceil(Math.max(h,p)+m)),d=Math.max(5,Math.round(t.len/11)),v=1/t.len,w=.5+t.len*.0035;for(let y=x;y<=M;y++){const k=(n+y)*e.size+s;for(let A=u;A<=g;A++){const S=A+.5-c,T=y+.5-h,b=S*r+T*l;if(b<0||b>t.len)continue;const _=b*v,P=-S*l+T*r,D=P<0?-P:P;let R=t.wid*Math.pow(Math.max(0,Math.sin(Math.PI*Math.pow(_,t.shapeExp))),.78);if(R*=1+t.serr*(Math.abs(Math.sin(_*d*Math.PI))-.5),R<.4)continue;const E=R-D+.5;if(E<=.003)continue;const z=E>=1?1:E,I=D/R,O=Pn(A*.045,y*.045,t.seed),L=Pn(A*.19,y*.19,t.seed+5);let V=t.val*(.8+.3*_)*(.86+.26*O)*(.94+.1*L);V*=1-.24*jt(.76,1,I),V*=1+.12*t.fold*(P/R);let G=t.sat*(1-.18*_);const X=t.hue-.028*_+.03*(O-.5),H=jt(w+.9,w*.4,D)*(1-.5*_),et=(b-D*.82)/t.veinGap,dt=et-Math.floor(et),pt=(dt<.5?dt:1-dt)*t.veinGap*.8,Q=jt(1.3,.25,pt)*Math.pow(Math.max(0,1-I),.7)*jt(.06,.2,_)*jt(1,.8,_);let ot=Math.max(H,Q*.85);t.back&&(V*=1.16,G*=.62,ot*=1.35),V*=1+.3*ot,G*=1-.38*ot,Ga(X,G,Math.min(1,V));const lt=.55+.2*(1-I*I)*(t.back?.6:1)-ot*(t.back?-.1:.16);Ba(e,k+A,we,Me,ye,z,lt)}}}function Wa(o,t,e,s,n,a,i){const r=t+Math.max(2,o*.012),l=o-2*r,c=Math.max(1e-6,n-e),h=Math.max(1e-6,a-s),f=Math.min(l/c,l/h,i);return{scale:f,ox:o/2-(e+n)/2*f,oy:o/2-(s+a)/2*f}}function ks(o,t){const e=Oa(o.seed),s=o.S,n=[],a=[],i=t.dark?.285+e()*.03:.235+e()*.04,r=(x,M,d,v,w)=>{const y=i+(e()-.5)*(t.dark?.04:.09)+(e()>.88&&!t.dark?-.04:0),k=(t.dark?.5:.42)+e()*.12,A=(t.dark?.27:t.round?.5:.46)+e()*.14;n.push({leaf:{x:x.x,y:x.y,ang:M,len:d,wid:d*v,hue:y,sat:k,val:A,serr:t.round?.04:.08,shapeExp:t.round?.8+e()*.2:.62+e()*.25,back:e()>.74,fold:e()*2-1,veinGap:Math.max(6,d*(t.round?.2:.16)),seed:Math.floor(e()*99999),petiole:w}})};if(t.round){const x=5+Math.floor(e()*2);for(let M=0;M<x;M++){const d=Math.PI/2+(M-(x-1)/2)*.5+(e()-.5)*.15,v=.55+e()*.25,w=(e()-.5)*.5,y=[],k=_=>d+w*_;let A=0,S=0;for(let _=0;_<=8;_++){y.push({x:A,y:S});const P=k(_/8);A+=Math.cos(P)*(v/8),S+=Math.sin(P)*(v/8)}a.push({pts:y,r0:.01});const T=3+Math.floor(e()*3);for(let _=0;_<T;_++){const P=.3+.7*(_/T)+e()*.05,D=Math.min(8,Math.floor(P*8)),R=y[D],E=_%2===0?1:-1;r(R,k(P)+E*(.7+e()*.5),(.2+e()*.12)*(1.1-.3*P),.55+e()*.12,.012)}const b=y[8];r(b,k(1)+(e()-.5)*.4,.26+e()*.08,.6,0)}}else{const x=8+Math.floor(e()*7),M=(e()-.5)*.35,d=[];for(let y=0;y<=12;y++){const k=y/12;d.push({x:M*k*k,y:k})}a.push({pts:d,r0:.014});const v=y=>({p:{x:M*y*y,y},dir:Math.atan2(1,2*M*y)});for(let y=0;y<x;y++){const k=.2+.72*(y/Math.max(1,x-1))+(e()-.5)*.03,{p:A,dir:S}=v(k),T=y%2===0?1:-1,b=.75+e()*.5+(1-k)*.25,_=(.4-.1*k)*(.8+e()*.34);r(A,S+T*b,_,.3+e()*.12,.03)}const w=v(1);r(w.p,w.dir+(e()-.5)*.2,.42*(.9+e()*.2),.34,0)}let l=1/0,c=1/0,h=-1/0,f=-1/0;const p=(x,M)=>{x<l&&(l=x),x>h&&(h=x),M<c&&(c=M),M>f&&(f=M)};for(const{leaf:x}of n){const M=Math.cos(x.ang),d=Math.sin(x.ang);p(x.x,x.y),p(x.x+M*x.len,x.y+d*x.len);for(const v of[.3,.45])for(const w of[-1,1])p(x.x+M*x.len*v-d*x.wid*w,x.y+d*x.len*v+M*x.wid*w)}for(const x of a)for(const M of x.pts)p(M.x,M.y);p(0,-.04);const m=Wa(s,o.m,l,c,h,f,s*.97),u=x=>({x:x.x*m.scale+m.ox,y:x.y*m.scale+m.oy});for(const x of a)for(let M=0;M<x.pts.length-1;M++){const d=u(x.pts[M]),v=u(x.pts[M+1]),w=M/(x.pts.length-1),y=Math.max(1.1,x.r0*m.scale*(1-w*.55)),k=Math.max(.8,x.r0*m.scale*(1-(w+1/(x.pts.length-1))*.55));Yo(o,d.x,d.y,v.x,v.y,y,k,.085,.45,.28,.1,.4,.36,e())}const g=n.map((x,M)=>M).sort(()=>e()-.5);for(const x of g){const M=n[x].leaf,d=u({x:M.x,y:M.y}),v=M.len*m.scale,w={...M,x:d.x,y:d.y,len:v,wid:M.wid*m.scale};if(M.petiole>0){const y=M.petiole*m.scale;Yo(o,d.x,d.y,d.x+Math.cos(M.ang)*y,d.y+Math.sin(M.ang)*y,1.1,.8,.11,.42,.3,.14,.4,.4,e()),w.x+=Math.cos(M.ang)*y*.9,w.y+=Math.sin(M.ang)*y*.9}yr(o,w)}}function br(o,t,e,s,n,a,i,r,l,c){const h=t+Math.cos(s)*n,f=e+Math.sin(s)*n;Yo(o,t,e,h,f,a,a*.45,i,r,l*.72,i-.02,r*.9,l*1.12,c)}function Sr(o,t){const e=Oa(t),s=o.S,n=(e()-.5)*.08,a=d=>({x:n*d*d,y:d}),i=[],r=[];r.push({a:a(0),b:a(1),r0:.0105,r1:.003});const l=15,c=(d,v,w)=>{const y=d.length-1;for(let k=0;k<y;k++)for(const A of[0,.34,.67]){const S=d[k],T=d[k+1],b=(k+A)/y,_=S.x+(T.x-S.x)*A,P=S.y+(T.y-S.y)*A,D=v[k];for(const R of[-1,1]){const E=b>w,z=D+R*(.62+e()*.3),I=.1*(1-.4*b)*(.82+e()*.36)*(E?.8:1);i.push({x:_,y:P,ang:z,len:I,hue:E?.22+e()*.04:.37+e()*.04,sat:E?.5:.46+e()*.12,val:E?.58+e()*.08:.36+e()*.12,r:e()})}}};for(let d=0;d<l;d++){const v=.08+.84*(d/(l-1)),w=a(v);for(const y of[-1,1]){const k=.5*Math.pow(1-v*.8,.85)*(.88+e()*.24),A=Math.PI/2-y*(1.08-v*.2+(e()-.5)*.12),S=[w],T=[];let b=w.x,_=w.y;const P=6;for(let D=0;D<P;D++){const R=A+y*(D/P)*.55;T.push(R),b+=Math.cos(R)*(k/P),_+=Math.sin(R)*(k/P),S.push({x:b,y:_})}for(let D=0;D<P;D++)r.push({a:S[D],b:S[D+1],r0:.0055*(1-D/P*.5),r1:.0055*(1-(D+1)/P*.5)});c(S,T,.78);for(let D=0;D<4;D++)i.push({x:b,y:_,ang:T[P-1]+(D-1.5)*.28,len:.06*(.85+e()*.3),hue:.23+e()*.04,sat:.5,val:.58,r:e()})}}{const d=[],v=[];for(let y=0;y<=14;y++)d.push(a(.15+y/14*.85));for(let y=0;y<14;y++)v.push(Math.atan2(d[y+1].y-d[y].y,d[y+1].x-d[y].x));c(d,v,.7);const w=a(1);for(let y=0;y<6;y++)i.push({x:w.x,y:w.y,ang:Math.PI/2+(y-2.5)*.34,len:.07,hue:.23,sat:.5,val:.6,r:e()})}let h=1/0,f=1/0,p=-1/0,m=-1/0;const u=(d,v)=>{d<h&&(h=d),d>p&&(p=d),v<f&&(f=v),v>m&&(m=v)};for(const d of i)u(d.x,d.y),u(d.x+Math.cos(d.ang)*d.len,d.y+Math.sin(d.ang)*d.len);for(const d of r)u(d.a.x,d.a.y),u(d.b.x,d.b.y);u(0,-.03);const g=Wa(s,o.m,h,f,p,m,s*.97),x=d=>({x:d.x*g.scale+g.ox,y:d.y*g.scale+g.oy}),M=Math.max(.9,s*.0034);for(const d of r){const v=x(d.a),w=x(d.b);Yo(o,v.x,v.y,w.x,w.y,Math.max(.9,d.r0*g.scale),Math.max(.8,d.r1*g.scale),.07,.5,.27,.075,.45,.32,e())}i.sort(()=>e()-.5);for(const d of i){const v=x(d);br(o,v.x,v.y,d.ang,d.len*g.scale,M,d.hue,d.sat,d.val,d.r)}}function Va(o,t,e,s,n){const a=new Uint8Array(e*e*4),i=new Int32Array(e),r=new Int32Array(e);for(let l=0;l<e;l++)i[l]=n?(l+e-1)%e:Math.max(0,l-1),r[l]=n?(l+1)%e:Math.min(e-1,l+1);for(let l=0;l<e;l++){const c=(n?(l+e-1)%e:Math.max(0,l-1))*e,h=l*e,f=(n?(l+1)%e:Math.min(e-1,l+1))*e;for(let p=0;p<e;p++){const m=h+p,u=m*4;if(t&&t[m]<.02){a[u]=128,a[u+1]=128,a[u+2]=255,a[u+3]=255;continue}const g=i[p],x=r[p],M=(o[c+x]+2*o[h+x]+o[f+x]-o[c+g]-2*o[h+g]-o[f+g])/8,d=(o[f+g]+2*o[f+p]+o[f+x]-o[c+g]-2*o[c+p]-o[c+x])/8,v=-M*s,w=-d*s,y=1/Math.sqrt(v*v+w*w+1);a[u]=(v*y*.5+.5)*255+.5|0,a[u+1]=(w*y*.5+.5)*255+.5|0,a[u+2]=(y*.5+.5)*255+.5|0,a[u+3]=255}}return a}function se(o){const t=Math.round(o*255);return t<0?0:t>255?255:t}function kr(o,t){const e=Mr(o),s=Math.floor(o/2),n=Math.max(3,Math.round(s*.03)),a=[{id:ne.broadleaf,paint:c=>ks(c,{dark:!1,round:!1})},{id:ne.broadleafDark,paint:c=>ks(c,{dark:!0,round:!1})},{id:ne.conifer,paint:c=>Sr(c,t*31+3)},{id:ne.shrub,paint:c=>ks(c,{dark:!1,round:!0})}],i=new Float32Array(a.length*3);for(const{id:c,paint:h}of a){const f=c%2*s,p=Math.floor(c/2)*s;h({B:e,ox:f,oy:p,S:s,m:n,seed:t});let m=0,u=0,g=0,x=0;for(let M=0;M<s;M++){const d=M>=n&&M<s-n;for(let v=0;v<s;v++){const w=(p+M)*o+f+v;!d||v<n||v>=s-n?(e.a[w]=0,e.h[w]=.5):e.a[w]>.5&&(m+=e.r[w],u+=e.g[w],g+=e.b[w],x++)}}x>0&&(i[c*3]=m/x,i[c*3+1]=u/x,i[c*3+2]=g/x)}const r=new Uint8Array(o*o*4);for(let c=0;c<o;c++)for(let h=0;h<o;h++){const f=c*o+h,p=f*4,m=Math.min(1,Math.floor(h/s))+Math.min(1,Math.floor(c/s))*2,u=e.a[f];u<.004?(r[p]=se(i[m*3]),r[p+1]=se(i[m*3+1]),r[p+2]=se(i[m*3+2]),r[p+3]=0):(r[p]=se(e.r[f]),r[p+1]=se(e.g[f]),r[p+2]=se(e.b[f]),r[p+3]=se(u))}const l=Va(e.h,e.a,o,7*(o/1024),!1);return{albedo:{size:o,data:r},normal:{size:o,data:l}}}function Ts(o,t,e){const s=new Float32Array(o*t),n=new Float32Array(o*t),a=new Float32Array(o*t);for(let i=0;i<t;i++)for(let r=0;r<o;r++){const l=i*o+r;s[l]=.15+be(r,i,e)*.7,n[l]=.15+be(r,i,e+17)*.7,a[l]=be(r,i,e+31)}return{gx:o,gy:t,fx:s,fy:n,id:a}}function Rn(o,t,e,s){const{gx:n,gy:a}=e,i=o*n,r=t*a,l=Math.floor(i),c=Math.floor(r);let h=9,f=9,p=0;for(let m=-1;m<=1;m++){const u=c+m,g=So(u,a);for(let x=-1;x<=1;x++){const M=l+x,d=g*n+So(M,n),v=i-(M+e.fx[d]),w=r-(u+e.fy[d]),y=v*v+w*w;y<h?(f=h,h=y,p=e.id[d]):y<f&&(f=y)}}s[0]=Math.sqrt(h),s[1]=Math.sqrt(f),s[2]=p}function Tr(o,t,e){const{gx:s}=t,n=o*s,a=Math.floor(n);let i=9,r=9,l=0;for(let c=-1;c<=1;c++){const h=a+c,f=So(h,s),p=Math.abs(n-(h+t.fx[f]));p<i?(r=i,i=p,l=t.id[f]):p<r&&(r=p)}e[0]=i,e[1]=r,e[2]=l}function Ar(o,t,e){const s=o,n=new Uint8Array(s*s*4),a=new Float32Array(s*s),i=[0,0,0],r=t*7+(e==="conifer"?101:3),l=e==="broadleaf"?Ts(10,1,r+9):Ts(11,3,r+9),c=Ts(22,8,r+12);for(let f=0;f<s;f++){const p=(f+.5)/s;for(let m=0;m<s;m++){const u=(m+.5)/s,g=f*s+m;let x,M,d,v;const w=Et(u*4,p*4,4,4,r+1);if(e==="broadleaf"){const k=Et(u*2,p*5,2,5,r+3)-.5,A=Et(u*5,p*11,5,11,r+4)-.5,S=u+.028*k+.01*A;Tr(S,l,i);const T=i[1]-i[0],b=jt(.3,.6,Et(u*10,p*4,10,4,r+5)),_=1-jt(0,.13,T);Rn(S+.31,p+.07*k,c,i);const P=i[1]-i[0],D=(1-jt(0,.09,P))*.5*jt(.3,.7,Et(u*6,p*9,6,9,r+6)),R=Math.min(1,Math.max(_*(.4+.6*b),D)),E=Et(u*120,p*8,120,8,r+7),z=Et(u*70,p*40,70,40,r+11),I=.9+.2*Et(u*10,p*3,10,3,r+8);v=(1-R*.9)*(.85+.15*E)+.05*z;const O=I*(.82+.4*w)*(.86+.28*E)*(.94+.1*z)*(1-.82*R);x=.4*O,M=.35*O,d=.3*O;const L=jt(.64,.78,Et(u*7,p*7,7,7,r+12))*(1-R)*.2;x+=(.5*O-x)*L,M+=(.54*O-M)*L,d+=(.4*O-d)*L}else{const k=.03*(Et(u*5,p*3,5,3,r+3)-.5)+.012*(Et(u*14,p*8,14,8,r+4)-.5),A=.06*(Et(u*4,p*5,4,5,r+5)-.5);Rn(u+k,p+A,l,i);const S=i[1]-i[0],T=.6+.8*Et(u*7,p*6,7,6,r+6),b=jt(0,.16*T,S),_=1-Math.min(1,i[0]*1.1),P=Et(u*60,p*5,60,5,r+10),D=Et(u*90,p*30,90,30,r+11);v=b*(.5+.35*_)*(.88+.16*P)+.05*D;const E=(.75+.5*i[2])*(.85+.3*w)*(.8+.4*P)*(.9+.2*D)*(.3+.7*b)*(.88+.2*_);x=.37*E,M=.28*E,d=.22*E;const z=jt(.5,.85,i[2])*.4;x+=(.4*E-x)*z,M+=(.34*E-M)*z,d+=(.3*E-d)*z}const y=g*4;n[y]=se(x),n[y+1]=se(M),n[y+2]=se(d),n[y+3]=255,a[g]=v}}const h=Va(a,null,s,(e==="broadleaf"?5:6)*(s/512),!0);return{albedo:{size:s,data:n},normal:{size:s,data:h}}}const e1=5,it={rockA:.16,rockB:.42,hiA:14,hiB:38,dryA:.58,dryB:.78,dryGain:.5,hiGain:.22,dirtA:.54,dirtB:.74,dirtGain:.9,gravelA:.62,gravelB:.76,hBias:.2};function po(o,t,e){const s=Math.min(1,Math.max(0,(e-o)/(t-o)));return s*s*(3-2*s)}function o1(o){const t=po(it.rockA,it.rockB,1-o.normalY),e=po(it.hiA,it.hiB,o.height),s=Math.min(1,po(it.dryA,it.dryB,o.nDry)*it.dryGain+e*it.hiGain),n=po(it.dirtA,it.dirtB,o.nDirt)*it.dirtGain,a=po(it.gravelA,it.gravelB,o.nGravel),i=1-t,r=i*n,l=i*(1-n),c=l*a,h=l*(1-a),f=h*s,p=h*(1-s),m=o.layerHeights??[.5,.5,.5,.5,.5],u=[p,f,r,c,t];let g=0;const x=u.map((d,v)=>{const w=d*(m[v]+it.hBias),y=w*w;return g+=y,y}),M=1/Math.max(g,1e-6);return[x[0]*M,x[1]*M,x[2]*M,x[3]*M,x[4]*M]}function Lt(o){const t=String(o);return/[.e]/.test(t)?t:`${t}.0`}function s1(){return`
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
`}function Go(o,t){const e=Math.sin(o*127.1+t*311.7)*43758.5453123;return e-Math.floor(e)}function _r(o,t){const e=Math.floor(o),s=Math.floor(t),n=o-e,a=t-s,i=n*n*(3-2*n),r=a*a*(3-2*a);return Go(e,s)*(1-i)*(1-r)+Go(e+1,s)*i*(1-r)+Go(e,s+1)*(1-i)*r+Go(e+1,s+1)*i*r}function Bo(o,t,e){let s=.5,n=1,a=0,i=0;for(let r=0;r<e;r++)a+=s*_r(o*n,t*n),i+=s,s*=.5,n*=2;return a/i}function n1(o,t){return{nDry:Bo(o*.012+13,t*.012+71,3),nDirt:Bo(o*.009+31,t*.009+17,4)*.68+Bo(o*.045,t*.045,3)*.32,nGravel:Bo(o*.028+150,t*.028+20,4)}}function a1(){return`
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
`}const Wt=o=>[(o>>16&255)/255,(o>>8&255)/255,(o&255)/255],go=o=>{const t=e=>Math.round(Math.min(1,Math.max(0,e))*255);return t(o[0])<<16|t(o[1])<<8|t(o[2])},He=(o,t,e)=>[o[0]+(t[0]-o[0])*e,o[1]+(t[1]-o[1])*e,o[2]+(t[2]-o[2])*e],We=o=>o[0]*.299+o[1]*.587+o[2]*.114;function i1(o){const t=Wt(o.grass),e=Wt(o.dirt),s=Wt(o.rock),n=He(t,[We(t),We(t),We(t)],.1),i=He(n,[.66,.6,.33],.62),r=He(e,[We(e),We(e),We(e)],.08),l=He(He(s,e,.38),[1,1,1],.1),c=s;return{grass:go(n),dryGrass:go(i),dirt:go(r),gravel:go(l),rock:go(c)}}function Pr(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Dr(o){const t=o*o;return{S:o,mask:o-1,R:new Float32Array(t),G:new Float32Array(t),B:new Float32Array(t),H:new Float32Array(t)}}function de(o,t,e,s,n,a=.5){const i=new Float32Array(o*o);let r=1,l=0;const c=new Int32Array(o),h=new Int32Array(o),f=new Float32Array(o);for(let m=0;m<n;m++){const u=e<<m,g=s<<m;if(u>o/2||g>o/2)break;const x=new Float32Array(u*g);for(let M=0;M<x.length;M++)x[M]=t();for(let M=0;M<o;M++){const d=M*u/o,v=Math.floor(d),w=d-v;c[M]=v%u,h[M]=(v+1)%u,f[M]=w*w*(3-2*w)}for(let M=0;M<o;M++){const d=M*g/o,v=Math.floor(d),w=d-v,y=w*w*(3-2*w),k=v%g*u,A=(v+1)%g*u,S=M*o;for(let T=0;T<o;T++){const b=x[k+c[T]],_=x[k+h[T]],P=x[A+c[T]],D=x[A+h[T]],R=f[T],E=b+(_-b)*R;i[S+T]=i[S+T]+r*(E+(P+(D-P)*R-E)*y)}}l+=r,r*=a}const p=1/l;for(let m=0;m<i.length;m++)i[m]*=p;return i}function Ko(o,t){for(let e=0;e<o.length;e++){const s=(o[e]-.5)*t+.5;o[e]=s<0?0:s>1?1:s}}function Cn(o,t,e,s,n,a,i,r){const l=(e&o.mask)*o.S+(t&o.mask);o.R[l]+=(s-o.R[l])*i,o.G[l]+=(n-o.G[l])*i,o.B[l]+=(a-o.B[l])*i,r>o.H[l]&&(o.H[l]=r)}function As(o,t,e){const s=o.S;for(let n=0;n<e.count;n++){let a=t()*s,i=t()*s,r=t()*Math.PI*2;const l=e.lenMin+t()*(e.lenMax-e.lenMin),c=e.wMin+t()*(e.wMax-e.wMin),h=(t()-.5)*e.curve,f=e.bright[0]+t()*(e.bright[1]-e.bright[0]),p=e.alt&&t()<e.alt.p?e.alt.color:e.base,m=(t()-.5)*e.hueJitter,u=Math.max(3,Math.round(l/.8)),g=.8+t()*.2;for(let x=0;x<u;x++){const M=x/(u-1),d=Math.cos(r),v=Math.sin(r),w=Math.max(.9,c*(1-M*.8)),y=e.baseDark+(e.tipLight-e.baseDark)*M,k=p[0]*f*y*(1+m+e.tipYellow*M),A=p[1]*f*y*(1+e.tipYellow*M*.3),S=p[2]*f*y*(1-m-e.tipYellow*M*1.2),T=(.38+.62*Math.pow(M,.55))*g,b=w*.5,_=Math.round(a),P=Math.round(i);if(w<1.5)Cn(o,_,P,k,A,S,.9,T);else for(let D=-b;D<=b+.01;D+=1){const R=Math.abs(D)>b-.5?.65:.95;Cn(o,Math.round(a-v*D),Math.round(i+d*D),k,A,S,R,T)}a+=d*.8,i+=v*.8,r+=h*.05}}}function Zo(o,t){const e=Math.cos(t.ang),s=Math.sin(t.ang),n=Math.ceil(Math.max(t.rx,t.ry)*1.7)+1,a=Math.round(t.cx),i=Math.round(t.cy),r=-.6,l=-.8;for(let c=-n;c<=n;c++)for(let h=-n;h<=n;h++){const f=h+(a-t.cx),p=c+(i-t.cy),m=(f*e+p*s)/t.rx,u=(-f*s+p*e)/t.ry,g=m*m+u*u;if(g>2.9)continue;const x=(i+c&o.mask)*o.S+(a+h&o.mask);if(g<1){const M=Math.sqrt(1-g),d=(f*r+p*l)/(Math.max(t.rx,t.ry)*1),v=.74+.3*M-.28*d*(1-M*.6),w=g>.8?.8:1;o.R[x]+=(t.color[0]*v-o.R[x])*w,o.G[x]+=(t.color[1]*v-o.G[x])*w,o.B[x]+=(t.color[2]*v-o.B[x])*w;const y=M*t.hScale;y>o.H[x]&&(o.H[x]=y)}else if(t.shadow>0){const M=(f*-r+p*-l)/(Math.sqrt(f*f+p*p)+1e-4),d=1-(Math.sqrt(g)-1)/.7;if(d>0&&M>-.2){const v=1-t.shadow*d*Math.min(1,M+.3);o.R[x]*=v,o.G[x]*=v,o.B[x]*=v}}}}function Os(o,t,e,s){const n=t*t,a=new Float32Array(n),i=new Float32Array(n),r=new Float32Array(n),l=new Float32Array(n),c=new Float32Array(n),h=new Float32Array(n);for(let u=0;u<n;u++){a[u]=.5+(e()-.5)*.85,i[u]=.5+(e()-.5)*.85;const g=e()*Math.PI;r[u]=Math.cos(g),l[u]=Math.sin(g);const x=s?.75+e()*.7:1,M=s?.8+e()*.45:1;c[u]=1/(M*x),h[u]=1/(M/x)}const f=new Float32Array(o*o),p=new Float32Array(o*o),m=new Int32Array(o*o);for(let u=0;u<o;u++){const g=u*t/o,x=Math.floor(g);for(let M=0;M<o;M++){const d=M*t/o,v=Math.floor(d);let w=1e9,y=1e9,k=0;for(let S=-1;S<=1;S++){const T=x+S,b=(T%t+t)%t;for(let _=-1;_<=1;_++){const P=v+_,D=(P%t+t)%t,R=b*t+D,E=d-(P+a[R]),z=g-(T+i[R]),I=E*r[R]+z*l[R],O=-E*l[R]+z*r[R],L=I*I*c[R]*c[R]+O*O*h[R]*h[R];L<w?(y=w,w=L,k=R):L<y&&(y=L)}}const A=u*o+M;f[A]=Math.sqrt(w),p[A]=Math.sqrt(y),m[A]=k}}return{d1:f,d2:p,id:m}}const Re=(o,t,e)=>{const s=Math.min(1,Math.max(0,(e-o)/(t-o)));return s*s*(3-2*s)};function En(o,t,e,s){const n=o.S,a=n/512,i=Wt(e.grass),r=Wt(e.dryGrass),l=Wt(e.dirt),c=de(n,t,4,4,5),h=de(n,t,16,16,3);if(Ko(c,1.8),s){for(let f=0;f<n*n;f++){const p=Re(.5,.72,c[f]),m=h[f];o.R[f]=(r[0]*.62+(l[0]*.8-r[0]*.62)*p*.55)*(.78+.4*m),o.G[f]=(r[1]*.62+(l[1]*.8-r[1]*.62)*p*.55)*(.78+.4*m),o.B[f]=(r[2]*.62+(l[2]*.8-r[2]*.62)*p*.55)*(.78+.4*m),o.H[f]=.1+.18*m}As(o,t,{count:Math.round(11e3*a*a),lenMin:24*a+4,lenMax:58*a+4,wMin:1.3,wMax:2.1,curve:3.4,base:r,baseDark:.62,tipLight:1.08,tipYellow:.08,bright:[.7,1.3],alt:{p:.12,color:[l[0]*1.1,l[1]*1.05,l[2]]},hueJitter:.1}),As(o,t,{count:Math.round(1200*a*a),lenMin:10*a+3,lenMax:22*a+3,wMin:1.4,wMax:2,curve:1.4,base:Wt(e.grass),baseDark:.6,tipLight:1.05,tipYellow:.1,bright:[.7,1],hueJitter:.06})}else{const f=[i[0]*.5,i[1]*.5,i[2]*.45];for(let u=0;u<n*n;u++){const g=c[u]*.7+h[u]*.3;o.R[u]=f[0]*(.7+.6*g),o.G[u]=f[1]*(.7+.6*g),o.B[u]=f[2]*(.7+.6*g),o.H[u]=.12+.2*h[u]}As(o,t,{count:Math.round(26e3*a*a),lenMin:12*a+3,lenMax:30*a+3,wMin:1.5,wMax:2.5,curve:1.2,base:i,baseDark:.58,tipLight:1.12,tipYellow:.16,bright:[.75,1.25],alt:{p:.05,color:r},hueJitter:.08});const p=[[.93,.92,.84],[.93,.78,.22],[.9,.9,.92]],m=Math.round(9*a*a)+3;for(let u=0;u<m;u++){const g=t()*n,x=t()*n,M=p[Math.floor(t()*p.length)],d=(1.3+t()*.8)*Math.max(.8,a);for(let v=0;v<5;v++){const w=v/5*Math.PI*2+t();Zo(o,{cx:g+Math.cos(w)*d,cy:x+Math.sin(w)*d,rx:d*.7,ry:d*.7,ang:0,color:M,hScale:.9,shadow:0})}Zo(o,{cx:g,cy:x,rx:d*.55,ry:d*.55,ang:0,color:[.95,.72,.15],hScale:.95,shadow:0})}}}function Rr(o,t,e){const s=o.S,n=s/512,a=Wt(e.dirt),i=Wt(e.rock),r=de(s,t,4,4,5),l=de(s,t,32,32,3);Ko(r,1.8);for(let p=0;p<s*s;p++){const m=.94+t()*.12,u=(.76+.46*r[p])*(.9+.2*l[p])*m,g=r[p]>.55?1.04:.98;o.R[p]=a[0]*u*g,o.G[p]=a[1]*u,o.B[p]=a[2]*u/g,o.H[p]=.28+.2*l[p]+.1*r[p]}const c=Math.round(110*n*n);for(let p=0;p<c;p++){const m=(5+t()*8)*n+1.5,u=.9+t()*.25;Zo(o,{cx:t()*s,cy:t()*s,rx:m*(.8+t()*.5),ry:m*(.8+t()*.5),ang:t()*3.14,color:[a[0]*u,a[1]*u,a[2]*u],hScale:.55+t()*.15,shadow:.2})}const h=Math.round(520*n*n);for(let p=0;p<h;p++){const m=(1.5+Math.pow(t(),2)*5)*Math.max(.7,n),u=t()*.65,g=.72+t()*.55;Zo(o,{cx:t()*s,cy:t()*s,rx:m*(.85+t()*.5),ry:m*(.7+t()*.4),ang:t()*3.14,color:[(i[0]+(a[0]-i[0])*u)*g,(i[1]+(a[1]-i[1])*u)*g,(i[2]+(a[2]-i[2])*u)*g],hScale:.8+t()*.2,shadow:.38})}const f=Math.round(16*n)+4;for(let p=0;p<f;p++){let m=t()*s,u=t()*s,g=t()*Math.PI*2;const x=Math.round((70+t()*150)*n)+20;for(let M=0;M<x;M++){g+=(t()-.5)*.7,m+=Math.cos(g),u+=Math.sin(g);const d=Math.round(m),v=Math.round(u),w=(v&o.mask)*s+(d&o.mask);if(o.R[w]*=.5,o.G[w]*=.5,o.B[w]*=.5,o.H[w]=Math.min(o.H[w],.04),M%3===0){const y=(v&o.mask)*s+(d+1&o.mask);o.R[y]*=.8,o.G[y]*=.8,o.B[y]*=.8,o.H[y]=Math.min(o.H[y],.18)}}}}function Cr(o,t,e){const s=o.S,n=s/512,a=Wt(e.gravel),i=Wt(e.dirt),r=Math.round(24*n+2)|0,l=Math.max(8,r),c=Os(s,l,t,!0),h=new Float32Array(l*l),f=new Float32Array(l*l),p=new Float32Array(l*l);for(let g=0;g<h.length;g++)h[g]=.62+t()*.75,f[g]=t(),p[g]=.6+t()*.4;const m=[i[0]*.38,i[1]*.36,i[2]*.33],u=de(s,t,24,24,2);for(let g=0;g<s*s;g++){const x=c.id[g],M=c.d1[g],d=Re(0,.1,c.d2[g]-M),v=Math.max(0,1-M*.85),w=f[x],y=h[x]*(.86+.28*u[g])*(.78+.3*v)*(.95+t()*.1),k=a[0]*y*(.94+.14*w),A=a[1]*y*(.97+.04*w),S=a[2]*y*(1.04-.14*w),T=d*d;o.R[g]=m[0]+(k-m[0])*T,o.G[g]=m[1]+(A-m[1])*T,o.B[g]=m[2]+(S-m[2])*T,o.H[g]=.04+.96*Math.pow(v,.7)*d*p[x]}}function Er(o,t,e){const s=o.S,n=s/512,a=Wt(e.rock),i=He(Wt(e.grass),[.1,.12,.06],.35),r=de(s,t,2,12,5),l=de(s,t,6,6,4),c=de(s,t,32,32,3),h=de(s,t,3,3,4);Ko(r,1.6),Ko(h,1.8);const f=Os(s,Math.max(4,Math.round(9*Math.max(.7,n))),t,!1),p=Os(s,Math.max(8,Math.round(15*Math.max(.7,n*1))),t,!1);for(let m=0;m<s*s;m++){const u=r[m]*.5+l[m]*.32+c[m]*.18,g=(c[m]-.5)*.09,x=1-Re(0,.035,f.d2[m]-f.d1[m]+g),M=(1-Re(0,.05,p.d2[m]-p.d1[m]+g))*.55*Re(.35,.7,l[m]),d=Math.min(1,x+M),v=u*(1-.8*d),w=.74+.5*r[m],y=l[m];let k=a[0]*w*(.96+.1*y),A=a[1]*w,S=a[2]*w*(1.04-.1*y);const T=.62+.55*v,b=1-.38*d;k*=T*b,A*=T*b,S*=T*b;const _=Re(.55,.78,h[m])*Re(.6,.2,u)*.55;_>0&&(k+=(i[0]*(.7+.5*c[m])-k)*_,A+=(i[1]*(.7+.5*c[m])-A)*_,S+=(i[2]*(.7+.5*c[m])-S)*_);const P=.94+t()*.12;o.R[m]=k*P,o.G[m]=A*P,o.B[m]=S*P,o.H[m]=v}}const zr={0:1.8,1:1.5,2:2.4,3:3.4,4:3},Nr={0:.9,1:.94,2:.97,3:.84,4:.9};function Fr(o,t){const e=o.S,s=new Uint8Array(e*e*4),n=new Uint8Array(e*e*4),a=h=>h<=0?0:h>=1?255:h*255+.5|0,i=o.H,r=o.mask,l=zr[t],c=Nr[t];for(let h=0;h<e;h++){const f=(h-1&r)*e,p=h*e,m=(h+1&r)*e;for(let u=0;u<e;u++){const g=u-1&r,x=u+1&r,M=i[f+x]+2*i[p+x]+i[m+x]-i[f+g]-2*i[p+g]-i[m+g],d=i[m+g]+2*i[m+u]+i[m+x]-i[f+g]-2*i[f+u]-i[f+x],v=-M*l/8,w=-d*l/8,y=1/Math.sqrt(v*v+w*w+1),k=(p+u)*4,A=p+u;s[k]=a(o.R[A]),s[k+1]=a(o.G[A]),s[k+2]=a(o.B[A]),s[k+3]=a(i[A]),n[k]=a(v*y*.5+.5),n[k+1]=a(w*y*.5+.5),n[k+2]=a(y*.5+.5),n[k+3]=a(c+(.5-i[A])*.12)}}return{size:e,albedo:s,normal:n}}function Ir(o,t,e,s){if(t<64||(t&t-1)!==0)throw new Error("size must be a power of two >= 64");const n=Pr(e*7919+o*104729+1),a=Dr(t);switch(o){case 0:En(a,n,s,!1);break;case 1:En(a,n,s,!0);break;case 2:Rr(a,n,s);break;case 3:Cr(a,n,s);break;default:Er(a,n,s)}return Fr(a,o)}const Lr=256,Ur=2207,Ys=1.1,Or={grass:9079172,dryGrass:9079172,dirt:7300698,gravel:9276293,rock:9079172};let Qt,Ce;function zn(o,t,e){const s=new Oe(o,t,t,To,Ao);return s.colorSpace=e?os:_o,s.wrapS=s.wrapT=me,s.magFilter=Ie,s.minFilter=es,s.generateMipmaps=!0,s.anisotropy=4,s.needsUpdate=!0,s}function Ha(){if(Qt)return Qt;const o=Ir(4,Lr,Ur,Or);return Qt={albedo:zn(o.albedo,o.size,!0),normal:zn(o.normal,o.size,!1)},Qt}const Nn=`
varying vec3 vRkPos;
varying vec3 vRkNrm;
varying vec3 vRkWorldN;
varying mat3 vRkM;
`,Gr=`
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
`,Br=`
vRkPos = transformed;
`,Wr=`
{
  mat4 rkModel = modelMatrix;
  #ifdef USE_BATCHING
    rkModel = modelMatrix * batchingMatrix;
  #endif
  vRkM = mat3(rkModel);
  vRkNrm = normalize(objectNormal);
  vRkWorldN = normalize(vRkM * objectNormal);
}
`,Vr=`
vec3 rkN = normalize(vRkNrm);
vec3 rkW = pow(abs(rkN), vec3(5.0));
rkW /= (rkW.x + rkW.y + rkW.z);
vec3 rkP = vRkPos * ${Ys.toFixed(3)};
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
`,Hr=`
{
  vec3 rkNo = normalize(vRkNrm);
  vec3 rkWn = pow(abs(rkNo), vec3(5.0));
  rkWn /= (rkWn.x + rkWn.y + rkWn.z);
  vec3 rkQ = vRkPos * ${Ys.toFixed(3)};
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
`,jr=`
{
  vec3 rkNr = normalize(vRkNrm);
  vec3 rkWr = pow(abs(rkNr), vec3(5.0));
  rkWr /= (rkWr.x + rkWr.y + rkWr.z);
  vec3 rkR = vRkPos * ${Ys.toFixed(3)};
  float rkRough = texture2D(rkNormal, rkR.zy).a * rkWr.x + texture2D(rkNormal, rkR.xz + 0.37).a * rkWr.y + texture2D(rkNormal, rkR.xy + 0.71).a * rkWr.z;
  roughnessFactor = mix(rkRough, 0.97, rkMoss * 0.8);
  roughnessFactor = mix(roughnessFactor, roughnessFactor * 0.72, rkGround);
}
`;function $r(){if(Ce)return Ce;const o=Ha(),t=new at({color:16777215,vertexColors:!0,roughness:.92,metalness:0});return t.userData.shared=!0,t.onBeforeCompile=e=>{e.uniforms.rkAlbedo={value:o.albedo},e.uniforms.rkNormal={value:o.normal},e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
${Nn}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${Br}`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
${Wr}`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
${Nn}${Gr}`).replace("#include <color_fragment>",`#include <color_fragment>
${Vr}`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
${jr}`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${Hr}`)},t.customProgramCacheKey=()=>"rock-triplanar-v1",Ce=t,t}let ue;function Xr(){if(ue)return ue;const o=Ha();return ue=new at({color:16777215,map:o.albedo,normalMap:o.normal,normalScale:new ut(.7,.7),vertexColors:!0,roughness:.9,metalness:0}),ue.userData.shared=!0,ue}function Yr(){Ce==null||Ce.dispose(),Ce=void 0,ue==null||ue.dispose(),ue=void 0,Qt==null||Qt.albedo.dispose(),Qt==null||Qt.normal.dispose(),Qt=void 0}const Kr={value:0},Zr={value:1},Fn={dir:{value:new C(.4,.8,-.45).normalize()},color:{value:new W(1,.95,.85)}};let ze="high";function r1(o){!Ne&&Object.keys(Ye).length===0&&(ze=o)}const qr=.45,Qr=`
uniform float windTime;
uniform float windStrength;
attribute vec2 aSway;
`,Jr=`
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
`;function Ks(o){o.uniforms.windTime=Kr,o.uniforms.windStrength=Zr,o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
${Qr}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${Jr}`)}const tl=`
uniform vec3 foliageSunDir;
uniform vec3 foliageSunColor;
`,el=`
{
  vec3 tlSun = normalize((viewMatrix * vec4(foliageSunDir, 0.0)).xyz);
  vec3 tlView = normalize(vViewPosition);
  float tlBack = pow(max(dot(-tlView, tlSun), 0.0), 4.0);
  totalEmissiveRadiance += diffuseColor.rgb * foliageSunColor * (tlBack * 0.35);
}
`;function qo(o,t,e,s){const n=new Oe(o.data,o.size,o.size,To,Ao);return n.colorSpace=t?os:_o,n.wrapS=n.wrapT=e?me:zs,n.magFilter=Ie,n.minFilter=es,n.generateMipmaps=!0,n.anisotropy=s,n.needsUpdate=!0,n}const ol=`
#ifdef USE_MAP
  vec2 fTexSz = vec2(textureSize(map, 0));
  vec2 fDx = dFdx(vMapUv * fTexSz);
  vec2 fDy = dFdy(vMapUv * fTexSz);
  float fMip = max(0.0, 0.5 * log2(max(dot(fDx, fDx), dot(fDy, fDy))));
  diffuseColor.a *= 1.0 + fMip * 0.3;
#endif`;function ja(o){o.fragmentShader=o.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
${ol}`)}const sl=4177,nl=913;let Ne;const Ye={},Qo=new Map;function $a(o,t){const e=new Xi({depthPacking:Yi}),s=new Ki;for(const n of[e,s])n.map=o.map,n.alphaTest=o.alphaTest,n.onBeforeCompile=a=>{Ks(a),ja(a)},n.customProgramCacheKey=()=>`wind-shadow-${t}-v2`;Qo.set(o,{depth:e,distance:s})}function Xa(){if(Ne)return Ne;const t=kr(ze==="high"?1024:512,sl),e=new at({map:qo(t.albedo,!0,!1,ze==="high"?4:2),normalMap:qo(t.normal,!1,!1,ze==="high"?4:2),normalScale:new ut(.8,.8),alphaTest:qr,vertexColors:!0,side:mt,roughness:.82,metalness:0});return e.onBeforeCompile=s=>{Ks(s),ja(s),s.uniforms.foliageSunDir=Fn.dir,s.uniforms.foliageSunColor=Fn.color,s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
${tl}`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
${el}`)},e.customProgramCacheKey=()=>"foliage-wind-v2",e.userData.shared=!0,Ne=e,$a(e,"foliage"),e}function Zs(o){const t=Ye[o];if(t)return t;const s=Ar(ze==="high"?512:256,nl,o),n=new at({map:qo(s.albedo,!0,!0,ze==="high"?4:2),normalMap:qo(s.normal,!1,!0,ze==="high"?4:2),normalScale:new ut(1,1),vertexColors:!0,roughness:.96,metalness:0});return n.onBeforeCompile=a=>Ks(a),n.customProgramCacheKey=()=>"bark-wind-v1",n.userData.shared=!0,Ye[o]=n,$a(n,`bark-${o}`),n}function Jo(o,t){const e=Qo.get(t);e&&(o.customDepthMaterial=e.depth,o.customDistanceMaterial=e.distance)}function l1(){var t,e;const o=[];Ne&&o.push(Ne);for(const s of Object.values(Ye))s&&o.push(s);for(const s of o){(t=s.map)==null||t.dispose(),(e=s.normalMap)==null||e.dispose(),s.dispose();const n=Qo.get(s);n==null||n.depth.dispose(),n==null||n.distance.dispose(),Qo.delete(s)}Yr(),Ne=void 0,delete Ye.broadleaf,delete Ye.conifer}function al(o){const t=new Gt;let e=0,s=0;const n=o.some(p=>p.attributes.color);for(const p of o)e+=p.attributes.position.count,s+=p.index?p.index.count:p.attributes.position.count;const a=new Float32Array(e*3),i=new Float32Array(e*3),r=new Float32Array(e*2),l=n?new Float32Array(e*3):null,c=new Uint32Array(s);let h=0,f=0;for(const p of o){const m=p.attributes.position,u=p.attributes.normal,g=p.attributes.uv;a.set(m.array,h*3),u&&i.set(u.array,h*3),g&&r.set(g.array,h*2),l&&(p.attributes.color?l.set(p.attributes.color.array,h*3):l.fill(1,h*3,(h+m.count)*3));const x=p.index;if(x)for(let M=0;M<x.count;M++)c[f++]=x.getX(M)+h;else for(let M=0;M<m.count;M++)c[f++]=M+h;h+=m.count}return t.setAttribute("position",new ct(a,3)),t.setAttribute("normal",new ct(i,3)),t.setAttribute("uv",new ct(r,2)),l&&t.setAttribute("color",new ct(l,3)),t.setIndex(new ct(c,1)),t}const il=.5;function c1(o=18){const t=Xt(90210),e=[];for(let s=0;s<o;s++){const n=t(),a=Math.sqrt(n)*.45,i=t()*Math.PI*2,r=Math.cos(i)*a,l=Math.sin(i)*a,c=.16+t()*.34,h=.026+t()*.025,f=.06+a*.7+t()*.12,p=3,m=[],u=[],g=[],x=Math.cos(i),M=Math.sin(i),d=t()*Math.PI,v=Math.cos(d),w=Math.sin(d);for(let T=0;T<=p;T++){const b=T/p,_=b*c,P=h*(1-b*.92)*.5,D=f*b*b,R=r+x*D,E=l+M*D;m.push(R-v*P,_,E-w*P),m.push(R+v*P,_,E+w*P),u.push(0,b,1,b)}for(let T=0;T<p;T++){const b=T*2,_=T*2+1,P=T*2+2,D=T*2+3;g.push(b,P,_,_,P,D)}const y=new Gt;y.setAttribute("position",new gt(m,3)),y.setAttribute("uv",new gt(u,2)),y.setIndex(g),y.computeVertexNormals();const k=.78+t()*.3,A=t()>.93?1:0,S=new Float32Array(m.length);for(let T=0;T<m.length/3;T++){const b=$.clamp(m[T*3+1]/il,0,1),_=[.07+b*.27,.15+b*.34,.045+b*.1],P=[.2+b*.34,.17+b*.26,.07+b*.1];for(let D=0;D<3;D++)S[T*3+D]=(_[D]*(1-A)+P[D]*A)*k}y.setAttribute("color",new ct(S,3)),e.push(y)}return al(e)}const In=new Map;function Ya(o=.88,t="leaf"){const e=`${t}:${o}`;let s=In.get(e);return s||(s=new at({color:16777215,vertexColors:!0,roughness:o,metalness:.02}),In.set(e,s)),s}function vo(o,t,e,s){return Math.sin(o*2.3+s)*Math.cos(t*2.1+s*1.3)*.5+Math.sin(e*2.7-s*.7+o*1.1)*.35+Math.sin((o+t+e)*4.1+s)*.15}const Ln=new Map;function rl(o,t,e){const s=`${o}:${t}:${e}`,n=Ln.get(s);if(n)return n;const a=Ke(new ka(1,t),1e-4),i=a.attributes.position,r=new C;for(let l=0;l<i.count;l++){r.fromBufferAttribute(i,l);const c=vo(r.x,r.y,r.z,o);r.multiplyScalar(1+c*e),i.setXYZ(l,r.x,r.y,r.z)}return a.computeVertexNormals(),a.deleteAttribute("uv"),Ln.set(s,a),a}function St(o,t,e,s=()=>1,n=!1){const a=o.clone();n||a.deleteAttribute("uv"),a.attributes.normal||a.computeVertexNormals();const i=a.attributes.position,r=a.attributes.normal,l=new Float32Array(i.count*3);for(let c=0;c<i.count;c++){const h=s(i.getY(c),r.getY(c));l[c*3]=e.r*h,l[c*3+1]=e.g*h,l[c*3+2]=e.b*h}return a.setAttribute("color",new ct(l,3)),a.applyMatrix4(t),a.index?a:Ke(a,1e-4)}const ll=new q,Un=new Ue,On=new ns,Gn=new C,Bn=new C;function Ft(o,t,e,s=1,n=s,a=s,i=0,r=0,l=0){return On.set(i,r,l),Un.setFromEuler(On),Gn.set(o,t,e),Bn.set(s,n,a),ll.clone().compose(Gn,Un,Bn)}function qs(o,t,e,s=!0){if(t.length===0)return;const n=Yt(t,!1);if(!n)return;const a=new Y(n,e);a.castShadow=s,a.receiveShadow=!0,Jo(a,e),o.add(a)}function Qs(o,t,e,s,n,a=!1,i=16,r=18){const l=[];for(let u=0;u<=i;u++){const g=u/i,x=t*.6*Math.exp(-g*13);l.push(new ut($.lerp(t,e,Math.pow(g,.85))+x,-.08*o+g*o*1.08))}const c=new qi(l,r),h=c.attributes.position,f=new Float32Array(h.count*3);for(let u=0;u<h.count;u++){const g=h.getX(u),x=h.getZ(u),M=h.getY(u),d=Math.atan2(x,g),v=Math.sin(d*7+M*.9/Math.max(.2,o*.15))*.5+Math.sin(d*13-M*1.7/Math.max(.2,o*.15))*.3+vo(g*3,M*2.2,x*3,3)*.6,w=Math.max(0,Math.sin(d*5+.7))*Math.exp(-Math.max(0,M)/(o*.12)),y=1+v*.055+w*.28;h.setX(u,g*y+n*Math.pow(Math.max(0,M)/o,2)*o),h.setZ(u,x*y);const k=.72+.28*$.clamp(.5+v*.6,0,1),A=.7+.3*Math.min(1,Math.max(0,M)/(o*.3)),S=k*A;f[u*3]=s.r*S,f[u*3+1]=s.g*S,f[u*3+2]=s.b*S}if(c.setAttribute("color",new ct(f,3)),a){const u=c.attributes.uv,g=Math.PI*2*((t+e)/2+t*.1);for(let x=0;x<u.count;x++)u.setY(x,u.getY(x)*o*1.08/g)}else c.deleteAttribute("uv");c.computeVertexNormals();const p=c.attributes.normal,m=i+1;for(let u=0;u<m;u++){const g=u,x=r*m+u,M=p.getX(g)+p.getX(x),d=p.getY(g)+p.getY(x),v=p.getZ(g)+p.getZ(x),w=Math.hypot(M,d,v)||1;p.setXYZ(g,M/w,d/w,v/w),p.setXYZ(x,M/w,d/w,v/w)}return c}const cl=.03,ko=.05,fe=new C(0,1,0);class cs{constructor(){F(this,"pos",[]);F(this,"nor",[]);F(this,"uvs",[]);F(this,"col",[]);F(this,"sw",[]);F(this,"idx",[]);F(this,"n",new C)}get cardCount(){return this.pos.length/12}add(t,e,s,n,a,i,r,l,c,h,f,p=!1){this.n.crossVectors(e,s).normalize();const m=this.n.dot(c)<0?-1:1;m<0&&this.n.negate();const u=this.n.clone().multiplyScalar(1-f).addScaledVector(h,f).normalize(),[g,x,M,d]=wr(i),v=this.pos.length/3;for(let w=0;w<4;w++){const y=w===1||w===2?1:0,k=w>=2?1:0,A=(y-.5)*n*m,S=(k-.5)*a;this.pos.push(t.x+e.x*A+s.x*S,t.y+e.y*A+s.y*S,t.z+e.z*A+s.z*S),this.nor.push(u.x,u.y,u.z);const T=p?1-y:y;this.uvs.push(g+(M-g)*T,x+(d-x)*k);const b=.88+.12*k;this.col.push(r[0]*b,r[1]*b,r[2]*b),this.sw.push(0,l*(.3+.7*k))}this.idx.push(v,v+1,v+2,v,v+2,v+3)}build(){const t=new Gt;return t.setAttribute("position",new gt(this.pos,3)),t.setAttribute("normal",new gt(this.nor,3)),t.setAttribute("uv",new gt(this.uvs,2)),t.setAttribute("color",new gt(this.col,3)),t.setAttribute("aSway",new gt(this.sw,2)),t.setIndex(this.pos.length/3>65535?new Zi(this.idx,1):new Sa(this.idx,1)),t}}function Wn(o,t){const e=o.attributes.position;let s=o.attributes.aSway;s||(s=new ct(new Float32Array(e.count*2),2),o.setAttribute("aSway",s));const n=cl*t;for(let a=0;a<e.count;a++){const i=$.clamp(e.getY(a)/t,0,1);s.setX(a,n*i*i)}s.needsUpdate=!0}function hl(o){let t=.001;for(const e of o){const s=e.attributes.position;for(let n=0;n<s.count;n++)s.getY(n)>t&&(t=s.getY(n))}return t}function Js(o,t,e,s){const n=t.length>0?Yt(t,!1):null,a=hl([...n?[n]:[],...e?[e]:[]]);if(n){Wn(n,a);const i=new Y(n,s);i.castShadow=!0,i.receiveShadow=!0,Jo(i,s),o.add(i)}if(e){Wn(e,a);const i=Xa(),r=new Y(e,i);r.castShadow=!0,r.receiveShadow=!0,Jo(r,i),o.add(r)}}function xo(o,t,e,s,n,a,i){const r=t.clone().sub(o),l=r.length(),c=new Ct(s,e,l,n,1,!0);c.translate(0,l/2,0);const h=c.attributes.uv,f=i(),p=i(),m=l/(Math.PI*(e+s));for(let x=0;x<h.count;x++)h.setXY(x,h.getX(x)+f,h.getY(x)*m+p);const u=c.attributes.position,g=new Float32Array(u.count*3);for(let x=0;x<u.count;x++){const M=a*(.78+.22*Math.min(1,u.getY(x)/l));g[x*3]=M,g[x*3+1]=M,g[x*3+2]=M}return c.setAttribute("color",new ct(g,3)),c.applyMatrix4(new q().compose(o,new Ue().setFromUnitVectors(fe,r.normalize()),new C(1,1,1))),c}const Ka=new W(1,.96,.9);function Fe(o,t){return t.set(o()+o()+o()-1.5,o()+o()+o()-1.5,o()+o()+o()-1.5),t.lengthSq()<1e-6&&t.set(0,1,0),t.normalize()}function ul(o,t,e,s,n,a){const i=new cs,r=Fe(e,new C),l=new C().crossVectors(r,Math.abs(r.y)>.9?new C(1,0,0):fe).normalize(),c=new C().crossVectors(r,l).normalize(),h=e()*Math.PI*2,f=l.clone().multiplyScalar(Math.cos(h)).addScaledVector(c,Math.sin(h)),p=c.clone().multiplyScalar(Math.cos(h)).addScaledVector(l,-Math.sin(h)),m=.62+.4*$.clamp(.5+s*.6,0,1),u=.94+e()*.12;return i.add(o,f,p,t,t,ne.shrub,[m*u,m,m*(1.1-(u-.94))],t*ko,r,r,.4,e()>.5),i.build()}function Za(o){const t=new vt,e=Xt(o.seed),s=o.u,n=[],a=(w,y,k,A,S=1)=>{n.push(xo(w,y,k,A,o.radial,S,e))},i=13*s;n.push(Qs(i,1.9*s,1.15*s,Ka,(e()-.5)*.02,!0,o.trunkRows,o.trunkRadial));for(let w=0;w<o.roots;w++){const y=w/o.roots*Math.PI*2+e()*.4,k=(3.4+e()*2.2)*s;a(new C(Math.cos(y)*s,2.2*s,Math.sin(y)*s),new C(Math.cos(y)*k,-.25*s,Math.sin(y)*k),.7*s,.18*s,.95)}const r=[];for(let w=0;w<o.limbs;w++){const y=w/o.limbs*Math.PI*2+e()*.4,k=i*(.62+e()*.3),A=(7.5+e()*3.5)*s,S=(5+e()*4)*s;let T=new C(Math.cos(y)*.5*s,k,Math.sin(y)*.5*s);for(let b=1;b<=o.segs;b++){const _=b/o.segs,P=new C(Math.cos(y)*A*_,k+S*Math.pow(_,.8)+Math.sin(_*3+w)*.4*s,Math.sin(y)*A*_),D=Math.max(.1*s,.62*s*(1-(b-1)/o.segs*.85)),R=Math.max(.07*s,.62*s*(1-b/o.segs*.85));if(a(T,P,D,R),b>=o.forkFrom)for(const E of[-1,1]){const z=y+E*(.5+e()*.5),I=P.clone().add(new C(Math.cos(z)*(2.2+e()*1.6)*s,(1.6+e()*2.2)*s,Math.sin(z)*(2.2+e()*1.6)*s));a(P,I,R*.8,.05*s),r.push({p:I,r:(1.9+e()*1)*s});for(let O=0;O<o.twigs;O++){const L=z+(O===0?-1:1)*(.6+e()*.7)*(e()>.5?1:-1),V=I.clone().add(new C(Math.cos(L)*(1.3+e()*1.2)*s,(.5+e()*1.6)*s,Math.sin(L)*(1.3+e()*1.2)*s));a(I,V,.05*s,.025*s),r.push({p:V,r:(1.4+e()*.8)*s})}}b===2&&r.push({p:P.clone().add(new C(0,1.2*s,0)),r:(2.2+e()*1)*s}),T=P}r.push({p:T.clone().add(new C(0,.8*s,0)),r:(2.5+e()*1)*s})}r.push({p:new C(0,i+4.5*s,0),r:3.4*s});const l=new C;for(const w of r)l.add(w.p);l.multiplyScalar(1/r.length);let c=.001;for(const w of r)c=Math.max(c,w.p.distanceTo(l)+w.r);let h=0;for(const w of r)h+=w.r*w.r;const f=new cs,p=new C,m=new C,u=new C,g=new C,x=new C,M=new C,d=new C,v=new C;for(const w of r){const y=Math.max(2,Math.round(o.cards*w.r*w.r/h));g.copy(w.p).sub(l).normalize();for(let k=0;k<y;k++){Fe(e,p).multiplyScalar(.8).addScaledVector(g,.55).normalize(),m.copy(w.p).addScaledVector(p,w.r*(.25+e()*.85)),u.copy(m).sub(l);const A=$.clamp(u.length()/c,0,1);u.normalize(),x.copy(u).multiplyScalar(.7).addScaledVector(fe,.45).add(Fe(e,v).multiplyScalar(.55)).normalize(),M.copy(u).addScaledVector(x,-u.dot(x)),M.lengthSq()<.02&&Fe(e,M),M.normalize();const S=(e()-.5)*1.8;v.crossVectors(x,M),M.multiplyScalar(Math.cos(S)).addScaledVector(v,Math.sin(S)).normalize(),d.crossVectors(M,x).normalize();const b=A<.55&&e()<.75?ne.broadleafDark:ne.broadleaf,_=$.lerp(.34,1.02,$.smoothstep(A,.15,1))*(.82+.18*$.clamp(.5+u.y*.8,0,1))*(.9+.2*e()),P=.96+e()*.1,D=(o.cardSize[0]+e()*(o.cardSize[1]-o.cardSize[0]))*s;f.add(m,d,M,D,D,b,[_*P,_,_*(1.08-(P-.96))],D*ko,u,u,.55,e()>.5)}}return Js(t,n,f.build(),Zs("broadleaf")),t}function h1(o=1,t="high"){const e=t==="low";return Za({u:.2*o,limbs:4,segs:3,forkFrom:3,roots:3,cards:e?440:1900,cardSize:e?[2.2,3.6]:[1.3,2.3],twigs:e?0:2,radial:e?4:6,trunkRows:e?8:16,trunkRadial:e?8:18,seed:Math.floor(o*1e4)+77})}function u1(){return Za({u:1,limbs:8,segs:4,forkFrom:2,roots:8,cards:9e3,cardSize:[1.5,2.9],twigs:2,radial:7,trunkRows:16,trunkRadial:18,seed:4411})}function f1(o=1,t="high"){const e=new vt,s=Xt(Math.floor(o*7919)+13),n=o,a=t==="low",i=4.3*n,r=[];r.push(Qs(i*.97,.15*n,.022*n,Ka,(s()-.5)*.03,!0,a?8:16,a?6:12));const l=a?5:9,c=a?2:4,h=new cs,f=new C,p=new C,m=new C,u=new C,g=new C,x=new C,M=new C,d=new C,v=new C,w=new Ue,y=a?1.4:1;for(let A=0;A<l;A++){const S=A/(l-1),T=(.9+S*3.05)*n,b=(1.1-.9*S)*n*(.92+s()*.16),_=a?4:Math.round(7-S*2.5),P=s()*Math.PI*2,D=.4-.1*S;for(let R=0;R<_;R++){const E=P+R/_*Math.PI*2+(s()-.5)*.5,z=b*(.85+s()*.3);g.set(Math.cos(E),0,Math.sin(E)),f.set(0,T+(s()-.5)*.12*n,0);const I=(G,X)=>X.set(g.x*z*G,f.y+z*(.12*G-D*G*G),g.z*z*G),O=a?2:3;p.copy(f);for(let G=1;G<=O;G++){I(G/O,m);const X=Math.max(.006*n,.045*n*(1-.65*S)*(1-(G-1)/O*.8)),H=Math.max(.004*n,.045*n*(1-.65*S)*(1-G/O*.8));r.push(xo(p,m,X,H,a?3:4,.85,s)),p.copy(m)}const L=$.clamp(z*.55,.38*n,.8*n)*y,V=$.clamp(Math.round(z/(L*.42)),a?2:3,a?3:7);for(let G=0;G<V;G++){const X=.2+G/Math.max(1,V-1)*.8;I(X,v),I(Math.min(1.02,X+.05),u).sub(v).normalize(),v.addScaledVector(u,L*.35);const H=$.lerp(.5,1.02,$.smoothstep(X,.1,.8));for(let et=0;et<c;et++){const dt=c===4?(et-1.5)*.5:(et-.5)*.9;M.copy(u),x.crossVectors(M,fe).normalize(),w.setFromAxisAngle(M,dt+(s()-.5)*.25),x.applyQuaternion(w),d.crossVectors(x,M).normalize();const pt=(s()-.5)*.35;w.setFromAxisAngle(d,pt);const Q=M.clone().applyQuaternion(w),ot=x.clone().applyQuaternion(w),lt=c===4&&et===0?.82:1,nt=H*(.7+.3*S)*lt*(.9+.2*s()),kt=L*(.9+s()*.2);h.add(v,ot,Q,kt,kt,ne.conifer,[nt,nt,nt*1.04],kt*ko,fe,g.clone().multiplyScalar(.5).addScaledVector(fe,.5).normalize(),.3,s()>.5)}}}}const k=a?2:3;for(let A=0;A<k;A++){const S=A/k*Math.PI+s()*.3;x.set(Math.cos(S),0,Math.sin(S)),v.set(0,i*.9+.12*n,0);const T=.62*n*y;h.add(v,x,fe,T,T,ne.conifer,[1,1,1.04],T*ko*.6,d.crossVectors(x,fe),d.clone(),0,s()>.5)}return Js(e,r,h.build(),Zs("conifer")),e}function fl(o=1,t="high"){const e=new vt,s=Xt(Math.floor(o*31337)+5),n=t==="low",a=o,i=[],r=n?4:5+Math.floor(s()*5);for(let y=0;y<r;y++){const k=y/r*Math.PI*2+s()*.8,A=(.35+s()*.4)*a,S=(.4+s()*.4)*a,T=new C(Math.cos(k)*A*.35,S*.5,Math.sin(k)*A*.35),b=new C(Math.cos(k)*A,S,Math.sin(k)*A),_=new C(Math.cos(k)*.03*a,0,Math.sin(k)*.03*a);n?i.push(xo(_,b,.02*a,.008*a,3,.8,s)):(i.push(xo(_,T,.022*a,.014*a,3,.8,s)),i.push(xo(T,b,.014*a,.006*a,3,.8,s)))}const l=new cs,c=n?150:520,h=n?[.36,.56]:[.26,.44],f=new C(0,.38*a,0),p=new C,m=new C,u=new C,g=new C,x=new C,M=new C,d=new C;let v=0,w=0;for(;v<c&&w++<c*6;){Fe(s,p);const y=(.4+.6*Math.sqrt(s()))*.72*a;if(m.set(p.x*y,f.y+p.y*y*.85,p.z*y),m.y<.06*a)continue;const k=$.clamp((m.y-.06*a)/(.3*a),0,1);if(s()>.25+.75*k)continue;u.copy(m).sub(f).normalize(),g.copy(u).multiplyScalar(.75).addScaledVector(fe,.35).add(Fe(s,d).multiplyScalar(.5)).normalize(),x.copy(u).addScaledVector(g,-u.dot(g)),x.lengthSq()<.02&&Fe(s,x),x.normalize();const A=(s()-.5)*1.6;d.crossVectors(g,x),x.multiplyScalar(Math.cos(A)).addScaledVector(d,Math.sin(A)).normalize(),M.crossVectors(x,g).normalize();const S=$.clamp(m.distanceTo(f)/(.72*a),0,1),T=$.lerp(.45,1.02,$.smoothstep(S,.2,1))*(.62+.38*k)*(.9+.2*s()),b=.95+s()*.1,_=(h[0]+s()*(h[1]-h[0]))*a;l.add(m,M,x,_,_,ne.shrub,[T*b,T,T*(1.07-(b-.95))],_*ko,u,u,.5,s()>.5),v++}if(Js(e,i,l.build(),Zs("broadleaf")),!n&&s()>.6){const y=[],k=new xt(.035*o,6,5),A=new W([14240600,6966233,15909198][Math.floor(s()*3)]);for(let S=0;S<9;S++){const T=s()*Math.PI*2,b=(.25+s()*.35)*o;y.push(St(k,Ft(Math.cos(T)*b,(.35+s()*.3)*o,Math.sin(T)*b),A))}qs(e,y,Ya(.5,"berry"),!1)}return e}let _s;function tn(){return _s||(_s=new at({color:16777215,vertexColors:!0,roughness:.78,metalness:0,side:mt})),_s}function wo(o,t,e,s,n){return new q().makeTranslation(o,t,e).multiply(new q().makeRotationY(s)).multiply(new q().makeRotationX(n))}function d1(o=1){const t=new vt,e=Xt(Math.floor(o*6151)+29),s=[15913547,15695784,16185072,12160240,15897419,15226959],n=new W(4880954),a=[],i=3+Math.floor(e()*3);for(let r=0;r<i;r++){const l=(.28+e()*.3)*o,c=new W(s[Math.floor(e()*s.length)]),h=e()*Math.PI*2,f=e()*.24*o,p=Math.cos(h)*f,m=Math.sin(h)*f,u=new Ct(.007*o,.012*o,l,5,1);u.translate(0,l/2,0),a.push(St(u,Ft(p,0,m),n.clone().multiplyScalar(.85+e()*.3)));for(let x=0;x<2;x++){const M=new At(.11*o,.034*o,2,1);M.translate(.055*o,0,0),M.rotateX(-Math.PI/2),a.push(St(M,wo(p,l*(.22+x*.22),m,x*Math.PI+e()*2,.35),n.clone().multiplyScalar(1.1+e()*.2)))}const g=6;for(let x=0;x<g;x++){const M=new ss(1,8);M.scale(.034*o,.062*o,1),M.translate(0,.064*o,0),M.rotateX(-Math.PI/2),a.push(St(M,wo(p,l,m,x/g*Math.PI*2,-.5),c.clone().multiplyScalar(.92+e()*.16),d=>1))}a.push(St(new xt(.022*o,7,5),Ft(p,l+.01*o,m),new W(14262813)))}return qs(t,a,tn(),!1),t}function dl(o,t,e,s,n,a){const r=[],l=[],c=[],h=new W;for(let p=0;p<=4;p++){const m=p/4,u=t*(1-m*.9)/2,g=e*m*m,x=s*m*m;if(r.push(g-u,m*o,x,g+u,m*o,x),h.copy(n).lerp(a,m),l.push(h.r,h.g,h.b,h.r,h.g,h.b),p>0){const M=(p-1)*2;c.push(M,M+2,M+1,M+1,M+2,M+3)}}const f=new Gt;return f.setAttribute("position",new gt(r,3)),f.setAttribute("color",new gt(l,3)),f.setIndex(c),f.computeVertexNormals(),f}function m1(o=1){const t=new vt,e=Xt(Math.floor(o*4111)+3),s=[],n=new W(10203735),a=new W(4153392);for(let i=0;i<9;i++){const r=(.7+e()*1)*o,l=e()*Math.PI*2,c=Math.sqrt(e())*.28*o,h=dl(r,(.05+e()*.035)*o,(e()-.5)*.55*o,(e()-.5)*.55*o,a.clone().multiplyScalar(.85+e()*.3),n.clone().multiplyScalar(.85+e()*.3));if(h.applyMatrix4(Ft(Math.cos(l)*c,0,Math.sin(l)*c,1,1,1,0,e()*Math.PI*2,0)),s.push(h),e()>.68){const f=r*(.8+e()*.15),p=new Ct(.006*o,.01*o,f,4,1);p.translate(0,f/2,0),s.push(St(p,Ft(Math.cos(l)*c,0,Math.sin(l)*c),a.clone().multiplyScalar(1.2)));const m=new Ct(.022*o,.022*o,.14*o,7,1);m.translate(0,.07*o,0),s.push(St(m,Ft(Math.cos(l)*c,f*.96,Math.sin(l)*c),new W(5913122)))}}return qs(t,s,tn(),!1),t}function p1(o=1){const t=Xt(Math.floor(o*2027)+11),e=(1.8+t()*1.4)*o,s=(.17+t()*.06)*o,n=new W(5652526),a=[],i=Qs(e,s*1.05,s*.85,n,0);i.rotateZ(-Math.PI/2),i.translate(-e/2,s*.82,0),a.push(i);const r=new ss(s*.85,14);a.push(St(r,Ft(e/2+.002,s*.82,0,1,1,1,0,Math.PI/2,0),new W(12096874)));const l=new ya(s*.35,s*.4,14);a.push(St(l,Ft(e/2+.004,s*.82,0,1,1,1,0,Math.PI/2,0),new W(9070660)));for(let p=0;p<2;p++){const m=new Ct(s*.12,s*.2,s*1.1,6,1);m.translate(0,s*.55,0),a.push(St(m,Ft((t()-.5)*e*.6,s*1.3,(t()>.5?1:-1)*s*.5,1,1,1,(t()-.5)*.7,0,(t()-.5)*.8),n.clone().multiplyScalar(.9)))}const c=new W(5075768);for(let p=0;p<4;p++){const m=s*(.35+t()*.3);a.push(St(rl(Math.floor(t()*3)+1,1,.3),Ft((t()-.5)*e*.8,s*1.62,(t()-.5)*s*.8,m*1.3,m*.45,m),c.clone().multiplyScalar(.8+t()*.4),(u,g)=>.75+.25*$.clamp(.5+.5*g,0,1)))}const h=Yt(a,!1),f=new Y(h,tn());return f.rotation.y=t()*Math.PI,f.castShadow=!0,f.receiveShadow=!0,f}const Vn=new Map;function ml(o){let t=Vn.get(o);if(!t){const e=new ka(1,o);e.deleteAttribute("normal"),e.deleteAttribute("uv"),t=Ke(e,1e-4),e.dispose(),Vn.set(o,t)}return t}function Hn(o,t){const e=ml(t.detail).clone(),s=e.attributes.position,n=[];for(let m=0;m<t.cuts;m++){const u=new C(o()-.5,o()*1.1-.3,o()-.5).normalize();n.push({n:u,d:.6+o()*.22})}const a=new C((o()-.5)*.55,1,(o()-.5)*.55).normalize(),i=3.2+o()*2.2,r=o()*4,l=new C,c=-.56;for(let m=0;m<s.count;m++){l.fromBufferAttribute(s,m),l.multiplyScalar(1+vo(l.x*1.4,l.y*1.4,l.z*1.4,t.seed)*.2);for(const w of n){const y=l.dot(w.n);y>w.d&&l.addScaledVector(w.n,w.d-y)}const g=l.dot(a)*i+r,x=g-Math.floor(g),v=1+(Math.floor(g)+$.smoothstep(x,.62,1)-g)/i*.55*t.strata;l.x*=v,l.z*=v,l.multiplyScalar(1+vo(l.x*7,l.y*7,l.z*7,t.seed+5)*.035),l.y<c&&(l.y=c),s.setXYZ(m,l.x*t.rx,(l.y-c)*t.ry,l.z*t.rz)}e.computeVertexNormals();const h=e.attributes.normal,f=new Float32Array(s.count*3),p=new Float32Array(s.count*2);for(let m=0;m<s.count;m++){const u=.9+.2*(.5+vo(s.getX(m)*5,s.getY(m)*5,s.getZ(m)*5,t.seed+9));f[m*3]=t.tone.r*u,f[m*3+1]=t.tone.g*u,f[m*3+2]=t.tone.b*u;const g=Math.abs(h.getX(m)),x=Math.abs(h.getY(m)),M=Math.abs(h.getZ(m));x>=g&&x>=M?(p[m*2]=s.getX(m),p[m*2+1]=s.getZ(m)):g>=M?(p[m*2]=s.getZ(m),p[m*2+1]=s.getY(m)):(p[m*2]=s.getX(m),p[m*2+1]=s.getY(m))}return e.setAttribute("color",new ct(f,3)),e.setAttribute("uv",new ct(p,2)),e}function g1(o=1){const t=Xt(Math.floor(o*9973)+17),e=[],s=new W().setHSL(.09+(t()-.5)*.08,.04+t()*.05,.86+(t()-.5)*.12),n=1+Math.floor(t()*2.4);for(let l=0;l<n;l++){const c=(l===0?.55:.2+t()*.22)*o,h=t()*Math.PI*2,f=l===0?0:(.55+t()*.3)*o,p=Hn(t,{detail:l===0?6:4,seed:11+l*5+Math.floor(t()*40),rx:c*(1.05+t()*.25),ry:c*(.82+t()*.3),rz:c*(.9+t()*.25),cuts:4+Math.floor(t()*4),strata:.6+t()*.5,tone:s.clone().offsetHSL(0,0,(t()-.5)*.07)}),m=new q().compose(new C(Math.cos(h)*f,0,Math.sin(h)*f),new Ue().setFromEuler(new ns(l===0?0:(t()-.5)*.2,t()*6.28,l===0?0:(t()-.5)*.2)),new C(1,1,1));p.applyMatrix4(m),e.push(p)}const a=2+Math.floor(t()*3);for(let l=0;l<a;l++){const c=(.05+t()*.06)*o,h=t()*Math.PI*2,f=(.6+t()*.5)*o,p=Hn(t,{detail:2,seed:40+l,rx:c*1.2,ry:c*.8,rz:c,cuts:3,strata:.2,tone:s.clone().offsetHSL(0,0,(t()-.5)*.1)});p.rotateY(t()*6.28),p.translate(Math.cos(h)*f,0,Math.sin(h)*f),e.push(p)}const i=Yt(e,!1);for(const l of e)l.dispose();const r=new Y(i,$r());return r.castShadow=!0,r.receiveShadow=!0,r}function v1(o){const t=new vt,e=new W(9210756),s=[],n=(h,f,p=e,m=1,u=1,g=1)=>{s.push(St(h,Ft(0,f,0,m,u,g),p,(x,M)=>.78+.22*$.clamp(.5+.5*M,0,1)))};n(new Se(.46,.14,.46,1,.03),.07),n(new Ct(.075,.1,.62,10),.45),n(new Se(.34,.08,.34,1,.025),.8);for(const[h,f]of[[-.13,-.13],[.13,-.13],[-.13,.13],[.13,.13]])s.push(St(new bo(.045,.34,.045),Ft(h,1.02,f),e.clone().multiplyScalar(.9)));n(new Se(.4,.07,.4,1,.025),1.22);const a=new eo(.34,.24,4,1);s.push(St(a,Ft(0,1.38,0,1,1,1,0,Math.PI/4,0),e.clone().multiplyScalar(.85))),n(new xt(.05,10,8),1.55);const i=new Y(Yt(s,!1),Ya(.9,"lantern"));i.castShadow=!0,i.receiveShadow=!0;const r=xr(o,.9),l=new Y(new bo(.2,.3,.2),r);l.position.y=1.02;const c=new ba(o,.8,6);return c.position.y=1.05,t.add(i,l,c),t}function x1(){const o=[],t=new Ct(.004,.006,.26,4,1);t.translate(0,.13,0),o.push(St(t,Ft(0,0,0),new W(.2,.34,.12)));for(let s=0;s<6;s++){const n=new ss(1,7);n.scale(.022,.044,1),n.translate(0,.046,0),n.rotateX(-Math.PI/2),o.push(St(n,wo(0,.27,0,s/6*Math.PI*2,-.45),new W(1,1,1)))}o.push(St(new xt(.014,6,5),Ft(0,.275,0),new W(1,.82,.25)));const e=new At(.07,.022,2,1);return e.translate(.035,0,0),e.rotateX(-Math.PI/2),o.push(St(e,wo(0,.07,0,.6,.4),new W(.22,.4,.14))),o.push(St(e,wo(0,.1,0,3.5,.4),new W(.22,.4,.14))),Yt(o,!1)}function qa(o,t,e=26){const s=Xt(o),n=[];for(let a=0;a<e;a++){const i=new C(s()-.5,s()*.7-.1,s()-.5).normalize();n.push(ul(i.multiplyScalar(t*(.35+s()*.65)),t*(.7+s()*.5),s,i.y))}return n}function w1(o,t,e){const s=qa(o,t,e),n=Yt(s,!1);for(const a of s)a.dispose();return n}function M1(o=1,t="high"){const e=fl(o,t);e.updateMatrixWorld(!0);const s=[];return e.traverse(n=>{const a=n;if(!a.isMesh)return;const i=a.geometry.clone();i.applyMatrix4(a.matrixWorld),s.push({geometry:i,material:a.material}),a.geometry.dispose()}),s}const pl=new q,jn=new Ue,$n=new ns,Xn=new C(1,1,1),Yn=new C;function Qa(o,t,e,s=.04){return s<.0075?new bo(o,t,e):new Se(o,t,e,1,Math.min(s,o/2.01,t/2.01,e/2.01))}function Qe(o,t,e,s=16){return new Ct(o,t,e,s,1)}function y1(o,t,e,s=8){const n=new Te;for(let i=0;i<s;i++){const r=(i+.5)/s*Math.PI*2,l=Math.cos(r)*o,c=Math.sin(r)*o;i===0?n.moveTo(l,c):n.lineTo(l,c)}n.closePath();const a=new Ge(n,{depth:Math.max(.001,t-e*2),bevelEnabled:!0,bevelThickness:e,bevelSize:e,bevelSegments:1});return a.rotateX(-Math.PI/2),a.translate(0,e,0),a}function b1(o,t,e,s,n){const a=new Te;a.moveTo(Math.cos(e)*o,Math.sin(e)*o),a.lineTo(Math.cos(e)*t,Math.sin(e)*t),a.absarc(0,0,t,e,s,!1),a.lineTo(Math.cos(s)*o,Math.sin(s)*o),a.absarc(0,0,o,s,e,!0);const i=new Ge(a,{depth:n,bevelEnabled:!1,curveSegments:3});return i.rotateX(-Math.PI/2),i}function gl(o,t,e,s=6){const n=new C(...o),a=new C(...t).sub(n),i=new Ct(e,e,a.length(),s,1),r=new Ue().setFromUnitVectors(new C(0,1,0),a.clone().normalize());return i.applyMatrix4(new q().compose(n.clone().addScaledVector(a,.5),r,new C(1,1,1))),i}function S1(o,t,e,s=.04){const n=new Te;n.absarc(0,0,o,0,Math.PI,!1),n.lineTo(-t,0),n.absarc(0,0,t,Math.PI,0,!0),n.closePath();const a=new Ge(n,{depth:Math.max(.001,e-s*2),bevelEnabled:!0,bevelThickness:s,bevelSize:s*.8,bevelSegments:1,curveSegments:18});return a.translate(0,0,-(e-s*2)/2),a}function Kn(o,t,e){const s=new Te;s.moveTo(-o/2,0),s.lineTo(o/2,0),s.lineTo(0,t),s.closePath();const n=new Ge(s,{depth:e,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});return n.translate(0,0,-e/2),n}class Ja{constructor(){F(this,"buckets",new Map)}add(t,e,s={}){const n=t.clone();e.map||n.deleteAttribute("uv"),n.deleteAttribute(qe),$n.set(s.rx??0,s.ry??0,s.rz??0),jn.setFromEuler($n),Yn.set(s.x??0,s.y??0,s.z??0),Xn.set(s.sx??1,s.sy??1,s.sz??1),n.applyMatrix4(pl.compose(Yn,jn,Xn));const a=n.index?n:Ke(n,1e-4),i=this.buckets.get(e)??[];i.push(a),this.buckets.set(e,i)}addMatrix(t,e,s){const n=t.clone();e.map||n.deleteAttribute("uv"),n.deleteAttribute(qe),n.applyMatrix4(s);const a=n.index?n:Ke(n,1e-4),i=this.buckets.get(e)??[];i.push(a),this.buckets.set(e,i)}build(t,e="detail",s={}){const n=[];let a=0;for(const[i,r]of this.buckets){const l=Yt(r,!1);if(!l)continue;l.computeBoundingSphere(),Ua(i)&&$o(l);const c=new Y(l,i);c.name=`${e}-${a++}`,c.castShadow=!0,c.receiveShadow=!0,Jo(c,i),Object.assign(c.userData,s),t.add(c),n.push(c)}return this.buckets.clear(),n}}function vl(o){var n;o.updateMatrixWorld(!0);const t=new q().copy(o.matrixWorld).invert(),e=new Map,s=[];o.traverse(a=>{a.isMesh&&s.push(a)});for(const a of s){const i=a.geometry.clone();i.deleteAttribute("uv"),i.deleteAttribute(qe),i.applyMatrix4(new q().multiplyMatrices(t,a.matrixWorld));const r=i.index?i:Ke(i,1e-4),l=e.get(a.material)??[];l.push(r),e.set(a.material,l)}for(const a of s)(n=a.parent)==null||n.remove(a);for(const a of[...o.children])a.type==="Group"&&o.remove(a);for(const[a,i]of e){const r=Yt(i,!1);if(!r)continue;const l=new Y(r,a);l.castShadow=!0,l.receiveShadow=!0,l.userData.isLandscapeStage=!0,o.add(l)}}function k1(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function xl(){const o=(e,s,n=.02,a={})=>{const i=new at({color:e,roughness:s,metalness:n,...a});return i.fog=!1,i},t={stone:o(12170150,.9),stoneDark:o(9078397,.92),stoneWarm:o(13221286,.9),paveA:o(10132116,.95),paveB:o(8751752,.95),slate:o(4870744,.86,.06),wood:o(9071178,.82,.02),woodDark:o(5915440,.85,.02),brass:o(11962940,.36,.8),steel:o(9345444,.4,.8),copper:o(5216908,.52,.55),leaf:o(4157253,.95),leafLight:o(6263120,.95),soil:o(4864812,1),lampGlass:o(15923199,.3,0,{emissive:13625087,emissiveIntensity:.9}),paper:o(15524815,.95),darkSteel:o(3093819,.5,.7),rock:o(8093056,.95),terracottaRoof:o(11887946,.82),glass:(()=>{const e=new Le({color:7315376,roughness:.04,metalness:0,transparent:!0,opacity:.34,clearcoat:1,envMapIntensity:1.6,depthWrite:!1});return e.fog=!1,e})()};return zt(t.stone,"masonry"),zt(t.stoneDark,"masonry"),zt(t.stoneWarm,"masonry"),zt(t.rock,"masonry"),zt(t.paveA,"paving"),zt(t.paveB,"paving"),zt(t.wood,"wood"),zt(t.woodDark,"wood"),zt(t.terracottaRoof,"tiles"),zt(t.slate,"tiles"),zt(t.brass,"metal"),zt(t.steel,"metal"),zt(t.copper,"metal"),zt(t.darkSteel,"metal"),t}class wl extends Y{constructor(t,e,s=!1,n=!1,a=1e4){const i=new Gt;super(i,e),this.isMarchingCubes=!0;const r=this,l=new Float32Array(36),c=new Float32Array(36),h=new Float32Array(36);this.enableUvs=s,this.enableColors=n,this.init=function(d){this.resolution=d,this.isolation=80,this.size=d,this.size2=this.size*this.size,this.size3=this.size2*this.size,this.halfsize=this.size/2,this.delta=2/this.size,this.yd=this.size,this.zd=this.size2,this.field=new Float32Array(this.size3),this.normal_cache=new Float32Array(this.size3*3),this.palette=new Float32Array(this.size3*3),this.count=0;const v=a*3;this.positionArray=new Float32Array(v*3);const w=new ct(this.positionArray,3);w.setUsage(Ro),i.setAttribute("position",w),this.normalArray=new Float32Array(v*3);const y=new ct(this.normalArray,3);if(y.setUsage(Ro),i.setAttribute("normal",y),this.enableUvs){this.uvArray=new Float32Array(v*2);const k=new ct(this.uvArray,2);k.setUsage(Ro),i.setAttribute("uv",k)}if(this.enableColors){this.colorArray=new Float32Array(v*3);const k=new ct(this.colorArray,3);k.setUsage(Ro),i.setAttribute("color",k)}i.boundingSphere=new Ta(new C,1)};function f(d,v,w){return d+(v-d)*w}function p(d,v,w,y,k,A,S,T,b,_){const P=(w-S)/(T-S),D=r.normal_cache;l[v+0]=y+P*r.delta,l[v+1]=k,l[v+2]=A,c[v+0]=f(D[d+0],D[d+3],P),c[v+1]=f(D[d+1],D[d+4],P),c[v+2]=f(D[d+2],D[d+5],P),h[v+0]=f(r.palette[b*3+0],r.palette[_*3+0],P),h[v+1]=f(r.palette[b*3+1],r.palette[_*3+1],P),h[v+2]=f(r.palette[b*3+2],r.palette[_*3+2],P)}function m(d,v,w,y,k,A,S,T,b,_){const P=(w-S)/(T-S),D=r.normal_cache;l[v+0]=y,l[v+1]=k+P*r.delta,l[v+2]=A;const R=d+r.yd*3;c[v+0]=f(D[d+0],D[R+0],P),c[v+1]=f(D[d+1],D[R+1],P),c[v+2]=f(D[d+2],D[R+2],P),h[v+0]=f(r.palette[b*3+0],r.palette[_*3+0],P),h[v+1]=f(r.palette[b*3+1],r.palette[_*3+1],P),h[v+2]=f(r.palette[b*3+2],r.palette[_*3+2],P)}function u(d,v,w,y,k,A,S,T,b,_){const P=(w-S)/(T-S),D=r.normal_cache;l[v+0]=y,l[v+1]=k,l[v+2]=A+P*r.delta;const R=d+r.zd*3;c[v+0]=f(D[d+0],D[R+0],P),c[v+1]=f(D[d+1],D[R+1],P),c[v+2]=f(D[d+2],D[R+2],P),h[v+0]=f(r.palette[b*3+0],r.palette[_*3+0],P),h[v+1]=f(r.palette[b*3+1],r.palette[_*3+1],P),h[v+2]=f(r.palette[b*3+2],r.palette[_*3+2],P)}function g(d){const v=d*3;r.normal_cache[v]===0&&(r.normal_cache[v+0]=r.field[d-1]-r.field[d+1],r.normal_cache[v+1]=r.field[d-r.yd]-r.field[d+r.yd],r.normal_cache[v+2]=r.field[d-r.zd]-r.field[d+r.zd])}function x(d,v,w,y,k){const A=y+1,S=y+r.yd,T=y+r.zd,b=A+r.yd,_=A+r.zd,P=y+r.yd+r.zd,D=A+r.yd+r.zd;let R=0;const E=r.field[y],z=r.field[A],I=r.field[S],O=r.field[b],L=r.field[T],V=r.field[_],G=r.field[P],X=r.field[D];E<k&&(R|=1),z<k&&(R|=2),I<k&&(R|=8),O<k&&(R|=4),L<k&&(R|=16),V<k&&(R|=32),G<k&&(R|=128),X<k&&(R|=64);const H=Ml[R];if(H===0)return 0;const et=r.delta,dt=d+et,pt=v+et,Q=w+et;H&1&&(g(y),g(A),p(y*3,0,k,d,v,w,E,z,y,A)),H&2&&(g(A),g(b),m(A*3,3,k,dt,v,w,z,O,A,b)),H&4&&(g(S),g(b),p(S*3,6,k,d,pt,w,I,O,S,b)),H&8&&(g(y),g(S),m(y*3,9,k,d,v,w,E,I,y,S)),H&16&&(g(T),g(_),p(T*3,12,k,d,v,Q,L,V,T,_)),H&32&&(g(_),g(D),m(_*3,15,k,dt,v,Q,V,X,_,D)),H&64&&(g(P),g(D),p(P*3,18,k,d,pt,Q,G,X,P,D)),H&128&&(g(T),g(P),m(T*3,21,k,d,v,Q,L,G,T,P)),H&256&&(g(y),g(T),u(y*3,24,k,d,v,w,E,L,y,T)),H&512&&(g(A),g(_),u(A*3,27,k,dt,v,w,z,V,A,_)),H&1024&&(g(b),g(D),u(b*3,30,k,dt,pt,w,O,X,b,D)),H&2048&&(g(S),g(P),u(S*3,33,k,d,pt,w,I,G,S,P)),R<<=4;let ot,lt,nt,kt=0,Tt=0;for(;Wo[R+Tt]!=-1;)ot=R+Tt,lt=ot+1,nt=ot+2,M(l,c,h,3*Wo[ot],3*Wo[lt],3*Wo[nt]),Tt+=3,kt++;return kt}function M(d,v,w,y,k,A){const S=r.count*3;if(r.positionArray[S+0]=d[y],r.positionArray[S+1]=d[y+1],r.positionArray[S+2]=d[y+2],r.positionArray[S+3]=d[k],r.positionArray[S+4]=d[k+1],r.positionArray[S+5]=d[k+2],r.positionArray[S+6]=d[A],r.positionArray[S+7]=d[A+1],r.positionArray[S+8]=d[A+2],r.material.flatShading===!0){const T=(v[y+0]+v[k+0]+v[A+0])/3,b=(v[y+1]+v[k+1]+v[A+1])/3,_=(v[y+2]+v[k+2]+v[A+2])/3;r.normalArray[S+0]=T,r.normalArray[S+1]=b,r.normalArray[S+2]=_,r.normalArray[S+3]=T,r.normalArray[S+4]=b,r.normalArray[S+5]=_,r.normalArray[S+6]=T,r.normalArray[S+7]=b,r.normalArray[S+8]=_}else r.normalArray[S+0]=v[y+0],r.normalArray[S+1]=v[y+1],r.normalArray[S+2]=v[y+2],r.normalArray[S+3]=v[k+0],r.normalArray[S+4]=v[k+1],r.normalArray[S+5]=v[k+2],r.normalArray[S+6]=v[A+0],r.normalArray[S+7]=v[A+1],r.normalArray[S+8]=v[A+2];if(r.enableUvs){const T=r.count*2;r.uvArray[T+0]=d[y+0],r.uvArray[T+1]=d[y+2],r.uvArray[T+2]=d[k+0],r.uvArray[T+3]=d[k+2],r.uvArray[T+4]=d[A+0],r.uvArray[T+5]=d[A+2]}r.enableColors&&(r.colorArray[S+0]=w[y+0],r.colorArray[S+1]=w[y+1],r.colorArray[S+2]=w[y+2],r.colorArray[S+3]=w[k+0],r.colorArray[S+4]=w[k+1],r.colorArray[S+5]=w[k+2],r.colorArray[S+6]=w[A+0],r.colorArray[S+7]=w[A+1],r.colorArray[S+8]=w[A+2]),r.count+=3}this.addBall=function(d,v,w,y,k,A){const S=Math.sign(y);y=Math.abs(y);const T=A!=null;let b=new W(d,v,w);if(T)try{b=A instanceof W?A:Array.isArray(A)?new W(Math.min(Math.abs(A[0]),1),Math.min(Math.abs(A[1]),1),Math.min(Math.abs(A[2]),1)):new W(A)}catch{b=new W(d,v,w)}const _=this.size*Math.sqrt(y/k),P=w*this.size,D=v*this.size,R=d*this.size;let E=Math.floor(P-_);E<1&&(E=1);let z=Math.floor(P+_);z>this.size-1&&(z=this.size-1);let I=Math.floor(D-_);I<1&&(I=1);let O=Math.floor(D+_);O>this.size-1&&(O=this.size-1);let L=Math.floor(R-_);L<1&&(L=1);let V=Math.floor(R+_);V>this.size-1&&(V=this.size-1);let G,X,H,et,dt,pt,Q,ot,lt,nt,kt;for(H=E;H<z;H++)for(dt=this.size2*H,ot=H/this.size-w,lt=ot*ot,X=I;X<O;X++)for(et=dt+this.size*X,Q=X/this.size-v,nt=Q*Q,G=L;G<V;G++)if(pt=G/this.size-d,kt=y/(1e-6+pt*pt+nt+lt)-k,kt>0){this.field[et+G]+=kt*S;const Tt=Math.sqrt((G-R)*(G-R)+(X-D)*(X-D)+(H-P)*(H-P))/_,N=1-Tt*Tt*Tt*(Tt*(Tt*6-15)+10);this.palette[(et+G)*3+0]+=b.r*N,this.palette[(et+G)*3+1]+=b.g*N,this.palette[(et+G)*3+2]+=b.b*N}},this.addPlaneX=function(d,v){const w=this.size,y=this.yd,k=this.zd,A=this.field;let S,T,b,_,P,D,R,E=w*Math.sqrt(d/v);for(E>w&&(E=w),S=0;S<E;S++)if(D=S/w,_=D*D,P=d/(1e-4+_)-v,P>0)for(T=0;T<w;T++)for(R=S+T*y,b=0;b<w;b++)A[k*b+R]+=P},this.addPlaneY=function(d,v){const w=this.size,y=this.yd,k=this.zd,A=this.field;let S,T,b,_,P,D,R,E,z=w*Math.sqrt(d/v);for(z>w&&(z=w),T=0;T<z;T++)if(D=T/w,_=D*D,P=d/(1e-4+_)-v,P>0)for(R=T*y,S=0;S<w;S++)for(E=R+S,b=0;b<w;b++)A[k*b+E]+=P},this.addPlaneZ=function(d,v){const w=this.size,y=this.yd,k=this.zd,A=this.field;let S,T,b,_,P,D,R,E,z=w*Math.sqrt(d/v);for(z>w&&(z=w),b=0;b<z;b++)if(D=b/w,_=D*D,P=d/(1e-4+_)-v,P>0)for(R=k*b,T=0;T<w;T++)for(E=R+T*y,S=0;S<w;S++)A[E+S]+=P},this.setCell=function(d,v,w,y){const k=this.size2*w+this.size*v+d;this.field[k]=y},this.getCell=function(d,v,w){const y=this.size2*w+this.size*v+d;return this.field[y]},this.blur=function(d=1){const v=this.field,w=v.slice(),y=this.size,k=this.size2;for(let A=0;A<y;A++)for(let S=0;S<y;S++)for(let T=0;T<y;T++){const b=k*T+y*S+A;let _=w[b],P=1;for(let D=-1;D<=1;D+=2){const R=D+A;if(!(R<0||R>=y))for(let E=-1;E<=1;E+=2){const z=E+S;if(!(z<0||z>=y))for(let I=-1;I<=1;I+=2){const O=I+T;if(O<0||O>=y)continue;const L=k*O+y*z+R,V=w[L];P++,_+=d*(V-_)/P}}}v[b]=_}},this.reset=function(){for(let d=0;d<this.size3;d++)this.normal_cache[d*3]=0,this.field[d]=0,this.palette[d*3]=this.palette[d*3+1]=this.palette[d*3+2]=0},this.update=function(){this.count=0;const d=this.size-2;for(let v=1;v<d;v++){const w=this.size2*v,y=(v-this.halfsize)/this.halfsize;for(let k=1;k<d;k++){const A=w+this.size*k,S=(k-this.halfsize)/this.halfsize;for(let T=1;T<d;T++){const b=(T-this.halfsize)/this.halfsize,_=A+T;x(b,S,y,_,this.isolation)}}}this.geometry.setDrawRange(0,this.count),i.getAttribute("position").needsUpdate=!0,i.getAttribute("normal").needsUpdate=!0,this.enableUvs&&(i.getAttribute("uv").needsUpdate=!0),this.enableColors&&(i.getAttribute("color").needsUpdate=!0),this.count/3>a&&console.warn("THREE.MarchingCubes: Geometry buffers too small for rendering. Please create an instance with a higher poly count.")},this.init(t)}}const Ml=new Int32Array([0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0]),Wo=new Int32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1,3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1,3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1,9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1,9,2,10,9,0,2,8,4,7,-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1,8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1,9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1,4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1,3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1,1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1,4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1,4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1,5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1,2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1,9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1,0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1,2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1,10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1,4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1,5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1,5,4,8,5,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1,1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1,10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1,8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1,2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1,2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1,11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,-1,9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1,5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1,11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1,11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1,1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1,9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1,5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1,2,3,11,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1,5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1,6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1,0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1,3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1,6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1,1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1,10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1,6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,-1,-1,-1,1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1,8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1,7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1,3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1,0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1,9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1,8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1,5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1,0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1,6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1,10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1,10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1,1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1,0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1,0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1,3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1,6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1,9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1,8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1,3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1,6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1,0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1,10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1,10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1,1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1,2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1,7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1,7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1,2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1,1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1,11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1,8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1,0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1,10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1,2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1,6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1,7,2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1,2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1,1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1,10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1,0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1,7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1,6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1,8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1,9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1,6,8,4,6,11,8,2,10,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1,4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1,10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1,8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1,1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1,8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1,10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1,4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1,10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,5,11,7,6,-1,-1,-1,-1,-1,-1,-1,5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1,9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1,6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1,7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1,3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1,7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1,3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1,6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1,9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1,1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1,4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,-1,7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1,6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1,3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1,0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1,6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1,0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1,11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1,6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1,5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1,9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1,1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1,1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1,10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1,0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1,5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1,10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1,11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1,9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1,7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1,2,5,10,2,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1,9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1,9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1,1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1,9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1,9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1,0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1,10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1,2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1,0,4,11,0,11,3,4,5,11,2,11,1,5,1,11,-1,0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1,9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1,5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1,3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1,5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1,8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1,0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1,9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1,1,10,11,1,11,4,1,4,0,7,4,11,-1,-1,-1,-1,3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1,4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1,9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1,11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1,2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1,9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1,3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1,1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1,4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1,0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1,3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1,0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1,9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1,1,10,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]),ce=(o,t,e,s,n,a,i)=>Math.sqrt((o-s)*(o-s)+(t-n)*(t-n)+(e-a)*(e-a))-i;function st(o,t,e,s,n,a,i,r,l){const c=o-s,h=t-n,f=e-a,p=Math.sqrt((c/i)**2+(h/r)**2+(f/l)**2),m=Math.sqrt((c/(i*i))**2+(h/(r*r))**2+(f/(l*l))**2);return m<1e-9?-Math.min(i,r,l):p*(p-1)/m}function rt(o,t,e,s,n,a,i,r,l,c,h){const f=o-s,p=t-n,m=e-a,u=i-s,g=r-n,x=l-a,M=Math.min(1,Math.max(0,(f*u+p*g+m*x)/(u*u+g*g+x*x))),d=f-u*M,v=p-g*M,w=m-x*M;return Math.sqrt(d*d+v*v+w*w)-(c+(h-c)*M)}function Je(o,t,e,s,n,a,i,r){const l=Math.sqrt((o-s)*(o-s)+(e-a)*(e-a))-i,c=t-n;return Math.sqrt(l*l+c*c)-r}function Jt(o,t,e,s,n,a,i,r,l,c=0){const h=Math.abs(o-s)-i+c,f=Math.abs(t-n)-r+c,p=Math.abs(e-a)-l+c,m=Math.max(h,0),u=Math.max(f,0),g=Math.max(p,0);return Math.sqrt(m*m+u*u+g*g)+Math.min(Math.max(h,f,p),0)-c}function U(o,t,e){const s=Math.max(e-Math.abs(o-t),0)/e;return Math.min(o,t)-s*s*e*.25}function Ot(o,t,e){const s=Math.max(e-Math.abs(o-t),0)/e;return Math.max(o,t)+s*s*e*.25}function Kt(o,t,e,s,n={}){const a=new wl(s,new yo,!1,!1,n.maxTris??9e4);a.isolation=0;const i=a.field,r=s/2,l=n.boundR!==void 0?n.boundR*n.boundR:1/0;let c=0;for(let u=0;u<s;u++){const g=t[2]+(u-r)/r*e;for(let x=0;x<s;x++){const M=t[1]+(x-r)/r*e;for(let d=0;d<s;d++){const v=t[0]+(d-r)/r*e,w=v-t[0],y=M-t[1],k=g-t[2];w*w+y*y+k*k>l?i[c++]=-1:i[c++]=-o(v,M,g)/e}}}a.update();const h=a.count,f=new Float32Array(h*3),p=new Float32Array(h*3);for(let u=0;u<h*3;u+=3){f[u]=t[0]+a.positionArray[u]*e,f[u+1]=t[1]+a.positionArray[u+1]*e,f[u+2]=t[2]+a.positionArray[u+2]*e;const g=a.normalArray[u],x=a.normalArray[u+1],M=a.normalArray[u+2],d=Math.sqrt(g*g+x*x+M*M)||1;p[u]=g/d,p[u+1]=x/d,p[u+2]=M/d}a.geometry.dispose();const m=new Gt;return m.setAttribute("position",new ct(f,3)),m.setAttribute("normal",new ct(p,3)),m}function Mo(o){const t=o.attributes.position.array,e=o.attributes.normal.array,s=t.length/3,n=new Float32Array(t.length),a=new Float32Array(e.length);for(let r=0;r<s;r+=3)for(let l=0;l<3;l++){const c=(r+l)*3,h=(r+(l===1?2:l===2?1:0))*3;n[h]=-t[c],n[h+1]=t[c+1],n[h+2]=t[c+2],a[h]=-e[c],a[h+1]=e[c+1],a[h+2]=e[c+2]}const i=new Gt;return i.setAttribute("position",new ct(n,3)),i.setAttribute("normal",new ct(a,3)),i}function yl(o){const t=o.attributes.position,e=new Float32Array(t.count*3),s=(n,a)=>Math.max(0,1-n/a)**1.5;for(let n=0;n<t.count;n++){const a=Math.abs(t.getX(n)),i=t.getY(n),r=t.getZ(n);let l=1,c=1,h=1;const f=(p,m,u,g)=>{l+=(m-l)*p,c+=(u-c)*p,h+=(g-h)*p};if(r>.06){const p=s(Math.sqrt((a/.024)**2+((i-.132)/.0105)**2),1);f(p*.52,.98,.77,.75),f(s(Math.hypot(a-.047,i-.158,r-.065),.034)*.24,1,.88,.86),f(s(Math.hypot(a-.034,(i-.2)*1.25,r-.075),.03)*.16,.91,.84,.82),f(s(Math.hypot(a-.034,i-.18,r-.075),.014)*.045,.97,.91,.91),f(s(Math.hypot(a-.0066,i-.15,r-.099),.009)*.35,.68,.53,.51),f(s(Math.hypot(a,i-.158,r-.108),.012)*.18,1,.88,.86)}e[n*3]=l,e[n*3+1]=c,e[n*3+2]=h}return o.setAttribute("color",new ct(e,3)),o}function ti(o=1){return yl(Kt((e,s,n)=>{const a=Math.abs(e);let i=st(a,s,n,0,.217,-.018,.074,.09,.098);return i=U(i,st(a,s,n,0,.187,.02,.06,.076,.068),.052),i=U(i,rt(a,s,n,.042,.15,-.014,0,.116,.059,.0115,.0105),.038),i=U(i,ce(a,s,n,0,.113,.06,.019),.03),i=U(i,ce(a,s,n,.048,.178,.043,.0145),.04),i=U(i,st(a,s,n,.04,.16,.045,.012,.014,.011),.04),i=U(i,rt(a,s,n,0,.212,.078,.046,.207,.069,.0115,.0105),.02),i=U(i,rt(a,s,n,0,.207,.081,0,.168,.092,.0065,.008),.018),i=U(i,ce(a,s,n,0,.16,.094,.009),.014),i=U(i,ce(a,s,n,.0095,.156,.091,.0065),.01),i=U(i,rt(a,s,n,0,.095,-.016,0,0,-.004,.037,.044),.04),i=U(i,ce(a,s,n,0,.07,.04,.0045),.012),i=U(i,st(a,s,n,.0775,.191,-.012,.0085,.034,.022),.012),i=U(i,rt(a,s,n,0,.1372,.0792,.019,.1338,.0725,.0055,.0045),.009),i=U(i,ce(a,s,n,.0042,.1376,.0805,.0036),.005),i=U(i,rt(a,s,n,0,.1222,.0765,.016,.1242,.0705,.006,.005),.009),i=Ot(i,-st(a,s,n,.034,.2,.083,.021,.016,.02),.012),i=Ot(i,-ce(a,s,n,.0066,.149,.097,.0042),.003),i=Ot(i,-st(a,s,n,0,.13,.082,.019,7e-4,.011),.002),i=Ot(i,-rt(a,s,n,.003,.148,.095,.003,.141,.09,9e-4,9e-4),.002),i=Ot(i,-rt(a,s,n,.022,.15,.078,.028,.128,.07,.0012,.001),.005),i=U(i,ce(a,s,n,.05,.15,-.012,.012),.04),i=U(i,rt(a,s,n,.044,.118,-.032,.02,0,.016,.014,.014),.04),i=Ot(i,-st(a,s,n,.085,.19,-.008,.008,.02,.011),.006),i=U(i,st(a,s,n,.034,.2135,.0745,.0165,.0065,.0115),.006),i=U(i,st(a,s,n,.034,.1865,.0745,.0155,.004,.01),.005),i},[0,.16,.02],.2,Math.max(24,Math.round(84*o)),{boundR:.26}))}function ei(o=1){const t=(s,n,a,i,r,l,c)=>{let h=1e9,f=0,p=-.082,m=i,u=0;const g=[r*.5,r*.32,r*.24],x=[l,l*.88,l*.78];for(let M=0;M<3;M++){u+=c*(M===0?.55:1);const d=f-Math.sin(u)*g[M],v=p-Math.cos(u)*g[M];h=Math.min(h,rt(s,n,a,f,p,m,d,v,m,x[M],x[Math.min(M+1,2)]*.96)),f=d,p=v}return h};return Kt((s,n,a)=>{let i=Jt(s,n,a,0,-.044,0,.014,.036,.036,.011);i=U(i,rt(s,n,a,0,.012,0,0,-.02,0,.021,.026),.02),i=U(i,st(s,n,a,-.004,-.032,.03,.014,.024,.013),.015);const r=.52;return i=U(i,t(s,n,a,.027,.074,.0088,r),.006),i=U(i,t(s,n,a,.009,.082,.0091,r+.03),.006),i=U(i,t(s,n,a,-.009,.076,.0086,r+.06),.006),i=U(i,t(s,n,a,-.026,.06,.0078,r+.1),.006),i=U(i,rt(s,n,a,-.004,-.04,.034,-.012,-.066,.046,.0108,.0092),.01),i=U(i,rt(s,n,a,-.012,-.066,.046,-.02,-.086,.05,.0092,.0078),.008),i},[-.02,-.07,.005],.1,Math.max(24,Math.round(64*o)),{boundR:.13})}function bl(o,t){return o===1?t:Mo(t)}function en(o,t,e){const s=Math.abs(o);let n=st(s,t,e,0,1.33,0,.143,.17,.096);n=U(n,st(s,t,e,.055,1.31,.028,.073,.061,.071),.055),n=U(n,st(s,t,e,0,1.14,0,.126,.17,.09),.075),n=U(n,st(s,t,e,0,.97,-.004,.145,.13,.104),.075),n=U(n,rt(s,t,e,.018,1.475,-.01,.145,1.355,-.002,.035,.04),.068),n=U(n,st(s,t,e,.145,1.35,0,.042,.056,.055),.052),n=U(n,rt(s,t,e,0,1.46,-.02,0,1.535,-.02,.061,.046),.065),n=U(n,Je(s,t,e,0,1.525,0,.074,.026),.02),n=U(n,Jt(s,t,e,.085,1.27,.094,.04,.03,.014,.006),.006),n=Ot(n,.88-t,.03),n=Ot(n,-rt(s,t,e,0,1.43,-.006,0,1.62,-.006,.058,.058),.014);const a=Math.atan2(e,o);return n+=(Math.sin(a*7+t*13)*.5+Math.sin(a*12-t*8+1.7)*.3)*(t<1.15?.0055:.0028),n}function oi(o=1){return Kt(en,[0,1.22,-.005],.5,Math.max(24,Math.round(92*o)),{boundR:.55,maxTris:16e4})}function Sl(){const o=(e,s,n)=>Math.abs(en(e,s,n)-.0075)-.0075;return Kt((e,s,n)=>{const a=Math.abs(e),i=Jt(a,s,n,.04,1.335,.058,.04,.006,.11,.003),r=Math.abs(s-1.045)-.017,l=Math.min(i,r);return Math.max(o(e,s,n),l)},[0,1.25,-.005],.4,100,{boundR:.46,maxTris:12e4})}function kl(){const o=(e,s,n)=>Math.abs(en(e,s,n)-.006)-.006;return Kt((e,s,n)=>Math.max(o(e,s,n),Jt(e,s,n,0,1.2,.12,.0055,.265,.1,.002)),[0,1.2,.08],.3,80,{boundR:.34,maxTris:4e4})}function si(o=1){return Kt((e,s,n)=>{let a=rt(e,s,n,0,0,0,0,-.28,0,.052,.044);a=U(a,ce(e,s,n,0,.005,0,.052),.024),a=U(a,st(e,s,n,.004,-.045,0,.052,.072,.053),.035),a=U(a,st(e,s,n,0,-.13,.011,.048,.09,.046),.03);const i=Math.atan2(n,e);return a+=(Math.sin(i*6+s*17)*.5+Math.sin(i*3-s*9)*.3)*.0028,a},[0,-.14,0],.23,Math.max(24,Math.round(60*o)),{boundR:.3})}function ni(o=1){return Kt((e,s,n)=>{let a=rt(e,s,n,0,0,0,0,-.255,0,.046,.039);a=U(a,st(e,s,n,0,-.07,.004,.05,.095,.046),.03),a=U(a,Je(e,s,n,0,-.246,0,.039,.0092),.01);const i=Math.atan2(n,e);return a+=(Math.sin(i*5+s*21)*.5+Math.sin(i*9-s*11)*.3)*.0026*(s>-.2?1:.4),a},[0,-.13,0],.21,Math.max(24,Math.round(56*o)),{boundR:.24})}function ai(o=1){return Kt((e,s,n)=>{let a=rt(e,s,n,0,0,0,0,-.42,0,.108,.074);a=U(a,st(e,s,n,0,-.16,.02,.1,.17,.095),.05),a=U(a,st(e,s,n,0,-.1,-.035,.092,.12,.085),.05);const i=Math.atan2(n,e);return a+=(Math.sin(i*6+s*15)*.5+Math.sin(i*3-s*8+2.1)*.35)*.0034,a+=Math.max(0,Math.sin(s*70+1.1))*.0018*(s<-.3?1:0),a},[0,-.2,0],.28,Math.max(24,Math.round(60*o)),{boundR:.34})}function ii(o=1){return Kt((e,s,n)=>{let a=rt(e,s,n,0,0,0,0,-.26,0,.074,.058);a=U(a,st(e,s,n,0,-.1,-.03,.06,.12,.06),.04),a=U(a,Je(e,s,n,0,-.232,0,.063,.014),.012),a=U(a,Je(e,s,n,0,-.215,0,.066,.012),.01);const i=Math.atan2(n,e);return a+=(Math.sin(i*5+s*19)*.5+Math.sin(i*8-s*9)*.3)*.0028,a},[0,-.13,0],.22,Math.max(24,Math.round(56*o)),{boundR:.26})}function ri(o=1){return Kt((e,s,n)=>{const a=Math.abs(e);let i=rt(a,s,n,0,-.17,0,0,-.39,.012,.06,.058);i=U(i,st(a,s,n,0,-.432,-.04,.046,.042,.048),.03),i=U(i,st(a,s,n,0,-.436,.03,.05,.04,.085),.03),i=U(i,st(a,s,n,0,-.446,.12,.051,.034,.062),.03),i=U(i,Je(a,s,n,0,-.285,0,.059,.011),.01);const r=Jt(a,s-Math.max(0,n-.11)*.18,n,0,-.468,.062,.06,.02,.148,.014);return i=U(i,r,.008),i+=Math.max(0,Math.sin(n*120))*.0012*(s<-.482?1:0),i},[0,-.36,.04],.24,Math.max(24,Math.round(80*o)),{boundR:.28})}function Gs(o=1,t="short"){const e=t==="long",s=h=>Math.min(1,Math.max(0,h)),n=[[-.052,.261,.064,-.058,.239,.084],[-.036,.265,.07,-.045,.234,.091],[-.019,.267,.073,-.023,.239,.094],[0,.267,.075,.007,.231,.095],[.02,.266,.071,.03,.238,.092],[.039,.263,.067,.05,.241,.086],[.053,.258,.062,.06,.244,.08]],r=Kt((h,f,p)=>{const m=Math.abs(h);let u=st(m,f,p,0,.221,-.018,.0855,.099,.106);u=U(u,st(m,f,p,0,.205,-.055,.078,.088,.07),.02),e&&(u=U(u,rt(m,f,p,0,.17,-.078,0,-.04,-.09,.072,.06),.05));const g=.262-.05*(m/.08)*(m/.08),x=s((p+.01)/.03);u=Ot(u,(g-f)*x-(1-x)*.5,.014),u=Ot(u,-st(m,f,p,.079,.191,-.012,.022,.044,.034),.01),u=Ot(u,(e?-.07:.158)-f,.014);for(const d of n)u=U(u,rt(h,f,p,d[0],d[1],d[2],d[3],d[4],d[5],.006,.0028),.005);const M=Math.atan2(h,p);return u+=.0012*Math.sin(M*80+Math.sin(f*45)*2.2),u},e?[0,.1,-.04]:[0,.19,-.015],e?.24:.15,Math.max(24,Math.round(80*o)),{boundR:e?.3:.2}),l=r.attributes.position,c=new Float32Array(l.count*3);for(let h=0;h<l.count;h++){const f=l.getX(h),p=l.getY(h),m=l.getZ(h),u=Math.atan2(f,m),g=Math.sin(u*70+Math.sin(p*45)*2.2)*.5+.5,x=Math.sin(u*9+p*22)*.5+.5,M=.55+g*.45+x*.25+Math.max(0,p-.28)*2.2;c[h*3]=.075*M,c[h*3+1]=.05*M,c[h*3+2]=.034*M}return r.setAttribute("color",new ct(c,3)),r}function Tl(o=1){return Kt((e,s,n)=>{const a=Math.abs(e);let i=Jt(a,s,n,0,1.3,-.165,.122,.182,.072,.05);return i=U(i,Jt(a,s,n,0,1.46,-.168,.116,.036,.08,.03),.012),i=U(i,Jt(a,s,n,0,1.425,-.092,.118,.012,.012,.006),.008),i=U(i,Jt(a,s,n,0,1.19,-.235,.095,.07,.024,.02),.012),i=U(i,rt(a,s,n,.14,1.14,-.165,.14,1.27,-.165,.03,.028),.01),i=U(i,rt(a,s,n,-.11,1.1,-.18,.11,1.1,-.18,.034,.034),.01),i+=.0016*Math.exp(-(((a-.07)/.003)**2))*(s>1.1?1:0),i=Ot(i,-Jt(a,s,n,0,1.2,-.285,.003,.07,.01,.001),.001),i},[0,1.25,-.17],.3,Math.max(24,Math.round(88*o)),{boundR:.4,maxTris:9e4})}const Al=`
varying vec3 vAvLoc;
varying mat3 vAvNM;
float avH(vec3 p) { p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float avN(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(avH(i), avH(i + vec3(1, 0, 0)), f.x), mix(avH(i + vec3(0, 1, 0)), avH(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(avH(i + vec3(0, 0, 1)), avH(i + vec3(1, 0, 1)), f.x), mix(avH(i + vec3(0, 1, 1)), avH(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
`,_l={fabric:{fine:260,mid:48,weave:1,bump:4e-4,tone:.06,rough:.1},leather:{fine:210,mid:34,weave:0,bump:.0012,tone:.1,rough:.16},skin:{fine:330,mid:70,weave:0,bump:22e-5,tone:.025,rough:.06},metal:{fine:420,mid:22,weave:0,bump:6e-4,tone:.1,rough:.12}};function Zt(o,t){const e=_l[t];return o.onBeforeCompile=s=>{s.vertexShader=`varying vec3 vAvLoc;
varying mat3 vAvNM;
`+s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vAvLoc = position;
 vAvNM = normalMatrix;`);const n=t==="metal"?`avN(vec3(p.x * ${e.fine.toFixed(1)}, p.y * 6.0, p.z * ${e.fine.toFixed(1)})) * 0.5 + avN(p * ${e.mid.toFixed(1)}) * 0.5`:`avN(p * ${e.mid.toFixed(1)}) * 0.55 + avN(p * ${e.fine.toFixed(1)}) * 0.45${e.weave?" + (sin(p.x * 520.0) * sin(p.y * 520.0) + sin(p.y * 520.0 + 1.0) * sin(p.z * 520.0)) * 0.12":""}`;s.fragmentShader=Al+`float avHeight(vec3 p) { return ${n}; }
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
         #include <opaque_fragment>`)},o.customProgramCacheKey=()=>`avatar-${t}-${o.vertexColors?"vc":"plain"}`,o.needsUpdate=!0,o}function Pl(){const o=(e,s,n=.02,a={})=>new at({color:e,roughness:s,metalness:n,...a});return{jacket:Zt(o(4147772,.84,0,{side:mt}),"fabric"),inner:Zt(o(15526626,.9,0,{side:mt}),"fabric"),trousers:Zt(o(3425628,.88),"fabric"),skin:Zt(o(14858392,.55,0,{emissive:3806728,emissiveIntensity:.05}),"skin"),skinFace:Zt(o(14858392,.5,0,{emissive:3806728,emissiveIntensity:.05,vertexColors:!0}),"skin"),leather:Zt(o(7030320,.62,.04),"leather"),leatherDark:Zt(o(4139549,.66,.04),"leather"),boot:Zt(o(7031344,.6,.05),"leather"),sole:o(1775637,.9),hair:new at({color:16777215,vertexColors:!0,roughness:.42,metalness:.15,side:mt}),brow:o(3811356,.7),trim:o(13214282,.4,.75,{emissive:5913096,emissiveIntensity:.18}),scarf:Zt(o(10238510,.9,0,{side:mt}),"fabric"),brass:Zt(o(11962940,.34,.85),"metal"),armor:Object.assign(new Le({color:1845043,roughness:.38,metalness:.6,clearcoat:.7,clearcoatRoughness:.25}),{}),eyeWhite:new Le({color:15986410,roughness:.22,clearcoat:.9,clearcoatRoughness:.08}),lip:o(10113096,.46),tunicVc:Zt(o(16777215,.84,0,{vertexColors:!0,side:mt}),"fabric"),paper:o(16769696,.5,0,{emissive:16753978,emissiveIntensity:1,transparent:!0,opacity:.92})}}class Po{constructor(){F(this,"b",new Ja)}add(t,e,s={}){this.b.add(t,e,s)}box(t,e,s,n,a={},i=.01){this.b.add(new Se(e,s,n,2,Math.min(i,e/2.05,s/2.05,n/2.05)),t,a)}cyl(t,e,s,n,a={},i=16){this.b.add(new Ct(e,s,n,i,1),t,a)}ball(t,e,s={},n=14){this.b.add(new xt(e,n,Math.max(8,n-4)),t,s)}torus(t,e,s,n={},a=Math.PI*2,i=22){this.b.add(new Dt(e,s,8,i,a),t,n)}build(t,e){this.b.build(t,e,{})}}function to(o,t,e){const s=new vt;return s.position.set(o,t,e),s}function Dl(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d"),s=Xt(77);e.fillStyle="#2a1a10",e.fillRect(0,0,256,256);const n=256/2,a=e.createRadialGradient(n,n,256*.08,n,n,256*.5);a.addColorStop(0,"#5a3a1f"),a.addColorStop(.55,"#8a5a2c"),a.addColorStop(.88,"#3a2412"),a.addColorStop(1,"#150c06"),e.fillStyle=a,e.beginPath(),e.arc(n,n,256*.5,0,Math.PI*2),e.fill();for(let r=0;r<220;r++){const l=s()*Math.PI*2,c=256*(.1+s()*.08),h=256*(.28+s()*.2);e.strokeStyle=`rgba(${s()>.5?"190,140,80":"60,36,18"},${.12+s()*.25})`,e.lineWidth=1+s()*1.4,e.beginPath(),e.moveTo(n+Math.cos(l)*c,n+Math.sin(l)*c),e.lineTo(n+Math.cos(l+(s()-.5)*.12)*h,n+Math.sin(l+(s()-.5)*.12)*h),e.stroke()}e.fillStyle="#060403",e.beginPath(),e.arc(n,n,256*.115,0,Math.PI*2),e.fill();const i=new Ma(t);return i.colorSpace=os,i}let Zn;function qn(o,t){const e=new Y(new xt(.0115,20,14),o.eyeWhite);e.position.set(t*.034,.2,.062),e.scale.set(1,.94,1),Zn??(Zn=Dl());const s=new vt;s.position.z=.0112;const n=new Y(new ss(.0072,28),new at({map:Zn,roughness:.28,metalness:0}));n.position.set(0,0,.002);const a=new Y(new xt(.0072,18,12,0,Math.PI*2,0,Math.PI*.5),new Le({color:16777215,roughness:.02,metalness:0,transparent:!0,opacity:.16,clearcoat:1,clearcoatRoughness:.02}));a.rotation.x=Math.PI/2,a.position.set(0,0,5e-4);const i=(h,f)=>new xt(.0139,22,10,0,Math.PI*2,h,f-h),r=new Y(i(0,Math.PI*.45),o.skin),l=new Y(i(Math.PI*.86,Math.PI),o.skin),c=new Y(new Dt(.0132,6e-4,4,18,Math.PI*.85),o.brow);return c.rotation.set(0,0,Math.PI*.075),c.position.set(0,0,0),c.scale.set(1,1,.5),c.rotation.x=-.38,c.position.set(0,.004,.0058),s.add(n,a),e.add(s,r,l,c),{eye:e,gaze:s}}function Rl(o,t){const e=to(0,1.5,0),s=new Y(ti(),o.skinFace);s.castShadow=!0,e.add(s);const n=qn(o,1),a=qn(o,-1),i=[];for(const p of[-1,1]){const m=new as([new C(p*.016,-.001,0),new C(p*.034,.004,.003),new C(p*.052,.002,0),new C(p*.062,-.005,-.006)]),u=new is(m,10,.0032,6,!1);u.scale(1,.7,.55),i.push(u)}const r=.2165,l=new Y(Yt(i.map(p=>{const m=p.toNonIndexed();return m.deleteAttribute("uv"),m})),o.brow);l.position.set(0,r,.0925),l.rotation.x=-.1;const c=.132,h=new Y(new Ns(.0026,.03,3,8),o.lip);h.rotation.z=Math.PI/2,h.scale.set(1,1,.6),h.position.set(0,c,.0875);const f=new Y(Gs(),o.hair);return f.castShadow=!0,e.add(n.eye,a.eye,l,h,f),t.eyeL=n.eye,t.eyeR=a.eye,t.gazeL=n.gaze,t.gazeR=a.gaze,t.brow=l,t.mouth=h,{head:e,browY:r,mouthY:c}}let ht={};function Qn(o,t){const e=new vt;ht.upper??(ht.upper=si()),ht.lower??(ht.lower=ni()),ht.hand??(ht.hand=ei());const s=c=>t===1?c:Mo(c),n=new Y(s(ht.upper),o.jacket);n.castShadow=!0,e.add(n);const a=to(0,-.28,0);a.rotation.x=-.22,e.add(a),e.userData.elbow=a;const i=new Y(s(ht.lower),o.jacket);i.castShadow=!0,a.add(i);const r=to(0,-.27,0);r.rotation.z=t*.04;const l=new Y(bl(t,ht.hand),o.skin);if(l.castShadow=!0,r.add(l),t===1){const c=new Po;c.box(o.leatherDark,.026,.155,.115,{x:-.044,y:-.108,z:.02,rz:-.06},.006),c.box(o.inner,.016,.146,.104,{x:-.034,y:-.108,z:.02,rz:-.06},.003),c.box(o.brass,.03,.15,.008,{x:-.044,y:-.108,z:-.036,rz:-.06},.003),c.build(r,"notebook")}return a.add(r),e}function Jn(o,t){const e=new vt;ht.thigh??(ht.thigh=ai()),ht.shin??(ht.shin=ii()),ht.boot??(ht.boot=ri());const s=new Y(ht.thigh.clone(),o.trousers);s.castShadow=!0,e.add(s);const n=to(0,-.42,0);e.add(n);const a=new Y(ht.shin.clone(),o.trousers);a.castShadow=!0,n.add(a);const i=to(0,-.43,0);n.add(i);const r=ht.boot.clone();r.translate(0,.43,0);const l=new Y(r,o.boot);l.castShadow=!0,i.add(l);const c=new Po;for(let h=0;h<5;h++)c.box(o.inner,.056,.005,.005,{y:.032-h*.002,z:.052+h*.016,rx:-.4},.002),c.ball(o.brass,.0036,{x:.03,y:.035-h*.002,z:.052+h*.016},6),c.ball(o.brass,.0036,{x:-.03,y:.035-h*.002,z:.052+h*.016},6);return c.build(i,"laces"),{hip:e,knee:n,ankle:i}}function Cl(o){const t=new Y(oi(),o.jacket);return t.castShadow=!0,t}function El(o){const t=new Po;t.box(o.trousers,.35,.2,.21,{y:.97},.06),t.box(o.brass,.034,.028,.012,{y:1.04,z:.14},.004),t.torus(o.jacket,.085,.024,{y:1.51,rx:Math.PI/2,sx:1.06},Math.PI*2,26),t.torus(o.inner,.078,.014,{y:1.532,rx:Math.PI/2},Math.PI*2,26);for(const e of[-1,1])t.ball(o.brass,.0048,{x:e*.085,y:1.262,z:.112},6);return t.torus(o.scarf,.074,.032,{y:1.54,rx:Math.PI/2},Math.PI*2,26),t.torus(o.scarf,.082,.026,{y:1.51,rx:Math.PI/2-.12},Math.PI*2,26),t.ball(o.scarf,.044,{x:-.056,y:1.5,z:.075,sy:1.1,sz:.9},12),t}function zl(o){const t=to(.07,1.48,-.08),e=new At(.15,.52,3,10);e.translate(0,-.26,0);const s=e.attributes.position;for(let i=0;i<s.count;i++){const r=s.getX(i),l=s.getY(i);s.setZ(i,Math.sin(r*60+l*8)*.008*(1+-l*1.5)- -l*.03)}e.computeVertexNormals();const n=new Y(e,o.scarf);n.castShadow=!0;const a=new Po;for(let i=0;i<8;i++)a.cyl(o.scarf,.0016,.0016,.035,{x:-.066+i*.019,y:-.54,z:-.018},4);return a.build(t,"scarf-fringe"),t.add(n),t.rotation.x=.16,t}function Nl(o){const t=new vt,e=new Po;e.cyl(o.paper,.046,.04,.1,{y:0},6),e.cyl(o.brass,.06,.05,.016,{y:.058},6),e.add(new eo(.066,.05,6),o.brass,{y:.09}),e.cyl(o.brass,.05,.05,.014,{y:-.057},6);for(let n=0;n<6;n++){const a=n/6*Math.PI*2;e.cyl(o.brass,.0022,.0022,.1,{x:Math.cos(a)*.045,y:0,z:Math.sin(a)*.045},4)}e.torus(o.brass,.034,.0035,{y:.108},Math.PI,12),e.ball(o.brass,.008,{y:.122},8),e.build(t,"lantern");const s=new ba(16757575,1.2,10);return t.add(s),t}function T1(o){const t=new vt;t.name="Explorer";const e=Pl(),s=new vt;s.position.y=.98;const n=new vt;n.position.y=-.98,s.add(n),t.add(s),n.add(Cl(e));const a=new Y(Sl(),e.leatherDark);a.castShadow=!0;const i=new Y(kl(),e.brass),r=new Y(Tl(),e.leather);r.castShadow=!0,n.add(a,i,r),El(e).build(n,"torso");const l={},{head:c,browY:h,mouthY:f}=Rl(e,l);c.position.y-=.98,s.add(c);const p=zl(e);p.position.y-=.98,s.add(p);const m=Jn(e);m.hip.position.set(.09,.91,0);const u=Jn(e);u.hip.position.set(-.09,.91,0),t.add(m.hip,u.hip);const g=Qn(e,1);g.position.set(.166,1.405-.98,0);const x=Qn(e,-1);x.position.set(-.166,1.405-.98,0),g.rotation.z=.035,x.rotation.z=-.035,s.add(g,x);const M=Nl(e);M.name="ExplorerLantern",M.position.set(0,-.69,.1),x.add(M);const d=new Y(new ya(.5,.64,36),new yo({color:9684477,transparent:!0,opacity:.22,side:mt}));d.rotation.x=-Math.PI/2,d.position.y=.03,d.userData.isFootRing=!0,t.add(d);const v={leftLeg:m,rightLeg:u,spine:s,leftArm:g,rightArm:x,head:c,cape:p,eyeL:l.eyeL,eyeR:l.eyeR,gazeL:l.gazeL,gazeR:l.gazeR,brow:l.brow,mouth:l.mouth,faceRest:{browY:h,mouthY:f},mats:{jacket:e.jacket,trim:e.trim,cape:e.scarf}};return t.userData.rig=v,Aa(t,{body:v.spine,bodyRestY:.98,head:v.head,leftArm:v.leftArm,rightArm:v.rightArm,leftElbow:v.leftArm.userData.elbow,rightElbow:v.rightArm.userData.elbow,leftHip:v.leftLeg.hip,rightHip:v.rightLeg.hip,leftKnee:v.leftLeg.knee,rightKnee:v.rightLeg.knee,leftAnkle:v.leftLeg.ankle,rightAnkle:v.rightLeg.ankle,blinkLeft:()=>1-v.eyeL.scale.y,blinkRight:()=>1-v.eyeR.scale.y,mouthOpen:()=>Math.max(0,v.mouth.scale.y-1)*.15,smile:()=>Math.max(0,v.mouth.scale.x-1)*.6,gazeX:()=>v.gazeL.position.x*80,gazeY:()=>v.gazeL.position.y*80},"male",{model:o}),t}function li(o){return[{off:-o-.55,lift:-.04,tone:.55},{off:-o-.18,lift:.1,tone:.78},{off:-o,lift:.17,tone:.95},{off:-o*.7,lift:.09,tone:1},{off:0,lift:.13,tone:1.06},{off:o*.7,lift:.09,tone:1},{off:o,lift:.17,tone:.95},{off:o+.18,lift:.1,tone:.78},{off:o+.55,lift:-.04,tone:.55}]}function Fl(o,t){const e=li(t);if(o<=e[0].off)return e[0].lift;for(let s=1;s<e.length;s++)if(o<=e[s].off){const n=e[s-1],a=e[s],i=(o-n.off)/(a.off-n.off||1);return n.lift+(a.lift-n.lift)*i}return e[e.length-1].lift}function A1(o,t){const e=new vt;e.name="road";const s=t.width/2,n=new W(t.base),a=li(s),i=a.length,r=[],l=[],c=[],h=new C,f=new C,p=new W,m=new W(5208632);for(let M=0;M<=t.steps;M++){const d=M/t.steps;o.getPoint(d,h),o.getTangent(d,f);const v=-f.z,w=f.x,y=Math.hypot(v,w)||1;for(let k=0;k<i;k++){const{off:A,lift:S,tone:T}=a[k],b=h.x+v/y*A,_=h.z+w/y*A;r.push(b,t.groundY(b,_)+S,_);const P=.88+.24*hn(b*1.7,_*1.7,2);p.copy(n).multiplyScalar(T*P);const D=1-.14*Math.exp(-Math.pow((Math.abs(A)-s*.5)/(s*.18),2));if(p.multiplyScalar(D),Math.abs(A)>s){const R=.4+.5*hn(b*.9+40,_*.9+12,2);p.lerp(m,Math.min(.95,R*((Math.abs(A)-s)/.55+.35)))}l.push(p.r,p.g,p.b)}if(M>0){const k=M*i,A=(M-1)*i;for(let S=0;S<i-1;S++)c.push(A+S,k+S,A+S+1,A+S+1,k+S,k+S+1)}}const u=new Gt;u.setAttribute("position",new gt(r,3)),u.setAttribute("color",new gt(l,3)),u.setIndex(c),u.computeVertexNormals();const g=new at({color:16777215,vertexColors:!0,roughness:.96,metalness:.02,side:mt});pr(g);const x=new Y(u,g);if(x.receiveShadow=!0,e.add(x),t.inlay){const M=[],d=[];for(let k=0;k<=t.steps;k++){const A=k/t.steps;o.getPoint(A,h),o.getTangent(A,f);const S=-f.z,T=f.x,b=Math.hypot(S,T)||1;for(const _ of[-.09,.09]){const P=h.x+S/b*_,D=h.z+T/b*_;M.push(P,t.groundY(P,D)+.17,D)}if(k>0){const _=k*2,P=(k-1)*2;d.push(P,_,P+1,P+1,_,_+1)}}const v=new Gt;v.setAttribute("position",new gt(M,3)),v.setIndex(d),v.computeVertexNormals();const w=new at({color:t.inlay.color,emissive:t.inlay.emissive,emissiveIntensity:t.inlay.intensity,roughness:.4,side:mt}),y=new Y(v,w);y.userData.noShadow=!0,e.add(y)}return e}const Ps=[.02,.04],Il=.1;function ci(o){let t=0;for(let e=0;e<o.length;e++){const[s,n]=o[e],[a,i]=o[(e+1)%o.length];t+=s*i-a*n}return t*.5}function hi(o,t,e,s){const n=[];for(let a=0;a<o.length;a++){const i=o[a],r=o[(a+1)%o.length],l=t*i[0]+e*i[1]-s,c=t*r[0]+e*r[1]-s;if(l<=0&&n.push(i),l<0&&c>0||l>0&&c<0){const h=l/(l-c);n.push([i[0]+(r[0]-i[0])*h,i[1]+(r[1]-i[1])*h])}}return n}function Ll(o,t){let e=o;const s=o.length;for(let n=0;n<s&&e.length>=3;n++){const a=o[n],i=o[(n+1)%s],r=i[0]-a[0],l=i[1]-a[1],c=Math.hypot(r,l);if(c<1e-6)continue;const h=l/c,f=-r/c;e=hi(e,h,f,h*a[0]+f*a[1]-t)}return e}function ta(o,t=1e-5){const e=[];for(const s of o){const n=e[e.length-1];(!n||Math.hypot(s[0]-n[0],s[1]-n[1])>t)&&e.push(s)}for(;e.length>1&&Math.hypot(e[0][0]-e[e.length-1][0],e[0][1]-e[e.length-1][1])<=t;)e.pop();return e}function Ul(o){const t=o.slice();for(;t.length>8;){let e=0,s=1/0;for(let n=0;n<t.length;n++){const a=t[(n+t.length-1)%t.length],i=t[n],r=t[(n+1)%t.length],l=Math.abs((i[0]-a[0])*(r[1]-a[1])-(r[0]-a[0])*(i[1]-a[1]));l<s&&(s=l,e=n)}t.splice(e,1)}for(;t.length<5;){let e=0,s=-1;for(let c=0;c<t.length;c++){const h=t[c],f=t[(c+1)%t.length],p=Math.hypot(f[0]-h[0],f[1]-h[1]);p>s&&(s=p,e=c)}const n=t[e],a=t[(e+1)%t.length],i=a[0]-n[0],r=a[1]-n[1],l=Math.hypot(i,r)||1;t.splice(e+1,0,[(n[0]+a[0])/2+r/l*.003,(n[1]+a[1])/2-i/l*.003])}return t}function Ol(o){const t=[o[0].x],e=[o[0].z],s=[0];for(let l=1;l<o.length;l++){const c=Math.hypot(o[l].x-o[l-1].x,o[l].z-o[l-1].z);c<1e-6||(t.push(o[l].x),e.push(o[l].z),s.push(s[s.length-1]+c))}const n=s[s.length-1],a=t.length,i=[],r=[];for(let l=0;l<a;l++){const c=Math.max(0,l-1),h=Math.min(a-1,l+1),f=t[h]-t[c],p=e[h]-e[c],m=Math.hypot(f,p)||1;i.push(f/m),r.push(p/m)}return{length:n,at(l){const c=Math.min(n,Math.max(0,l));let h=0,f=a-1;for(;f-h>1;){const M=h+f>>1;s[M]<=c?h=M:f=M}const p=Math.max(1e-9,s[f]-s[h]),m=(c-s[h])/p;let u=i[h]+(i[f]-i[h])*m,g=r[h]+(r[f]-r[h])*m;const x=Math.hypot(u,g)||1;return u/=x,g/=x,{x:t[h]+(t[f]-t[h])*m,z:e[h]+(e[f]-e[h])*m,tx:u,tz:g}}}}function ea(o,t,e){const s=o.at(t);return[s.x-s.tz*e,s.z+s.tx*e]}function Gl(o,t,e,s=0,n=o){const a=Xt(Math.floor(e)*2654435+91),i=Math.max(2,Math.round(t/.82)),r=t/i,l=r*1.3,c=t/2,h=Math.floor(s/l)-1,f=Math.ceil(n/l)+1,p=[];for(let u=h;u<=f;u++)for(let g=0;g<i;g++)p.push({s:(u+.5+.5*(g&1))*l+(a()-.5)*.6*l,t:-c+(g+.5)*r+(a()-.5)*.6*r});const m=[];for(let u=0;u<p.length;u++){const g=p[u],x=-c+a()*.1,M=c-a()*.1,d=a()<.04,v=Ps[0]+a()*(Ps[1]-Ps[0]),w=a();if(g.s<s-l||g.s>n+l)continue;let y=[[Math.max(s,g.s-2*l),x],[Math.min(n,g.s+2*l),x],[Math.min(n,g.s+2*l),M],[Math.max(s,g.s-2*l),M]];if(y[0][0]>=y[1][0])continue;const k=Math.max(0,u-4*i),A=Math.min(p.length,u+4*i+1);for(let _=k;_<A&&y.length>=3;_++){if(_===u)continue;const P=p[_];if(Math.abs(P.s-g.s)>2.6*l||Math.abs(P.t-g.t)>2.6*r)continue;const D=P.s-g.s,R=P.t-g.t,E=(P.s+g.s)/2,z=(P.t+g.t)/2;y=hi(y,D,R,D*E+R*z)}if(y.length<3||d||(y=ta(y),y.length<3)||(y=ta(Ll(y,v)),y.length<3)||ci(y)<Il)continue;y=Ul(y);let T=0,b=0;for(const _ of y)T+=_[0],b+=_[1];m.push({poly:y,cs:T/y.length,ct:b/y.length,tone:w})}return m}function _1(o,t=6){if(o.length<3)return o.map(s=>({x:s.x,z:s.z}));const e=[{x:o[0].x,z:o[0].z}];for(let s=1;s<o.length-1;s++){const n=o[s-1],a=o[s],i=o[s+1],r=Math.hypot(a.x-n.x,a.z-n.z)||1,l=Math.hypot(i.x-a.x,i.z-a.z)||1,c=Math.min(t,r*.45),h=Math.min(t,l*.45);e.push({x:a.x+(n.x-a.x)/r*c,z:a.z+(n.z-a.z)/r*c},{x:a.x,z:a.z},{x:a.x+(i.x-a.x)/l*h,z:a.z+(i.z-a.z)/l*h})}return e.push({x:o[o.length-1].x,z:o[o.length-1].z}),e}const Bl=[13094096,13619146,14208703,12897224],Wl=[8095636,7502984,6910847,7700618],Vl=new W(5202741),Ht=.7;function oa(o,t,e,s,n,a,i,r){const l=t.length;let c=0,h=0;for(const T of t)c+=T[0],h+=T[1];c/=l,h/=l;const f=[];for(let T=0;T<l;T++){const[b,_]=t[T];f.push(s(b,_)+n(e[T])+(Qi(b*2.1+3,_*2.1)-.5)*.02)}const p=f.reduce((T,b)=>T+b,0)/l,m=new W(a[Math.min(a.length-1,Math.floor(i.tone*a.length))]),u=new W(a[Math.min(a.length-1,Math.floor(i.tone*a.length)+1)%a.length]);m.lerp(u,i.tone*a.length%1),m.multiplyScalar(.84+r()*.26);const g=new W,x=(T,b,_,P,D,R,E)=>(g.copy(m).multiplyScalar(E).lerp(Vl,R),o.pos.push(T,b,_),o.col.push(g.r,g.g,g.b),o.uv.push(P,D),o.pos.length/3-1),M=t.map(([T,b])=>{const _=T-c,P=b-h,D=Math.hypot(_,P)||1,R=Math.min(i.bevel,D*.35)/D;return[T-_*R,b-P*R]}),d=x(c,p+.008,h,c*Ht,h*Ht,0,1.04),v=[];for(let T=0;T<l;T++){const b=.93+r()*.07;v.push(x(M[T][0],f[T],M[T][1],M[T][0]*Ht,M[T][1]*Ht,i.mossy*.25*r(),b))}for(let T=0;T<l;T++)o.idx.push(d,v[(T+1)%l],v[T]);const w=[],y=[];for(let T=0;T<l;T++)w.push(x(M[T][0],f[T],M[T][1],M[T][0]*Ht,M[T][1]*Ht,i.mossy*.25,.94)),y.push(x(t[T][0],f[T]-i.drop-r()*.006,t[T][1],t[T][0]*Ht,t[T][1]*Ht,i.mossy*.55*(.5+r()),.8));const k=[],A=[];let S=0;for(let T=0;T<l;T++){const[b,_]=t[T],P=t[(T+l-1)%l];S+=Math.hypot(b-P[0],_-P[1]);const D=f[T]-i.drop,R=Math.min(D-i.thickness+i.drop,s(b,_)-.06);k.push(x(b,D,_,S*Ht,D*Ht,i.mossy*.7,.72)),A.push(x(b,R,_,S*Ht,R*Ht,i.mossy*.9,.45))}for(let T=0;T<l;T++){const b=(T+1)%l;o.idx.push(w[T],w[b],y[T],w[b],y[b],y[T]),o.idx.push(k[T],k[b],A[T],k[b],A[b],A[T])}}function Hl(o,t,e,s){const n=5+Math.floor(s()*2),a=s()*6.28,i=.85+s()*.5,r=[];for(let l=0;l<n;l++){const c=a+l/n*Math.PI*2+(s()-.5)*.4,h=e*(.75+s()*.5);r.push([o+Math.cos(c)*h*i,t+Math.sin(c)*h])}return r}function jl(o,t){const e=new vt;e.name="flagstone-path";const s={pos:[],col:[],uv:[],idx:[]},n=t.width/2,a=t.lift??(h=>Fl(h,n)+.05),i=t.palette==="unit"?Wl:Bl,r=t.quality==="high"?1.2:t.quality==="med"?.7:.3;if(o.forEach((h,f)=>{if(h.length<2)return;const p=Ol(h),m=t.startInset??0,u=p.length-(t.endInset??0);if(u-m<1)return;const g=t.seed+f*977,x=Xt(g*31+7);for(const d of Gl(p.length,t.width,g,m,u)){const v=d.poly.map(([y,k])=>ea(p,y,k)),w=d.poly.map(([,y])=>y);ci(v)<0&&(v.reverse(),w.reverse()),oa(s,v,w,t.groundY,a,i,{thickness:.08+x()*.04,bevel:.022+x()*.012,drop:.02+x()*.01,tone:d.tone,mossy:x()<.4?.3+x()*.7:x()*.25},x)}const M=Math.floor((u-m)*r);for(let d=0;d<M;d++){const v=d&1?1:-1,w=m+x()*(u-m),y=v*(n-.15+Math.pow(x(),1.6)*.75),[k,A]=ea(p,w,y),S=.045+x()*x()*.12,T=Hl(k,A,S,x);oa(s,T,T.map(()=>y),t.groundY,b=>Math.max(.012,a(b)-.04),i,{thickness:.05,bevel:Math.min(.015,S*.3),drop:.012,tone:x(),mossy:x()*.6},x)}}),s.idx.length===0)return e;const l=new Gt;l.setAttribute("position",new gt(s.pos,3)),l.setAttribute("color",new gt(s.col,3)),l.setAttribute("uv",new gt(s.uv,2)),l.setIndex(new ct(s.pos.length/3>65535?new Uint32Array(s.idx):new Uint16Array(s.idx),1)),l.computeVertexNormals(),l.computeBoundingSphere();const c=new Y(l,Xr());return c.name="flagstones",c.receiveShadow=!0,c.castShadow=!1,e.add(c),e}function P1(o,t){const e=o.getLength(),s=o.getSpacedPoints(Math.max(4,Math.ceil(e/.5))).map(n=>({x:n.x,z:n.z}));return jl([s],t)}class D1{constructor(t){F(this,"ratio");F(this,"avgMs",16.7);F(this,"max");F(this,"min");F(this,"step");F(this,"high");F(this,"low");F(this,"hold");F(this,"slow",0);F(this,"fast",0);F(this,"cooldown",0);F(this,"clock",0);F(this,"lastRaiseAt",-1/0);F(this,"ceiling",1/0);F(this,"ceilingUntil",0);this.max=t.max,this.min=Math.min(t.min??.75,t.max),this.step=t.step??.25,this.high=t.high??18,this.low=t.low??12,this.hold=t.hold??2,this.ratio=Math.min(t.max,Math.max(this.min,t.initial??t.max))}setMax(t){this.max=t,this.ratio>t&&(this.ratio=t)}push(t,e){if(!(t>0)||t>300||!(e>0)||e>.5)return null;if(this.clock+=e,this.avgMs+=(t-this.avgMs)*(1-Math.exp(-e/.35)),this.cooldown>0)return this.cooldown-=e,this.slow=this.fast=0,null;if(this.avgMs>this.high?(this.slow+=e,this.fast=0):this.avgMs<this.low?(this.fast+=e,this.slow=0):this.slow=this.fast=0,this.slow>=this.hold&&this.ratio>this.min+1e-6){const n=Math.max(this.min,this.ratio-this.step);return this.clock-this.lastRaiseAt<12&&(this.ceiling=n,this.ceilingUntil=this.clock+30),this.apply(n)}const s=this.clock<this.ceilingUntil?Math.min(this.max,this.ceiling):this.max;return this.fast>=this.hold&&this.ratio<s-1e-6?(this.lastRaiseAt=this.clock,this.apply(Math.min(s,this.ratio+this.step))):null}apply(t){return this.ratio=t,this.slow=this.fast=0,this.cooldown=this.hold,t}}function $l(o){const t=o.filter(s=>Number.isFinite(s)&&s>0&&s<250).sort((s,n)=>s-n),e=t.length;return{count:e,meanMs:e?t.reduce((s,n)=>s+n,0)/e:0,medianMs:e?t[Math.floor((e-1)*.5)]:0,p95Ms:e?t[Math.ceil(e*.95)-1]:0}}function R1(){if(typeof window>"u")return!1;if(Ee().showStats)return!0;try{return new URLSearchParams(window.location.search).get("perf")==="1"}catch{return!1}}function C1(o,t,e){const s=document.createElement("div");s.setAttribute("data-perf-overlay",""),s.style.cssText="position:absolute;left:8px;bottom:8px;z-index:9999;padding:6px 8px;border-radius:6px;background:rgba(6,14,24,.72);color:#9fe8ff;font:11px/1.45 ui-monospace,monospace;pointer-events:none;white-space:pre",t.appendChild(s),o.info.autoReset=!1;const n=[];let a=0,i=0;const r=()=>({...$l(n),width:o.domElement.width,height:o.domElement.height,pixelRatio:o.getPixelRatio(),calls:a,triangles:i});let l=0,c=0,h=0;return{update(f){if(f>0&&f<250&&(n.push(f),n.length>600&&n.shift()),a=o.info.render.calls,i=o.info.render.triangles,c++,h+=f,l+=f,l>=250){const p=h/c,m=o.info.render;s.textContent=`${(1e3/Math.max(.1,p)).toFixed(0)} fps  ${p.toFixed(1)} ms
calls ${Math.round(m.calls)}  tris ${Math.round(m.triangles)}
ratio ${o.getPixelRatio().toFixed(2)}${e?`  avg ${e.avgMs.toFixed(1)} ms`:""}
${o.domElement.width}×${o.domElement.height}  p95 ${r().p95Ms.toFixed(1)} ms`,l=0,c=0,h=0}o.info.reset()},snapshot:r,reset(){n.length=0},setScaler(f){e=f},dispose(){o.info.autoReset=!0,s.remove()}}}const Xl=["clear","overcast","lightRain","heavyRain","drizzleMist","snow","windGusts","dusk","night"];function E1(o){return typeof o=="string"&&Xl.includes(o)}const Yl=["cloud","sunMul","hemiMul","envMul","exposureMul","fogMul","skyGrey","skyDark","sunTintR","sunTintG","sunTintB","skyTintR","skyTintG","skyTintB","skyTintAmt","rain","snow","mist","wind","gust","wetTarget"],le=o=>({cloud:.12,sunMul:1,hemiMul:1,envMul:1,exposureMul:1,fogMul:1,skyGrey:0,skyDark:1,sunTintR:1,sunTintG:1,sunTintB:1,skyTintR:.5,skyTintG:.5,skyTintB:.5,skyTintAmt:0,rain:0,snow:0,mist:0,wind:.25,gust:.15,wetTarget:0,...o}),Ds={clear:le({}),overcast:le({cloud:.85,sunMul:.35,hemiMul:.95,envMul:.85,fogMul:1.25,skyGrey:.55,skyDark:.82,sunTintR:.94,sunTintG:.97,sunTintB:1,wind:.35,gust:.25}),lightRain:le({cloud:.92,sunMul:.22,hemiMul:.85,envMul:.8,exposureMul:1.02,fogMul:1.5,skyGrey:.66,skyDark:.72,sunTintR:.9,sunTintG:.95,sunTintB:1,rain:.45,wind:.4,gust:.3,wetTarget:.7}),heavyRain:le({cloud:1,sunMul:.1,hemiMul:.7,envMul:.65,exposureMul:1.06,fogMul:2.1,skyGrey:.8,skyDark:.55,sunTintR:.86,sunTintG:.92,sunTintB:1,rain:1,wind:.7,gust:.6,wetTarget:1}),drizzleMist:le({cloud:.8,sunMul:.28,hemiMul:.9,envMul:.85,fogMul:2.8,skyGrey:.6,skyDark:.85,sunTintR:.94,sunTintG:.98,sunTintB:1,rain:.16,mist:1,wind:.12,gust:.08,wetTarget:.5}),snow:le({cloud:.9,sunMul:.3,hemiMul:1,envMul:1,exposureMul:1.05,fogMul:1.8,skyGrey:.5,skyDark:.9,sunTintR:.95,sunTintG:.98,sunTintB:1.05,snow:.8,wind:.3,gust:.2,wetTarget:.2}),windGusts:le({cloud:.45,sunMul:.8,skyGrey:.15,wind:.85,gust:1}),dusk:le({cloud:.4,sunMul:.55,hemiMul:.72,envMul:.7,exposureMul:.97,fogMul:1.2,skyDark:.78,sunTintR:1,sunTintG:.72,sunTintB:.82,skyTintR:.78,skyTintG:.5,skyTintB:.68,skyTintAmt:.38,wind:.2,gust:.1}),night:le({cloud:.3,sunMul:.08,hemiMul:.38,envMul:.32,exposureMul:1.15,fogMul:1.3,skyDark:.14,sunTintR:.55,sunTintG:.7,sunTintB:1.15,skyTintR:.05,skyTintG:.1,skyTintB:.24,skyTintAmt:.86,wind:.18,gust:.1})},Kl={high:1.5,med:1,low:.5},Zl=2e3,ql=1200,Ql=160;function Jl(o){const t=Kl[o];return{drops:Math.floor(Zl*t),flakes:Math.floor(ql*t),splashes:Math.floor(Ql*t)}}const sa=(o,t)=>1-Math.exp(-Math.max(0,o)*t);class z1{constructor(t="clear"){F(this,"kind");F(this,"target");F(this,"params");F(this,"wet",0);F(this,"rate",1);F(this,"transitioning",!1);F(this,"version",0);this.kind=this.target=t,this.params={...Ds[t]},this.wet=this.params.wetTarget}set(t,e=4){if(!(t===this.target&&!(e<=0&&this.transitioning))){if(this.target=t,this.kind=t,this.version++,e<=0){Object.assign(this.params,Ds[t]),this.wet=this.params.wetTarget,this.transitioning=!1,this.rate=1;return}this.rate=4/e,this.transitioning=!0}}update(t){if(t<=0)return;const e=Ds[this.target],s=this.params,n=sa(t,this.rate);let a=0;for(const r of Yl){let l=e[r];(r==="snow"&&l>0&&s.rain>.02||r==="rain"&&l>0&&s.snow>.02)&&(l=0);const c=(r==="rain"||r==="snow")&&l<s[r]?Math.min(1,n*1.6):n;s[r]+=(l-s[r])*c,a=Math.max(a,Math.abs(e[r]-s[r]))}this.transitioning&&a<.004&&(Object.assign(s,e),this.transitioning=!1);const i=sa(t,s.wetTarget>this.wet?.25:.05);this.wet+=(s.wetTarget-this.wet)*i}windNow(t){const e=Math.max(0,Math.sin(t*.31)*Math.sin(t*.83+1.7));return this.params.wind+this.params.gust*e*e*1.6}get precipitating(){return this.params.rain>.01||this.params.snow>.01}}function N1(o){return .75+Math.min(1.4,o)*1.1}function F1(o,t,e,s=1){const n=1-(1-t.skyDark)*s;let a=o.r*n,i=o.g*n,r=o.b*n;const l=a*.2126+i*.7152+r*.0722,c=t.skyGrey*s;a+=(l-a)*c,i+=(l-i)*c,r+=(l-r)*c;const h=t.skyTintAmt*s,f=Math.max(.05,t.skyTintR*.2126+t.skyTintG*.7152+t.skyTintB*.0722),p=Math.max(l,.02)/f;return e.r=a+(Math.min(1,t.skyTintR*p)-a)*h,e.g=i+(Math.min(1,t.skyTintG*p)-i)*h,e.b=r+(Math.min(1,t.skyTintB*p)-r)*h,e}const I1={unit01:"clear",unit02:"overcast",unit03:"drizzleMist",unit04:"windGusts",unit05:"night",unit06:"lightRain"};class tc{constructor(t,e=44,s=32){F(this,"texture");F(this,"box",new ke(0,0,1,1));F(this,"lastX",1/0);F(this,"lastZ",1/0);this.sample=t,this.span=e,this.size=s,this.texture=new Oe(new Uint16Array(s*s),s,s,wa,It),this.texture.minFilter=this.texture.magFilter=Ie,this.texture.generateMipmaps=!1}update(t,e){const s=Math.round(t/2)*2,n=Math.round(e/2)*2;if(s===this.lastX&&n===this.lastZ)return!1;this.lastX=s,this.lastZ=n;const a=s-this.span/2,i=n-this.span/2;this.box.set(a,i,1/this.span,1/this.span);const r=this.texture.image.data;for(let l=0;l<this.size;l++)for(let c=0;c<this.size;c++)r[l*this.size+c]=xa.toHalfFloat(this.sample(a+(c+.5)/this.size*this.span,i+(l+.5)/this.size*this.span));return this.texture.needsUpdate=!0,!0}dispose(){this.texture.dispose()}}const ec=new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0]),oc=new Float32Array([0,0,1,0,1,1,0,1]),sc=[0,1,2,0,2,3];function Rs(o,t){const e=new Ji;e.setAttribute("position",new ct(ec,3)),e.setAttribute("uv",new ct(oc,2)),e.setIndex(sc);const s=new Float32Array(o*4);let n=t>>>0;const a=()=>{n=n+1831565813>>>0;let i=n;return i=Math.imul(i^i>>>15,i|1),i^=i+Math.imul(i^i>>>7,i|61),((i^i>>>14)>>>0)/4294967296};for(let i=0;i<o;i++)s[i*4]=a(),s[i*4+1]=a(),s[i*4+2]=a(),s[i*4+3]=(i+a())/Math.max(1,o);return e.setAttribute("aRnd",new t0(s,4)),e.instanceCount=o,e.boundingSphere=new Ta(new C,1e6),e.boundingBox=new Bs(new C(-1e6,-1e6,-1e6),new C(1e6,1e6,1e6)),e}const na=`
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
`,nc=`
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
`,ac=`
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
`,ic=`
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
`,rc=`
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
`,lc=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,cc=`
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
`,hc=`
varying vec3 vW;
varying vec2 vUv;
void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vUv = uv; gl_Position = projectionMatrix * viewMatrix * w; }
`,uc=`
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
`,Ve=new C;class L1{constructor(t){F(this,"object",new vt);F(this,"rain");F(this,"snow");F(this,"ripples");F(this,"glass");F(this,"puddle");F(this,"rainU");F(this,"snowU");F(this,"rippleU");F(this,"glassU");F(this,"puddleU");F(this,"disposables",[]);F(this,"off",new C);F(this,"snowOff",new C);F(this,"vel",new C(0,-9,0));F(this,"vol");F(this,"boxMin",new C);F(this,"t",0);F(this,"groundY");F(this,"opts");F(this,"heightField");var r,l;this.opts=t,this.groundY=t.groundY??0,t.groundHeight&&(this.heightField=new tc(t.groundHeight,(t.radius??12)*2+16),this.disposables.push(this.heightField));const e=t.radius??12;this.vol=new C(e*2,14,e*2),this.object.name="weather-fx";const s=Jl(t.quality),n=()=>{var c,h;return{uBoxMin:{value:this.boxMin},uVol:{value:this.vol},uOff:{value:this.off},uVel:{value:this.vel},uIntensity:{value:0},uGroundTex:{value:((c=this.heightField)==null?void 0:c.texture)??null},uGroundBox:{value:((h=this.heightField)==null?void 0:h.box)??new ke},uUseGroundMap:{value:this.heightField?1:0},uGroundY:{value:this.groundY},uMode:{value:1},uLen:{value:.55},uWidth:{value:.012},uPx:{value:.0015},uT:{value:0},uColor:{value:new W(.62,.74,.86)},uOpacity:{value:.5}}};this.rainU=n(),this.snowU=n(),this.snowU.uMode.value=0,this.snowU.uOff.value=this.snowOff,this.snowU.uWidth.value=.028,this.snowU.uColor.value=new W(.9,.95,1),this.snowU.uOpacity.value=.85,this.rippleU={uCamXZ:{value:new C},uRadius:{value:9},uGroundTex:{value:((r=this.heightField)==null?void 0:r.texture)??null},uGroundBox:{value:((l=this.heightField)==null?void 0:l.box)??new ke},uUseGroundMap:{value:this.heightField?1:0},uGroundY:{value:this.groundY},uIntensity:{value:0},uT:{value:0},uColor:{value:new W(.7,.8,.9)},uOpacity:{value:.5}},this.glassU={uT:{value:0},uWet:{value:0},uSnow:{value:0},uSize:{value:new ut(1,1)},uTint:{value:new W(.6,.66,.72)},uOpacity:{value:1}},this.puddleU={uWet:{value:0},uSky:{value:new W(.55,.65,.78)}};const a=(c,h,f,p={})=>{const m=new wt({vertexShader:c,fragmentShader:h,uniforms:f,transparent:!0,depthWrite:!1,fog:!1,side:mt,...p});return this.disposables.push(m),m},i=(c,h,f,p)=>{this.disposables.push(c);const m=new Y(c,h);return m.frustumCulled=!1,m.renderOrder=f,m.name=p,m.raycast=()=>{},m.visible=!1,this.object.add(m),m};if(t.mode==="outdoor"){if(this.rain=i(Rs(s.drops,101),a(na,nc,this.rainU),12,"weather-rain"),this.snow=i(Rs(s.flakes,202),a(na,ac,this.snowU),12,"weather-snow"),this.ripples=i(Rs(s.splashes,303),a(ic,rc,this.rippleU),11,"weather-ripples"),t.flatGround){const c=new At(60,60);c.rotateX(-Math.PI/2),this.puddle=i(c,a(hc,uc,this.puddleU,{polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),10,"weather-puddle")}}else if(t.mode==="window"&&t.window){const c=t.window,h=new At(c.width,c.height);this.glassU.uSize.value.set(c.width,c.height),this.glass=i(h,a(lc,cc,this.glassU),13,"weather-glass"),this.glass.position.set(c.x,c.y,c.z)}}setGround(t){this.groundY=t}get mode(){return this.opts.mode}update(t,e,s,n,a,i,r){var v;this.t+=t;const l=e.params,c=this.opts.mode;if(c==="window"){if(!this.glass)return;const w=Math.min(1,l.rain*1.1+l.mist*.55),y=w>.01||l.snow>.01;this.glass.visible=y,y&&(this.glassU.uT.value=this.t,this.glassU.uWet.value=w,this.glassU.uSnow.value=l.snow,this.glassU.uTint.value.setRGB(.5+.2*n,.56+.2*n,.64+.2*n));return}if(c!=="outdoor")return;const h=.82*r*4.5,f=.57*r*4.5;this.vel.set(h,-9,f),this.off.x+=h*t,this.off.y+=-9*t,this.off.z+=f*t,this.snowOff.x+=h*.5*t,this.snowOff.y+=-1.3*t,this.snowOff.z+=f*.5*t,this.off.x%=this.vol.x*64,this.off.y%=this.vol.y*64,this.off.z%=this.vol.z*64,this.snowOff.x%=this.vol.x*64,this.snowOff.y%=this.vol.y*64,this.snowOff.z%=this.vol.z*64,s.getWorldDirection(Ve),Ve.y=0,Ve.lengthSq()>1e-4&&Ve.normalize();const p=s.position.x+Ve.x*this.vol.x*.18,m=s.position.z+Ve.z*this.vol.z*.18,u=s.position.y;this.boxMin.set(p-this.vol.x*.5,u-this.vol.y*.55,m-this.vol.z*.5);const g=2*Math.tan($.degToRad(i)/2)/Math.max(1,a),x=.25+.75*n;(l.rain>.005||l.snow>.005)&&((v=this.heightField)==null||v.update(s.position.x,s.position.z));const M=l.rain>.005;if(this.rain){this.rain.visible=M;const w=this.rainU;w.uT.value=this.t,w.uIntensity.value=l.rain,w.uGroundY.value=this.groundY,w.uPx.value=g,w.uOpacity.value=.42*x,w.uLen.value=.5+.2*l.rain}const d=l.snow>.005;if(this.snow){this.snow.visible=d;const w=this.snowU;w.uT.value=this.t,w.uIntensity.value=l.snow,w.uGroundY.value=this.groundY,w.uPx.value=g,w.uOpacity.value=.85*(.4+.6*x)}if(this.ripples){this.ripples.visible=M;const w=this.rippleU;w.uIntensity.value=l.rain,w.uT.value=this.t,w.uGroundY.value=this.groundY,w.uCamXZ.value.set(s.position.x,0,s.position.z),w.uOpacity.value=.5*x}if(this.puddle){const w=e.wet;this.puddle.visible=w>.2,this.puddle.visible&&(this.puddle.position.set(Math.round(s.position.x/4)*4,this.groundY+.012,Math.round(s.position.z/4)*4),this.puddleU.uWet.value=w,this.puddleU.uSky.value.setRGB(.4+.35*n,.48+.35*n,.6+.3*n))}}dispose(){for(const t of this.disposables)t.dispose();this.disposables.length=0,this.object.removeFromParent()}}class U1{constructor(){F(this,"roots",new Set);F(this,"applied",-1)}add(t){t&&!this.roots.has(t)&&(this.roots.add(t),this.applied=-1)}clear(){this.roots.clear(),this.applied=-1}invalidate(){this.applied=-1}apply(t){if(Math.abs(t-this.applied)<.01&&this.applied>=0)return;this.applied=t;const e=1-.34*t;for(const s of this.roots)s.traverse(n=>{const a=n;if(!a.isMesh||a.isSkinnedMesh)return;for(let r=a;r;r=r.parent)if(r.name==="scene-person"||r.name==="explorer-avatar"||r.userData.noSurface)return;const i=Array.isArray(a.material)?a.material:[a.material];for(const r of i){const l=r;if(!l.isMeshStandardMaterial||!l.color)continue;let c=l.userData.wetBase;c||(c={r:l.color.r,g:l.color.g,b:l.color.b,rough:l.roughness},l.userData.wetBase=c),l.color.setRGB(c.r*e,c.g*e,c.b*(1-.3*t)),l.roughness=Math.max(.1,c.rough*(1-.5*t))}})}}const fc={low:{pathSegments:10,radialSegments:4,lineRadius:.0014,buttonSegments:6},high:{pathSegments:22,radialSegments:5,lineRadius:.0011,buttonSegments:8}};function aa(o,t,e){const s=Math.abs(o);let n=st(s,t,e,0,1.33,0,.143,.17,.096);n=U(n,st(s,t,e,.055,1.31,.028,.073,.061,.071),.055),n=U(n,st(s,t,e,0,1.14,0,.126,.17,.09),.075),n=U(n,st(s,t,e,0,.97,-.004,.145,.13,.104),.075),n=U(n,rt(s,t,e,.018,1.492,-.01,.147,1.417,-.002,.043,.047),.085),n=U(n,st(s,t,e,.151,1.405,0,.048,.064,.061),.058),n=U(n,rt(s,t,e,0,1.46,-.02,0,1.535,-.02,.061,.046),.065),n=U(n,Je(s,t,e,0,1.525,0,.074,.026),.02),n=U(n,Jt(s,t,e,.085,1.27,.094,.04,.03,.014,.006),.006),n=Ot(n,.88-t,.03),n=Ot(n,-rt(s,t,e,0,1.43,-.006,0,1.62,-.006,.058,.058),.014);const a=Math.atan2(e,o);return n+=(Math.sin(a*7+t*13)*.5+Math.sin(a*12-t*8+1.7)*.3)*(t<1.15?.0055:.0028),n}function on(o,t){let e=0,s=.32;if(aa(o,t,e)>0)return .066;for(let n=0;n<18;n++){const a=(e+s)/2;aa(o,t,a)<=0?e=a:s=a}return(e+s)/2+.004}function Ho(o,t){const e=$.clamp(Math.abs(t)/(o==="upperArm"?.28:.255),0,1);return o==="upperArm"?[$.lerp(.058,.046,e),$.lerp(.06,.046,e)]:[$.lerp(.039,.05,1-e),$.lerp(.038,.046,1-e)]}function dc(o,t,e){const[s,n]=Ho(o,e),a=Math.max(.12,1-(t/s)**2);return n*Math.sqrt(a)+.0035}function jo(o,t,e,s){const n=`${t}:${e}:${s}`;let a=o.get(n);return a||(a={anchor:t,side:e,material:s,parts:[]},o.set(n,a)),a}function ae(o,t,e,s=e.lineRadius,n=!1){if(t.length<3)return;const a=new as(t,n,"centripetal");o.parts.push(new is(a,e.pathSegments,s,e.radialSegments,n))}function Xe(o){return o.map(([t,e])=>new C(t,e,on(t,e)))}function mc(o,t){const e=[],s=t.pathSegments;for(let n=0;n<=s;n++){const a=$.lerp(-Math.PI/2,Math.PI/2,n/s),i=.057*Math.sin(a),r=1.495-.043*Math.cos(a);e.push(new C(i,r,Math.max(on(i,r),.086)))}ae(o,e,t,t.lineRadius*1.25)}function Vo(o,t,e,s,n,a,i=!1,r){const l=t-s/2,c=t+s/2,h=e-n/2,f=e+n/2,p=[[l+.006,h],[c-.006,h],[c,h+.006],[c,f-.006],[c-.006,f],[l+.006,f],[l,f-.006],[l,h+.006]],m=g=>g.map(x=>x.setZ(r??x.z)),u=m(Xe(p));ae(o,u,a,a.lineRadius*1.1,!0),i&&ae(o,m(Xe([[l+.006,f-.012],[t,f-.012],[c-.006,f-.012]])),a,a.lineRadius*1.15)}function pc(o,t,e){const s=jo(e,"torso",0,"cloth");if(mc(s,t),o==="tee"){for(const r of[-1,1])ae(s,Xe([[r*.056,1.48],[r*.082,1.455],[r*.111,1.425],[r*.127,1.395]]),t,t.lineRadius);Vo(s,-.077,1.265,.045,.061,t,!0,.111);return}if(o==="hoodie"){const r=jo(e,"torso",0,"trim");for(const l of[-1,1])ae(r,Xe([[l*.012,1.465],[l*.016,1.405],[l*.021,1.335]]),t,t.lineRadius*1.4);Vo(s,0,1,.178,.066,t,!1,.141);return}const n=jo(e,"torso",0,"trim");ae(s,Xe([[0,1.49],[0,1.38],[0,1.25],[0,1.11],[0,.99]]),t,t.lineRadius*1.8);for(const r of[-1,1])ae(s,Xe([[r*.026,1.49],[r*.05,1.43],[r*.081,1.35],[r*.102,1.26]]),t,t.lineRadius*1.3),Vo(s,r*.09,1.045,.052,.06,t,!0);Vo(s,.078,1.267,.047,.052,t,!0,.111);const i=t.pathSegments>10?4:3;for(let r=0;r<i;r++){const l=$.lerp(1.405,1.055,r/(i-1)),c=new Ct(.0034,.0034,.0016,t.buttonSegments,1);c.rotateX(Math.PI/2),c.translate(0,l,on(0,l)),n.parts.push(c)}}function gc(o,t,e,s){const n=[];for(let a=0;a<s;a++){const i=a/s*Math.PI*2;n.push(new C(Math.cos(i)*o,e,Math.sin(i)*t))}return n}function ia(o,t,e,s,n){const a=jo(s,o,n,"cloth"),i=o==="upperArm"?-.265:-.226,[r,l]=Ho(o,i);ae(a,gc(r*1.04,l*1.04,i,e.pathSegments),e,e.lineRadius*1.35,!0);const c=o==="forearm"&&e.pathSegments>10?3:1;for(let h=0;h<c;h++){const f=o==="forearm"?-.025-h*.036:-.12,[p]=Ho(o,f),m=p*.72,u=[],g=e.pathSegments;for(let x=0;x<=g;x++){const M=x/g*2-1,d=M*m,v=f+.006*M+Math.sin((M+1)*Math.PI)*(h%2?-.0025:.0025);u.push(new C(d,v,dc(o,d,v)+.001))}ae(a,u,e,e.lineRadius*(o==="forearm"?1.2:1))}if(o==="upperArm"&&t!=="tee"&&e.pathSegments>10){const h=[];for(let f=0;f<=e.pathSegments;f++){const p=$.lerp(-.025,-.23,f/e.pathSegments),[m,u]=Ho(o,p);h.push(new C(n*m*1.01,p,u*.18+.002))}ae(a,h,e,e.lineRadius*.9)}}function vc(o){const t=fc[o.detail],e=new Map;pc(o.style,t,e);for(const n of[-1,1])ia("upperArm",o.style,t,e,n),ia("forearm",o.style,t,e,n);const s={torso:0,upperArm:1,forearm:2};return[...e.values()].sort((n,a)=>s[n.anchor]-s[a.anchor]||n.side-a.side||n.material.localeCompare(a.material)).map(n=>{const a=Yt(n.parts,!1);if(!a)throw new Error(`Could not merge garment details for ${n.anchor}:${n.side}:${n.material}`);return n.parts.forEach(i=>i.dispose()),a.computeBoundingBox(),a.computeBoundingSphere(),a.userData.garmentDetail={anchor:n.anchor,side:n.side,material:n.material},{anchor:n.anchor,side:n.side,material:n.material,geometry:a}})}let Cs;const _e=.4;function xc(){if(!Cs){const o=si(_e),t=ni(_e),e=ei(_e);Cs={head:ti(.58),hair:{short:Gs(.5,"short"),long:Gs(.5,"long")},jacket:oi(_e),upper:o,upperR:Mo(o),lower:t,lowerR:Mo(t),hand:e,handR:Mo(e),thigh:ai(_e),shin:ii(_e),boot:ri(_e)}}return Cs}const ui=(()=>{let o;return()=>(o??(o={eyeWhite:new at({color:15854822,roughness:.25}),iris:new at({color:4861984,roughness:.3}),lip:new at({color:10113096,roughness:.5}),shoe:new at({color:4863526,roughness:.65}),phone:new at({color:2107181,roughness:.35,metalness:.3}),screen:new at({color:8049872,emissive:2071200,emissiveIntensity:.55,roughness:.3})}),o)})();function Z(o,t){const e=new Y(o,t);return e.castShadow=!0,e.receiveShadow=!0,e.userData.isLandscapeStage=!0,e}function Pe(o,t,e,s,n){return Z(new Se(o,t,e,1,Math.min(s,o/2.01,t/2.01,e/2.01)),n)}function Bt(o){return o?new e0:new vt}const fi={stand:{left:{shoulder:.04,elbow:-.15},right:{shoulder:-.04,elbow:-.15}},phone:{left:{shoulder:-.7,elbow:-1.35,side:-.06},right:{shoulder:-.7,elbow:-1.35,side:.06}},listen:{left:{shoulder:-.55,elbow:-.95},right:{shoulder:-.5,elbow:-.95}},talk:{left:{shoulder:-.5,elbow:-.95},right:{shoulder:-1.15,elbow:-.75,side:.1}},write:{left:{shoulder:-.55,elbow:-.9},right:{shoulder:-.85,elbow:-1.2,side:.05}},read:{left:{shoulder:-.38,elbow:-1,side:-.12},right:{shoulder:-.38,elbow:-1,side:.12}},walk:{left:{shoulder:.45,elbow:-.25},right:{shoulder:-.45,elbow:-.5}},point:{left:{shoulder:.04,elbow:-.15},right:{shoulder:-1.45,elbow:-.1,side:.12}},lap:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.42,elbow:-.55,side:-.08}},reach1:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.55,elbow:-.62,side:-.08}},reach2:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.78,elbow:-.72,side:-.1}},reach3:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.98,elbow:-.8,side:-.12}},reach4:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-1.12,elbow:-.86,side:-.12}}};function O1(o){const t=ui(),e=xc(),s=o.animated===!0,n=new vt;n.name="scene-person";const a=o.seated??!1,i=o.pose??(a?"listen":"stand"),r=new Set,l=(N,B,j={})=>{const K=new at({color:N,roughness:B,metalness:.02,...j});return r.add(K),K},c=new W(o.skin??14858392),h=new W(o.shirt),f={h:0,s:0,l:0},p={h:0,s:0,l:0};h.getHSL(f),c.getHSL(p),Math.min(Math.abs(f.h-p.h),1-Math.abs(f.h-p.h))<.055&&f.s>.18&&Math.abs(f.l-p.l)<.24&&h.set(5205894).offsetHSL(0,0,(f.l-.5)*.2);const u=l(h.getHex(),.86,{side:mt}),g=l(o.trousers??3753562,.88),x=l(o.skin??14858392,.55,{emissive:3806728,emissiveIntensity:.05});x.name="person-skin";const M=new at({color:x.color.getHex(),roughness:.55,metalness:.02,vertexColors:!0,emissive:3806728,emissiveIntensity:.05});M.name="person-face";const d=new at({color:16777215,vertexColors:!0,roughness:.42,metalness:.08,side:mt});d.name="person-hair",r.add(M),r.add(d);const v=o.hair??2825494,w=l(new W(v).multiplyScalar(.8).getHex(),.7);w.name="person-face-detail";const y=a?.1:.91,k=Bt(s);k.position.y=y,k.rotation.x=o.lean??0,n.add(k);const A=Bt(s);A.position.y=-.91,k.add(A),A.add(Z(e.jacket,u));const S=Bt(s);S.position.y=1.5,S.rotation.x=i==="phone"||i==="read"?.38:i==="write"?.3:o.lean?-o.lean*.6:0,A.add(S),S.add(Z(e.head,M));const T=[],b=[],_=[];for(const N of[-1,1]){const B=Bt(s);B.position.set(N*.034,.2,.0685);const j=Z(new xt(.0125,16,12),t.eyeWhite);B.add(j);const K=Bt(s);K.position.z=.0118;const Mt=Z(new xt(.0072,12,10),t.iris);Mt.scale.set(1,1,.35),K.add(Mt);const Pt=Z(new xt(.0021,8,6),t.eyeWhite);Pt.position.set(-.0022,.0027,.0023),K.add(Pt),B.add(K);const bt=Z(new Dt(.0118,.0017,5,16,Math.PI),x);bt.position.set(0,.001,.006),bt.scale.y=.72,B.add(bt),T.push(B),b.push(K),S.add(B);const J=Bt(s);J.position.set(N*.037,.2165,.0885),J.rotation.z=-N*.1;const _t=new as([new C(-N*.015,-.001,0),new C(-N*.004,.003,.001),new C(N*.009,.002,0)]);J.add(Z(new is(_t,8,.0027,5,!1),w)),S.add(J),_.push(J)}const P=Bt(s);P.position.set(0,.132,.0875);const D=l(5515817,.78);D.name="person-face-detail";const R=Z(new xt(.0058,12,8),D);R.scale.set(1.7,.55,.4),P.add(R);const E=Z(new Ns(.0023,.025,3,8),t.lip);E.rotation.z=Math.PI/2,E.scale.set(1,1,.55),E.position.y=.001,P.add(E);const z=Z(new Ns(.0016,.019,3,8),x);z.rotation.z=Math.PI/2,z.position.set(0,-.0042,.001),P.add(z),S.add(P);const I=o.hairStyle??"short",O=(I==="long"?e.hair.long:e.hair.short).clone(),L=new W(v),V=(L.r+L.g+L.b)/3,G=O.attributes.color;for(let N=0;N<G.count;N++){const B=(G.getX(N)+G.getY(N)+G.getZ(N))/3/.05;G.setXYZ(N,L.r*B*(.35/Math.max(.05,V))*.6,L.g*B*(.35/Math.max(.05,V))*.6,L.b*B*(.35/Math.max(.05,V))*.6)}if(S.add(Z(O,d)),I==="bun"){const N=Z(new xt(.05,14,10),l(v,.7));N.scale.set(1,.9,1),N.position.set(0,.3,-.07),S.add(N)}if(o.helmet){const N=Z(new xt(.145,24,16),l(15659764,.3,{metalness:.2}));N.scale.set(1,1.12,1.08),N.position.y=.2,S.add(N);const B=Z(new xt(.12,20,12),l(1782855,.12,{metalness:.7}));B.scale.set(.95,.68,.55),B.position.set(0,.2,.108),S.add(B);const j=Z(new Dt(.1,.018,8,20),l(13226196,.4,{metalness:.5}));j.rotation.x=Math.PI/2,j.position.y=.07,S.add(j)}if(o.glasses){const N=l(1710618,.4,{metalness:.4});for(const j of[-1,1]){const K=Z(new Dt(.0245,.0032,6,18),N);K.position.set(j*.034,.2,.092),S.add(K)}const B=Z(new Ct(.0028,.0028,.02,5),N);B.rotation.z=Math.PI/2,B.position.set(0,.204,.093),S.add(B)}const X=l(15657696,.9,{side:mt}),H=Z(new Dt(.07,.012,8,24),X);if(H.rotation.x=Math.PI/2,H.position.y=1.535,H.scale.set(1.05,1,1),A.add(H),o.scarf!==void 0){const N=Z(new Dt(.074,.032,8,20),l(o.scarf,.92));N.rotation.x=Math.PI/2,N.position.y=1.54,A.add(N)}if(o.backpack!==void 0){const N=Pe(.29,.4,.15,.06,l(o.backpack,.85));N.position.set(0,1.27+.2-.2,-.155),A.add(N)}const et=(Math.imul(o.shirt^(o.hair??0)*31,2654435761)>>>16)+(o.hairStyle==="long"?3:0),dt=o.outfit??(o.helmet||o.scarf!==void 0?"tee":["tee","hoodie","coat","dress","tee","hoodie"][et%6]),pt=(o.hairStyle??"short")==="long",Q=dt==="dress"&&!pt&&o.hairStyle!=="bun"?"coat":dt;if(Q==="hoodie"&&!o.helmet){const N=Z(new Dt(.083,.03,10,24),u);N.rotation.x=Math.PI/2-.35,N.position.set(0,1.545,-.03),N.scale.set(1.05,1,1.15),A.add(N);const B=Pe(.2,.09,.02,.01,u);B.position.set(0,1,.128),A.add(B)}if(!a&&(Q==="coat"||Q==="dress")){const N=Q==="coat"?.62:.46,B=Z(new Ct(.19,Q==="coat"?.235:.27,N,28,1,!0),u);if(B.scale.set(1.12,1,.9),B.position.y=1-N/2+.02,B.receiveShadow=!1,A.add(B),Q==="coat"){const j=Pe(.016,.5,.02,.006,X);j.position.set(0,1.25,.121),A.add(j)}}const ot=o.hat??(et%7===3&&!a?8010555:et%7===5&&!a?3099231:void 0);if(ot!==void 0&&!o.helmet){const N=l(ot,.9),B=Z(new xt(.098,20,12,0,Math.PI*2,0,Math.PI*.52),N);B.scale.set(.9,1.06,1.06),B.position.set(0,.215,-.014),S.add(B);const j=Z(new Dt(.09,.012,8,20),N);j.rotation.x=Math.PI/2,j.scale.set(.92,1.08,1),j.position.set(0,.2,-.014),S.add(j)}const lt=fi[i],nt={},kt={};for(const N of[-1,1]){const B=N===1?lt.left:lt.right,j=Bt(s);j.position.set(N*.19,1.42,0),j.rotation.x=B.shoulder,j.rotation.z=(B.side??0)*N,A.add(j),j.add(Z(N===1?e.upper:e.upperR,u));const K=Bt(s);K.position.y=-.28,K.rotation.x=B.elbow,j.add(K),K.add(Z(N===1?e.lower:e.lowerR,u));const Mt=Z(new xt(.043,12,9),u);Mt.scale.set(.95,.86,.95),K.add(Mt);const Pt=Z(new Dt(.041,.008,6,16),X);Pt.rotation.x=Math.PI/2,Pt.position.y=-.252,K.add(Pt);const bt=Bt(s);if(bt.position.y=-.27,K.add(bt),bt.add(Z(N===1?e.hand:e.handR,x)),s&&N===1){const J=new vt;J.name="actor-book-prop";const _t=Pe(.2,.03,.27,.008,l(3104138,.8));_t.position.set(-.12,-.12,.06),_t.rotation.set(1.2,0,.1),J.add(_t),J.userData.personDynamicAccessory=!0,J.visible=i==="read",bt.add(J),kt.book=J;const ee=new vt;ee.name="actor-phone-prop";const ge=Pe(.075,.016,.15,.006,t.phone);ge.position.set(-.05,-.1,.02),ge.rotation.set(-.4,0,.1),ee.add(ge);const Ae=Z(new At(.062,.128),t.screen);Ae.rotation.x=-Math.PI/2,Ae.position.set(0,.0085,0),ge.add(Ae),ee.userData.personDynamicAccessory=!0,ee.visible=i==="phone",bt.add(ee),kt.phone=ee}else if(i==="read"&&N===1){const J=Pe(.2,.03,.27,.008,l(3104138,.8));J.position.set(-.12,-.12,.06),J.rotation.set(1.2,0,.1),bt.add(J)}if(s&&N===-1){const J=new vt;J.name="actor-pen-prop";const _t=Z(new Ct(.008,.008,.15,6),l(1911629,.4));_t.position.set(0,-.12,.03),_t.rotation.x=-.9,J.add(_t),J.userData.personDynamicAccessory=!0,J.visible=i==="write",bt.add(J),kt.pen=J}else if(i==="write"&&N===-1){const J=Z(new Ct(.008,.008,.15,6),l(1911629,.4));J.position.set(0,-.12,.03),J.rotation.x=-.9,bt.add(J)}if(!s&&i==="phone"&&N===1){const J=Pe(.075,.016,.15,.006,t.phone);J.position.set(-.05,-.1,.02),J.rotation.set(-.4,0,.1),bt.add(J);const _t=Z(new At(.062,.128),t.screen);_t.rotation.x=-Math.PI/2,_t.position.set(0,.0085,0),J.add(_t)}N===1?nt.left={shoulder:j,elbow:K,hand:bt}:nt.right={shoulder:j,elbow:K,hand:bt}}const Tt={};for(const N of[-1,1]){const B=Bt(s);B.position.set(N*.09,.91,0),B.rotation.x=a?-Math.PI/2+.03:i==="walk"?.42*-N:0,A.add(B),B.add(Z(e.thigh,g));const j=Bt(s);j.position.y=-.42,j.rotation.x=a?Math.PI/2-.03:i==="walk"&&N===1?.55:.03,B.add(j);const K=Z(new xt(.068,14,10),g);K.scale.set(1,.86,.9),j.add(K),j.add(Z(e.shin,g));const Mt=Bt(s);Mt.position.y=-.26,j.add(Mt);const Pt=e.boot.clone();Pt.translate(0,.26,0),Mt.add(Z(Pt,t.shoe)),N===1?Tt.left={hip:B,knee:j,ankle:Mt}:Tt.right={hip:B,knee:j,ankle:Mt}}if(s){const N=Q==="hoodie"?"hoodie":Q==="coat"||Q==="dress"?"coat":"tee";for(const B of vc({style:N,detail:o.garmentDetail??"low"})){const j=B.anchor==="torso"?A:B.anchor==="upperArm"?B.side===1?nt.left.shoulder:nt.right.shoulder:B.side===1?nt.left.elbow:nt.right.elbow,K=Z(B.geometry,B.material==="cloth"?u:X);K.name=`garment-${B.anchor}-${B.side}-${B.material}`,K.userData.garmentGeometry=!0,j.add(K)}}if(n.scale.setScalar(o.scale??1),s){const N={body:k,head:S,arms:nt,legs:Tt,eyes:T,gazes:b,brows:_,mouth:P,props:kt,setExpression:()=>{},setPose:()=>{},update:()=>{}};wc(N,i,a,o.lean??0);const B=new Set([e.head,e.hair.short,e.hair.long,e.jacket,e.upper,e.upperR,e.lower,e.lowerR,e.hand,e.handR,e.thigh,e.shin,e.boot]);Mc(n,B,r),n.userData.personRig=N,n.userData.ownedMaterials=r;const j=Aa(n,{body:N.body,bodyRestY:.91,head:N.head,props:[...[N.props.book,N.props.phone].filter(K=>!!K).map(K=>({object:K,hand:"LeftHand"})),...N.props.pen?[{object:N.props.pen,hand:"RightHand"}]:[]],grip:()=>{var K,Mt,Pt;return(K=N.props.book)!=null&&K.visible||(Mt=N.props.phone)!=null&&Mt.visible||(Pt=N.props.pen)!=null&&Pt.visible?.6:0},leftArm:N.arms.left.shoulder,rightArm:N.arms.right.shoulder,leftElbow:N.arms.left.elbow,rightElbow:N.arms.right.elbow,leftHip:N.legs.left.hip,rightHip:N.legs.right.hip,leftKnee:N.legs.left.knee,rightKnee:N.legs.right.knee,leftAnkle:N.legs.left.ankle,rightAnkle:N.legs.right.ankle,blinkLeft:()=>1-N.eyes[1].scale.y,blinkRight:()=>1-N.eyes[0].scale.y,mouthOpen:()=>Math.max(0,N.mouth.scale.y-.08)*.65,smile:()=>Math.max(0,N.mouth.scale.x-1)*10,browLift:()=>Math.max(0,N.brows[0].position.y-.2165)*100,gazeX:()=>N.gazes[0].position.x*80,gazeY:()=>N.gazes[0].position.y*80},o.hairStyle==="long"||o.hairStyle==="bun"?"female":"male",{model:o.model,shirt:o.shirt,trousers:o.trousers,hair:o.hair,skin:o.skin,outfit:o.humanOutfit,aged:o.aged,glasses:o.glasses,seed:o.seed,look:o.humanLook});if(j){const K=N.update;N.update=(...Mt)=>{K(...Mt),j()}}}else vl(n);return n}function ra(o,t,e,s){const n=fi[t],a=n.left,i=n.right,r=[{node:o.body,path:"position",axis:"y",value:e?.1:.91},{node:o.body,path:"rotation",axis:"x",value:s+(t==="talk"?-.025:0)},{node:o.body,path:"rotation",axis:"z",value:t==="talk"?.012:0},{node:o.head,path:"rotation",axis:"x",value:t==="phone"||t==="read"?.34:t==="write"?.25:t==="lap"||t.startsWith("reach")?-.035:-s*.5},{node:o.head,path:"rotation",axis:"y",value:t==="point"?.08:0},{node:o.arms.left.shoulder,path:"rotation",axis:"x",value:a.shoulder},{node:o.arms.left.shoulder,path:"rotation",axis:"z",value:a.side??0},{node:o.arms.left.elbow,path:"rotation",axis:"x",value:a.elbow},{node:o.arms.left.hand,path:"rotation",axis:"x",value:t==="phone"||t==="read"?-.14:-.04},{node:o.arms.right.shoulder,path:"rotation",axis:"x",value:i.shoulder},{node:o.arms.right.shoulder,path:"rotation",axis:"z",value:-(i.side??0)},{node:o.arms.right.elbow,path:"rotation",axis:"x",value:i.elbow},{node:o.arms.right.hand,path:"rotation",axis:"x",value:t==="phone"||t==="read"?-.14:-.04}];for(const l of[o.legs.left,o.legs.right])r.push({node:l.hip,path:"rotation",axis:"x",value:e?-Math.PI/2+.03:0},{node:l.knee,path:"rotation",axis:"x",value:e?Math.PI/2-.03:.03},{node:l.ankle,path:"rotation",axis:"x",value:0});return r}function Es(o){return o.node[o.path][o.axis]}function la(o,t){o.node[o.path][o.axis]=t}function ca(o){return o==="talk"?"talk":o==="listen"?"listen":o==="read"||o==="write"||o==="phone"?"think":o==="stand"?"softSmile":"neutral"}function ha(o){switch(o){case"listen":return[.0022,.018,.16,.15,0];case"think":return[8e-4,-.012,.1,0,7e-4];case"softSmile":return[0,0,.1,.38,0];case"talk":return[.0012,.006,.48,.08,0];default:return[0,0,.08,.02,0]}}function wc(o,t,e,s){let n=ra(o,t,e,s),a=n.map(f=>({...f,value:Es(f)})),i=null,r=ca(t),l=ha(r),c=null,h=0;o.setExpression=(f,p=.24)=>{if(f===r)return;const m=ha(f);c=p>0?{from:l.slice(),to:m,elapsed:0,duration:p}:null,r=f,p<=0&&(l=m)},o.setPose=(f,p,m=.42)=>{n=ra(o,f,p,s);const u=n.map(x=>x.value),g=n.map((x,M)=>{const d=a[M];return Es(d||x)});i=m>0?{from:g,to:u,elapsed:0,duration:m}:null,a=n.map((x,M)=>({...x,value:m>0?g[M]:u[M]})),m<=0&&a.forEach((x,M)=>la(x,u[M])),o.setExpression(ca(f),Math.min(.32,m)),o.props.book&&(o.props.book.visible=f==="read"),o.props.phone&&(o.props.phone.visible=f==="phone"),o.props.pen&&(o.props.pen.visible=f==="write")},o.update=(f,p,m,u,g)=>{if(i){i.elapsed+=f;const k=Math.min(1,i.elapsed/i.duration),A=k*k*(3-2*k);a=n.map((S,T)=>({...S,value:$.lerp(i.from[T],i.to[T],A)})),k>=1&&(i=null)}for(const k of a)la(k,k.value);if(c){c.elapsed+=f;const k=Math.min(1,c.elapsed/c.duration),A=k*k*(3-2*k);l=c.from.map((S,T)=>$.lerp(S,c.to[T],A)),k>=1&&(c=null)}const x=Math.sin(p*1.65+g)*.003;if(o.body.position.y+=m?Math.abs(Math.sin(u*2))*.007:x*.7,o.body.scale.y=1+x*.35,o.body.rotation.x+=m?.025:x*1.4,o.body.rotation.y=Math.sin(p*.47+g)*(m?.012:.008),o.body.rotation.z+=m?Math.sin(u)*.016:Math.sin(p*.72+g)*.009,o.head.rotation.y+=Math.sin(p*.38+g*1.7)*.027,o.head.rotation.z=Math.sin(p*.63+g)*.014,m){const k=Math.sin(u),A=Math.sin(u+Math.PI);o.legs.left.hip.rotation.x+=k*.36,o.legs.right.hip.rotation.x+=A*.36,o.legs.left.knee.rotation.x+=Math.max(0,Math.cos(u))*.62,o.legs.right.knee.rotation.x+=Math.max(0,Math.cos(u+Math.PI))*.62,o.legs.left.ankle.rotation.x=-o.legs.left.hip.rotation.x*.45-o.legs.left.knee.rotation.x*.7,o.legs.right.ankle.rotation.x=-o.legs.right.hip.rotation.x*.45-o.legs.right.knee.rotation.x*.7,o.arms.left.shoulder.rotation.x-=k*.19,o.arms.right.shoulder.rotation.x-=A*.19,o.arms.left.elbow.rotation.x+=.08+Math.max(0,k)*.12,o.arms.right.elbow.rotation.x+=.08+Math.max(0,A)*.12}else o.arms.left.shoulder.rotation.z+=Math.sin(p*.8+g)*.012,o.arms.right.shoulder.rotation.z-=Math.sin(p*.8+g)*.012;const M=$.euclideanModulo(p+g*1.31,4.2);o.eyes.forEach((k,A)=>{const S=$.euclideanModulo(M+A*.09,4.2),T=S<.13?Math.sin(S/.13*Math.PI):0;k.scale.y=1-T*.9;const b=o.gazes[A];if(b){const _=r==="listen"?Math.sin(p*.19+g*.8)*.0015:Math.sin(p*.31+g+A*.2)*.0022;b.position.x=_,b.position.y=Math.sin(p*.24+g*.7)*.0011-l[4]}});const[d,v,w,y]=l;o.brows.forEach((k,A)=>{const S=A===0?-1:1;k.position.y=.2165+d+Math.sin(p*.53+g+A*1.8)*(r==="listen"?4e-4:15e-5),k.rotation.z=-S*.1+S*v}),h+=r==="talk"?f*(5.5+Math.sin(p*1.9)*1.1):-h*Math.min(1,f*8),o.mouth.scale.x=1+y*.12-w*.08,o.mouth.scale.y=.08+w*(r==="talk"?.75+Math.sin(h)*.45:.32),o.mouth.rotation.z=y*.075+Math.sin(p*.55+g)*.004,o.mouth.position.y=.132+y*6e-4},o.setPose(t,e,0)}function Mc(o,t,e){o.updateMatrixWorld(!0);const s=o.matrixWorld.clone().invert(),n=[],a=[];o.traverse(d=>{if(d.isBone&&a.push(d),d.isMesh){let v=d;for(;v&&v!==o&&!v.userData.personDynamicAccessory;)v=v.parent;v!=null&&v.userData.personDynamicAccessory||n.push(d)}});const i=new Map(a.map((d,v)=>[d,v])),r=new Map,l=new Set,c=ui(),h=d=>d===c.eyeWhite?"eyeWhite":d===c.iris?"iris":d===c.lip?"faceDetail":d===c.phone?"phone":d===c.screen?"screen":d.name==="person-hair"?"hair":d.name==="person-face-detail"?"faceDetail":d.name==="person-skin"||d.name==="person-face"?"skin":"cloth",f=d=>{if(d==="phone")return c.phone;if(d==="screen")return c.screen;const v={color:16777215,vertexColors:!0,metalness:.02,side:mt};d==="skin"?Object.assign(v,{roughness:.55,emissive:3806728,emissiveIntensity:.05}):d==="hair"?Object.assign(v,{roughness:.42,metalness:.08}):d==="eyeWhite"?Object.assign(v,{roughness:.3,metalness:0}):d==="iris"?Object.assign(v,{roughness:.34,metalness:0}):d==="faceDetail"?Object.assign(v,{roughness:.72,metalness:0}):Object.assign(v,{roughness:.86});const w=new at(v);return w.name=`person-${d}`,e.add(w),w},p=new Map;for(const d of n){let v=d;for(;v&&!v.isBone;)v=v.parent;if(!v)throw new Error(`Animated character mesh "${d.name}" has no bone parent`);const w=i.get(v);if(w===void 0)throw new Error("Animated character bone is absent from its skeleton");let y=d.geometry.clone();if(y.index){const R=y.toNonIndexed();y.dispose(),y=R}y.applyMatrix4(new q().multiplyMatrices(s,d.matrixWorld));const k=y.getAttribute("color");for(const R of Object.keys(y.attributes))["position","normal","color"].includes(R)||y.deleteAttribute(R);y.getAttribute("normal")||y.computeVertexNormals();const A=d.material,S=h(A),T=p.get(S)??f(S);p.set(S,T);const b=y.getAttribute("position").count;if(S!=="phone"&&S!=="screen"){const R=new Float32Array(b*3),E=A.color??new W(1,1,1);for(let z=0;z<b;z++){const I=A.vertexColors&&k&&z<k.count;R[z*3]=E.r*(I?k.getX(z):1),R[z*3+1]=E.g*(I?k.getY(z):1),R[z*3+2]=E.b*(I?k.getZ(z):1)}y.setAttribute("color",new gt(R,3))}else y.deleteAttribute("color"),S==="phone"&&y.deleteAttribute("uv");const _=new Uint16Array(b*4),P=new Float32Array(b*4);for(let R=0;R<b;R++)_[R*4]=w,P[R*4]=1;y.setAttribute("skinIndex",new Sa(_,4)),y.setAttribute("skinWeight",new gt(P,4));const D=r.get(S)??[];D.push(y),r.set(S,D),t.has(d.geometry)||l.add(d.geometry)}const m=new o0(a);m.calculateInverses();const u=new Set(n.map(d=>d.material).filter(d=>!Array.isArray(d)));for(const[d,v]of r){const w=Yt(v,!1);if(v.forEach(k=>k.dispose()),!w)throw new Error(`Could not merge animated character ${d} geometry`);const y=new s0(w,p.get(d));y.name="person-skin",y.castShadow=!0,y.receiveShadow=!0,y.bind(m,o.matrixWorld.clone()),o.add(y)}n.forEach(d=>d.removeFromParent()),l.forEach(d=>d.dispose()),u.forEach(d=>{e.has(d)&&(d.dispose(),e.delete(d))});let g=0,x=0,M=0;o.traverse(d=>{var k;if(!d.isMesh)return;const v=d,w=v.geometry.getAttribute("position").count;M+=w,x+=(((k=v.geometry.index)==null?void 0:k.count)??w)/3;let y=d;for(;y&&y!==o&&!y.userData.personDynamicAccessory;)y=y.parent;y!=null&&y.userData.personDynamicAccessory&&(g+=1)}),o.userData.personGeometryStats={draws:r.size+g,triangles:x,vertices:M,joints:a.length}}function sn(o){const t=$.clamp(o,0,1);return .025+.02*Math.sin(t*Math.PI)+.006*t}function yc(o,t=10){const e=new Te,s=a=>o*(.004+a*.201);e.moveTo(s(0),.014),e.lineTo(s(1),.014);for(let a=t;a>=0;a--){const i=a/t;e.lineTo(s(i),sn(i))}e.closePath();const n=new Ge(e,{depth:.274,steps:1,bevelEnabled:!1,curveSegments:1});return n.translate(0,0,-.137),n}function bc(o){const t=[],e=[];for(let a=0;a<10;a++){const i=-.108+a*.022,r=a===0?.68:a===5||a===9?.58:.86+a%3*.025,l=a===0?.004:.0018,c=a===0?2:5+a%2,h=.023,f=(r-.13-h*(c-1))/c;for(let p=0;p<c;p++){const m=t.length/3,u=.13+p*(f+h);for(let g=0;g<=2;g++){const x=u+f*g/2,M=o*(.004+x*.201),d=sn(x)+.001;if(t.push(M,d,i,M,d,i+l),g===2)continue;const v=m+g*2,w=[v,v+1,v+2,v+1,v+3,v+2];e.push(...o===1?w:[v,v+2,v+1,v+1,v+2,v+3])}}}const n=new Gt;return n.setAttribute("position",new gt(t,3)),n.setIndex(e),n.computeVertexNormals(),n}function Sc(){const o=[],t=[],e=sn(.5771144278606964)+.0018;for(let n=0;n<=10;n++){const a=.065+n*.0115,i=$.clamp((a-.137)/.043,0,1),r=e-i*i*.032;if(o.push(.114,r,a,.126,r,a),n<10){const l=n*2;t.push(l,l+2,l+1,l+1,l+2,l+3)}}const s=new Gt;return s.setAttribute("position",new gt(o,3)),s.setIndex(t),s.computeVertexNormals(),s}function kc(o,t=.055){const e=new Te;e.absarc(0,0,o*1.05,0,Math.PI*2,!1);const s=new n0;s.absarc(0,0,o*.86,0,Math.PI*2,!0),e.holes.push(s);const n=new Ge(e,{depth:t,bevelEnabled:!1,steps:1,curveSegments:16});return n.rotateX(-Math.PI/2),n}function Tc(){const o=[0,0,0],t=8;for(let n=0;n<t;n++){const a=n/t*Math.PI*2,i=.55+Math.cos(a)*.55;o.push(Math.sin(a)*.32,i*i*.2,i)}const e=[];for(let n=0;n<t;n++)e.push(0,n+1,(n+1)%t+1);const s=new Gt;return s.setAttribute("position",new gt(o,3)),s.setIndex(e),s.computeVertexNormals(),s}function G1(o="high"){const t=(s,n=.85,a=.02,i={})=>{const r=new at({color:s,roughness:n,metalness:a,...i});return r.fog=!1,r},e=[10173754,3104138,4160079,13081146,6965898,14209208,8018490,2964038];return{detail:o,kit:new Ja,m:xl(),p:{books:e.map(s=>t(s,.82)),fabricRed:t(11553344,.95,0,{side:mt}),fabricBlue:t(3891087,.95,0,{side:mt}),fabricGreen:t(5077589,.95,0,{side:mt}),fabricGrey:t(8225932,.95,0,{side:mt}),fabricCream:t(15261382,.95,0,{side:mt}),screenOn:t(8049872,.3,.1,{emissive:2071200,emissiveIntensity:.7}),screenOff:t(1317150,.2,.4),boardGreen:t(3099199,.9),boardWhite:t(15790056,.6),ceramic:t(15854818,.35),leather:t(5913128,.7,.05),plasticDark:t(2106923,.45,.2),printInk:t(4278605,.98,0),water:O0({depth:.55,quality:o==="low"?"low":"high"}),canvasOlive:t(8359786,.95,0,{side:mt})}}}const ua=new q,fa=new q,Ac=new q,da=new ns;class di{constructor(t,e=0,s=0,n=0,a=0,i=1,r=new q){this.kit=t,this.x=e,this.y=s,this.z=n,this.ry=a,this.s=i,this.base=r,this.base=new q().makeTranslation(e,s,n).multiply(new q().makeRotationY(a)).multiply(new q().makeScale(i,i,i))}child(t,e,s,n=0){const a=new di(this.kit,0,0,0,0,1);return a.base=this.base.clone().multiply(ua.makeTranslation(t,e,s)).multiply(fa.makeRotationY(n)),a}put(t,e,s=0,n=0,a=0,i=0,r=0,l=0,c=1,h=1,f=1){da.set(i,r,l);const p=this.base.clone().multiply(ua.makeTranslation(s,n,a)).multiply(fa.makeRotationFromEuler(da)).multiply(Ac.makeScale(c,h,f));this.kit.addMatrix(t,e,p)}box(t,e,s,n,a,i,r,l=.02,c=0,h=0,f=0){this.put(Qa(e,s,n,l),t,a,i+s/2,r,c,h,f)}cyl(t,e,s,n,a,i,r,l=20){this.put(Qe(e,s,n,l),t,a,i+n/2,r)}strut(t,e,s,n,a=6){this.put(gl(e,s,n,a),t)}ball(t,e,s,n,a,i=1,r=1,l=1){this.put(new xt(e,14,10),t,s,n,a,0,0,0,i,r,l)}}function B1(o,t,e=1.8){const{m:s}=o;for(let n=0;n<4;n++)t.box(s.wood,e,.035,.085,0,.44,-.18+n*.1,.008);for(let n=0;n<3;n++)t.box(s.wood,e,.08,.03,0,.62+n*.12,-.27-n*.02,.008,-.12);for(const n of[-1,1]){const a=n*(e-.12)/2;for(const r of[-.23,.19])t.box(s.darkSteel,.1,.035,.13,a,0,r,.006),t.strut(s.darkSteel,[a,.035,r],[a,.435,r*.78],.026,8);t.strut(s.darkSteel,[a,.425,-.28],[a,.425,.23],.027,8),t.strut(s.darkSteel,[a,.4,-.27],[a,.96,-.35],.024,8);const i=new as([new C(a,.58,.2),new C(a,.65,.13),new C(a,.66,-.14),new C(a,.63,-.29)]);if(t.put(new is(i,o.detail==="high"?12:6,.024,6,!1),s.darkSteel),t.strut(s.darkSteel,[a,.45,.18],[a,.61,.18],.02,6),o.detail==="high"){for(let r=0;r<4;r++)t.cyl(s.steel,.008,.008,.004,a,.476,-.18+r*.1,6);for(let r=0;r<3;r++)t.put(Qe(.008,.008,.004,6),s.steel,a,.66+r*.12,-.248-r*.02,Math.PI/2)}}}function W1(o,t,e=o.m.wood){const{m:s}=o;t.box(e,.42,.04,.42,0,.44,0,.01),t.box(e,.42,.34,.03,0,.5,-.2,.01,-.08);for(const n of[-1,1])for(const a of[-1,1])t.cyl(s.woodDark,.018,.022,.44,n*.18,0,a*.18,8);t.box(s.woodDark,.38,.02,.02,0,.18,.18,.005)}function V1(o,t,e=.46){t.cyl(o.m.wood,.17,.17,.04,0,e-.04,0,20);for(let s=0;s<3;s++){const n=s/3*Math.PI*2;t.strut(o.m.woodDark,[Math.cos(n)*.13,e-.04,Math.sin(n)*.13],[Math.cos(n)*.2,0,Math.sin(n)*.2],.018,6)}}function H1(o,t,e=1.4,s=.8,n=.75,a=o.m.wood){t.box(a,e,.045,s,0,n-.045,0,.012);for(const i of[-1,1])for(const r of[-1,1])t.box(o.m.woodDark,.06,n-.045,.06,i*(e/2-.08),0,r*(s/2-.08),.01);t.box(o.m.woodDark,e-.2,.05,.03,0,n-.13,s/2-.08,.008)}function j1(o,t,e=.6,s=.74){t.cyl(o.m.wood,e,e,.04,0,s-.04,0,36),t.cyl(o.m.woodDark,.05,.07,s-.04,0,0,0,12),t.cyl(o.m.woodDark,.28,.3,.04,0,0,0,20)}function $1(o,t,e=1.5,s=.75,n=.75){const{m:a}=o;t.box(a.wood,e,.04,s,0,n-.04,0,.012),t.box(a.woodDark,.04,n-.04,s-.06,-e/2+.05,0,0,.008),t.box(a.woodDark,.5,n-.04,s-.06,e/2-.3,0,0,.008);for(let i=0;i<3;i++)t.box(a.wood,.44,.17,.02,e/2-.3,.06+i*.21,s/2-.02,.006),t.box(a.brass,.1,.014,.014,e/2-.3,.14+i*.21,s/2+.005,.004)}function X1(o,t,e=2.2,s=2.4,n=5,a=1){const{m:i,p:r}=o,l=hs(a);t.box(i.woodDark,.05,s,.34,-e/2+.025,0,0,.008),t.box(i.woodDark,.05,s,.34,e/2-.025,0,0,.008),t.box(i.woodDark,e,s,.02,0,0,-.16,.006),t.box(i.wood,e,.05,.36,0,s,0,.01);const c=(s-.1)/n;for(let h=0;h<=n;h++)t.box(i.wood,e-.08,.035,.32,0,.05+h*c,0,.008);for(let h=0;h<n;h++){let f=-e/2+.08;for(;f<e/2-.12;){const p=.03+l()*.035,m=c*(.55+l()*.38);l()>.07&&t.box(r.books[Math.floor(l()*r.books.length)],p,m,.22+l()*.05,f+p/2,.085+h*c,.01,.004,0,0,(l()-.5)*(l()>.9?.4:0)),f+=p+.004}}}function Y1(o,t,e=4,s=3){const n=hs(s);let a=0;for(let i=0;i<e;i++){const r=.03+n()*.03,l=o.p.books[Math.floor(n()*o.p.books.length)],c=Math.max(.1,.26-i*.012),h=t.child(0,a,0,(n()-.5)*.4);if(h.box(l,c,.003,.19,0,0,0,.001),h.box(o.m.paper,c-.01,r-.006,.18,.002,.003,0,.001),h.box(l,c,.003,.19,0,r-.003,0,.001),h.box(l,.006,r,.19,-c/2+.003,0,0,.001),o.detail==="high"){for(const f of[-.06,.06])h.box(o.m.brass,.001,r*.6,.006,-c/2-6e-4,r*.2,f,0);h.box(o.m.brass,c*.45,8e-4,.035,0,r+2e-4,0,0)}a+=r}}function K1(o,t){for(const e of[-1,1])t.box(o.p.leather,.216,.009,.3,e*.108,.002,0,.003),t.put(yc(e,o.detail==="high"?10:4),o.m.paper),o.detail==="high"&&t.put(bc(e),o.p.printInk);t.strut(o.p.leather,[0,.015,-.15],[0,.015,.15],.008,8),o.detail==="high"&&t.put(Sc(),o.p.fabricRed)}function Z1(o,t,e=.62,s=.36,n=o.p.screenOn){t.cyl(o.p.plasticDark,.1,.13,.015,0,0,0,16),t.box(o.p.plasticDark,.04,.2,.03,0,.01,0,.006),t.box(o.p.plasticDark,e+.03,s+.03,.03,0,.2,0,.01),t.put(new At(e,s),n,0,.2+(s+.03)/2,.0166)}function q1(o,t,e=o.p.screenOn){t.box(o.m.steel,.34,.015,.23,0,0,0,.005),t.box(o.p.plasticDark,.292,.0015,.101,0,.0152,-.026,.001),t.box(o.p.plasticDark,.098,.001,.048,0,.0153,.073,.001),t.box(o.m.steel,.094,.001,.044,0,.0164,.073,.001),t.strut(o.m.darkSteel,[-.115,.018,-.103],[.115,.018,-.103],.008,8);const s=.3,n=Math.cos(s),a=Math.sin(s),i=(r,l,c,h,f)=>t.put(r,l,c,.018+h*n+f*a,-.103-h*a+f*n,-s);if(i(Qa(.34,.22,.009,.004),o.m.steel,0,.11,0),i(new At(.315,.193),o.p.plasticDark,0,.11,.005),i(new At(.295,.169),e,0,.11,.0056),o.detail==="high"){for(let r=0;r<4;r++)for(let l=0;l<10;l++)t.box(o.m.darkSteel,.023,.0018,.017,-.125+l*.0278,.0168,-.063+r*.023,5e-4);t.box(o.m.darkSteel,.11,.0018,.013,0,.0168,.026,5e-4);for(const r of[-.157,.157])for(let l=0;l<6;l++)t.box(o.p.plasticDark,.003,6e-4,.01,r,.0155,-.067+l*.016,0);i(new At(.258,.009),o.m.paper,0,.174,.0059);for(let r=0;r<4;r++)i(new At(.16-r*.018,.003),o.m.paper,-.024,.145-r*.02,.0059);i(new At(.003,.003),o.p.plasticDark,0,.212,.0058)}}function Q1(o,t,e=o.p.screenOn){t.box(o.p.plasticDark,.07,.008,.145,0,0,0,.004),t.put(new At(.062,.13),e,0,.0085,0,-Math.PI/2)}function J1(o,t){t.box(o.m.woodDark,.6,1,.45,0,0,0,.015),t.box(o.m.wood,.7,.04,.55,0,1,0,.01,-.28),t.box(o.m.brass,.4,.012,.012,0,.98,.22,.003)}function th(o,t,e=2.4,s=1.2,n=o.p.boardGreen){t.box(o.m.woodDark,e+.12,s+.12,.05,0,0,0,.012),t.box(n,e,s,.02,0,.06,.03,.006),t.box(o.m.wood,e*.7,.04,.08,0,.04,.07,.008)}function eh(o,t,e=.5,s=5){const n=hs(s);t.put(new Ct(e,e*1.04,.38,24,1,!0),o.m.stoneDark,0,.19,0),t.put(kc(e,.08),o.m.stone,0,.355,0),t.cyl(o.m.soil,e*.88,e*.88,.045,0,.31,0,24);const a=Xa();for(const i of qa(s*13+5,e*.62,o.detail==="high"?96:30)){const r=i.attributes.color;for(let l=0;l<r.count;l++)r.setXYZ(l,r.getX(l)*.82,r.getY(l)*.82,r.getZ(l)*.82);t.put(i,a,0,.66,0)}for(let i=0;i<(o.detail==="high"?7:3);i++){const r=n()*Math.PI*2,l=Math.sqrt(n())*e*.6,c=Math.cos(r)*l,h=Math.sin(r)*l,f=.78+n()*.22,p=e*(.12+n()*.05);t.strut(o.m.leaf,[c*.85,.35,h*.85],[c,f,h],.008,5);const m=t.child(c,f,h,r),u=o.detail==="high"?6:4;for(let g=0;g<u;g++)m.put(Tc(),i%2?o.p.fabricCream:o.p.fabricRed,0,0,0,0,g/u*Math.PI*2,0,p,p,p);m.put(new xt(p*.25,8,5),o.p.books[3],0,.008,0,0,0,0,1,.55,1)}}function oh(o,t,e=3.4){t.cyl(o.m.slate,.14,.18,.18,0,0,0,10),t.cyl(o.m.slate,.045,.065,e,0,.18,0,8),t.strut(o.m.slate,[0,e+.18,0],[.45,e+.3,0],.03,5),t.put(new eo(.26,.2,8),o.m.slate,.5,e+.34),t.cyl(o.m.lampGlass,.12,.18,.32,.5,e-.02,0,8)}function sh(o,t,e,s=1,n=o.m.steel){const a=Math.max(2,Math.round(e/1));for(let i=0;i<=a;i++)t.cyl(n,.02,.025,s,i/a*e,0,0,8);t.box(n,e,.04,.04,e/2,s,0,.01),t.box(n,e,.025,.025,e/2,s*.5,0,.006)}function nh(o,t,e=2,s=4,n=.17,a=.32){for(let i=0;i<s;i++)t.box(o.m.stoneWarm,e,n*(i+1),a,0,0,i*a,.015)}function ah(o,t,e=.6,s=.45,n=.5){t.box(o.m.wood,e,s,n,0,0,0,.012);for(let a=1;a<3;a++)t.box(o.m.woodDark,e+.004,.025,n+.004,0,s*a/3,0,.004);for(const a of[-1,1])t.box(o.m.woodDark,.04,s+.004,n+.004,a*(e/2-.03),0,0,.004)}function ih(o,t,e=.28,s=.7){t.put(Qe(e*.92,e*.92,s,20),o.m.woodDark,0,s/2,0),t.put(Qe(e,e,s*.5,20),o.m.woodDark,0,s/2,0);for(const n of[.14,.4,.6])t.put(new Dt(e*.98,.012,5,24),o.m.darkSteel,0,n*(s/.74),0,Math.PI/2)}function rh(o,t,e=.5,s=.7,n=.25,a=o.p.fabricBlue){t.box(a,e,s,n,0,.05,0,.04),t.box(o.m.darkSteel,.03,s*.5,.03,0,s+.05,-n*.2,.005),t.box(o.m.darkSteel,e*.5,.025,.03,0,s+.28,-n*.2,.005);for(const i of[-1,1])t.cyl(o.p.plasticDark,.025,.025,.05,i*(e/2-.06),0,0,10)}function lh(o,t,e=.6,s=.45,n=o.p.fabricCream){t.box(o.m.woodDark,e+.06,s+.06,.03,0,0,0,.008),t.put(new At(e,s),n,0,s/2+.03,.017)}function ch(o,t,e=.2){t.cyl(o.m.brass,.1,.12,.03,0,0,0,16),t.cyl(o.m.brass,.015,.015,.2,0,.03,0,8),t.put(new xt(e,24,16),o.p.fabricBlue,0,.3+e*.5,0,.4),t.put(new Dt(e*1.08,.01,6,36,Math.PI*1.5),o.m.brass,0,.3+e*.5,0,.4,Math.PI/2)}function hh(o,t){t.cyl(o.p.ceramic,.055,.055,.008,0,0,0,16),t.cyl(o.p.ceramic,.04,.03,.065,0,.008,0,16),t.put(new Dt(.02,.006,5,10,Math.PI),o.p.ceramic,.05,.04,0,0,0,-Math.PI/2)}function uh(o,t,e=2.4,s=1,n=8,a=o.p.fabricRed,i=o.p.fabricCream){for(let r=0;r<n;r++)t.box(r%2?i:a,e/n,.015,s,-e/2+(r+.5)*(e/n),2.3,s/2,.004,.32);t.box(o.m.woodDark,e+.06,.05,.05,0,2.62,.02,.01);for(const r of[-1,1])t.cyl(o.m.woodDark,.025,.03,2.4,r*(e/2),0,s-.05,8)}function fh(o,t,e=1.4,s=o.m.terracottaRoof){for(const[n,a]of[[-1,-1],[1,-1],[-1,1],[1,1]])t.cyl(o.m.woodDark,.06,.07,2.4,n*e,0,a*e,10);t.box(o.m.woodDark,e*2+.2,.1,.1,0,2.4,-e,.01),t.box(o.m.woodDark,e*2+.2,.1,.1,0,2.4,e,.01),t.box(o.m.woodDark,.1,.1,e*2+.2,-e,2.4,0,.01),t.box(o.m.woodDark,.1,.1,e*2+.2,e,2.4,0,.01),t.put(new eo(e*1.7,1,4),s,0,3,0,0,Math.PI/4),t.ball(o.m.brass,.07,0,3.55,0)}const mi=.045;function _c(o,t){const e=Math.min(1.65,t-.35),s=Math.min(.56,Math.max(.2,(o-1.25)/2)),n=Math.min(1.2,t-.8),a=Math.min(.64,t-n-.16),i=.025,r=.025,l=.05,c=Math.max(i,r,mi),h=o/2-l-c-s/2;return[{kind:"door",x:0,y:.3,width:Math.min(.82,o-.08),height:e},{kind:"window",x:-h,y:n,width:s,height:a,sillOverhang:i,lintelOverhang:r},{kind:"window",x:h,y:n,width:s,height:a,curtain:!0,sillOverhang:i,lintelOverhang:r}]}function Pc(o,t,e,s,n,a,i,r){const l=[...new Set([-e/2,e/2,...r.flatMap(c=>[c.x-c.width/2,c.x+c.width/2])])].sort((c,h)=>c-h);for(let c=0;c<l.length-1;c++){const h=l[c],f=l[c+1];if(f-h<.006)continue;const p=(h+f)/2,m=r.filter(g=>p>g.x-g.width/2&&p<g.x+g.width/2).sort((g,x)=>g.y-x.y);let u=a;for(const g of m){const x=$.clamp(g.y,a,s),M=$.clamp(g.y+g.height,a,s);x-u>.006&&o.box(t,f-h,x-u,i,p,u,n-i/2,0),u=Math.max(u,M)}s-u>.006&&o.box(t,f-h,s-u,i,p,u,n-i/2,0)}}function dh(o,t,e=2.4,s=2.6,n=2.2,a=o.m.terracottaRoof,i=o.m.paper){const{m:r}=o,l=.3,c=Math.max(.1,s-l),h=Math.min(.16,n*.12),f=n/2,p=_c(e,s),m=p[0],u=p.slice(1);t.box(r.stoneDark,e+.1,l,n+.1,0,0,0,.02),t.box(i,h,c,n,-e/2+h/2,l,0,0),t.box(i,h,c,n,e/2-h/2,l,0,0),t.box(i,e,c,h,0,l,-n/2+h/2,0),Pc(t,i,e,s,f,l,h,p),t.put(Kn(e+.5,.95+e*.12,n+.5),a,0,s,0),t.put(Kn(e+.3,.8+e*.12,n+.3),r.woodDark,0,s-.04,0,0,0,0,1,.97,.99);const g=.06,x=f+.008,M=m.x-m.width/2,d=m.x+m.width/2,v=f-h/2+.01,w=Math.max(.2,m.height-.08),y=m.y+w;t.box(r.woodDark,g,w,h+.04,M+g/2,m.y,v,.008),t.box(r.woodDark,g,w,h+.04,d-g/2,m.y,v,.008),t.box(r.woodDark,m.width,.08,h+.04,m.x,y,v,.008);const k=Math.max(.48,m.width-g*2-.08),A=m.height-.11;if(t.box(r.wood,k,A,.055,m.x,m.y,x,.008),o.detail==="high"){for(const S of[m.y+.56,m.y+1.12])S<m.y+A-.04&&t.box(r.woodDark,k-.08,.025,.012,m.x,S,x+.034,.003);for(const S of[-.14,0,.14])t.box(r.woodDark,.012,A-.12,.012,m.x+S,m.y+.06,x+.034,.002);for(const S of[m.y+.16,m.y+m.height-.22])t.box(r.brass,.035,.075,.012,M+g/2,S,x+.038,.003)}t.box(r.stoneWarm,Math.max(.9,m.width+.38),.16,.45,0,0,f+.22,.02),t.box(r.brass,.05,.05,.04,m.x+Math.min(.24,k*.4),m.y+Math.min(.75,A*.49),x+.04,.008);for(const S of u){const T=t.child(S.x,S.y,f+.006);Dc(o,T,S.width,S.height,{cols:o.detail==="high"?2:1,rows:o.detail==="high"?2:1,curtain:o.detail==="high"&&S.curtain,lit:!0,frame:r.woodDark,recess:h+.03,sillOverhang:S.sillOverhang,lintelOverhang:S.lintelOverhang});const b=h,_=f-b/2;for(const P of[-1,1])t.box(r.woodDark,.025,S.height,b,S.x+P*S.width/2,S.y,_,.003)}t.box(r.stoneDark,.32,1,.32,e/2-.45,s+.15,-n/4,.02)}function mh(o,t,e=2.4,s=1,n=1){t.put(Qe(e+.28,e+.34,.3,40),o.m.stoneDark,0,.15,0,0,0,0,s,1,n),t.put(Qe(e,e,.2,40),o.p.water,0,.27,0,0,0,0,s,1,n)}function ph(o,t,e=3.2,s=1,n=o.p.fabricCream,a=o.m.woodDark){const{m:i}=o,r=e*.3,l=e*.22,c=new Te;c.moveTo(-e/2,l),c.lineTo(-e*.36,0),c.lineTo(e*.3,0),c.quadraticCurveTo(e*.5,l*.25,e/2+.12,l*.92),c.lineTo(-e/2,l);const h=new Ge(c,{depth:r,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});h.translate(0,0,-r/2),t.put(h,a,0,.05,0),t.box(o.p.fabricRed,e*.98,.05,.04,0,l*.95,r/2+.02,.01),t.box(o.p.fabricRed,e*.98,.05,.04,0,l*.95,-r/2-.02,.01),t.box(i.wood,e*.9,.04,r*.92,0,l*.9,0,.01);for(let p=0;p<9;p++)for(const m of[-1,1])t.box(i.woodDark,.02,l*.22,.02,-e*.42+p*e*.1,l*.95,m*(r/2-.02),.004);t.box(i.woodDark,e*.22,l*.55,r*.7,-e*.3,l*.92,0,.02),t.box(i.slate,e*.1,.1,.02,-e*.3,l*1.25,r*.36,.005),t.box(i.woodDark,.02,l*.6,r*.12,-e/2-.02,l*.2,0,.004),t.strut(i.woodDark,[-e/2-.02,l*.75,0],[-e/2+.2,l*1,0],.012,5),t.strut(i.woodDark,[e/2-.1,l*.95,0],[e/2+.28,l*1.35,0],.02,6),t.put(new Dt(.05,.01,6,14,Math.PI),i.darkSteel,e*.36,l*.9,r/2+.05,0,0,Math.PI),t.strut(i.darkSteel,[e*.36,l*.9,r/2+.05],[e*.36,l*.9+.14,r/2+.05],.008,4),t.cyl(i.wood,.07,.07,.04,e*.2,l*.93,r*.25,12);const f=e*.5/Math.max(1,s);for(let p=0;p<s;p++){const m=e*.12-p*f*.9,u=e*(.95-p*.12),g=l*.92;t.cyl(i.woodDark,.022,.04,u,m,g,0,10);const x=g+u*.92,M=g+u*.3,d=e*.34;t.strut(i.woodDark,[m,x,-d/2],[m,x,d/2],.014,6),t.strut(i.woodDark,[m,M,-d/2*1.1],[m,M,d/2*1.1],.016,6);const v=new At(1,1,12,10),w=v.attributes.position,y=x-M;for(let k=0;k<w.count;k++){const A=w.getX(k)+.5,S=w.getY(k)+.5,T=d/2*(.78+.22*(1-S)),b=(A-.5)*2*T,_=M+S*y,P=Math.sin(A*Math.PI)*Math.sin(S*Math.PI*.9+.2)*.1*e*.3;w.setXYZ(k,P,_,b)}v.computeVertexNormals(),t.put(v,n,m,0,0);for(let k=1;k<5;k++)t.strut(i.woodDark,[m+.012,M+y*k/5,-d/2*.86],[m+.012,M+y*k/5,d/2*.86],.004,4);t.cyl(i.woodDark,.07,.06,.04,m,x+.02,0,10),t.strut(i.steel,[m,g+u,0],[e/2+.05,l*.9,0],.008,4),t.strut(i.steel,[m,g+u,0],[-e/2,l*1,0],.008,4);for(const k of[-1,1]){t.strut(i.steel,[m,x,0],[m,l*.95,k*(r/2+.03)],.006,4);for(let A=1;A<6;A++){const S=A/6;t.strut(i.steel,[m,x-(x-l*.95)*S,k*(r/2+.03)*S],[m+.001,x-(x-l*.95)*S,k*(r/2+.03)*S+0],.004,3)}}p===0&&t.box(o.p.fabricRed,.22,.14,.01,m+.11,g+u+.06,0,.003)}}function gh(o,t,e=4.4,s=3.4,n=2.6,a=o.p.canvasOlive){for(const i of[-1,1])for(const r of[-1,1])t.cyl(o.m.woodDark,.05,.06,n,i*(e/2-.1),0,r*(s/2-.1),10);for(const i of[-1,1])t.box(a,e+.4,.04,s*.62,0,n+.28,i*s*.27,.01,-i*.22);t.box(o.m.woodDark,e+.1,.06,.06,0,n+.5,0,.01),t.box(a,e+.3,.45,.03,0,n-.4,s/2+.02,.01)}function vh(o,t,e,s=2.6){t.cyl(o.m.woodDark,.06,.085,s,0,0,0,10),t.cyl(o.m.stoneDark,.2,.24,.18,0,0,0,12),e.forEach((n,a)=>{const i=s-.3-a*.34,r=n.len??.95,l=t.child(0,i,0,n.yaw);l.box(n.tone??o.m.wood,r,.24,.045,r/2-.05,0,0,.012),l.put(new eo(.16,.2,3),n.tone??o.m.wood,r+.04,.12,0,0,0,-Math.PI/2,1,1,.3),l.box(o.m.paper,r*.6,.05,.01,r/2-.05,.1,.03,.003)}),t.ball(o.m.brass,.07,0,s+.05,0)}function xh(o,t,e=o.p.fabricRed){const{m:s}=o;for(const n of[-.55,.55]){t.put(new Dt(.33,.018,8,28),s.darkSteel,n,.36,0);for(let a=0;a<6;a++){const i=a/6*Math.PI;t.strut(s.steel,[n+Math.cos(i)*.32,.36+Math.sin(i)*.32,0],[n-Math.cos(i)*.32,.36-Math.sin(i)*.32,0],.004,3)}t.cyl(s.steel,.03,.03,.05,n,.36,0,8)}t.strut(e,[-.55,.36,0],[-.1,.38,0],.016,6),t.strut(e,[-.1,.38,0],[.4,.74,0],.016,6),t.strut(e,[-.55,.36,0],[-.1,.75,0],.016,6),t.strut(e,[-.1,.75,0],[.4,.74,0],.016,6),t.strut(e,[.4,.74,0],[.55,.36,0],.016,6),t.box(o.p.leather,.22,.04,.1,-.12,.8,0,.015),t.strut(s.darkSteel,[.4,.74,0],[.38,.95,0],.012,5),t.box(s.darkSteel,.03,.03,.4,.38,.95,0,.008)}function wh(o,t,e=6,s=.72){const n=Math.floor(e/.42);for(let a=0;a<=n;a++)t.box(o.m.woodDark,.2,.1,s+.7,a/n*e,0,0,.02);for(const a of[-1,1])t.box(o.m.steel,e,.07,.07,e/2,.1,a*s/2,.012)}function Mh(o,t,e=.55,s=o.p.fabricRed){t.cyl(o.m.darkSteel,.012,.012,1.5,0,0,0,6),t.put(new eo(e,.28,16,1,!0),s,0,1.58,0),t.ball(o.m.brass,.025,0,1.76,0)}function yh(o,t,e=2.4){for(const a of[-1,1])t.strut(o.m.wood,[a*.22,0,.3],[a*.22,e,.3-e*.2],.025,6);const n=Math.floor(e/.3);for(let a=1;a<=n;a++){const i=a*.3/e;t.box(o.m.woodDark,.44,.03,.08,0,i*e-.015,.3-i*e*.2,.008)}for(const a of[-1,1])t.cyl(o.p.plasticDark,.03,.03,.04,a*.22,0,.3,8)}function bh(o,t,e=2){const s=hs(e);t.box(o.m.wood,1.2,.05,.5,0,.35,0,.012),t.box(o.m.woodDark,1.2,.3,.04,0,.35,-.23,.01);for(const n of[-1,1])t.box(o.m.woodDark,.05,.8,.5,n*.58,.35,0,.01);t.box(o.m.woodDark,1.2,.04,.4,0,.7,0,.01,-.2);for(const n of[-1,1])for(const a of[-1,1])t.put(new Dt(.1,.03,8,14),o.m.darkSteel,n*.5,.12,a*.2,0,Math.PI/2);for(let n=0;n<2;n++){let a=-.52;for(;a<.5;){const i=.04+s()*.03;t.box(o.p.books[Math.floor(s()*o.p.books.length)],i,.18+s()*.1,.22,a+i/2,n===0?.4:.74,-.02,.004,0,0,n===1?-.2:0),a+=i+.004}}}function hs(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const ma=new WeakMap;function Dc(o,t,e,s,n={}){const{m:a}=o,i=n.cols??2,r=n.rows??2,l=n.frame??a.woodDark;let c=ma.get(o);c||(c={glow:new at({color:16769704,emissive:16757850,emissiveIntensity:.55,roughness:.7}),curtain:new at({color:14272680,roughness:.95,side:mt})},ma.set(o,c));const h=mi;n.lit!==!1&&t.box(c.glow,e-h,s-h,.01,0,h/2,-(n.recess??.02),.002),t.put(new At(e-h*1.4,s-h*1.4),a.glass,0,s/2,.02),t.box(l,e+h*2,h,.08,0,-h,0,.006),t.box(l,e+h*2,h,.08,0,s,0,.006),t.box(l,h,s+h*2,.08,-e/2-h/2,-h,0,.006),t.box(l,h,s+h*2,.08,e/2+h/2,-h,0,.006);for(let m=1;m<i;m++)t.box(l,.022,s,.05,-e/2+e*m/i,0,.03,.003);for(let m=1;m<r;m++)t.box(l,e,.022,.05,0,s*m/r,.03,.003);const f=Math.max(0,n.sillOverhang??.11),p=Math.max(0,n.lintelOverhang??.1);if(t.box(a.stoneWarm,e+f*2,.05,.16,0,-h-.05,.05,.01),t.box(a.stoneDark,e+p*2,.06,.1,0,s+h,.03,.01),n.curtain){for(const m of[-1,1]){const u=new At(e*.3,s*.92,5,1),g=u.attributes.position;for(let x=0;x<g.count;x++)g.setZ(x,Math.sin(g.getX(x)*40)*.012);u.computeVertexNormals(),t.put(u,c.curtain,m*e*.33,s*.5,.06)}t.box(a.brass,e+.08,.015,.015,0,s-.03,.07,.004)}}export{lh as $,oh as A,H1 as B,ah as C,Y1 as D,B1 as E,di as F,j1 as G,rh as H,eh as I,fh as J,hh as K,e1 as L,Ja as M,Q1 as N,$1 as O,W1 as P,q1 as Q,K1 as R,th as S,uh as T,ih as U,ch as V,S1 as W,ph as X,gh as Y,nh as Z,J1 as _,Jo as a,F1 as a$,mh as a0,wh as a1,Mh as a2,vh as a3,Dc as a4,xh as a5,$r as a6,V1 as a7,Kn as a8,yh as a9,Hc as aA,Lc as aB,I1 as aC,A0 as aD,o1 as aE,l1 as aF,T1 as aG,w0 as aH,Uc as aI,i1 as aJ,Nr as aK,a1 as aL,s1 as aM,c1 as aN,Zr as aO,Fn as aP,il as aQ,x1 as aR,A1 as aS,_1 as aT,Qc as aU,Jc as aV,t1 as aW,m1 as aX,d1 as aY,p1 as aZ,$c as a_,bh as aa,X1 as ab,Z1 as ac,Se as ad,O0 as ae,u1 as af,jc as ag,Gc as ah,Wc as ai,Fc as aj,Nc as ak,z1 as al,U1 as am,Ic as an,Da as ao,r1 as ap,Bc as aq,Yc as ar,ir as as,zc as at,Xc as au,D1 as av,R1 as aw,C1 as ax,L1 as ay,Vc as az,f1 as b,Ss as b0,Oc as b1,N1 as b2,_a as b3,Kr as b4,Kc as b5,n1 as b6,P0 as b7,Ws as b8,E1 as b9,zt as ba,P1 as bb,bs as bc,h1 as c,fl as d,g1 as e,v1 as f,xr as g,Zc as h,xl as i,Qe as j,jl as k,gl as l,Ir as m,b1 as n,Qa as o,y1 as p,Xa as q,w1 as r,qc as s,M1 as t,k1 as u,Ya as v,G1 as w,O1 as x,sh as y,dh as z};
