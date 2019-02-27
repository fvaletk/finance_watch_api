/** Dependencies */
const assert = require('assert')
const stocksController = require('../../src/controllers/stocks.controller');

console.log('-- RUNNING STOCKS CONTROLLER TEST --');

/** Context: When the action is invalid */
function testInvalidAction() {
  let expected;
  let actualPromise;

  expected = {
    status: 404,
    payload: "Method wrong does not exist in StocksController"
  }

  actualPromise = stocksController('wrong', {
    method: 'GET'
  });

  actualPromise.catch(actual => {
    assert.deepStrictEqual(actual, expected, "✖ FAILED: Invalid action must return error status and message");

    console.log('✔ SUCCEED: Default error message was returned');
  });
}

/** Context: When the params are invalid */
function testEmptyParams() {
  let actualPromise;
  let expected;

  expected = {
    status: 400,
    payload: 'Params can not be empty'
  }

  actualPromise = stocksController('show', {});

  actualPromise.catch(actual => {
    assert.deepStrictEqual(actual, expected, "✖ FAILED: Empty params must return error status and message");

    console.log('✔ SUCCEED: Default empty params error message was returned');
  });
}

/** Context: When the request fails */
function failedRequest() {
  let expected;
  let params;
  let actualPromise;

  expected = {
    status: 404,
    payload: 'Unknown symbol'
  }

  params = {
    method: 'GET',
    path: '/stocks/aapln'
  }

  actualPromise = stocksController('show', params);

  actualPromise.catch(actual => {
    assert.deepStrictEqual(actual, expected, "✖ FAILED: Failed request must return error status and message");

    console.log('✔ SUCCEED: Request error message was returned');
  });
}

/** Context: When the request succeeds */
function succeededRequest() {
  let expected;
  let params;
  let actualPromise;

  expected = {
    status: 200,
    payload: {}
  }

  params = {
    method: 'GET',
    path: '/stocks/aapl'
  }

  actualPromise = stocksController('show', params);

  actualPromise.then(actual => {
    assert.deepStrictEqual(Object.keys(actual), Object.keys(expected), "✖ FAILED: Success request must return error status and message");

    console.log('✔ SUCCEED: Sucess message was returned');
  });
}

[testInvalidAction, testEmptyParams, failedRequest, succeededRequest].map(fn => fn());