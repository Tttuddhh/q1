from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    
    page.goto('http://localhost:3002/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    print("=== Page Title ===")
    print(page.title())

    # Take a screenshot first
    page.screenshot(path='/workspace/initial.png', full_page=False)
    print("\nInitial screenshot saved")

    # Look for tree items to find the page
    tree_items = page.locator('.tree-item-animated').all()
    print(f"\nFound {len(tree_items)} tree items")
    for item in tree_items:
        text = item.text_content()
        if text:
            print(f"  Tree item: '{text[:50]}'")

    # Try to find ProseMirror elements (to check if already in edit mode)
    pm_count = page.locator('.ProseMirror').count()
    print(f"\nProseMirror elements: {pm_count}")
    
    if pm_count > 0:
        # Already in edit mode or editor is rendered
        pm_ps = page.locator('.ProseMirror p').all()
        print(f"ProseMirror paragraphs: {len(pm_ps)}")
        for i, p in enumerate(pm_ps[:5]):
            text = p.text_content()
            cs = p.evaluate("""el => {
                const cs = window.getComputedStyle(el);
                return {
                    marginTop: cs.marginTop,
                    marginBottom: cs.marginBottom,
                    lineHeight: cs.lineHeight,
                    fontSize: cs.fontSize
                };
            }""")
            print(f"  P{i}: marginTop={cs['marginTop']}, marginBottom={cs['marginBottom']}, lineHeight={cs['lineHeight']}, fontSize={cs['fontSize']}")
            print(f"    Text: '{text[:60] if text else ''}...'")

    # Get all visible text content
    body_text = page.locator('body').inner_text()
    print(f"\n=== Body text (first 500 chars) ===")
    print(body_text[:500])

    # Check if there's an editable content
    editor = page.locator('[contenteditable="true"]')
    editor_count = editor.count()
    print(f"\nContenteditable elements: {editor_count}")

    # Check the page structure more carefully
    # Look at what's rendered in the main content area
    main_content = page.locator('.main-content-scroll')
    if main_content.count() > 0:
        html = main_content.first.inner_html()
        print(f"\n=== Main content HTML (first 2000 chars) ===")
        print(html[:2000])

    browser.close()