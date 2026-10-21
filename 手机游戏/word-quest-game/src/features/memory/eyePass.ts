import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import type { EyeController } from "./eyeOpen";

/**
 * “眼睛”后期通道（放在管线最后）：眼睑形暗角（上下两道软弧）+ 虚焦 + 曝光适应。
 * 输出永远不会比输入亮：mask ≤ 1，exposure ≤ 1，所以不存在白闪。
 * 完全睁开且已聚焦时 enabled=false，不产生任何开销。
 */
export function createEyePass(): ShaderPass {
  const pass = new ShaderPass({
    uniforms: {
      tDiffuse: { value: null },
      uOpen: { value: 0 },
      uBlur: { value: 1 },
      uExposure: { value: 0.55 },
      uAspect: { value: 1.6 },
      uTime: { value: 0 },
    },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform float uOpen, uBlur, uExposure, uAspect, uTime;
      varying vec2 vUv;
      float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      void main() {
        vec3 c;
        if (uBlur > 0.003) {
          // 12 点螺旋采样的圆形虚焦（景深的廉价近似：整幅同一焦外半径，随聚焦收敛为 0）
          float r = uBlur * 0.02;
          c = vec3(0.0);
          for (int i = 0; i < 12; i++) {
            float a = float(i) * 2.39996;
            float rr = sqrt((float(i) + 0.5) / 12.0);
            vec2 o = vec2(cos(a) / uAspect, sin(a)) * rr * r;
            c += texture2D(tDiffuse, vUv + o).rgb;
          }
          c /= 12.0;
        } else {
          c = texture2D(tDiffuse, vUv).rgb;
        }
        c *= uExposure;
        // 眼睑：两道软弧围出一个杏仁形开口，开度越大开口越宽越高
        vec2 p = vUv - 0.5;
        float H = 0.85 * uOpen;
        float W = 0.2 + 1.35 * uOpen;
        float gap = H * max(0.0, 1.0 - (p.x * p.x) / (W * W));
        float s = 0.03 + 0.07 * (1.0 - uOpen);
        float d = abs(p.y) - gap;
        float mask = (1.0 - smoothstep(-s, s, d)) * smoothstep(0.0, 0.22, uOpen);
        // 睫毛边缘的微弱暖暗过渡会偏色，这里保持中性的深色
        c = c * mask + (h21(vUv * 913.0 + floor(uTime * 24.0)) - 0.5) * (1.0 / 255.0) * (1.0 - mask * 0.5) * step(0.001, uOpen);
        gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
      }
    `,
  });
  pass.enabled = true;
  return pass;
}

/** 把控制器的状态写进通道；完全睁开且聚焦后关闭通道 */
export function applyEye(pass: ShaderPass, eye: EyeController, aspect: number, time: number): void {
  const u = pass.uniforms;
  u.uOpen.value = eye.open;
  u.uBlur.value = eye.blur;
  u.uExposure.value = eye.exposure;
  u.uAspect.value = aspect;
  u.uTime.value = time;
  pass.enabled = eye.active;
}
