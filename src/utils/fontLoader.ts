import { FONTS, type FontData, type FontSource } from '../data/fonts';

const DB_NAME = 'ChineseFontsCache';
const DB_VERSION = 1;
const STORE_NAME = 'fonts';

export type { FontSource, FontData };

interface CachedFontRecord {
  arrayBuffer: ArrayBuffer;
  format: string;
  timestamp: number;
}

const loadedFonts = new Set<string>();

// ===== IndexedDB 缓存层 =====

function isIDBAvailable(): boolean {
  return typeof indexedDB !== 'undefined';
}

let dbPromise: Promise<IDBDatabase> | null = null;

async function openDB(): Promise<IDBDatabase> {
  if (!isIDBAvailable()) {
    throw new Error('IndexedDB is not available in this environment');
  }
  if (dbPromise) return dbPromise;

  dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => {
      dbPromise = null;
      reject(req.error ?? new Error('Failed to open IndexedDB'));
    };
    req.onblocked = () => {
      dbPromise = null;
      reject(new Error('IndexedDB open blocked'));
    };
  });

  return dbPromise;
}

export async function getCachedFont(name: string): Promise<ArrayBuffer | null> {
  if (!isIDBAvailable() || !name) return null;
  try {
    const db = await openDB();
    return await new Promise<ArrayBuffer | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(name);
      req.onsuccess = () => {
        const record = req.result as CachedFontRecord | undefined;
        if (record && record.arrayBuffer instanceof ArrayBuffer && record.arrayBuffer.byteLength > 0) {
          resolve(record.arrayBuffer);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function getCachedFontRecord(name: string): Promise<CachedFontRecord | null> {
  if (!isIDBAvailable() || !name) return null;
  try {
    const db = await openDB();
    return await new Promise<CachedFontRecord | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(name);
      req.onsuccess = () => {
        const record = req.result as CachedFontRecord | undefined;
        if (record && record.arrayBuffer instanceof ArrayBuffer && record.arrayBuffer.byteLength > 0) {
          resolve(record);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function cacheFont(
  name: string,
  buffer: ArrayBuffer,
  format: string,
): Promise<void> {
  if (!isIDBAvailable() || !name || !(buffer instanceof ArrayBuffer) || buffer.byteLength === 0) {
    return;
  }
  try {
    const db = await openDB();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const record: CachedFontRecord = {
        arrayBuffer: buffer,
        format,
        timestamp: Date.now(),
      };
      tx.objectStore(STORE_NAME).put(record, name);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
      tx.onabort = () => resolve();
    });
  } catch {
    // ignore cache failure - 网络或配额错误不应阻塞功能
  }
}

// ===== 下载 =====

export async function downloadFont(url: string): Promise<ArrayBuffer> {
  if (!url) {
    throw new Error('downloadFont: url is empty');
  }
  const res = await fetch(url, { mode: 'cors', credentials: 'omit' });
  if (!res.ok) {
    throw new Error(`Failed to download font from ${url}: ${res.status} ${res.statusText}`);
  }
  const buffer = await res.arrayBuffer();
  if (buffer.byteLength === 0) {
    throw new Error(`Empty response from ${url}`);
  }
  return buffer;
}

// ===== CSS 解析 =====

interface ExtractedFont {
  url: string;
  format: string;
}

const FORMAT_EXT_MAP: Record<string, string> = {
  woff2: 'woff2',
  woff: 'woff',
  ttf: 'ttf',
};

const FORMAT_MIME_MAP: Record<string, string> = {
  woff2: 'font/woff2',
  woff: 'font/woff',
  ttf: 'font/ttf',
};

function detectFormatFromUrl(url: string): string {
  const m = /\.([a-z0-9]+)(?:\?|#|$)/i.exec(url);
  const ext = m?.[1]?.toLowerCase();
  if (ext && FORMAT_EXT_MAP[ext]) return FORMAT_EXT_MAP[ext];
  return 'woff2';
}

function isCjkUnicodeRange(range: string): boolean {
  return /U\+4E00-9FFF|U\+3400-4DBF|U\+F900-FAFF/i.test(range);
}

function extractFontFromCss(css: string, preferredFormat: string): ExtractedFont | null {
  const faceRegex = /@font-face\s*\{([\s\S]*?)\}/gi;
  let m: RegExpExecArray | null;
  let first: ExtractedFont | null = null;
  let cjk: ExtractedFont | null = null;
  let preferred: ExtractedFont | null = null;

  while ((m = faceRegex.exec(css)) !== null) {
    const block = m[1];
    const urlMatch = /url\((['"]?)([^'")]+)\1\)\s*format\((['"]?)([a-z0-9]+)\3\)/i.exec(block);
    if (!urlMatch) continue;
    const fmt = urlMatch[4].toLowerCase();
    if (!FORMAT_EXT_MAP[fmt]) continue;
    const url = urlMatch[2];
    const rangeMatch = /unicode-range:\s*([^;]+);/i.exec(block);
    const range = rangeMatch ? rangeMatch[1] : '';
    const extracted: ExtractedFont = { url, format: fmt };

    if (!first) first = extracted;
    if (fmt === preferredFormat && !preferred) preferred = extracted;
    if (isCjkUnicodeRange(range)) cjk = extracted;
  }

  return cjk || preferred || first;
}

async function fetchCssFont(cssUrl: string, preferredFormat: string): Promise<ExtractedFont | null> {
  const res = await fetch(cssUrl, { mode: 'cors', credentials: 'omit' });
  if (!res.ok) return null;
  const css = await res.text();
  return extractFontFromCss(css, preferredFormat);
}

// ===== Source 加载 =====

export async function loadFontFromSources(
  sources: FontSource[],
): Promise<{ buffer: ArrayBuffer; format: string; source: FontSource } | null> {
  if (!sources || sources.length === 0) return null;

  const sorted = [...sources].sort((a, b) => a.priority - b.priority);

  for (const source of sorted) {
    try {
      if (source.type === 'direct') {
        const format = source.format || detectFormatFromUrl(source.url);
        const buffer = await downloadFont(source.url);
        if (buffer.byteLength > 0) {
          return { buffer, format, source };
        }
        continue;
      }
      // CSS-based source: google-fonts / cdnfonts / jsdelivr-*
      const preferred = source.format || 'woff2';
      const extracted = await fetchCssFont(source.url, preferred);
      if (!extracted) continue;
      const buffer = await downloadFont(extracted.url);
      if (buffer.byteLength > 0) {
        return { buffer, format: extracted.format, source };
      }
    } catch {
      // 单个 source 失败时,继续尝试下一个
    }
  }
  return null;
}

// ===== @font-face 注册 =====

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const slice = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, Array.from(slice) as number[]);
  }
  return btoa(binary);
}

function sanitizeStyleId(name: string): string {
  return `font-face-${name.replace(/[^a-zA-Z0-9-_]/g, '-')}`;
}

function mimeForFormat(format: string): string {
  return FORMAT_MIME_MAP[format] || `font/${format}`;
}

export function registerFontFace(
  name: string,
  family: string,
  buffer: ArrayBuffer,
  format: string,
): void {
  if (typeof document === 'undefined' || typeof btoa === 'undefined') return;
  if (!name || !family || !(buffer instanceof ArrayBuffer) || buffer.byteLength === 0) return;

  const styleId = sanitizeStyleId(name);
  if (document.getElementById(styleId)) {
    loadedFonts.add(name);
    return;
  }

  try {
    const base64 = arrayBufferToBase64(buffer);
    const css =
      `@font-face{` +
      `font-family:"${family}";` +
      `src:url(data:${mimeForFormat(format)};base64,${base64}) format("${format}");` +
      `font-display:swap;` +
      `}`;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
    loadedFonts.add(name);
  } catch {
    // 注入失败不阻塞后续逻辑
  }
}

export function isFontLoaded(name: string): boolean {
  return loadedFonts.has(name);
}

// ===== 完整加载流程 =====

function extractPrimaryFamily(family: string): string {
  const trimmed = family.trim();
  if (!trimmed || trimmed === 'inherit') return trimmed;
  const first = trimmed.split(',')[0].trim();
  return first.replace(/^['"]|['"]$/g, '');
}

export async function loadAndRegisterFont(font: FontData): Promise<boolean> {
  if (!font || !font.sources || font.sources.length === 0) return false;
  const familyName = extractPrimaryFamily(font.family);
  if (!familyName || familyName === 'inherit') return false;

  // 1) 优先使用缓存
  try {
    const cached = await getCachedFontRecord(font.name);
    if (cached) {
      registerFontFace(font.name, familyName, cached.arrayBuffer, cached.format);
      return true;
    }
  } catch {
    // 缓存读取失败,继续走下载流程
  }

  // 2) 尝试从 sources 下载 (loadFontFromSources 内部已捕获所有 source 错误)
  const result = await loadFontFromSources(font.sources);

  if (result) {
    await cacheFont(font.name, result.buffer, result.format);
    registerFontFace(font.name, familyName, result.buffer, result.format);
    return true;
  }

  // 3) 网络失败时降级到缓存 (防止之前读缓存时偶发失败)
  try {
    const fallback = await getCachedFontRecord(font.name);
    if (fallback) {
      registerFontFace(font.name, familyName, fallback.arrayBuffer, fallback.format);
      return true;
    }
  } catch {
    // 忽略
  }

  return false;
}

export async function preloadFonts(
  fonts: FontData[],
  onProgress?: (current: number, total: number) => void,
): Promise<void> {
  const total = fonts.length;
  if (total === 0) {
    onProgress?.(0, 0);
    return;
  }
  for (let i = 0; i < fonts.length; i++) {
    const font = fonts[i];
    try {
      await loadAndRegisterFont(font);
    } catch {
      // 单个字体预加载失败不影响后续
    }
    onProgress?.(i + 1, total);
  }
}

// ===== 向后兼容 =====

export function loadGoogleFont(googleFontName: string): void {
  if (!googleFontName) return;
  if (loadedFonts.has(googleFontName)) return;

  // 优先使用新流程 (在 FONTS 中查找对应字体)
  const font = FONTS.find((f) => f.googleFontName === googleFontName);
  if (font) {
    loadedFonts.add(googleFontName);
    void loadAndRegisterFont(font);
    return;
  }

  // 未在 FONTS 中找到,回退到原始 <link> 行为
  if (typeof document === 'undefined') return;
  const linkId = `google-font-${googleFontName.replace(/\+/g, '-')}`;
  if (document.getElementById(linkId)) {
    loadedFonts.add(googleFontName);
    return;
  }
  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${googleFontName}&display=swap`;
  document.head.appendChild(link);
  loadedFonts.add(googleFontName);
}
