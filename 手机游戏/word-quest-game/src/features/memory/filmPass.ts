import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

/**
 * 回忆的“底片”后期通道（放在调色之后）：
 *  - uFilm：褪成暖色胶片（降饱和 + 暖黄 + 颗粒 + 暗角）——定格用
 *  - uFade：淡白（上浮）
 *  - uDim：整体压暗（二维笔记本时背景变暗）
 *  - uJitter：胶片卡顿抖动（断片答错）
 * 所有量为 0 时通道关闭（enabled=false），不产生任何开销。
 */
export interface FilmControls {
  film: number;
  fade: number;
  dim: number;
  jitter: number;
}

export function createFilmPass(): ShaderPass {
  const pass = new ShaderPass({
    uniforms: {
      tDiffuse: { value: null },
      uFilm: { value: 0 },
      uFade: { value: 0 },
      uDim: { value: 0 },
      uJitter: { value: 0 },
      uTime: { value: 0 },
    },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform float uFilm, uFade, uDim, uJitter, uTime;
      varying vec2 vUv;
      float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      void main() {
        vec2 uv = vUv;
        if (uJitter > 0.001) {
          float k = floor(uTime * 24.0);
          uv += (vec2(h21(vec2(k, 1.3)), h21(vec2(k, 7.1))) - 0.5) * 0.012 * uJitter;
          uv.y += step(0.92, h21(vec2(k, 3.7))) * 0.02 * uJitter;
        }
        vec3 c = texture2D(tDiffuse, uv).rgb;
        float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
        vec3 sepia = vec3(l) * vec3(1.14, 0.96, 0.72);
        c = mix(c, sepia, uFilm * 0.82);
        c *= mix(vec3(1.0), vec3(1.06, 0.98, 0.86), uFilm);
        c += (h21(vUv * vec2(1731.0, 911.0) + floor(uTime * 18.0)) - 0.5) * 0.085 * uFilm;
        float vig = smoothstep(0.32, 0.95, length((vUv - 0.5) * vec2(1.0, 1.1)) * 1.25);
        c *= 1.0 - vig * 0.62 * uFilm;
        c *= 1.0 - uDim;
        c = mix(c, vec3(1.0, 0.985, 0.94), uFade);
        gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
      }
    `,
  });
  pass.enabled = false;
  return pass;
}

/** 把控制量写进通道；全 0 时关闭通道 */
export function applyFilm(pass: ShaderPass, c: FilmControls, time: number): void {
  const u = pass.uniforms;
  u.uFilm.value = c.film;
  u.uFade.value = c.fade;
  u.uDim.value = c.dim;
  u.uJitter.value = c.jitter;
  u.uTime.value = time;
  pass.enabled = c.film > 0.001 || c.fade > 0.001 || c.dim > 0.001 || c.jitter > 0.001;
}
