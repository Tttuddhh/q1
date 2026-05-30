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
    
    print("=== 步骤1: 记录编辑模式初始状态的段落间距 ===")
    
    # 获取初始状态下的所有段落
    initial_ps = pm.locator('p').all()
    initial_gaps = []
    for i in range(len(initial_ps) - 1):
        p1 = initial_ps[i]
        p2 = initial_ps[i + 1]
        rect1 = p1.evaluate("el => el.getBoundingClientRect()")
        rect2 = p2.evaluate("el => el.getBoundingClientRect()")
        gap = rect2['top'] - rect1['bottom']
        text1 = p1.text_content() or ''
        text2 = p2.text_content() or ''
        initial_gaps.append({
            'from': text1[:30],
            'to': text2[:30],
            'gap': gap,
        })
    
    for i, g in enumerate(initial_gaps[:3]):
        print(f"  初始 P[{i}] -> P[{i+1}]: {g['gap']:.1f}px ('{g['from']}' -> '{g['to']}')")
    
    # 模拟用户操作：在第一个段落后面输入新内容
    print("\n=== 步骤2: 在第一个段落后面输入新内容 ===")
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
    
    # 输入第二行
    page.keyboard.type('图体育与')
    page.wait_for_timeout(500)
    
    print("\n=== 步骤3: 记录输入后的段落间距 ===")
    
    # 获取输入后的所有段落
    final_ps = pm.locator('p').all()
    final_gaps = []
    for i in range(len(final_ps) - 1):
        p1 = final_ps[i]
        p2 = final_ps[i + 1]
        rect1 = p1.evaluate("el => el.getBoundingClientRect()")
        rect2 = p2.evaluate("el => el.getBoundingClientRect()")
        gap = rect2['top'] - rect1['bottom']
        text1 = p1.text_content() or ''
        text2 = p2.text_content() or ''
        final_gaps.append({
            'from': text1[:30],
            'to': text2[:30],
            'gap': gap,
        })
    
    for i, g in enumerate(final_gaps[:5]):
        print(f"  最终 P[{i}] -> P[{i+1}]: {g['gap']:.1f}px ('{g['from']}' -> '{g['to']}')")
    
    # 对比
    print("\n=== 步骤4: 对比初始和最终的间距 ===")
    print("注意：由于插入了新段落，段落索引会变化")
    print("我们对比'知识库是一个现代化的...'和下一个段落之间的间距：")
    
    # 找到"知识库是一个现代化的..."段落在初始和最终状态中的位置
    initial_idx = None
    for i, p in enumerate(initial_ps):
        text = p.text_content() or ''
        if '知识库是一个现代化的' in text:
            initial_idx = i
            break
    
    final_idx = None
    for i, p in enumerate(final_ps):
        text = p.text_content() or ''
        if '知识库是一个现代化的' in text:
            final_idx = i
            break
    
    if initial_idx is not None and final_idx is not None:
        initial_gap = initial_gaps[initial_idx]['gap'] if initial_idx < len(initial_gaps) else None
        final_gap = final_gaps[final_idx]['gap'] if final_idx < len(final_gaps) else None
        
        print(f"\n  初始状态: '知识库是一个现代化的...' -> 下一个段落: {initial_gap:.1f}px")
        print(f"  最终状态: '知识库是一个现代化的...' -> 下一个段落: {final_gap:.1f}px")
        
        if initial_gap and final_gap:
            diff = abs(initial_gap - final_gap)
            if diff < 1:
                print(f"  ✅ 间距一致 (差异 {diff:.1f}px)")
            else:
                print(f"  ❌ 间距不一致 (差异 {diff:.1f}px)")
    
    # 检查新输入段落之间的间距
    print("\n=== 步骤5: 新输入段落之间的间距 ===")
    for i, g in enumerate(final_gaps):
        if '同一条' in g['from'] or '图体育' in g['from'] or '同一条' in g['to'] or '图体育' in g['to']:
            print(f"  P[{i}] -> P[{i+1}]: {g['gap']:.1f}px ('{g['from']}' -> '{g['to']}')")
    
    # 检查新输入段落和原有段落之间的间距
    print("\n=== 步骤6: 新输入段落与原有段落之间的间距 ===")
    for i, g in enumerate(final_gaps):
        is_new_from = '同一条' in g['from'] or '图体育' in g['from']
        is_new_to = '同一条' in g['to'] or '图体育' in g['to']
        
        if is_new_from or is_new_to:
            marker = " [NEW-OLD]" if (is_new_from != is_new_to) else " [NEW-NEW]"
            print(f"  P[{i}] -> P[{i+1}]: {g['gap']:.1f}px{marker}")

    page.screenshot(path='/workspace/user-exact-flow.png', full_page=False)
    print("\n截图已保存: user-exact-flow.png")

    browser.close()