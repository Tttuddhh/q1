// 验证字体实际应用到文本:
// 1. 进入编辑模式
// 2. 选中已有文字
// 3. 应用思源黑体SC
// 4. 应用思源宋体SC
// 5. 对比两张截图
// 6. 验证 document.fonts 包含对应 family

import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const URL = 'http://localhost:3000';
const SHOT_DIR = '/workspace/screenshots';
fs.mkdirSync(SHOT_DIR, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function run() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await sleep(800);

  // 进入"富文本编辑器"页面
  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.tree-item-animated'));
    for (const it of items) {
      if ((it.textContent || '').includes('富文本编辑器')) { it.click(); return; }
    }
  });
  await sleep(500);

  // 进入编辑模式
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

  const editor = await page.$('.ProseMirror, [contenteditable="true"]');
  if (!editor) {
    console.error('no editor');
    await browser.close();
    return;
  }

  // 清空编辑器, 输入测试文字
  await editor.click();
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Delete');
  await sleep(200);
  await page.keyboard.type('天地玄黄宇宙洪荒', { delay: 20 });
  await sleep(500);
  await page.screenshot({ path: path.join(SHOT_DIR, 'verify_01_default.png') });

  // 选中文本
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await sleep(200);

  // 打开字体选择器
  const fontBtn = await page.$('button[title="字体"]');
  if (!fontBtn) {
    console.error('no font button');
    await browser.close();
    return;
  }
  await fontBtn.click();
  await sleep(800);

  // 点击"思源黑体SC"
  const clicked = await page.evaluate(() => {
    const panel = document.querySelector('[style*="z-index: 1000"]');
    if (!panel) return null;
    const buttons = Array.from(panel.querySelectorAll('button'));
    for (const b of buttons) {
      if ((b.textContent || '').includes('思源黑体SC') || (b.textContent || '').includes('思源黑体 SC')) {
        const r = b.getBoundingClientRect();
        b.click();
        return { text: b.textContent, y: r.top };
      }
    }
    return null;
  });
  console.log('clicked 思源黑体SC:', clicked);
  await sleep(2000);
  await page.screenshot({ path: path.join(SHOT_DIR, 'verify_02_sans.png') });

  // 验证 document.fonts
  const sansInfo = await page.evaluate(async () => {
    await document.fonts.ready;
    const out = [];
    document.fonts.forEach(f => {
      if (f.family.includes('Noto Sans SC') || f.family.includes('Noto Serif SC')) {
        out.push({ family: f.family, weight: f.weight, status: f.status });
      }
    });
    return out;
  });
  console.log('Noto Sans/Serif SC in document.fonts:', sansInfo.length);
  for (const s of sansInfo) console.log('  -', JSON.stringify(s));

  // 打开字体选择器, 改用 思源宋体SC
  const fontBtn2 = await page.$('button[title="字体"]');
  await fontBtn2.click();
  await sleep(500);
  await page.evaluate(() => {
    const panel = document.querySelector('[style*="z-index: 1000"]');
    if (!panel) return;
    const buttons = Array.from(panel.querySelectorAll('button'));
    for (const b of buttons) {
      if ((b.textContent || '').includes('思源宋体SC') || (b.textContent || '').includes('思源宋体 SC')) {
        b.click();
        return;
      }
    }
  });
  await sleep(2000);
  await page.screenshot({ path: path.join(SHOT_DIR, 'verify_03_serif.png') });

  // 改用 霞鹜文楷
  const fontBtn3 = await page.$('button[title="字体"]');
  await fontBtn3.click();
  await sleep(500);
  await page.evaluate(() => {
    const panel = document.querySelector('[style*="z-index: 1000"]');
    if (!panel) return;
    const buttons = Array.from(panel.querySelectorAll('button'));
    for (const b of buttons) {
      if ((b.textContent || '').includes('霞鹜文楷') && !b.textContent.includes('TC')) {
        b.click();
        return;
      }
    }
  });
  await sleep(2500);
  await page.screenshot({ path: path.join(SHOT_DIR, 'verify_04_lxgw.png') });

  // 获取当前编辑器中文字的 computed style
  const styleInfo = await page.evaluate(() => {
    const el = document.querySelector('.ProseMirror, [contenteditable="true"]');
    if (!el) return null;
    return {
      fontFamily: window.getComputedStyle(el).fontFamily,
      text: (el.textContent || '').slice(0, 50),
    };
  });
  console.log('current editor style:', styleInfo);

  await browser.close();
  console.log('done');
}

run().catch(e => { console.error(e); process.exit(1); });
