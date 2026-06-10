const loadedFonts = new Set<string>();

export function loadGoogleFont(
  googleFontName: string,
  isChinese: boolean = false
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!googleFontName || loadedFonts.has(googleFontName)) {
      resolve();
      return;
    }

    const linkId = `google-font-${googleFontName.replace(/\+/g, '-')}`;
    if (document.getElementById(linkId)) {
      loadedFonts.add(googleFontName);
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';

    let url = `https://fonts.googleapis.com/css2?family=${googleFontName}:wght@400;700`;
    if (isChinese) {
      url += '&subset=chinese-simplified';
    }
    url += '&display=swap';

    link.href = url;

    link.onload = () => {
      loadedFonts.add(googleFontName);
      // Wait for the font to actually be available
      const family = googleFontName.replace(/\+/g, ' ');
      document.fonts
        .load(`1em "${family}"`)
        .then(() => resolve())
        .catch(() => resolve());
    };

    link.onerror = () => {
      reject(new Error(`Failed to load font: ${googleFontName}`));
    };

    document.head.appendChild(link);
  });
}

export function preloadFonts(
  fonts: Array<{ googleFontName: string; category: string }>
): Promise<void> {
  const promises = fonts.map(font => {
    if (font.googleFontName) {
      return loadGoogleFont(font.googleFontName, font.category === 'chinese');
    }
    return Promise.resolve();
  });
  return Promise.all(promises).then(() => undefined);
}

export function isFontLoaded(googleFontName: string): boolean {
  return loadedFonts.has(googleFontName);
}
