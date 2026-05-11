const { JSDOM } = require('jsdom');

// Fetch the HTML from the dev server
fetch('http://localhost:5175/')
  .then(res => res.text())
  .then(html => {
    const dom = new JSDOM(html, {
      url: 'http://localhost:5175/',
      runScripts: 'dangerously',
      resources: 'usable',
      pretendToBeVisual: true,
    });

    const window = dom.window;

    // Wait for scripts to load
    setTimeout(() => {
      const root = window.document.getElementById('root');
      console.log('Root innerHTML length:', root.innerHTML.length);
      console.log('Root innerHTML (first 300 chars):', root.innerHTML.substring(0, 300));

      // Check for rendered elements
      console.log('Has aside:', !!root.querySelector('aside'));
      console.log('Has header:', !!root.querySelector('header'));
      console.log('Has any divs:', root.querySelectorAll('div').length > 0);

      dom.window.close();
    }, 5000);
  })
  .catch(err => {
    console.error('Error:', err.message);
  });
