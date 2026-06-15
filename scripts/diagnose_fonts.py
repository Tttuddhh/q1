from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Double-click on the content area to enter edit mode
    # The content area shows "开始编写内容..." for a new unedited page
    content_area = page.locator("text=开始编写内容...").first
    if content_area.count() == 0:
        # Fallback: try to find the prose content area
        content_area = page.locator("div.prose").first
    if content_area.count() > 0:
        content_area.dblclick()
        print("Double-clicked content area to enter edit mode")
    else:
        print("Content area not found, trying to click in the main content region")
        page.mouse.click(700, 450)
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/03_after_dblclick.png", full_page=False)
    print("Screenshot 3: After double-click")

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found after double-click: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_editor.png", full_page=False)
        html = page.content()
        print("Page HTML snippet (first 2000 chars):")
        print(html[:2000])
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons = page.locator("button").all()
    print(f"\nTotal buttons on page: {len(all_buttons)}")
    for btn in all_buttons:
        box = btn.bounding_box()
        if box and box["y"] < 400 and box["x"] > 200:
            inner = btn.inner_text().strip()
            print(f"  Toolbar button: '{inner}' at ({box['x']:.0f}, {box['y']:.0f})")

    # 4. Click the font picker button in the editor toolbar
    font_picker_button = None

    # Strategy 1: by text "系统默认"
    fp = page.locator("button", has_text="系统默认").first
    if fp.count() > 0:
        font_picker_button = fp
        print("Found font picker by text: 系统默认")

    # Strategy 2: button containing a span with "T"
    if not font_picker_button:
        for btn in all_buttons:
            box = btn.bounding_box()
            if box and box["y"] < 300 and box["x"] > 300:
                inner = btn.inner_text().strip()
                if inner.startswith("T") or "系统默认" in inner:
                    font_picker_button = btn
                    print(f"Found font picker button: '{inner}' at ({box['x']:.0f}, {box['y']:.0f})")
                    break

    # Strategy 3: first button inside the sticky toolbar area
    if not font_picker_button:
        toolbar = page.locator("div[style*='position: sticky']").first
        if toolbar.count() > 0:
            first_btn = toolbar.locator("button").first
            if first_btn.count() > 0:
                font_picker_button = first_btn
                print("Found font picker as first button in sticky toolbar")

    if font_picker_button:
        font_picker_button.click()
        page.wait_for_timeout(1500)
        page.screenshot(path=f"{OUTPUT_DIR}/04_picker_open.png", full_page=False)
        print("Screenshot 4: Font picker opened")

        # 5. Scroll through font list and take screenshots
        scrollable = page.locator("div[style*='overflowY: auto'], div[style*='overflow-y: auto']").first
        if scrollable.count() > 0:
            for i in range(8):
                page.screenshot(path=f"{OUTPUT_DIR}/05_fonts_scroll_{i}.png", full_page=False)
                print(f"Screenshot 5.{i}: Fonts scroll position {i}")
                scrollable.evaluate("el => el.scrollTop += 180")
                page.wait_for_timeout(500)
        else:
            page.screenshot(path=f"{OUTPUT_DIR}/05_fonts_scroll_0.png", full_page=False)
            print("Screenshot 5.0: Font list (no scroll container found)")

        # 6. Select "马山正楷" font
        ma_shan = page.locator("button", has_text="马山正楷").first
        if ma_shan.count() > 0:
            ma_shan.click()
            page.wait_for_timeout(1000)
            page.screenshot(path=f"{OUTPUT_DIR}/06_selected_ma_shan.png", full_page=False)
            print("Screenshot 6: Ma Shan Zheng selected")
        else:
            print("马山正楷 font not found in picker")
            page.screenshot(path=f"{OUTPUT_DIR}/06_selected_ma_shan.png", full_page=False)

        # 7. Click into the editor and type some Chinese text
        editor = page.locator(".ProseMirror").first
        if editor.count() > 0:
            editor.click()
            page.wait_for_timeout(500)
            editor.type("这是一段使用马山正楷字体的中文文本。字体选择器测试成功！")
            page.wait_for_timeout(1000)
            page.screenshot(path=f"{OUTPUT_DIR}/07_editor_text.png", full_page=False)
            print("Screenshot 7: Editor text saved")
        else:
            print("Editor not found")
            page.screenshot(path=f"{OUTPUT_DIR}/07_editor_text.png", full_page=False)
    else:
        print("Font picker button not found")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_picker.png", full_page=False)

    browser.close()
    print(f"\nAll screenshots saved to {OUTPUT_DIR}/")
from playwrightfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=Truefrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "heightfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("httpfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header tofrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn =from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btnfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUTfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=Falsefrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3.from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via Reactfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need tofrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..."from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be atfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But sincefrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directlyfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find iffrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    #from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttonsfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible editfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let'sfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, lookingfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter editfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handlefrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page infrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's findfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated,from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_pagefrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) >from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3:from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menufrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_optionfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_optionfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(200from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", fullfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUTfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("Nofrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.sfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    tryfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".Profrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        printfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUTfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons =from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons = page.locator("button").all()
    print(f"\nTotal buttons on pagefrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons = page.locator("button").all()
    print(f"\nTotal buttons on page: {len(all_buttons)}")
    for btn in all_buttons:
        box = btnfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons = page.locator("button").all()
    print(f"\nTotal buttons on page: {len(all_buttons)}")
    for btn in all_buttons:
        box = btn.bounding_box()
        if box and boxfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons = page.locator("button").all()
    print(f"\nTotal buttons on page: {len(all_buttons)}")
    for btn in all_buttons:
        box = btn.bounding_box()
        if box and box["y"] < 400 and box["x"] > 200:
            inner = btn.inner_text().strip()
            print(f"from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons = page.locator("button").all()
    print(f"\nTotal buttons on page: {len(all_buttons)}")
    for btn in all_buttons:
        box = btn.bounding_box()
        if box and box["y"] < 400 and box["x"] > 200:
            inner = btn.inner_text().strip()
            print(f"  Toolbar button: '{inner}' at ({boxfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons = page.locator("button").all()
    print(f"\nTotal buttons on page: {len(all_buttons)}")
    for btn in all_buttons:
        box = btn.bounding_box()
        if box and box["y"] < 400 and box["x"] > 200:
            inner = btn.inner_text().strip()
            print(f"  Toolbar button: '{inner}' at ({box['x']:.0f}, {box['y']:.0f})")

from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons = page.locator("button").all()
    print(f"\nTotal buttons on page: {len(all_buttons)}")
    for btn in all_buttons:
        box = btn.bounding_box()
        if box and box["y"] < 400 and box["x"] > 200:
            inner = btn.inner_text().strip()
            print(f"  Toolbar button: '{inner}' at ({box['x']:.0f}, {box['y']:.0f})")

    # 5. Click the font picker button infrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons = page.locator("button").all()
    print(f"\nTotal buttons on page: {len(all_buttons)}")
    for btn in all_buttons:
        box = btn.bounding_box()
        if box and box["y"] < 400 and box["x"] > 200:
            inner = btn.inner_text().strip()
            print(f"  Toolbar button: '{inner}' at ({box['x']:.0f}, {box['y']:.0f})")

    # 5. Click the font picker button in the editor toolbar
    font_picker_button = None

    # Strategy 1: byfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons = page.locator("button").all()
    print(f"\nTotal buttons on page: {len(all_buttons)}")
    for btn in all_buttons:
        box = btn.bounding_box()
        if box and box["y"] < 400 and box["x"] > 200:
            inner = btn.inner_text().strip()
            print(f"  Toolbar button: '{inner}' at ({box['x']:.0f}, {box['y']:.0f})")

    # 5. Click the font picker button in the editor toolbar
    font_picker_button = None

    # Strategy 1: by text "系统默认"
    fp = pagefrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons = page.locator("button").all()
    print(f"\nTotal buttons on page: {len(all_buttons)}")
    for btn in all_buttons:
        box = btn.bounding_box()
        if box and box["y"] < 400 and box["x"] > 200:
            inner = btn.inner_text().strip()
            print(f"  Toolbar button: '{inner}' at ({box['x']:.0f}, {box['y']:.0f})")

    # 5. Click the font picker button in the editor toolbar
    font_picker_button = None

    # Strategy 1: by text "系统默认"
    fp = page.locator("button", has_text="系统默认").first
    if fp.count() > 0:
        font_picker_button =from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons = page.locator("button").all()
    print(f"\nTotal buttons on page: {len(all_buttons)}")
    for btn in all_buttons:
        box = btn.bounding_box()
        if box and box["y"] < 400 and box["x"] > 200:
            inner = btn.inner_text().strip()
            print(f"  Toolbar button: '{inner}' at ({box['x']:.0f}, {box['y']:.0f})")

    # 5. Click the font picker button in the editor toolbar
    font_picker_button = None

    # Strategy 1: by text "系统默认"
    fp = page.locator("button", has_text="系统默认").first
    if fp.count() > 0:
        font_picker_button = fp
        print("Found font picker by textfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons = page.locator("button").all()
    print(f"\nTotal buttons on page: {len(all_buttons)}")
    for btn in all_buttons:
        box = btn.bounding_box()
        if box and box["y"] < 400 and box["x"] > 200:
            inner = btn.inner_text().strip()
            print(f"  Toolbar button: '{inner}' at ({box['x']:.0f}, {box['y']:.0f})")

    # 5. Click the font picker button in the editor toolbar
    font_picker_button = None

    # Strategy 1: by text "系统默认"
    fp = page.locator("button", has_text="系统默认").first
    if fp.count() > 0:
        font_picker_button = fp
        print("Found font picker by text: 系统默认")

    # Strategy 2: button containing a span with "Tfrom playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/workspace/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Open the app
    page.goto("http://localhost:4173/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/01_initial.png", full_page=False)
    print("Screenshot 1: Initial page saved")

    # 2. Click the "新建页面" button in the page tree header to create a new page
    new_page_btn = page.locator("button", has_text="新建页面").first
    if new_page_btn.count() == 0:
        new_page_btn = page.locator("text=新建页面").first
    new_page_btn.click()
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{OUTPUT_DIR}/02_new_page.png", full_page=False)
    print("Screenshot 2: New page created")

    # 3. Inject a script to directly set editing state via React devtools-like approach
    # We need to trigger startEditing on the current page
    # First, let's try clicking on the "..." more button on the page tree item for the new page
    # The new page should be at the bottom of the tree
    # But since we don't know its ID, let's try a different approach:
    # Use browser console to directly call the startEditing function exposed on window
    
    # Let's first try to find if there's any edit button in the UI
    # Check for any button with "编辑" text
    edit_buttons = page.locator("button", has_text="编辑").all()
    print(f"Found {len(edit_buttons)} buttons with '编辑' text")
    
    # Try using keyboard shortcut or any visible edit button
    # Since new pages have isEdited=false, they show default content
    # Let's try clicking on the content area which might trigger edit mode
    
    # Actually, looking at the code, there's no double-click to edit.
    # The only way to enter edit mode is through the context menu "编辑" option
    # or through the PageTree's handleAction('edit', pageId)
    
    # Let's find the newly created page in the tree and right-click it
    # New pages are appended at the bottom, so let's find the last page item
    all_page_items = page.locator("div.tree-item-animated, div[class*='tree-item']").all()
    print(f"Found {len(all_page_items)} page items in tree")
    
    if len(all_page_items) > 0:
        last_page = all_page_items[-1]
        last_page.click(button="right")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{OUTPUT_DIR}/03_context_menu.png", full_page=False)
        print("Screenshot 3: Context menu on new page")
        
        # Click "编辑" in the context menu
        edit_option = page.locator("text=编辑").first
        if edit_option.count() > 0:
            edit_option.click()
            page.wait_for_timeout(2000)
            page.screenshot(path=f"{OUTPUT_DIR}/04_edit_mode.png", full_page=False)
            print("Screenshot 4: Edit mode")
        else:
            print("Edit option not found in context menu")
            page.screenshot(path=f"{OUTPUT_DIR}/04_no_edit.png", full_page=False)
    else:
        print("No page items found in tree")
        page.screenshot(path=f"{OUTPUT_DIR}/03_no_pages.png", full_page=False)

    # Wait for the editor to appear
    try:
        page.wait_for_selector(".ProseMirror", timeout=10000)
        page.wait_for_timeout(1000)
        print("Editor (.ProseMirror) found")
    except Exception as e:
        print(f"Editor not found: {e}")
        page.screenshot(path=f"{OUTPUT_DIR}/04_no_editor.png", full_page=False)
        browser.close()
        exit(1)

    # Debug: print all buttons in the toolbar area
    all_buttons = page.locator("button").all()
    print(f"\nTotal buttons on page: {len(all_buttons)}")
    for btn in all_buttons:
        box = btn.bounding_box()
        if box and box["y"] < 400 and box["x"] > 200:
            inner = btn.inner_text().strip()
            print(f"  Toolbar button: '{inner}' at ({box['x']:.0f}, {box['y']:.0f})")

    # 5. Click the font picker button in the editor toolbar
    font_picker_button = None

    # Strategy 1: by text "系统默认"
    fp = page.locator("button", has_text="系统默认").first
    if fp.count() > 0:
        font_picker_button = fp
        print("Found font picker by text: 系统默认")

    # Strategy 2: button containing a span with "T"
    if not font_picker_button:
        for btn in all_buttons:
