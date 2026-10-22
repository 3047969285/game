/**
 * 测试夹具：clubRoom 舞台的 5 个同学与若干词物件。
 * 旧手写剧本 u01a（《周四的沉默》）已退役，这里只保留舞台/预算测试需要的最小数据。
 */
import type { Actor, WordObjectPlacement } from "./types";
import { CLUB_SEATS, clubSeatSpec } from "./stages/clubRoom";
import { characterLook } from "./characters";

const SEATS: Array<[keyof typeof CLUB_SEATS, string, string]> = [
  ["me", "me2026", "Me (2026)"],
  ["lin", "lin", "Lin"],
  ["mei", "mei", "Mei"],
  ["an", "an", "An"],
  ["rui", "rui", "Rui"],
];

export const CLUB_ACTORS_FIXTURE: Actor[] = SEATS.map(([seatId, charId, name]) => ({
  id: charId,
  name,
  look: characterLook(charId),
  position: { x: CLUB_SEATS[seatId].x, y: 0, z: CLUB_SEATS[seatId].z },
  rotationY: CLUB_SEATS[seatId].yaw,
  seat: clubSeatSpec(seatId),
}));

export const CLUB_OBJECTS_FIXTURE: WordObjectPlacement[] = ["fixture_01", "fixture_02", "fixture_03", "fixture_04", "fixture_05"].map(
  (wordId) => ({ wordId, archetype: "book", position: { x: 0, y: 0, z: 0 } })
);
