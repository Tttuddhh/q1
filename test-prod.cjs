const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

async function test() {
  try {
    // Fetch HTML from production server
    const htmlRes = await fetch('http://localhost:4173/');
    const html = await htmlRes.text();

    const dom = new JSDOM(html, {
      url: 'http://localhost:4173/',
      runScripts: 'dangerously',
      pretendToBeVisual: true,
    });

    const window = dom.window;

    // Fetch and execute the main JS file
    const jsRes = await fetch('http://localhost:4173/assets/index-C7xyo74U.js');
    const jsContent = await jsRes.text();

    console.log('JS fetched, length:', jsContent.length);

    try {
      window.eval(jsContent);
      console.log('JS executed successfully');
    } catch (e) {
      console.error('JS execution error:', e.message);
    }

    // Wait for React to render
    await new Promise(r => setTimeout(r, 3000));

    const root = window.document.getElementById('root');
    console.log('Root innerHTML length:', root.innerHTML.length);
    console.log('Root innerHTML (first 500 chars):', root.innerHTML.substring(0, 500));

    // Check for key elements
    console.log('Has aside (sidebar):', !!root.querySelector('aside'));
    console.log('Has header:', !!root.querySelector('header'));
    console.log('Has divs:', root.querySelectorAll('div').length);

    dom.window.close();
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
