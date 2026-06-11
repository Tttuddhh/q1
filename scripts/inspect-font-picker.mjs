// 用 Playwright 打开本地网站，截图查看字体选择器
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

  page.on('console', msg => console.log('[BROWSER]', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('[ERROR]', err.message));

  console.log('打开 http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

  console.log('等待页面稳定...');
  await page.waitForTimeout(2000);

  // 截图1：首页
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-home.png'), fullPage: false });
  console.log('已截图: 01-home.png');

  // 抓取页面文本
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('--- 页面文本（前 2000 字）---');
  console.log(bodyText.substring(0, 2000));
  console.log('--- 页面 HTML title ---');
  const title = await page.title();
  console.log('title:', title);

  // 找字体选择器按钮
  const fontButton = page.locator('button:has-text("T"), button:has-text("字体"), button:has-text("Font"), button[title*="字体"], button[title*="font"]').first();
  const hasFontButton = await fontButton.count();
  console.log('找到字体按钮数量:', hasFontButton);

  if (hasFontButton > 0) {
    console.log('点击字体选择器...');
    await fontButton.click();
    await page.waitForTimeout(2000);

    // 截图2：字体选择器展开
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-font-picker-open.png'), fullPage: false });
    console.log('已截图: 02-font-picker-open.png');

    // 提取字体列表
    const fontList = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const fontButtons = buttons.filter(b => {
        const text = b.innerText || '';
        return text.length > 0 && text.length < 50;
      });
      return fontButtons.map(b => b.innerText).slice(0, 50);
    });
    console.log('--- 字体选项（前 50 个）---');
    fontList.forEach((f, i) => console.log(`${i + 1}. ${f}`));

    // 悬停第 5 个字体看效果
    if (fontList.length > 5) {
      const targetButton = page.locator('button').filter({ hasText: fontList[4] }).first();
      await targetButton.hover();
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-font-hover.png'), fullPage: false });
      console.log('已截图: 03-font-hover.png');
    }

    // 滚动查看更多字体
    const scrollContainer = page.locator('div[style*="overflowY"]').first();
    if (await scrollContainer.count() > 0) {
      await scrollContainer.evaluate((el) => el.scrollTo(0, 500));
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-font-scroll.png'), fullPage: false });
      console.log('已截图: 04-font-scroll.png');
    }
  } else {
    console.log('未找到字体按钮，列出所有可见 button:');
    const allButtons = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button'))
        .map(b => b.innerText || b.title || b.getAttribute('aria-label') || '[empty]')
        .filter(t => t.length > 0)
        .slice(0, 30);
    });
    allButtons.forEach((b, i) => console.log(`  ${i + 1}. ${b}`));
  }

  await browser.close();
  console.log('完成！');
}

main().catch(err => {
  console.error('FAILED:', err);
  process.exit(1);
});
