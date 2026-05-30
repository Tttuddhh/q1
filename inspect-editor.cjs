const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto('http://localhost:3002/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  console.log('=== Page Title ===');
  console.log(await page.title());

  // Get initial page content
  const paragraphs = await page.$$('.prose p');
  console.log(`\n=== Found ${paragraphs.length} paragraph elements ===`);

  for (let i = 0; i < Math.min(paragraphs.length, 5); i++) {
    const text = await paragraphs[i].textContent();
    const styles = await paragraphs[i].evaluate(el => {
      const cs = window.getComputedStyle(el);
      return {
        marginTop: cs.marginTop,
        marginBottom: cs.marginBottom,
        lineHeight: cs.lineHeight,
        fontSize: cs.fontSize,
        color: cs.color,
      };
    });
    console.log(`\nParagraph ${i + 1}:`);
    console.log(`  Text: "${text.substring(0, 50)}..."`);
    console.log(`  Styles:`, JSON.stringify(styles, null, 2));
  }

  // Check ProseMirror paragraphs
  const pmParagraphs = await page.$$('.ProseMirror p');
  console.log(`\n=== Found ${pmParagraphs.length} .ProseMirror p elements ===`);

  for (let i = 0; i < Math.min(pmParagraphs.length, 5); i++) {
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
    console.log(`\nProseMirror Paragraph ${i + 1}:`);
    console.log(`  Text: "${text.substring(0, 50)}..."`);
    console.log(`  Styles:`, JSON.stringify(styles, null, 2));
  }

  // Check what CSS rules apply to the first paragraph
  if (pmParagraphs.length > 0) {
    const cssInfo = await pmParagraphs[0].evaluate(el => {
      const rules = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule instanceof CSSStyleRule && el.matches(rule.selectorText)) {
              rules.push({
                selector: rule.selectorText,
                marginTop: rule.style.marginTop || 'not set',
                marginBottom: rule.style.marginBottom || 'not set',
              });
            }
          }
        } catch (e) {
          // cross-origin sheets
        }
      }
      return rules;
    });
    console.log('\n=== CSS Rules matching first ProseMirror paragraph ===');
    for (const rule of cssInfo) {
      console.log(`  ${rule.selector}: margin-top=${rule.marginTop}, margin-bottom=${rule.marginBottom}`);
    }
  }

  await browser.close();
})();