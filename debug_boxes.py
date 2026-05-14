from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.goto("http://localhost:5190/", wait_until="networkidle", timeout=15000)
    page.wait_for_timeout(500)
    page.goto("http://localhost:5190/#/settings", wait_until="networkidle", timeout=15000)
    page.wait_for_timeout(2000)

    # Debug: find all boxes with position:absolute and width close to 180
    debug = page.evaluate("""() => {
        const all = document.querySelectorAll('div');
        const result = [];
        for (const d of all) {
            const s = d.getAttribute('style') || '';
            if (s.includes('position: absolute') || s.includes('position:absolute')) {
                const rect = d.getBoundingClientRect();
                if (rect.width > 100 && rect.width < 250) {
                    result.push({
                        w: Math.round(rect.width),
                        h: Math.round(rect.height),
                        style: s.substring(0, 200),
                        x: Math.round(rect.x),
                        y: Math.round(rect.y),
                    });
                }
            }
        }
        return result;
    }""")
    print(f"Found {len(debug)} absolute-positioned divs with width 100-250:")
    for i, d in enumerate(debug[:10]):
        print(f"  [{i}] w={d['w']}, h={d['h']}, x={d['x']}, y={d['y']}")
        print(f"      style: {d['style']}")

    # Find carousel container
    carousel_info = page.evaluate("""() => {
        const all = document.querySelectorAll('div');
        for (const d of all) {
            const s = d.getAttribute('style') || '';
            if (s.includes('overflow: hidden') && s.includes('height:') && (s.includes('170') || s.includes('180') || s.includes('200'))) {
                const rect = d.getBoundingClientRect();
                return { w: Math.round(rect.width), h: Math.round(rect.height), style: s.substring(0, 300) };
            }
        }
        return null;
    }""")
    print(f"\nCarousel container: {json.dumps(carousel_info)}")

    if not debug:
        print("\nTrying broader search...")
        broader = page.evaluate("""() => {
            const all = document.querySelectorAll('div');
            const result = [];
            for (const d of all) {
                const rect = d.getBoundingClientRect();
                const s = d.getAttribute('style') || '';
                if (rect.width === 180 && rect.height >= 100) {
                    result.push({
                        w: Math.round(rect.width),
                        h: Math.round(rect.height),
                        x: Math.round(rect.x),
                        y: Math.round(rect.y),
                        style: s.substring(0, 200),
                    });
                }
            }
            return result;
        }""")
        print(f"Found {len(broader)} boxes with width=180:")
        for i, d in enumerate(broader[:10]):
            print(f"  [{i}] w={d['w']}, h={d['h']}, x={d['x']}, y={d['y']}")

    browser.close()