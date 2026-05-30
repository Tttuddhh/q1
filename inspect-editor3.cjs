const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto('http://localhost:3002/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Get all buttons and their text
  const buttons = await page.$$('button');
  console.log(`Found ${buttons.length} buttons total`);
  const buttonInfo = [];
  for (let i = 0; i < buttons.length; i++) {
    const text = (await buttons[i].textContent())?.trim();
    const title = await buttons[i].getAttribute('title');
    const className = await buttons[i].getAttribute('class');
    const outerHTML = await buttons[i].evaluate(el => el.outerHTML.substring(0, 200));
    if (text || title) {
      buttonInfo.push({ index: i, text, title, className, outerHTML });
    }
  }

  for (const info of buttonInfo) {
    console.log(`\nButton ${info.index}: text="${info.text}", title="${info.title}", class="${info.className}"`);
    console.log(`  HTML: ${info.outerHTML}`);
  }

  // Try to find the edit button with a broader search
  // Also look for elements with onclick or data attributes related to editing
  const editEl = await page.$('[data-action="edit"], .edit-btn, [aria-label*="编辑"], [aria-label*="edit"], [title*="编辑"], [title*="edit"]');
  if (editEl) {
    const text = await editEl.textContent();
    console.log(`\nFound potential edit element: "${text}"`);
    await editEl.click();
    await page.waitForTimeout(2000);
  }

  // Also try clicking by finding the first page in the sidebar and then looking for edit controls
  console.log('\n=== Looking for page navigation elements ===');
  const treeItems = await page.$$('.tree-item, .func-sidebar-item');
  console.log(`Found ${treeItems.length} tree/sidebar items`);
  for (let i = 0; i < treeItems.length; i++) {
    const text = await treeItems[i].textContent();
    if (text?.includes('使用指南') || text?.includes('指南')) {
      console.log(`Found tree item: "${text}"`);
    }
  }

  // Take a screenshot of the whole page
  await page.screenshot({ path: '/workspace/full-page.png', fullPage: true });
  console.log('\nFull page screenshot saved');

  await browser.close();
})();