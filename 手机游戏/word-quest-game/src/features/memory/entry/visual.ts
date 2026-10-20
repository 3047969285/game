export interface EntryFrame { time: number; cover: number; reveal: number; reduced: boolean }
export interface MemoryMote { angle: number; radius: number; size: number; warmth: number; phase: number }
export const COVER_MS = 1150;
export const REVEAL_MS = 1050;
export const ease = (value: number): number => { const t = Math.max(0, Math.min(1, value)); return t*t*(3-2*t); };

/** Fixed seeds keep frame-to-frame movement continuous, with no random flashing. */
export function memoryMotes(low: boolean): MemoryMote[] {
  let seed = 20902026;
  const random = (): number => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  return Array.from({ length: low ? 64 : 128 }, () => ({ angle: random()*Math.PI*2, radius: .24+random()*.66, size: .45+random()*1.35, warmth: random(), phase: random()*6.28 }));
}

/** One capped 2D canvas. No textures, WebGL context, readbacks or scene copies. */
export function drawMemoryEntry(ctx: CanvasRenderingContext2D, width: number, height: number, frame: EntryFrame, motes: readonly MemoryMote[]): void {
  const { time, reduced } = frame;
  const cover = ease(frame.cover), reveal = ease(frame.reveal);
  const size = Math.min(width, height), cx = width*.5, cy = height*.43;
  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  ctx.fillStyle = `rgba(4,9,19,${cover})`;
  ctx.fillRect(0, 0, width, height);
  const atmosphere = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.hypot(width, height)*.7);
  atmosphere.addColorStop(0, `rgba(42,87,101,${cover*.36})`);
  atmosphere.addColorStop(.6, `rgba(17,37,62,${cover*.20})`);
  atmosphere.addColorStop(1, "rgba(4,9,19,0)");
  ctx.fillStyle = atmosphere; ctx.fillRect(0, 0, width, height);
  const life = cover*(1-reveal);
  if (!reduced && life > .001) {
    ctx.globalCompositeOperation = "screen";
    for (const [index, mote] of motes.entries()) {
      const angle = mote.angle + time*.095 + cover*.85;
      const radius = mote.radius*size*(1-cover*.74);
      const x = cx+Math.cos(angle)*radius*1.6, y = cy+Math.sin(angle)*radius;
      const tail = (6+cover*20)*(0.45+mote.radius);
      const outward = Math.atan2(y-cy, x-cx);
      ctx.globalAlpha = life*(.13+.30*(.5+.5*Math.sin(time*.7+mote.phase)));
      ctx.strokeStyle = mote.warmth > .65 ? "#e9cda0" : "#9ecbd4";
      ctx.lineWidth = mote.size*.55;
      if (index%3 === 0) {
        ctx.beginPath(); ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x+Math.cos(outward+.85)*tail*.5, y+Math.sin(outward+.85)*tail*.5, x+Math.cos(outward+1.1)*tail, y+Math.sin(outward+1.1)*tail);
        ctx.stroke();
      }
      if (index%16 === 0) {
        const glow = ctx.createRadialGradient(x,y,0,x,y,8+mote.size*3);
        glow.addColorStop(0, mote.warmth > .65 ? "rgba(243,216,174,.5)" : "rgba(173,215,225,.45)");
        glow.addColorStop(1,"rgba(173,215,225,0)");
        ctx.fillStyle=glow; ctx.fillRect(x-14,y-14,28,28);
      }
      ctx.globalAlpha *= 1.8;
      ctx.fillStyle = mote.warmth > .65 ? "#f4ddbb" : "#c4e1e5";
      ctx.beginPath(); ctx.arc(x, y, mote.size, 0, Math.PI*2); ctx.fill();
    }
    const radius = size*.17*(1+Math.sin(time*1.3)*.025+reveal*1.8);
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-.25+time*.055);
    for (let i=0; i<3; i++) {
      ctx.globalAlpha = life*(.42-i*.075);
      ctx.strokeStyle = i === 1 ? "#ddc094" : "#b7dee2";
      ctx.lineWidth = i === 1 ? 1.4 : .8;
      ctx.beginPath(); ctx.ellipse(0, 0, radius*(1+i*.09), radius*(.74+i*.10), i*.42, .15+time*.13, Math.PI*1.63+time*.13); ctx.stroke();
      ctx.globalAlpha *= .18; ctx.lineWidth = 6; ctx.stroke();
    }
    ctx.restore();
    ctx.globalAlpha = life;
    const heart = ctx.createRadialGradient(cx, cy, 0, cx, cy, size*.22);
    heart.addColorStop(0, "rgba(222,218,183,.28)");
    heart.addColorStop(.4, "rgba(119,187,195,.15)");
    heart.addColorStop(1, "rgba(119,187,195,0)");
    ctx.fillStyle = heart; ctx.fillRect(0, 0, width, height);
    ctx.font = `${Math.max(10, Math.min(13, size*.018))}px ui-monospace, monospace`;
    ctx.textAlign = "center";
    ["REMEMBER", "ONCE", "2026", "YESTERDAY"].forEach((word, i) => {
      const angle = i*Math.PI*.5+.4+time*.026;
      ctx.globalAlpha = life*.24;
      ctx.fillStyle = i%2 ? "#e1c99f" : "#aacbd6";
      ctx.fillText(word, cx+Math.cos(angle)*size*.32, cy+Math.sin(angle)*size*.25);
    });
  }
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  if (reveal > 0 && reduced) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = `rgba(0,0,0,${reveal})`;
    ctx.fillRect(0,0,width,height);
    ctx.globalCompositeOperation = "source-over";
  } else if (reveal > 0) {
    // A softly feathered aperture reveals the already-rendered memory, so
    // readiness never cuts to an empty black frame or a white flash.
    const radius = reveal*Math.hypot(width, height)*.72;
    const feather = size*.10;
    const aperture = ctx.createRadialGradient(cx, cy, Math.max(0, radius-feather), cx, cy, radius+feather);
    aperture.addColorStop(0, "rgba(0,0,0,1)"); aperture.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = aperture; ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "source-over";
  }
}
