/** Shared speech focus: overlapping/cancelled narration cannot leave music ducked. */
const active = new Set<symbol>();
const listeners = new Set<(speaking: boolean) => void>();
function notify(): void { for (const listener of listeners) listener(active.size > 0); }
export function beginSpeech(): () => void {
  const token = Symbol();
  active.add(token);
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
