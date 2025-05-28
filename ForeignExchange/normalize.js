function normalizeRate({ code, name, buyRate, sellRate }) {
  return {
    code: code ? code.trim() : null,
    name: name ? name.trim() : null,
    buyRate: (typeof buyRate === "string" ? parseFloat(buyRate.replace(',', '.')) : buyRate) || 0,
    sellRate: (typeof sellRate === "string" ? parseFloat(sellRate.replace(',', '.')) : sellRate) || 0
  };
}
module.exports = { normalizeRate };
