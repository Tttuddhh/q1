from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    
    page.goto('http://localhost:3000/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    print("=== 1. 预览模式 - 获取前几个段落的实际间距 ===")
    preview_ps = page.locator('.prose.animate-fade-in > *').all()
    print(f"预览模式直接子元素数: {len(preview_ps)}")
    
    preview_info = []
    for i, el in enumerate(preview_ps):
        tag = el.evaluate("el => el.tagName")
        text = el.text_content() or ''
        cs = el.evaluate("el => { const s = window.getComputedStyle(el); return {mt: s.marginTop, mb: s.marginBottom, pt: s.paddingTop, pb: s.paddingBottom}; }")
        rect = el.evaluate("el => el.getBoundingClientRect()")
        
        info = {
            'tag': tag,
            'text': text[:50],
            'mt': cs['mt'], 'mb': cs['mb'],
            'pt': cs['pt'], 'pb': cs['pb'],
            'top': rect['top'], 'bottom': rect['bottom'],
            'height': rect['height'],
        }
        preview_info.append(info)
        
        gap = ''
        if i > 0:
            prev = preview_info[i-1]
            gap_px = info['top'] - prev['bottom']
            gap = f" | gap from prev: {gap_px:.1f}px"
        
        print(f"  [{i}] <{tag}> mt={cs['mt']}, mb={cs['mb']}, pt={cs['pt']}, pb={cs['pb']}{gap}")
        print(f"       '{text[:60]}'")

    # 进入编辑模式
    print("\n=== 2. 进入编辑模式 ===")
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

    print("\n=== 3. 编辑模式 - 获取前几个子元素的间距 ===")
    pm = page.locator('.ProseMirror').first
    
    editor_children = pm.evaluate("""el => {
        const children = el.children;
        const info = [];
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const cs = window.getComputedStyle(child);
            const rect = child.getBoundingClientRect();
            info.push({
                tag: child.tagName,
                text: child.textContent.substring(0, 60),
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
    
    for i, child in enumerate(editor_children):
        gap = ''
        if i > 0:
            prev = editor_children[i-1]
            gap_px = child['top'] - prev['bottom']
            gap = f" | gap from prev: {gap_px:.1f}px"
        
        print(f"  [{i}] <{child['tag']}> mt={child['mt']}, mb={child['mb']}, pt={child['pt']}, pb={child['pb']}{gap}")
        print(f"       '{child['text']}'")

    # 对比预览和编辑模式的间距
    print("\n=== 4. 对比：预览 vs 编辑模式的间距 ===")
    print("(只对比相同类型的元素)")
    
    for i in range(min(len(preview_info), len(editor_children))):
        p_tag = preview_info[i]['tag']
        e_tag = editor_children[i]['tag']
        
        if p_tag == e_tag:
            p_gap = preview_info[i]['top'] - preview_info[i-1]['bottom'] if i > 0 else 0
            e_gap = editor_children[i]['top'] - editor_children[i-1]['bottom'] if i > 0 else 0
            
            if i > 0:
                match = "✅" if abs(p_gap - e_gap) < 2 else "❌"
                print(f"  [{i}] <{p_tag}> 预览gap={p_gap:.1f}px, 编辑gap={e_gap:.1f}px {match}")

    browser.close()
