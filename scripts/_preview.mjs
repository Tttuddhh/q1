import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/workspace/screenshots/preview_latest.png', fullPage: true });

  // Navigate to 富文本编辑器
  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.tree-item-animated'));
    for (const it of items) {
      if ((it.textContent || '').includes('富文本编辑器')) { it.click(); return; }
    }
  });
  await page.waitForTimeout(500);

  // Enter edit mode via 更多操作
  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.tree-item-animated'));
    for (const it of items) {
      if ((it.textContent || '').includes('富文本编辑器')) {
        const btn = it.querySelector('button[title="更多操作"]');
        if (btn) btn.click();
        return;
      }
    }
  });
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.menu-item'));
    for (const it of items) {
      if ((it.textContent || '').trim().startsWith('编辑')) { it.click(); return; }
    }
  });
  await page.waitForTimeout(1500);

  // Click font button
  const fontBtn = await page.$('button[title="字体"]');
  if (fontBtn) await fontBtn.click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: '/workspace/screenshots/preview_font_picker.png' });

  const total = await page.evaluate(() => document.fonts.size);
  console.log('Total font faces loaded:', total);

  const fontList = await page.evaluate(() => {
    const out = [];
    document.fonts.forEach(f => out.push(f.family));
    return out.filter((v, i, a) => a.indexOf(v) === i).slice(0, 20);
  });
  console.log('Unique loaded font families:');
  for (const f of fontList) console.log('  -', f);

  await browser.close();
  console.log('\n✅ Preview running at http://localhost:3000/');
  console.log('   Screenshots saved to /workspace/screenshots/');
})();
