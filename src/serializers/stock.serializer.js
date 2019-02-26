/** Methods */
const extractPrice = data => data[0].quote.latestPrice;

const extractCompanyLogoUrl = data => data[1].company_logo.url;

const extractLatestNewsUrl = data => data[2].latest_news[0].url;

const serialize = data => ({
  price: extractPrice(data),
  company_logo_url: extractCompanyLogoUrl(data),
  latest_news_url: extractLatestNewsUrl(data)
})

module.exports = {
  serialize
};
