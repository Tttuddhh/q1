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
    
    # 输入第二行
    page.keyboard.type('图体育与')
    page.wait_for_timeout(500)
    
    # === 关键排查：检查每个段落的完整计算样式 ===
    print("=== 1. 所有段落的完整计算样式 ===")
    all_ps = pm.locator('p').all()
    
    for i, p in enumerate(all_ps[:6]):
        text = p.text_content() or ''
        
        # 获取完整的计算样式
        full_styles = p.evaluate("""el => {
            const cs = window.getComputedStyle(el);
            return {
                marginTop: cs.marginTop,
                marginBottom: cs.marginBottom,
                marginLeft: cs.marginLeft,
                marginRight: cs.marginRight,
                paddingTop: cs.paddingTop,
                paddingBottom: cs.paddingBottom,
                paddingLeft: cs.paddingLeft,
                paddingRight: cs.paddingRight,
                lineHeight: cs.lineHeight,
                fontSize: cs.fontSize,
                fontFamily: cs.fontFamily,
                fontWeight: cs.fontWeight,
                color: cs.color,
                display: cs.display,
                boxSizing: cs.boxSizing,
                minHeight: cs.minHeight,
                height: cs.height,
            };
        }""")
        
        is_new = '同一条' in text or '图体育' in text
        marker = " [NEW]" if is_new else ""
        
        print(f"\nP[{i}]{marker}")
        print(f"  Text: '{text[:50]}'")
        for key, value in full_styles.items():
            print(f"  {key}: {value}")
    
    # === 关键排查：检查CSS规则来源 ===
    print("\n\n=== 2. 第一个段落的CSS规则来源 ===")
    first_p_rules = all_ps[0].evaluate("""el => {
        const rules = [];
        for (const sheet of document.styleSheets) {
            try {
                for (const rule of sheet.cssRules) {
                    if (rule instanceof CSSStyleRule && el.matches(rule.selectorText)) {
                        rules.push({
                            selector: rule.selectorText,
                            marginTop: rule.style.marginTop || 'not set',
                            marginBottom: rule.style.marginBottom || 'not set',
                            lineHeight: rule.style.lineHeight || 'not set',
                            fontSize: rule.style.fontSize || 'not set',
                        });
                    }
                }
            } catch (e) {}
        }
        return rules;
    }""")
    
    for rule in first_p_rules:
        print(f"  {rule['selector']}: mt={rule['marginTop']}, mb={rule['marginBottom']}, lh={rule['lineHeight']}, fs={rule['fontSize']}")
    
    # === 关键排查：检查新输入段落的CSS规则来源 ===
    print("\n\n=== 3. 新输入段落的CSS规则来源 ===")
    for i, p in enumerate(all_ps):
        text = p.text_content() or ''
        if '同一条' in text or '图体育' in text:
            new_p_rules = p.evaluate("""el => {
                const rules = [];
                for (const sheet of document.styleSheets) {
                    try {
                        for (const rule of sheet.cssRules) {
                            if (rule instanceof CSSStyleRule && el.matches(rule.selectorText)) {
                                rules.push({
                                    selector: rule.selectorText,
                                    marginTop: rule.style.marginTop || 'not set',
                                    marginBottom: rule.style.marginBottom || 'not set',
                                    lineHeight: rule.style.lineHeight || 'not set',
                                    fontSize: rule.style.fontSize || 'not set',
                                });
                            }
                        }
                    } catch (e) {}
                }
                return rules;
            }""")
            
            print(f"\nP[{i}] '{text[:30]}'")
            for rule in new_p_rules:
                print(f"  {rule['selector']}: mt={rule['marginTop']}, mb={rule['marginBottom']}, lh={rule['lineHeight']}, fs={rule['fontSize']}")
    
    # === 关键排查：检查是否有is-empty类 ===
    print("\n\n=== 4. 检查段落的classList ===")
    for i, p in enumerate(all_ps[:6]):
        text = p.text_content() or ''
        classes = p.evaluate("el => Array.from(el.classList)")
        is_new = '同一条' in text or '图体育' in text
        marker = " [NEW]" if is_new else ""
        print(f"P[{i}]{marker}: classes={classes}, text='{text[:40]}'")
    
    # === 关键排查：检查ProseMirror的默认样式 ===
    print("\n\n=== 5. 检查ProseMirror默认样式 ===")
    pm_styles = pm.evaluate("""el => {
        const cs = window.getComputedStyle(el);
        return {
            fontSize: cs.fontSize,
            lineHeight: cs.lineHeight,
            paddingTop: cs.paddingTop,
            paddingBottom: cs.paddingBottom,
        };
    }""")
    for key, value in pm_styles.items():
        print(f"  {key}: {value}")
    
    # === 关键排查：检查相邻段落的实际间距 ===
    print("\n\n=== 6. 相邻段落实际像素间距（精确到小数点后1位）===")
    for i in range(len(all_ps) - 1):
        p1 = all_ps[i]
        p2 = all_ps[i + 1]
        
        rect1 = p1.evaluate("el => el.getBoundingClientRect()")
        rect2 = p2.evaluate("el => el.getBoundingClientRect()")
        
        gap = rect2['top'] - rect1['bottom']
        text1 = p1.text_content() or ''
        text2 = p2.text_content() or ''
        
        print(f"\nP[{i}] -> P[{i+1}]: gap={gap:.1f}px")
        print(f"  P[{i}]: '{text1[:40]}' (top={rect1['top']:.1f}, bottom={rect1['bottom']:.1f}, height={rect1['height']:.1f})")
        print(f"  P[{i+1}]: '{text2[:40]}' (top={rect2['top']:.1f}, bottom={rect2['bottom']:.1f}, height={rect2['height']:.1f})")

    page.screenshot(path='/workspace/root-cause-test.png', full_page=False)
    print("\n截图已保存: root-cause-test.png")

    browser.close()