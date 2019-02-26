/** Controllers */
const stocksController = require('../controllers/stocks.controller');

/** Routes */
const stocks = [
  {
    method: 'GET',
    controller: stocksController,
    action: 'show',
    pathPattern: '\/stocks\/[a-z]+'
  }
];

module.exports = {stocks: stocks};
