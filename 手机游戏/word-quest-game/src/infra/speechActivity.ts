/** Shared speech focus: overlapping/cancelled narration cannot leave music ducked. */
const active = new Map<symbol, string | undefined>();
const listeners = new Set<(speaking: boolean) => void>();
const speakerListeners = new Set<(speakerId: string | null) => void>();
let lastSpeaker: string | null = null;

function notify(): void {
  for (const listener of listeners) listener(active.size > 0);
  const speaker = getActiveSpeaker();
  if (speaker !== lastSpeaker) {
    lastSpeaker = speaker;
    for (const listener of speakerListeners) listener(speaker);
  }
}

/** 最近一个仍在说话的人物 id（旁白 / 系统音没有 id 时为 null）。 */
export function getActiveSpeaker(): string | null {
  let id: string | null = null;
  for (const value of active.values()) if (value !== undefined) id = value;
  return id;
}

/** speakerId：这段语音是谁说的（回忆里的人物 actor id），让对应人物开口、其他人看向他。 */
export function beginSpeech(speakerId?: string): () => void {
  const token = Symbol();
  active.set(token, speakerId);
  notify();
  let ended = false;
  return () => {
    if (ended) return;
    ended = true;
    active.delete(token);
    notify();
  };
}
export function onSpeechActivity(listener: (speaking: boolean) => void): () => void {
  listeners.add(listener);
  listener(active.size > 0);
  return () => { listeners.delete(listener); };
}
export function onSpeakerChange(listener: (speakerId: string | null) => void): () => void {
  speakerListeners.add(listener);
  listener(getActiveSpeaker());
  return () => { speakerListeners.delete(listener); };
}
