/** 创建 DOM 元素 */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/** 底部提示条 */
export function showToast(message: string, ms = 2200): void {
  document.querySelector(".toast")?.remove();
  const t = el("div", "toast", message);
  document.body.appendChild(t);
  setTimeout(() => t.remove(), ms);
}
