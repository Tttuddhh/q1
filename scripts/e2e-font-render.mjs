// 端到端字体自验收脚本
// 用途: 每次 Task 完成后由 agent 自动调用, 验证字体选择器的实际加载与渲染情况
// 功能:
//   1. 打开 http://localhost:3000
//   2. 导航到 "富文本编辑器" 页面
//   3. 通过 "更多操作" → "编辑" 进入编辑模式
//   4. 点击字体选择器
//   5. 等待 10 秒 (让所有 source URL 都被尝试)
//   6. 统计 document.fonts 中实际加载的字体数
//   7. 输出每个失败 URL
//   8. 截图保存到 /workspace/screenshots/e2e_*.png

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const URL = process.env.E2E_URL || 'http://localhost:3000';
const SHOT_DIR = '/workspace/screenshots';
const STAMP = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

fs.mkdirSync(SHOT_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const args = process.argv.slice(2);
const HEADLESS = !args.includes('--headed');
const SCROLL_BOTTOM = args.includes('--scroll-bottom');
const CLICK_FONT = args.includes('--click-font');

const consoleErrors = [];
const failedRequests = [];
const successRequests = [];

async function run() {
  const browser = await chromium.launch({ headless: HEADLESS });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text().slice(0, 300);
      if (!consoleErrors.includes(text)) consoleErrors.push(text);
    }
  });
  page.on('requestfailed', (req) => {
    const url = req.url();
    if (failedRequests.length < 200 && !failedRequests.some(r => r.url === url)) {
      failedRequests.push({ url, method: req.method(), failure: req.failure()?.errorText || 'unknown' });
    }
  });
  page.on('response', (res) => {
    const url = res.url();
    if (/font|woff|ttf|css|fontsource|googleapis|jsdelivr|cdnfonts/i.test(url) && res.status() >= 400) {
      if (failedRequests.length < 200) {
        failedRequests.push({ url, method: res.request().method(), status: res.status(), statusText: res.statusText() });
      }
    } else if (/\.(woff2?|ttf|otf)(\?|$)/i.test(url) && res.status() === 200) {
      successRequests.push({ url, status: res.status() });
    }
  });

  console.log('=== 1. 打开页面 ===');
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(800);
  await page.screenshot({ path: path.join(SHOT_DIR, `e2e_${STAMP}_01_home.png`) });

  console.log('=== 2. 导航到 "富文本编辑器" 页面 ===');
  const navigated = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.tree-item-animated'));
    for (const it of items) {
      if ((it.textContent || '').includes('富文本编辑器')) {
        it.click();
        return true;
      }
    }
    return false;
  });
  if (!navigated) {
    console.error('未找到 "富文本编辑器" 页面');
    await browser.close();
    process.exit(1);
  }
  await sleep(500);

  console.log('=== 3. 通过 "更多操作" → "编辑" 进入编辑模式 ===');
  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.tree-item-animated'));
    for (const it of items) {
      if ((it.textContent || '').includes('富文本编辑器')) {
        const btn = it.querySelector('button[title="更多操作"]');
        if (btn) btn.click();
        return;
      }
    }
  });
  await sleep(300);
  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.menu-item'));
    for (const it of items) {
      if ((it.textContent || '').trim().startsWith('编辑')) { it.click(); return; }
    }
  });
  await sleep(1500);

  const editorCount = await page.evaluate(() => document.querySelectorAll('.ProseMirror, [contenteditable="true"]').length);
  console.log(`  编辑器元素数: ${editorCount}`);
  if (editorCount === 0) {
    console.error('未进入编辑模式');
    await page.screenshot({ path: path.join(SHOT_DIR, `e2e_${STAMP}_FAIL_no_editor.png`) });
    await browser.close();
    process.exit(1);
  }
  await page.screenshot({ path: path.join(SHOT_DIR, `e2e_${STAMP}_02_editor.png`) });

  console.log('=== 4. 在编辑器中输入测试文字 ===');
  const editor = await page.$('.ProseMirror, [contenteditable="true"]');
  if (editor) {
    await editor.click();
    await sleep(300);
    await page.keyboard.type('天地玄黄宇宙洪荒', { delay: 20 });
    await sleep(300);
  }
  await page.screenshot({ path: path.join(SHOT_DIR, `e2e_${STAMP}_03_typed.png`) });

  console.log('=== 5. 打开字体选择器 ===');
  const fontBtn = await page.$('button[title="字体"]');
  if (!fontBtn) {
    console.error('未找到字体按钮');
    await browser.close();
    process.exit(1);
  }
  await fontBtn.click();
  await sleep(500);
  await page.screenshot({ path: path.join(SHOT_DIR, `e2e_${STAMP}_04_picker_open.png`) });

  if (CLICK_FONT) {
    console.log('=== 6. 悬停/点击所有中文字体选项触发加载 ===');
    await page.evaluate(() => {
      const panel = document.querySelector('[style*="z-index: 1000"]');
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll('button'));
      for (const it of items) {
        it.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        it.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      }
    });
    await sleep(800);
  }

  console.log('=== 7. 等待 10 秒, 让所有 source URL 都被尝试 ===');
  // 每 2 秒滚动一次触发更多加载
  for (let i = 0; i < 5; i++) {
    await sleep(2000);
    await page.evaluate(() => {
      const panel = document.querySelector('[style*="z-index: 1000"]');
      if (panel) {
        const list = panel.querySelector('div[style*="overflowY"]') || panel.querySelector('div[style*="overflow-y"]');
        if (list) {
          list.scrollTop = list.scrollHeight;
        }
      }
    });
  }
  await page.evaluate(() => {
    const panel = document.querySelector('[style*="z-index: 1000"]');
    if (panel) {
      const list = panel.querySelector('div[style*="overflowY"]') || panel.querySelector('div[style*="overflow-y"]');
      if (list) list.scrollTop = 0;
    }
  });
  await sleep(1000);
  await page.screenshot({ path: path.join(SHOT_DIR, `e2e_${STAMP}_05_picker_loaded.png`), fullPage: false });

  if (SCROLL_BOTTOM) {
    await page.evaluate(() => {
      const panel = document.querySelector('[style*="z-index: 1000"]');
      if (panel) {
        const list = panel.querySelector('div[style*="overflowY"]') || panel.querySelector('div[style*="overflow-y"]');
        if (list) list.scrollTop = list.scrollHeight;
      }
    });
    await sleep(500);
    await page.screenshot({ path: path.join(SHOT_DIR, `e2e_${STAMP}_06_picker_bottom.png`), fullPage: false });
  }

  console.log('=== 8. 统计 document.fonts ===');
  const fontsInfo = await page.evaluate(async () => {
    await document.fonts.ready;
    const loaded = [];
    const failed = [];
    document.fonts.forEach(f => {
      if (f.status === 'loaded') {
        loaded.push({ family: f.family, weight: f.weight, style: f.style });
      }
    });
    return { total: document.fonts.size, loaded };
  });

  // 实际可用的中文字体
  const chineseKeywords = [
    'Noto', '思源', 'LXGW', '霞鹜', 'ZCOOL', '站酷', 'Ma Shan', 'Long Cang',
    'Liu Jian', 'Zhi Mang', 'Han', 'HanYi', 'Alibaba', 'HarmonyOS', 'MiSans',
    'OPPO', 'Smiley', 'DeYiHei', 'DingTalk', 'Bpmf', 'Huninn', 'Iansui',
    'Chiron', 'WDXL', 'Cactus', 'Chocolate', 'FangSong', 'KaiTi', 'Sim',
    'ST', 'Heiti', 'Songti', 'Kaiti', 'Xingkai', 'Fangsong', 'Zhongsong',
    'Xihei', 'LiHei', 'LiSong', 'JhengHei', 'MingLiU', 'Hiragino', 'Yuanti',
    'JY', 'HanYi', 'ZCOOL', '方正', '悠哉', '小赖', '鸿雷', '演示', '得意',
    '鸿蒙', '阿里', '钉钉', '猫啃', '手写', '元黑', '昭源', '加粗', '粗体',
    '京', '新浪', '书宋', '楷体', '宋体', '黑体', '行书', '龙藏', '进步',
    '黑体 SC', '黑体 TC', '黑体 HK', '宋体 SC', '宋体 TC', '宋体 HK',
    '文楷', '马克哥特', '峰', '曦', '晶', '秋鸿', '圆体', '手写体',
    '新晰黑', '新宋', '致宋', '吟', '涂鸦', '悠然', '心', '火', '细体',
    '墨黑', '柏青', '桃源', '榜书', '非凡', '展', '正', '润', '小薇',
    '快乐', '黄油', '庆科', '荆南', '招牌', '皇榜', '卓', '达',
    'Bpmf', 'Huninn', 'Iansui', 'Zhi', 'Bpmf', '注音', '芫荽', '字嗨',
  ];
  const isChinese = (family) => {
    if (!family) return false;
    // 直接包含中文
    if (/[\u4E00-\u9FFF]/.test(family)) return true;
    // 包含 CJK 关键词
    const lower = String(family).toLowerCase();
    return chineseKeywords.some(kw => lower.includes(String(kw).toLowerCase()));
  };
  const chineseLoaded = fontsInfo.loaded.filter(f => isChinese(f.family));
  // CJK = 中文 + 日文 + 韩文
  const cjkLoaded = fontsInfo.loaded.filter(f => isChinese(f.family) || /Han|Hiragino|Klee|Kosugi|Noto Sans JP|Noto Sans KR|M PLUS|Shippori|Sawarabi|Nanum|Gowun|Gothic|Poor Story|Cute|Black Han|IBM Plex|Chiron|Single Day|Dokdo|Gaegu|Kirang|Rampart/i.test(f.family));

  console.log('--- 字体加载结果 ---');
  console.log(`  document.fonts.size: ${fontsInfo.total}`);
  console.log(`  loaded 数量: ${fontsInfo.loaded.length}`);
  console.log(`  中文相关 loaded: ${chineseLoaded.length}`);
  console.log(`  CJK loaded (中+日+韩): ${cjkLoaded.length}`);
  console.log('  所有已加载的字体:');
  for (const f of fontsInfo.loaded) console.log(`    - ${f.family} (${f.weight}, ${f.style})`);

  console.log('--- 网络失败请求 ---');
  console.log(`  失败数: ${failedRequests.length}`);
  for (const r of failedRequests.slice(0, 30)) {
    console.log(`    - ${r.status || r.failure} ${r.method} ${r.url}`);
  }
  if (failedRequests.length > 30) console.log(`    ... 还有 ${failedRequests.length - 30} 个`);

  console.log('--- 控制台错误 ---');
  console.log(`  错误数: ${consoleErrors.length}`);
  for (const e of consoleErrors.slice(0, 20)) console.log(`    - ${e}`);
  if (consoleErrors.length > 20) console.log(`    ... 还有 ${consoleErrors.length - 20} 个`);

  // 写到文件
  const reportPath = path.join(SHOT_DIR, `e2e_${STAMP}_report.json`);
  fs.writeFileSync(reportPath, JSON.stringify({
    stamp: STAMP,
    documentFontsSize: fontsInfo.total,
    loadedCount: fontsInfo.loaded.length,
    chineseLoadedCount: chineseLoaded.length,
    cjkLoadedCount: cjkLoaded.length,
    loaded: fontsInfo.loaded,
    failedRequests,
    consoleErrors,
  }, null, 2));
  console.log(`\n报告已保存: ${reportPath}`);

  // 总结
  console.log('\n=== 验收总结 ===');
  const pass = cjkLoaded.length >= 50;
  console.log(`中文相关字体加载数: ${chineseLoaded.length}`);
  console.log(`CJK 字体加载数 (中+日+韩): ${cjkLoaded.length} (要求 ≥ 50) - ${pass ? '✅ PASS' : '❌ FAIL'}`);

  await browser.close();
  process.exit(pass ? 0 : 1);
}

run().catch((e) => {
  console.error('FATAL:', e);
  process.exit(2);
});
