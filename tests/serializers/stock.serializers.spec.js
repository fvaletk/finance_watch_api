/** Dependencies */
const assert = require('assert')
const stockSerializer = require('../../src/serializers/stock.serializer');

function testEmptyData() {
  let context = "[STOCK SERIALIZER]: When the data is empty";
  const expected = {
    price: 'none',
    company_logo_url: 'none',
    latest_news_url: 'none'
  };

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
  assert.deepStrictEqual(actual, expected, `${context} \n✖ FAILED: Empty data must return properties with value of 'none'`);
  console.log(`${context} \n✔ SUCCEED: Empty data`);
}


function testInvalidData() {
  let context = "[STOCK SERIALIZER]: When the data is invalid";
  const expected = {
    price: 'none',
    company_logo_url: 'none',
    latest_news_url: 'none'
  };

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
  assert.deepStrictEqual(actual, expected, `${context} \n✖ FAILED: Invalid data must return properties with value of 'none'`);
  console.log(`${context} \n✔ SUCCEED: Invalid data`);
}

function testValidData() {
  let context = "[STOCK SERIALIZER]: When the data is valid";
  const expected = {
    price: 200,
    company_logo_url: 'http://somelink.com',
    latest_news_url: 'http://somelink.com'
  };

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
  assert.deepStrictEqual(actual, expected, `${context} \n✖ FAILED: Valid data must return properties`);
  console.log(`${context} \n✔ SUCCEED: Valid data`);
}


[testValidData, testInvalidData, testEmptyData].forEach(fn => fn());
