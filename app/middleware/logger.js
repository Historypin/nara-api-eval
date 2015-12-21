'use strict';

/**
 * module variables
 * @private
 */
var logger;

/**
 * module dependencies
 */
logger = require( 'morgan' );

/**
 * @public
 * @param {Function} app
 */
module.exports = function( app ) {
  var config;

  config =
    ':req[x-real-ip] ' +
    '[:date[clf]] ' +
    '":method :url HTTP/:http-version" ' +
    ':status ' +
    ':response-time ms ' +
    ':res[content-length] ' +
    '":referrer" ":user-agent"';

  app.use( logger( config ) );
};