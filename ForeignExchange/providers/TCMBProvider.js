const axios = require('axios');
const xml2js = require('xml2js');
const ExchangeProvider = require('../ExchangeProvider');
const { normalizeRate } = require('../normalize');

class TCMBProvider extends ExchangeProvider {
  async fetchRates() {
    const url = 'https://www.tcmb.gov.tr/kurlar/today.xml';
    const response = await axios.get(url);
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);
    const currencies = result.Tarih_Date.Currency;
    const rates = currencies.map(cur => {
      const code = cur.$.CurrencyCode;
      const name = cur.Isim?.[0] || null;
      const buyRate = cur.ForexBuying?.[0] || null;
      const sellRate = cur.ForexSelling?.[0] || null;
      return normalizeRate({ code, name, buyRate, sellRate });
    });
    return rates.filter(r => r.code && !isNaN(r.buyRate) && !isNaN(r.sellRate));
  }
}

module.exports = TCMBProvider;
