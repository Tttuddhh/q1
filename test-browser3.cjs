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

// Check if React is loaded
setTimeout(() => {
  console.log('React loaded:', typeof window.React !== 'undefined');
  console.log('ReactDOM loaded:', typeof window.ReactDOM !== 'undefined');
  
  // Try to manually render
  try {
    const script = window.document.createElement('script');
    script.textContent = `
      try {
        const root = document.getElementById('root');
        root.innerHTML = '<div>TEST CONTENT</div>';
        console.log('Manual render OK');
      } catch(e) {
        console.error('Manual render failed:', e.message);
      }
    `;
    window.document.body.appendChild(script);
  } catch(e) {
    console.error('Script injection failed:', e.message);
  }
  
  setTimeout(() => {
    const root = window.document.getElementById('root');
    console.log('Root after manual render:', root.innerHTML);
    dom.window.close();
  }, 1000);
}, 3000);
