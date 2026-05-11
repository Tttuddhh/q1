const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Read the built HTML
const htmlPath = path.join(__dirname, 'dist', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

// Create a virtual DOM
const dom = new JSDOM(html, {
  url: 'http://localhost:4173/',
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
});

const window = dom.window;
const document = window.document;

// Wait for scripts to load
setTimeout(() => {
  const root = document.getElementById('root');
  console.log('Root innerHTML length:', root.innerHTML.length);
  console.log('Root innerHTML:', root.innerHTML.substring(0, 500));
  
  // Check if there are any elements rendered
  const allElements = document.querySelectorAll('*');
  console.log('Total elements in body:', allElements.length);
  
  // Check for common elements
  console.log('Has header:', !!document.querySelector('header'));
  console.log('Has aside:', !!document.querySelector('aside'));
  console.log('Has main:', !!document.querySelector('main'));
  
  // Check console errors
  console.log('Window errors:', window.errors || []);
  
  dom.window.close();
}, 3000);
