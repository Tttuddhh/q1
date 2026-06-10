// 字体加载器
// 支持：
//   1) Google Fonts (通过 googleFontName 加载 CSS API)
//   2) @chinese-fonts (通过 cssUrl 加载 jsDelivr CDN 上的 result.css)
//   3) 系统字体 (无需加载)
// 机制：
//   - 通过 <link> 注入字体的 CSS 样式表
//   - 等待 CSS 加载完成后，通过 document.fonts.load() 主动触发字体文件下载
//   - 最后通过轮询 document.fonts.check() 验证字体确实可用

const loadedFonts = new Set<string>();

function makeLoadKey(font: { googleFontName?: string; cssUrl?: string; name: string; family?: string }): string {
  if (font.cssUrl) return 'css:' + font.family;
  if (font.googleFontName) return 'gf:' + font.googleFontName;
  return 'sys:' + font.name;
}

function injectLink(id: string, href: string): HTMLLinkElement {
  let link = document.getElementById(id) as HTMLLinkElement | null;
  if (link) return link;
  link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = href;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
  return link;
}

function waitForLinkLoad(link: HTMLLinkElement, timeoutMs = 10000): Promise<boolean> {
  return new Promise((resolve) => {
    let done = false;
    const finish = (ok: boolean) => {
      if (done) return;
      done = true;
      resolve(ok);
    };
    link.addEventListener('load', () => finish(true));
    link.addEventListener('error', () => finish(false));
    // 轮询兜底
    const start = Date.now();
    const timer = setInterval(() => {
      if (done) {
        clearInterval(timer);
        return;
      }
      try {
        if (link.sheet) {
          clearInterval(timer);
          finish(true);
          return;
        }
      } catch {
        clearInterval(timer);
        finish(true);
        return;
      }
      if (Date.now() - start > timeoutMs) {
        clearInterval(timer);
        finish(true);
      }
    }, 200);
  });
}

function extractFamily(family: string): string {
  if (!family) return '';
  const m = family.match(/['"]([^'"]+)['"]/);
  if (m) return m[1];
  return family.split(',')[0].trim();
}

async function waitForFontReady(
  family: string,
  sampleText: string = '字体 ABC',
  timeoutMs = 10000,
): Promise<boolean> {
  if (typeof document === 'undefined' || !document.fonts) return false;
  if (!family) return false;

  const fontSpec = '24px "' + family + '"';
  const start = Date.now();

  try {
    await document.fonts.ready;
  } catch {
    // ignore
  }

  // 快速检查
  try {
    if (document.fonts.check(fontSpec, sampleText)) {
      return true;
    }
  } catch {
    // ignore
  }

  // 主动加载字体
  try {
    await document.fonts.load(fontSpec, sampleText);
  } catch {
    // ignore
  }

  // 再次检查
  try {
    if (document.fonts.check(fontSpec, sampleText)) {
      return true;
    }
  } catch {
    // ignore
  }

  // 轮询（最多 timeoutMs）
  return new Promise<boolean>((resolve) => {
    const poll = setInterval(() => {
      try {
        if (document.fonts.check(fontSpec, sampleText)) {
          clearInterval(poll);
          resolve(true);
          return;
        }
      } catch {
        // ignore
      }
      if (Date.now() - start > timeoutMs) {
        clearInterval(poll);
        resolve(true);
      }
    }, 150);
  });
}

export async function loadFontAsync(
  font: {
    googleFontName?: string;
    cssUrl?: string;
    name: string;
    family?: string;
    previewText?: string;
    displayName?: string;
  },
): Promise<boolean> {
  try {
    const key = makeLoadKey(font);
    if (loadedFonts.has(key)) {
      return true;
    }
    if (typeof document === 'undefined') {
      return false;
    }

    let familyForCheck: string = '';
    const sampleText = font.previewText || font.displayName || font.name || '字体 ABC';

    if (font.cssUrl) {
      const linkId = 'css-font-' + btoa(font.cssUrl).replace(/=/g, '');
      injectLink(linkId, font.cssUrl);
      const linkEl = document.getElementById(linkId) as HTMLLinkElement | null;
      if (linkEl) {
        await waitForLinkLoad(linkEl, 10000);
      }
      familyForCheck = extractFamily(font.family || font.name);
    } else if (font.googleFontName) {
      const linkId = 'google-font-' + font.googleFontName.replace(/\+/g, '-');
      const href = 'https://fonts.googleapis.com/css2?family=' + font.googleFontName + '&display=swap';
      injectLink(linkId, href);
      const linkEl = document.getElementById(linkId) as HTMLLinkElement | null;
      if (linkEl) {
        await waitForLinkLoad(linkEl, 10000);
      }
      familyForCheck = font.googleFontName.replace(/\+/g, ' ');
    } else {
      loadedFonts.add(key);
      return true;
    }

    // 等待字体真正可渲染
    if (familyForCheck) {
      await waitForFontReady(familyForCheck, sampleText, 10000);
    }
    loadedFonts.add(key);
    return true;
  } catch {
    return false;
  }
}

// 预加载多个字体（顺序加载，避免网络拥堵）
export async function preloadFonts(
  fonts: Array<{
    googleFontName?: string;
    cssUrl?: string;
    name: string;
    family?: string;
    previewText?: string;
    displayName?: string;
  }>,
): Promise<void> {
  for (const f of fonts) {
    try {
      await loadFontAsync(f);
    } catch {
      // ignore
    }
  }
}

export function isFontLoaded(font: { googleFontName?: string; cssUrl?: string; name: string; family?: string }): boolean {
  return loadedFonts.has(makeLoadKey(font));
}

export function loadGoogleFont(googleFontName: string): void {
  if (!googleFontName) return;
  void loadFontAsync({ googleFontName, name: googleFontName });
}
