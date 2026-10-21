import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

/**
 * 回忆的“底片”后期通道（放在调色之后）：
 *  - uFilm：褪成冷银色胶片（降饱和 + 冷银 + 颗粒 + 暗角）——定格用
 *  - uFade：闭眼（渐暗到深冷色，上浮 / 下潜用，不再淡白）
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

let reducedMotionQuery: MediaQueryList | null = null;
let reducedMotionQueryRead = false;

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
          float k = floor(uTime * 16.0);
          uv += (vec2(h21(vec2(k, 1.3)), h21(vec2(k, 7.1))) - 0.5) * 0.006 * uJitter;
          uv.y += step(0.96, h21(vec2(k, 3.7))) * 0.009 * uJitter;
        }
        vec3 c = texture2D(tDiffuse, uv).rgb;
        float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
        vec3 sepia = vec3(l) * vec3(0.94, 1.0, 1.1);
        c = mix(c, sepia, uFilm * 0.64);
        c *= mix(vec3(1.0), vec3(0.96, 1.0, 1.05), uFilm);
        c += (h21(vUv * vec2(1731.0, 911.0) + floor(uTime * 4.0)) - 0.5) * 0.026 * uFilm;
        float vig = smoothstep(0.32, 0.95, length((vUv - 0.5) * vec2(1.0, 1.1)) * 1.25);
        c *= 1.0 - vig * 0.34 * uFilm;
        c *= 1.0 - uDim;
        c = mix(c, vec3(0.012, 0.018, 0.03), uFade);
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
  const reducedMotion = prefersReducedMotion();
  const jitter = reducedMotion ? 0 : c.jitter;
  u.uFilm.value = c.film;
  u.uFade.value = c.fade;
  u.uDim.value = c.dim;
  u.uJitter.value = jitter;
  u.uTime.value = reducedMotion ? 0 : time;
  pass.enabled = c.film > 0.001 || c.fade > 0.001 || c.dim > 0.001 || jitter > 0.001;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (!reducedMotionQueryRead) {
    reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") ?? null;
    reducedMotionQueryRead = true;
  }
  return reducedMotionQuery?.matches === true;
}
