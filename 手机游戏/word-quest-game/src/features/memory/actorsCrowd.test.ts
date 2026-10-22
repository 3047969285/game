import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { updateCrowd, type ActorHandle } from "./actors";
import { CLUB_SEATS, clubSeatSpec } from "./stages/clubRoom";
import { OLD_MAN_SEAT } from "./stages/apartment2090";
import { PROLOGUE_SCRIPT } from "./scripts/prologue";

function fake(id: string, x: number): ActorHandle & { log: string[] } {
  const log: string[] = [];
  const root = new THREE.Group();
  root.position.set(x, 0, 0);
  const handle = {
    id,
    root,
    speaking: false,
    log,
    attend: (target: unknown) => log.push(`attend:${target === null ? "none" : (target as { id?: string }).id ?? "point"}`),
    setListening: (on: boolean) => log.push(`listen:${on}`),
    glanceAt: (p: unknown) => log.push(`glance:${p ? "yes" : "no"}`),
  };
  return handle as unknown as ActorHandle & { log: string[] };
}

describe("群体注意力：谁在说话，其余人看谁、点头", () => {
  it("有人说话：其他人看他并倾听，说话的人看向某位听众", () => {
    const a = fake("lin", 0), b = fake("mei", 1), c = fake("an", 2);
    b.speaking = true;
    updateCrowd([a, b, c]);
    expect(a.log).toContain("attend:mei");
    expect(a.log).toContain("listen:true");
    expect(c.log).toContain("attend:mei");
    expect(b.log).toContain("listen:false");
    expect(b.log.find((l) => l.startsWith("attend:"))).not.toBe("attend:mei");
  });

  it("没人说话：全部回到默认视线；第一人称里同学会瞟向玩家（玩家自己的身体不瞟）", () => {
    const a = fake("lin", 0), me = fake("me2026", 1);
    updateCrowd([a, me], { handle: me, eye: new THREE.Vector3(0, 1.3, 0) });
    expect(a.log).toContain("attend:none");
    expect(a.log).toContain("glance:yes");
    expect(me.log).toContain("glance:no");
  });

  it("第一人称里别人说话时，他看向玩家的眼睛", () => {
    const a = fake("rui", 0), me = fake("me2026", 1);
    a.speaking = true;
    updateCrowd([a, me], { handle: me, eye: new THREE.Vector3(0, 1.3, 0) });
    expect(a.log.find((l) => l.startsWith("attend:"))).toBe("attend:point");
  });
});

describe("座位标定与剧本接入", () => {
  it("clubRoom 导出每个座位的椅面 / 桌面高度与桌边距离（0.35 m）以及桌上笔记本的座位局部坐标", () => {
    for (const id of Object.keys(CLUB_SEATS) as Array<keyof typeof CLUB_SEATS>) {
      const spec = clubSeatSpec(id);
      expect(spec.height).toBeCloseTo(0.48, 5);
      expect(spec.tableHeight).toBeCloseTo(0.75, 5);
      expect(spec.tableEdge).toBeCloseTo(0.35, 5);
      expect(spec.paper!.z).toBeGreaterThan(0.3);
      expect(spec.paper!.z).toBeLessThan(0.6);
      expect(Math.abs(spec.paper!.x)).toBeLessThan(0.45);
    }
    // Lin 的笔记本在她的右前方（x < 0 = 角色右侧）
    expect(clubSeatSpec("lin").paper!.x).toBeCloseTo(-0.35, 5);
  });

  it("五个座位都有座位标定；老人有座位且会伸手去够悬浮界面", () => {
    for (const id of Object.keys(CLUB_SEATS) as (keyof typeof CLUB_SEATS)[]) {
      expect(clubSeatSpec(id).tableEdge, id).toBeCloseTo(0.35, 5);
    }
    const old = PROLOGUE_SCRIPT.actors[0];
    expect(old.look.aged).toBe(true);
    expect(old.seat).toBe(OLD_MAN_SEAT);
    expect(OLD_MAN_SEAT.reach!.z).toBeGreaterThan(1.2); // 界面在前方约 1.5 m
    expect(OLD_MAN_SEAT.reach!.y).toBeCloseTo(1.3, 5);
  });

  it("2090 年旁白由老人的 actor 说出（speaker），嘴 / 手势跟着旁白", () => {
    const spoken = PROLOGUE_SCRIPT.beats.filter((b) => b.kind === "narrate" && b.voice === "old");
    expect(spoken.length).toBeGreaterThanOrEqual(3);
    for (const beat of spoken) expect((beat as { speaker?: string }).speaker).toBe("old2090");
  });
});
