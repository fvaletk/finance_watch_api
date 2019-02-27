/** Dependencies */
const routesCollections = require('./routes');

/** Utils */
const parseRequest = require('../utils/parseRequest');

/** Methods */
const routeMatches = (receivedRoute, currentRoute) => {
  let pathMatches = receivedRoute.path.match(currentRoute.pathPattern);
  let methodMatches = receivedRoute.method == currentRoute.method;
  return pathMatches && methodMatches;
};

const getRoute = (requestData) => {
  let route = undefined;
  Object.entries(routesCollections).forEach(([ key, routes ]) => {
    for(let i = 0; i < routes.length; i++) {
      if (routeMatches(requestData, routes[i])) {
        route = routes[i];
        break;
      }
    };
  });
  return route;
};

const executeController = async (route, requestData, callback) => {
  try {
    const response = await route.controller(route.action, requestData);
    callback(response.status, response.payload);
  } catch(error) {
    callback(error.status, { "error": error.payload });    
  }
};

const handleRequest = (req, callback) => {
  const requestData = parseRequest(req);
  const route = getRoute(requestData);
  if (route) {
    try {
      executeController(route, requestData, callback);
    } catch(error) {
      callback(500, { "error": "Sorry, something went wrong on our side" });  
    }
  } else {
    callback(404, { "error": "Route does not exist" });
  }
};

module.exports = { handleRequest: handleRequest };