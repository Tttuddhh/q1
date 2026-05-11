const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'dist', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

const dom = new JSDOM(html, {
  url: 'http://localhost:4173/',
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
});

const window = dom.window;

// Capture ALL console output
const originalLog = window.console.log;
const originalError = window.console.error;
const originalWarn = window.console.warn;

window.console.log = function(...args) {
  originalLog.apply(window.console, args);
  console.log('[JS LOG]', ...args);
};

window.console.error = function(...args) {
  originalError.apply(window.console, args);
  console.error('[JS ERROR]', ...args);
};

window.console.warn = function(...args) {
  originalWarn.apply(window.console, args);
  console.warn('[JS WARN]', ...args);
};

// Capture unhandled errors
window.addEventListener('error', (e) => {
  console.error('[WINDOW ERROR]', e.message, e.stack);
});

// Also capture promise rejections
window.addEventListener('unhandledrejection', (e) => {
  console.error('[UNHANDLED REJECTION]', e.reason);
});

setTimeout(() => {
  const root = window.document.getElementById('root');
  console.log('\n=== DOM Check ===');
  console.log('Root innerHTML length:', root.innerHTML.length);
  console.log('Root innerHTML (first 200 chars):', root.innerHTML.substring(0, 200));
  
  // Check if React is loaded
  console.log('\n=== React Check ===');
  console.log('window.React:', typeof window.React);
  console.log('window.ReactDOM:', typeof window.ReactDOM);
  
  // Check for any global errors
  console.log('\n=== Global Errors ===');
  console.log('window.onerror:', window.onerror);
  
  dom.window.close();
}, 5000);
