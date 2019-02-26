/** Dependencies */
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    
  // Get the url and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g ,'');
  const myPath = "/"+path.replace(/^\/+|\/+$/g ,'');
  console.log("PATH", myPath);

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP method
  const method = req.method.toLocaleLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on("data", function(data){
    buffer += decoder.write(data);
  });
  req.on("end", function(){
    buffer += decoder.end();

    let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler
    let data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };

    chosenHandler(data, function(statusCode, payload){
      // Use the status code called back by the handler or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      
      // Use the payload called back by the handler or default to an empty object
      payload = typeof(statusCode) == 'object' ? payload : {};

      // Convert the payload to a string 
      const payloadString = JSON.stringify(payload);

      // return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request path
      console.log("Returning this response: ", statusCode, payloadString);
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Define the handlers
let handlers = {};

// Sample Handler
handlers.sample = function(data, callback){
  // Callback a http status code and a payload object
  callback(406, { 'name': 'sample handler' });
};

handlers.notFound = function(data, callback){
  // Callback a http status code and a payload object
  callback(404);
};

// Define a request router
const router = {
  'sample': handlers.sample
};