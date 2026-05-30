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
    
    # 再按回车
    page.keyboard.press('Enter')
    page.wait_for_timeout(200)
    
    # 输入第二行（光标在这里）
    page.keyboard.type('图体育与')
    page.wait_for_timeout(500)
    
    # 检查当前光标所在段落的样式
    print("=== 检查光标所在段落的样式 ===")
    
    # 获取选中的节点
    selection_info = page.evaluate("""() => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const node = range.startContainer;
            const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
            
            // 找到最近的 <p> 祖先
            let p = element;
            while (p && p.tagName !== 'P') {
                p = p.parentElement;
            }
            
            if (p) {
                const cs = window.getComputedStyle(p);
                return {
                    text: p.textContent.substring(0, 50),
                    marginTop: cs.marginTop,
                    marginBottom: cs.marginBottom,
                    lineHeight: cs.lineHeight,
                    fontSize: cs.fontSize,
                    classes: Array.from(p.classList),
                    isEmpty: p.classList.contains('is-empty'),
                    isEditorEmpty: p.classList.contains('is-editor-empty'),
                };
            }
        }
        return null;
    }""")
    
    if selection_info:
        print(f"光标所在段落: '{selection_info['text']}'")
        print(f"marginTop: {selection_info['marginTop']}")
        print(f"marginBottom: {selection_info['marginBottom']}")
        print(f"lineHeight: {selection_info['lineHeight']}")
        print(f"fontSize: {selection_info['fontSize']}")
        print(f"classes: {selection_info['classes']}")
        print(f"isEmpty: {selection_info['isEmpty']}")
        print(f"isEditorEmpty: {selection_info['isEditorEmpty']}")
    
    # 检查所有段落的类名
    print("\n=== 所有段落的类名 ===")
    all_ps = pm.locator('p').all()
    for i, p in enumerate(all_ps):
        text = p.text_content() or ''
        classes = p.evaluate("el => Array.from(el.classList)")
        print(f"P[{i}]: classes={classes}, text='{text[:40]}'")
    
    # 检查 ProseMirror 是否有特殊的 focus 样式
    print("\n=== ProseMirror 的 focus 状态 ===")
    pm_classes = pm.evaluate("el => Array.from(el.classList)")
    print(f"ProseMirror classes: {pm_classes}")
    
    # 检查是否有 CSS 伪类影响
    print("\n=== 检查是否有 :focus, :active 等伪类样式 ===")
    focus_styles = page.evaluate("""() => {
        const ps = document.querySelectorAll('.ProseMirror p');
        const results = [];
        for (const p of ps) {
            const text = p.textContent.substring(0, 30);
            // 检查是否有 focus 相关的样式
            const isFocused = p === document.activeElement || p.contains(document.activeElement);
            results.push({
                text: text,
                isFocused: isFocused,
            });
        }
        return results;
    }""")
    
    for item in focus_styles:
        print(f"  '{item['text']}': isFocused={item['isFocused']}")

    browser.close()