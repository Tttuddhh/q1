from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    
    page.goto('http://localhost:3000/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    # 进入编辑模式
    more_buttons = page.locator('[title="更多操作"]').all()
    more_buttons[0].click(force=True)
    page.wait_for_timeout(500)
    
    page.evaluate("""() => {
        const allDivs = document.querySelectorAll('div');
        for (const div of allDivs) {
            const style = window.getComputedStyle(div);
            if (style.position === 'fixed' && parseInt(style.zIndex) === 1000) {
                const buttons = div.querySelectorAll('button');
                for (const btn of buttons) {
                    if (btn.textContent.includes('编辑')) {
                        btn.click();
                        return;
                    }
                }
            }
        }
    }""")
    page.wait_for_timeout(2000)

    pm = page.locator('.ProseMirror').first
    
    # 获取所有子元素（包括非段落元素）
    all_children = pm.evaluate("""el => {
        const children = el.children;
        const info = [];
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const cs = window.getComputedStyle(child);
            const rect = child.getBoundingClientRect();
            info.push({
                tag: child.tagName,
                class: child.className,
                text: child.textContent.substring(0, 80),
                mt: cs.marginTop,
                mb: cs.marginBottom,
                pt: cs.paddingTop,
                pb: cs.paddingBottom,
                top: rect.top,
                bottom: rect.bottom,
                height: rect.height,
            });
        }
        return info;
    }""")
    
    print("=== 所有子元素及间距 ===")
    for i, child in enumerate(all_children):
        gap = ''
        if i > 0:
            prev = all_children[i-1]
            gap_px = child['top'] - prev['bottom']
            gap = f" | gap from prev: {gap_px:.1f}px"
        
        print(f"\n[{i}] <{child['tag']}> class='{child['class']}'{gap}")
        print(f"     mt={child['mt']}, mb={child['mb']}, pt={child['pt']}, pb={child['pb']}")
        print(f"     height={child['height']:.1f}px")
        print(f"     Text: '{child['text']}'")

    browser.close()