import type { SectionKey } from "../ids";
import { MAX_TEXTBOOK_CHARS } from "./parse";
import { TextbookInputError, TextbookStorageError, type TextbookPack, type TextbookPassage, type TextbookPassageInput } from "./types";

const DB_NAME = "word-quest-textbook-local";
const DB_VERSION = 2;
const STORE_NAME = "passages";
const PACK_STORE_NAME = "rw3_pack";
const PACK_KEY = "current";

export interface TextbookDatabasePort {
  list(): Promise<TextbookPassage[]>;
  put(passage: TextbookPassage): Promise<void>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
}

export interface PackDatabasePort {
  getPack(): Promise<TextbookPack | null>;
  putPack(pack: TextbookPack): Promise<void>;
  clearPack(): Promise<void>;
}

export interface TextbookStore {
  list(): Promise<TextbookPassage[]>;
  get(unit: number, section: SectionKey): Promise<TextbookPassage | null>;
  save(input: TextbookPassageInput): Promise<TextbookPassage>;
  remove(unit: number, section: SectionKey): Promise<void>;
  clear(): Promise<void>;
  savePack(pack: TextbookPack): Promise<void>;
  loadPack(): Promise<TextbookPack | null>;
  clearPack(): Promise<void>;
}

function copy(passage: TextbookPassage): TextbookPassage {
  return { ...passage };
}

function idFor(unit: number, section: SectionKey): string {
  return `${unit}:${section}`;
}

function validSection(value: string): value is SectionKey {
  return value === "section_a" || value === "section_b" || value === "section_c";
}

function openDatabase(factory: IDBFactory | undefined): Promise<IDBDatabase> {
  if (!factory) return Promise.reject(new TextbookStorageError("此浏览器不支持 IndexedDB，教材没有保存。"));
  return new Promise((resolve, reject) => {
    let request: IDBOpenDBRequest;
    try {
      request = factory.open(DB_NAME, DB_VERSION);
    } catch {
      reject(new TextbookStorageError("无法打开本机 IndexedDB，教材没有保存。"));
      return;
    }
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME, { keyPath: "id" });
      if (!db.objectStoreNames.contains(PACK_STORE_NAME)) db.createObjectStore(PACK_STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new TextbookStorageError("无法打开本机 IndexedDB，教材没有保存。"));
    request.onblocked = () => reject(new TextbookStorageError("本机教材数据库正被其他标签页占用，请关闭其他游戏标签页后重试。"));
  });
}

