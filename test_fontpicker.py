#!/usr/bin/env python3
"""Debug font picker test with Playwright."""

from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        print("Opening http://localhost:4179/...")
        page.goto('http://localhost:4179/')
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(3000)

        # Right-click on the page to open context menu
        try:
            page_link = page.locator('text=富文本编辑器').first
            if page_link.count() > 0:
                page_link.click(button='right')
                page.wait_for_timeout(500)
                page.screenshot(path='/workspace/fontpicker_context1.png', full_page=False)
                print("Context menu 1 screenshot saved")

                # Try to find and click edit
                menu_items = page.locator('[role="menuitem"]').all()
                print(f"Found {len(menu_items)} menu items")
                for item in menu_items:
                    try:
                        text = item.inner_text()
                        print(f"  Menu item: {text!r}")
                        if '编辑' in text:
                            item.click()
                            page.wait_for_timeout(3000)
                            page.screenshot(path='/workspace/fontpicker_after_edit.png', full_page=False)
                            print("After edit click screenshot saved")
                    except Exception as e:
                        print(f"Error getting menu item text: {e}")
        except Exception as e:
            print(f"Error: {e}")
            import traceback
            traceback.print_exc()

        # Check the page structure
        html = page.content()

        # Look for editor elements
        if 'ProseMirror' in html:
            print("Found ProseMirror in page")
        if 'FontPicker' in html:
            print("Found FontPicker in page")
        if 'font-family' in html:
            print("Found font-family in page")

        # Get all buttons and their text
        buttons = page.locator('button').all()
        print(f"\nAll buttons ({len(buttons)}):")
        for i, btn in enumerate(buttons[:30]):
            try:
                text = btn.inner_text().strip().replace('\n', ' ')[:40]
                classes = btn.get_attribute('class') or ''
                print(f"  {i}: text={text!r}, class={classes[:30]!r}")
            except:
                pass

        browser.close()
        print("\nTest completed")

if __name__ == '__main__':
    main()
