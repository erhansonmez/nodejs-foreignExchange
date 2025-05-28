const axios = require('axios');
const cheerio = require('cheerio');
const ExchangeProvider = require('../ExchangeProvider');
const { normalizeRate } = require('../normalize');

class IsbankProvider extends ExchangeProvider {
  async fetchRates() {
    const url = 'https://www.isbank.com.tr/en/foreign-exchange-rates';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const rates = [];
    $('table tr').each((i, el) => {
      const tds = $(el).find('td');
      if (tds.length >= 3) {
        const currencyRaw = $(tds[0]).text().trim();
        const currencyMatch = currencyRaw.match(/^([A-Z]{3})/);
        const code = currencyMatch ? currencyMatch[1] : currencyRaw.trim();
        const name = currencyRaw.replace(/^[A-Z]{3}\s*/, '').replace(/\s+/g, ' ').trim();
        const buyRate = $(tds[1]).text().trim();
        const sellRate = $(tds[2]).text().trim();
        if (code === "FC" || buyRate.toLowerCase().includes('buying') || sellRate.toLowerCase().includes('selling')) return;
        rates.push(normalizeRate({ code, name, buyRate, sellRate }));
      }
    });
    return rates.filter(r => r.code && !isNaN(r.buyRate) && !isNaN(r.sellRate));
  }
}

module.exports = IsbankProvider;
