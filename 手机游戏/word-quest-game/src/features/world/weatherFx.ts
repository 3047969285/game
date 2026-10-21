import * as THREE from "three";
import { maxBudget, type WeatherQuality, type WeatherState } from "./weather";

/**
 * 天气渲染（GPU）：
 *  - 雨线 / 雪片：InstancedBufferGeometry 的面片，位置全部在顶点着色器里按“相机相对体积 + 累积风偏移”解析计算，
 *    没有逐帧 CPU 粒子更新；风变化时只改一个累积偏移，不会产生跳变。
 *  - 涟漪 / 溅射：贴地的环形面片，随机相位循环（雨天地面与水面）。
 *  - 窗玻璃雨痕：室内只在窗上显示雨，不在室内落雨。
 *  - 水洼：平地上的噪声遮罩 + 菲涅尔天空反光（仅平整地面场景）。
 *  - WetnessTracker：潮湿变暗 + 粗糙度下降（只在潮湿度变化时改材质）。
 * 详见 docs/api-memory-look.md §2.3。
 */

export type WeatherFxMode = "outdoor" | "window" | "off";

export interface WeatherWindow {
  /** 窗玻璃中心（世界坐标），平面朝 +z（面向室内） */
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
}

export interface WeatherFxOptions {
  quality: WeatherQuality;
  mode: WeatherFxMode;
  window?: WeatherWindow;
  groundY?: number;
  /** 平整地面（水洼才有意义）；主世界地形起伏，不画水洼 */
  flatGround?: boolean;
  /** 降水体积的水平半径（米） */
  radius?: number;
}

const QUAD_POS = new Float32Array([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0]);
const QUAD_UV = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
const QUAD_IDX = [0, 1, 2, 0, 2, 3];

function instanced(count: number, seed: number): THREE.InstancedBufferGeometry {
  const g = new THREE.InstancedBufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(QUAD_POS, 3));
  g.setAttribute("uv", new THREE.BufferAttribute(QUAD_UV, 2));
  g.setIndex(QUAD_IDX);
  const rnd = new Float32Array(count * 4);
  let s = seed >>> 0;
  const r = (): number => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = 0; i < count; i++) {
    rnd[i * 4] = r();
    rnd[i * 4 + 1] = r();
    rnd[i * 4 + 2] = r();
    // w：既是“裁剪键”（< 强度才显示），也派生速度差异。分层均匀分布，强度渐增时粒子均匀增多
    rnd[i * 4 + 3] = (i + r()) / Math.max(1, count);
  }
  g.setAttribute("aRnd", new THREE.InstancedBufferAttribute(rnd, 4));
  g.instanceCount = count;
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
  g.boundingBox = new THREE.Box3(new THREE.Vector3(-1e6, -1e6, -1e6), new THREE.Vector3(1e6, 1e6, 1e6));
  return g;
}

const PRECIP_VERT = /* glsl */ `
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
`;

const RAIN_FRAG = /* glsl */ `
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
`;

const SNOW_FRAG = /* glsl */ `
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
`;

const RIPPLE_VERT = /* glsl */ `
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
`;

const RIPPLE_FRAG = /* glsl */ `
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
`;

const GLASS_VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

const GLASS_FRAG = /* glsl */ `
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
`;

const PUDDLE_VERT = /* glsl */ `
varying vec3 vW;
varying vec2 vUv;
void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vUv = uv; gl_Position = projectionMatrix * viewMatrix * w; }
`;

const PUDDLE_FRAG = /* glsl */ `
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
`;

const _fwd = new THREE.Vector3();

export class WeatherFx {
  readonly object = new THREE.Group();
  private readonly rain?: THREE.Mesh;
  private readonly snow?: THREE.Mesh;
  private readonly ripples?: THREE.Mesh;
  private readonly glass?: THREE.Mesh;
  private readonly puddle?: THREE.Mesh;
  private readonly rainU: Record<string, THREE.IUniform>;
  private readonly snowU: Record<string, THREE.IUniform>;
  private readonly rippleU: Record<string, THREE.IUniform>;
  private readonly glassU: Record<string, THREE.IUniform>;
  private readonly puddleU: Record<string, THREE.IUniform>;
  private readonly disposables: Array<{ dispose(): void }> = [];
  private readonly off = new THREE.Vector3();
  private readonly snowOff = new THREE.Vector3();
  private readonly vel = new THREE.Vector3(0, -9, 0);
  private readonly vol: THREE.Vector3;
  private readonly boxMin = new THREE.Vector3();
  private t = 0;
  private groundY: number;
  private readonly opts: WeatherFxOptions;

