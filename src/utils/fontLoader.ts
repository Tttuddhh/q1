const loadedFonts = new Set<string>();

export function loadGoogleFont(googleFontName: string, text?: string): void {
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

  let url = `https://fonts.googleapis.com/css2?family=${googleFontName}:wght@400;700`;
  if (text) {
    url += `&text=${encodeURIComponent(text)}`;
  }
  url += '&display=swap';

  link.href = url;
  document.head.appendChild(link);

  loadedFonts.add(googleFontName);
}

export function preloadFonts(fonts: Array<{ googleFontName: string; preview: string }>): void {
  fonts.forEach(font => {
    if (font.googleFontName) {
      loadGoogleFont(font.googleFontName, font.preview);
    }
  });
}

export function isFontLoaded(googleFontName: string): boolean {
  return loadedFonts.has(googleFontName);
}
