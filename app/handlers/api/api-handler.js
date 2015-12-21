'use strict';

/**
 * module variables
 */
var Promise;
var request;

/**
 * variable assignments
 */
Promise = require( 'bluebird' );
request = require( 'request' );

// debug mode
if ( process.env.NODE_ENV === 'development' ) {
  require( 'request-debug' )( request );
}

/**
 * @param {Function} resolve
 * @param {Function} reject
 * @param {Object} options
 */
function apiRequest( resolve, reject, options ) {
  request(
    options,

    /**
     * @param {null|Error} err
     * @param {IncomingMessage} res
     * @param {string} body
     */
    function responseHandler( err, res, body ) {
      if ( err ) {
        reject( err );
      }

      resolve( body );
    }
  );
}

/**
 * @param {Object} options
 * @returns {Promise}
 */
function apiHandler( options ) {
  return new Promise( function ( resolve, reject ) {
    apiRequest.call( this, resolve, reject, options );
  } );
}

module.exports = apiHandler;