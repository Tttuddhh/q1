import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:3001';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  try {
    // 1. Navigate to home
    console.log('Navigating to', BASE_URL);
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // 2. Click on "知识库使用指南" page in the page tree
    console.log('Looking for 知识库使用指南...');
    const pageTreeItem = await page.locator('text=知识库使用指南').first();
    await pageTreeItem.waitFor({ state: 'visible', timeout: 10000 });
    await pageTreeItem.click();
    await page.waitForTimeout(1500);

    // 3. Right-click on the page to open context menu, then click "编辑" (Edit)
    console.log('Right-clicking to open context menu...');
    await pageTreeItem.click({ button: 'right' });
    await page.waitForTimeout(500);

    const editButton = await page.locator('text=编辑').first();
    await editButton.waitFor({ state: 'visible', timeout: 5000 });
    await editButton.click();
    await page.waitForTimeout(1500);

    // 4. Click in the editor content area (the ProseMirror element)
    console.log('Clicking in editor content area...');
    const editor = await page.locator('.ProseMirror').first();
    await editor.waitFor({ state: 'visible', timeout: 10000 });
    await editor.click();
    await page.waitForTimeout(500);

    // 5. Type text with Enter keys
    console.log('Typing text with Enter keys...');
    await page.keyboard.type('Line 1');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Line 2');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Line 3');
    await page.waitForTimeout(1000);

    // 6. Take a screenshot
    const screenshotPath = '/workspace/paragraph-spacing-test.png';
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log('Screenshot saved to', screenshotPath);

    // 7. Inspect DOM for new-paragraph class
    console.log('Inspecting DOM for new-paragraph class...');
    const paragraphs = await editor.locator('p').all();
    console.log(`Found ${paragraphs.length} paragraph(s) in editor`);

    let newParagraphCount = 0;
    let spacingResults = [];

    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i];
      const text = await p.textContent();
      const className = await p.getAttribute('class');
      const hasNewParagraph = className && className.includes('new-paragraph');

      // Get computed styles
      const styles = await p.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          marginBottom: computed.marginBottom,
          marginTop: computed.marginTop,
          lineHeight: computed.lineHeight,
        };
      });

      console.log(`Paragraph ${i}: text="${text?.trim()}", class="${className}", hasNewParagraph=${hasNewParagraph}, marginBottom=${styles.marginBottom}, marginTop=${styles.marginTop}, lineHeight=${styles.lineHeight}`);

      if (hasNewParagraph) {
        newParagraphCount++;
      }

      spacingResults.push({
        index: i,
        text: text?.trim(),
        className,
        hasNewParagraph,
        ...styles,
      });
    }

    // 8. Measure spacing between paragraphs visually (bounding boxes)
    console.log('Measuring visual spacing between paragraphs...');
    const boundingBoxes = [];
    for (let i = 0; i < paragraphs.length; i++) {
      const box = await paragraphs[i].boundingBox();
      if (box) boundingBoxes.push(box);
    }

    for (let i = 0; i < boundingBoxes.length - 1; i++) {
      const gap = boundingBoxes[i + 1].y - (boundingBoxes[i].y + boundingBoxes[i].height);
      console.log(`Gap between paragraph ${i} and ${i + 1}: ${gap.toFixed(2)}px`);
    }

    // Summary
    console.log('\n=== SUMMARY ===');
    console.log(`Total paragraphs: ${paragraphs.length}`);
    console.log(`Paragraphs with 'new-paragraph' class: ${newParagraphCount}`);
    console.log(`Expected: newly created paragraphs should have class 'new-paragraph' and margin-bottom: 0px`);

    // Save results to JSON
    fs.writeFileSync('/workspace/paragraph-spacing-results.json', JSON.stringify({
      summary: {
        totalParagraphs: paragraphs.length,
        newParagraphCount,
      },
      paragraphs: spacingResults,
      boundingBoxes,
    }, null, 2));
    console.log('Results saved to /workspace/paragraph-spacing-results.json');

  } catch (err) {
    console.error('Error during test:', err);
    await page.screenshot({ path: '/workspace/paragraph-spacing-error.png', fullPage: false });
    console.log('Error screenshot saved to /workspace/paragraph-spacing-error.png');
  } finally {
    await browser.close();
  }
})();
