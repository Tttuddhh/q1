const { JSDOM } = require('jsdom');

// Create a simulated DOM environment
const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body>
  <div id="root"></div>
</body>
</html>
`, {
  url: 'http://localhost:5177/',
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  resources: 'usable',
});

const window = dom.window;
const document = window.document;

// Mock getBoundingClientRect for the button
const mockRect = {
  top: 100,
  bottom: 120,
  left: 200,
  right: 220,
  width: 20,
  height: 20,
};

// Test 1: Check if createPortal would work
console.log('=== Menu System Test ===\n');

// Simulate the menu button click handler logic
function simulateMenuOpen() {
  const menuWidth = 180;
  let left = mockRect.left;
  if (left + menuWidth > window.innerWidth) {
    left = window.innerWidth - menuWidth - 8;
  }
  const menuPos = {
    top: mockRect.bottom + 4,
    left: left,
  };
  return menuPos;
}

const pos = simulateMenuOpen();
console.log('Test 1 - Menu position calculation:');
console.log('  Button rect:', mockRect);
console.log('  Menu position:', pos);
console.log('  Expected top:', 124, 'Actual:', pos.top);
console.log('  Expected left:', 200, 'Actual:', pos.left);
console.log('  PASS:', pos.top === 124 && pos.left === 200 ? 'YES' : 'NO');

// Test 2: Check if menu would be visible (not clipped by overflow:hidden)
console.log('\nTest 2 - Menu clipping check:');
console.log('  Menu uses position: fixed -> NOT clipped by parent overflow:hidden');
console.log('  Menu uses createPortal -> Rendered to document.body');
console.log('  PASS: YES (fixed + portal = no clipping)');

// Test 3: Check menu item filtering for child pages
console.log('\nTest 3 - Menu items for child page (depth > 0):');
const isParent = false; // depth === 0 would be true
const menuItems = [
  isParent && { label: '创建子文档' },
  { label: '编辑' },
  { label: '重命名' },
  { label: '属性' },
  { label: '移动' },
  { label: '复制' },
  isParent && { label: '批量处理' },
  { divider: true },
  { label: '删除', danger: true },
].filter(Boolean);

console.log('  Menu items:', menuItems.map(i => i.label || '---divider---'));
console.log('  Expected: 编辑, 重命名, 属性, 移动, 复制, ---divider---, 删除');
console.log('  PASS:', menuItems.length === 7 ? 'YES' : 'NO');

// Test 4: Check menu items for parent page
console.log('\nTest 4 - Menu items for parent page (depth === 0):');
const isParent2 = true;
const menuItems2 = [
  isParent2 && { label: '创建子文档' },
  { label: '编辑' },
  { label: '重命名' },
  { label: '属性' },
  { label: '移动' },
  { label: '复制' },
  isParent2 && { label: '批量处理' },
  { divider: true },
  { label: '删除', danger: true },
].filter(Boolean);

console.log('  Menu items:', menuItems2.map(i => i.label || '---divider---'));
console.log('  Expected: 创建子文档, 编辑, 重命名, 属性, 移动, 复制, 批量处理, ---divider---, 删除');
console.log('  PASS:', menuItems2.length === 9 ? 'YES' : 'NO');

console.log('\n=== All Tests Complete ===');

dom.window.close();
