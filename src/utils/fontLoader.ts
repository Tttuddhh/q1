const loadedFonts = new Set<string>();

export function loadGoogleFont(googleFontName: string): void {
  if (!googleFontName || loadedFonts.has(googleFontName)) {
    return;
  }

  const linkId = `google-font-${googleFontName.replace(/\+/g, '-')}`;
  if (typeof document !== 'undefined' && document.getElementById(linkId)) {
    loadedFonts.add(googleFontName);
    return;
  }

  if (typeof document === 'undefined') {
    return;
  }

  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${googleFontName}&display=swap`;
  document.head.appendChild(link);

  loadedFonts.add(googleFontName);
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

async function waitForFontReady(fontFamilyName: string, sampleText: string, maxWaitMs = 5000): Promise<boolean> {
  if (typeof document === 'undefined' || !document.fonts || typeof document.fonts.load !== 'function') {
    return false;
  }

  const fontSpec = `16px "${fontFamilyName}"`;
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

export async function loadGoogleFontAsync(googleFontName: string, sampleText?: string): Promise<boolean> {
  try {
    if (!googleFontName) {
      return false;
    }

    if (loadedFonts.has(googleFontName)) {
      return true;
    }

    if (typeof document === 'undefined') {
      return false;
    }

    const linkId = `google-font-${googleFontName.replace(/\+/g, '-')}`;
    const existingLink = document.getElementById(linkId) as HTMLLinkElement | null;
    let link: HTMLLinkElement;

    if (existingLink) {
      link = existingLink;
    } else {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${googleFontName}&display=swap`;
      document.head.appendChild(link);
    }

    const fontFamilyName = googleFontName.replace(/\+/g, ' ');
    const text = sampleText || 'ABC';

    await waitForLinkLoad(link);

    const ready = await waitForFontReady(fontFamilyName, text);

    loadedFonts.add(googleFontName);
    return ready;
  } catch {
    return false;
  }
}

export async function preloadFonts(
  fontsWithGoogleName: Array<{ googleFontName: string; name?: string; previewText?: string }>
): Promise<void> {
  await Promise.all(
    fontsWithGoogleName.map((font) =>
      loadGoogleFontAsync(font.googleFontName, font.previewText).catch(() => false)
    )
  );
}

export function isFontLoaded(googleFontName: string): boolean {
  return loadedFonts.has(googleFontName);
}
