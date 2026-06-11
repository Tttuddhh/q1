// 完整的知识库探索脚本:
// 1. 打开首页
// 2. 列出页面树
// 3. 导航到一个有内容的页面 (例如 "富文本编辑器")
// 4. 通过 "更多操作" 菜单点击 "编辑" 进入编辑模式
// 5. 在编辑器中点击字体选择器
// 6. 验证字体选择器是否打开, 截图

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const URL = 'http://localhost:3000';
const SHOT_DIR = '/workspace/screenshots';
fs.mkdirSync(SHOT_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  page.on('console', (msg) => {
    const t = msg.type();
    if (t === 'error' || t === 'warning') {
      console.log(`[browser ${t}]`, msg.text().slice(0, 200));
    }
  });
  page.on('pageerror', (err) => console.log('[pageerror]', err.message));

  console.log('1) goto', URL);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(800);
  await page.screenshot({ path: path.join(SHOT_DIR, '20_home.png'), fullPage: true });

  // 2) 列出页面树
  const treeItems = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.tree-item-animated'));
    return items.map((el) => {
      const text = (el.textContent || '').trim().replace(/\s+/g, ' ');
      const rect = el.getBoundingClientRect();
      return { text: text.slice(0, 80), top: Math.round(rect.top), left: Math.round(rect.left) };
    });
  });
  console.log(`2) page tree items: ${treeItems.length}`);
  for (const t of treeItems) console.log('   -', t.text, `@(${t.left},${t.top})`);

  // 3) 找到 "富文本编辑器" 并点击
  const target = treeItems.find((t) => t.text.includes('富文本编辑器')) || treeItems.find((t) => t.text.includes('编辑器')) || treeItems[0];
  if (!target) {
    console.log('no page found');
    await browser.close();
    return;
  }
  console.log('3) clicking page:', target.text);
  await page.mouse.click(target.left + 60, target.top + 10);
  await sleep(800);
  await page.screenshot({ path: path.join(SHOT_DIR, '21_after_navigate.png'), fullPage: true });

  // 4) 进入编辑模式 - 通过 "更多操作" 菜单 (more button)
  // 找到 more 按钮
  const moreBtn = await page.evaluate((text) => {
    const items = Array.from(document.querySelectorAll('.tree-item-animated'));
    for (const it of items) {
      if ((it.textContent || '').includes(text)) {
        const btn = it.querySelector('button[title="更多操作"]');
        if (btn) {
          const r = btn.getBoundingClientRect();
          return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
        }
      }
    }
    return null;
  }, target.text);
  console.log('4) more btn:', moreBtn);
  if (!moreBtn) {
    console.log('   no more button, trying right-click');
    await page.mouse.click(target.left + 60, target.top + 10, { button: 'right' });
  } else {
    await page.mouse.click(moreBtn.x, moreBtn.y);
  }
  await sleep(500);
  await page.screenshot({ path: path.join(SHOT_DIR, '22_context_menu.png'), fullPage: true });

  // 5) 点击 "编辑" 菜单项
  const editClicked = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.menu-item'));
    for (const it of items) {
      if ((it.textContent || '').trim().startsWith('编辑') || (it.textContent || '').trim().includes('编辑')) {
        const r = it.getBoundingClientRect();
        it.click();
        return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), text: it.textContent };
      }
    }
    return null;
  });
  console.log('5) edit menu item clicked:', editClicked);
  await sleep(1200);
  await page.screenshot({ path: path.join(SHOT_DIR, '23_editor_mode.png'), fullPage: true });

  // 6) 验证是否在编辑模式 (寻找 .ProseMirror)
  const editorCount = await page.evaluate(() => document.querySelectorAll('.ProseMirror, [contenteditable="true"]').length);
  console.log('6) editable elements:', editorCount);
  if (editorCount === 0) {
    console.log('   not in edit mode, dump body text:');
    const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 500));
    console.log('   body text:', bodyText);
    await browser.close();
    return;
  }

  // 7) 在编辑器里点击一下, 把光标放进去
  const editor = await page.$('.ProseMirror, [contenteditable="true"]');
  if (editor) {
    await editor.click();
    await sleep(300);
    await page.keyboard.type('中文字体测试ABC', { delay: 30 });
    await sleep(300);
  }
  await page.screenshot({ path: path.join(SHOT_DIR, '24_typed_text.png'), fullPage: true });

  // 8) 找到字体按钮 (FontPicker 的 button) - 通过 title="字体"
  const fontBtnInfo = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    for (const b of btns) {
      if (b.title === '字体' || b.title === 'Font') {
        const r = b.getBoundingClientRect();
        return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), text: (b.textContent || '').trim() };
      }
    }
    // 备选: 找包含 T 字符的按钮
    for (const b of btns) {
      const t = (b.textContent || '').trim();
      if (t.startsWith('T') && b.querySelector('span') && t.length < 30) {
        const r = b.getBoundingClientRect();
        return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), text: t };
      }
    }
    return null;
  });
  console.log('8) font button:', fontBtnInfo);

  if (!fontBtnInfo) {
    console.log('   font button not found, dump buttons:');
    const allBtns = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button')).map(b => ({
        title: b.title,
        text: (b.textContent || '').trim().slice(0, 30),
      })).filter(x => x.text || x.title);
    });
    console.log('   buttons:', allBtns.slice(0, 30));
    await browser.close();
    return;
  }

  await page.mouse.click(fontBtnInfo.x, fontBtnInfo.y);
  await sleep(500);
  await page.screenshot({ path: path.join(SHOT_DIR, '25_font_picker_open.png'), fullPage: true });

  // 9) 列出字体选项
  const fontOptions = await page.evaluate(() => {
    const panel = document.querySelector('[style*="z-index: 1000"]');
    if (!panel) return [];
    const items = Array.from(panel.querySelectorAll('button'));
    return items.map(b => {
      const text = (b.textContent || '').trim();
      const style = (b.querySelector('div')?.getAttribute('style') || '');
      const fontMatch = style.match(/font-family:\s*([^;]+)/);
      return { text: text.slice(0, 60), font: fontMatch ? fontMatch[1].trim() : null };
    }).filter(x => x.text);
  });
  console.log('9) font options count:', fontOptions.length);
  for (const o of fontOptions.slice(0, 30)) console.log('   -', o.text, '|', o.font);

  // 10) 等待字体预加载
  await sleep(3000);
  await page.screenshot({ path: path.join(SHOT_DIR, '26_font_picker_loaded.png'), fullPage: true });

  // 11) 截图: 滚动到列表底部
  await page.evaluate(() => {
    const panel = document.querySelector('[style*="z-index: 1000"]');
    if (panel) {
      const list = panel.querySelector('div[style*="overflowY"]') || panel.querySelector('div[style*="overflow-y"]');
      if (list) list.scrollTop = list.scrollHeight;
    }
  });
  await sleep(500);
  await page.screenshot({ path: path.join(SHOT_DIR, '27_font_picker_scrolled.png'), fullPage: true });

  // 12) 验证第一个选项的 font-family 是否生效 (通过 document.fonts API)
  const fontsInfo = await page.evaluate(async () => {
    await document.fonts.ready;
    const loaded = [];
    document.fonts.forEach(f => {
      if (f.status === 'loaded') {
        loaded.push({ family: f.family, weight: f.weight, style: f.style });
      }
    });
    return { total: document.fonts.size, loaded: loaded.slice(0, 30) };
  });
  console.log('12) document.fonts:', JSON.stringify(fontsInfo, null, 2));

  // 13) 测试搜索功能
  await page.evaluate(() => {
    const panel = document.querySelector('[style*="z-index: 1000"]');
    if (panel) {
      const input = panel.querySelector('input');
      if (input) {
        input.focus();
        input.value = '霞';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  });
  await sleep(500);
  await page.screenshot({ path: path.join(SHOT_DIR, '28_font_search.png'), fullPage: true });

  await browser.close();
  console.log('done');
}

run().catch((e) => {
  console.error('ERROR:', e);
  process.exit(1);
});
