// 详细打印所有字体选项的: name, family, sources, googleFontName
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const URL = 'http://localhost:3000';
const SHOT_DIR = '/workspace/screenshots';
fs.mkdirSync(SHOT_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await sleep(800);

  // 直接进编辑模式: 选 "富文本编辑器" 页面
  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.tree-item-animated'));
    for (const it of items) {
      if ((it.textContent || '').includes('富文本编辑器')) {
        it.click();
        return;
      }
    }
  });
  await sleep(500);

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
  await sleep(300);

  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.menu-item'));
    for (const it of items) {
      if ((it.textContent || '').trim().startsWith('编辑')) { it.click(); return; }
    }
  });
  await sleep(1500);

  // 点击字体按钮
  const fontBtn = await page.$('button[title="字体"]');
  if (fontBtn) await fontBtn.click();
  await sleep(800);

  // 列出所有字体选项
  const allFonts = await page.evaluate(() => {
    const panel = document.querySelector('[style*="z-index: 1000"]');
    if (!panel) return [];
    const items = Array.from(panel.querySelectorAll('button'));
    return items.map(b => {
      const main = b.querySelector('div[style*="font-family"]');
      const sub = b.querySelectorAll('div');
      const data = { text: (b.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60) };
      if (main) {
        data.fontFamily = main.style.fontFamily;
        data.previewText = (main.textContent || '').trim();
      }
      return data;
    }).filter(x => x.text);
  });

  console.log('Total font options:', allFonts.length);
  console.log('---');
  for (let i = 0; i < allFonts.length; i++) {
    const f = allFonts[i];
    console.log(`${String(i).padStart(3)}. family="${f.fontFamily}" preview="${f.previewText}" text="${f.text}"`);
  }

  // 截图完整面板
  await page.screenshot({ path: path.join(SHOT_DIR, '30_full_panel.png'), fullPage: true });

  await browser.close();
}
run().catch(e => { console.error(e); process.exit(1); });
