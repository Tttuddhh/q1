// 进入编辑器，查找字体选择器
import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const SCREENSHOT_DIR = '/workspace/screenshots';
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR);

async function main() {
  console.log('启动浏览器...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'zh-CN',
  });
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') console.log('[BROWSER ERROR]', msg.text());
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 步骤 1：点击左侧"富文本编辑器"
  console.log('点击富文本编辑器...');
  const richTextLink = page.locator('text=富文本编辑器').first();
  if (await richTextLink.count() > 0) {
    await richTextLink.click();
    await page.waitForTimeout(1500);
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-after-click-rich-text.png') });
  console.log('已截图: 02-after-click-rich-text.png');

  // 提取页面所有可见的工具栏按钮（编辑器区域）
  console.log('--- 查找编辑器工具栏 ---');
  const toolbarInfo = await page.evaluate(() => {
    const allElements = Array.from(document.querySelectorAll('button, [role="button"], [contenteditable]'));
    return allElements.map((el, idx) => {
      const text = (el.innerText || '').trim().substring(0, 30);
      const title = el.getAttribute('title') || '';
      const ariaLabel = el.getAttribute('aria-label') || '';
      const tag = el.tagName.toLowerCase();
      return { idx, tag, text, title, ariaLabel };
    }).filter(x => x.text || x.title || x.ariaLabel);
  });
  toolbarInfo.forEach(info => {
    if (info.title || info.ariaLabel) {
      console.log(`  [${info.idx}] ${info.tag} text="${info.text}" title="${info.title}" aria="${info.ariaLabel}"`);
    }
  });

  // 步骤 2：点击进入富文本编辑器页面（"文本格式化"等具体子页）
  console.log('\n点击文本格式化...');
  const textFormatLink = page.locator('text=文本格式化').first();
  if (await textFormatLink.count() > 0) {
    await textFormatLink.click();
    await page.waitForTimeout(2000);
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-text-format-page.png') });
  console.log('已截图: 03-text-format-page.png');

  // 查找所有有 title 属性的按钮
  const allTitledButtons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button[title]')).map(b => ({
      title: b.getAttribute('title'),
      text: (b.innerText || '').trim().substring(0, 20),
    })).filter(b => b.title);
  });
  console.log('\n--- 所有带 title 的按钮 ---');
  allTitledButtons.forEach(b => console.log(`  title="${b.title}" text="${b.text}"`));

  // 查找可能的字体选择器
  console.log('\n--- 查找字体相关按钮 ---');
  const fontButtons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button'))
      .filter(b => {
        const t = (b.getAttribute('title') || '').toLowerCase();
        return t.includes('font') || t.includes('字体');
      })
      .map(b => ({
        title: b.getAttribute('title'),
        text: (b.innerText || '').trim(),
        rect: b.getBoundingClientRect(),
      }));
  });
  console.log(`找到 ${fontButtons.length} 个字体按钮:`);
  fontButtons.forEach(b => console.log(`  "${b.title}" text="${b.text}"`));

  if (fontButtons.length > 0) {
    // 点击第一个字体按钮
    console.log('点击字体按钮...');
    await page.locator(`button[title*="font"], button[title*="字体"]`).first().click();
    await page.waitForTimeout(3000);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-font-picker-open.png') });
    console.log('已截图: 04-font-picker-open.png');

    // 提取字体列表
    const fontList = await page.evaluate(() => {
      // 查找字体选择器面板
      const panel = document.querySelector('div[style*="zIndex"], div[style*="z-index"]');
      if (!panel) return [];

      const buttons = Array.from(panel.querySelectorAll('button'));
      return buttons.map(b => {
        const spans = Array.from(b.querySelectorAll('span'));
        return {
          text: (b.innerText || '').trim().substring(0, 50),
          family: spans[0]?.style?.fontFamily || '',
        };
      });
    });
    console.log(`\n--- 字体列表 (${fontList.length} 个) ---`);
    fontList.slice(0, 50).forEach((f, i) => {
      console.log(`${i + 1}. "${f.text}" family="${f.family}"`);
    });

    // 滚动查看更多字体
    const scrollContainer = await page.locator('div[style*="overflowY"]').first();
    if (await scrollContainer.count() > 0) {
      await scrollContainer.evaluate((el) => el.scrollTo(0, 600));
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-font-list-scrolled.png') });
      console.log('已截图: 05-font-list-scrolled.png');

      await scrollContainer.evaluate((el) => el.scrollTo(0, 1500));
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-font-list-more.png') });
      console.log('已截图: 06-font-list-more.png');

      await scrollContainer.evaluate((el) => el.scrollTo(0, 5000));
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-font-list-end.png') });
      console.log('已截图: 07-font-list-end.png');
    }

    // 悬停某个字体查看预览
    if (fontList.length > 3) {
      // 滚动回顶部
      const scrollContainer2 = await page.locator('div[style*="overflowY"]').first();
      if (await scrollContainer2.count() > 0) {
        await scrollContainer2.evaluate((el) => el.scrollTo(0, 0));
        await page.waitForTimeout(1000);
      }
      // 悬停第 5 个字体
      const targetButton = page.locator('div[style*="overflowY"] button').nth(5);
      if (await targetButton.count() > 0) {
        await targetButton.hover();
        await page.waitForTimeout(3000);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-font-hover-preview.png') });
        console.log('已截图: 08-font-hover-preview.png');
      }
    }
  } else {
    console.log('未找到字体按钮');

    // 尝试在编辑器中查找 TipTap 编辑器
    console.log('\n--- 查找 TipTap 编辑器 ---');
    const editor = page.locator('.ProseMirror, [contenteditable="true"]').first();
    if (await editor.count() > 0) {
      console.log('找到 TipTap 编辑器，点击进入编辑模式...');
      await editor.click();
      await page.waitForTimeout(1500);

      // 查找冒泡菜单
      const bubbleMenu = await page.evaluate(() => {
        const allDivs = Array.from(document.querySelectorAll('div'));
        return allDivs.filter(d => {
          const style = d.getAttribute('style') || '';
          return style.includes('position') && (style.includes('absolute') || style.includes('fixed'));
        }).map(d => ({
          text: (d.innerText || '').trim().substring(0, 50),
          html: d.outerHTML.substring(0, 200),
        }));
      });
      console.log(`找到 ${bubbleMenu.length} 个浮动元素`);

      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09-editor-focus.png') });
      console.log('已截图: 09-editor-focus.png');
    }
  }

  await browser.close();
  console.log('\n完成！');
}

main().catch(err => {
  console.error('FAILED:', err);
  process.exit(1);
});
