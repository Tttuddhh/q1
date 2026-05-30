from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    
    page.goto('http://localhost:3000/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    print("=== 1. 检查预览模式段落间距 ===")
    
    # 获取预览模式段落
    preview_ps = page.locator('.prose.animate-fade-in p').all()
    print(f"预览模式段落数: {len(preview_ps)}")
    for i, p in enumerate(preview_ps[:4]):
        text = p.text_content()
        cs = p.evaluate("el => { const s = window.getComputedStyle(el); return {mt: s.marginTop, mb: s.marginBottom, lh: s.lineHeight, fs: s.fontSize}; }")
        print(f"  P{i}: mt={cs['mt']}, mb={cs['mb']}, lh={cs['lh']}, fs={cs['fs']} | '{text[:40]}'")

    # 进入编辑模式
    print("\n=== 2. 进入编辑模式 ===")
    more_buttons = page.locator('[title="更多操作"]').all()
    if more_buttons:
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

    pm = page.locator('.ProseMirror')
    if pm.count() == 0:
        print("编辑器未出现")
        browser.close()
        exit(1)

    print("编辑器已激活")
    
    # 检查编辑模式下原有段落的间距
    print("\n=== 3. 编辑模式 - 原有段落间距 ===")
    pm_ps = page.locator('.ProseMirror p').all()
    print(f"编辑模式段落数: {len(pm_ps)}")
    for i, p in enumerate(pm_ps[:4]):
        text = p.text_content()
        cs = p.evaluate("el => { const s = window.getComputedStyle(el); return {mt: s.marginTop, mb: s.marginBottom, lh: s.lineHeight, fs: s.fontSize}; }")
        print(f"  P{i}: mt={cs['mt']}, mb={cs['mb']}, lh={cs['lh']}, fs={cs['fs']} | '{text[:40]}'")

    # 在编辑器末尾输入新段落
    print("\n=== 4. 输入新段落 ===")
    pm.first.click()
    page.keyboard.press('Control+End')
    page.wait_for_timeout(300)
    
    # 按两次回车创建新段落
    page.keyboard.press('Enter')
    page.keyboard.press('Enter')
    page.wait_for_timeout(200)
    
    # 输入第一行
    page.keyboard.type('这是新输入的第一行文字')
    page.wait_for_timeout(200)
    
    # 按回车换行
    page.keyboard.press('Enter')
    page.wait_for_timeout(200)
    
    # 输入第二行
    page.keyboard.type('这是新输入的第二行文字')
    page.wait_for_timeout(200)
    
    # 再按回车换行
    page.keyboard.press('Enter')
    page.wait_for_timeout(200)
    
    # 输入第三行
    page.keyboard.type('这是新输入的第三行文字')
    page.wait_for_timeout(500)
    
    page.screenshot(path='/workspace/editor-with-new-text.png', full_page=False)
    print("截图已保存: editor-with-new-text.png")

    # 检查所有段落的间距，特别关注新输入的段落
    print("\n=== 5. 编辑模式 - 所有段落间距对比 ===")
    pm_ps2 = page.locator('.ProseMirror p').all()
    print(f"总段落数: {len(pm_ps2)}")
    
    for i, p in enumerate(pm_ps2):
        text = p.text_content()
        cs = p.evaluate("el => { const s = window.getComputedStyle(el); return {mt: s.marginTop, mb: s.marginBottom, lh: s.lineHeight, fs: s.fontSize}; }")
        
        # 标记新输入的段落
        is_new = text and ('新输入' in text or text == '')
        marker = " [NEW]" if is_new else ""
        
        print(f"  P{i}: mt={cs['mt']}, mb={cs['mb']}, lh={cs['lh']}, fs={cs['fs']}{marker}")
        print(f"       Text: '{text[:50] if text else '(empty)'}'")

    # 检查相邻段落之间的实际间距（通过 getBoundingClientRect）
    print("\n=== 6. 相邻段落之间的实际像素间距 ===")
    for i in range(len(pm_ps2) - 1):
        p1 = pm_ps2[i]
        p2 = pm_ps2[i + 1]
        
        rect1 = p1.evaluate("el => el.getBoundingClientRect()")
        rect2 = p2.evaluate("el => el.getBoundingClientRect()")
        
        gap = rect2['top'] - rect1['bottom']
        text1 = p1.text_content() or '(empty)'
        text2 = p2.text_content() or '(empty)'
        
        print(f"  P{i} -> P{i+1}: gap={gap:.1f}px")
        print(f"    P{i}: '{text1[:30]}'")
        print(f"    P{i+1}: '{text2[:30]}'")

    browser.close()