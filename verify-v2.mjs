import { chromium } from 'playwright';
import fs from 'fs';

const fonts = JSON.parse(fs.readFileSync('/workspace/fonts_150_v2.json', 'utf8'));

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('about:blank');

  const results = [];
  console.log(`Testing ${fonts.length} fonts...`);

  for (let i = 0; i < fonts.length; i++) {
    const font = fonts[i];
    const cssUrl = font.cssUrl || `https://fonts.googleapis.com/css2?family=${font.googleFontName}&display=swap`;

    try {
      const result = await page.evaluate(async (data) => {
        const prevLinks = document.querySelectorAll('link[data-testfont]');
        prevLinks.forEach(l => l.remove());

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = data.cssUrl;
        link.crossOrigin = 'anonymous';
        link.setAttribute('data-testfont', '1');
        document.head.appendChild(link);

        return new Promise((resolve) => {
          let done = false;
          const finish = (state) => { if (!done) { done = true; resolve(state); } };

          link.onload = async () => {
            try {
              await document.fonts.ready;
              const fontSpec = `24px "${data.family}"`;
              try { await document.fonts.load(fontSpec, data.preview); } catch (e) {}
              await new Promise(r => setTimeout(r, 1000));
              let canRender = false;
              try { canRender = document.fonts.check(fontSpec, data.preview); } catch (e) {}

              let hasVisualDiff = false;
              try {
                const canvas = document.createElement('canvas');
                canvas.width = 300; canvas.height = 60;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 300, 60);
                ctx.fillStyle = '#000'; ctx.font = `32px "${data.family}", serif`;
                ctx.textBaseline = 'top'; ctx.fillText(data.preview, 10, 10);
                const d1 = ctx.getImageData(0, 0, 300, 60).data;
                ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 300, 60);
                ctx.font = '32px serif'; ctx.fillText(data.preview, 10, 10);
                const d2 = ctx.getImageData(0, 0, 300, 60).data;
                let diff = 0;
                for (let j = 0; j < d1.length; j += 4) {
                  if (d1[j] !== d2[j] || d1[j+1] !== d2[j+1] || d1[j+2] !== d2[j+2]) diff++;
                }
                hasVisualDiff = diff > 50;
              } catch (e) {}

              finish({ ok: hasVisualDiff || canRender, canRender, visualDiff: hasVisualDiff });
            } catch (e) { finish({ ok: false, error: String(e) }); }
          };
          link.onerror = () => finish({ ok: false, error: 'CSS load error' });
          setTimeout(() => finish({ ok: false, error: 'timeout' }), 8000);
        });
      }, { cssUrl, family: font.family, preview: font.previewText });

      results.push({ ...font, ...result });
      const status = result.ok ? '✓' : '✗';
      console.log(`[${i+1}/${fonts.length}] ${status} ${font.displayName} ${result.error || ''}`);
    } catch (e) {
      results.push({ ...font, ok: false, error: String(e) });
      console.log(`[${i+1}/${fonts.length}] ✗ ${font.displayName} - ${String(e).slice(0, 50)}`);
    }
  }

  await browser.close();

  const ok = results.filter(r => r.ok);
  const fail = results.filter(r => !r.ok);
  console.log(`\n=== Results ===`);
  console.log(`OK: ${ok.length}`);
  console.log(`Fail: ${fail.length}`);

  if (fail.length > 0) {
    console.log(`\nFailed fonts:`);
    fail.forEach(f => console.log(`  - ${f.displayName}: ${f.error}`));
  }

  fs.writeFileSync('/workspace/verify_v2_results.json', JSON.stringify({ ok: ok.map(f => f.displayName), fail: fail.map(f => ({ name: f.displayName, error: f.error })) }, null, 2));
}

main().catch(console.error);
