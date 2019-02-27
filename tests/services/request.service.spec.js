/** Dependencies */
const assert = require('assert');
const requestService = require('../../src/services/request.service');
const constants = require('../../config/constants');

async function testEmptyKey() {
  let context = "[REQUEST SERVICE]: When the key is empty";
  const expected = {
    status: 422,
    message: 'Key must be provided'
  };

  try {
    await requestService(null, 'https://google.com');
  } catch (actual) {
    assert.deepStrictEqual(actual, expected, `${context} \n✖ FAILED: Key must be provided.`);
    console.log(`${context} \n✔ SUCCEED: Service validates key existence`);
  }
}

async function testEmptyURL() {
  let context = "[REQUEST SERVICE]: When the url is empty";
  const expected = {
    status: 422,
    message: 'URL must be provided'
  };

  try {
    await requestService('RandomKey', undefined);
  } catch (actual) {
    assert.deepStrictEqual(actual, expected, `${context} \n✖ FAILED: URL must be provided.`);
    console.log(`${context} \n✔ SUCCEED: Service validates URL existence`);
  }
}

async function testResponseStructure() {
  let context = "[REQUEST SERVICE]: When params are valid";
  const key = 'RandomKey';
  const expected = [key];

  const actual = await requestService('RandomKey', `${constants.API_BASE_URL}/stock/aapl/logo`);
  assert.deepStrictEqual(Object.keys(actual), expected, `${context} \n✖ FAILED: Service must return a { [key]: Object } structure.`);
  console.log(`${context} \n✔ SUCCEED: Service returns the correct response structure`);
}

[testEmptyKey, testEmptyURL, testResponseStructure].forEach(fn => fn());
