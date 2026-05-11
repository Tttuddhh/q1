const { JSDOM } = require('jsdom');

async function test() {
  try {
    const url = 'http://localhost:5176/';

    // Fetch HTML
    const htmlRes = await fetch(url);
    const html = await htmlRes.text();

    const dom = new JSDOM(html, {
      url: url,
      runScripts: 'dangerously',
      pretendToBeVisual: true,
    });

    const window = dom.window;

    // Fetch and execute main script
    const scriptUrl = url + 'src/main.tsx?t=' + Date.now();
    const scriptRes = await fetch(scriptUrl);
    const scriptContent = await scriptRes.text();

    console.log('Script fetched, length:', scriptContent.length);

    try {
      window.eval(scriptContent);
      console.log('Script executed');
    } catch (e) {
      console.error('Script error:', e.message);
    }

    // Wait
    await new Promise(r => setTimeout(r, 3000));

    const root = window.document.getElementById('root');
    console.log('Root innerHTML length:', root.innerHTML.length);
    console.log('Has content:', root.innerHTML.length > 0);

    dom.window.close();
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
