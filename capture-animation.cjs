const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const screenshotDir = path.join(__dirname, 'animation-frames');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto('http://localhost:5177/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 点击设置按钮
  const settingsBtn = await page.locator('button[title="设置"]').first();
  if (await settingsBtn.isVisible().catch(() => false)) {
    await settingsBtn.click();
    await page.waitForTimeout(500);
  }

  // 点击外观标签
  const appearanceTab = await page.locator('text=外观').first();
  if (await appearanceTab.isVisible().catch(() => false)) {
    await appearanceTab.click();
    await page.waitForTimeout(500);
  }

  // 捕获初始状态
  await page.screenshot({ path: path.join(screenshotDir, '01-initial.png') });

  // 点击右箭头，捕获动画过程
  const rightArrow = await page.locator('button').filter({ has: page.locator('svg') }).nth(1);

  // 捕获点击前的状态
  await page.screenshot({ path: path.join(screenshotDir, '02-before-click.png') });

  // 点击右箭头
  await rightArrow.click();

  // 捕获动画过程中的多个关键帧
  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(20); // 每20ms一帧
    await page.screenshot({ path: path.join(screenshotDir, `03-frame-${String(i).padStart(2, '0')}.png`) });
  }

  // 等待动画完成
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(screenshotDir, '04-after-animation.png') });

  // 再点击一次右箭头
  await rightArrow.click();
  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(20);
    await page.screenshot({ path: path.join(screenshotDir, `05-frame2-${String(i).padStart(2, '0')}.png`) });
  }

  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(screenshotDir, '06-final.png') });

  await browser.close();
  console.log('Animation frames captured in:', screenshotDir);
})();
