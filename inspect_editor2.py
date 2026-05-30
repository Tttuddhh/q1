from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    
    page.goto('http://localhost:3002/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    print("=== Page Title ===")
    print(page.title())

    # Find the "知识库使用指南" tree item and right-click it
    tree_items = page.locator('.tree-item-animated').all()
    print(f"\nFound {len(tree_items)} tree items")
    
    target = None
    for item in tree_items:
        text = item.text_content()
        if text and '使用指南' in text:
            target = item
            print(f"Found target: '{text}'")
            break
    
    if target:
        box = target.bounding_box()
        page.mouse.click(box['x'] + box['width'] / 2, box['y'] + box['height'] / 2, button='right')
        page.wait_for_timeout(1000)
        
        # Try finding the context menu by looking at all visible buttons
        all_buttons = page.locator('button').all()
        print(f"\nFound {len(all_buttons)} buttons after right-click")
        for btn in all_buttons:
            text = btn.text_content()
            visible = btn.is_visible()
            if visible and text and len(text) < 20:
                print(f"  '{text}'")
        
        # Try to find the edit option using text-based locator
        edit_btn = page.get_by_text("编辑", exact=True)
        edit_btn2 = page.get_by_text("Edit", exact=True)
        
        if edit_btn.count() > 0:
            print("\nFound '编辑' button!")
            edit_btn.first.click()
            page.wait_for_timeout(2000)
        elif edit_btn2.count() > 0:
            print("\nFound 'Edit' button!")
            edit_btn2.first.click()
            page.wait_for_timeout(2000)
        else:
            print("\nCould not find '编辑' or 'Edit' text")
            # Dump all visible elements with text
            print("Dumping all buttons with text:")
            for btn in all_buttons:
                text = btn.text_content()
                visible = btn.is_visible()
                if visible and text:
                    bbox = btn.bounding_box()
                    if bbox:
                        print(f"  '{text[:50]}' at ({bbox['x']:.0f}, {bbox['y']:.0f}) class='{btn.get_attribute('class')}'")
        
        # Check if editor appeared
        page.wait_for_timeout(1000)
        pm = page.locator('.ProseMirror')
        print(f"\nProseMirror count: {pm.count()}")
        
        if pm.count() > 0:
            print("\n=== EDITOR MODE ACTIVE ===")
            page.screenshot(path='/workspace/editor-found.png', full_page=False)
            
            # Check paragraphs
            ps = page.locator('.ProseMirror p').all()
            print(f"ProseMirror paragraphs: {len(ps)}")
            for i, p in enumerate(ps[:5]):
                text = p.text_content()
                cs = p.evaluate("el => window.getComputedStyle(el)")
                print(f"  P{i}: marginTop={cs['marginTop']}, marginBottom={cs['marginBottom']}, fontSize={cs['fontSize']}")
            
            # Check info-box
            ib = page.locator('.ProseMirror .info-box')
            print(f"\n.info-box count: {ib.count()}")
            
            # Check div[class]
            divs = page.locator('.ProseMirror div[class]').all()
            print(f"div[class] in ProseMirror: {len(divs)}")
            for d in divs:
                print(f"  class='{d.get_attribute('class')}'")
        else:
            print("\n=== STILL IN PREVIEW MODE ===")
    
    browser.close()