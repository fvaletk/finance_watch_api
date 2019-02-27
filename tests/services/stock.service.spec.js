/** Dependencies */
const assert = require('assert')
const stockService = require('../../src/services/stock.service');

async function testInvalidSymbol() {
  let context = "[STOCK SERVICE]: When the symbol is invalid";
  const expected = {
    status: 404,
    message: 'Unknown symbol'
  }

  try {
    await stockService.fetchInformation('appln');
  } catch (actual) {
    assert.deepStrictEqual(actual, expected, `${context} \n✖ FAILED: Invalid symbol must return error status and message`);
    console.log(`${context} \n✔ SUCCEED: Default unknow symbol error message was returned`);
  }
};

async function testValidSymbol() {
  let context = "[STOCK SERVICE]: When the symbol is valid";
  const expected = {
    price: '',
    company_logo_url: '',
    latest_news_url: ''
  }

  const actual = await stockService.fetchInformation('aapl');
  assert.deepStrictEqual(Object.keys(actual), Object.keys(expected), `${context} \n✖ FAILED: Valid symbol must return status and message`);
  console.log(`${context} \n✔ SUCCEED: Response was returned`);
};

[testInvalidSymbol, testValidSymbol].forEach(fn => fn());
