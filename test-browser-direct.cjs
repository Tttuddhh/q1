const { JSDOM } = require('jsdom');

async function test() {
  try {
    // Fetch HTML
    const htmlRes = await fetch('http://localhost:5175/');
    const html = await htmlRes.text();

    const dom = new JSDOM(html, {
      url: 'http://localhost:5175/',
      runScripts: 'dangerously',
      pretendToBeVisual: true,
    });

    const window = dom.window;

    // Fetch and execute the main script
    const scriptRes = await fetch('http://localhost:5175/src/main.tsx?t=1778338969853');
    const scriptContent = await scriptRes.text();

    console.log('Script fetched, length:', scriptContent.length);

    try {
      window.eval(scriptContent);
      console.log('Script executed');
    } catch (e) {
      console.error('Script error:', e.message);
    }

    // Wait for React to render
    await new Promise(r => setTimeout(r, 3000));

    const root = window.document.getElementById('root');
    console.log('Root innerHTML length:', root.innerHTML.length);
    console.log('Root innerHTML (first 300 chars):', root.innerHTML.substring(0, 300));

    dom.window.close();
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
