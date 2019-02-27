/** Dependencies */
const assert = require('assert')
const stockService = require('../../src/services/stock.service');

console.log('-- RUNNING STOCK SERVICE TEST --');

/** Context: When the symbol is invalid */
async function testInvalidSymbol() {
  const expected = {
    status: 404,
    message: 'Unknown symbol'
  }

  try {
    await stockService.fetchInformation('appln');
  } catch (actual) {
    assert.deepStrictEqual(actual, expected, "✖ FAILED: Invalid symbol must return error status and message");
    console.log('✔ SUCCEED: Default unknow symbol error message was returned');
  }
};

/** Context: When the symbol is valid */
async function testValidSymbol() {
  const expected = {
    price: '',
    company_logo_url: '',
    latest_news_url: ''
  }

  const actual = await stockService.fetchInformation('aapl');
  assert.deepStrictEqual(Object.keys(actual), Object.keys(expected), "✖ FAILED: Valid symbol must return status and message");
  console.log('✔ SUCCEED: Response was returned');
};

[testInvalidSymbol, testValidSymbol].forEach(fn => fn());
