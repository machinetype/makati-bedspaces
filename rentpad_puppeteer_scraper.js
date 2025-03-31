const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://www.rentpad.com.ph/long-term-rentals/makati?bedroom=0&sort=latest', {
      waitUntil: 'domcontentloaded',
      timeout: 0
    });

    const listings = await page.evaluate(() => {
      const data = [];
      document.querySelectorAll('.property').forEach(card => {
        const title = card.querySelector('.property-title')?.innerText.trim();
        const price = card.querySelector('.property-price')?.innerText.trim();
        const location = card.querySelector('.property-location')?.innerText.trim();
        const img = card.querySelector('img')?.src;
        const link = card.querySelector('a')?.href;

        if (title && /bedspace|shared|room/i.test(title) && location?.toLowerCase().includes('makati')) {
          data.push({ title, price, location, img, link });
        }
      });
      return data;
    });

    await browser.close();

    fs.writeFileSync('makati-bedspaces.json', JSON.stringify(listings, null, 2));
    console.log(`✅ Scraped ${listings.length} listings from Rentpad`);
  } catch (err) {
    console.error('❌ Puppeteer scraper failed:', err.message);
  }
})();
