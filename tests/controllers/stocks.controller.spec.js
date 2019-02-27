/** Dependencies */
const assert = require('assert')
const stocksController = require('../../src/controllers/stocks.controller');

console.log('-- RUNNING STOCKS CONTROLLER TEST --');

/** Context: When the action is invalid */
async function testInvalidAction() {
  const expected = {
    status: 404,
    payload: "Method wrong does not exist in StocksController"
  }

  try {
    await stocksController('wrong', {
      method: 'GET'
    });
  } catch (actual) {
    assert.deepStrictEqual(actual, expected, "✖ FAILED: Invalid action must return error status and message");
    console.log('✔ SUCCEED: Default error message was returned');
  }
};

/** Context: When the params are invalid */
async function testEmptyParams() {
  const expected = {
    status: 400,
    payload: 'Params can not be empty'
  }

  try {
    await stocksController('show', {});
  } catch (actual) {
    assert.deepStrictEqual(actual, expected, "✖ FAILED: Empty params must return error status and message");
    console.log('✔ SUCCEED: Default empty params error message was returned');
  }
};

/** Context: When the request fails */
async function testFailedRequest() {
  const expected = {
    status: 404,
    payload: 'Unknown symbol'
  }

  const params = {
    method: 'GET',
    path: '/stocks/aapln'
  }

  try {
    await stocksController('show', params);
  } catch (actual) {
    assert.deepStrictEqual(actual, expected, "✖ FAILED: Failed request must return error status and message");
    console.log('✔ SUCCEED: Request error message was returned');
  }
};

/** Context: When the request succeeds */
async function testSucceededRequest() {
  const expected = {
    status: 200,
    payload: {}
  }

  const params = {
    method: 'GET',
    path: '/stocks/aapl'
  }

  const actual = await stocksController('show', params);

  assert.deepStrictEqual(Object.keys(actual), Object.keys(expected), "✖ FAILED: Success request must return error status and message");
  console.log('✔ SUCCEED: Sucess message was returned');
};

[testInvalidAction, testEmptyParams, testFailedRequest, testSucceededRequest].forEach(fn => fn());
