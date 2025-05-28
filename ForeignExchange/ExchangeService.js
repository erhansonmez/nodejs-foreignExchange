class ExchangeService {
  /**
   * @param {Array<ExchangeProvider>} providers Sırayla denenecek provider listesi
   */
  constructor(providers = []) {
    this.providers = providers;
  }

  /**
   * Sırayla providerları dener, ilk başarılıyı döndürür.
   * @returns {Promise<{source:string, rates:Array}>}
   */
  async getRates() {
    for (const provider of this.providers) {
      console.log(">>>>>> ExchangeService", provider.constructor.name);
      try {
        const rates = await provider.fetchRates();
        console.log(">>>>>> ExchangeService", rates.length);
        if (rates && rates.length > 0) {
          return { source: provider.constructor.name, rates };
        }
      } catch (err) { 
        console.log(">>>>>> ExchangeService ERROR");
        console.error(err);
      }
    }
    return { source: null, rates: [] };
  }
}

module.exports = ExchangeService;
