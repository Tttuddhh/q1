// 截图: 字体选择器滚动到底部
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

  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.tree-item-animated'));
    for (const it of items) {
      if ((it.textContent || '').includes('富文本编辑器')) { it.click(); return; }
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

  const fontBtn = await page.$('button[title="字体"]');
  if (fontBtn) await fontBtn.click();
  await sleep(500);

  // 截 1: 顶部
  await page.screenshot({ path: path.join(SHOT_DIR, '40_top.png'), fullPage: false });

  // 滚动到中间
  await page.evaluate(() => {
    const panel = document.querySelector('[style*="z-index: 1000"]');
    if (panel) {
      const list = panel.querySelector('div[style*="overflowY"]') || panel.querySelector('div[style*="overflow-y"]');
      if (list) list.scrollTop = 200;
    }
  });
  await sleep(300);
  await page.screenshot({ path: path.join(SHOT_DIR, '41_mid.png'), fullPage: false });

  // 滚动到中间+1
  await page.evaluate(() => {
    const panel = document.querySelector('[style*="z-index: 1000"]');
    if (panel) {
      const list = panel.querySelector('div[style*="overflowY"]') || panel.querySelector('div[style*="overflow-y"]');
      if (list) list.scrollTop = 500;
    }
  });
  await sleep(300);
  await page.screenshot({ path: path.join(SHOT_DIR, '42_mid2.png'), fullPage: false });

  // 滚动到中间+2
  await page.evaluate(() => {
    const panel = document.querySelector('[style*="z-index: 1000"]');
    if (panel) {
      const list = panel.querySelector('div[style*="overflowY"]') || panel.querySelector('div[style*="overflow-y"]');
      if (list) list.scrollTop = 900;
    }
  });
  await sleep(300);
  await page.screenshot({ path: path.join(SHOT_DIR, '43_mid3.png'), fullPage: false });

  // 滚动到底部
  await page.evaluate(() => {
    const panel = document.querySelector('[style*="z-index: 1000"]');
    if (panel) {
      const list = panel.querySelector('div[style*="overflowY"]') || panel.querySelector('div[style*="overflow-y"]');
      if (list) list.scrollTop = list.scrollHeight;
    }
  });
  await sleep(300);
  await page.screenshot({ path: path.join(SHOT_DIR, '44_bottom.png'), fullPage: false });

  // 检查 IndexedDB 缓存
  const idbFonts = await page.evaluate(async () => {
    return new Promise((resolve) => {
      const req = indexedDB.open('ChineseFontsCache');
      req.onsuccess = (e) => {
        const db = e.target.result;
        const tx = db.transaction(['fonts'], 'readonly');
        const store = tx.objectStore('fonts');
        const all = store.getAllKeys();
        all.onsuccess = () => resolve(all.result);
      };
      req.onerror = () => resolve('error');
    });
  });
  console.log('IndexedDB cached fonts:', Array.isArray(idbFonts) ? idbFonts.length : idbFonts);

  // 检查哪些字体真的注册到了 document.fonts
  const registered = await page.evaluate(async () => {
    await document.fonts.ready;
    const list = [];
    document.fonts.forEach(f => {
      list.push(`${f.family}/${f.weight}/${f.style}/${f.status}`);
    });
    return list;
  });
  console.log('Registered fonts:');
  for (const f of registered) console.log('  ', f);

  await browser.close();
}
run().catch(e => { console.error(e); process.exit(1); });
