const assert = require('assert');

const requestService = require('../../src/services/request.service');
const constants = require('../../config/constants');

console.log('-- RUNNING REQUEST SERVICE TEST --');

async function testEmptyKey() {
  const expected = {
    status: 422,
    message: 'Key must be provided'
  };

  try {
    await requestService(null, 'https://google.com');
  } catch (actual) {
    assert.deepStrictEqual(actual, expected, '✖ FAILED: Key must be provided.');
    console.log('✔ SUCCEED: Service validates key existence');
  }
}

async function testEmptyURL() {
  const expected = {
    status: 422,
    message: 'URL must be provided'
  };

  try {
    await requestService('RandomKey', undefined);
  } catch (actual) {
    assert.deepStrictEqual(actual, expected, '✖ FAILED: URL must be provided.');
    console.log('✔ SUCCEED: Service validates URL existence');
  }
}

async function testResponseStructure() {
  const key = 'RandomKey';
  const expected = [key];

  const actual = await requestService('RandomKey', `${constants.API_BASE_URL}/stock/aapl/logo`);
  assert.deepStrictEqual(Object.keys(actual), expected, '✖ FAILED: Service must return a { [key]: Object } structure.');
  console.log('✔ SUCCEED: Service returns the correct response structure');
}

[testEmptyKey, testEmptyURL, testResponseStructure].forEach(fn => fn());
