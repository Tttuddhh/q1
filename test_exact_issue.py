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
    
    # 模拟用户截图中的场景：
    # 在第一个段落（"知识库是一个现代化的..."）后面输入新文本
    # 先点击到第一个段落末尾
    first_p = pm.locator('p').first
    first_p.click()
    page.keyboard.press('End')
    page.wait_for_timeout(200)
    
    # 按回车创建新段落（模拟用户换行）
    page.keyboard.press('Enter')
    page.wait_for_timeout(200)
    
    # 输入第一行（模拟用户截图中的"同一条人员统"）
    page.keyboard.type('同一条人员统')
    page.wait_for_timeout(200)
    
    # 再按回车
    page.keyboard.press('Enter')
    page.wait_for_timeout(200)
    
    # 输入第二行（模拟用户截图中的"图体育与"）
    page.keyboard.type('图体育与')
    page.wait_for_timeout(500)
    
    # 截图
    page.screenshot(path='/workspace/exact-issue.png', full_page=False)
    print("截图已保存: exact-issue.png")
    
    # 现在精确分析：找到"知识库是一个现代化的..."这个段落
    # 以及它后面的新输入段落
    all_ps = pm.locator('p').all()
    
    print("\n=== 所有段落分析 ===")
    for i, p in enumerate(all_ps):
        text = p.text_content() or ''
        rect = p.evaluate("el => el.getBoundingClientRect()")
        cs = p.evaluate("el => { const s = window.getComputedStyle(el); return {mt: s.marginTop, mb: s.marginBottom, pt: s.paddingTop, pb: s.paddingBottom, lh: s.lineHeight, fs: s.fontSize}; }")
        
        # 检查这个段落是否在 .info-box 内部
        parent_info = p.evaluate("el => { const p = el.parentElement; return {tag: p.tagName, class: p.className}; }")
        
        is_new = '同一条人员统' in text or '图体育与' in text
        marker = " [NEW]" if is_new else ""
        
        print(f"\nP[{i}]{marker}")
        print(f"  Text: '{text[:60]}'")
        print(f"  marginTop: {cs['mt']}, marginBottom: {cs['mb']}")
        print(f"  paddingTop: {cs['pt']}, paddingBottom: {cs['pb']}")
        print(f"  lineHeight: {cs['lh']}, fontSize: {cs['fs']}")
        print(f"  height: {rect['height']:.1f}px")
        print(f"  top: {rect['top']:.1f}, bottom: {rect['bottom']:.1f}")
        print(f"  parent: <{parent_info['tag']}> class='{parent_info['class']}'")
    
    # 计算相邻段落的实际间距
    print("\n=== 相邻段落实际像素间距 ===")
    for i in range(len(all_ps) - 1):
        p1 = all_ps[i]
        p2 = all_ps[i + 1]
        
        rect1 = p1.evaluate("el => el.getBoundingClientRect()")
        rect2 = p2.evaluate("el => el.getBoundingClientRect()")
        
        gap = rect2['top'] - rect1['bottom']
        text1 = p1.text_content() or ''
        text2 = p2.text_content() or ''
        
        # 检查这两个段落是否是兄弟关系
        is_siblings = p1.evaluate("el => el.nextElementSibling === document.evaluate(arguments[1], document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue", p2)
        
        print(f"\nP[{i}] -> P[{i+1}]: gap={gap:.1f}px")
        print(f"  P[{i}]: '{text1[:40]}'")
        print(f"  P[{i+1}]: '{text2[:40]}'")
        print(f"  是否兄弟: {is_siblings}")

    browser.close()