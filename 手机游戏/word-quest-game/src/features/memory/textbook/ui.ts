import type { SectionKey } from "../ids";
import { MAX_TEXTBOOK_FILE_BYTES, decodeTextbookBytes, parseTextbookText, previewPassage } from "./parse";
import { textbookStore } from "./store";
import { analyzeTextbookOverwrites, type TextbookTarget } from "./overwrite";
import { handleTextbookModalKeydown } from "./keyboard";
import { TextbookInputError, type ParsedPassage, type TextbookPassage } from "./types";
import "./textbook.css";

const SECTION_OPTIONS: Array<{ key: SectionKey; label: string }> = [
  { key: "section_a", label: "Section A" },
  { key: "section_b", label: "Section B" },
  { key: "section_c", label: "Section C · Stories of China" },
];

let closeActiveTextbookModal: (() => void) | null = null;

function sectionLabel(key: SectionKey): string {
  return SECTION_OPTIONS.find((option) => option.key === key)?.label ?? key;
}

function showError(target: HTMLElement, message = ""): void {
  target.textContent = message;
  target.hidden = !message;
}

async function readTextFile(file: File): Promise<string> {
  if (!/\.(?:txt|md)$/i.test(file.name)) throw new TextbookInputError("当前只支持 .txt / .md 文件；PDF 和 DOCX 暂不支持。");
  if (file.size > MAX_TEXTBOOK_FILE_BYTES) throw new TextbookInputError(`文件超过 ${MAX_TEXTBOOK_FILE_BYTES.toLocaleString()} 字节上限，请分篇导入。`);
  return decodeTextbookBytes(new Uint8Array(await file.arrayBuffer()));
}

function unitOptions(selected: number): string {
  return Array.from({ length: 6 }, (_, index) => {
    const unit = index + 1;
    return `<option value="${unit}"${unit === selected ? " selected" : ""}>Unit ${unit}</option>`;
  }).join("");
}

function sectionOptions(selected: SectionKey): string {
  return SECTION_OPTIONS.map(({ key, label }) => `<option value="${key}"${key === selected ? " selected" : ""}>${label}</option>`).join("");
}

