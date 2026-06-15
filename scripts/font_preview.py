from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 900})
    
    # Navigate to the app
    page.goto('http://localhost:4173/')
    page.wait_for_load_state('networkidle')
    
    # Take a screenshot of the initial state
    page.screenshot(path='/workspace/screenshots/font_preview_1_initial.png', full_page=False)
    
    # Find and click the font picker button (it has a "T" icon)
    font_button = page.locator('button').filter(has_text='系统默认').first
    if font_button:
        font_button.click()
        page.wait_for_timeout(500)
        
        # Take screenshot with font picker open
        page.screenshot(path='/workspace/screenshots/font_preview_2_picker_open.png', full_page=False)
        
        # Scroll down in the font picker to see more fonts
        font_list = page.locator('div[style*="overflowY: auto"]')
        if font_list:
            # Scroll to show different font categories
            for i in range(3):
                font_list.evaluate('el => el.scrollTop += 150')
                page.wait_for_timeout(200)
            page.screenshot(path='/workspace/screenshots/font_preview_3_fonts_list.png', full_page=False)
    
    # Close picker and try to select a distinctive font (Ma Shan Zheng - handwriting style)
    page.keyboard.press('Escape')
    page.wait_for_timeout(300)
    
    # Open picker again and select Ma Shan Zheng
    font_button = page.locator('button').filter(has_text='系统默认').first
    if font_button:
        font_button.click()
        page.wait_for_timeout(300)
        
        # Find and click on "马山正" font
        ma_shan = page.locator('button').filter(has_text='马山正')
        if ma_shan.count() > 0:
            ma_shan.first.click()
            page.wait_for_timeout(500)
            
            # Take screenshot showing the font selected
            page.screenshot(path='/workspace/screenshots/font_preview_4_ma_shan_selected.png', full_page=False)
    
    browser.close()
    
print("Screenshots saved:")
print("1. /workspace/screenshots/font_preview_1_initial.png - Initial state")
print("2. /workspace/screenshots/font_preview_2_picker_open.png - Font picker opened")
print("3. /workspace/screenshots/font_preview_3_fonts_list.png - Fonts list scrolled")
print("4. /workspace/screenshots/font_preview_4_ma_shan_selected.png - Ma Shan Zheng selected")