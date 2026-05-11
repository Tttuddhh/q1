const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });
    
    // Capture console logs
    page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    
    await page.goto('http://localhost:5175/', { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait a bit for React to render
    await page.waitForTimeout(3000);
    
    // Take screenshot
    await page.screenshot({ path: '/workspace/screenshot_puppeteer.png', fullPage: false });
    console.log('Screenshot saved to /workspace/screenshot_puppeteer.png');
    
    // Get root content
    const rootHtml = await page.evaluate(() => {
      const root = document.getElementById('root');
      return root ? root.innerHTML : 'NO ROOT';
    });
    console.log('Root HTML (first 500 chars):', rootHtml.substring(0, 500));
    
    await browser.close();
  } catch (e) {
    console.error('Error:', e.message);
  }
})();
