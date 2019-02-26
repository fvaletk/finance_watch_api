/** Services */
const stockService = require('../services/stock.service');

/** Methods */
const stocksController = (action, params) => {
  switch (action) {
    case "show":
      const symbol = params.path.split('/')[2];
      return stockService.fetchInformation(symbol)
              .then(values => { return { status: 200, payload: values } })
              .catch(error => {
                throw { status: error.status, payload: error.message
              }})
      
    default:
      return new Promise.resolve({ status: 404, error: "Method "+action+" does not exist in StocksController" })
  }
};

module.exports = stocksController;