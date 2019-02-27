/** Dependencies */
const https = require('https');
const StringDecoder = require('string_decoder').StringDecoder;

/** Constants */
const decoder = new StringDecoder('utf-8');

const doesNotExist = x => x === void 0 || x === null || !x.trim();

/** Methods */
const requestService = (key, url) => {
  return new Promise((resolve, reject) => {
    if(doesNotExist(key)) {
      return reject({ status: 422, message: 'Key must be provided' });
    }

    if(doesNotExist(url)) {
      return reject({ status: 422, message: 'URL must be provided' });
    }

    https.get(url, (res) => {
      let buffer = '';

      res.on('data', (data) => {
        buffer += decoder.write(data);
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ [key]: JSON.parse(buffer) });
        } else {
          reject({ status: res.statusCode, message: buffer });
        }
      });
    });
  });
};

module.exports = requestService