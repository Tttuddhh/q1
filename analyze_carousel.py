from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})

    errors = []
    warnings_list = []
    logs = []

    page.on("console", lambda msg: (
        errors.append(msg.text) if msg.type == "error" else
        warnings_list.append(msg.text) if msg.type == "warning" else
        logs.append(msg.text)
    ))
    page.on("pageerror", lambda err: errors.append(err.message))

    page.goto("http://localhost:5180/", wait_until="networkidle", timeout=15000)
    page.wait_for_timeout(1000)
    page.goto("http://localhost:5180/#/settings", wait_until="networkidle", timeout=15000)
    page.wait_for_timeout(2000)

    print("=== ERRORS ===")
    for e in errors:
        print(e)
    if not errors:
        print("(none)")

    print("\n=== WARNINGS ===")
    for w in warnings_list:
        print(w)
    if not warnings_list:
        print("(none)")

    print(f"\n=== LOGS ({len(logs)} total) ===")
    for l in logs[:50]:
        print(l)
    if len(logs) > 50:
        print(f"... and {len(logs) - 50} more logs")

    # Find the carousel
    # The carousel is inside a div with overflow:hidden that has buttons
    carousel_sections = page.locator('div').filter(has=page.locator('button')).all()
    target = None
    for section in carousel_sections:
        style = section.get_attribute('style') or ''
        if 'overflow: hidden' in style and 'height: 170' in style:
            target = section
            break

    if not target:
        print("\n=== CAROUSEL NOT FOUND ===")
        page.screenshot(path='/tmp/settings_page.png', full_page=True)
        print("Screenshot saved to /tmp/settings_page.png")
        browser.close()
        exit(1)

    left_btn = target.locator('button').first
    right_btn = target.locator('button').last

    def get_box_positions():
        return page.evaluate("""() => {
            const containers = document.querySelectorAll('div');
            let target = null;
            for (const d of containers) {
                const s = d.getAttribute('style') || '';
                if (s.includes('left: 50%') && s.includes('transform: translate(-50%, -50%)')) {
                    target = d;
                    break;
                }
            }
            if (!target) return [];
            const boxes = target.querySelectorAll('div');
            const result = [];
            for (const b of boxes) {
                const s = b.getAttribute('style') || '';
                if (s.includes('position: absolute') && s.includes('width: 180px')) {
                    const rect = b.getBoundingClientRect();
                    result.push({x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height)});
                }
            }
            return result;
        }""")

    # LEFT ARROW TEST
    print("\n=== LEFT ARROW ANIMATION ===")
    initial = get_box_positions()
    print(f"Initial ({len(initial)} boxes):", json.dumps(initial))

    left_btn.click()
    times = [0, 16, 33, 50, 66, 83, 100, 150, 200, 250, 300, 350, 400, 500]
    prev_t = 0
    for t in times:
        wait = t - prev_t
        if wait > 0:
            page.wait_for_timeout(wait)
        prev_t = t
        positions = get_box_positions()
        if initial and len(positions) == len(initial):
            disps = [positions[i]['x'] - initial[i]['x'] for i in range(len(positions))]
            print(f"t={t:>3}ms  displacements: {disps}")
        else:
            print(f"t={t:>3}ms  positions: {json.dumps(positions)}")

    page.wait_for_timeout(600)

    # RIGHT ARROW TEST
    print("\n=== RIGHT ARROW ANIMATION ===")
    after_left = get_box_positions()
    print(f"After left ({len(after_left)} boxes):", json.dumps(after_left))

    right_btn.click()
    prev_t = 0
    for t in times:
        wait = t - prev_t
        if wait > 0:
            page.wait_for_timeout(wait)
        prev_t = t
        positions = get_box_positions()
        if after_left and len(positions) == len(after_left):
            disps = [positions[i]['x'] - after_left[i]['x'] for i in range(len(positions))]
            print(f"t={t:>3}ms  displacements: {disps}")
        else:
            print(f"t={t:>3}ms  positions: {json.dumps(positions)}")

    page.wait_for_timeout(600)

    # Check CSS variable
    css_var = page.evaluate("() => getComputedStyle(document.documentElement).getPropertyValue('--theme-primary')")
    print(f"\n--theme-primary: {css_var}")

    # Check DOM key issues
    key_info = page.evaluate("""() => {
        const containers = document.querySelectorAll('div');
        let target = null;
        for (const d of containers) {
            const s = d.getAttribute('style') || '';
            if (s.includes('left: 50%') && s.includes('transform: translate(-50%, -50%)')) {
                target = d;
                break;
            }
        }
        if (!target) return {error: 'no container'};
        const boxes = target.querySelectorAll('div');
        const info = [];
        for (const b of boxes) {
            const s = b.getAttribute('style') || '';
            if (s.includes('position: absolute') && s.includes('width: 180px')) {
                info.push({
                    bg: s.match(/background:\s*([^;]+)/)?.[1] || 'unknown',
                    transform: s.match(/transform:\s*([^;]+)/)?.[1] || 'unknown',
                    transition: s.match(/transition:\s*([^;]+)/)?.[1] || 'unknown',
                    opacity: s.match(/opacity:\s*([^;]+)/)?.[1] || 'unknown',
                    zIndex: s.match(/z-index:\s*([^;]+)/)?.[1] || 'unknown',
                });
            }
        }
        return info;
    }""")
    print("\n=== BOX STATE ===")
    for i, info in enumerate(key_info):
        print(f"Box {i}: {json.dumps(info)}")

    browser.close()