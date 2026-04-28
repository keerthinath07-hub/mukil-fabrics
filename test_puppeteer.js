const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log(`[PAGE ERROR] ${err.message}`);
  });

  await page.goto('http://localhost:8080/admin.html', { waitUntil: 'networkidle0' });
  
  await page.click('#addProductBtn');
  console.log("Clicked button.");
  
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
})();
