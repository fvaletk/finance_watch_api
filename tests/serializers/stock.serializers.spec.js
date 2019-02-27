/** Dependencies */
const assert = require('assert')
const stockSerializer = require('../../src/serializers/stock.serializer');

/** Variables */
let actual;
let expected;

console.log('-- RUNNING STOCK SERIALIZER TEST --');

/** Context: When the data is empty */
const emptyData = [
  { quote: '' },
  { company_logo: '' },
  { latest_news: '' },
];

expected = {
  price: 'none',
  company_logo_url: 'none',
  latest_news_url: 'none'
};

actual = stockSerializer.serialize(emptyData);

assert.deepStrictEqual(actual, expected, "✖ FAILED: Empty data must return properties with value of 'none'");

console.log('✔ SUCCEED: Empty data');

/** Context: When the data is invalid */
const invalidData = [
  { invalid_quote: '' },
  { invalid_company_logo: '' },
  { invalid_latest_news: '' },
];

expected = {
  price: 'none',
  company_logo_url: 'none',
  latest_news_url: 'none'
};

actual = stockSerializer.serialize(invalidData);

assert.deepStrictEqual(actual, expected, "✖ FAILED: Invalid data must return properties with value of 'none'");

console.log('✔ SUCCEED: Invalid data');

/** Context: When the data is valid */
const validData = [
  { quote: { 'latestPrice': 200 } },
  { company_logo: { 'url': 'http://somelink.com' } },
  { latest_news: [ { 'url': 'http://somelink.com' } ] },
];

expected = {
  price: 200,
  company_logo_url: 'http://somelink.com',
  latest_news_url: 'http://somelink.com'
};

actual = stockSerializer.serialize(validData);

assert.deepStrictEqual(actual, expected, '✖ FAILED: Valid data must return properties');

console.log('✔ SUCCEED: Valid data');