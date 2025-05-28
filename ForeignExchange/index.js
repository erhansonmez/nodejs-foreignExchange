try {
  if (typeof ReadableStream === 'undefined') {
    global.ReadableStream = require('stream/web').ReadableStream;
  }
} catch {}

const IsbankProvider = require('./providers/IsbankProvider');
const TCMBProvider = require('./providers/TCMBProvider');
const ExchangeService = require('./ExchangeService');

const service = new ExchangeService([
  new IsbankProvider(),
  new TCMBProvider()
]);

module.exports = service;
