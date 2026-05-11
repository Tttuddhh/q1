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

// Capture console logs and errors
const logs = [];
window.console.log = (...args) => logs.push(['log', ...args]);
window.console.error = (...args) => logs.push(['error', ...args]);
window.console.warn = (...args) => logs.push(['warn', ...args]);

// Capture unhandled errors
window.addEventListener('error', (e) => {
  logs.push(['window-error', e.message, e.stack]);
});

setTimeout(() => {
  console.log('=== Console Logs ===');
  logs.forEach(([type, ...args]) => {
    console.log(`[${type}]`, ...args);
  });
  
  const root = window.document.getElementById('root');
  console.log('\n=== DOM ===');
  console.log('Root HTML:', root.innerHTML.substring(0, 1000));
  
  dom.window.close();
}, 3000);
