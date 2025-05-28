const exchangeService = require('./ForeignExchange');

(async () => {
  try {
    const result = await exchangeService.getRates();
      console.log("getRates updated!", result);
    } else {
      console.error('Hiçbir kaynaktan veri alınamadı.');
    }
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
})();
