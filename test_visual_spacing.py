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
    
    # 点击第一个段落末尾并输入新文本
    first_p = pm.locator('p').first
    first_p.click()
    page.keyboard.press('End')
    page.wait_for_timeout(200)
    page.keyboard.press('Enter')
    page.wait_for_timeout(200)
    page.keyboard.type('同一条人员统')
    page.wait_for_timeout(200)
    page.keyboard.press('Enter')
    page.wait_for_timeout(200)
    page.keyboard.type('图体育与')
    page.wait_for_timeout(500)
    
    # 给所有段落添加边框以便可视化
    page.evaluate("""() => {
        const ps = document.querySelectorAll('.ProseMirror p');
        for (const p of ps) {
            p.style.border = '1px solid red';
        }
    }""")
    
    page.screenshot(path='/workspace/visual-spacing.png', full_page=False)
    print("截图已保存: visual-spacing.png")
    
    # 测量每个段落的精确位置和高度
    print("=== 段落的精确位置和高度 ===")
    ps = pm.locator('p').all()
    for i, p in enumerate(ps[:6]):
        text = p.text_content() or ''
        rect = p.evaluate("el => el.getBoundingClientRect()")
        cs = p.evaluate("el => { const s = window.getComputedStyle(el); return {mt: s.marginTop, mb: s.marginBottom}; }")
        
        is_new = '同一条' in text or '图体育' in text
        marker = " [NEW]" if is_new else ""
        
        print(f"\nP[{i}]{marker}")
        print(f"  Text: '{text[:40]}'")
        print(f"  top: {rect['top']:.2f}, bottom: {rect['bottom']:.2f}")
        print(f"  height: {rect['height']:.2f}")
        print(f"  marginTop: {cs['mt']}, marginBottom: {cs['mb']}")
        
        if i > 0:
            prev = ps[i-1]
            prev_rect = prev.evaluate("el => el.getBoundingClientRect()")
            gap = rect['top'] - prev_rect['bottom']
            print(f"  -> Gap from P[{i-1}]: {gap:.2f}px")

    browser.close()