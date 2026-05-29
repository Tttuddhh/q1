import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 打开页面
  await page.goto('http://localhost:5177/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // 先截图看首页
  await page.screenshot({ path: '/workspace/q1/screenshots/01_home.png', fullPage: true });
  console.log('Home screenshot saved');

  // 点击"富文本编辑器"子页面
  const richTextEditor = await page.locator('text=富文本编辑器').first();
  if (await richTextEditor.isVisible().catch(() => false)) {
    await richTextEditor.click();
    await page.waitForTimeout(1500);
    console.log('Clicked on 富文本编辑器');
  }

  // 截图
  await page.screenshot({ path: '/workspace/q1/screenshots/02_richtext_page.png', fullPage: true });
  console.log('Rich text page screenshot saved');

  // 通过 JavaScript 直接操作 React 状态来进入编辑模式
  // 方法：找到 App 组件的 fiber，调用 startEditing
  await page.evaluate(() => {
    const root = document.querySelector('#root');
    if (!root) return;

    const reactKey = Object.keys(root).find(k => k.startsWith('__reactContainer$') || k.startsWith('__reactFiber$'));
    if (!reactKey) return;

    const fiber = root[reactKey];

    // 遍历 fiber 树查找 App 组件（返回包含 startEditing 的组件）
    function findAppComponent(node) {
      if (!node) return null;

      // 检查当前节点是否有 startEditing 在 memoizedProps 中
      if (node.memoizedProps && node.memoizedProps.startEditing) {
        return node;
      }

      // 检查子节点
      let child = node.child;
      while (child) {
        const found = findAppComponent(child);
        if (found) return found;
        child = child.sibling;
      }

      return null;
    }

    // 从根开始查找
    let current = fiber;
    while (current && current.return) {
      current = current.return;
    }

    const appFiber = findAppComponent(current);
    if (appFiber && appFiber.memoizedProps && appFiber.memoizedProps.startEditing) {
      console.log('Found App component with startEditing');
      // 获取当前页面 ID 并调用 startEditing
      const pageId = appFiber.memoizedProps.currentPageId;
      if (pageId) {
        appFiber.memoizedProps.startEditing(pageId);
        console.log('Called startEditing with pageId:', pageId);
      }
    } else {
      console.log('App component not found');
    }
  });

  await page.waitForTimeout(1500);

  // 截图看是否进入编辑模式
  await page.screenshot({ path: '/workspace/q1/screenshots/03_after_edit_attempt.png', fullPage: true });
  console.log('After edit attempt screenshot saved');

  // 检查是否有编辑器出现
  const hasEditor = await page.evaluate(() => {
    return !!document.querySelector('.ProseMirror') || !!document.querySelector('[contenteditable="true"]');
  });
  console.log('Has editor:', hasEditor);

  if (hasEditor) {
    console.log('Editor found! Looking for emoji button...');

    // 查找表情按钮
    const buttons = await page.locator('button').all();
    let emojiButton = null;
    for (const btn of buttons) {
      const title = await btn.getAttribute('title');
      if (title === '表情' || title === 'Emoji') {
        emojiButton = btn;
        console.log('Found emoji button with title:', title);
        break;
      }
    }

    if (!emojiButton) {
      for (const btn of buttons) {
        const html = await btn.innerHTML();
        if (html.includes('Smile') || html.includes('smile') || html.includes('emoji')) {
          emojiButton = btn;
          console.log('Found emoji button by HTML');
          break;
        }
      }
    }

    if (emojiButton) {
      await emojiButton.click();
      await page.waitForTimeout(1000);
      console.log('Clicked emoji button');

      await page.screenshot({ path: '/workspace/q1/screenshots/04_emoji_picker.png', fullPage: true });
      console.log('Emoji picker screenshot saved');

      // 检查 EmojiPicker 中的按钮
      const pickerInfo = await page.evaluate(() => {
        const results = [];
        const picker = document.querySelector('.emoji-picker-scroll');
        if (!picker) {
          return { error: 'Emoji picker not found in DOM' };
        }

        const buttons = picker.querySelectorAll('button');
        let blankCount = 0;
        let totalCount = 0;

        for (const btn of buttons) {
          totalCount++;
          const rect = btn.getBoundingClientRect();
          const text = btn.textContent ? btn.textContent.trim() : '';
          const hasImg = btn.querySelector('img') !== null;
          const computedStyle = window.getComputedStyle(btn);
          const fontSize = computedStyle.fontSize;
          const fontFamily = computedStyle.fontFamily;

          const isBlank = !text && !hasImg && rect.width > 10 && rect.height > 10;
          if (isBlank) {
            blankCount++;
          }

          if (totalCount <= 30 || totalCount > buttons.length - 30) {
            results.push({
              index: totalCount,
              text: text,
              textLength: text.length,
              charCodes: text ? Array.from(text).map(c => c.codePointAt(0).toString(16)) : [],
              hasImg,
              width: rect.width,
              height: rect.height,
              x: rect.x,
              y: rect.y,
              fontSize,
              fontFamily,
              isBlank,
            });
          }
        }

        return {
          totalButtons: totalCount,
          blankCount,
          sampleButtons: results,
          pickerRect: picker.getBoundingClientRect(),
        };
      });

      console.log('Emoji picker analysis:');
      console.log(JSON.stringify(pickerInfo, null, 2));

      if (pickerInfo.error) {
        console.log(`Error: ${pickerInfo.error}`);
      } else {
        console.log(`\n=== 检查结果（实际 EmojiPicker）===`);
        console.log(`总表情按钮数: ${pickerInfo.totalButtons}`);
        console.log(`空白方框数: ${pickerInfo.blankCount}`);

        if (pickerInfo.blankCount > 0) {
          console.log(`\n⚠️ 发现 ${pickerInfo.blankCount} 个空白方框！`);
        } else {
          console.log(`\n✅ 未发现空白方框`);
        }
      }
    } else {
      console.log('Emoji button not found in editor');
    }
  } else {
    console.log('Editor not found after attempting to start editing');
  }

  await browser.close();
})();
import {import { chromium } from 'playwright';

import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 处理 dialog
  page.onimport { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 处理 dialog
  page.on('dialog', async dialog => {
    console.log(`Dialog type: ${dialog.type()}, messageimport { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 处理 dialog
  page.on('dialog', async dialog => {
    console.log(`Dialog type: ${dialog.type()}, message: ${dialog.message()}`);
    ifimport { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 处理 dialog
  page.on('dialog', async dialog => {
    console.log(`Dialog type: ${dialog.type()}, message: ${dialog.message()}`);
    if (dialog.type() === 'prompt') {
      await dialog.accept('test');
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 处理 dialog
  page.on('dialog', async dialog => {
    console.log(`Dialog type: ${dialog.type()}, message: ${dialog.message()}`);
    if (dialog.type() === 'prompt') {
      await dialog.accept('test');
    } else {
      await dialog.accept();
    }
  });

  //import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 处理 dialog
  page.on('dialog', async dialog => {
    console.log(`Dialog type: ${dialog.type()}, message: ${dialog.message()}`);
    if (dialog.type() === 'prompt') {
      await dialog.accept('test');
    } else {
      await dialog.accept();
    }
  });

  // 打开页面
  await page.goto('httpimport { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 处理 dialog
  page.on('dialog', async dialog => {
    console.log(`Dialog type: ${dialog.type()}, message: ${dialog.message()}`);
    if (dialog.type() === 'prompt') {
      await dialog.accept('test');
    } else {
      await dialog.accept();
    }
  });

  // 打开页面
  await page.goto('http://localhost:5177/');
  await page.waitForLoadState('networkidle');import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 处理 dialog
  page.on('dialog', async dialog => {
    console.log(`Dialog type: ${dialog.type()}, message: ${dialog.message()}`);
    if (dialog.type() === 'prompt') {
      await dialog.accept('test');
    } else {
      await dialog.accept();
    }
  });

  // 打开页面
  await page.goto('http://localhost:5177/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // 先截图看首页
  await page.screenshot({ path:import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 处理 dialog
  page.on('dialog', async dialog => {
    console.log(`Dialog type: ${dialog.type()}, message: ${dialog.message()}`);
    if (dialog.type() === 'prompt') {
      await dialog.accept('test');
    } else {
      await dialog.accept();
    }
  });

  // 打开页面
  await page.goto('http://localhost:5177/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // 先截图看首页
  await page.screenshot({ path: '/workspace/q1/screenshots/01_home.png', fullPage: true });
  console.log('Home screenshot saved');

