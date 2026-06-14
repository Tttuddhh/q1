import { FONTS, type FontData, type FontSource } from '../data/fonts';

const DB_NAME = 'ChineseFontsCache';
const DB_VERSION = 1;
const STORE_NAME = 'fonts';

export type { FontSource, FontData };

interface CachedFontChunk {
  buffer: ArrayBuffer;
  format: string;
  unicodeRange: string;
}

interface CachedFontRecord {
  chunks: CachedFontChunk[];
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
        if (record && Array.isArray(record.chunks) && record.chunks.length > 0 &&
            record.chunks[0] && record.chunks[0].buffer instanceof ArrayBuffer &&
            record.chunks[0].buffer.byteLength > 0) {
          resolve(record.chunks[0].buffer);
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
        if (record && Array.isArray(record.chunks) && record.chunks.length > 0 &&
            record.chunks[0] && record.chunks[0].buffer instanceof ArrayBuffer &&
            record.chunks[0].buffer.byteLength > 0) {
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
  chunks: LoadedFontChunk[],
): Promise<void> {
  if (!isIDBAvailable() || !name || !Array.isArray(chunks) || chunks.length === 0) {
    return;
  }
  try {
    const db = await openDB();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const record: CachedFontRecord = {
        chunks: chunks.map(c => ({ buffer: c.buffer, format: c.format, unicodeRange: c.unicodeRange })),
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
  unicodeRange: string;
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

function extractFontFromCss(css: string, preferredFormat: string, baseUrl?: string): ExtractedFont[] {
  const faceRegex = /@font-face\s*\{([\s\S]*?)\}/gi;
  const results: ExtractedFont[] = [];
  let m: RegExpExecArray | null;

  while ((m = faceRegex.exec(css)) !== null) {
    const block = m[1];
    const urlMatch = /url\((['"]?)([^'")]+)\1\)\s*format\((['"]?)([a-z0-9]+)\3\)/i.exec(block);
    if (!urlMatch) continue;
    const fmt = urlMatch[4].toLowerCase();
    if (!FORMAT_EXT_MAP[fmt]) continue;
    const rawUrl = urlMatch[2];
    const url = resolveUrl(rawUrl, baseUrl);
    const rangeMatch = /unicode-range:\s*([^;]+);/i.exec(block);
    const unicodeRange = rangeMatch ? rangeMatch[1].trim() : '';
    results.push({ url, format: fmt, unicodeRange });
  }

  return results;
}

/**
 * 将 CSS 中的相对 URL 解析为绝对 URL.
 * 例如 baseUrl='https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-sc/index.css'
 * + rawUrl='./files/noto-sans-sc-chinese-simplified-400-normal.woff2'
 * = 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-400-normal.woff2'
 */
function resolveUrl(rawUrl: string, baseUrl?: string): string {
  if (!rawUrl) return rawUrl;
  // 已经是绝对 URL (http/https/data/file) 直接返回
  if (/^(https?:|data:|file:|blob:)/i.test(rawUrl)) return rawUrl;
  if (!baseUrl) return rawUrl;
  try {
    return new URL(rawUrl, baseUrl).href;
  } catch {
    return rawUrl;
  }
}

async function fetchCssFont(cssUrl: string, preferredFormat: string): Promise<ExtractedFont[]> {
  const res = await fetch(cssUrl, { mode: 'cors', credentials: 'omit' });
  if (!res.ok) return [];
  const css = await res.text();
  return extractFontFromCss(css, preferredFormat, cssUrl);
}

// ===== Source 加载 =====

interface LoadedFontChunk {
  buffer: ArrayBuffer;
  format: string;
  unicodeRange: string;
  source: FontSource;
}

export async function loadFontFromSources(
  sources: FontSource[],
): Promise<LoadedFontChunk[] | null> {
  if (!sources || sources.length === 0) return null;

  const sorted = [...sources].sort((a, b) => a.priority - b.priority);

  for (const source of sorted) {
    try {
      if (source.type === 'direct') {
        const format = source.format || detectFormatFromUrl(source.url);
        const buffer = await downloadFont(source.url);
        if (buffer.byteLength > 0) {
          return [{ buffer, format, unicodeRange: '', source }];
        }
        continue;
      }
      // CSS-based source: google-fonts / cdnfonts / jsdelivr-*
      const preferred = source.format || 'woff2';
      const extractedList = await fetchCssFont(source.url, preferred);
      if (extractedList.length === 0) continue;

      // 下载所有分片（并发，但限制同时请求数以避免拥塞）
      const chunks: LoadedFontChunk[] = [];
      const concurrencyLimit = 8;
      for (let i = 0; i < extractedList.length; i += concurrencyLimit) {
        const batch = extractedList.slice(i, i + concurrencyLimit);
        const batchBuffers = await Promise.all(
          batch.map((ex) =>
            downloadFont(ex.url)
              .then((buf) => ({ buf, ex }))
              .catch(() => null),
          ),
        );
        for (const result of batchBuffers) {
          if (result && result.buf.byteLength > 0) {
            chunks.push({
              buffer: result.buf,
              format: result.ex.format,
              unicodeRange: result.ex.unicodeRange,
              source,
            });
          }
        }
      }
      if (chunks.length > 0) {
        return chunks;
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

export async function registerFontFace(
  name: string,
  family: string,
  chunks: LoadedFontChunk[],
): Promise<boolean> {
  if (typeof document === 'undefined' || !('fonts' in document)) return false;
  if (!name || !family || !chunks || chunks.length === 0) return false;

  const fontSet = (document as Document).fonts as FontFaceSet;
  // 检查是否已经注册过该 family 的字体
  let alreadyRegistered = false;
  fontSet.forEach((face) => {
    if (face.family === family) alreadyRegistered = true;
  });
  if (alreadyRegistered) {
    loadedFonts.add(name);
    return true;
  }

  try {
    const loadPromises: Promise<FontFace>[] = [];
    for (const chunk of chunks) {
      const face = new FontFace(family, chunk.buffer);
      if (chunk.unicodeRange) {
        (face as any).unicodeRange = chunk.unicodeRange;
      }
      loadPromises.push(face.load());
    }
    const results = await Promise.allSettled(loadPromises);
    let successCount = 0;
    for (const result of results) {
      if (result.status === 'fulfilled') {
        fontSet.add(result.value);
        successCount++;
      }
    }
    loadedFonts.add(name);
    return successCount > 0;
  } catch {
    return false;
  }
}

export function isFontLoaded(name: string): boolean {
  return loadedFonts.has(name);
}

/**
 * 验证字体在 document.fonts 中已注册且可用.
 * 通过尝试加载一个字形 (\u5b57, 常用汉字) 触发字体解析, 确认字体真的存在.
 */
async function verifyFontRegistered(family: string, timeoutMs: number = 4000): Promise<boolean> {
  if (typeof document === 'undefined' || !('fonts' in document)) return false;
  try {
    const familyQuoted = `"${family}"`;
    // document.fonts.check 仅检查已注册但未加载的字体
    if (document.fonts.check('16px ' + familyQuoted)) return true;
    // 否则尝试加载一个字形 (异步)
    const testText = '\u4E2D\u6587\u6D4B\u8BD5'; // 中文测试
    const facePromise = document.fonts.load('16px ' + familyQuoted, testText);
    const timeoutPromise = new Promise<FontFace[]>((_, reject) => setTimeout(() => reject(new Error('timeout')), timeoutMs));
    try {
      const faces = await Promise.race([facePromise, timeoutPromise]);
      // 检查返回的 FontFace 列表中是否有 family 匹配的
      return faces.some(f => f.family === family || f.family === familyQuoted || f.family.includes(family));
    } catch {
      return false;
    }
  } catch {
    return false;
  }
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

  // 0) 字体已注册过直接返回成功
  if (loadedFonts.has(font.name) && await verifyFontRegistered(familyName)) {
    return true;
  }

  // 1) 优先使用缓存
  try {
    const cached = await getCachedFontRecord(font.name);
    if (cached) {
      const cachedChunks: LoadedFontChunk[] = cached.chunks.map(c => ({
        buffer: c.buffer,
        format: c.format,
        unicodeRange: c.unicodeRange,
        source: font.sources[0],
      }));
      const registered = await registerFontFace(font.name, familyName, cachedChunks);
      if (registered && await verifyFontRegistered(familyName)) {
        loadedFonts.add(font.name);
        return true;
      }
      loadedFonts.delete(font.name);
    }
  } catch {
    // 缓存读取失败,继续走下载流程
  }

  // 2) 尝试从 sources 下载 (loadFontFromSources 内部已捕获所有 source 错误)
  const chunks = await loadFontFromSources(font.sources);

  if (chunks && chunks.length > 0) {
    const registered = await registerFontFace(font.name, familyName, chunks);
    if (registered && await verifyFontRegistered(familyName)) {
      await cacheFont(font.name, chunks);
      loadedFonts.add(font.name);
      return true;
    }
  }

  // 3) 网络失败时降级到缓存 (防止之前读缓存时偶发失败)
  try {
    const fallback = await getCachedFontRecord(font.name);
    if (fallback) {
      const fallbackChunks: LoadedFontChunk[] = fallback.chunks.map(c => ({
        buffer: c.buffer,
        format: c.format,
        unicodeRange: c.unicodeRange,
        source: font.sources[0],
      }));
      const registered = await registerFontFace(font.name, familyName, fallbackChunks);
      if (registered && await verifyFontRegistered(familyName)) {
        loadedFonts.add(font.name);
        return true;
      }
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
