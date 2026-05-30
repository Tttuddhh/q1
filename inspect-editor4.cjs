const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto('http://localhost:3002/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  console.log('=== Page info ===');
  console.log('Title:', await page.title());

  // Find the first page tree item and right-click it
  const treeItems = await page.$$('.tree-item-animated');
  console.log(`Found ${treeItems.length} tree items`);

  // Find the one with "知识库使用指南"
  let targetItem = null;
  for (const item of treeItems) {
    const text = await item.textContent();
    console.log(`Tree item: "${text}"`);
    if (text && text.includes('使用指南')) {
      targetItem = item;
      break;
    }
  }

  if (targetItem) {
    console.log('\n=== Right-clicking on "知识库使用指南" ===');
    // Right click
    const box = await targetItem.boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2, { button: 'right' });
    await page.waitForTimeout(1000);

    // Take screenshot of context menu
    await page.screenshot({ path: '/workspace/context-menu.png' });
    console.log('Context menu screenshot saved');

    // Find and click the edit option
    // Look for menu items
    const menuItems = await page.$$('[role="menuitem"], .menu-item');
    console.log(`Found ${menuItems.length} menu items`);
    for (const item of menuItems) {
      const text = await item.textContent();
      console.log(`Menu item: "${text}"`);
    }

    // Try to click "编辑" or "edit"
    let clicked = false;
    for (const item of menuItems) {
      const text = await item.textContent();
      if (text && (text.includes('编辑') || text.toLowerCase().includes('edit'))) {
        console.log(`Clicking: "${text}"`);
        await item.click();
        clicked = true;
        break;
      }
    }

    if (!clicked) {
      // Try looking for any element with text "编辑"
      const editElements = await page.$$('xpath=//*[contains(text(), "编辑") or contains(text(), "edit")]');
      console.log(`Found ${editElements.length} elements with "编辑"`);
      for (const el of editElements) {
        const text = await el.textContent();
        const visible = await el.isVisible();
        console.log(`  "${text}" visible: ${visible}`);
        if (visible && (text === '编辑' || text === 'edit' || text === 'Edit')) {
          await el.click();
          clicked = true;
          break;
        }
      }
    }

    await page.waitForTimeout(2000);

    // Now check if editor is visible
    const pmEl = await page.$('.ProseMirror');
    if (pmEl) {
      console.log('\n=== Editor mode is active ===');
      
      // Get all paragraphs in the editor
      const pmParagraphs = await page.$$('.ProseMirror p');
      console.log(`Found ${pmParagraphs.length} ProseMirror paragraphs`);

      for (let i = 0; i < Math.min(pmParagraphs.length, 8); i++) {
        const text = await pmParagraphs[i].textContent();
        const styles = await pmParagraphs[i].evaluate(el => {
          const cs = window.getComputedStyle(el);
          return {
            marginTop: cs.marginTop,
            marginBottom: cs.marginBottom,
            lineHeight: cs.lineHeight,
            fontSize: cs.fontSize,
          };
        });
        console.log(`\nPM Paragraph ${i + 1}:`);
        console.log(`  Text: "${text?.substring(0, 60)}..."`);
        console.log(`  marginTop: ${styles.marginTop}`);
        console.log(`  marginBottom: ${styles.marginBottom}`);
        console.log(`  lineHeight: ${styles.lineHeight}`);
        console.log(`  fontSize: ${styles.fontSize}`);
      }

      // Also check for divNode/info-box
      const infoBox = await page.$('.ProseMirror .info-box');
      if (infoBox) {
        console.log('\n=== Info box found in editor! ===');
      } else {
        console.log('\n=== No .info-box found in editor ===');
      }

      // Check for any div elements in editor
      const divs = await page.$$('.ProseMirror > div, .ProseMirror div[class]');
      console.log(`Found ${divs.length} div elements with class in editor`);
      for (const div of divs) {
        const className = await div.getAttribute('class');
        console.log(`  div class: "${className}"`);
      }

      await page.screenshot({ path: '/workspace/editor-mode.png', fullPage: false });
      console.log('\nEditor screenshot saved');
    } else {
      console.log('\n=== Editor not found. Still in preview mode ===');
      await page.screenshot({ path: '/workspace/after-click.png', fullPage: false });
    }
  }

  await browser.close();
})();