from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    
    page.goto("http://localhost:5191/", wait_until="networkidle", timeout=15000)
    page.wait_for_timeout(1000)
    page.locator('a, [role="link"]').filter(has_text="设置").first.click()
    page.wait_for_timeout(1500)
    page.locator('button, [role="tab"]').filter(has_text="外观").first.click()
    page.wait_for_timeout(1500)
    
    # Dismiss any modal overlay
    page.keyboard.press("Escape")
    page.wait_for_timeout(500)
    
    def get_boxes():
        return page.evaluate("""() => {
            const result = [];
            const allDivs = document.querySelectorAll('div');
            for (const d of allDivs) {
                const s = d.getAttribute('style') || '';
                if ((s.includes('position: absolute') || s.includes('position:absolute')) && s.includes('width: 180px') && s.includes('border-radius: 12px')) {
                    const rect = d.getBoundingClientRect();
                    const cs = getComputedStyle(d);
                    result.push({
                        x: Math.round(rect.x),
                        y: Math.round(rect.y),
                        w: Math.round(rect.width),
                        h: Math.round(rect.height),
                        transform: cs.transform,
                        transition: cs.transition,
                        zIndex: cs.zIndex,
                        opacity: cs.opacity,
                    });
                }
            }
            return result;
        }""")
    
    initial = get_boxes()
    initial.sort(key=lambda b: b['x'])
    print("=== INITIAL STATE ===")
    for i, b in enumerate(initial):
        s = round(b['w'] / 180, 3)
        print(f"  [{i}] x={b['x']:>4} y={b['y']:>4} w={b['w']:>3} h={b['h']:>3} s≈{s} z={b['zIndex']} op={b['opacity']}")
    
    # Find carousel arrow: button with SVG, near the carousel boxes vertically
    box_top = min(b['y'] for b in initial)
    box_bottom = max(b['y'] + b['h'] for b in initial)
    center_x = initial[len(initial)//2]['x']
    
    print(f"\nBox range: y={box_top} to y={box_bottom}, center_x={center_x}")
    
    # Find carousel left/right arrows by position: y near box center, x on left/right of boxes
    left_arrow = None
    right_arrow = None
    for btn in page.locator('button').filter(has=page.locator('svg')).all():
        rect = btn.bounding_box()
        if not rect:
            continue
        rx, ry, rw, rh = rect['x'], rect['y'], rect['width'], rect['height']
        # Must be vertically near the box range
        if not (box_top - 30 < ry < box_bottom + 30):
            continue
        # Carousel arrows are 36x36 round buttons
        if rw < 30 or rh < 30:
            continue
        if rx < center_x - 100:
            left_arrow = btn
            print(f"\nCarousel LEFT arrow at ({rx:.0f}, {ry:.0f}) {rw:.0f}x{rh:.0f}")
        elif rx > center_x + 100:
            right_arrow = btn
            print(f"Carousel RIGHT arrow at ({rx:.0f}, {ry:.0f}) {rw:.0f}x{rh:.0f}")
    
    if not left_arrow:
        print("Carousel left arrow not found!")
        browser.close()
        exit(0)
    
    # Try to dismiss modal by clicking on the arrow via dispatchEvent
    left_arrow.evaluate("el => el.click()")
    page.wait_for_timeout(50)
    
    print("\n=== LEFT ARROW ANIMATION (pixel-level) ===")
    times = [0, 16, 33, 50, 66, 83, 100, 116, 133, 150, 166, 183, 200, 233, 266, 300, 350, 400, 450]
    
    prev_t = 0
    for t in times:
        wait = t - prev_t
        if wait > 0:
            page.wait_for_timeout(wait)
        prev_t = t
        boxes = get_boxes()
        boxes.sort(key=lambda b: b['x'])
        
        print(f"\n  t={t:>3}ms:")
        for i, b in enumerate(boxes):
            s = round(b['w'] / 180, 3)
            has_trans = 'transform' in (b['transition'] or '')
            print(f"    [{i}] x={b['x']:>4} y={b['y']:>4} w={b['w']:>3} h={b['h']:>3} s≈{s} z={b['zIndex']} trans={'Y' if has_trans else 'N'}")

    page.wait_for_timeout(600)
    final = get_boxes()
    final.sort(key=lambda b: b['x'])
    print(f"\n=== POST-ANIMATION ===")
    for i, b in enumerate(final):
        s = round(b['w'] / 180, 3)
        print(f"  [{i}] x={b['x']:>4} y={b['y']:>4} w={b['w']:>3} h={b['h']:>3} s≈{s} z={b['zIndex']}")
    
    browser.close()