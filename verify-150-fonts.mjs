// 批量验证150个字体可渲染性
import { chromium } from 'playwright';
import fs from 'fs';

const fonts = JSON.parse(fs.readFileSync('/workspace/fonts_150.json', 'utf8'));

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('about:blank');

  const results = [];
  const failed = [];
  console.log(`\n=== 开始测试 ${fonts.length} 个字体 ===\n`);

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
          const finish = (state) => {
            if (done) return;
            done = true;
            resolve(state);
          };

          link.onload = async () => {
            try {
              await document.fonts.ready;
              const fontSpec = `24px "${data.family}"`;
              try { await document.fonts.load(fontSpec, data.preview); } catch (e) {}
              await new Promise(r => setTimeout(r, 1500));

              let canRender = false;
              try { canRender = document.fonts.check(fontSpec, data.preview); } catch (e) {}

              let hasVisualDiff = false;
              try {
                const canvas = document.createElement('canvas');
                canvas.width = 300; canvas.height = 60;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#000000'; ctx.font = `32px "${data.family}", sans-serif`;
                ctx.textBaseline = 'top'; ctx.fillText(data.preview, 10, 10);
                const imgData1 = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.font = '32px serif'; ctx.fillText(data.preview, 10, 10);
                const imgData2 = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                let diff = 0;
                for (let j = 0; j < imgData1.length; j += 4) {
                  if (imgData1[j] !== imgData2[j] || imgData1[j+1] !== imgData2[j+1] || imgData1[j+2] !== imgData2[j+2]) diff++;
                }
                hasVisualDiff = diff > 50;
              } catch (e) {}

              finish({ cssLoaded: true, canRender, visualDiff: hasVisualDiff });
            } catch (e) {
              finish({ cssLoaded: true, error: String(e), canRender: false, visualDiff: false });
            }
          };

          link.onerror = () => finish({ cssLoaded: false, error: 'CSS load error', canRender: false, visualDiff: false });
          setTimeout(() => finish({ cssLoaded: false, error: 'timeout 10s', canRender: false, visualDiff: false }), 10000);
        });
      }, { cssUrl, family: font.family, preview: font.previewText });

      const ok = result.visualDiff || result.canRender;
      results.push({ ...font, ok, cssLoaded: result.cssLoaded, canRender: result.canRender, visualDiff: result.visualDiff, error: result.error });

      const status = ok ? '✓' : '✗';
      console.log(`[${i + 1}/${fonts.length}] ${status} ${font.displayName} [${font.category}]` +
                  (result.error ? ` ERROR: ${result.error}` : '') +
                  ` visualDiff=${result.visualDiff} canRender=${result.canRender}`);

      if (!ok) failed.push(font);
    } catch (e) {
      results.push({ ...font, ok: false, error: String(e) });
      console.log(`[${i + 1}/${fonts.length}] ✗ ${font.displayName} - ERROR: ${String(e).slice(0, 60)}`);
      failed.push(font);
    }
  }

  await browser.close();

  const okCount = results.filter(r => r.ok).length;
  console.log(`\n=========== 最终统计 ===========`);
  console.log(`总计: ${fonts.length}`);
  console.log(`✓ 可渲染: ${okCount}`);
  console.log(`✗ 不可渲染: ${failed.length}`);

  if (failed.length > 0) {
    console.log(`\n=========== 不可渲染字体列表 ===========`);
    failed.forEach(f => console.log(`  - ${f.displayName} (${f.name}) [${f.category}] - ${f.cssUrl || f.googleFontName}`));
  }

  // Save results
  fs.writeFileSync('/workspace/font_verify_results.json', JSON.stringify({ results, failed: failed.map(f => f.displayName) }, null, 2));
}

main().catch(console.error);
