const loadedFonts = new Set<string>();

function makeLoadKey(font: { googleFontName?: string; cssUrl?: string; name: string }): string {
  if (font.cssUrl) return 'css:' + font.cssUrl;
  if (font.googleFontName) return 'gf:' + font.googleFontName;
  return 'sys:' + font.name;
}

export function loadGoogleFont(googleFontName: string): void {
  if (!googleFontName || loadedFonts.has('gf:' + googleFontName)) {
    return;
  }
  const linkId = 'google-font-' + googleFontName.replace(/\+/g, '-');
  if (typeof document !== 'undefined' && document.getElementById(linkId)) {
    loadedFonts.add('gf:' + googleFontName);
    return;
  }
  if (typeof document === 'undefined') {
    return;
  }
  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=' + googleFontName + '&display=swap';
  document.head.appendChild(link);
  loadedFonts.add('gf:' + googleFontName);
}

function waitForLinkLoad(link: HTMLLinkElement): Promise<void> {
  return new Promise((resolve) => {
    let resolved = false;
    const done = () => {
      if (!resolved) {
        resolved = true;
        resolve();
      }
    };
    link.addEventListener('load', done);
    link.addEventListener('error', done);
    setTimeout(done, 3000);
  });
}

async function waitForFontReady(familyName: string, sampleText: string, maxWaitMs = 5000): Promise<boolean> {
  if (typeof document === 'undefined' || !document.fonts || typeof document.fonts.check !== 'function') {
    return false;
  }
  const fontSpec = '16px \"' + familyName + '\"';
  const start = Date.now();
  try {
    await document.fonts.load(fontSpec, sampleText);
  } catch {
    return false;
  }
  const check = (): boolean => {
    try {
      return document.fonts.check(fontSpec, sampleText);
    } catch {
      return false;
    }
  };
  if (check()) return true;
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (check()) {
        clearInterval(interval);
        resolve(true);
      } else if (Date.now() - start > maxWaitMs) {
        clearInterval(interval);
        resolve(false);
      }
    }, 100);
  });
}

export async function loadFontAsync(
  font: { googleFontName?: string; cssUrl?: string; name: string; family?: string; previewText?: string }
): Promise<boolean> {
  try {
    const key = makeLoadKey(font);
    if (loadedFonts.has(key)) {
      return true;
    }
    if (typeof document === 'undefined') {
      return false;
    }

    let linkId: string;
    let href: string;
    let familyNameForCheck: string;

    if (font.cssUrl) {
      linkId = 'css-font-' + btoa(font.cssUrl).replace(/=/g, '');
      href = font.cssUrl;
      familyNameForCheck = font.family
        ? (font.family.match(/"([^"]+)"/) || font.family.match(/'([^']+)'/) || [font.name, font.name])[1]
        : font.name;
    } else if (font.googleFontName) {
      linkId = 'google-font-' + font.googleFontName.replace(/\+/g, '-');
      href = 'https://fonts.googleapis.com/css2?family=' + font.googleFontName + '&display=swap';
      familyNameForCheck = font.googleFontName.replace(/\+/g, ' ');
    } else {
      loadedFonts.add(key);
      return true;
    }

    const existing = document.getElementById(linkId) as HTMLLinkElement | null;
    let link: HTMLLinkElement;
    if (existing) {
      link = existing;
    } else {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }

    await waitForLinkLoad(link);
    const sampleText = font.previewText || '天地玄黄 ABC 0123';
    const ready = await waitForFontReady(familyNameForCheck, sampleText);
    loadedFonts.add(key);
    return ready;
  } catch {
    return false;
  }
}

export async function loadGoogleFontAsync(googleFontName: string, sampleText?: string): Promise<boolean> {
  return loadFontAsync({
    googleFontName: googleFontName,
    name: googleFontName,
    previewText: sampleText,
  });
}

export async function preloadFonts(
  fonts: Array<{ googleFontName?: string; cssUrl?: string; name: string; family?: string; previewText?: string }>
): Promise<void> {
  await Promise.all(
    fonts.map((font) => loadFontAsync(font).catch(() => false))
  );
}

export function isFontLoaded(font: { googleFontName?: string; cssUrl?: string; name: string }): boolean {
  return loadedFonts.has(makeLoadKey(font));
}
