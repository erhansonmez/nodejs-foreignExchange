const rateFixRatio = 1.026;

function normalizeRate({ code, name, buyRate, sellRate }) {
  const val = {
    code: code ? code.trim() : null,
    name: name ? name.trim() : null,
    buyRate: (typeof buyRate === "string" ? parseFloat(buyRate.replace(',', '.')) : buyRate) || 0,
    sellRate: (typeof sellRate === "string" ? parseFloat(sellRate.replace(',', '.')) : sellRate) || 0
  };

  /*
  console.log(
    "code:"+code, 
    "sell_rate:"+val.sellRate, 
    "new_sell_rate:"+val.sellRate * rateFixRatio,
    "diff:"+((val.sellRate * rateFixRatio) - val.sellRate),
    "diff_rate:"+((((val.sellRate * rateFixRatio) - val.sellRate) / val.sellRate) * 100).toFixed(4)
  );
  */

  val.buyRate = val.buyRate * rateFixRatio;
  val.sellRate = val.sellRate * rateFixRatio;

  return val;
}
module.exports = { normalizeRate };
