/** Dependencies */
const assert = require('assert')
const stockSerializer = require('../../src/serializers/stock.serializer');

console.log('-- RUNNING STOCK SERIALIZER TEST --');

function testEmptyData() {
  const expected = {
    price: 'none',
    company_logo_url: 'none',
    latest_news_url: 'none'
  };

  /** Context: When the data is empty */
  const emptyData = [{
      quote: ''
    },
    {
      company_logo: ''
    },
    {
      latest_news: ''
    },
  ];

  const actual = stockSerializer.serialize(emptyData);

  assert.deepStrictEqual(actual, expected, "✖ FAILED: Empty data must return properties with value of 'none'");
  console.log('✔ SUCCEED: Empty data');
}


function testInvalidData() {
  const expected = {
    price: 'none',
    company_logo_url: 'none',
    latest_news_url: 'none'
  };

  /** Context: When the data is invalid */
  const invalidData = [{
      invalid_quote: ''
    },
    {
      invalid_company_logo: ''
    },
    {
      invalid_latest_news: ''
    },
  ];

  const actual = stockSerializer.serialize(invalidData);

  assert.deepStrictEqual(actual, expected, "✖ FAILED: Invalid data must return properties with value of 'none'");
  console.log('✔ SUCCEED: Invalid data');
}

function testValidData() {
  const expected = {
    price: 200,
    company_logo_url: 'http://somelink.com',
    latest_news_url: 'http://somelink.com'
  };

  /** Context: When the data is valid */
  const validData = [{
      quote: {
        'latestPrice': 200
      }
    },
    {
      company_logo: {
        'url': 'http://somelink.com'
      }
    },
    {
      latest_news: [{
        'url': 'http://somelink.com'
      }]
    },
  ];

  const actual = stockSerializer.serialize(validData);

  assert.deepStrictEqual(actual, expected, '✖ FAILED: Valid data must return properties');
  console.log('✔ SUCCEED: Valid data');
}


[testValidData, testInvalidData, testEmptyData].forEach(fn => fn());
