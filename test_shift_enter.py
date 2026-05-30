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
    
    # 点击第一个段落末尾
    first_p = pm.locator('p').first
    first_p.click()
    page.keyboard.press('End')
    page.wait_for_timeout(200)
    
    # 按回车创建新段落
    page.keyboard.press('Enter')
    page.wait_for_timeout(200)
    
    # 输入第一行
    page.keyboard.type('同一条人员统')
    page.wait_for_timeout(200)
    
    # 按 Shift+Enter（在同一个段落内换行）
    page.keyboard.press('Shift+Enter')
    page.wait_for_timeout(200)
    
    # 输入第二行
    page.keyboard.type('图体育与')
    page.wait_for_timeout(500)
    
    page.screenshot(path='/workspace/shift-enter-test.png', full_page=False)
    print("截图已保存: shift-enter-test.png")
    
    # 分析DOM结构
    print("\n=== ProseMirror 直接子元素 ===")
    children = pm.evaluate("""el => {
        const children = el.children;
        const info = [];
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const rect = child.getBoundingClientRect();
            info.push({
                tag: child.tagName,
                text: child.textContent.substring(0, 80),
                top: rect.top,
                bottom: rect.bottom,
                height: rect.height,
            });
        }
        return info;
    }""")
    
    for i, child in enumerate(children):
        gap = ''
        if i > 0:
            prev = children[i-1]
            gap_px = child['top'] - prev['bottom']
            gap = f" | gap from prev: {gap_px:.1f}px"
        
        print(f"\n[{i}] <{child['tag']}>{gap}")
        print(f"     height={child['height']:.1f}px")
        print(f"     Text: '{child['text']}'")

    # 检查包含"同一条人员统"的元素
    print("\n=== 包含新输入文本的元素 ===")
    elements = pm.evaluate("""() => {
        const walker = document.createTreeWalker(
            document.querySelector('.ProseMirror'),
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        const results = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.includes('同一条') || node.textContent.includes('图体育')) {
                const parent = node.parentElement;
                const rect = parent.getBoundingClientRect();
                results.push({
                    text: node.textContent,
                    parentTag: parent.tagName,
                    parentClass: parent.className,
                    top: rect.top,
                    bottom: rect.bottom,
                    height: rect.height,
                });
            }
        }
        return results;
    }""")
    
    for el in elements:
        print(f"\nText: '{el['text']}'")
        print(f"Parent: <{el['parentTag']}> class='{el['parentClass']}'")
        print(f"height={el['height']:.1f}px, top={el['top']:.1f}")

    browser.close()