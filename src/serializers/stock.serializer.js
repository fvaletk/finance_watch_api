const DEFAULT_VALUE = 'none';

const noneIfUndefined = x => x === void 0 ? DEFAULT_VALUE : x;

/** Methods */
const extractPrice = data => {
  try {
    return noneIfUndefined(data[0].quote.latestPrice);
  } catch (err) {
    return DEFAULT_VALUE;
  }
}

const extractCompanyLogoUrl = data => {
  try {
    return noneIfUndefined(data[1].company_logo.url);
  } catch (err) {
    return DEFAULT_VALUE;
  }
}

const extractLatestNewsUrl = data => {
  try {
    return noneIfUndefined(data[2].latest_news[0].url);
  } catch (err) {
    return DEFAULT_VALUE;
  }
}

const serialize = data => ({
  price: extractPrice(data),
  company_logo_url: extractCompanyLogoUrl(data),
  latest_news_url: extractLatestNewsUrl(data)
})

module.exports = {
  serialize
};