/** Open the local-only textbook editor. The caller loads this module lazily, including its CSS. */
export async function openTextbookManager(defaultUnit = 1, returnFocusTo?: HTMLElement): Promise<void> {
  const existing = document.querySelector<HTMLElement>(".textbook-modal-backdrop");
  if (closeActiveTextbookModal) closeActiveTextbookModal();
  else existing?.remove();
  const focusReturnTarget = returnFocusTo ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);

  const overlay = document.createElement("div");
  overlay.className = "textbook-modal-backdrop";
  overlay.innerHTML = `
    <section class="textbook-modal" role="dialog" aria-modal="true" aria-labelledby="textbook-title">
      <header class="textbook-modal-header">
        <div><p class="textbook-kicker">本机教材来源</p><h2 id="textbook-title">导入我的教材</h2></div>
        <button type="button" class="textbook-close" aria-label="关闭">×</button>
      </header>
      <p class="textbook-privacy">只保存在这台设备的浏览器 IndexedDB 中，不发送网络，也不会写进游戏文件。请仅导入你合法拥有的教材。当前支持 UTF-8 .txt / .md 文件或粘贴文本；不支持 PDF / DOCX。</p>
      <div class="textbook-input-row">
        <label class="textbook-file-label">选择 .txt / .md 文件<input type="file" accept=".txt,.md,text/plain,text/markdown" /></label>
        <button type="button" class="textbook-parse">解析并预览</button>
      </div>
      <label class="textbook-source-label" for="textbook-source">粘贴文本或检查文件内容</label>
      <textarea id="textbook-source" class="textbook-source" placeholder="可粘贴单篇课文，也可按 Unit 1 / Section A 等标题粘贴多篇。解析后请逐篇核对单元、章节、标题与正文。"></textarea>
      <div class="textbook-error" role="alert" hidden></div>
      <div class="textbook-warnings" hidden></div>
      <div class="textbook-overwrite" role="status" aria-live="polite" hidden></div>
      <div class="textbook-drafts" aria-live="polite"></div>
      <div class="textbook-actions">
        <button type="button" class="textbook-save" disabled>保存选中的段落到本机</button>
        <button type="button" class="textbook-clear-all" disabled>清除本机教材</button>
      </div>
      <div class="textbook-saved">
        <h3>已保存在这台设备的段落</h3>
        <div class="textbook-saved-list"></div>
      </div>
      <p class="textbook-source-note">回忆会使用你选定的本机原文；该模式只从导入正文生成挖词练习，不使用游戏配套理解题、翻译或写作数据。</p>
    </section>`;
  document.body.append(overlay);

  const source = overlay.querySelector<HTMLTextAreaElement>(".textbook-source")!;
  const fileInput = overlay.querySelector<HTMLInputElement>("input[type=file]")!;
  const parseButton = overlay.querySelector<HTMLButtonElement>(".textbook-parse")!;
  const saveButton = overlay.querySelector<HTMLButtonElement>(".textbook-save")!;
  const clearButton = overlay.querySelector<HTMLButtonElement>(".textbook-clear-all")!;
  const errorBox = overlay.querySelector<HTMLElement>(".textbook-error")!;
  const warningsBox = overlay.querySelector<HTMLElement>(".textbook-warnings")!;
  const overwriteBox = overlay.querySelector<HTMLElement>(".textbook-overwrite")!;
  const draftsBox = overlay.querySelector<HTMLElement>(".textbook-drafts")!;
  const savedBox = overlay.querySelector<HTMLElement>(".textbook-saved-list")!;
  const closeButton = overlay.querySelector<HTMLButtonElement>(".textbook-close")!;
  let drafts: ParsedPassage[] = [];
  let saved: TextbookPassage[] = [];

  const selectedTargets = (): TextbookTarget[] => [...draftsBox.querySelectorAll<HTMLFieldSetElement>(".textbook-draft")]
    .filter((card) => card.querySelector<HTMLInputElement>(".textbook-check input")?.checked)
    .map((card) => ({
      unit: Number(card.querySelector<HTMLSelectElement>(".textbook-unit")!.value),
      section: card.querySelector<HTMLSelectElement>(".textbook-section")!.value as SectionKey,
    }));

  const showOverwriteNotice = (message: string): void => {
    overwriteBox.textContent = message;
    overwriteBox.hidden = !message;
  };

  const updateOverwriteNotice = (): void => {
    const analysis = analyzeTextbookOverwrites(selectedTargets(), saved);
    const messages: string[] = [];
    if (analysis.replacing.length) {
      messages.push(`会替换本机已有版本：${analysis.replacing.map(({ unit, section }) => `Unit ${unit} · ${sectionLabel(section)}`).join("、")}。`);
    }
    if (analysis.duplicateTargets.length) {
      const destinations = analysis.duplicateTargets.map(({ unit, section, count }) =>
        `Unit ${unit} · ${sectionLabel(section)}（${count} 段）`
      ).join("、");
      messages.push(`同一目标选了多段：${destinations}。保存时按列表顺序写入，最后一段会保留，前面的同目标段落不会保留；可取消勾选或改选章节。`);
    }
    showOverwriteNotice(messages.length ? `覆盖提示：${messages.join(" ")}` : "");
  };

  const close = (): void => {
    document.removeEventListener("focusin", onFocusIn);
    overlay.remove();
    if (closeActiveTextbookModal === close) closeActiveTextbookModal = null;
    if (focusReturnTarget?.isConnected) focusReturnTarget.focus({ preventScroll: true });
  };
  const onKeyDown = (event: KeyboardEvent): void => {
    const focusable = [...overlay.querySelectorAll<HTMLElement>(
      'button:not(:disabled), input:not(:disabled):not([type="hidden"]), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
    )];
    handleTextbookModalKeydown(event, focusable, document.activeElement, close);
  };
  const onFocusIn = (event: FocusEvent): void => {
    if (!overlay.contains(event.target as Node)) closeButton.focus();
  };
  overlay.addEventListener("keydown", onKeyDown);
  // Let keyup bubble so PlayerController can clear movement keys held before the modal opened.
  document.addEventListener("focusin", onFocusIn);
  closeActiveTextbookModal = close;
  closeButton.addEventListener("click", close);
  overlay.addEventListener("click", (event) => { if (event.target === overlay) close(); });

  const renderDrafts = (): void => {
    draftsBox.replaceChildren();
    saveButton.disabled = drafts.length === 0;
    drafts.forEach((draft, index) => {
      const card = document.createElement("fieldset");
      card.className = "textbook-draft";
      card.dataset.index = String(index);
      card.innerHTML = `
        <legend>预览与核对 · 段落 ${index + 1}</legend>
        <label class="textbook-check"><input type="checkbox" checked /> 保存这一段</label>
        <div class="textbook-select-row">
          <label>单元<select class="textbook-unit">${unitOptions(draft.unit || defaultUnit)}</select></label>
          <label>章节<select class="textbook-section">${sectionOptions(draft.section)}</select></label>
        </div>
        <label>标题<input class="textbook-title-input" type="text" maxlength="160" /></label>
        <label>正文<textarea class="textbook-passage-input" rows="7"></textarea></label>
        <p class="textbook-preview"></p>`;
      card.querySelector<HTMLInputElement>(".textbook-title-input")!.value = draft.title;
      const passageInput = card.querySelector<HTMLTextAreaElement>(".textbook-passage-input")!;
      passageInput.value = draft.passage;
      const previewLine = card.querySelector<HTMLElement>(".textbook-preview")!;
      const updatePreview = (): void => {
        const result = previewPassage(passageInput.value);
        previewLine.textContent = `${result.sentenceCount} 句 · 开头：${result.firstSentence || "（尚无正文）"}`;
      };
      passageInput.addEventListener("input", updatePreview);
      card.addEventListener("change", updateOverwriteNotice);
      updatePreview();
      draftsBox.append(card);
    });
    updateOverwriteNotice();
  };

  const renderSaved = (): void => {
    savedBox.replaceChildren();
    for (const item of saved) {
      const row = document.createElement("div");
      row.className = "textbook-saved-row";
      const copy = document.createElement("div");
      const heading = document.createElement("strong");
      heading.textContent = `Unit ${item.unit} · ${sectionLabel(item.section)}${item.title ? ` · ${item.title}` : ""}`;
      const snippet = document.createElement("small");
      snippet.textContent = previewPassage(item.passage).firstSentence || "无正文";
      copy.append(heading, snippet);
      const edit = document.createElement("button");
      edit.type = "button";
      edit.textContent = "编辑";
      edit.addEventListener("click", () => {
        source.value = item.passage;
        drafts = [{ unit: item.unit, section: item.section, title: item.title, passage: item.passage }];
        warningsBox.hidden = true;
        renderDrafts();
        draftsBox.scrollIntoView({ block: "nearest", behavior: "smooth" });
      });
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "删除";
      remove.addEventListener("click", async () => {
        try {
          await textbookStore.remove(item.unit, item.section);
          saved = saved.filter((passage) => passage.id !== item.id);
          renderSaved();
          showError(errorBox);
        } catch (error) {
          showError(errorBox, error instanceof Error ? error.message : "删除本机教材失败。");
        }
      });
      row.append(copy, edit, remove);
      savedBox.append(row);
    }
    clearButton.disabled = saved.length === 0;
    if (saved.length === 0) {
      const empty = document.createElement("p");
      empty.className = "textbook-empty";
      empty.textContent = "尚未保存导入段落。";
      savedBox.append(empty);
    }
    updateOverwriteNotice();
  };

  const parseSource = (): void => {
    showError(errorBox);
    try {
      const result = parseTextbookText(source.value);
      drafts = result.passages.map((passage) => ({ ...passage, unit: passage.needsReview ? defaultUnit : passage.unit }));
      warningsBox.textContent = result.warnings.join(" ");
      warningsBox.hidden = result.warnings.length === 0;
      renderDrafts();
    } catch (error) {
      drafts = [];
      renderDrafts();
      showError(errorBox, error instanceof Error ? error.message : "无法解析文本。");
    }
  };

  parseButton.addEventListener("click", parseSource);
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    try {
      source.value = await readTextFile(file);
      parseSource();
    } catch (error) {
      showError(errorBox, error instanceof Error ? error.message : "无法读取文本文件。");
    }
  });

  saveButton.addEventListener("click", async () => {
    const selectedCards = [...draftsBox.querySelectorAll<HTMLFieldSetElement>(".textbook-draft")]
      .filter((card) => card.querySelector<HTMLInputElement>(".textbook-check input")?.checked)
      .map((card) => ({
        unit: Number(card.querySelector<HTMLSelectElement>(".textbook-unit")!.value),
        section: card.querySelector<HTMLSelectElement>(".textbook-section")!.value as SectionKey,
        title: card.querySelector<HTMLInputElement>(".textbook-title-input")!.value,
        passage: card.querySelector<HTMLTextAreaElement>(".textbook-passage-input")!.value,
      }));
    const selected = selectedCards;
    if (selected.length === 0) {
      showError(errorBox, "请至少勾选一段内容再保存。");
      return;
    }
    try {
      const analysis = analyzeTextbookOverwrites(selected, saved);
      for (const item of selected) await textbookStore.save(item);
      saved = await textbookStore.list();
      renderSaved();
      showError(errorBox);
      const replacedText = analysis.replacing.length
        ? ` 覆盖了 ${analysis.replacing.length} 个已有目标。`
        : "";
      const duplicateText = analysis.duplicateTargets.length
        ? ` 重复目标（${analysis.duplicateTargets.map(({ unit, section, count }) => `Unit ${unit} · ${sectionLabel(section)} ${count} 段`).join("、")}）按列表顺序处理，只有最后一段保留在该目标。`
        : "";
      showOverwriteNotice(`保存完成：${selected.length} 段已写入本机 IndexedDB。${replacedText}${duplicateText}`);
    } catch (error) {
      try { saved = await textbookStore.list(); renderSaved(); } catch { /* Keep the last displayed list when the database is unavailable. */ }
      showError(errorBox, error instanceof Error ? error.message : "保存本机教材失败；内容仍留在编辑框中。请检查浏览器存储权限后重试。");
    }
  });

  clearButton.addEventListener("click", async () => {
    if (!window.confirm("清除这台设备浏览器里保存的所有教材段落？此操作不能撤销。")) return;
    try {
      await textbookStore.clear();
      saved = [];
      renderSaved();
      showError(errorBox);
    } catch (error) {
      showError(errorBox, error instanceof Error ? error.message : "清除本机教材失败。");
    }
  });

  overlay.querySelector<HTMLButtonElement>(".textbook-close")!.focus();
  try {
    saved = await textbookStore.list();
    renderSaved();
  } catch (error) {
    renderSaved();
    showError(errorBox, error instanceof Error ? error.message : "无法读取本机教材。启用浏览器 IndexedDB 后可重试。");
  }
}
