from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    
    page.goto('http://localhost:3000/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    print("=== 预览模式 - 直接子元素间距 ===")
    preview = page.locator('.prose.animate-fade-in').first
    preview_children = preview.evaluate("""el => {
        const children = el.children;
        const info = [];
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const rect = child.getBoundingClientRect();
            const cs = window.getComputedStyle(child);
            info.push({
                tag: child.tagName,
                text: child.textContent.substring(0, 60),
                top: rect.top,
                bottom: rect.bottom,
                height: rect.height,
                mt: cs.marginTop,
                mb: cs.marginBottom,
            });
        }
        return info;
    }""")
    
    for i, child in enumerate(preview_children[:6]):
        gap = ''
        if i > 0:
            prev = preview_children[i-1]
            gap_px = child['top'] - prev['bottom']
            gap = f" | gap from prev: {gap_px:.1f}px"
        
        print(f"\n[{i}] <{child['tag']}>{gap}")
        print(f"     mt={child['mt']}, mb={child['mb']}, height={child['height']:.1f}px")
        print(f"     Text: '{child['text']}'")

    # 进入编辑模式
    print("\n\n=== 进入编辑模式 ===")
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

    print("\n=== 编辑模式 - 直接子元素间距 ===")
    pm = page.locator('.ProseMirror').first
    editor_children = pm.evaluate("""el => {
        const children = el.children;
        const info = [];
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const rect = child.getBoundingClientRect();
            const cs = window.getComputedStyle(child);
            info.push({
                tag: child.tagName,
                text: child.textContent.substring(0, 60),
                top: rect.top,
                bottom: rect.bottom,
                height: rect.height,
                mt: cs.marginTop,
                mb: cs.marginBottom,
            });
        }
        return info;
    }""")
    
    for i, child in enumerate(editor_children[:6]):
        gap = ''
        if i > 0:
            prev = editor_children[i-1]
            gap_px = child['top'] - prev['bottom']
            gap = f" | gap from prev: {gap_px:.1f}px"
        
        print(f"\n[{i}] <{child['tag']}>{gap}")
        print(f"     mt={child['mt']}, mb={child['mb']}, height={child['height']:.1f}px")
        print(f"     Text: '{child['text']}'")

    # 对比
    print("\n\n=== 对比：预览 vs 编辑 ===")
    for i in range(min(6, len(preview_children), len(editor_children))):
        if preview_children[i]['tag'] == editor_children[i]['tag']:
            p_gap = preview_children[i]['top'] - preview_children[i-1]['bottom'] if i > 0 else 0
            e_gap = editor_children[i]['top'] - editor_children[i-1]['bottom'] if i > 0 else 0
            if i > 0:
                match = "✅" if abs(p_gap - e_gap) < 2 else "❌"
                print(f"  [{i}] <{preview_children[i]['tag']}> 预览gap={p_gap:.1f}px, 编辑gap={e_gap:.1f}px {match}")

    browser.close()