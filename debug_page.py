from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    
    page.on("console", lambda msg: print(f"CONSOLE [{msg.type}]: {msg.text[:200]}"))
    page.on("pageerror", lambda err: print(f"PAGE ERROR: {err.message[:200]}"))
    
    page.goto("http://localhost:5190/", wait_until="networkidle", timeout=15000)
    page.wait_for_timeout(2000)
    page.screenshot(path="/tmp/home.png", full_page=True)
    print("Home screenshot saved")
    
    # Try clicking settings if it exists
    settings_link = page.locator('a, button, [role="link"]').filter(has_text="设置").first
    if settings_link:
        settings_link.click()
        page.wait_for_timeout(2000)
    else:
        # Try hash navigation
        page.goto("http://localhost:5190/#/settings", wait_until="networkidle", timeout=15000)
        page.wait_for_timeout(2000)
    
    page.screenshot(path="/tmp/settings.png", full_page=True)
    print("Settings screenshot saved")
    
    # Dump all visible text
    text = page.evaluate("() => document.body.innerText.substring(0, 2000)")
    print(f"\nPage text (first 2000 chars):\n{text}")
    
    browser.close()