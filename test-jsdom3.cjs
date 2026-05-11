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

// Check if script tag exists
const scripts = window.document.querySelectorAll('script');
console.log('Number of scripts:', scripts.length);
scripts.forEach((s, i) => {
  console.log(`Script ${i}:`, s.src || 'inline');
});

// Wait longer for script to load
setTimeout(() => {
  console.log('\n=== After 10 seconds ===');
  console.log('Root innerHTML length:', window.document.getElementById('root').innerHTML.length);
  
  // Check if the script file was actually loaded
  const jsPath = path.join(__dirname, 'dist', 'assets', 'index-DTlmONFF.js');
  console.log('JS file exists:', fs.existsSync(jsPath));
  console.log('JS file size:', fs.statSync(jsPath).size);
  
  dom.window.close();
}, 10000);
