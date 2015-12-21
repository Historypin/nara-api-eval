'use strict';

/**
 * module variables
 */
var path;

/**
 * module dependencies
 */
path = require( 'path' );

module.exports = function ( app ) {
  require( './logger' )( app );
};