from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 800})
    page.goto('http://localhost:5174/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    # Take initial screenshot
    page.screenshot(path='/workspace/knowledge-base/test-screenshots/01-initial.png', full_page=True)
    print("Screenshot 1: Initial page loaded")

    # Click on the first page in the tree to enter edit mode
    # Find the first page item and click its three-dot menu
    page_items = page.locator('[data-page-id]').all()
    print(f"Found {len(page_items)} page items")

    if len(page_items) > 0:
        # Hover over first page item to show three-dot menu
        page_items[0].hover()
        page.wait_for_timeout(500)

        # Find and click the three-dot menu button
        more_btn = page.locator('[data-page-id]').first.locator('button').last
        if more_btn.count() > 0:
            more_btn.click()
            page.wait_for_timeout(500)
            page.screenshot(path='/workspace/knowledge-base/test-screenshots/02-menu-open.png')
            print("Screenshot 2: Menu opened")

            # Click "Edit" option
            edit_option = page.locator('text=编辑').first
            if edit_option.count() > 0:
                edit_option.click()
                page.wait_for_timeout(1000)
                page.screenshot(path='/workspace/knowledge-base/test-screenshots/03-edit-mode.png')
                print("Screenshot 3: Edit mode entered")

                # Find editor content area and click into it
                editor = page.locator('.ProseMirror').first
                if editor.count() > 0:
                    editor.click()
                    page.wait_for_timeout(500)

                    # Type some text with bold formatting
                    page.keyboard.type("This is normal text. ")
                    page.wait_for_timeout(300)

                    # Apply bold and type bold text
                    page.keyboard.down('Control')
                    page.keyboard.down('b')
                    page.keyboard.up('b')
                    page.keyboard.up('Control')
                    page.wait_for_timeout(300)

                    page.keyboard.type("This is bold text")
                    page.wait_for_timeout(300)

                    # Turn off bold
                    page.keyboard.down('Control')
                    page.keyboard.down('b')
                    page.keyboard.up('b')
                    page.keyboard.up('Control')
                    page.wait_for_timeout(300)

                    page.keyboard.type(". More normal text.")
                    page.wait_for_timeout(500)

                    page.screenshot(path='/workspace/knowledge-base/test-screenshots/04-text-typed.png')
                    print("Screenshot 4: Text typed with bold section")

                    # Now select the bold text
                    # Triple-click to select a word in the bold section
                    # First, let's find the bold text element
                    bold_text = page.locator('.ProseMirror strong').first
                    if bold_text.count() > 0:
                        # Click and drag to select the bold text
                        bold_text.click()
                        page.wait_for_timeout(300)

                        # Double click to select the word
                        bold_text.dblclick()
                        page.wait_for_timeout(500)

                        page.screenshot(path='/workspace/knowledge-base/test-screenshots/05-bold-selected.png')
                        print("Screenshot 5: Bold text selected")

                        # Check toolbar button state
                        toolbar = page.locator('button[title="加粗"]').first
                        if toolbar.count() > 0:
                            bg = toolbar.evaluate('el => getComputedStyle(el).backgroundColor')
                            print(f"Bold button background: {bg}")

    browser.close()
    print("Test completed")
