import { chromium } from 'playwright';

const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const errors = [];
const warnings = [];
const logs = [];

page.on('console', msg => {
  const text = msg.text();
  if (msg.type() === 'error') errors.push(text);
  else if (msg.type() === 'warning') warnings.push(text);
  else logs.push(text);
});

page.on('pageerror', err => errors.push(err.message));

await page.goto('http://localhost:5180/', { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(1000);

// Navigate to settings
await page.goto('http://localhost:5180/#/settings', { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(2000);

console.log('=== ERRORS ===');
for (const e of errors) console.log(e);
if (errors.length === 0) console.log('(none)');

console.log('\n=== WARNINGS ===');
for (const w of warnings) console.log(w);
if (warnings.length === 0) console.log('(none)');

console.log(`\n=== LOGS (${logs.length} total) ===`);
for (const l of logs.slice(0, 50)) console.log(l);
if (logs.length > 50) console.log(`... and ${logs.length - 50} more logs`);

// Now pixel-level animation capture
const carousel = page.locator('[style*="overflow: hidden"]').filter({ has: page.locator('button') }).last();
const leftBtn = carousel.locator('button').first();
const rightBtn = carousel.locator('button').last();

// Get all variant boxes
async function getBoxPositions() {
  return await page.evaluate(() => {
    const container = document.querySelector('[style*="left: 50%"][style*="transform: translate(-50%, -50%)"]');
    if (!container) return [];
    const boxes = container.querySelectorAll('div[style*="position: absolute"]');
    return Array.from(boxes).map(b => {
      const rect = b.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    });
  });
}

// Test LEFT arrow animation
console.log('\n=== LEFT ARROW ANIMATION CAPTURE ===');
const initialPositions = await getBoxPositions();
console.log('Initial positions:', JSON.stringify(initialPositions));

// Click left arrow and capture frames
await leftBtn.click();

const captureTimes = [0, 16, 33, 50, 66, 83, 100, 150, 200, 250, 300, 350, 400, 500];
for (const t of captureTimes) {
  await page.waitForTimeout(t === 0 ? 1 : Math.max(1, t - (captureTimes[captureTimes.indexOf(t) - 1] || 0)));
  const positions = await getBoxPositions();
  const displacements = positions.map((p, i) => {
    if (initialPositions[i]) return Math.round(p.x - initialPositions[i].x);
    return 0;
  });
  console.log(`t=${t}ms displacements:`, displacements);
}

await page.waitForTimeout(600);

// Test RIGHT arrow animation
console.log('\n=== RIGHT ARROW ANIMATION CAPTURE ===');
const posAfterLeft = await getBoxPositions();
console.log('Positions after left:', JSON.stringify(posAfterLeft));

await rightBtn.click();
for (const t of captureTimes) {
  await page.waitForTimeout(t === 0 ? 1 : Math.max(1, t - (captureTimes[captureTimes.indexOf(t) - 1] || 0)));
  const positions = await getBoxPositions();
  const displacements = positions.map((p, i) => {
    if (posAfterLeft[i]) return Math.round(p.x - posAfterLeft[i].x);
    return 0;
  });
  console.log(`t=${t}ms displacements:`, displacements);
}

await page.waitForTimeout(600);

// Check if there are render errors with variant keys
console.log('\n=== CHECKING DOM STATE ===');
const domState = await page.evaluate(() => {
  const container = document.querySelector('[style*="left: 50%"][style*="transform: translate(-50%, -50%)"]');
  if (!container) return 'No container found';
  const boxes = container.querySelectorAll('div[style*="position: absolute"]');
  return {
    boxCount: boxes.length,
    boxBgColors: Array.from(boxes).map(b => b.style.background || b.getAttribute('style')),
  };
});
console.log('DOM State:', JSON.stringify(domState));

// Check CSS variable
const cssVar = await page.evaluate(() => {
  return getComputedStyle(document.documentElement).getPropertyValue('--theme-primary');
});
console.log('\n--theme-primary:', cssVar);

await browser.close();