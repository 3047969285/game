import { characterLook } from "../characters";
import { APARTMENT, OLD_MAN_SEAT } from "../stages/apartment2090";
import type { MemoryScript } from "../types";

/**
 * 2090 年的开场：雨夜，安静的公寓，窗外是安静的未来城市。
 * 老年的他（灰发、开衫）坐在椅子上，桌上放着 2026 年的纸质旧笔记本，桌边悬浮着柔光的 “MEMORY RECALL” 界面。
 * 他把手放上界面，系统问他准备好了没有——下潜：光粒洪流越来越急，他慢慢闭上眼睛（渐黑，没有白屏），进入 2026 年。
 * 雨夜保留视觉表现，声音使用场景配乐与旁白。约 60–90 秒。
 */

const OLD = APARTMENT.oldMan;
const PANEL = APARTMENT.panel;

export const PROLOGUE_SCRIPT: MemoryScript = {
  id: "prologue",
  unitId: "",
  section: "section_a",
  title: "Destination: 2026",
  titleZh: "目的地：2026",
  stage: "apartment2090",
  weather: "lightRain",
  actors: [
    {
      id: "old2090",
      name: "Me (2090)",
      look: characterLook("old2090"), // 与当年的我同一张脸；稀疏灰白后梳 + 细金属圆框眼镜 + 开衫；动作慢、含胸
      position: { x: OLD.x, y: OLD.y, z: OLD.z },
      rotationY: OLD.yaw,
      seat: OLD_MAN_SEAT, // 坐在软垫椅上；reach 时右手 IK 伸向悬浮界面
      pose: "lap", // 坐着，双手放在膝上
    },
  ],
  objects: [],
  beats: [
    { kind: "wait", seconds: 0.4 },
    // 夜、雨、安静的城市：先只有房间、窗和雨，镜头缓缓推向窗外（几秒钟没有字幕，只有雨声）
    {
      kind: "build",
      targets: ["floor", "wall_left", "wall_right", "wall_front", "ceiling", "window"],
      pov: "watch",
      camera: { from: { x: -2.2, y: 1.5, z: 3.1 }, to: { x: -1.0, y: 1.45, z: 2.3 }, look: { x: 0.2, y: 1.35, z: -3 }, duration: 9, move: "dolly" },
      duration: 2.4,
      wait: 1.2,
    },
    { kind: "build", targets: ["city", "rain"], duration: 4.2, wait: 3.2 },
    { kind: "build", targets: ["chair", "desk", "notebook", "lamp", "plant", "panel", "old2090"], duration: 2.6, wait: 3.4 },
    {
      kind: "narrate",
      pov: "watch",
      text: "It has been sixty-four years.",
      zh: "六十四年了。",
      voice: "old",
      speaker: "old2090",
      camera: { from: { x: -1.0, y: 1.4, z: 2.7 }, to: { x: 0.1, y: 1.3, z: 1.95 }, look: { x: 0.7, y: 1.2, z: -0.45 }, duration: 14, move: "dolly" },
    },
    { kind: "narrate", pov: "watch", text: "I still remember the sound of English in that classroom.", zh: "我还记得那间教室里英语的声音。", voice: "old", speaker: "old2090" },
    { kind: "narrate", pov: "watch", text: "Tonight, I would like to hear it once more.", zh: "今晚，我想再听一次。", voice: "old", speaker: "old2090" },
    // 他抬起右手，屈着肘慢慢伸向界面（约 1.5 秒），左手仍放在膝上
    { kind: "actor", actorId: "old2090", action: "pose", pose: "reach" },
    { kind: "wait", seconds: 1.8 },
    { kind: "narrate", pov: "watch", text: "Memory recall. Destination: 2026. University.", zh: "记忆回溯。目的地：2026 年，大学。", voice: "system" },
    // 第一人称：借他的眼睛看着面前的界面
    {
      kind: "choice",
      speaker: "Memory Recall",
      line: "Are you ready?",
      zh: "准备好了吗？",
      voice: "system",
      viewer: "old2090",
      lookAt: { x: PANEL.x, y: PANEL.y - 0.05, z: PANEL.z },
      options: [
        { label: "Ready.", reply: "I am ready.", correct: true },
        { label: "Not yet.", reply: "Of course. Take your time. I will wait.", correct: false, soft: true },
      ],
    },
    { kind: "dive", seconds: 3.6 },
  ],
};
