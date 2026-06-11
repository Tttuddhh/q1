// 点击"新建页面"按钮进入编辑器
import { chromium } from 'playwright';
import * as path from 'path';

const SCREENSHOT_DIR = '/workspace/screenshots';

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

  // 点击"新建页面"按钮
  console.log('点击新建页面按钮...');
  const newPageBtn = page.locator('button:has-text("新建页面")').first();
  if (await newPageBtn.count() > 0) {
    await newPageBtn.click();
    await page.waitForTimeout(2000);
  } else {
    console.log('未找到新建页面按钮');
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10-new-page.png') });
  console.log('已截图: 10-new-page.png');

  // 提取所有 button
  const allButtons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map((b, i) => ({
      idx: i,
      text: (b.innerText || '').trim().substring(0, 30),
      title: b.getAttribute('title') || '',
      ariaLabel: b.getAttribute('aria-label') || '',
    })).filter(b => b.text || b.title || b.ariaLabel);
  });
  console.log(`\n--- 所有按钮 (${allButtons.length}) ---`);
  allButtons.forEach(b => {
    console.log(`  [${b.idx}] text="${b.text}" title="${b.title}"`);
  });

  // 检查页面 DOM
  const domInfo = await page.evaluate(() => {
    const root = document.querySelector('#root, #app, main, .app');
    const allDivs = Array.from(document.querySelectorAll('div'));
    return {
      hasRoot: !!root,
      rootTag: root?.tagName,
      bodyText: document.body.innerText.substring(0, 500),
      editableCount: document.querySelectorAll('[contenteditable]').length,
    };
  });
  console.log('\n--- DOM 信息 ---');
  console.log(JSON.stringify(domInfo, null, 2));

  await browser.close();
  console.log('完成');
}

main().catch(err => {
  console.error('FAILED:', err);
  process.exit(1);
});
