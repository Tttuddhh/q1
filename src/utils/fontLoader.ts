const loadedFonts = new Set<string>();

/**
 * Load a font from local @fontsource package.
 * Uses dynamic import() to load the CSS file which contains @font-face rules.
 * Vite will bundle the woff2 font files into the build output.
 */
export async function loadFont(fontId: string): Promise<void> {
  if (!fontId || loadedFonts.has(fontId)) {
    return;
  }

  try {
    await import(`@fontsource/${fontId}/index.css`);
    loadedFonts.add(fontId);
  } catch (err) {
    console.warn(`Failed to load font: ${fontId}`, err);
  }
}

/**
 * Preload multiple fonts at once by importing all their CSS files.
 */
export async function preloadFonts(fontIds: string[]): Promise<void> {
  const idsToLoad = fontIds.filter(id => id && !loadedFonts.has(id));
  if (idsToLoad.length === 0) return;

  await Promise.all(
    idsToLoad.map(async (id) => {
      try {
        await import(`@fontsource/${id}/index.css`);
        loadedFonts.add(id);
      } catch (err) {
        console.warn(`Failed to preload font: ${id}`, err);
      }
    })
  );
}

export function isFontLoaded(fontId: string): boolean {
  return loadedFonts.has(fontId);
}
