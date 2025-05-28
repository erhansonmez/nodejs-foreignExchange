class ExchangeProvider {
  /**
   * Her subclass fetchRates metodunu override etmeli!
   * @returns {Promise<Array<{code:string, name:string, buyRate:number, sellRate:number}>>}
   */
  async fetchRates() {
    throw new Error('fetchRates() implement edilmeli');
  }
}
module.exports = ExchangeProvider;
