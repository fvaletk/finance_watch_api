/** Dependencies */
const assert = require('assert')
const stocksController = require('../../src/controllers/stocks.controller');

async function testInvalidAction() {
  let context = "[STOCKS CONTROLLER]: When the action is invalid";
  const expected = {
    status: 404,
    payload: "Method wrong does not exist in StocksController"
  }

  try {
    await stocksController('wrong', {
      method: 'GET'
    });
  } catch (actual) {
    assert.deepStrictEqual(actual, expected, `${context} \n✖ FAILED: Invalid action must return error status and message`);
    console.log(`${context} \n✔ SUCCEED: Default error message was returned`);
  }
};

async function testEmptyParams() {
  let context = "[STOCKS CONTROLLER]: When the params are invalid";
  const expected = {
    status: 400,
    payload: 'Params can not be empty'
  }

  try {
    await stocksController('show', {});
  } catch (actual) {
    assert.deepStrictEqual(actual, expected, `${context} \n✖ FAILED: Empty params must return error status and message`);
    console.log(`${context} \n✔ SUCCEED: Default empty params error message was returned`);
  }
};

async function testFailedRequest() {
  let context = "[STOCKS CONTROLLER]: When the request fails";
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
    assert.deepStrictEqual(actual, expected, `${context} \n✖ FAILED: Failed request must return error status and message`);
    console.log(`${context} \n✔ SUCCEED: Request error message was returned`);
  }
};

async function testSucceededRequest() {
  let context = "[STOCKS CONTROLLER]: When the request succeeds";
  const expected = {
    status: 200,
    payload: {}
  }

  const params = {
    method: 'GET',
    path: '/stocks/aapl'
  }
  const actual = await stocksController('show', params);
  assert.deepStrictEqual(Object.keys(actual), Object.keys(expected), `${context} \n✖ FAILED: Success request must return error status and message`);
  console.log(`${context} \n✔ SUCCEED: Sucess message was returned`);
};

[testInvalidAction, testEmptyParams, testFailedRequest, testSucceededRequest].forEach(fn => fn());
