/** Services */
const stockService = require('../services/stock.service');

/** Methods */
const stocksController = async (action, params) => {
  switch (action) {
    case "show":
      const symbol = params.path.split('/')[2];
      try {
        const response = await stockService.fetchInformation(symbol);
        return { status: 200, payload: response }; 
      } catch(error) {
        throw { status: error.status, payload: error.message };
      }
      
    default:
      return new Promise.resolve({ status: 404, error: "Method "+action+" does not exist in StocksController" })
  }
};

module.exports = stocksController;