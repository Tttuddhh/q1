from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})

    # 1. 截图首页
    page.goto('http://localhost:5174/')
    page.wait_for_load_state('networkidle')
    time.sleep(1)
    page.screenshot(path='/workspace/knowledge-base/screenshots/01_home.png', full_page=False)
    print("截图1: 首页完成")

    # 2. 点击设置按钮
    # 先找到设置按钮（通常在左侧边栏）
    settings_btn = page.locator('button[title="设置"], button:has-text("设置"), [data-testid="settings"]').first
    if settings_btn.count() > 0:
        settings_btn.click()
    else:
        # 尝试通过侧边栏图标点击
        sidebar_buttons = page.locator('.func-sidebar-item, .func-sidebar button').all()
        for btn in sidebar_buttons:
            text = btn.inner_text()
            if '设置' in text or 'setting' in text.lower():
                btn.click()
                break

    time.sleep(1)
    page.screenshot(path='/workspace/knowledge-base/screenshots/02_settings.png', full_page=False)
    print("截图2: 设置页面完成")

    # 3. 点击外观标签
    appearance_tab = page.locator('button:has-text("外观"), .settings-tab-btn:has-text("外观")').first
    if appearance_tab.count() > 0:
        appearance_tab.click()
        time.sleep(1)
        page.screenshot(path='/workspace/knowledge-base/screenshots/03_appearance.png', full_page=False)
        print("截图3: 外观设置完成")

    # 4. 点击右箭头查看轮播动画
    right_arrow = page.locator('button:has([data-lucide="chevron-right"])').first
    if right_arrow.count() > 0:
        right_arrow.click()
        time.sleep(0.5)
        page.screenshot(path='/workspace/knowledge-base/screenshots/04_carousel_right.png', full_page=False)
        print("截图4: 轮播右箭头完成")

    # 5. 点击左箭头查看轮播动画
    left_arrow = page.locator('button:has([data-lucide="chevron-left"])').first
    if left_arrow.count() > 0:
        left_arrow.click()
        time.sleep(0.5)
        page.screenshot(path='/workspace/knowledge-base/screenshots/05_carousel_left.png', full_page=False)
        print("截图5: 轮播左箭头完成")

    # 6. 点击应用按钮
    apply_btn = page.locator('button:has-text("应用该主题")').first
    if apply_btn.count() > 0:
        apply_btn.click()
        time.sleep(1)
        page.screenshot(path='/workspace/knowledge-base/screenshots/06_applied.png', full_page=False)
        print("截图6: 应用主题完成")

    browser.close()
    print("\n所有截图已保存到 /workspace/knowledge-base/screenshots/")
