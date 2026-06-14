const loadedFontIds = new Set<string>();

/**
 * Load a font from fontsource CDN (jsDelivr).
 * Uses <link> tag to load CSS with @font-face rules containing woff2 font files.
 * fontsource is the most reliable CDN for web fonts globally, including China.
 */
export function loadFont(fontId: string): void {
  if (!fontId || loadedFontIds.has(fontId)) {
    return;
  }

  const linkId = `fontsource-${fontId}`;
  if (document.getElementById(linkId)) {
    loadedFontIds.add(fontId);
    return;
  }

  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = `https://cdn.jsdelivr.net/npm/@fontsource/${fontId}/index.css`;
  document.head.appendChild(link);

  loadedFontIds.add(fontId);
}

export function isFontLoaded(fontId: string): boolean {
  return loadedFontIds.has(fontId);
}