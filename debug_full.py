from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    
    page.goto("http://localhost:5190/", wait_until="networkidle", timeout=15000)
    page.wait_for_timeout(1000)
    page.locator('a, [role="link"]').filter(has_text="设置").first.click()
    page.wait_for_timeout(1500)
    page.locator('button, [role="tab"]').filter(has_text="外观").first.click()
    page.wait_for_timeout(1500)
    
    # Dump all absolute-positioned divs with any width
    result = page.evaluate("""() => {
        const all = document.querySelectorAll('div');
        const result = [];
        for (const d of all) {
            const s = d.getAttribute('style') || '';
            if (s.includes('position: absolute') || s.includes('position:absolute')) {
                const rect = d.getBoundingClientRect();
                const cs = getComputedStyle(d);
                result.push({
                    w: Math.round(rect.width),
                    h: Math.round(rect.height),
                    x: Math.round(rect.x),
                    y: Math.round(rect.y),
                    transform: cs.transform,
                    opacity: cs.opacity,
                    zIndex: cs.zIndex,
                    style: s.substring(0, 250),
                });
            }
        }
        return result;
    }""")
    
    print(f"Found {len(result)} absolute divs:")
    for i, r in enumerate(result):
        print(f"\n  [{i}] x={r['x']} y={r['y']} w={r['w']} h={r['h']} z={r['zIndex']} op={r['opacity']}")
        print(f"       transform: {r['transform'][:80]}")
        print(f"       style: {r['style'][:150]}")
    
    # Also check the carousel container's inner div
    inner = page.evaluate("""() => {
        const containers = document.querySelectorAll('div');
        for (const d of containers) {
            const s = d.getAttribute('style') || '';
            if (s.includes('left: 50%') && s.includes('transform: translate(-50%, -50%)')) {
                return {
                    innerHTML_length: d.innerHTML.length,
                    childCount: d.children.length,
                    style: s,
                };
            }
        }
        return null;
    }""")
    print(f"\nCarousel inner container: {inner}")
    
    page.screenshot(path="/tmp/final_debug.png", full_page=True)
    print("Screenshot: /tmp/final_debug.png")
    browser.close()