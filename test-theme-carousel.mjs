import { chromium } from 'playwright';

const BASE = 'http://localhost:5176';
const ANIM_DURATION = 400;

const results = [];

function result(name, pass, detail = '') {
  const status = pass ? 'PASS' : 'FAIL';
  results.push({ name, status, detail });
  console.log(`[${status}] ${name}${detail ? ' — ' + detail : ''}`);
}

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    // ===== NAVIGATION: Open settings -> appearance tab =====
    console.log('=== 导航到设置 > 外观 ===');
    await page.goto(BASE, { waitUntil: 'networkidle' });

    const sidebar = page.locator('.func-sidebar');
    await sidebar.hover();
    await page.waitForTimeout(600);

    const settingsBtn = page.locator('.func-sidebar-item').filter({ hasText: '设置' });
    await settingsBtn.click();
    await page.waitForTimeout(1000);

    const appearanceTab = page.locator('.settings-tab-btn').filter({ hasText: '外观' });
    await appearanceTab.click();
    await page.waitForTimeout(800);

    const getThemePrimary = async () => {
      return page.evaluate(() => {
        return getComputedStyle(document.documentElement).getPropertyValue('--theme-primary').trim();
      });
    };

    const findAppliedScheme = async () => {
      return page.evaluate(() => {
        const spans = document.querySelectorAll('span');
        for (const span of spans) {
          const children = span.querySelectorAll('span');
          for (const child of children) {
            const bg = child.style.backgroundColor;
            if (bg && bg.includes('var(--color-primary)')) {
              return span.textContent?.trim() || '';
            }
          }
        }
        return null;
      });
    };

    // =======================================================
    // STEP 0: 先确保有一个方案被应用，以便后续测试
    // =======================================================
    console.log('\n--- 步骤0: 初始状态检测 & 设置初始应用方案 ---');

    const initialTheme = await getThemePrimary();
    console.log(`  初始 --theme-primary: ${initialTheme}`);

    // 点击"低饱和"方案标签，然后点击应用按钮
    await page.locator('span').filter({ hasText: '低饱和' }).first().click();
    await page.waitForTimeout(500);
    const applyBtnInitial = page.locator('button').filter({ hasText: '应用该主题' });
    if (await applyBtnInitial.count() > 0) {
      await applyBtnInitial.click();
      await page.waitForTimeout(600);
      console.log('  已将"低饱和"设为当前主题');
    }

    // =======================================================
    // TEST 1: 动画流畅性测试（左箭头）
    // =======================================================
    console.log('\n--- 测试1: 动画流畅性测试（左箭头） ---');

    const leftArrow = page.locator('button').filter({ has: page.locator('svg.lucide-chevron-left') }).first();

    const leftDisabled = await leftArrow.isDisabled();
    if (leftDisabled) {
      result('动画-左箭头可用', false, '左箭头按钮被禁用');
    } else {
      result('动画-左箭头可用', true);
    }

    // Capture initial positions of variant boxes
    const initialPositions = await page.evaluate(() => {
      const variants = document.querySelectorAll('div[style*="will-change: transform"]');
      const positions = [];
      variants.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        positions.push({ index: i, left: rect.left, top: rect.top, width: rect.width, height: rect.height });
      });
      return positions;
    });
    console.log(`  初始可见 variant 数量: ${initialPositions.length}`);
    if (initialPositions.length >= 3) {
      result('动画-初始可见 variant 数量 >= 3', true, `找到 ${initialPositions.length} 个`);
    } else {
      result('动画-初始可见 variant 数量 >= 3', false, `只找到 ${initialPositions.length} 个`);
    }

    // Click left arrow and capture positions at multiple time points
    const animationData = await page.evaluate(async (animDuration) => {
      const variants = document.querySelectorAll('div[style*="will-change: transform"]');
      const initialLefts = Array.from(variants).map(el => el.getBoundingClientRect().left);

      const leftBtn = document.querySelector('button[style*="left: 12px"]');
      if (!leftBtn) return { error: 'left button not found', frames: [] };

      const frames = [];
      frames.push({ time: 0, lefts: [...initialLefts] });

      leftBtn.click();

      return new Promise(resolve => {
        let frameCount = 0;
        const maxFrames = 20;
        const startTime = performance.now();

        function capture() {
          frameCount++;
          const currentLefts = Array.from(variants).map(el => el.getBoundingClientRect().left);
          const elapsed = performance.now() - startTime;
          frames.push({ frame: frameCount, time: Math.round(elapsed), lefts: currentLefts });

          if (elapsed < animDuration + 100 && frameCount < maxFrames) {
            requestAnimationFrame(capture);
          } else {
            resolve({ error: null, frames, initialLefts });
          }
        }

        requestAnimationFrame(capture);
      });
    }, ANIM_DURATION);

    if (animationData.error) {
      result('动画-帧捕获', false, animationData.error);
    } else {
      result('动画-帧捕获', true, `捕获 ${animationData.frames.length} 帧`);

      // Check movement started within 50ms
      const initialLefts = animationData.frames[0].lefts;
      let movementStartedEarly = false;
      let earlyFrameTime = 0;
      let firstMoveFrame = -1;
      for (let i = 1; i < animationData.frames.length; i++) {
        const frame = animationData.frames[i];
        const displacements = frame.lefts.map((l, idx) => Math.abs(l - initialLefts[idx]));
        const maxDisp = Math.max(...displacements);
        if (maxDisp >= 5) {
          firstMoveFrame = i;
          if (frame.time <= 50) {
            movementStartedEarly = true;
            earlyFrameTime = frame.time;
          }
          break;
        }
      }
      result('动画-50ms 内开始移动(≥5px)', movementStartedEarly,
        movementStartedEarly ? `首个位移≥5px 出现在 ${earlyFrameTime}ms` : `首个位移≥5px 出现在 ${animationData.frames[firstMoveFrame]?.time || 'N/A'}ms`);

      // Check smoothness: each frame shows increasing displacement
      let smoothIncreasing = true;
      let prevMaxDisp = 0;
      let nonIncreasingFrames = [];
      for (let i = 1; i < animationData.frames.length; i++) {
        const frame = animationData.frames[i];
        const displacements = frame.lefts.map((l, idx) => Math.abs(l - initialLefts[idx]));
        const maxDisp = Math.max(...displacements);
        if (maxDisp < prevMaxDisp - 1) {
          smoothIncreasing = false;
          nonIncreasingFrames.push({ frame: i, time: frame.time, maxDisp, prevMaxDisp });
        }
        prevMaxDisp = Math.max(prevMaxDisp, maxDisp);
      }
      result('动画-位移单调递增(流畅)', smoothIncreasing,
        smoothIncreasing ? '所有帧位移持续增长' : `不递增帧: ${JSON.stringify(nonIncreasingFrames.slice(0, 3))}`);

      console.log('  帧数据:');
      for (const f of animationData.frames) {
        const displacements = f.lefts.map((l, idx) => Math.round(Math.abs(l - initialLefts[idx]) * 100) / 100);
        console.log(`    t=${f.time}ms 位移=[${displacements.join(', ')}]`);
      }
    }

    await page.waitForTimeout(ANIM_DURATION + 200);

    // =======================================================
    // TEST 2: Scheme tab 点击不改变全局主题
    // =======================================================
    console.log('\n--- 测试2: Scheme tab 点击不改变全局主题 ---');

    const appliedBefore = await findAppliedScheme();
    console.log(`  当前已应用 scheme: "${appliedBefore}"`);

    const themeBefore = await getThemePrimary();
    console.log(`  当前 --theme-primary: ${themeBefore}`);

    // Click a different scheme tab
    const targetScheme2 = appliedBefore === '低饱和' ? '清新' : '夏日';
    console.log(`  点击 "${targetScheme2}" scheme tab...`);
    await page.locator('span').filter({ hasText: targetScheme2 }).first().click();
    await page.waitForTimeout(600);

    const themeAfter = await getThemePrimary();
    console.log(`  点击后 --theme-primary: ${themeAfter}`);
    const themeUnchanged = themeBefore === themeAfter;
    result('Scheme Tab 点击不改变全局主题', themeUnchanged,
      themeUnchanged ? '--theme-primary 未变化（正确）' : `值从 ${themeBefore} 变为 ${themeAfter}（错误）`);

    // =======================================================
    // TEST 3: Apply 按钮状态正确
    // =======================================================
    console.log('\n--- 测试3: Apply 按钮状态测试 ---');

    // Part A: 不同 scheme tab 后，按钮显示"应用该主题"且未禁用
    const applyBtn = page.locator('button').filter({ hasText: /应用该主题|当前主题/ });
    const btnText1 = await applyBtn.textContent();
    const btnDisabled1 = await applyBtn.isDisabled();
    console.log(`  按钮文本: "${btnText1?.trim()}", disabled: ${btnDisabled1}`);

    if (btnText1?.trim() === '应用该主题') {
      result('不同 scheme tab 后按钮显示"应用该主题"', true);
    } else {
      result('不同 scheme tab 后按钮显示"应用该主题"', false, `实际: "${btnText1?.trim()}"`);
    }
    if (!btnDisabled1) {
      result('不同 scheme tab 后按钮未禁用', true);
    } else {
      result('不同 scheme tab 后按钮未禁用', false, '按钮被禁用了');
    }

    // Part B: 点击当前已应用的 scheme tab，按钮显示"当前主题"且禁用
    console.log(`  当前已应用 scheme: "${appliedBefore}"`);
    if (appliedBefore) {
      await page.locator('span').filter({ hasText: appliedBefore }).first().click();
      await page.waitForTimeout(500);

      const btnText2 = await applyBtn.textContent();
      const btnDisabled2 = await applyBtn.isDisabled();
      console.log(`  按钮文本: "${btnText2?.trim()}", disabled: ${btnDisabled2}`);

      if (btnText2?.trim() === '当前主题') {
        result('已应用 scheme tab 后按钮显示"当前主题"', true);
      } else {
        result('已应用 scheme tab 后按钮显示"当前主题"', false, `实际: "${btnText2?.trim()}"`);
      }
      if (btnDisabled2) {
        result('已应用 scheme tab 后按钮被禁用', true);
      } else {
        result('已应用 scheme tab 后按钮被禁用', false, '按钮未被禁用');
      }
    } else {
      result('已应用 scheme tab 查找', false, '未找到带下划线的 scheme tab');
    }

    // =======================================================
    // TEST 4: 点击 Apply 更新全局主题
    // =======================================================
    console.log('\n--- 测试4: 点击 Apply 更新全局主题 ---');

    // Click a different scheme tab first
    const applyTargetScheme = appliedBefore === '低饱和' ? '清新' : '夏日';
    console.log(`  点击 "${applyTargetScheme}" scheme tab...`);
    await page.locator('span').filter({ hasText: applyTargetScheme }).first().click();
    await page.waitForTimeout(500);

    const themeBeforeApply = await getThemePrimary();
    console.log(`  应用前 --theme-primary: ${themeBeforeApply}`);

    const applyBtnBefore = page.locator('button').filter({ hasText: '应用该主题' });
    const btnExists = await applyBtnBefore.count();
    if (btnExists > 0) {
      result('应用前按钮显示"应用该主题"', true);
    } else {
      result('应用前按钮显示"应用该主题"', false, '按钮不存在或文本不匹配');
    }

    // Click apply
    await applyBtnBefore.click();
    await page.waitForTimeout(600);

    const themeAfterApply = await getThemePrimary();
    console.log(`  应用后 --theme-primary: ${themeAfterApply}`);

    const themeChanged = themeBeforeApply !== themeAfterApply;
    result('点击 Apply 后 --theme-primary 已改变', themeChanged,
      themeChanged ? `从 ${themeBeforeApply} 变为 ${themeAfterApply}` : '值未改变');

    // Verify button now shows "当前主题" and is disabled
    const applyBtnAfter = page.locator('button').filter({ hasText: /应用该主题|当前主题/ });
    const btnTextFinal = await applyBtnAfter.textContent();
    const btnDisabledFinal = await applyBtnAfter.isDisabled();
    console.log(`  应用后按钮文本: "${btnTextFinal?.trim()}", disabled: ${btnDisabledFinal}`);

    if (btnTextFinal?.trim() === '当前主题') {
      result('应用后按钮显示"当前主题"', true);
    } else {
      result('应用后按钮显示"当前主题"', false, `实际: "${btnTextFinal?.trim()}"`);
    }
    if (btnDisabledFinal) {
      result('应用后按钮被禁用', true);
    } else {
      result('应用后按钮被禁用', false, '按钮未被禁用');
    }

  } catch (err) {
    console.error('测试异常:', err.message);
    result('测试执行', false, err.message);
  } finally {
    await browser.close();
  }

  // =======================================================
  // SUMMARY
  // =======================================================
  console.log('\n========================================');
  console.log('           测 试 结 果 汇 总');
  console.log('========================================');
  const passCount = results.filter(r => r.status === 'PASS').length;
  const failCount = results.filter(r => r.status === 'FAIL').length;
  for (const r of results) {
    const icon = r.status === 'PASS' ? '✅' : '❌';
    console.log(`${icon} ${r.name}${r.detail ? ' — ' + r.detail : ''}`);
  }
  console.log('----------------------------------------');
  console.log(`总计: ${results.length} 项, 通过: ${passCount}, 失败: ${failCount}`);
  console.log('========================================\n');

  process.exit(failCount > 0 ? 1 : 0);
})();