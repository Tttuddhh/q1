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
    
    # 获取 ProseMirror 内部所有子元素的类型和样式
    print("=== ProseMirror 内部子元素分析 ===")
    children_info = pm.evaluate("""el => {
        const children = el.children;
        const info = [];
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const cs = window.getComputedStyle(child);
            const rect = child.getBoundingClientRect();
            info.push({
                tag: child.tagName,
                class: child.className,
                text: child.textContent.substring(0, 60),
                marginTop: cs.marginTop,
                marginBottom: cs.marginBottom,
                paddingTop: cs.paddingTop,
                paddingBottom: cs.paddingBottom,
                height: rect.height,
                top: rect.top,
                bottom: rect.bottom,
            });
        }
        return info;
    }""")
    
    for i, child in enumerate(children_info):
        print(f"\nChild {i}: <{child['tag']}> class='{child['class']}'")
        print(f"  Text: '{child['text']}'")
        print(f"  marginTop: {child['marginTop']}, marginBottom: {child['marginBottom']}")
        print(f"  paddingTop: {child['paddingTop']}, paddingBottom: {child['paddingBottom']}")
        print(f"  height: {child['height']:.1f}px, top: {child['top']:.1f}, bottom: {child['bottom']:.1f}")
        
        # 计算与前一个元素的间距
        if i > 0:
            prev = children_info[i - 1]
            gap = child['top'] - prev['bottom']
            print(f"  -> Gap from previous: {gap:.1f}px")

    # 特别关注 ul 和 div 元素
    print("\n\n=== 特别关注 ul 和 div 元素 ===")
    for i, child in enumerate(children_info):
        if child['tag'] in ['UL', 'DIV', 'OL']:
            print(f"\nChild {i}: <{child['tag']}> class='{child['class']}'")
            print(f"  marginTop: {child['marginTop']}, marginBottom: {child['marginBottom']}")
            print(f"  paddingTop: {child['paddingTop']}, paddingBottom: {child['paddingBottom']}")
            print(f"  height: {child['height']:.1f}px")

    browser.close()