  constructor(opts: WeatherFxOptions) {
    this.opts = opts;
    this.groundY = opts.groundY ?? 0;
    const r = opts.radius ?? 12;
    this.vol = new THREE.Vector3(r * 2, 14, r * 2);
    this.object.name = "weather-fx";
    const b = maxBudget(opts.quality);
    const common = (): Record<string, THREE.IUniform> => ({
      uBoxMin: { value: this.boxMin },
      uVol: { value: this.vol },
      uOff: { value: this.off },
      uVel: { value: this.vel },
      uIntensity: { value: 0 },
      uGroundY: { value: this.groundY },
      uMode: { value: 1 },
      uLen: { value: 0.55 },
      uWidth: { value: 0.012 },
      uPx: { value: 0.0015 },
      uT: { value: 0 },
      uColor: { value: new THREE.Color(0.62, 0.74, 0.86) },
      uOpacity: { value: 0.5 },
    });
    this.rainU = common();
    this.snowU = common();
    this.snowU.uMode.value = 0;
    this.snowU.uOff.value = this.snowOff;
    this.snowU.uWidth.value = 0.028;
    this.snowU.uColor.value = new THREE.Color(0.9, 0.95, 1.0);
    this.snowU.uOpacity.value = 0.85;
    this.rippleU = {
      uCamXZ: { value: new THREE.Vector3() },
      uRadius: { value: 9 },
      uGroundY: { value: this.groundY },
      uIntensity: { value: 0 },
      uT: { value: 0 },
      uColor: { value: new THREE.Color(0.7, 0.8, 0.9) },
      uOpacity: { value: 0.5 },
    };
    this.glassU = {
      uT: { value: 0 },
      uWet: { value: 0 },
      uSnow: { value: 0 },
      uSize: { value: new THREE.Vector2(1, 1) },
      uTint: { value: new THREE.Color(0.6, 0.66, 0.72) },
      uOpacity: { value: 1 },
    };
    this.puddleU = { uWet: { value: 0 }, uSky: { value: new THREE.Color(0.55, 0.65, 0.78) } };

    const mat = (vs: string, fs: string, u: Record<string, THREE.IUniform>, extra: Partial<THREE.ShaderMaterialParameters> = {}): THREE.ShaderMaterial => {
      const m = new THREE.ShaderMaterial({ vertexShader: vs, fragmentShader: fs, uniforms: u, transparent: true, depthWrite: false, fog: false, side: THREE.DoubleSide, ...extra });
      this.disposables.push(m);
      return m;
    };
    const mesh = (g: THREE.BufferGeometry, m: THREE.Material, order: number, name: string): THREE.Mesh => {
      this.disposables.push(g);
      const o = new THREE.Mesh(g, m);
      o.frustumCulled = false;
      o.renderOrder = order;
      o.name = name;
      o.raycast = () => undefined;
      o.visible = false;
      this.object.add(o);
      return o;
    };

    if (opts.mode === "outdoor") {
      this.rain = mesh(instanced(b.drops, 101), mat(PRECIP_VERT, RAIN_FRAG, this.rainU), 12, "weather-rain");
      this.snow = mesh(instanced(b.flakes, 202), mat(PRECIP_VERT, SNOW_FRAG, this.snowU), 12, "weather-snow");
      this.ripples = mesh(instanced(b.splashes, 303), mat(RIPPLE_VERT, RIPPLE_FRAG, this.rippleU), 11, "weather-ripples");
      if (opts.flatGround) {
        const g = new THREE.PlaneGeometry(60, 60);
        g.rotateX(-Math.PI / 2);
        this.puddle = mesh(g, mat(PUDDLE_VERT, PUDDLE_FRAG, this.puddleU, { polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }), 10, "weather-puddle");
      }
    } else if (opts.mode === "window" && opts.window) {
      const w = opts.window;
      const g = new THREE.PlaneGeometry(w.width, w.height);
      this.glassU.uSize.value.set(w.width, w.height);
      this.glass = mesh(g, mat(GLASS_VERT, GLASS_FRAG, this.glassU), 13, "weather-glass");
      this.glass.position.set(w.x, w.y, w.z);
    }
  }

  setGround(y: number): void {
    this.groundY = y;
  }

  get mode(): WeatherFxMode {
    return this.opts.mode;
  }

