/** Keep game-level window hotkeys from seeing keys pressed while this modal owns focus. */
export function handleTextbookModalKeydown(
  event: KeyboardEvent,
  focusableElements: readonly HTMLElement[],
  activeElement: Element | null,
  close: () => void
): void {
  event.stopPropagation();

  if (event.key === "Escape") {
    close();
    return;
  }
  if (event.key !== "Tab") return;

  if (focusableElements.length === 0) {
    event.preventDefault();
    return;
  }

  const activeIndex = focusableElements.indexOf(activeElement as HTMLElement);
  if (activeIndex < 0) {
    event.preventDefault();
    (event.shiftKey ? focusableElements[focusableElements.length - 1] : focusableElements[0]).focus();
  } else if (event.shiftKey && activeIndex === 0) {
    event.preventDefault();
    focusableElements[focusableElements.length - 1].focus();
  } else if (!event.shiftKey && activeIndex === focusableElements.length - 1) {
    event.preventDefault();
    focusableElements[0].focus();
  }
}
