from playwright.sync_api import sync_playwright
import json, time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.goto("http://localhost:5190/", wait_until="networkidle", timeout=15000)
    page.wait_for_timeout(500)
    page.goto("http://localhost:5190/#/settings", wait_until="networkidle", timeout=15000)
    page.wait_for_timeout(2000)

    # Capture console errors
    errors = []
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda err: errors.append(err.message))

    # Find left arrow button
    left_btn = page.locator('button').filter(has_text="").nth(0)
    all_btns = page.locator('button').all()
    
    # Find the carousel buttons (the round ones with chevron)
    carousel_btns = []
    for btn in all_btns:
        style = btn.get_attribute('style') or ''
        if 'border-radius: 50%' in style or 'borderRadius: 50%' in style.replace(' ', '').lower():
            carousel_btns.append(btn)
    
    if len(carousel_btns) >= 2:
        left_btn = carousel_btns[0]
        right_btn = carousel_btns[1]
        print(f"Found {len(carousel_btns)} carousel buttons")
    else:
        print(f"ERROR: Only found {len(carousel_btns)} carousel buttons")
        # Try alternative approach
        btns_in_carousel = page.locator('button').filter(has=page.locator('svg')).all()
        print(f"Found {len(btns_in_carousel)} buttons with SVG")
        if len(btns_in_carousel) >= 2:
            left_btn = btns_in_carousel[0]
            right_btn = btns_in_carousel[1]

    # Function to get box positions and transforms
    def get_box_details():
        return page.evaluate("""() => {
            const result = [];
            const allDivs = document.querySelectorAll('div');
            for (const d of allDivs) {
                const s = d.getAttribute('style') || '';
                if (s.includes('width: 180px') && s.includes('border-radius: 12px')) {
                    const rect = d.getBoundingClientRect();
                    const cs = getComputedStyle(d);
                    result.push({
                        x: Math.round(rect.x),
                        y: Math.round(rect.y),
                        w: Math.round(rect.width),
                        h: Math.round(rect.height),
                        transform: cs.transform,
                        transition: cs.transition,
                        opacity: cs.opacity,
                        zIndex: cs.zIndex,
                    });
                }
            }
            return result;
        }""")

    # Get initial state
    initial = get_box_details()
    print(f"\n=== INITIAL STATE ({len(initial)} boxes) ===")
    for i, b in enumerate(initial):
        print(f"  Box {i}: x={b['x']}, y={b['y']}, w={b['w']}, h={b['h']}, transform={b['transform'][:60]}, transition={b['transition'][:30]}")

    # Click left arrow
    left_btn.click()
    
    # Capture frames at high frequency for first 200ms
    print("\n=== LEFT ARROW ANIMATION FRAMES ===")
    capture_ms = [0, 8, 16, 24, 33, 41, 50, 58, 66, 75, 83, 100, 116, 133, 150, 166, 183, 200, 233, 266, 300, 333, 366, 400, 450, 500]
    
    for t in capture_ms:
        if t == 0:
            page.wait_for_timeout(1)
        else:
            prev = capture_ms[capture_ms.index(t) - 1]
            page.wait_for_timeout(t - prev)
        
        details = get_box_details()
        print(f"\n  t={t}ms:")
        for i, b in enumerate(details):
            # Parse transform matrix to get x, y, scale
            tform = b['transform']
            x = b['x']
            y = b['y']
            w = b['w']
            h = b['h']
            # Calculate effective scale: width/180
            eff_scale = round(w / 180, 3)
            print(f"    Box {i}: x={x:>4}, y={y:>4}, w={w:>3}, h={h:>3}, scale≈{eff_scale}, transition={'YES' if 'transform' in (b['transition'] or '') else 'no'}")

    page.wait_for_timeout(600)
    
    # Post-animation state
    final = get_box_details()
    print(f"\n=== POST-ANIMATION STATE ({len(final)} boxes) ===")
    for i, b in enumerate(final):
        print(f"  Box {i}: x={b['x']}, y={b['y']}, w={b['w']}, h={b['h']}, transform={b['transform'][:60]}")

    # Check for errors
    page.wait_for_timeout(500)
    if errors:
        print(f"\n=== ERRORS ({len(errors)}) ===")
        for e in errors[:20]:
            print(f"  {e[:200]}")
    else:
        print("\n=== NO ERRORS ===")

    browser.close()