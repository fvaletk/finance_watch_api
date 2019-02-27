/** Dependencies */
const url = require('url');
const { resolve } = require('path');
const { appendFile } = require('fs');

/** Constants */
const LOG_FILE = resolve(__dirname, '..' , '..','log.txt');

/** Utils */
const parseRequest = require('../utils/parseRequest');
const parseAndFormatDate = require('../utils/parseAndFormatDate');

/** Methods */
const formatRequestData = (req, status) => {
  const data = parseRequest(req);
  const currentStatus = (status => 200) && (status < 300) ? "Success" : "Failed";
  return `

[${data.method}] [${data.path}] [${parseAndFormatDate()}] [${currentStatus}]`;
};

const appendToFile = (fileData) => appendFile(LOG_FILE, fileData, {
  encoding: 'utf-8'
}, () => {});

const logger = (req, status) => {
  appendToFile(formatRequestData(req, status))
};

module.exports = logger;
