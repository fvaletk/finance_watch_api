/** Services */
const stockService = require('../services/stock.service');

/** Methods */
const areParamsEmpty = (params) => {
  return !Object.keys(params).length;
};

const stocksController = async (action, params) => {
  if (areParamsEmpty(params)) {
    throw { status: 400, payload: "Params can not be empty" }; 
  } else {
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
         throw { status: 404, payload: `Method ${action} does not exist in StocksController` };
    }
  }
};

module.exports = stocksController;