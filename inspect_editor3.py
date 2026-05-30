from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    
    page.goto('http://localhost:3002/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    # Find the "知识库使用指南" tree item and right-click it
    tree_items = page.locator('.tree-item-animated').all()
    
    target = None
    for item in tree_items:
        text = item.text_content()
        if text and '使用指南' in text:
            target = item
            break
    
    if target:
        box = target.bounding_box()
        page.mouse.click(box['x'] + box['width'] / 2, box['y'] + box['height'] / 2, button='right')
        page.wait_for_timeout(1000)
        
        # Check if context menu DOM exists
        context_menu_html = page.evaluate("""() => {
            // Look for fixed positioned element that could be the context menu
            const allDivs = document.querySelectorAll('div');
            for (const div of allDivs) {
                const style = window.getComputedStyle(div);
                if (style.position === 'fixed' && style.zIndex === '1000') {
                    return {
                        html: div.outerHTML.substring(0, 500),
                        visible: div.offsetParent !== null,
                    };
                }
            }
            return null;
        }""")
        
        print(f"Context menu found: {context_menu_html}")
        
        if context_menu_html and context_menu_html['visible']:
            print(f"HTML: {context_menu_html['html']}")
        
        # Also try to force-click any menu items by looking at the DOM
        page.screenshot(path='/workspace/context-screenshot.png', full_page=False)
        print("Screenshot saved")
        
        # Try clicking on any element that has '编辑' text in the fixed positioned div
        result = page.evaluate("""() => {
            const allDivs = document.querySelectorAll('div');
            for (const div of allDivs) {
                const style = window.getComputedStyle(div);
                if (style.position === 'fixed' && style.zIndex === '1000') {
                    const buttons = div.querySelectorAll('button');
                    for (const btn of buttons) {
                        if (btn.textContent.includes('编辑') || btn.textContent.includes('Edit')) {
                            btn.click();
                            return 'clicked ' + btn.textContent.trim();
                        }
                    }
                }
            }
            return 'no edit button found';
        }""")
        print(f"\nClick result: {result}")
        
        page.wait_for_timeout(2000)
        
        # Check if editor appeared
        pm = page.locator('.ProseMirror')
        print(f"\nProseMirror count after click: {pm.count()}")
        
        if pm.count() > 0:
            print("\n=== EDITOR MODE ACTIVE ===")
            page.screenshot(path='/workspace/editor-active.png', full_page=False)
        else:
            print("Still in preview mode")
    
    browser.close()