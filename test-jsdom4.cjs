const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'dist', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

const dom = new JSDOM(html, {
  url: 'http://localhost:4173/',
  runScripts: 'dangerously',
  pretendToBeVisual: true,
});

const window = dom.window;

// Read and execute the JS file directly
const jsPath = path.join(__dirname, 'dist', 'assets', 'index-DTlmONFF.js');
const jsContent = fs.readFileSync(jsPath, 'utf-8');

console.log('JS file size:', jsContent.length);

// Execute the script
try {
  window.eval(jsContent);
  console.log('Script executed successfully');
} catch (e) {
  console.error('Script execution error:', e.message);
  console.error('Stack:', e.stack);
}

setTimeout(() => {
  const root = window.document.getElementById('root');
  console.log('\n=== After execution ===');
  console.log('Root innerHTML length:', root.innerHTML.length);
  console.log('Root innerHTML (first 500 chars):', root.innerHTML.substring(0, 500));
  
  dom.window.close();
}, 2000);
