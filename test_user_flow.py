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
    
    # 点击编辑器末尾
    pm.first.click()
    page.keyboard.press('Control+End')
    page.wait_for_timeout(300)
    
    # 按两次回车创建新段落
    page.keyboard.press('Enter')
    page.keyboard.press('Enter')
    page.wait_for_timeout(200)
    
    # 输入第一行普通文本
    page.keyboard.type('第一行普通文本')
    page.wait_for_timeout(200)
    
    # 按回车换行
    page.keyboard.press('Enter')
    page.wait_for_timeout(200)
    
    # 输入第二行普通文本
    page.keyboard.type('第二行普通文本')
    page.wait_for_timeout(200)
    
    # 再按回车换行
    page.keyboard.press('Enter')
    page.wait_for_timeout(200)
    
    # 输入第三行普通文本
    page.keyboard.type('第三行普通文本')
    page.wait_for_timeout(500)
    
    # 获取所有直接子元素
    children = pm.evaluate("""el => {
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
                mt: cs.marginTop,
                mb: cs.marginBottom,
                top: rect.top,
                bottom: rect.bottom,
                height: rect.height,
            });
        }
        return info;
    }""")
    
    print("=== 编辑器直接子元素及间距 ===")
    for i, child in enumerate(children):
        gap = ''
        if i > 0:
            prev = children[i-1]
            gap_px = child['top'] - prev['bottom']
            gap = f" | gap from prev: {gap_px:.1f}px"
        
        marker = ""
        if '普通文本' in child['text']:
            marker = " [USER_INPUT]"
        
        print(f"\n[{i}] <{child['tag']}> class='{child['class']}'{marker}{gap}")
        print(f"     mt={child['mt']}, mb={child['mb']}, height={child['height']:.1f}px")
        print(f"     Text: '{child['text']}'")

    # 只获取 <p> 元素并比较
    print("\n\n=== 所有 <p> 元素对比 ===")
    p_elements = pm.evaluate("""el => {
        const ps = el.querySelectorAll('p');
        const info = [];
        for (let i = 0; i < ps.length; i++) {
            const p = ps[i];
            const cs = window.getComputedStyle(p);
            const rect = p.getBoundingClientRect();
            info.push({
                text: p.textContent.substring(0, 60),
                mt: cs.marginTop,
                mb: cs.marginBottom,
                top: rect.top,
                bottom: rect.bottom,
                height: rect.height,
                parentTag: p.parentElement.tagName,
                parentClass: p.parentElement.className,
            });
        }
        return info;
    }""")
    
    for i, p in enumerate(p_elements):
        gap = ''
        if i > 0:
            prev = p_elements[i-1]
            gap_px = p['top'] - prev['bottom']
            gap = f" | gap from prev: {gap_px:.1f}px"
        
        marker = ""
        if '普通文本' in p['text']:
            marker = " [USER_INPUT]"
        
        print(f"\nP[{i}]{marker}{gap}")
        print(f"  mt={p['mt']}, mb={p['mb']}, height={p['height']:.1f}px")
        print(f"  parent=<{p['parentTag']}> class='{p['parentClass']}'")
        print(f"  Text: '{p['text']}'")

    page.screenshot(path='/workspace/final-test.png', full_page=False)
    print("\n截图已保存: final-test.png")

    browser.close()