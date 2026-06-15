const loadedFonts = new Set<string>();

/**
 * Load a font from Google Fonts CDN using CSS2 API.
 * URL format: https://fonts.googleapis.com/css2?family={name}&display=swap
 */
export function loadGoogleFont(googleFontName: string): void {
  if (!googleFontName || loadedFonts.has(googleFontName)) {
    return;
  }

  const linkId = `google-font-${googleFontName.replace(/[+\s]/g, '-')}`;
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

/**
 * Preload multiple fonts at once using a single Google Fonts API request.
 * Fonts are separated by "&family=" in the URL.
 */
export function preloadGoogleFonts(googleFontNames: string[]): void {
  const namesToLoad = googleFontNames.filter(name => name && !loadedFonts.has(name));
  if (namesToLoad.length === 0) return;

  const linkId = `google-font-preload-${namesToLoad.join('-').replace(/[+\s]/g, '_')}`;
  if (document.getElementById(linkId)) {
    namesToLoad.forEach(name => loadedFonts.add(name));
    return;
  }

  const [first, ...rest] = namesToLoad;
  const url = `https://fonts.googleapis.com/css2?family=${first}` +
    rest.map(n => `&family=${n}`).join('') +
    '&display=swap';

  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);

  namesToLoad.forEach(name => loadedFonts.add(name));
}

export function isFontLoaded(googleFontName: string): boolean {
  return loadedFonts.has(googleFontName);
}
