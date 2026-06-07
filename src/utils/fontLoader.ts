const loadedFonts = new Set<string>();

export function loadGoogleFont(googleFontName: string): void {
  if (!googleFontName || loadedFonts.has(googleFontName)) {
    return;
  }

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

export function isFontLoaded(googleFontName: string): boolean {
  return loadedFonts.has(googleFontName);
}
