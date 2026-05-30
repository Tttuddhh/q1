const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto('http://localhost:3002/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Take screenshot of initial page
  await page.screenshot({ path: '/workspace/screenshot-preview.png', fullPage: false });
  console.log('Screenshot saved: screenshot-preview.png');

  // Find and click the edit button
  // Look for edit button - searching by text or common selectors
  const editButtons = await page.$$('button');
  for (const btn of editButtons) {
    const text = await btn.textContent();
    if (text && (text.includes('编辑') || text.includes('Edit'))) {
      console.log('Found edit button:', text);
      await btn.click();
      break;
    }
  }

  await page.waitForTimeout(2000);

  // Now check ProseMirror paragraphs
  const pmParagraphs = await page.$$('.ProseMirror p');
  console.log(`\n=== Found ${pmParagraphs.length} .ProseMirror p elements in edit mode ===`);

  for (let i = 0; i < Math.min(pmParagraphs.length, 8); i++) {
    const text = await pmParagraphs[i].textContent();
    const styles = await pmParagraphs[i].evaluate(el => {
      const cs = window.getComputedStyle(el);
      return {
        marginTop: cs.marginTop,
        marginBottom: cs.marginBottom,
        lineHeight: cs.lineHeight,
        fontSize: cs.fontSize,
        color: cs.color,
      };
    });
    console.log(`\nPM Paragraph ${i + 1}:`);
    console.log(`  Text: "${text?.substring(0, 60)}..."`);
    console.log(`  Styles:`, JSON.stringify(styles, null, 2));
  }

  // Check some CSS rules
  if (pmParagraphs.length > 0) {
    const cssInfo = await pmParagraphs[0].evaluate(el => {
      const rules = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule instanceof CSSStyleRule && rule.selectorText && (
              rule.selectorText.includes('ProseMirror p') || 
              rule.selectorText.includes('.prose p') ||
              rule.selectorText === 'p'
            )) {
              rules.push({
                selector: rule.selectorText,
                marginTop: rule.style.marginTop || 'not set',
                marginBottom: rule.style.marginBottom || 'not set',
                lineHeight: rule.style.lineHeight || 'not set',
                fontSize: rule.style.fontSize || 'not set',
              });
            }
          }
        } catch (e) {}
      }
      return rules;
    });
    console.log('\n=== CSS Rules for p elements ===');
    for (const rule of cssInfo) {
      console.log(`  ${rule.selector}: marginTop=${rule.marginTop}, marginBottom=${rule.marginBottom}, lineHeight=${rule.lineHeight}, fontSize=${rule.fontSize}`);
    }
  }

  await page.screenshot({ path: '/workspace/screenshot-editor.png', fullPage: false });
  console.log('\nScreenshot saved: screenshot-editor.png');

  await browser.close();
})();