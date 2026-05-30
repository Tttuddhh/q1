from playwright.sync_api import sync_playwright
import json

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
        # Right-click on the tree item
        box = target.bounding_box()
        page.mouse.click(box['x'] + box['width'] / 2, box['y'] + box['height'] / 2, button='right')
        page.wait_for_timeout(1000)
        
        # Take screenshot of context menu
        page.screenshot(path='/workspace/context-menu.png', full_page=False)
        print("Context menu screenshot saved")
        
        # Find the edit button in the context menu
        edit_btn = page.locator('button.menu-item:has-text("编辑")').first
        edit_btn2 = page.locator('button.menu-item:has-text("Edit")').first
        
        if edit_btn.count() > 0:
            print("Found '编辑' button, clicking...")
            edit_btn.click()
        elif edit_btn2.count() > 0:
            print("Found 'Edit' button, clicking...")
            edit_btn2.click()
        else:
            # Try looking for any menu-item button
            menu_items = page.locator('button.menu-item').all()
            print(f"Found {len(menu_items)} menu items:")
            for mi in menu_items:
                text = mi.text_content()
                print(f"  '{text}'")
                if text and ('edit' in text.lower() or '编辑' in text):
                    mi.click()
                    print(f"  -> Clicked!")
                    break
        
        page.wait_for_timeout(2000)
        
        # Check if editor appears
        pm = page.locator('.ProseMirror')
        if pm.count() > 0:
            print("\n=== Editor mode is active ===")
            
            # Screenshot editor
            page.screenshot(path='/workspace/editor-full.png', full_page=False)
            print("Editor screenshot saved")
            
            # Inspect paragraphs in ProseMirror
            pm_ps = page.locator('.ProseMirror p').all()
            print(f"Found {len(pm_ps)} ProseMirror paragraphs")
            
            for i, p in enumerate(pm_ps):
                text = p.text_content()
                cs = p.evaluate("""el => {
                    const cs = window.getComputedStyle(el);
                    return {
                        marginTop: cs.marginTop,
                        marginBottom: cs.marginBottom,
                        lineHeight: cs.lineHeight,
                        fontSize: cs.fontSize,
                        fontFamily: cs.fontFamily,
                    };
                }""")
                print(f"\nP[{i}]:")
                print(f"  Text: '{text[:80] if text else ''}'")
                print(f"  marginTop: {cs['marginTop']}")
                print(f"  marginBottom: {cs['marginBottom']}")
                print(f"  lineHeight: {cs['lineHeight']}")
                print(f"  fontSize: {cs['fontSize']}")
                print(f"  fontFamily: {cs['fontFamily'][:60]}")
            
            # Check info-box
            info_box = page.locator('.ProseMirror .info-box')
            if info_box.count() > 0:
                print("\n=== Info box found in editor! ===")
            else:
                print("\n=== No .info-box in editor ===")
            
            # Check all divs with class in ProseMirror
            divs = page.locator('.ProseMirror div[class]').all()
            print(f"\nFound {len(divs)} div[class] elements in ProseMirror:")
            for d in divs:
                cls = d.get_attribute('class')
                print(f"  class='{cls}'")
            
            # Check the inline styles on ProseMirror
            pm_style = pm.first.evaluate("""el => {
                const cs = window.getComputedStyle(el);
                return {
                    fontSize: cs.fontSize,
                    lineHeight: cs.lineHeight,
                };
            }""")
            print(f"\nProseMirror font-size: {pm_style['fontSize']}")
            print(f"ProseMirror line-height: {pm_style['lineHeight']}")
            
            # Now simulate typing new text to test
            # Click at the end of the content
            pm.first.click()
            page.keyboard.press('End')
            page.keyboard.press('Control+End')
            page.wait_for_timeout(500)
            page.keyboard.press('Enter')
            page.keyboard.press('Enter')
            page.keyboard.type('Test New Line 1')
            page.keyboard.press('Enter')
            page.keyboard.type('Test New Line 2')
            page.keyboard.press('Enter')
            page.keyboard.type('Test New Line 3')
            page.wait_for_timeout(1000)
            
            page.screenshot(path='/workspace/editor-with-new-text.png', full_page=False)
            print("\nEditor with new text screenshot saved")
            
            # Re-inspect paragraphs after typing new text
            pm_ps2 = page.locator('.ProseMirror p').all()
            print(f"\nAfter typing: {len(pm_ps2)} ProseMirror paragraphs")
            
            # Check the last few paragraphs (new ones)
            for i in range(max(0, len(pm_ps2) - 5), len(pm_ps2)):
                p = pm_ps2[i]
                text = p.text_content()
                cs = p.evaluate("""el => {
                    const cs = window.getComputedStyle(el);
                    return {
                        marginTop: cs.marginTop,
                        marginBottom: cs.marginBottom,
                        lineHeight: cs.lineHeight,
                        fontSize: cs.fontSize,
                    };
                }""")
                print(f"\nP[{i}] (last paragraphs):")
                print(f"  Text: '{text[:80] if text else ''}'")
                print(f"  marginTop: {cs['marginTop']}")
                print(f"  marginBottom: {cs['marginBottom']}")
                print(f"  lineHeight: {cs['lineHeight']}")
                print(f"  fontSize: {cs['fontSize']}")
        else:
            print("\n=== Editor NOT found. Still in preview mode ===")
            page.screenshot(path='/workspace/after-edit-click.png', full_page=False)
            print("After-edit-click screenshot saved")
    else:
        print("Could not find '使用指南' tree item")
    
    browser.close()