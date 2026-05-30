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
    
    # 获取ProseMirror的HTML结构
    html = pm.evaluate("el => el.innerHTML")
    print("=== ProseMirror HTML结构（前2000字符）===")
    print(html[:2000])
    
    # 获取ProseMirror的直接子元素
    print("\n\n=== ProseMirror 直接子元素 ===")
    children = pm.evaluate("""el => {
        const children = el.children;
        const info = [];
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            info.push({
                tag: child.tagName,
                class: child.className,
                text: child.textContent.substring(0, 80),
            });
        }
        return info;
    }""")
    
    for i, child in enumerate(children):
        print(f"[{i}] <{child['tag']}> class='{child['class']}'")
        print(f"     Text: '{child['text']}'")
    
    # 检查"本文档将详细介绍..."和"如果你是第一次..."的父元素
    print("\n\n=== 检查特定段落的父元素链 ===")
    target_ps = pm.evaluate("""() => {
        const ps = document.querySelectorAll('.ProseMirror p');
        const results = [];
        for (const p of ps) {
            const text = p.textContent;
            if (text.includes('本文档将详细介绍') || text.includes('如果你是第一次') || text.includes('同一条') || text.includes('图体育')) {
                const chain = [];
                let el = p;
                while (el && !el.classList.contains('ProseMirror')) {
                    chain.push({
                        tag: el.tagName,
                        class: el.className,
                    });
                    el = el.parentElement;
                }
                results.push({
                    text: text.substring(0, 40),
                    chain: chain,
                });
            }
        }
        return results;
    }""")
    
    for item in target_ps:
        print(f"\nText: '{item['text']}'")
        print("Parent chain (innermost to outermost):")
        for el in item['chain']:
            print(f"  <{el['tag']}> class='{el['class']}'")

    browser.close()