  /** 每帧调用；tone 为场景亮度 0..1（夜晚雨线不应发亮），viewH/fov 用于保证雨线至少约一个像素宽 */
  update(dt: number, w: WeatherState, camera: THREE.Camera, tone: number, viewH: number, fovDeg: number, windSpeed: number): void {
    this.t += dt;
    const p = w.params;
    const mode = this.opts.mode;
    if (mode === "window") {
      if (!this.glass) return;
      const wet = Math.min(1, p.rain * 1.1 + p.mist * 0.55);
      const on = wet > 0.01 || p.snow > 0.01;
      this.glass.visible = on;
      if (on) {
        this.glassU.uT.value = this.t;
        this.glassU.uWet.value = wet;
        this.glassU.uSnow.value = p.snow;
        (this.glassU.uTint.value as THREE.Color).setRGB(0.5 + 0.2 * tone, 0.56 + 0.2 * tone, 0.64 + 0.2 * tone);
      }
      return;
    }
    if (mode !== "outdoor") return;

    // 风：水平速度 = 风向 × 风力；雨下落 ~9 m/s，雪 ~1.3 m/s
    const wx = 0.82 * windSpeed * 4.5;
    const wz = 0.57 * windSpeed * 4.5;
    this.vel.set(wx, -9, wz);
    this.off.x += wx * dt;
    this.off.y += -9 * dt;
    this.off.z += wz * dt;
    this.snowOff.x += wx * 0.5 * dt;
    this.snowOff.y += -1.3 * dt;
    this.snowOff.z += wz * 0.5 * dt;
    // 数值回绕，避免长时间运行后精度退化（体积整倍数平移不可见）
    this.off.x %= this.vol.x * 64;
    this.off.y %= this.vol.y * 64;
    this.off.z %= this.vol.z * 64;
    this.snowOff.x %= this.vol.x * 64;
    this.snowOff.y %= this.vol.y * 64;
    this.snowOff.z %= this.vol.z * 64;

    camera.getWorldDirection(_fwd);
    _fwd.y = 0;
    if (_fwd.lengthSq() > 1e-4) _fwd.normalize();
    const cx = camera.position.x + _fwd.x * this.vol.x * 0.18;
    const cz = camera.position.z + _fwd.z * this.vol.z * 0.18;
    const cy = camera.position.y;
    this.boxMin.set(cx - this.vol.x * 0.5, cy - this.vol.y * 0.55, cz - this.vol.z * 0.5);
    const px = (2 * Math.tan(THREE.MathUtils.degToRad(fovDeg) / 2)) / Math.max(1, viewH);
    const lightTone = 0.25 + 0.75 * tone;

    const rainOn = p.rain > 0.005;
    if (this.rain) {
      this.rain.visible = rainOn;
      const u = this.rainU;
      u.uT.value = this.t;
      u.uIntensity.value = p.rain;
      u.uGroundY.value = this.groundY;
      u.uPx.value = px;
      u.uOpacity.value = 0.42 * lightTone;
      // 风越大条纹越斜，也略长（速度模糊）
      u.uLen.value = 0.5 + 0.2 * p.rain;
    }
    const snowOn = p.snow > 0.005;
    if (this.snow) {
      this.snow.visible = snowOn;
      const u = this.snowU;
      u.uT.value = this.t;
      u.uIntensity.value = p.snow;
      u.uGroundY.value = this.groundY;
      u.uPx.value = px;
      u.uOpacity.value = 0.85 * (0.4 + 0.6 * lightTone);
    }
    if (this.ripples) {
      this.ripples.visible = rainOn;
      const u = this.rippleU;
      u.uIntensity.value = p.rain;
      u.uT.value = this.t;
      u.uGroundY.value = this.groundY;
      (u.uCamXZ.value as THREE.Vector3).set(camera.position.x, 0, camera.position.z);
      u.uOpacity.value = 0.5 * lightTone;
    }
    if (this.puddle) {
      const wet = w.wet;
      this.puddle.visible = wet > 0.2;
      if (this.puddle.visible) {
        this.puddle.position.set(Math.round(camera.position.x / 4) * 4, this.groundY + 0.012, Math.round(camera.position.z / 4) * 4);
        this.puddleU.uWet.value = wet;
        (this.puddleU.uSky.value as THREE.Color).setRGB(0.4 + 0.35 * tone, 0.48 + 0.35 * tone, 0.6 + 0.3 * tone);
      }
    }
  }

  dispose(): void {
    for (const d of this.disposables) d.dispose();
    this.disposables.length = 0;
    this.object.removeFromParent();
  }
}

interface WetBase {
  r: number;
  g: number;
  b: number;
  rough: number;
}

/** 潮湿：颜色变暗、粗糙度下降（高光变得集中）。只在潮湿度变化超过 0.01 时遍历材质 */
export class WetnessTracker {
  private readonly roots = new Set<THREE.Object3D>();
  private applied = -1;

  add(root: THREE.Object3D | null | undefined): void {
    if (root && !this.roots.has(root)) {
      this.roots.add(root);
      this.applied = -1;
    }
  }

  clear(): void {
    this.roots.clear();
    this.applied = -1;
  }

  /** 材质被替换（例如 Materializer 克隆）后调用，下一次 apply 会重新读取 */
  invalidate(): void {
    this.applied = -1;
  }

  apply(wet: number): void {
    if (Math.abs(wet - this.applied) < 0.01 && this.applied >= 0) return;
    this.applied = wet;
    const dark = 1 - 0.34 * wet;
    for (const root of this.roots) {
      root.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of mats) {
          const s = m as THREE.MeshStandardMaterial;
          if (!s.isMeshStandardMaterial || !s.color) continue;
          let base = s.userData.wetBase as WetBase | undefined;
          if (!base) {
            base = { r: s.color.r, g: s.color.g, b: s.color.b, rough: s.roughness };
            s.userData.wetBase = base;
          }
          s.color.setRGB(base.r * dark, base.g * dark, base.b * (1 - 0.3 * wet));
          s.roughness = Math.max(0.1, base.rough * (1 - 0.5 * wet));
        }
      });
    }
  }
}
