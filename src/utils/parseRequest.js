/** Dependencies */
const url = require('url');

/** Methods */
const parseRequest = (req) => {
  let data = {};
  data.parsedUrl = url.parse(req.url, true);
  data.path = data.parsedUrl.pathname;
  data.method = req.method.toLocaleUpperCase();
  return data;
};

module.exports = parseRequest;