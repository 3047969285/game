import { describe, expect, it, vi } from "vitest";
import { handleTextbookModalKeydown } from "./keyboard";

function keyEvent(type: string, key: string, shiftKey = false): KeyboardEvent {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperties(event, {
    key: { value: key },
    shiftKey: { value: shiftKey },
  });
  return event as KeyboardEvent;
}

function dispatchAlongPath(event: Event, targets: EventTarget[]): void {
  for (const target of targets) {
    target.dispatchEvent(event);
    if (event.cancelBubble) break;
  }
}

describe("教材 modal keyboard boundary", () => {
  it("prevents editor e/Enter/w keydown from reaching window hotkeys; Escape closes", () => {
    const editor = new EventTarget();
    const modal = new EventTarget();
    const windowTarget = new EventTarget();
    const gameKeys: string[] = [];
    const releasedKeys: string[] = [];
    const close = vi.fn();
    windowTarget.addEventListener("keydown", (event) => gameKeys.push((event as KeyboardEvent).key));
    windowTarget.addEventListener("keyup", (event) => releasedKeys.push((event as KeyboardEvent).key));
    modal.addEventListener("keydown", (event) => handleTextbookModalKeydown(event as KeyboardEvent, [], null, close));

    for (const key of ["e", "Enter", "w"]) {
      const down = keyEvent("keydown", key);
      dispatchAlongPath(down, [editor, modal, windowTarget]);
      expect(down.defaultPrevented).toBe(false);
      const up = keyEvent("keyup", key);
      dispatchAlongPath(up, [editor, modal, windowTarget]);
    }
    const escape = keyEvent("keydown", "Escape");
    dispatchAlongPath(escape, [editor, modal, windowTarget]);

    expect(gameKeys).toEqual([]);
    expect(releasedKeys).toEqual(["e", "Enter", "w"]);
    expect(close).toHaveBeenCalledOnce();

    windowTarget.dispatchEvent(keyEvent("keydown", "e"));
    expect(gameKeys).toEqual(["e"]);
  });

  it("keeps Tab navigation inside the modal without suppressing Enter defaults", () => {
    const first = { focus: vi.fn() } as unknown as HTMLElement;
    const last = { focus: vi.fn() } as unknown as HTMLElement;
    const close = vi.fn();
    const shiftTab = keyEvent("keydown", "Tab", true);
    handleTextbookModalKeydown(shiftTab, [first, last], first, close);
    expect(shiftTab.defaultPrevented).toBe(true);
    expect(last.focus).toHaveBeenCalledOnce();

    const enter = keyEvent("keydown", "Enter");
    handleTextbookModalKeydown(enter, [first, last], first, close);
    expect(enter.defaultPrevented).toBe(false);
  });
});
