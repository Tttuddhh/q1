const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('http://localhost:5174/');
  await page.waitForTimeout(2000);
  // Click on "容器" in the sidebar (the last item in knowledge management section)
  await page.click('text=容器');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/workspace/screenshot-container.png', fullPage: true });
  await browser.close();
})();
