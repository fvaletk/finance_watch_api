/** Constants */
const API_BASE_URL = require('../../config/constants').API_BASE_URL;

/** Serializers */
const stockSerializer = require('../serializers/stock.serializer');

/** Services */
const requestService = require('./request.service');

/** Methods */
const fetchQuote = (stockSymbol) => {
  const url = `${API_BASE_URL}/stock/${stockSymbol}/quote`;
  return requestService('quote', url);
};

const fetchCompanyLogo = (stockSymbol) => {
  const url = `${API_BASE_URL}/stock/${stockSymbol}/logos`;
  return requestService('company_logo', url);
};

const fetchLatestNews = (stockSymbol) => {
  const url = `${API_BASE_URL}/stock/${stockSymbol}/news/lasts/1`;
  return requestService('latest_news', url);
};

const fetchInformation = (stockSymbol) => {
  return Promise.all([
          fetchQuote(stockSymbol),
          fetchCompanyLogo(stockSymbol),
          fetchLatestNews(stockSymbol)
        ])
          .then(stockSerializer.serialize)
          .catch((error) => {
            throw error;
          })
};

module.exports = { fetchInformation: fetchInformation };