from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    
    page.goto('http://localhost:3000/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    # Find "更多操作" buttons
    more_buttons = page.locator('[title="更多操作"]').all()
    print(f"Found {len(more_buttons)} '更多操作' buttons")
    
    # Find the one for "知识库使用指南" - it should be the first one
    if more_buttons:
        # The first tree item is "知识库使用指南"
        more_buttons[0].click(force=True)
        page.wait_for_timeout(1000)
        
        # Now find the context menu
        cm = page.evaluate("""() => {
            const allDivs = document.querySelectorAll('div');
            for (const div of allDivs) {
                const style = window.getComputedStyle(div);
                if (style.position === 'fixed' && parseInt(style.zIndex) === 1000) {
                    const buttons = div.querySelectorAll('button');
                    const texts = [];
                    for (const btn of buttons) {
                        texts.push(btn.textContent.trim());
                    }
                    return { exists: true, buttons: texts };
                }
            }
            return { exists: false };
        }""")
        print(f"Context menu: {cm}")
        
        if cm['exists']:
            # Click edit
            result = page.evaluate("""() => {
                const allDivs = document.querySelectorAll('div');
                for (const div of allDivs) {
                    const style = window.getComputedStyle(div);
                    if (style.position === 'fixed' && parseInt(style.zIndex) === 1000) {
                        const buttons = div.querySelectorAll('button');
                        for (const btn of buttons) {
                            const text = btn.textContent.trim();
                            if (text.includes('编辑')) {
                                btn.click();
                                return 'clicked: ' + text;
                            }
                        }
                    }
                }
                return 'not found';
            }""")
            print(f"Edit click result: {result}")
            
            page.wait_for_timeout(2000)
            
            # Check editor
            pm = page.locator('.ProseMirror')
            print(f"\nProseMirror count: {pm.count()}")
            
            if pm.count() > 0:
                print("\n=== EDITOR MODE ACTIVE ===")
                page.screenshot(path='/workspace/editor-final.png', full_page=False)
                print("Editor screenshot saved")
                
                # Check info-box
                ib = page.locator('.ProseMirror .info-box')
                print(f"Info-box in editor: {ib.count()}")
                
                # Check paragraph styles
                pm_ps = page.locator('.ProseMirror p').all()
                print(f"\nProseMirror paragraphs: {len(pm_ps)}")
                for i, p in enumerate(pm_ps[:8]):
                    text = p.text_content()
                    cs = p.evaluate("el => { const s = window.getComputedStyle(el); return {mt: s.marginTop, mb: s.marginBottom, lh: s.lineHeight, fs: s.fontSize}; }")
                    print(f"  P{i}: mt={cs['mt']}, mb={cs['mb']}, lh={cs['lh']}, fs={cs['fs']}")
                    print(f"    Text: '{text[:60] if text else ''}'")
                
                # Click at end of editor and type new paragraphs
                pm.first.click()
                page.keyboard.press('Control+End')
                page.wait_for_timeout(500)
                page.keyboard.press('Enter')
                page.keyboard.press('Enter')
                page.keyboard.type('AAA New Line 1')
                page.keyboard.press('Enter')
                page.keyboard.type('BBB New Line 2')
                page.keyboard.press('Enter')
                page.keyboard.type('CCC New Line 3')
                page.wait_for_timeout(1000)
                
                page.screenshot(path='/workspace/editor-new-text.png', full_page=False)
                print("\nEditor with new text screenshot saved")
                
                # Re-check paragraphs
                pm_ps2 = page.locator('.ProseMirror p').all()
                print(f"\nAfter typing: {len(pm_ps2)} paragraphs")
                
                # Check the last 4 paragraphs
                for i in range(max(0, len(pm_ps2) - 4), len(pm_ps2)):
                    p = pm_ps2[i]
                    text = p.text_content()
                    cs = p.evaluate("el => { const s = window.getComputedStyle(el); return {mt: s.marginTop, mb: s.marginBottom, lh: s.lineHeight, fs: s.fontSize}; }")
                    print(f"  P{i}: mt={cs['mt']}, mb={cs['mb']}, lh={cs['lh']}, fs={cs['fs']}")
                    print(f"    Text: '{text[:60] if text else ''}'")
            else:
                print("Still in preview mode")
        else:
            print("Context menu did not appear")
    
    browser.close()