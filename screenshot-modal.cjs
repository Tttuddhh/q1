const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('http://localhost:5174/');
  await page.waitForTimeout(3000);
  await page.locator('.func-sidebar-item:has-text("容器")').click();
  await page.waitForTimeout(3000);
  // Click the first card cover (first div with cursor:pointer in the grid)
  const cards = await page.locator('div[style*="cursor: pointer"]').all();
  if (cards.length > 0) await cards[0].click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/workspace/screenshot-modal.png', fullPage: false });
  await browser.close();
})();
