// this is just a shared library for the microservices
'use strict';

const {URL} = require('url');

const shared = {};

// converts a string to an interoperable, machine usable token.
// inspired by machine names in Drupal.
shared.machineName = (str) => {

  if (!str || typeof str !== 'string')
    return '';

  return str.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();

};

shared.knexResponseHandler = (result, queryContext) => {

  if (!Array.isArray(result))
    return result;

  else if (result.length == 1)
    return result.pop();

  else if (result.length == 0)
    return null;

};

shared.wrapAsync = (fn) => {

  return (req, res, next) => {

    fn(req, res, next).catch(next);

  }

};

// returns middleware which creates a local function for
// templates which creates links to the MSA_STATIC_SERVICE_HOST
shared.msaStatic = (MSA_STATIC_SERVICE_HOST, app) => {

  const baseUrl = new URL(MSA_STATIC_SERVICE_HOST); 

  // now we have a function for templates, which creates
  // links to our static file server (or load balancer of)
  app.locals.static = (relUrl, scope) => {

    scope = scope || 'public';

    return baseUrl + [scope, relUrl].join('/');

  };

};

module.exports = shared;