function createIndexedDbPort(factory: IDBFactory | undefined): TextbookDatabasePort {
  const run = async <T>(storeName: string, mode: IDBTransactionMode, operation: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> => {
    const db = await openDatabase(factory);
    return new Promise<T>((resolve, reject) => {
      let tx: IDBTransaction;
      try {
        tx = db.transaction(storeName, mode);
        const request = operation(tx.objectStore(storeName));
        let result: T;
        request.onsuccess = () => { result = request.result; };
        request.onerror = () => reject(new TextbookStorageError("本机教材数据库操作失败；请检查浏览器存储空间后重试。"));
        tx.oncomplete = () => resolve(result!);
        tx.onerror = tx.onabort = () => reject(new TextbookStorageError("本机教材数据库操作失败；请检查浏览器存储空间后重试。"));
      } catch {
        reject(new TextbookStorageError("无法访问本机教材数据库；请检查浏览器存储权限后重试。"));
      } finally {
        // IDBDatabase.close() waits for its active transaction to finish.
        db.close();
      }
    });
  };
  return {
    list: () => run(STORE_NAME, "readonly", (store) => store.getAll() as IDBRequest<TextbookPassage[]>),
    put: async (passage) => { await run(STORE_NAME, "readwrite", (store) => store.put(passage)); },
    delete: (id) => run(STORE_NAME, "readwrite", (store) => store.delete(id)),
    clear: () => run(STORE_NAME, "readwrite", (store) => store.clear()),
  };
}

function createIndexedDbPackPort(factory: IDBFactory | undefined): PackDatabasePort {
  const run = async <T>(mode: IDBTransactionMode, operation: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> => {
    const db = await openDatabase(factory);
    return new Promise<T>((resolve, reject) => {
      try {
        const tx = db.transaction(PACK_STORE_NAME, mode);
        const request = operation(tx.objectStore(PACK_STORE_NAME));
        let result: T;
        request.onsuccess = () => { result = request.result; };
        tx.oncomplete = () => resolve(result!);
        tx.onerror = tx.onabort = () => reject(new TextbookStorageError("本机教材数据库操作失败；请检查浏览器存储空间后重试。"));
      } catch {
        reject(new TextbookStorageError("无法访问本机教材数据库；请检查浏览器存储权限后重试。"));
      } finally {
        db.close();
      }
    });
  };
  return {
    getPack: async () => (await run("readonly", (store) => store.get(PACK_KEY) as IDBRequest<TextbookPack | undefined>)) ?? null,
    putPack: async (pack) => { await run("readwrite", (store) => store.put(pack, PACK_KEY)); },
    clearPack: async () => { await run("readwrite", (store) => store.delete(PACK_KEY)); },
  };
}

export function createTextbookStore(
  database: TextbookDatabasePort = createIndexedDbPort(typeof indexedDB === "undefined" ? undefined : indexedDB),
  packDatabase: PackDatabasePort = createIndexedDbPackPort(typeof indexedDB === "undefined" ? undefined : indexedDB)
): TextbookStore {
  const withStorageError = async <T>(action: () => Promise<T>): Promise<T> => {
    try {
      return await action();
    } catch (error) {
      if (error instanceof TextbookStorageError || error instanceof TextbookInputError) throw error;
      throw new TextbookStorageError(error instanceof Error ? `本机教材数据库操作失败：${error.message}` : "本机教材数据库操作失败。");
    }
  };

  return {
    list: () => withStorageError(async () => (await database.list()).map(copy).sort((a, b) => a.unit - b.unit || a.section.localeCompare(b.section))),
    get: (unit, section) => withStorageError(async () => {
      if (!Number.isInteger(unit) || unit < 1 || unit > 6 || !validSection(section)) throw new TextbookInputError("单元或章节选择无效。");
      const item = (await database.list()).find((passage) => passage.id === idFor(unit, section));
      return item ? copy(item) : null;
    }),
    save: (input) => withStorageError(async () => {
      const title = input.title.trim().slice(0, 160);
      const passage = input.passage.trim();
      if (!Number.isInteger(input.unit) || input.unit < 1 || input.unit > 6 || !validSection(input.section)) throw new TextbookInputError("请选择 Unit 1–6 与 Section A–C。");
      if (!passage) throw new TextbookInputError("正文为空，请补充课文后再保存。");
      if (passage.length > MAX_TEXTBOOK_CHARS) throw new TextbookInputError(`正文超过 ${MAX_TEXTBOOK_CHARS.toLocaleString()} 个字符上限，请分篇保存。`);
      const item: TextbookPassage = { id: idFor(input.unit, input.section), unit: input.unit, section: input.section, title, passage, updatedAt: Date.now() };
      await database.put(item);
      return copy(item);
    }),
    remove: (unit, section) => withStorageError(async () => {
      if (!Number.isInteger(unit) || unit < 1 || unit > 6 || !validSection(section)) throw new TextbookInputError("单元或章节选择无效。");
      await database.delete(idFor(unit, section));
    }),
    clear: () => withStorageError(() => database.clear()),
    savePack: (pack) => withStorageError(() => packDatabase.putPack(structuredClone(pack))),
    loadPack: () => withStorageError(async () => {
      const pack = await packDatabase.getPack();
      return pack ? structuredClone(pack) : null;
    }),
    clearPack: () => withStorageError(() => packDatabase.clearPack()),
  };
}

export const textbookStore = createTextbookStore();
