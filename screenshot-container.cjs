const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('http://localhost:5174/');
  await page.waitForTimeout(3000);
  // Click the container nav item - it's the last item in the knowledge section
  await page.locator('.func-sidebar-item:has-text("容器")').click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/workspace/screenshot-container.png', fullPage: true });
  await browser.close();
})();
