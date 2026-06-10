import { chromium } from 'playwright';
import fs from 'fs';

const fonts = JSON.parse(fs.readFileSync('/workspace/fonts-150.json', 'utf8'));

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('about:blank');

  const results = [];
  const passed = [];
  const failed = [];

  console.log(`\n=== 开始验证 ${fonts.length} 个字体 ===\n`);

  for (let i = 0; i < fonts.length; i++) {
    const font = fonts[i];
    const cssUrl = font.cssUrl || `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.googleFontName)}&display=swap`;

    try {
      const result = await page.evaluate(async (data) => {
        // 清理之前的 link
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
                ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 300, 60);
                ctx.fillStyle = '#000';
                ctx.font = `32px "${data.family}", serif`;
                ctx.textBaseline = 'top';
                ctx.fillText(data.preview, 10, 10);
                const d1 = ctx.getImageData(0, 0, 300, 60).data;

                ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 300, 60);
                ctx.font = '32px serif';
                ctx.fillText(data.preview, 10, 10);
                const d2 = ctx.getImageData(0, 0, 300, 60).data;

                let diff = 0;
                for (let j = 0; j < d1.length; j += 4) {
                  if (d1[j] !== d2[j] || d1[j+1] !== d2[j+1] || d1[j+2] !== d2[j+2]) diff++;
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
      }, { cssUrl, family: font.family, preview: font.previewText || '字体测试' });

      const ok = result.visualDiff || result.canRender;
      if (ok) {
        passed.push(font);
        console.log(`[${i+1}/${fonts.length}] ✓ ${font.name} (${font.category})`);
      } else {
        failed.push({ ...font, error: result.error });
        console.log(`[${i+1}/${fonts.length}] ✗ ${font.name} (${font.category})${result.error ? ' - ' + result.error : ''} visualDiff=${result.visualDiff} canRender=${result.canRender}`);
      }
      results.push({ name: font.name, ok, ...result });
    } catch (e) {
      failed.push({ ...font, error: String(e) });
      console.log(`[${i+1}/${fonts.length}] ✗ ${font.name} - ERROR: ${String(e).slice(0,60)}`);
      results.push({ name: font.name, ok: false, error: String(e) });
    }
  }

  await browser.close();

  console.log(`\n=========== 验证结果 ===========`);
  console.log(`总计: ${fonts.length}`);
  console.log(`✓ 通过: ${passed.length}`);
  console.log(`✗ 失败: ${failed.length}`);

  if (failed.length > 0) {
    console.log(`\n=========== 失败字体 ===========`);
    failed.forEach(f => console.log(`  - ${f.name}: ${f.error || 'no visual diff'}`));
  }

  // 保存结果
  fs.writeFileSync('/workspace/verify-results.json', JSON.stringify({ passed, failed, results }, null, 2));
  console.log(`\n结果已保存到 verify-results.json`);
}

main().catch(console.error);
