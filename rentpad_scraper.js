const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = 'https://www.rentpad.com.ph/long-term-rentals/makati?bedroom=0&sort=latest';

(async () => {
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);
    const listings = [];

    $('.property').each((i, el) => {
      const title = $(el).find('.property-title').text().trim();
      const price = $(el).find('.property-price').text().trim();
      const location = $(el).find('.property-location').text().trim();
      const img = $(el).find('img').attr('src');
      const link = 'https://www.rentpad.com.ph' + $(el).find('a').attr('href');

      if (/bedspace|shared|room/i.test(title) && location.toLowerCase().includes('makati')) {
        listings.push({ title, price, location, img, link });
      }
    });

    fs.writeFileSync('makati-bedspaces.json', JSON.stringify(listings, null, 2));
    console.log('✅ Scraped Rentpad and saved listings to makati-bedspaces.json');
  } catch (err) {
    console.error('❌ Scraper failed:', err.message);
  }
})();
