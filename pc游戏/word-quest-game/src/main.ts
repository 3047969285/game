import { App } from "./app/App";
import { audio } from "./infra/audio";

document.body.addEventListener("click", () => audio.unlock(), { once: true });

const root = document.getElementById("app");
if (!root) throw new Error("#app not found");

new App(root).start().catch((err) => {
  console.error(err);
  root.innerHTML = `<div class="card"><div class="title">加载失败</div><p>${String(err)}</p><p class="subtitle">请运行 npm run dev 启动</p></div>`;
});
